/* ===========================================================
   NOTE LIBRARY — Markdown powered
   =========================================================== */

/* Build 22: Note metadata stays in localStorage; note bodies move to
   IndexedDB/localStorage payload keys so large notes no longer bloat boot data. */
const NOTES_META_KEY='hub.notes.library.v1';
const NOTE_BODY_PREFIX='hub.notes.body.';
let NOTES = [];
let currentNoteId = null;
let NOTE_BODY_CACHE = {};
let NOTE_SAVE_TIMER = null;

function noteBodyKey(id){ return NOTE_BODY_PREFIX + safeDataId(id); }
function notePreview(content){ return String(content||'').replace(/\s+/g,' ').trim().slice(0,220); }
function normalizeNoteMeta(n){
  if(!n || typeof n!=='object') return null;
  const id=safeDataId(n.id || uid());
  const body = n.content != null ? String(n.content) : '';
  if(body) NOTE_BODY_CACHE[id]=body;
  return {
    id,
    title:String(n.title || 'Untitled Note').slice(0,160),
    projectId:String(n.projectId||''),
    project:String(n.project||''),
    ts:Number(n.ts)||Date.now(),
    chars:Number(n.chars)||body.length||0,
    preview:String(n.preview || notePreview(body) || '').slice(0,220),
    storage:String(n.storage || 'indexedDB')
  };
}
function normalizeNotesList(list){ return (Array.isArray(list)?list:[]).map(normalizeNoteMeta).filter(Boolean); }
async function saveNoteBody(id, content){
  id=safeDataId(id);
  const text=String(content||'');
  NOTE_BODY_CACHE[id]=text;
  const key=noteBodyKey(id);
  const payload={content:text,updated:new Date().toISOString(),chars:text.length};
  try{
    if(await window.HubStorage?.set?.(key, payload)){
      try{ localStorage.removeItem(key); }catch(e){}
      return 'indexedDB';
    }
  }catch(e){ logHubError?.('saveNoteBody:indexedDB', e); }
  try{ LS.set(key, payload); return 'localStorage-fallback'; }
  catch(e){ logHubError?.('saveNoteBody:localStorage', e); throw e; }
}
async function loadNoteBody(id){
  id=safeDataId(id);
  if(Object.prototype.hasOwnProperty.call(NOTE_BODY_CACHE,id)) return NOTE_BODY_CACHE[id];
  const key=noteBodyKey(id);
  try{
    const box=await window.HubStorage?.get?.(key, null);
    if(typeof box==='string'){ NOTE_BODY_CACHE[id]=box; return box; }
    if(box && typeof box.content==='string'){ NOTE_BODY_CACHE[id]=box.content; return box.content; }
  }catch(e){ logHubError?.('loadNoteBody:indexedDB', e); }
  try{
    const box=LS.get(key, null);
    if(typeof box==='string'){ NOTE_BODY_CACHE[id]=box; return box; }
    if(box && typeof box.content==='string'){ NOTE_BODY_CACHE[id]=box.content; return box.content; }
  }catch(e){}
  NOTE_BODY_CACHE[id]='';
  return '';
}
async function deleteNoteBody(id){
  id=safeDataId(id);
  const key=noteBodyKey(id);
  try{ await window.HubStorage?.remove?.(key); }catch(e){}
  try{ LS.remove ? LS.remove(key) : localStorage.removeItem(key); }catch(e){}
  delete NOTE_BODY_CACHE[id];
}
function notesMetadata(){ return NOTES.map(n=>({id:n.id,title:n.title,projectId:n.projectId||'',project:n.project||'',ts:Number(n.ts)||Date.now(),chars:Number(n.chars)||0,preview:String(n.preview||'').slice(0,220),storage:String(n.storage||'indexedDB')})); }
function saveNotesData() {
  LS.set(NOTES_META_KEY, notesMetadata());
  if (typeof updateSideStats === 'function') updateSideStats();
  if (typeof renderDashWidgets === 'function') renderDashWidgets();
  if (typeof renderProjectDashboard === 'function') renderProjectDashboard();
}
async function migrateNoteBodies(){
  const ids=Object.keys(NOTE_BODY_CACHE);
  if(!ids.length) return 0;
  let count=0;
  for(const id of ids){
    try{
      const text=NOTE_BODY_CACHE[id] || '';
      const storage=await saveNoteBody(id,text);
      const n=NOTES.find(x=>x.id===id);
      if(n){ n.storage=storage; n.chars=text.length; n.preview=notePreview(text); }
      count++;
    }catch(e){ logHubError?.('migrateNoteBodies', e); }
  }
  if(count) saveNotesData();
  return count;
}

