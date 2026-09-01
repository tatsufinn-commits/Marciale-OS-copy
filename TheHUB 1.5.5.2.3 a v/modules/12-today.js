
window.runAutonomousAgent = async function(btn) {
   btn.disabled = true;
   btn.textContent = '🧠 Analyzing your life...';
   try {
     if(typeof window.checkOllama === 'function' && !ollamaOnline) await window.checkOllama();
     if(!ollamaOnline) throw new Error("Ollama is offline. Start it first!");
     
     const agentPrompt = `Analyze my current dashboard, schedule, tasks, and energy levels. 
     Be proactive. Suggest 1 to 3 actions to optimize my day (e.g., create a specific task based on deadlines, move a stagnant task to in_progress, add a reminder event, or log a break note). 
     Use your tools to prepare these actions. Keep your text response brief and encouraging.`;
     
     const messages=[
       {role:'system',content:getSysPrompt('')},
       {role:'user',content:agentPrompt}
     ];
     
     const nativeTools = typeof nativeToolDefinitions === 'function'
       ? nativeToolDefinitions()
       : Object.keys(window.TOOLS || {}).map(k => ({type:'function', function:{name:k, description:window.TOOL_SCHEMAS?.[k]?.desc || '', parameters:{type:'object', properties:{}}}}));
     
     const agentBody = typeof ollamaPayload === 'function'
       ? ollamaPayload({model:aiModel, messages, tools: nativeTools, stream:false})
       : {model:aiModel, messages, tools: nativeTools, stream:false};
     const r=await fetch(OLLAMA_URL+'/api/chat',{method:'POST',headers:ollamaHeaders({'Content-Type':'application/json'}),
        body:JSON.stringify(agentBody)});
     
     if(!r.ok) throw new Error('HTTP '+r.status);
     const data=await r.json();
     let reply=(data.message&&data.message.content)||'';
     reply=reply.replace(/<think>[\s\S]*?<\/think>/gi,'').trim();
     
     let actions = [];
     if(data.message && data.message.tool_calls) {
       actions = typeof toolActionsFromCalls === 'function'
         ? toolActionsFromCalls(data.message.tool_calls)
         : data.message.tool_calls.map(tc => ({ tool: tc.function?.name, args: tc.function?.arguments || {} })).filter(a => window.TOOLS?.[a.tool]);
     } else {
       const parsed = parseActions(reply);
       reply = parsed.clean;
       actions = parsed.actions;
     }
     
     window.CHAT.push({role:'user', text:"[Auto-Analysis Triggered]", _i:CIDX++});
     const botMsg = {role:'bot', text: reply || (actions.length ? 'I have prepared proactive actions.' : 'Everything looks good!'), _i:CIDX++};
     
     if(actions.length){
        botMsg.actions = actions;
        botMsg.pending = true;
     }
     window.CHAT.push(botMsg);
     saveChat(); renderChat(); renderTodayDashboard();
   } catch(e) {
     toast(e.message);
     btn.disabled = false;
     btn.textContent = '🧠 Analyze My Day (Auto-Agent)';
   }
};

/* ===========================================================
   TODAY DASHBOARD
   =========================================================== */


function activityLevel(points){
  points=Number(points)||0;
  if(points<=0) return 0;
  if(points===1) return 1;
  if(points<=3) return 2;
  if(points<=6) return 3;
  return 4;
}
function activityStreakLabel(n){
  if(n>=30) return 'Machine mode';
  if(n>=14) return 'Locked in';
  if(n>=7) return 'Momentum';
  if(n>=3) return 'Warming up';
  if(n>=1) return 'Started';
  return 'No streak yet';
}
let ACTIVITY_SELECTED_DATE = '';
let ACTIVITY_FILTER = 'all';
const ACTIVITY_FILTERS=[
  {id:'all',label:'All',types:[]},
  {id:'tasks',label:'Tasks',types:['task_done','focus_session_completed']},
  {id:'notes',label:'Notes',types:['note_created','note_edited']},
  {id:'intake',label:'Intake',types:['intake_logged']},
  {id:'calendar',label:'Calendar',types:['event_added']},
  {id:'bookmarks',label:'Bookmarks',types:['bookmark_added']},
  {id:'marciale',label:'Marciale',types:['ai_action_approved']},
  {id:'chess',label:'Chess',types:['chess_match_completed','chess_match_won']}
];
function activityFilterFor(id){ return ACTIVITY_FILTERS.find(f=>f.id===id) || ACTIVITY_FILTERS[0]; }
function activityTypeLabel(type){ return ({task_done:'Task done',focus_session_completed:'LOCK IN completed',note_created:'Note created',note_edited:'Note edited',intake_logged:'Intake logged',event_added:'Calendar event',bookmark_added:'Bookmark',ai_action_approved:'Marciale action',chess_match_completed:'Chess match completed',chess_match_won:'Chess win'}[type]||type); }
function formatActivityTime(ts){ try{ return new Date(Number(ts)||Date.now()).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}); }catch(e){ return ''; } }
function renderActivityDetail(ds){
  const detail=$('#activityDetail'); if(!detail || typeof activityByDate!=='function') return;
  const by=activityByDate(); const day=by[ds] || {points:0,count:0,items:[]};
  const filter=activityFilterFor(ACTIVITY_FILTER);
  const items=day.items.slice().sort((a,b)=>(Number(b.ts)||0)-(Number(a.ts)||0)).filter(e=>!filter.types.length || filter.types.includes(e.type));
  const prettyDate = (()=>{ try{ return new Date(ds+'T00:00:00').toLocaleDateString([], {weekday:'long', month:'short', day:'numeric', year:'numeric'}); }catch(e){ return ds; } })();
  detail.innerHTML=`
    <div class="activity-detail-head">
      <div><b>${esc(prettyDate)}</b><span>${day.points} point${day.points===1?'':'s'} · ${day.count} action${day.count===1?'':'s'}</span></div>
      <button class="btn sm" id="activitySelectToday">Today</button>
    </div>
    <div class="activity-filters">
      ${ACTIVITY_FILTERS.map(f=>`<button class="${f.id===ACTIVITY_FILTER?'active':''}" data-activity-filter="${escAttr(f.id)}">${esc(f.label)}</button>`).join('')}
    </div>
    <div class="activity-items">
      ${items.length ? items.map(e=>`<div class="activity-item"><div class="activity-item-icon">${activityIcon(e.type)}</div><div><b>${esc(e.label||activityTypeLabel(e.type))}</b><span>${esc(activityTypeLabel(e.type))} · ${esc(formatActivityTime(e.ts))} · ${Number(e.points)||0} pt${Number(e.points)===1?'':'s'}</span></div></div>`).join('') : `<div class="feature-empty compact">${day.count?'No items match this filter.':'No activity logged for this day yet.'}</div>`}
    </div>`;
  $$('#activityDetail [data-activity-filter]').forEach(btn=>btn.onclick=()=>{ ACTIVITY_FILTER=btn.dataset.activityFilter||'all'; renderActivityDetail(ds); });
  $('#activitySelectToday')?.addEventListener('click',()=>{ ACTIVITY_SELECTED_DATE=todayStr(); ACTIVITY_FILTER='all'; renderActivityHeatmap(); });
}
function renderActivityHeatmap(){
  const card=$('#activityCard');
  const settings = typeof activitySettings === 'function' ? activitySettings() : {showOnToday:true};
  if(card) card.style.display = settings.showOnToday === false ? 'none' : 'block';
  if(settings.showOnToday === false) return;
  const heat=$('#activityHeatmap'), statsEl=$('#activityStats'), scoreEl=$('#activityTodayScore');
  if(!heat || typeof loadHubActivity !== 'function') return;
  const today=todayStr();
  const by=activityByDate();
  const stats=activityStreakStats(today);
  if(scoreEl) scoreEl.textContent=`${stats.todayPoints} pt${stats.todayPoints===1?'':'s'}`;
  if(statsEl){
    statsEl.innerHTML=`
      <div><b>${stats.current}</b><span>Current streak</span></div>
      <div><b>${stats.best}</b><span>Best streak</span></div>
      <div><b>${stats.todayCount}</b><span>Actions today</span></div>
      <div><b>${activityStreakLabel(stats.current)}</b><span>Status</span></div>`;
  }
  const motivation=$('#activityMotivation');
  if(motivation){
    motivation.className='activity-motivation '+(stats.todayPoints>0?'active':'idle');
    motivation.innerHTML = stats.todayPoints>0
      ? `🟩 <b>You showed up today.</b> ${stats.todayPoints} point${stats.todayPoints===1?'':'s'} logged — keep the streak alive.`
      : `▫️ <b>No activity yet today.</b> Complete a task, write a note, or log intake to light up today’s square.`;
  }
  const start=addDaysGeneric(today,-364);
  const leading=new Date(start+'T00:00:00').getDay();
  let html='';
  for(let i=0;i<leading;i++) html+='<span class="activity-day blank" aria-hidden="true"></span>';
  for(let i=0;i<365;i++){
    const ds=addDaysGeneric(start,i);
    const d=by[ds]||{points:0,count:0,items:[]};
    const lvl=activityLevel(d.points);
    const label=`${ds}: ${d.points} point${d.points===1?'':'s'} · ${d.count} action${d.count===1?'':'s'}`;
    html+=`<button class="activity-day" data-lvl="${lvl}" title="${escAttr(label)}" aria-label="${escAttr(label)}" data-activity-date="${escAttr(ds)}"></button>`;
  }
  heat.innerHTML=html;
  if(!ACTIVITY_SELECTED_DATE) ACTIVITY_SELECTED_DATE=today;
  $$('#activityHeatmap [data-activity-date]').forEach(btn=>{
    btn.classList.toggle('selected', btn.dataset.activityDate===ACTIVITY_SELECTED_DATE);
    btn.onclick=()=>{
      ACTIVITY_SELECTED_DATE=btn.dataset.activityDate;
      $$('#activityHeatmap [data-activity-date]').forEach(b=>b.classList.toggle('selected', b.dataset.activityDate===ACTIVITY_SELECTED_DATE));
      renderActivityDetail(ACTIVITY_SELECTED_DATE);
    };
  });
  renderActivityDetail(ACTIVITY_SELECTED_DATE);
}



/* ===========================================================
   MARCIALE AUTOPILOT — deterministic scan engine + Today card
   =========================================================== */
