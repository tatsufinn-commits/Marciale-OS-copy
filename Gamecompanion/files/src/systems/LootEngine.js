/** Build 9 deterministic-ready loot and chest authority. Inventory insertion is Build 10. */
export class LootEngine {
  constructor({ stateManager, eventBus, events, items = [], rng = Math.random } = {}) { this.stateManager = stateManager; this.eventBus = eventBus; this.events = events; this.items = items.filter((item) => item.type !== 'material'); this.rng = rng; this.serial = 0; }
  onMonsterKilled({ gold = 0 }) { if (gold > 0) { this.stateManager.update('player.gold', (current) => current + gold, { source: 'loot-engine' }); this.eventBus.emit(this.events.GOLD_CHANGED, { amount: gold, reason: 'monster' }); } }
  dropStageChest(stageId) {
    this.serial += 1; const chest = { id: `chest-${this.serial}`, x: 380, y: 235, isOpen: false, stageId, rarity: this.rollRarity(), createdAt: Date.now() };
    this.stateManager.update('combat.chests', (chests) => [...chests, chest], { source: 'loot-engine' }); this.eventBus.emit(this.events.CHEST_DROPPED, chest); return chest;
  }
  openChest(chestId) {
    const chest = this.stateManager.get('combat.chests').find((entry) => entry.id === chestId && !entry.isOpen); if (!chest) return null;
    const reward = this.rollReward(chest.rarity); this.stateManager.update('combat.chests', (chests) => chests.map((entry) => entry.id === chestId ? { ...entry, isOpen: true } : entry), { source: 'loot-engine' });
    this.stateManager.update('rewards.recent', (recent) => [reward, ...recent].slice(0, 10), { source: 'loot-engine' });
    this.eventBus.emit(this.events.CHEST_OPENED, { chestId, reward }); return reward;
  }
  rollRarity() { const roll = this.rng(); return roll < .03 ? 'legendary' : roll < .18 ? 'rare' : roll < .55 ? 'uncommon' : 'common'; }
  rollReward(rarity) { const candidates = this.items.filter((item) => (item.rarity ?? 'common').toLowerCase() === rarity); const item = candidates[Math.floor(this.rng() * candidates.length)] ?? this.items[0] ?? null; return { id: `reward-${Date.now()}-${this.serial}`, type: item ? 'item' : 'gold', rarity, itemId: item?.id ?? null, name: item?.name ?? 'Gold', quantity: 1 }; }
}
