/* ===========================================================
   MOMENTUM COMPANION — Build 24 Companion Shell
   ===========================================================
   Optional Category C reward layer. The Companion reads real Hub Activity
   and visualizes momentum; it does not create productivity points.
   =========================================================== */
const COMPANION_KEY='hub.companion.v1';
const COMPANION_EVENTS_KEY='hub.companion.events.v1';
const COMPANION_HERO_KEY='hub.companion.hero.v1';
const COMPANION_EVENT_LIMIT=120;
const COMPANION_FRAME_SRC='companion/index.html';
const COMPANION_MINI_SRC='companion-mini/index.html';
const COMPANION_REWARD_VERSION=2;
let COMPANION_FRAME_READY=false;
let COMPANION_FRAME_STATUS='idle';
let COMPANION_FRAME_QUEUE=[];
let COMPANION_MESSAGE_LISTENER=false;

function companionHeroData(){
  return LS.get(COMPANION_HERO_KEY, {
    hero: { name:'Rudeus Greyrat', level:1, hp:100, maxHp:100 },
    equipment: { weapon:null, armor:null, accessory:null },
    gold: 0,
    zone: 'fittoa',
    wave: 1,
    roster: []
  });
}
function saveCompanionHeroData(data){
  const merged = Object.assign({}, companionHeroData(), data||{});
  LS.set(COMPANION_HERO_KEY, merged);
  return merged;
}
window.companionHeroData = companionHeroData;
window.saveCompanionHeroData = saveCompanionHeroData;
const COMPANION_XP_TYPES=['task_done','focus_session_completed','note_created','note_edited','event_added','bookmark_added','ai_action_approved','chess_match_completed','chess_match_won'];
const COMPANION_DEFAULT={
  name:'Marciale Sprite',
  avatar:'orb',
  lastMessage:'Waiting for your first real action.',
  lastEventAt:0,
  lastCelebration:'',
  reducedMotion:false,
  lastEventId:'',
  useIframe:true,
  frameSrc:COMPANION_FRAME_SRC,
  miniFrameSrc:COMPANION_MINI_SRC,
  frameStatus:'idle',
  pauseWhenHidden:true,
  showInlineGame:true,
  reduceWithHubPerformance:true,
  sendTypes:{task_done:true,focus_session_completed:true,note_created:true,note_edited:true,intake_logged:true,event_added:true,bookmark_added:true,ai_action_approved:true,chess_match_completed:true,chess_match_won:true}
};
function companionSettings(){
  const raw=LS.get(COMPANION_KEY, {});
  return Object.assign({}, COMPANION_DEFAULT, raw||{}, {sendTypes:Object.assign({}, COMPANION_DEFAULT.sendTypes, raw?.sendTypes||{})});
}
function saveCompanionSettings(settings){ const next=Object.assign({}, COMPANION_DEFAULT, settings||{}, {sendTypes:Object.assign({}, COMPANION_DEFAULT.sendTypes, settings?.sendTypes||{})}); LS.set(COMPANION_KEY,next); return next; }
function loadCompanionEvents(){
  const arr=LS.get(COMPANION_EVENTS_KEY, []);
  return Array.isArray(arr) ? arr.filter(e=>e&&e.id).slice(-COMPANION_EVENT_LIMIT) : [];
}
function saveCompanionEvents(events){ LS.set(COMPANION_EVENTS_KEY, (Array.isArray(events)?events:[]).slice(-COMPANION_EVENT_LIMIT)); }
function companionReactionForEvent(event){
  const label=String(event?.label||event?.type||'activity').slice(0,180);
  return ({
    task_done:`Good. Real progress logged: ${label}`,
    focus_session_completed:`Deep work registered: ${label}`,
    note_created:`Knowledge captured: ${label}`,
    note_edited:`Knowledge refined: ${label}`,
    event_added:`Future protected: ${label}`,
    bookmark_added:`Resource gathered: ${label}`,
    ai_action_approved:`Co-pilot sync complete: ${label}`,
    chess_match_completed:`Tactical match recorded: ${label}`,
    chess_match_won:`Victory logged on the board: ${label}`
  }[event?.type] || `Momentum registered: ${label}`);
}
function companionRewardForEvent(event){
  const points=Math.max(1, Number(event?.points)||1);
  const label=String(event?.label||event?.type||'Hub activity').slice(0,160);
  const base={version:COMPANION_REWARD_VERSION,category:'momentum',icon:'✨',xp:points*4,gold:0,stamina:0,wisdom:0,strategy:0,chest:'',message:`Momentum rewarded: ${label}.`,idleHero:{xp:{},gp:0,message:`TheHUB momentum rewarded: ${label}.`}};
  const reward=Object.assign({}, base);
  if(event?.type==='task_done') Object.assign(reward,{category:'quest',icon:'⚔️',xp:points*20,gold:points*6,message:`Quest completed: ${label}.`,idleHero:{xp:{attack:points*12,strength:points*8},gp:points*6,message:`Quest completed from TheHUB: ${label}.`}});
  else if(event?.type==='focus_session_completed') Object.assign(reward,{category:'focus',icon:'🎯',xp:points*22,gold:points*3,stamina:points*8,message:`Deep focus empowered the hero: ${label}.`,idleHero:{xp:{agility:points*12,hitpoints:points*8},gp:points*3,message:`Deep focus empowered your hero: ${label}.`}});
  else if(event?.type==='note_created') Object.assign(reward,{category:'wisdom',icon:'📘',xp:points*12,wisdom:points*5,message:`Knowledge discovered: ${label}.`,idleHero:{xp:{magic:points*8,runecrafting:points*4},gp:0,message:`Knowledge discovered from TheHUB: ${label}.`}});
  else if(event?.type==='note_edited') Object.assign(reward,{category:'wisdom',icon:'✍️',xp:points*8,wisdom:points*3,message:`Knowledge refined: ${label}.`,idleHero:{xp:{magic:points*5},gp:0,message:`Knowledge refined from TheHUB: ${label}.`}});
  else if(event?.type==='intake_logged') Object.assign(reward,{category:'stamina',icon:'⚡',xp:points*5,stamina:points*10,message:`Stamina restored: ${label}.`,idleHero:{xp:{hitpoints:points*5},gp:0,message:`Stamina restored from TheHUB: ${label}.`}});
  else if(event?.type==='event_added') Object.assign(reward,{category:'quest-marker',icon:'🗺️',xp:points*10,gold:points*2,message:`Quest marker added: ${label}.`,idleHero:{xp:{atlas:points*8},gp:points*2,message:`A new quest marker appeared: ${label}.`}});
  else if(event?.type==='bookmark_added') Object.assign(reward,{category:'resource',icon:'🔖',xp:points*6,gold:points*2,wisdom:points*2,message:`Resource gathered: ${label}.`,idleHero:{xp:{crafting:points*5},gp:points*2,message:`Resource gathered from TheHUB: ${label}.`}});
  else if(event?.type==='ai_action_approved') Object.assign(reward,{category:'strategy',icon:'🤖',xp:points*12,strategy:points*4,message:`Strategy insight received: ${label}.`,idleHero:{xp:{astrology:points*8},gp:0,message:`Strategy insight received from Marciale: ${label}.`}});
  else if(event?.type==='chess_match_completed') Object.assign(reward,{category:'tactics',icon:'♟️',xp:points*14,gold:points*3,strategy:points*5,message:`Tactical match archived: ${label}.`,idleHero:{xp:{attack:points*6,defence:points*6},gp:points*3,message:`Chess match archived from TheHUB: ${label}.`}});
  else if(event?.type==='chess_match_won') Object.assign(reward,{category:'victory',icon:'🏆',xp:points*20,gold:points*6,strategy:points*8,message:`Victory secured: ${label}.`,idleHero:{xp:{attack:points*8,strength:points*6,defence:points*6},gp:points*6,message:`Chess victory secured from TheHUB: ${label}.`}});
  return reward;
}
function setCompanionFrameStatus(status){
  COMPANION_FRAME_STATUS=String(status||'idle');
  const targets=$$('[data-companion-status], #companionFrameStatus');
  targets.forEach(el=>{ if(el) el.textContent='Idle Hero: '+COMPANION_FRAME_STATUS; });
  const settings=companionSettings();
  settings.frameStatus=COMPANION_FRAME_STATUS;
  saveCompanionSettings(settings);
}
function companionFrames(){ return Array.from(document.querySelectorAll('.companion-game-frame')).filter(f=>f&&f.contentWindow); }
function companionMiniFrames(){ return Array.from(document.querySelectorAll('.companion-mini-frame')).filter(f=>f&&f.contentWindow); }
function companionFrame(){ return document.querySelector('#page-idlehero.active .companion-game-frame') || document.querySelector('#companionFullOverlay.show .companion-game-frame') || companionFrames()[0] || null; }
function postCompanionMessage(message){
  const frames=companionFrames();
  if(!frames.length) return false;
  let sent=false;
  frames.forEach(frame=>{
    try{ frame.contentWindow.postMessage(Object.assign({from:'TheHUB'}, message||{}), '*'); sent=true; }
    catch(e){ logHubError?.('companion-postMessage', e); }
  });
  return sent;
}
function postCompanionMiniMessage(message){
  const frames=companionMiniFrames();
  if(!frames.length) return false;
  let sent=false;
  frames.forEach(frame=>{
    try{ frame.contentWindow.postMessage(Object.assign({from:'TheHUB'}, message||{}), '*'); sent=true; }
    catch(e){ logHubError?.('companion-mini-postMessage', e); }
  });
  return sent;
}
function postCompanionMiniSnapshot(extra={}){ return postCompanionMiniMessage(Object.assign({type:'hub.companion.snapshot',snapshot:companionStateSnapshot()}, extra||{})); }
function companionEventTypeEnabled(type){
  const settings=companionSettings();
  const send=settings.sendTypes || COMPANION_DEFAULT.sendTypes;
  return send[type] !== false;
}
function postCompanionEventToFrame(companionEvent){
  if(!companionEvent) return false;
  if(!COMPANION_FRAME_READY){
    if(!COMPANION_FRAME_QUEUE.some(e=>e.id===companionEvent.id)) COMPANION_FRAME_QUEUE.push(companionEvent);
    return false;
  }
  const sent=postCompanionMessage({type:'hub.activity',version:1,event:companionEvent});
  if(!sent && !COMPANION_FRAME_QUEUE.some(e=>e.id===companionEvent.id)) COMPANION_FRAME_QUEUE.push(companionEvent);
  return sent;
}
function flushCompanionFrameQueue(){
  if(!COMPANION_FRAME_QUEUE.length) return 0;
  const q=COMPANION_FRAME_QUEUE.slice();
  COMPANION_FRAME_QUEUE=[];
  let sent=0;
  q.forEach(ev=>{ if(postCompanionEventToFrame(ev)) sent++; });
  return sent;
}
function markCompanionEventAck(sourceActivityId, ack={}){
  if(!sourceActivityId && !ack.eventId) return false;
  const events=loadCompanionEvents();
  const ev=events.find(e=>(sourceActivityId && e.sourceActivityId===sourceActivityId) || (ack.eventId && e.id===ack.eventId));
  if(!ev) return false;
  ev.acknowledgedByFrame=true;
  ev.deliveryStatus='acknowledged';
  ev.ackAt=new Date().toISOString();
  ev.ackReward=ack.reward||null;
  ev.reward=ev.reward||ack.reward||null;
  ev.duplicate=!!ack.duplicate;
  saveCompanionEvents(events);
  renderCompanionCard?.();
  return true;
}
function handleCompanionFrameMessage(event){
  const frames=companionFrames().concat(companionMiniFrames());
  // VSS-00 F4 (2026-08-15): this read `if(frames.length && !frames.some(...))`.
  // The `frames.length &&` short-circuit meant that when NO frame was mounted the
  // guard did not weaken -- it VANISHED, and any stray postMessage was accepted.
  // A guard that disables itself in the state it is most needed is not a guard.
  // Fail CLOSED: no mounted frame => no trusted sender => reject.
  if(!frames.length) return;
  if(!frames.some(frame=>event.source===frame.contentWindow)) return;
  // VSS-00 F2: verify origin, not just the source handle (mirrors MINI_ALLOWED_ORIGINS).
  const COMPANION_ALLOWED_ORIGINS=[(typeof window!=='undefined'&&window.location&&window.location.origin)||null,'null'].filter(Boolean);
  if(event.origin && !COMPANION_ALLOWED_ORIGINS.includes(event.origin)) return;
  const data=event.data||{};
  if(data.type==='idlehero.ready' || data.type==='mtgame.ready'){
    COMPANION_FRAME_READY=true;
    setCompanionFrameStatus('loaded');
    flushCompanionFrameQueue();
  }
  if(data.type==='idlehero.ack' || data.type==='mtgame.ack'){
    markCompanionEventAck(String(data.sourceActivityId||''), data);
    setCompanionFrameStatus('reward acknowledged');
  }
  if(data.type==='idlehero.snapshot' || data.type==='mtgame.snapshot'){
    const payload = data.payload || data.snapshot || data;
    if(payload && typeof payload === 'object'){
      saveCompanionHeroData(payload);
      renderCompanionCard?.();
    }
  }
  if(data.type==='idlehero.levelup' || data.type==='mtgame.levelup'){
    const lvl = data.payload?.newLevel || data.newLevel || 2;
    if(typeof toast === 'function') toast(`🎉 Hero Leveled Up to Lv ${lvl}!`, 'success');
    renderCompanionCard?.();
  }
  if(data.type==='idlehero.item_equipped' || data.type==='mtgame.item_equipped'){
    const item = data.payload?.item || data.item || data;
    if(typeof toast === 'function') toast(`🛡️ Hero equipped: ${item.name||item.slot||'Gear'}`, 'info');
    renderCompanionCard?.();
  }
  if(data.type==='idlehero.offline_rewards' || data.type==='mtgame.offline_rewards'){
    const off = data.payload || data.rewards || data;
    if(off && (off.gold || off.xp) && typeof toast === 'function'){
      toast(`🎮 Companion gathered +${off.gold||0}G & +${off.xp||0}XP while away!`, 'success');
    }
  }
  if(data.type==='idlehero.status') setCompanionFrameStatus(data.status||'status');
  if(data.type==='companion-mini.ready') postCompanionMiniSnapshot();
  if(data.type==='hub.companion.openFull') activatePage?.('idlehero');
}
function ensureCompanionFrameListener(){
  if(COMPANION_MESSAGE_LISTENER) return;
  window.addEventListener('message', handleCompanionFrameMessage);
  document.addEventListener('visibilitychange',()=>{
    const settings=companionSettings();
    if(!settings.pauseWhenHidden) return;
    postCompanionMessage({type:document.hidden?'hub.companion.pause':'hub.companion.resume'});
    if(document.hidden) setCompanionFrameStatus('paused');
  });
  COMPANION_MESSAGE_LISTENER=true;
}
function emitCompanionEvent(activityEvent){
  try{
    if(!activityEvent || !COMPANION_XP_TYPES.includes(activityEvent.type)) return false;
    const experimental = typeof experimentalSettings==='function' ? experimentalSettings() : {companion:{enabled:false}};
    if(!experimental.companion?.enabled) return false;
    if(!companionEventTypeEnabled(activityEvent.type)) return false;
    const reaction={
      id:uid(),
      sourceActivityId:String(activityEvent.id||''),
      type:String(activityEvent.type),
      label:String(activityEvent.label||activityEvent.type).slice(0,220),
      points:Number(activityEvent.points)||0,
      ts:Date.now(),
      at:new Date().toISOString(),
      message:companionReactionForEvent(activityEvent),
      reward:companionRewardForEvent(activityEvent),
      rewardVersion:COMPANION_REWARD_VERSION,
      deliveryStatus:'created',
      deliveredToFrame:false,
      acknowledgedByFrame:false
    };
    const events=loadCompanionEvents();
    if(reaction.sourceActivityId && events.some(e=>e.sourceActivityId===reaction.sourceActivityId)) return false;
    events.push(reaction);
    saveCompanionEvents(events);
    const settings=companionSettings();
    settings.lastMessage=reaction.message;
    settings.lastEventAt=reaction.ts;
    settings.lastEventId=reaction.sourceActivityId;
    saveCompanionSettings(settings);
    renderCompanionCard?.();
    reaction.deliveredToFrame=postCompanionEventToFrame(reaction);
    if(reaction.deliveredToFrame){
      const updated=loadCompanionEvents();
      const ev=updated.find(e=>e.id===reaction.id);
      if(ev){ ev.deliveredToFrame=true; ev.deliveryStatus='delivered'; ev.deliveredAt=new Date().toISOString(); saveCompanionEvents(updated); }
      setCompanionFrameStatus('event sent');
    } else {
      const updated=loadCompanionEvents();
      const ev=updated.find(e=>e.id===reaction.id);
      if(ev){ ev.deliveryStatus='queued'; saveCompanionEvents(updated); }
      setCompanionFrameStatus('event queued');
    }
    postCompanionMiniMessage({type:'hub.companion.event',event:reaction,snapshot:companionStateSnapshot()});
    const card=$('#companionCard');
    if(card){
      card.classList.remove('companion-pulse');
      void card.offsetWidth;
      card.classList.add('companion-pulse');
      clearTimeout(emitCompanionEvent._timer);
      emitCompanionEvent._timer=setTimeout(()=>card.classList.remove('companion-pulse'),1400);
    }
    return true;
  }catch(e){ logHubError?.('emitCompanionEvent', e); return false; }
}
function retryCompanionUndeliveredEvents(){
  const events=loadCompanionEvents();
  const pending=events.filter(e=>!e.acknowledgedByFrame && e.deliveryStatus!=='acknowledged').slice(-20);
  let sent=0;
  pending.forEach(e=>{ if(postCompanionEventToFrame(e)){ e.deliveredToFrame=true; e.deliveryStatus='delivered'; e.deliveredAt=new Date().toISOString(); sent++; } else { e.deliveryStatus='queued'; } });
  saveCompanionEvents(events);
  renderCompanionCard?.();
  if(sent) setCompanionFrameStatus(`resent ${sent} event${sent===1?'':'s'}`);
  return sent;
}
function companionLatestBridgeEvent(){ return loadCompanionEvents().slice().sort((a,b)=>(Number(b.ts)||0)-(Number(a.ts)||0))[0] || null; }
function companionXpEvents(){
  try{ return loadHubActivity().filter(e=>COMPANION_XP_TYPES.includes(e.type)); }
  catch(e){ return []; }
}
function companionXpFromActivity(){ return companionXpEvents().reduce((sum,e)=>sum+(Number(e.points)||0),0); }
function companionLevelFromXp(xp){ return Math.max(1, Math.floor(Math.sqrt(Math.max(0,Number(xp)||0)/10))+1); }
function companionLevelBounds(level){
  level=Math.max(1,Number(level)||1);
  return {current:Math.pow(level-1,2)*10,next:Math.pow(level,2)*10};
}
function companionMood(stats, latest){
  const todayPoints=Number(stats?.todayPoints)||0;
  const streak=Number(stats?.current)||0;
  if(latest?.type==='focus_session_completed') return 'deep work';
  if(latest?.type==='task_done') return 'charged';
  if(streak>=7) return 'loyal';
  if(todayPoints>0) return 'fed';
  return 'idle';
}
function companionMoodIcon(mood){ return ({'deep work':'🎯',charged:'⚡',loyal:'🔥',fed:'🟩',idle:'▫️'}[mood]||'✦'); }
function companionLatestEvent(){ return companionXpEvents().slice().sort((a,b)=>(Number(b.ts)||0)-(Number(a.ts)||0))[0] || null; }
function companionMessage(stats, latest, mood){
  if(latest){
    if(latest.type==='task_done') return `Task completed: ${latest.label||'real progress registered'}.`;
    if(latest.type==='focus_session_completed') return `Deep work fed the system: ${latest.label||'focus complete'}.`;
    if(latest.type==='note_created') return `Knowledge captured: ${latest.label||'new note'}.`;
    if(latest.type==='note_edited') return `Refinement logged: ${latest.label||'note improved'}.`;
    if(latest.type==='event_added') return `Future protected: ${latest.label||'calendar item added'}.`;
    if(latest.type==='bookmark_added') return `Resource gathered: ${latest.label||'bookmark saved'}.`;
    if(latest.type==='ai_action_approved') return `Co-pilot sync complete: ${latest.label||'Marciale action approved'}.`;
    if(latest.type==='chess_match_completed') return `Tactical match archived: ${latest.label||'chess match complete'}.`;
    if(latest.type==='chess_match_won') return `Victory secured: ${latest.label||'chess win logged'}.`;
  }
  if(Number(stats?.todayPoints)>0) return 'Momentum started. Keep the chain alive with one more meaningful action.';
  return 'No activity yet today. Feed the system with one small action.';
}
function companionStateSnapshot(){
  const settings=companionSettings();
  const xp=companionXpFromActivity();
  const level=companionLevelFromXp(xp);
  const bounds=companionLevelBounds(level);
  const progress=Math.max(0, Math.min(100, Math.round(((xp-bounds.current)/Math.max(1,bounds.next-bounds.current))*100)));
  const stats=typeof activityStreakStats==='function' ? activityStreakStats(todayStr()) : {current:0,best:0,todayPoints:0,todayCount:0};
  const latest=companionLatestEvent();
  const bridge=companionLatestBridgeEvent();
  const mood=companionMood(stats, latest);
  const bridgeFresh=bridge && (!latest || Number(bridge.ts||0) >= Number(latest.ts||0));
  const message=bridgeFresh ? bridge.message : (settings.lastMessage && settings.lastEventAt && (!latest || Number(settings.lastEventAt)>=Number(latest.ts||0)) ? settings.lastMessage : companionMessage(stats,latest,mood));
  return {settings,xp,level,bounds,progress,stats,latest,bridge,mood,message};
}
function ensureCompanionCard(){
  let card=$('#companionCard');
  if(card) return card;
  const activity=$('#activityCard');
  const parent=activity?.parentElement || $('#page-today');
  if(!parent) return null;
  card=document.createElement('div');
  card.className='companion-card';
  card.id='companionCard';
  if(activity && activity.parentElement) activity.parentElement.insertBefore(card, activity);
  else parent.appendChild(card);
  return card;
}
function removeCompanionCard(){ const card=$('#companionCard'); if(card) card.remove(); }
function companionNativeFallbackHtml(snap, latestTime){
  return `<div class="companion-body companion-native-fallback">
    <div class="companion-avatar ${escAttr(snap.mood)}" aria-hidden="true"><i>${companionMoodIcon(snap.mood)}</i></div>
    <div class="companion-main">
      <div class="companion-name-row"><b>${esc(snap.settings.name)}</b><em>${esc(snap.mood)}</em></div>
      <div class="companion-message" id="companionMessage">${esc(snap.message)}</div>
      <div class="companion-xp"><i id="companionXpBar" style="width:${snap.progress}%"></i></div>
      <div class="companion-meta"><span id="companionXpText">${snap.xp} XP</span><span id="companionProgressText">${snap.progress}% to Lv ${snap.level+1}</span><span id="companionStreakText">${snap.stats.current}d streak</span></div>
      <div class="companion-last" id="companionLastText">Last feed: ${snap.latest?`${esc(snap.latest.label||snap.latest.type)} · ${esc(latestTime)}`:esc(latestTime)}</div><div class="companion-last" id="companionDeliveryText">Bridge: ${snap.bridge?esc(snap.bridge.deliveryStatus||'created'):'waiting'}</div>
    </div>
  </div>`;
}
function updateCompanionCardMetrics(snap, latestTime){
  if($('#companionLevelBadge')) $('#companionLevelBadge').textContent='Lv '+snap.level;
  if($('#companionMessage')) $('#companionMessage').textContent=snap.message;
  if($('#companionXpBar')) $('#companionXpBar').style.width=snap.progress+'%';
  if($('#companionXpText')) $('#companionXpText').textContent=snap.xp+' XP';
  if($('#companionProgressText')) $('#companionProgressText').textContent=`${snap.progress}% to Lv ${snap.level+1}`;
  if($('#companionStreakText')) $('#companionStreakText').textContent=`${snap.stats.current}d streak`;
  if($('#companionLastText')) $('#companionLastText').textContent='Last feed: '+(snap.latest?`${snap.latest.label||snap.latest.type} · ${latestTime}`:latestTime);
  if($('#companionDeliveryText')) $('#companionDeliveryText').textContent='Bridge: '+(snap.bridge?.deliveryStatus||'waiting');
}