function autopilotActiveForProfile(){ try{ return BRAIN?.profile === 'marciale'; }catch(e){ return false; } }
function autopilotIsSnoozed(){ return Date.now() < Number(autopilotSettings().snoozedUntil||0); }
function autopilotSeverityRank(s){ return ({danger:4,warn:3,info:2,good:1}[s]||0); }
function autopilotHoursUntilDate(date, time=''){
  try{
    const d=parseYmd(date); const [h,m]=String(time||'23:59').split(':').map(Number);
    d.setHours(Number.isFinite(h)?h:23, Number.isFinite(m)?m:59, 0, 0);
    return (d.getTime()-Date.now())/3600000;
  }catch(e){ return 99999; }
}
function buildAutopilotSignals(){
  const today=todayStr();
  const taskSource=(typeof TASKS!=='undefined' && Array.isArray(TASKS)) ? TASKS : [];
  const eventSource=typeof getAllEvents==='function' ? getAllEvents() : [];
  const signals=[];
  const settings=autopilotSettings();
  const warnHours=Math.max(1, Number(settings.deadlineWarnHours)||48);
  const dangerHours=Math.max(1, Number(settings.deadlineDangerHours)||24);
  const maxInProgress=Math.max(1, Number(settings.maxInProgress)||3);
  const caffeineWarn=Number(settings.caffeineWarnMg)||Number(typeof SLEEP_THRESHOLD!=='undefined'?SLEEP_THRESHOLD:40)||40;
  const noActivityAfter=Number(settings.noActivityAfterHour);
  const open=taskSource.filter(t=>t.status!=='done');
  const inProg=open.filter(t=>t.status==='in_progress');
  const overdue=open.filter(t=>t.due && t.due<today);
  const soon=open.filter(t=>t.due && t.due>=today && autopilotHoursUntilDate(t.due)<=warnHours);
  const soonDanger=soon.filter(t=>autopilotHoursUntilDate(t.due)<=dangerHours);
  const deadlines=eventSource.filter(e=>e.type==='deadline' && e.date>=today);
  const orphan=deadlines.filter(e=>!deadlineHasTask(e) && autopilotHoursUntilDate(e.date,e.time)<=warnHours);
  if(settings.overdueTaskWarnings!==false && overdue.length) signals.push({id:'overdue-tasks',severity:'danger',title:'Overdue tasks detected',body:`${overdue.length} open task${overdue.length===1?' is':'s are'} overdue. Decide: finish, defer, or delete.`,action:'Open Tasks',proposal:{tool:'show_tab',args:{tab:'tasks'}},run:()=>activatePage('tasks')});
  if(soon.length) signals.push({id:'due-soon',severity:soonDanger.length?'danger':'warn',title:soonDanger.length?'Tasks near danger window':'Tasks due soon',body:`${soon.length} task${soon.length===1?' is':'s are'} due within ${warnHours} hours${soonDanger.length?`; ${soonDanger.length} within ${dangerHours} hours`:''}. Protect a focused block.`,action:'Draft Plan',proposal:{tool:'write_note',args:{append:true,text:`## Autopilot task triage (${today})\n${soon.slice(0,5).map(t=>`- ${t.title} — due ${t.due}${t.priority==='high'?' — HIGH':''}`).join('\n')}\n\nNext: choose one task and define the next concrete action.`}},run:()=>useAssistantPrompt?.('Plan my tasks due soon into a realistic sequence. Challenge weak planning and suggest the next 3 actions.')});
  if(settings.orphanDeadlineWarnings!==false && orphan.length) signals.push({id:'orphan-deadlines',severity:orphan.some(e=>autopilotHoursUntilDate(e.date,e.time)<=dangerHours)?'danger':'warn',title:'Deadlines without Kanban tasks',body:`${orphan.length} upcoming deadline${orphan.length===1?' has':'s have'} no matching task within your ${warnHours}h warning window.`,action:'Create Task',proposal:{tool:'add_task',args:{title:orphan[0]?.title||'Untitled deadline',status:'todo',priority:orphan[0]?.priority||'normal',project:'General',due:orphan[0]?.date||today,notes:'Created by Marciale Autopilot from an upcoming calendar deadline.'}},run:()=>activatePage('cal')});
  if(inProg.length>maxInProgress) signals.push({id:'too-many-progress',severity:'warn',title:'Too many tasks in progress',body:`${inProg.length} tasks are in progress. Your tuned limit is ${maxInProgress}. Reduce context switching.`,action:'Open Tasks',proposal:{tool:'show_tab',args:{tab:'tasks'}},run:()=>activatePage('tasks')});
  try{ const stats=activityStreakStats(today); if(Number.isFinite(noActivityAfter) && noActivityAfter>=0 && new Date().getHours()>=noActivityAfter && stats.todayPoints===0) signals.push({id:'no-activity',severity:new Date().getHours()>=18?'warn':'info',title:'No activity logged today',body:`Your heatmap is still empty after ${noActivityAfter}:00. One small action restarts momentum.`,action:'Open Tasks',proposal:{tool:'show_tab',args:{tab:'tasks'}},run:()=>activatePage('tasks')}); }catch(e){}
  try{ const active=activeCaffeine(); if(active>caffeineWarn) signals.push({id:'caffeine-risk',severity:'info',title:'Caffeine may pressure sleep',body:`Active caffeine is about ${active.toFixed(0)}mg, above your tuned ${caffeineWarn}mg warning threshold.`,action:'Open Tracker',proposal:{tool:'show_tab',args:{tab:'tracker'}},run:()=>activatePage('track')}); }catch(e){}
  try{ if(settings.vaultReminder!==false && VAULT_UNLOCKED) signals.push({id:'vault-unlocked',severity:'info',title:'Vault is unlocked',body:'If you are done copying credentials, lock the Vault to reduce exposure.',action:'Open Vault',proposal:{tool:'show_tab',args:{tab:'vault'}},run:()=>activatePage('vault')}); }catch(e){}
  if(!signals.length) signals.push({id:'all-clear',severity:'good',title:'No urgent risks detected',body:'Marciale Autopilot found no immediate Hub-level risk under your tuned thresholds. Keep the system warm with one meaningful action.',action:'Open Today',proposal:{tool:'show_tab',args:{tab:'today'}},run:()=>activatePage('today')});
  return signals.sort((a,b)=>autopilotSeverityRank(b.severity)-autopilotSeverityRank(a.severity)).slice(0,8);
}
async function runAutopilotAiReasoning(signals, reason='manual'){
  const settings=autopilotSettings();
  if(!settings.aiReasoning || !autopilotActiveForProfile()) return null;
  const cooldownMin = Math.max(0, Number(localStorage.getItem('hub.ai.autopilotCooldownMin') || (typeof AI_AUTOPILOT_COOLDOWN_MIN!=='undefined'?AI_AUTOPILOT_COOLDOWN_MIN:10)) || 10);
  const lastAi = Date.parse(settings.lastAiAt || '') || 0;
  if(cooldownMin && lastAi && Date.now()-lastAi < cooldownMin*60000){
    logAutopilot({type:'ai_reasoning_skipped',reason,cooldownMin});
    return settings.lastAiSummary || null;
  }
  const prompt=`Marciale Autopilot scan reason: ${reason}. Interpret these deterministic Hub signals and give a concise strategic summary. Do not propose destructive actions. Keep it to 3 bullets plus one next action.\n\nTuned thresholds: ${typeof autopilotTuningSummary==='function'?autopilotTuningSummary(settings):'(defaults)'}\n\nSignals:\n${signals.map(s=>`- [${s.severity}] ${s.title}: ${s.body}`).join('\n')}\n\nHub summary:\n${typeof hubSummary==='function'?JSON.stringify(hubSummary()):'(unavailable)'}`;
  try{
    const autopilotModel = (typeof aiAutopilotModel !== 'undefined' && aiAutopilotModel) ? aiAutopilotModel : aiModel;
    const aiBody = typeof ollamaPayload === 'function'
      ? ollamaPayload({model:autopilotModel,messages:[{role:'system',content:'You are Marciale Autopilot: local-first, concise, safe, and transparent.'},{role:'user',content:prompt}],stream:false},{keepAlive:'0',numCtx:2048})
      : {model:autopilotModel,messages:[{role:'system',content:'You are Marciale Autopilot: local-first, concise, safe, and transparent.'},{role:'user',content:prompt}],stream:false,keep_alive:0,options:{num_ctx:2048}};
    const r=await fetch(OLLAMA_URL+'/api/chat',{method:'POST',headers:ollamaHeaders({'Content-Type':'application/json'}),body:JSON.stringify(aiBody)});
    if(!r.ok) throw new Error('HTTP '+r.status);
    const data=await r.json();
    const text=((data.message&&data.message.content)||'').replace(/<think>[\s\S]*?<\/think>/gi,'').trim();
    if(!text) throw new Error('empty AI response');
    const next=autopilotSettings(); next.lastAiAt=new Date().toISOString(); next.lastAiSummary=text.slice(0,2200); next.lastAiError=''; saveAutopilotSettings(next);
    logAutopilot({type:'ai_reasoning',reason,model:autopilotModel,chars:text.length});
    renderMarcialeAutopilotCard(signals);
    return text;
  }catch(e){
    logHubError?.('autopilot-ai', e);
    const next=autopilotSettings(); next.lastAiAt=new Date().toISOString(); next.lastAiError=String(e?.message||e); saveAutopilotSettings(next);
    logAutopilot({type:'ai_reasoning_failed',reason,error:next.lastAiError});
    renderMarcialeAutopilotCard(signals);
    return null;
  }
}
async function executeAutopilotAction(action){
  if(!action || !window.TOOLS?.[action.tool]) return 'No valid tool action.';
  return await window.TOOLS[action.tool].run(action.args||{});
}
function autopilotActionKey(sig, action){ return `${todayStr()}:${sig?.id||'signal'}:${action?.tool||'tool'}:${JSON.stringify(action?.args||{})}`; }
function autopilotActionAlreadyRun(key){ return loadAutopilotLog().some(e=>e.autoKey===key && ['action_auto_executed','action_executed'].includes(e.type)); }
function autopilotCanAutoRun(action){
  if(!action || !window.TOOLS?.[action.tool] || window.TOOLS[action.tool].danger) return false;
  if(action.tool==='add_task') return true;
  if(action.tool==='write_note') return action.args && action.args.append === true;
  return false;
}
async function autoRunFullAutopilotActions(signals, reason='scan'){
  const settings=autopilotSettings();
  if(settings.level!=='full' || !settings.enabled || !autopilotActiveForProfile() || autopilotIsSnoozed()) return [];
  const max=Math.max(0, Math.min(10, Number(settings.maxAutoActions)||3));
  const results=[];
  const actionPriority = action => action?.tool==='add_task' ? 4 : action?.tool==='write_note' ? 3 : action?.tool==='show_tab' ? 1 : 2;
  const orderedSignals = signals.slice().sort((a,b)=>actionPriority(b.proposal)-actionPriority(a.proposal) || autopilotSeverityRank(b.severity)-autopilotSeverityRank(a.severity));
  for(const sig of orderedSignals){
    if(results.length>=max) break;
    const action=sig.proposal;
    if(!autopilotCanAutoRun(action)) continue;
    const key=autopilotActionKey(sig, action);
    if(autopilotActionAlreadyRun(key)) continue;
    try{
      const result=await executeAutopilotAction(action);
      const entry={type:'action_auto_executed',reason,signal:sig.id,tool:action.tool,title:sig.title,result:String(result||''),autoKey:key};
      logAutopilot(entry);
      results.push(entry);
    }catch(e){
      logHubError?.('autopilot-auto-action:'+action.tool, e);
      logAutopilot({type:'action_failed',reason,signal:sig.id,tool:action.tool,title:sig.title,error:String(e?.message||e),autoKey:key});
    }
  }
  if(results.length){ toast(`Autopilot auto-ran ${results.length} safe action${results.length===1?'':'s'}`,'success'); }
  return results;
}
async function runMarcialeAutopilotScan(reason='manual'){
  const settings=autopilotSettings();
  const signals=buildAutopilotSignals();
  settings.lastScanAt=new Date().toISOString();
  settings.lastAiError='';
  saveAutopilotSettings(settings);
  logAutopilot({type:'scan',reason,profile:BRAIN?.profile||'',level:settings.level,signals:signals.length,severity:signals[0]?.severity||'none'});
  const topSignal=signals[0];
  if(topSignal && ['danger','warn'].includes(topSignal.severity)) hubNotify?.('Marciale Autopilot: '+topSignal.title, topSignal.body, {type:'autopilot', tag:'autopilot:'+topSignal.id});
  renderMarcialeAutopilotCard(signals);
  await autoRunFullAutopilotActions(signals, reason);
  if(settings.aiReasoning) await runAutopilotAiReasoning(signals, reason);
  renderMarcialeAutopilotCard(buildAutopilotSignals());
  return signals;
}
window.runMarcialeAutopilotScan=runMarcialeAutopilotScan;
function pauseMarcialeAutopilot(minutes=30){
  const s=autopilotSettings(); s.snoozedUntil=Date.now()+minutes*60000; saveAutopilotSettings(s); logAutopilot({type:'pause',minutes}); renderMarcialeAutopilotCard(); toast(`Autopilot paused ${minutes} minutes`,'warn');
}
window.pauseMarcialeAutopilot=pauseMarcialeAutopilot;
function pushAutopilotApproval(sig, action){
  const msg={role:'bot', text:`Marciale Autopilot prepared an action for: ${sig.title}`, _i:Date.now(), pending:true, actions:[action]};
  window.CHAT = Array.isArray(window.CHAT) ? window.CHAT : [];
  window.CHAT.push(msg);
  saveChat?.(); renderChat?.();
  toast('Autopilot action prepared for approval','success');
  logAutopilot({type:'action_prepared',signal:sig.id,tool:action.tool,title:sig.title});
}
async function runAutopilotSignal(idx){
  const settings=autopilotSettings();
  const signals=buildAutopilotSignals();
  const sig=signals[idx];
  if(!sig) return;
  const action=sig.proposal;
  if(settings.level==='observe'){
    toast('Autopilot is in Observe Only mode','info');
    logAutopilot({type:'observe_click',signal:sig.id,title:sig.title});
    sig.run?.(); return;
  }
  if(!action){ sig.run?.(); logAutopilot({type:'signal_action',signal:sig.id,title:sig.title}); return; }
  const danger=!!window.TOOLS?.[action.tool]?.danger;
  if(settings.level==='suggest' || danger){
    pushAutopilotApproval(sig, action); activatePage('ai'); return;
  }
  // safe/full autonomy may auto-run non-dangerous Hub actions, visibly and with audit logging.
  try{
    const result=await executeAutopilotAction(action);
    logAutopilot({type:'action_executed',signal:sig.id,tool:action.tool,title:sig.title,result:String(result||'')});
    toast('Autopilot ran safe action: '+(result||action.tool),'success');
    renderTodayDashboard();
  }catch(e){ logHubError?.('autopilot-signal-action', e); toast('Autopilot action failed','warn'); logAutopilot({type:'action_failed',signal:sig.id,error:String(e?.message||e)}); }
}
window.runAutopilotSignal=runAutopilotSignal;
function showAutopilotAct(){
  let overlay=$('#autopilotActOverlay');
  if(!overlay){
    overlay=document.createElement('div'); overlay.className='overlay'; overlay.id='autopilotActOverlay';
    overlay.innerHTML=`<div class="modal brain-preview-modal"><h3>Marciale Autonomy & Privacy Act</h3><div class="brain-preview-copy" id="autopilotActCopy"></div><div class="row"><button class="btn primary" id="autopilotActClose">Close</button></div></div>`;
    document.body.appendChild(overlay);
    $('#autopilotActClose').onclick=()=>overlay.classList.remove('show');
    overlay.onclick=e=>{ if(e.target===overlay) overlay.classList.remove('show'); };
  }
  $('#autopilotActCopy').textContent=autopilotActText(); overlay.classList.add('show');
}
window.showAutopilotAct=showAutopilotAct;
function renderMarcialeAutopilotCard(existingSignals=null){
  const card=$('#autopilotCard'), list=$('#autopilotSignals'), summary=$('#autopilotSummary'), status=$('#autopilotStatus');
  if(!card || !list) return;
  const settings=autopilotSettings();
  const shouldShow=settings.enabled || autopilotActiveForProfile();
  if(!shouldShow){ card.style.display='none'; return; }
  card.style.display='block';
  const wrongProfile=settings.enabled && !autopilotActiveForProfile();
  const snoozed=autopilotIsSnoozed();
  const signals=existingSignals || (settings.lastScanAt ? buildAutopilotSignals() : []);
  const state=!settings.enabled?'Off':wrongProfile?'Needs Marciale profile':snoozed?'Paused':'Watching';
  if(status) status.textContent=state;
  const last=settings.lastScanAt ? new Date(settings.lastScanAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) : 'Never';
  const aiLine = settings.aiReasoning
    ? settings.lastAiSummary
      ? `<div class="autopilot-ai-summary"><b>Marciale reasoning</b><span>${esc(settings.lastAiSummary)}</span></div>`
      : settings.lastAiError
        ? `<div class="autopilot-ai-summary warn"><b>AI reasoning unavailable</b><span>${esc(settings.lastAiError)}. Check Ollama/CORS if you want AI summaries.</span></div>`
        : `<div class="autopilot-ai-summary"><b>Marciale reasoning</b><span>Run a scan to generate an AI interpretation.</span></div>`
    : '';
  const aiModeLine = settings.aiReasoning ? `AI: ${typeof aiAutopilotModel!=='undefined'?aiAutopilotModel:'selected model'} · cooldown ${localStorage.getItem('hub.ai.autopilotCooldownMin')||'10'}m` : 'AI: deterministic-only';
  if(summary) summary.innerHTML=`<b>Status:</b> ${esc(state)} · <b>Level:</b> ${esc(settings.level)} · <b>Max auto:</b> ${esc(settings.maxAutoActions||3)} · <b>Last scan:</b> ${esc(last)}<br><b>${esc(aiModeLine)}</b>${wrongProfile?'<br><span>Switch brain profile to Marciale to allow Autopilot supervision.</span>':''}${snoozed?`<br><span>Paused until ${esc(new Date(settings.snoozedUntil).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}))}</span>`:''}${aiLine}`;
  if(!settings.enabled){ list.innerHTML='<div class="autopilot-empty">Autopilot is off. Enable it in Hub Control → Marciale Autopilot.</div>'; }
  else if(wrongProfile){ list.innerHTML='<div class="autopilot-empty">Autopilot is enabled but only runs under the Marciale profile.</div>'; }
  else if(!signals.length){ list.innerHTML='<div class="autopilot-empty">No scan yet. Run a scan to inspect Hub state.</div>'; }
  else list.innerHTML=signals.map((s,i)=>`<div class="autopilot-signal ${s.severity}"><div><b>${esc(s.title)}</b><span>${esc(s.body)}</span></div><button class="btn sm" onclick="runAutopilotSignal(${i})">${esc(s.action||'Open')}</button></div>`).join('');
  const recent=$('#autopilotRecentLog');
  if(recent && typeof loadAutopilotLog === 'function'){
    const items=loadAutopilotLog().slice(-3).reverse();
    recent.innerHTML = items.length ? `<b>Recent audit</b>`+items.map(e=>`<span>${esc(new Date(Number(e.ts)||Date.now()).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}))} · ${esc(e.type||'log')}${e.signal?' · '+esc(e.signal):''}</span>`).join('') : '';
  }
  $('#autopilotCardRun')?.addEventListener('click',()=>runMarcialeAutopilotScan('card'),{once:true});
  $('#autopilotCardPause')?.addEventListener('click',()=>pauseMarcialeAutopilot(30),{once:true});
  $('#autopilotCardOpenMarciale')?.addEventListener('click',()=>activatePage('ai'),{once:true});
}
function maybeRunScheduledAutopilot(){
  const s=autopilotSettings();
  if(!s.enabled || !autopilotActiveForProfile() || autopilotIsSnoozed()) return;
  const last=Date.parse(s.lastScanAt||'')||0;
  if(Date.now()-last >= (Number(s.intervalMin)||10)*60000) runMarcialeAutopilotScan('scheduled');
  else renderMarcialeAutopilotCard();
}
window.maybeRunScheduledAutopilot=maybeRunScheduledAutopilot;

