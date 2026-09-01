/* ===========================================================
   BUILD 31 — Generic Presence API
   ===========================================================
   Category C optional module. Tracks whether the user is present,
   idle, or away using browser APIs (visibility, input events).
   Feeds presence context into Marciale and Autopilot.
   Does NOT use OS-level scripts, camera, microphone, or any
   external hardware — pure browser-based detection.
   =========================================================== */
(function(){
  'use strict';

  /* ---------- Constants & Storage ---------- */
  const PRESENCE_KEY = 'hub.presence.v1';
  const PRESENCE_HISTORY_KEY = 'hub.presence.history.v1';
  const PRESENCE_SETTINGS_KEY = 'hub.presence.settings.v1';
  const PRESENCE_HISTORY_LIMIT = 200;

  const STATUS_PRESENT = 'present';
  const STATUS_IDLE = 'idle';
  const STATUS_AWAY = 'away';

  const DEFAULTS = {
    idleTimeoutSec: 300,      // 5 minutes before idle
    awayTimeoutSec: 900,      // 15 minutes before away
    trackInput: true,         // listen to mousemove/keydown/click/scroll
    trackVisibility: true,    // listen to visibilitychange
    trackAudio: false,        // future: detect audio playback
    showOnToday: false,       // show presence card on Today
    enabled: false,           // master toggle (mirrors experimental)
    awayLockVault: false,     // auto-lock vault when going away
    awayPauseFocus: false,    // pause LOCK IN when going away
    welcomeBackSummary: true  // show toast on return
  };

  /* ---------- State ---------- */
  let _presenceState = {
    status: STATUS_PRESENT,
    since: Date.now(),
    lastInput: Date.now(),
    sessionStart: Date.now(),
    totalPresentToday: 0,
    lastAwayAt: 0,
    lastReturnAt: 0,
    awayCountToday: 0
  };

  let _presenceHistory = [];
  let _settings = Object.assign({}, DEFAULTS);
  let _listenersAttached = false;
  let _tickTimer = null;
  let _initialized = false;

  /* ---------- Persistence ---------- */
  function loadPresenceState(){
    try{
      const raw = LS.get(PRESENCE_KEY, null);
      if(raw && typeof raw === 'object'){
        _presenceState = Object.assign({}, _presenceState, raw);
        // Reset daily counters if it's a new day
        const today = todayStr();
        if(_presenceState._lastDate !== today){
          _presenceState.totalPresentToday = 0;
          _presenceState.awayCountToday = 0;
          _presenceState._lastDate = today;
        }
      }
    }catch(e){}
    return _presenceState;
  }

  function savePresenceState(){
    try{
      _presenceState._lastDate = todayStr();
      LS.set(PRESENCE_KEY, _presenceState);
    }catch(e){}
  }

  function loadPresenceHistory(){
    try{
      const arr = LS.get(PRESENCE_HISTORY_KEY, []);
      _presenceHistory = Array.isArray(arr) ? arr.slice(-PRESENCE_HISTORY_LIMIT) : [];
    }catch(e){ _presenceHistory = []; }
    return _presenceHistory;
  }

  function savePresenceHistory(){
    try{ LS.set(PRESENCE_HISTORY_KEY, _presenceHistory.slice(-PRESENCE_HISTORY_LIMIT)); }catch(e){}
  }

  function loadPresenceSettings(){
    try{
      const raw = LS.get(PRESENCE_SETTINGS_KEY, {});
      _settings = Object.assign({}, DEFAULTS, raw || {});
      // Sync enabled state with experimental registry
      const exp = typeof experimentalSettings === 'function' ? experimentalSettings() : null;
      if(exp && exp.presence) _settings.enabled = !!exp.presence.enabled;
      if(exp && exp.presence) _settings.showOnToday = !!exp.presence.showOnToday;
    }catch(e){}
    return _settings;
  }

  function savePresenceSettings(s){
    _settings = Object.assign({}, DEFAULTS, s || {});
    LS.set(PRESENCE_SETTINGS_KEY, _settings);
    // Mirror to experimental registry
    try{
      const exp = typeof experimentalSettings === 'function' ? experimentalSettings() : null;
      if(exp){
        exp.presence.enabled = _settings.enabled;
        exp.presence.showOnToday = _settings.showOnToday;
        if(typeof saveExperimentalSettings === 'function') saveExperimentalSettings(exp);
      }
    }catch(e){}
  }

  /* ---------- Core Presence Logic ---------- */
  function now(){ return Date.now(); }

  function secondsSinceInput(){
    return Math.max(0, Math.round((now() - _presenceState.lastInput) / 1000));
  }

  function computeStatus(){
    if(!_settings.enabled) return STATUS_PRESENT;
    if(!_settings.trackVisibility && document.hidden) return _presenceState.status;

    const elapsed = secondsSinceInput();
    if(elapsed >= _settings.awayTimeoutSec) return STATUS_AWAY;
    if(elapsed >= _settings.idleTimeoutSec) return STATUS_IDLE;
    return STATUS_PRESENT;
  }

  function recordInput(){
    _presenceState.lastInput = now();
    const prev = _presenceState.status;
    const next = computeStatus();

    if(prev !== next){
      transitionStatus(prev, next);
    }
    _presenceState.status = next;
  }

  function transitionStatus(from, to){
    const ts = now();
    const entry = {
      id: typeof uid === 'function' ? uid() : String(ts),
      from: from,
      to: to,
      ts: ts,
      at: new Date(ts).toISOString(),
      date: todayStr()
    };

    // Track specific transitions
    if(to === STATUS_AWAY && from !== STATUS_AWAY){
      _presenceState.lastAwayAt = ts;
      _presenceState.awayCountToday = (_presenceState.awayCountToday || 0) + 1;
    }
    if(to === STATUS_PRESENT && from === STATUS_AWAY){
      _presenceState.lastReturnAt = ts;
    }

    _presenceHistory.push(entry);
    if(_presenceHistory.length > PRESENCE_HISTORY_LIMIT){
      _presenceHistory = _presenceHistory.slice(-PRESENCE_HISTORY_LIMIT);
    }

    // FIXED (Build 33): Dispatch transition event for automation engine.
    // The automation rules in Build 33 replace the hardcoded onUserAway/onUserReturn hooks.
    try{
      document.dispatchEvent(new CustomEvent('presence-transition', {
        detail: { from: from, to: to, ts: ts }
      }));
    }catch(e){}

    // Keep legacy hooks for backward compatibility (if automation not loaded)
    if(to === STATUS_AWAY){
      onUserAway();
    }
    if(to === STATUS_PRESENT && from === STATUS_AWAY){
      onUserReturn();
      if(_settings.welcomeBackSummary){
        const awayDuration = Math.round((ts - _presenceState.lastAwayAt) / 60000);
        try{
          if(typeof toast === 'function') toast(`Welcome back! You were away for ~${awayDuration} min.`, 'info');
        }catch(e){}
      }
    }

    savePresenceState();
    savePresenceHistory();

    // Log activity for presence transitions
    if(to === STATUS_PRESENT && from === STATUS_AWAY){
      try{
        if(typeof logHubActivity === 'function'){
          logHubActivity('presence_return', {
            label: 'Returned to desk',
            points: 0,
            throttleKey: 'presence_return',
            throttleMs: 15 * 60 * 1000
          });
        }
      }catch(e){}
    }
  }

  /* ---------- Automation Hooks ---------- */
  function onUserAway(){
    // Spatial Privacy Auto-Lock: Auto-lock vault on away if enabled or if away > 3 min
    if(_settings.awayLockVault || typeof checkPresenceVaultSecurity === 'function'){
      try{
        if(typeof checkPresenceVaultSecurity === 'function'){
          checkPresenceVaultSecurity(now() - (_presenceState.lastAwayAt || _presenceState.lastInput));
        } else if(typeof VAULT_UNLOCKED !== 'undefined' && VAULT_UNLOCKED && typeof lockVault === 'function'){
          lockVault('Vault auto-locked (away)');
        }
      }catch(e){}
    }
    // Pause focus session if enabled
    if(_settings.awayPauseFocus){
      try{
        if(typeof window.cancelFocusSession === 'function'){
          window.cancelFocusSession('paused (away)');
        }
      }catch(e){}
    }
    // Notify companion / iframes
    try{
      if(typeof emitCompanionEvent === 'function'){
        emitCompanionEvent({
          type: 'presence_away',
          label: 'User stepped away',
          date: todayStr(),
          ts: now()
        });
      }
    }catch(e){}
    // Log to autopilot
    try{
      if(typeof logAutopilot === 'function'){
        logAutopilot({ type: 'presence_away', awayCount: _presenceState.awayCountToday });
      }
    }catch(e){}
  }

  function onUserReturn(){
    // Notify companion
    try{
      if(typeof emitCompanionEvent === 'function'){
        emitCompanionEvent({
          type: 'presence_return',
          label: 'User returned to desk',
          date: todayStr(),
          ts: now()
        });
      }
    }catch(e){}
  }

  /* ---------- Event Listeners ---------- */
  function attachListeners(){
    if(_listenersAttached) return;
    _listenersAttached = true;

    // Input activity listeners (throttled)
    const inputEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    let lastInputTick = 0;
    const INPUT_THROTTLE = 5000; // Update at most every 5 seconds

    function onInput(){
      const t = now();
      if(t - lastInputTick < INPUT_THROTTLE) return;
      lastInputTick = t;
      recordInput();
    }

    inputEvents.forEach(evt => {
      try{ document.addEventListener(evt, onInput, { passive: true, capture: true }); }catch(e){}
    });

    // Visibility change
    if(_settings.trackVisibility){
      try{
        document.addEventListener('visibilitychange', () => {
          if(document.hidden){
            // Tab/browser hidden — treat as away trigger after timeout
            _presenceState._hiddenAt = now();
            recordInput(); // Mark the transition
            // If hidden, immediately go to idle at minimum
            if(_presenceState.status === STATUS_PRESENT){
              _presenceState.status = STATUS_IDLE;
              _presenceState.lastInput = now() - (_settings.idleTimeoutSec * 1000);
              savePresenceState();
            }
          } else {
            // Tab/browser visible again — treat as fresh input
            _presenceState.lastInput = now();
            delete _presenceState._hiddenAt;
            recordInput();
          }
        });
      }catch(e){}
    }

    // Periodic tick for time-based transitions
    _tickTimer = setInterval(() => {
      if(!_settings.enabled) return;
      const prev = _presenceState.status;
      const next = computeStatus();
      if(prev !== next){
        transitionStatus(prev, next);
        _presenceState.status = next;
        savePresenceState();
        // Re-render presence card if visible
        try{ if(typeof renderPresenceCard === 'function') renderPresenceCard(); }catch(e){}
      }
      // Update total present time
      if(_presenceState.status === STATUS_PRESENT || _presenceState.status === STATUS_IDLE){
        _presenceState.totalPresentToday = (_presenceState.totalPresentToday || 0) + 1;
      }
    }, 10000); // Check every 10 seconds
  }

  /* ---------- Public API ---------- */
  function initPresence(){
    if(_initialized) return;
    _initialized = true;
    loadPresenceSettings();
    loadPresenceState();
    loadPresenceHistory();
    if(_settings.enabled) attachListeners();
    // Initial status
    _presenceState.status = computeStatus();
    _presenceState.sessionStart = now();
    savePresenceState();
  }

  function presenceSettings(){
    return Object.assign({}, DEFAULTS, _settings);
  }

  function saveSettings(s){
    savePresenceSettings(s);
    if(_settings.enabled && !_listenersAttached) attachListeners();
    renderPresenceCard?.();
  }

  function presenceState(){
    return Object.assign({}, _presenceState, {
      secondsSinceInput: secondsSinceInput(),
      computedStatus: computeStatus()
    });
  }

  function presenceStatus(){
    return _settings.enabled ? computeStatus() : STATUS_PRESENT;
  }

  function presenceHistory(limit){
    return _presenceHistory.slice(-(limit || 20));
  }

  function presenceSummary(){
    if(!_settings.enabled) return 'Presence detection disabled.';
    const status = computeStatus();
    const since = new Date(_presenceState.since || now()).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    const elapsed = secondsSinceInput();
    const totalMin = Math.round((_presenceState.totalPresentToday || 0) / 6);
    const awayCount = _presenceState.awayCountToday || 0;
    const statusLabel = {present:'🟢 Present', idle:'🟡 Idle', away:'⚫ Away'}[status] || status;
    return `${statusLabel} since ${since} · ${totalMin} min present today · ${awayCount} away transition${awayCount===1?'':'s'} · Last input ${formatElapsed(elapsed)} ago`;
  }

  function formatElapsed(sec){
    if(sec < 60) return sec + 's';
    if(sec < 3600) return Math.floor(sec/60) + 'm';
    return Math.floor(sec/3600) + 'h ' + Math.floor((sec%3600)/60) + 'm';
  }

  function presenceContextForAI(){
    if(!_settings.enabled) return 'PRESENCE: disabled';
    const status = computeStatus();
    const elapsed = secondsSinceInput();
    const totalMin = Math.round((_presenceState.totalPresentToday || 0) / 6);
    const awayCount = _presenceState.awayCountToday || 0;
    const lastAway = _presenceState.lastAwayAt ? new Date(_presenceState.lastAwayAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : 'n/a';
    const lastReturn = _presenceState.lastReturnAt ? new Date(_presenceState.lastReturnAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : 'n/a';
    return `PRESENCE STATUS: ${status}\nLast input: ${formatElapsed(elapsed)} ago\nTotal present today: ${totalMin} minutes\nAway transitions today: ${awayCount}\nLast away: ${lastAway}\nLast return: ${lastReturn}\n\nRules: Use presence to understand if the user is actively at their desk. If away for a long time, the user may be in a meeting or break. Suggest focused work blocks during long present windows. If the user just returned, they may need a quick status catch-up.`;
  }

  /* ---------- Today Dashboard Card ---------- */
  function renderPresenceCard(){
    const card = document.getElementById('presenceCard');
    if(!card) return;
    if(!_settings.enabled || !_settings.showOnToday){
      card.style.display = 'none';
      return;
    }
    // FIXED (Build 32 perf): Skip render if Today page isn't active
    const todayPage = document.getElementById('page-today');
    if(todayPage && !todayPage.classList.contains('active')){
      card.style.display = 'none';
      return;
    }
    card.style.display = '';

    const status = computeStatus();
    const elapsed = secondsSinceInput();
    const totalMin = Math.round((_presenceState.totalPresentToday || 0) / 6);
    const awayCount = _presenceState.awayCountToday || 0;
    const statusIcon = {present:'🟢', idle:'🟡', away:'⚫'}[status] || '⚪';
    const statusText = {present:'Present', idle:'Idle', away:'Away'}[status] || status;
    const statusClass = 'presence-status-' + status;

    const recentHistory = _presenceHistory.slice(-5).reverse();
    const historyHtml = recentHistory.length ? recentHistory.map(h => {
      const when = new Date(h.ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
      const icon = {away:'🚶', present:'🏠', idle:'💤'}[h.to] || '•';
      return `<div class="presence-history-item"><span>${icon}</span><span>${esc(h.to)}</span><time>${esc(when)}</time></div>`;
    }).join('') : '<div class="feature-empty compact">No transitions yet.</div>';

    // Build 33: Automation summary
    const autoSummary = typeof automationSummary === 'function' ? automationSummary() : null;
    const autoLine = autoSummary ? `<div style="font-size:11px;color:var(--mut);margin-bottom:8px;padding:6px 8px;border:1px solid var(--line);border-radius:6px;background:color-mix(in srgb,var(--bg) 40%,transparent)">⚡ <b>${autoSummary.enabledRules}</b> automation rule${autoSummary.enabledRules===1?'':'s'} active · ${autoSummary.executionsToday} execution${autoSummary.executionsToday===1?'':'s'} today</div>` : '';

    card.innerHTML = `
      <div class="presence-head">
        <div><h3>📡 Presence</h3><p>Browser-based desk awareness. Local only.</p></div>
        <span class="presence-status-pill ${statusClass}">${statusIcon} ${esc(statusText)}</span>
      </div>
      <div class="presence-stats">
        <div><b>${formatElapsed(elapsed)}</b><span>Since last input</span></div>
        <div><b>${totalMin}m</b><span>Present today</span></div>
        <div><b>${awayCount}</b><span>Away transitions</span></div>
        <div><b>${_settings.idleTimeoutSec >= 60 ? Math.round(_settings.idleTimeoutSec/60)+'m' : _settings.idleTimeoutSec+'s'}</b><span>Idle threshold</span></div>
      </div>
      ${autoLine}
      <div class="presence-history">
        <b>Recent transitions</b>
        ${historyHtml}
      </div>
    `;
  }

  /* ---------- Settings UI ---------- */
  function syncPresenceSettingsUI(){
    const s = presenceSettings();
    const set = (id, val) => { const el = document.getElementById(id); if(el){ if(el.type === 'checkbox') el.checked = !!val; else el.value = val; }};
    set('presenceIdleTimeout', s.idleTimeoutSec);
    set('presenceAwayTimeout', s.awayTimeoutSec);
    set('presenceTrackInput', s.trackInput);
    set('presenceTrackVisibility', s.trackVisibility);
    set('presenceAwayLockVault', s.awayLockVault);
    set('presenceAwayPauseFocus', s.awayPauseFocus);
    set('presenceWelcomeBack', s.welcomeBackSummary);
  }

  function readPresenceSettingsUI(){
    const val = id => { const el = document.getElementById(id); return el ? el.value : null; };
    const chk = id => { const el = document.getElementById(id); return el ? !!el.checked : false; };
    const s = presenceSettings();
    s.idleTimeoutSec = Math.max(30, Math.min(3600, Number(val('presenceIdleTimeout')) || 300));
    s.awayTimeoutSec = Math.max(60, Math.min(7200, Number(val('presenceAwayTimeout')) || 900));
    s.trackInput = chk('presenceTrackInput');
    s.trackVisibility = chk('presenceTrackVisibility');
    s.awayLockVault = chk('presenceAwayLockVault');
    s.awayPauseFocus = chk('presenceAwayPauseFocus');
    s.welcomeBackSummary = chk('presenceWelcomeBack');
    saveSettings(s);
    if(typeof toast === 'function') toast('Presence settings saved', 'success');
    renderPresenceCard?.();
    return s;
  }

  /* ---------- Wire into Hub ---------- */
  // Extend hubSummary for AI context
  const _origHubSummary = typeof window.hubSummary === 'function' ? window.hubSummary : null;
  window.hubSummary = function(){
    const base = _origHubSummary ? _origHubSummary() : {};
    if(_settings.enabled){
      base.presence = {
        status: computeStatus(),
        secondsSinceInput: secondsSinceInput(),
        totalPresentTodayMin: Math.round((_presenceState.totalPresentToday || 0) / 6),
        awayCountToday: _presenceState.awayCountToday || 0,
        lastAwayAt: _presenceState.lastAwayAt || null,
        lastReturnAt: _presenceState.lastReturnAt || null,
        idleTimeoutSec: _settings.idleTimeoutSec,
        awayTimeoutSec: _settings.awayTimeoutSec
      };
    }
    return base;
  };

  // Expose globals
  window.initPresence = initPresence;
  window.presenceSettings = presenceSettings;
  window.presenceState = presenceState;
  window.presenceStatus = presenceStatus;
  window.presenceHistory = presenceHistory;
  window.presenceSummary = presenceSummary;
  window.presenceContextForAI = presenceContextForAI;
  window.renderPresenceCard = renderPresenceCard;
  window.savePresenceSettings = saveSettings;
  window.syncPresenceSettingsUI = syncPresenceSettingsUI;
  window.readPresenceSettingsUI = readPresenceSettingsUI;

  /* ---------- Build 32: RuView Hardware Presence Bridge ---------- */
  // When RuView hardware detects presence, reset the idle timer
  window._ruviewPresencePing = function(detail){
    if(!_settings.enabled) return;
    _presenceState.lastInput = now();
    const prev = _presenceState.status;
    _presenceState.status = STATUS_PRESENT;
    if(prev !== STATUS_PRESENT){
      transitionStatus(prev, STATUS_PRESENT);
    }
    savePresenceState();
  };

})();
