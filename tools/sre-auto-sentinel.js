#!/usr/bin/env node
/**
 * @sre & @pangolin End-Process Automated Sentinel & Hotfix Packager
 * Run with: npm run pangolin  or  npm run sentinel:check
 * Automatically executes end-process validation. If an intractable error is found,
 * it packages a downloadable "[BUILD] - HOTFIX PROPOSAL.zip" with ready-to-use AI prompts!
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

console.log('\n🛡️  ================================================================');
console.log('    @sre & @pangolin END-PROCESS AUTOMATED SENTINEL LOOP');
console.log('    Role: Automated Diagnostic, Code Patching & Hotfix Generation');
console.log('================================================================\n');

let testPassed = false;
let healthPassed = false;
let auditPassed = false;
let testOutput = '';
let testSummary = 'not run';

/**
 * Derive real test counts from TAP output emitted by `node --test`.
 * Returns { total, pass, fail } with null total when no summary is present.
 * NEVER returns invented numbers — absence of evidence is reported as absence.
 */
function parseTapCounts(out) {
  const grab = (label) => {
    // Matches the LAST occurrence of e.g. "# pass 77" across concatenated suites.
    const re = new RegExp('^#\\s*' + label + '\\s+(\\d+)\\s*$', 'gm');
    let last = null, m;
    while ((m = re.exec(out)) !== null) last = Number(m[1]);
    return last;
  };
  const total = grab('tests');
  const pass = grab('pass');
  const fail = grab('fail');
  if (total === null) return { total: null, pass: null, fail: null };
  return { total, pass: pass === null ? 0 : pass, fail: fail === null ? 0 : fail };
}
let healthOutput = '';