/* ===========================================================
   PROFESSIONAL PROFILE — proactive in-Hub alerts
   =========================================================== */
function professionalAlertsEnabled(){
  try{ return ['professional','instructor'].includes(BRAIN?.profile); }catch(e){ return false; }
}
function professionalDismissed(){ return LS.get('hub.professional.dismissed.v1', []); }
function saveProfessionalDismissed(arr){ LS.set('hub.professional.dismissed.v1', Array.isArray(arr)?arr.slice(-120):[]); }
function professionalAlertKey(a){ return `${todayStr()}:${a.id}`; }
function dismissProfessionalAlert(id){
  const arr=professionalDismissed();
  if(!arr.includes(id)) arr.push(id);
  saveProfessionalDismissed(arr);
  renderMarcialeAutopilotCard();
  renderProfessionalAlerts();
  toast('Professional alert dismissed');
}
window.dismissProfessionalAlert=dismissProfessionalAlert;
function alertSeverityRank(s){ return ({danger:3,warn:2,info:1}[s]||0); }
function deadlineHasTask(ev){
  const title=String(ev.title||'').toLowerCase();
  return typeof TASKS!=='undefined' && TASKS.some(t=>t.linkedEventId===ev.id || String(t.title||'').toLowerCase()===title);
}
function buildProfessionalAlerts(){
  if(!professionalAlertsEnabled()) return [];
  const today=todayStr();
  const alerts=[];
  const taskSource = (typeof TASKS !== 'undefined' && Array.isArray(TASKS)) ? TASKS : [];
  const eventSource = typeof getAllEvents === 'function' ? getAllEvents() : (typeof EVENTS !== 'undefined' ? EVENTS : []);

  taskSource.filter(t=>t.status!=='done' && t.due && t.due < today).slice(0,3).forEach(t=>alerts.push({
    id:'overdue-task:'+t.id, severity:'danger', icon:'⏰',
    title:`Overdue task: ${t.title}`,
    body:`This task was due ${t.due}. Move it forward, rescope it, or explicitly defer it.`,
    action:'Open Tasks', run:()=>activatePage('tasks')
  }));

  taskSource.filter(t=>t.status!=='done' && t.due && daysBetween(t.due,today)>=0 && daysBetween(t.due,today)<=2).slice(0,3).forEach(t=>alerts.push({
    id:'soon-task:'+t.id, severity:t.priority==='high'?'danger':'warn', icon:'✅',
    title:`Task due soon: ${t.title}`,
    body:`Due ${t.due}${t.priority==='high'?' · high priority':''}. Make sure it has a next action today.`,
    action:'Plan with Marciale', run:()=>useAssistantPrompt?.(`Help me finish this task before its due date. Task: ${t.title}. Due: ${t.due}. Break it into the next 3 concrete actions and suggest a realistic time block.`)
  }));

  eventSource.filter(e=>e.type==='deadline' && e.date>=today && daysBetween(e.date,today)<=3 && !deadlineHasTask(e)).slice(0,4).forEach(e=>alerts.push({
    id:'deadline-no-task:'+e.id, severity:daysBetween(e.date,today)<=1?'danger':'warn', icon:'🚩',
    title:`Deadline has no Kanban task: ${e.title}`,
    body:`Due ${e.date}${e.time?' at '+e.time:''}. Create a working task so it does not stay only on the calendar.`,
    action:'Create task', run:()=>{ if(typeof TASKS==='undefined') return; TASKS.push({id:uid(),title:e.title,project:'General',status:'todo',priority:e.priority||'normal',due:e.date,estimate:'',notes:'Created from Professional Alert.',ts:Date.now(),linkedEventId:e.id}); saveTasks(); renderTasks?.(); renderProfessionalAlerts(); toast('Task created from deadline','success'); }
  }));

  try{
    const hour=new Date().getHours();
    const active=activeCaffeine?.()||0;
    if(hour>=17 && active>SLEEP_THRESHOLD) alerts.push({
      id:'late-caffeine:'+today, severity:'info', icon:'☕',
      title:'Late-day caffeine may affect sleep readiness',
      body:`Active caffeine is about ${active.toFixed(0)}mg, above your ${SLEEP_THRESHOLD}mg sleep threshold.`,
      action:'Open Tracker', run:()=>activatePage('track')
    });
  }catch(e){}

  try{
    const stats=activityStreakStats?.(today);
    const hour=new Date().getHours();
    if(hour>=12 && stats && stats.todayPoints===0) alerts.push({
      id:'no-activity:'+today, severity:'info', icon:'🟩',
      title:'No Hub activity logged yet today',
      body:'Complete one task, write a note, or log intake to keep the activity chain alive.',
      action:'Open Tasks', run:()=>activatePage('tasks')
    });
  }catch(e){}

  const dismissed=new Set(professionalDismissed());
  return alerts
    .filter(a=>!dismissed.has(professionalAlertKey(a)))
    .sort((a,b)=>alertSeverityRank(b.severity)-alertSeverityRank(a.severity))
    .slice(0,5);
}
function runProfessionalAlert(idx){
  const alerts=buildProfessionalAlerts();
  if(alerts[idx] && typeof alerts[idx].run==='function') alerts[idx].run();
}
window.runProfessionalAlert=runProfessionalAlert;
function renderProfessionalAlerts(){
  const card=$('#professionalAlertCard'), list=$('#professionalAlertList'), count=$('#professionalAlertCount');
  if(!card || !list) return;
  if(!professionalAlertsEnabled()) { card.style.display='none'; return; }
  const alerts=buildProfessionalAlerts();
  card.style.display='block';
  if(count) count.textContent=`${alerts.length}`;
  if(!alerts.length){
    list.innerHTML='<div class="professional-empty">No urgent planning gaps detected. Professional profile is monitoring your Hub context.</div>';
    return;
  }
  list.innerHTML=alerts.map((a,i)=>`<div class="professional-alert ${a.severity}">
    <div class="professional-alert-icon">${a.icon}</div>
    <div class="professional-alert-body"><b>${esc(a.title)}</b><span>${esc(a.body)}</span></div>
    <div class="professional-alert-actions"><button class="btn sm primary" onclick="runProfessionalAlert(${i})">${esc(a.action||'Open')}</button><button class="btn sm" onclick="dismissProfessionalAlert('${escAttr(professionalAlertKey(a))}')">Dismiss</button></div>
  </div>`).join('');
}



