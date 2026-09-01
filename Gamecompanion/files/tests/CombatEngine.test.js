import test from 'node:test';
import assert from 'node:assert/strict';
import { CombatEngine } from '../src/combat/CombatEngine.js';

class State { constructor(combat) { this.combat = combat; } get(path) { return structuredClone(this.combat); } set(path, value) { this.combat = value; } }
const events = { MONSTER_KILLED: 'monster:killed', HERO_DIED: 'hero:died' };

test('hero auto-attacks an enemy inside range and emits kill event', () => {
  const state = new State({ state: 'fighting', hero: { id: 'r', type: 'hero', x: 0, width: 10, hp: 10, maxHp: 10, isAlive: true, attackRange: 100, attackDamage: 5, attackSpeed: 2, attackCooldown: 0 }, enemies: [{ id: 's', templateId: 'slime', type: 'enemy', x: 50, width: 10, hp: 4, maxHp: 4, isAlive: true, attackRange: 10, attackDamage: 1, attackSpeed: 1, attackCooldown: 0, moveSpeed: 0 }] });
  const emitted = []; const engine = new CombatEngine({ stateManager: state, eventBus: { emit: (...args) => emitted.push(args) }, events });
  engine.tick(100);
  assert.equal(state.combat.enemies[0].isAlive, false); assert.ok(emitted.some(([event]) => event === 'monster:killed'));
});
test('enemy moves toward hero when outside its attack range', () => {
  const state = new State({ state: 'fighting', hero: { id: 'r', type: 'hero', x: 0, width: 10, hp: 100, maxHp: 100, isAlive: true, attackRange: 0, attackDamage: 0, attackSpeed: 1, attackCooldown: 999 }, enemies: [{ id: 's', type: 'enemy', x: 200, width: 10, hp: 10, maxHp: 10, isAlive: true, attackRange: 10, attackDamage: 1, attackSpeed: 1, attackCooldown: 999, moveSpeed: 1 }] });
  const engine = new CombatEngine({ stateManager: state, eventBus: { emit() {} }, events }); engine.tick(1000);
  assert.ok(state.combat.enemies[0].x < 200);
});
