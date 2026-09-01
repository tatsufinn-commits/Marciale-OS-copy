/**
 * AudioSystem — Build 39 Procedural Web Audio Synthesizer
 * Zero audio assets: all sound effects synthesized algorithmically via Web Audio API oscillators.
 */
export class AudioSystem {
  constructor({ enabled = true, volume = 0.3 } = {}) {
    this._enabled = enabled;
    this._volume = Math.max(0, Math.min(1.0, volume));
    this._ctx = null;
    this._initContext();
  }

  _initContext() {
    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    try {
      this._ctx = new AudioCtx();
    } catch (e) {
      this._ctx = null;
    }

    if (this._ctx && this._ctx.state === 'suspended') {
      const unlock = () => {
        this._ctx?.resume();
        ['click', 'keydown', 'touchstart'].forEach((ev) => document.removeEventListener(ev, unlock));
      };
      ['click', 'keydown', 'touchstart'].forEach((ev) => document.addEventListener(ev, unlock, { once: true, passive: true }));
    }
  }

  play(name = 'hit') {
    if (!this._enabled || !this._ctx) return false;
    try {
      const t0 = this._ctx.currentTime;
      const vol = this._volume;

      if (name === 'hit') {
        // Combat Punch / Slash: Sawtooth drop 400Hz -> 60Hz over 100ms with lowpass filter
        const osc = this._ctx.createOscillator();
        const filter = this._ctx.createBiquadFilter();
        const gain = this._ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, t0);
        osc.frequency.exponentialRampToValueAtTime(60, t0 + 0.10);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, t0);

        gain.gain.setValueAtTime(vol * 0.25, t0);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.11);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this._ctx.destination);

        osc.start(t0);
        osc.stop(t0 + 0.12);
        return true;
      }

      if (name === 'chest') {
        // Magical Chest Shimmer: Dual sine chime E5 (659Hz) -> B5 (987Hz)
        const osc = this._ctx.createOscillator();
        const gain = this._ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, t0);
        osc.frequency.setValueAtTime(987.77, t0 + 0.08);
        osc.frequency.setValueAtTime(1318.51, t0 + 0.16);

        gain.gain.setValueAtTime(vol * 0.20, t0);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.35);

        osc.connect(gain);
        gain.connect(this._ctx.destination);

        osc.start(t0);
        osc.stop(t0 + 0.36);
        return true;
      }

      if (name === 'levelup') {
        // Ascending 4-note Hero Fanfare: C5 -> E5 -> G5 -> C6
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const tNote = t0 + idx * 0.07;
          const osc = this._ctx.createOscillator();
          const gain = this._ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, tNote);

          gain.gain.setValueAtTime(vol * 0.22, tNote);
          gain.gain.exponentialRampToValueAtTime(0.001, tNote + 0.20);

          osc.connect(gain);
          gain.connect(this._ctx.destination);

          osc.start(tNote);
          osc.stop(tNote + 0.22);
        });
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  setVolume(vol) {
    this._volume = Math.max(0, Math.min(1.0, Number(vol) || 0));
  }

  toggle(enabled) {
    this._enabled = Boolean(enabled);
    return this._enabled;
  }

  /** Suspend the audio context (no-op safely when context is null/headless). */
  suspend() {
    if (this._ctx && this._ctx.state === 'running') {
      this._ctx.suspend();
    }
    return Boolean(this._ctx);
  }

  /**
   * Resume the audio context. Browsers start contexts suspended and the
   * gesture-unlock listener is consumed after a single use, so this must
   * genuinely restore the context rather than rely on that one-shot listener.
   */
  resume() {
    if (this._ctx && this._ctx.state === 'suspended') {
      this._ctx.resume();
    }
    return Boolean(this._ctx);
  }

  /** Tear down the audio context. No-op safely when context is null/headless. */
  dispose() {
    if (this._ctx) {
      this._ctx.close();
      this._ctx = null;
    }
  }
}
