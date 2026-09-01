import test from 'node:test';
import assert from 'node:assert/strict';
import { StateManager } from '../src/core/StateManager.js';
import { SaveManager, SAVE_SCHEMA_VERSION } from '../src/core/SaveManager.js';

class MemoryStore { constructor() { this.data = new Map(); } async get(key) { return this.data.get(key); } async put(value, key) { this.data.set(key, structuredClone(value)); } async delete(key) { this.data.delete(key); } }
const makeState = () => new StateManager(() => ({ version: '0.0.0.3', totalPlayTime: 10, player: { gold: 12 }, settings: {}, flags: {} }));

test('save and load round trip preserves game state', async () => {
  const store = new MemoryStore(); const manager = new SaveManager(makeState(), { store, now: () => 1000 }); await manager.init();
  await manager.save('test'); const loaded = await manager.load();
  assert.equal(loaded.timestamp, 1000); assert.equal(loaded.state.player.gold, 12); assert.equal(loaded.schemaVersion, SAVE_SCHEMA_VERSION);
});
test('corrupt saves are rejected', async () => {
  const store = new MemoryStore(); const manager = new SaveManager(makeState(), { store }); await manager.init();
  await store.put({ schemaVersion: 3, timestamp: 1, state: { player: { gold: 99 } }, checksum: 'wrong' }, 'main');
  await assert.rejects(manager.load(), /integrity/i);
});
test('old schema saves migrate forward', async () => {
  const store = new MemoryStore(); const manager = new SaveManager(makeState(), { store }); await manager.init();
  const oldState = { version: '0.0.0.1', totalPlayTime: 0, player: { gold: 1 } }; const checksum = manager._checksum(oldState);
  await store.put({ schemaVersion: 1, timestamp: 1, state: oldState, checksum }, 'main'); const loaded = await manager.load();
  assert.equal(loaded.schemaVersion, 3); assert.equal(loaded.state.settings.reducedMotion, false); assert.deepEqual(loaded.state.flags, {});
});
test('offline rewards cap elapsed time at eight hours and grant only gold and XP', () => {
  const manager = new SaveManager(makeState(), { store: new MemoryStore(), now: () => 10 * 60 * 60 * 1000 });
  const result = manager.calculateOfflineRewards(0); assert.equal(result.cappedSeconds, 8 * 60 * 60); assert.equal(result.gold, 5760); assert.equal(result.xp, 2880); assert.equal(result.deferredToBuild20, false);
});
