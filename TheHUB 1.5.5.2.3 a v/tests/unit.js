const assert = require('assert');
const { createSandbox, loadScript } = require('./unit-helpers');

const sandbox = createSandbox({
  localStorage: {
    'hub.notes.v1': JSON.stringify('hello world'),
    'hub.tasks.v1': JSON.stringify([{ id: 'task1', title: 'Example' }]),
  },
});
loadScript(sandbox, 'modules/00-utils-config.js');

// --- uid() ---
assert.strictEqual(sandbox.uid().length, 12, 'uid() should keep compact 12-char IDs');
const ids = new Set(Array.from({ length: 1000 }, () => sandbox.uid()));
assert.strictEqual(ids.size, 1000, 'uid() should generate unique IDs with randomUUID mock');
console.log('  ✅ uid()');

// --- escaping and safe values ---
assert.strictEqual(sandbox.esc('<script>'), '&lt;script&gt;');
assert.strictEqual(sandbox.esc('"hello"'), '&quot;hello&quot;');
assert.strictEqual(sandbox.esc(null), '');
assert.strictEqual(sandbox.escAttr("a'b\"c"), 'a&#39;b&quot;c');
assert.strictEqual(sandbox.safeColor('#ff0000'), '#ff0000');
assert.strictEqual(sandbox.safeColor('#abc'), '#abc');
assert.strictEqual(sandbox.safeColor('not-a-color'), '#6c8cff');
console.log('  ✅ escaping/color helpers');

// --- safeUrl() ---
assert.strictEqual(sandbox.safeUrl('https://example.com'), 'https://example.com/');
assert.strictEqual(sandbox.safeUrl('example.com'), 'https://example.com/');
assert.strictEqual(sandbox.safeUrl('http://localhost:8000/path'), 'http://localhost:8000/path');
assert.strictEqual(sandbox.safeUrl('javascript:alert(1)'), '');
assert.strictEqual(sandbox.safeUrl('ftp://example.com'), '');
assert.strictEqual(sandbox.safeUrl(''), '');
console.log('  ✅ safeUrl()');

// --- sanitizeHtml() ---
const sanitized = sandbox.sanitizeHtml('<script>alert(1)</script><p onclick="evil()" style="color:red"><a href="javascript:bad()">x</a><img src="data:image/png;base64,abc"></p>');
assert.ok(!sanitized.includes('script'), 'sanitizeHtml should remove script tags');
assert.ok(!sanitized.includes('onclick'), 'sanitizeHtml should remove event handlers');
assert.ok(!sanitized.includes('style='), 'sanitizeHtml should remove inline styles');
assert.ok(!sanitized.includes('javascript:'), 'sanitizeHtml should remove unsafe href/src values');
assert.ok(sanitized.includes('<img'), 'sanitizeHtml should keep data image sources');
console.log('  ✅ sanitizeHtml()');

// --- dates ---
assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(sandbox.todayStr()), 'todayStr should return YYYY-MM-DD');
console.log('  ✅ todayStr()');

// --- brain secret detection ---
assert.ok(sandbox.brainSensitiveMatches('password: hunter2').length > 0);
assert.ok(sandbox.brainSensitiveMatches('sk-abc123def456').length > 0);
assert.strictEqual(sandbox.brainSensitiveMatches('I like cats and deadlines.').length, 0);
console.log('  ✅ brainSensitiveMatches()');

// --- localStorage inventory + error audit ---
const usage = sandbox.hubStorageUsageKB();
assert.ok(Number.isInteger(usage) && usage >= 0, 'hubStorageUsageKB should return a non-negative integer');
sandbox.logHubError('unit-test', new Error('expected test error'));
const errors = sandbox.loadHubErrors();
assert.strictEqual(errors.length, 1, 'logHubError should persist one error');
assert.strictEqual(errors[0].context, 'unit-test');
assert.ok(errors[0].message.includes('expected test error'));
sandbox.clearHubErrors();
assert.strictEqual(sandbox.loadHubErrors().length, 0, 'clearHubErrors should clear stored errors');
console.log('  ✅ storage/error helpers');

console.log('✅ Core unit tests passed');
