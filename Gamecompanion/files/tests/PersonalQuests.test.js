import test from 'node:test';
import assert from 'node:assert/strict';
import { QuestSystem } from '../src/systems/QuestSystem.js';
import { EventBus, Events } from '../src/core/EventBus.js';
import { personalQuests } from '../src/data/personalQuests.js';

class MockStateManager {
  constructor() {
    this.data = {
      player: {
        gold: 100,
        affinities: { vaela: 10, kaelen: 10, sera: 10 },
        personalQuests: {}
      },
      quests: { active: [] }
    };
  }
  get(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], this.data);
  }
  set(path, value) {
    const keys = path.split('.');
    let target = this.data;
    while (keys.length > 1) {
      const k = keys.shift();
      target[k] = target[k] || {};
      target = target[k];
    }
    target[keys[0]] = value;
  }
  update(path, updater) {
    const current = this.get(path);
    const updated = updater(current);
    this.set(path, updated);
    return updated;
  }
}

test('PersonalQuests initialize into state in locked status', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const questSystem = new QuestSystem({
    stateManager,
    eventBus,
    events: Events,
    personalQuestTemplates: personalQuests
  });

  const list = questSystem.getPersonalQuests();
  assert.equal(list.length, 3, 'Should load 3 personal quest chains');
  assert.equal(list.every(q => !q.unlocked), true, 'All chains should be locked initially at affinity 10');
});

test('PersonalQuests unlock when affinity reaches threshold (Affinity >= 25)', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const questSystem = new QuestSystem({
    stateManager,
    eventBus,
    events: Events,
    personalQuestTemplates: personalQuests
  });

  // Vaela reaches affinity 25
  stateManager.set('player.affinities.vaela', 25);
  const unlocked = questSystem.evaluatePersonalQuests();

  assert.equal(unlocked.length, 1);
  assert.equal(unlocked[0].id, 'vaela-roots-of-belonging');

  const list = questSystem.getPersonalQuests();
  const vaelaChain = list.find(c => c.id === 'vaela-roots-of-belonging');
  assert.equal(vaelaChain.unlocked, true);
  assert.equal(vaelaChain.completed, false);
});

test('PersonalQuests do not unlock if affinity is below required threshold', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const questSystem = new QuestSystem({
    stateManager,
    eventBus,
    events: Events,
    personalQuestTemplates: personalQuests
  });

  stateManager.set('player.affinities.sera', 20); // Required is 25
  const unlocked = questSystem.evaluatePersonalQuests();
  assert.equal(unlocked.length, 0);

  const seraChain = questSystem.getPersonalQuests().find(c => c.id === 'sera-echo-seekers-truth');
  assert.equal(seraChain.unlocked, false);
});

test('PersonalQuests track step progress and disburse step rewards', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const questSystem = new QuestSystem({
    stateManager,
    eventBus,
    events: Events,
    personalQuestTemplates: personalQuests
  });

  // Unlock Vaela's chain
  stateManager.set('player.affinities.vaela', 30);
  questSystem.evaluatePersonalQuests();

  let stepEventFired = false;
  eventBus.on(Events.PERSONAL_QUEST_PROGRESS, ({ chainId, step }) => {
    if (chainId === 'vaela-roots-of-belonging' && step.id === 'vaela-1') {
      stepEventFired = true;
    }
  });

  // Vaela step 1 requires 15 monster kills
  for (let i = 0; i < 14; i++) {
    questSystem.trackPersonalProgress('monster_killed');
  }
  let vaelaChain = questSystem.getPersonalQuests().find(c => c.id === 'vaela-roots-of-belonging');
  assert.equal(vaelaChain.steps[0].progress, 14);
  assert.equal(vaelaChain.steps[0].completed, false);

  // 15th kill completes step 1
  questSystem.trackPersonalProgress('monster_killed');
  vaelaChain = questSystem.getPersonalQuests().find(c => c.id === 'vaela-roots-of-belonging');
  assert.equal(vaelaChain.steps[0].completed, true);
  assert.equal(vaelaChain.currentStepIndex, 1);
  assert.equal(stepEventFired, true);
  assert.equal(stateManager.get('player.gold'), 250, 'Initial 100 gold + 150 gold step reward');
});

test('PersonalQuests filter elite foes for elite_killed target types', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const questSystem = new QuestSystem({
    stateManager,
    eventBus,
    events: Events,
    personalQuestTemplates: personalQuests
  });

  stateManager.set('player.affinities.kaelen', 35);
  questSystem.evaluatePersonalQuests();

  // Kaelen step 1 is 20 elite kills
  // Normal kill does not advance elite_killed
  questSystem.registerMonsterKill({ templateId: 'slime_normal' });
  let kaelenChain = questSystem.getPersonalQuests().find(c => c.id === 'kaelen-knights-redemption');
  assert.equal(kaelenChain.steps[0].progress, 0);

  // Elite kill advances
  questSystem.registerMonsterKill({ templateId: 'orc_elite_champion' });
  kaelenChain = questSystem.getPersonalQuests().find(c => c.id === 'kaelen-knights-redemption');
  assert.equal(kaelenChain.steps[0].progress, 1);
});

test('PersonalQuests evaluate hero_level requirement targets correctly', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const questSystem = new QuestSystem({
    stateManager,
    eventBus,
    events: Events,
    personalQuestTemplates: personalQuests
  });

  stateManager.set('player.affinities.kaelen', 50);
  questSystem.evaluatePersonalQuests();

  const kaelenRecord = stateManager.get('player.personalQuests.kaelen-knights-redemption');
  kaelenRecord.currentStepIndex = 2; // Jump to step 3 (Hero Level 5)
  kaelenRecord.steps[0].completed = true;
  kaelenRecord.steps[1].completed = true;

  // Level 3 does not complete
  questSystem.registerHeroLevel(3);
  let chain = questSystem.getPersonalQuests().find(c => c.id === 'kaelen-knights-redemption');
  assert.equal(chain.completed, false);

  // Level 5 completes
  questSystem.registerHeroLevel(5);
  chain = questSystem.getPersonalQuests().find(c => c.id === 'kaelen-knights-redemption');
  assert.equal(chain.completed, true);
  assert.equal(chain.relicGranted, true);
});

test('Completing all steps finishes chain and disburses Legendary Relic', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const questSystem = new QuestSystem({
    stateManager,
    eventBus,
    events: Events,
    personalQuestTemplates: personalQuests
  });

  stateManager.set('player.affinities.sera', 40);
  questSystem.evaluatePersonalQuests();

  let relicAwarded = null;
  eventBus.on(Events.PERSONAL_QUEST_CHAIN_COMPLETED, ({ relic }) => {
    relicAwarded = relic;
  });

  // Sera step 1: 4 chests
  for (let i = 0; i < 4; i++) {
    questSystem.registerChestOpened();
  }

  // Sera step 2: 25 monsters
  for (let i = 0; i < 25; i++) {
    questSystem.registerMonsterKill({ templateId: 'goblin_scout' });
  }

  const seraChain = questSystem.getPersonalQuests().find(c => c.id === 'sera-echo-seekers-truth');
  assert.equal(seraChain.completed, true);
  assert.equal(seraChain.relicGranted, true);
  assert.ok(relicAwarded, 'Should emit relic disbursement event');
  assert.equal(relicAwarded.itemId, 'sera_echo_lens');
});
