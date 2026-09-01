import test from 'node:test';
import assert from 'node:assert/strict';
import { AttunementSystem } from '../src/systems/AttunementSystem.js';
import { StatEngine } from '../src/systems/StatEngine.js';
import { EventBus, Events } from '../src/core/EventBus.js';
import { attunementBranches } from '../src/data/attunementTree.js';

class MockStateManager {
  constructor() {
    this.data = {
      player: {
        attunements: {
          availablePoints: 0,
          totalPointsEarned: 0,
          investedPoints: 0,
          nodes: {},
          masteredBranches: []
        }
      },
      inventory: { items: [] },
      combat: {
        hero: {
          baseAttackDamage: 10,
          baseArmor: 5,
          baseMaxHp: 100,
          hp: 100,
          baseCritChance: 0.05,
          baseCritDamage: 1.5
        }
      }
    };
  }
  getState() {
    return structuredClone(this.data);
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

test('AttunementSystem initializes default state without error', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus,
    events: Events,
    branches: attunementBranches
  });

  assert.equal(attunementSystem.getAvailablePoints(), 0);
  assert.equal(attunementSystem.getAllBranchStatus(1).length, 7);
});

test('AttunementSystem grants points on level up according to 1 + floor(level/5)', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus,
    events: Events,
    branches: attunementBranches
  });

  let pointEventFired = false;
  eventBus.on(Events.ATTUNEMENT_POINT_EARNED, ({ points }) => {
    if (points === 2) pointEventFired = true; // Level 5 gives 1 + floor(5/5) = 2 points
  });

  // Level 5 grant
  const pts = attunementSystem.grantLevelPoints(5);
  assert.equal(pts, 2);
  assert.equal(attunementSystem.getAvailablePoints(), 2);
  assert.equal(pointEventFired, true);

  // Level 10 grant -> 1 + floor(10/5) = 3 points
  const pts10 = attunementSystem.grantLevelPoints(10);
  assert.equal(pts10, 3);
  assert.equal(attunementSystem.getAvailablePoints(), 5);
});

test('AttunementSystem invests in tier 1 node, consumes points and aggregates stats', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus,
    events: Events,
    branches: attunementBranches
  });

  attunementSystem.grantLevelPoints(5); // +2 points

  const res = attunementSystem.investNode('water_flow', 1);
  assert.equal(res.success, true);
  assert.equal(res.rank, 1);
  assert.equal(attunementSystem.getAvailablePoints(), 1);
  assert.equal(attunementSystem.getNodeRank('water_flow'), 1);

  const stats = attunementSystem.getAggregatedStats();
  assert.equal(stats.castSpeed, 0.05);
  assert.equal(stats.maxMana, 15);
});

test('AttunementSystem rejects tier 2 investment when hero level is below gate', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus,
    events: Events,
    branches: attunementBranches
  });

  attunementSystem.grantLevelPoints(10); // +3 points
  attunementSystem.investNode('water_flow', 1); // Rank 1 parent satisfied

  // Try tier 2 at Hero Level 3 (Required is 5)
  const res = attunementSystem.investNode('water_surge', 3);
  assert.equal(res.success, false);
  assert.equal(res.reason, 'HERO_LEVEL_TOO_LOW');
});

test('AttunementSystem rejects tier 2 investment when parent requirement is unmet', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus,
    events: Events,
    branches: attunementBranches
  });

  attunementSystem.grantLevelPoints(10); // +3 points

  // Try tier 2 without water_flow parent
  const res = attunementSystem.investNode('water_surge', 10);
  assert.equal(res.success, false);
  assert.equal(res.reason, 'PREREQUISITE_NOT_MET');
});

test('AttunementSystem rejects investment when max rank is reached', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus,
    events: Events,
    branches: attunementBranches
  });

  attunementSystem.grantLevelPoints(20); // Lots of points

  attunementSystem.investNode('water_flow', 1); // Rank 1
  attunementSystem.investNode('water_flow', 1); // Rank 2
  attunementSystem.investNode('water_flow', 1); // Rank 3 (Max)

  const res = attunementSystem.investNode('water_flow', 1);
  assert.equal(res.success, false);
  assert.equal(res.reason, 'MAX_RANK_REACHED');
});

test('AttunementSystem unlocks branch mastery capstone when point threshold is reached', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus,
    events: Events,
    branches: attunementBranches
  });

  attunementSystem.grantLevelPoints(25); // Plenty of points

  let masteryEmitted = false;
  eventBus.on(Events.ATTUNEMENT_BRANCH_MASTERED, ({ branchId, capstone }) => {
    if (branchId === 'earth' && capstone.title === 'Mountainheart') {
      masteryEmitted = true;
    }
  });

  // Earth: earth_skin (1pt x 2 = 2pts), earth_quakestrike (2pt x 1 = 2pts) -> total 4pts = capstone!
  attunementSystem.investNode('earth_skin', 5);
  attunementSystem.investNode('earth_skin', 5);
  const res = attunementSystem.investNode('earth_quakestrike', 5);

  assert.equal(res.success, true);
  assert.equal(res.branchMastered, true);
  assert.equal(masteryEmitted, true);

  const stats = attunementSystem.getAggregatedStats();
  assert.ok(stats.armor >= 50, 'Should include base node armor + 30 capstone armor');
});

test('AttunementSystem refunds 100% points on respec and clears branch masteries', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus,
    events: Events,
    branches: attunementBranches
  });

  attunementSystem.grantLevelPoints(10); // 3 points
  attunementSystem.investNode('fire_ignite', 1); // 1 point spent
  assert.equal(attunementSystem.getAvailablePoints(), 2);

  const respec = attunementSystem.respecAttunements();
  assert.equal(respec.success, true);
  assert.equal(respec.pointsRefunded, 1);
  assert.equal(attunementSystem.getAvailablePoints(), 3);
  assert.equal(attunementSystem.getNodeRank('fire_ignite'), 0);
  assert.deepEqual(attunementSystem.getAggregatedStats(), {});
});

