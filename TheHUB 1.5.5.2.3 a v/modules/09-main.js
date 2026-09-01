
window.copyCodeBlock = function(btn) {
  const pre = btn.parentElement.nextElementSibling;
  navigator.clipboard.writeText(pre.textContent).then(() => {
    const old = btn.innerHTML;
    btn.innerHTML = '✅ Copied';
    btn.style.color = 'var(--good)';
    btn.style.borderColor = 'var(--good)';
    setTimeout(() => {
      btn.innerHTML = old;
      btn.style.color = 'var(--txt)';
      btn.style.borderColor = 'var(--line)';
    }, 2000);
  });
};

function sweepCompletedDeadlines() {
  if (typeof TASKS === 'undefined' || typeof EVENTS === 'undefined') return;
  const ONE_HOUR = 60 * 60 * 1000;
  const now = Date.now();
  let changed = false;

  TASKS.forEach(t => {
    if (t.status === 'done' && t.doneAt && t.linkedEventId) {
      if (now - t.doneAt >= ONE_HOUR) {
        // Find and delete the linked calendar event
        const evIndex = EVENTS.findIndex(e => e.id === t.linkedEventId);
        if (evIndex > -1) {
          EVENTS.splice(evIndex, 1);
          changed = true;
          // Clear the link so we don't try to delete it again
          delete t.linkedEventId; 
        }
      }
    }
  });

  if (changed) {
    if (typeof saveEvents === 'function') saveEvents();
    if (typeof saveTasks === 'function') saveTasks();
    if (typeof renderCalendar === 'function') renderCalendar();
    if (typeof renderTasks === 'function') renderTasks();
  }
}
/* ===========================================================
   APP WIRING
   =========================================================== */
function tick(){ const d=new Date(); $('#clk').textContent=d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}); $('#dat').textContent=d.toLocaleDateString([],{weekday:'long',month:'short',day:'numeric'}); }

let sweepCounter = 0;
setInterval(() => {
  tick();
  sweepCounter++;
  if (sweepCounter >= 60) { // Run sweeper every 60 seconds
    sweepCompletedDeadlines();
    sweepCounter = 0;
  }
}, 1000); 
tick();


// tabs
$$('.tab').forEach(t=>t.onclick=()=>activatePage(t.dataset.page));

// bookmark wiring
ensureBookmarkModal?.();
$('#addBtn').onclick=()=>openModal(null);
$('#saveBtn').onclick=saveBmForm;
$('#cancelBtn').onclick=()=>hideModal('overlay');
$('#overlay').onclick=e=>{ if(e.target===$('#overlay')) hideModal('overlay'); };
$('#exportBtn').onclick=exportData;
$('#importBtn').onclick=()=>$('#fileInput').click();
$('#fileInput').onchange=e=>{ if(e.target.files[0])importData(e.target.files[0]); e.target.value=''; };
$('#search').oninput=e=>{ query=e.target.value; renderGrid(); };

// portal wiring
ensurePortalModals?.();
$('#addSectionBtn').onclick=openSection;
$('#pSave').onclick=saveTile; $('#pCancel').onclick=()=>hideModal('pOverlay'); $('#pDelete').onclick=deleteTile;
$('#pOverlay').onclick=e=>{ if(e.target===$('#pOverlay')) hideModal('pOverlay'); };
$('#sSave').onclick=saveSection; $('#sCancel').onclick=()=>hideModal('sOverlay');
$('#sOverlay').onclick=e=>{ if(e.target===$('#sOverlay')) hideModal('sOverlay'); };

