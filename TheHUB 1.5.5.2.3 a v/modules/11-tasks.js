/* ===========================================================
   TASK MANAGER — Kanban & List views
   =========================================================== */
let TASKS = [];
window.TASKS = TASKS;

function syncTasksGlobal() {
  window.TASKS = TASKS;
}

/* ---------- Project Mode foundation (Build 15) ---------- */
const PROJECTS_KEY='hub.projects.v1';
let PROJECTS = Array.isArray(LS.get(PROJECTS_KEY, [])) ? LS.get(PROJECTS_KEY, []) : [];
PROJECTS = PROJECTS.filter(p=>p&&p.id&&p.title).map(p=>({id:safeDataId(p.id),title:String(p.title).slice(0,120),color:safeColor(p.color||colorFor(p.title)),deadline:String(p.deadline||''),status:p.status||'active',notes:String(p.notes||'').slice(0,2000),ts:Number(p.ts)||Date.now()}));
let PROJECT_FILTER = localStorage.getItem('hub.projects.activeFilter') || 'all';
function saveProjects(){ window.PROJECTS=PROJECTS; LS.set(PROJECTS_KEY, PROJECTS); renderProjectControls?.(); renderTasks?.(); updateSideStats?.(); }
function projectById(id){ return PROJECTS.find(p=>p.id===id)||null; }
function projectByTitle(title){ const t=String(title||'').trim().toLowerCase(); return PROJECTS.find(p=>p.title.toLowerCase()===t)||null; }
function projectTitleForTask(t){ return t?.projectId ? (projectById(t.projectId)?.title || t.project || 'General') : (t?.project || 'General'); }
function projectColorForTask(t){ return t?.projectId ? (projectById(t.projectId)?.color || colorFor(projectTitleForTask(t))) : colorFor(projectTitleForTask(t)); }
function projectProgress(projectId){
  const tasks=(typeof TASKS!=='undefined'?TASKS:[]).filter(t=>t.projectId===projectId);
  const done=tasks.filter(t=>t.status==='done').length;
  return {total:tasks.length,done,percent:tasks.length?Math.round(done/tasks.length*100):0};
}
function syncProjectDatalist(){
  const dl=$('#taskProjectList'); if(!dl) return;
  dl.innerHTML=PROJECTS.map(p=>`<option value="${escAttr(p.title)}"></option>`).join('');
}
function createProjectFromPrompt(){
  const title=prompt('Project title:'); if(!title || !title.trim()) return;
  const clean=title.trim().slice(0,120);
  if(projectByTitle(clean)) return toast('Project already exists','warn');
  const deadline=prompt('Target deadline (YYYY-MM-DD, optional):','')||'';
  PROJECTS.unshift({id:uid(),title:clean,color:colorFor(clean),deadline:/^\d{4}-\d{2}-\d{2}$/.test(deadline)?deadline:'',status:'active',notes:'',ts:Date.now()});
  saveProjects(); toast('Project created','success');
}
function deleteProject(id){
  const p=projectById(id); if(!p) return;
  const linked=TASKS.filter(t=>t.projectId===id).length;
  if(!confirm(`Delete project "${p.title}"? ${linked} linked task${linked===1?'':'s'} will be kept and moved to General.`)) return;
  TASKS.forEach(t=>{ if(t.projectId===id){ delete t.projectId; t.project='General'; } });
  PROJECTS=PROJECTS.filter(x=>x.id!==id); saveProjects(); saveTasks(); toast('Project deleted; tasks kept','success');
}
function projectTaskList(projectId){ return (typeof TASKS!=='undefined'?TASKS:[]).filter(t=>t.projectId===projectId); }
function projectEventList(projectId){ return (typeof EVENTS!=='undefined'?EVENTS:[]).filter(e=>e.projectId===projectId); }
function projectNoteList(projectId){ return (typeof NOTES!=='undefined'?NOTES:[]).filter(n=>n.projectId===projectId); }
function setProjectFilter(projectId='all'){
  PROJECT_FILTER=projectId||'all';
  localStorage.setItem('hub.projects.activeFilter', PROJECT_FILTER);
  renderTasks();
}
function startProjectFocus(projectId){
  const p=projectById(projectId); if(!p) return;
  const task=projectTaskList(projectId).find(t=>t.status==='in_progress') || projectTaskList(projectId).find(t=>t.status!=='done');
  if(task) startFocusSession?.(task.id);
  else toast('No open tasks in this project','warn');
}
function projectContextPrompt(projectId){
  const p=projectById(projectId); if(!p) return '';
  const tasks=projectTaskList(projectId);
  const events=projectEventList(projectId);
  const notes=projectNoteList(projectId);
  const pr=projectProgress(projectId);
  return `Analyze this project and prepare a focused recovery/execution plan.

PROJECT: ${p.title}
Deadline: ${p.deadline||'none'}
Progress: ${pr.done}/${pr.total} tasks (${pr.percent}%)
Notes: ${p.notes||'(none)'}

Tasks:
${tasks.length?tasks.map(t=>`- [${t.status}] ${t.title}${t.due?' — due '+t.due:''}${t.priority?' — '+t.priority:''}${t.notes?' — '+t.notes:''}`).join('\n'):'(no linked tasks yet)'}

Return: 1) risks, 2) next 3 actions, 3) recommended focus block.`;
}
function askMarcialeAboutProject(projectId){ const prompt=projectContextPrompt(projectId); if(prompt) useAssistantPrompt?.(prompt); }
function projectPremortemPrompt(projectId){
  const p=projectById(projectId); if(!p) return '';
  const tasks=projectTaskList(projectId), events=projectEventList(projectId), notes=projectNoteList(projectId), pr=projectProgress(projectId);
  const open=tasks.filter(t=>t.status!=='done');
  const overdue=open.filter(t=>t.due&&t.due<todayStr());
  const dueSoon=open.filter(t=>t.due&&t.due>=todayStr()&&typeof daysBetween==='function'&&daysBetween(t.due,todayStr())<=3);
  const projectDeadlines=events.filter(e=>e.type==='deadline').sort((a,b)=>String(a.date).localeCompare(String(b.date)));
  const nextDeadline=projectDeadlines.find(e=>e.date>=todayStr()) || null;
  return `Run a Marciale Project Pre-mortem. Be direct, practical, and skeptical.

PROJECT:
- Title: ${p.title}
- Target deadline: ${p.deadline||'none'}
- Progress: ${pr.done}/${pr.total} tasks complete (${pr.percent}%)
- Open tasks: ${open.length}
- Overdue tasks: ${overdue.length}
- Due-soon tasks: ${dueSoon.length}
- Next linked deadline: ${nextDeadline?`${nextDeadline.title} on ${nextDeadline.date}${nextDeadline.time?' '+nextDeadline.time:''}`:'none'}

TASKS:
${tasks.length?tasks.map(t=>`- [${t.status}] ${t.title}${t.due?' — due '+t.due:''}${t.priority?' — '+t.priority:''}${t.estimate?' — estimate '+t.estimate:''}${t.notes?' — '+t.notes:''}`).join('\n'):'(no linked tasks)'}

EVENTS / DEADLINES:
${events.length?events.map(e=>`- [${e.type}] ${e.title} — ${e.date}${e.time?' '+e.time:''}${e.priority?' — '+e.priority:''}${e.notes?' — '+e.notes:''}`).join('\n'):'(no linked events)'}

NOTES SNAPSHOTS:
${notes.length?notes.map(n=>`- ${n.title}: ${(n.preview||'').slice(0,600).replace(/\s+/g,' ')}${n.chars?` (${n.chars} chars)`:''}`).join('\n'):'(no linked notes)'}

Return exactly:
1. Failure story: assume this project failed; why?
2. Top 3 bottlenecks ranked by danger.
3. Missing tasks or missing project structure.
4. Deadline compression risk and buffer needed.
5. Next 5 concrete actions, ordered.
6. Recommended focus session length and which task to start with.`;
}
function draftProjectPremortem(projectId){
  const prompt=projectPremortemPrompt(projectId);
  if(!prompt) return toast('Project not found','warn');
  useAssistantPrompt?.(prompt);
  toast('Project pre-mortem drafted for Marciale','success');
}
function showProjectDetail(projectId){
  const p=projectById(projectId); if(!p) return;
  const tasks=projectTaskList(projectId), events=projectEventList(projectId), notes=projectNoteList(projectId), pr=projectProgress(projectId);
  createModal?.('projectDetailOverlay', `<h3>🗂️ ${esc(p.title)}</h3><div class="project-detail-summary"><span>${pr.done}/${pr.total} tasks done</span><span>${events.length} events</span><span>${notes.length} notes</span>${p.deadline?`<span>deadline ${esc(p.deadline)}</span>`:''}</div><div class="project-detail-grid"><section><h4>Tasks</h4>${tasks.length?tasks.map(t=>`<div class="project-detail-item"><b>${esc(t.title)}</b><span>${esc(t.status)}${t.due?' · due '+esc(t.due):''}</span></div>`).join(''):'<div class="feature-empty compact">No linked tasks.</div>'}</section><section><h4>Events & deadlines</h4>${events.length?events.map(e=>`<div class="project-detail-item"><b>${esc(e.title)}</b><span>${esc(e.type)} · ${esc(e.date)}${e.time?' '+esc(e.time):''}</span></div>`).join(''):'<div class="feature-empty compact">No linked events.</div>'}</section><section><h4>Notes</h4>${notes.length?notes.map(n=>`<div class="project-detail-item"><b>${esc(n.title||'Untitled')}</b><span>${esc((n.preview||'').slice(0,120).replace(/\s+/g,' '))}${n.chars?` · ${Number(n.chars)||0} chars`:''}</span></div>`).join(''):'<div class="feature-empty compact">No linked notes.</div>'}</section></div><div class="row"><button class="btn" id="projectDetailClose">Close</button><button class="btn" id="projectDetailPremortem">Pre-mortem</button><button class="btn primary" id="projectDetailAsk">Ask Marciale</button></div>`, 'modal project-detail-modal');
  $('#projectDetailClose').onclick=()=>hideModal('projectDetailOverlay');
  $('#projectDetailPremortem').onclick=()=>draftProjectPremortem(projectId);
  $('#projectDetailAsk').onclick=()=>askMarcialeAboutProject(projectId);
  showModal('projectDetailOverlay');
}
function renderProjectDashboard(){
  const root=$('#projectDashboard'); if(!root) return;
  const activeProjects=PROJECTS.filter(p=>p.status!=='archived');
  if(!activeProjects.length){ root.innerHTML='<div class="project-dashboard-empty">🗂️ No projects yet. Create one in Hub Control → Projects to group tasks into a focused context.</div>'; return; }
  const allActive=(PROJECT_FILTER==='all'||!PROJECT_FILTER);
  root.innerHTML=`<div class="project-dashboard-head"><div><h3>🗂️ Project Dashboard</h3><p>Filter tasks, inspect progress, and launch focus from project context.</p></div><button class="btn sm ${allActive?'primary':''}" data-project-filter="all">All tasks</button></div><div class="project-card-grid">${activeProjects.map(p=>{ const pr=projectProgress(p.id); const tasks=projectTaskList(p.id); const events=projectEventList(p.id); const notes=projectNoteList(p.id); const open=tasks.filter(t=>t.status!=='done').length; const overdue=tasks.filter(t=>t.status!=='done'&&t.due&&t.due<todayStr()).length; const selected=PROJECT_FILTER===p.id; return `<div class="project-card ${selected?'active':''}" style="--project-color:${safeColor(p.color)}"><div class="project-card-top"><b><i></i>${esc(p.title)}</b><span>${pr.percent}%</span></div><div class="project-progress"><u style="width:${pr.percent}%"></u></div><div class="project-card-meta"><span>${pr.done}/${pr.total} done</span><span>${open} open</span><span>${events.length} event${events.length===1?'':'s'}</span><span>${notes.length} note${notes.length===1?'':'s'}</span>${p.deadline?`<span>📅 ${esc(p.deadline)}</span>`:''}${overdue?`<span class="danger">${overdue} overdue</span>`:''}</div><div class="project-card-actions"><button class="btn sm ${selected?'primary':''}" data-project-filter="${escAttr(p.id)}">${selected?'Filtering':'Filter'}</button><button class="btn sm" data-project-focus="${escAttr(p.id)}">Focus</button><button class="btn sm" data-project-detail="${escAttr(p.id)}">Details</button><button class="btn sm" data-project-premortem="${escAttr(p.id)}">Pre-mortem</button><button class="btn sm" data-project-ai="${escAttr(p.id)}">Ask Marciale</button></div></div>`; }).join('')}</div>`;
  $$('[data-project-filter]').forEach(b=>b.onclick=()=>setProjectFilter(b.dataset.projectFilter));
  $$('[data-project-focus]').forEach(b=>b.onclick=()=>startProjectFocus(b.dataset.projectFocus));
  $$('[data-project-detail]').forEach(b=>b.onclick=()=>showProjectDetail(b.dataset.projectDetail));
  $$('[data-project-premortem]').forEach(b=>b.onclick=()=>draftProjectPremortem(b.dataset.projectPremortem));
  $$('[data-project-ai]').forEach(b=>b.onclick=()=>askMarcialeAboutProject(b.dataset.projectAi));
}
function renderProjectControls(){
  syncProjectDatalist();
  const status=$('#projectSideStatus'), list=$('#projectSideList');
  if(status){
    const active=PROJECTS.filter(p=>p.status!=='archived').length;
    status.innerHTML=PROJECTS.length?`<b>${active}</b> active project${active===1?'':'s'} · <b>${PROJECTS.length}</b> total`:'<b>No projects yet.</b><br>Create one to group related tasks.';
  }
  if(list){
    list.innerHTML=PROJECTS.length?PROJECTS.map(p=>{ const pr=projectProgress(p.id); return `<div class="project-side-item"><div><b><i style="background:${safeColor(p.color)}"></i>${esc(p.title)}</b><span>${pr.done}/${pr.total} tasks · ${pr.percent}%${p.deadline?' · due '+esc(p.deadline):''}</span><em><u style="width:${pr.percent}%"></u></em></div><button class="iconbtn" data-project-delete="${escAttr(p.id)}" title="Delete project">×</button></div>`; }).join(''):'<div class="feature-empty compact">No projects created.</div>';
    $$('[data-project-delete]').forEach(b=>b.onclick=()=>deleteProject(b.dataset.projectDelete));
  }
}
window.PROJECTS=PROJECTS;
window.createProjectFromPrompt=createProjectFromPrompt;
window.renderProjectControls=renderProjectControls;
window.projectProgress=projectProgress;
window.setProjectFilter=setProjectFilter;
window.renderProjectDashboard=renderProjectDashboard;
window.projectContextPrompt=projectContextPrompt;
window.projectPremortemPrompt=projectPremortemPrompt;
window.draftProjectPremortem=draftProjectPremortem;
window.showProjectDetail=showProjectDetail;
window.projectEventList=projectEventList;
window.projectNoteList=projectNoteList;

