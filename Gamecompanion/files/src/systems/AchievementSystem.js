/**
 * AchievementSystem — Build 22 / Build 50 Trophy Showcase & Stat Buff Authority
 * Automatically evaluates game events and unlocks trophies with permanent rewards.
 */
export class AchievementSystem {
  constructor({ stateManager, eventBus, events, achievementTemplates = [] } = {}) {
    this.stateManager = stateManager;
    this.eventBus = eventBus;
    this.events = events;
    this.achievementTemplates = achievementTemplates;
    this._initAchievementState();
    this._bindEvents();
  }

  _initAchievementState() {
    if (!this.stateManager) return;
    const current = this.stateManager.get('achievements.list');
    if (!current || !Array.isArray(current) || current.length === 0) {
      const initial = this.achievementTemplates.map(a => ({
        id: a.id,
        category: a.category,
        title: a.title,
        description: a.description,
        icon: a.icon,
        targetType: a.targetType,
        targetCount: a.targetCount,
        progress: 0,
        unlocked: false,
        unlockedAt: null,
        rewards: a.rewards
      }));
      this.stateManager.set('achievements.list', initial, { source: 'achievement_init' });
    }
  }

  _bindEvents() {
    if (!this.eventBus || !this.events) return;

    this.eventBus.on(this.events.MONSTER_KILLED, () => {
      this.updateProgress('monster_killed', 1);
    });

    this.eventBus.on(this.events.STAGE_CLEARED, () => {
      this.updateProgress('stage_cleared', 1);
    });

    this.eventBus.on(this.events.CHEST_OPENED, () => {
      this.updateProgress('chest_opened', 1);
    });

    this.eventBus.on(this.events.QUEST_COMPLETED, () => {
      this.updateProgress('quest_completed', 1);
    });

    this.eventBus.on(this.events.WEAVER_LEVEL_UP, (payload) => {
      const lvl = payload?.level || 1;
      this.setProgressAbsolute('weaver_level', lvl);
    });

    this.eventBus.on(this.events.GOLD_CHANGED, (payload) => {
      const gold = payload?.gold || (this.stateManager?.get('player.gold') || 0);
      this.setProgressAbsolute('gold_earned', gold);
    });
  }

  getAchievements(category = null) {
    const list = this.stateManager?.get('achievements.list') || [];
    if (!category) return list;
    return list.filter(a => a.category === category);
  }

  updateProgress(targetType, delta = 1) {
    if (!this.stateManager) return [];
    const list = this.stateManager.get('achievements.list') || [];
    const unlockedNow = [];

    const updated = list.map(a => {
      if (a.unlocked || a.targetType !== targetType) return a;
      const progress = Math.min(a.targetCount, (a.progress || 0) + delta);
      const unlocked = progress >= a.targetCount;
      if (unlocked && !a.unlocked) {
        unlockedNow.push({ ...a, progress, unlocked, unlockedAt: Date.now() });
        return { ...a, progress, unlocked, unlockedAt: Date.now() };
      }
      return { ...a, progress, unlocked };
    });

    this.stateManager.set('achievements.list', updated, { source: 'achievement_progress' });

    unlockedNow.forEach(a => {
      this.unlock(a);
    });

    return unlockedNow;
  }

  setProgressAbsolute(targetType, absoluteValue) {
    if (!this.stateManager) return [];
    const list = this.stateManager.get('achievements.list') || [];
    const unlockedNow = [];

    const updated = list.map(a => {
      if (a.unlocked || a.targetType !== targetType) return a;
      const progress = Math.min(a.targetCount, Math.max(a.progress || 0, Number(absoluteValue) || 0));
      const unlocked = progress >= a.targetCount;
      if (unlocked && !a.unlocked) {
        unlockedNow.push({ ...a, progress, unlocked, unlockedAt: Date.now() });
        return { ...a, progress, unlocked, unlockedAt: Date.now() };
      }
      return { ...a, progress, unlocked };
    });

    this.stateManager.set('achievements.list', updated, { source: 'achievement_progress' });

    unlockedNow.forEach(a => {
      this.unlock(a);
    });

    return unlockedNow;
  }

  unlock(achievement) {
    if (!achievement) return;

    // Disburse gold reward
    if (achievement.rewards?.gold) {
      this.stateManager?.update('player.gold', (g) => (g || 0) + achievement.rewards.gold, { source: 'achievement_reward' });
    }

    if (this.eventBus && this.events?.ACHIEVEMENT_UNLOCKED) {
      this.eventBus.emit(this.events.ACHIEVEMENT_UNLOCKED, { achievement });
    }
  }
}
