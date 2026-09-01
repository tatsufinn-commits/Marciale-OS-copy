import test from 'node:test';
import assert from 'node:assert/strict';
import { StateManager } from '../src/core/StateManager.js';

test('get returns a safe snapshot', () => {
  const state = new StateManager(() => ({ player: { gold: 1 } }));
  const snapshot = state.get('player'); snapshot.gold = 99;
  assert.equal(state.get('player.gold'), 1);
});

test('set notifies a path subscriber with old and new values', () => {
  const state = new StateManager(() => ({ player: { gold: 1 } }));
  let received; state.subscribe('player.gold', (value, oldValue) => { received = { value, oldValue }; });
  state.set('player.gold', 25);
  assert.deepEqual(received, { value: 25, oldValue: 1 });
});

test('update and batch change state', () => {
  const state = new StateManager(() => ({ player: { gold: 1, mana: 2 } }));
  state.update('player.gold', (gold) => gold + 4);
  state.batch('reward', [{ path: 'player.mana', value: 10 }, { path: 'player.gold', updater: (gold) => gold + 5 }]);
  assert.deepEqual(state.get('player'), { gold: 10, mana: 10 });
});
