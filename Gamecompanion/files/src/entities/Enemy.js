import { Entity } from './Entity.js';
export class Enemy extends Entity {
  constructor(data = {}) { super({ ...data, type: 'enemy', attackRange: data.attackRange ?? 28, width: data.width ?? 18, height: data.height ?? 24, color: data.color ?? '#d94a4a' }); this.monsterTemplateId = data.monsterTemplateId ?? data.templateId; this.xpReward = data.xpReward ?? 0; this.goldReward = data.goldReward ?? 0; this.dropTable = data.dropTable ?? []; }
}
