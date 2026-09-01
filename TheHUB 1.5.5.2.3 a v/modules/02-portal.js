/* ===========================================================
   PORTAL (sections + tiles) — fully editable, saved locally
   =========================================================== */
const DEFAULT_PORTAL = [
  {name:'AI', color:'#10A37F', tiles:[
    {nm:'ChatGPT',sub:'OpenAI',url:'https://chat.openai.com',c:'#10A37F',i:'✦'},
    {nm:'Claude',sub:'Anthropic',url:'https://claude.ai',c:'#d97757',i:'C'},
    {nm:'Gemini',sub:'Google',url:'https://gemini.google.com',c:'#4285F4',i:'G'},
    {nm:'Grok',sub:'xAI',url:'https://grok.com',c:'#111',i:'X'},
    {nm:'Perplexity',sub:'Search',url:'https://perplexity.ai',c:'#20808d',i:'P'},
    {nm:'Arena.ai',sub:'Agents',url:'https://arena.ai',c:'#6c8cff',i:'A'},
  ]},
  {name:'Documents', color:'#4285F4', tiles:[
    {nm:'Google Docs',sub:'Docs',url:'https://docs.google.com',c:'#4285F4',i:'D'},
    {nm:'Google Drive',sub:'Files',url:'https://drive.google.com',c:'#0F9D58',i:'▲'},
    {nm:'Sheets',sub:'Spreadsheets',url:'https://sheets.google.com',c:'#0F9D58',i:'S'},
    {nm:'Notion',sub:'Notes',url:'https://notion.so',c:'#111',i:'N'},
  ]},
  {name:'Social', color:'#EA4335', tiles:[
    {nm:'Gmail',sub:'Email',url:'https://mail.google.com',c:'#EA4335',i:'M'},
    {nm:'WhatsApp',sub:'Chat',url:'https://web.whatsapp.com',c:'#25D366',i:'W'},
    {nm:'Instagram',sub:'Photos',url:'https://instagram.com',c:'#E1306C',i:'I'},
    {nm:'Facebook',sub:'Social',url:'https://facebook.com',c:'#1877F2',i:'f'},
    {nm:'LinkedIn',sub:'Network',url:'https://linkedin.com',c:'#0A66C2',i:'in'},
  ]},
  {name:'Entertainment', color:'#FF0000', tiles:[
    {nm:'YouTube',sub:'Video',url:'https://youtube.com',c:'#FF0000',i:'▶'},
    {nm:'Netflix',sub:'Streaming',url:'https://netflix.com',c:'#E50914',i:'N'},
    {nm:'Spotify',sub:'Music',url:'https://open.spotify.com',c:'#1DB954',i:'♪'},
    {nm:'Twitch',sub:'Live',url:'https://twitch.tv',c:'#9146FF',i:'T'},
  ]},
  {name:'Work', color:'#ffb454', tiles:[
    {nm:'Autodesk',sub:'RVT / CAD',url:'https://www.autodesk.com',c:'#ffb454',i:'A'},
    {nm:'AutoCAD Web',sub:'.dwg files',url:'https://web.autocad.com',c:'#E51937',i:'⌖'},
    {nm:'Autodesk Docs',sub:'BIM 360',url:'https://acc.autodesk.com',c:'#0696D7',i:'B'},
    {nm:'BIM Collab',sub:'Coordination',url:'https://www.bimcollab.com',c:'#3ecf8e',i:'⬡'},
  ]},
];
let PORTAL = sanitizePortal(LS.get('hub.portal.v2', null) || DEFAULT_PORTAL);
function sanitizePortal(p){
  if(!Array.isArray(p)) p=DEFAULT_PORTAL;
  return p.filter(s=>s&&typeof s==='object').map(s=>({
    name: String(s.name || 'Untitled'),
    color: safeColor(s.color || '#6c8cff'),
    tiles: Array.isArray(s.tiles) ? s.tiles.filter(t=>t&&t.nm).map(t=>({
      nm:String(t.nm || 'Untitled'),
      sub:String(t.sub || ''),
      url:safeUrl(t.url || ''),
      c:safeColor(t.c || '#6c8cff'),
      i:String(t.i || String(t.nm || '?')[0]).slice(0,2)
    })) : []
  }));
}
function savePortal(){ LS.set('hub.portal.v2', PORTAL); if(typeof updateSideStats==='function') updateSideStats(); if(typeof renderDashWidgets==='function') renderDashWidgets(); }

function renderPortal(){
  const root=$('#portal'); root.innerHTML='';
  PORTAL.forEach((sec,si)=>{
    const head=document.createElement('div');
    head.className='section-head';
    head.innerHTML=`<div class="ttl"><span class="dot" style="background:${safeColor(sec.color)}"></span>${esc(sec.name)}</div>
      <span class="add" data-add="${si}">+ add tool</span>`;
    root.appendChild(head);
    const grid=document.createElement('div'); grid.className='portal';
    sec.tiles.forEach((p,ti)=>{
      const a=document.createElement('a');
      a.className='ptile'; a.href=safeUrl(p.url)||'#'; a.target='_blank'; a.rel='noopener noreferrer'; if(!safeUrl(p.url)) a.onclick=e=>{ e.preventDefault(); toast('Invalid tool URL'); };
      a.innerHTML=`
        <div class="pact">
          <button class="iconbtn" data-edit="${si}:${ti}" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button>
        </div>
        <div class="ico" style="background:${safeColor(p.c)}">${esc(p.i||p.nm[0])}</div>
        <div><div class="nm">${esc(p.nm)}</div><div class="sub">${esc(p.sub||host(p.url))}</div></div>`;
      grid.appendChild(a);
    });
    const add=document.createElement('div');
    add.className='ptile empty-tile'; add.dataset.add=si;
    add.innerHTML='<div>＋<br>Add tool</div>';
    grid.appendChild(add);
    root.appendChild(grid);
  });
  // wire add buttons
  $$('[data-add]').forEach(el=>el.onclick=e=>{ e.preventDefault(); openTile(+el.dataset.add); });
  $$('[data-edit]').forEach(el=>el.onclick=e=>{ e.preventDefault(); e.stopPropagation(); const [si,ti]=el.dataset.edit.split(':').map(Number); openTile(si,ti); });
}