let COMPANION_FULL_OVERLAY = null; // HubFrame instance
let COMPANION_PAGE_FRAME = null;   // HubFrame instance for #page-idlehero

function ensureCompanionFullOverlay(){
  let overlay=$('#companionFullOverlay');
  if(!overlay){
    overlay=document.createElement('div');
    overlay.className='overlay companion-full-overlay';
    overlay.id='companionFullOverlay';
    overlay.setAttribute('aria-hidden','true');
    document.body.appendChild(overlay);
    overlay.onclick=e=>{ if(e.target===overlay) closeCompanionFullView(); };
  }
  if(!COMPANION_FULL_OVERLAY){
    const src = companionSettings().frameSrc || COMPANION_FRAME_SRC;
    COMPANION_FULL_OVERLAY = new HubFrame(overlay, {
      id: 'companionFrameFull', src, title: '🧬 Idle Hero', subtitle: 'Full Momentum Companion view',
      className: 'companion-game-frame', frameClass: 'companion-game-frame',
      reloadable: true, closable: true,
      pauseOnHidden: companionSettings().pauseWhenHidden,
      onLoad: () => { setCompanionFrameStatus(COMPANION_FRAME_READY?'loaded':'iframe loaded'); flushCompanionFrameQueue(); },
      onMessage: (e) => handleCompanionFrameMessage(e)
    });
  }
  return overlay;
}
function openCompanionFullView(){
  ensureCompanionFrameListener();
  const overlay=ensureCompanionFullOverlay();
  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden','false');
  setCompanionFrameStatus(COMPANION_FRAME_READY?'loaded':'opening full view');
  setTimeout(()=>$('#companionFullClose')?.focus(),50);
  flushCompanionFrameQueue();
}
function closeCompanionFullView(){
  const overlay=$('#companionFullOverlay');
  if(!overlay) return;
  overlay.classList.remove('show');
  overlay.setAttribute('aria-hidden','true');
  if(companionSettings().pauseWhenHidden) postCompanionMessage({type:'hub.companion.pause'});
}
function companionInlineFrameHtml(settings){
  if(!settings.showInlineGame) return '';
  const src=settings.frameSrc || COMPANION_FRAME_SRC;
  return `<div class="companion-iframe-shell inline companion-inline-full-view">
    <div class="companion-inline-head"><div><b>🧬 Idle Hero</b><span>Full Momentum Companion view</span></div><div class="companion-inline-actions"><button class="btn sm" id="companionInlineReload" type="button">Reload</button><button class="btn sm primary" id="companionInlineClose" type="button">Close</button></div></div>
    <iframe id="companionFrameInline" class="companion-game-frame" src="${escAttr(src)}" title="Momentum Companion Idle Hero" loading="lazy" referrerpolicy="no-referrer"></iframe>
    <div class="companion-frame-footer"><span id="companionFrameStatus">Idle Hero: ${esc(COMPANION_FRAME_STATUS||settings.frameStatus||'loading')}</span><span>Inline local iframe · ${esc(src)}</span></div>
  </div>`;
}
function ensureActivityMainWrap(activity){
  let wrap=activity.querySelector(':scope > .activity-main-wrap');
  if(wrap) return wrap;
  wrap=document.createElement('div');
  wrap.className='activity-main-wrap';
  const movable=Array.from(activity.children).filter(el=>el.id!=='activityCompanionEmbed');
  movable.forEach(el=>wrap.appendChild(el));
  activity.prepend(wrap);
  return wrap;
}
function ensureActivityCompanionEmbed(){
  const activity=$('#activityCard');
  if(!activity) return null;
  ensureActivityMainWrap(activity);
  let embed=$('#activityCompanionEmbed');
  if(embed) return embed;
  embed=document.createElement('div');
  embed.className='activity-companion-embed';
  embed.id='activityCompanionEmbed';
  activity.appendChild(embed);
  activity.classList.add('companion-embedded');
  return embed;
}
function removeActivityCompanionEmbed(){
  const activity=$('#activityCard');
  $('#activityCompanionEmbed')?.remove();
  if(activity){
    const wrap=activity.querySelector(':scope > .activity-main-wrap');
    if(wrap){ while(wrap.firstChild) activity.insertBefore(wrap.firstChild, wrap); wrap.remove(); }
    activity.classList.remove('companion-embedded');
  }
}
function renderRarityCrest(rarity = 'common', size = 14) {
  const colors = {
    common: '#a4b0be',
    rare: '#0984e3',
    epic: '#6c5ce7',
    legendary: '#d4a034',
    mythic: '#e84393'
  };
  const c = colors[String(rarity).toLowerCase()] || colors.common;
  return `<svg class="gear-crest" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2" style="vertical-align:middle;margin-right:5px;filter:drop-shadow(0 0 3px ${c}66);">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="${c}" fill-opacity="0.18"/>
    <circle cx="12" cy="12" r="3" fill="${c}"/>
  </svg>`;
}

