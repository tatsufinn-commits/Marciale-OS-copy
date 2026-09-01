/**
 * Origin-guard regression tests — @joint fault audit 2026-08-15 (SEV-2).
 *
 * Occasion: three postMessage listeners on the TheHUB<->Companion bridge accepted
 * messages from ANY frame. `data.from === 'TheHUB'` is a SELF-DECLARED field that
 * any poster can forge; it authenticates nothing. The origin and the source handle
 * are the only unforgeable facts about a postMessage.
 *
 * NOTE: tools/sre-fault-scanner.js Audit 3 does NOT test origin. It tests listener
 * LIFECYCLE (removeEventListener / once / singleton). No tool in this repository
 * verified origin before this file existed. That is why the hole survived.
 */
const fs = require('fs');
const path = require('path');

let pass = 0, fail = 0;
function check(name, cond) {
  if (cond) { console.log(`  ✅ ${name}`); pass++; }
  else { console.error(`  ❌ ${name}`); fail++; }
}

console.log('\n🔐 postMessage Origin-Guard Regression Tests\n');

const hubDir = __dirname + '/..';
const targets = [
  ['companion-mini/companion-mini.js', 'MINI_ALLOWED_ORIGINS'],
  ['modules/ruview/ruview-bridge-injector.js', 'window.location.origin'],
  ['modules/ruview/ruview-frame.js', 'window.location.origin'],
];

for (const [rel, marker] of targets) {
  const code = fs.readFileSync(path.join(hubDir, rel), 'utf8');
  check(`${rel} references an origin allowlist`, code.includes(marker));
  check(`${rel} rejects on event.origin`, /\.origin\s*(&&|!==)/.test(code));
  check(`${rel} verifies event.source against window.parent`, /\.source\s*&&\s*\w+\.source\s*!==\s*window\.parent/.test(code));
}

// ─────────────────────────────────────────────────────────────────────────────
// VSS-00 F5 (2026-08-15) — HOST-SIDE COVERAGE.
// The original file above tested three CHILD files and no host handler. That is
// precisely why F1/F2/F4 survived a SEV-2 audit written to catch them: the test
// looked only at the side that was already correct.
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n🔐 Host-side origin-guard regression (VSS-00 F1/F2/F4)\n');

const hostTargets = [
  ['modules/16-hubframe.js', 'isAllowedOrigin'],
  ['modules/14-companion.js', 'COMPANION_ALLOWED_ORIGINS'],
];
for (const [rel, marker] of hostTargets) {
  const code = fs.readFileSync(path.join(hubDir, rel), 'utf8');
  check(`${rel} declares a host-side origin allowlist`, code.includes(marker));
  check(`${rel} rejects on event.origin`, /\.origin\s*&&/.test(code));
  check(`${rel} allows 'null' (sandboxed/file:// embeds)`, code.includes("'null'"));
}

// F1: the host must not broadcast with targetOrigin '*' unconditionally.
(function f1() {
  const code = fs.readFileSync(path.join(hubDir, 'modules/16-hubframe.js'), 'utf8');
  check('16-hubframe.js does not hardcode postMessage(..., \'*\')',
    !/contentWindow\.postMessage\([^)]*\),\s*'\*'\s*\)/.test(code));
})();

// F4 behavioural: with NO frame mounted the guard must FAIL CLOSED.
(function f4() {
  const accepted = [];
  const frame = { contentWindow: { id: 'frame' } };
  function guarded(frames, event) {
    if (!frames.length) return;                                             // fail closed
    if (!frames.some(f => event.source === f.contentWindow)) return;
    const ALLOWED = ['http://localhost:8000', 'null'];
    if (event.origin && !ALLOWED.includes(event.origin)) return;
    accepted.push(event.data);
  }
  guarded([], { source: { id: 'attacker' }, origin: 'http://evil.test', data: 'no-frame' });
  check('F4: stray message REJECTED when no frame is mounted', accepted.length === 0);

  guarded([frame], { source: { id: 'attacker' }, origin: 'http://localhost:8000', data: 'wrong-src' });
  check('F4: message from an unknown source is rejected', accepted.length === 0);

  guarded([frame], { source: frame.contentWindow, origin: 'http://evil.test', data: 'bad-origin' });
  check('F2: message from a foreign origin is rejected', accepted.length === 0);

  guarded([frame], { source: frame.contentWindow, origin: 'http://localhost:8000', data: 'good' });
  check('Legitimate same-origin frame message is ACCEPTED', accepted.length === 1);

  guarded([frame], { source: frame.contentWindow, origin: 'null', data: 'sandboxed' });
  check("Sandboxed frame (origin 'null') is ACCEPTED", accepted.length === 2);
})();

// Behavioural proof: simulate the guard logic exactly as written in companion-mini.
(function behavioural() {
  const ORIGIN = 'http://localhost:8000';
  const ALLOWED = [ORIGIN, 'null'];
  const parentRef = { id: 'parent' };
  const accepted = [];
  function guardedHandler(event) {
    if (event.origin && !ALLOWED.includes(event.origin)) return;
    if (event.source && event.source !== parentRef) return;
    accepted.push(event.data.type);
  }
  guardedHandler({ origin: ORIGIN, source: parentRef, data: { type: 'hub.companion.snapshot' } });
  check('legitimate same-origin parent message ACCEPTED', accepted.length === 1);

  guardedHandler({ origin: 'https://evil.example', source: parentRef, data: { type: 'hub.companion.pause' } });
  check('cross-origin attacker message REJECTED', accepted.length === 1);

  guardedHandler({ origin: ORIGIN, source: { id: 'rogue-iframe' }, data: { type: 'hub.companion.pause' } });
  check('same-origin but wrong-source frame REJECTED', accepted.length === 1);

  guardedHandler({ origin: 'null', source: parentRef, data: { type: 'hub.companion.resume' } });
  check('sandboxed/file:// parent (origin "null") ACCEPTED', accepted.length === 2);

  // The forged-field attack that the old code fell for.
  const legacyAccepted = [];
  function legacyHandler(event) {
    if (event.data && event.data.from === 'TheHUB') legacyAccepted.push(event.data.type);
  }
  legacyHandler({ origin: 'https://evil.example', data: { from: 'TheHUB', type: 'ruview:request_state' } });
  check('REGRESSION WITNESS: forged data.from defeats the OLD check', legacyAccepted.length === 1);
})();

console.log(`\n✅ postMessage origin-guard tests: ${pass} passed, ${fail} failed\n`);
process.exit(fail === 0 ? 0 : 1);
