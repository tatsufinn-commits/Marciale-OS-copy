const assert = require('assert');
const { createSandbox, loadScripts } = require('./unit-helpers');

const sandbox = createSandbox();
loadScripts(sandbox, ['modules/00-utils-config.js', 'modules/05-calendar.js', 'modules/04-tracker.js']);

const start = Date.UTC(2026, 5, 14, 8, 0, 0);
const entries = [{ id: 'log1', drink: 'machiato', qty: 1, date: '2026-06-14', time: '08:00', ts: start }];

// Default Caramel Macchiato has 150mg caffeine and the app models a 5.7h pharmacokinetic half-life.
assert.ok(Math.abs(sandbox.caffeineAt(start, entries) - 150) < 0.001, 'caffeineAt should equal full dose at logged time');
assert.ok(Math.abs(sandbox.caffeineAt(start + 5.7 * 3600000, entries) - 75) < 0.001, 'caffeineAt should halve after 5.7h');
assert.ok(Math.abs(sandbox.caffeineAt(start + 11.4 * 3600000, entries) - 37.5) < 0.001, 'caffeineAt should quarter after 11.4h');
assert.strictEqual(sandbox.caffeineAt(start - 1, entries), 0, 'future drinks should not contribute before their timestamp');
console.log('  ✅ caffeineAt() half-life math');

// Quantity should multiply the dose.
const twoDrinks = [{ id: 'log2', drink: 'machiato', qty: 2, date: '2026-06-14', time: '08:00', ts: start }];
assert.ok(Math.abs(sandbox.caffeineAt(start, twoDrinks) - 300) < 0.001, 'qty should multiply caffeine dose');
console.log('  ✅ caffeine quantity scaling');

// caffeineBelowAt() should return startTs immediately when already below threshold.
assert.strictEqual(sandbox.caffeineBelowAt(entries, 200, start), start, 'already-below threshold should return start timestamp');

// 150mg drops below 75mg just after one half-life (5.7h); search resolution is 5 minutes.
const below75 = sandbox.caffeineBelowAt(entries, 75, start);
assert.ok(below75 >= start + 5.7 * 3600000, 'below-threshold timestamp should be at/after half-life boundary');
assert.ok(below75 <= start + 5.7 * 3600000 + 5 * 60000, 'below-threshold search should resolve within one 5-minute step');
console.log('  ✅ caffeineBelowAt()');

// Active sugar should follow its own decay model.
assert.ok(Math.abs(sandbox.sugarAt(start, entries) - 34) < 0.001, 'sugarAt should equal full sugar dose at logged time');
assert.ok(Math.abs(sandbox.sugarAt(start + 2 * 3600000, entries) - 17) < 0.001, 'sugarAt should halve after 2h');
assert.ok(Math.abs(sandbox.sugarAt(start + 4 * 3600000, entries) - 8.5) < 0.001, 'sugarAt should quarter after 4h');
console.log('  ✅ sugarAt() half-life math');

// logTimestamp() should combine a YYYY-MM-DD date and HH:MM time into a valid Date timestamp.
const ts = sandbox.logTimestamp('2026-06-14', '12:34');
const d = new Date(ts);
assert.strictEqual(d.getFullYear(), 2026);
assert.strictEqual(d.getMonth(), 5);
assert.strictEqual(d.getDate(), 14);
assert.strictEqual(d.getHours(), 12);
assert.strictEqual(d.getMinutes(), 34);
console.log('  ✅ logTimestamp()');

// nextBedtimeTs() should roll to tomorrow if the target time already passed.
const beforeBed = Date.UTC(2026, 5, 14, 20, 0, 0);
const bedTonight = sandbox.nextBedtimeTs('23:00', beforeBed);
assert.strictEqual(new Date(bedTonight).getDate(), new Date(beforeBed).getDate(), 'bedtime later today should stay today');
const afterBed = Date.UTC(2026, 5, 14, 23, 30, 0);
const bedTomorrow = sandbox.nextBedtimeTs('23:00', afterBed);
assert.strictEqual(new Date(bedTomorrow).getDate(), new Date(afterBed).getDate() + 1, 'passed bedtime should roll to tomorrow');
console.log('  ✅ nextBedtimeTs()');

