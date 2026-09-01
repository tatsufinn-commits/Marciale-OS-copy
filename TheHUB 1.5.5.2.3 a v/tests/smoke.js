const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((ent) => {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (['node_modules', '.git'].includes(ent.name)) return [];
      return walk(p);
    }
    return p.endsWith('.js') ? [p] : [];
  });
}

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: 'inherit' });
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

for (const file of walk('.')) {
  run(process.execPath, ['--check', file]);
}

try {
  run('python3', ['-m', 'py_compile', 'server.py', 'ollama-proxy.py']);
} catch (e) {
  // Windows often exposes Python as "py" instead of "python3".
  run('py', ['-3', '-m', 'py_compile', 'server.py', 'ollama-proxy.py']);
} finally {
  fs.rmSync('__pycache__', { recursive: true, force: true });
}

const utils = fs.readFileSync('modules/00-utils-config.js', 'utf8');
assert(utils.includes('hub.tasks.v1'), 'HUB_KEYS must include task storage');
assert(utils.includes('hub.activity.v1'), 'HUB_KEYS must include activity heatmap storage');
assert(utils.includes('confirmBrainSafety'), 'Brain safety confirmation helper should exist');
assert(utils.includes('TRUST BOUNDARIES'), 'Recommended Marciale brain should include trust boundaries');
assert(utils.includes('BRAIN_PROFILES'), 'Marciale brain profiles should exist');
assert(utils.includes('professional') && utils.includes('instructor') && utils.includes('marciale'), 'New Marciale profile set should include professional, instructor, and marciale');
assert(utils.includes('previewBrainPrompt'), 'Brain preview helper should exist');
assert(utils.includes('brainHygieneReport'), 'Brain hygiene report helper should exist');
assert(utils.includes('dedupeBrain'), 'Brain duplicate-removal helper should exist');
assert(utils.includes('hub.notes.library.v1'), 'HUB_KEYS must include note-library storage');
assert(utils.includes('hub.activity.archive.index.v1'), 'HUB_KEYS must include activity archive index storage');
assert(utils.includes('hub.experimental.v1'), 'HUB_KEYS must include Category C experimental settings');
assert(utils.includes('hub.companion.v1'), 'HUB_KEYS must include Companion shell settings');
assert(utils.includes('hub.companion.events.v1'), 'HUB_KEYS must include Companion event bridge settings');
assert(utils.includes('hub.info.center.v1'), 'HUB_KEYS must include Build 26.8.3 Information Center settings');
assert(utils.includes('hub.notifications.v1'), 'HUB_KEYS must include Build 26.8.5 notification settings');
assert(utils.includes('hubNotify'), 'Build 26.8.5 desktop notification helper should exist');
assert(utils.includes('requestHubNotificationPermission'), 'Build 26.8.5 notification permission helper should exist');
assert(utils.includes('INFO_CENTER_KEY'), 'Build 26.8.3 should define Information Center key');
assert(utils.includes('infoCenterPromptBlock'), 'Build 26.8.3 should provide Marciale Information Center prompt block');
assert(utils.includes('ACTIVITY_ARCHIVE_PREFIX'), 'Build 23 activity archive prefix should exist');
assert(utils.includes('loadActivityArchiveFromIndexedDB'), 'Build 23 should load archived activity from IndexedDB');
assert(utils.includes('archiveActivityEntries'), 'Build 23 should archive older activity entries');
assert(utils.includes('allHubStorageKeys'), 'Backups/sync should include dynamic hub.* keys');
assert(utils.includes('mirrorHubStorageToIndexedDB'), 'Utilities should expose IndexedDB mirror helper');
const storageModule = fs.readFileSync('modules/00-storage.js', 'utf8');
assert(storageModule.includes('HubStorage'), 'Build 6 storage foundation should define HubStorage');

const notebook = fs.readFileSync('modules/06-notebook.js', 'utf8');
assert(notebook.includes('Build 22'), 'Build 22 notes IndexedDB storage should be documented');
assert(notebook.includes('NOTE_BODY_PREFIX'), 'Build 22 should define note body payload prefix');
assert(notebook.includes('loadNoteBody'), 'Build 22 should expose note body loader');
assert(notebook.includes('migrateNoteBodies'), 'Build 22 should migrate legacy note bodies out of metadata');

