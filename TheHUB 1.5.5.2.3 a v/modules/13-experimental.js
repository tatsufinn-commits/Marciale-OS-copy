/* ===========================================================
   CATEGORY C FOUNDATION — Experimental Systems Registry
   ===========================================================
   Build C0 keeps Category C optional and fail-safe. Companion,
   Chess, Presence, and RuView should read this registry before
   rendering UI or running background behavior.
   =========================================================== */
const EXPERIMENTAL_KEY = 'hub.experimental.v1';
const EXPERIMENTAL_DEFAULT = {
  companion: { enabled:false, showOnToday:true, mode:'shell' },
  chess: { enabled:false, showTab:true, activityRewards:false },
  presence: { enabled:false, showOnToday:false, source:'manual' },
  ruview: { enabled:false, url:'ws://127.0.0.1:3001/ws/sensing', reconnect:true }
};
let EXPERIMENTAL_INIT_DONE = false;

function normalizeExperimentalSettings(settings={}){
  const s = settings && typeof settings === 'object' ? settings : {};
  return {
    companion: Object.assign({}, EXPERIMENTAL_DEFAULT.companion, s.companion||{}),
    chess: Object.assign({}, EXPERIMENTAL_DEFAULT.chess, s.chess||{}),
    presence: Object.assign({}, EXPERIMENTAL_DEFAULT.presence, s.presence||{}),
    ruview: Object.assign({}, EXPERIMENTAL_DEFAULT.ruview, s.ruview||{})
  };
}
function experimentalSettings(){ return normalizeExperimentalSettings(LS.get(EXPERIMENTAL_KEY, EXPERIMENTAL_DEFAULT)); }
function saveExperimentalSettings(settings){
  const next=normalizeExperimentalSettings(settings);
  LS.set(EXPERIMENTAL_KEY, next);
  syncExperimentalControls?.(next);
  updateExperimentalStatus?.(next);
  return next;
}
function experimentalEnabled(key){
  const s=experimentalSettings();
  return !!(s[key] && s[key].enabled);
}
function safeExperimentalRun(name, fn){
  try{
    if(typeof fn !== 'function') return null;
    return fn();
  }catch(e){
    logHubError?.('experimental:'+String(name||'unknown'), e);
    try{ toast(`${name || 'Experimental system'} failed safely`, 'warn'); }catch(_){}
    return null;
  }
}
function updateExperimentalStatus(settings=experimentalSettings()){
  const el=$('#experimentalStatus');
  if(!el) return;
  const enabled=[];
  if(settings.companion.enabled) enabled.push('Companion');
  if(settings.chess.enabled) enabled.push('Chess');
  if(settings.presence.enabled) enabled.push('Presence');
  if(settings.ruview.enabled) enabled.push('RuView');
  el.innerHTML = enabled.length
    ? `<b>${enabled.length}</b> experimental system${enabled.length===1?'':'s'} enabled: ${esc(enabled.join(', '))}`
    : '<b>All experimental systems disabled.</b><br>Core Hub runs without Category C modules.';
}
function syncExperimentalControls(settings=experimentalSettings()){
  if($('#experimentalCompanionEnabled')) $('#experimentalCompanionEnabled').checked=!!settings.companion.enabled;
  if($('#experimentalCompanionToday')) $('#experimentalCompanionToday').checked=settings.companion.showOnToday!==false;
  if($('#experimentalChessEnabled')) $('#experimentalChessEnabled').checked=!!settings.chess.enabled;
  if($('#experimentalChessRewards')) $('#experimentalChessRewards').checked=!!settings.chess.activityRewards;
  if($('#experimentalPresenceEnabled')) $('#experimentalPresenceEnabled').checked=!!settings.presence.enabled;
  if($('#experimentalPresenceToday')) $('#experimentalPresenceToday').checked=!!settings.presence.showOnToday;
  if($('#experimentalRuViewEnabled')) $('#experimentalRuViewEnabled').checked=!!settings.ruview.enabled;
  if($('#experimentalRuViewUrl')) $('#experimentalRuViewUrl').value=settings.ruview.url||EXPERIMENTAL_DEFAULT.ruview.url;
  updateExperimentalStatus(settings);
  syncCompanionControls?.();
}
function readExperimentalControls(){
  const s=experimentalSettings();
  s.companion.enabled=!!$('#experimentalCompanionEnabled')?.checked;
  s.companion.showOnToday=$('#experimentalCompanionToday') ? !!$('#experimentalCompanionToday').checked : s.companion.showOnToday;
  s.chess.enabled=!!$('#experimentalChessEnabled')?.checked;
  s.chess.activityRewards=!!$('#experimentalChessRewards')?.checked;
  s.presence.enabled=!!$('#experimentalPresenceEnabled')?.checked;
  s.presence.showOnToday=!!$('#experimentalPresenceToday')?.checked;
  s.ruview.enabled=!!$('#experimentalRuViewEnabled')?.checked;
  s.ruview.url=String($('#experimentalRuViewUrl')?.value||EXPERIMENTAL_DEFAULT.ruview.url).trim() || EXPERIMENTAL_DEFAULT.ruview.url;
  saveExperimentalSettings(s);
  renderExperimentalSystems?.();
  toast('Experimental settings saved','success');
}
function renderExperimentalSystems(){
  const s=experimentalSettings();
  safeExperimentalRun('companion-init',()=>{ if(s.companion.enabled) window.initCompanion?.(); else window.renderCompanionCard?.(); });
  safeExperimentalRun('chess-init',()=>{ window.initChess?.(); });
  safeExperimentalRun('presence-init',()=>{ if(s.presence.enabled) window.initPresence?.(); });
  safeExperimentalRun('ruview-init',()=>{ if(s.ruview.enabled) window.connectRuView?.(); else window.disconnectRuView?.(); });
  safeExperimentalRun('automation-init',()=>{ if(s.presence.enabled) window.initPresenceAutomation?.(); });
}
function initExperimentalSystems(){
  const s=saveExperimentalSettings(experimentalSettings());
  syncExperimentalControls(s);
  if(!EXPERIMENTAL_INIT_DONE){
    ['#experimentalCompanionEnabled','#experimentalCompanionToday','#experimentalChessEnabled','#experimentalChessRewards','#experimentalPresenceEnabled','#experimentalPresenceToday','#experimentalRuViewEnabled'].forEach(sel=>$(sel)?.addEventListener('change', readExperimentalControls));
    $('#experimentalRuViewUrl')?.addEventListener('change', readExperimentalControls);
    $('#experimentalReset')?.addEventListener('click',()=>{
      if(!confirm('Reset all experimental Category C settings?')) return;
      saveExperimentalSettings(EXPERIMENTAL_DEFAULT);
      renderExperimentalSystems();
      toast('Experimental settings reset','warn');
    });
    EXPERIMENTAL_INIT_DONE=true;
  }
  renderExperimentalSystems();
}

window.experimentalSettings=experimentalSettings;
window.saveExperimentalSettings=saveExperimentalSettings;
window.experimentalEnabled=experimentalEnabled;
window.safeExperimentalRun=safeExperimentalRun;
window.syncExperimentalControls=syncExperimentalControls;
window.readExperimentalControls=readExperimentalControls;
window.renderExperimentalSystems=renderExperimentalSystems;
window.initExperimentalSystems=initExperimentalSystems;