// tracker wiring
$('#tAdd').onclick=addLog;
$('#tDate').value=todayStr();
$('#tTime').value=nowTimeStr();
$('#exportLogBtn').onclick=exportLog;
$('#tNow').onclick = () => {
  $('#tDate').value = todayStr();
  $('#tTime').value = nowTimeStr();
  $('#tAdd').click();
};
$('#tMinus30').onclick = () => {
  const d = new Date(); d.setMinutes(d.getMinutes() - 30);
  $('#tDate').value = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  $('#tTime').value = String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
  $('#tAdd').click();
};
$('#tMinus60').onclick = () => {
  const d = new Date(); d.setHours(d.getHours() - 1);
  $('#tDate').value = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  $('#tTime').value = String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
  $('#tAdd').click();
};
$('#tDup').onclick = () => {
  if (typeof LOG === 'undefined' || LOG.length === 0) return toast('No previous drink');
  const last = LOG[LOG.length - 1];
  $('#tDrink').value = last.drink;
  $('#tQty').value = last.qty;
  $('#tDate').value = todayStr();
  $('#tTime').value = nowTimeStr();
  $('#tAdd').click();
};

['#tDrink','#tQty','#tDate','#tTime'].forEach(sel=>$(sel)?.addEventListener('input', renderSleepReadiness));
$('#sleepThreshold')?.addEventListener('input', e=>{ SLEEP_THRESHOLD=Math.max(0,Number(e.target.value)||0); LS.set('hub.sleep.threshold', SLEEP_THRESHOLD); renderSleepReadiness(); });
  $('#sleepBedtime')?.addEventListener('input', e=>{ SLEEP_BEDTIME=e.target.value||'23:00'; LS.set('hub.sleep.bedtime', SLEEP_BEDTIME); renderSleepReadiness(); });
$$('#rangeSeg button').forEach(b=>b.onclick=()=>{ $$('#rangeSeg button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); range=+b.dataset.r; $('#chartTitle').textContent='Last '+range+' days'; renderChart(); });

// calendar wiring
$('#calPrev').onclick=()=>{ calView.setMonth(calView.getMonth()-1); renderCalendar(); };
$('#calNext').onclick=()=>{ calView.setMonth(calView.getMonth()+1); renderCalendar(); };
$('#calToday').onclick=()=>{ calView=new Date(); calView.setDate(1); renderCalendar(); };
$('#evAdd').onclick=()=>openEvent(null);
$('#calImportIcs').onclick=()=>$('#icsInput').click();
$('#icsInput').onchange=e=>{ if(e.target.files[0]) importIcsFile(e.target.files[0]); e.target.value=''; };
$('#calExportIcs').onclick=downloadAllIcs;
$('#calToggleReadonly')?.addEventListener('click', () => setShowReadonlyEvents(!SHOW_READONLY_EVENTS));
$('#eSave').onclick=saveEvent;
$('#eDelete').onclick=deleteEvent;
$('#eCancel').onclick=()=>$('#eOverlay').classList.remove('show');
$('#eIcs').onclick=()=>{ const e=getEventById($('#eEditId').value); if(e) downloadIcs(e); };
$('#eOverlay').onclick=e=>{ if(e.target===$('#eOverlay'))$('#eOverlay').classList.remove('show'); };
$('#taskOverlay')?.addEventListener('click',e=>{ if(e.target===$('#taskOverlay')) $('#taskOverlay').classList.remove('show'); });
$('#notifBtn').onclick=enableNotifs;

// reset data (footer)
const _resetLink=$('#resetLink');
if(_resetLink) _resetLink.onclick=e=>{ e.preventDefault(); resetHubData(); };

// assistant wiring
$('#aiSend').onclick=sendChat;

$('#aiAttachBtn')?.addEventListener('click', () => $('#aiAttachFile').click());
$('#aiAttachFile')?.addEventListener('change', e => {
   const file = e.target.files[0];
   if(!file) return;
   if(typeof addAiWorkspaceFile === 'function') { addAiWorkspaceFile(file); e.target.value=''; return; }
   if(file.size > 2.5 * 1024 * 1024) { 
       return toast('File too large. Max 2.5MB.');
   }
   const reader = new FileReader();
   reader.onload = ev => {
       window.AI_ATTACHMENT = { name: file.name, text: ev.target.result.slice(0, 30000) }; // safely limits to ~10k tokens
       $('#aiAttachName').textContent = '📄 ' + file.name;
       $('#aiAttachBadge').style.display = 'flex';
       toast('Document attached to AI context!');
   };
   reader.readAsText(file);
});

$('#aiRefresh').onclick=checkOllama;

// AI connection settings
ensureAssistantSettingsModal?.();
$('#aiSettings').onclick=openAssistantSettings;
$('#setCancel').onclick=()=>hideModal('setOverlay');
$('#setOverlay').onclick=e=>{ if(e.target===$('#setOverlay')) hideModal('setOverlay'); };
$('#setReset').onclick=()=>{ $('#setUrl').value='http://127.0.0.1:11434'; $('#setKey').value=''; };
$('#setSave').onclick=async ()=>{
  OLLAMA_URL=($('#setUrl').value.trim()||'http://127.0.0.1:11434').replace(/\/+$/,'');
  OLLAMA_KEY=$('#setKey').value.trim();
  localStorage.setItem('hub.ollama.url',OLLAMA_URL);
  localStorage.setItem('hub.ollama.key',OLLAMA_KEY);
  hideModal('setOverlay');
  toast('Testing connection…');
  await checkOllama();
  toast(ollamaOnline ? '✅ Connected!' : '❌ Could not reach — check PC, Ollama & tunnel');
};
$('#aiModel').onchange=e=>{ aiModel=e.target.value; localStorage.setItem('hub.ollama.model',aiModel); saveAiResourceSettings?.(); syncAiResourceControls?.(); toast('Model: '+aiModel); };
$('#aiText').addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); sendChat(); } });
$('#aiText').addEventListener('input',e=>{ e.target.style.height='auto'; e.target.style.height=Math.min(140,e.target.scrollHeight)+'px'; });

