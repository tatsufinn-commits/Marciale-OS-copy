/** TimeKeeper — session/playtime tracking; offline calculation remains Build 3. */
export class TimeKeeper {
  constructor() { this._startedAt = 0; this._totalPlayTime = 0; this._paused = false; }
  init(totalPlayTime = 0) { this._startedAt = Date.now(); this._totalPlayTime = totalPlayTime; this._paused = false; }
  addPlayTime(dt) { if (!this._paused) this._totalPlayTime += Math.max(0, dt); }
  getPlayTime() { return this._totalPlayTime; }
  getSessionTime() { return this._startedAt ? Date.now() - this._startedAt : 0; }
  getSnapshot() { return { totalPlayTime: this._totalPlayTime, sessionTime: this.getSessionTime(), paused: this._paused }; }
  pause() { this._paused = true; }
  resume() { this._paused = false; }
}
export const timeKeeper = new TimeKeeper();
