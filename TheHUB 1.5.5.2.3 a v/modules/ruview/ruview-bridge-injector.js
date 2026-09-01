/* ===========================================================
   BUILD 33.3 — RuView Bridge Injector
   ===========================================================
   This script is injected into the RuView iframe context after
   load. It intercepts RuView's internal WebSocket messages and
   forwards structured events to the TheHUB parent via postMessage.
   
   Protocol: All messages use the 'ruview:' prefix.
   Validation: Parent validates origin before processing.
   
   Usage: This file is meant to be injected via:
     iframe.contentWindow.eval(bridgeInjectorCode)
   or loaded as a <script> tag inside the iframe document.
   =========================================================== */
(function(){
  'use strict';
  
  // Protocol version for handshake
  const BRIDGE_VERSION = '1.0';
  const HEARTBEAT_INTERVAL = 3000;
  
  // Event type constants (must match parent's RUVIEW_EVENTS)
  const EVENTS = {
    PRESENCE_UPDATE: 'ruview:presence',
    VITALS_UPDATE: 'ruview:vitals',
    SIGNAL_UPDATE: 'ruview:signal',
    STATUS_CHANGE: 'ruview:status',
    ERROR: 'ruview:error',
    READY: 'ruview:ready',
    BRIDGE_INIT: 'ruview:bridge_init',
    HEALTH_PING: 'ruview:health_ping'
  };
  
  // Send a structured event to the parent
  function sendToParent(type, payload){
    try{
      window.parent.postMessage({
        type: type,
        payload: payload || {},
        source: 'ruview-bridge',
        version: BRIDGE_VERSION,
        timestamp: Date.now()
      }, '*');
    }catch(e){
      console.warn('[RuView Bridge] Failed to send to parent:', e);
    }
  }
  
  // Announce bridge presence
  sendToParent(EVENTS.BRIDGE_INIT, { version: BRIDGE_VERSION });
  
  // Heartbeat to keep connection alive
  setInterval(function(){
    sendToParent(EVENTS.HEALTH_PING, { ts: Date.now() });
  }, HEARTBEAT_INTERVAL);
  
  // ── Intercept WebSocket messages ────────────────────────────
  // Override WebSocket.prototype.send to capture outgoing messages,
  // and intercept the onmessage handler to capture incoming data.
  
  const OriginalWebSocket = window.WebSocket;
  if(OriginalWebSocket){
    const origOnMessage = Object.getOwnPropertyDescriptor(
      OriginalWebSocket.prototype, 'onmessage'
    );
    
    // Patch the onmessage setter to intercept incoming WebSocket data
    if(origOnMessage && origOnMessage.set){
      const origSet = origOnMessage.set;
      Object.defineProperty(OriginalWebSocket.prototype, 'onmessage', {
        set: function(fn){
          const wrappedFn = function(event){
            try{
              const data = typeof event.data === 'string' 
                ? JSON.parse(event.data) 
                : event.data;
              classifyAndForward(data);
            }catch(e){
              // Non-JSON WebSocket data — ignore silently
            }
            if(typeof fn === 'function') fn.call(this, event);
          };
          origSet.call(this, wrappedFn);
        },
        get: function(){
          return origOnMessage.get ? origOnMessage.get.call(this) : undefined;
        },
        configurable: true,
        enumerable: true
      });
    }
    
    // Also patch addEventListener for 'message' events
    const origAddEventListener = OriginalWebSocket.prototype.addEventListener;
    OriginalWebSocket.prototype.addEventListener = function(type, fn, opts){
      if(type === 'message' && typeof fn === 'function'){
        const wrappedFn = function(event){
          try{
            const data = typeof event.data === 'string'
              ? JSON.parse(event.data)
              : event.data;
            classifyAndForward(data);
          }catch(e){}
          fn.call(this, event);
        };
        return origAddEventListener.call(this, type, wrappedFn, opts);
      }
      return origAddEventListener.call(this, type, fn, opts);
    };
  }
  
  // ── Classify and forward ────────────────────────────────────
  function classifyAndForward(data){
    if(!data || typeof data !== 'object') return;
    
    // RuView sensing_update messages
    if(data.type === 'sensing_update' || data.classification){
      const cls = data.classification || {};
      const features = data.features || {};
      const nodes = data.nodes || [];
      const primaryNode = nodes[0] || {};
      
      // Presence event
      sendToParent(EVENTS.PRESENCE_UPDATE, {
        present: !!cls.presence,
        confidence: cls.confidence || 0,
        motionLevel: cls.motion_level || 'unknown',
        source: data.source || 'unknown',
        nodeId: primaryNode.node_id || null,
        rssi: features.mean_rssi || primaryNode.rssi_dbm || 0,
        timestamp: data.timestamp || Date.now()
      });
      
      // Vitals event (if breathing data available)
      if(features.breathing_band_power > 0.01 && features.dominant_freq_hz){
        const breathBpm = Math.round(features.dominant_freq_hz * 60);
        if(breathBpm >= 6 && breathBpm <= 30){
          sendToParent(EVENTS.VITALS_UPDATE, {
            breathingBpm: breathBpm,
            breathingBandPower: features.breathing_band_power || 0,
            motionBandPower: features.motion_band_power || 0,
            timestamp: data.timestamp || Date.now()
          });
        }
      }
      
      // Signal field event
      if(data.signal_field && data.signal_field.values){
        sendToParent(EVENTS.SIGNAL_UPDATE, {
          gridValues: data.signal_field.values,
          gridSize: data.signal_field.grid_size || [20, 1, 20],
          timestamp: data.timestamp || Date.now()
        });
      }
      
      return;
    }
    
    // Status changes
    if(data.type === 'status' || data.status){
      sendToParent(EVENTS.STATUS_CHANGE, {
        state: data.status || data.state || 'unknown',
        mode: data.mode || '',
        signalCount: data.signal_count || 0,
        timestamp: data.timestamp || Date.now()
      });
      return;
    }
    
    // Errors
    if(data.type === 'error' || data.error){
      sendToParent(EVENTS.ERROR, {
        message: data.error || data.message || 'Unknown error',
        code: data.code || '',
        timestamp: data.timestamp || Date.now()
      });
      return;
    }
  }
  
  // ── Listen for parent commands ──────────────────────────────
  window.addEventListener('message', function(event){
    // SECURITY 2026-08-15 (@joint fault audit, SEV-2): data.from === 'TheHUB' is a
    // SELF-DECLARED field any frame can forge. It authenticates nothing. The origin
    // and the source handle are the only unforgeable facts about a postMessage.
    if(event.origin && event.origin !== 'null' && event.origin !== window.location.origin) return;
    if(event.source && event.source !== window.parent) return;
    const data = event.data;
    if(!data || typeof data !== 'object') return;
    if(typeof data.from !== 'string' || data.from !== 'TheHUB') return;
    
    switch(data.type){
      case 'ruview:set_performance_mode':
        // Performance mode change — could throttle rendering
        console.log('[RuView Bridge] Performance mode:', data.value);
        break;
      case 'ruview:set_reduced_motion':
        console.log('[RuView Bridge] Reduced motion:', data.value);
        break;
      case 'ruview:set_animation_paused':
        console.log('[RuView Bridge] Animation paused:', data.value);
        break;
      case 'ruview:request_state':
        // Respond with current state
        sendToParent('ruview:state_response', {
          bridgeVersion: BRIDGE_VERSION,
          wsConnected: !!OriginalWebSocket,
          timestamp: Date.now()
        });
        break;
      case 'ruview:command':
        console.log('[RuView Bridge] Command received:', data.command, data.args);
        break;
    }
  });
  
  // Signal ready
  sendToParent(EVENTS.READY, { version: BRIDGE_VERSION });
  
  console.log('[RuView Bridge] Injector active (v' + BRIDGE_VERSION + ')');
})();
