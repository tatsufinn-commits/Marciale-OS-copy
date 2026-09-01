/* ===========================================================
   CALENDAR + EVENTS + NOTIFICATIONS
   =========================================================== */
let EVENTS = (Array.isArray(LS.get('hub.events.v1', null)) ? LS.get('hub.events.v1', null) : [])
  .filter(e=>e&&e.title&&e.date).map(e=>({id:safeDataId(e.id),title:String(e.title),type:e.type||'event',date:String(e.date),time:String(e.time||''),notes:String(e.notes||''),remind:(e.remind!==undefined?String(e.remind):'2,0'),priority:e.priority||'normal',recur:e.recur||'',color:safeColor(e.color||'#ff6b6b','#ff6b6b'),projectId:String(e.projectId||''),project:String(e.project||''),fired:Array.isArray(e.fired)?e.fired.map(String):[]}));

let MAPUA_EVENTS = [];
let SHOW_READONLY_EVENTS = localStorage.getItem('hub.calendar.showReadonly') !== 'false';

function updateReadonlyToggleUI() {
  const btn = $('#calToggleReadonly');
  if (btn) btn.classList.toggle('active', SHOW_READONLY_EVENTS);
}
function setShowReadonlyEvents(show) {
  SHOW_READONLY_EVENTS = !!show;
  localStorage.setItem('hub.calendar.showReadonly', SHOW_READONLY_EVENTS ? 'true' : 'false');
  updateReadonlyToggleUI();
  renderCalendar();
  renderUpcoming();
}
window.setShowReadonlyEvents = setShowReadonlyEvents;
window.updateReadonlyToggleUI = updateReadonlyToggleUI;

async function fetchMapuaEvents() {
  try {
    let url = '/api/mapua';
    if(location.protocol === 'file:' || location.port === '5500') {
      url = 'http://localhost:8000/api/mapua';
    }
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.ok && data.events) {
        MAPUA_EVENTS = data.events;
        renderCalendar();
      } else {
        console.warn("Mapúa fetch returned ok but no events:", data);
      }
    } else {
      console.warn("Mapúa fetch failed with HTTP", res.status);
    }
  } catch (e) {
    if(location.protocol === 'file:' || location.port === '5500') {
      toast('Mapúa sync requires Python server. Run: python server.py');
    }
    console.warn("Could not fetch Mapúa calendar feed:", e);
  }
}
setTimeout(fetchMapuaEvents, 1000);

function addDaysStr(ds,n){ const d=parseYmd(ds); d.setDate(d.getDate()+n); return ymd(d); }
function addMonthsStr(ds,n){ const d=parseYmd(ds); d.setMonth(d.getMonth()+n); return ymd(d); }
function expandRecurringEvent(e){
  if(!e.recur) return [e];
  const out=[e]; const horizon=addDaysStr(todayStr(),365); let cur=e.date;
  for(let i=1;i<370;i++){
    cur = e.recur==='daily' ? addDaysStr(cur,1) : e.recur==='weekly' ? addDaysStr(cur,7) : e.recur==='monthly' ? addMonthsStr(cur,1) : '';
    if(!cur || cur>horizon) break;
    out.push({...e,id:e.id+'@'+cur,date:cur,recurrenceId:e.id,isOccurrence:true});
  }
  return out;
}
function getAllEvents() {
  const all = [...EVENTS.flatMap(expandRecurringEvent), ...MAPUA_EVENTS];
  return SHOW_READONLY_EVENTS ? all : all.filter(e => !e.readonly);
}
function getAllEventsIncludingReadonly() { return [...EVENTS.flatMap(expandRecurringEvent), ...MAPUA_EVENTS]; }
function baseEventId(id){ return String(id||'').split('@')[0]; }
function getEventById(id){ return getAllEventsIncludingReadonly().find(x=>x.id===id) || EVENTS.find(x=>x.id===baseEventId(id)); }