// --- biometric intake estimates ---
sandbox.saveBioMetrics({ age: 20, sex: 'male', weightKg: 70, heightCm: 170, activityLevel: 'moderate', caffeineSensitivity: 'normal' });
assert.strictEqual(sandbox.bmrMifflinStJeor(), 1668, 'Mifflin-St Jeor BMR should match expected rounded value for sample male profile');
assert.strictEqual(sandbox.tdeeEstimate(), 2585, 'TDEE should apply moderate activity multiplier');
const limits = sandbox.personalIntakeLimits();
assert.ok(limits.personalized, 'personalIntakeLimits should mark complete profile as personalized');
assert.ok(limits.sugarRecommended > 0 && limits.sugarUpper > limits.sugarRecommended, 'sugar estimates should expose recommended and upper values');
assert.ok(limits.cafDaily > 0 && limits.cafDaily <= 400, 'caffeine daily estimate should be positive and capped');
console.log('  ✅ biometric intake estimates');

// --- Build V8.2: Circadian & Biometric Focus Orchestration ---
// 1. calculateBedtimeCaffeine()
const morningTs = new Date('2026-06-14T09:00:00').getTime();
const eveningEntry = [{ id: 'late_coffee', drink: 'spanish', qty: 1, date: '2026-06-14', time: '18:00', ts: new Date('2026-06-14T18:00:00').getTime() }];
// Spanish latte has 256mg caffeine. At 23:00 (5 hours later), projected level with 5.7h half life is ~139.4mg
const bedtimeData = sandbox.calculateBedtimeCaffeine(morningTs, '23:00', eveningEntry);
assert.ok(Math.abs(bedtimeData.projectedMg - 139.4) < 1, `Bedtime caffeine should be ~139.4mg after 5.7h half life, got ${bedtimeData.projectedMg}`);
assert.strictEqual(bedtimeData.exceedsThreshold, true, 'Bedtime projected caffeine should exceed sleep threshold');
assert.strictEqual(bedtimeData.warningLevel, 'danger', 'High bedtime residual should trigger danger warning level');
console.log('  ✅ calculateBedtimeCaffeine()');

// 2. safeCaffeineCutoff()
const cutoff = sandbox.safeCaffeineCutoff('23:00', 100, 25, morningTs);
// For 100mg down to 25mg: 2 half lives = 11.4 hours before 23:00 => 11:36 cutoff
assert.strictEqual(cutoff.clearanceHours, 11.4, '100mg to 25mg threshold should require exactly 11.4 clearance hours');
assert.strictEqual(cutoff.cutoffTimeStr, '11:36', 'Cutoff for 23:00 bedtime should be 11:36');
assert.strictEqual(cutoff.isPastCutoff, false, '09:00 morning time should not be past 11:36 cutoff');

const lateTs = new Date('2026-06-14T16:00:00').getTime();
const lateCutoff = sandbox.safeCaffeineCutoff('23:00', 100, 25, lateTs);
assert.strictEqual(lateCutoff.isPastCutoff, true, '16:00 afternoon time should be past 11:36 cutoff');
console.log('  ✅ safeCaffeineCutoff()');

// 3. getCircadianFocusRecommendation()
// Case A: High caffeine (>100mg) => 50m Deep Focus
const peakEntries = [{ id: 'peak_caf', drink: 'machiato', qty: 1, date: '2026-06-14', time: '09:00', ts: morningTs }];
const recPeak = sandbox.getCircadianFocusRecommendation(morningTs, peakEntries);
assert.strictEqual(recPeak.tier, 'peak', 'High caffeine should recommend peak tier');
assert.strictEqual(recPeak.durationMin, 50, 'Peak tier should recommend 50m focus duration');
assert.strictEqual(recPeak.mode, 'deep_focus', 'Peak tier mode should be deep_focus');

// Case B: Moderate caffeine (40-100mg) => 25m Steady Sprint
const afternoonTs = morningTs + 6 * 3600000; // 6 hours later (15:00): 150 * 0.5^(6/5) = ~65mg
const recSteady = sandbox.getCircadianFocusRecommendation(afternoonTs, peakEntries);
assert.strictEqual(recSteady.tier, 'steady', '65mg in afternoon (15:00) should recommend steady tier');
assert.strictEqual(recSteady.durationMin, 25, 'Steady tier should recommend 25m duration');
assert.strictEqual(recSteady.mode, 'steady_focus', 'Steady tier mode should be steady_focus');

// Low caffeine (<40mg) => 15m Light Active Recall
const nightTs = morningTs + 12 * 3600000; // 12 hours later: 150 * 0.5^(12/5) = ~28mg
const recLow = sandbox.getCircadianFocusRecommendation(nightTs, peakEntries);
assert.strictEqual(recLow.tier, 'low', 'Low caffeine at night should recommend low tier');
assert.strictEqual(recLow.durationMin, 15, 'Low tier should recommend 15m light recall duration');
assert.strictEqual(recLow.mode, 'light_recall', 'Low tier mode should be light_recall');
console.log('  ✅ getCircadianFocusRecommendation()');

console.log('✅ Tracker unit tests passed');
