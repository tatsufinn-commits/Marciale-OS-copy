import { Entity } from './Entity.js';
export class Hero extends Entity {
  constructor(data = {}) { super({ ...data, type: 'hero', attackRange: data.attackRange ?? 410, width: data.width ?? 20, height: data.height ?? 40, color: data.color ?? '#b8963c' }); this.classId = data.classId ?? 'channeler'; this.mana = data.mana ?? 0; this.maxMana = data.maxMana ?? this.mana; this.affinity = data.affinity ?? 'Neutral'; this.skills = data.skills ?? []; this.skillCooldowns = data.skillCooldowns ?? {}; this.aiMode = data.aiMode ?? 'balanced'; this.gearSlots = data.gearSlots ?? {}; }
}
