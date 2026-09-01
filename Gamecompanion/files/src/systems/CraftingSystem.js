/** Build 12 Magic Crafting Workshop: validates costs and routes output through inventory. */
export class CraftingSystem {
  constructor({ stateManager, inventorySystem, recipes = [] } = {}) { this.stateManager=stateManager; this.inventory=inventorySystem; this.recipes=new Map(recipes.map(r=>[r.id,r])); }
  craft(recipeId) { const recipe=this.recipes.get(recipeId); if(!recipe) return {crafted:false,reason:'unknown-recipe'}; const player=this.stateManager.get('player'); const cost=recipe.cost ?? {}; if((player.gold??0)<(cost.gold??0)||(player.manaDust??0)<(cost.manaDust??0)) return {crafted:false,reason:'insufficient-resources'}; const result=this.inventory.addItem(recipe.output.itemId,recipe.output.quantity); if(!result.added) return {crafted:false,reason:result.reason}; this.stateManager.batch('craft',[{path:'player.gold',value:player.gold-(cost.gold??0)},{path:'player.manaDust',value:(player.manaDust??0)-(cost.manaDust??0)}]); return {crafted:true,recipe,result}; }
}
