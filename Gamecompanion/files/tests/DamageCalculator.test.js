import test from 'node:test';
import assert from 'node:assert/strict';
import { DamageCalculator } from '../src/combat/DamageCalculator.js';

const attacker = { attackDamage: 100, critChance: 0, critDamage: 2, affinity: 'Water' };
test('armor reduces physical damage and stays below 75 percent cap', () => {
  const calc = new DamageCalculator({ rng: () => 0.99 }); const result = calc.calculateDamage(attacker, { armor: 100, dodge: 0 }, { stageLevel: 10 });
  assert.ok(result.final < 100); assert.ok(result.mitigation <= 0.75);
});
test('critical multiplies raw damage before mitigation', () => {
  const calc = new DamageCalculator({ rng: () => 0 }); const result = calc.calculateDamage({ ...attacker, critChance: 1, critDamage: 2 }, { armor: 0 }, {});
  assert.equal(result.isCrit, true); assert.equal(result.final, 200);
});
test('dodge prevents all final damage', () => {
  const calc = new DamageCalculator({ rng: () => 0 }); const result = calc.calculateDamage(attacker, { dodge: 1 }, {});
  assert.equal(result.isDodged, true); assert.equal(result.final, 0);
});
test('magic resistance reduces magic damage', () => {
  const calc = new DamageCalculator({ rng: () => 0.99 }); const result = calc.calculateDamage(attacker, { magicResistance: 50 }, { damageType: 'magic' });
  assert.equal(result.final, 50); assert.equal(result.mitigation, 0.5);
});
test('unconfigured affinity interactions stay neutral', () => {
  const result = new DamageCalculator({ rng: () => 0.99 }).calculateDamage(attacker, { armor: 0, affinity: 'Fire' });
  assert.equal(result.affinityMultiplier, 1);
});
