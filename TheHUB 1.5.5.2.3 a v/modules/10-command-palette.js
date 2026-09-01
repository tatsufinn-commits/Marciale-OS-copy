/* ===========================================================
   COMMAND PALETTE + KEYBOARD UX (Ctrl/Cmd + K) — BUILD 41 HUD
   Linear & Raycast Inspired Fast Launcher + TAMA Academic Index
   =========================================================== */
let cmdIndex = -1;
let cmdItems = [];
let cmdLastFocus = null;

function isTypingTarget(el = document.activeElement) {
  if (!el) return false;
  const tag = (el.tagName || '').toLowerCase();
  return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
}

function pageLabel(page) {
  return ({
    today: 'Today Dashboard',
    dash: 'Portal & Bookmarks',
    idlehero: 'Companion RPG',
    chess: 'ChessLab 2.0',
    ruview: 'RuView Presence',
    cal: 'Calendar & Deadlines',
    tasks: 'Kanban Tasks',
    notes: 'Markdown Notebook',
    ai: 'Marciale AI Assistant',
    track: 'Intake & Biometrics',
    vault: 'Encrypted Vault'
  }[page] || page);
}

function cmdIcon(type) {
  return ({
    Action: '⚡',
    Page: '🧭',
    Task: '📋',
    Event: '📅',
    Academic: '🏛️',
    Note: '📝',
    Bookmark: '🔖',
    Portal: '↗'
  }[type] || '•');
}

