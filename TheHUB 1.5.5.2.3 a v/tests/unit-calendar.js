const assert = require('assert');
const vm = require('vm');
const { createSandbox, loadScripts } = require('./unit-helpers');

const sandbox = createSandbox();
loadScripts(sandbox, ['modules/00-utils-config.js', 'modules/05-calendar.js']);

// --- parseYmd()/ymd() round-trip ---
const parsed = sandbox.parseYmd('2026-06-14');
assert.strictEqual(parsed.getFullYear(), 2026);
assert.strictEqual(parsed.getMonth(), 5);
assert.strictEqual(parsed.getDate(), 14);
assert.strictEqual(sandbox.ymd(parsed), '2026-06-14');
console.log('  ✅ parseYmd()/ymd()');

// --- daysBetween() ---
assert.strictEqual(sandbox.daysBetween('2026-06-15', '2026-06-14'), 1);
assert.strictEqual(sandbox.daysBetween('2026-06-14', '2026-06-14'), 0);
assert.strictEqual(sandbox.daysBetween('2026-06-13', '2026-06-14'), -1);
assert.strictEqual(sandbox.daysBetween('2026-07-01', '2026-06-30'), 1);
console.log('  ✅ daysBetween()');

// --- recurring expansion: none ---
const single = { id: 'single', title: 'Single', date: sandbox.todayStr(), recur: '' };
const singleExpanded = sandbox.expandRecurringEvent(single);
assert.strictEqual(singleExpanded.length, 1);
assert.strictEqual(singleExpanded[0].id, 'single');
assert.strictEqual(singleExpanded[0].date, single.date);
console.log('  ✅ non-recurring event');

// --- recurring expansion: daily ---
const daily = { id: 'daily', title: 'Daily', date: sandbox.todayStr(), recur: 'daily' };
const dailyExpanded = sandbox.expandRecurringEvent(daily);
assert.ok(dailyExpanded.length >= 360 && dailyExpanded.length <= 366, 'daily recurrence should expand to roughly one year');
assert.strictEqual(dailyExpanded[0].id, 'daily');
assert.strictEqual(dailyExpanded[1].date, sandbox.addDaysStr(sandbox.todayStr(), 1));
assert.strictEqual(dailyExpanded[1].id, `daily@${sandbox.addDaysStr(sandbox.todayStr(), 1)}`);
assert.strictEqual(dailyExpanded[1].isOccurrence, true);
console.log('  ✅ daily recurrence');

// --- recurring expansion: weekly ---
const weekly = { id: 'weekly', title: 'Weekly', date: sandbox.todayStr(), recur: 'weekly' };
const weeklyExpanded = sandbox.expandRecurringEvent(weekly);
assert.ok(weeklyExpanded.length >= 52 && weeklyExpanded.length <= 53, 'weekly recurrence should expand to roughly one year');
assert.strictEqual(weeklyExpanded[1].date, sandbox.addDaysStr(sandbox.todayStr(), 7));
console.log('  ✅ weekly recurrence');

// --- recurring expansion: monthly ---
const monthly = { id: 'monthly', title: 'Monthly', date: '2026-01-15', recur: 'monthly' };
const monthlyExpanded = sandbox.expandRecurringEvent(monthly);
assert.ok(monthlyExpanded.length >= 2, 'monthly recurrence should produce future occurrences');
assert.strictEqual(monthlyExpanded[1].date, '2026-02-15');
console.log('  ✅ monthly recurrence');

// --- getAllEvents() combines local expanded events + Mapúa events ---
vm.runInContext(`EVENTS = [{ id:'e1', title:'Weekly Local', type:'event', date:todayStr(), recur:'weekly', color:'#ff6b6b', fired:[] }]; MAPUA_EVENTS = [{ id:'mapua1', title:'Mapúa Test', type:'deadline', date:todayStr(), color:'#e03a3a', fired:[] }];`, sandbox);
const all = sandbox.getAllEvents();
assert.ok(all.some(e => e.id === 'e1'), 'getAllEvents should include local event');
assert.ok(all.some(e => e.id === 'mapua1'), 'getAllEvents should include Mapúa events');
assert.ok(all.some(e => e.id.startsWith('e1@')), 'getAllEvents should include recurring occurrences');
console.log('  ✅ getAllEvents()');

