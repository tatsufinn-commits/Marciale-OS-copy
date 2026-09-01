/**
 * Attunement Skill Tree & Branching Talents Data — Build 56 / Aetherweave Build 28
 * 7 Canonical Magic Schools · 14 Talent Nodes · 7 Branch Masteries
 * Sourced from Gamecompanion/content/01-CONTENT-BIBLE.md & RFC-056.
 */

export const attunementBranches = [
  {
    id: 'water',
    name: '🌊 Tidal Weave',
    element: 'water',
    description: 'Mastery over fluid mana, cast speed acceleration, and oceanic surges.',
    capstone: {
      id: 'capstone_water',
      title: 'Tidecaller',
      pointsRequired: 4,
      bonusStats: { waterDamageMult: 0.20, manaRegen: 5 }
    },
    nodes: [
      {
        id: 'water_flow',
        name: 'Flowing Current',
        description: '+5% Cast Speed and +15 Max Mana per rank.',
        tier: 1,
        costPerRank: 1,
        maxRank: 3,
        requiredHeroLevel: 1,
        parentRequirements: [],
        statsPerRank: { castSpeed: 0.05, maxMana: 15 }
      },
      {
        id: 'water_surge',
        name: 'Tidal Surge',
        description: '+15% Water Damage and +5% Crit Chance per rank.',
        tier: 2,
        costPerRank: 2,
        maxRank: 3,
        requiredHeroLevel: 5,
        parentRequirements: ['water_flow'],
        statsPerRank: { waterDamageMult: 0.15, critChance: 0.05 }
      }
    ]
  },
  {
    id: 'earth',
    name: '🪨 Bedrock Bulwark',
    element: 'earth',
    description: 'Unyielding physical fortitude, stone armor, and tectonic shockwaves.',
    capstone: {
      id: 'capstone_earth',
      title: 'Mountainheart',
      pointsRequired: 4,
      bonusStats: { armor: 30, mitigation: 0.10 }
    },
    nodes: [
      {
        id: 'earth_skin',
        name: 'Granite Skin',
        description: '+10 Armor and +25 Max HP per rank.',
        tier: 1,
        costPerRank: 1,
        maxRank: 3,
        requiredHeroLevel: 1,
        parentRequirements: [],
        statsPerRank: { armor: 10, maxHp: 25 }
      },
      {
        id: 'earth_quakestrike',
        name: 'Tectonic Slam',
        description: '+15% Mitigation and +15 Attack Power per rank.',
        tier: 2,
        costPerRank: 2,
        maxRank: 3,
        requiredHeroLevel: 5,
        parentRequirements: ['earth_skin'],
        statsPerRank: { mitigation: 0.15, attackDamage: 15 }
      }
    ]
  },
  {
    id: 'fire',
    name: '🔥 Cinderheart',
    element: 'fire',
    description: 'Explosive raw offensive power, critical escalation, and burning aether.',
    capstone: {
      id: 'capstone_fire',
      title: 'Pyromancer',
      pointsRequired: 4,
      bonusStats: { attackDamage: 25, critChance: 0.10 }
    },
    nodes: [
      {
        id: 'fire_ignite',
        name: 'Blazing Spark',
        description: '+8 Attack Power and +4% Crit Chance per rank.',
        tier: 1,
        costPerRank: 1,
        maxRank: 3,
        requiredHeroLevel: 1,
        parentRequirements: [],
        statsPerRank: { attackDamage: 8, critChance: 0.04 }
      },
      {
        id: 'fire_inferno',
        name: 'Inferno Pulse',
        description: '+20% Fire Damage and +10% Attack Speed per rank.',
        tier: 2,
        costPerRank: 2,
        maxRank: 3,
        requiredHeroLevel: 5,
        parentRequirements: ['fire_ignite'],
        statsPerRank: { attackDamage: 18, attackSpeed: 0.10 }
      }
    ]
  },
  {
    id: 'wind',
    name: '🌪️ Zephyr Path',
    element: 'wind',
    description: 'Rapid movement, evasive wind currents, and precision strikes.',
    capstone: {
      id: 'capstone_wind',
      title: 'Stormrunner',
      pointsRequired: 4,
      bonusStats: { dodgeChance: 0.15, critDamage: 0.50 }
    },
    nodes: [
      {
        id: 'wind_gust',
        name: 'Tailwind Velocity',
        description: '+8% Attack Speed and +5% Dodge Chance per rank.',
        tier: 1,
        costPerRank: 1,
        maxRank: 3,
        requiredHeroLevel: 1,
        parentRequirements: [],
        statsPerRank: { attackSpeed: 0.08, dodgeChance: 0.05 }
      },
      {
        id: 'wind_cyclone',
        name: 'Cyclone Dance',
        description: '+12% Dodge and +25% Crit Damage per rank.',
        tier: 2,
        costPerRank: 2,
        maxRank: 3,
        requiredHeroLevel: 5,
        parentRequirements: ['wind_gust'],
        statsPerRank: { dodgeChance: 0.12, critDamage: 0.25 }
      }
    ]
  },
  {
    id: 'healing',
    name: '🌿 Verdant Font',
    element: 'healing',
    description: 'Restorative life threads, wound closure, and vitality regeneration.',
    capstone: {
      id: 'capstone_healing',
      title: 'Lifebinder',
      pointsRequired: 4,
      bonusStats: { maxHp: 50, healthRegen: 8 }
    },
    nodes: [
      {
        id: 'heal_bloom',
        name: 'Life Blossom',
        description: '+15 Max HP and +3 Health Regen per rank.',
        tier: 1,
        costPerRank: 1,
        maxRank: 3,
        requiredHeroLevel: 1,
        parentRequirements: [],
        statsPerRank: { maxHp: 15, healthRegen: 3 }
      },
      {
        id: 'heal_sanctuary',
        name: 'Aetherial Sanctuary',
        description: '+35 Max HP and +8% Magic Resistance per rank.',
        tier: 2,
        costPerRank: 2,
        maxRank: 3,
        requiredHeroLevel: 5,
        parentRequirements: ['heal_bloom'],
        statsPerRank: { maxHp: 35, magicResistance: 0.08 }
      }
    ]
  },
  {
    id: 'barrier',
    name: '🛡️ Aegis Ward',
    element: 'barrier',
    description: 'Prismatic shields, spell deflection, and absolute protective barriers.',
    capstone: {
      id: 'capstone_barrier',
      title: 'Bastion',
      pointsRequired: 4,
      bonusStats: { mitigation: 0.15, magicResistance: 0.15 }
    },
    nodes: [
      {
        id: 'barrier_shell',
        name: 'Prismatic Ward',
        description: '+8% Magic Resistance and +5% Mitigation per rank.',
        tier: 1,
        costPerRank: 1,
        maxRank: 3,
        requiredHeroLevel: 1,
        parentRequirements: [],
        statsPerRank: { magicResistance: 0.08, mitigation: 0.05 }
      },
      {
        id: 'barrier_bastion',
        name: 'Absolute Aegis',
        description: '+15% Mitigation and +20 Armor per rank.',
        tier: 2,
        costPerRank: 2,
        maxRank: 3,
        requiredHeroLevel: 5,
        parentRequirements: ['barrier_shell'],
        statsPerRank: { mitigation: 0.15, armor: 20 }
      }
    ]
  },
  {
    id: 'demon',
    name: '🌑 Void Communion',
    element: 'demon',
    description: 'Chaos attunement, lifesteal resonance, and abyssal piercing strikes.',
    capstone: {
      id: 'capstone_demon',
      title: 'Voidcaller',
      pointsRequired: 4,
      bonusStats: { attackDamage: 30, critChance: 0.08 }
    },
    nodes: [
      {
        id: 'void_shadow',
        name: 'Shadow Thread',
        description: '+10 Attack Power and +3% Lifesteal per rank.',
        tier: 1,
        costPerRank: 1,
        maxRank: 3,
        requiredHeroLevel: 1,
        parentRequirements: [],
        statsPerRank: { attackDamage: 10, critChance: 0.03 }
      },
      {
        id: 'void_rend',
        name: 'Abyssal Rift',
        description: '+25 Attack Power and +15% Crit Damage per rank.',
        tier: 2,
        costPerRank: 2,
        maxRank: 3,
        requiredHeroLevel: 5,
        parentRequirements: ['void_shadow'],
        statsPerRank: { attackDamage: 25, critDamage: 0.15 }
      }
    ]
  }
];