/* Dynamic portal modals (migrated out of index.html in Build 5) */
function ensurePortalModals(){
  createModal?.('pOverlay', `
    <h3 id="pModalTitle">Add tool</h3>
    <input type="hidden" id="pEditSection"><input type="hidden" id="pEditIdx">
    <div class="two">
      <div class="field"><label>Name</label><input id="pName" placeholder="e.g. ChatGPT"></div>
      <div class="field"><label>Short tag</label><input id="pSub" placeholder="e.g. AI"></div>
    </div>
    <div class="field"><label>URL</label><input id="pUrl" placeholder="https://…"></div>
    <div class="two">
      <div class="field"><label>Section</label><select id="pSection"></select></div>
      <div class="field"><label>Icon letter/emoji</label><input id="pIcon" maxlength="2" placeholder="A"></div>
    </div>
    <div class="field"><label>Color</label><div class="swatch" id="pSwatch"></div></div>
    <div class="row">
      <button class="btn" id="pDelete" style="display:none;color:var(--danger)">Delete</button>
      <button class="btn" id="pCancel">Cancel</button>
      <button class="btn primary" id="pSave">Save</button>
    </div>
  `);
  createModal?.('sOverlay', `
    <h3>New section</h3>
    <div class="field"><label>Section name</label><input id="sName" placeholder="e.g. Finance"></div>
    <div class="field"><label>Color</label><div class="swatch" id="sSwatch"></div></div>
    <div class="row"><button class="btn" id="sCancel">Cancel</button><button class="btn primary" id="sSave">Save</button></div>
  `);
}
window.ensurePortalModals=ensurePortalModals;

/* Tile modal */
function buildSwatch(box,current,cb){
  box.innerHTML='';
  COLORS.forEach(c=>{ const s=document.createElement('span'); s.style.background=c; if(c===current)s.className='sel';
    s.onclick=()=>{ box.querySelectorAll('span').forEach(x=>x.className=''); s.className='sel'; cb(c); }; box.appendChild(s); });
}
let pColor=COLORS[0];
function openTile(si,ti){
  ensurePortalModals();
  const sel=$('#pSection'); sel.innerHTML=PORTAL.map((s,i)=>`<option value="${i}">${esc(s.name)}</option>`).join('');
  sel.value=si;
  if(ti!=null){
    const p=PORTAL[si].tiles[ti];
    $('#pModalTitle').textContent='Edit tool';
    $('#pEditSection').value=si; $('#pEditIdx').value=ti;
    $('#pName').value=p.nm; $('#pSub').value=p.sub||''; $('#pUrl').value=p.url; $('#pIcon').value=p.i||'';
    pColor=p.c||COLORS[0]; $('#pDelete').style.display='block';
  }else{
    $('#pModalTitle').textContent='Add tool';
    $('#pEditSection').value=si; $('#pEditIdx').value='';
    $('#pName').value=''; $('#pSub').value=''; $('#pUrl').value=''; $('#pIcon').value='';
    pColor=COLORS[Math.floor(Math.random()*COLORS.length)]; $('#pDelete').style.display='none';
  }
  buildSwatch($('#pSwatch'),pColor,c=>pColor=c);
  showModal('pOverlay'); setTimeout(()=>$('#pName').focus(),50);
}
function saveTile(){
  let url=safeUrl($('#pUrl').value); const nm=$('#pName').value.trim();
  if(!nm){ toast('Name required'); return }
  if(!url){ toast('Valid http(s) URL required'); return }
  const tile={nm,sub:$('#pSub').value.trim(),url,c:safeColor(pColor),i:($('#pIcon').value.trim()||nm[0]).slice(0,2)};
  const origSi=+$('#pEditSection').value, idx=$('#pEditIdx').value, newSi=+$('#pSection').value;
  if(idx!==''){
    PORTAL[origSi].tiles.splice(+idx,1);
    PORTAL[newSi].tiles.push(tile);
    toast('Tool updated');
  }else{ PORTAL[newSi].tiles.push(tile); toast('Tool added'); }
  savePortal(); renderPortal(); hideModal('pOverlay');
}
function deleteTile(){
  const si=+$('#pEditSection').value, ti=$('#pEditIdx').value;
  if(ti!==''&&confirm('Delete this tool?')){ PORTAL[si].tiles.splice(+ti,1); savePortal(); renderPortal(); hideModal('pOverlay'); toast('Deleted'); }
}

/* Section modal */
let sColor=COLORS[2];
function openSection(){ ensurePortalModals(); sColor=COLORS[Math.floor(Math.random()*COLORS.length)]; buildSwatch($('#sSwatch'),sColor,c=>sColor=c); $('#sName').value=''; showModal('sOverlay'); setTimeout(()=>$('#sName').focus(),50); }
function saveSection(){ const n=$('#sName').value.trim(); if(!n){ toast('Name required'); return } PORTAL.push({name:n,color:safeColor(sColor),tiles:[]}); savePortal(); renderPortal(); hideModal('sOverlay'); toast('Section added'); }

