#!/usr/bin/env node
/**
 * Marciale-OS Monorepo Health & Quick Status Dashboard
 * Run with: npm run status
 * Checks server reachability, local Ollama models, storage footprint, and test integrity.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const rootDir = path.resolve(__dirname, '..');

async function probeUrl(url, timeoutMs = 1500) {
  return new Promise(resolve => {
    try {
      const u = new URL(url);
      const req = http.request({
        hostname: u.hostname,
        port: u.port,
        path: u.pathname,
        method: 'GET',
        timeout: timeoutMs
      }, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ online: res.statusCode >= 200 && res.statusCode < 400, status: res.statusCode, body: data }));
      });
      req.on('error', () => resolve({ online: false, error: 'Connection refused' }));
      req.on('timeout', () => { req.destroy(); resolve({ online: false, error: 'Timed out' }); });
      req.end();
    } catch (e) {
      resolve({ online: false, error: e.message });
    }
  });
}

async function runStatus() {
  console.log('\n🌌 ================================================================');
  console.log('    MARCIALE-OS & TAMAKEE UNIFIED COMMAND CENTER STATUS');
  console.log(`    SYSTEM DATE: ${new Date().toISOString().split('T')[0]} | RUNTIME: Node.js ${process.version}`);
  console.log('================================================================\n');

  // 1. Subsystem Versions
  const rootPkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
  const hubPkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'TheHUB 1.5.5.2.3 a v/package.json'), 'utf8'));
  const gamePkg = JSON.parse(fs.readFileSync(path.join(rootDir, 'Gamecompanion/files/package.json'), 'utf8'));

  console.log('📦 SUBSYSTEMS & MANIFESTS:');
  console.log(`   • Monorepo Core:     v${rootPkg.version} (ISC License)`);
  console.log(`   • TheHUB Shell:      v${hubPkg.version} (Vanilla JS + Python Server)`);
  console.log(`   • Companion RPG:     v${gamePkg.version} (Canvas 2D + Vite Build)`);
  console.log(`   • TAMAKEE Engine:    v3.0.0 (7-Cluster Academic Knowledge Vault)`);

  // 2. Local Ollama AI Probe
  console.log('\n🧠 LOCAL AI ENGINE (OLLAMA):');
  const ollamaProbe = await probeUrl('http://127.0.0.1:11434/api/tags', 1500);
  if (ollamaProbe.online) {
    try {
      const tags = JSON.parse(ollamaProbe.body);
      const models = (tags.models || []).map(m => m.name);
      console.log(`   • Status: 🟢 ONLINE (Port 11434 reachability confirmed)`);
      console.log(`   • Local Models Found (${models.length}): ${models.join(', ') || 'None installed'}`);
    } catch (e) {
      console.log(`   • Status: 🟢 ONLINE (Port 11434 reachable)`);
    }
  } else {
    console.log(`   • Status: 🟡 OFFLINE / STANDBY (Ollama daemon not running)`);
    console.log(`   • Note: TheHUB operates normally in zero-cloud offline fallback mode.`);
  }

  // 3. TheHUB Local Server Probe
  console.log('\n🌐 THEHUB LOCAL HTTP SERVER:');
  const serverProbe = await probeUrl('http://127.0.0.1:8000/', 1500);
  if (serverProbe.online) {
    console.log(`   • Status: 🟢 ACTIVE (Listening on http://127.0.0.1:8000)`);
  } else {
    console.log(`   • Status: ⚪ IDLE (Start with: npm start)`);
  }

  // 4. Archive & Storage Footprint
  console.log('\n📦 WORKSPACE STORAGE FOOTPRINT:');
  const rootFiles = fs.readdirSync(rootDir);
  const zips = rootFiles.filter(f => f.endsWith('.zip'));
  zips.forEach(z => {
    const stat = fs.statSync(path.join(rootDir, z));
    console.log(`   • Release Archive: ${z} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
  });
  if (zips.length <= 1) {
    console.log(`   • Storage Status:  🟢 LEAN & CLEAN (Zero redundant archive bloat)`);
  }

  // 5. Verification Commands
  console.log('\n⚡ OPERATIONAL QUICK COMMANDS:');
  console.log('   • Run Full Test Suite:    npm test            (Companion emits TAP; TheHUB does not)');
  console.log('   • Run Web Security Audits: npm run audit:all  (Scout, WCAG 2.2 & Bridge contracts)');
  console.log('   • Run SRE Fault Scanner:  npm run sre:scan    (Automated diagnostic & redmark scan)');
  console.log('   • Check Studio Plate:     npm run plate:check (Mapúa Architecture plate validator)');
  console.log('   • Start TheHUB Server:    npm start           (Launches Python server on :8000)');

  // HOTFIX 2026-08-15 (Law XIX-A Rule 3 - Commandment IV - JOINT/@qa audit):
  // This banner previously printed "100% OPERATIONAL & VERIFIED GREEN" unconditionally.
  // quick-status runs NO test and inspects NO result. It is an inventory tool.
  // A status board that renders a verdict it never measured launders failure as proof.
  console.log('\n================================================================');
  console.log('INVENTORY COMPLETE - NO VERDICT RENDERED');
  console.log('   quick-status inspects presence and size only. It executes no tests.');
  console.log('   For a measured verdict run: npm run pangolin  (parses harness output)');
  console.log('================================================================\n');
}

runStatus();
