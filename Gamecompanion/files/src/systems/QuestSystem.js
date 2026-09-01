/**
 * QuestSystem — Build 21 Quest Journal, Progress Tracking & Reward Distribution
 * Upgraded in Build 54 (Aetherweave Build 26) with Companion Personal Quest Storylines & Relic Disbursement.
 * Single authority on quest state, progress evaluation, daily rotation, and affinity-gated storylines.
 */
export class QuestSystem {
  constructor({ stateManager, eventBus, events, questTemplates = [], personalQuestTemplates = [], getAffinity = null } = {}) {
    this.stateManager = stateManager;
    this.eventBus = eventBus;
    this.events = events;
    this.questTemplates = questTemplates;
    this.personalQuestTemplates = personalQuestTemplates;
    this._getAffinity = getAffinity || ((id) => Number(this.stateManager?.get(`player.affinities.${id}`)) || 0);

    this._initQuestState();
    this._initPersonalQuestState();
    this._bindEvents();
  }

  _initQuestState() {
    if (!this.stateManager) return;
    const current = this.stateManager.get('quests.active');
    if (!current || !Array.isArray(current) || current.length === 0) {
      const initial = this.questTemplates.map(q => ({
        id: q.id,
        type: q.type,
        title: q.title,
        description: q.description,
        targetType: q.targetType,
        targetCount: q.targetCount,
        progress: 0,
        completed: false,
        rewards: q.rewards
      }));
      this.stateManager.set('quests.active', initial, { source: 'quest_init' });
    }
  }

  _initPersonalQuestState() {
    if (!this.stateManager) return;
    const current = this.stateManager.get('player.personalQuests');
    if (!current || typeof current !== 'object' || Array.isArray(current)) {
      const initial = {};
      this.personalQuestTemplates.forEach(chain => {
        initial[chain.id] = {
          id: chain.id,
          companionId: chain.companionId,
          companionName: chain.companionName,
          chainTitle: chain.chainTitle,
          unlockAffinity: chain.unlockAffinity,
          unlocked: false,
          active: false,
          completed: false,
          relicGranted: false,
          currentStepIndex: 0,
          steps: chain.steps.map(s => ({
            id: s.id,
            title: s.title,
            targetType: s.targetType,
            targetCount: s.targetCount,
            progress: 0,
            completed: false
          }))
        };
      });
      this.stateManager.set('player.personalQuests', initial, { source: 'personal_quest_init' });
    }
  }

  _bindEvents() {
    if (!this.eventBus || !this.events) return;

    this.eventBus.on(this.events.MONSTER_KILLED, (payload) => {
      this.updateProgress('monster_killed', 1);
      this.registerMonsterKill(payload);
    });

    this.eventBus.on(this.events.CHEST_OPENED, () => {
      this.updateProgress('chest_opened', 1);
      this.registerChestOpened();
    });

    this.eventBus.on(this.events.STAGE_CLEARED, () => {
      this.updateProgress('stage_cleared', 1);
      this.registerStageCleared();
    });

    this.eventBus.on(this.events.WAVE_CLEARED, () => {
      this.updateProgress('wave_cleared', 1);
    });

    this.eventBus.on(this.events.WEAVER_LEVEL_UP, (payload) => {
      this.registerHeroLevel(payload?.level);
    });

    this.eventBus.on(this.events.AFFINITY_CHANGED, () => {
      this.evaluatePersonalQuests();
    });
  }

  setAffinityProvider(fn) {
    this._getAffinity = fn || ((id) => Number(this.stateManager?.get(`player.affinities.${id}`)) || 0);
  }

  evaluatePersonalQuests() {
    if (!this.stateManager) return [];
    const chains = this.stateManager.get('player.personalQuests') || {};
    const newlyUnlocked = [];
    let changed = false;

    this.personalQuestTemplates.forEach(chain => {
      let record = chains[chain.id];
      if (!record) {
        record = {
          id: chain.id,
          companionId: chain.companionId,
          companionName: chain.companionName,
          chainTitle: chain.chainTitle,
          unlockAffinity: chain.unlockAffinity,
          unlocked: false,
          active: false,
          completed: false,
          relicGranted: false,
          currentStepIndex: 0,
          steps: chain.steps.map(s => ({
            id: s.id,
            title: s.title,
            targetType: s.targetType,
            targetCount: s.targetCount,
            progress: 0,
            completed: false
          }))
        };
        chains[chain.id] = record;
        changed = true;
      }

      if (record.unlocked || record.completed) return;
      const affinity = this._getAffinity(chain.companionId);
      if (affinity >= chain.unlockAffinity) {
        record.unlocked = true;
        record.active = true;
        changed = true;
        newlyUnlocked.push(chain);
      }
    });

    if (changed) {
      this.stateManager.set('player.personalQuests', chains, { source: 'personal_quest_unlock' });
    }
    return newlyUnlocked;
  }

  _isEliteTemplate(templateId = '') {
    const t = String(templateId).toLowerCase();
    return /elite|boss|warden|guardian|golem|minotaur|dragon|orc_elite|orc_warrior|forest_troll|phantom|mimic/.test(t);
  }

  registerMonsterKill(payload = {}) {
    const res = this.trackPersonalProgress('monster_killed', { templateId: payload?.templateId });
    if (this._isEliteTemplate(payload?.templateId)) {
      this.trackPersonalProgress('elite_killed', { templateId: payload?.templateId });
    }
    return res;
  }

