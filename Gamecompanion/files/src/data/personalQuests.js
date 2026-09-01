/**
 * Personal Quests Data — Build 54 / Aetherweave Build 26
 * Companion personal storyline chains gated by affinity.
 * Sourced from Gamecompanion/content/02-QUEST-BIBLE.md and 03-NPC-BIBLE.md.
 */

export const personalQuests = [
  {
    id: 'vaela-roots-of-belonging',
    companionId: 'vaela',
    companionName: 'Vaela',
    chainTitle: 'The Roots of Belonging',
    unlockAffinity: 25,
    relic: {
      itemId: 'vaela_amulet_of_belonging',
      name: "Vaela's Amulet of Belonging",
      slot: 'accessory1',
      rarity: 'legendary',
      description: 'A half-elf heritage pendant pulsing with arcane resilience. +15% Cast Speed, +10% Magic Damage.',
      stats: { castSpeed: 0.15, magicDamage: 0.10 }
    },
    steps: [
      { id: 'vaela-1', title: "Why I Don't Fit", targetType: 'monster_killed', targetCount: 15, rewards: { gold: 150, xp: 300 } },
      { id: 'vaela-2', title: 'The Telepathic Truth', targetType: 'chest_opened', targetCount: 3, rewards: { gold: 200, xp: 400 } },
      { id: 'vaela-3', title: 'The Half-Blood Village', targetType: 'stage_cleared', targetCount: 3, rewards: { gold: 300, xp: 500 } }
    ]
  },
  {
    id: 'kaelen-knights-redemption',
    companionId: 'kaelen',
    companionName: 'Kaelen',
    chainTitle: "The Knight's Redemption",
    unlockAffinity: 25,
    relic: {
      itemId: 'kaelen_oathblade',
      name: "Kaelen's Oathblade",
      slot: 'weapon',
      rarity: 'legendary',
      description: 'The blade of a fallen paladin, restored by true purpose. +35 Attack Power, +20% Physical Mitigation.',
      stats: { attackDamage: 35, mitigation: 0.20 }
    },
    steps: [
      { id: 'kaelen-1', title: 'The Broken Vow', targetType: 'elite_killed', targetCount: 20, rewards: { gold: 200, xp: 350 } },
      { id: 'kaelen-2', title: 'The Shield of the Fallen', targetType: 'stage_cleared', targetCount: 5, rewards: { gold: 300, xp: 500 } },
      { id: 'kaelen-3', title: 'The True Oath', targetType: 'hero_level', targetCount: 5, rewards: { gold: 400, xp: 600 } }
    ]
  },
  {
    id: 'sera-echo-seekers-truth',
    companionId: 'sera',
    companionName: 'Sera',
    chainTitle: "The Echo Seeker's Truth",
    unlockAffinity: 25,
    relic: {
      itemId: 'sera_echo_lens',
      name: "Sera's Echo Lens",
      slot: 'offhand',
      rarity: 'legendary',
      description: 'An Aether-attuned focusing lens that reveals hidden resonances. +25% XP Multiplier, +15% Mana Recovery.',
      stats: { xpMultiplier: 0.25, manaRegen: 0.15 }
    },
    steps: [
      { id: 'sera-1', title: 'The Forgotten Archive', targetType: 'chest_opened', targetCount: 4, rewards: { gold: 250, xp: 450 } },
      { id: 'sera-2', title: 'Resonating Runes', targetType: 'monster_killed', targetCount: 25, rewards: { gold: 350, xp: 600 } }
    ]
  }
];
