/**
 * TAMAplugin: Study-to-Companion Momentum XP Bridge
 * Catches TAMA study completion signals and awards in-game Gold and XP to the Idle Hero companion!
 */
(function(){
  function logStudySessionActivity(subject, minutes = 30, score = '100%') {
    const points = Math.max(5, Math.floor(minutes / 2));
    const activityEvent = {
      id: (typeof uid === 'function') ? uid() : `act_${Date.now()}`,
      type: 'task_done',
      label: `Mapúa Study: ${subject} (${score})`,
      points: points,
      ts: Date.now(),
      at: new Date().toISOString(),
      source: 'tama_study'
    };

    if (typeof emitCompanionEvent === 'function') {
      emitCompanionEvent(activityEvent);
    }
    if (typeof showToast === 'function') {
      showToast(`🏛️ Mapúa Study Complete! +${points * 10} Gold, +${points * 5} XP awarded to Companion Hero!`);
    }
    return activityEvent;
  }

  window.logStudySessionActivity = logStudySessionActivity;
})();
