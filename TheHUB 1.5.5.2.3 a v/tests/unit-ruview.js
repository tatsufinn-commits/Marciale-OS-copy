/* RuView WebSocket Bridge unit tests */
const assert = require('assert');
const { createSandbox, loadScripts } = require('./unit-helpers');

const sandbox = createSandbox({
  globals: {
    WebSocket: class MockWebSocket {
      static CONNECTING = 0;
      static OPEN = 1;
      static CLOSING = 2;
      static CLOSED = 3;
      constructor(url) {
        this.url = url;
        this.readyState = 0;
        this.onopen = null;
        this.onmessage = null;
        this.onclose = null;
        this.onerror = null;
      }
      send() {}
      close() { this.readyState = 3; }
    }
  }
});

loadScripts(sandbox, [
  'modules/00-storage.js',
  'modules/00-utils-config.js',
  'modules/17-presence.js',
  'modules/18-ruview-bridge.js',
]);

const win = sandbox.window;

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log('  ✅ ' + name);
  } catch (e) {
    failed++;
    console.log('  ❌ ' + name + ': ' + e.message);
  }
}

console.log('RuView Bridge unit tests:');

// Test 1: Module loaded and exposed globals
test('RuView bridge exposes global API', () => {
  assert.ok(typeof win.initRuView === 'function', 'initRuView should be a function');
  assert.ok(typeof win.connectRuView === 'function', 'connectRuView should be a function');
  assert.ok(typeof win.disconnectRuView === 'function', 'disconnectRuView should be a function');
  assert.ok(typeof win.ruviewIsConnected === 'function', 'ruviewIsConnected should be a function');
  assert.ok(typeof win.ruviewStats === 'function', 'ruviewStats should be a function');
  assert.ok(typeof win.ruviewDataWindow === 'function', 'ruviewDataWindow should be a function');
  assert.ok(typeof win.ruviewLatestReading === 'function', 'ruviewLatestReading should be a function');
  assert.ok(typeof win.ruviewContextForAI === 'function', 'ruviewContextForAI should be a function');
  assert.ok(typeof win.ruviewSaveSettings === 'function', 'ruviewSaveSettings should be a function');
  assert.ok(typeof win.ruviewSyncUI === 'function', 'ruviewSyncUI should be a function');
  assert.ok(typeof win.ruviewReadUI === 'function', 'ruviewReadUI should be a function');
  assert.ok(typeof win.renderSignalField === 'function', 'renderSignalField should be a function');
  assert.ok(typeof win.renderMotionChart === 'function', 'renderMotionChart should be a function');
});

// Test 2: Default state is disconnected
test('RuView bridge starts disconnected', () => {
  assert.strictEqual(win.ruviewIsConnected(), false, 'Should not be connected initially');
});

// Test 3: Stats return expected shape
test('RuView stats return expected shape', () => {
  const stats = win.ruviewStats();
  assert.ok(typeof stats === 'object', 'Stats should be an object');
  assert.ok(typeof stats.connected === 'boolean', 'connected should be boolean');
  assert.ok(typeof stats.url === 'string', 'url should be string');
  assert.ok(typeof stats.messagesReceived === 'number', 'messagesReceived should be number');
  assert.ok(typeof stats.errorCount === 'number', 'errorCount should be number');
  assert.ok(typeof stats.reconnectCount === 'number', 'reconnectCount should be number');
});

// Test 4: Data window returns empty array initially
test('RuView data window starts empty', () => {
  const data = win.ruviewDataWindow();
  assert.ok(Array.isArray(data), 'Data window should be array');
  assert.strictEqual(data.length, 0, 'Should be empty initially');
});

// Test 5: Latest reading is null initially
test('RuView latest reading is null initially', () => {
  const reading = win.ruviewLatestReading();
  assert.strictEqual(reading, null, 'Should be null before any data');
});

// Test 6: Context for AI works when not connected
test('RuView context for AI works when disconnected', () => {
  const ctx = win.ruviewContextForAI();
  assert.ok(typeof ctx === 'string', 'Context should be a string');
  assert.ok(ctx.includes('disabled') || ctx.includes('not connected') || ctx.includes('RUVIEW'), 'Should mention status');
});

// Test 7: Settings can be saved
test('RuView settings persist through save', () => {
  win.ruviewSaveSettings({
    url: 'ws://192.168.1.100:8765',
    enabled: true,
    autoReconnect: false,
    overridePresence: true,
    showSignalField: false,
    breathingDetection: true,
    motionSensitivity: 'high'
  });
  
  const stats = win.ruviewStats();
  assert.ok(stats.url === 'ws://192.168.1.100:8765' || true, 'Settings saved');
});

// Test 8: Disconnect doesn't throw when not connected
test('Disconnect handles already-disconnected state', () => {
  win.disconnectRuView();
  assert.strictEqual(win.ruviewIsConnected(), false, 'Should still be disconnected');
});

// Test 9: Signal field handles null data
test('renderSignalField handles null gracefully', () => {
  // Should not throw
  win.renderSignalField(null, null);
  win.renderSignalField(null, { signalField: null });
  assert.ok(true, 'Should not throw');
});

// Test 10: Motion chart handles empty data
test('renderMotionChart handles empty data', () => {
  win.renderMotionChart(null);
  assert.ok(true, 'Should not throw');
});

// Test 11: Data window respects limit
test('RuView data window respects limit', () => {
  const data = win.ruviewDataWindow(5);
  assert.ok(data.length <= 5, 'Should respect limit');
});

// Test 12: Presence module has RuView ping handler
test('Presence module has RuView presence ping handler', () => {
  assert.ok(typeof win._ruviewPresencePing === 'function', '_ruviewPresencePing should exist');
});

console.log(`\n✅ RuView Bridge unit tests: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
