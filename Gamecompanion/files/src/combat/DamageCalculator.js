/**
 * Build 6 pure damage pipeline.
 * Elemental interactions default to neutral: Mushoku Tensei magic schools do not
 * canonically use a universal rock-paper-scissors chart. Content may opt into
 * explicitly configured interactions later.
 */
export class DamageCalculator {
  constructor({ rng = Math.random, affinityTable = {} } = {}) { this.rng = rng; this.affinityTable = affinityTable; }

  calculateDamage(attacker, defender, { multiplier = 1, damageType = 'physical', stageLevel = 1, affinity = null } = {}) {
    const raw = Math.max(0, (attacker.attackDamage ?? 1) * multiplier);
    const dodged = this.rng() < (defender.dodge ?? 0);
    if (dodged) return this.result({ raw, isDodged: true, final: 0 });

    const isCrit = this.rng() < (attacker.critChance ?? 0);
    const critical = raw * (isCrit ? attacker.critDamage ?? 1.5 : 1);
    const isBlocked = this.rng() < (defender.blockChance ?? 0);
    const blocked = isBlocked ? critical * (1 - Math.min(0.95, defender.blockReduction ?? 0.5)) : critical;
    const affinityMultiplier = this.getAffinityMultiplier(affinity ?? attacker.affinity, defender.affinity);
    const elemental = blocked * affinityMultiplier;
    const mitigation = damageType === 'magic' ? this.resistanceReduction(defender, elemental) : this.armorReduction(defender.armor ?? 0, elemental, stageLevel);
    const absorbed = Math.min(defender.absorption ?? 0, elemental * (1 - mitigation));
    const final = Math.max(1, elemental * (1 - mitigation) - absorbed);
    return this.result({ raw, critical, blocked, elemental, mitigation, absorbed, final, isCrit, isDodged: false, isBlocked, affinityMultiplier });
  }

  armorReduction(armor, damage, stageLevel) {
    if (armor <= 0 || damage <= 0) return 0;
    const scale = 14 * Math.max(1, stageLevel) + 12;
    return Math.min(0.75, (armor ** 2) / ((armor ** 2) + scale * (armor + 0.4 * damage)));
  }
  resistanceReduction(defender, damage) {
    const resistance = Math.max(-100, Math.min(75, (defender.magicResistance ?? 0) + (defender.allElementalResistance ?? 0)));
    return resistance / 100;
  }
  getAffinityMultiplier(source, target) { return this.affinityTable?.[source]?.[target] ?? 1; }
  result(values) { return { raw: 0, critical: 0, blocked: 0, elemental: 0, mitigation: 0, absorbed: 0, final: 0, isCrit: false, isDodged: false, isBlocked: false, affinityMultiplier: 1, ...values }; }
}