function saveEvents(){ LS.set('hub.events.v1', EVENTS); if(typeof updateSideStats==='function') updateSideStats(); if(typeof renderDashWidgets==='function') renderDashWidgets(); if(typeof renderProjectDashboard==='function') renderProjectDashboard(); }
let calView = new Date(); calView.setDate(1);
let eColor = COLORS[4];
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];

function ymd(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function parseYmd(s){ const [y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d) }
function daysBetween(a,b){ return Math.round((parseYmd(a)-parseYmd(b))/86400000) } // a - b in days

function renderCalendar(){
  $('#calMonth').textContent = MONTHS[calView.getMonth()]+' '+calView.getFullYear();
  const first=new Date(calView.getFullYear(),calView.getMonth(),1);
  const start=new Date(first); start.setDate(1-first.getDay());
  const grid=$('#calGrid'); grid.innerHTML='';
  const today=ymd(new Date());
  for(let i=0;i<42;i++){
    const d=new Date(start); d.setDate(start.getDate()+i);
    const ds=ymd(d);
    const evs=getAllEvents().filter(e=>e.date===ds).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
    const cell=document.createElement('div');
    cell.className='cell feature-cal-cell'+(d.getMonth()!==calView.getMonth()?' dim':'')+(ds===today?' today':'')+(evs.length?' has-events':'');
    cell.dataset.date=ds;
    let html=`<div class="cal-cell-top"><div class="dnum">${d.getDate()}</div>${evs.length?`<span>${evs.length}</span>`:''}</div>`;
    if(evs.length){
      html += '<div class="cal-event-stack">';
      evs.slice(0,3).forEach(e=>{
        html+=`<div class="ev ${e.type==='deadline'?'dl':''} ${e.priority==='high'?'priority-high':''}" style="--event-color:${safeColor(e.color,'#ff6b6b')};background:${safeColor(e.color,'#ff6b6b')}" title="${escAttr(e.title)}">${e.time?`<span>${esc(e.time)}</span>`:''}${e.type==='deadline'?'🚩':'📌'} ${e.priority==='high'?'⚠️ ':''}${e.recur?'↻ ':''}${esc(e.title)}</div>`;
      });
      html += '</div>';
    }
    if(evs.length>3) html+=`<div class="more">+${evs.length-3} more</div>`;
    cell.innerHTML=html;
    cell.onclick=()=>openEvent(null,ds);
    grid.appendChild(cell);
  }
  renderUpcoming();
}

function statusBadge(e){
  const diff=daysBetween(e.date, ymd(new Date())); // days until event
  if(diff<0) return {cls:'ok',txt:'Past'};
  if(diff===0) return {cls:'danger',txt:'Today'};
  if(diff===1) return {cls:'danger',txt:'Tomorrow'};
  if(diff<=2) return {cls:'warn',txt:'In '+diff+' days'};
  return {cls:'ok',txt:'In '+diff+' days'};
}
function renderUpcoming(){
  const today=ymd(new Date());
  const up=getAllEvents().filter(e=>e.date>=today).sort((a,b)=>a.date.localeCompare(b.date)||(a.time||'').localeCompare(b.time||'')).slice(0,8);
  const box=$('#upcoming');
  if(!up.length){ box.innerHTML='<div class="empty feature-empty" style="padding:30px">No upcoming events. Click a day or <b>New event</b>.</div>'; return; }
  box.innerHTML=up.map(e=>{ const d=parseYmd(e.date); const b=statusBadge(e); const diff=daysBetween(e.date,today);
    return `<div class="up feature-upcoming-card ${e.priority==='high'?'priority-high':''}" data-open-event="${escAttr(e.id)}">
      <div class="bar" style="background:${safeColor(e.color,'#ff6b6b')}"></div>
      <div class="dwrap"><div class="dd">${d.getDate()}</div><div class="mm">${MONTHS[d.getMonth()].slice(0,3)}</div></div>
      <div class="body"><div class="et">${e.type==='deadline'?'🚩 ':'📌 '}${e.priority==='high'?'⚠️ ':''}${e.recur?'↻ ':''}${esc(e.title)}</div>
        <div class="es">${d.toLocaleDateString([], {weekday:'long'})}${e.time?' · '+esc(e.time):' · all day'}${e.priority&&e.priority!=='normal'?' · '+esc(e.priority)+' priority':''}${e.recur?' · repeats '+esc(e.recur):''}</div>
        ${e.notes?`<div class="up-note">${esc(e.notes).slice(0,140)}</div>`:''}
      </div>
      <div class="up-side"><div class="badge ${b.cls}">${b.txt}</div><small>${diff===0?'Today':diff+'d'}</small></div>
    </div>`; }).join('');
  $$('#upcoming [data-open-event]').forEach(el=>el.onclick=()=>openEvent(el.dataset.openEvent));
}
function openEvent(id,presetDate){
  buildSwatch($('#eSwatch'), eColor=COLORS[4], c=>eColor=c);
  if(id){
    const e=getEventById(id); if(!e) return;
    $('#eModalTitle').textContent=e.readonly?'View Mapúa Event':'Edit event'; $('#eEditId').value=e.id;
    $('#eTitle').value=e.title; $('#eType').value=e.type; $('#eDate').value=e.date;
    $('#eTime').value=e.time||''; if($('#eProject')) $('#eProject').value=e.projectId&&typeof projectById==='function'?(projectById(e.projectId)?.title||e.project||''):(e.project||''); $('#eNotes').value=e.notes||''; $('#eRemind').value=e.remind??'2,0'; $('#ePriority').value=e.priority||'normal'; $('#eRecur').value=e.recur||'';
    eColor=e.color||COLORS[4]; buildSwatch($('#eSwatch'),eColor,c=>eColor=c);
    $('#eDelete').style.display=e.readonly?'none':'block'; 
    $('#eIcs').style.display='block';
    $('#eSave').style.display=e.readonly?'none':'flex';
    $('#eTitle').readOnly=e.readonly||false;
    $('#eDate').readOnly=e.readonly||false;
  }else{
    $('#eModalTitle').textContent='New event'; $('#eEditId').value='';
    $('#eTitle').value=''; $('#eType').value='deadline'; $('#eDate').value=presetDate||todayStr();
    $('#eTime').value=''; if($('#eProject')) $('#eProject').value=''; $('#eNotes').value=''; $('#eRemind').value='2,0'; $('#ePriority').value='normal'; $('#eRecur').value='';
    eColor=COLORS[4]; buildSwatch($('#eSwatch'),eColor,c=>eColor=c);
    $('#eDelete').style.display='none'; $('#eIcs').style.display='none'; $('#eSave').style.display='flex';
    $('#eTitle').readOnly=false; $('#eDate').readOnly=false;
  }
  $('#eOverlay').classList.add('show'); setTimeout(()=>$('#eTitle').focus(),50);
}
function saveEvent(){
  const title=$('#eTitle').value.trim(); if(!title){ toast('Title required'); return }
  const id=$('#eEditId').value;
  const projectName=($('#eProject')?.value||'').trim(); const linkedProject=projectName&&typeof projectByTitle==='function'?projectByTitle(projectName):null;
  const obj={ title, type:$('#eType').value, date:$('#eDate').value||todayStr(),
    time:$('#eTime').value, notes:$('#eNotes').value.trim(), remind:$('#eRemind').value, priority:$('#ePriority').value, recur:$('#eRecur').value, color:safeColor(eColor,'#ff6b6b'), projectId:linkedProject?linkedProject.id:'', project:linkedProject?linkedProject.title:projectName };
  if(id){ 
    const e=EVENTS.find(x=>x.id===baseEventId(id)); 
    if(!e) { toast('Cannot edit a read-only event'); return; }
    Object.assign(e,obj); toast('Event updated'); 
  }
  else{ obj.id=uid(); obj.fired=[]; EVENTS.push(obj); logHubActivity?.('event_added',{label:`Added ${obj.type||'event'}: ${obj.title}`}); toast('Event added'); }
  saveEvents(); $('#eOverlay').classList.remove('show'); renderCalendar(); checkReminders();
}
window.openEvent=openEvent;
function deleteEvent(){ const id=$('#eEditId').value; if(id&&confirm('Delete this event?')){ EVENTS=EVENTS.filter(e=>e.id!==baseEventId(id)); saveEvents(); $('#eOverlay').classList.remove('show'); renderCalendar(); toast('Deleted'); } }

/* ---- .ics export (works with Google / Apple / Outlook calendars) ---- */
function pad(n){ return String(n).padStart(2,'0') }
function icsDate(dateStr,timeStr){
  const d=parseYmd(dateStr);
  if(timeStr){ const [h,m]=timeStr.split(':'); return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate())+'T'+pad(h)+pad(m)+'00'; }
  return d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate()); // all-day
}
function icsEscape(s){ return String(s ?? '').replace(/\\/g,'\\\\').split('\n').join('\\n').replace(/;/g,'\\;').replace(/,/g,'\\,'); }
function icsForEvent(e){
  const allDay=!e.time; const dt=icsDate(e.date,e.time);
  let alarms='';
  (e.remind||'').split(',').filter(x=>x!=='').forEach(days=>{ const d=+days; const trig = d===0 ? (allDay?'-PT9H':'-PT0M') : `-P${d}D`; alarms+=`BEGIN:VALARM\nTRIGGER:${trig}\nACTION:DISPLAY\nDESCRIPTION:${icsEscape(e.title)}\nEND:VALARM\n`; });
  const stamp=new Date().toISOString().replace(/[-:.]/g,'').slice(0,15)+'Z';
  return `BEGIN:VEVENT\nUID:${e.id}@hub\nDTSTAMP:${stamp}\n`+(allDay?`DTSTART;VALUE=DATE:${dt}\n`:`DTSTART:${dt}\n`)+`SUMMARY:${icsEscape((e.type==='deadline'?'🚩 ':'')+(e.priority==='high'?'[HIGH] ':'')+e.title)}\n`+(e.notes?`DESCRIPTION:${icsEscape(e.notes)}\n`:'')+alarms+`END:VEVENT\n`;
}
function downloadIcs(e){
  const ics=`BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Hub//Calendar//EN\n`+icsForEvent(e)+`END:VCALENDAR`;
  const blob=new Blob([ics],{type:'text/calendar'}); const a=document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download=(e.title.replace(/[^\w]+/g,'_')||'event')+'.ics'; a.click();
  toast('Calendar file downloaded — open it to add + get native reminders');
}
function downloadAllIcs(){
  const today=todayStr(), horizon=addDaysStr(today,365);
  const events=getAllEvents().filter(e=>!e.readonly && e.date>=today && e.date<=horizon).sort((a,b)=>a.date.localeCompare(b.date)||(a.time||'').localeCompare(b.time||''));
  if(!events.length){ toast('No upcoming local events to export'); return; }
  const ics=`BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Hub//Calendar//EN\n`+events.map(icsForEvent).join('')+`END:VCALENDAR`;
  const blob=new Blob([ics],{type:'text/calendar'}); const a=document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download='hub-upcoming-events.ics'; a.click(); toast(`Exported ${events.length} events`);
}