function commandCorpus() {
  const corpus = [];
  const add = (item) => corpus.push(Object.assign({ sub: '', keywords: '', kbd: '', section: 'General' }, item));

  // 1. Core Pages & App Views (Navigation)
  $$('.tab').forEach((t, idx) => {
    const page = t.dataset.page;
    const shortcut = idx < 9 ? `Alt+${idx + 1}` : (idx === 9 ? 'Alt+0' : '');
    add({
      type: 'Page',
      section: 'Navigation & Apps',
      title: pageLabel(page),
      sub: `Switch to ${pageLabel(page)} view`,
      keywords: [page, t.textContent, 'open tab view navigate'].join(' '),
      kbd: shortcut,
      action: () => {
        closeCommandPalette();
        activatePage(page);
        window.playHubSound?.('chime');
      }
    });
  });

  // 2. High-Impact Quick Actions
  add({
    type: 'Action',
    section: 'Quick Actions',
    title: 'LOCK IN — Start Focus Session',
    sub: 'Initiate 25-minute Pomodoro focus block with Companion body-doubling',
    keywords: 'pomodoro lock in focus timer study sprint',
    kbd: '↵',
    action: () => {
      closeCommandPalette();
      activatePage('today');
      $('#startFocusBtn')?.click();
      window.playHubSound?.('chime');
    }
  });

  add({
    type: 'Action',
    section: 'Quick Actions',
    title: 'Ask Marciale AI',
    sub: 'Open local AI assistant with Socratic architectural context',
    keywords: 'ai assistant chat marciale reasoning prompt',
    kbd: 'Alt+9',
    action: () => {
      closeCommandPalette();
      activatePage('ai');
      $('#aiText')?.focus();
      window.playHubSound?.('click');
    }
  });

  add({
    type: 'Action',
    section: 'Quick Actions',
    title: 'New Kanban Task',
    sub: 'Create a prioritized task card linked to your projects',
    keywords: 'todo kanban task work create add',
    action: () => {
      closeCommandPalette();
      activatePage('tasks');
      window.openTaskModal?.(null);
      window.playHubSound?.('click');
    }
  });

  add({
    type: 'Action',
    section: 'Quick Actions',
    title: 'Log Caffeine & Biometrics',
    sub: 'Record drink intake with 5.7h pharmacokinetic elimination decay',
    keywords: 'caffeine coffee taurine sugar energy tracker intake',
    action: () => {
      closeCommandPalette();
      activatePage('track');
      $('#tQty')?.focus();
      window.playHubSound?.('click');
    }
  });

  add({
    type: 'Action',
    section: 'Quick Actions',
    title: 'New Calendar Event / Deadline',
    sub: 'Schedule an event or Mapúa departmental deadline with .ics sync',
    keywords: 'calendar deadline reminder schedule date',
    action: () => {
      closeCommandPalette();
      activatePage('cal');
      openEvent?.(null);
      window.playHubSound?.('click');
    }
  });

  add({
    type: 'Action',
    section: 'Quick Actions',
    title: 'Export Full System Backup',
    sub: 'Download all Hub, tasks, and companion progress as local JSON backup',
    keywords: 'backup export json download restore snapshot',
    action: () => {
      closeCommandPalette();
      exportHubBackup?.();
      window.playHubSound?.('chime');
    }
  });

  add({
    type: 'Action',
    section: 'Quick Actions',
    title: 'Run SRE Sentinel Health Check',
    sub: 'Scan local state integrity, storage quotas, and security redmarks',
    keywords: 'sre health sentinel diagnostic security check',
    action: () => {
      closeCommandPalette();
      toast?.('🛡️ SRE Sentinel Health: SEV-0 Nominal', 'success');
      window.playHubSound?.('chime');
    }
  });

  // 3. TAMA Academic Architecture Studio Knowledge
  add({
    type: 'Academic',
    section: 'Mapúa Academic Studio',
    title: 'PD 1096 NBCP — National Building Code',
    sub: 'Rule 7 & 8 Zoning, AMBF, PSO, setbacks & building classification',
    keywords: 'pd 1096 nbcp building code rule 7 rule 8 ambf setbacks zoning tama',
    action: () => {
      closeCommandPalette();
      toast?.('🏛️ Opening PD 1096 NBCP Architectural Compendium', 'info');
      activatePage('notes');
    }
  });

  add({
    type: 'Academic',
    section: 'Mapúa Academic Studio',
    title: 'RA 9514 — Fire Code of the Philippines',
    sub: 'Egress width calculations, travel distances & occupant loads',
    keywords: 'ra 9514 fire code egress occupant load travel distance fire safety tama',
    action: () => {
      closeCommandPalette();
      toast?.('🔥 Opening RA 9514 Fire Code Compendium', 'info');
      activatePage('notes');
    }
  });

  add({
    type: 'Academic',
    section: 'Mapúa Academic Studio',
    title: 'BP 344 — Accessibility Law',
    sub: '1:12 ramp slopes, accessible doors, tactile paths & parking ratios',
    keywords: 'bp 344 accessibility law ramp slope tactile doors parking tama',
    action: () => {
      closeCommandPalette();
      toast?.('♿ Opening BP 344 Accessibility Compendium', 'info');
      activatePage('notes');
    }
  });

  add({
    type: 'Academic',
    section: 'Mapúa Academic Studio',
    title: 'STRUC3 — Moment Distribution & RCD',
    sub: 'Hardy Cross method, singly-reinforced beam flexure & shear design',
    keywords: 'struc3 structural theory moment distribution hardy cross rcd beam tama',
    action: () => {
      closeCommandPalette();
      toast?.('📐 Opening STRUC3 Indeterminate Structures Manual', 'info');
      activatePage('notes');
    }
  });

  add({
    type: 'Academic',
    section: 'Mapúa Academic Studio',
    title: 'AD5 — Space Programming & Zoning Manual',
    sub: 'Bubble diagrams, matrix analysis, site carrying capacity & parking computations',
    keywords: 'ad5 architectural design space programming zoning site planning tama',
    action: () => {
      closeCommandPalette();
      toast?.('🏛️ Opening AD5 Design Studio Manual', 'info');
      activatePage('notes');
    }
  });

  // 4. Live Kanban Tasks
  const taskSource = (typeof TASKS !== 'undefined' && Array.isArray(TASKS)) ? TASKS : (Array.isArray(window.TASKS) ? window.TASKS : []);
  taskSource.filter(t => t.status !== 'done').slice(0, 30).forEach(t => {
    add({
      type: 'Task',
      section: 'Active Tasks',
      title: t.title || 'Untitled Task',
      sub: `${t.project ? `[${t.project}] ` : ''}${t.status || 'todo'}${t.due ? ` · due ${t.due}` : ''}`,
      keywords: [t.project, t.priority, t.notes, t.title].join(' '),
      action: () => {
        closeCommandPalette();
        activatePage('tasks');
        window.openTaskModal?.(t);
        window.playHubSound?.('click');
      }
    });
  });

  // 5. Upcoming Calendar Events
  if (typeof getAllEvents === 'function') {
    getAllEvents().filter(e => e.date >= todayStr()).slice(0, 20).forEach(e => {
      add({
        type: 'Event',
        section: 'Calendar Deadlines',
        title: e.title || 'Untitled Event',
        sub: `${e.date}${e.time ? ' · ' + e.time : ''}${e.type ? ' · ' + e.type : ''}`,
        keywords: [e.notes, e.priority, e.recur, e.title].join(' '),
        action: () => {
          closeCommandPalette();
          activatePage('cal');
          openEvent?.(e.id);
          window.playHubSound?.('click');
        }
      });
    });
  }

  // 6. Notes
  if (typeof NOTES !== 'undefined' && Array.isArray(NOTES)) {
    NOTES.slice(0, 25).forEach(n => {
      add({
        type: 'Note',
        section: 'Notebook',
        title: n.title || 'Untitled Note',
        sub: 'Markdown note',
        keywords: [n.title, (n.content || '').slice(0, 300)].join(' '),
        action: () => {
          closeCommandPalette();
          activatePage('notes');
          openNote?.(n.id);
          window.playHubSound?.('click');
        }
      });
    });
  }

  return corpus;
}

