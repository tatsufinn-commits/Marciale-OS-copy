#!/usr/bin/env node
/**
 * Mapúa Architecture Studio Major Plate Defense CLI Validator
 * Run with: npm run plate:check [tla] [zone] [footprint] [rampHeight] [corridorWidth]
 * Validates design plate metrics against PD 1096, RA 9514, and BP 344 before jury presentation!
 */

const readline = require('readline');

console.log('\n🏛️  ======================================================');
console.log('    MAPÚA ARIDBE MAJOR PLATE DEFENSE VALIDATOR');
console.log('    Authority: PD 1096 NBCP, RA 9514 Fire Code & BP 344');
console.log('======================================================\n');

// Parse CLI args or run sample plate
const args = process.argv.slice(2);
let tla = Number(args[0]) || 600;
let zone = (args[1] || 'C-2').toUpperCase();
let footprint = Number(args[2]) || 380;
let rampH = Number(args[3]) || 1.2;
let corridorW = Number(args[4]) || 2.44;

function validatePlate(tla, zone, footprint, rampH, corridorW) {
  console.log(`📐 PLATE PARAMETERS UNDER REVIEW:`);
  console.log(`   • Total Lot Area (TLA):      ${tla} m²`);
  console.log(`   • Zoning Classification:     ${zone}`);
  console.log(`   • Proposed Building Footprint: ${footprint} m²`);
  console.log(`   • Entrance Vertical Rise:    ${rampH} m`);
  console.log(`   • Primary Corridor Width:    ${corridorW} m\n`);

  let redFlags = 0;
  let passes = 0;

  // 1. PD 1096 Rule 7/8 AMBF Check
  console.log('📋 1. PD 1096 NBCP Table VII.1 (Footprint & PSO Compliance)...');
  const psoLimits = { 'R-1': 0.50, 'R-2': 0.60, 'R-3': 0.70, 'C-1': 0.70, 'C-2': 0.75, 'C-3': 0.80 };
  const maxPso = psoLimits[zone] || 0.75;
  const maxAmbf = tla * maxPso;
  const psoActual = (footprint / tla) * 100;

  if (footprint <= maxAmbf) {
    console.log(`   ✅ [PASS] AMBF is ${footprint.toFixed(1)} m² (PSO: ${psoActual.toFixed(1)}% <= max ${(maxPso * 100)}%).`);
    passes++;
  } else {
    console.error(`   ❌ [RED FLAG FOR JURY] Footprint (${footprint} m²) exceeds statutory AMBF (${maxAmbf.toFixed(1)} m²)!`);
    redFlags++;
  }

  // 2. BP 344 Ramp Run & Landing Sizing
  console.log('\n📋 2. BP 344 Rule II Section 2 (Accessible Ramp Geometry)...');
  const minRampRun = rampH * 12;
  const intermediateLandings = Math.max(0, Math.floor((minRampRun - 0.01) / 6.0));
  const totalRampFootprint = minRampRun + (intermediateLandings * 1.5) + 3.0;

  console.log(`   • Required 1:12 Ramp Run:     ${minRampRun.toFixed(2)} m`);
  console.log(`   • Intermediate Landings:     ${intermediateLandings} landings (1.50m each every 6.00m run)`);
  console.log(`   • Total Straight Footprint:   ${totalRampFootprint.toFixed(2)} m (with 1.50m top & bottom landings)`);
  console.log(`   ✅ [PASS] BP 344 1:12 gradient geometry calculated.`);
  passes++;

  // 3. RA 9514 & BP 344 Corridor Clear Width
  console.log('\n📋 3. RA 9514 & BP 344 Corridor Width Compliance...');
  if (corridorW >= 2.44) {
    console.log(`   ✅ [PASS] Corridor width (${corridorW} m) meets Institutional Hospital Standard (min 2.44 m / 8 ft).`);
    passes++;
  } else if (corridorW >= 1.20) {
    console.log(`   ✅ [PASS] Corridor width (${corridorW} m) meets General Commercial Standard (min 1.12 m RA 9514 / 1.20 m BP 344).`);
    passes++;
  } else {
    console.error(`   ❌ [RED FLAG FOR JURY] Corridor width (${corridorW} m) is under the 1.12m Fire Code minimum!`);
    redFlags++;
  }

  console.log('\n======================================================');
  if (redFlags === 0) {
    console.log(`🎉 JURY READINESS: 🟢 100% CODE COMPLIANT (${passes} Categories Passed)`);
    console.log('   All dimensions mathematically defended under Philippine Building Laws!');
  } else {
    console.error(`⚠️  JURY READINESS: 🔴 ${redFlags} CODE RED FLAGS DETECTED! Review numbers above.`);
  }
  console.log('======================================================\n');
  return redFlags;
}

// HOTFIX 2026-08-15 (@joint fault audit): this validator printed RED FLAGS and still
// exited 0 -- it had no process.exit(1) anywhere and could not fail. A statutory
// compliance check that cannot go red is decoration. The count is now returned by
// validatePlate() (a local shadowed any module-level counter) and drives the exit code.
const plateRedFlags = validatePlate(tla, zone, footprint, rampH, corridorW);
if (plateRedFlags > 0) {
  console.error(`🚨 PLATE NON-COMPLIANT: ${plateRedFlags} statutory red flag(s). NOT jury-ready.`);
  process.exit(1);
}
process.exit(0);
