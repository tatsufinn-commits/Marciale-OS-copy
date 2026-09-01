/* ===========================================================
   INTAKE TRACKER  (caffeine + taurine + sugar)
   =========================================================== */
const DEFAULT_DRINKS=[
  {id:'machiato', name:'Caramel Macchiato (Venti)', caf:150,  tau:0,   sug:34, unit:'cup'},
  {id:'spanish',  name:'Spanish Latte (Venti)',     caf:256, tau:0,   sug:28, unit:'cup'},
  {id:'coba240',  name:'Cobra Energy 240 mL',      caf:92,  tau:105, sug:23, unit:'bottle'},
  {id:'coba350',  name:'Cobra Energy 350 mL',      caf:134, tau:153, sug:33.5, unit:'bottle'},
];
function normalizeDrink(d){
  if(!d || typeof d!=='object') return null;
  const name=String(d.name||'').trim(); if(!name) return null;
  return {id:safeDataId(d.id||uid()), name, caf:Math.max(0,Number(d.caf)||0), tau:Math.max(0,Number(d.tau)||0), sug:Math.max(0,Number(d.sug)||0), unit:String(d.unit||'cup')};
}
let DRINKS = LS.get('hub.drinks.v1', DEFAULT_DRINKS);
if(!Array.isArray(DRINKS)) DRINKS = DEFAULT_DRINKS;
DRINKS = DRINKS.map(normalizeDrink).filter(Boolean);
if(!DRINKS.length) DRINKS = DEFAULT_DRINKS.map(normalizeDrink).filter(Boolean);
let DRINK = Object.fromEntries(DRINKS.map(d=>[d.id,d]));

function saveDrinks(){
  LS.set('hub.drinks.v1', DRINKS); if(typeof updateSideStats==='function') updateSideStats();
  DRINK = Object.fromEntries(DRINKS.map(d=>[d.id,d]));
  fillDrinkSelect();
}
const LIMIT_CAF=400; // mg/day commonly cited safe upper limit for healthy adults
const LIMIT_TAU=3000; // mg/day common supplement upper range
const LIMIT_SUG=50; // WHO daily upper limit
// Active/residual model constants. Caffeine uses clinical 5.7h pharmacokinetic elimination half-life.
// Taurine/sugar are labelled as estimates because they are not the same physiology as caffeine.
const HALF_LIFE_CAF_H=5.7;
const HALF_LIFE_TAU_H=1.5;  // approximate plasma taurine clearance model
const HALF_LIFE_SUG_H=2;    // "recent sugar load" model, not blood glucose advice

