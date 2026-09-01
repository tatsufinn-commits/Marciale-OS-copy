import test from 'node:test';
import assert from 'node:assert/strict';
import { BountyBoardSystem } from '../src/systems/BountyBoardSystem.js';
import { EventBus, Events } from '../src/core/EventBus.js';
import { bounties as bountyData, guildRanks } from '../src/data/bounties.js';

class MockStateManager {
  constructor() {
    this.data = {
      player: { gold: 100 },
      bounties: {
        reputation: 0,
        currentRankId: 'rank_novice',
        active: {},
        completed: []
      }
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

test('BountyBoardSystem initializes default state and ranks', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const bountySystem = new BountyBoardSystem({
    stateManager,
    eventBus,
    events: Events,
    bountyTemplates: bountyData,
    rankTemplates: guildRanks
  });

  assert.equal(bountySystem.getReputation(), 0);
  assert.equal(bountySystem.getGuildRank().id, 'rank_novice');
  assert.equal(bountySystem.getAvailableBounties().length, 6);
});

test('BountyBoardSystem accepts available contracts and rejects locked ones', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const bountySystem = new BountyBoardSystem({
    stateManager,
    eventBus,
    events: Events,
    bountyTemplates: bountyData,
    rankTemplates: guildRanks
  });

  // Rank 0 bounty accepted
  const accepted = bountySystem.acceptBounty('bounty-fittoa-goblins');
  assert.equal(accepted, true);
  assert.ok(stateManager.get('bounties.active.bounty-fittoa-goblins'));

  // Rank 250 bounty rejected at 0 rep
  const lockedAccept = bountySystem.acceptBounty('bounty-fittoa-thorn-warden');
  assert.equal(lockedAccept, false);
});

test('BountyBoardSystem tracks monster kills matching target pattern', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const bountySystem = new BountyBoardSystem({
    stateManager,
    eventBus,
    events: Events,
    bountyTemplates: bountyData,
    rankTemplates: guildRanks
  });

  bountySystem.acceptBounty('bounty-fittoa-goblins');

  // Slime kill does not advance goblin bounty
  bountySystem.trackKill({ templateId: 'slime_acid' });
  let record = stateManager.get('bounties.active.bounty-fittoa-goblins');
  assert.equal(record.progress, 0);

  // Goblin kill advances
  bountySystem.trackKill({ templateId: 'goblin_raider' });
  record = stateManager.get('bounties.active.bounty-fittoa-goblins');
  assert.equal(record.progress, 1);
});

test('BountyBoardSystem tracks boss defeats for boss_defeated contracts', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  stateManager.set('bounties.reputation', 300); // Unlock Rank 250

  const bountySystem = new BountyBoardSystem({
    stateManager,
    eventBus,
    events: Events,
    bountyTemplates: bountyData,
    rankTemplates: guildRanks
  });

  bountySystem.acceptBounty('bounty-fittoa-thorn-warden');

  bountySystem.trackBossDefeated({ bossId: 'boss_briar_warden' });
  const record = stateManager.get('bounties.active.bounty-fittoa-thorn-warden');
  assert.equal(record.progress, 1);
});

test('BountyBoardSystem claims bounty, disburses rewards, and triggers rank promotion', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const bountySystem = new BountyBoardSystem({
    stateManager,
    eventBus,
    events: Events,
    bountyTemplates: bountyData,
    rankTemplates: guildRanks
  });

  bountySystem.acceptBounty('bounty-fittoa-goblins');

  for (let i = 0; i < 10; i++) {
    bountySystem.trackKill({ templateId: 'goblin_spearman' });
  }

  let rankEventFired = false;
  eventBus.on(Events.GUILD_RANK_UNLOCKED, ({ rank }) => {
    if (rank.id === 'rank_hunter') rankEventFired = true;
  });

  // Set rep close to threshold (240 + 25 = 265 -> rank_hunter promotion)
  stateManager.set('bounties.reputation', 240);

  const rewards = bountySystem.claimBounty('bounty-fittoa-goblins');
  assert.ok(rewards);
  assert.equal(rewards.gold, 200);
  assert.equal(stateManager.get('player.gold'), 300);
  assert.equal(stateManager.get('bounties.reputation'), 265);
  assert.equal(bountySystem.getGuildRank().id, 'rank_hunter');
  assert.equal(rankEventFired, true);
  assert.ok(stateManager.get('bounties.completed').includes('bounty-fittoa-goblins'));
});