  registerChestOpened() {
    return this.trackPersonalProgress('chest_opened');
  }

  registerStageCleared() {
    return this.trackPersonalProgress('stage_cleared');
  }

  registerHeroLevel(level = 1) {
    return this.trackPersonalProgress('hero_level', { level });
  }

  trackPersonalProgress(targetType, data = {}) {
    if (!this.stateManager) return [];
    const chains = this.stateManager.get('player.personalQuests') || {};
    const results = [];
    let changed = false;

    this.personalQuestTemplates.forEach(chain => {
      const record = chains[chain.id];
      if (!record || !record.unlocked || record.completed || !record.active) return;

      const stepIndex = record.currentStepIndex || 0;
      const stepTemplate = chain.steps[stepIndex];
      const stepRecord = record.steps?.[stepIndex];
      if (!stepTemplate || !stepRecord || stepRecord.completed) return;

      if (stepTemplate.targetType !== targetType) return;

      let progress = stepRecord.progress || 0;
      if (stepTemplate.targetType === 'hero_level') {
        if (Number(data.level || 0) >= stepTemplate.targetCount) {
          progress = stepTemplate.targetCount;
        } else {
          return;
        }
      } else {
        progress = Math.min(stepTemplate.targetCount, progress + (data.delta ?? 1));
      }

      stepRecord.progress = progress;
      const stepDone = progress >= stepTemplate.targetCount;
      stepRecord.completed = stepDone;
      changed = true;

      if (stepDone) {
        this._disburseStepReward(chain, stepTemplate);
        record.currentStepIndex = stepIndex + 1;

        if (record.currentStepIndex >= chain.steps.length) {
          record.completed = true;
          record.active = false;
          this._grantRelic(chain, record);
          results.push({ chain, step: stepTemplate, completed: true, chainCompleted: true, relic: chain.relic });
        } else {
          results.push({ chain, step: stepTemplate, completed: true, chainCompleted: false });
        }
      } else {
        results.push({ chain, step: stepTemplate, completed: false });
      }
    });

    if (changed) {
      this.stateManager.set('player.personalQuests', chains, { source: 'personal_quest_progress' });
    }
    return results;
  }

  _disburseStepReward(chain, step) {
    const rewards = step.rewards || {};
    if (rewards.gold) {
      this.stateManager?.update('player.gold', (g) => (g || 0) + rewards.gold, { source: 'personal_quest_reward' });
    }
    if (this.eventBus) {
      if (this.events?.PERSONAL_QUEST_PROGRESS) {
        this.eventBus.emit(this.events.PERSONAL_QUEST_PROGRESS, { chainId: chain.id, step, completed: true, rewards });
      }
    }
  }

  _grantRelic(chain, record) {
    if (record.relicGranted) return;
    record.relicGranted = true;
    if (this.eventBus && this.events?.PERSONAL_QUEST_CHAIN_COMPLETED) {
      this.eventBus.emit(this.events.PERSONAL_QUEST_CHAIN_COMPLETED, { chainId: chain.id, chain, relic: chain.relic });
    }
  }

  getPersonalQuests() {
    const chains = this.stateManager?.get('player.personalQuests') || {};
    return this.personalQuestTemplates.map(chain => {
      const record = chains[chain.id] || { steps: [], currentStepIndex: 0, unlocked: false, completed: false, relicGranted: false };
      return {
        id: chain.id,
        chainTitle: chain.chainTitle,
        companionId: chain.companionId,
        companionName: chain.companionName,
        unlockAffinity: chain.unlockAffinity,
        unlocked: !!record.unlocked,
        completed: !!record.completed,
        relicGranted: !!record.relicGranted,
        relic: chain.relic,
        currentStepIndex: record.currentStepIndex || 0,
        steps: chain.steps.map((s, i) => ({
          id: s.id,
          title: s.title,
          targetType: s.targetType,
          targetCount: s.targetCount,
          rewards: s.rewards,
          progress: record.steps?.[i]?.progress || 0,
          completed: !!record.steps?.[i]?.completed
        }))
      };
    });
  }

  getActiveQuests(type = null) {
    const list = this.stateManager?.get('quests.active') || [];
    if (!type) return list;
    return list.filter(q => q.type === type);
  }

  updateProgress(targetType, delta = 1) {
    if (!this.stateManager) return [];
    const quests = this.stateManager.get('quests.active') || [];
    const completedNow = [];

    const updated = quests.map(q => {
      if (q.completed || q.targetType !== targetType) return q;
      const progress = Math.min(q.targetCount, (q.progress || 0) + delta);
      const completed = progress >= q.targetCount;
      if (completed && !q.completed) {
        completedNow.push({ ...q, progress, completed });
      }
      return { ...q, progress, completed };
    });

    this.stateManager.set('quests.active', updated, { source: 'quest_progress' });

    completedNow.forEach(q => {
      this.claimReward(q.id);
    });

    return completedNow;
  }

  claimReward(questId) {
    const quests = this.stateManager?.get('quests.active') || [];
    const q = quests.find(item => item.id === questId);
    if (!q) return null;

    // Disburse gold
    if (q.rewards?.gold) {
      this.stateManager.update('player.gold', (g) => (g || 0) + q.rewards.gold, { source: 'quest_reward' });
    }

    if (this.eventBus && this.events?.QUEST_COMPLETED) {
      this.eventBus.emit(this.events.QUEST_COMPLETED, { quest: q });
    }

    return q.rewards;
  }
}
