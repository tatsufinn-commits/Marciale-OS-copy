import { DamageCalculator } from './DamageCalculator.js';
/** Build 6 combat authority with a pure, inspectable damage pipeline. */
export class CombatEngine {
  constructor({ stateManager, eventBus, events, onHit = null, damageCalculator = new DamageCalculator() } = {}) { Object.assign(this, { stateManager, eventBus, events, onHit, damageCalculator }); this.deathDelay = 650; }
  tick(dt) {
    const combat = this.stateManager.get('combat'); const hero = combat.hero; if (!hero?.isAlive) return;
    const enemies = combat.enemies.map((enemy) => ({ ...enemy })); hero.attackCooldown = Math.max(0, (hero.attackCooldown ?? 0) - dt);
    const targets = enemies.filter((enemy) => enemy.isAlive); const heroTarget = targets.sort((a, b) => this.distance(hero, a) - this.distance(hero, b))[0];
    if (heroTarget && hero.attackCooldown <= 0 && this.distance(hero, heroTarget) <= hero.attackRange) this.attack(hero, heroTarget, enemies, combat);
    enemies.forEach((enemy) => { if (!enemy.isAlive) { enemy.deathTimer = (enemy.deathTimer ?? this.deathDelay) - dt; return; } enemy.attackCooldown = Math.max(0, (enemy.attackCooldown ?? 0) - dt); if (this.distance(enemy, hero) > enemy.attackRange) enemy.x -= (enemy.moveSpeed ?? 0) * (dt / 1000) * 60; else if (enemy.attackCooldown <= 0) this.attack(enemy, hero, enemies, combat); });
    combat.hero = hero; combat.enemies = enemies.filter((enemy) => enemy.isAlive || enemy.deathTimer > 0); combat.state = combat.enemies.some((enemy) => enemy.isAlive) ? 'fighting' : 'wave_clear'; this.stateManager.set('combat', combat, { source: 'combat-engine' });
  }
  attack(attacker, defender, enemies, combat, { multiplier = 1, skill = null } = {}) {
    const damageType = attacker.type === 'hero' ? 'magic' : 'physical';
    const result = this.damageCalculator.calculateDamage(attacker, defender, { damageType, multiplier, stageLevel: this.stateManager.get('progression.currentStage') ?? 1 });
    if (!result.isDodged) defender.hp = Math.max(0, defender.hp - result.final); attacker.attackCooldown = 1000 / Math.max(0.01, attacker.attackSpeed ?? 1);
    const payload = { attackerId: attacker.id, defenderId: defender.id, damageType, skillId: skill?.id ?? null, ...result };
    this.eventBus.emit(this.events.DAMAGE_DEALT, payload); this.onHit?.({ attacker, defender, damage: result.final, result });
    if (defender.hp <= 0 && defender.isAlive) { defender.isAlive = false; defender.deathTimer = this.deathDelay; if (defender.type === 'enemy') this.eventBus.emit(this.events.MONSTER_KILLED, { enemyId: defender.id, templateId: defender.templateId, xp: defender.xpReward, gold: defender.goldReward }); else this.eventBus.emit(this.events.HERO_DIED, { heroId: defender.id }); }
  }
  distance(a, b) { return Math.abs((a.x + a.width / 2) - (b.x + b.width / 2)); }
}
