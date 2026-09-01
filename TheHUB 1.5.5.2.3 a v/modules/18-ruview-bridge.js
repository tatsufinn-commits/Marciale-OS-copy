/* ===========================================================
   BUILD 32 — RuView WebSocket Bridge
   ===========================================================
   Category C optional module. Connects TheHUB to a local RuView
   WiFi sensing daemon via WebSocket. Receives real-time presence,
   motion, breathing, and signal data from ESP32 CSI hardware.
   
   RuView sensing server: ws://localhost:3001/ws/sensing
   Message type: "sensing_update"
   
   Falls back gracefully to browser-based presence (Build 31)
   when RuView is unavailable. Never blocks the main thread.
   =========================================================== */
(function(){
  'use strict';

  /* ---------- Constants ---------- */
  const RUVIEW_KEY = 'hub.ruview.v1';
  const RUVIEW_STATS_KEY = 'hub.ruview.stats.v1';
  const RECONNECT_BASE_MS = 2000;
  const RECONNECT_MAX_MS = 30000;
  const HEARTBEAT_INTERVAL_MS = 15000;
  const DATA_WINDOW_LIMIT = 120;  // Keep last 120 data points (~60s at 500ms tick)

  /* ---------- State ---------- */
  let _ws = null;
  let _connected = false;
  let _reconnectAttempt = 0;
  let _reconnectTimer = null;
  let _heartbeatTimer = null;
  let _lastMessage = null;
  let _lastMessageAt = 0;
  let _dataWindow = [];
  let _stats = {
    connected: false,
    url: '',
    source: 'unknown',
    messagesReceived: 0,
    lastPresenceDetected: false,
    lastMotionLevel: 'unknown',
    lastConfidence: 0,
    lastBreathingBpm: null,
    lastHeartRateBpm: null,
    lastRssi: 0,
    lastNodeId: null,
    firstConnectedAt: null,
    lastConnectedAt: null,
    lastDisconnectedAt: null,
    reconnectCount: 0,
    errorCount: 0,
    lastError: ''
  };
  let _settings = {
    url: 'ws://127.0.0.1:3001/ws/sensing',
    enabled: false,
    autoReconnect: true,
    overridePresence: true,    // Use RuView presence over browser-based
    showSignalField: true,     // Render signal field visualization
    breathingDetection: true,  // Track breathing rate
    motionSensitivity: 'normal', // low, normal, high
    privacyMode: false         // Spatial Privacy: Redacts raw CSI/Doppler features
  };
  let _initialized = false;
  let _listenersAttached = false;

  /* ---------- Persistence ---------- */
  function loadSettings(){
    try{
      const raw = LS.get(RUVIEW_KEY, {});
      _settings = Object.assign({}, _settings, raw || {});
      // Sync with experimental registry
      const exp = typeof experimentalSettings === 'function' ? experimentalSettings() : null;
      if(exp && exp.ruview){
        _settings.enabled = !!exp.ruview.enabled;
        if(exp.ruview.url) _settings.url = exp.ruview.url;
      }
    }catch(e){}
    return _settings;
  }

  function saveSettings(s){
    _settings = Object.assign({}, _settings, s || {});
    LS.set(RUVIEW_KEY, _settings);
    // Mirror to experimental registry
    try{
      const exp = typeof experimentalSettings === 'function' ? experimentalSettings() : null;
      if(exp){
        exp.ruview.enabled = _settings.enabled;
        exp.ruview.url = _settings.url;
        if(typeof saveExperimentalSettings === 'function') saveExperimentalSettings(exp);
      }
    }catch(e){}
  }

  function loadStats(){
    try{
      const raw = LS.get(RUVIEW_STATS_KEY, {});
      _stats = Object.assign({}, _stats, raw || {});
    }catch(e){}
    return _stats;
  }

  function saveStats(){
    // FIXED (Build 32 perf): Throttle localStorage writes to every 5 seconds.
    // WebSocket delivers updates every 500ms; writing JSON to localStorage
    // that often blocks the main thread and causes visible lag.
    const now = Date.now();
    if(saveStats._lastWrite && now - saveStats._lastWrite < 5000) return;
    saveStats._lastWrite = now;
    try{ LS.set(RUVIEW_STATS_KEY, _stats); }catch(e){}
  }
  // Force an immediate save (bypasses throttle) for critical events
  function saveStatsNow(){
    saveStats._lastWrite = 0;
    saveStats();
  }

  /* ---------- WebSocket Connection ---------- */
  function connect(){
    if(_ws && (_ws.readyState === WebSocket.CONNECTING || _ws.readyState === WebSocket.OPEN)){
      return;
    }

    const url = _settings.url || 'ws://127.0.0.1:3001/ws/sensing';
    _stats.url = url;

    try{
      _ws = new WebSocket(url);
    }catch(e){
      _stats.errorCount++;
      _stats.lastError = 'WebSocket constructor failed: ' + (e.message || e);
      saveStats();
      scheduleReconnect();
      return;
    }

    _ws.onopen = function(){
      _connected = true;
      _reconnectAttempt = 0;
      _stats.connected = true;
      _stats.lastConnectedAt = new Date().toISOString();
      if(!_stats.firstConnectedAt) _stats.firstConnectedAt = _stats.lastConnectedAt;
      saveStats();
      
      // Start heartbeat
      startHeartbeat();
      
      // Notify presence module
      onRuViewConnected();
      
      // Re-render UI
      window.renderRuViewPage?.();
      window.renderPresenceCard?.();
      
      if(typeof toast === 'function') toast('📡 RuView connected — WiFi sensing active', 'success');
    };

    _ws.onmessage = function(event){
      try{
        const msg = JSON.parse(event.data);
        handleMessage(msg);
      }catch(e){
        _stats.errorCount++;
        _stats.lastError = 'Parse error: ' + (e.message || e);
        saveStats();
      }
    };

    _ws.onclose = function(event){
      _connected = false;
      _stats.connected = false;
      _stats.lastDisconnectedAt = new Date().toISOString();
      saveStats();
      stopHeartbeat();
      
      onRuViewDisconnected();
      window.renderRuViewPage?.();
      window.renderPresenceCard?.();
      
      if(_settings.autoReconnect){
        scheduleReconnect();
      }
    };

    _ws.onerror = function(event){
      _stats.errorCount++;
      _stats.lastError = 'WebSocket error (code: ' + (event.code || 'unknown') + ')';
      saveStats();
    };
  }

  function disconnect(){
    if(_reconnectTimer){
      clearTimeout(_reconnectTimer);
      _reconnectTimer = null;
    }
    stopHeartbeat();
    if(_ws){
      try{
        _ws.onclose = null; // Prevent reconnect on manual close
        _ws.close(1000, 'Client disconnect');
      }catch(e){}
      _ws = null;
    }
    _connected = false;
    _stats.connected = false;
    saveStats();
  }

  function scheduleReconnect(){
    if(_reconnectTimer) return;
    if(!_settings.autoReconnect) return;
    
    _reconnectAttempt++;
    _stats.reconnectCount++;
    saveStats();
    
    // Exponential backoff with jitter
    const delay = Math.min(
      RECONNECT_MAX_MS,
      RECONNECT_BASE_MS * Math.pow(2, Math.min(_reconnectAttempt - 1, 5)) + Math.random() * 1000
    );
    
    _reconnectTimer = setTimeout(function(){
      _reconnectTimer = null;
      if(_settings.enabled) connect();
    }, delay);
  }

  function startHeartbeat(){
    stopHeartbeat();
    _heartbeatTimer = setInterval(function(){
      if(_ws && _ws.readyState === WebSocket.OPEN){
        try{
          _ws.send(JSON.stringify({ type: 'heartbeat', timestamp: Date.now() }));
        }catch(e){}
      }
    }, HEARTBEAT_INTERVAL_MS);
  }

  function stopHeartbeat(){
    if(_heartbeatTimer){
      clearInterval(_heartbeatTimer);
      _heartbeatTimer = null;
    }
  }

  /* ---------- Message Handling ---------- */
  function handleMessage(msg){
    if(!msg || !msg.type) return;
    
    _stats.messagesReceived++;
    _lastMessage = msg;
    _lastMessageAt = Date.now();

    if(msg.type === 'sensing_update'){
      handleSensingUpdate(msg);
    }
    // Future: handle other RuView message types (pose_data, analytics_update, etc.)
  }

  function handleSensingUpdate(msg){
    // Update stats from classification
    const cls = msg.classification || {};
    const features = msg.features || {};
    const nodes = msg.nodes || [];
    const primaryNode = nodes[0] || {};

    _stats.source = msg.source || 'unknown';
    _stats.lastPresenceDetected = !!cls.presence;
    _stats.lastMotionLevel = cls.motion_level || 'unknown';
    _stats.lastConfidence = cls.confidence || 0;
    _stats.lastRssi = features.mean_rssi || primaryNode.rssi_dbm || 0;
    _stats.lastNodeId = primaryNode.node_id || null;

    // Extract breathing rate from features if available (unless in privacyMode)
    if(!_settings.privacyMode && _settings.breathingDetection && features.breathing_band_power > 0.01){
      // Breathing rate estimation from band power (0.1-0.5 Hz = 6-30 BPM)
      if(features.dominant_freq_hz && features.dominant_freq_hz >= 0.1 && features.dominant_freq_hz <= 0.5){
        _stats.lastBreathingBpm = Math.round(features.dominant_freq_hz * 60);
      }
    } else {
      _stats.lastBreathingBpm = null;
    }

    // Store data point for visualization
    _dataWindow.push({
      ts: _lastMessageAt,
      presence: cls.presence,
      motion: _settings.privacyMode ? 'discrete' : cls.motion_level,
      confidence: cls.confidence,
      rssi: features.mean_rssi || 0,
      motionPower: _settings.privacyMode ? 0 : (features.motion_band_power || 0),
      breathingPower: _settings.privacyMode ? 0 : (features.breathing_band_power || 0),
      breathingBpm: _stats.lastBreathingBpm,
      signalField: (!_settings.privacyMode && _settings.showSignalField) ? (msg.signal_field || null) : null
    });

    // Trim window
    if(_dataWindow.length > DATA_WINDOW_LIMIT){
      _dataWindow = _dataWindow.slice(-DATA_WINDOW_LIMIT);
    }

    saveStats();

    // Override browser presence if enabled
    if(_settings.overridePresence && typeof window !== 'undefined'){
      applyRuViewPresence(cls);
    }

    // Throttled UI update (~1fps — dashboard data doesn't need faster refresh)
    // FIXED (Build 32 perf): Was 250ms/4fps, reduced to 1000ms/1fps.
    if(!handleSensingUpdate._throttle || Date.now() - handleSensingUpdate._throttle > 1000){
      handleSensingUpdate._throttle = Date.now();
      window.renderRuViewPage?.();
      window.renderPresenceCard?.();
    }
  }

  /* ---------- Presence Integration ---------- */
  function applyRuViewPresence(cls){
    // Feed RuView hardware presence into the Build 31 presence module
    if(!cls || typeof cls.presence !== 'boolean') return;
    
    try{
      // If RuView says someone is present, reset the idle timer
      if(cls.presence && typeof window !== 'undefined'){
        // Simulate user input to keep presence module happy
        const state = typeof presenceState === 'function' ? presenceState() : null;
        if(state && state.status !== 'present'){
          // Directly update the presence module's last input time
          // This is a controlled integration point, not a hack
          document.dispatchEvent(new Event('ruview-presence-detected', {
            detail: { source: 'ruview', confidence: cls.confidence, motion: cls.motion_level }
          }));
        }
      }
    }catch(e){}
  }

  function onRuViewConnected(){
    // Listen for ruview-presence-detected events in the presence module
    if(!_listenersAttached){
      _listenersAttached = true;
      document.addEventListener('ruview-presence-detected', function(e){
        // The Build 31 presence module should pick up this custom event
        // and treat it as user activity
        try{
          if(typeof window._ruviewPresencePing === 'function'){
            window._ruviewPresencePing(e.detail || {});
          }
        }catch(e){}
      });
    }
  }

  function onRuViewDisconnected(){
    // Nothing special needed — presence module falls back to browser detection
  }

  /* ---------- Public API ---------- */
  function initRuView(){
    if(_initialized) return;
    _initialized = true;
    loadSettings();
    loadStats();
    if(_settings.enabled) connect();
  }

  function connectRuView(){
    loadSettings();
    _settings.enabled = true;
    saveSettings(_settings);
    connect();
  }

  function disconnectRuView(){
    _settings.enabled = false;
    saveSettings(_settings);
    disconnect();
  }

  function ruviewIsConnected(){
    return _connected && _ws && _ws.readyState === WebSocket.OPEN;
  }

  function ruviewStats(){
    return Object.assign({}, _stats, {
      dataPoints: _dataWindow.length,
      lastMessageAge: _lastMessageAt ? Date.now() - _lastMessageAt : null,
      lastMessage: _lastMessage
    });
  }

  function ruviewDataWindow(limit){
    return _dataWindow.slice(-(limit || DATA_WINDOW_LIMIT));
  }

  function ruviewLatestReading(){
    if(!_dataWindow.length) return null;
    return _dataWindow[_dataWindow.length - 1];
  }

  function ruviewContextForAI(){
    if(!_settings.enabled || !_connected){
      return 'RUVIEW BRIDGE: disabled or not connected. Using browser-only presence.';
    }
    const reading = ruviewLatestReading();
    if(!reading) return 'RUVIEW BRIDGE: connected, awaiting first sensing update.';
    
    const motion = reading.motion || 'unknown';
    const conf = (reading.confidence * 100).toFixed(0);
    const breath = reading.breathingBpm ? reading.breathingBpm + ' BPM' : 'n/a';
    const rssi = reading.rssi ? reading.rssi.toFixed(1) + ' dBm' : 'n/a';
    const age = _lastMessageAt ? Math.round((Date.now() - _lastMessageAt) / 1000) : '?';
    
    return `RUVIEW HARDWARE PRESENCE: ${reading.presence ? 'DETECTED' : 'NOT DETECTED'}
WiFi sensing via ${_stats.source || 'unknown'} source
Motion level: ${motion} (${conf}% confidence)
Breathing rate: ${breath}
Signal strength: ${rssi}
Last update: ${age}s ago
Data points in window: ${_dataWindow.length}

Rules: This is hardware-backed presence detection from WiFi CSI sensing (ESP32). It works through walls and does not require cameras. If presence is detected but no browser input, the user may be reading, watching, or away from keyboard. If no hardware presence detected and no browser input, the user is likely away from desk.`;
  }

  function ruviewSaveSettings(s){
    const wasEnabled = _settings.enabled;
    saveSettings(s);
    if(_settings.enabled && !wasEnabled){
      connect();
    } else if(!_settings.enabled && wasEnabled){
      disconnect();
    }
    window.renderRuViewPage?.();
  }

  function ruviewSyncUI(){
    const set = (id, val) => { const el = document.getElementById(id); if(el){ if(el.type === 'checkbox') el.checked = !!val; else el.value = val; }};
    set('ruviewUrl', _settings.url);
    set('ruviewAutoReconnect', _settings.autoReconnect);
    set('ruviewOverridePresence', _settings.overridePresence);
    set('ruviewShowSignalField', _settings.showSignalField);
    set('ruviewBreothingDetection', _settings.breathingDetection);
    set('ruviewMotionSensitivity', _settings.motionSensitivity);
  }

  function ruviewReadUI(){
    const val = id => { const el = document.getElementById(id); return el ? el.value : null; };
    const chk = id => { const el = document.getElementById(id); return el ? !!el.checked : false; };
    const s = Object.assign({}, _settings);
    s.url = val('ruviewUrl') || 'ws://127.0.0.1:3001/ws/sensing';
    s.autoReconnect = chk('ruviewAutoReconnect');
    s.overridePresence = chk('ruviewOverridePresence');
    s.showSignalField = chk('ruviewShowSignalField');
    s.breathingDetection = chk('ruviewBreothingDetection');
    s.motionSensitivity = val('ruviewMotionSensitivity') || 'normal';
    ruviewSaveSettings(s);
    if(typeof toast === 'function') toast('RuView settings saved', 'success');
  }

  /* ---------- Signal Field Visualization (Build 42 Dot-Matrix Radar) ---------- */
  function renderSignalField(container, data){
    if(!container) return;
    const field = data?.signalField;
    const gridValues = field?.values || [];
    const gridSize = (field?.grid_size && field?.grid_size[0]) || 20;
    
    // Build or update the grid container with dot-matrix radar sweep overlay
    let gridWrap = container.querySelector('.ruview-signal-grid');
    let cells = gridWrap ? gridWrap.querySelectorAll('.ruview-dot') : null;
    
    if(!gridWrap || !cells || cells.length !== (gridValues.length || 400)){
      const totalCells = gridValues.length || 400;
      let html = '<div class="ruview-signal-grid" style="position:relative;display:grid;grid-template-columns:repeat('+gridSize+',1fr);gap:2px;width:100%;aspect-ratio:1;border-radius:12px;overflow:hidden;background:var(--color-canvas, #0b0c10);padding:8px;border:1px solid var(--line);box-shadow:0 0 0 1px rgba(255,255,255,0.05), inset 0 0 20px rgba(0,0,0,0.8);">';
      for(let i = 0; i < totalCells; i++){
        html += '<div class="ruview-dot" style="width:100%;aspect-ratio:1;border-radius:50%;background:rgba(255,255,255,0.04);transition:background 0.3s, opacity 0.3s;"></div>';
      }
      html += '<div class="ruview-radar-rings"></div><div class="ruview-radar-sweep"></div></div>';
      container.innerHTML = html;
      gridWrap = container.querySelector('.ruview-signal-grid');
      cells = gridWrap ? gridWrap.querySelectorAll('.ruview-dot') : null;
      if(!cells) return;
    }
    
    // Update colors in-place — no DOM re-creation, high performance style mutation
    if(gridValues.length){
      for(let i = 0; i < gridValues.length && i < cells.length; i++){
        const v = Math.max(0, Math.min(1, gridValues[i] || 0));
        const r = v < 0.5 ? Math.round(v * 2 * 100) : 255;
        const g = v < 0.5 ? Math.round(100 + v * 2 * 155) : Math.round(255 - (v - 0.5) * 2 * 155);
        const b = v < 0.3 ? Math.round((0.3 - v) / 0.3 * 200) : 0;
        cells[i].style.background = 'rgb('+r+','+g+','+b+')';
        cells[i].style.opacity = (0.2 + v * 0.8);
      }
    }
  }

  /* ---------- Motion History Chart ---------- */
  function renderMotionChart(container){
    if(!container || !_dataWindow.length) return;
    
    const width = 400;
    const height = 80;
    const data = _dataWindow.slice(-60); // Last ~30 seconds
    
    let svg = '<svg viewBox="0 0 '+width+' '+height+'" style="width:100%;height:auto;display:block" xmlns="http://www.w3.org/2000/svg">';
    
    // Background
    svg += '<rect width="'+width+'" height="'+height+'" fill="transparent"/>';
    
    // Draw confidence bars
    const barWidth = Math.max(1, (width / data.length) - 1);
    data.forEach((d, i) => {
      const x = i * (barWidth + 1);
      const h = Math.max(2, (d.confidence || 0) * height * 0.8);
      const color = d.presence 
        ? (d.motion === 'active' ? '#ff6b6b' : d.motion === 'moving' ? '#ffb454' : d.motion === 'seated' ? '#3ecf8e' : '#6c8cff')
        : '#333';
      svg += '<rect x="'+x+'" y="'+(height - h)+'" width="'+barWidth+'" height="'+h+'" fill="'+color+'" rx="1" opacity="0.8"/>';
    });
    
    // Draw breathing rate line if available
    const breathPoints = data.filter(d => d.breathingBpm);
    if(breathPoints.length > 1){
      let path = '';
      breathPoints.forEach((d, i) => {
        const x = (data.indexOf(d)) * (barWidth + 1) + barWidth / 2;
        const y = height - ((d.breathingBpm - 6) / 24) * height * 0.8; // 6-30 BPM range
        path += (i === 0 ? 'M' : 'L') + x + ',' + Math.max(0, Math.min(height, y));
      });
      svg += '<path d="'+path+'" fill="none" stroke="#9d7bff" stroke-width="1.5" opacity="0.7"/>';
    }
    
    // Axis labels
    svg += '<text x="2" y="12" fill="var(--mut)" font-size="9" font-family="monospace">motion</text>';
    svg += '<text x="2" y="'+(height-2)+'" fill="var(--mut)" font-size="9" font-family="monospace">quiet</text>';
    
    svg += '</svg>';
    container.innerHTML = svg;
  }

  /* ---------- Expose Globals ---------- */
  window.initRuView = initRuView;
  window.connectRuView = connectRuView;
  window.disconnectRuView = disconnectRuView;
  window.ruviewIsConnected = ruviewIsConnected;
  window.ruviewStats = ruviewStats;
  window.ruviewDataWindow = ruviewDataWindow;
  window.ruviewLatestReading = ruviewLatestReading;
  window.ruviewContextForAI = ruviewContextForAI;
  window.ruviewSaveSettings = ruviewSaveSettings;
  window.ruviewSyncUI = ruviewSyncUI;
  window.ruviewReadUI = ruviewReadUI;
  window.renderSignalField = renderSignalField;
  window.renderMotionChart = renderMotionChart;

})();
