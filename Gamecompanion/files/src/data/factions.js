/**
 * Factions Data — Build 25 / Build 53 Faction Reputation & Guild Supply System
 * Sourced directly from Gamecompanion/content/02-QUEST-BIBLE.md Section V.
 */
export const factions = {
  loomguard: {
    id: 'loomguard',
    name: 'The Loomguard',
    title: 'Keepers of the World Weave',
    icon: '🛡️',
    description: 'The ancient order sworn to protect the dimensional fabric from Riftfall collapse.',
    ranks: [
      { name: 'Initiate', minRep: 0, perk: 'Basic Loomguard Supply Shop Access' },
      { name: 'Sentinel', minRep: 500, perk: '10% Gear Shop Discount & Loomguard Armor Unlock' },
      { name: 'Warden', minRep: 1000, perk: 'Exclusive Loomguard Barrier Skill (+10 Armor)' },
      { name: 'Champion', minRep: 2000, perk: 'Loomguard Signature Halberd (+25 Atk)' },
      { name: 'Paragon', minRep: 3000, perk: 'Title: Loomguard Veteran & Guardian Aura (+15% Mitigation)' }
    ]
  },
  unravelers: {
    id: 'unravelers',
    name: 'The Shadow Unravelers',
    title: 'Rift Dimension Strikers',
    icon: '🗡️',
    description: 'Outcast dimensional wanderers harnessing volatile rift anomalies.',
    ranks: [
      { name: 'Outcast', minRep: 0, perk: 'Black Market Crafting Materials Access' },
      { name: 'Infiltrator', minRep: 500, perk: '+10% Bonus Gold on Monster Kills' },
      { name: 'Shadowblade', minRep: 1000, perk: '+10% Critical Strike Chance' },
      { name: 'Riftwalker', minRep: 2000, perk: 'Void Step Passive (+15% Dodge Chance)' },
      { name: 'Anarch', minRep: 3000, perk: 'Title: Voidmaster & Anomaly Aura (+20% Crit Damage)' }
    ]
  }
};