/* ===========================================================
   MARCIALE PROFILE — strategic scan / Ghost Mode
   =========================================================== */
function marcialeStrategicEnabled(){ try{ return BRAIN?.profile === 'marciale'; }catch(e){ return false; } }
function safeNum(n){ return Number.isFinite(Number(n)) ? Number(n) : 0; }
function mostActiveActivityHour(){
  try{
    const byHour=Array(24).fill(0);
    loadHubActivity().forEach(e=>{ const d=new Date(Number(e.ts)||0); if(!isNaN(d)) byHour[d.getHours()] += safeNum(e.points)||1; });
    const max=Math.max(...byHour);
    if(max<=0) return null;
    const h=byHour.indexOf(max);
    return `${String(h).padStart(2,'0')}:00–${String((h+2)%24).padStart(2,'0')}:00`;
  }catch(e){ return null; }
}
function upcomingStrategicDeadline(){
  const today=todayStr();
  try{
    return getAllEvents().filter(e=>e.type==='deadline' && e.date>=today).sort((a,b)=>a.date.localeCompare(b.date)||(a.time||'').localeCompare(b.time||''))[0] || null;
  }catch(e){ return null; }
}
function buildMarcialeStrategicInsights(){
  const today=todayStr();
  const taskSource=(typeof TASKS!=='undefined' && Array.isArray(TASKS)) ? TASKS : [];
  const eventSource=typeof getAllEvents==='function' ? getAllEvents() : [];
  const openTasks=taskSource.filter(t=>t.status!=='done');
  const overdue=openTasks.filter(t=>t.due && t.due<today);
  const dueSoon=openTasks.filter(t=>t.due && t.due>=today && daysBetween(t.due,today)<=3);
  const deadlines=eventSource.filter(e=>e.type==='deadline' && e.date>=today);
  const orphanDeadlines=deadlines.filter(e=>!deadlineHasTask(e)).slice(0,5);
  const stats=typeof activityStreakStats==='function' ? activityStreakStats(today) : {current:0,best:0,todayPoints:0};
  const next=upcomingStrategicDeadline();
  const peak=mostActiveActivityHour();
  const active=typeof activeCaffeine==='function' ? activeCaffeine() : 0;
  const notesChars=typeof notesValue==='function' ? notesValue().length : 0;
  const completed14=(typeof loadHubActivity==='function'?loadHubActivity():[]).filter(e=>e.type==='task_done' && e.date>=addDaysGeneric(today,-14)).length;
  const insights=[];

  if(next){
    const d=daysBetween(next.date,today);
    insights.push({kind:d<=3?'danger':'info',title:'Pre-mortem target',body:`${next.title} is due ${d===0?'today':`in ${d} day${d===1?'':'s'}`}. Assume the last 20% takes 50% of the time; schedule review/export buffer early.`});
  }else insights.push({kind:'info',title:'No upcoming deadline detected',body:'Your strategic risk is currently more about maintaining momentum than surviving a deadline.'});
  if(orphanDeadlines.length) insights.push({kind:'warn',title:'Planning bottleneck',body:`${orphanDeadlines.length} upcoming deadline${orphanDeadlines.length===1?' has':'s have'} no matching Kanban task. Calendar-only work is easier to ignore.`});
  if(overdue.length) insights.push({kind:'danger',title:'Execution debt',body:`${overdue.length} overdue task${overdue.length===1?'':'s'} detected. Decide: finish, defer, or delete. Ambiguity is the bottleneck.`});
  else if(dueSoon.length) insights.push({kind:'warn',title:'Compression risk',body:`${dueSoon.length} open task${dueSoon.length===1?' is':'s are'} due within 3 days. Protect a focused work block before adding new work.`});
  if(stats.current>0) insights.push({kind:'good',title:'Activity rhythm',body:`Current streak: ${stats.current} day${stats.current===1?'':'s'} (${activityStreakLabel(stats.current)}). Your system is rewarding consistency.`});
  else insights.push({kind:'warn',title:'Cold start',body:'No activity streak is active. A single completed task or note can restart momentum today.'});
  insights.push({kind:active>SLEEP_THRESHOLD?'warn':'good',title:'Cognitive fuel signal',body:`Active caffeine is about ${active.toFixed(0)}mg. ${active>SLEEP_THRESHOLD?'Late work may feel productive but threaten sleep readiness.':'Your caffeine load is compatible with clearer recovery.'}`});
  insights.push({kind:'info',title:'Observed work window',body:peak?`Your activity history clusters around ${peak}. Treat this as a tentative peak-performance window.`:'Not enough activity history yet to infer a reliable peak-performance window.'});
  insights.push({kind:'info',title:'Knowledge base depth',body:`Current note workspace has ${notesChars.toLocaleString()} characters. Completed tasks in last 14 days: ${completed14}.`});
  return insights.slice(0,6);
}
function buildMarcialeStrategicDirectives(){
  const today=todayStr();
  const insights=buildMarcialeStrategicInsights();
  const taskSource=(typeof TASKS!=='undefined' && Array.isArray(TASKS)) ? TASKS : [];
  const open=taskSource.filter(t=>t.status!=='done');
  const overdue=open.filter(t=>t.due && t.due<today);
  const dueSoon=open.filter(t=>t.due && t.due>=today && daysBetween(t.due,today)<=3);
  const next=upcomingStrategicDeadline();
  const peak=mostActiveActivityHour();
  const active=typeof activeCaffeine==='function' ? activeCaffeine() : 0;
  const opinion = overdue.length
    ? `Your workload is carrying ${overdue.length} overdue task${overdue.length===1?'':'s'}. The main risk is ambiguity, not effort.`
    : dueSoon.length
      ? `${dueSoon.length} task${dueSoon.length===1?' is':'s are'} entering compression. Protect execution time before adding new work.`
      : next
        ? `Your next strategic risk is ${next.title}. Start early enough to create review buffer.`
        : `No immediate deadline pressure detected. Your best move is preserving momentum.`;
  const suggestion = overdue[0]
    ? `Resolve “${overdue[0].title}” first: finish, defer, or delete it before planning new work.`
    : dueSoon[0]
      ? `Turn “${dueSoon[0].title}” into the next concrete action and start a Focus Session.`
      : next
        ? `Create or verify Kanban tasks for “${next.title}” and schedule a review/export buffer.`
        : `Complete one small task or write one project note to keep the system warm.`;
  const time_proposal = peak
    ? `Use your observed ${peak} work window for the hardest block. If unavailable, start a 50–90 minute Focus Session now.`
    : active > SLEEP_THRESHOLD
      ? `Use a shorter 25–50 minute block now and avoid late caffeine; recovery matters for tomorrow’s work.`
      : `Start with a 50 minute Focus Session, then take a 10 minute reset before deciding the next block.`;
  return {opinion, suggestion, time_proposal, sourceInsights:insights.map(i=>i.title)};
}
window.buildMarcialeStrategicDirectives=buildMarcialeStrategicDirectives;
function marcialeStrategicSummaryText(){
  const insights=buildMarcialeStrategicInsights();
  const directives=buildMarcialeStrategicDirectives();
  const summary = typeof hubSummary==='function' ? JSON.stringify(hubSummary(),null,2) : '(Hub summary unavailable)';
  return `Run a Marciale strategic analysis. Look for hidden bottlenecks, pre-mortem risks, cognitive fatigue signals, deadline compression, and high-leverage workflow changes.

DETERMINISTIC HUB INSIGHTS:
${insights.map(i=>`- [${i.kind}] ${i.title}: ${i.body}`).join('\n')}

CURRENT DETERMINISTIC DIRECTIVES:
${JSON.stringify({opinion:directives.opinion,suggestion:directives.suggestion,time_proposal:directives.time_proposal},null,2)}

HUB STATE SUMMARY:
${summary}

Return two sections:

A) STRICT JSON DIRECTIVES ONLY, in this exact shape and no extra keys:
\`\`\`json
{
  "opinion": "blunt assessment of my workload vs energy",
  "suggestion": "one exact actionable step to optimize today",
  "time_proposal": "specific time block recommendation that respects peak-performance windows"
}
\`\`\`

B) Brief explanation with:
1. Critical patterns I may be missing
2. Biggest project/deadline risk
3. Peak performance window hypothesis
4. One safe Ghost Mode recommendation inside TheHUB
5. The next 3 actions for today`;
}
function draftMarcialeStrategicScan(){
  if(typeof applyStrategicModelForDeepScan==='function') applyStrategicModelForDeepScan();
  useAssistantPrompt?.(marcialeStrategicSummaryText());
}
window.draftMarcialeStrategicScan=draftMarcialeStrategicScan;
function applyMarcialeGhostMode(){
  try{
    UI=Object.assign({},UI_PRESETS.focus||UI_DEFAULT,{preset:'focus',density:'normal',wide:true,glass:false,reduceMotion:true,radius:14,fontScale:102});
    applyUI(UI); saveUI(); syncUIInputs?.();
    activatePage('today');
    toast('Ghost Mode applied inside TheHUB','success');
  }catch(e){ logHubError?.('apply-ghost-mode', e); toast('Could not apply Ghost Mode','warn'); }
}
window.applyMarcialeGhostMode=applyMarcialeGhostMode;
function renderMarcialeStrategicScan(){
  const card=$('#marcialeStrategyCard'), grid=$('#marcialeStrategyGrid'), status=$('#marcialeStrategyStatus');
  if(!card || !grid) return;
  if(!marcialeStrategicEnabled()){ card.style.display='none'; return; }
  card.style.display='block';
  const insights=buildMarcialeStrategicInsights();
  const directives=buildMarcialeStrategicDirectives();
  if(status) status.textContent='Strategic';
  grid.innerHTML=insights.map(i=>`<div class="marciale-insight ${i.kind}"><b>${esc(i.title)}</b><span>${esc(i.body)}</span></div>`).join('');
  const dgrid=$('#marcialeDirectiveGrid');
  if(dgrid){
    dgrid.innerHTML=`<div class="marciale-directive opinion"><b>Opinion</b><span>${esc(directives.opinion)}</span></div><div class="marciale-directive suggestion"><b>Suggestion</b><span>${esc(directives.suggestion)}</span></div><div class="marciale-directive time"><b>Time proposal</b><span>${esc(directives.time_proposal)}</span></div>`;
  }
  $('#marcialeDraftScan')?.addEventListener('click',draftMarcialeStrategicScan,{once:true});
  $('#marcialeGhostMode')?.addEventListener('click',applyMarcialeGhostMode,{once:true});
}

/* ===========================================================
   INSTRUCTOR PROFILE — safe accountability / focus overlay
   =========================================================== */
