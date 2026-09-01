/**
 * AttunementSystem — Build 56 / Aetherweave Build 28
 * Single authority on Attunement Point Economy, Node Investments, Branch Masteries & Stat Derivation.
 */
export class AttunementSystem {
  constructor({ stateManager, eventBus, events, branches = [] } = {}) {
    this.stateManager = stateManager;
    this.eventBus = eventBus;
    this.events = events;
    this.branches = branches;

    this._initAttunementState();
    this._bindEvents();
  }

  _initAttunementState() {
    if (!this.stateManager) return;
    const current = this.stateManager.get('player.attunements');
    if (!current || typeof current !== 'object') {
      const initial = {
        availablePoints: 0,
        totalPointsEarned: 0,
        investedPoints: 0,
        nodes: {},
        masteredBranches: []
      };
      this.stateManager.set('player.attunements', initial, { source: 'attunement_init' });
    }
  }

  _bindEvents() {
    if (!this.eventBus || !this.events) return;

    this.eventBus.on(this.events.WEAVER_LEVEL_UP, (payload) => {
      const level = Number(payload?.level) || 2;
      this.grantLevelPoints(level);
    });
  }

  grantLevelPoints(level = 2) {
    if (!this.stateManager) return 0;
    const pts = 1 + Math.floor(level / 5);
    const current = this.stateManager.get('player.attunements') || { availablePoints: 0, totalPointsEarned: 0 };
    const newAvailable = (current.availablePoints || 0) + pts;
    const newTotal = (current.totalPointsEarned || 0) + pts;

    this.stateManager.update('player.attunements', (att) => ({
      ...att,
      availablePoints: newAvailable,
      totalPointsEarned: newTotal
    }), { source: 'level_up_attunement_grant' });

    if (this.eventBus && this.events?.ATTUNEMENT_POINT_EARNED) {
      this.eventBus.emit(this.events.ATTUNEMENT_POINT_EARNED, { points: pts, totalAvailable: newAvailable, level });
    }
    return pts;
  }

  getAvailablePoints() {
    return Number(this.stateManager?.get('player.attunements.availablePoints')) || 0;
  }

  getNodeRank(nodeId) {
    const nodes = this.stateManager?.get('player.attunements.nodes') || {};
    return Number(nodes[nodeId]?.rank) || 0;
  }

  findNode(nodeId) {
    for (const branch of this.branches) {
      const n = branch.nodes.find(item => item.id === nodeId);
      if (n) return { node: n, branch };
    }
    return null;
  }

  investNode(nodeId, heroLevel = 1) {
    if (!this.stateManager) return { success: false, reason: 'NO_STATE_MANAGER' };
    const lookup = this.findNode(nodeId);
    if (!lookup) return { success: false, reason: 'NODE_NOT_FOUND' };

    const { node, branch } = lookup;
    const att = this.stateManager.get('player.attunements') || { availablePoints: 0, nodes: {}, masteredBranches: [] };
    const currentRank = Number(att.nodes?.[nodeId]?.rank) || 0;

    // G2: Points check
    if ((att.availablePoints || 0) < node.costPerRank) {
      return { success: false, reason: 'INSUFFICIENT_POINTS' };
    }

    // G3: Max rank check
    if (currentRank >= node.maxRank) {
      return { success: false, reason: 'MAX_RANK_REACHED' };
    }

    // G5: Hero level gate
    if (heroLevel < node.requiredHeroLevel) {
      return { success: false, reason: 'HERO_LEVEL_TOO_LOW' };
    }

    // G4: Parent requirements check
    if (node.parentRequirements && node.parentRequirements.length > 0) {
      for (const pid of node.parentRequirements) {
        const pRank = Number(att.nodes?.[pid]?.rank) || 0;
        if (pRank < 1) {
          return { success: false, reason: 'PREREQUISITE_NOT_MET' };
        }
      }
    }

    // Apply investment
    const updatedNodes = { ...(att.nodes || {}) };
    const newRank = currentRank + 1;
    updatedNodes[nodeId] = { rank: newRank, maxRank: node.maxRank };

    const newAvailable = att.availablePoints - node.costPerRank;
    const newInvested = (att.investedPoints || 0) + node.costPerRank;

    // Check branch mastery capstone
    const mastered = [...(att.masteredBranches || [])];
    let branchMasteredNow = false;
    let totalBranchPoints = 0;
    branch.nodes.forEach(bn => {
      const r = Number(updatedNodes[bn.id]?.rank) || 0;
      totalBranchPoints += r * bn.costPerRank;
    });

    if (totalBranchPoints >= branch.capstone.pointsRequired && !mastered.includes(branch.id)) {
      mastered.push(branch.id);
      branchMasteredNow = true;
    }

    this.stateManager.set('player.attunements', {
      ...att,
      availablePoints: newAvailable,
      investedPoints: newInvested,
      nodes: updatedNodes,
      masteredBranches: mastered
    }, { source: 'attunement_invest' });

    if (this.eventBus && this.events?.ATTUNEMENT_NODE_RANKED) {
      this.eventBus.emit(this.events.ATTUNEMENT_NODE_RANKED, {
        nodeId,
        nodeName: node.name,
        rank: newRank,
        branchId: branch.id
      });
    }

    if (branchMasteredNow && this.eventBus && this.events?.ATTUNEMENT_BRANCH_MASTERED) {
      this.eventBus.emit(this.events.ATTUNEMENT_BRANCH_MASTERED, {
        branchId: branch.id,
        capstone: branch.capstone
      });
    }

    return { success: true, rank: newRank, branchMastered: branchMasteredNow };
  }