function loadTasks() {
  const saved = LS.get('hub.tasks.v1', []);
  TASKS = Array.isArray(saved) ? saved : [];
  syncTasksGlobal();
  renderTasks();
}

function saveTasks() {
  syncTasksGlobal();
  LS.set('hub.tasks.v1', TASKS);
  if (typeof updateSideStats === 'function') updateSideStats();
  if (typeof renderDashWidgets === 'function') renderDashWidgets();
  if (typeof renderTodayDashboard === 'function') renderTodayDashboard();
}

window.openTaskModal = function(task = null) {
  syncProjectDatalist();
  $('#taskTitle').value = task ? task.title : '';
  $('#taskProject').value = task ? projectTitleForTask(task) : 'General';
  $('#taskStatus').value = task ? task.status : 'todo';
  $('#taskPriority').value = task ? task.priority : 'normal';
  $('#taskDue').value = task ? task.due : '';
  $('#taskEstimate').value = task ? task.estimate : '';
  $('#taskNotes').value = task ? task.notes : '';
  $('#taskEditId').value = task ? task.id : '';
  $('#taskDeleteBtn').style.display = task ? 'block' : 'none';
  $('#taskOverlay').classList.add('show');
  setTimeout(() => $('#taskTitle').focus(), 50);
}

window.saveTask = function() {
  const title = $('#taskTitle').value.trim();
  if (!title) return toast('Task title required');
  
  const id = $('#taskEditId').value;
  const projectName=$('#taskProject').value.trim() || 'General';
  const linkedProject=projectByTitle(projectName);
  const t = {
    id: id || uid(),
    title,
    project: linkedProject ? linkedProject.title : projectName,
    projectId: linkedProject ? linkedProject.id : '',
    status: $('#taskStatus').value || 'todo',
    priority: $('#taskPriority').value || 'normal',
    due: $('#taskDue').value,
    estimate: $('#taskEstimate').value,
    notes: $('#taskNotes').value,
    ts: Date.now()
  };
  
  // Preserve linked IDs and handle done timestamp
  const existing = id ? TASKS.find(x => x.id === id) : null;
  const wasDone = !!(existing && existing.status === 'done');
  if (existing && existing.linkedEventId) t.linkedEventId = existing.linkedEventId;
  
  if (t.status === 'done') {
    t.doneAt = (existing && existing.status === 'done' && existing.doneAt) ? existing.doneAt : Date.now();
  }
  
  if (id) {
    TASKS = TASKS.map(x => x.id === id ? t : x);
  } else {
    TASKS.push(t);
  }
  if (t.status === 'done' && !wasDone) logHubActivity?.('task_done',{label:'Completed task: '+t.title, onceKey:'task_done:'+t.id});
  
  saveTasks();
  renderTasks();
  $('#taskOverlay').classList.remove('show');
}