function instructorEnabled(){ try{ return BRAIN?.profile === 'instructor'; }catch(e){ return false; } }
function instructorSnoozedUntil(){ return Number(localStorage.getItem('hub.instructor.snoozedUntil')||0); }
function instructorIsSnoozed(){ return Date.now() < instructorSnoozedUntil(); }
function instructorSnooze(minutes=10){
  localStorage.setItem('hub.instructor.snoozedUntil', String(Date.now()+minutes*60000));
  closeInstructorOverlay(); renderInstructorMode(); toast(`Instructor snoozed ${minutes} minutes`,'warn');
}
window.instructorSnooze=instructorSnooze;
function instructorFocusUntil(){ return Number(localStorage.getItem('hub.instructor.focusUntil')||0); }
function instructorFocusActive(){ return Date.now() < instructorFocusUntil(); }
function instructorTopAlerts(){ return buildProfessionalAlerts().filter(a=>['danger','warn'].includes(a.severity)).slice(0,3); }
function instructorPrimaryMessage(){
  const alerts=instructorTopAlerts();
  if(alerts.length) return alerts[0].title;
  const openTasks=(typeof TASKS!=='undefined'?TASKS:[]).filter(t=>t.status!=='done').length;
  return openTasks ? `${openTasks} open task${openTasks===1?'':'s'} waiting. Pick one and move.` : 'No urgent Hub risk detected. Use this mode for a deliberate focus block.';
}
function renderInstructorMode(){
  const card=$('#instructorCard'), body=$('#instructorBody'), status=$('#instructorStatus');
  if(!card || !body) return;
  if(!instructorEnabled()){ card.style.display='none'; return; }
  card.style.display='block';
  const snoozed=instructorIsSnoozed();
  const focus=instructorFocusActive();
  if(status) status.textContent = focus ? 'Focus active' : snoozed ? 'Snoozed' : 'Strict';
  const alerts=instructorTopAlerts();
  body.innerHTML = snoozed
    ? `<div class="instructor-muted">Snoozed until ${new Date(instructorSnoozedUntil()).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}. No nagging until then.</div>`
    : `<div class="instructor-command"><b>${esc(instructorPrimaryMessage())}</b><span>${alerts.length?'Stop negotiating with the deadline. Choose the next concrete action now.':'Start a LOCK IN block and produce visible progress.'}</span></div>`+
      (alerts.length?`<ul>${alerts.map(a=>`<li>${esc(a.title)}</li>`).join('')}</ul>`:'');
  $('#instructorOpenFocus')?.addEventListener('click',openInstructorOverlay,{once:true});
  $('#instructorSnooze')?.addEventListener('click',()=>instructorSnooze(10),{once:true});
  maybeAutoOpenInstructor(alerts);
}
function maybeAutoOpenInstructor(alerts){
  if(!instructorEnabled() || instructorIsSnoozed()) return;
  const actionable = alerts.some(a=>a.severity==='danger' || a.severity==='warn');
  const severity = alerts.some(a=>a.severity==='danger') ? 'danger' : alerts.some(a=>a.severity==='warn') ? 'warn' : 'activation';
  // Instructor is intentionally visible: open once when activated, and reopen if the actual urgent alert set changes.
  if(!actionable && instructorFocusActive()) return;
  const ids = alerts.filter(a=>a.severity==='danger'||a.severity==='warn').map(a=>a.id).sort().join('|') || 'activation';
  const key=todayStr()+':'+severity+':'+ids;
  if(localStorage.getItem('hub.instructor.lastAutoOpen')===key) return;
  localStorage.setItem('hub.instructor.lastAutoOpen',key);
  hubNotify?.('Instructor focus intervention', instructorPrimaryMessage(), {type:'instructor', tag:'instructor:'+key, toast:false});
  setTimeout(()=>openInstructorOverlay(),250);
}
function openInstructorOverlay(){
  let overlay=$('#instructorOverlay');
  const alerts=instructorTopAlerts();
  if(!overlay){
    overlay=document.createElement('div'); overlay.className='overlay instructor-overlay'; overlay.id='instructorOverlay';
    overlay.innerHTML=`<div class="modal instructor-modal"><div class="instructor-modal-head"><span>INSTRUCTOR</span><b>LOCK IN intervention</b></div><div id="instructorOverlayBody"></div><div class="field"><label>Type acknowledgement</label><input id="instructorAck" placeholder="I WILL WORK" autocomplete="off"></div><div class="row"><button class="btn" id="instructorOverlaySnooze">Snooze 10m</button><button class="btn" id="instructorSwitchProfessional">Switch to Professional</button><button class="btn primary" id="instructorStartFocus">Start LOCK IN</button></div><div class="side-note">Safe boundary: this overlay is dismissible, opt-in, and stays inside TheHUB. It does not control your PC.</div></div>`;
    document.body.appendChild(overlay);
    $('#instructorOverlaySnooze').onclick=()=>instructorSnooze(10);
    $('#instructorSwitchProfessional').onclick=()=>{ BRAIN.profile='professional'; saveBrain?.(); closeInstructorOverlay(); renderTodayDashboard(); toast('Switched to Professional profile','success'); };
    $('#instructorStartFocus').onclick=()=>{
      if($('#instructorAck').value.trim()!=='I WILL WORK'){ toast('Type I WILL WORK to start focus','warn'); $('#instructorAck').focus(); return; }
      localStorage.setItem('hub.instructor.focusUntil', String(Date.now()+25*60000));
      closeInstructorOverlay(); activatePage('tasks'); toast('25-minute focus block started','success'); renderInstructorMode();
    };
    overlay.onclick=e=>{ if(e.target===overlay) closeInstructorOverlay(); };
  }
  $('#instructorOverlayBody').innerHTML=`<div class="instructor-warning"><b>${esc(instructorPrimaryMessage())}</b><span>${alerts.length?'You have urgent planning risk. Start the next action now.':'Start a deliberate LOCK IN block.'}</span></div>`+
    (alerts.length?`<div class="instructor-alert-stack">${alerts.map(a=>`<div><b>${esc(a.title)}</b><span>${esc(a.body)}</span></div>`).join('')}</div>`:'');
  $('#instructorAck').value='';
  overlay.classList.add('show');
  setTimeout(()=>$('#instructorAck')?.focus(),50);
}
function closeInstructorOverlay(){ $('#instructorOverlay')?.classList.remove('show'); }
window.openInstructorOverlay=openInstructorOverlay;
window.closeInstructorOverlay=closeInstructorOverlay;

/* ===========================================================
   FOCUS SESSIONS — timestamp-based Pomodoro/deep-work timer
   =========================================================== */
