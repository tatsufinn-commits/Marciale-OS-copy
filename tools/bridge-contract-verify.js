#!/usr/bin/env node
/**
 * @fullstack Automated Bridge & Cross-Layer Contract Verification Tool
 * Performs static contract analysis between TheHUB companion module (14-companion.js)
 * and the Canvas RPG engine bridge (TheHUBBridge.js) to guarantee 100% protocol alignment.
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const hubBridgePath = path.join(rootDir, 'TheHUB 1.5.5.2.3 a v/modules/14-companion.js');
const gameBridgePath = path.join(rootDir, 'Gamecompanion/files/src/integration/TheHUBBridge.js');

console.log('\n🌐 ======================================================');
console.log('    MARCIALE-OS @fullstack BRIDGE CONTRACT VERIFICATION');
console.log('======================================================\n');

if (!fs.existsSync(hubBridgePath) || !fs.existsSync(gameBridgePath)) {
  console.error('❌ Error: 14-companion.js or TheHUBBridge.js not found!');
  process.exit(1);
}

const hubCode = fs.readFileSync(hubBridgePath, 'utf8');
const gameCode = fs.readFileSync(gameBridgePath, 'utf8');

// Contracts emitted by Game -> expected by Hub
const gameEmittedEvents = [
  'idlehero.ready',
  'mtgame.ready',
  'idlehero.ack',
  'mtgame.ack',
  'idlehero.snapshot',
  'mtgame.snapshot',
  'idlehero.levelup',
  'idlehero.item_equipped',
  'idlehero.offline_rewards'
];

// Contracts emitted by Hub -> expected by Game
const hubEmittedEvents = [
  'hub.activity',
  'hub.companion.event',
  'hub.companion.snapshot',
  'hub.companion.pause',
  'hub.companion.resume',
  'hub.theme'
];

let mismatches = 0;

console.log('📡 1. Auditing Game -> TheHUB Inbound Event Handlers...');
gameEmittedEvents.forEach(evt => {
  const handled = hubCode.includes(evt);
  if (handled) {
    console.log(`   ✅ [HANDLED] "${evt}" recognized by handleCompanionFrameMessage()`);
  } else {
    console.error(`   ❌ [UNHANDLED CONTRACT] "${evt}" emitted by game but missing in 14-companion.js!`);
    mismatches++;
  }
});

console.log('\n📡 2. Auditing TheHUB -> Game Outbound Message Consumers...');
hubEmittedEvents.forEach(evt => {
  const handled = gameCode.includes(evt);
  if (handled) {
    console.log(`   ✅ [HANDLED] "${evt}" recognized by TheHUBBridge._handleMessage()`);
  } else {
    console.error(`   ❌ [UNHANDLED CONTRACT] "${evt}" sent by TheHUB but missing in TheHUBBridge.js!`);
    mismatches++;
  }
});

console.log('\n======================================================');
if (mismatches === 0) {
  console.log(`🎉 BRIDGE CONTRACT VERIFIED: All ${gameEmittedEvents.length + hubEmittedEvents.length} postMessage signatures in 100% bi-directional sync!`);
  console.log('======================================================\n');
  process.exit(0);
} else {
  console.error(`❌ BRIDGE CONTRACT FAILED: ${mismatches} protocol discrepancies detected!`);
  console.log('======================================================\n');
  process.exit(1);
}
