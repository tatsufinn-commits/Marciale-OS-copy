import test from 'node:test';
import assert from 'node:assert/strict';
import { DialogueSystem } from '../src/systems/DialogueSystem.js';
import { EventBus, Events } from '../src/core/EventBus.js';

class MockStateManager {
  constructor() {
    this.data = {
      player: { gold: 100 },
      affinity: { vaela: 10 }
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

test('DialogueSystem initializes branching dialogue and applies choice effects', () => {
  const stateManager = new MockStateManager();
  const eventBus = new EventBus();

  const sampleTrees = {
    'test_scene': {
      id: 'test_scene',
      title: 'Test Scene',
      initialNode: 'node_start',
      nodes: {
        'node_start': {
          id: 'node_start',
          speakerName: 'Vaela',
          text: 'Hello Weaver, will you assist us?',
          choices: [
            { text: 'Yes, with pleasure.', nextNode: 'node_yes', effects: { gold: 50, affinity: 5 } },
            { text: 'I am too busy.', nextNode: 'node_no', effects: { gold: 0 } }
          ]
        },
        'node_yes': {
          id: 'node_yes',
          speakerName: 'Vaela',
          text: 'Thank you so much!',
          choices: []
        },
        'node_no': {
          id: 'node_no',
          speakerName: 'Vaela',
          text: 'Understood...',
          choices: []
        }
      }
    }
  };

  let startedEmitted = false;
  let endedEmitted = false;
  eventBus.on(Events.DIALOGUE_STARTED, () => { startedEmitted = true; });
  eventBus.on(Events.DIALOGUE_ENDED, () => { endedEmitted = true; });

  const dialogue = new DialogueSystem({
    stateManager,
    eventBus,
    events: Events,
    dialogueTrees: sampleTrees
  });

  // 1. Start dialogue
  const firstNode = dialogue.startDialogue('test_scene');
  assert.equal(startedEmitted, true);
  assert.equal(firstNode.id, 'node_start');
  assert.equal(firstNode.choices.length, 2);
  assert.equal(dialogue.isActive(), true);

  // 2. Choose Option 0 (Yes -> +50G, +5 Affinity)
  const nextNode = dialogue.selectChoice(0);
  assert.equal(nextNode.id, 'node_yes');
  assert.equal(stateManager.get('player.gold'), 150, 'Gold reward should be granted');
  assert.equal(stateManager.get('affinity.vaela'), 15, 'Affinity should be increased');
  assert.equal(endedEmitted, true, 'Reaching terminal node should emit DIALOGUE_ENDED');
});
