/**
 * TheHUBBridge — Communicates with parent TheHUB application via postMessage.
 * Supports dual event signatures: idlehero.* (TheHUB 1.5+) and mtgame.* (Companion RPG).
 */
export class TheHUBBridge {
  constructor({ onReward = null, onPause = null, onResume = null, onTheme = null, onFocus = null, hubOrigin = null } = {}) {
    this._ready = false;
    this._hubOrigin = hubOrigin || (typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin !== 'null' ? window.location.origin : '*');
    this._pendingRewards = [];
    this._onReward = onReward;
    this._onPause = onPause;
    this._onResume = onResume;
    this._onTheme = onTheme;
    this._onFocus = onFocus;
  }

  init() {
    window.addEventListener('message', (event) => {
      // Validate origin if not wildcard and origin is present
      if (this._hubOrigin !== '*' && event.origin && event.origin !== this._hubOrigin) {
        return;
      }
      this._handleMessage(event.data);
    });
    // Dual-emit ready event for backward and forward compatibility
    this._send('idlehero.ready', { version: '0.3.0' });
    this._send('mtgame.ready', { version: '0.3.0' });
    this._ready = true;
  }

  _handleMessage(data) {
    if (!data || !data.type) return;

    switch (data.type) {
      case 'hub.activity':
      case 'hub.companion.event':
        this._convertActivity(data.payload || data.event || data);
        break;
      case 'hub.companion.snapshot':
        console.debug('[HUB Bridge] Snapshot received:', data.payload || data.snapshot);
        break;
      case 'hub.companion.focus':
      case 'hub.focus.state':
        this._handleFocus(data.payload || data.focus || data);
        break;
      case 'hub.companion.pause':
      case 'hub.frame.pause':
        this._pauseGame();
        break;
      case 'hub.companion.resume':
      case 'hub.frame.resume':
        this._resumeGame();
        break;
      case 'hub.theme':
        this._applyTheme(data.payload || data.theme);
        break;
    }
  }

  _handleFocus(focusData) {
    if (this._onFocus) this._onFocus(focusData);
    window.dispatchEvent(new CustomEvent('tbh-focus-state', { detail: focusData }));
  }

  _send(type, payload = {}) {
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type, payload, source: 'idlehero', from: 'mt-tbh' }, this._hubOrigin);
      }
    } catch (e) {
      /* Silent fail — not in iframe */
    }
  }

  _convertActivity(activity) {
    if (!activity) return;
    const points = Number(activity.points) || 1;
    const reward = {
      gold: Math.floor(points * 10),
      xp: Math.floor(points * 5),
      sourceActivityId: String(activity.id || activity.sourceActivityId || '')
    };
    this._pendingRewards.push(reward);
    if (this._onReward) this._onReward(reward);
    // Dual-send acknowledgment back to parent TheHUB frame
    this._send('idlehero.ack', { received: true, reward, sourceActivityId: reward.sourceActivityId });
    this._send('mtgame.ack', { received: true, reward, sourceActivityId: reward.sourceActivityId });
  }

  _pauseGame() {
    if (this._onPause) this._onPause();
    window.dispatchEvent(new CustomEvent('tbh-pause'));
  }

  _resumeGame() {
    if (this._onResume) this._onResume();
    window.dispatchEvent(new CustomEvent('tbh-resume'));
  }

  _applyTheme(theme) {
    if (!theme) return;
    const root = document.documentElement;
    if (theme.primary) root.style.setProperty('--hub-primary', theme.primary);
    if (theme.background) root.style.setProperty('--hub-background', theme.background);
    if (theme.text) root.style.setProperty('--hub-text', theme.text);
    if (this._onTheme) this._onTheme(theme);
  }

  reportLevelUp(weaverId, newLevel) {
    this._send('idlehero.levelup', { weaverId, newLevel });
    this._send('mtgame.levelup', { weaverId, newLevel });
  }

  reportAchievement(achievementId) {
    this._send('idlehero.achievement', { achievementId });
    this._send('mtgame.achievement', { achievementId });
  }

  reportSnapshot(snapshot = {}) {
    this._send('idlehero.snapshot', snapshot);
    this._send('mtgame.snapshot', snapshot);
  }

  reportOfflineRewards(rewards = {}) {
    this._send('idlehero.offline_rewards', rewards);
    this._send('mtgame.offline_rewards', rewards);
  }

  reportItemEquipped(item = {}) {
    this._send('idlehero.item_equipped', item);
    this._send('mtgame.item_equipped', item);
  }
}
