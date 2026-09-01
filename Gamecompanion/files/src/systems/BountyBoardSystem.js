/**
 * BountyBoardSystem — Build 55 / Aetherweave Build 27
 * Single authority on Regional Monster Hunting Contracts, Guild Standing & Bounty Rewards.
 */
export class BountyBoardSystem {
  constructor({ stateManager, eventBus, events, bountyTemplates = [], rankTemplates = [] } = {}) {
    this.stateManager = stateManager;
    this.eventBus = eventBus;
    this.events = events;
    this.bountyTemplates = bountyTemplates;
    this.rankTemplates = rankTemplates;

    this._initBountyState();
    this._bindEvents();
  }

  _initBountyState() {
    if (!this.stateManager) return;
    const current = this.stateManager.get('bounties');
    if (!current || typeof current !== 'object') {
      const initial = {
        reputation: 0,
        currentRankId: this.rankTemplates[0]?.id || 'rank_novice',
        active: {},
        completed: []
      };
      this.stateManager.set('bounties', initial, { source: 'bounties_init' });
    }
  }

  _bindEvents() {
    if (!this.eventBus || !this.events) return;

    this.eventBus.on(this.events.MONSTER_KILLED, (payload) => {
      this.trackKill(payload);
    });

    this.eventBus.on(this.events.BOSS_DEFEATED, (payload) => {
      this.trackBossDefeated(payload);
    });
  }

  getReputation() {
    return Number(this.stateManager?.get('bounties.reputation')) || 0;
  }

  getGuildRank() {
    const rep = this.getReputation();
    let highestRank = this.rankTemplates[0] || { id: 'rank_novice', name: 'Novice Hunter', minRep: 0 };
    for (const rank of this.rankTemplates) {
      if (rep >= rank.minRep) {
        highestRank = rank;
      }
    }
    return highestRank;
  }

  getAvailableBounties(regionId = null) {
    const rep = this.getReputation();
    const active = this.stateManager?.get('bounties.active') || {};
    const completed = this.stateManager?.get('bounties.completed') || [];

    return this.bountyTemplates.filter(b => {
      if (regionId && b.regionId !== regionId) return false;
      if (completed.includes(b.id)) return false;
      return true;
    }).map(b => {
      const isActive = Boolean(active[b.id]);
      const progress = active[b.id]?.progress || 0;
      const isLocked = rep < (b.requiredRank || 0);
      return {
        ...b,
        isActive,
        isLocked,
        progress,
        isReadyToClaim: progress >= b.targetCount
      };
    });
  }

  acceptBounty(bountyId) {
    if (!this.stateManager) return false;
    const template = this.bountyTemplates.find(b => b.id === bountyId);
    if (!template) return false;

    const rep = this.getReputation();
    if (rep < (template.requiredRank || 0)) return false;

    const active = this.stateManager.get('bounties.active') || {};
    if (active[bountyId]) return true; // Already active

    active[bountyId] = {
      id: bountyId,
      progress: 0,
      targetCount: template.targetCount,
      completed: false,
      acceptedAt: Date.now()
    };

    this.stateManager.set('bounties.active', active, { source: 'bounty_accept' });

    if (this.eventBus && this.events?.BOUNTY_ACCEPTED) {
      this.eventBus.emit(this.events.BOUNTY_ACCEPTED, { bounty: template });
    }
    return true;
  }

