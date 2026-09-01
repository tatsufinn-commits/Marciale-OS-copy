/**
 * Achievements Data — Build 22 / Build 50 Trophy Showcase
 * Data-driven achievement definitions for Aetherweave / Mushoku Tensei companion RPG.
 */
export const achievements = [
  // --- Combat Trophies ---
  {
    id: 'ach-first-blood',
    category: 'combat',
    title: 'First Blood',
    description: 'Defeat your first enemy in combat.',
    icon: '⚔️',
    targetType: 'monster_killed',
    targetCount: 1,
    rewards: { gold: 100, title: 'Novice Fighter' }
  },
  {
    id: 'ach-monster-hunter',
    category: 'combat',
    title: 'Monster Hunter',
    description: 'Defeat 25 enemies in combat.',
    icon: '🏹',
    targetType: 'monster_killed',
    targetCount: 25,
    rewards: { gold: 350, title: 'Seasoned Hunter' }
  },
  {
    id: 'ach-rift-purifier',
    category: 'combat',
    title: 'Rift Purifier',
    description: 'Defeat 100 Riftspawn monsters.',
    icon: '🔥',
    targetType: 'monster_killed',
    targetCount: 100,
    rewards: { gold: 1000, title: 'Rift Purifier' }
  },

  // --- Exploration & Progression ---
  {
    id: 'ach-stage-clearer',
    category: 'progression',
    title: 'Trailblazer',
    description: 'Clear 5 stages in world progression.',
    icon: '🗺️',
    targetType: 'stage_cleared',
    targetCount: 5,
    rewards: { gold: 400, title: 'Trailblazer' }
  },
  {
    id: 'ach-peak-attunement',
    category: 'progression',
    title: 'Awakened Weaver',
    description: 'Reach Hero Level 5.',
    icon: '⚡',
    targetType: 'weaver_level',
    targetCount: 5,
    rewards: { gold: 500, title: 'Awakened' }
  },

  // --- Treasure & Economy ---
  {
    id: 'ach-chest-opener',
    category: 'economy',
    title: 'Treasure Seeker',
    description: 'Open 5 treasure chests.',
    icon: '🗝️',
    targetType: 'chest_opened',
    targetCount: 5,
    rewards: { gold: 300, title: 'Treasure Hunter' }
  },
  {
    id: 'ach-golden-hoard',
    category: 'economy',
    title: 'Golden Hoard',
    description: 'Accumulate 1,000 total Gold.',
    icon: '🪙',
    targetType: 'gold_earned',
    targetCount: 1000,
    rewards: { gold: 250, title: 'Prosperous' }
  },

  // --- Quests & Mastery ---
  {
    id: 'ach-quest-initiate',
    category: 'quests',
    title: 'Weaver’s Calling',
    description: 'Complete 3 quests in your journal.',
    icon: '📜',
    targetType: 'quest_completed',
    targetCount: 3,
    rewards: { gold: 500, title: 'Questmaster' }
  }
];