test('AttunementSystem rejects invalid node ID gracefully (G1 Guard)', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus,
    events: Events,
    branches: attunementBranches
  });

  attunementSystem.grantLevelPoints(5);
  const res = attunementSystem.investNode('invalid_phantom_node', 1);
  assert.equal(res.success, false);
  assert.equal(res.reason, 'NODE_NOT_FOUND');
});

test('AttunementSystem rejects investment with zero available points (G2 Guard)', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus,
    events: Events,
    branches: attunementBranches
  });

  assert.equal(attunementSystem.getAvailablePoints(), 0);
  const res = attunementSystem.investNode('water_flow', 1);
  assert.equal(res.success, false);
  assert.equal(res.reason, 'INSUFFICIENT_POINTS');
});

test('StatEngine stacks base stats + gear + multi-branch attunement modifiers accurately', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus,
    events: Events,
    branches: attunementBranches
  });

  const statEngine = new StatEngine({ stateManager });

  // Grant points and invest across 2 branches (Fire + Earth)
  attunementSystem.grantLevelPoints(20);
  attunementSystem.investNode('fire_ignite', 1); // +8 attackDamage, +0.04 critChance
  attunementSystem.investNode('earth_skin', 1);   // +10 armor, +25 maxHp

  const attStats = attunementSystem.getAggregatedStats();
  const hero = stateManager.get('combat.hero');
  const finalStats = statEngine.calculate(hero, [], attStats);

  assert.equal(finalStats.attackDamage, 18, 'Base 10 + 8 Fire talent');
  assert.equal(finalStats.armor, 15, 'Base 5 + 10 Earth talent');
  assert.equal(finalStats.maxHp, 125, 'Base 100 + 25 Earth talent');
  assert.equal(Math.round(finalStats.critChance * 100) / 100, 0.09, 'Base 0.05 + 0.04 Fire talent');
});

test('G7: AttunementSystem rejects respec during active combat without mutating state', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus,
    events: Events,
    branches: attunementBranches
  });

  attunementSystem.grantLevelPoints(10);
  const invest = attunementSystem.investNode('earth_skin', 1);
  assert.equal(invest.success, true);

  const nodesBefore = structuredClone(stateManager.get('player.attunements.nodes'));
  const availableBefore = attunementSystem.getAvailablePoints();
  const investedBefore = stateManager.get('player.attunements.investedPoints');

  // Ghost Incursion setup: live fight + in-flight skill cooldown
  stateManager.set('combat.state', 'fighting');
  stateManager.set('combat.hero.attackCooldown', 420);
  stateManager.set('combat.enemies', [
    { id: 'boss-01', type: 'enemy', isAlive: true, isBoss: true, hp: 400, maxHp: 400 }
  ]);

  const respec = attunementSystem.respecAttunements();

  assert.equal(respec.success, false);
  assert.equal(respec.reason, 'COMBAT_ACTIVE');
  assert.equal(respec.pointsRefunded, 0);
  assert.equal(attunementSystem.getAvailablePoints(), availableBefore);
  assert.equal(stateManager.get('player.attunements.investedPoints'), investedBefore);
  assert.deepEqual(stateManager.get('player.attunements.nodes'), nodesBefore);
  assert.equal(attunementSystem.getNodeRank('earth_skin'), 1);

  // After combat ends, the same respec must succeed (guard is not sticky)
  stateManager.set('combat.state', 'preview');
  stateManager.set('combat.hero.attackCooldown', 0);
  stateManager.set('combat.enemies', []);
  const after = attunementSystem.respecAttunements();
  assert.equal(after.success, true);
  assert.equal(attunementSystem.getNodeRank('earth_skin'), 0);
});

test('G7 stress: fighting-only, enemies-only, and cooldown-only each lock respec', () => {
  const stateManager = new MockStateManager();
  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus: new EventBus(),
    events: Events,
    branches: attunementBranches
  });
  attunementSystem.grantLevelPoints(10);
  assert.equal(attunementSystem.investNode('earth_skin', 1).success, true);

  stateManager.set('combat.state', 'fighting');
  stateManager.set('combat.enemies', []);
  stateManager.set('combat.hero.attackCooldown', 0);
  assert.equal(attunementSystem.respecAttunements().reason, 'COMBAT_ACTIVE');

  stateManager.set('combat.state', 'preview');
  stateManager.set('combat.enemies', [{ isAlive: true }]);
  assert.equal(attunementSystem.respecAttunements().reason, 'COMBAT_ACTIVE');

  stateManager.set('combat.enemies', []);
  stateManager.set('combat.hero.attackCooldown', 1);
  assert.equal(attunementSystem.respecAttunements().reason, 'COMBAT_ACTIVE');
  assert.equal(attunementSystem.getNodeRank('earth_skin'), 1);
});

test('Attunement state snapshot serializes and survives game state export/import', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const attunementSystem = new AttunementSystem({
    stateManager,
    eventBus,
    events: Events,
    branches: attunementBranches
  });

  attunementSystem.grantLevelPoints(15);
  attunementSystem.investNode('water_flow', 1);

  // Capture full state snapshot (similar to SaveManager JSON serialization)
  const snapshot = stateManager.getState();
  assert.ok(snapshot.player.attunements);
  assert.equal(snapshot.player.attunements.availablePoints, 3); // 4 earned - 1 spent = 3
  assert.equal(snapshot.player.attunements.nodes['water_flow'].rank, 1);
});
