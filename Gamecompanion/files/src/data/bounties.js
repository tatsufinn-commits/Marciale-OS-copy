/**
 * Regional Bounty Board & Monster Hunting Guilds Data — Build 55 / Aetherweave Build 27
 * Sourced from Gamecompanion/content/02-QUEST-BIBLE.md, 04-MONSTER-BIBLE.md, and 07-WORLD-PROGRESSION-BIBLE.md.
 */

export const guildRanks = [
  { id: 'rank_novice', name: 'Novice Hunter', minRep: 0, perk: 'Basic bounty board access' },
  { id: 'rank_hunter', name: 'Apprentice Hunter', minRep: 250, perk: '+10% Gold from hunting contracts' },
  { id: 'rank_tracker', name: 'Elite Tracker', minRep: 750, perk: '+15% XP from monster hunts' },
  { id: 'rank_veteran', name: 'Guild Veteran', minRep: 1500, perk: 'Access to high-tier boss bounties' },
  { id: 'rank_master', name: 'Master Slayer', minRep: 3000, perk: 'Unique Guild Master Crest & double material drops' }
];

export const bounties = [
  {
    id: 'bounty-fittoa-goblins',
    regionId: 'fittoa',
    regionName: 'Fittoa Outskirts',
    title: 'Goblin Raider Infestation',
    description: 'Rogue goblin bands have disrupted supply lines near Fittoa.',
    requiredRank: 0,
    targetType: 'monster_killed',
    targetPattern: 'goblin',
    targetCount: 10,
    rewards: { gold: 200, xp: 350, guildRep: 25, material: 'monster_hide' }
  },
  {
    id: 'bounty-fittoa-slime-purge',
    regionId: 'fittoa',
    regionName: 'Fittoa Outskirts',
    title: 'Acid Slime Containment',
    description: 'Corrosive slime puddles threaten farmland perimeters.',
    requiredRank: 0,
    targetType: 'monster_killed',
    targetPattern: 'slime',
    targetCount: 15,
    rewards: { gold: 250, xp: 400, guildRep: 30, material: 'aether_dust' }
  },
  {
    id: 'bounty-fittoa-thorn-warden',
    regionId: 'fittoa',
    regionName: 'Fittoa Outskirts',
    title: 'Warden of the Twisted Briar',
    description: 'Defeat the corrupted Briar Warden boss dominating the western thicket.',
    requiredRank: 250,
    targetType: 'boss_defeated',
    targetPattern: 'boss|warden',
    targetCount: 1,
    rewards: { gold: 600, xp: 900, guildRep: 75, material: 'soul_stone' }
  },
  {
    id: 'bounty-crystal-basilisk',
    regionId: 'crystal_expanse',
    regionName: 'Crystal Expanse',
    title: 'Petrifying Basilisk Hunt',
    description: 'Cull venomous basilisks roaming the fractured crystalline caves.',
    requiredRank: 250,
    targetType: 'monster_killed',
    targetPattern: 'basilisk|golem',
    targetCount: 8,
    rewards: { gold: 800, xp: 1200, guildRep: 60, material: 'mana_crystal' }
  },
  {
    id: 'bounty-crystal-elite-cull',
    regionId: 'crystal_expanse',
    regionName: 'Crystal Expanse',
    title: 'Orc Champion Suppression',
    description: 'Slay heavily armored orc champions scouting the outer perimeter.',
    requiredRank: 750,
    targetType: 'elite_killed',
    targetPattern: 'elite|champion|warrior',
    targetCount: 12,
    rewards: { gold: 1200, xp: 1800, guildRep: 100, material: 'magic_thread' }
  },
  {
    id: 'bounty-verdant-guardian',
    regionId: 'verdant_weave',
    regionName: 'Verdant Weave',
    title: 'Ancient Guardian Neutralization',
    description: 'Bring down the rogue Aetherial Guardian deep in the Verdant Core.',
    requiredRank: 1500,
    targetType: 'boss_defeated',
    targetPattern: 'guardian|dragon|boss',
    targetCount: 2,
    rewards: { gold: 2000, xp: 3000, guildRep: 150, material: 'loom_fragment' }
  }
];