function renderCompanionCard(){
  const experimental = typeof experimentalSettings==='function' ? experimentalSettings() : {companion:{enabled:false,showOnToday:false}};
  if(!experimental.companion?.enabled || experimental.companion.showOnToday===false){ removeCompanionCard(); removeActivityCompanionEmbed(); return; }
  removeCompanionCard();
  const settings=companionSettings();
  const embed=ensureActivityCompanionEmbed(); if(!embed) return;
  ensureCompanionFrameListener();
  const snap=companionStateSnapshot();
  const latestTime=snap.latest ? new Date(Number(snap.latest.ts)||Date.now()).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) : 'No activity yet';
  const src=snap.settings.miniFrameSrc || COMPANION_MINI_SRC;
  const heroData=companionHeroData();
  const eqWeapon=heroData.equipment?.weapon?.name || 'Basic Staff';
  const eqWeaponRarity=heroData.equipment?.weapon?.rarity || 'common';
  const eqArmor=heroData.equipment?.armor?.name || 'Apprentice Robes';
  const eqArmorRarity=heroData.equipment?.armor?.rarity || 'common';
  const eqAccessory=heroData.equipment?.accessory?.name || 'Mana Amulet';
  const eqAccessoryRarity=heroData.equipment?.accessory?.rarity || 'rare';
  const heroName=heroData.hero?.name || 'Rudeus Greyrat';
  const heroLvl=heroData.hero?.level || snap.level || 1;

  if(embed.querySelector('#companionFrameMini')){ postCompanionMiniSnapshot(); return; }
  embed.innerHTML=`
    <div class="activity-companion-head">
      <div><b>🧬 Momentum Companion: ${esc(heroName)}</b><span>Mini companion lives inside Hub Activity. Open the full Idle Hero page for the complete webgame.</span></div>
      <em id="companionLevelBadge">Lv ${heroLvl}</em>
    </div>
    <div class="companion-gear-status-bar">
      <span class="gear-badge" title="Equipped Weapon">${renderRarityCrest(eqWeaponRarity)}🗡️ ${esc(eqWeapon)}</span>
      <span class="gear-badge" title="Equipped Armor">${renderRarityCrest(eqArmorRarity)}🛡️ ${esc(eqArmor)}</span>
      <span class="gear-badge" title="Equipped Accessory">${renderRarityCrest(eqAccessoryRarity)}💍 ${esc(eqAccessory)}</span>
      <span class="gold-badge" title="Hero Gold">🪙 ${Number(heroData.gold||0).toLocaleString()} G</span>
    </div>
    <div class="companion-compact-actions">
      <button class="btn primary" id="companionOpenIdlePage" type="button">Open Idle Hero page</button>
      <button class="btn" id="companionRetryRewards" type="button">Retry rewards</button>
    </div>
    <div class="companion-mini-shell">
      <iframe id="companionFrameMini" class="companion-mini-frame" src="${escAttr(src)}" title="Momentum Companion Mini" loading="lazy" referrerpolicy="no-referrer"></iframe>
      <div class="companion-frame-footer">
        <span data-companion-status>Mini Companion: ready</span>
        <span>Mini iframe · ${esc(src)}</span>
      </div>
    </div>`;
  $('#companionOpenIdlePage')?.addEventListener('click',()=>activatePage?.('idlehero'));
  $('#companionRetryRewards')?.addEventListener('click',()=>{ const n=retryCompanionUndeliveredEvents(); toast(n?`Retried ${n} reward event${n===1?'':'s'}`:'No reward events needed retry','info'); });
  const frame=$('#companionFrameMini');
  if(frame){
    frame.addEventListener('load',()=>{ postCompanionMiniSnapshot(); });
  }
}