function icsUnescape(s) {
  return String(s || '').replace(/\\\\/g, '\\').replace(/\\;/g, ';').replace(/\\,/g, ',').replace(/\\n/gi, '\n').replace(/\\N/g, '\n');
}
function unfoldIcs(text) {
  const lines = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const out = [];
  lines.forEach(line => { if ((line.startsWith(' ') || line.startsWith('\t')) && out.length) out[out.length - 1] += line.slice(1); else out.push(line); });
  return out;
}
function splitIcsProperty(line) {
  if (!line.includes(':')) return { prop: '', params: '', value: '' };
  const [head, ...rest] = line.split(':');
  const parts = head.split(';');
  return { prop: parts[0].toUpperCase(), params: parts.slice(1).join(';'), value: rest.join(':') };
}
function parseIcsDateValue(line) {
  const { prop, params, value } = splitIcsProperty(line);
  if (prop !== 'DTSTART' && prop !== 'DTEND') return { date: '', time: '' };
  const val = value.trim();
  const allDay = /VALUE=DATE/i.test(params) || /^\d{8}$/.test(val);
  if (!/^\d{8}/.test(val)) return { date: '', time: '' };
  if (allDay) return { date: `${val.slice(0, 4)}-${val.slice(4, 6)}-${val.slice(6, 8)}`, time: '' };
  if (val.length < 15 || val[8] !== 'T') return { date: `${val.slice(0, 4)}-${val.slice(4, 6)}-${val.slice(6, 8)}`, time: '' };
  const hh = val.slice(9, 11) || '00', mm = val.slice(11, 13) || '00';
  if (/Z$/i.test(val)) {
    const d = new Date(Date.UTC(+val.slice(0, 4), +val.slice(4, 6) - 1, +val.slice(6, 8), +hh, +mm));
    return { date: ymd(d), time: String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') };
  }
  return { date: `${val.slice(0, 4)}-${val.slice(4, 6)}-${val.slice(6, 8)}`, time: `${hh}:${mm}` };
}
function recurFromRrule(rrule) { const m = String(rrule || '').match(/FREQ=(DAILY|WEEKLY|MONTHLY|YEARLY)/i); return m ? m[1].toLowerCase() : ''; }
function remindersFromTriggers(triggers) {
  const set = new Set();
  triggers.forEach(t => {
    const s = String(t || '').toUpperCase().trim();
    const m = s.match(/^-P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/);
    if (!m) return;
    const d = parseInt(m[1] || 0, 10);
    const h = parseInt(m[2] || 0, 10);
    const mn = parseInt(m[3] || 0, 10);
    if (d > 0) set.add(String(d));
    else if (h >= 0 || mn >= 0) set.add('0');
  });
  return set.size ? Array.from(set).sort((a, b) => +b - +a).join(',') : '';
}
function parseIcsEvents(text) {
  const lines = unfoldIcs(text); const events = []; let cur = null; let inAlarm = false;
  lines.forEach(line => {
    if (line === 'BEGIN:VEVENT') { cur = { alarms: [] }; inAlarm = false; return; }
    if (line === 'END:VEVENT') {
      if (cur && cur.date && cur.title) {
        const titleClean = cur.title.replace(/^🚩\s*/, '').replace(/\[HIGH\]\s*/i, '').trim();
        const isDeadline = /🚩|deadline|due|submission|submit|exam|quiz|test|finals/i.test(cur.title);
        const high = /\[HIGH\]|HIGH PRIORITY|⚠️/i.test(cur.title);
        const notes = [cur.notes || '', cur.location ? `Location: ${cur.location}` : ''].filter(Boolean).join('\n').trim();
        const remind = cur.remind || remindersFromTriggers(cur.alarms) || '2,0';
        events.push({ id: uid(), title: titleClean, type: isDeadline ? 'deadline' : 'event', date: cur.date, time: cur.time || '', notes, remind, priority: high ? 'high' : 'normal', recur: cur.recur || '', color: high ? '#ff6b6b' : COLORS[4], fired: [], source: 'ics', sourceUid: cur.uid || '' });
      }
      cur = null; inAlarm = false; return;
    }
    if (!cur) return;
    if (line === 'BEGIN:VALARM') { inAlarm = true; return; }
    if (line === 'END:VALARM') { inAlarm = false; return; }
    const { prop, value } = splitIcsProperty(line);
    if (prop === 'UID') cur.uid = value.trim();
    else if (prop === 'SUMMARY') cur.title = icsUnescape(value);
    else if (prop === 'DESCRIPTION') cur.notes = icsUnescape(value);
    else if (prop === 'LOCATION') cur.location = icsUnescape(value);
    else if (prop === 'DTSTART') { const dt = parseIcsDateValue(line); cur.date = dt.date; cur.time = dt.time; }
    else if (prop === 'DTEND') { cur.dtend = parseIcsDateValue(line); }
    else if (prop === 'RRULE') cur.recur = recurFromRrule(value);
    else if (inAlarm && prop === 'TRIGGER') cur.alarms.push(value.trim());
  });
  return events;
}
function importIcsFile(file) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const imported = parseIcsEvents(r.result);
      if (!imported.length) { toast('No events found in .ics'); return; }
      const existing = new Set(EVENTS.map(e => (e.sourceUid || '') + '|' + e.date + '|' + e.title));
      const fresh = imported.filter(e => !existing.has((e.sourceUid || '') + '|' + e.date + '|' + e.title));
      if (!fresh.length) { toast('No new events to import'); return; }
      if (!confirm(`Import ${fresh.length} event${fresh.length !== 1 ? 's' : ''} into Hub Calendar?`)) return;
      EVENTS.push(...fresh); saveEvents(); renderCalendar(); checkReminders(); toast(`Imported ${fresh.length} event${fresh.length !== 1 ? 's' : ''}`);
    } catch (e) { console.error(e); toast('Could not import .ics file'); }
  };
  r.readAsText(file);
}

