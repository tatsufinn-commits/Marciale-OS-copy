/**
 * HUD — Heads-up display manager.
 * Renders gold, zone, stage, and party status.
 */
export class HUD {
  constructor() {
    this._gold = 0;
    this._zoneName = 'Fittoa Region';
    this._stageNum = 1;
    this._partyStatus = [];
    this._fps = 0;
    this._fpsFrames = 0;
    this._fpsTimer = 0;
  }

  updateFPS(dt) {
    this._fpsFrames++;
    this._fpsTimer += dt;
    if (this._fpsTimer >= 1000) {
      this._fps = this._fpsFrames;
      this._fpsFrames = 0;
      this._fpsTimer = 0;
    }
  }

  setGold(amount) { this._gold = amount; }
  setZone(name) { this._zoneName = name; }
  setStage(num) { this._stageNum = num; }
  setPartyStatus(statuses) { this._partyStatus = statuses; }

  getGold() { return this._gold; }
  getZone() { return this._zoneName; }
  getStage() { return this._stageNum; }
  getFPS() { return this._fps; }
}

export const hud = new HUD();