const tasks = fs.readFileSync('modules/11-tasks.js', 'utf8');
assert(/TASKS\s*=\s*Array\.isArray\(saved\)/.test(tasks), 'loadTasks should update the TASKS array, not only window.TASKS');
assert(/window\.TASKS\s*=\s*TASKS/.test(tasks), 'TASKS should stay exposed for tests/assistant context');
assert(tasks.includes('PROJECTS_KEY'), 'Project Mode should define project storage');
assert(tasks.includes('projectProgress'), 'Project Mode should provide progress helper');
assert(tasks.includes('createProjectFromPrompt'), 'Project Mode should provide project creation helper');
assert(tasks.includes('projectEventList'), 'Project relationships should include linked events');
assert(tasks.includes('projectNoteList'), 'Project relationships should include linked notes');
assert(tasks.includes('showProjectDetail'), 'Project relationships should expose project detail view');
assert(tasks.includes('projectPremortemPrompt'), 'Project Pre-mortem prompt builder should exist');
assert(tasks.includes('draftProjectPremortem'), 'Project Pre-mortem draft action should exist');
const experimental = fs.readFileSync('modules/13-experimental.js', 'utf8');
assert(experimental.includes('EXPERIMENTAL_KEY'), 'Build C0 should define experimental settings key');
assert(experimental.includes('experimentalSettings'), 'Build C0 should expose experimentalSettings helper');
assert(experimental.includes('experimentalEnabled'), 'Build C0 should expose experimentalEnabled helper');
assert(experimental.includes('safeExperimentalRun'), 'Build C0 should expose safeExperimentalRun helper');
assert(experimental.includes('initExperimentalSystems'), 'Build C0 should expose initExperimentalSystems helper');
const companion = fs.readFileSync('modules/14-companion.js', 'utf8');
assert(companion.includes('Momentum Companion'), 'Build 24 Companion Shell module should exist');
assert(companion.includes('COMPANION_KEY'), 'Build 24 should define companion storage key');
assert(companion.includes('companionXpFromActivity'), 'Build 24 should derive companion XP from Hub Activity');
assert(companion.includes('renderCompanionCard'), 'Build 24 should render companion card');
assert(companion.includes('initCompanion'), 'Build 24 should expose companion initializer');
assert(companion.includes('emitCompanionEvent'), 'Build 25 should expose Companion Event Bridge emitter');
assert(companion.includes('COMPANION_EVENTS_KEY'), 'Build 25 should define Companion event storage key');
assert(companion.includes('loadCompanionEvents'), 'Build 25 should expose Companion event log loader');
assert(companion.includes('COMPANION_FRAME_SRC'), 'Build 26 should define local Idle Hero iframe source');
assert(companion.includes('postCompanionEventToFrame'), 'Build 26 should expose Hub to Idle Hero postMessage bridge');
assert(fs.readFileSync('companion/IDLE_HERO_SOURCE.md','utf8').includes('github.com/alexis-labs/idle-hero'), 'Build 26 should document real Idle Hero GitHub source');
assert(companion.includes('companionFrameStatus'), 'Build 26 should render iframe load/status UI');
assert(companion.includes('COMPANION_REWARD_VERSION'), 'Build 26.1 should version companion reward payloads');
assert(companion.includes('companionRewardForEvent'), 'Build 26.1 should map Hub events to structured Idle Hero rewards');
assert(companion.includes('retryCompanionUndeliveredEvents'), 'Build 26.1 should support retrying undelivered reward events');
assert(companion.includes('openCompanionFullView'), 'Build 26.2 should expose Idle Hero full-view overlay helper');
assert(companion.includes('companionInlineFrameHtml'), 'Build 26.2 should support optional inline Idle Hero iframe');
assert(companion.includes('syncCompanionControls'), 'Build 26.2 should expose companion settings controls');
assert(fs.readFileSync('companion/IDLE_HERO_SOURCE.md','utf8').includes('Build 26.1'), 'Build 26.1 should document the Idle Hero reward receiver adapter');