window.deleteTask = function() {
  const id = $('#taskEditId').value;
  if (!id) return;
  TASKS = TASKS.filter(x => x.id !== id);
  saveTasks();
  renderTasks();
  $('#taskOverlay').classList.remove('show');
}

function taskStatusLabel(status) {
  return ({todo:'To Do', in_progress:'In Progress', done:'Done'}[status] || status || 'To Do');
}
function taskPriorityClass(priority) {
  return priority === 'high' ? 'danger' : priority === 'low' ? 'muted' : 'accent';
}
function renderTaskDropbox(deadlines) {
  if (!deadlines.length) return '';
  return `
    <div class="kanban-col task-dropbox-col">
      <div class="k-head"><span class="k-title-head">📅 Upcoming Deadlines</span><span>${deadlines.length}</span></div>
      <div class="task-drop-hint">Drag a deadline into a Kanban column to start working on it.</div>
      <div class="k-body task-dropbox-body">
        ${deadlines.map(e => `
          <div class="k-card deadline-card" draggable="true" ondragstart="kDragStart(event, 'ev_${escAttr(e.id)}')">
             <div class="k-title">${esc(e.title)}</div>
             <div class="k-meta">
                <span class="feature-badge danger">Deadline</span>
                <span>📅 ${esc(e.date)}</span>
                ${e.priority === 'high' ? '<span class="danger">🔥 High</span>' : ''}
             </div>
          </div>
        `).join('')}
      </div>
    </div>`;
}
function renderTasks() {
  const kb = $('#kanbanBoard');
  if (!kb) return;
  
  const cols = {
    todo: { name: 'To Do', hint:'Capture and clarify work.', items: [] },
    in_progress: { name: 'In Progress', hint:'Limit active work.', items: [] },
    done: { name: 'Done', hint:'Completed work rests here.', items: [] }
  };
  
  const visibleTasks = PROJECT_FILTER && PROJECT_FILTER !== 'all' ? TASKS.filter(t=>t.projectId===PROJECT_FILTER) : TASKS;
  TASKS.forEach(t => {
    if (cols[t.status] && visibleTasks.includes(t)) cols[t.status].items.push(t);
  });
  
  const prioMap = { high: 3, normal: 2, low: 1 };
  Object.values(cols).forEach(col => {
    col.items.sort((a,b) => {
      if (a.due && b.due && a.due !== b.due) return a.due.localeCompare(b.due);
      if (a.due && !b.due) return -1;
      if (!a.due && b.due) return 1;
      return (prioMap[b.priority] || 0) - (prioMap[a.priority] || 0);
    });
  });

  const deadlines = (typeof EVENTS !== 'undefined')
    ? EVENTS.filter(e => e.type === 'deadline' && e.date >= todayStr() && !TASKS.some(t => t.title === e.title || t.linkedEventId === e.id))
    : [];

  const columnsHtml = Object.keys(cols).map(k => `
    <div class="kanban-col" data-status="${k}">
      <div class="k-head"><div><span class="k-title-head">${cols[k].name}</span><small>${cols[k].hint}</small></div><span>${cols[k].items.length}</span></div>
      <div class="k-body" ondragover="kDragOver(event)" ondrop="kDrop(event, '${k}')">
        ${cols[k].items.length ? cols[k].items.map(t => {
          const overdue = t.due && t.due < todayStr() && t.status !== 'done';
          return `<div class="k-card task-card ${t.priority==='high'?'priority-high':''} ${overdue?'overdue':''}" draggable="true" ondragstart="kDragStart(event, '${escAttr(t.id)}')" onclick="openTaskModal(${escAttr(JSON.stringify(t))})">
             <div class="task-card-top">
               <div class="k-title">${esc(t.title)}</div>
               <span class="feature-badge ${taskPriorityClass(t.priority)}">${esc(t.priority||'normal')}</span>
             </div>
             <div class="k-meta">
                ${t.due ? `<span class="${overdue?'danger':''}">📅 ${esc(t.due)}${overdue?' · overdue':''}</span>` : '<span>No due date</span>'}
                ${projectTitleForTask(t) && projectTitleForTask(t) !== 'General' ? `<span class="project-badge" style="--project-color:${safeColor(projectColorForTask(t))}">🏷️ ${esc(projectTitleForTask(t))}</span>` : ''}
                ${t.estimate ? `<span>⏱️ ${esc(t.estimate)}</span>` : ''}
             </div>
             ${t.notes ? `<div class="task-note-preview">${esc(t.notes).slice(0,120)}</div>` : ''}
             ${t.status !== 'done' ? `<div class="task-card-actions"><button class="btn sm" onclick="event.stopPropagation(); startFocusSession('${escAttr(t.id)}')">🎯 Start Focus</button></div>` : ''}
          </div>`;
        }).join('') : `<div class="feature-empty compact">No ${esc(cols[k].name.toLowerCase())} tasks.</div>`}
      </div>
    </div>
  `).join('');
  const filterProject=PROJECT_FILTER&&PROJECT_FILTER!=='all'?projectById(PROJECT_FILTER):null;
  const filterBanner=filterProject?`<div class="project-filter-banner"><span>Filtering tasks by <b>${esc(filterProject.title)}</b></span><button class="btn sm" onclick="setProjectFilter('all')">Clear filter</button></div>`:'';
  kb.innerHTML = filterBanner + renderTaskDropbox(deadlines) + columnsHtml;
  renderProjectControls?.();
  renderProjectDashboard?.();
}