function loadNotes() {
  NOTE_BODY_CACHE={};
  NOTES = normalizeNotesList(LS.get(NOTES_META_KEY, []));
  // Legacy fallback if migration somehow failed
  if (NOTES.length === 0) {
    const legacyMd = LS.get('hub.notes.md.v1', null);
    if (legacyMd) {
      const id=uid();
      NOTE_BODY_CACHE[id]=String(legacyMd).trim();
      NOTES.push({ id, title: 'Legacy Note', projectId:'', project:'', ts: Date.now(), chars:NOTE_BODY_CACHE[id].length, preview:notePreview(NOTE_BODY_CACHE[id]), storage:'indexedDB' });
      saveNotesData();
    }
  }
  migrateNoteBodies();
  renderNoteList();
  if (NOTES.length > 0) {
    openNote(NOTES[0].id);
  } else {
    $('#noteEditorContainer').style.display = 'none';
    $('#noteEmptyState').style.display = 'block';
  }
}

function renderNoteList() {
  const list = $('#noteList');
  if (!list) return;
  if (NOTES.length === 0) {
    list.innerHTML = '<div style="color:var(--mut);font-size:13px;padding:8px;">No notes yet.</div>';
    return;
  }
  const sorted = NOTES.slice().sort((a,b) => b.ts - a.ts);
  list.innerHTML = sorted.map(n => `
    <div class="note-item ${n.id === currentNoteId ? 'active' : ''}" onclick="openNote('${escAttr(n.id)}')"
         style="padding:10px 12px; cursor:pointer; border-radius:6px; background:${n.id === currentNoteId ? 'var(--bg2)' : 'transparent'}; border:1px solid ${n.id === currentNoteId ? 'var(--line)' : 'transparent'}; transition:.15s ease;">
      <div style="font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:${n.id === currentNoteId ? 'var(--txt)' : 'var(--mut)'};">${esc(n.title || 'Untitled')}</div>
      <div style="font-size:11px; color:var(--mut); margin-top:4px;">${new Date(n.ts).toLocaleDateString()} · ${Number(n.chars)||0} chars · ${esc(n.storage||'indexedDB')}</div>
    </div>
  `).join('');
}

function createNewNote() {
  const id = uid();
  NOTES.unshift({ id, title: 'Untitled Note', projectId:'', project:'', ts: Date.now(), chars:0, preview:'', storage:'indexedDB' });
  NOTE_BODY_CACHE[id]='';
  logHubActivity?.('note_created',{label:'Created note: Untitled Note', onceKey:'note_created:'+id});
  saveNotesData();
  currentNoteId=id;
  $('#noteEditorContainer').style.display = 'flex';
  $('#noteEmptyState').style.display = 'none';
  $('#noteTitle').value = 'Untitled Note';
  if($('#noteProject')) $('#noteProject').value = '';
  $('#notesEditor').value = '';
  renderMarkdownPreview();
  renderNoteList();
  setTimeout(()=>{ $('#noteTitle')?.focus(); $('#noteTitle')?.select(); },50);
}

async function openNote(id) {
  const n = NOTES.find(x => x.id === id);
  if (!n) return;
  currentNoteId = id;
  $('#noteEditorContainer').style.display = 'flex';
  $('#noteEmptyState').style.display = 'none';
  $('#noteTitle').value = n.title || '';
  if($('#noteProject')) $('#noteProject').value = n.projectId&&typeof projectById==='function' ? (projectById(n.projectId)?.title||n.project||'') : (n.project||'');
  $('#notesEditor').value = 'Loading note…';
  const body = await loadNoteBody(id);
  if(currentNoteId !== id) return;
  $('#notesEditor').value = body || '';
  renderMarkdownPreview();
  renderNoteList();
}

async function deleteCurrentNote() {
  if (!currentNoteId) return;
  if (!confirm('Are you sure you want to delete this note?')) return;
  const id=currentNoteId;
  NOTES = NOTES.filter(x => x.id !== id);
  await deleteNoteBody(id);
  saveNotesData();
  currentNoteId = null;
  loadNotes();
}