function scoreCmd(item, q) {
  if (!q) return 1;
  const title = String(item.title || '').toLowerCase();
  const hay = [item.title, item.sub, item.keywords, item.type, item.section].join(' ').toLowerCase();
  if (title === q) return 100;
  if (title.startsWith(q)) return 85;
  if (title.includes(q)) return 60;
  return q.split(/\s+/).filter(Boolean).reduce((n, tok) => n + (hay.includes(tok) ? 12 : 0), 0);
}

function openCommandPalette() {
  const overlay = $('#cmdOverlay');
  if (!overlay) return;
  cmdLastFocus = document.activeElement;
  const input = $('#cmdInput');
  if (input) input.value = '';
  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden', 'false');
  window.playHubSound?.('click');
  setTimeout(() => input?.focus(), 50);
  renderCmdResults('');
}

function closeCommandPalette() {
  const overlay = $('#cmdOverlay');
  if (!overlay) return;
  overlay.classList.remove('show');
  overlay.setAttribute('aria-hidden', 'true');
  if (cmdLastFocus && typeof cmdLastFocus.focus === 'function') {
    setTimeout(() => cmdLastFocus.focus(), 0);
  }
}

function renderCmdResults(query) {
  const q = (query || '').trim().toLowerCase();
  const hits = commandCorpus()
    .map(item => ({ ...item, score: scoreCmd(item, q) }))
    .filter(x => !q || x.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 20);

  cmdItems = hits;
  cmdIndex = hits.length ? 0 : -1;

  const box = $('#cmdResults');
  if (!box) return;
  box.setAttribute('role', 'listbox');
  box.setAttribute('aria-label', 'Command results');

  if (!hits.length) {
    box.innerHTML = `
      <div class="cmd-empty">
        <div style="font-size:20px; margin-bottom:6px;">🔍</div>
        <div>No matching commands found.</div>
        <div style="font-size:12px; margin-top:4px; opacity:0.75;">Try "task", "lock in", "caffeine", "chess", or "nbcp".</div>
      </div>
    `;
    return;
  }

  // Render linear/raycast style categorized rows
  let html = '';
  let currentSection = '';

  hits.forEach((h, i) => {
    if (h.section && h.section !== currentSection) {
      currentSection = h.section;
      html += `<div class="cmd-section-header">${esc(currentSection)}</div>`;
    }

    html += `
      <div class="cmd-item ${i === cmdIndex ? 'selected' : ''}" id="cmd-item-${i}" role="option" aria-selected="${i === cmdIndex ? 'true' : 'false'}" tabindex="-1">
        <div class="cmd-ico">${cmdIcon(h.type)}</div>
        <div class="cmd-main">
          <div class="cmd-title">${esc(h.title)}</div>
          ${h.sub ? `<div class="cmd-sub">${esc(h.sub)}</div>` : ''}
        </div>
        ${h.kbd ? `<kbd class="cmd-kbd">${esc(h.kbd)}</kbd>` : `<span class="cmd-type">${esc(h.type)}</span>`}
      </div>
    `;
  });

  box.innerHTML = html;

  hits.forEach((h, i) => {
    const el = $(`#cmd-item-${i}`);
    if (el) {
      el.onclick = h.action;
      el.onmousemove = () => {
        if (cmdIndex !== i) {
          cmdIndex = i;
          updateCmdSelection();
        }
      };
    }
  });
}

