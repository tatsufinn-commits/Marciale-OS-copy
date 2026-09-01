/* ===========================================================
   BOOKMARKS
   =========================================================== */
const SEED=[
  {id:uid(),title:'Arena.ai',url:'https://arena.ai',desc:'Where this was built.',cat:'Work',tags:['ai','tools'],ts:Date.now()},
  {id:uid(),title:'MDN Web Docs',url:'https://developer.mozilla.org',desc:'Web reference.',cat:'Dev',tags:['reference'],ts:Date.now()-1000},
];
function normalizeBookmark(b, keepId=true){
  if(!b || typeof b!=='object') return null;
  const url=safeUrl(b.url || b.href || '');
  return {
    id: keepId ? safeDataId(b.id) : uid(),
    title: String(b.title || host(url) || 'Untitled'),
    url,
    desc: String(b.desc || ''),
    cat: String(b.cat || b.category || 'General'),
    tags: Array.isArray(b.tags) ? b.tags.map(t=>String(t)).filter(Boolean) : [],
    ts: Number(b.ts) || Date.now()
  };
}
let DB = (Array.isArray(LS.get('hub.bookmarks.v1', null)) ? LS.get('hub.bookmarks.v1', null) : SEED.slice())
  .map(b=>normalizeBookmark(b,true)).filter(Boolean);
let activeFilter='All', query='';
function saveBM(){ LS.set('hub.bookmarks.v1', DB); if(typeof updateSideStats==='function') updateSideStats(); if(typeof renderDashWidgets==='function') renderDashWidgets(); }

function renderFilters(){
  const cats=['All',...Array.from(new Set(DB.map(b=>b.cat))).sort()];
  $('#filters').innerHTML=cats.map(c=>`<span class="chip ${c===activeFilter?'active':''}" data-cat="${escAttr(c)}">${esc(c)}</span>`).join('');
  $$('#filters .chip').forEach(ch=>ch.onclick=()=>{ activeFilter=ch.dataset.cat; renderFilters(); renderGrid(); });
}
function renderGrid(){
  let list=DB.slice().sort((a,b)=>b.ts-a.ts);
  if(activeFilter!=='All') list=list.filter(b=>b.cat===activeFilter);
  if(query){ const q=query.toLowerCase(); list=list.filter(b=>(b.title+b.url+b.desc+(b.tags||[]).join(' ')+b.cat).toLowerCase().includes(q)); }
  $('#bmCount').textContent=`${list.length} of ${DB.length}`;
  if(!list.length){ $('#grid').innerHTML=`<div class="empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 4h12a2 2 0 0 1 2 2v15l-8-4-8 4V6a2 2 0 0 1 2-2z"/></svg><div>No bookmarks here. Click <b>Add bookmark</b>.</div></div>`; return; }
  $('#grid').innerHTML=list.map(b=>{
    const href=safeUrl(b.url);
    return `<div class="card">
      <div class="actions">
        <button class="iconbtn" data-edit-bm="${escAttr(b.id)}" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
        <button class="iconbtn" data-del-bm="${escAttr(b.id)}" title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg></button>
      </div>
      <div class="top"><div class="fav" style="background:${colorFor(b.title)}">${esc((b.title[0]||'?').toUpperCase())}</div>
        <div class="info"><div class="title">${esc(b.title)}</div><div class="url">${esc(host(b.url))}</div></div></div>
      ${b.desc?`<div class="desc">${esc(b.desc)}</div>`:''}
      ${(b.tags&&b.tags.length)?`<div class="tags">${b.tags.map(t=>`<span class="tag">#${esc(t)}</span>`).join('')}</div>`:''}
      <a class="go" href="${escAttr(href || '#')}" target="_blank" rel="noopener noreferrer" title="Open Link"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></a>
    </div>`;
  }).join('');
  $$('#grid [data-edit-bm]').forEach(btn=>btn.onclick=()=>{ const b=DB.find(x=>x.id===btn.dataset.editBm); if(b) openModal(b); });
  $$('#grid [data-del-bm]').forEach(btn=>btn.onclick=()=>window.delBm(btn.dataset.delBm));
  $$('#grid .go').forEach(a=>{ if(a.getAttribute('href')==='#') a.onclick=e=>{ e.preventDefault(); toast('Invalid URL'); }; });
}

