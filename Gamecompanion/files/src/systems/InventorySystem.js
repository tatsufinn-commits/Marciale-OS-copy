/** Build 10 authoritative inventory: stack, capacity, sorting, filtering, inspection. */
export class InventorySystem {
  constructor({ stateManager, itemTemplates = [] } = {}) { this.stateManager = stateManager; this.templates = new Map(itemTemplates.map((item) => [item.id, item])); }
  addReward(reward) { if (reward.type !== 'item' || !reward.itemId) return { added: false, reason: 'not-item' }; return this.addItem(reward.itemId, reward.quantity ?? 1, reward.rarity); }
  addItem(itemId, quantity = 1, rarity = null) {
    const template = this.templates.get(itemId); if (!template) return { added: false, reason: 'unknown-item' };
    const inventory = this.stateManager.get('inventory'); const existing = inventory.items.find((item) => item.itemId === itemId && item.quantity < 99);
    if (existing) { existing.quantity = Math.min(99, existing.quantity + quantity); inventory.items = this.sort(existing && inventory.items); this.stateManager.set('inventory', inventory, { source: 'inventory' }); return { added: true, stacked: true }; }
    if (inventory.items.length >= inventory.maxSlots) return { added: false, reason: 'full' };
    inventory.items.push({ uid: `${itemId}-${Date.now()}-${inventory.items.length}`, itemId, name: template.name, slot: template.slot, rarity: rarity ?? template.rarity ?? 'common', quantity, stats: template.stats ?? {} }); inventory.items = this.sort(inventory.items); this.stateManager.set('inventory', inventory, { source: 'inventory' }); return { added: true, stacked: false };
  }
  sort(items = this.stateManager.get('inventory.items')) { return [...items].sort((a, b) => a.rarity.localeCompare(b.rarity) || a.name.localeCompare(b.name)); }
  filter(query = '', slot = null) { const needle = query.toLowerCase(); return this.stateManager.get('inventory.items').filter((item) => (!needle || item.name.toLowerCase().includes(needle)) && (!slot || item.slot === slot)); }
  inspect(uid) { return this.stateManager.get('inventory.items').find((item) => item.uid === uid) ?? null; }
}
