/**
 * Companion Affinities Data — Build 24 / Build 52 Relationship & Bond Milestones
 * Sourced directly from Gamecompanion/content/03-NPC-BIBLE.md.
 */
export const companionAffinities = {
  vaela: {
    id: 'vaela',
    name: 'Vaela',
    title: 'The Echo Channeler',
    avatar: '🧝‍♀️',
    description: 'Half-elven magic channeler seeking a place to belong.',
    milestones: [
      { threshold: 25, tier: 'Companion', buff: '+5% Critical Strike Chance', stat: 'critChance', bonus: 0.05 },
      { threshold: 50, tier: 'Trusted Ally', buff: '+10% Magic Damage', stat: 'magicDamage', bonus: 0.10 },
      { threshold: 75, tier: 'Soulbound Family', buff: 'Vaela’s Amulet unlocked & +15% Cast Speed', stat: 'castSpeed', bonus: 0.15 }
    ]
  },
  kaelen: {
    id: 'kaelen',
    name: 'Kaelen',
    title: 'Vanguard Knight',
    avatar: '🛡️',
    description: 'Fierce guardian protecting the party from frontline assaults.',
    milestones: [
      { threshold: 25, tier: 'Shield Brother', buff: '+10% Physical Armor', stat: 'armor', bonus: 5 },
      { threshold: 50, tier: 'Trusted Ally', buff: '+15% Maximum Health', stat: 'maxHp', bonus: 25 },
      { threshold: 75, tier: 'Oathbound', buff: 'Kaelen’s Oathblade unlocked & +20% Mitigation', stat: 'mitigation', bonus: 0.20 }
    ]
  },
  sera: {
    id: 'sera',
    name: 'Sera',
    title: 'Echo Scholar',
    avatar: '📖',
    description: 'Ancient Weaver scholar uncovering lost dimensional secrets.',
    milestones: [
      { threshold: 25, tier: 'Research Partner', buff: '+10% Mana Recovery', stat: 'manaRegen', bonus: 0.10 },
      { threshold: 50, tier: 'Trusted Ally', buff: '+15% Crafting Quality', stat: 'craftBonus', bonus: 0.15 },
      { threshold: 75, tier: 'Soulbound Scholar', buff: 'Sera’s Lens unlocked & +20% XP Gain', stat: 'xpMultiplier', bonus: 0.20 }
    ]
  }
};
