/* Presence module unit tests */
const assert = require('assert');
const { createSandbox, loadScripts } = require('./unit-helpers');

const sandbox = createSandbox();
loadScripts(sandbox, [
  'modules/00-storage.js',
  'modules/00-utils-config.js',
  'modules/07-vault.js',
  'modules/17-presence.js',
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

console.log('Presence unit tests:');

// Test 1: Module loaded and exposed globals
test('Presence module exposes global API', () => {
  assert.ok(typeof win.initPresence === 'function', 'initPresence should be a function');
  assert.ok(typeof win.presenceStatus === 'function', 'presenceStatus should be a function');
  assert.ok(typeof win.presenceState === 'function', 'presenceState should be a function');
  assert.ok(typeof win.presenceHistory === 'function', 'presenceHistory should be a function');
  assert.ok(typeof win.presenceSummary === 'function', 'presenceSummary should be a function');
  assert.ok(typeof win.presenceContextForAI === 'function', 'presenceContextForAI should be a function');
  assert.ok(typeof win.renderPresenceCard === 'function', 'renderPresenceCard should be a function');
  assert.ok(typeof win.presenceSettings === 'function', 'presenceSettings should be a function');
});

// Test 2: Default settings structure
test('Presence settings have correct defaults', () => {
  const s = win.presenceSettings();
  assert.strictEqual(s.idleTimeoutSec, 300, 'Default idle timeout should be 300s');
  assert.strictEqual(s.awayTimeoutSec, 900, 'Default away timeout should be 900s');
  assert.strictEqual(s.trackInput, true, 'Input tracking should be enabled by default');
  assert.strictEqual(s.trackVisibility, true, 'Visibility tracking should be enabled by default');
  assert.strictEqual(s.awayLockVault, false, 'Vault auto-lock should be disabled by default');
  assert.strictEqual(s.awayPauseFocus, false, 'Focus pause should be disabled by default');
  assert.strictEqual(s.welcomeBackSummary, true, 'Welcome back toast should be enabled by default');
});

// Test 3: Disabled presence returns 'present'
test('Disabled presence returns present status', () => {
  const s = win.presenceSettings();
  s.enabled = false;
  win.savePresenceSettings(s);
  
  const status = win.presenceStatus();
  assert.strictEqual(status, 'present', 'Disabled presence should always return present');
});

// Test 4: Presence state returns expected shape
test('Presence state returns expected shape', () => {
  const state = win.presenceState();
  assert.ok(typeof state.status === 'string', 'status should be a string');
  assert.ok(typeof state.since === 'number', 'since should be a number');
  assert.ok(typeof state.lastInput === 'number', 'lastInput should be a number');
  assert.ok(typeof state.sessionStart === 'number', 'sessionStart should be a number');
  assert.ok(typeof state.secondsSinceInput === 'number', 'secondsSinceInput should be a number');
  assert.ok(typeof state.totalPresentToday === 'number', 'totalPresentToday should be a number');
});

// Test 5: Presence history returns array
test('Presence history returns array', () => {
  const history = win.presenceHistory();
  assert.ok(Array.isArray(history), 'History should be an array');
});

// Test 6: Presence summary works when disabled
test('Presence summary works when disabled', () => {
  const s = win.presenceSettings();
  s.enabled = false;
  win.savePresenceSettings(s);
  
  const summary = win.presenceSummary();
  assert.ok(typeof summary === 'string', 'Summary should be a string');
  assert.ok(summary.includes('disabled'), 'Disabled summary should mention disabled');
});

// Test 7: Presence context for AI works when disabled
test('Presence context for AI works when disabled', () => {
  const s = win.presenceSettings();
  s.enabled = false;
  win.savePresenceSettings(s);
  
  const ctx = win.presenceContextForAI();
  assert.ok(typeof ctx === 'string', 'Context should be a string');
  assert.ok(ctx.includes('disabled'), 'Disabled context should mention disabled');
});

// Test 8: Presence context for AI works when enabled
test('Presence context for AI works when enabled', () => {
  const s = win.presenceSettings();
  s.enabled = true;
  win.savePresenceSettings(s);
  
  const ctx = win.presenceContextForAI();
  assert.ok(typeof ctx === 'string', 'Context should be a string');
  assert.ok(ctx.includes('PRESENCE STATUS'), 'Enabled context should include status header');
  assert.ok(ctx.includes('Last input'), 'Context should include last input info');
  assert.ok(ctx.includes('Total present today'), 'Context should include total present info');
});

// Test 9: Presence settings can be saved and loaded
test('Presence settings persist through save/load', () => {
  const s = win.presenceSettings();
  s.idleTimeoutSec = 120;
  s.awayTimeoutSec = 600;
  s.awayLockVault = true;
  win.savePresenceSettings(s);
  
  const loaded = win.presenceSettings();
  assert.strictEqual(loaded.idleTimeoutSec, 120, 'Idle timeout should persist');
  assert.strictEqual(loaded.awayTimeoutSec, 600, 'Away timeout should persist');
  assert.strictEqual(loaded.awayLockVault, true, 'Away lock vault should persist');
});

// Test 10: renderPresenceCard handles missing element
test('renderPresenceCard handles missing DOM element', () => {
  // Should not throw when card element doesn't exist
  win.renderPresenceCard();
  assert.ok(true, 'Should not throw');
});

// Test 11: Presence history respects limit
test('Presence history respects limit', () => {
  const history = win.presenceHistory(5);
  assert.ok(Array.isArray(history), 'Should return array');
  assert.ok(history.length <= 5, 'Should respect limit');
});

// Test 12: Presence integrates with hubSummary
test('Presence integrates with hubSummary', () => {
  const s = win.presenceSettings();
  s.enabled = true;
  win.savePresenceSettings(s);
  
  // hubSummary should include presence when enabled
  if (typeof win.hubSummary === 'function') {
    const summary = win.hubSummary();
    assert.ok(summary.presence !== undefined, 'hubSummary should include presence when enabled');
    assert.ok(typeof summary.presence.status === 'string', 'Presence status should be in summary');
  }
});

// Test 13: checkPresenceVaultSecurity locks vault on >3m away
test('checkPresenceVaultSecurity auto-locks vault after 3 minutes away', () => {
  win.VAULT_UNLOCKED = true;
  assert.strictEqual(win.checkPresenceVaultSecurity(60000), false, '1 minute away should not lock vault');
  assert.strictEqual(win.VAULT_UNLOCKED, true, 'Vault should remain unlocked');
  assert.strictEqual(win.checkPresenceVaultSecurity(180000), true, '3 minutes away should lock vault');
  assert.strictEqual(win.VAULT_UNLOCKED, false, 'Vault should be locked');
});

// Test 14: Hub.lockVault purges keys and locks vault
test('Hub.lockVault purges keys and locks vault', () => {
  win.VAULT_UNLOCKED = true;
  win.Hub.lockVault('Test lock');
  assert.strictEqual(win.VAULT_UNLOCKED, false, 'Hub.lockVault should set VAULT_UNLOCKED to false');
  assert.strictEqual(win.VAULT_KEY, null, 'Hub.lockVault should zero out VAULT_KEY');
});

console.log(`\n✅ Presence unit tests: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