/* ---- Notifications (in-app, fires while site is open/installed) ---- */
function updateNotifLabel(){
  const lbl=$('#notifLbl');
  if(!('Notification' in window)){ lbl.textContent='Alerts unsupported'; return; }
  lbl.textContent = Notification.permission==='granted' ? 'Alerts ON' : Notification.permission==='denied' ? 'Alerts blocked' : 'Enable alerts';
}
async function enableNotifs(){
  if(!('Notification' in window)){ toast('This browser has no notifications'); return; }
  const p=await Notification.requestPermission(); updateNotifLabel();
  if(p==='granted'){ toast('Alerts enabled'); new Notification('Hub reminders on ✅',{body:"You'll be alerted 2 days before & on the day of deadlines."}); checkReminders(); }
  else toast('Permission not granted');
}
function notify(title,body){
  if(typeof hubNotify === 'function') return hubNotify(title, body, {type:'calendar', tag:'calendar:'+title+':'+body});
  if('Notification' in window && Notification.permission==='granted') new Notification(title,{body});
  else toast(title+' — '+body);
}
/* Checks each event's reminder offsets against today; fires once per offset/day. */
function checkReminders(){
  const today=ymd(new Date());
  let changed=false;
  getAllEvents().forEach(e=>{
    if(!e.remind) return;
    e.fired = e.fired || [];
    const diff=daysBetween(e.date, today); // days until event
    e.remind.split(',').filter(x=>x!=='').forEach(off=>{
      const d=+off;
      if(diff===d){
        const key=today+':'+d;                  // unique per fire-day+offset
        if(!e.fired.includes(key)){
          const when = d===0 ? 'is TODAY' : d===1 ? 'is tomorrow' : `is in ${d} days`;
          notify((e.type==='deadline'?'🚩 Deadline ':'📌 Event ')+when, `${e.title}${e.time?' at '+e.time:''}`);
          if(!e.readonly) {
            e.fired.push(key); changed=true;
          }
        }
      }
    });
  });
  if(changed) saveEvents();
  const pend = getAllEvents().filter(e=>{ const diff=daysBetween(e.date,today); return diff>=0 && (e.remind||'').split(',').includes(String(diff)); }).length;
  $('#alertNote').textContent = pend? `${pend} reminder${pend>1?'s':''} active today` : '';
}