function runSelectedCommand() {
  if (cmdIndex >= 0 && cmdItems[cmdIndex]) {
    cmdItems[cmdIndex].action();
  }
}

function updateCmdSelection() {
  $$('.cmd-item').forEach((el, i) => {
    const selected = i === cmdIndex;
    el.classList.toggle('selected', selected);
    el.setAttribute('aria-selected', selected ? 'true' : 'false');
    if (selected) {
      el.scrollIntoView({ block: 'nearest' });
      window.playHubSound?.('click');
    }
  });
}

function showShortcutHelp() {
  let overlay = $('#shortcutOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay shortcut-overlay';
    overlay.id = 'shortcutOverlay';
    overlay.innerHTML = `
      <div class="modal shortcut-modal" role="dialog" aria-modal="true" aria-labelledby="shortcutTitle">
        <h3 id="shortcutTitle">⌨️ Marciale-OS Keyboard Shortcuts</h3>
        <div class="shortcut-grid">
          <div><kbd>Ctrl</kbd>/<kbd>⌘</kbd> <kbd>K</kbd><span>Open Linear Quick-Dispatch HUD</span></div>
          <div><kbd>Alt</kbd> <kbd>1-0</kbd><span>Direct Switch App View Tabs</span></div>
          <div><kbd>?</kbd><span>Show Keyboard Shortcuts Help</span></div>
          <div><kbd>Esc</kbd><span>Dismiss Dialogs & Command Palette</span></div>
          <div><kbd>↑</kbd><kbd>↓</kbd><span>Navigate Commands in Palette</span></div>
          <div><kbd>Enter</kbd><span>Execute Selected Command</span></div>
        </div>
        <div class="row" style="margin-top:16px; justify-content:flex-end;">
          <button class="btn primary" id="shortcutClose">Got it</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    $('#shortcutClose').onclick = () => overlay.classList.remove('show');
    overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.remove('show'); };
  }
  overlay.classList.add('show');
  setTimeout(() => $('#shortcutClose')?.focus(), 50);
}

function initCommandAccessibility() {
  const overlay = $('#cmdOverlay');
  const input = $('#cmdInput');
  if (overlay) {
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('role', 'presentation');
  }
  if (input) {
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-expanded', 'true');
    input.setAttribute('aria-controls', 'cmdResults');
    input.setAttribute('aria-label', 'Search commands, apps, tasks, events, and notes');
  }
  $$('.tab').forEach((t, i) => {
    t.setAttribute('role', 'button');
    t.setAttribute('tabindex', '0');
    t.setAttribute('aria-label', `Open ${pageLabel(t.dataset.page)} page`);
    t.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        t.click();
      }
    });
  });
}

document.addEventListener('keydown', e => {
  const key = String(e.key || '').toLowerCase();
  if ((e.ctrlKey || e.metaKey) && key === 'k') {
    e.preventDefault();
    $('#cmdOverlay')?.classList.contains('show') ? closeCommandPalette() : openCommandPalette();
    return;
  }

  if (e.altKey && /^[0-9]$/.test(key)) {
    const tabs = $$('.tab');
    const idx = key === '0' ? 9 : Number(key) - 1;
    const t = tabs[idx];
    if (t) {
      e.preventDefault();
      t.click();
      toast(`Opened ${pageLabel(t.dataset.page)}`);
      window.playHubSound?.('click');
    }
    return;
  }

  if (key === '?' && !isTypingTarget()) {
    e.preventDefault();
    showShortcutHelp();
    return;
  }

  if ($('#cmdOverlay')?.classList.contains('show')) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeCommandPalette();
    }
    if (e.key === 'ArrowDown' && cmdItems.length) {
      e.preventDefault();
      cmdIndex = (cmdIndex + 1) % cmdItems.length;
      updateCmdSelection();
    }
    if (e.key === 'ArrowUp' && cmdItems.length) {
      e.preventDefault();
      cmdIndex = (cmdIndex - 1 + cmdItems.length) % cmdItems.length;
      updateCmdSelection();
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      runSelectedCommand();
    }
  }
});

$('#cmdInput')?.addEventListener('input', e => renderCmdResults(e.target.value));
$('#cmdOverlay')?.addEventListener('click', e => {
  if (e.target === $('#cmdOverlay')) closeCommandPalette();
});

initCommandAccessibility();
window.openCommandPalette = openCommandPalette;
window.closeCommandPalette = closeCommandPalette;
window.showShortcutHelp = showShortcutHelp;
