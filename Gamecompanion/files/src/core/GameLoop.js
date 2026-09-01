/** Build 2 fixed-timestep simulation loop with variable-rate rendering.
    Build F12 — Power & Frame-Rate Governor (5 FPS background throttling). */
export class GameLoop {
  constructor({ fixedDt = 100, maxFrameDt = 500 } = {}) {
    this.FIXED_DT = fixedDt;
    this.MAX_FRAME_DT = maxFrameDt;
    this._accumulator = 0;
    this._lastTime = 0;
    this._lastFrameTime = 0;
    this._isRunning = false;
    this._rafId = null;
    this._updateFn = null;
    this._renderFn = null;
    this._targetFPS = 60;
    this._frameInterval = 1000 / 60;
    this._isThrottled = false;
    this._stats = { updates: 0, frames: 0, droppedTime: 0 };
    this._bindVisibilityHandler();
  }

  _bindVisibilityHandler() {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this._isThrottled = true;
          this.setTargetFPS(5);
        } else {
          this._isThrottled = false;
          this.setTargetFPS(60);
          this._lastTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
          this._lastFrameTime = this._lastTime;
          this._accumulator = 0; // Prevent burst catch-up frames on tab focus
        }
      });
    }
  }

  start(updateFn, renderFn) {
    if (this._isRunning) this.stop();
    this._updateFn = updateFn;
    this._renderFn = renderFn;
    this._isRunning = true;
    this._lastTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
    this._lastFrameTime = this._lastTime;
    if (typeof requestAnimationFrame !== 'undefined') {
      this._rafId = requestAnimationFrame((time) => this._loop(time));
    }
  }

  stop() {
    this._isRunning = false;
    if (this._rafId !== null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this._rafId);
    }
    this._rafId = null;
  }

  pause() { this.stop(); }
  resume() { if (!this._isRunning && this._updateFn && this._renderFn) this.start(this._updateFn, this._renderFn); }
  isRunning() { return this._isRunning; }
  isThrottled() { return this._isThrottled; }

  setTargetFPS(fps) {
    this._targetFPS = Math.max(0, fps);
    this._frameInterval = fps > 0 ? 1000 / fps : 0;
  }

  getStats() {
    return { ...this._stats, fixedDt: this.FIXED_DT, targetFPS: this._targetFPS, isThrottled: this._isThrottled };
  }

  _loop(timestamp) {
    if (!this._isRunning) return;
    let frameTime = timestamp - this._lastTime;
    this._lastTime = timestamp;

    if (frameTime > this.MAX_FRAME_DT) {
      this._stats.droppedTime += frameTime - this.MAX_FRAME_DT;
      frameTime = this.MAX_FRAME_DT;
    }
    this._accumulator += frameTime;

    while (this._accumulator >= this.FIXED_DT) {
      this._updateFn?.(this.FIXED_DT);
      this._stats.updates += 1;
      this._accumulator -= this.FIXED_DT;
    }

    if (this._targetFPS === 0 || timestamp - this._lastFrameTime >= this._frameInterval) {
      this._renderFn?.(timestamp, this._accumulator / this.FIXED_DT);
      this._stats.frames += 1;
      this._lastFrameTime = timestamp;
    }

    if (typeof requestAnimationFrame !== 'undefined') {
      this._rafId = requestAnimationFrame((time) => this._loop(time));
    }
  }
}

export const gameLoop = new GameLoop();
