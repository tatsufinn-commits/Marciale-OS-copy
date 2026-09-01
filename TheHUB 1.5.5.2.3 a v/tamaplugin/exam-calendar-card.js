/**
 * TAMAplugin: Mapúa Exam Countdown Card for TheHUB Today Dashboard
 * Scans parsed Blackboard .ics feeds for upcoming high-stakes Departmentals and Exit Exams.
 */
(function(){
  const HIGH_STAKES_KEYWORDS = [
    'departmental',
    'exit exam',
    'major plate',
    'final defense',
    'pre-board',
    'mock exam',
    'midterm exam',
    'final exam'
  ];

  function extractUpcomingMapuaExams(daysAhead = 14) {
    const events = (typeof EVENTS !== 'undefined') ? EVENTS : (typeof LS !== 'undefined' ? LS.get('hub.events.v1', []) : []);
    const now = Date.now();
    const maxFuture = now + (daysAhead * 24 * 60 * 60 * 1000);

    return events.filter(evt => {
      if (!evt || !evt.title || !evt.date) return false;
      const titleLower = evt.title.toLowerCase();
      const isHighStakes = HIGH_STAKES_KEYWORDS.some(kw => titleLower.includes(kw));
      if (!isHighStakes) return false;

      const eventTime = new Date(evt.date).getTime();
      return eventTime >= (now - 24 * 60 * 60 * 1000) && eventTime <= maxFuture;
    }).map(evt => {
      const eventTime = new Date(evt.date).getTime();
      const daysRemaining = Math.ceil((eventTime - now) / (1000 * 60 * 60 * 24));
      return {
        id: evt.id,
        title: evt.title,
        date: evt.date,
        daysRemaining: Math.max(0, daysRemaining),
        urgency: daysRemaining <= 3 ? 'critical' : (daysRemaining <= 7 ? 'high' : 'normal')
      };
    });
  }

  function renderMapuaExamCountdownCard() {
    const container = document.getElementById('todayCustomTop') || document.getElementById('todayCards') || document.getElementById('todayMain');
    if (!container) return;

    let card = document.getElementById('mapuaExamCountdownCard');
    const exams = extractUpcomingMapuaExams(14);

    if (!exams.length) {
      if (card) card.remove();
      return;
    }

    if (!card) {
      card = document.createElement('div');
      card.id = 'mapuaExamCountdownCard';
      card.className = 'today-card mapua-exam-card';
      card.style.cssText = `
        background: linear-gradient(135deg, rgba(255, 51, 102, 0.15), rgba(0, 240, 255, 0.1));
        border: 1px solid rgba(0, 240, 255, 0.4);
        border-radius: 12px;
        padding: 16px 20px;
        margin-bottom: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      `;
      container.insertBefore(card, container.firstChild);
    }

    const urgentExam = exams[0];
    const badgeColor = urgentExam.urgency === 'critical' ? '#ff3366' : (urgentExam.urgency === 'high' ? '#ffd700' : '#00f0ff');

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.2rem;">🏛️</span>
          <strong style="color: #00f0ff; letter-spacing: 1px; font-size: 0.95rem; text-transform: uppercase;">Mapúa Architecture Exam Countdown</strong>
        </div>
        <span style="background: ${badgeColor}; color: #000; font-weight: bold; font-size: 0.75rem; padding: 2px 8px; border-radius: 12px; text-transform: uppercase;">
          ${urgentExam.daysRemaining === 0 ? 'TODAY!' : urgentExam.daysRemaining + ' DAYS LEFT'}
        </span>
      </div>
      <div style="font-size: 1.1rem; color: #fff; font-weight: bold; margin-bottom: 6px;">
        ${urgentExam.title}
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: #94a3b8;">
        <span>📅 Scheduled: ${urgentExam.date}</span>
        <button type="button" onclick="activatePage('ai'); if(typeof useAssistantPrompt==='function') useAssistantPrompt('Marciale, please quiz me on the high-yield building laws and formulas for: ${urgentExam.title}');" style="background: rgba(0, 240, 255, 0.2); border: 1px solid #00f0ff; color: #00f0ff; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">
          ⚡ Start Socratic Review
        </button>
      </div>
    `;
  }

  window.renderMapuaExamCountdownCard = renderMapuaExamCountdownCard;
  window.extractUpcomingMapuaExams = extractUpcomingMapuaExams;
})();
