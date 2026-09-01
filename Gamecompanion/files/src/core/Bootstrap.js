/**
 * Bootstrap — deterministic Build 4 initialization sequence.
 * It owns setup ordering; main.js only supplies presentation callbacks.
 */
export class Bootstrap {
  constructor({ stateManager, saveManager, timeKeeper, eventBus, events, modal, setStatus }) {
    Object.assign(this, { stateManager, saveManager, timeKeeper, eventBus, events, modal, setStatus });
  }

  async initialize() {
    await this.saveManager.init();
    let record = null;
    try { record = await this.saveManager.load(); }
    catch (error) { console.error('[Bootstrap] Saved data was not loaded:', error); this.setStatus('Save unavailable — starting safely', 'error'); }
    if (record) {
      this.stateManager.loadState(record.state); this.timeKeeper.init(this.stateManager.get('totalPlayTime'));
      const offline = this.saveManager.calculateOfflineRewards(record.timestamp);
      this.stateManager.update('player.gold', (gold) => gold + offline.gold, { source: 'offline' });
      this.stateManager.update('combat.hero.xp', (xp) => xp + offline.xp, { source: 'offline' });
      this.setStatus(`Save loaded · away ${offline.cappedSeconds}s`, 'success');
      this.showOfflineSummary(offline);
    } else {
      this.stateManager.reset(); this.timeKeeper.init(0); this.setStatus('First launch · new save slot', 'neutral');
    }
    this.eventBus.emit(this.events.GAME_LOADED, { hasSave: Boolean(record), build: '0.3.0.0.a' });
    return { hasSave: Boolean(record), record };
  }

  showOfflineSummary(offline) {
    this.modal.show({ title: 'Welcome back', body: `<p>Time away: <strong>${offline.cappedSeconds}s</strong></p><p>Offline rewards are capped at eight hours; chests are never awarded offline.</p><p>Gold: <strong>${offline.gold}</strong> · XP: <strong>${offline.xp}</strong></p>`, actions: [{ label: 'Continue', kind: 'primary', onClick: () => this.modal.close() }] });
  }

  async newGame() {
    await this.saveManager.deleteSave(); this.stateManager.reset(); this.timeKeeper.init(0);
    this.setStatus('New game initialized', 'success'); this.eventBus.emit(this.events.GAME_RESET, { build: '0.3.0.0.a' });
  }
}