const FOCUS_ACTIVE_KEY='hub.focus.active.v1';
const FOCUS_HISTORY_KEY='hub.focus.history.v1';
const FOCUS_SETTINGS_KEY='hub.focus.settings.v1';
const FOCUS_DEFAULT_SETTINGS={durationMin:25, breakMin:5};
function focusSettings(){ return Object.assign({}, FOCUS_DEFAULT_SETTINGS, LS.get(FOCUS_SETTINGS_KEY, {})); }
function saveFocusSettings(s){ LS.set(FOCUS_SETTINGS_KEY, Object.assign({}, FOCUS_DEFAULT_SETTINGS, s||{})); }
function activeFocusSession(){ const s=LS.get(FOCUS_ACTIVE_KEY, null); return s && s.id && s.endTime ? s : null; }
function saveActiveFocusSession(s){ if(s) LS.set(FOCUS_ACTIVE_KEY, s); else LS.remove ? LS.remove(FOCUS_ACTIVE_KEY) : localStorage.removeItem(FOCUS_ACTIVE_KEY); }
function loadFocusHistory(){ const arr=LS.get(FOCUS_HISTORY_KEY, []); return Array.isArray(arr) ? arr.slice(-300) : []; }
function saveFocusHistory(arr){ LS.set(FOCUS_HISTORY_KEY, (Array.isArray(arr)?arr:[]).slice(-300)); }
function focusTaskById(id){ try{ return (typeof TASKS!=='undefined' ? TASKS : []).find(t=>t.id===id) || null; }catch(e){ return null; } }
function formatFocusRemaining(ms){
  const total=Math.max(0, Math.ceil(Number(ms||0)/1000));
  const m=Math.floor(total/60), s=total%60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function focusElapsedPercent(session){
  const start=Number(session?.startedAt)||Date.now(), end=Number(session?.endTime)||Date.now();
  const total=Math.max(1, end-start), elapsed=Math.min(total, Math.max(0, Date.now()-start));
  return Math.round(elapsed/total*100);
}
function startFocusSession(taskId='', durationMin=null){
  const settings=focusSettings();
  const dur=Math.max(1, Math.min(480, Number(durationMin || settings.durationMin) || 25));
  const task=focusTaskById(taskId);
  const now=Date.now();
  const session={id:uid(),taskId:String(taskId||''),taskTitle:task?.title || 'General LOCK IN',startedAt:now,endTime:now+dur*60000,durationMin:dur,status:'running'};
  saveActiveFocusSession(session);
  renderFocusSessionCard();
  renderTasks?.();
  postCompanionMessage?.({type:'hub.companion.focus',focus:{active:true,taskTitle:session.taskTitle,durationMin:dur}});
  postCompanionMiniMessage?.({type:'hub.companion.focus',focus:{active:true,taskTitle:session.taskTitle,durationMin:dur}});
  toast(`LOCK IN started: ${dur}m`,'success');
  return session;
}
function cancelFocusSession(reason='cancelled'){
  const s=activeFocusSession(); if(!s) return;
  const hist=loadFocusHistory(); hist.push(Object.assign({},s,{status:'cancelled',cancelledAt:Date.now(),reason})); saveFocusHistory(hist);
  saveActiveFocusSession(null);
  postCompanionMessage?.({type:'hub.companion.focus',focus:{active:false}});
  postCompanionMiniMessage?.({type:'hub.companion.focus',focus:{active:false}});
  renderFocusSessionCard(); renderTasks?.(); toast('LOCK IN cancelled','warn');
}
function completeFocusSession(source='manual'){
  const s=activeFocusSession(); if(!s) return false;
  const completedAt=Date.now();
  const hist=loadFocusHistory(); hist.push(Object.assign({},s,{status:'completed',completedAt,source})); saveFocusHistory(hist);
  saveActiveFocusSession(null);
  postCompanionMessage?.({type:'hub.companion.focus',focus:{active:false}});
  postCompanionMiniMessage?.({type:'hub.companion.focus',focus:{active:false}});
  logHubActivity?.('focus_session_completed',{label:`Completed LOCK IN: ${s.taskTitle||'General LOCK IN'} (${s.durationMin}m)`,points:5,onceKey:'focus:'+s.id,meta:{taskId:s.taskId||'',durationMin:s.durationMin,source}});
  renderFocusSessionCard(); renderActivityHeatmap?.(); renderTasks?.(); toast('🎯 LOCK IN completed','success');
  return true;
}
function renderFocusSessionCard(){
  const card=$('#focusSessionCard'), body=$('#focusSessionBody'), state=$('#focusSessionState');
  if(!card || !body) return;
  const s=activeFocusSession();
  const openTasks=(typeof TASKS!=='undefined' ? TASKS : []).filter(t=>t.status!=='done').slice().sort((a,b)=>(a.due||'9999').localeCompare(b.due||'9999'));
  if(!s){
    if(state) state.textContent='Idle';
    const rec = typeof getCircadianFocusRecommendation === 'function'
      ? getCircadianFocusRecommendation()
      : { tier:'steady', durationMin:25, label:'25m Steady Sprint', reason:'Moderate focus block recommended.', suggestedSubjects:'General Work' };
    const defaultMin=Number(focusSettings().durationMin)||rec.durationMin||25;
    const defaultHours=Math.floor(defaultMin/60), defaultMinutes=defaultMin%60;
    body.innerHTML=`<div class="focus-idle">
      <div class="focus-biometric-rec ${escAttr(rec.tier||'steady')}">
        <div class="focus-biometric-head">
          <span class="focus-biometric-icon">${rec.tier==='peak'?'⚡':rec.tier==='steady'?'🎯':'🌙'}</span>
          <div class="focus-biometric-title">
            <b>Biometric Suggestion: ${esc(rec.label)}</b>
            <small>${rec.tier==='peak'?'🔥 Peak Stimulation':rec.tier==='steady'?'⚡ Steady Energy':'🌙 Winding Down'}</small>
          </div>
          <span class="focus-biometric-badge ${escAttr(rec.tier||'steady')}">${rec.durationMin}m</span>
        </div>
        <p class="focus-biometric-reason">${esc(rec.reason)}</p>
        <div class="focus-biometric-footer">
          <span>🏛️ <b>Best for:</b> ${esc(rec.suggestedSubjects)}</span>
          <button class="btn sm" id="applyBiometricBtn" type="button">Apply ${rec.durationMin}m</button>
        </div>
      </div>
      <p>Pick a task or start a LOCK IN block. Completion logs activity points.</p>
      <div class="focus-controls">
        <select id="focusTaskSelect"><option value="">General LOCK IN</option>${openTasks.map(t=>`<option value="${escAttr(t.id)}">${esc(t.title)}${t.due?' · '+esc(t.due):''}</option>`).join('')}</select>
        <div class="focus-duration-pair">
          <label class="focus-duration-field"><span>Hours</span><input id="focusHoursInput" type="number" min="0" max="8" step="1" value="${defaultHours}" inputmode="numeric"></label>
          <label class="focus-duration-field"><span>Minutes</span><input id="focusMinutesInput" type="number" min="0" max="59" step="1" value="${defaultMinutes||25}" inputmode="numeric"></label>
        </div>
        <button class="btn sm primary" id="focusStartBtn" type="button">Start LOCK IN</button>
      </div>
      <div class="focus-presets">
        <button type="button" data-focus-min="15">15m (Recall)</button>
        <button type="button" data-focus-min="25">25m (Sprint)</button>
        <button type="button" data-focus-min="50">50m (Deep)</button>
        <button type="button" data-focus-min="90">1h 30m</button>
        <button type="button" data-focus-min="120">2h</button>
      </div>
    </div>`;
    function setFocusDurationInputs(total){ total=Math.max(1, Math.min(480, Number(total)||25)); const h=Math.floor(total/60), m=total%60; if($('#focusHoursInput')) $('#focusHoursInput').value=String(h); if($('#focusMinutesInput')) $('#focusMinutesInput').value=String(m); }
    function readFocusDurationInputs(){ const h=Math.max(0, Number($('#focusHoursInput')?.value)||0); const m=Math.max(0, Number($('#focusMinutesInput')?.value)||0); return Math.max(1, Math.min(480, Math.round(h*60+m))); }
    $$('#focusSessionBody [data-focus-min]').forEach(btn=>btn.onclick=()=>setFocusDurationInputs(btn.dataset.focusMin));
    $('#applyBiometricBtn')?.addEventListener('click',()=>{ setFocusDurationInputs(rec.durationMin); toast(`Applied ${rec.durationMin}m biometric duration`,'info'); });
    $('#focusStartBtn')?.addEventListener('click',()=>{ const mins=readFocusDurationInputs(); const fs=focusSettings(); fs.durationMin=mins; saveFocusSettings(fs); startFocusSession($('#focusTaskSelect')?.value||'', mins); },{once:true});
    return;
  }
  const remaining=Number(s.endTime)-Date.now();
  if(remaining<=0){ completeFocusSession('timer'); return; }
  if(state) state.textContent='Running';
  body.innerHTML=`<div class="focus-active">
    <div class="focus-dotmatrix-pulse">
      <div class="dotm-cell active"></div><div class="dotm-cell active"></div><div class="dotm-cell active"></div>
      <div class="dotm-cell"></div><div class="dotm-cell active pulse"></div><div class="dotm-cell"></div>
      <div class="dotm-cell active"></div><div class="dotm-cell active"></div><div class="dotm-cell active"></div>
    </div>
    <div class="focus-timer">${esc(formatFocusRemaining(remaining))}</div>
    <div class="focus-title">${esc(s.taskTitle||'General LOCK IN')}</div>
    <div class="focus-progress"><i style="width:${focusElapsedPercent(s)}%"></i></div>
    <div class="focus-meta"><span>${esc(s.durationMin)}m session</span><span>Ends ${esc(new Date(Number(s.endTime)).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}))}</span></div>
    <div class="focus-actions"><button class="btn sm primary" id="focusCompleteBtn" type="button">Complete LOCK IN</button><button class="btn sm" id="focusCancelBtn" type="button">Cancel</button></div>
  </div>`;
  $('#focusCompleteBtn')?.addEventListener('click',()=>completeFocusSession('manual'),{once:true});
  $('#focusCancelBtn')?.addEventListener('click',()=>cancelFocusSession('manual'),{once:true});
}
window.startFocusSession=startFocusSession;
window.cancelFocusSession=cancelFocusSession;
window.completeFocusSession=completeFocusSession;
window.renderFocusSessionCard=renderFocusSessionCard;
window.activeFocusSession=activeFocusSession;
if(!window.FOCUS_SESSION_TIMER){ window.FOCUS_SESSION_TIMER=setInterval(()=>{ if(activeFocusSession?.()) renderFocusSessionCard?.(); }, 1000); }

function renderTodayDashboard() {
  const tdyDateStr = $('#tdyDateStr');
  if (tdyDateStr) {
    tdyDateStr.textContent = new Date().toLocaleDateString(undefined, { weekday:'long', month:'short', day:'numeric' });
  }

  const vLock = $('#tdyVaultLock');
  if (vLock && typeof VAULT_UNLOCKED !== 'undefined') {
    vLock.textContent = VAULT_UNLOCKED ? '🔓 Vault Unlocked' : '🔐 Vault Locked';
    vLock.className = 'today-vault-pill ' + (VAULT_UNLOCKED ? 'ok' : 'locked');
  }

  // 1. Next Up (Schedule / Upcoming Calendar Events)
  const tdySchedule = $('#tdySchedule');
  if (tdySchedule && typeof EVENTS !== 'undefined') {
    const upcoming = getAllEvents().filter(e => e.date >= todayStr()).sort((a,b) => {
       if (a.date !== b.date) return a.date.localeCompare(b.date);
       return (a.time||'23:59').localeCompare(b.time||'23:59');
    }).slice(0, 5);

    if (upcoming.length === 0) {
       tdySchedule.innerHTML = '<div class="feature-empty compact">Nothing scheduled. Add an event or deadline to build your day.</div>';
    } else {
       tdySchedule.innerHTML = upcoming.map(e => {
          const isToday = e.date === todayStr();
          const isPast = e.date < todayStr();
          const label = isToday ? (e.time ? `Today · ${esc(e.time)}` : 'Today') : e.date;
          return `<div class="today-list-item ${isToday?'hot':''} ${isPast?'past':''}" onclick="activatePage('cal'); openEvent('${escAttr(e.id)}');">
             <div class="today-item-icon" style="--item-color:${safeColor(e.color||'#ff6b6b')}">${e.type==='deadline'?'🚩':'📌'}</div>
             <div class="today-item-main">
               <div class="today-item-title">${esc(e.title)}</div>
               <div class="today-item-sub">${esc(label)}${e.priority==='high'?' · High priority':''}${e.recur?' · repeats '+esc(e.recur):''}</div>
             </div>
             <span class="feature-badge ${isToday?'danger':'muted'}">${isToday?'Due today':esc(e.type||'event')}</span>
          </div>`;
       }).join('');
    }
  }

  // 2. Urgent Tasks
  const tdyTasks = $('#tdyTasks');
  if (tdyTasks && typeof TASKS !== 'undefined') {
    const prioMap = { high: 3, normal: 2, low: 1 };
    const urgent = TASKS.filter(t => t.status !== 'done').sort((a,b) => {
      if (a.due && b.due && a.due !== b.due) return a.due.localeCompare(b.due);
      if (a.due && !b.due) return -1;
      if (!a.due && b.due) return 1;
      return (prioMap[b.priority] || 0) - (prioMap[a.priority] || 0);
    }).slice(0, 5);

    if (urgent.length === 0) {
       tdyTasks.innerHTML = '<div class="feature-empty compact">No urgent open tasks. Enjoy the clear lane.</div>';
    } else {
       tdyTasks.innerHTML = urgent.map(t => {
          const overdue = t.due && t.due < todayStr();
          return `<div class="today-task-card ${t.priority==='high'?'priority-high':''}" onclick="activatePage('tasks');">
             <div class="today-task-top">
               <div class="today-item-title">${esc(t.title)}</div>
               <span class="feature-badge ${t.status==='in_progress'?'accent':'muted'}">${t.status === 'in_progress' ? 'In progress' : 'To do'}</span>
             </div>
             <div class="today-task-meta">
                ${t.due ? `<span class="${overdue?'danger':''}">📅 ${esc(t.due)}${overdue?' · overdue':''}</span>` : '<span>No due date</span>'}
                ${t.priority === 'high' ? '<span class="danger">🔥 High</span>' : `<span>${esc(t.priority||'normal')}</span>`}
                ${t.project && t.project !== 'General' ? `<span>${esc(t.project)}</span>` : ''}
             </div>
          </div>`;
       }).join('');
    }
  }

  // 3. Intake & Sleep Readiness
  const tdyIntake = $('#tdyIntake');
  if (tdyIntake && typeof activeCaffeine !== 'undefined') {
    const active = activeCaffeine();
    const ready = active <= SLEEP_THRESHOLD;
    const clear = caffeineBelowAt(LOG, SLEEP_THRESHOLD);
    const totals = dayTotals(todayStr());
    const activeSugarNow = typeof activeSugar === 'function' ? activeSugar() : 0;
    const limits = typeof personalIntakeLimits==='function' ? personalIntakeLimits() : {cafDaily:400,sugarRecommended:50,sugarUpper:50,personalized:false};
    const bedtimeData = typeof calculateBedtimeCaffeine === 'function' ? calculateBedtimeCaffeine() : null;
    const cutoffData = typeof safeCaffeineCutoff === 'function' ? safeCaffeineCutoff() : null;
    const circRec = typeof getCircadianFocusRecommendation === 'function' ? getCircadianFocusRecommendation() : null;

    let warningBadgeHtml = '';
    if (bedtimeData && bedtimeData.projectedMg > 25) {
      warningBadgeHtml = `
        <div class="today-sleep-warning ${bedtimeData.warningLevel}">
          <span>⚠️ <b>Bedtime Advisory:</b> ~${bedtimeData.projectedMg.toFixed(0)}mg projected at ${esc(bedtimeData.bedtimeStr)} bedtime. ${esc(bedtimeData.sleepImpactSummary)}</span>
        </div>`;
    }

    tdyIntake.innerHTML = `
       ${warningBadgeHtml}
       <div class="today-metric-row">
          <div><span>Active Caffeine</span><b>${active.toFixed(0)} mg</b></div>
          <div class="mini-meter"><i style="width:${Math.min(100, Math.round(active/(limits.cafDaily||400)*100))}%; background:${active > SLEEP_THRESHOLD ? 'var(--warn)' : 'var(--good)'}"></i></div>
       </div>
       <div class="today-metric-row">
          <div><span>Sleep Readiness</span><b style="color:${ready ? 'var(--good)' : 'var(--danger)'}">${ready ? 'Ready 🌙' : 'Not ready'}</b></div>
          <small>${ready ? 'Below your threshold now.' : `Below ${SLEEP_THRESHOLD}mg around ${clear?fmtClock(clear):'later than 72h'}.`}</small>
       </div>
       ${cutoffData ? `
       <div class="today-metric-row compact">
          <div><span>Safe Caffeine Cutoff</span><b style="color:${cutoffData.isPastCutoff ? 'var(--danger)' : 'var(--txt)'}">${esc(cutoffData.cutoffTimeStr)} ${cutoffData.isPastCutoff ? '(Past Cutoff)' : ''}</b></div>
          <small>${cutoffData.isPastCutoff ? '⚠️ Current intake elevates bedtime residual > 25mg.' : `Standard coffee before ${esc(cutoffData.cutoffTimeStr)} clears by ${esc(cutoffData.bedtimeStr)}.`}</small>
       </div>` : ''}
       ${circRec ? `
       <div class="today-metric-row compact">
          <div><span>Circadian Energy Tier</span><b style="color:var(--acc)">${esc(circRec.label)}</b></div>
          <small>${esc(circRec.reason)}</small>
       </div>` : ''}
       <div class="today-metric-row compact">
          <div><span>Today intake</span><b>${totals.caf.toFixed(0)}/${limits.cafDaily}mg caf · ${activeSugarNow.toFixed(1)}g active sugar</b></div>
          <small>${totals.sug.toFixed(1)}g consumed today · sugar uses a ${typeof HALF_LIFE_SUG_H!=='undefined'?HALF_LIFE_SUG_H:2}h decay model${limits.personalized?' · personalized guide active':''}.</small>
       </div>
    `;
  }

  // 4. Proactive Agent
  const agentBox = $('#tdyAgent');
  if (agentBox && typeof window.CHAT !== 'undefined') {
     const pendingMsgs = window.CHAT.filter(m => m.role === 'bot' && m.pending);
     if (pendingMsgs.length > 0) {
        const m = pendingMsgs[pendingMsgs.length - 1];
        agentBox.innerHTML = `
          <div class="today-agent-card">
            <div class="feature-card-head"><span>✨ Marciale's Proactive Suggestions</span><small>${m.actions?.length||0} action${(m.actions?.length||0)===1?'':'s'}</small></div>
            <div class="today-agent-text">${esc(m.text)}</div>
            ${(m.actions||[]).map((a, actIdx) => `
              <div class="action-preview-card">
                <b>⚙️ ${esc(a.tool)}</b>
                <div class="action-args-grid">
                ${Object.keys(a.args||{}).map(k => `
                  <label><span>${esc(k)}</span><input type="text" value="${escAttr(a.args[k])}" onchange="editActionArg(${m._i}, ${actIdx}, '${escAttr(k)}', this.value)"></label>
                `).join('')}
                </div>
              </div>
            `).join('')}
            <div class="feature-actions">
               <button class="btn sm primary" onclick="approveActions(${m._i}); renderTodayDashboard();">✅ Approve & Run</button>
               <button class="btn sm" onclick="rejectActions(${m._i}); renderTodayDashboard();">Dismiss</button>
            </div>
          </div>
        `;
     } else {
        agentBox.innerHTML = `<button class="btn today-agent-button" onclick="runAutonomousAgent(this)">🧠 Analyze My Day <span>Get proactive suggestions from Marciale</span></button>`;
     }
  }
  maybeRunScheduledAutopilot();
  renderMarcialeAutopilotCard();
  renderProfessionalAlerts();
  renderMarcialeStrategicScan();
  renderInstructorMode();
  renderCompanionCard?.();
  renderCouncilObserverCard();
  renderActivityHeatmap();
  renderFocusSessionCard();
  renderPresenceCard?.();
} // close renderTodayDashboard

/* ===========================================================
   BUILD 47: HIGH COUNCIL OBSERVER & LIVENESS STATUS CARD
   Babysitter-Observer Pattern for Real-Time Multi-Agent Health
   =========================================================== */
function renderCouncilObserverCard() {
  const card = $('#councilObserverCard');
  const body = $('#councilObserverBody');
  const badge = $('#councilHealthBadge');
  if (!card || !body) return;

  const currentSeat = 'Seat A: ASSISTANT';
  const recentDispatches = [
    { id: '009', title: 'Master Proposal Plan V9.0 Ratified', status: 'Ratified' },
    { id: '008', title: 'High Council Triple Mandate Enacted', status: 'Enacted' },
    { id: '007', title: 'Design-MD & 8 Benchmarks Intelligence', status: 'Delivered' }
  ];

  if (badge) {
    badge.textContent = '🟢 SEV-0 Nominal';
  }

  body.innerHTML = `
    <div style="font-size:12px; color:var(--txt); display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid var(--line);">
      <span><b>Active Watch:</b> ${esc(currentSeat)}</span>
      <span style="font-size:11px; color:var(--mut);">Continuous Watch CASD</span>
    </div>
    <div style="font-size:11px; color:var(--mut); display:flex; gap:10px; margin-top:6px;">
      <span>⚖️ 14 Laws</span>
      <span>📜 10 Commandments</span>
      <span>📖 22 Scenarios</span>
      <span>🛡️ 43 Suites Green</span>
    </div>
    <div style="display:flex; flex-direction:column; gap:4px; margin-top:8px;">
      <span style="font-size:10.5px; font-weight:800; color:var(--mut); text-transform:uppercase; letter-spacing:0.04em;">Recent Council Dispatches:</span>
      ${recentDispatches.map(d => `
        <div style="font-size:11.5px; display:flex; justify-content:space-between; padding:4px 6px; background:var(--bg); border-radius:6px; border:1px solid var(--line);">
          <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:210px;"><b>[#${esc(d.id)}]</b> ${esc(d.title)}</span>
          <span style="color:var(--good); font-size:10.5px; font-weight:700;">${esc(d.status)}</span>
        </div>
      `).join('')}
    </div>
  `;
}
window.renderCouncilObserverCard = renderCouncilObserverCard;


// Wire Marciale Input
$('#tdyAiInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
     e.preventDefault();
     const val = e.target.value.trim();
     if (!val) return;
     activatePage('ai');
     const ta = $('#aiText');
     if (ta) {
       ta.value = val;
       sendChat();
     }
     e.target.value = '';
  }
});

