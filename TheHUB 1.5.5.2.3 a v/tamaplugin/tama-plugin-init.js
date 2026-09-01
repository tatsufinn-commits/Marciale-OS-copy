/**
 * TAMAplugin: Main Academic Studio Orchestrator for TheHUB
 * Integrates Mapúa Exam Countdowns, Socratic Brain Profiles, Interactive Studio & Study XP into the Command Center.
 */
(function(){
  function initTAMAPlugin() {
    console.info('[TAMAplugin] Initializing Mapúa Architecture Academic Studio Plugin...');

    // 1. Hook into Today Dashboard rendering
    if (typeof renderTodayDashboard === 'function') {
      const originalRenderToday = window.renderTodayDashboard;
      window.renderTodayDashboard = function() {
        const res = originalRenderToday.apply(this, arguments);
        try {
          if (typeof window.renderMapuaExamCountdownCard === 'function') {
            window.renderMapuaExamCountdownCard();
          }
        } catch (e) {
          console.warn('[TAMAplugin] Could not render exam countdown card:', e);
        }
        return res;
      };
    }

    // 2. Ensure brain profile is loaded
    if (typeof BRAIN_PROFILES !== 'undefined' && window.TAMA_MAPUA_BRAIN_PROFILE) {
      BRAIN_PROFILES['mapua_architect'] = window.TAMA_MAPUA_BRAIN_PROFILE;
    }

    // 3. Hook into page activation for TAMAKEE Studio view
    if (typeof activatePage === 'function') {
      const originalActivatePage = window.activatePage;
      window.activatePage = function(pageId) {
        const res = originalActivatePage.apply(this, arguments);
        if (pageId === 'tamakee' && typeof window.renderTamakeeStudio === 'function') {
          window.renderTamakeeStudio();
        }
        return res;
      };
    }

    // 4. Register global namespace on Hub
    if (typeof window.Hub !== 'undefined') {
      window.Hub.tama = {
        enabled: true,
        version: '3.0.0',
        logStudy: window.logStudySessionActivity,
        renderExamCard: window.renderMapuaExamCountdownCard,
        renderStudio: window.renderTamakeeStudio
      };
    }

    console.info('[TAMAplugin] Mapúa Architecture Academic Studio Plugin ready.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTAMAPlugin);
  } else {
    initTAMAPlugin();
  }
})();