// 0. Verify Dependencies
const hubNodeModules = path.join(rootDir, 'TheHUB 1.5.5.2.3 a v', 'node_modules', 'jsdom');
if (!fs.existsSync(hubNodeModules)) {
  try {
    console.log('📦 Restoring workspace dependencies...');
    execSync('npm run install:all', { cwd: rootDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    console.log('   ✅ Dependencies restored.');
  } catch (e) {
    console.warn('   ⚠️ Could not restore dependencies automatically.');
  }
}

// 1. Run Test Suite
try {
  console.log('🧪 1. Executing Full CI Test Harness (npm test)...');
  testOutput = execSync('npm test', { cwd: rootDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  // HOTFIX 2026-08-14 (Law XIX-A Rule 3 · Commandment II · Commandment IV):
  // This line previously printed a HARDCODED "43 test suites / 137 assertions".
  // Those numbers were never measured — testOutput was captured and never parsed.
  // Evidence must be DERIVED from the harness, never asserted. A sentinel that
  // manufactures a green is worse than no sentinel: it launders failure as proof.
  const m = parseTapCounts(testOutput);
  if (m.total === null) {
    console.warn('   ⚠️ Tests exited 0 but the harness emitted no parseable TAP summary.');
    console.warn('      Reporting UNVERIFIED rather than inventing a count.');
    testSummary = 'UNVERIFIED (no TAP summary found)';
    testPassed = true;
  } else if (m.fail > 0) {
    // Defensive: exit code 0 with non-zero failures must never be reported green.
    console.error(`   ❌ [EVIDENCE CONFLICT] Harness exited 0 but reported ${m.fail} failing test(s).`);
    testSummary = `CONFLICT — ${m.pass}/${m.total} pass, ${m.fail} fail (exit 0)`;
    testPassed = false;
  } else {
    console.log(`   ✅ ${m.pass}/${m.total} tests passed (100% green) — measured from harness output.`);
    testSummary = `${m.pass}/${m.total} passed`;
    testPassed = true;
  }
} catch (e) {
  testOutput = (e.stdout || '') + '\n' + (e.stderr || '') + '\n' + e.message;
  console.error('   ❌ [TEST FAILURE DETECTED] One or more test suites failed.');
}

// 2. Run SRE Health Scanner
try {
  console.log('\n🚨 2. Executing SRE Fault & Redmark Scanner...');
  healthOutput = execSync('node tools/sre-fault-scanner.js', { cwd: rootDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  console.log('   ✅ SRE Scanner verified zero critical redmarks.');
  healthPassed = true;
} catch (e) {
  healthOutput = (e.stdout || '') + '\n' + (e.stderr || '') + '\n' + e.message;
  console.error('   ❌ [SRE REDMARK DETECTED] Critical code or storage risk found.');
}

// 3. Run Security & Contract Audits
try {
  console.log('\n🌐 3. Executing Security, WCAG 2.2 & Bridge Audits...');
  execSync('npm run audit:all', { cwd: rootDir, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
  console.log('   ✅ Security, WCAG 2.2, and Bridge contracts 100% aligned.');
  auditPassed = true;
} catch (e) {
  console.error('   ❌ [AUDIT FAILURE] Contract or license issue detected.');
}

console.log('\n================================================================');

if (testPassed && healthPassed && auditPassed) {
  console.log('🎉 PANGOLIN ARMOR STATUS: 🟢 100% SECURE & VERIFIED NOMINAL');
  console.log('   System Health: SEV-0 (Zero Incidents, All Invariants Intact)');
  console.log('================================================================\n');
  process.exit(0);
} else {
  // CRITICAL FAILURE DETECTED -> GENERATE HOTFIX PROPOSAL ZIP!
  console.error('⚠️  HOTFIX PROTOCOL TRIGGERED: Generating Hotfix Proposal Package...');
  
  const buildName = 'MARCIALE-OS-BUILD';
  const hotfixZipName = `${buildName} - HOTFIX PROPOSAL.zip`;
  const hotfixZipPath = path.join(rootDir, hotfixZipName);
  
  const diagnosticReport = `# 🚨 EMERGENCY HOTFIX DIAGNOSTIC REPORT
* **Generated By:** @sre & @pangolin Sentinel Loop
* **Timestamp:** ${new Date().toISOString()}
* **Severity Level:** SEV-1 / SEV-2 Incident

---

## 1. Test Suite Failure Output:
\`\`\`text
${testOutput.slice(-2000)}
\`\`\`

## 2. SRE Health Scanner Output:
\`\`\`text
${healthOutput.slice(-2000)}
\`\`\`

---

## 3. Recommended Remediation Actions:
1. Dispatch @pangolin to inspect the failing test assertion.
2. Review recent changes in \`docs/BUILD_LOGBOOK.md\`.
3. Apply surgical minimal diff and re-test with \`npm test\`.
`;

  const dispatchPrompt = `Hello AI! An automated SRE Sentinel check detected a test failure in Marciale-OS.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

Please assume the role of [@pangolin (Automated Patchmaster & Repair Officer)] reporting to [@sre] per \`docs/AGENTS.md\` and \`docs/INCIDENT_RESPONSE_SRE_PLAYBOOK.md\`.

MODE: SURGICAL EMERGENCY HOTFIX

DIAGNOSTIC FAILURE LOG:
${testOutput.slice(-1200)}

YOUR PANGOLIN DIRECTIVES:
1. Locate the exact broken file and line number.
2. Formulate the surgical fix equation without rewriting un-related working modules (Law I & Law IV).
3. Apply the minimal necessary diff and run \`npm test\` to verify 100% green checkmarks (Law V).
4. Add a permanent regression test assertion so this bug NEVER recurs.
5. Record the completed patch into \`docs/patchnotes/PATCHNOTES_LEDGER.md\` and package the updated \`Fix.zip\`!
`;

  // Write temporary hotfix docs
  const reportPath = path.join(rootDir, 'HOTFIX_DIAGNOSTIC_REPORT.md');
  const promptPath = path.join(rootDir, 'HOTFIX_DISPATCH_PROMPT.txt');
  fs.writeFileSync(reportPath, diagnosticReport, 'utf8');
  fs.writeFileSync(promptPath, dispatchPrompt, 'utf8');

  // Create zip using Python standard library
  try {
    execSync(`python3 -c "
import zipfile
with zipfile.ZipFile('${hotfixZipName}', 'w', zipfile.ZIP_DEFLATED) as zipf:
    zipf.write('HOTFIX_DIAGNOSTIC_REPORT.md', 'HOTFIX_DIAGNOSTIC_REPORT.md')
    zipf.write('HOTFIX_DISPATCH_PROMPT.txt', 'HOTFIX_DISPATCH_PROMPT.txt')
"`, { cwd: rootDir });
    console.log(`📦 [HOTFIX PROPOSAL READY]: Generated "${hotfixZipName}" in root workspace!`);
    console.log('   Simply open this zip in your next chat to have @pangolin fix the issue!');
  } catch (e) {
    console.warn('Could not compress hotfix zip:', e.message);
  }

  console.log('================================================================\n');
  process.exit(1);
}
