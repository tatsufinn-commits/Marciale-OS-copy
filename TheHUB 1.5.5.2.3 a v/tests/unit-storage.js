const assert = require('assert');
const vm = require('vm');
const { createSandbox, loadScripts } = require('./unit-helpers');

(async () => {
  const sandbox = createSandbox();
  loadScripts(sandbox, ['modules/00-storage.js', 'modules/00-utils-config.js']);

  const storage = sandbox.window.HubStorage;
  assert.ok(storage, 'HubStorage should be exposed on window');
  assert.strictEqual(typeof storage.init, 'function', 'HubStorage.init should exist');
  assert.strictEqual(typeof storage.get, 'function', 'HubStorage.get should exist');
  assert.strictEqual(typeof storage.set, 'function', 'HubStorage.set should exist');
  assert.strictEqual(typeof storage.mirrorLocalStorage, 'function', 'HubStorage.mirrorLocalStorage should exist');
  console.log('  ✅ HubStorage API');

  await storage.init();
  const estimate = await storage.estimate();
  assert.ok(['localStorage', 'indexedDB+localStorage'].includes(estimate.backend), 'HubStorage backend should be known');
  assert.strictEqual(typeof estimate.ready, 'boolean');
  assert.strictEqual(typeof estimate.failed, 'boolean');
  assert.strictEqual(typeof estimate.indexedDbKeys, 'number');
  console.log('  ✅ HubStorage estimate/fallback');

  // LS remains localStorage-first and synchronous. HubStorage mirroring must not
  // break normal app writes even when IndexedDB is unavailable in the test DOM.
  vm.runInContext("LS.set('hub.storage.unit', { ok: true, n: 1 });", sandbox);
  assert.strictEqual(vm.runInContext("JSON.stringify(LS.get('hub.storage.unit', null))", sandbox), JSON.stringify({ ok: true, n: 1 }));
  vm.runInContext("LS.remove('hub.storage.unit');", sandbox);
  assert.strictEqual(vm.runInContext("LS.get('hub.storage.unit', null)", sandbox), null);
  console.log('  ✅ LS localStorage-first behavior');

  assert.strictEqual(typeof sandbox.mirrorHubStorageToIndexedDB, 'function', 'mirror helper should exist');
  const mirrored = await sandbox.mirrorHubStorageToIndexedDB();
  assert.strictEqual(typeof mirrored, 'number', 'mirror helper should resolve to a count');
  assert.ok(sandbox.window.Hub, 'Hub namespace should exist');
  assert.ok(['localStorage', 'indexedDB+localStorage'].includes(sandbox.window.Hub.storageBackend), 'Hub.storageBackend should expose storage backend');
  assert.strictEqual(typeof sandbox.window.Hub.mirrorStorage, 'function', 'Hub.mirrorStorage should exist');
  console.log('  ✅ Hub storage bridge');

  console.log('✅ Storage foundation unit tests passed');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