  trackKill(payload = {}) {
    if (!this.stateManager) return [];
    const active = this.stateManager.get('bounties.active') || {};
    const tid = String(payload?.templateId || '').toLowerCase();
    const updatedBounties = [];
    let changed = false;

    this.bountyTemplates.forEach(template => {
      const record = active[template.id];
      if (!record || record.completed) return;

      const isElite = /elite|champion|warrior|boss|warden|guardian/.test(tid);
      let matches = false;

      if (template.targetType === 'monster_killed') {
        const pattern = new RegExp(template.targetPattern || '.*', 'i');
        matches = pattern.test(tid) || tid === '';
      } else if (template.targetType === 'elite_killed') {
        const pattern = new RegExp(template.targetPattern || '.*', 'i');
        matches = isElite && (pattern.test(tid) || tid === '');
      }

      if (matches) {
        record.progress = Math.min(template.targetCount, (record.progress || 0) + 1);
        changed = true;
        updatedBounties.push({ bounty: template, progress: record.progress, targetCount: template.targetCount });

        if (this.eventBus && this.events?.BOUNTY_PROGRESS) {
          this.eventBus.emit(this.events.BOUNTY_PROGRESS, {
            bountyId: template.id,
            progress: record.progress,
            targetCount: template.targetCount
          });
        }
      }
    });

    if (changed) {
      this.stateManager.set('bounties.active', active, { source: 'bounty_kill_track' });
    }
    return updatedBounties;
  }

  trackBossDefeated(payload = {}) {
    if (!this.stateManager) return [];
    const active = this.stateManager.get('bounties.active') || {};
    const tid = String(payload?.bossId || payload?.templateId || '').toLowerCase();
    const updated = [];
    let changed = false;

    this.bountyTemplates.forEach(template => {
      const record = active[template.id];
      if (!record || record.completed || template.targetType !== 'boss_defeated') return;

      const pattern = new RegExp(template.targetPattern || '.*', 'i');
      if (pattern.test(tid) || tid === '') {
        record.progress = Math.min(template.targetCount, (record.progress || 0) + 1);
        changed = true;
        updated.push({ bounty: template, progress: record.progress, targetCount: template.targetCount });

        if (this.eventBus && this.events?.BOUNTY_PROGRESS) {
          this.eventBus.emit(this.events.BOUNTY_PROGRESS, {
            bountyId: template.id,
            progress: record.progress,
            targetCount: template.targetCount
          });
        }
      }
    });

    if (changed) {
      this.stateManager.set('bounties.active', active, { source: 'bounty_boss_track' });
    }
    return updated;
  }

  claimBounty(bountyId) {
    if (!this.stateManager) return null;
    const template = this.bountyTemplates.find(b => b.id === bountyId);
    const active = this.stateManager.get('bounties.active') || {};
    const record = active[bountyId];
    if (!template || !record || record.progress < template.targetCount) return null;

    // Disburse gold
    const rewards = template.rewards || {};
    if (rewards.gold) {
      this.stateManager.update('player.gold', (g) => (g || 0) + rewards.gold, { source: 'bounty_reward' });
    }

    // Add Guild Reputation
    const addedRep = rewards.guildRep || 0;
    const prevRep = this.getReputation();
    const newRep = prevRep + addedRep;
    this.stateManager.set('bounties.reputation', newRep, { source: 'bounty_reputation' });

    // Mark completed
    delete active[bountyId];
    const completed = this.stateManager.get('bounties.completed') || [];
    if (!completed.includes(bountyId)) {
      completed.push(bountyId);
    }
    this.stateManager.set('bounties.active', active, { source: 'bounty_claim' });
    this.stateManager.set('bounties.completed', completed, { source: 'bounty_claim' });

    // Check rank promotion
    const prevRank = this._findRank(prevRep);
    const nextRank = this._findRank(newRep);
    if (nextRank.id !== prevRank.id) {
      this.stateManager.set('bounties.currentRankId', nextRank.id, { source: 'guild_rank_promotion' });
      if (this.eventBus && this.events?.GUILD_RANK_UNLOCKED) {
        this.eventBus.emit(this.events.GUILD_RANK_UNLOCKED, { rank: nextRank, prevRank });
      }
    }

    if (this.eventBus && this.events?.BOUNTY_COMPLETED) {
      this.eventBus.emit(this.events.BOUNTY_COMPLETED, { bounty: template, rewards });
    }

    return rewards;
  }

  _findRank(rep) {
    let current = this.rankTemplates[0] || { id: 'rank_novice', name: 'Novice Hunter', minRep: 0 };
    for (const rank of this.rankTemplates) {
      if (rep >= rank.minRep) {
        current = rank;
      }
    }
    return current;
  }
}
