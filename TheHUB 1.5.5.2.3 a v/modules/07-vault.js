/* ===========================================================
   ENCRYPTED VAULT — local AES-GCM vault for accounts/passwords
   =========================================================== */
let VAULT={sites:[]}, VAULT_KEY=null, VAULT_UNLOCKED=false, VAULT_SELECTED=null;
if(typeof window !== 'undefined'){
  window.VAULT = VAULT;
  window.VAULT_KEY = VAULT_KEY;
  window.VAULT_UNLOCKED = VAULT_UNLOCKED;
}
let VAULT_AI_ACCESS = localStorage.getItem('hub.vault.allowAi') === 'true';
let VAULT_AUTOLOCK_MIN = Number(localStorage.getItem('hub.vault.autolock') || 5);
let VAULT_LAST_ACTIVE = Date.now();
const VAULT_CLIPBOARD_CLEAR_SEC = 45;
function bytesToB64(bytes){ let bin=''; new Uint8Array(bytes).forEach(b=>bin+=String.fromCharCode(b)); return btoa(bin); }
function b64ToBytes(b64){ const bin=atob(b64); const out=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++) out[i]=bin.charCodeAt(i); return out; }

function vaultTouch(){ if(VAULT_UNLOCKED) VAULT_LAST_ACTIVE=Date.now(); }
function vaultAutoLockMs(){ return Math.max(0, Number(VAULT_AUTOLOCK_MIN)||0) * 60000; }
function syncVaultSecurityInputs(){ if($('#vaultAllowAi')) $('#vaultAllowAi').checked=VAULT_AI_ACCESS; if($('#vaultAutoLock')) $('#vaultAutoLock').value=String(VAULT_AUTOLOCK_MIN); }
function strongPassword(len=20){ const chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()-_=+[]{}'; const a=new Uint32Array(len); crypto.getRandomValues(a); return Array.from(a,n=>chars[n%chars.length]).join(''); }
async function copyVaultText(text, sensitive=false){
  await navigator.clipboard.writeText(String(text||'')); toast(sensitive?`Copied — clipboard clears in ${VAULT_CLIPBOARD_CLEAR_SEC}s`:'Copied');
  if(sensitive) setTimeout(()=>navigator.clipboard.writeText('').catch(()=>{}), VAULT_CLIPBOARD_CLEAR_SEC*1000);
}
setInterval(()=>{ if(VAULT_UNLOCKED && vaultAutoLockMs() && Date.now()-VAULT_LAST_ACTIVE>vaultAutoLockMs()) lockVault('Vault auto-locked'); }, 30000);
document.addEventListener('visibilitychange',()=>{ if(document.hidden && VAULT_UNLOCKED && vaultAutoLockMs() && VAULT_AUTOLOCK_MIN<=1) lockVault('Vault locked'); });
['click','keydown','mousemove','touchstart'].forEach(ev=>document.addEventListener(ev,vaultTouch,{passive:true}));

async function deriveVaultKey(pass,salt){
  const base=await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:250000,hash:'SHA-256'}, base, {name:'AES-GCM',length:256}, false, ['encrypt','decrypt']);
}
async function encryptVault(){
  if(!VAULT_KEY) throw new Error('Vault locked');
  const iv=crypto.getRandomValues(new Uint8Array(12));
  const plain=new TextEncoder().encode(JSON.stringify(VAULT));
  const cipher=await crypto.subtle.encrypt({name:'AES-GCM',iv}, VAULT_KEY, plain);
  localStorage.setItem('hub.vault.data', JSON.stringify({iv:bytesToB64(iv),cipher:bytesToB64(cipher),updated:new Date().toISOString()}));
}
async function unlockVault(pass){
  pass=String(pass||''); if(pass.length<8){ toast('Use at least 8 characters for the master password'); return false; }
  let saltB64=localStorage.getItem('hub.vault.salt');
  let salt=saltB64?b64ToBytes(saltB64):crypto.getRandomValues(new Uint8Array(16));
  const key=await deriveVaultKey(pass,salt);
  const saved=localStorage.getItem('hub.vault.data');
  if(saved){
    try{
      const box=JSON.parse(saved); const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:b64ToBytes(box.iv)}, key, b64ToBytes(box.cipher));
      VAULT=JSON.parse(new TextDecoder().decode(plain));
    }catch(e){ toast('Wrong master password or corrupted vault'); return false; }
  }else{
    VAULT={sites:[]}; localStorage.setItem('hub.vault.salt', bytesToB64(salt));
    VAULT_KEY=key; VAULT_UNLOCKED=true; if(typeof window !== 'undefined') window.VAULT_UNLOCKED=true; await encryptVault();
  }
  VAULT_KEY=key;
  VAULT_UNLOCKED=true;
  if(typeof window !== 'undefined'){
    window.VAULT_KEY = key;
    window.VAULT_UNLOCKED = true;
    window.VAULT = VAULT;
  }
  vaultTouch(); syncVaultSecurityInputs(); renderVault();
  if (typeof renderTodayDashboard === 'function') renderTodayDashboard(); updateSideStats(); toast('Vault unlocked'); return true;
}
function lockVault(msg='Vault locked'){
  VAULT_KEY=null;
  VAULT_UNLOCKED=false;
  if(typeof window !== 'undefined'){
    window.VAULT_KEY = null;
    window.VAULT_UNLOCKED = false;
    window.VAULT = {sites:[]};
  }
  VAULT={sites:[]};
  VAULT_SELECTED=null;
  try{ if(typeof $ === 'function' && $('#vaultPass')) $('#vaultPass').value=''; }catch(e){}
  if(typeof renderVault === 'function') renderVault();
  if(typeof renderTodayDashboard === 'function') renderTodayDashboard();
  if(typeof updateSideStats === 'function') updateSideStats();
  if(typeof toast === 'function') toast(msg);
}

