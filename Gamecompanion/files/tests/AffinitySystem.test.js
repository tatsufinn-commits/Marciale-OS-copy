import test from 'node:test';
import assert from 'node:assert/strict';
import { AffinitySystem } from '../src/systems/AffinitySystem.js';
import { EventBus, Events } from '../src/core/EventBus.js';

class MockStateManager {
  constructor() {
    this.data = {
      player: { affinities: { vaela: 10 } }
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

test('AffinitySystem tracks bonding levels and unlocks milestone tiers', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const mockTemplates = {
    vaela: {
      id: 'vaela',
      name: 'Vaela',
      milestones: [
        { threshold: 25, tier: 'Companion', buff: '+5% Crit' },
        { threshold: 50, tier: 'Trusted Ally', buff: '+10% Magic' }
      ]
    }
  };

  let milestoneEmitted = false;
  eventBus.on(Events.AFFINITY_MILESTONE, ({ companionId, milestone }) => {
    if (companionId === 'vaela' && milestone.tier === 'Companion') {
      milestoneEmitted = true;
    }
  });

  const affinity = new AffinitySystem({
    stateManager,
    eventBus,
    events: Events,
    affinityTemplates: mockTemplates
  });

  assert.equal(affinity.getAffinity('vaela'), 10);
  assert.equal(affinity.getBondTier('vaela'), 'Acquaintance');

  // Add +15 affinity -> total 25 -> unlocks Companion tier
  affinity.addAffinity('vaela', 15);
  assert.equal(affinity.getAffinity('vaela'), 25);
  assert.equal(affinity.getBondTier('vaela'), 'Companion');
  assert.equal(milestoneEmitted, true);

  const passives = affinity.getActivePassives();
  assert.equal(passives.length, 1);
  assert.equal(passives[0].tier, 'Companion');
});
