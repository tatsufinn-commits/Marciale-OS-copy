import test from 'node:test';
import assert from 'node:assert/strict';
import { AchievementSystem } from '../src/systems/AchievementSystem.js';
import { EventBus, Events } from '../src/core/EventBus.js';

class MockStateManager {
  constructor() {
    this.data = {
      player: { gold: 100 },
      achievements: { list: [] }
    };
  }
  get(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], this.data);
  }
  set(path, value) {
    const keys = path.split('.');
    let target = this.data;
    while (keys.length > 1) {
      const k = keys.shift();
      target[k] = target[k] || {};
      target = target[k];
    }
    target[keys[0]] = value;
  }
  update(path, updater) {
    const current = this.get(path);
    const updated = updater(current);
    this.set(path, updated);
    return updated;
  }
}

test('AchievementSystem tracks progress and unlocks trophies with gold reward', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();
  const templates = [
    {
      id: 'ach-first-kill',
      category: 'combat',
      title: 'First Kill',
      description: 'Kill 1 monster',
      icon: '⚔️',
      targetType: 'monster_killed',
      targetCount: 1,
      rewards: { gold: 75 }
    }
  ];

  let unlockedEmitted = false;
  eventBus.on(Events.ACHIEVEMENT_UNLOCKED, ({ achievement }) => {
    if (achievement.id === 'ach-first-kill') unlockedEmitted = true;
  });

  const achSystem = new AchievementSystem({
    stateManager,
    eventBus,
    events: Events,
    achievementTemplates: templates
  });

  const list = achSystem.getAchievements();
  assert.equal(list.length, 1);
  assert.equal(list[0].unlocked, false);

  // Kill 1 monster -> unlocks achievement
  const unlocked = achSystem.updateProgress('monster_killed', 1);
  assert.equal(unlocked.length, 1);
  assert.equal(unlocked[0].unlocked, true);
  assert.equal(unlockedEmitted, true);
  assert.equal(stateManager.get('player.gold'), 175, 'Achievement reward gold should be added');
});

test('AchievementSystem tracks absolute level thresholds and filters by category', () => {
  const stateManager = new MockStateManager();
  const templates = [
    { id: 'ach-lvl-5', category: 'progression', targetType: 'weaver_level', targetCount: 5, rewards: { gold: 200 } },
    { id: 'ach-combat', category: 'combat', targetType: 'monster_killed', targetCount: 10 }
  ];

  const achSystem = new AchievementSystem({
    stateManager,
    achievementTemplates: templates
  });

  assert.equal(achSystem.getAchievements('progression').length, 1);
  assert.equal(achSystem.getAchievements('combat').length, 1);

  // Level 3 -> progress 3, not unlocked
  achSystem.setProgressAbsolute('weaver_level', 3);
  assert.equal(achSystem.getAchievements('progression')[0].unlocked, false);

  // Level 5 -> unlocked
  achSystem.setProgressAbsolute('weaver_level', 5);
  assert.equal(achSystem.getAchievements('progression')[0].unlocked, true);
  assert.equal(stateManager.get('player.gold'), 300);
});