// AI Department Quick-Chips wiring
$$('[data-dept-chip]').forEach(btn => {
  btn.onclick = () => {
    const chip = btn.dataset.deptChip;
    const ta = $('#aiText');
    if (!ta) return;
    const prefixes = {
      scout: '[@scout: Technical Intelligence] Research and evaluate options for: ',
      pm: '[@project-manager: Implementation Plan] Plan milestones and task breakdown for: ',
      uiux: '[@ui-ux: Design Spec] Create UI layout and WCAG 2.2 accessibility spec for: ',
      web: '[@project-manager / Web Team] Implement this feature: ',
      mapua: '[@mentor: Mapúa Architecture Coach] Guide me Socratically through: ',
      sre: '[@sre: Diagnostic Audit] Run a health and vulnerability scan on: '
    };
    ta.value = prefixes[chip] || '';
    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);
  };
});

// vault wiring
$('#vaultUnlockBtn')?.addEventListener('click',async()=>unlockVault($('#vaultPass').value));
$('#vaultPass')?.addEventListener('keydown',e=>{ if(e.key==='Enter') unlockVault($('#vaultPass').value); });
$('#vaultLockBtn')?.addEventListener('click',lockVault);
$('#vaultAddBtn')?.addEventListener('click',()=>openVaultEntry(VAULT_SELECTED||''));
$('#vaultSearch')?.addEventListener('input',renderVault);
$('#vSave')?.addEventListener('click',saveVaultEntry);
$('#vDelete')?.addEventListener('click',deleteVaultEntry);
$('#vCancel')?.addEventListener('click',()=>$('#vOverlay').classList.remove('show'));
$('#vOverlay')?.addEventListener('click',e=>{ if(e.target===$('#vOverlay')) $('#vOverlay').classList.remove('show'); });
$('#vTogglePw')?.addEventListener('click',e=>{ e.preventDefault(); $('#vPassword').type=$('#vPassword').type==='password'?'text':'password'; });
$('#vGeneratePw')?.addEventListener('click',e=>{ e.preventDefault(); $('#vPassword').value=strongPassword(); $('#vPassword').type='text'; toast('Strong password generated'); });
$('#vaultAllowAi')?.addEventListener('change',e=>{ VAULT_AI_ACCESS=e.target.checked; localStorage.setItem('hub.vault.allowAi',VAULT_AI_ACCESS); toast(VAULT_AI_ACCESS?'Assistant can search vault metadata':'Assistant vault metadata disabled'); });
$('#vaultAutoLock')?.addEventListener('change',e=>{ VAULT_AUTOLOCK_MIN=Number(e.target.value)||0; localStorage.setItem('hub.vault.autolock',VAULT_AUTOLOCK_MIN); vaultTouch(); toast(VAULT_AUTOLOCK_MIN?`Vault auto-lock: ${VAULT_AUTOLOCK_MIN} min`:'Vault auto-lock disabled'); });

