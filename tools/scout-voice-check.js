#!/usr/bin/env node
/**
 * LAW XIX-B ENFORCEMENT — The Scout's Voice
 * Enacted 2026-08-15 by @joint on the Commander's order.
 *
 * Rule 4 (Duty of Disclosure) and Rule 1 are the two provisions most likely to be
 * violated by forgetfulness rather than intent -- which is exactly how the last
 * occupant was silenced. A law that depends on memory is a law that will be broken
 * the first busy watch. So it is enforced by a script instead.
 *
 * Checks every tasking document addressed to Seat R:
 *   1. It MUST restate the Research-Drop Privilege (XIX-B Rule 4).
 *   2. It MUST NOT tell Seat R his deliverables are proposals under Law XIX (Rule 1).
 *   3. It SHOULD mandate the HEAD line (Rule 3 / named-tree discipline).
 *
 * Exit 1 on violation. This tool is built to be able to go red -- see the
 * @joint fault audit of 2026-08-15: a green that cannot go red is decoration.
 */
const fs = require('fs');
const path = require('path');
const rootDir = path.resolve(__dirname, '..');

console.log('\n🔭 ======================================================');
console.log('    LAW XIX-B — SCOUT\'S VOICE COMPLIANCE CHECK');
console.log('    Duty of Disclosure · Evidence-Not-Proposal · Named Tree');
console.log('======================================================\n');

const scanDirs = [
  path.join(rootDir, 'docs/council/members/RECONNAISSANCE/tasks'),
  path.join(rootDir, 'docs/council/members/RECONNAISSANCE/conversational logs/messages/ASSISTANT'),
  // 2026-08-15: the Seat R INVITATION is an intake artifact and is bound by the
  // same rules. It was written OUTSIDE these paths and therefore passed unchecked
  // -- a blind spot, not compliance. A scanner that cannot see the document you
  // just wrote is not protecting you. Added rather than exploited.
  path.join(rootDir, 'docs/council/members/RECONNAISSANCE'),
];

let docs = [];
let skipped = [];
// This tool polices TASKINGS ISSUED TO Seat R. Historical/biographical records are
// not taskings -- no one is being ordered, so no channel can go undisclosed. Judging
// NTG's resume by a tasking rule produces a FALSE RED, and a false red is as
// corrosive as a false green: it teaches the house to ignore the scanner. Excluded
// BY NAME and PRINTED below, never silently dropped.
const NON_TASKING = new Set(['RESUME_NTG.md']);
for (const d of scanDirs) {
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) {
    if (f.endsWith('.md') && !f.startsWith('.')) {
      if (NON_TASKING.has(f)) { skipped.push(path.join(d, f)); continue; }
      docs.push(path.join(d, f));
    }
    // 'superseded/' is a quarantine of historical faults, deliberately NOT repaired
    // (Law XIX-A Rule 4: the offence is preserved as the artifact). It is a
    // subdirectory, so readdirSync never descends into it -- noted here so no
    // successor "fixes" the scanner by widening the walk.
  }
}

if (skipped.length) {
  console.log('   ℹ️  Excluded as NON-TASKING records (not orders, no channel to grant):');
  for (const f of skipped) console.log(`      - ${path.relative(rootDir, f)}`);
  console.log('');
}

let violations = 0;
let checked = 0;

if (docs.length === 0) {
  console.log('   ℹ️  No Seat R tasking documents on disk. Nothing to check.');
  console.log('      (Seat R is VACANT as of 2026-08-15.)\n');
}

for (const f of docs) {
  const rel = path.relative(rootDir, f);
  const text = fs.readFileSync(f, 'utf8');
  checked++;
  console.log(`📄 ${rel}`);

  // Rule 4 — Duty of Disclosure
  const disclosesDrop = /RESEARCH[- ]DROP/i.test(text) || /MARCIALE_OS_RESEARCH_DROP\.zip/.test(text);
  if (disclosesDrop) {
    console.log('   ✅ [XIX-B R4] Research-Drop Privilege is disclosed.');
  } else {
    console.error('   ❌ [XIX-B R4 VIOLATION] Does NOT restate the Research-Drop Privilege.');
    console.error('        A channel unnamed is a channel ungranted. Fault charged to Seat A.');
    violations++;
  }

  // Rule 1 — Law XIX must not be applied to Seat R
  const misapplied = /Law XIX[^-A-Z]/.test(text) && /proposal/i.test(text)
    && !/XIX-B/.test(text) && !/does not bind/i.test(text);
  if (misapplied) {
    console.error('   ❌ [XIX-B R1 VIOLATION] Applies Law XIX proposal-only status to Seat R.');
    console.error('        Law XIX names Seat W. It has never named Seat R.');
    violations++;
  } else {
    console.log('   ✅ [XIX-B R1] Does not misapply Law XIX to Seat R.');
  }

  // Charter Seat R §S Rule 4 — HARD CONTEXT BUDGET (10 KB).
  // Occasion: the first occupant died of context exhaustion. An intake artifact
  // over budget is REFUSED, not trimmed. This office is not exempt from it:
  // the successor packet breached this limit on its first draft and was cut.
  const bytes = Buffer.byteLength(text, 'utf8');
  const BUDGET = 10240;
  if (bytes <= BUDGET) {
    console.log(`   ✅ [§S R4] Context budget ${bytes} B / ${BUDGET} B.`);
  } else {
    console.error(`   ❌ [§S R4 VIOLATION] ${bytes} B exceeds the ${BUDGET} B hard limit by ${bytes - BUDGET} B.`);
    console.error('        Rewrite from scratch. Cleaning a bloated prompt preserves the inflation pattern.');
    violations++;
  }

  // Rule 3 — named-tree discipline
  if (/rev-parse/.test(text)) {
    console.log('   ✅ [XIX-B R3] Mandates the HEAD line.');
  } else {
    console.warn('   ⚠️  [XIX-B R3] Does not mandate `git rev-parse --short HEAD`.');
  }
  console.log('');
}

console.log('======================================================');
if (violations === 0) {
  console.log(`🎉 SCOUT'S VOICE COMPLIANT: ${checked} tasking document(s), 0 violations.`);
  console.log('======================================================\n');
  process.exit(0);
} else {
  console.error(`🚨 LAW XIX-B VIOLATIONS: ${violations} across ${checked} document(s).`);
  console.error('   These are chargeable to SEAT A, not to Reconnaissance.');
  console.log('======================================================\n');
  process.exit(1);
}