/* ---------- Biometric intake estimates (Build 19) ---------- */
const BIO_METRICS_KEY='hub.bio.metrics.v1';
const ACTIVITY_MULTIPLIERS={sedentary:1.2,light:1.375,moderate:1.55,active:1.725,very_active:1.9};
function bioMetrics(){ const m=LS.get(BIO_METRICS_KEY, {}); return (m&&typeof m==='object')?m:{}; }
function normalizeBioMetrics(m={}){
  const out={
    age:Math.max(0, Math.min(120, Number(m.age)||0)),
    sex:['male','female','unspecified'].includes(m.sex)?m.sex:'unspecified',
    weightKg:Math.max(0, Math.min(300, Number(m.weightKg)||0)),
    heightCm:Math.max(0, Math.min(260, Number(m.heightCm)||0)),
    activityLevel:ACTIVITY_MULTIPLIERS[m.activityLevel]?m.activityLevel:'sedentary',
    caffeineSensitivity:['high','normal','low'].includes(m.caffeineSensitivity)?m.caffeineSensitivity:'normal',
    updatedAt:Date.now()
  };
  return out;
}
function saveBioMetrics(m){ LS.set(BIO_METRICS_KEY, normalizeBioMetrics(m)); renderBioMetrics?.(); if($('#todayStats')) renderTracker?.(); if(typeof renderTodayDashboard==='function') renderTodayDashboard(); }
function clearBioMetrics(){ LS.remove ? LS.remove(BIO_METRICS_KEY) : localStorage.removeItem(BIO_METRICS_KEY); renderBioMetrics?.(); renderTracker?.(); renderTodayDashboard?.(); }
function hasCompleteBioMetrics(m=bioMetrics()){ return !!(Number(m.age)>0 && Number(m.weightKg)>0 && Number(m.heightCm)>0 && ['male','female'].includes(m.sex)); }
function bmrMifflinStJeor(m=bioMetrics()){
  if(!hasCompleteBioMetrics(m)) return null;
  const base=10*Number(m.weightKg)+6.25*Number(m.heightCm)-5*Number(m.age);
  return Math.round(base + (m.sex==='male'?5:-161));
}
function tdeeEstimate(m=bioMetrics()){ const b=bmrMifflinStJeor(m); if(!b) return null; return Math.round(b*(ACTIVITY_MULTIPLIERS[m.activityLevel]||1.2)); }
function personalSugarLimits(m=bioMetrics()){ const t=tdeeEstimate(m); if(!t) return {recommendedG:LIMIT_SUG, upperG:LIMIT_SUG, personalized:false}; return {recommendedG:Math.round((t*0.05/4)*10)/10, upperG:Math.round((t*0.10/4)*10)/10, personalized:true, tdee:t}; }
function personalCaffeineLimits(m=bioMetrics()){
  if(!(Number(m.weightKg)>0)) return {singleDoseMg:200, dailyMg:LIMIT_CAF, warningMg:SLEEP_THRESHOLD, personalized:false};
  const sens=({high:0.6,normal:1,low:1.1}[m.caffeineSensitivity]||1);
  const single=Math.round(Math.min(200, Number(m.weightKg)*3)*sens);
  const daily=Math.round(Math.min(LIMIT_CAF, Number(m.weightKg)*5.7)*sens);
  return {singleDoseMg:single, dailyMg:Math.max(60,daily), warningMg:Math.max(20, Math.round(single*0.35)), personalized:true};
}
function personalIntakeLimits(){ const sugar=personalSugarLimits(); const caf=personalCaffeineLimits(); return {cafDaily:caf.dailyMg||LIMIT_CAF,cafSingle:caf.singleDoseMg||200,cafWarning:caf.warningMg||SLEEP_THRESHOLD,sugarRecommended:sugar.recommendedG||LIMIT_SUG,sugarUpper:sugar.upperG||LIMIT_SUG,tauDaily:LIMIT_TAU,personalized:!!(caf.personalized||sugar.personalized),tdee:sugar.tdee||null,bmr:bmrMifflinStJeor()}; }
window.bioMetrics=bioMetrics; window.saveBioMetrics=saveBioMetrics; window.personalIntakeLimits=personalIntakeLimits; window.bmrMifflinStJeor=bmrMifflinStJeor; window.tdeeEstimate=tdeeEstimate;
function renderBioMetrics(){
  const m=bioMetrics();
  if($('#bioAge')) $('#bioAge').value=m.age||''; if($('#bioSex')) $('#bioSex').value=m.sex||'unspecified'; if($('#bioWeight')) $('#bioWeight').value=m.weightKg||''; if($('#bioHeight')) $('#bioHeight').value=m.heightCm||''; if($('#bioActivity')) $('#bioActivity').value=m.activityLevel||'sedentary'; if($('#bioCafSensitivity')) $('#bioCafSensitivity').value=m.caffeineSensitivity||'normal';
  const el=$('#bioEstimates'); if(!el) return; const lim=personalIntakeLimits();
  el.innerHTML=lim.personalized?`<b>BMR:</b> ${lim.bmr||'—'} kcal · <b>TDEE:</b> ${lim.tdee||'—'} kcal<br><b>Caffeine:</b> ${lim.cafDaily}mg/day, ${lim.cafSingle}mg single-dose estimate · <b>Sugar:</b> ${lim.sugarRecommended}g recommended / ${lim.sugarUpper}g upper estimate`:`<b>Generic limits active.</b><br>Complete age, sex, weight, and height to calculate personalized estimates.`;
}
function readBioInputs(){ return {age:$('#bioAge')?.value,sex:$('#bioSex')?.value,weightKg:$('#bioWeight')?.value,heightCm:$('#bioHeight')?.value,activityLevel:$('#bioActivity')?.value,caffeineSensitivity:$('#bioCafSensitivity')?.value}; }
function setupBioInputs(){ $('#bioSave')?.addEventListener('click',()=>{ saveBioMetrics(readBioInputs()); toast('Biometric profile saved','success'); }); $('#bioReset')?.addEventListener('click',()=>{ if(confirm('Reset biometric intake profile?')){ clearBioMetrics(); toast('Biometric profile reset','warn'); } }); ['#bioAge','#bioSex','#bioWeight','#bioHeight','#bioActivity','#bioCafSensitivity'].forEach(sel=>$(sel)?.addEventListener('input',()=>{ const m=normalizeBioMetrics(readBioInputs()); const el=$('#bioEstimates'); if(el){ const old=LS.get(BIO_METRICS_KEY,{}); LS.set(BIO_METRICS_KEY,m); renderBioMetrics(); LS.set(BIO_METRICS_KEY,old); } })); renderBioMetrics(); }