function checkPresenceVaultSecurity(awayDurationMs){
  const awayMin = (Number(awayDurationMs)||0) / 60000;
  const isUnlocked = (typeof VAULT_UNLOCKED !== 'undefined' && VAULT_UNLOCKED) || (typeof window !== 'undefined' && window.VAULT_UNLOCKED);
  if(isUnlocked && awayMin >= 3){
    lockVault('Vault auto-locked: User away > 3 minutes (Spatial Privacy)');
    return true;
  }
  return false;
}

window.lockVault = lockVault;
window.unlockVault = unlockVault;
window.saveVault = saveVault;
window.checkPresenceVaultSecurity = checkPresenceVaultSecurity;
if(typeof window.Hub !== 'undefined'){
  window.Hub.lockVault = lockVault;
  window.Hub.unlockVault = unlockVault;
}
async function saveVault(){ await encryptVault(); renderVault();
  if (typeof renderTodayDashboard === 'function') renderTodayDashboard(); updateSideStats(); }
function vaultSiteById(id){ return VAULT.sites.find(s=>s.id===id); }
function vaultAccountById(site,id){ return site && site.accounts.find(a=>a.id===id); }
function vaultMetaCorpus(){
  if(!VAULT_UNLOCKED || !VAULT_AI_ACCESS) return [];
  const items=[]; VAULT.sites.forEach(site=>site.accounts.forEach(a=>items.push({type:'vault',title:`${site.name} — ${a.label||a.email||a.username}`,text:[site.name,site.url,a.label,a.email,a.username,a.notes].join(' ')})));
  return items;
}
function renderVault(){
  const locked=$('#vaultLocked'), unlocked=$('#vaultUnlocked'), add=$('#vaultAddBtn'), lock=$('#vaultLockBtn'); if(!locked) return;
  locked.style.display=VAULT_UNLOCKED?'none':'block'; unlocked.style.display=VAULT_UNLOCKED?'block':'none'; add.style.display=VAULT_UNLOCKED?'inline-flex':'none'; lock.style.display=VAULT_UNLOCKED?'inline-flex':'none';
  if(!VAULT_UNLOCKED) return;
  syncVaultSecurityInputs();
  const q=($('#vaultSearch')?.value||'').toLowerCase();
  const sites=VAULT.sites.filter(site=>(site.name+' '+site.url+' '+site.accounts.map(a=>[a.label,a.email,a.username,a.notes].join(' ')).join(' ')).toLowerCase().includes(q));
  if(!VAULT_SELECTED && sites[0]) VAULT_SELECTED=sites[0].id;
  $('#vaultSites').innerHTML=sites.length?sites.map(site=>`<div class="vault-site ${site.id===VAULT_SELECTED?'active':''}" data-vsite="${escAttr(site.id)}"><div class="vault-site-ico">${esc((site.name||'?')[0].toUpperCase())}</div><div><div class="name">${esc(site.name)}</div><div class="meta">${site.accounts.length} account${site.accounts.length!==1?'s':''}${site.url?' · '+esc(host(site.url)):''}</div></div></div>`).join(''):'<div class="vault-empty">No matching websites.</div>';
  $$('#vaultSites [data-vsite]').forEach(el=>el.onclick=()=>{ VAULT_SELECTED=el.dataset.vsite; renderVault();
  if (typeof renderTodayDashboard === 'function') renderTodayDashboard(); });
  const site=vaultSiteById(VAULT_SELECTED);
  if(!site){ $('#vaultDetail').innerHTML='<div class="vault-empty">Add your first website/account.</div>'; return; }
  $('#vaultDetail').innerHTML=`<div class="vault-detail-head"><div class="vault-detail-title"><div class="vault-site-ico lg">${esc((site.name||'?')[0].toUpperCase())}</div><div><h3>${esc(site.name)}</h3><div class="side-note">${site.url?`<a href="${escAttr(safeUrl(site.url)||'#')}" target="_blank" rel="noopener noreferrer">${esc(site.url)}</a>`:'No URL'}</div></div></div><button class="btn sm" data-vadd-site="${escAttr(site.id)}">+ Account</button></div>`+
    (site.accounts.length?site.accounts.map(a=>`<div class="vault-account"><div class="top"><div><div class="title">${esc(a.label||a.email||a.username||'Account')}</div><div class="sub">${a.email?`Email: ${esc(a.email)}<br>`:''}${a.username?`Username: ${esc(a.username)}`:''}</div></div><button class="btn sm" data-vedit="${escAttr(site.id)}:${escAttr(a.id)}">Edit</button></div><div class="vault-actions">${a.email?`<button class="btn sm" data-copy="${escAttr(a.email)}">Copy email</button>`:''}${a.username?`<button class="btn sm" data-copy="${escAttr(a.username)}">Copy username</button>`:''}<button class="btn sm primary" data-copy-pw="${escAttr(site.id)}:${escAttr(a.id)}">Copy password</button></div>${a.notes?`<div class="side-note vault-note">${esc(a.notes)}</div>`:''}</div>`).join(''):'<div class="vault-empty">No accounts yet. Add one for this website.</div>');
  $$('[data-vadd-site]').forEach(b=>b.onclick=()=>openVaultEntry(b.dataset.vaddSite));
  $$('[data-vedit]').forEach(b=>b.onclick=()=>{ const [sid,aid]=b.dataset.vedit.split(':'); openVaultEntry(sid,aid); });
  $$('[data-copy]').forEach(b=>b.onclick=()=>copyVaultText(b.dataset.copy,false));
  $$('[data-copy-pw]').forEach(b=>b.onclick=()=>{ const [sid,aid]=b.dataset.copyPw.split(':'); const st=vaultSiteById(sid), ac=vaultAccountById(st,aid); if(ac) copyVaultText(ac.password||'',true); });
}
function openVaultEntry(siteId='',accountId=''){
  if(!VAULT_UNLOCKED){ toast('Unlock vault first'); return; }
  const site=vaultSiteById(siteId); const a=vaultAccountById(site,accountId);
  $('#vModalTitle').textContent=a?'Edit vault account':'Add vault account'; $('#vSiteId').value=siteId; $('#vAccountId').value=accountId||'';
  $('#vSiteName').value=site?.name||''; $('#vSiteUrl').value=site?.url||''; $('#vLabel').value=a?.label||''; $('#vEmail').value=a?.email||''; $('#vUsername').value=a?.username||''; $('#vPassword').value=a?.password||''; $('#vPassword').type='password'; $('#vNotes').value=a?.notes||''; $('#vDelete').style.display=a?'block':'none'; $('#vOverlay').classList.add('show');
}
async function saveVaultEntry(){
  const siteName=$('#vSiteName').value.trim(); if(!siteName){ toast('Website/service required'); return; }
  let site=vaultSiteById($('#vSiteId').value);
  if(!site){ site={id:uid(),name:siteName,url:safeUrl($('#vSiteUrl').value)||$('#vSiteUrl').value.trim(),accounts:[]}; VAULT.sites.push(site); }
  site.name=siteName; site.url=safeUrl($('#vSiteUrl').value)||$('#vSiteUrl').value.trim();
  let a=vaultAccountById(site,$('#vAccountId').value);
  if(!a){ a={id:uid()}; site.accounts.push(a); }
  Object.assign(a,{label:$('#vLabel').value.trim(),email:$('#vEmail').value.trim(),username:$('#vUsername').value.trim(),password:$('#vPassword').value,notes:$('#vNotes').value.trim(),updated:new Date().toISOString()});
  VAULT_SELECTED=site.id; await saveVault(); $('#vOverlay').classList.remove('show'); toast('Vault saved encrypted');
}
async function deleteVaultEntry(){
  const site=vaultSiteById($('#vSiteId').value), aid=$('#vAccountId').value; if(!site||!aid) return;
  if(confirm('Delete this vault account?')){ site.accounts=site.accounts.filter(a=>a.id!==aid); if(!site.accounts.length && confirm('No accounts left. Delete website too?')) VAULT.sites=VAULT.sites.filter(s=>s.id!==site.id); await saveVault(); $('#vOverlay').classList.remove('show'); }
}