// Handles both regular task drag-drops and Calendar deadline drops.
window.kDrop = function(e, status) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  if (!id) return;
  
  if (id.startsWith('ev_')) {
     const evId = id.replace('ev_', '');
     const ev = EVENTS.find(x => x.id === evId);
     if (ev) {
        const nt = {
          id: uid(),
          title: ev.title,
          project: 'General',
          status,
          priority: ev.priority || 'normal',
          due: ev.date,
          estimate: '',
          notes: 'Imported from Calendar Deadline.',
          ts: Date.now(),
          linkedEventId: ev.id,
          doneAt: status === 'done' ? Date.now() : null
        };
        TASKS.push(nt);
        if(status === 'done') logHubActivity?.('task_done',{label:'Completed task: '+nt.title, onceKey:'task_done:'+nt.id});
        saveTasks();
        renderTasks();
     }
     return;
  }
  
  const t = TASKS.find(x => x.id === id);
  if (t && t.status !== status) {
    const wasDone = t.status === 'done';
    t.status = status;
    if (status === 'done') { t.doneAt = Date.now(); if(!wasDone) logHubActivity?.('task_done',{label:'Completed task: '+t.title, onceKey:'task_done:'+t.id}); }
    else delete t.doneAt;
    saveTasks();
    renderTasks();
  }
};

window.kDragStart = function(e, id) {
  e.dataTransfer.setData('text/plain', id);
}
window.kDragOver = function(e) {
  e.preventDefault();
}
// The modified kDrop function handles both regular task drag-drops and Calendar drag-drops.
