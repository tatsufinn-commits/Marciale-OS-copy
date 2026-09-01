/**
 * Quests Data — Build 21 Aetherweave / Mushoku Tensei Quest Definitions
 * Loaded externally per data-driven architecture.
 */
export const quests = [
  // --- Daily Quests ---
  {
    id: 'daily-rift-purge',
    type: 'daily',
    category: 'combat',
    title: 'Rift Purge',
    description: 'Defeat 10 Riftspawn enemies across any stage.',
    targetType: 'monster_killed',
    targetCount: 10,
    rewards: { gold: 200, xp: 400 }
  },
  {
    id: 'daily-chest-collector',
    type: 'daily',
    category: 'loot',
    title: 'Chest Collector',
    description: 'Open 2 treasure chests.',
    targetType: 'chest_opened',
    targetCount: 2,
    rewards: { gold: 150, xp: 300 }
  },
  {
    id: 'daily-stage-conqueror',
    type: 'daily',
    category: 'progression',
    title: 'Stage Conqueror',
    description: 'Clear 3 combat stages.',
    targetType: 'stage_cleared',
    targetCount: 3,
    rewards: { gold: 250, xp: 500 }
  },

  // --- Story Quests (Chapter 1: A New Thread) ---
  {
    id: 'story-first-breath',
    type: 'story',
    category: 'story',
    title: 'The First Breath',
    description: 'Begin your journey and defeat your first enemy.',
    targetType: 'monster_killed',
    targetCount: 1,
    rewards: { gold: 100, xp: 200, item: 'apprentice-staff' }
  },
  {
    id: 'story-weaves-whisper',
    type: 'story',
    category: 'story',
    title: "The Weave's Whisper",
    description: 'Clear the first 3 waves in Fittoa Outskirts.',
    targetType: 'wave_cleared',
    targetCount: 3,
    rewards: { gold: 150, xp: 350 }
  }
];
