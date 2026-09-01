/**
 * FactionSystem — Build 25 / Build 53 Faction Reputation & Guild Supply Authority
 * Evaluates reputation tiers, unlocks guild ranks, and grants faction privileges.
 */
export class FactionSystem {
  constructor({ stateManager, eventBus, events, factionTemplates = {} } = {}) {
    this.stateManager = stateManager;
    this.eventBus = eventBus;
    this.events = events;
    this.factionTemplates = factionTemplates;
    this._initFactionState();
    this._bindEvents();
  }

  _initFactionState() {
    if (!this.stateManager) return;
    const current = this.stateManager.get('player.factions');
    if (!current || typeof current !== 'object') {
      const initial = {};
      Object.keys(this.factionTemplates).forEach(id => {
        initial[id] = 0; // Starting reputation
      });
      this.stateManager.set('player.factions', initial, { source: 'faction_init' });
    }
  }

  _bindEvents() {
    if (!this.eventBus || !this.events) return;

    this.eventBus.on(this.events.STAGE_CLEARED, () => {
      // Clearing a stage grants +25 Loomguard reputation
      this.addReputation('loomguard', 25);
    });

    this.eventBus.on(this.events.MONSTER_KILLED, () => {
      // Defeating monsters grants +5 Unraveler reputation
      this.addReputation('unravelers', 5);
    });
  }

  getReputation(factionId) {
    const map = this.stateManager?.get('player.factions') || {};
    return Math.max(0, Number(map[factionId]) || 0);
  }

  addReputation(factionId, amount) {
    if (!factionId || !amount) return 0;
    const oldRep = this.getReputation(factionId);
    const newRep = oldRep + Math.max(0, Number(amount) || 0);

    this.stateManager?.update(`player.factions.${factionId}`, () => newRep, { source: 'faction_rep_gain' });

    if (this.eventBus && this.events?.FACTION_REP_CHANGED) {
      this.eventBus.emit(this.events.FACTION_REP_CHANGED, { factionId, oldRep, newRep });
    }

    // Check for rank transitions
    const template = this.factionTemplates[factionId];
    if (template && template.ranks) {
      template.ranks.forEach(r => {
        if (oldRep < r.minRep && newRep >= r.minRep && r.minRep > 0) {
          if (this.eventBus && this.events?.FACTION_RANK_UNLOCKED) {
            this.eventBus.emit(this.events.FACTION_RANK_UNLOCKED, { factionId, rank: r });
          }
        }
      });
    }

    return newRep;
  }

  getRank(factionId) {
    const rep = this.getReputation(factionId);
    const template = this.factionTemplates[factionId];
    if (!template || !template.ranks) return { name: 'Neutral', perk: 'None' };

    const achieved = template.ranks.filter(r => rep >= r.minRep);
    if (!achieved.length) return template.ranks[0];
    return achieved[achieved.length - 1];
  }

  getAllFactions() {
    return Object.keys(this.factionTemplates).map(id => {
      const template = this.factionTemplates[id];
      const rep = this.getReputation(id);
      const currentRank = this.getRank(id);
      return {
        id,
        name: template.name,
        title: template.title,
        icon: template.icon,
        description: template.description,
        reputation: rep,
        currentRank: currentRank.name,
        perk: currentRank.perk,
        ranks: template.ranks
      };
    });
  }
}
