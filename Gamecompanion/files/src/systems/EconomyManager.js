/** Build 13 economy authority: centralized currencies and transparent item sale values. */
const rarityValue = { common: 10, uncommon: 30, magic: 90, rare: 270, legendary: 810, immortal: 2430 };
export class EconomyManager {
  constructor({ stateManager } = {}) { this.stateManager = stateManager; }
  getSellValue(item) { return rarityValue[item?.rarity] ?? 10; }
  sell(uid) { const inventory=this.stateManager.get('inventory'); const item=inventory.items.find(entry=>entry.uid===uid); if(!item) return {sold:false,reason:'not-found'}; const value=this.getSellValue(item)*item.quantity; inventory.items=inventory.items.filter(entry=>entry.uid!==uid); this.stateManager.batch('sell-item',[{path:'inventory',value:inventory},{path:'player.gold',value:this.stateManager.get('player.gold')+value}]); return {sold:true,value,item}; }
}
