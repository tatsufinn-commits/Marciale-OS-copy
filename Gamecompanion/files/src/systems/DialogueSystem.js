/**
 * DialogueSystem — Build 23 / Build 51 Branching Dialogue & Interactive Narrative Engine
 * Evaluates conversation trees, choice-based branches, and story rewards.
 */
export class DialogueSystem {
  constructor({ stateManager, eventBus, events, dialogueTrees = {} } = {}) {
    this.stateManager = stateManager;
    this.eventBus = eventBus;
    this.events = events;
    this.dialogueTrees = dialogueTrees;
    this._currentTree = null;
    this._currentNodeId = null;
    this._history = [];
  }

  startDialogue(treeId) {
    const tree = this.dialogueTrees[treeId];
    if (!tree) return null;

    this._currentTree = tree;
    this._currentNodeId = tree.initialNode;
    this._history = [this._currentNodeId];

    const node = this.getCurrentNode();
    if (this.eventBus && this.events?.DIALOGUE_STARTED) {
      this.eventBus.emit(this.events.DIALOGUE_STARTED, { treeId, node });
    }
    return node;
  }

  getCurrentNode() {
    if (!this._currentTree || !this._currentNodeId) return null;
    const node = this._currentTree.nodes[this._currentNodeId];
    if (!node) return null;
    return {
      treeId: this._currentTree.id,
      treeTitle: this._currentTree.title,
      ...node
    };
  }

  selectChoice(choiceIndex) {
    const currentNode = this.getCurrentNode();
    if (!currentNode || !currentNode.choices || !currentNode.choices[choiceIndex]) {
      return null;
    }

    const choice = currentNode.choices[choiceIndex];
    
    // Apply choice effects (e.g. gold, xp, affinity)
    if (choice.effects) {
      if (choice.effects.gold && this.stateManager) {
        this.stateManager.update('player.gold', (g) => (g || 0) + choice.effects.gold, { source: 'dialogue_reward' });
      }
      if (choice.effects.affinity && this.stateManager) {
        this.stateManager.update('affinity.vaela', (a) => (a || 0) + choice.effects.affinity, { source: 'dialogue_affinity' });
      }
    }

    if (this.eventBus && this.events?.DIALOGUE_CHOICE_SELECTED) {
      this.eventBus.emit(this.events.DIALOGUE_CHOICE_SELECTED, { choice, currentNode });
    }

    // Transition to next node
    this._currentNodeId = choice.nextNode;
    this._history.push(this._currentNodeId);

    const nextNode = this.getCurrentNode();
    if (!nextNode || !nextNode.choices || nextNode.choices.length === 0) {
      if (this.eventBus && this.events?.DIALOGUE_ENDED) {
        this.eventBus.emit(this.events.DIALOGUE_ENDED, { treeId: this._currentTree?.id, finalNode: nextNode });
      }
    }

    return nextNode;
  }

  endDialogue() {
    const finalNode = this.getCurrentNode();
    const treeId = this._currentTree?.id;
    this._currentTree = null;
    this._currentNodeId = null;

    if (this.eventBus && this.events?.DIALOGUE_ENDED) {
      this.eventBus.emit(this.events.DIALOGUE_ENDED, { treeId, finalNode });
    }
  }

  isActive() {
    return this._currentTree !== null && this._currentNodeId !== null;
  }
}
