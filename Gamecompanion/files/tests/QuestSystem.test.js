import test from 'node:test';
import assert from 'node:assert/strict';
import { QuestSystem } from '../src/systems/QuestSystem.js';
import { EventBus, Events } from '../src/core/EventBus.js';

class MockStateManager {
  constructor() {
    this.data = {
      player: { gold: 100 },
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

test('QuestSystem initializes templates and tracks progress to completion', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();
  const templates = [
    {
      id: 'test-kill-slime',
      type: 'daily',
      title: 'Slime Slayer',
      description: 'Kill 2 slimes',
      targetType: 'monster_killed',
      targetCount: 2,
      rewards: { gold: 50, xp: 100 }
    }
  ];

  let completedEmitted = false;
  eventBus.on(Events.QUEST_COMPLETED, ({ quest }) => {
    if (quest.id === 'test-kill-slime') completedEmitted = true;
  });

  const questSystem = new QuestSystem({
    stateManager,
    eventBus,
    events: Events,
    questTemplates: templates
  });

  const active = questSystem.getActiveQuests();
  assert.equal(active.length, 1);
  assert.equal(active[0].progress, 0);
  assert.equal(active[0].completed, false);

  // Step 1: Kill 1 monster -> progress 1/2
  questSystem.updateProgress('monster_killed', 1);
  const after1 = questSystem.getActiveQuests()[0];
  assert.equal(after1.progress, 1);
  assert.equal(after1.completed, false);
  assert.equal(completedEmitted, false);

  // Step 2: Kill 2nd monster -> progress 2/2 and completed
  questSystem.updateProgress('monster_killed', 1);
  const after2 = questSystem.getActiveQuests()[0];
  assert.equal(after2.progress, 2);
  assert.equal(after2.completed, true);
  assert.equal(completedEmitted, true);
  assert.equal(stateManager.get('player.gold'), 150, 'Gold reward should be granted');
});

test('QuestSystem filters quests by type', () => {
  const stateManager = new MockStateManager();
  const templates = [
    { id: 'q1', type: 'daily', targetType: 'monster_killed', targetCount: 5 },
    { id: 'q2', type: 'story', targetType: 'chest_opened', targetCount: 1 }
  ];

  const questSystem = new QuestSystem({
    stateManager,
    questTemplates: templates
  });

  assert.equal(questSystem.getActiveQuests('daily').length, 1);
  assert.equal(questSystem.getActiveQuests('story').length, 1);
  assert.equal(questSystem.getActiveQuests().length, 2);
});
