/** Base serializable combat entity. Positions are in canvas pixels. */
export class Entity {
  constructor(data = {}) {
    Object.assign(this, {
      id: data.id, templateId: data.templateId ?? data.id, type: data.type ?? 'entity', displayName: data.displayName ?? data.name ?? data.id,
      spriteId: data.spriteId ?? data.id, x: data.x ?? 0, y: data.y ?? 220, width: data.width ?? 18, height: data.height ?? 24,
      color: data.color ?? '#e4e4e4', hp: data.hp ?? data.maxHp ?? 1, maxHp: data.maxHp ?? data.hp ?? 1,
      attackDamage: data.attackDamage ?? 1, attackSpeed: data.attackSpeed ?? 1, attackCooldown: data.attackCooldown ?? 0,
      attackRange: data.attackRange ?? 24, moveSpeed: data.moveSpeed ?? 0, armor: data.armor ?? 0,
      isAlive: data.isAlive ?? true, deathTimer: data.deathTimer ?? 0
    });
  }
  tickCooldown(dt) { this.attackCooldown = Math.max(0, this.attackCooldown - dt); }
  canAttack() { return this.isAlive && this.attackCooldown <= 0; }
  resetAttackCooldown() { this.attackCooldown = 1000 / Math.max(0.01, this.attackSpeed); }
  takeDamage(amount) { const dealt = Math.max(0, amount); this.hp = Math.max(0, this.hp - dealt); if (this.hp <= 0) this.isAlive = false; return dealt; }
  distanceTo(other) { return Math.abs((this.x + this.width / 2) - (other.x + other.width / 2)); }
}