function topOpenOverlay(){ const open=$$('.overlay.show'); return open[open.length-1]; }
function closeTopOverlay(){ const o=topOpenOverlay(); if(o){ o.classList.remove('show'); o.setAttribute('aria-hidden','true'); } }
function enhanceOverlays(){
  $$('.overlay').forEach(o=>{
    o.setAttribute('aria-hidden', o.classList.contains('show')?'false':'true');
    const modal=o.querySelector('.modal');
    if(modal){ modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true'); }
  });
}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape') closeTopOverlay();
  const o=topOpenOverlay();
  if(e.key==='Tab' && o){
    const focusables=$$('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])').filter(el=>o.contains(el) && !el.disabled && el.offsetParent!==null);
    if(focusables.length){
      const first=focusables[0], last=focusables[focusables.length-1];
      if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
    }
  }
});
window.addEventListener('resize',()=>{ if($('#page-track').classList.contains('active')) { renderChart(); renderIntraDayChart(); } });

// boot — guarded so bad data never leaves a blank "loading" screen
try{
  loadNotes();
  
  $('#notesEditor')?.addEventListener('keydown', e => {
    if(e.key === 'Tab') {
      e.preventDefault();
      const el=$('#notesEditor'); el.setRangeText('  ', el.selectionStart, el.selectionEnd, 'end');
      if (typeof updateCurrentNote === 'function') updateCurrentNote();
      if (typeof renderMarkdownPreview === 'function') renderMarkdownPreview();
    }
  });

  fillDrinkSelect();
  setupBioInputs?.();
  if (typeof loadTasks === "function") loadTasks();
  initSidebar();
  safeExperimentalRun?.('experimental-init', () => initExperimentalSystems?.());
  enhanceOverlays();
  renderPortal();
  renderFilters(); renderGrid();
  renderDashWidgets();
  if (typeof renderTodayDashboard === 'function') renderTodayDashboard();
  renderTracker();
  renderCalendar();
  updateReadonlyToggleUI?.();
  updateNotifLabel();
  checkReminders();
  if(typeof renderChatSessions==='function') renderChatSessions(); renderChat();
  updateSideStats();
  setInterval(checkReminders, 60*60*1000); // re-check hourly while open
}catch(err){
  console.error('Boot error:', err);
  document.body.innerHTML =
    '<div style="max-width:520px;margin:80px auto;font-family:system-ui;color:#e8ecf6;background:#141d31;border:1px solid #243150;border-radius:16px;padding:30px;text-align:center">'+
    '<h2 style="margin-bottom:12px">⚠️ Something went wrong loading saved data</h2>'+
    '<p style="color:#8896b5;line-height:1.6;margin-bottom:20px">This is usually old/corrupted data from a previous version. '+
    'Resetting clears Hub data in this browser only and fixes it. (Tip: use Export first if you want a backup.)</p>'+
    '<button onclick="(function(){for(var i=localStorage.length-1;i>=0;i--){var k=localStorage.key(i);if(k&&k.indexOf(\'hub.\')===0)localStorage.removeItem(k);}location.reload();})()" '+
    'style="background:linear-gradient(135deg,#6c8cff,#9d7bff);color:#fff;border:none;padding:12px 22px;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer">Reset Hub data & reload</button>'+
    '<p style="color:#8896b5;font-size:12px;margin-top:16px">Error: '+(err&&err.message||err)+'</p></div>';
}

// PWA: register service worker for install + background checks.
// Wrapped in try/catch + https check so it never blocks the app in a sandbox/preview.
try{
  const secureEnough = location.protocol==='https:' || location.hostname==='localhost' || location.hostname==='127.0.0.1';
  if('serviceWorker' in navigator && secureEnough){
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }
}catch(e){ /* ignore in restricted contexts */ }
