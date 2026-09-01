/** Build 11 derives combat stats from base hero stats and equipped inventory items. */
export class StatEngine {
  constructor({ stateManager } = {}) { this.stateManager = stateManager; }
  calculate(hero, equippedItems = [], attunementStats = {}) {
    const stats = {
      attackDamage: hero.baseAttackDamage ?? hero.attackDamage ?? 1,
      armor: hero.baseArmor ?? hero.armor ?? 0,
      maxHp: hero.baseMaxHp ?? hero.maxHp ?? 1,
      critChance: hero.baseCritChance ?? hero.critChance ?? 0,
      critDamage: hero.baseCritDamage ?? hero.critDamage ?? 1.5
    };
    equippedItems.forEach((item) => Object.entries(item.stats ?? {}).forEach(([key, value]) => { stats[key] = (stats[key] ?? 0) + value; }));
    Object.entries(attunementStats ?? {}).forEach(([key, value]) => { stats[key] = (stats[key] ?? 0) + value; });
    return stats;
  }
  equip(uid, attunementStats = {}) {
    const inventory = this.stateManager.get('inventory');
    const item = inventory.items.find((entry) => entry.uid === uid);
    if (!item?.slot) return { equipped: false, reason: 'invalid-item' };
    const hero = this.stateManager.get('combat.hero');
    const gear = { ...(hero.gearSlots ?? {}) };
    const oldUid = gear[item.slot];
    gear[item.slot] = uid;
    const equipped = Object.values(gear).map((id) => inventory.items.find((entry) => entry.uid === id)).filter(Boolean);
    const derived = this.calculate(hero, equipped, attunementStats);
    const nextHero = { ...hero, gearSlots: gear, attackDamage: derived.attackDamage, armor: derived.armor, maxHp: derived.maxHp, hp: Math.min(hero.hp, derived.maxHp), critChance: derived.critChance, critDamage: derived.critDamage };
    this.stateManager.set('combat.hero', nextHero, { source: 'stat-engine' });
    return { equipped: true, replacedUid: oldUid ?? null, derived };
  }
}
