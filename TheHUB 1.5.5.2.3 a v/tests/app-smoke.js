const fs = require('fs');
const { spawn } = require('child_process');
const http = require('http');
const { JSDOM } = require('jsdom');

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}
function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

function ping(url) {
  return new Promise(resolve => {
    const req = http.get(url, res => {
      res.resume();
      resolve(res.statusCode >= 200 && res.statusCode < 500);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => { req.destroy(); resolve(false); });
  });
}
async function waitForServer(url, timeoutMs = 6000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await ping(url)) return;
    await wait(150);
  }
  throw new Error('local server did not start');
}

function makeStorage(seed) {
  const data = { ...seed };
  return {
    get length() { return Object.keys(data).length; },
    key(i) { return Object.keys(data)[i] || null; },
    getItem(k) { return Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null; },
    setItem(k, v) { data[k] = String(v); },
    removeItem(k) { delete data[k]; },
    clear() { Object.keys(data).forEach(k => delete data[k]); },
    _data: data,
  };
}

(async () => {
  fs.rmSync('hub-data.json', { force: true });
  const server = spawn(process.env.PYTHON || 'python3', ['server.py'], { stdio: 'ignore' });
  let dom;
  try {
    await waitForServer('http://127.0.0.1:8000/');
    const html = fs.readFileSync('index.html', 'utf8');
    const storage = makeStorage({
      'hub.tasks.v1': JSON.stringify([]),
      'hub.events.v1': JSON.stringify([{ id: 'evt123', title: 'Finish Architecture Draft', type: 'deadline', date: '2026-10-10', priority: 'high' }]),
    });
    const aiRequests = [];

    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: 'http://127.0.0.1:8000/',
      pretendToBeVisual: true,
      beforeParse(window) {
        Object.defineProperty(window, 'localStorage', { value: storage, configurable: true });
        window.crypto = {
          getRandomValues: arr => arr,
          subtle: {
            importKey: async () => ({}),
            deriveKey: async () => ({}),
            encrypt: async () => new Uint8Array(16),
            decrypt: async () => new Uint8Array(16),
          },
        };
        window.fetch = async (url, opts = {}) => {
          const s = String(url || '');
          if (s.includes('/api/mapua')) return { ok: true, json: async () => ({ ok: true, events: [] }) };
          if (s.includes('/api/fetch')) return { ok: true, json: async () => ({ ok: true, text: 'Mock Website Content' }) };
          if (s.includes('/api/tags')) return { ok: true, json: async () => ({ models: [{ name: 'qwen2.5:7b' }, { name: 'llama3.2:3b' }, { name: 'qwen2.5:14b' }] }) };
          if (s.includes('/api/ps')) return { ok: true, json: async () => ({ models: [{ name: 'qwen2.5:7b', size: 4200000000 }] }) };
          if (s.includes('/api/chat')) {
            let payload = {};
            try { payload = JSON.parse(opts.body || '{}'); } catch (_) {}
            aiRequests.push({ url: s, payload });
            if (payload.stream) {
              const enc = new TextEncoder();
              const lastUser = (payload.messages || []).filter(m => m.role === 'user').slice(-1)[0]?.content || '';
              return { ok: true, body: new ReadableStream({ start(controller) {
                if (lastUser.includes('bad stream tool')) {
                  controller.enqueue(enc.encode(JSON.stringify({ message: { content: 'Malformed tool incoming.', tool_calls: [{ index: 0, function: { name: 'add_task', arguments: '{"title":' } }] }, done: false }) + '\n'));
                  controller.enqueue(enc.encode(JSON.stringify({ done: true, message: {} }) + '\n'));
                  controller.close();
                  return;
                }
                if (lastUser.includes('stream tool')) {
                  controller.enqueue(enc.encode(JSON.stringify({ message: { content: 'Prepared streamed action.', tool_calls: [{ index: 0, function: { name: 'add_task', arguments: '{"title":"Stream' } }] }, done: false }) + '\n'));
                  controller.enqueue(enc.encode(JSON.stringify({ message: { tool_calls: [{ index: 0, function: { arguments: ' Tool Task","status":"todo"}' } }] }, done: false }) + '\n'));
                  controller.enqueue(enc.encode(JSON.stringify({ done: true, message: {} }) + '\n'));
                  controller.close();
                  return;
                }
                controller.enqueue(enc.encode(JSON.stringify({ message: { content: 'Streamed ' }, done: false }) + '\n'));
                controller.enqueue(enc.encode(JSON.stringify({ message: { content: 'response' }, done: false }) + '\n'));
                controller.enqueue(enc.encode(JSON.stringify({ done: true, message: {} }) + '\n'));
                controller.close();
              }}) };
            }
            return { ok: true, json: async () => ({ message: { content: 'AI summary: focus on the urgent deadline, protect one work block, and create a Kanban task.' } }) };
          }
          if (s.includes('/api/generate')) {
            let payload = {};
            try { payload = JSON.parse(opts.body || '{}'); } catch (_) {}
            aiRequests.push({ url: s, payload });
            return { ok: true, json: async () => ({ done: true }) };
          }
          return { ok: true, json: async () => ({}) };
        };
        window.__notifications = [];
        class MockNotification {
          static permission = 'granted';
          static async requestPermission() { MockNotification.permission = 'granted'; return 'granted'; }
          constructor(title, opts = {}) { window.__notifications.push({ title, opts }); }
        }
        window.Notification = MockNotification;
        window.Audio = function(){ return { volume: 1, currentTime: 0, play(){ return Promise.resolve(); } }; };
        window.navigator.serviceWorker = { register: async () => ({}) };
        window.confirm = () => true;
        window.prompt = (_msg, def = '') => def || 'RESET';
        window.alert = () => {};
      }
    });

    const errors = [];
    dom.window.addEventListener('error', e => errors.push(e.message));
    await wait(2500);
    assert(errors.length === 0, 'DOM errors: ' + errors.join('; '));

    const win = dom.window;
    const doc = win.document;

    assert(typeof win.createModal === 'function', 'modal factory should be available');
    assert(typeof win.ensureBookmarkModal === 'function', 'bookmark modal factory should be available');
    assert(typeof win.ensurePortalModals === 'function', 'portal modal factory should be available');
    assert(typeof win.ensureAssistantSettingsModal === 'function', 'assistant settings modal factory should be available');
    assert(doc.getElementById('overlay'), 'bookmark modal should be generated dynamically at boot');
    assert(doc.getElementById('pOverlay'), 'portal tile modal should be generated dynamically at boot');
    assert(doc.getElementById('sOverlay'), 'section modal should be generated dynamically at boot');
    assert(doc.getElementById('setOverlay'), 'assistant settings modal should be generated dynamically at boot');
    assert(typeof win.experimentalSettings === 'function', 'Build C0 experimentalSettings helper should exist');
    assert(typeof win.experimentalEnabled === 'function', 'Build C0 experimentalEnabled helper should exist');
    assert(typeof win.safeExperimentalRun === 'function', 'Build C0 safeExperimentalRun helper should exist');
    assert(doc.getElementById('experimentalStatus'), 'Build C0 Experimental Systems status should exist');
    assert(doc.getElementById('experimentalCompanionEnabled'), 'Build C0 Companion toggle should exist');
    assert(doc.getElementById('experimentalChessEnabled'), 'Build C0 Chess toggle should exist');
    assert(doc.getElementById('experimentalPresenceEnabled'), 'Build C0 Presence toggle should exist');
    assert(doc.getElementById('experimentalRuViewUrl'), 'Build C0 RuView URL control should exist');
    assert(typeof win.hubNotify === 'function', 'Build 26.8.5 hubNotify helper should exist');
    assert(doc.getElementById('notificationStatus'), 'Build 26.8.5 desktop notification status should exist');
    doc.getElementById('notificationsEnabled').checked = true;
    doc.getElementById('notificationsInstructor').checked = true;
    doc.getElementById('notificationsAutopilot').checked = true;
    doc.getElementById('notificationsCooldown').value = '0';
    doc.getElementById('notificationsEnabled').dispatchEvent(new win.Event('change', { bubbles: true }));
    assert(JSON.parse(storage.getItem('hub.notifications.v1') || '{}').enabled === true, 'Notification settings should persist');
    win.hubNotify('Build notification test', 'hello', { type: 'instructor', tag: 'app-smoke-notify', toast: false });
    assert(win.__notifications.some(n => n.title === 'Build notification test'), 'hubNotify should send browser desktop notification when enabled and permission granted');
    assert(doc.querySelectorAll('.tab').length >= 11, 'Hub should expose main tabs including Idle Hero, ChessLab, RuView, and TAMAKEE Studio');
    assert(doc.querySelector('.tab[data-page="chess"]') && doc.getElementById('page-chess'), 'ChessLab tab/page should exist');
    assert(doc.querySelector('.tab[data-page="ruview"]') && doc.getElementById('page-ruview'), 'RuView tab/page should exist');
    assert(win.experimentalEnabled('chess') === false, 'ChessLab should start disabled in Experimental Systems');
    win.activatePage('chess');
    assert(doc.getElementById('page-chess').classList.contains('active'), 'ChessLab tab should activate its page');
    assert(doc.getElementById('page-chess').textContent.includes('ChessLab'), 'ChessLab heading should render');
    assert(doc.getElementById('chessBoard'), 'Build 27 ChessLab should render a local board');
    assert(doc.querySelectorAll('#chessBoard [data-chess-square]').length === 64, 'Build 27 ChessLab board should render 64 squares');
    assert(doc.querySelectorAll('#chessBoard .chess-piece').length === 32, 'Build 30.1 ChessLab should only render piece nodes for occupied squares');
    assert(doc.querySelector('#chessBoard .chess-piece.white') && doc.querySelector('#chessBoard .chess-piece.black'), 'Build 30.1 ChessLab should render distinct white and black piece styling');
    assert(doc.getElementById('chessEngineStatus'), 'Build 30.3 ChessLab should render engine foundation status');
    assert(typeof win.chessEngineCapabilities === 'function' && typeof win.chessEngineGetBestMove === 'function', 'Build 30.3 Chess engine foundation helpers should exist');
    assert(typeof win.chessTryMove === 'function', 'Build 27 ChessLab move helper should exist');
    assert(typeof win.chessDeclareResult === 'function', 'Build 28 Chess activity bridge helper should exist');
    assert(win.chessTryMove('e2', 'e4') === true, 'Build 27 ChessLab should apply a simple pawn move');
    assert(doc.getElementById('chessMoveList').textContent.includes('e4'), 'ChessLab move log should update after a move');
    assert(doc.getElementById('chessFenInput').value.includes('4P3'), 'Build 27 ChessLab FEN field should update after a move');
    assert(doc.getElementById('chessAnalyze'), 'Build 30 ChessLab should expose an Analyze with Marciale action');
    doc.getElementById('chessAnalyze').click();
    assert(doc.getElementById('page-ai').classList.contains('active'), 'Build 30 Chess analysis action should open Marciale');
    assert(doc.getElementById('aiText').value.includes('Current FEN:'), 'Build 30 Chess analysis action should send the current FEN to Marciale');
    assert(doc.getElementById('aiText').value.includes('Best move'), 'Build 30 Chess analysis action should request tactical move suggestions');
    win.activatePage('chess');
    doc.getElementById('experimentalChessEnabled').checked = true;
    doc.getElementById('experimentalChessRewards').checked = true;
    doc.getElementById('experimentalChessRewards').dispatchEvent(new win.Event('change', { bubbles: true }));
    const chessSettings = JSON.parse(storage.getItem('hub.experimental.v1') || '{}');
    assert(chessSettings.chess?.enabled === true && chessSettings.chess?.activityRewards === true, 'Build 28 Chess settings should persist when rewards are enabled');
    assert(doc.getElementById('chessOpponentMode'), 'Build 29 ChessLab should expose opponent controls');
    assert(doc.getElementById('chessBotGrid'), 'Build 30.8 ChessLab should render a bot selection grid');
    assert(doc.querySelectorAll('#chessBotGrid [data-chess-bot-card]').length >= 12, 'Build 30.8 ChessLab bot grid should show the full roster');
    assert(doc.getElementById('chessCoachPanel'), 'Build 30.9 ChessLab should render a Marciale Coach panel');
    assert(doc.getElementById('chessOpponentCharacter'), 'Build 30.6 ChessLab should expose character-based opponent controls');
    doc.getElementById('chessOpponentMode').value = 'local_ai';
    doc.getElementById('chessOpponentMode').dispatchEvent(new win.Event('change', { bubbles: true }));
    doc.getElementById('chessOpponentSide').value = 'b';
    doc.getElementById('chessOpponentSide').dispatchEvent(new win.Event('change', { bubbles: true }));
    doc.getElementById('chessOpponentCharacter').value = 'vera';
    doc.getElementById('chessOpponentCharacter').dispatchEvent(new win.Event('change', { bubbles: true }));
    assert(doc.getElementById('chessCharacterCard').textContent.includes('Professor Kenji Sato'), 'Build 30.6.1 ChessLab should render the polished selected character profile card');
    assert(doc.getElementById('chessCharacterCard').textContent.includes('deep calculation'), 'Build 30.6.1 ChessLab character card should show richer roster metadata');
    assert(doc.getElementById('chessBotGrid').textContent.includes('Offline'), 'Build 30.8 ChessLab bot cards should show offline/local labels');
    doc.getElementById('chessOpponentCharacter').value = 'marciale';
    doc.getElementById('chessOpponentCharacter').dispatchEvent(new win.Event('change', { bubbles: true }));
    assert(doc.getElementById('chessCharacterCard').textContent.includes('Marciale Chess'), 'Build 30.6.2 should expose Marciale as a special bot');
    assert(doc.getElementById('chessCharacterCard').textContent.includes('Abyssal') || doc.getElementById('chessCharacterCard').textContent.includes('Medium'), 'Build 30.6.2 Marciale card should show difficulty labels');
    assert(doc.getElementById('chessMarcialeElo'), 'Build 30.6.2 should render Marciale engine-strength controls');
    doc.getElementById('chessMarcialeElo').value = '7';
    doc.getElementById('chessMarcialeElo').dispatchEvent(new win.Event('input', { bubbles: true }));
    assert(win.chessStateSnapshot().aiElo === 3800, 'Build 30.6.2 Marciale should scale beyond 2800 up to 3800');
    assert(doc.getElementById('chessSoundEnabled') && doc.getElementById('chessSoundVolume'), 'Build 30.6.3 should expose sound controls');
    doc.getElementById('chessCoachDraft').click();
    await wait(100);
    assert(doc.getElementById('page-ai').classList.contains('active'), 'Build 30.9 coach action should open Marciale');
    assert(doc.getElementById('aiText').value.includes('CHESS COACH PACKET'), 'Build 30.9 coach draft should load the coach packet into Marciale');
    assert(doc.getElementById('aiText').value.includes('TOP CANDIDATE LINES'), 'Build 30.9 coach draft should include top candidate lines');
    win.activatePage('chess');
    doc.getElementById('chessSoundEnabled').checked = false;
    doc.getElementById('chessSoundEnabled').dispatchEvent(new win.Event('change', { bubbles: true }));
    doc.getElementById('chessSoundVolume').value = '35';
    doc.getElementById('chessSoundVolume').dispatchEvent(new win.Event('input', { bubbles: true }));
    const chessSound = JSON.parse(storage.getItem('hub.chess.sound.v1') || '{}');
    assert(chessSound.enabled === false && Math.round((chessSound.volume || 0) * 100) === 35, 'Build 30.6.3 Chess sound settings should persist');
    const aiMove = win.chessRunLocalOpponent({ silent: true });
    assert(aiMove && aiMove.from && aiMove.to, 'Build 29 local opponent should make an offline reply');
    assert(win.chessStateSnapshot().moves.length >= 2, 'Build 29 local opponent should append its move to the chess log');
    const beforeChessActivity = JSON.parse(storage.getItem('hub.activity.v1') || '[]').length;
    assert(win.chessDeclareResult('white_win') === true, 'Build 28 Chess activity bridge should log a result when rewards are enabled');
    const afterChessActivity = JSON.parse(storage.getItem('hub.activity.v1') || '[]');
    assert(afterChessActivity.length >= beforeChessActivity + 2, 'Build 28 Chess activity bridge should log match completion and win activity');
    assert(afterChessActivity.some(e => e.type === 'chess_match_completed'), 'Build 28 Chess activity bridge should write a match completion event');
    assert(afterChessActivity.some(e => e.type === 'chess_match_won'), 'Build 28 Chess activity bridge should write a chess win event');
    assert(doc.getElementById('chessHistoryList').textContent.includes('White win'), 'Build 28 Chess history should render logged results');
    win.activatePage('ruview');
    assert(doc.getElementById('page-ruview').classList.contains('active'), 'RuView tab should activate its page');
    assert(doc.getElementById('page-ruview').textContent.includes('RuView'), 'RuView placeholder should render');
    win.activatePage('today');
    assert(win.experimentalEnabled('companion') === false, 'Companion should still be disabled by default before its toggle is used');
    doc.getElementById('experimentalCompanionEnabled').checked = true;
    doc.getElementById('experimentalCompanionEnabled').dispatchEvent(new win.Event('change', { bubbles: true }));
    assert(win.experimentalEnabled('companion') === true, 'Experimental Companion toggle should persist');
    assert(JSON.parse(storage.getItem('hub.experimental.v1')).companion.enabled === true, 'Experimental settings should save to hub.experimental.v1');
    const safeResult = win.safeExperimentalRun('throw-test', () => { throw new Error('experimental boom'); });
    assert(safeResult === null, 'safeExperimentalRun should catch and return null on failure');
    assert(JSON.parse(storage.getItem('hub.errors.v1') || '[]').some(e => e.context === 'experimental:throw-test'), 'safeExperimentalRun should log caught experimental errors');
    doc.getElementById('experimentalCompanionEnabled').checked = false;
    doc.getElementById('experimentalCompanionEnabled').dispatchEvent(new win.Event('change', { bubbles: true }));
    assert(!doc.getElementById('companionCard'), 'Disabled Companion should not render a Today card in Build C0');
    assert(typeof win.infoCenter === 'function', 'Build 26.8.3 Information Center helper should exist');
    assert(doc.getElementById('infoCenterStatus'), 'Information Center status should exist');
    doc.getElementById('infoName').value = 'Ariston';
    doc.getElementById('infoSchool').value = 'Mapua';
    doc.getElementById('infoCourse').value = 'Architecture';
    doc.getElementById('infoWorkHours').value = '23:00-01:00';
    doc.getElementById('infoSubjects').value = 'Design, BIM, Calculus';
    doc.getElementById('infoHabits').value = 'Late-night work; caffeine sensitive';
    doc.getElementById('infoDeadlineBufferDays').value = '2';
    doc.getElementById('infoSave').click();
    const infoSaved = JSON.parse(storage.getItem('hub.info.center.v1') || '{}');
    assert(infoSaved.profile?.school === 'Mapua' && infoSaved.profile?.course === 'Architecture', 'Information Center should persist school/profile context');
    assert(win.infoCenterSummary().includes('Mapua') && win.infoCenterSummary().includes('Design'), 'Information Center summary should include saved context');
    assert(win.infoCenterPromptBlock().includes('USER INFORMATION CENTER') && win.infoCenterPromptBlock().includes('Late-night work'), 'Marciale prompt block should include Information Center context');
    assert(doc.getElementById('infoCenterStatus').textContent.includes('Injected') || doc.getElementById('infoCenterStatus').textContent.includes('Saved'), 'Information Center status should render');
    win.openModal(null);
    assert(doc.getElementById('overlay').classList.contains('show'), 'dynamic bookmark modal should open');
    win.hideModal('overlay');
    win.openSection();
    assert(doc.getElementById('sOverlay').classList.contains('show'), 'dynamic section modal should open');
    win.hideModal('sOverlay');
    win.openTile(0);
    assert(doc.getElementById('pOverlay').classList.contains('show'), 'dynamic portal tile modal should open');
    win.hideModal('pOverlay');
    win.openAssistantSettings();
    assert(doc.getElementById('setOverlay').classList.contains('show'), 'dynamic assistant settings modal should open');
    win.hideModal('setOverlay');
    win.logHubError('app-smoke-debug', new Error('debug ui test'));
    win.updateSideStats();
    assert(doc.getElementById('debugLogStatus')?.textContent.includes('app-smoke-debug'), 'debug log status should show last error context');
    win.showHubErrorLog();
    assert(doc.getElementById('hubErrorOverlay')?.classList.contains('show'), 'debug log modal should open');
    assert(doc.getElementById('hubErrorList')?.textContent.includes('debug ui test'), 'debug log modal should render errors');
    win.hideModal('hubErrorOverlay');
    assert(typeof win.hydrateChatFromIndexedDB === 'function', 'chat IndexedDB hydration helper should exist');
    const restoreId = await win.createRestorePoint('App smoke restore', { quiet: true });
    assert(restoreId, 'restore point creation should return an id');
    const restoreMeta = JSON.parse(storage.getItem('hub.restorePoints.v1') || '[]');
    assert(restoreMeta.some(p => p.id === restoreId && p.label === 'App smoke restore'), 'restore point metadata should persist');
    win.updateSideStats();
    assert(doc.getElementById('restoreStatus')?.textContent.includes('App smoke restore'), 'restore status should show latest restore point');
    win.showRestoreCenter();
    assert(doc.getElementById('restoreOverlay')?.classList.contains('show'), 'restore center should open');
    assert(doc.getElementById('restoreList')?.textContent.includes('App smoke restore'), 'restore center should list restore point');
    win.hideModal('restoreOverlay');

    assert(doc.getElementById('focusSessionCard'), 'LOCK IN card should exist on Today');
    assert(doc.getElementById('focusSessionCard').textContent.includes('LOCK IN'), 'Focus Session should be renamed to LOCK IN in the UI');
    assert(doc.getElementById('todayGlancePanel'), 'Today at a glance should be relocated onto Today page');
    assert(doc.getElementById('dashWidgets'), 'Today at a glance widgets should render on Today page');
    assert(typeof win.startFocusSession === 'function', 'startFocusSession should exist');
    assert(typeof win.completeFocusSession === 'function', 'completeFocusSession should exist');
    const focusSession = win.startFocusSession('', 1);
    assert(focusSession && focusSession.endTime > Date.now(), 'startFocusSession should create timestamp-based active session');
    assert(JSON.parse(storage.getItem('hub.focus.active.v1') || 'null')?.id === focusSession.id, 'active focus session should persist');
    assert(doc.getElementById('focusSessionBody')?.textContent.includes('General LOCK IN'), 'active LOCK IN session should render');
    win.completeFocusSession('test');
    assert(!storage.getItem('hub.focus.active.v1'), 'completed LOCK IN should clear active session');
    assert(JSON.parse(storage.getItem('hub.focus.history.v1') || '[]').some(s => s.id === focusSession.id && s.status === 'completed'), 'completed LOCK IN should enter history');
    assert(JSON.parse(storage.getItem('hub.activity.v1') || '[]').some(e => e.type === 'focus_session_completed'), 'completed LOCK IN should log heatmap activity');

    win.activatePage('tasks');
    const kb = doc.getElementById('kanbanBoard');
    assert(kb && kb.innerHTML.includes('Finish Architecture Draft'), 'calendar deadline dropbox should render in Tasks');
    assert(typeof win.createProjectFromPrompt === 'function', 'Project Mode create helper should exist');
    const promptBeforeProject = win.prompt;
    const projectAnswers = ['Smoke Project', '2026-10-10'];
    win.prompt = () => projectAnswers.shift() || '';
    win.createProjectFromPrompt();
    win.prompt = promptBeforeProject;
    assert(Array.isArray(win.PROJECTS) && win.PROJECTS.some(p => p.title === 'Smoke Project'), 'Project Mode should create a project');
    assert(doc.getElementById('projectSideList')?.textContent.includes('Smoke Project'), 'Project sidebar should render created project');
    assert(doc.getElementById('taskProjectList')?.innerHTML.includes('Smoke Project'), 'Task modal project datalist should include project');

    win.openTaskModal();
    doc.getElementById('taskTitle').value = 'New Task 1';
    doc.getElementById('taskProject').value = 'Smoke Project';
    win.saveTask();
    assert(Array.isArray(win.TASKS) && win.TASKS.some(t => t.title === 'New Task 1'), 'saved tasks should update window.TASKS');
    assert(win.TASKS.find(t => t.title === 'New Task 1').projectId === win.PROJECTS.find(p => p.title === 'Smoke Project').id, 'saved task should link to selected project');
    const smokeProjectId = win.PROJECTS.find(p => p.title === 'Smoke Project').id;
    assert(win.projectProgress(smokeProjectId).total >= 1, 'project progress should count linked tasks');
    assert(JSON.parse(storage.getItem('hub.tasks.v1')).some(t => t.title === 'New Task 1'), 'saved tasks should persist to hub.tasks.v1');

    win.openEvent(null);
    doc.getElementById('eTitle').value = 'Smoke Project Deadline';
    doc.getElementById('eDate').value = win.todayStr();
    doc.getElementById('eProject').value = 'Smoke Project';
    win.saveEvent();
    assert(win.projectEventList(smokeProjectId).some(e => e.title === 'Smoke Project Deadline'), 'project should link saved calendar event');
    const badDateResult = win.TOOLS.add_event.run({ title: 'Bad Past Assistant Date', date: '2023-06-19', type: 'deadline' });
    assert(String(badDateResult).includes('Date guard'), 'Build 26.8 date guard should reject accidental old-year calendar tool dates');
    const futureDate = win.addDaysGeneric(win.todayStr(), 3);
    const goodDateResult = win.TOOLS.add_event.run({ title: 'Good Future Assistant Date', date: futureDate, type: 'deadline' });
    assert(String(goodDateResult).includes('Added'), 'Build 26.8 date guard should allow valid current/future calendar tool dates');

    win.activatePage('notes');
    win.createNewNote();
    doc.getElementById('noteTitle').value = 'Smoke Project Note';
    doc.getElementById('noteProject').value = 'Smoke Project';
    doc.getElementById('notesEditor').value = 'Linked project note content.';
    win.updateCurrentNote();
    await wait(260);
    const smokeNoteMeta = win.projectNoteList(smokeProjectId).find(n => n.title === 'Smoke Project Note');
    assert(smokeNoteMeta, 'project should link saved note');
    assert(!Object.prototype.hasOwnProperty.call(smokeNoteMeta, 'content'), 'Build 22 note metadata should not keep full note content');
    assert(smokeNoteMeta.preview.includes('Linked project note'), 'Build 22 note metadata should keep a small preview');
    assert((await win.loadNoteBody(smokeNoteMeta.id)).includes('Linked project note content'), 'Build 22 should load note body from payload storage');
    const noteBackupSnap = await win.hubDataSnapshotFull({ excludeRestore: true });
    assert(noteBackupSnap.indexedDbPayloads && noteBackupSnap.indexedDbPayloads['hub.notes.body.' + smokeNoteMeta.id], 'Build 26.8 backup should include IndexedDB note body payloads');
    assert(JSON.stringify(noteBackupSnap.indexedDbPayloads['hub.notes.body.' + smokeNoteMeta.id]).includes('Linked project note content'), 'Build 26.8 note backup payload should include note content');
    win.activatePage('tasks');
    win.renderProjectDashboard();
    assert(doc.getElementById('projectDashboard')?.textContent.includes('1 event'), 'project dashboard should show linked event count');
    assert(doc.getElementById('projectDashboard')?.textContent.includes('1 note'), 'project dashboard should show linked note count');
    const premortem = win.projectPremortemPrompt(smokeProjectId);
    assert(premortem.includes('Failure story') && premortem.includes('Smoke Project Deadline') && premortem.includes('Smoke Project Note'), 'project pre-mortem prompt should include linked project context');
    win.showProjectDetail(smokeProjectId);
    assert(doc.getElementById('projectDetailOverlay')?.classList.contains('show'), 'project detail overlay should open');
    assert(doc.getElementById('projectDetailOverlay').textContent.includes('Smoke Project Deadline'), 'project detail should show linked event');
    assert(doc.getElementById('projectDetailOverlay').textContent.includes('Smoke Project Note'), 'project detail should show linked note');
    assert(doc.getElementById('projectDetailPremortem'), 'project detail should include pre-mortem action');
    win.hideModal('projectDetailOverlay');

    const newTask = win.TASKS.find(t => t.title === 'New Task 1');
    win.openTaskModal(newTask);
    doc.getElementById('taskStatus').value = 'done';
    win.saveTask();
    const activity = JSON.parse(storage.getItem('hub.activity.v1') || '[]');
    assert(activity.some(e => e.type === 'task_done' && e.label.includes('New Task 1')), 'completing a task should log heatmap activity');
    win.renderTodayDashboard();
    assert(doc.getElementById('activityHeatmap')?.querySelector('[data-lvl]'), 'activity heatmap should render day squares');
    assert(doc.getElementById('activityTodayScore')?.textContent.includes('pt'), 'activity today score should render');
    assert(doc.getElementById('activityDetail')?.textContent.includes('New Task 1'), 'activity detail should show today activity items');
    assert(doc.getElementById('activityMotivation')?.textContent.includes('showed up'), 'activity motivation should acknowledge today activity');
    assert(storage.getItem('hub.activity.lastCelebration'), 'first activity should record a celebration key');
    const todayBtn = doc.querySelector(`#activityHeatmap [data-activity-date="${win.todayStr()}"]`);
    assert(todayBtn, 'today heatmap square should exist');
    todayBtn.click();
    assert(todayBtn.classList.contains('selected'), 'clicked heatmap square should become selected');
    const tasksFilter = doc.querySelector('#activityDetail [data-activity-filter="tasks"]');
    assert(tasksFilter, 'activity detail should include task filter');
    tasksFilter.click();
    assert(doc.getElementById('activityDetail').textContent.includes('New Task 1'), 'task filter should keep task activity visible');
    const beforeCompanionActivityCount = JSON.parse(storage.getItem('hub.activity.v1') || '[]').length;
    const expCompanion = win.experimentalSettings();
    expCompanion.companion.enabled = true;
    expCompanion.companion.showOnToday = true;
    win.saveExperimentalSettings(expCompanion);
    win.renderExperimentalSystems();
    win.renderTodayDashboard();
    assert(doc.getElementById('activityCompanionEmbed'), 'Companion should render inside the Hub Activity card');
    assert(doc.getElementById('activityCompanionEmbed').textContent.includes('Momentum Companion'), 'Activity-embedded Companion should have the correct title');
    assert(doc.getElementById('activityCard').classList.contains('companion-embedded'), 'Hub Activity card should switch to companion-embedded layout');
assert(doc.querySelector('#activityCard > .activity-main-wrap'), 'Hub Activity card should wrap heatmap content separately from companion column');
    assert(doc.getElementById('companionFrameMini')?.getAttribute('src').includes('companion-mini/index.html'), 'Mini Momentum Companion iframe should live inside the Hub Activity card');
    assert(doc.getElementById('activityCompanionEmbed').textContent.includes('Open Idle Hero page'), 'Activity embed should link to the full Idle Hero page');
        assert(doc.getElementById('companionOpenIdlePage'), 'Activity embed should offer the Idle Hero page');
    doc.getElementById('companionOpenIdlePage').click();
    assert(doc.getElementById('page-idlehero').classList.contains('active'), 'Idle Hero page should open from Activity companion');
    assert(doc.getElementById('idleHeroPageFrame')?.getAttribute('src').includes('companion/index.html'), 'Idle Hero page should render the full game iframe');
    win.activatePage('today');
    assert(doc.getElementById('activityCompanionEmbed').textContent.includes('Momentum Companion'), 'Activity companion mini should remain visible after returning to Today');
    assert(typeof win.openCompanionFullView === 'function', 'Build 26.2 should expose Companion full view helper');
    win.openCompanionFullView();
    assert(doc.getElementById('companionFullOverlay')?.classList.contains('show'), 'Build 26.2 full-view overlay should open');
    assert(doc.getElementById('companionFrameFull')?.getAttribute('src').includes('companion/index.html'), 'Build 26.2 full-view iframe should load local Idle Hero');
    win.closeCompanionFullView();
    assert(!doc.getElementById('companionFullOverlay').classList.contains('show'), 'Build 26.2 full-view overlay should close');
    assert(typeof win.postCompanionEventToFrame === 'function', 'Build 26 should expose Hub to Idle Hero postMessage helper');
    doc.getElementById('companionInlineGame').checked = false;
    doc.getElementById('companionInlineGame').dispatchEvent(new win.Event('change', { bubbles: true }));
    win.renderCompanionCard();
    assert(doc.getElementById('activityCompanionEmbed'), 'Build 26.2.5 mini Activity companion should remain visible even if full inline mode is disabled');
    assert(JSON.parse(storage.getItem('hub.companion.v1') || '{}').showInlineGame === false, 'Build 26.2.5 inline/full setting should persist when disabled');
    doc.getElementById('companionInlineGame').checked = true;
    doc.getElementById('companionInlineGame').dispatchEvent(new win.Event('change', { bubbles: true }));
    win.renderCompanionCard();
    assert(doc.getElementById('companionFrameMini')?.getAttribute('src').includes('companion-mini/index.html'), 'Build 26.2.4 mini Activity iframe should remain active when re-enabled');
    assert(win.companionXpFromActivity() > 0, 'Companion XP should derive from real Hub Activity');
    assert(win.companionStateSnapshot().level >= 1, 'Companion state should calculate a level');
    assert(JSON.parse(storage.getItem('hub.activity.v1') || '[]').length === beforeCompanionActivityCount, 'Companion rendering should not create Hub Activity points');
    const beforeChessCompanionEvents = win.loadCompanionEvents().length;
    win.activatePage('chess');
    win.chessStartNewGame();
    win.chessTryMove('e2', 'e4');
    assert(win.chessDeclareResult('white_win') === true, 'Build 28 Chess bridge should still log when Companion is enabled');
    assert(win.loadCompanionEvents().length >= beforeChessCompanionEvents + 2, 'Build 28 Chess results should feed the Momentum Companion bridge');
    assert(win.loadCompanionEvents().some(e => e.type === 'chess_match_won'), 'Build 28 Chess win should create a companion reward event');
    win.activatePage('today');
    const beforeBridgeActivityCount = JSON.parse(storage.getItem('hub.activity.v1') || '[]').length;
    const beforeBridgeEvents = win.loadCompanionEvents().length;
    win.logHubActivity('bookmark_added', { label: 'Bridge test bookmark', onceKey: 'companion-bridge-test' });
    const afterBridgeActivity = JSON.parse(storage.getItem('hub.activity.v1') || '[]');
    assert(afterBridgeActivity.length === beforeBridgeActivityCount + 1, 'Companion Event Bridge should not add extra Hub Activity entries');
    assert(win.loadCompanionEvents().length === beforeBridgeEvents + 1, 'Companion Event Bridge should store one companion reaction event');
    const bridgeEvent = JSON.parse(storage.getItem('hub.companion.events.v1') || '[]').find(e => e.label.includes('Bridge test bookmark'));
    assert(bridgeEvent, 'Companion reaction events should persist');
    assert(bridgeEvent.reward && bridgeEvent.reward.idleHero && bridgeEvent.reward.idleHero.xp, 'Build 26.1 companion events should include structured Idle Hero reward payloads');
    assert(['queued','delivered','acknowledged','created'].includes(bridgeEvent.deliveryStatus), 'Build 26.1 companion events should track delivery status');
    assert(typeof win.companionRewardForEvent === 'function', 'Build 26.1 should expose companionRewardForEvent');
    const acked = win.markCompanionEventAck(bridgeEvent.sourceActivityId, { reward: { xp: { crafting: 5 }, gp: 2, message: 'ack test' }, duplicate: false });
    assert(acked, 'Build 26.1 should mark companion event acknowledgements');
    const ackEvent = JSON.parse(storage.getItem('hub.companion.events.v1') || '[]').find(e => e.sourceActivityId === bridgeEvent.sourceActivityId);
    assert(ackEvent.acknowledgedByFrame && ackEvent.deliveryStatus === 'acknowledged' && ackEvent.ackReward.message === 'ack test', 'Build 26.1 acknowledgement should persist reward details');
    assert(doc.getElementById('activityCompanionEmbed').textContent.includes('Bridge test bookmark') || win.companionStateSnapshot().message.includes('Bridge test bookmark'), 'Companion activity embed/state should react live to activity event');
    expCompanion.companion.enabled = false;
    win.saveExperimentalSettings(expCompanion);
    win.renderExperimentalSystems();
    assert(!doc.getElementById('companionCard'), 'Disabling Companion should remove the Companion card');
    const oldActivityDate = win.addDaysGeneric(win.todayStr(), -200);
    const oldActivity = { id: 'old-activity-archive-test', type: 'note_created', points: 2, date: oldActivityDate, ts: Date.now() - 200 * 86400000, label: 'Archived old activity' };
    const recentActivity = { id: 'recent-activity-archive-test', type: 'note_edited', points: 1, date: win.todayStr(), ts: Date.now(), label: 'Recent activity kept local' };
    win.saveHubActivity([oldActivity, recentActivity]);
    await wait(350);
    const recentOnlyActivity = JSON.parse(storage.getItem('hub.activity.v1') || '[]');
    assert(recentOnlyActivity.some(e => e.id === 'recent-activity-archive-test'), 'Build 23 should keep recent activity in localStorage');
    assert(!recentOnlyActivity.some(e => e.id === 'old-activity-archive-test'), 'Build 23 should move old activity out of recent localStorage');
    assert(JSON.parse(storage.getItem('hub.activity.archive.index.v1') || '[]').some(x => x.month === oldActivityDate.slice(0,7)), 'Build 23 should write activity archive index metadata');
    assert(win.loadHubActivity().some(e => e.id === 'old-activity-archive-test'), 'Build 23 archive cache should keep old activity available for heatmap/stats');

    const showHeatmap = doc.getElementById('activityShowToday');
    assert(showHeatmap, 'activity heatmap settings should exist');
    showHeatmap.checked = false;
    showHeatmap.dispatchEvent(new win.Event('change', { bubbles: true }));
    assert(doc.getElementById('activityCard').style.display === 'none', 'activity setting should hide Today heatmap');
    showHeatmap.checked = true;
    showHeatmap.dispatchEvent(new win.Event('change', { bubbles: true }));
    assert(doc.getElementById('activityCard').style.display !== 'none', 'activity setting should show Today heatmap');

    win.activatePage('track');
    assert(doc.getElementById('bioPanel'), 'Biometric intake panel should exist');
    doc.getElementById('bioAge').value = '20';
    doc.getElementById('bioSex').value = 'male';
    doc.getElementById('bioWeight').value = '70';
    doc.getElementById('bioHeight').value = '170';
    doc.getElementById('bioActivity').value = 'moderate';
    doc.getElementById('bioCafSensitivity').value = 'normal';
    doc.getElementById('bioSave').click();
    const bio = JSON.parse(storage.getItem('hub.bio.metrics.v1') || '{}');
    assert(bio.weightKg === 70 && bio.heightCm === 170, 'biometric profile should persist');
    assert(win.personalIntakeLimits().personalized, 'biometric profile should enable personalized intake estimates');
    assert(doc.getElementById('bioEstimates').textContent.includes('BMR'), 'biometric estimates should render BMR/TDEE output');
    assert(doc.querySelector('.radial-stat'), 'Build 20 radial intake cards should render');
    assert(doc.getElementById('todayStats').textContent.includes('Active Sugar'), 'Tracker should replace Sugar Budget with Active Sugar');
    assert(doc.getElementById('quickDrinkPanel'), 'Build 20 quick-add drink panel should exist');
    assert(doc.getElementById('quickDrinkTiles').querySelector('[data-quick-drink]'), 'Build 20 quick-add drink tiles should render');
    assert(doc.querySelector('.sleep-clearance-card'), 'Build 20 sleep clearance card should render');
    const beforeQuickDrink = JSON.parse(storage.getItem('hub.intake.v1') || '[]').length;
    doc.getElementById('quickDrinkTiles').querySelector('[data-quick-drink]').click();
    const afterQuickDrink = JSON.parse(storage.getItem('hub.intake.v1') || '[]').length;
    assert(afterQuickDrink === beforeQuickDrink + 1, 'quick-add drink tile should log one intake entry');
    assert(doc.getElementById('quickDrinkStatus').textContent.includes('Logged'), 'quick-add drink status should confirm the log');
    win.activatePage('today');

    const countTasks = doc.getElementById('activityCountTasks');
    countTasks.checked = false;
    countTasks.dispatchEvent(new win.Event('change', { bubbles: true }));
    const beforeDisabled = JSON.parse(storage.getItem('hub.activity.v1') || '[]').length;
    win.openTaskModal();
    doc.getElementById('taskTitle').value = 'No Points Task';
    doc.getElementById('taskStatus').value = 'done';
    win.saveTask();
    const afterDisabled = JSON.parse(storage.getItem('hub.activity.v1') || '[]').length;
    assert(afterDisabled === beforeDisabled, 'disabled task activity should not log points');
    countTasks.checked = true;
    countTasks.dispatchEvent(new win.Event('change', { bubbles: true }));

    assert(doc.querySelector('[data-theme-preset="arena"]'), 'Arena theme preset should exist');

    win.renderChatSessions();
    const prev = win.CURRENT_CHAT_ID;
    win.newChatSession();
    assert(win.CURRENT_CHAT_ID !== prev && Array.isArray(win.CHAT) && win.CHAT.length === 0, 'new chat session should work');
    assert(doc.getElementById('aiChatHistory'), 'Marciale sidebar chat history should exist');
    assert(doc.getElementById('aiChatHistory').textContent.includes('New Chat'), 'Marciale sidebar chat history should show current chat');
    const chatMenuBtn = doc.querySelector('#aiChatHistory [data-chat-menu]');
    assert(chatMenuBtn, 'Marciale chat history should have a chat options button');
    chatMenuBtn.click();
    const floatingMenu = doc.getElementById('aiChatFloatingMenu');
    assert(floatingMenu && floatingMenu.hidden === false, 'Build 26.8.4 floating chat menu should open outside the history list');
    assert(floatingMenu.textContent.includes('Rename') && floatingMenu.textContent.includes('Archive') && floatingMenu.textContent.includes('Delete'), 'floating chat menu should show rename/archive/delete actions');
    win.hideChatFloatingMenu();
    assert(floatingMenu.hidden === true, 'floating chat menu should hide safely');
    assert(doc.getElementById('aiStreaming'), 'assistant streaming toggle should exist');
    doc.getElementById('aiStreaming').checked = true;
    doc.getElementById('aiStreaming').dispatchEvent(new win.Event('change', { bubbles: true }));
    assert(storage.getItem('hub.ai.streaming') === 'true', 'assistant streaming setting should persist');
    assert(doc.getElementById('aiKeepAlive'), 'AI Resource Governor keep-alive control should exist');
    assert(doc.getElementById('aiContextBudget'), 'AI Resource Governor context budget control should exist');
    assert(doc.getElementById('aiModelPreset'), 'Build 26.8.6 model preset selector should exist');
    assert(doc.getElementById('aiApplyPreset'), 'Build 26.8.6 apply preset button should exist');
    assert(doc.getElementById('aiRefreshLoaded'), 'Build 26.8.6 loaded model refresh button should exist');
    assert(doc.getElementById('aiLoadedStatus'), 'Build 26.8.6 loaded model status should exist');
    assert(doc.getElementById('aiAutopilotModel'), 'AI Resource Governor Autopilot model selector should exist');
    assert(doc.getElementById('aiStrategicModel'), 'AI Resource Governor Strategic model selector should exist');
    doc.getElementById('aiModelPreset').value = 'low_ram';
    doc.getElementById('aiApplyPreset').click();
    assert(storage.getItem('hub.ai.preset') === 'low_ram', 'Build 26.8.6 model preset should persist');
    assert(storage.getItem('hub.ai.keepAlive') === '0', 'Low RAM preset should set unload-immediate keep alive');
    await win.checkOllamaLoadedModels();
    assert(doc.getElementById('aiLoadedStatus').textContent.includes('qwen2.5:7b'), 'Build 26.8.6 loaded model status should render /api/ps model');
    doc.getElementById('aiKeepAlive').value = '0';
    doc.getElementById('aiKeepAlive').dispatchEvent(new win.Event('change', { bubbles: true }));
    doc.getElementById('aiContextBudget').value = '2048';
    doc.getElementById('aiContextBudget').dispatchEvent(new win.Event('change', { bubbles: true }));
    doc.getElementById('aiAutopilotModel').value = 'llama3.2:3b';
    doc.getElementById('aiAutopilotModel').dispatchEvent(new win.Event('change', { bubbles: true }));
    assert(storage.getItem('hub.ai.keepAlive') === '0', 'AI keep-alive setting should persist');
    assert(storage.getItem('hub.ai.numCtx') === '2048', 'AI context budget should persist');
    assert(storage.getItem('hub.ollama.autopilotModel') === 'llama3.2:3b', 'Autopilot model should persist separately');
    assert(doc.getElementById('aiModelWarning').textContent.length > 10, 'AI model warning should render');
    await win.unloadCurrentOllamaModel(win.aiModel);
    assert(aiRequests.some(r => String(r.url).includes('/api/generate') && r.payload.keep_alive === 0), 'Unload model should request Ollama keep_alive 0');
    doc.getElementById('aiText').value = 'stream test';
    await win.sendChat();
    await wait(250);
    const lastChatRequest = aiRequests.filter(r => String(r.url).includes('/api/chat')).slice(-1)[0];
    assert(lastChatRequest.payload.keep_alive === 0, 'Assistant request should include Resource Governor keep_alive');
    assert(lastChatRequest.payload.options && lastChatRequest.payload.options.num_ctx === 2048, 'Assistant request should include Resource Governor num_ctx');
    assert(win.CHAT.some(m => m.role === 'bot' && m.text.includes('Streamed response')), 'streaming chat should append streamed text');
    const beforeStreamToolTasks = win.TASKS.length;
    doc.getElementById('aiText').value = 'stream tool';
    await win.sendChat();
    await wait(250);
    const streamedToolMsg = win.CHAT.slice().reverse().find(m => m.role === 'bot' && m.actions?.some(a => a.tool === 'add_task'));
    assert(streamedToolMsg && streamedToolMsg.pending, 'streamed native tool call should be buffered and wait for approval');
    assert(streamedToolMsg.actions[0].args.title === 'Stream Tool Task', 'streamed tool arg fragments should merge into valid JSON args');
    assert(win.TASKS.length === beforeStreamToolTasks, 'streamed tool call should not execute before approval');
    doc.getElementById('aiText').value = 'bad stream tool';
    await win.sendChat();
    await wait(250);
    const malformedToolMsg = win.CHAT[win.CHAT.length - 1];
    assert(!malformedToolMsg.actions || malformedToolMsg.actions.length === 0, 'malformed streamed tool JSON should not create actions');
    const originalPrompt = win.prompt;
    win.prompt = () => 'Renamed Chat';
    win.renameChatSession(win.CURRENT_CHAT_ID);
    assert(win.CHAT_SESSIONS.find(s => s.id === win.CURRENT_CHAT_ID).title === 'Renamed Chat', 'chat history rename action should rename selected chat');
    win.togglePinChatSession(win.CURRENT_CHAT_ID);
    assert(win.CHAT_SESSIONS.find(s => s.id === win.CURRENT_CHAT_ID).pinned === true, 'chat history pin action should pin selected chat');
    win.toggleArchiveChatSession(win.CURRENT_CHAT_ID);
    assert(win.CHAT_SESSIONS.some(s => s.archived), 'chat history archive action should archive a chat');
    win.prompt = originalPrompt;
    assert(doc.getElementById('aiWorkspaceList'), 'Marciale workspace list should exist');
    const wsFile = new win.File(['# Workspace Test\nThis is local context.'], 'workspace-test.md', { type: 'text/markdown' });
    win.addAiWorkspaceFile(wsFile);
    await wait(300);
    assert(win.AI_WORKSPACE.some(f => f.name === 'workspace-test.md'), 'Workspace file metadata should be stored locally');
    const wsMeta = win.AI_WORKSPACE.find(f => f.name === 'workspace-test.md');
    assert(!Object.prototype.hasOwnProperty.call(wsMeta, 'text'), 'Build 21 workspace metadata should not keep document text in localStorage metadata');
    const storedMeta = JSON.parse(storage.getItem('hub.ai.workspace.v1') || '[]').find(f => f.id === wsMeta.id);
    assert(storedMeta && !Object.prototype.hasOwnProperty.call(storedMeta, 'text'), 'Build 21 persisted workspace metadata should exclude text bodies');
    const wsText = await win.loadAiWorkspaceDoc(wsMeta.id);
    assert(wsText.includes('Workspace Test') && wsText.includes('local context'), 'Build 21 should load workspace document text from document payload storage');
    const workspaceBackupSnap = await win.hubDataSnapshotFull({ excludeRestore: true });
    assert(workspaceBackupSnap.indexedDbPayloads && workspaceBackupSnap.indexedDbPayloads['hub.ai.workspace.doc.' + wsMeta.id], 'Build 26.8 backup should include AI workspace document payloads');
    assert(doc.getElementById('aiWorkspaceList').textContent.includes('workspace-test.md'), 'Workspace file should render in sidebar');
    assert(doc.getElementById('aiWorkspaceList').textContent.includes('chars'), 'Workspace sidebar should show metadata/char count');
    assert(win.AI_ATTACHMENT?.name === 'workspace-test.md', 'Workspace file should attach to Marciale context');
    assert(win.AI_ATTACHMENT?.text.includes('local context'), 'Attached workspace context should include IndexedDB-loaded text');
    await win.removeWorkspaceDoc(wsMeta.id);
    await wait(50);
    assert(!win.AI_WORKSPACE.some(f => f.id === wsMeta.id), 'Workspace file should be removable');
    assert(!(await win.loadAiWorkspaceDoc(wsMeta.id)), 'Removing workspace file should delete document payload');

    win.localStorage.setItem('hub.chat.dynamic-test', JSON.stringify([{ role: 'user', text: 'hello' }]));
    const backup = win.hubDataSnapshot();
    assert(backup.keys['hub.tasks.v1'], 'full backup should include tasks');
    assert(backup.keys['hub.chat.dynamic-test'], 'full backup should include dynamic chat keys');

    win.eval(`BRAIN.profile='professional'; EVENTS.push({id:'proevt', title:'Urgent Plate Deadline', type:'deadline', date:todayStr(), priority:'high', color:'#ff6b6b', fired:[]});`);
    win.renderTodayDashboard();
    assert(doc.getElementById('professionalAlertCard').style.display !== 'none', 'Professional profile should show proactive alert card');
    assert(doc.getElementById('professionalAlertList').textContent.includes('Urgent Plate Deadline'), 'Professional alert should detect deadline without Kanban task');
    const beforeProfessionalTask = win.TASKS.length;
    win.runProfessionalAlert(0);
    assert(win.TASKS.length > beforeProfessionalTask, 'Professional alert Create task action should add a Kanban task');

    win.eval(`BRAIN.profile='instructor'; localStorage.removeItem('hub.instructor.snoozedUntil'); localStorage.removeItem('hub.instructor.lastAutoOpen');`);
    win.renderTodayDashboard();
    assert(doc.getElementById('instructorCard').style.display !== 'none', 'Instructor profile should show Instructor Mode card');
    win.openInstructorOverlay();
    assert(doc.getElementById('instructorOverlay')?.classList.contains('show'), 'Instructor focus overlay should open');
    doc.getElementById('instructorAck').value = 'I WILL WORK';
    doc.getElementById('instructorStartFocus').click();
    assert(!doc.getElementById('instructorOverlay').classList.contains('show'), 'Instructor focus overlay should close after valid acknowledgement');
    assert(Number(win.localStorage.getItem('hub.instructor.focusUntil')) > Date.now(), 'Instructor focus acknowledgement should set focus timer');

    win.eval(`BRAIN.profile='marciale';`);
    doc.getElementById('autopilotEnabled').checked = true;
    doc.getElementById('autopilotEnabled').dispatchEvent(new win.Event('change', { bubbles: true }));
    assert(doc.getElementById('autopilotDeadlineWarn'), 'Autopilot deadline warning tuning control should exist');
    doc.getElementById('autopilotDeadlineWarn').value = '72';
    doc.getElementById('autopilotMaxInProgress').value = '2';
    doc.getElementById('autopilotCaffeineWarn').value = '300';
    doc.getElementById('autopilotNoActivityAfter').value = '-1';
    doc.getElementById('autopilotOrphanWarnings').checked = false;
    doc.getElementById('autopilotDeadlineWarn').dispatchEvent(new win.Event('change', { bubbles: true }));
    const tuned = JSON.parse(storage.getItem('hub.autopilot.v1'));
    assert(tuned.deadlineWarnHours === 72 && tuned.maxInProgress === 2 && tuned.orphanDeadlineWarnings === false, 'Autopilot tuning settings should persist');
    assert(doc.getElementById('autopilotTuningStatus').textContent.includes('72h'), 'Autopilot tuning status should summarize thresholds');
    win.renderTodayDashboard();
    assert(doc.getElementById('autopilotCard').style.display !== 'none', 'Marciale Autopilot card should render when enabled under Marciale profile');
    await win.runMarcialeAutopilotScan('test');
    assert(doc.getElementById('autopilotSignals').textContent.length > 10, 'Marciale Autopilot should render deterministic signals');
    assert(JSON.parse(storage.getItem('hub.autopilot.log.v1') || '[]').some(e => e.type === 'scan'), 'Marciale Autopilot should write an audit log');
    const aiSettings = JSON.parse(storage.getItem('hub.autopilot.v1'));
    aiSettings.aiReasoning = true;
    storage.setItem('hub.autopilot.v1', JSON.stringify(aiSettings));
    await win.runMarcialeAutopilotScan('ai-test');
    const autopilotAiReq = aiRequests.filter(r => String(r.url).includes('/api/chat') && r.payload.model === 'llama3.2:3b' && r.payload.keep_alive === 0).slice(-1)[0];
    assert(autopilotAiReq && autopilotAiReq.payload.options.num_ctx === 2048, 'Autopilot AI reasoning should use its small model and compact context');
    assert(JSON.parse(storage.getItem('hub.autopilot.v1')).lastAiSummary.includes('AI summary'), 'Autopilot AI reasoning should store AI summary when enabled');
    assert(doc.getElementById('autopilotSummary').textContent.includes('AI summary'), 'Autopilot AI reasoning summary should render in card');
    const apSettings = JSON.parse(storage.getItem('hub.autopilot.v1'));
    apSettings.level = 'safe';
    apSettings.orphanDeadlineWarnings = true;
    apSettings.deadlineWarnHours = 168;
    storage.setItem('hub.autopilot.v1', JSON.stringify(apSettings));
    win.eval(`EVENTS.push({id:'autopilot_orphan_test', title:'Autopilot Orphan Deadline', type:'deadline', date:todayStr(), priority:'high', color:'#ff6b6b', fired:[]});`);
    const signals = win.buildAutopilotSignals();
    const orphanIdx = signals.findIndex(s => s.id === 'orphan-deadlines');
    assert(orphanIdx >= 0, 'Autopilot should detect orphan deadline signal for action proposal');
    const beforeAutoTask = win.TASKS.length;
    await win.runAutopilotSignal(orphanIdx);
    assert(win.TASKS.length > beforeAutoTask, 'Autopilot safe level should auto-run non-dangerous proposed task creation');
    assert(JSON.parse(storage.getItem('hub.autopilot.log.v1') || '[]').some(e => e.type === 'action_executed'), 'Autopilot safe action should be audit logged');
    win.eval(`EVENTS.push({id:'fullautoevt', title:'Full Auto Deadline', type:'deadline', date:todayStr(), priority:'normal', color:'#ff6b6b', fired:[]});`);
    const fullSettings = JSON.parse(storage.getItem('hub.autopilot.v1'));
    fullSettings.level = 'full';
    fullSettings.maxAutoActions = 1;
    fullSettings.snoozedUntil = 0;
    storage.setItem('hub.autopilot.v1', JSON.stringify(fullSettings));
    const beforeFullAuto = win.TASKS.length;
    await win.runMarcialeAutopilotScan('full-auto-test');
    assert(win.TASKS.length > beforeFullAuto, 'Full autonomy scan should auto-run limited safe task creation');
    assert(JSON.parse(storage.getItem('hub.autopilot.log.v1') || '[]').some(e => e.type === 'action_auto_executed'), 'Full autonomy auto action should be audit logged');
    win.updateAutopilotLogStatus();
    assert(doc.getElementById('autopilotLogStatus').textContent.includes('audit'), 'Autopilot audit status should render');
    win.showAutopilotLog();
    assert(doc.getElementById('autopilotLogOverlay')?.classList.contains('show'), 'Autopilot audit log overlay should open');
    assert(doc.getElementById('autopilotLogList').textContent.includes('Executed action') || doc.getElementById('autopilotLogList').textContent.includes('Scan'), 'Autopilot audit log should show entries');
    doc.getElementById('autopilotLogOverlay').classList.remove('show');
    win.pauseMarcialeAutopilot(30);
    assert(Number(storage.getItem('hub.autopilot.v1') && JSON.parse(storage.getItem('hub.autopilot.v1')).snoozedUntil) > Date.now(), 'Marciale Autopilot pause should set snoozedUntil');
    win.showAutopilotAct();
    assert(doc.getElementById('autopilotActOverlay')?.classList.contains('show'), 'Autopilot Act overlay should open');
    doc.getElementById('autopilotActOverlay').classList.remove('show');
    assert(doc.getElementById('marcialeStrategyCard').style.display !== 'none', 'Marciale profile should show strategic scan card');
    assert(doc.getElementById('marcialeStrategyGrid').textContent.length > 20, 'Marciale strategic scan should render insights');
    assert(doc.getElementById('marcialeDirectiveGrid')?.textContent.includes('Opinion'), 'Marciale strategic directives should render Opinion card');
    assert(doc.getElementById('marcialeDirectiveGrid')?.textContent.includes('Suggestion'), 'Marciale strategic directives should render Suggestion card');
    assert(doc.getElementById('marcialeDirectiveGrid')?.textContent.includes('Time proposal'), 'Marciale strategic directives should render Time Proposal card');
    const directives = win.buildMarcialeStrategicDirectives();
    assert(directives.opinion && directives.suggestion && directives.time_proposal, 'Strategic directives helper should return all directive fields');
    win.draftMarcialeStrategicScan();
    assert(doc.getElementById('aiText').value.includes('STRICT JSON DIRECTIVES'), 'Marciale strategic scan should draft strict JSON directive prompt');
    win.applyMarcialeGhostMode();
    assert(doc.body.classList.contains('ui-wide') || doc.body.classList.contains('no-motion'), 'Ghost Mode should apply Hub UI changes');

    const tools = win.nativeToolDefinitions();
    const addTask = tools.find(t => t.function.name === 'add_task');
    assert(addTask?.function?.parameters?.properties?.title, 'native tool schema should include add_task.title');

    win.openCommandPalette();
    assert(doc.getElementById('cmdOverlay').classList.contains('show'), 'command palette should open');
    doc.getElementById('cmdInput').value = 'task';
    doc.getElementById('cmdInput').dispatchEvent(new win.Event('input', { bubbles: true }));
    assert(doc.getElementById('cmdResults').textContent.toLowerCase().includes('task'), 'command palette should search actions/tasks');
    win.closeCommandPalette();

    win.showShortcutHelp();
    assert(doc.getElementById('shortcutOverlay').classList.contains('show'), 'shortcut help should open');
    doc.getElementById('shortcutOverlay').classList.remove('show');

    const settingsSearch = doc.getElementById('settingsSearch');
    assert(settingsSearch, 'settings search should exist');
    assert(doc.querySelector('.settings-section-toggle'), 'settings sections should be collapsible');
    assert(doc.querySelector('.shortcuts-section'), 'settings should include keyboard shortcuts section');
    assert(doc.querySelector('.shortcuts-section').textContent.includes('Ctrl'), 'keyboard shortcuts section should list Ctrl/Cmd+K');
    const brainProfile = doc.getElementById('brainProfile');
    assert(brainProfile, 'Marciale brain profile select should exist');
    assert([...brainProfile.options].map(o=>o.value).join(',') === 'balanced,assistant,professional,instructor,marciale', 'Marciale brain profile list should match Sprint 4A profiles');
    brainProfile.value = 'professional';
    brainProfile.dispatchEvent(new win.Event('change', { bubbles: true }));
    assert(doc.getElementById('brainProfileSummary')?.textContent.includes('Professional'), 'profile summary should preview selected profile before applying');
    assert(doc.getElementById('brainPreview'), 'Marciale brain preview button should exist');
    assert(doc.getElementById('brainScan'), 'Marciale brain hygiene scan button should exist');
    assert(doc.getElementById('brainDedupe'), 'Marciale brain duplicate removal button should exist');
    assert(doc.getElementById('brainNormalize'), 'Marciale brain normalize button should exist');
    assert(doc.getElementById('brainSummarize'), 'Marciale brain cleanup draft button should exist');
    win.BRAIN = win.BRAIN || {};
    doc.getElementById('brainMemories').value = '- Duplicate memory\n- duplicate memory\n- Unique memory';
    doc.getElementById('brainSkills').value = '- Skill one';
    win.readBrainInputs();
    const hygiene = win.brainHygieneReport();
    assert(hygiene.memoryDuplicates >= 1, 'brain hygiene should detect duplicate memories');
    win.updateBrainHygieneStatus();
    assert(doc.getElementById('brainHygieneStatus').textContent.includes('duplicates'), 'brain hygiene status should render');
    win.previewBrainPrompt();
    assert(doc.getElementById('brainPreviewOverlay')?.classList.contains('show'), 'brain preview overlay should open');
    assert(doc.getElementById('brainPreviewCopy')?.textContent.includes('PROFILE: Professional'), 'brain preview should include selected profile before applying');
    assert(doc.getElementById('brainPreviewCopy')?.textContent.includes('ASSISTANT NAME'), 'brain preview should include active full brain prompt block');
    doc.getElementById('brainPreviewOverlay').classList.remove('show');

    brainProfile.value = 'instructor';
    doc.getElementById('brainApplyProfile').click();
    await wait(450);
    assert(doc.getElementById('instructorCard').style.display !== 'none', 'Applying Instructor profile should render Instructor card immediately');
    assert(doc.getElementById('instructorOverlay')?.classList.contains('show'), 'Applying Instructor profile should open safe Instructor overlay once');
    doc.getElementById('instructorOverlay').classList.remove('show');

    brainProfile.value = 'marciale';
    doc.getElementById('brainApplyProfile').click();
    await wait(100);
    assert(doc.getElementById('marcialeStrategyCard').style.display !== 'none', 'Applying Marciale profile should render strategic scan card immediately');
    doc.getElementById('settingsCollapseAll').click();
    assert(doc.querySelectorAll('#sidebar .side-section.collapsed').length > 0, 'collapse all should collapse settings sections');
    settingsSearch.value = 'brain';
    settingsSearch.dispatchEvent(new win.Event('input', { bubbles: true }));
    assert([...doc.querySelectorAll('#sidebar .side-section:not([hidden])')].some(sec => sec.textContent.toLowerCase().includes('brain')), 'settings search should filter sections');
    settingsSearch.value = '';
    settingsSearch.dispatchEvent(new win.Event('input', { bubbles: true }));
    doc.getElementById('settingsExpandAll').click();
    assert(doc.getElementById('backupStatus'), 'backup status should exist');
    assert(doc.querySelector('.danger-zone #sideResetAll'), 'reset should be inside a danger zone');
    assert(doc.querySelector('.data-card.safe #sideExportAll'), 'export backup should be in safe data card');

    console.log('✅ App smoke checks passed');
  } finally {
    if (dom) dom.window.close();
    server.kill();
    fs.rmSync('hub-data.json', { force: true });
    fs.rmSync('__pycache__', { recursive: true, force: true });
  }
  process.exit(0);
})().catch(err => {
  console.error('❌ App smoke failed:', err.message);
  process.exit(1);
});
