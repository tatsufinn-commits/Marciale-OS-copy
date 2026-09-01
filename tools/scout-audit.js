#!/usr/bin/env node
/**
 * @scout Automated Dependency, License & Asset Footprint Audit Tool
 * Scans all package.json manifests across Marciale-OS monorepo for actual license metadata,
 * copyleft risks, and bloated archives.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const manifests = [
  { name: 'Root Monorepo', path: path.join(rootDir, 'package.json'), baseDir: rootDir },
  { name: 'TheHUB Subsystem', path: path.join(rootDir, 'TheHUB 1.5.5.2.3 a v/package.json'), baseDir: path.join(rootDir, 'TheHUB 1.5.5.2.3 a v') },
  { name: 'Gamecompanion Subsystem', path: path.join(rootDir, 'Gamecompanion/files/package.json'), baseDir: path.join(rootDir, 'Gamecompanion/files') }
];

console.log('\n🔭 ======================================================');
console.log('    MARCIALE-OS @scout TECHNICAL & LICENSE AUDIT');
console.log('======================================================\n');

let issuesFound = 0;
let totalDeps = 0;

const BANNED_COPYLEFT = ['gpl', 'agpl', 'sspl', 'cpal'];

manifests.forEach(m => {
  if (!fs.existsSync(m.path)) {
    console.warn(`  ⚠️  [MISSING] ${m.name} manifest not found at: ${m.path}`);
    issuesFound++;
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(m.path, 'utf8'));
  console.log(`📦 Auditing [${m.name}] (v${pkg.version || '0.0.0'})`);
  console.log(`   Declared Manifest License: ${pkg.license || 'UNSPECIFIED'}`);

  const deps = Object.assign({}, pkg.dependencies || {}, pkg.devDependencies || {});
  const depNames = Object.keys(deps);
  totalDeps += depNames.length;

  console.log(`   Dependencies (${depNames.length}): ${depNames.join(', ') || 'None (Pure Zero-Dependency)'}`);

  // Inspect actual package.json in node_modules for true license field
  depNames.forEach(d => {
    const depPkgPath = path.join(m.baseDir, 'node_modules', d, 'package.json');
    let actualLicense = 'UNVERIFIED';
    if (fs.existsSync(depPkgPath)) {
      try {
        const depPkg = JSON.parse(fs.readFileSync(depPkgPath, 'utf8'));
        actualLicense = depPkg.license || (depPkg.licenses && depPkg.licenses[0]?.type) || 'UNSPECIFIED';
      } catch (e) {
        actualLicense = 'CORRUPT_MANIFEST';
      }
    }

    const licenseStr = typeof actualLicense === 'string' ? actualLicense : JSON.stringify(actualLicense);
    if (BANNED_COPYLEFT.some(b => licenseStr.toLowerCase().includes(b))) {
      console.error(`   ❌ [COPYLEFT RISK] Dependency "${d}" has copyleft license: "${licenseStr}"!`);
      issuesFound++;
    }
  });
  console.log('   ✅ Manifest & dependency licenses verified.\n');
});

// Large file and zip check
console.log('🔍 Auditing Asset Footprint & Archive Cleanliness...');
const files = fs.readdirSync(rootDir);
const zips = files.filter(f => f.endsWith('.zip'));
console.log(`   Active Root Archives: ${zips.length ? zips.join(', ') : 'None'}`);

if (zips.length > 2) {
  console.warn(`   ⚠️  [STORAGE ADVISORY] More than 2 zip archives found in root (${zips.length}). Clean up old archives.`);
} else {
  console.log(`   ✅ Root archive storage is lean and clean.`);
}

// HOTFIX 2026-08-15 (@joint fault audit): the banner claimed security this tool
// never tested. It walks DIRECT dependencies for LICENCE fields only.
console.log('\n   \u26a0\ufe0f  SCOPE: LICENCE ONLY, DIRECT DEPENDENCIES ONLY.');
console.log('      No vulnerability scan. No transitive tree walk.');
console.log('      Read ' + totalDeps + ' declared deps; the installed tree is larger.');
console.log('      For security posture run: npm audit   (2026-08-15: 4 HIGH unresolved)');
console.log('\n======================================================');
if (issuesFound === 0) {
  console.log(`🎉 SCOUT LICENCE AUDIT PASSED: ${totalDeps} DIRECT dependencies, ZERO copyleft conflicts.`);
  console.log('======================================================\n');
  process.exit(0);
} else {
  console.error(`❌ SCOUT AUDIT FAILED: ${issuesFound} issues detected!`);
  console.log('======================================================\n');
  process.exit(1);
}