// --- ICS parsing: basic event ---
const basicIcs = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:test-1@hub\nDTSTART:20260620T140000\nSUMMARY:Team Meeting\nDESCRIPTION:Project sync\nEND:VEVENT\nEND:VCALENDAR`;
const basicParsed = sandbox.parseIcsEvents(basicIcs);
assert.strictEqual(basicParsed.length, 1);
assert.strictEqual(basicParsed[0].title, 'Team Meeting');
assert.strictEqual(basicParsed[0].type, 'event');
assert.strictEqual(basicParsed[0].date, '2026-06-20');
assert.strictEqual(basicParsed[0].time, '14:00');
assert.strictEqual(basicParsed[0].notes, 'Project sync');
console.log('  ✅ ICS parsing: basic event');

// --- ICS parsing: folded lines ---
const foldedIcs = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:test-2@hub\nDTSTART:20260621T090000\nSUMMARY:Very Long Title That Is\n Folded Over Two Lines\nDESCRIPTION:Notes\nEND:VEVENT\nEND:VCALENDAR`;
const foldedParsed = sandbox.parseIcsEvents(foldedIcs);
assert.strictEqual(foldedParsed.length, 1);
assert.strictEqual(foldedParsed[0].title, 'Very Long Title That IsFolded Over Two Lines');
console.log('  ✅ ICS parsing: folded lines');

// --- ICS parsing: all-day event ---
const allDayIcs = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:test-3@hub\nDTSTART;VALUE=DATE:20260622\nSUMMARY:Holiday\nEND:VEVENT\nEND:VCALENDAR`;
const allDayParsed = sandbox.parseIcsEvents(allDayIcs);
assert.strictEqual(allDayParsed.length, 1);
assert.strictEqual(allDayParsed[0].date, '2026-06-22');
assert.strictEqual(allDayParsed[0].time, '');
console.log('  ✅ ICS parsing: all-day event');

// --- ICS parsing: UTC conversion ---
const utcIcs = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:test-4@hub\nDTSTART:20260620T120000Z\nSUMMARY:UTC Event\nEND:VEVENT\nEND:VCALENDAR`;
const utcParsed = sandbox.parseIcsEvents(utcIcs);
assert.strictEqual(utcParsed.length, 1);
assert.strictEqual(utcParsed[0].title, 'UTC Event');
// The exact local time depends on the test runner's timezone, but date should be 2026-06-20.
assert.strictEqual(utcParsed[0].date, '2026-06-20');
assert.ok(utcParsed[0].time, 'UTC event should have a time');
console.log('  ✅ ICS parsing: UTC conversion');

// --- ICS parsing: recurrence rule ---
const recurIcs = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:test-5@hub\nDTSTART:20260620T100000\nRRULE:FREQ=WEEKLY;BYDAY=MO\nSUMMARY:Weekly Standup\nEND:VEVENT\nEND:VCALENDAR`;
const recurParsed = sandbox.parseIcsEvents(recurIcs);
assert.strictEqual(recurParsed.length, 1);
assert.strictEqual(recurParsed[0].recur, 'weekly');
console.log('  ✅ ICS parsing: recurrence rule');

// --- ICS parsing: VALARM triggers ---
const alarmIcs = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:test-6@hub\nDTSTART:20260620T100000\nSUMMARY:Deadline\nBEGIN:VALARM\nTRIGGER:-P2D\nACTION:DISPLAY\nEND:VALARM\nBEGIN:VALARM\nTRIGGER:-PT0M\nACTION:DISPLAY\nEND:VALARM\nEND:VEVENT\nEND:VCALENDAR`;
const alarmParsed = sandbox.parseIcsEvents(alarmIcs);
assert.strictEqual(alarmParsed.length, 1);
assert.strictEqual(alarmParsed[0].remind, '2,0');
console.log('  ✅ ICS parsing: VALARM triggers');

// --- ICS parsing: deadline detection ---
const deadlineIcs = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:test-7@hub\nDTSTART:20260620T235900\nSUMMARY:Assignment Submission\nEND:VEVENT\nEND:VCALENDAR`;
const deadlineParsed = sandbox.parseIcsEvents(deadlineIcs);
assert.strictEqual(deadlineParsed.length, 1);
assert.strictEqual(deadlineParsed[0].type, 'deadline');
console.log('  ✅ ICS parsing: deadline detection');

console.log('✅ Calendar unit tests passed');