function updateCurrentNote() {
  if (!currentNoteId) return;
  const n = NOTES.find(x => x.id === currentNoteId);
  if (!n) return;
  const newTitle = $('#noteTitle').value.trim();
  const newContent = $('#notesEditor').value;
  if(newContent === 'Loading note…') return;
  const projectName = ($('#noteProject')?.value||'').trim();
  const linkedProject = projectName&&typeof projectByTitle==='function' ? projectByTitle(projectName) : null;
  let changed = false;
  if (n.title !== newTitle) { n.title = newTitle; changed = true; }
  const nextProjectId = linkedProject ? linkedProject.id : '';
  const nextProject = linkedProject ? linkedProject.title : projectName;
  if ((n.projectId||'') !== nextProjectId) { n.projectId = nextProjectId; changed = true; }
  if ((n.project||'') !== nextProject) { n.project = nextProject; changed = true; }
  if ((n.preview||'') !== notePreview(newContent) || Number(n.chars)!==newContent.length) { n.preview=notePreview(newContent); n.chars=newContent.length; changed=true; }
  NOTE_BODY_CACHE[currentNoteId]=newContent;
  clearTimeout(NOTE_SAVE_TIMER);
  const saveId=currentNoteId;
  NOTE_SAVE_TIMER=setTimeout(async()=>{
    try{ const storage=await saveNoteBody(saveId, NOTE_BODY_CACHE[saveId]||''); const note=NOTES.find(x=>x.id===saveId); if(note){ note.storage=storage; saveNotesData(); renderNoteList(); } }
    catch(e){ logHubError?.('note-body-save', e); }
  }, 180);
  if (changed) {
    n.ts = Date.now();
    logHubActivity?.('note_edited',{label:'Edited note: '+(n.title||'Untitled Note'), throttleKey:'note_edited:'+currentNoteId, throttleMs:15*60*1000});
    saveNotesData();
    renderNoteList();
  }
}

$('#noteTitle')?.addEventListener('input', updateCurrentNote);
$('#noteProject')?.addEventListener('input', updateCurrentNote);
$('#notesEditor')?.addEventListener('input', () => {
  renderMarkdownPreview();
  updateCurrentNote();
});

