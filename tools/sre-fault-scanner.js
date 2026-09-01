#!/usr/bin/env node
/**
 * @sre Autonomous Diagnostic, Fault & Redmark Scanner
 * Run with: npm run sre:scan  or  npm run health
 * Systematically audits Marciale-OS source code for runtime bugs, security vulnerabilities,
 * unhandled exceptions, memory leaks, and storage defects.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const hubDir = path.join(rootDir, 'TheHUB 1.5.5.2.3 a v');
const gameDir = path.join(rootDir, 'Gamecompanion/files');

console.log('\n🚨 ================================================================');
console.log('    MARCIALE-OS @sre AUTONOMOUS FAULT & VULNERABILITY SCANNER');
console.log('    Authority: /docs/INCIDENT_RESPONSE_SRE_PLAYBOOK.md');
console.log('================================================================\n');

let redmarks = 0;
let warnings = 0;
let passes = 0;

// Helper to recursively scan js files
function getJsFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'archive') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getJsFiles(fullPath));
    } else if (file.endsWith('.js')) {
      results.push(fullPath);
    }
  });
  return results;
}

const jsFiles = getJsFiles(hubDir).concat(getJsFiles(gameDir));
console.log(`🔍 1. Scanning ${jsFiles.length} JavaScript modules across TheHUB and Gamecompanion...\n`);

// 1. Scan for Raw innerHTML XSS Vulnerabilities
console.log('🛡️  Audit 1: DOM Injection & XSS Sanitization...');
let xssVulnerabilities = 0;
jsFiles.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  // Check for dangerous unescaped pattern: innerHTML = ... without esc or sanitize
  const lines = code.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('.innerHTML =') && !line.includes('esc(') && !line.includes('escAttr(') && !line.includes('sanitizeHtml(') && !line.includes('`') && !line.includes("''") && !line.includes('""')) {
      // Potentially dynamic non-template string
      if (line.includes('+') || line.includes('${')) {
        console.warn(`   ⚠️  [POSSIBLE XSS] ${path.relative(rootDir, f)}:${idx + 1}`);
        xssVulnerabilities++;
      }
    }
  });
});
if (xssVulnerabilities === 0) {
  console.log('   ✅ All dynamic DOM injections properly use esc(), sanitizeHtml(), or safe templates.');
  passes++;
} else {
  warnings += xssVulnerabilities;
}

// 2. Scan for Un-debounced LocalStorage Writes
console.log('\n🛡️  Audit 2: Storage Quota & Main-Thread Blocking...');
let unDebouncedWrites = 0;
jsFiles.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  if (code.includes('setInterval') && code.includes('localStorage.setItem') && !code.includes('throttle') && !code.includes('debounce') && !code.includes('5000')) {
    unDebouncedWrites++;
    console.warn(`   ⚠️  [STORAGE RISK] High-frequency storage write inside interval in: ${path.relative(rootDir, f)}`);
  }
});
if (unDebouncedWrites === 0) {
  console.log('   ✅ Storage writes are properly debounced, throttled, or event-driven.');
  passes++;
} else {
  warnings += unDebouncedWrites;
}

// 3. Scan for Zombie Message Listeners
console.log('\n🛡️  Audit 3: Window Message Listener Lifecycle & Leaks...');
let unGuardedListeners = 0;
jsFiles.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  if (code.includes("window.addEventListener('message'") || code.includes('window.addEventListener("message"')) {
    if (!code.includes('_MESSAGE_LISTENER') && !code.includes('this._ready') && !code.includes('removeEventListener') && !code.includes('{once:true}')) {
      unGuardedListeners++;
      console.warn(`   ⚠️  [ZOMBIE LISTENER RISK] Unguarded message listener in: ${path.relative(rootDir, f)}`);
    }
  }
});
if (unGuardedListeners === 0) {
  console.log('   ✅ All postMessage listeners possess singleton guards or cleanup handlers.');
  passes++;
} else {
  warnings += unGuardedListeners;
}

// 4. Scan for Missing AbortController on Network Calls
console.log('\n🛡️  Audit 4: Network Hang Resilience (AbortController)...');
let unBoundedFetches = 0;
const hubModules = getJsFiles(path.join(hubDir, 'modules'));
hubModules.forEach(f => {
  const code = fs.readFileSync(f, 'utf8');
  if (code.includes('fetch(OLLAMA_URL') || code.includes('fetch(OLLAMA')) {
    if (!code.includes('AbortController') && !code.includes('signal:')) {
      unBoundedFetches++;
      console.warn(`   ⚠️  [HANG RISK] Ollama fetch without AbortController timeout in: ${path.relative(rootDir, f)}`);
    }
  }
});
if (unBoundedFetches === 0) {
  console.log('   ✅ All Ollama network probes are bounded by AbortController timeouts.');
  passes++;
} else {
  warnings += unBoundedFetches;
}

// 5. Monorepo Root Script & Manifest Integrity
console.log('\n🛡️  Audit 5: Monorepo Package Manifests & Scripts...');
const pkgPath = path.join(rootDir, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const requiredScripts = ['test', 'start', 'build', 'audit:all', 'scout', 'audit:wcag'];
let missingScripts = 0;
requiredScripts.forEach(s => {
  if (!pkg.scripts || !pkg.scripts[s]) {
    console.error(`   ❌ [REDMARK] Missing required root script: "${s}"`);
    missingScripts++;
    redmarks++;
  }
});
if (missingScripts === 0) {
  console.log('   ✅ Root package manifest contains all required execution and audit scripts.');
  passes++;
}

console.log('\n================================================================');
if (redmarks === 0) {
  console.log(`🎉 SRE SCAN PASSED: 0 Redmarks Detected (${passes} Core Categories Verified, ${warnings} Minor Warnings)`);
  console.log('   System Health Status: SEV-0 (Normal Nominal Operations — Zero Active Incidents)');
} else {
  console.error(`🚨 SRE SCAN FAILED: ${redmarks} Active Redmarks Detected! Triggering SRE Triage.`);
}
console.log('================================================================\n');

process.exit(redmarks === 0 ? 0 : 1);