const assistant = fs.readFileSync('modules/08-assistant.js', 'utf8');
assert(assistant.includes('nativeToolDefinitions'), 'Assistant should build native Ollama tool schemas');
assert(assistant.includes('normalizeToolArgs'), 'Assistant should parse native tool-call argument strings safely');
assert(assistant.includes('readOllamaChatStream'), 'Assistant should support streaming text responses');
assert(assistant.includes('mergeStreamToolCalls'), 'Assistant should buffer streamed tool-call chunks safely');
assert(assistant.includes('strictToolActionsFromCalls'), 'Assistant should strictly validate streamed tool-call args');
assert(assistant.includes('hub.ai.streaming'), 'Assistant streaming preference should persist locally');
assert(assistant.includes('AI_MODEL_PRESETS'), 'Build 26.8.6 should define AI model presets');
assert(assistant.includes('applyAiModelPreset'), 'Build 26.8.6 should expose model preset apply helper');
assert(assistant.includes('checkOllamaLoadedModels'), 'Build 26.8.6 should expose loaded model status helper');
assert(assistant.includes('AI Resource Governor'), 'Build 19A AI Resource Governor should exist');
assert(assistant.includes('ollamaPayload'), 'Build 19A should add resource-governed Ollama payload helper');
assert(assistant.includes('unloadCurrentOllamaModel'), 'Build 19A should expose model unload helper');
assert(assistant.includes('modelWarningText'), 'Build 19A should warn about heavy models');