// Markdown rendering
function renderInlineMarkdown(text) {
  let x = esc(text);
  x = x.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (m, alt, url) => { const u=safeUrl(url); return u?`<img src="${escAttr(u)}" alt="${escAttr(alt)}" style="max-width:100%;height:auto;border-radius:8px;margin:8px 0">`:esc(m); });
  x = x.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, url) => { const u=safeUrl(url); return u?`<a href="${escAttr(u)}" target="_blank" rel="noopener noreferrer" style="color:var(--acc)">${label}</a>`:label; });
  x = x.replace(/`([^`]+)`/g, '<code>$1</code>');
  x = x.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  x = x.replace(/~~([^~]+)~~/g, '<s>$1</s>');
  x = x.replace(/(^|\s)\*([^*\n]+)\*/g, '$1<em>$2</em>');
  return x;
}

function markdownToHtml(md) {
  const lines = String(md||'').replace(/\r\n/g,'\n').split('\n');
  let html='', inUl=false, inOl=false, inCode=false, code=[], lang='code';
  const closeLists = () => { if(inUl){ html+='</ul>'; inUl=false; } if(inOl){ html+='</ol>'; inOl=false; } };
  lines.forEach(line => {
    if(/^```/.test(line)){
      if(inCode){ 
        html+=`<div class="code-block"><div class="code-head"><span class="lang-tag">${esc(lang)}</span><button onclick="window.copyCodeBlock(this)">📋 Copy</button></div><pre><code>${esc(code.join('\n'))}</code></pre></div>`; 
        code=[]; inCode=false; 
      }
      else { 
        closeLists(); inCode=true; 
        const match = line.match(/^```([a-zA-Z0-9_-]+)/);
        lang = match ? match[1] : 'code';
      }
      return;
    }
    if(inCode){ code.push(line); return; }
    if(!line.trim()){ closeLists(); html+=''; return; }
    let m;
    if((m=line.match(/^(#{1,6})\s+(.+)$/))){ closeLists(); const lvl=m[1].length; html+=`<h${lvl}>${renderInlineMarkdown(m[2])}</h${lvl}>`; return; }
    if((m=line.match(/^[-*]\s+(.+)$/))){ if(inOl){ html+='</ol>'; inOl=false; } if(!inUl){ html+='<ul>'; inUl=true; } html+=`<li>${renderInlineMarkdown(m[1])}</li>`; return; }
    if((m=line.match(/^\d+\.\s+(.+)$/))){ if(inUl){ html+='</ul>'; inUl=false; } if(!inOl){ html+='<ol>'; inOl=true; } html+=`<li>${renderInlineMarkdown(m[1])}</li>`; return; }
    if((m=line.match(/^>\s+(.+)$/))){ closeLists(); html+=`<blockquote>${renderInlineMarkdown(m[1])}</blockquote>`; return; }
    closeLists(); html+=`<p>${renderInlineMarkdown(line)}</p>`;
  });
  closeLists(); if(inCode) html+=`<div class="code-block"><div class="code-head"><span class="lang-tag">${esc(lang)}</span><button onclick="window.copyCodeBlock(this)">📋 Copy</button></div><pre><code>${esc(code.join('\n'))}</code></pre></div>`;
  return sanitizeHtml(html);

}

function renderMarkdownPreview() {
  const p = $('#notesPreview');
  if(p) p.innerHTML = markdownToHtml($('#notesEditor').value);
}

function notesValue() {
  if (!currentNoteId) return '';
  const val=$('#notesEditor').value;
  return val==='Loading note…' ? '' : val;
}
function setNotesValue(value) {
  if (!currentNoteId) {
    const id=uid();
    currentNoteId=id;
    NOTES.unshift({ id, title:'Assistant Note', projectId:'', project:'', ts:Date.now(), chars:0, preview:'', storage:'indexedDB' });
    $('#noteEditorContainer').style.display='flex';
    $('#noteEmptyState').style.display='none';
    $('#noteTitle').value='Assistant Note';
    if($('#noteProject')) $('#noteProject').value='';
  }
  const el = $('#notesEditor');
  if (!el) return;
  el.value = String(value ?? '');
  NOTE_BODY_CACHE[currentNoteId]=el.value;
  renderMarkdownPreview();
  updateCurrentNote();
  saveNoteBody(currentNoteId, el.value).then(storage=>{ const n=NOTES.find(x=>x.id===currentNoteId); if(n){ n.storage=storage; saveNotesData(); renderNoteList(); } }).catch(e=>logHubError?.('setNotesValue:save', e));
}
window.setNotesValue = setNotesValue;
window.loadNoteBody = loadNoteBody;
window.saveNoteBody = saveNoteBody;
window.deleteNoteBody = deleteNoteBody;
window.migrateNoteBodies = migrateNoteBodies;

// Markdown formatting helpers
function selectedText(){ const el=$('#notesEditor'); return el.value.slice(el.selectionStart, el.selectionEnd); }
function replaceSelection(text){ const el=$('#notesEditor'); const start=el.selectionStart, end=el.selectionEnd; el.setRangeText(text,start,end,'end'); el.focus(); renderMarkdownPreview(); updateCurrentNote(); }
function mdWrap(pre,post){ const t=selectedText() || 'text'; replaceSelection(pre+t+post); }
function mdHeading(level){ const el=$('#notesEditor'); const pos=el.selectionStart; const start=el.value.lastIndexOf('\n',pos-1)+1; el.setSelectionRange(start,start); replaceSelection('#'.repeat(level)+' '); }
function mdList(prefix){ const t=selectedText() || 'list item'; replaceSelection(t.split('\n').map(line=>prefix+line).join('\n')); }
function mdLink(){ const url=safeUrl(prompt('Link URL')); if(!url) return; const label=selectedText() || 'link'; replaceSelection(`[${label}](${url})`); }
function mdImage(){ const url=safeUrl(prompt('Image URL')); if(!url) return; const alt=selectedText() || 'image'; replaceSelection(`![${alt}](${url})`); }

function htmlToMarkdown(html){
  const doc=new DOMParser().parseFromString(sanitizeHtml(html||''),'text/html');
  doc.querySelectorAll('br').forEach(br=>br.replaceWith('\n'));
  doc.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h=>{ const lvl=+h.tagName[1]; h.replaceWith('\n'+ '#'.repeat(lvl)+' '+h.textContent.trim()+'\n'); });
  doc.querySelectorAll('li').forEach(li=>li.replaceWith('- '+li.textContent.trim()+'\n'));
  doc.querySelectorAll('p,div').forEach(el=>el.append('\n'));
  return doc.body.textContent.replace(/\n{3,}/g,'\n\n').trim();
}