function nowTimeStr(){ const d=new Date(); return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'); }
function timeFromTs(ts){ const d=new Date(Number(ts)||Date.now()); return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0'); }
function logTimestamp(date,time){
  const ds=date||todayStr(); const t=time||((ds===todayStr())?nowTimeStr():'12:00');
  const [h,m]=String(t).split(':').map(Number); const d=parseYmd(ds);
  d.setHours(Number.isFinite(h)?h:12, Number.isFinite(m)?m:0, 0, 0);
  return d.getTime();
}
let LOG = (Array.isArray(LS.get('hub.intake.v1', null)) ? LS.get('hub.intake.v1', null) : [])
  .filter(e=>e&&e.drink&&DRINK[e.drink]).map(e=>{ const date=e.date||todayStr(); const time=e.time||timeFromTs(e.ts||logTimestamp(date,'')); return {id:safeDataId(e.id),drink:e.drink,qty:Math.max(1,parseInt(e.qty)||1),date,time,ts:Number(e.ts)||logTimestamp(date,time)}; });
function saveLog(){ LS.set('hub.intake.v1', LOG); if(typeof updateSideStats==='function') updateSideStats(); if(typeof renderDashWidgets==='function') renderDashWidgets(); }
let range=14;

function fillDrinkSelect(){ $('#tDrink').innerHTML=DRINKS.map(d=>`<option value="${escAttr(d.id)}">${esc(d.name)} — ${d.caf}mg caf${d.tau?`, ${d.tau}mg tau`:''}</option>`).join(''); }

function dayTotals(dateStr){
  let caf=0,tau=0,sug=0;
  LOG.filter(e=>e.date===dateStr).forEach(e=>{ const d=DRINK[e.drink]; if(d){ caf+=d.caf*e.qty; tau+=d.tau*e.qty; sug+=d.sug*e.qty; } });
  return {caf,tau,sug};
}

function activeAt(kind, halfLifeH, ts=Date.now(), entries=LOG, maxHours=72){
  let total=0;
  entries.forEach(e=>{
    const d=DRINK[e.drink];
    if(!d || !e.ts) return;
    const hrs=(ts-e.ts)/3600000;
    if(hrs>=0 && hrs<maxHours){
      total += (Number(d[kind]) || 0) * e.qty * Math.pow(0.5, hrs / halfLifeH);
    }
  });
  return total;
}
function caffeineAt(ts, entries=LOG){ return activeAt('caf', HALF_LIFE_CAF_H, ts, entries); }
function sugarAt(ts, entries=LOG){ return activeAt('sug', HALF_LIFE_SUG_H, ts, entries, 24); }
function activeCaffeine(){ return caffeineAt(Date.now(), LOG); }
function activeTaurine(){ return activeAt('tau', HALF_LIFE_TAU_H); }
function activeSugar(){ return sugarAt(Date.now(), LOG); }
function activeSugarLoad(){ return activeSugar(); }
window.caffeineAt=caffeineAt;
window.sugarAt=sugarAt;
window.activeSugar=activeSugar;
window.activeSugarLoad=activeSugarLoad;

let SLEEP_THRESHOLD = Math.max(0, Number(LS.get('hub.sleep.threshold', 40)) || 40);
let SLEEP_BEDTIME = localStorage.getItem('hub.sleep.bedtime') || '23:00';
function caffeineBelowAt(entries=LOG, threshold=SLEEP_THRESHOLD, startTs=Date.now()){
  threshold=Math.max(0, Number(threshold)||0);
  if(caffeineAt(startTs, entries)<=threshold) return startTs;
  const step=5*60000, max=startTs+72*3600000;
  for(let t=startTs+step; t<=max; t+=step){ if(caffeineAt(t, entries)<=threshold) return t; }
  return null;
}
function nextBedtimeTs(timeStr=SLEEP_BEDTIME, fromTs=Date.now()){
  const [h,m]=String(timeStr||'23:00').split(':').map(Number);
  const d=new Date(fromTs); d.setHours(Number.isFinite(h)?h:23, Number.isFinite(m)?m:0, 0, 0);
  if(d.getTime()<fromTs) d.setDate(d.getDate()+1);
  return d.getTime();
}

/* ---------- Circadian & Biometric Focus Engine (Build V8.2) ---------- */

/**
 * Calculates projected caffeine residual at bedtime.
 */
function calculateBedtimeCaffeine(fromTs = Date.now(), bedtimeStr = SLEEP_BEDTIME, entries = LOG) {
  const bedtimeTs = nextBedtimeTs(bedtimeStr, fromTs);
  const projectedMg = Math.max(0, caffeineAt(bedtimeTs, entries));
  const hoursToBed = Math.max(0, (bedtimeTs - fromTs) / 3600000);
  const exceedsThreshold = projectedMg > SLEEP_THRESHOLD || projectedMg > 25;
  const warningLevel = projectedMg > 50 ? 'danger' : projectedMg > 25 ? 'warn' : 'ok';
  
  let sleepImpactSummary = 'Optimal sleep readiness. Caffeine will clear before target bedtime.';
  if (projectedMg > 50) {
    sleepImpactSummary = 'High sleep disruption risk. Slow-wave and REM sleep likely suppressed.';
  } else if (projectedMg > 25) {
    sleepImpactSummary = 'Moderate bedtime residual. May increase sleep latency or cause fragmented rest.';
  }

  return {
    fromTs,
    bedtimeTs,
    bedtimeStr: String(bedtimeStr || '23:00'),
    projectedMg: Math.round(projectedMg * 10) / 10,
    hoursToBed: Math.round(hoursToBed * 10) / 10,
    exceedsThreshold,
    warningLevel,
    sleepImpactSummary
  };
}

/**
 * Calculates the safe caffeine cutoff time for a standard dose (e.g. 100mg)
 * such that residual caffeine at bedtime does not exceed thresholdMg (default 25mg).
 */
function safeCaffeineCutoff(bedtimeStr = SLEEP_BEDTIME, standardDoseMg = 100, thresholdMg = 25, fromTs = Date.now()) {
  const bedtimeTs = nextBedtimeTs(bedtimeStr, fromTs);
  const dose = Math.max(1, Number(standardDoseMg) || 100);
  const target = Math.max(1, Number(thresholdMg) || 25);
  
  const halfLivesNeeded = Math.max(0, Math.log2(dose / target));
  const clearanceHours = halfLivesNeeded * HALF_LIFE_CAF_H;
  const cutoffTs = bedtimeTs - Math.round(clearanceHours * 3600000);
  const isPastCutoff = fromTs >= cutoffTs;
  
  const d = new Date(cutoffTs);
  const cutoffTimeStr = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');

  return {
    cutoffTs,
    cutoffTimeStr,
    clearanceHours: Math.round(clearanceHours * 10) / 10,
    hoursBeforeBed: Math.round(clearanceHours * 10) / 10,
    isPastCutoff,
    bedtimeStr: String(bedtimeStr || '23:00')
  };
}

/**
 * Returns dynamic focus session duration and task suggestions based on
 * current caffeine concentration, circadian phase, and bedtime proximity.
 */
function getCircadianFocusRecommendation(nowTs = Date.now(), entries = LOG) {
  const activeCaf = Math.max(0, caffeineAt(nowTs, entries));
  const d = new Date(nowTs);
  const hour = d.getHours();
  const bedtimeData = calculateBedtimeCaffeine(nowTs, SLEEP_BEDTIME, entries);
  
  let tier = 'steady';
  let durationMin = 25;
  let label = '25m Steady Sprint';
  let mode = 'steady_focus';
  let taskType = 'Structured Sprint & Building Tech Review';
  let reason = 'Moderate steady stimulation. Optimal for standard 25-minute Pomodoro sprints and specification review.';
  let suggestedSubjects = 'Building Tech (BT), BP 344 Accessibility Checks, Professional Practice';

  if (activeCaf >= 100 || (activeCaf >= 60 && hour >= 9 && hour <= 12)) {
    tier = 'peak';
    durationMin = 50;
    label = '50m Deep Focus Block';
    mode = 'deep_focus';
    taskType = 'Deep Analytical Work & Studio Drafting';
    reason = `High active caffeine (${activeCaf.toFixed(0)}mg) provides peak cognitive alertness. Ideal for intense architectural calculations, structural sizing, or studio design plates.`;
    suggestedSubjects = 'Architectural Design Studio (AD), Structural Calculations (STRUC), NBCP Rule 7/8 Calculations';
  } else if (activeCaf < 40 || hour >= 21 || bedtimeData.hoursToBed <= 2) {
    tier = 'low';
    durationMin = 15;
    label = '15m Light Active Recall';
    mode = 'light_recall';
    taskType = 'Active Recall Flashcards & Daily Reflection';
    reason = `Low stimulation (${activeCaf.toFixed(0)}mg) or evening wind-down phase. Intensive calculations are counterproductive; focus on active recall flashcards, organizing notes, and daily reflection.`;
    suggestedSubjects = 'TAMA HOA History Flashcards, TOA Architectural Theory, Daily Logbook Review';
  }

  return {
    tier,
    durationMin,
    label,
    mode,
    taskType,
    reason,
    suggestedSubjects,
    activeCaffeineMg: Math.round(activeCaf * 10) / 10,
    bedtimeProjectedMg: bedtimeData.projectedMg,
    hour
  };
}

window.calculateBedtimeCaffeine = calculateBedtimeCaffeine;
window.safeCaffeineCutoff = safeCaffeineCutoff;
window.getCircadianFocusRecommendation = getCircadianFocusRecommendation;
function fmtClock(ts){ return new Date(ts).toLocaleString([], {weekday:'short', hour:'2-digit', minute:'2-digit'}); }
function durationText(ms){ const mins=Math.max(0, Math.round(ms/60000)); const h=Math.floor(mins/60), m=mins%60; return h?`${h}h ${m}m`:`${m}m`; }
function projectedLogEntry(){
  const drink=$('#tDrink')?.value; const d=DRINK[drink]; if(!d) return null;
  const qty=Math.max(1,parseInt($('#tQty')?.value)||1); const date=$('#tDate')?.value||todayStr(); const time=$('#tTime')?.value||((date===todayStr())?nowTimeStr():'12:00');
  const ts=logTimestamp(date,time);
  return {id:'preview',drink,qty,date,time,ts};
}
function renderSleepReadiness(){
  const thInput=$('#sleepThreshold'), bedInput=$('#sleepBedtime');
  if(!thInput || !bedInput) return;
  thInput.value=SLEEP_THRESHOLD; bedInput.value=SLEEP_BEDTIME;
  const now=Date.now(), active=caffeineAt(now), clear=caffeineBelowAt(LOG,SLEEP_THRESHOLD,now), bed=nextBedtimeTs(SLEEP_BEDTIME,now);
  const limits=personalIntakeLimits();
  const ready=active<=SLEEP_THRESHOLD;
  const compatible=ready || !!(clear && clear<=bed);
  const state=ready?'ready':compatible?'warn':'danger';
  const clearanceLabel=clear?fmtClock(clear):'later than 72h';
  const bedLabel=fmtClock(bed);
  const activeScale=Math.max(SLEEP_THRESHOLD*3, Number(limits.cafSingle)||200, 1);
  const activePct=pct(active, activeScale);
  const remaining=clear ? Math.max(0, clear-now) : null;
  const bedtimeInfo=calculateBedtimeCaffeine(now, SLEEP_BEDTIME, LOG);
  const cutoffInfo=safeCaffeineCutoff(SLEEP_BEDTIME, 100, SLEEP_THRESHOLD, now);

  $('#sleepStatus').innerHTML = `
    <div class="sleep-clearance-card ${state}" style="--sleep-p:${activePct};--sleep-color:${state==='ready'?'var(--good)':state==='warn'?'var(--warn)':'var(--danger)'}">
      <div class="sleep-ring" aria-label="Active caffeine ${activePct}% of readiness scale"><b>${active.toFixed(0)}</b><span>mg active</span></div>
      <div class="sleep-copy">
        <div class="sleep-state">${ready?'Ready now 🌙':compatible?'Manageable before bedtime':'Sleep risk'}</div>
        <div class="sleep-line">Below <b>${SLEEP_THRESHOLD}mg</b>: <b>${esc(clearanceLabel)}</b></div>
        <div class="sleep-line">Target bedtime: <b>${esc(bedLabel)}</b>${remaining!==null?` · clearance in ${esc(durationText(remaining))}`:''}</div>
        <div class="sleep-line">Projected bedtime level: <b>~${bedtimeInfo.projectedMg.toFixed(0)}mg</b>${bedtimeInfo.projectedMg>25?' ⚠️':''}</div>
        <div class="sleep-line">Safe caffeine cutoff: <b>${esc(cutoffInfo.cutoffTimeStr)}</b>${cutoffInfo.isPastCutoff?' · <span style="color:var(--danger)">Past Cutoff</span>':''}</div>
        <div class="sleep-meter"><i style="width:${activePct}%"></i></div>
      </div>
    </div>`;
  const preview=projectedLogEntry();
  let extra='';
  if(preview && preview.date===todayStr()){
    const d=DRINK[preview.drink]; const entries=LOG.concat([preview]); const pclear=caffeineBelowAt(entries,SLEEP_THRESHOLD,now);
    const impact=clear&&pclear ? pclear-clear : 0;
    const bad=pclear && pclear>bed;
    extra=`<div class="sleep-preview ${bad?'danger':'ok'}"><b>Preview:</b> ${preview.qty}× ${esc(d.name)} now → below threshold around <b>${pclear?fmtClock(pclear):'later than 72h'}</b>${impact>60000?` <span>(${durationText(impact)} later)</span>`:''}. ${bad?'<strong>After target bedtime.</strong>':'<strong>Compatible with target bedtime.</strong>'}</div>`;
  }else{
    extra="<div class=\"sleep-preview\">Select today's drink/quantity to preview how it affects sleep readiness.</div>";
  }
  $('#sleepForecast').innerHTML=extra;
}
function sleepWarningFor(entry){
  const now=Date.now(); if(entry.date!==todayStr()) return true;
  const bed=nextBedtimeTs(SLEEP_BEDTIME,now);
  const before=caffeineBelowAt(LOG,SLEEP_THRESHOLD,now);
  const after=caffeineBelowAt(LOG.concat([entry]),SLEEP_THRESHOLD,now);
  if(after && after>bed && (!before || before<=bed || after-before>30*60000)){
    const d=DRINK[entry.drink];
    return confirm(`Sleep warning: ${entry.qty}× ${d.name} now may keep you above ${SLEEP_THRESHOLD}mg until ${fmtClock(after)}, after your ${SLEEP_BEDTIME} bedtime. Log it anyway?`);
  }
  return true;
}


function pct(v,limit){ return Math.min(100, Math.max(0, Math.round((Number(v)||0)/(Number(limit)||1)*100))); }
function warningColor(percent, warnAt=75, dangerAt=100){
  percent=Number(percent)||0;
  return percent>=dangerAt ? 'var(--danger)' : percent>=warnAt ? 'var(--warn)' : 'var(--good)';
}
function radialStatCard({label,value,unit,limitText,percent,color,note,state='ok',sub=''}){
  const p=pct(percent,100);
  return `<div class="stat radial-stat ${escAttr(state)}" style="--p:${p};--ring-color:${color}">
    <div class="radial-ring" aria-label="${escAttr(label)} ${p}%">
      <div><b>${esc(value)}</b><small>${esc(unit)}</small></div>
    </div>
    <div class="radial-copy">
      <div class="lbl">${esc(label)}</div>
      ${sub?`<div class="radial-sub">${esc(sub)}</div>`:''}
      <div class="radial-limit">${limitText}</div>
      <div class="bar"><i style="width:${p}%;background:${color}"></i></div>
      <div class="note">${note}</div>
    </div>
  </div>`;
}
function renderToday(){
  if(!$('#todayStats')) return;
  const t=dayTotals(todayStr());
  const limits=personalIntakeLimits();
  const activeCaf = activeCaffeine();
  const activeTau = activeTaurine();
  const activeSug = activeSugar();
  const activeCafLimit = Math.max(Number(limits.cafSingle)||200, SLEEP_THRESHOLD*3, 1);
  const activeSugLimit = Math.max(Number(limits.sugarUpper)||LIMIT_SUG, Number(limits.sugarRecommended)||LIMIT_SUG, 1);
  const cafActivePct=pct(activeCaf, activeCafLimit);
  const cafBudgetPct=pct(t.caf, limits.cafDaily);
  const sugarPct=pct(activeSug, activeSugLimit);
  const tauPct=pct(activeTau, LIMIT_TAU);
  const cafColor = activeCaf>SLEEP_THRESHOLD*3?'var(--danger)': activeCaf>SLEEP_THRESHOLD?'var(--warn)':'var(--good)';
  const cafTotalColor = warningColor(cafBudgetPct,75,100);
  const sugarColor = activeSug>limits.sugarUpper?'var(--danger)':warningColor(sugarPct,70,100);
  const tauColor = activeTau>LIMIT_TAU*0.55?'var(--danger)':activeTau>LIMIT_TAU*0.35?'var(--warn)':'var(--acc)';
  const estimateLabel=limits.personalized?'Personalized estimate':'Generic guideline';

  $('#todayStats').innerHTML=`
    ${radialStatCard({
      label:'Active Caffeine', value:activeCaf.toFixed(0), unit:'mg', percent:cafActivePct, color:cafColor,
      state:activeCaf>SLEEP_THRESHOLD?'warn':'ok', sub:'5h half-life model',
      limitText:`<b>${activeCaf.toFixed(0)}</b> / ${activeCafLimit.toFixed(0)}mg active scale`,
      note:`Sleep threshold: ${SLEEP_THRESHOLD}mg. Consumed today: ${t.caf.toFixed(0)}mg.`
    })}
    ${radialStatCard({
      label:'Caffeine Budget', value:t.caf.toFixed(0), unit:'mg', percent:cafBudgetPct, color:cafTotalColor,
      state:t.caf>limits.cafDaily?'danger':cafBudgetPct>=75?'warn':'ok', sub:estimateLabel,
      limitText:`<b>${t.caf.toFixed(0)}</b> / ${limits.cafDaily}mg daily`,
      note:t.caf>limits.cafDaily?`⚠️ Over your ${limits.personalized?'personalized estimate':'daily guideline'}.`:`${Math.max(0,limits.cafDaily-t.caf).toFixed(0)}mg daily headroom left.`
    })}
    ${radialStatCard({
      label:'Active Sugar', value:activeSug.toFixed(1), unit:'g', percent:sugarPct, color:sugarColor,
      state:activeSug>limits.sugarUpper?'danger':sugarPct>=70?'warn':'ok', sub:`${HALF_LIFE_SUG_H}h half-life estimate`,
      limitText:`<b>${activeSug.toFixed(1)}</b> / ${activeSugLimit.toFixed(1)}g active scale`,
      note:`Consumed today: ${t.sug.toFixed(1)}g. Personalized guide: ${limits.sugarRecommended}g recommended / ${limits.sugarUpper}g upper.`
    })}
    ${radialStatCard({
      label:'Active Taurine', value:activeTau.toFixed(0), unit:'mg', percent:tauPct, color:tauColor,
      state:activeTau>LIMIT_TAU*0.55?'danger':activeTau>LIMIT_TAU*0.35?'warn':'ok', sub:`~${HALF_LIFE_TAU_H}h estimate`,
      limitText:`<b>${activeTau.toFixed(0)}</b> / ${LIMIT_TAU}mg active scale`,
      note:`Consumed today: ${t.tau.toFixed(0)}mg. Estimate only, not medical advice.`
    })}`;
}


function renderDashWidgets(){
  const box=$('#dashWidgets'); if(!box) return;
  const today=todayStr(); const active=activeCaffeine(); const clear=caffeineBelowAt(LOG,SLEEP_THRESHOLD);
  const next=getAllEvents().filter(e=>e.date>=today).sort((a,b)=>a.date.localeCompare(b.date)||(a.time||'').localeCompare(b.time||''))[0];
  const notes=notesValue().trim().split('\n').map(x=>x.trim()).filter(Boolean).slice(0,2).join(' · ') || 'No notes yet';
  const recent=DB.slice().sort((a,b)=>b.ts-a.ts).slice(0,3);
  box.innerHTML=`
    <div class="widget"><div class="wlabel">Active caffeine</div><div class="wval">${active.toFixed(0)} mg</div><div class="wsub">Below ${SLEEP_THRESHOLD}mg around ${clear?fmtClock(clear):'later than 72h'}</div></div>
    <div class="widget"><div class="wlabel">Next calendar item</div><div class="wval">${next?esc(next.title):'Nothing upcoming'}</div><div class="wsub">${next?`${esc(next.date)}${next.time?' · '+esc(next.time):''}${next.priority==='high'?' · High priority':''}`:'Add a deadline or event to start planning.'}</div></div>
    <div class="widget"><div class="wlabel">Recent note</div><div class="wval" style="font-size:14px;line-height:1.4">${esc(notes).slice(0,160)}</div><div class="wsub">Markdown notebook</div></div>
    <div class="widget"><div class="wlabel">Recent bookmarks</div><div class="wval" style="font-size:14px;line-height:1.45">${recent.length?recent.map(b=>`<a href="${escAttr(safeUrl(b.url)||'#')}" target="_blank" rel="noopener noreferrer">${esc(b.title)}</a>`).join('<br>'):'No bookmarks yet'}</div><div class="wsub">Latest saved links</div></div>`;
}

function lastNDates(n){ const arr=[]; const d=new Date(); for(let i=n-1;i>=0;i--){ const x=new Date(d); x.setDate(d.getDate()-i); arr.push(x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')); } return arr; }

function renderIntraDayChart(){
  const today = todayStr();
  const startOfDay = parseYmd(today).getTime();
  const msPerHour = 3600000;
  
  const W=800, H=240, padL=46, padR=16, padT=20, padB=24;
  const cw=W-padL-padR, ch=H-padT-padB;
  
  let dataPoints = [];
  let maxCaf = 400; // ensure at least 400 scale
  
  for(let i=0; i<=24; i+=0.5){
     let t = startOfDay + (i * msPerHour);
     let active = caffeineAt(t);
     dataPoints.push({ x: i, y: active });
     if(active > maxCaf) maxCaf = active;
  }
  
  maxCaf = maxCaf * 1.1; // 10% headroom
  const yPos = val => H - padB - (val / maxCaf) * ch;
  const xPos = val => padL + (val / 24) * cw;
  
  let svg = '';
  
  // Grid & X Labels
  for(let i=0; i<=24; i+=3) {
     svg += `<text x="${xPos(i)}" y="${H-padB+16}" fill="var(--mut)" font-size="11" text-anchor="middle">${i}:00</text>`;
     svg += `<line x1="${xPos(i)}" y1="${padT}" x2="${xPos(i)}" y2="${H-padB}" stroke="#282828" stroke-width="1"/>`;
  }

  // Y Labels & Threshold lines
  const thresholds = [
    { v: 150, c: '#ffcd56', l: '150mg (Elevated Cardio)' },
    { v: 230, c: '#ff6384', l: '230mg (High Stress Zone)' },
    { v: LIMIT_CAF, c: '#ff6b6b', l: '400mg (Daily Limit)' }
  ];
  
  thresholds.forEach(th => {
    if(th.v <= maxCaf) {
      const yy = yPos(th.v);
      svg += `<line x1="${padL}" y1="${yy}" x2="${W-padR}" y2="${yy}" stroke="${th.c}" stroke-width="1.5" stroke-dasharray="5 5" opacity="0.6"/>`;
      svg += `<text x="${padL-8}" y="${yy+4}" fill="${th.c}" font-size="10" text-anchor="end">${th.v}</text>`;
      svg += `<text x="${W-padR}" y="${yy-5}" fill="${th.c}" font-size="10" text-anchor="end" opacity="0.8">${th.l}</text>`;
    }
  });
  
  // Curve
  let pts = dataPoints.map(p => `${xPos(p.x)},${yPos(p.y)}`).join(' ');
  let areaPts = `${xPos(0)},${yPos(0)} ` + pts + ` ${xPos(24)},${yPos(0)}`;
  
  svg += `<polygon points="${areaPts}" fill="rgba(255, 159, 67, 0.15)"/>`;
  svg += `<polyline points="${pts}" fill="none" stroke="#ff9f43" stroke-width="3"/>`;
  
  $('#intraDayChart').innerHTML = svg;
}

function renderChart(){
  const dates=lastNDates(range);
  const data=dates.map(ds=>({ds, ...dayTotals(ds)}));
  const W=800,H=320, padL=46,padR=16,padT=14,padB=46;
  const cw=W-padL-padR, ch=H-padT-padB;
  const maxV=Math.max(LIMIT_CAF, ...data.map(d=>Math.max(d.caf,d.tau)), 100)*1.1;
  const x0=padL, y0=H-padB;
  const bandW=cw/data.length;
  const barW=Math.min(22, bandW*0.34);
  const y=v=>y0-(v/maxV)*ch;
  let svg='';
  // gridlines + y labels
  for(let g=0;g<=4;g++){ const val=maxV*g/4; const yy=y(val);
    svg+=`<line x1="${padL}" y1="${yy}" x2="${W-padR}" y2="${yy}" stroke="#243150" stroke-width="1"/>`;
    svg+=`<text x="${padL-8}" y="${yy+4}" fill="#8896b5" font-size="11" text-anchor="end">${Math.round(val)}</text>`;
  }
  // caffeine limit line
  const yl=y(LIMIT_CAF);
  svg+=`<line x1="${padL}" y1="${yl}" x2="${W-padR}" y2="${yl}" stroke="#ff6b6b" stroke-width="1.4" stroke-dasharray="6 5"/>`;
  svg+=`<text x="${W-padR}" y="${yl-6}" fill="#ff6b6b" font-size="10" text-anchor="end">400 mg caffeine limit</text>`;
  // bars
  data.forEach((d,i)=>{
    const bx=x0+bandW*i+bandW/2;
    const cafX=bx-barW-2, tauX=bx+2;
    svg+=`<g class="bar-g">
      <rect x="${cafX}" y="${y(d.caf)}" width="${barW}" height="${y0-y(d.caf)}" rx="3" fill="#ffb454"
        data-d="${d.ds}" data-caf="${d.caf}" data-tau="${d.tau}" data-sug="${d.sug}"></rect>
      <rect x="${tauX}" y="${y(d.tau)}" width="${barW}" height="${y0-y(d.tau)}" rx="3" fill="#6c8cff"
        data-d="${d.ds}" data-caf="${d.caf}" data-tau="${d.tau}" data-sug="${d.sug}"></rect>`;
    // x labels (skip some when crowded)
    const show = range<=14 || i%Math.ceil(range/12)===0;
    if(show){ const lab=d.ds.slice(5); svg+=`<text x="${bx}" y="${H-padB+18}" fill="#8896b5" font-size="10" text-anchor="middle">${lab}</text>`; }
    svg+=`</g>`;
  });
  
  // Continuous Active Caffeine Decay Line
  let points = [];
  const now = Date.now();
  const msPerDay = 86400000;
  const startDate = parseYmd(dates[0]).getTime();
  const stepsPerDay = 12; // every 2 hours
  const totalSteps = dates.length * stepsPerDay;
  for(let i=0; i<=totalSteps; i++){
    const ts = startDate + (i/stepsPerDay) * msPerDay;
    if (ts > now + msPerDay) break;
    let active = caffeineAt(ts);
    const px = x0 + (i/stepsPerDay) * bandW + (bandW/2);
    const py = y(active);
    points.push(`${px},${py}`);
  }
  if(points.length>1) {
    svg += `<polyline points="${points.join(' ')}" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="3,3" opacity="0.6"/>`;
    svg += `<text x="${x0+10}" y="${y0-maxV*0.8}" fill="#fff" font-size="10" opacity="0.6">-- Active Caffeine (Half-life)</text>`;
  }

  $('#chart').innerHTML=svg;
  // tooltips
  const tip=$('#tip');
  $$('#chart rect').forEach(r=>{
    r.addEventListener('mousemove',e=>{
      tip.innerHTML=`<b>${r.dataset.d}</b><br><span class="c">☕ ${(+r.dataset.caf).toFixed(0)} mg caffeine</span><br><span class="t2">⚡ ${(+r.dataset.tau).toFixed(0)} mg taurine</span><br>🍬 ${(+r.dataset.sug).toFixed(0)} g sugar`;
      tip.style.left=(e.clientX+14)+'px'; tip.style.top=(e.clientY+14)+'px'; tip.style.opacity=1;
    });
    r.addEventListener('mouseleave',()=>tip.style.opacity=0);
  });
}

function renderLogTable(){
  const rows=LOG.slice().sort((a,b)=>b.date.localeCompare(a.date)||b.ts-a.ts);
  const tb=$('#logTable tbody');
  if(!rows.length){ tb.innerHTML=`<tr><td colspan="8" style="color:var(--mut);text-align:center;padding:24px">No entries yet — log your first drink above.</td></tr>`; return; }
  tb.innerHTML=rows.map(e=>{ const d=DRINK[e.drink]||{name:'?',caf:0,tau:0,sug:0};
    return `<tr><td>${esc(e.date)}</td><td>${esc(e.time||timeFromTs(e.ts))}</td><td>${esc(d.name)}</td><td><span class="pill">×${e.qty}</span></td>
      <td style="color:var(--warn)">${(d.caf*e.qty).toFixed(0)} mg</td>
      <td style="color:var(--acc)">${(d.tau*e.qty).toFixed(0)} mg</td>
      <td>${(d.sug*e.qty).toFixed(0)} g</td>
      <td><span class="del" data-del-log="${escAttr(e.id)}">✕</span></td></tr>`; }).join('');
  $$('#logTable [data-del-log]').forEach(el=>el.onclick=()=>window.delLog(el.dataset.delLog));
}
window.delLog=id=>{ LOG=LOG.filter(e=>e.id!==id); saveLog(); renderTracker(); toast('Removed'); };
function addLog(){
  const drink=$('#tDrink').value; const qty=Math.max(1,parseInt($('#tQty').value)||1); const date=$('#tDate').value||todayStr(); const time=$('#tTime').value||((date===todayStr())?nowTimeStr():'12:00');
  const ts = logTimestamp(date,time);
  const entry={id:uid(),drink,qty,date,time,ts};
  if(!sleepWarningFor(entry)) return false;
  LOG.push(entry); logHubActivity?.('intake_logged',{label:`Logged intake: ${qty}× ${(DRINK[drink]?.name)||drink}`}); saveLog(); renderTracker(); toast('Logged'); $('#tQty').value=1; $('#tTime').value=nowTimeStr();
  return true;
}
function quickAddDrink(id){
  const d=DRINK[id]; if(!d) return false;
  if($('#tDrink')) $('#tDrink').value=id;
  if($('#tQty')) $('#tQty').value=1;
  if($('#tDate')) $('#tDate').value=todayStr();
  if($('#tTime')) $('#tTime').value=nowTimeStr();
  const ok=addLog();
  const status=$('#quickDrinkStatus');
  if(status){ status.textContent=ok?`Logged ${d.name}`:'Cancelled'; status.className=ok?'ok':'warn'; }
  return !!ok;
}
window.quickAddDrink=quickAddDrink;
function renderQuickDrinkTiles(){
  const root=$('#quickDrinkTiles'); if(!root) return;
  const limits=personalIntakeLimits();
  const status=$('#quickDrinkStatus');
  if(status && !status.textContent) status.textContent='Ready';
  const today=dayTotals(todayStr());
  root.innerHTML=DRINKS.slice(0,10).map(d=>{
    const cafPct=pct(d.caf, limits.cafSingle||200);
    const sugarPct=pct(d.sug, limits.sugarRecommended||LIMIT_SUG);
    const high=d.caf>(limits.cafSingle||200) || d.sug>(limits.sugarRecommended||LIMIT_SUG)*0.5;
    return `<button class="quick-drink-tile ${high?'warn':''}" type="button" data-quick-drink="${escAttr(d.id)}" style="--drink-color:${high?'var(--warn)':'var(--acc)'}">
      <span class="quick-drink-icon">☕</span>
      <b>${esc(d.name)}</b>
      <small>${Number(d.caf)||0}mg caf · ${Number(d.sug)||0}g sugar</small>
      <em><i style="width:${cafPct}%"></i><u style="width:${sugarPct}%"></u></em>
    </button>`;
  }).join('');
  $$('#quickDrinkTiles [data-quick-drink]').forEach(btn=>btn.onclick=()=>quickAddDrink(btn.dataset.quickDrink));
  if(status && status.textContent==='Ready') status.title=`Today: ${today.caf.toFixed(0)}mg caffeine · ${today.sug.toFixed(1)}g sugar`;
}
window.renderQuickDrinkTiles=renderQuickDrinkTiles;
function csvCell(v){ return '"'+String(v ?? '').replace(/"/g,'""')+'"'; }
function exportLog(){
  const head='date,time,drink,qty,caffeine_mg,taurine_mg,sugar_g,timestamp\n';
  const body=LOG.slice().sort((a,b)=>a.date.localeCompare(b.date)||(a.time||'').localeCompare(b.time||'')).map(e=>{ const d=DRINK[e.drink]||{name:'?',caf:0,tau:0,sug:0}; return [e.date,e.time||timeFromTs(e.ts),csvCell(d.name),e.qty,d.caf*e.qty,d.tau*e.qty,d.sug*e.qty,new Date(e.ts).toISOString()].join(','); }).join('\n');
  const blob=new Blob([head+body],{type:'text/csv'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='intake-log.csv'; a.click(); toast('CSV exported');
}
function renderTracker(){ renderBioMetrics(); renderToday(); renderQuickDrinkTiles(); renderSleepReadiness(); renderIntraDayChart(); renderChart(); renderLogTable(); }

