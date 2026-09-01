const assert = require('assert');
const { createSandbox, loadScripts } = require('./unit-helpers');

const sandbox = createSandbox();
loadScripts(sandbox, [
  'modules/00-utils-config.js',
  'modules/05-calendar.js',
  'modules/07-vault.js',
  'modules/11-tasks.js',
  'modules/16-hubframe.js',
]);

const Hub = sandbox.window.Hub;
assert.ok(Hub, 'window.Hub namespace should exist');
console.log('  ✅ window.Hub exists');

// --- tasks bridge ---
assert.ok(Array.isArray(Hub.tasks), 'Hub.tasks should always return an array');
Hub.tasks = [{ id: 'task-hub-1', title: 'Hub namespace task', project: 'Tests', status: 'todo', priority: 'normal', ts: 1 }];
assert.strictEqual(Hub.tasks.length, 1, 'Hub.tasks setter should update the TASKS binding');
assert.strictEqual(sandbox.window.TASKS.length, 1, 'Hub.tasks setter should keep window.TASKS in sync');
assert.strictEqual(Hub.tasks[0].title, 'Hub namespace task');
console.log('  ✅ Hub.tasks bridge');

// --- events bridge ---
assert.ok(Array.isArray(Hub.events), 'Hub.events should return an array after calendar module loads');
Hub.events = [{ id: 'hub-event-1', title: 'Hub namespace event', type: 'deadline', date: sandbox.todayStr(), color: '#ff6b6b', fired: [] }];
assert.strictEqual(Hub.events.length, 1, 'Hub.events setter should update EVENTS binding');
assert.ok(sandbox.getAllEvents().some(e => e.id === 'hub-event-1'), 'calendar helpers should see Hub.events updates');
console.log('  ✅ Hub.events bridge');

// --- brain/theme/ui accessors from utils module ---
assert.ok(Hub.brain, 'Hub.brain should expose current brain config');
Hub.brain = { name: 'Namespace Marciale', profile: 'marciale', prefix: 'test', suffix: '', memories: '', skills: '', injectMemories: false, injectSkills: false };
assert.strictEqual(Hub.brain.name, 'Namespace Marciale');
assert.strictEqual(Hub.brain.profile, 'marciale');
assert.ok(Hub.theme, 'Hub.theme should expose theme state');
assert.ok(Hub.ui, 'Hub.ui should expose UI state');
console.log('  ✅ Hub brain/theme/ui accessors');

// --- status/accessory helpers ---
assert.ok(Hub.vault && Array.isArray(Hub.vault.sites) && Hub.vault.sites.length === 0, 'Hub.vault should expose locked/empty vault state');
assert.strictEqual(Hub.vaultUnlocked, false, 'Hub.vaultUnlocked should be false before unlocking');
assert.strictEqual(Hub.ollamaOnline, false, 'Hub.ollamaOnline should be false before assistant module sets online state');
assert.ok(Number.isInteger(Hub.storageKB), 'Hub.storageKB should expose storage usage');
Hub.logError('hub-namespace-test', new Error('namespace error'));
assert.ok(Hub.errors.some(e => e.context === 'hub-namespace-test'), 'Hub.errors should expose logged errors');
Hub.clearErrors();
assert.strictEqual(Hub.errors.length, 0, 'Hub.clearErrors should clear error log');
console.log('  ✅ Hub status/error helpers');

// --- HubFrame ---
assert.ok(typeof sandbox.window.HubFrame === 'function', 'HubFrame class should be exposed');
const testContainer = sandbox.document.createElement('div');
testContainer.id = 'hubframe-test';
sandbox.document.body.appendChild(testContainer);
const frame = new sandbox.window.HubFrame(testContainer, {
  id: 'testFrame', src: 'about:blank', title: 'Test Frame', subtitle: 'unit test',
  reloadable: true, closable: true
});
assert.strictEqual(sandbox.document.getElementById('testFrame').tagName, 'IFRAME', 'HubFrame should create an iframe with the given id');
assert.ok(testContainer.querySelector('.hub-frame-head'), 'HubFrame should render a header');
assert.ok(testContainer.querySelector('[data-hubframe-reload]'), 'HubFrame should render a reload button');
assert.ok(testContainer.querySelector('[data-hubframe-close]'), 'HubFrame should render a close button');
assert.ok(testContainer.querySelector('[data-hubframe-status]'), 'HubFrame should render a status footer');
frame.destroy();
assert.strictEqual(testContainer.innerHTML, '', 'HubFrame.destroy should clean up');
console.log('  ✅ HubFrame component');

// --- Build 44: Persistent Memory (Claude-Mem Pattern) ---
const memSandbox = createSandbox();
loadScripts(memSandbox, [
  'modules/00-storage.js',
  'modules/00-utils-config.js',
  'modules/08-assistant.js'
]);

assert.ok(typeof memSandbox.window.savePersistentMemory === 'function', 'savePersistentMemory should be exposed');
const mem1 = memSandbox.window.savePersistentMemory('User requires 5.7h caffeine half-life decay modeling', 'caffeine', 5);
assert.ok(mem1 && mem1.id, 'savePersistentMemory should return created memory object');
assert.strictEqual(mem1.topic, 'caffeine');

const mem2 = memSandbox.window.savePersistentMemory('Companion RPG must throttle to 5 FPS in background tabs', 'power', 4);
const allMems = memSandbox.window.loadPersistentMemories();
assert.strictEqual(allMems.length, 2, 'loadPersistentMemories should return all saved memories');

const promptBlock = memSandbox.window.persistentMemoryPromptBlock();
assert.ok(promptBlock.includes('CAFFEINE'), 'prompt block should format topic');
assert.ok(promptBlock.includes('5.7h caffeine half-life'), 'prompt block should contain fact');

memSandbox.window.removePersistentMemory(mem1.id);
assert.strictEqual(memSandbox.window.loadPersistentMemories().length, 1, 'removePersistentMemory should delete specified memory');
console.log('  ✅ Persistent Memory (Claude-Mem Pattern) verified');

// --- Build 45: Code-Aware Tool & Payload Compressor (Headroom Pattern) ---
assert.ok(typeof memSandbox.window.compressPayload === 'function', 'compressPayload should be exposed');
const samplePayload = {
  active: true,
  emptyArray: [],
  nullField: null,
  emptyString: '',
  data: { valid: 'test', redundant: null },
  comments: '/* remove this comment */ function test() {\n  // another comment\n  return 42;\n}'
};

const compressed = memSandbox.window.compressPayload(samplePayload);
assert.ok(!compressed.includes('nullField'), 'compressPayload should prune null keys');
assert.ok(!compressed.includes('emptyArray'), 'compressPayload should prune empty arrays');
assert.ok(compressed.includes('valid'), 'compressPayload should retain valid data');

const metrics = memSandbox.window.calculateCompressionMetrics(samplePayload, compressed);
assert.ok(metrics.tokenSavingsPct > 0, 'compression metrics should report positive token savings');
console.log(`  ✅ Code-Aware Token Compressor (Headroom Pattern) verified (${metrics.tokenSavingsPct}% savings)`);

console.log('✅ Hub namespace unit tests passed');
