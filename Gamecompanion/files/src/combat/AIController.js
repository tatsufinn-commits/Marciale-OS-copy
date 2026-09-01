/** Build 8 rule-based skill controller. Decisions use state only; no renderer dependency. */
export class AIController {
  constructor({ stateManager, eventBus, events, combatEngine } = {}) { Object.assign(this, { stateManager, eventBus, events, combatEngine }); }
  update() {
    const combat = this.stateManager.get('combat'); const hero = combat.hero;
    if (!hero?.isAlive || combat.state !== 'fighting') return;
    hero.skillCooldowns ??= {}; hero.aiMode ??= 'balanced';
    const target = combat.enemies.filter((enemy) => enemy.isAlive).sort((a, b) => this.combatEngine.distance(hero, a) - this.combatEngine.distance(hero, b))[0];
    if (!target) return;
    const skill = this.selectSkill(hero, combat.enemies.filter((enemy) => enemy.isAlive));
    if (!skill || (hero.skillCooldowns[skill.id] ?? 0) > 0 || hero.mana < (skill.manaCost ?? 0) || this.combatEngine.distance(hero, target) > hero.attackRange) return;
    hero.mana -= skill.manaCost ?? 0; hero.skillCooldowns[skill.id] = skill.cooldown ?? 1000;
    combat.hero = hero; this.stateManager.set('combat.hero', hero, { source: 'ai-controller' });
    this.combatEngine.attack(hero, target, combat.enemies, combat, { multiplier: skill.damage ?? 1, skill });
    this.eventBus.emit(this.events.SKILL_USED, { heroId: hero.id, skillId: skill.id, skillName: skill.name, mode: hero.aiMode });
  }
  tickCooldowns(dt) { this.stateManager.update('combat.hero', (hero) => { if (!hero) return hero; const skillCooldowns = Object.fromEntries(Object.entries(hero.skillCooldowns ?? {}).map(([id, value]) => [id, Math.max(0, value - dt)])); return { ...hero, skillCooldowns }; }, { source: 'ai-cooldowns' }); }
  selectSkill(hero, livingEnemies) {
    const available = (hero.skills ?? []).filter((skill) => skill.type === 'active' && (skill.damage ?? 0) > 0 && hero.mana >= (skill.manaCost ?? 0) && (hero.skillCooldowns?.[skill.id] ?? 0) <= 0);
    if (!available.length) return null;
    // Current heroes have damage skills only. This ordering is easily extended for heal/shield support skills.
    if (hero.aiMode === 'aggressive') return [...available].sort((a, b) => (b.damage ?? 0) - (a.damage ?? 0))[0];
    if (hero.aiMode === 'defensive') return [...available].sort((a, b) => (a.manaCost ?? 0) - (b.manaCost ?? 0))[0];
    const aoe = available.find((skill) => skill.aoe && livingEnemies.length >= 2);
    return aoe ?? [...available].sort((a, b) => (a.cooldown ?? 0) - (b.cooldown ?? 0))[0];
  }
}