function renderIdleHeroPage(){
  const wrap=$('#idleHeroPageFrameWrap');
  if(!wrap) return;
  const settings=companionSettings();
  const src=settings.frameSrc || COMPANION_FRAME_SRC;
  if(!COMPANION_PAGE_FRAME || COMPANION_PAGE_FRAME.options.src !== src){
    COMPANION_PAGE_FRAME = new HubFrame(wrap, {
      id: 'idleHeroPageFrame', src, title: '🧬 Idle Hero', subtitle: 'Full Momentum Companion view',
      className: 'idlehero-page-frame', frameClass: 'companion-game-frame',
      reloadable: true, closable: false, showUrl: true,
      pauseOnHidden: settings.pauseWhenHidden,
      onLoad: () => { setCompanionFrameStatus(COMPANION_FRAME_READY?'loaded':'page iframe loaded'); flushCompanionFrameQueue(); },
      onMessage: (e) => handleCompanionFrameMessage(e)
    });
  }
  const reload=$('#idleHeroPageReload'); if(reload) reload.onclick=()=>{ COMPANION_PAGE_FRAME?.reload(); COMPANION_FRAME_READY=false; setCompanionFrameStatus('reloading page'); };
  const retry=$('#idleHeroPageRetry'); if(retry) retry.onclick=()=>{ const n=retryCompanionUndeliveredEvents(); toast(n?`Retried ${n} reward event${n===1?'':'s'}`:'No reward events needed retry','info'); };
}
function syncCompanionControls(settings=companionSettings()){
  initCompanionControls();
  if($('#companionInlineGame')) $('#companionInlineGame').checked=!!settings.showInlineGame;
  if($('#companionPauseHidden')) $('#companionPauseHidden').checked=settings.pauseWhenHidden!==false;
  if($('#companionReduceMotion')) $('#companionReduceMotion').checked=settings.reduceWithHubPerformance!==false;
}
function readCompanionControls(){
  const settings=companionSettings();
  if($('#companionInlineGame')) settings.showInlineGame=!!$('#companionInlineGame').checked;
  if($('#companionPauseHidden')) settings.pauseWhenHidden=!!$('#companionPauseHidden').checked;
  if($('#companionReduceMotion')) settings.reduceWithHubPerformance=!!$('#companionReduceMotion').checked;
  saveCompanionSettings(settings);
  renderCompanionCard?.();
  toast('Companion settings saved','success');
}
function initCompanionControls(){
  if(initCompanionControls._done) return;
  ['#companionInlineGame','#companionPauseHidden','#companionReduceMotion'].forEach(sel=>$(sel)?.addEventListener('change',readCompanionControls));
  initCompanionControls._done=true;
}
function initCompanion(){
  initCompanionControls();
  syncCompanionControls();
  saveCompanionSettings(companionSettings());
  ensureCompanionFrameListener();
  renderCompanionCard();
}
window.companionSettings=companionSettings;
window.saveCompanionSettings=saveCompanionSettings;
window.syncCompanionControls=syncCompanionControls;
window.readCompanionControls=readCompanionControls;
window.loadCompanionEvents=loadCompanionEvents;
window.saveCompanionEvents=saveCompanionEvents;
window.emitCompanionEvent=emitCompanionEvent;
window.companionRewardForEvent=companionRewardForEvent;
window.markCompanionEventAck=markCompanionEventAck;
window.retryCompanionUndeliveredEvents=retryCompanionUndeliveredEvents;
window.openCompanionFullView=openCompanionFullView;
window.closeCompanionFullView=closeCompanionFullView;
window.postCompanionEventToFrame=postCompanionEventToFrame;
window.postCompanionMessage=postCompanionMessage;
window.flushCompanionFrameQueue=flushCompanionFrameQueue;
window.companionXpFromActivity=companionXpFromActivity;
window.companionLevelFromXp=companionLevelFromXp;
window.companionStateSnapshot=companionStateSnapshot;
window.renderCompanionCard=renderCompanionCard;
window.renderIdleHeroPage=renderIdleHeroPage;
window.initCompanion=initCompanion;
