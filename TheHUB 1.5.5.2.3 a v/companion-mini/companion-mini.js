(() => {
  const doc = globalThis.document;
  const $ = sel => doc && doc.querySelector ? doc.querySelector(sel) : null;
  let state = null;
  function esc(s){ return String(s ?? '').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }
  function iconForMood(mood){ return ({'deep work':'🎯',charged:'⚡',loyal:'🔥',fed:'🟩',idle:'▫️'}[mood] || '✦'); }
  function render(snapshot){
    if(!snapshot) return;
    state = snapshot;
    const settings = snapshot.settings || {};
    if($('#miniLevel')) $('#miniLevel').textContent = 'Lv ' + (snapshot.level || 1);
    if($('#miniName')) $('#miniName').textContent = settings.name || 'Marciale Sprite';
    if($('#miniMessage')) $('#miniMessage').textContent = snapshot.message || 'Waiting for real Hub activity…';
    if($('#miniAvatar')) $('#miniAvatar').textContent = iconForMood(snapshot.mood || 'idle');
    if($('#miniXpBar')) $('#miniXpBar').style.width = Math.max(0, Math.min(100, Number(snapshot.progress)||0)) + '%';
    if($('#miniXp')) $('#miniXp').textContent = (snapshot.xp || 0) + ' XP';
    if($('#miniProgress')) $('#miniProgress').textContent = (snapshot.progress || 0) + '% to Lv ' + ((snapshot.level || 1) + 1);
    if($('#miniStreak')) $('#miniStreak').textContent = ((snapshot.stats && snapshot.stats.current) || 0) + 'd streak';
    const latest = snapshot.bridge || snapshot.latest;
    if($('#miniLast')) $('#miniLast').innerHTML = 'Last feed: ' + esc(latest ? (latest.label || latest.type || 'activity') : 'none');
    if($('#miniBridge')) $('#miniBridge').textContent = 'Bridge: ' + (snapshot.bridge?.deliveryStatus || 'waiting');
  }
  // SECURITY 2026-08-15 (@joint fault audit, SEV-2): this listener previously
  // accepted messages from ANY frame. It renders into innerHTML downstream, so an
  // untrusted poster could drive UI state. Guard: same-origin parent only.
  // 'null' is permitted for file:// and sandboxed-iframe hosting (see ruview-frame
  // ALLOWED_ORIGINS, Build 33.3) which is how the mini panel is embedded offline.
  const MINI_ALLOWED_ORIGINS = [window.location.origin, 'null'];
  window.addEventListener('message', event => {
    if (event.origin && !MINI_ALLOWED_ORIGINS.includes(event.origin)) return;
    if (event.source && event.source !== window.parent) return;
    const data = event.data || {};
    if(data.type === 'hub.companion.snapshot') render(data.snapshot);
    if(data.type === 'hub.companion.event') {
      render(data.snapshot);
      if($('#miniBridge')) $('#miniBridge').textContent = 'Bridge: ' + (data.event?.deliveryStatus || 'event received');
    }
    if(data.type === 'hub.companion.pause') doc?.body?.classList.add('paused');
    if(data.type === 'hub.companion.resume') doc?.body?.classList.remove('paused');
  });
  $('#miniOpenFull')?.addEventListener('click', () => {
    try { parent.postMessage({ type:'hub.companion.openFull' }, '*'); } catch(e) {}
  });
  try { parent.postMessage({ type:'companion-mini.ready', version:1 }, '*'); } catch(e) {}
})();