// Hook into other renders
const oldRenderDashWidgets = window.renderDashWidgets;
window.renderDashWidgets = function() {
  if(typeof oldRenderDashWidgets === 'function') oldRenderDashWidgets();
  renderTodayDashboard();
}

// Hook into calendar & task & tracker renders so the dashboard stays fresh
const trRenderCalendar = window.renderCalendar;
window.renderCalendar = function() {
  if(typeof trRenderCalendar === 'function') trRenderCalendar();
  renderTodayDashboard();
}

const trRenderTasks = window.renderTasks;
window.renderTasks = function() {
  if(typeof trRenderTasks === 'function') trRenderTasks();
  renderTodayDashboard();
}

const trRenderTracker = window.renderTracker;
window.renderTracker = function() {
  if(typeof trRenderTracker === 'function') trRenderTracker();
  renderTodayDashboard();
}


/* ===========================================================
   BUILD 31 — Presence Integration
   =========================================================== */
function renderRuViewPage(){
  // Build 33.1: Simplified — iframe handles its own rendering.
  // This function only renders the collapsible automation/settings panels.
  const ruviewPage = document.getElementById('page-ruview');
  if(ruviewPage && !ruviewPage.classList.contains('active')) return;
  
  // Build 33.3.2 HOTFIX: Declare bridge state variables at function scope
  // so they are available to both the disabled Build 32 block and the
  // active Browser Presence Fallback section below.
  const bridgeConnected = typeof window.ruviewIsConnected === 'function'
    ? window.ruviewIsConnected()
    : false;
  const stats = typeof window.ruviewStats === 'function'
    ? window.ruviewStats()
    : {};
  const reading = typeof window.ruviewLatestReading === 'function'
    ? window.ruviewLatestReading()
    : null;

  // Build 33.1: Iframe handles all sensing visualization.
  // Only render automation panels, browser presence, and transition history below.

  // Build 33.1: Removed old Build 32 dashboard panels — iframe handles all sensing visualization.
  // The following sections (automation, presence fallback, history) remain.

  // === BUILD 31: Browser Presence Fallback ===
  const _removed_sensingEl = null;
  if(false){ /* old Build 32 code removed */
  const stats = typeof ruviewStats === 'function' ? ruviewStats() : {};
  const reading = typeof ruviewLatestReading === 'function' ? ruviewLatestReading() : null;

  // Banner
  if(bannerBadge){
    if(bridgeConnected){
      bannerBadge.textContent = 'Live';
      bannerBadge.className = 'ruview-badge ruview-badge-live';
      if(bannerTitle) bannerTitle.textContent = 'RuView bridge connected — WiFi sensing active';
      if(bannerSub) bannerSub.textContent = 'Source: ' + (stats.source || 'unknown') + ' · ' + (stats.messagesReceived || 0) + ' updates received';
      if(bannerIcon) bannerIcon.textContent = '📡';
    } else {
      bannerBadge.textContent = 'Offline';
      bannerBadge.className = 'ruview-badge ruview-badge-offline';
      if(bannerTitle) bannerTitle.textContent = 'RuView bridge idle';
      if(bannerSub) bannerSub.textContent = stats.url ? 'Target: ' + stats.url + ' — click Connect to start.' : 'Enable in Hub Control → Experimental Systems, then click Connect.';
      if(bannerIcon) bannerIcon.textContent = '📡';
    }
  }

  // Sensing status
  if(sensingEl){
    if(!bridgeConnected){
      sensingEl.innerHTML = '<span style="color:var(--mut)">Not connected. Click <b>Connect</b> above to start the WebSocket bridge.</span>';
    } else if(reading){
      const motionColors = {still:'#6c8cff', seated:'#3ecf8e', moving:'#ffb454', active:'#ff6b6b'};
      const motionColor = motionColors[reading.motion] || 'var(--mut)';
      sensingEl.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <div><span style="color:var(--mut);font-size:12px">Presence</span><br><b style="color:${reading.presence ? 'var(--good)' : 'var(--danger)'}">${reading.presence ? '✅ Detected' : '❌ Not detected'}</b></div>
          <div><span style="color:var(--mut);font-size:12px">Motion</span><br><b style="color:${motionColor}">${reading.motion || 'unknown'}</b></div>
          <div><span style="color:var(--mut);font-size:12px">Confidence</span><br><b>${((reading.confidence||0)*100).toFixed(0)}%</b></div>
          <div><span style="color:var(--mut);font-size:12px">Signal (RSSI)</span><br><b>${reading.rssi ? reading.rssi.toFixed(1) + ' dBm' : 'n/a'}</b></div>
        </div>`;
    } else {
      sensingEl.innerHTML = '<span style="color:var(--warn)">Connected — awaiting first sensing update…</span>';
    }
  }

  if(sensingDetail && bridgeConnected && stats){
    sensingDetail.innerHTML = `
      <div>Source: <b>${stats.source || 'unknown'}</b></div>
      <div>Messages received: <b>${stats.messagesReceived || 0}</b></div>
      <div>Node ID: <b>${stats.lastNodeId || 'n/a'}</b></div>
      <div>Reconnects: <b>${stats.reconnectCount || 0}</b> · Errors: <b>${stats.errorCount || 0}</b></div>
    `;
  }

  // Signal field visualization
  if(signalEl){
    if(reading && reading.signalField){
      renderSignalField?.(signalEl, reading);
    } else if(bridgeConnected){
      signalEl.innerHTML = '<div style="color:var(--mut);font-size:13px;text-align:center;padding:20px 0">Signal field data not available from this source.</div>';
    } else {
      signalEl.innerHTML = '<div style="color:var(--mut);font-size:13px;text-align:center;padding:20px 0">Connect to RuView to see the WiFi signal field.</div>';
    }
  }

  // Motion chart
  if(motionEl){
    if(typeof ruviewDataWindow === 'function' && ruviewDataWindow().length > 0){
      renderMotionChart?.(motionEl);
    } else {
      motionEl.innerHTML = '<div style="color:var(--mut);font-size:13px;text-align:center;padding:20px 0">' + (bridgeConnected ? 'Collecting motion data…' : 'Connect to RuView to see motion history.') + '</div>';
    }
  }

  // Vitals
  if(vitalsEl){
    if(reading && reading.breathingBpm){
      vitalsEl.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div style="padding:12px;border:1px solid var(--line);border-radius:8px;text-align:center">
            <div style="font-size:24px;font-weight:900;color:var(--good)">${reading.breathingBpm}</div>
            <div style="font-size:11px;color:var(--mut);text-transform:uppercase">Breathing BPM</div>
          </div>
          <div style="padding:12px;border:1px solid var(--line);border-radius:8px;text-align:center">
            <div style="font-size:24px;font-weight:900;color:var(--mut)">—</div>
            <div style="font-size:11px;color:var(--mut);text-transform:uppercase">Heart Rate BPM</div>
          </div>
        </div>
        <div style="font-size:12px;color:var(--mut);margin-top:10px;line-height:1.5">
          Breathing rate extracted from WiFi CSI bandpower (0.1–0.5 Hz). Heart rate requires extended signal processing.
        </div>`;
    } else {
      vitalsEl.innerHTML = 'Vitals require a connected ESP32 CSI sensor.<br>Breathing rate and heart rate are extracted from WiFi signal disturbances.';
    }
  }

  // Connection stats
  if(connStatsEl && stats){
    const lastConn = stats.lastConnectedAt ? new Date(stats.lastConnectedAt).toLocaleString([], {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}) : 'Never';
    const lastDisc = stats.lastDisconnectedAt ? new Date(stats.lastDisconnectedAt).toLocaleString([], {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}) : 'Never';
    connStatsEl.innerHTML = `
      <div>URL: <b>${stats.url || 'n/a'}</b></div>
      <div>Connected: <b>${bridgeConnected ? '🟢 Yes' : '🔴 No'}</b></div>
      <div>First connected: <b>${lastConn}</b></div>
      <div>Last connected: <b>${lastConn}</b></div>
      <div>Last disconnected: <b>${lastDisc}</b></div>
      <div>Total messages: <b>${stats.messagesReceived || 0}</b></div>
      <div>Reconnect attempts: <b>${stats.reconnectCount || 0}</b></div>
      <div>Errors: <b>${stats.errorCount || 0}</b>${stats.lastError ? '<br><span style="font-size:11px">' + stats.lastError + '</span>' : ''}</div>
    `;
  }
  } // end if(false) — old Build 32 panels removed

  // === BUILD 31: Browser Presence Fallback ===
  const statusEl = document.getElementById('ruviewPresenceStatus');
  const detailEl = document.getElementById('ruviewPresenceDetail');
  const historyEl = document.getElementById('ruviewHistory');

  if(statusEl && typeof presenceSummary === 'function'){
    const summary = presenceSummary();
    const enabled = typeof experimentalEnabled === 'function' ? experimentalEnabled('presence') : false;
    if(!enabled){
      statusEl.innerHTML = '<b>Browser presence is disabled.</b><br><span style="color:var(--mut)">Enable in Hub Control → Experimental Systems.</span>';
    } else {
      const override = bridgeConnected ? ' <span style="color:var(--acc)">(RuView hardware active)</span>' : '';
      statusEl.innerHTML = summary + override;
    }
  }

  if(detailEl && typeof presenceState === 'function'){
    const state = presenceState();
    const s = typeof presenceSettings === 'function' ? presenceSettings() : {};
    detailEl.innerHTML = `
      <div>Session started: <b>${new Date(state.sessionStart || Date.now()).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</b></div>
      <div>Idle threshold: <b>${s.idleTimeoutSec || 300}s</b> · Away threshold: <b>${s.awayTimeoutSec || 900}s</b></div>
      <div>Input tracking: <b>${s.trackInput !== false ? '✅' : '❌'}</b> · Visibility tracking: <b>${s.trackVisibility !== false ? '✅' : '❌'}</b></div>
      <div>Vault auto-lock: <b>${s.awayLockVault ? '✅' : '❌'}</b> · Focus pause: <b>${s.awayPauseFocus ? '✅' : '❌'}</b></div>
    `;
  }

  if(historyEl && typeof presenceHistory === 'function'){
    const history = presenceHistory(20);
    if(!history.length){
      historyEl.innerHTML = '<div style="color:var(--mut);font-size:13px;padding:12px;text-align:center">No transitions recorded yet.</div>';
    } else {
      historyEl.innerHTML = history.slice().reverse().map(h => {
        const when = new Date(h.ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        const icon = {away:'🚶', present:'🏠', idle:'💤'}[h.to] || '•';
        return `<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border:1px solid var(--line);border-radius:8px;font-size:12px">
          <span style="font-size:16px">${icon}</span>
          <span style="font-weight:600;min-width:50px">${h.to}</span>
          <span style="color:var(--mut)">from ${h.from}</span>
          <span style="margin-left:auto;color:var(--mut)">${when}</span>
        </div>`;
      }).join('');
    }
  }

  // === BUILD 33: Automation Rules ===
  const rulesEl = document.getElementById('ruviewAutomationRules');
  const autoLogEl = document.getElementById('ruviewAutomationLog');

  if(rulesEl && typeof automationRules === 'function'){
    const rules = automationRules();
    const triggerDefs = typeof automationTriggerDefs === 'function' ? automationTriggerDefs() : {};
    if(!rules.length){
      rulesEl.innerHTML = '<div style="color:var(--mut);font-size:13px;padding:12px;text-align:center">No automation rules configured.</div>';
    } else {
      rulesEl.innerHTML = rules.map(function(r){
        const trigger = triggerDefs[r.trigger] || { icon: '•', label: r.trigger };
        const actionsHtml = (r.actions || []).map(function(a){
          const actionDefs = typeof automationActionDefs === 'function' ? automationActionDefs() : {};
          const ad = actionDefs[a.type] || { icon: '•', label: a.type };
          return '<span style="font-size:11px;padding:2px 6px;border:1px solid var(--line);border-radius:6px;background:var(--bg)">' + ad.icon + ' ' + esc(ad.label) + '</span>';
        }).join(' ');
        return '<div style="display:flex;align-items:center;gap:10px;padding:10px;border:1px solid ' + (r.enabled ? 'var(--line)' : 'color-mix(in srgb, var(--line) 50%, transparent)') + ';border-radius:8px;background:' + (r.enabled ? 'var(--bg)' : 'transparent') + ';opacity:' + (r.enabled ? '1' : '0.5') + '">' +
          '<input type="checkbox" data-automation-toggle="' + escAttr(r.id) + '" ' + (r.enabled ? 'checked' : '') + ' style="accent-color:var(--acc);cursor:pointer">' +
          '<span style="font-size:18px">' + trigger.icon + '</span>' +
          '<div style="flex:1;min-width:0">' +
            '<div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(r.name) + (r.builtIn ? ' <span style="font-size:10px;color:var(--mut)">built-in</span>' : '') + '</div>' +
            '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:4px">' + actionsHtml + '</div>' +
          '</div>' +
          (!r.builtIn ? '<button class="btn sm" data-automation-remove="' + escAttr(r.id) + '" title="Remove" style="padding:4px 8px;min-height:0;color:var(--danger)">×</button>' : '') +
        '</div>';
      }).join('');

      // Wire toggles
      rulesEl.querySelectorAll('[data-automation-toggle]').forEach(function(chk){
        chk.addEventListener('change', function(){
          if(typeof toggleAutomationRule === 'function') toggleAutomationRule(chk.dataset.automationToggle);
          renderRuViewPage();
        });
      });
      // Wire remove buttons
      rulesEl.querySelectorAll('[data-automation-remove]').forEach(function(btn){
        btn.addEventListener('click', function(){
          if(!confirm('Remove this automation rule?')) return;
          if(typeof removeAutomationRule === 'function') removeAutomationRule(btn.dataset.automationRemove);
          renderRuViewPage();
        });
      });
    }
  }

  if(autoLogEl && typeof automationLog === 'function'){
    const log = automationLog(15);
    if(!log.length){
      autoLogEl.innerHTML = '<div style="color:var(--mut);font-size:13px;padding:12px;text-align:center">No automation executions yet.</div>';
    } else {
      autoLogEl.innerHTML = log.slice().reverse().map(function(e){
        const when = new Date(e.ts).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        const icon = e.allOk ? '✅' : '⚠️';
        return '<div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border:1px solid var(--line);border-radius:8px;font-size:12px">' +
          '<span>' + icon + '</span>' +
          '<span style="font-weight:600">' + esc(e.ruleName || 'Rule') + '</span>' +
          '<span style="color:var(--mut)">' + esc(e.transition || '') + '</span>' +
          '<span style="margin-left:auto;color:var(--mut)">' + when + '</span>' +
        '</div>';
      }).join('');
    }
  }

  // Sync UI controls
  if(typeof ruviewSyncUI === 'function') ruviewSyncUI();
  if(typeof syncPresenceSettingsUI === 'function') syncPresenceSettingsUI();
}

// Wire RuView page rendering when activated
// Build 33.1: Lazy-load iframe only when tab is active, suspend on leave
const _origActivatePage = window.activatePage;
let _ruviewLastPage = null;
window.activatePage = function(page){
  const result = _origActivatePage ? _origActivatePage(page) : undefined;
  
  if(page === 'ruview'){
    // Build 33.1: Initialize iframe on first visit, resume if suspended
    if(typeof initRuViewFrame === 'function') initRuViewFrame();
    if(typeof resumeRuViewFrame === 'function' && window._ruviewSuspended){
      resumeRuViewFrame();
      window._ruviewSuspended = false;
      const suspBtn = document.getElementById('ruviewSuspendBtn');
      if(suspBtn) suspBtn.textContent = '⏸ Suspend';
    }
    // Build 33.2: Sync performance mode UI
    if(typeof isRuViewPerformanceMode === 'function'){
      const btn = document.getElementById('ruviewPerfModeBtn');
      if(btn) btn.textContent = isRuViewPerformanceMode() ? '2D Mode' : '3D Mode';
      const hubCtrl = document.getElementById('ruviewPerfModeHubCtrl');
      if(hubCtrl) hubCtrl.checked = isRuViewPerformanceMode();
    }
    renderRuViewPage();
  } else if(_ruviewLastPage === 'ruview' && page !== 'ruview'){
    // Build 33.2 ready: Suspend iframe when leaving tab to free GPU
    if(typeof suspendRuViewFrame === 'function'){
      suspendRuViewFrame();
      window._ruviewSuspended = true;
    }
  }
  
  _ruviewLastPage = page;
  return result;
};

// Wire presence & ruview buttons on RuView page
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('presenceSaveSettings')?.addEventListener('click', () => {
    if(typeof readPresenceSettingsUI === 'function') readPresenceSettingsUI();
    renderRuViewPage();
  });
  document.getElementById('presenceResetSettings')?.addEventListener('click', () => {
    if(!confirm('Reset presence settings to defaults?')) return;
    if(typeof savePresenceSettings === 'function'){
      savePresenceSettings({
        idleTimeoutSec: 300,
        awayTimeoutSec: 900,
        trackInput: true,
        trackVisibility: true,
        awayLockVault: false,
        awayPauseFocus: false,
        welcomeBackSummary: true,
        enabled: typeof experimentalEnabled === 'function' ? experimentalEnabled('presence') : false,
        showOnToday: false
      });
    }
    if(typeof syncPresenceSettingsUI === 'function') syncPresenceSettingsUI();
    renderRuViewPage();
    if(typeof toast === 'function') toast('Presence settings reset', 'info');
  });

  // Build 33.1: RuView toolbar controls
  document.getElementById('ruviewPerfModeBtn')?.addEventListener('click', () => {
    if(typeof toggleRuViewPerformanceMode === 'function') toggleRuViewPerformanceMode();
    // Sync Hub Control toggle
    const hubCtrl = document.getElementById('ruviewPerfModeHubCtrl');
    if(hubCtrl && typeof isRuViewPerformanceMode === 'function') hubCtrl.checked = isRuViewPerformanceMode();
  });
  document.getElementById('ruviewPerfModeHubCtrl')?.addEventListener('change', (e) => {
    if(typeof setRuViewPerformanceMode === 'function') setRuViewPerformanceMode(e.target.checked);
    const btn = document.getElementById('ruviewPerfModeBtn');
    if(btn) btn.textContent = e.target.checked ? '2D Mode' : '3D Mode';
    if(typeof toast === 'function') toast(e.target.checked ? '2D performance mode enabled' : '3D full mode enabled', 'info');
  });
  document.getElementById('ruviewSuspendBtn')?.addEventListener('click', () => {
    if(window._ruviewSuspended){
      if(typeof resumeRuViewFrame === 'function') resumeRuViewFrame();
      window._ruviewSuspended = false;
      document.getElementById('ruviewSuspendBtn').textContent = '⏸ Suspend';
      if(typeof toast === 'function') toast('RuView feed resumed', 'info');
    } else {
      if(typeof suspendRuViewFrame === 'function') suspendRuViewFrame();
      window._ruviewSuspended = true;
      document.getElementById('ruviewSuspendBtn').textContent = '▶ Resume';
      if(typeof toast === 'function') toast('RuView feed suspended', 'info');
    }
  });
  document.getElementById('ruviewReloadFrameBtn')?.addEventListener('click', () => {
    if(typeof embedRuViewUI === 'function') embedRuViewUI();
    if(typeof toast === 'function') toast('RuView reloading…', 'info');
  });
  document.getElementById('ruviewCheckHealthBtn2')?.addEventListener('click', () => {
    if(typeof checkRuViewHealth === 'function'){
      checkRuViewHealth(true).then(function(status){
        if(status === 'ok'){
          if(typeof toast === 'function') toast('✅ RuView is online!', 'success');
          embedRuViewUI?.();
        } else {
          if(typeof toast === 'function') toast('❌ RuView offline', 'warn');
          showRuViewOffline?.();
        }
      });
    }
  });

  // Build 33: Automation controls
  document.getElementById('ruviewSaveSettings')?.addEventListener('click', () => {
    if(typeof ruviewReadUI === 'function') ruviewReadUI();
    renderRuViewPage();
  });

  // Build 33: Automation controls
  document.getElementById('automationResetRules')?.addEventListener('click', () => {
    if(!confirm('Reset all automation rules to defaults? Custom rules will be removed.')) return;
    if(typeof resetAutomationRules === 'function') resetAutomationRules();
    renderRuViewPage();
    if(typeof toast === 'function') toast('Automation rules reset to defaults', 'info');
  });
  document.getElementById('automationClearLog')?.addEventListener('click', () => {
    if(typeof clearAutomationLog === 'function') clearAutomationLog();
    renderRuViewPage();
    if(typeof toast === 'function') toast('Automation log cleared', 'info');
  });
});

// Sync presence + ruview UI when RuView page is shown
// FIXED (Build 32 perf): Only observe the specific page element's class,
// not the entire DOM tree. Prevents hundreds of callbacks per second.
const _ruviewPage = document.getElementById('page-ruview');
if(_ruviewPage){
  const _ruviewObserver = new MutationObserver((mutations) => {
    // Only fire if the page-ruview element itself became active
    const isActive = _ruviewPage.classList.contains('active');
    if(isActive){
      if(typeof syncPresenceSettingsUI === 'function') syncPresenceSettingsUI();
      if(typeof ruviewSyncUI === 'function') ruviewSyncUI();
      renderRuViewPage();
    }
  });
  _ruviewObserver.observe(_ruviewPage, { attributes: true, attributeFilter: ['class'] });
}
