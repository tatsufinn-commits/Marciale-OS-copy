/**
 * AffinitySystem — Build 24 / Build 52 Companion Relationship & Bond Meter Authority
 * Tracks companion affinity (0-100), unlocks relationship tiers, and grants passive stat buffs.
 */
export class AffinitySystem {
  constructor({ stateManager, eventBus, events, affinityTemplates = {} } = {}) {
    this.stateManager = stateManager;
    this.eventBus = eventBus;
    this.events = events;
    this.affinityTemplates = affinityTemplates;
    this._initAffinityState();
    this._bindEvents();
  }

  _initAffinityState() {
    if (!this.stateManager) return;
    const current = this.stateManager.get('player.affinities');
    if (!current || typeof current !== 'object') {
      const initial = {};
      Object.keys(this.affinityTemplates).forEach(id => {
        initial[id] = 10; // Base starting affinity
      });
      this.stateManager.set('player.affinities', initial, { source: 'affinity_init' });
    }
  }

  _bindEvents() {
    if (!this.eventBus || !this.events) return;

    this.eventBus.on(this.events.QUEST_COMPLETED, () => {
      // Completing any quest grants +5 affinity to all companions
      Object.keys(this.affinityTemplates).forEach(id => {
        this.addAffinity(id, 5);
      });
    });
  }

  getAffinity(companionId) {
    const map = this.stateManager?.get('player.affinities') || {};
    return Math.max(0, Math.min(100, Number(map[companionId]) || 0));
  }

  addAffinity(companionId, amount) {
    if (!companionId || !amount) return 0;
    const oldVal = this.getAffinity(companionId);
    const newVal = Math.max(0, Math.min(100, oldVal + amount));

    this.stateManager?.update(`player.affinities.${companionId}`, () => newVal, { source: 'affinity_gain' });

    if (this.eventBus && this.events?.AFFINITY_CHANGED) {
      this.eventBus.emit(this.events.AFFINITY_CHANGED, { companionId, oldVal, newVal });
    }

    // Check for milestone transitions
    const template = this.affinityTemplates[companionId];
    if (template && template.milestones) {
      template.milestones.forEach(m => {
        if (oldVal < m.threshold && newVal >= m.threshold) {
          if (this.eventBus && this.events?.AFFINITY_MILESTONE) {
            this.eventBus.emit(this.events.AFFINITY_MILESTONE, { companionId, milestone: m });
          }
        }
      });
    }

    return newVal;
  }

  getBondTier(companionId) {
    const value = this.getAffinity(companionId);
    const template = this.affinityTemplates[companionId];
    if (!template || !template.milestones) return 'Acquaintance';

    const achieved = template.milestones.filter(m => value >= m.threshold);
    if (!achieved.length) return 'Acquaintance';
    return achieved[achieved.length - 1].tier;
  }

  getActivePassives() {
    const passives = [];
    Object.keys(this.affinityTemplates).forEach(id => {
      const value = this.getAffinity(id);
      const template = this.affinityTemplates[id];
      if (template && template.milestones) {
        template.milestones.forEach(m => {
          if (value >= m.threshold) {
            passives.push({ companionId: id, companionName: template.name, ...m });
          }
        });
      }
    });
    return passives;
  }

  getAllCompanionStatus() {
    return Object.keys(this.affinityTemplates).map(id => {
      const template = this.affinityTemplates[id];
      const affinity = this.getAffinity(id);
      const tier = this.getBondTier(id);
      return {
        id,
        name: template.name,
        title: template.title,
        avatar: template.avatar,
        description: template.description,
        affinity,
        tier,
        milestones: template.milestones
      };
    });
  }
}
