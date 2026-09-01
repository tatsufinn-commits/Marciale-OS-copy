import test from 'node:test';
import assert from 'node:assert/strict';
import { AIController } from '../src/combat/AIController.js';

class State { constructor(combat) { this.combat = combat; } get(path) { return structuredClone(this.combat); } set(path, value) { if (path === 'combat.hero') this.combat.hero = structuredClone(value); } update(path, fn) { if (path === 'combat.hero') this.combat.hero = fn(this.combat.hero); } }
const skills = [{ id: 'cheap', name: 'Cheap', type: 'active', damage: 1, cooldown: 1000, manaCost: 2 }, { id: 'strong', name: 'Strong', type: 'active', damage: 3, cooldown: 2000, manaCost: 5 }];
test('aggressive AI selects its strongest usable skill', () => {
  const state = new State({ state: 'fighting', hero: { id: 'r', isAlive: true, x: 0, width: 10, mana: 10, attackRange: 100, aiMode: 'aggressive', skills, skillCooldowns: {} }, enemies: [{ id: 'e', isAlive: true, x: 30, width: 10 }] });
  const attacks = []; const emitted = []; const combat = { distance: () => 10, attack: (...args) => attacks.push(args) };
  const ai = new AIController({ stateManager: state, eventBus: { emit: (...args) => emitted.push(args) }, events: { SKILL_USED: 'skill' }, combatEngine: combat }); ai.update();
  assert.equal(attacks[0][4].skill.id, 'strong'); assert.equal(state.combat.hero.mana, 5); assert.equal(emitted[0][0], 'skill');
});
test('cooldown prevents an immediate second skill cast', () => {
  const state = new State({ state: 'fighting', hero: { id: 'r', isAlive: true, x: 0, width: 10, mana: 10, attackRange: 100, aiMode: 'balanced', skills, skillCooldowns: { cheap: 1000, strong: 1000 } }, enemies: [{ id: 'e', isAlive: true, x: 30, width: 10 }] });
  const attacks = []; const ai = new AIController({ stateManager: state, eventBus: { emit() {} }, events: {}, combatEngine: { distance: () => 10, attack: (...args) => attacks.push(args) } }); ai.update();
  assert.equal(attacks.length, 0);
});