  /**
   * G7 — Combat lock: respec is forbidden while a fight is live or a skill
   * is still on cooldown. Mid-combat respec drops maxHp/armor under an
   * in-flight hit and corrupts save + CanvasRenderer particle math.
   * Must not mutate attunement or combat state on reject.
   */
  _isCombatRespecLocked() {
    const combat = this.stateManager?.get('combat') || {};
    if (combat.state === 'fighting') return true;
    const enemies = Array.isArray(combat.enemies) ? combat.enemies : [];
    if (enemies.some((e) => e?.isAlive)) return true;
    const hero = combat.hero || {};
    if (Number(hero.attackCooldown) > 0) return true;
    return false;
  }

  respecAttunements() {
    if (!this.stateManager) return { success: false, pointsRefunded: 0, reason: 'NO_STATE_MANAGER' };

    // G7: reject in-combat / in-flight cooldown respec without mutating state
    if (this._isCombatRespecLocked()) {
      return { success: false, reason: 'COMBAT_ACTIVE', pointsRefunded: 0 };
    }

    const att = this.stateManager.get('player.attunements') || { availablePoints: 0, investedPoints: 0 };
    const refunded = att.investedPoints || 0;
    const totalAvailable = (att.availablePoints || 0) + refunded;

    this.stateManager.set('player.attunements', {
      ...att,
      availablePoints: totalAvailable,
      investedPoints: 0,
      nodes: {},
      masteredBranches: []
    }, { source: 'attunement_respec' });

    return { success: true, pointsRefunded: refunded };
  }

  getAggregatedStats() {
    const stats = {};
    const att = this.stateManager?.get('player.attunements') || { nodes: {}, masteredBranches: [] };
    const nodes = att.nodes || {};
    const mastered = att.masteredBranches || [];

    // Accumulate node stats
    this.branches.forEach(branch => {
      branch.nodes.forEach(node => {
        const rank = Number(nodes[node.id]?.rank) || 0;
        if (rank > 0 && node.statsPerRank) {
          Object.entries(node.statsPerRank).forEach(([k, v]) => {
            stats[k] = (stats[k] || 0) + (v * rank);
          });
        }
      });

      // Accumulate capstone bonus
      if (mastered.includes(branch.id) && branch.capstone?.bonusStats) {
        Object.entries(branch.capstone.bonusStats).forEach(([k, v]) => {
          stats[k] = (stats[k] || 0) + v;
        });
      }
    });

    return stats;
  }

  getAllBranchStatus(heroLevel = 1) {
    const att = this.stateManager?.get('player.attunements') || { availablePoints: 0, nodes: {}, masteredBranches: [] };
    const nodes = att.nodes || {};
    const mastered = att.masteredBranches || [];
    const available = att.availablePoints || 0;

    return this.branches.map(branch => {
      let branchPoints = 0;
      const branchNodes = branch.nodes.map(node => {
        const rank = Number(nodes[node.id]?.rank) || 0;
        branchPoints += rank * node.costPerRank;

        let parentsSatisfied = true;
        if (node.parentRequirements && node.parentRequirements.length > 0) {
          parentsSatisfied = node.parentRequirements.every(pid => (Number(nodes[pid]?.rank) || 0) >= 1);
        }

        const levelSatisfied = heroLevel >= node.requiredHeroLevel;
        const canAfford = available >= node.costPerRank;
        const canUpgrade = rank < node.maxRank && parentsSatisfied && levelSatisfied && canAfford;

        return {
          ...node,
          currentRank: rank,
          isMaxRank: rank >= node.maxRank,
          parentsSatisfied,
          levelSatisfied,
          canUpgrade
        };
      });

      return {
        id: branch.id,
        name: branch.name,
        element: branch.element,
        description: branch.description,
        capstone: branch.capstone,
        isMastered: mastered.includes(branch.id),
        totalPointsInvested: branchPoints,
        nodes: branchNodes
      };
    });
  }
}
