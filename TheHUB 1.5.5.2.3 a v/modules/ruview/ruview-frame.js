/* ===========================================================
   BUILD 33.1 — RuView Tab & HubFrame Embed
   ===========================================================
   Category C optional module. Embeds the full RuView UI inside
   TheHUB using the HubFrame/iframe pattern (same as Idle Hero).
   
   Lifecycle:
   1. Health check → detect if RuView Docker is running
   2. If online → create HubFrame iframe with dark theme injection
   3. If offline → show graceful offline state with retry button
   4. On tab switch → suspend/resume iframe for performance
   5. postMessage bridge for presence/vitals data flow
   =========================================================== */
(function(){
  'use strict';

  /* ---------- Constants ---------- */
  const RUVIEW_FRAME_KEY = 'hub.ruview.frame.v1';
  const PROXY_BASE = '/ruview-proxy';
  const HEALTH_URL = PROXY_BASE + '/health';
  const UI_URL = PROXY_BASE + '/ui/observatory.html';
  const SUSPEND_SRC = 'about:blank';

  /* ---------- Build 33.3: Formal RuView Event Protocol ---------- */
  // Strict typed event constants. All events use the 'ruview:' prefix.
  // The parent listener rejects any message that doesn't match these types.
  const RUVIEW_EVENTS = Object.freeze({
    // Inbound events (RuView iframe → TheHUB parent)
    PRESENCE_UPDATE:  'ruview:presence',
    VITALS_UPDATE:    'ruview:vitals',
    SIGNAL_UPDATE:    'ruview:signal',
    STATUS_CHANGE:    'ruview:status',
    ERROR:            'ruview:error',
    READY:            'ruview:ready',
    BRIDGE_INIT:      'ruview:bridge_init',
    HEALTH_PING:      'ruview:health_ping',

    // Outbound events (TheHUB parent → RuView iframe)
    SET_THEME:           'ruview:set_theme',
    SET_REDUCED_MOTION:  'ruview:set_reduced_motion',
    SET_PERFORMANCE:     'ruview:set_performance_mode',
    SET_ANIMATION_PAUSE: 'ruview:set_animation_paused',
    REQUEST_STATE:       'ruview:request_state',
    COMMAND:             'ruview:command'
  });

  // Allowed origin whitelist for postMessage validation
  const ALLOWED_ORIGINS = [
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'null' // file:// and sandboxed iframes
  ];

  // Bridge watchdog — if no valid events arrive for this many ms, mark stale
  const WATCHDOG_TIMEOUT_MS = 5000;

  /* ---------- State ---------- */
  let _hubFrame = null;
  let _suspended = false;
  let _healthStatus = 'unknown'; // 'ok' | 'offline' | 'checking' | 'unknown'
  let _healthInfo = null;
  let _lastHealthCheck = 0;
  let _initialized = false;
  let _performanceMode = false; // true = 2D only, false = full 3D
  let _reducedMotion = false;
  let _lowMemoryWarningShown = false;
  let _pageVisibilityHandler = null;
  
  // Build 33.3: Bridge health watchdog
  let _watchdogTimer = null;
  let _lastValidEventAt = 0;
  let _bridgeStale = false;
  let _confidenceThreshold = 0.75; // Default: 75% — events below this are dropped
  
  // Build 33.3: Event counters for diagnostics
  let _eventStats = {
    total: 0,
    presence: 0,
    vitals: 0,
    signal: 0,
    status: 0,
    errors: 0,
    dropped: 0, // events dropped due to confidence threshold
    stale: 0,   // watchdog triggers
    lastEventType: '',
    lastEventTs: 0
  };

  /* ---------- Health Check ---------- */
  async function checkRuViewHealth(force){
    const now = Date.now();
    if(!force && _healthStatus !== 'unknown' && now - _lastHealthCheck < 10000) return _healthStatus;
    
    _healthStatus = 'checking';
    _lastHealthCheck = now;
    updateStatusBar();
    
    try{
      const resp = await fetch(HEALTH_URL, { 
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store'
      });
      const data = await resp.json();
      
      if(data && data.status === 'ok'){
        _healthStatus = 'ok';
        _healthInfo = data;
      } else {
        _healthStatus = 'offline';
        _healthInfo = data || { error: 'No response' };
      }
    }catch(e){
      _healthStatus = 'offline';
      _healthInfo = { error: String(e.message || e) };
    }
    
    updateStatusBar();
    return _healthStatus;
  }

  /* ---------- Build 33.2: GPU Memory Warning ---------- */
  function checkGpuMemory(){
    try{
      const mem = navigator.deviceMemory;
      if(typeof mem === 'number' && mem < 4 && !_lowMemoryWarningShown){
        _lowMemoryWarningShown = true;
        // Auto-enable performance mode for low-memory devices
        if(!_performanceMode){
          _performanceMode = true;
          try{ LS.set(RUVIEW_FRAME_KEY + '.perfMode', true); }catch(e){}
        }
        return { low: true, memory: mem, message: `Low device memory detected (${mem}GB). 3D mode disabled automatically.` };
      }
    }catch(e){}
    return { low: false };
  }

  function showLowMemoryBanner(){
    const container = document.getElementById('ruview-frame-container');
    if(!container) return;
    const mem = navigator.deviceMemory || '?';
    const existing = container.querySelector('.ruview-low-memory-banner');
    if(existing) return; // Already shown
    
    const banner = document.createElement('div');
    banner.className = 'ruview-low-memory-banner';
    banner.style.cssText = 'position:absolute;top:0;left:0;right:0;z-index:10;padding:8px 16px;background:color-mix(in srgb,var(--warn) 15%,var(--card));border-bottom:1px solid var(--warn);font-size:12px;color:var(--txt);display:flex;align-items:center;gap:10px;flex-wrap:wrap';
    banner.innerHTML = `
      <span>⚠️</span>
      <span style="flex:1">Low device memory detected (${mem}GB). Running in 2D performance mode to protect page responsiveness.</span>
      <button class="btn sm" type="button" onclick="this.parentElement.remove()" style="padding:4px 10px;min-height:0;font-size:11px">Dismiss</button>
    `;
    container.style.position = 'relative';
    container.appendChild(banner);
  }

  /* ---------- Build 33.2: Page Visibility API ---------- */
  function initPageVisibilityHandler(){
    if(_pageVisibilityHandler) return;
    
    _pageVisibilityHandler = function(){
      if(!_hubFrame || _suspended) return;
      
      if(document.hidden){
        // Browser tab hidden — pause Three.js rendering inside iframe
        _hubFrame.postMessage({ type: 'hub.frame.pause' });
        _hubFrame.postMessage({ type: 'set_animation_paused', value: true });
      } else {
        // Browser tab visible again — resume if RuView tab is active
        const ruviewPage = document.getElementById('page-ruview');
        if(ruviewPage && ruviewPage.classList.contains('active')){
          _hubFrame.postMessage({ type: 'hub.frame.resume' });
          _hubFrame.postMessage({ type: 'set_animation_paused', value: false });
        }
      }
    };
    
    document.addEventListener('visibilitychange', _pageVisibilityHandler);
  }

  /* ---------- Iframe Lifecycle ---------- */
  function initRuViewFrame(){
    if(_initialized) return;
    _initialized = true;
    
    // Check reduced motion preference
    try{
      _reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;
    }catch(e){}
    
    // Load saved performance mode
    try{
      _performanceMode = !!LS.get(RUVIEW_FRAME_KEY + '.perfMode', false);
    }catch(e){}
    
    // Build 33.3: Load saved confidence threshold
    try{
      const savedThreshold = LS.get(RUVIEW_FRAME_KEY + '.confidenceThreshold', 0.75);
      _confidenceThreshold = Math.max(0, Math.min(1, Number(savedThreshold) || 0.75));
    }catch(e){}
    
    // Build 33.2: GPU memory check — auto-enable 2D mode for low-memory devices
    const gpuCheck = checkGpuMemory();
    if(gpuCheck.low){
      showLowMemoryBanner();
    }
    
    // Build 33.2: Page Visibility API — pause Three.js when browser tab hidden
    initPageVisibilityHandler();
    
    // Start with health check
    checkRuViewHealth(true).then(function(status){
      if(status === 'ok'){
        embedRuViewUI();
      } else {
        showOfflineState();
      }
    });
  }

  function embedRuViewUI(){
    const container = document.getElementById('ruview-frame-container');
    if(!container) return;
    
    // Destroy existing frame if any
    if(_hubFrame){
      _hubFrame.destroy();
      _hubFrame = null;
    }
    
    _suspended = false;
    
    // Create HubFrame
    _hubFrame = new window.HubFrame(container, {
      id: 'ruview-iframe',
      src: UI_URL,
      title: '🛰️ RuView',
      subtitle: 'WiFi Spatial Sensing',
      className: 'ruview-frame',
      frameClass: 'ruview-game-frame',
      reloadable: true,
      closable: false,
      showUrl: false,
      showStatus: true,
      sandbox: 'allow-scripts allow-same-origin allow-popups',
      pauseOnHidden: true,
      lazy: false,
      onLoad: function(frame){
        frame.setStatus('🟢 Connected');
        injectDarkTheme(frame);
        injectBridgeScript(frame);  // Build 33.3: Inject bridge for event forwarding
        sendConfigMessages(frame);
        updateStatusBar();
        // Build 33.3: Start watchdog — expects events within 5s
        resetWatchdog();
      },
      onMessage: function(event, frame){
        handleRuViewMessage(event);
      }
    });
    
    updateStatusBar();
  }

  function showOfflineState(){
    const container = document.getElementById('ruview-frame-container');
    if(!container) return;
    
    // Destroy existing frame
    if(_hubFrame){
      _hubFrame.destroy();
      _hubFrame = null;
    }
    
    const errorDetail = _healthInfo?.error || 'Connection refused';
    const ruviewUrl = _healthInfo?.ruview_url || 'http://127.0.0.1:3000';
    
    container.innerHTML = `
      <div class="ruview-offline-state">
        <div class="ruview-offline-icon">📡</div>
        <h3>RuView is offline</h3>
        <p>TheHUB cannot reach the RuView sensing server.</p>
        <div class="ruview-offline-detail">
          <div><b>Target:</b> ${esc(ruviewUrl)}</div>
          <div><b>Status:</b> ${esc(errorDetail)}</div>
        </div>
        <div class="ruview-offline-help">
          <b>To start RuView:</b>
          <code>docker-compose up ruview</code>
          <span>or</span>
          <code>docker run -p 3000:3000 -e CSI_SOURCE=simulated ruvnet/wifi-densepose:latest</code>
        </div>
        <div class="ruview-offline-actions">
          <button class="btn primary" id="ruviewRetryBtn" type="button">Retry connection</button>
          <button class="btn" id="ruviewCheckHealthBtn" type="button">Check health</button>
        </div>
      </div>
    `;
    
    document.getElementById('ruviewRetryBtn')?.addEventListener('click', function(){
      checkRuViewHealth(true).then(function(status){
        if(status === 'ok') embedRuViewUI();
        else showOfflineState();
      });
    });
    
    document.getElementById('ruviewCheckHealthBtn')?.addEventListener('click', function(){
      checkRuViewHealth(true).then(function(status){
        if(status === 'ok'){
          if(typeof toast === 'function') toast('✅ RuView is online!', 'success');
          embedRuViewUI();
        } else {
          if(typeof toast === 'function') toast('❌ RuView still offline: ' + errorDetail, 'warn');
          showOfflineState();
        }
      });
    });
    
    updateStatusBar();
  }

  /* ---------- Dark Theme Injection ---------- */
  function injectDarkTheme(frame){
    if(!frame || !frame.frame || !frame.frame.contentWindow) return;
    
    try{
      const iframeDoc = frame.frame.contentDocument || frame.frame.contentWindow.document;
      if(!iframeDoc) return;
      
      const style = iframeDoc.createElement('style');
      style.id = 'thehub-ruview-theme';
      style.textContent = `
        /* TheHUB Dark Theme Override for RuView iframe */
        :root {
          --hub-bg: #121212;
          --hub-card: #181818;
          --hub-text: #ffffff;
          --hub-muted: #b3b3b3;
          --hub-accent: #1db954;
          --hub-border: #2a2a2a;
        }
        
        body {
          background: var(--hub-bg) !important;
          color: var(--hub-text) !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
        }
        
        /* Hide RuView's own navigation since TheHUB provides chrome */
        .ruview-header,
        .ruview-nav,
        nav.navbar,
        header.app-header,
        .app-nav {
          display: none !important;
        }
        
        /* Darken panels */
        .panel, .card, .dashboard, .widget,
        [class*="panel"], [class*="card"], [class*="widget"] {
          background: var(--hub-card) !important;
          border-color: var(--hub-border) !important;
          color: var(--hub-text) !important;
        }
        
        /* Fix text colors */
        h1, h2, h3, h4, h5, h6, p, span, div, label, li, td, th {
          color: var(--hub-text) !important;
        }
        
        .text-muted, .muted, [class*="muted"] {
          color: var(--hub-muted) !important;
        }
        
        /* Fix inputs */
        input, select, textarea {
          background: var(--hub-bg) !important;
          color: var(--hub-text) !important;
          border-color: var(--hub-border) !important;
        }
        
        /* Fix links */
        a { color: var(--hub-accent) !important; }
        
        /* Scrollbar */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: var(--hub-bg); }
        ::-webkit-scrollbar-thumb { background: var(--hub-border); border-radius: 4px; }
      `;
      
      // Inject after document is ready
      if(iframeDoc.readyState === 'complete' || iframeDoc.readyState === 'interactive'){
        iframeDoc.head.appendChild(style);
      } else {
        iframeDoc.addEventListener('DOMContentLoaded', function(){
          iframeDoc.head.appendChild(style);
        });
      }
    }catch(e){
      // Cross-origin restriction — theme injection won't work
      // The iframe is same-origin via proxy, so this should succeed
      try{ logHubError?.('ruview-theme-inject', e); }catch(_){}
    }
  }

  /* ---------- Build 33.3: Bridge Script Injection ---------- */
  function injectBridgeScript(frame){
    if(!frame || !frame.frame || !frame.frame.contentWindow) return;
    
    try{
      const iframeDoc = frame.frame.contentDocument || frame.frame.contentWindow.document;
      if(!iframeDoc) return;
      
      // Check if bridge is already injected
      if(iframeDoc.getElementById('thehub-ruview-bridge')) return;
      
      // Create a <script> tag that loads the bridge injector
      const script = iframeDoc.createElement('script');
      script.id = 'thehub-ruview-bridge';
      script.textContent = getBridgeInjectorCode();
      
      // Inject at the end of body to ensure WebSocket is available
      if(iframeDoc.body){
        iframeDoc.body.appendChild(script);
      } else {
        iframeDoc.addEventListener('DOMContentLoaded', function(){
          iframeDoc.body.appendChild(script);
        });
      }
    }catch(e){
      // Cross-origin restriction — bridge injection won't work
      try{ logHubError?.('ruview-bridge-inject', e); }catch(_){}
    }
  }

  // Returns the bridge injector code as a string
  // In production, this would be loaded from modules/ruview/ruview-bridge-injector.js
  // For same-origin iframes, we inline a simplified version
  function getBridgeInjectorCode(){
    return '(' + function(){
      var BRIDGE_VERSION = '1.0';
      var HEARTBEAT_MS = 3000;
      var EVENTS = {
        PRESENCE_UPDATE: 'ruview:presence',
        VITALS_UPDATE: 'ruview:vitals',
        SIGNAL_UPDATE: 'ruview:signal',
        STATUS_CHANGE: 'ruview:status',
        ERROR: 'ruview:error',
        READY: 'ruview:ready',
        BRIDGE_INIT: 'ruview:bridge_init',
        HEALTH_PING: 'ruview:health_ping'
      };
      function sendToParent(type, payload){
        try{
          window.parent.postMessage({ type: type, payload: payload || {}, source: 'ruview-bridge', version: BRIDGE_VERSION, timestamp: Date.now() }, '*');
        }catch(e){}
      }
      sendToParent(EVENTS.BRIDGE_INIT, { version: BRIDGE_VERSION });
      setInterval(function(){ sendToParent(EVENTS.HEALTH_PING, { ts: Date.now() }); }, HEARTBEAT_MS);
      
      // Intercept WebSocket messages
      var OrigWS = window.WebSocket;
      if(OrigWS){
        var origAdd = OrigWS.prototype.addEventListener;
        OrigWS.prototype.addEventListener = function(type, fn, opts){
          if(type === 'message' && typeof fn === 'function'){
            var wrapped = function(event){
              try{
                var d = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
                if(d && d.classification){
                  var cls = d.classification || {};
                  var feat = d.features || {};
                  var node = (d.nodes || [])[0] || {};
                  sendToParent(EVENTS.PRESENCE_UPDATE, {
                    present: !!cls.presence, confidence: cls.confidence || 0,
                    motionLevel: cls.motion_level || 'unknown', source: d.source || 'unknown',
                    rssi: feat.mean_rssi || node.rssi_dbm || 0, timestamp: d.timestamp || Date.now()
                  });
                  if(feat.breathing_band_power > 0.01 && feat.dominant_freq_hz){
                    var bpm = Math.round(feat.dominant_freq_hz * 60);
                    if(bpm >= 6 && bpm <= 30) sendToParent(EVENTS.VITALS_UPDATE, { breathingBpm: bpm, timestamp: d.timestamp || Date.now() });
                  }
                  if(d.signal_field && d.signal_field.values) sendToParent(EVENTS.SIGNAL_UPDATE, { gridValues: d.signal_field.values, timestamp: d.timestamp || Date.now() });
                }
                if(d && d.error) sendToParent(EVENTS.ERROR, { message: d.error, timestamp: d.timestamp || Date.now() });
              }catch(e){}
              fn.call(this, event);
            };
            return origAdd.call(this, type, wrapped, opts);
          }
          return origAdd.call(this, type, fn, opts);
        };
      }
      
      // Listen for parent commands
      window.addEventListener('message', function(e){
        // SECURITY 2026-08-15 (@joint fault audit): e.data.from is forgeable.
        if(e.origin && e.origin !== 'null' && e.origin !== window.location.origin) return;
        if(e.source && e.source !== window.parent) return;
        if(e.data && e.data.from === 'TheHUB'){
          if(e.data.type === 'ruview:request_state') sendToParent('ruview:state_response', { bridgeVersion: BRIDGE_VERSION, ts: Date.now() });
        }
      });
      
      sendToParent(EVENTS.READY, { version: BRIDGE_VERSION });
      try{ console.log('[RuView Bridge] Injector active (v' + BRIDGE_VERSION + ')'); }catch(e){}
    } + ')();';
  }

  /* ---------- Config Messages ---------- */
  function sendConfigMessages(frame){
    if(!frame) return;
    
    // Send reduced motion preference
    if(_reducedMotion){
      frame.postMessage({ type: 'set_reduced_motion', value: true });
    }
    
    // Send performance mode
    if(_performanceMode){
      frame.postMessage({ type: 'set_performance_mode', value: '2d' });
    }
    
    // Send theme colors
    try{
      const style = getComputedStyle(document.documentElement);
      frame.postMessage({
        type: 'set_theme',
        bg: style.getPropertyValue('--bg').trim() || '#121212',
        card: style.getPropertyValue('--card').trim() || '#181818',
        text: style.getPropertyValue('--txt').trim() || '#ffffff',
        accent: style.getPropertyValue('--acc').trim() || '#1db954',
        border: style.getPropertyValue('--line').trim() || '#2a2a2a'
      });
    }catch(e){}
  }

  /* ---------- Build 33.3: postMessage Bridge Handler ---------- */
  function handleRuViewMessage(event){
    const data = event.data;
    if(!data || typeof data !== 'object') return;
    if(typeof data.type !== 'string') return;
    
    // Only process ruview:* events
    if(!data.type.startsWith('ruview:')) return;
    
    // Build 33.3: Strict origin validation using frozen whitelist
    if(event.origin && !ALLOWED_ORIGINS.includes(event.origin)){
      try{
        console.warn('[RuView Bridge] Rejected message from untrusted origin:', event.origin);
      }catch(_){}
      return;
    }
    
    // Build 33.3: Reset watchdog on any valid event
    resetWatchdog();
    _lastValidEventAt = Date.now();
    
    // Build 33.3: Update event stats
    _eventStats.total++;
    _eventStats.lastEventType = data.type;
    _eventStats.lastEventTs = Date.now();
    
    const payload = data.payload || {};
    
    // Build 33.3: Confidence threshold filtering
    // Events with confidence below the configured threshold are silently dropped.
    // This prevents low-quality detection from triggering automations or polluting the UI.
    const confidence = typeof payload.confidence === 'number' ? payload.confidence : 1.0;
    if(confidence < _confidenceThreshold && data.type !== RUVIEW_EVENTS.ERROR && data.type !== RUVIEW_EVENTS.STATUS_CHANGE){
      _eventStats.dropped++;
      return; // Silently drop low-confidence events
    }
    
    switch(data.type){
      case RUVIEW_EVENTS.PRESENCE_UPDATE:
        _eventStats.presence++;
        handleRuViewPresence(payload);
        break;
      case RUVIEW_EVENTS.VITALS_UPDATE:
        _eventStats.vitals++;
        handleRuViewVitals(payload);
        break;
      case RUVIEW_EVENTS.SIGNAL_UPDATE:
        _eventStats.signal++;
        handleRuViewSignal(payload);
        break;
      case RUVIEW_EVENTS.STATUS_CHANGE:
        _eventStats.status++;
        handleRuViewStatus(payload);
        break;
      case RUVIEW_EVENTS.ERROR:
        _eventStats.errors++;
        try{ logHubError?.('ruview-error', new Error(payload.message || 'RuView error')); }catch(_){}
        break;
      case RUVIEW_EVENTS.READY:
        if(_hubFrame) _hubFrame.setStatus('🟢 Connected — Ready');
        break;
      case RUVIEW_EVENTS.BRIDGE_INIT:
        // Bridge injector confirmed — log for debugging
        try{
          console.log('[RuView Bridge] Bridge injector confirmed, version:', payload.version || 'unknown');
        }catch(_){}
        break;
      case RUVIEW_EVENTS.HEALTH_PING:
        // Heartbeat from bridge injector — confirms iframe ↔ parent communication
        resetWatchdog();
        break;
    }
  }

  function handleRuViewPresence(payload){
    // Feed into Build 31 presence module
    if(payload && typeof payload.present === 'boolean'){
      try{
        if(window._ruviewPresencePing){
          window._ruviewPresencePing({
            source: 'ruview',
            confidence: payload.confidence || 0,
            motion: payload.activityLevel || 'unknown'
          });
        }
      }catch(e){}
    }
    
    // Store for Today card
    window._ruviewPresenceData = Object.assign({}, window._ruviewPresenceData || {}, payload, {
      timestamp: Date.now()
    });
  }

  function handleRuViewVitals(payload){
    window._ruviewVitalsData = Object.assign({}, window._ruviewVitalsData || {}, payload, {
      timestamp: Date.now()
    });
  }

  function handleRuViewSignal(payload){
    window._ruviewSignalData = Object.assign({}, window._ruviewSignalData || {}, payload, {
      timestamp: Date.now()
    });
  }

  function handleRuViewStatus(payload){
    if(_hubFrame && payload && payload.state){
      _hubFrame.setStatus('🟢 ' + payload.state);
    }
  }

  /* ---------- Suspend/Resume (Build 33.2: Performance Isolation) ---------- */
  function suspendRuViewFrame(){
    if(_suspended) return;
    _suspended = true;
    
    // Build 33.3: Stop watchdog when suspended
    stopWatchdog();
    
    // Build 33.2: Fully destroy the HubFrame to free ALL GPU/WebGL resources.
    // Setting src to about:blank alone doesn't always release WebGL contexts.
    // Full destroy ensures the iframe element, its document, and all GPU
    // allocations are released when the user navigates away from the tab.
    if(_hubFrame){
      try{
        _hubFrame.postMessage({ type: 'hub.frame.pause' });
        _hubFrame.postMessage({ type: 'set_animation_paused', value: true });
      }catch(e){}
      _hubFrame.destroy();
      _hubFrame = null;
    }
    
    // Show a minimal suspended placeholder
    const container = document.getElementById('ruview-frame-container');
    if(container){
      container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--mut);font-size:14px;gap:12px;flex-direction:column"><span style="font-size:32px">⏸️</span><span>RuView suspended — click Resume to reload</span></div>';
    }
  }

  function resumeRuViewFrame(){
    if(!_suspended) return;
    _suspended = false;
    
    // Full re-embed — creates a fresh HubFrame with a new iframe element
    embedRuViewUI();
  }

  /* ---------- Status Bar ---------- */
  function updateStatusBar(){
    const bar = document.getElementById('ruviewStatusBar');
    if(!bar) return;
    
    const icon = document.getElementById('ruviewStatusIcon');
    const text = document.getElementById('ruviewStatusText');
    const detail = document.getElementById('ruviewStatusDetail');
    
    if(_healthStatus === 'ok'){
      if(icon) icon.textContent = '🟢';
      if(text) text.textContent = 'Connected';
      if(detail){
        const mode = _healthInfo?.response?.mode || 'unknown';
        const signals = _healthInfo?.response?.signals || 0;
        detail.textContent = `${mode === 'simulation' ? 'Simulation' : 'Live'} · ${signals} signal${signals === 1 ? '' : 's'} active`;
      }
    } else if(_healthStatus === 'checking'){
      if(icon) icon.textContent = '🔄';
      if(text) text.textContent = 'Checking…';
      if(detail) detail.textContent = 'Connecting to RuView…';
    } else {
      if(icon) icon.textContent = '🔴';
      if(text) text.textContent = 'Offline';
      if(detail) detail.textContent = _healthInfo?.error || 'RuView not reachable';
    }
  }

  /* ---------- Performance Mode (Build 33.2) ---------- */
  function togglePerformanceMode(){
    setPerformanceMode(!_performanceMode);
  }

  function setPerformanceMode(enabled){
    _performanceMode = !!enabled;
    try{ LS.set(RUVIEW_FRAME_KEY + '.perfMode', _performanceMode); }catch(e){}
    
    if(_hubFrame){
      _hubFrame.postMessage({
        type: 'set_performance_mode',
        value: _performanceMode ? '2d' : '3d'
      });
    }
    
    // Update all UI controls
    const btn = document.getElementById('ruviewPerfModeBtn');
    if(btn) btn.textContent = _performanceMode ? '2D Mode' : '3D Mode';
    
    // Update Hub Control toggle if present
    const hubCtrl = document.getElementById('ruviewPerfModeHubCtrl');
    if(hubCtrl) hubCtrl.checked = _performanceMode;
  }
  
  function isPerformanceMode(){
    return _performanceMode;
  }

  /* ---------- Build 33.3: Bridge Watchdog ---------- */
  function resetWatchdog(){
    if(_bridgeStale){
      _bridgeStale = false;
      updateBridgeStatus();
    }
    if(_watchdogTimer) clearTimeout(_watchdogTimer);
    _watchdogTimer = setTimeout(function(){
      if(!_hubFrame || _suspended) return;
      _bridgeStale = true;
      _eventStats.stale++;
      updateBridgeStatus();
      if(_hubFrame) _hubFrame.setStatus('⚠️ Bridge stale — no data for 5s');
    }, WATCHDOG_TIMEOUT_MS);
  }

  function updateBridgeStatus(){
    const detail = document.getElementById('ruviewStatusDetail');
    if(!detail) return;
    if(_bridgeStale){
      detail.textContent = '⚠️ No events for 5s — bridge may be stale. Click Reload.';
    }
  }

  function stopWatchdog(){
    if(_watchdogTimer){
      clearTimeout(_watchdogTimer);
      _watchdogTimer = null;
    }
  }

  /* ---------- Build 33.3: Confidence Threshold ---------- */
  function setConfidenceThreshold(value){
    _confidenceThreshold = Math.max(0, Math.min(1, Number(value) || 0.75));
    try{ LS.set(RUVIEW_FRAME_KEY + '.confidenceThreshold', _confidenceThreshold); }catch(e){}
  }

  function getConfidenceThreshold(){
    return _confidenceThreshold;
  }

  /* ---------- Build 33.3: Unified State Accessor ---------- */
  function getRuViewState(){
    return {
      connected: _healthStatus === 'ok' && !_bridgeStale,
      suspended: _suspended,
      stale: _bridgeStale,
      performanceMode: _performanceMode,
      reducedMotion: _reducedMotion,
      confidenceThreshold: _confidenceThreshold,
      health: _healthInfo,
      presence: window._ruviewPresenceData || null,
      vitals: window._ruviewVitalsData || null,
      signal: window._ruviewSignalData || null,
      stats: Object.assign({}, _eventStats),
      lastEventAge: _lastValidEventAt ? (Date.now() - _lastValidEventAt) : null
    };
  }

  /* ---------- Build 33.3: Event Stats Accessor ---------- */
  function getRuViewEventStats(){
    return Object.assign({}, _eventStats);
  }

  /* ---------- Build 33.3: Bridge Command API ---------- */
  // Send a command to the RuView iframe (e.g., trigger a specific action)
  function sendRuViewCommand(command, args){
    if(!_hubFrame) return false;
    return _hubFrame.postMessage({
      type: RUVIEW_EVENTS.COMMAND,
      command: String(command || ''),
      args: args || {}
    });
  }

  // Request current state from the RuView iframe
  function requestRuViewIframeState(){
    if(!_hubFrame) return false;
    return _hubFrame.postMessage({ type: RUVIEW_EVENTS.REQUEST_STATE });
  }

  /* ---------- Public API ---------- */
  window.initRuViewFrame = initRuViewFrame;
  window.embedRuViewUI = embedRuViewUI;
  window.showRuViewOffline = showOfflineState;
  window.checkRuViewHealth = checkRuViewHealth;
  window.suspendRuViewFrame = suspendRuViewFrame;
  window.resumeRuViewFrame = resumeRuViewFrame;
  window.toggleRuViewPerformanceMode = togglePerformanceMode;
  window.setRuViewPerformanceMode = setPerformanceMode;
  window.isRuViewPerformanceMode = isPerformanceMode;
  window.ruviewHealthStatus = function(){ return _healthStatus; };
  window.ruviewHealthInfo = function(){ return _healthInfo; };
  window.ruviewIsFrameReady = function(){ return !!_hubFrame && _hubFrame.ready; };
  window.ruviewIsSuspended = function(){ return _suspended; };
  // Build 33.3: Unified state accessor
  window.getRuViewState = getRuViewState;
  // Build 33.3: Event stats
  window.getRuViewEventStats = getRuViewEventStats;
  // Build 33.3: Confidence threshold
  window.setRuViewConfidenceThreshold = setConfidenceThreshold;
  window.getRuViewConfidenceThreshold = getConfidenceThreshold;
  // Build 33.3: Bridge commands
  window.sendRuViewCommand = sendRuViewCommand;
  window.requestRuViewIframeState = requestRuViewIframeState;
  // Build 33.3: Protocol constants (read-only)
  window.RUVIEW_EVENTS = RUVIEW_EVENTS;
  // Individual data accessors (backward compat)
  window.getRuViewPresenceData = function(){ return window._ruviewPresenceData || null; };
  window.getRuViewVitalsData = function(){ return window._ruviewVitalsData || null; };
  window.getRuViewSignalData = function(){ return window._ruviewSignalData || null; };

})();
