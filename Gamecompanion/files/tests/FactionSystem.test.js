import test from 'node:test';
import assert from 'node:assert/strict';
import { FactionSystem } from '../src/systems/FactionSystem.js';
import { EventBus, Events } from '../src/core/EventBus.js';

class MockStateManager {
  constructor() {
    this.data = {
      player: { factions: { loomguard: 0 } }
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

test('FactionSystem tracks reputation and unlocks guild ranks with perks', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const mockTemplates = {
    loomguard: {
      id: 'loomguard',
      name: 'Loomguard',
      ranks: [
        { name: 'Initiate', minRep: 0, perk: 'Basic Shop' },
        { name: 'Sentinel', minRep: 500, perk: '10% Discount' },
        { name: 'Warden', minRep: 1000, perk: 'Barrier Skill' }
      ]
    }
  };

  let rankUnlockedEmitted = false;
  eventBus.on(Events.FACTION_RANK_UNLOCKED, ({ factionId, rank }) => {
    if (factionId === 'loomguard' && rank.name === 'Sentinel') {
      rankUnlockedEmitted = true;
    }
  });

  const factions = new FactionSystem({
    stateManager,
    eventBus,
    events: Events,
    factionTemplates: mockTemplates
  });

  assert.equal(factions.getReputation('loomguard'), 0);
  assert.equal(factions.getRank('loomguard').name, 'Initiate');

  // Add 500 rep -> unlocks Sentinel rank
  factions.addReputation('loomguard', 500);
  assert.equal(factions.getReputation('loomguard'), 500);
  assert.equal(factions.getRank('loomguard').name, 'Sentinel');
  assert.equal(factions.getRank('loomguard').perk, '10% Discount');
  assert.equal(rankUnlockedEmitted, true);
});