const tracker = fs.readFileSync('modules/04-tracker.js', 'utf8');
assert(tracker.includes('BIO_METRICS_KEY'), 'Biometric intake profile storage should exist');
assert(tracker.includes('bmrMifflinStJeor'), 'Biometric BMR formula helper should exist');
assert(tracker.includes('personalIntakeLimits'), 'Personalized intake limit helper should exist');
assert(tracker.includes('radialStatCard'), 'Build 20 should render radial intake cards');
assert(tracker.includes('renderQuickDrinkTiles'), 'Build 20 should render quick-add drink tiles');
assert(tracker.includes('sleep-clearance-card'), 'Build 20 should render improved sleep clearance card');
const today = fs.readFileSync('modules/12-today.js', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
assert(today.includes('renderActivityHeatmap'), 'Today dashboard should render the activity heatmap');
assert(today.includes('buildMarcialeStrategicDirectives'), 'Strategic Directives builder should exist');
assert(today.includes('STRICT JSON DIRECTIVES'), 'Deep strategic scan should request strict JSON directives');
assert(css.includes('Today grid fix after Focus Session insertion'), 'CSS should include Today grid fix for Ask Marciale after Focus insertion');
assert(css.includes('AI Resource Governor — Build 19A'), 'CSS should include Build 19A AI Resource Governor polish');
assert(css.includes('Intake Tracker Radial UI Polish — Build 20'), 'CSS should include Build 20 tracker radial polish');
assert(css.includes('AI Workspace IndexedDB Storage — Build 21'), 'CSS should include Build 21 workspace storage polish');
assert(css.includes('Notes Library IndexedDB Storage — Build 22'), 'CSS should include Build 22 notes storage polish');
assert(css.includes('Activity Archive IndexedDB Storage — Build 23'), 'CSS should include Build 23 activity archive polish');
assert(css.includes('Category C Foundation — Build C0'), 'CSS should include Build C0 experimental systems polish');
assert(css.includes('Momentum Companion Shell — Build 24'), 'CSS should include Build 24 companion shell polish');
assert(css.includes('Companion Event Bridge — Build 25'), 'CSS should include Build 25 companion event bridge polish');
assert(css.includes('Idle Hero Local Embed — Build 26'), 'CSS should include Build 26 Idle Hero iframe embed styling');
assert(css.includes('Idle Hero Reward Receiver Adapter — Build 26.1'), 'CSS should include Build 26.1 reward receiver adapter styling');
assert(css.includes('Idle Hero Full View + Performance Controls'), 'CSS should include Build 26.2 full-view/performance styling');
assert(css.includes('Full Idle Hero inline on Today'), 'CSS should include Build 26.2.1 inline full Idle Hero layout');
assert(css.includes('Inline Idle Hero full-view chrome'), 'CSS should include Build 26.2.2 inline full-view chrome');
assert(css.includes('Idle Hero inside Hub Activity card'), 'CSS should include Build 26.2.3 Activity card embed layout');
assert(css.includes('Mini/Full Companion frame split'), 'CSS should include Build 26.2.4 mini/full companion frame split');
assert(css.includes('Idle Hero page + Activity mini visibility fix'), 'CSS should include Build 26.2.5 Idle Hero page sizing and mini visibility fix');
assert(css.includes('Stretch mini companion to full Hub Activity height'), 'CSS should include Build 26.2.6 activity companion height stretch fix');
assert(css.includes('Robust Hub Activity two-column companion layout'), 'CSS should include Build 26.2.7 robust Activity companion layout');
assert(css.includes('Expand Idle Hero iframe for usability'), 'CSS should include expanded Idle Hero iframe usability fix');
assert(css.includes('Focus Session controls de-cramped'), 'CSS should include focus session control de-cramping fix');
assert(css.includes('LOCK IN rename + Today Glance relocation'), 'CSS should include Build 26.8.2 quick UX wins');
assert(css.includes('Information Center — Build 26.8.3'), 'CSS should include Build 26.8.3 Information Center styling');
assert(css.includes('Resilient Today grid after dynamic Companion insertion'), 'CSS should include the Companion grid-width fix');
assert(css.includes('Category C tab placeholders'), 'CSS should include ChessLab/RuView tab placeholder styling');
assert(today.includes('startFocusSession'), 'Focus Sessions should expose startFocusSession');
assert(today.includes('focus_session_completed'), 'Focus Sessions should log activity completion');
assert(today.includes('autopilotHoursUntilDate'), 'Autopilot tuning should use hour-based deadline thresholds');
assert(today.includes('maxInProgress'), 'Autopilot tuning should support max in-progress threshold');
assert(utils.includes('autopilotTuningSummary'), 'Autopilot tuning summary helper should exist');
assert(utils.includes('AUTOPILOT_LOG_LIMIT'), 'Autopilot audit log should have a bounded retention limit');
assert(utils.includes('normalizeAutopilotLog'), 'Autopilot audit log should prune safely near storage limits');

const html = fs.readFileSync('index.html', 'utf8');
const portal = fs.readFileSync('modules/02-portal.js', 'utf8');
assert(html.includes('modules/13-experimental.js'), 'index.html should load Category C experimental registry module');
assert(html.includes('modules/14-companion.js'), 'index.html should load Build 24/26 Companion module');
assert(fs.existsSync('companion/index.html') && fs.existsSync('companion/IDLE_HERO_SOURCE.md') && fs.existsSync('companion/assets') && fs.readdirSync('companion/assets').some(f=>f.endsWith('.js')), 'Build 26 should include built Idle Hero static files');
assert(fs.existsSync('companion-mini/index.html') && fs.existsSync('companion-mini/companion-mini.js'), 'Build 26.2.4 should include mini companion iframe files');
assert(html.includes('data-page="idlehero"') && html.includes('page-idlehero'), 'index.html should include Idle Hero as a main page');
assert(html.includes('data-page="chess"') && html.includes('page-chess'), 'index.html should include ChessLab as a main tab');
assert(html.includes('data-page="ruview"') && html.includes('page-ruview'), 'index.html should include RuView as a main tab');
assert(html.includes('Experimental Systems'), 'index.html should include Experimental Systems controls');
assert(html.includes('todayGlancePanel') && html.includes('LOCK IN'), 'index.html should include Build 26.8.2 Today glance relocation and LOCK IN label');
assert(html.includes('Information Center') && html.includes('infoCenterStatus'), 'index.html should include Build 26.8.3 Information Center controls');
assert(html.includes('Desktop notifications') && html.includes('notificationStatus'), 'index.html should include Build 26.8.5 desktop notification controls');
assert(html.includes('aiModelPreset') && html.includes('aiLoadedStatus'), 'index.html should include Build 26.8.6 model upgrade controls');
assert(html.includes('companionInlineGame') && html.includes('companionPauseHidden'), 'index.html should include Build 26.2 Companion performance controls');
assert(html.includes('modules/00-storage.js'), 'index.html should load storage foundation before utils');
assert(html.indexOf('modules/12-today.js') < html.indexOf('modules/13-experimental.js') && html.indexOf('modules/13-experimental.js') < html.indexOf('modules/14-companion.js') && html.indexOf('modules/14-companion.js') < html.indexOf('modules/09-main.js'), 'experimental registry and companion should load before main boot');
assert(html.indexOf('modules/00-storage.js') < html.indexOf('modules/00-utils-config.js'), 'storage foundation should load before utilities');
assert(html.includes('Bookmark modal is generated dynamically'), 'index.html should note migrated bookmark modal');
assert(html.includes('Portal tile and section modals are generated dynamically'), 'index.html should note migrated portal modals');
assert(html.includes('Assistant connection modal is generated dynamically'), 'index.html should note migrated assistant settings modal');
assert(html.includes('aiKeepAlive') && html.includes('aiAutopilotModel'), 'index.html should include Build 19A AI Resource Governor controls');
assert(!/<div class="overlay" id="overlay">/.test(html), 'bookmark modal markup should not live in index.html');
assert(!/<div class="overlay" id="pOverlay">/.test(html), 'portal tile modal markup should not live in index.html');
assert(!/<div class="overlay" id="sOverlay">/.test(html), 'section modal markup should not live in index.html');
assert(!/<div class="overlay" id="setOverlay">/.test(html), 'assistant settings modal markup should not live in index.html');
assert(utils.includes('function createModal'), 'modal factory should exist in utilities');
assert(portal.includes('ensurePortalModals'), 'portal module should generate its modals dynamically');
assert(assistant.includes('ensureAssistantSettingsModal'), 'assistant module should generate settings modal dynamically');
const bookmarks = fs.readFileSync('modules/03-bookmarks.js', 'utf8');
assert(bookmarks.includes('ensureBookmarkModal'), 'bookmarks module should generate bookmark modal dynamically');
assert(assistant.includes('showChatFloatingMenu'), 'Build 26.8.4 Marciale floating chat menu should exist');
assert(assistant.includes('aiChatFloatingMenu'), 'Build 26.8.4 should render body-level floating chat menu');
assert(css.includes('Marciale floating chat menu'), 'CSS should include Build 26.8.4 Marciale floating menu styling');
assert(css.includes('Desktop Notifications — Build 26.8.5'), 'CSS should include Build 26.8.5 desktop notification styling');
assert(css.includes('Notification settings overflow fix'), 'CSS should include Build 26.8.5.1 notification settings overflow fix');
assert(css.includes('Model Upgrade — Build 26.8.6'), 'CSS should include Build 26.8.6 model upgrade styling');
assert(assistant.includes('showHubErrorLog'), 'debug log UI should be available');
assert(assistant.includes('createRestorePoint'), 'restore point manager should be available');
assert(assistant.includes('showRestoreCenter'), 'restore center UI should be available');
assert(assistant.includes('validateHubSnapshot'), 'restore/import validation should be available');
assert(assistant.includes('hubDataSnapshotFull'), 'Build 26.8 backup should export IndexedDB payload snapshots');
assert(assistant.includes('collectIndexedDbPayloads'), 'Build 26.8 backup should collect IndexedDB payloads');
assert(assistant.includes('restoreIndexedDbPayloads'), 'Build 26.8 restore should restore IndexedDB payloads');
assert(assistant.includes('assistantDateGuard'), 'Build 26.8 Marciale date guard should exist');
assert(assistant.includes('Suspicious past year'), 'Build 26.8 date guard should reject accidental old years');
assert(assistant.includes('chatFullStorageKey'), 'chat IndexedDB full-history mirror should be available');
assert(assistant.includes('AI Workspace IndexedDB document storage'), 'Build 21 AI workspace IndexedDB storage should exist');
assert(assistant.includes('AI_WORKSPACE_DOC_PREFIX'), 'Build 21 should define workspace document payload key prefix');
assert(assistant.includes('loadAiWorkspaceDoc'), 'Build 21 should expose workspace document loader');
assert(assistant.includes('migrateAiWorkspaceDocs'), 'Build 21 should migrate legacy workspace text out of metadata');

console.log('✅ Smoke checks passed');
