/* Presence Automation unit tests */
const assert = require('assert');
const { createSandbox, loadScripts } = require('./unit-helpers');

const sandbox = createSandbox({
  globals: {
    CustomEvent: class CustomEvent {
      constructor(type, opts) { this.type = type; this.detail = opts?.detail || {}; }
    }
  }
});

loadScripts(sandbox, [
  'modules/00-storage.js',
  'modules/00-utils-config.js',
  'modules/17-presence.js',
  'modules/19-presence-automation.js',
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

console.log('Presence Automation unit tests:');

// Test 1: Module exposes global API
test('Automation module exposes global API', () => {
  assert.ok(typeof win.initPresenceAutomation === 'function');
  assert.ok(typeof win.automationRules === 'function');
  assert.ok(typeof win.automationLog === 'function');
  assert.ok(typeof win.automationTriggerDefs === 'function');
  assert.ok(typeof win.automationActionDefs === 'function');
  assert.ok(typeof win.toggleAutomationRule === 'function');
  assert.ok(typeof win.enableAutomationRule === 'function');
  assert.ok(typeof win.disableAutomationRule === 'function');
  assert.ok(typeof win.addAutomationRule === 'function');
  assert.ok(typeof win.removeAutomationRule === 'function');
  assert.ok(typeof win.resetAutomationRules === 'function');
  assert.ok(typeof win.clearAutomationLog === 'function');
  assert.ok(typeof win.automationSummary === 'function');
  assert.ok(typeof win.runPresenceAutomation === 'function');
});

// Test 2: Default rules are loaded
test('Default rules load correctly', () => {
  win.initPresenceAutomation();
  const rules = win.automationRules();
  assert.ok(Array.isArray(rules), 'Rules should be an array');
  assert.ok(rules.length >= 6, 'Should have at least 6 default rules');
  
  // Check structure
  rules.forEach(r => {
    assert.ok(typeof r.id === 'string', 'Rule should have id');
    assert.ok(typeof r.name === 'string', 'Rule should have name');
    assert.ok(typeof r.trigger === 'string', 'Rule should have trigger');
    assert.ok(Array.isArray(r.actions), 'Rule should have actions array');
    assert.ok(typeof r.enabled === 'boolean', 'Rule should have enabled flag');
  });
});

// Test 3: Trigger definitions
test('Trigger definitions are valid', () => {
  const triggers = win.automationTriggerDefs();
  assert.ok(triggers.away, 'Should have away trigger');
  assert.ok(triggers.return, 'Should have return trigger');
  assert.ok(triggers.idle, 'Should have idle trigger');
  assert.ok(triggers.long_away, 'Should have long_away trigger');
  assert.ok(triggers.first_active, 'Should have first_active trigger');
});

// Test 4: Action definitions
test('Action definitions are valid', () => {
  const actions = win.automationActionDefs();
  assert.ok(actions.lock_vault, 'Should have lock_vault action');
  assert.ok(actions.pause_focus, 'Should have pause_focus action');
  assert.ok(actions.toast, 'Should have toast action');
  assert.ok(actions.notify_marciale, 'Should have notify_marciale action');
  assert.ok(actions.companion_event, 'Should have companion_event action');
  assert.ok(actions.log_activity, 'Should have log_activity action');
  assert.ok(actions.desktop_notify, 'Should have desktop_notify action');
  assert.ok(actions.pause_companion, 'Should have pause_companion action');
});

// Test 5: Toggle rule
test('Toggle rule works', () => {
  const rules = win.automationRules();
  const firstRule = rules[0];
  const wasEnabled = firstRule.enabled;
  
  win.toggleAutomationRule(firstRule.id);
  const updated = win.automationRules().find(r => r.id === firstRule.id);
  assert.strictEqual(updated.enabled, !wasEnabled, 'Toggle should flip enabled state');
  
  // Toggle back
  win.toggleAutomationRule(firstRule.id);
});

// Test 6: Enable/disable rule
test('Enable/disable rule works', () => {
  const rules = win.automationRules();
  const rule = rules.find(r => r.enabled);
  if(!rule) return; // skip if no enabled rules
  
  win.disableAutomationRule(rule.id);
  let updated = win.automationRules().find(r => r.id === rule.id);
  assert.strictEqual(updated.enabled, false, 'Should be disabled');
  
  win.enableAutomationRule(rule.id);
  updated = win.automationRules().find(r => r.id === rule.id);
  assert.strictEqual(updated.enabled, true, 'Should be enabled');
});

// Test 7: Add custom rule
test('Add custom rule works', () => {
  const countBefore = win.automationRules().length;
  const newRule = win.addAutomationRule({
    name: 'Test Rule',
    trigger: 'away',
    actions: [{ type: 'toast', args: { message: 'Test!' } }],
    enabled: true
  });
  
  assert.ok(newRule, 'Should return the new rule');
  assert.ok(newRule.id, 'Should have an id');
  assert.strictEqual(newRule.builtIn, false, 'Custom rule should not be built-in');
  assert.strictEqual(win.automationRules().length, countBefore + 1, 'Should have one more rule');
});

// Test 8: Cannot remove built-in rules
test('Cannot remove built-in rules', () => {
  const builtIn = win.automationRules().find(r => r.builtIn);
  if(!builtIn) return;
  
  const countBefore = win.automationRules().length;
  const removed = win.removeAutomationRule(builtIn.id);
  assert.strictEqual(removed, false, 'Should not allow removing built-in rules');
  assert.strictEqual(win.automationRules().length, countBefore, 'Rule count unchanged');
});

// Test 9: Can remove custom rules
test('Can remove custom rules', () => {
  const custom = win.automationRules().find(r => !r.builtIn);
  if(!custom) return;
  
  const countBefore = win.automationRules().length;
  const removed = win.removeAutomationRule(custom.id);
  assert.strictEqual(removed, true, 'Should remove custom rule');
  assert.strictEqual(win.automationRules().length, countBefore - 1, 'Should have one fewer rule');
});

// Test 10: Reset restores defaults
test('Reset restores defaults', () => {
  win.resetAutomationRules();
  const rules = win.automationRules();
  assert.ok(rules.length >= 6, 'Should have default rules after reset');
  assert.ok(rules.some(r => r.builtIn), 'Should have built-in rules');
});

// Test 11: Run automation with transition
test('Run automation processes transitions', () => {
  win.initPresenceAutomation();
  win.resetAutomationRules();
  win.clearAutomationLog();
  
  // Enable the welcome-back toast rule
  const rules = win.automationRules();
  const welcomeRule = rules.find(r => r.trigger === 'return');
  if(welcomeRule) win.enableAutomationRule(welcomeRule.id);
  
  // Simulate a return transition
  const results = win.runPresenceAutomation({ from: 'away', to: 'present', ts: Date.now() });
  assert.ok(Array.isArray(results), 'Should return array of results');
});

// Test 12: Automation summary shape
test('Automation summary returns expected shape', () => {
  const summary = win.automationSummary();
  assert.ok(typeof summary === 'object', 'Should be an object');
  assert.ok(typeof summary.totalRules === 'number', 'Should have totalRules');
  assert.ok(typeof summary.enabledRules === 'number', 'Should have enabledRules');
  assert.ok(typeof summary.triggersByType === 'object', 'Should have triggersByType');
  assert.ok(typeof summary.executionsToday === 'number', 'Should have executionsToday');
});

// Test 13: Clear log works
test('Clear automation log works', () => {
  win.clearAutomationLog();
  const log = win.automationLog();
  assert.strictEqual(log.length, 0, 'Log should be empty after clear');
});

// Test 14: Cooldown setting
test('Rule cooldown can be set', () => {
  const rules = win.automationRules();
  const rule = rules[0];
  if(!rule) return;
  
  win.setAutomationRuleCooldown(rule.id, 5);
  const updated = win.automationRules().find(r => r.id === rule.id);
  assert.strictEqual(updated.cooldownMin, 5, 'Cooldown should be set');
});

console.log(`\n✅ Presence Automation unit tests: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