/* Dynamic bookmark modal (migrated out of index.html in Build 7) */
function ensureBookmarkModal(){
  createModal?.('overlay', `
    <h3 id="modalTitle">Add bookmark</h3>
    <input type="hidden" id="editId">
    <div class="field"><label>Title</label><input id="fTitle" placeholder="e.g. My design board"></div>
    <div class="field"><label>URL</label><input id="fUrl" placeholder="https://…"></div>
    <div class="field"><label>Description (optional)</label><textarea id="fDesc" placeholder="What is this?"></textarea></div>
    <div class="two">
      <div class="field"><label>Category</label>
        <select id="fCat"><option>General</option><option>Work</option><option>Design</option><option>Docs</option><option>Dev</option><option>Learning</option><option>Personal</option></select>
      </div>
      <div class="field"><label>Tags (comma sep)</label><input id="fTags" placeholder="research, ui"></div>
    </div>
    <div class="row"><button class="btn" id="cancelBtn">Cancel</button><button class="btn primary" id="saveBtn">Save</button></div>
  `);
}
window.ensureBookmarkModal=ensureBookmarkModal;

function openModal(edit){
  ensureBookmarkModal();
  showModal('overlay');
  if(edit){ $('#modalTitle').textContent='Edit bookmark'; $('#editId').value=edit.id; $('#fTitle').value=edit.title; $('#fUrl').value=edit.url; $('#fDesc').value=edit.desc||''; $('#fCat').value=edit.cat||'General'; $('#fTags').value=(edit.tags||[]).join(', '); }
  else{ $('#modalTitle').textContent='Add bookmark'; $('#editId').value=''; $('#fTitle').value=''; $('#fUrl').value=''; $('#fDesc').value=''; $('#fCat').value='General'; $('#fTags').value=''; }
  setTimeout(()=>$('#fTitle').focus(),50);
}
function saveBmForm(){
  let url=safeUrl($('#fUrl').value); const title=$('#fTitle').value.trim();
  if(!title){ toast('Please add a title'); return }
  if(!url){ toast('Valid http(s) URL required'); return }
  const tags=$('#fTags').value.split(',').map(t=>t.trim()).filter(Boolean);
  const id=$('#editId').value;
  if(id){ const b=DB.find(x=>x.id===id); if(!b){ toast('Bookmark not found'); return; } Object.assign(b,{title,url,desc:$('#fDesc').value.trim(),cat:$('#fCat').value,tags}); toast('Updated'); }
  else{ DB.push({id:uid(),title,url,desc:$('#fDesc').value.trim(),cat:$('#fCat').value,tags,ts:Date.now()}); logHubActivity?.('bookmark_added',{label:'Bookmarked: '+title}); toast('Added'); }
  saveBM(); hideModal('overlay'); renderFilters(); renderGrid();
}
window.editBm=id=>openModal(DB.find(b=>b.id===id));
window.delBm=id=>{ if(confirm('Delete this bookmark?')){ DB=DB.filter(b=>b.id!==id); saveBM(); renderFilters(); renderGrid(); toast('Deleted'); } };
function exportData(){ const blob=new Blob([JSON.stringify(DB,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='hub-bookmarks.json'; a.click(); toast('Exported'); }
function importData(file){ const r=new FileReader(); r.onload=()=>{ try{ let n=0; if(file.name.endsWith('.json')){ const arr=JSON.parse(r.result); if(!Array.isArray(arr)) throw new Error('Expected array'); arr.forEach(b=>{ const nb=normalizeBookmark(b,false); if(nb&&nb.url){ DB.push(nb); n++; } }); } else { new DOMParser().parseFromString(r.result,'text/html').querySelectorAll('a').forEach(a=>{ const nb=normalizeBookmark({title:a.textContent,url:a.getAttribute('href'),desc:'',cat:'General',tags:[]},false); if(nb&&nb.url){ DB.push(nb); n++; } }); } saveBM(); renderFilters(); renderGrid(); toast(`Imported ${n}`); }catch(e){ toast('Could not read file'); } }; r.readAsText(file); }


