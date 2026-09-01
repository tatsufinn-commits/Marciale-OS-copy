import { Hero } from './Hero.js';
import { Enemy } from './Enemy.js';

const enemyColors = { slime: '#4aba8a', goblin: '#6aba4a', orc: '#5a6a3a', wolf: '#8a6a4a' };
export class EntityFactory {
  constructor({ heroes = [], enemies = [] } = {}) { this.heroes = new Map(heroes.map((entry) => [entry.id, entry])); this.enemies = new Map(enemies.map((entry) => [entry.id, entry])); this._serial = 0; }
  createHero(id, overrides = {}) {
    const template = this.heroes.get(id); if (!template) throw new Error(`Unknown hero template: ${id}`);
    return new Hero({ id, templateId: id, displayName: template.name, spriteId: id, ...template.baseStats, baseAttackDamage: template.baseStats.attackDamage, baseArmor: template.baseStats.armor, baseMaxHp: template.baseStats.maxHp, baseCritChance: template.baseStats.critChance, baseCritDamage: template.baseStats.critDamage, classId: template.class, affinity: template.affinity, skills: template.skills, x: 60, y: 220, ...overrides });
  }
  createEnemy(id, overrides = {}) {
    const template = this.enemies.get(id); if (!template) throw new Error(`Unknown enemy template: ${id}`);
    this._serial += 1;
    return new Enemy({ id: `${id}-${this._serial}`, templateId: id, monsterTemplateId: id, displayName: template.name, spriteId: id, ...template, x: 510, y: 230, color: enemyColors[id] ?? '#d94a4a', ...overrides });
  }
}
