/* ===========================================================
   BUILD 33 — Presence Automation Rules Engine
   ===========================================================
   Category C optional module. Provides configurable automation
   rules that trigger on presence state transitions.
   
   Replaces the hardcoded automation in Build 31 with a flexible
   rule system. Users can enable/disable individual rules, adjust
   triggers, and add custom actions.
   
   Integrates with both browser presence (Build 31) and RuView
   hardware presence (Build 32).
   =========================================================== */
(function(){
  'use strict';

  /* ---------- Constants ---------- */
  const AUTOMATION_KEY = 'hub.presence.automation.v1';
  const AUTOMATION_LOG_KEY = 'hub.presence.automation.log.v1';
  const LOG_LIMIT = 100;

  /* ---------- Trigger Types ---------- */
  const TRIGGERS = {
    away:         { label: 'User goes away',        icon: '🚶', desc: 'Fires when presence transitions to away.' },
    return:       { label: 'User returns',           icon: '🏠', desc: 'Fires when user returns from away.' },
    idle:         { label: 'User goes idle',         icon: '💤', desc: 'Fires when presence transitions to idle.' },
    long_away:    { label: 'Away for extended time', icon: '⏰', desc: 'Fires when user has been away longer than threshold.' },
    first_active: { label: 'First activity of day',  icon: '🌅', desc: 'Fires on first detected presence each day.' }
  };

  /* ---------- Action Types ---------- */
  const ACTIONS = {
    lock_vault:       { label: 'Lock Secure Vault',        icon: '🔐', danger: true,  desc: 'Locks the vault if it is currently unlocked.' },
    pause_focus:      { label: 'Pause LOCK IN session',    icon: '🎯', danger: false, desc: 'Cancels any active focus/Lock In session.' },
    toast:            { label: 'Show toast notification',  icon: '🔔', danger: false, desc: 'Displays a toast message in TheHUB.' },
    notify_marciale:  { label: 'Notify Marciale',          icon: '🤖', danger: false, desc: 'Sends a presence event to the Autopilot log.' },
    companion_event:  { label: 'Send Companion event',     icon: '🧬', danger: false, desc: 'Sends a presence event to Idle Hero companion.' },
    log_activity:     { label: 'Log Hub Activity',         icon: '🟩', danger: false, desc: 'Logs a presence transition to the activity streak.' },
    desktop_notify:   { label: 'Desktop notification',     icon: '📬', danger: false, desc: 'Sends a browser desktop notification (requires permission).' },
    pause_companion:  { label: 'Pause companion game',     icon: '⏸️', danger: false, desc: 'Pauses the Idle Hero companion iframe.' }
  };

  /* ---------- Default Rules ---------- */
  const DEFAULT_RULES = [
    {
      id: 'rule-vault-away',
      name: 'Lock Vault on Away',
      trigger: 'away',
      actions: [{ type: 'lock_vault', args: {} }],
      enabled: false,
      builtIn: true
    },
    {
      id: 'rule-focus-away',
      name: 'Pause LOCK IN on Away',
      trigger: 'away',
      actions: [{ type: 'pause_focus', args: {} }],
      enabled: false,
      builtIn: true
    },
    {
      id: 'rule-welcome-toast',
      name: 'Welcome Back Toast',
      trigger: 'return',
      actions: [{ type: 'toast', args: { message: 'Welcome back! Ready to pick up where you left off?', level: 'info' } }],
      enabled: true,
      builtIn: true
    },
    {
      id: 'rule-welcome-summary',
      name: 'Welcome Back Status',
      trigger: 'return',
      actions: [{ type: 'toast', args: { message: 'Checking Hub status…', level: 'info' } }],
      enabled: false,
      builtIn: true
    },
    {
      id: 'rule-companion-away',
      name: 'Notify Companion on Away',
      trigger: 'away',
      actions: [{ type: 'companion_event', args: { eventType: 'presence_away', label: 'User stepped away' } }],
      enabled: true,
      builtIn: true
    },
    {
      id: 'rule-companion-return',
      name: 'Notify Companion on Return',
      trigger: 'return',
      actions: [{ type: 'companion_event', args: { eventType: 'presence_return', label: 'User returned to desk' } }],
      enabled: true,
      builtIn: true
    },
    {
      id: 'rule-autopilot-away',
      name: 'Log Away to Autopilot',
      trigger: 'away',
      actions: [{ type: 'notify_marciale', args: { logType: 'presence_away' } }],
      enabled: true,
      builtIn: true
    },
    {
      id: 'rule-desktop-away',
      name: 'Desktop Alert on Away',
      trigger: 'away',
      actions: [{ type: 'desktop_notify', args: { title: 'TheHUB', body: 'You appear to be away. Vault will auto-lock if enabled.' } }],
      enabled: false,
      builtIn: true
    }
  ];

  /* ---------- State ---------- */
  let _rules = [];
  let _log = [];
  let _longAwayTimer = null;
  let _longAwayThresholdMin = 10;
  let _firstActiveToday = false;
  let _initialized = false;

  /* ---------- Persistence ---------- */
  function loadRules(){
    try{
      const raw = LS.get(AUTOMATION_KEY, null);
      if(Array.isArray(raw) && raw.length){
        _rules = raw.map(normalizeRule).filter(Boolean);
      } else {
        _rules = DEFAULT_RULES.map(normalizeRule).filter(Boolean);
      }
    }catch(e){
      _rules = DEFAULT_RULES.map(normalizeRule).filter(Boolean);
    }
    return _rules;
  }

  function saveRules(){
    try{ LS.set(AUTOMATION_KEY, _rules); }catch(e){}
  }

  function loadLog(){
    try{
      const raw = LS.get(AUTOMATION_LOG_KEY, []);
      _log = Array.isArray(raw) ? raw.slice(-LOG_LIMIT) : [];
    }catch(e){ _log = []; }
    return _log;
  }

  function saveLog(){
    try{ LS.set(AUTOMATION_LOG_KEY, _log.slice(-LOG_LIMIT)); }catch(e){}
  }

  function normalizeRule(r){
    if(!r || typeof r !== 'object') return null;
    return {
      id: String(r.id || ('rule-' + (typeof uid === 'function' ? uid() : Date.now()))),
      name: String(r.name || 'Unnamed rule').slice(0, 80),
      trigger: TRIGGERS[r.trigger] ? r.trigger : 'away',
      actions: Array.isArray(r.actions) ? r.actions.filter(a => a && ACTIONS[a.type]).map(a => ({
        type: a.type,
        args: a.args && typeof a.args === 'object' ? a.args : {}
      })) : [],
      enabled: r.enabled !== false,
      builtIn: !!r.builtIn,
      cooldownMin: Math.max(0, Math.min(120, Number(r.cooldownMin) || 0)),
      lastTriggered: Number(r.lastTriggered) || 0
    };
  }

  /* ---------- Rule Evaluation ---------- */
  function evaluateTrigger(trigger, transition){
    if(trigger === 'away' && transition.to === 'away') return true;
    if(trigger === 'return' && transition.to === 'present' && transition.from === 'away') return true;
    if(trigger === 'idle' && transition.to === 'idle') return true;
    if(trigger === 'first_active' && transition.to === 'present' && !_firstActiveToday) return true;
    if(trigger === 'long_away') return false; // handled by timer
    return false;
  }

  function isRuleCooled(rule){
    if(!rule.cooldownMin) return false;
    const elapsed = Date.now() - (rule.lastTriggered || 0);
    return elapsed < rule.cooldownMin * 60 * 1000;
  }

  function getMatchingRules(trigger){
    return _rules.filter(r => r.enabled && r.trigger === trigger && !isRuleCooled(r));
  }

  /* ---------- Action Execution ---------- */
  function executeAction(action, context){
    const fn = ACTION_HANDLERS[action.type];
    if(!fn) return { ok: false, error: 'Unknown action: ' + action.type };
    try{
      const result = fn(action.args || {}, context);
      return { ok: true, result: result || '' };
    }catch(e){
      return { ok: false, error: String(e.message || e) };
    }
  }

  const ACTION_HANDLERS = {
    lock_vault: function(args, ctx){
      if(typeof lockVault === 'function' && typeof VAULT_UNLOCKED !== 'undefined' && VAULT_UNLOCKED){
        lockVault('Vault auto-locked by Presence Automation (Spatial Privacy)');
        return 'Vault locked';
      }
      if(typeof window !== 'undefined' && typeof window.lockVault === 'function'){
        window.lockVault('Vault auto-locked by Presence Automation (Spatial Privacy)');
        return 'Vault locked';
      }
      if(typeof Hub !== 'undefined' && typeof Hub.lockVault === 'function'){
        Hub.lockVault('Vault auto-locked by Presence Automation');
        return 'Vault locked';
      }
      return 'Vault was already locked';
    },

    pause_focus: function(args, ctx){
      if(typeof window !== 'undefined' && typeof window.cancelFocusSession === 'function'){
        // Check if there's an active focus session
        if(typeof window.activeFocusSession === 'function' && window.activeFocusSession()){
          window.cancelFocusSession('paused by Presence Automation');
          return 'Focus session paused';
        }
      }
      return 'No active focus session';
    },

    toast: function(args, ctx){
      const msg = String(args.message || 'Presence automation triggered').slice(0, 200);
      const level = args.level || 'info';
      if(typeof toast === 'function') toast(msg, level);
      return 'Toast shown: ' + msg;
    },

    notify_marciale: function(args, ctx){
      if(typeof logAutopilot === 'function'){
        const logType = args.logType || 'presence_automation';
        logAutopilot({
          type: logType,
          rule: ctx.ruleName || 'unknown',
          trigger: ctx.trigger || 'unknown',
          transition: ctx.from + ' → ' + ctx.to
        });
        return 'Logged to Autopilot';
      }
      return 'Autopilot log unavailable';
    },

    companion_event: function(args, ctx){
      if(typeof emitCompanionEvent === 'function'){
        emitCompanionEvent({
          type: args.eventType || 'presence_automation',
          label: args.label || ('Presence: ' + (ctx.trigger || 'event')),
          date: typeof todayStr === 'function' ? todayStr() : '',
          ts: Date.now()
        });
        return 'Companion event sent';
      }
      return 'Companion bridge unavailable';
    },

    log_activity: function(args, ctx){
      if(typeof logHubActivity === 'function'){
        logHubActivity('presence_automation', {
          label: args.label || ('Automation: ' + (ctx.ruleName || ctx.trigger || '')),
          points: 0,
          throttleKey: 'automation:' + (ctx.ruleId || ''),
          throttleMs: 15 * 60 * 1000
        });
        return 'Activity logged';
      }
      return 'Activity system unavailable';
    },

    desktop_notify: function(args, ctx){
      if(typeof hubNotify === 'function'){
        hubNotify(
          args.title || 'TheHUB Presence',
          args.body || ('Automation rule triggered: ' + (ctx.ruleName || '')),
          { type: 'presence', tag: 'presence-auto:' + (ctx.ruleId || Date.now()) }
        );
        return 'Desktop notification sent';
      }
      return 'Notification system unavailable';
    },

    pause_companion: function(args, ctx){
      // Send pause message to companion iframe
      try{
        const frames = document.querySelectorAll('iframe[src*="companion"]');
        frames.forEach(f => {
          try{ f.contentWindow.postMessage({ type: 'hub.companion.pause' }, '*'); }catch(e){}
        });
        return 'Companion paused';
      }catch(e){
        return 'Could not pause companion';
      }
    }
  };

  /* ---------- Main Automation Engine ---------- */
  function runAutomation(transition){
    if(!transition || !transition.from || !transition.to) return [];
    
    const results = [];
    const context = {
      from: transition.from,
      to: transition.to,
      trigger: '',
      ruleId: '',
      ruleName: '',
      ts: Date.now()
    };

    // Check each trigger type
    const triggerTypes = Object.keys(TRIGGERS);
    for(const triggerType of triggerTypes){
      if(!evaluateTrigger(triggerType, transition)) continue;
      
      context.trigger = triggerType;
      const rules = getMatchingRules(triggerType);
      
      for(const rule of rules){
        context.ruleId = rule.id;
        context.ruleName = rule.name;
        
        const ruleResults = [];
        for(const action of rule.actions){
          const result = executeAction(action, context);
          ruleResults.push({ action: action.type, ...result });
        }
        
        // Update cooldown
        rule.lastTriggered = Date.now();
        
        // Log the execution
        const logEntry = {
          id: typeof uid === 'function' ? uid() : String(Date.now()),
          ts: Date.now(),
          at: new Date().toISOString(),
          ruleId: rule.id,
          ruleName: rule.name,
          trigger: triggerType,
          transition: transition.from + ' → ' + transition.to,
          actions: ruleResults,
          allOk: ruleResults.every(r => r.ok)
        };
        _log.push(logEntry);
        if(_log.length > LOG_LIMIT) _log = _log.slice(-LOG_LIMIT);
        
        results.push(logEntry);
      }
    }

    // Handle first-active-of-day tracking
    if(transition.to === 'present'){
      _firstActiveToday = true;
    }

    // Start long-away timer if transitioning to away
    if(transition.to === 'away'){
      startLongAwayTimer();
    } else {
      stopLongAwayTimer();
    }

    if(results.length) saveRules();
    if(results.length) saveLog();
    return results;
  }

  /* ---------- Long Away Timer ---------- */
  function startLongAwayTimer(){
    stopLongAwayTimer();
    const thresholdMs = _longAwayThresholdMin * 60 * 1000;
    if(thresholdMs <= 0) return;
    
    _longAwayTimer = setTimeout(function(){
      _longAwayTimer = null;
      // Check if still away
      if(typeof presenceStatus === 'function' && presenceStatus() === 'away'){
        const rules = getMatchingRules('long_away');
        for(const rule of rules){
          const context = { from: 'away', to: 'away', trigger: 'long_away', ruleId: rule.id, ruleName: rule.name, ts: Date.now() };
          for(const action of rule.actions){
            executeAction(action, context);
          }
          rule.lastTriggered = Date.now();
          _log.push({
            id: typeof uid === 'function' ? uid() : String(Date.now()),
            ts: Date.now(), at: new Date().toISOString(),
            ruleId: rule.id, ruleName: rule.name, trigger: 'long_away',
            transition: 'away → away (extended)', actions: rule.actions.map(a => ({ action: a.type, ok: true })),
            allOk: true
          });
        }
        saveRules();
        saveLog();
      }
    }, thresholdMs);
  }

  function stopLongAwayTimer(){
    if(_longAwayTimer){
      clearTimeout(_longAwayTimer);
      _longAwayTimer = null;
    }
  }

  /* ---------- Public API ---------- */
  function initPresenceAutomation(){
    if(_initialized) return;
    _initialized = true;
    loadRules();
    loadLog();
    
    // Wire into presence module transition events
    if(typeof document !== 'undefined'){
      document.addEventListener('presence-transition', function(e){
        if(e.detail) runAutomation(e.detail);
      });
    }
  }

  function automationRules(){
    return _rules.map(function(r){ return Object.assign({}, r); });
  }

  function automationLog(limit){
    return _log.slice(-(limit || LOG_LIMIT));
  }

  function automationTriggerDefs(){
    return Object.assign({}, TRIGGERS);
  }

  function automationActionDefs(){
    return Object.assign({}, ACTIONS);
  }

  function enableRule(ruleId){
    const rule = _rules.find(function(r){ return r.id === ruleId; });
    if(rule){ rule.enabled = true; saveRules(); }
  }

  function disableRule(ruleId){
    const rule = _rules.find(function(r){ return r.id === ruleId; });
    if(rule){ rule.enabled = false; saveRules(); }
  }

  function toggleRule(ruleId){
    const rule = _rules.find(function(r){ return r.id === ruleId; });
    if(rule){ rule.enabled = !rule.enabled; saveRules(); return rule.enabled; }
    return false;
  }

  function setRuleCooldown(ruleId, minutes){
    const rule = _rules.find(function(r){ return r.id === ruleId; });
    if(rule){ rule.cooldownMin = Math.max(0, Math.min(120, Number(minutes) || 0)); saveRules(); }
  }

  function addCustomRule(rule){
    const normalized = normalizeRule(Object.assign({}, rule, { builtIn: false }));
    if(!normalized) return null;
    _rules.push(normalized);
    saveRules();
    return normalized;
  }

  function removeRule(ruleId){
    const rule = _rules.find(function(r){ return r.id === ruleId; });
    if(!rule) return false;
    if(rule.builtIn) return false; // Can't remove built-in rules
    _rules = _rules.filter(function(r){ return r.id !== ruleId; });
    saveRules();
    return true;
  }

  function resetAutomationRules(){
    _rules = DEFAULT_RULES.map(normalizeRule).filter(Boolean);
    saveRules();
    return _rules;
  }

  function clearAutomationLog(){
    _log = [];
    saveLog();
  }

  function setLongAwayThreshold(minutes){
    _longAwayThresholdMin = Math.max(1, Math.min(120, Number(minutes) || 10));
  }

  function automationSummary(){
    const enabled = _rules.filter(function(r){ return r.enabled; });
    const triggers = {};
    enabled.forEach(function(r){ triggers[r.trigger] = (triggers[r.trigger] || 0) + 1; });
    const todayLog = _log.filter(function(e){ return e.at && e.at.slice(0, 10) === (typeof todayStr === 'function' ? todayStr() : ''); });
    return {
      totalRules: _rules.length,
      enabledRules: enabled.length,
      triggersByType: triggers,
      executionsToday: todayLog.length,
      lastExecution: _log.length ? _log[_log.length - 1] : null
    };
  }

  /* ---------- Expose Globals ---------- */
  window.initPresenceAutomation = initPresenceAutomation;
  window.automationRules = automationRules;
  window.automationLog = automationLog;
  window.automationTriggerDefs = automationTriggerDefs;
  window.automationActionDefs = automationActionDefs;
  window.enableAutomationRule = enableRule;
  window.disableAutomationRule = disableRule;
  window.toggleAutomationRule = toggleRule;
  window.setAutomationRuleCooldown = setRuleCooldown;
  window.addAutomationRule = addCustomRule;
  window.removeAutomationRule = removeRule;
  window.resetAutomationRules = resetAutomationRules;
  window.clearAutomationLog = clearAutomationLog;
  window.setLongAwayThreshold = setLongAwayThreshold;
  window.automationSummary = automationSummary;
  window.runPresenceAutomation = runAutomation;

})();
