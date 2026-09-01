import test from 'node:test';
import assert from 'node:assert/strict';
import { AudioSystem } from '../src/systems/AudioSystem.js';
import { TheHUBBridge } from '../src/integration/TheHUBBridge.js';

test('AudioSystem gracefully handles headless / non-browser environment without throwing', () => {
  const audio = new AudioSystem({ enabled: true, volume: 0.5 });
  assert.equal(audio._volume, 0.5);
  const played = audio.play('hit');
  assert.equal(played, false, 'Should return false when AudioContext is unavailable without crashing');
});

test('AudioSystem volume bounds and toggle control', () => {
  const audio = new AudioSystem({ enabled: true, volume: 0.5 });
  audio.setVolume(1.5);
  assert.equal(audio._volume, 1.0);
  audio.setVolume(-0.2);
  assert.equal(audio._volume, 0.0);
  audio.setVolume(0.4);
  assert.equal(audio._volume, 0.4);

  assert.equal(audio.toggle(false), false);
  assert.equal(audio.toggle(true), true);
});

test('AudioSystem synthesizes waveforms when Web Audio API mock is present', () => {
  const calls = [];
  const mockNode = {
    connect: () => {},
    start: (t) => calls.push({ type: 'start', time: t }),
    stop: (t) => calls.push({ type: 'stop', time: t }),
    setValueAtTime: (v, t) => calls.push({ type: 'setValue', val: v, time: t }),
    exponentialRampToValueAtTime: (v, t) => calls.push({ type: 'ramp', val: v, time: t })
  };

  class MockAudioContext {
    constructor() {
      this.currentTime = 10.0;
      this.state = 'running';
      this.destination = {};
      this.closed = false;
    }
    suspend() { this.state = 'suspended'; }
    resume() { this.state = 'running'; }
    close() { this.closed = true; this.state = 'closed'; }
    createOscillator() {
      return {
        type: 'sine',
        frequency: mockNode,
        connect: mockNode.connect,
        start: mockNode.start,
        stop: mockNode.stop
      };
    }
    createGain() {
      return {
        gain: mockNode,
        connect: mockNode.connect
      };
    }
    createBiquadFilter() {
      return {
        type: 'lowpass',
        frequency: mockNode,
        connect: mockNode.connect
      };
    }
  }

  globalThis.window = { AudioContext: MockAudioContext };
  try {
    const audio = new AudioSystem({ enabled: true, volume: 0.5 });
    assert.equal(audio.play('hit'), true);
    assert.equal(audio.play('chest'), true);
    assert.equal(audio.play('levelup'), true);
    assert.ok(calls.length > 5, 'Web audio nodes should have scheduled ramps and starts');
  } finally {
    delete globalThis.window;
  }
});

test('AudioSystem suspend/resume/dispose are null-safe in headless environment', () => {
  // No window/AudioContext present -> _ctx stays null. All three must no-op.
  const audio = new AudioSystem({ enabled: true, volume: 0.3 });
  assert.equal(audio._ctx, null);
  assert.doesNotThrow(() => audio.suspend());
  assert.doesNotThrow(() => audio.resume());
  assert.doesNotThrow(() => audio.dispose());
});

test('AudioSystem suspend/resume/dispose operate on a live context', () => {
  class MockCtx {
    constructor() { this.state = 'running'; this.closed = false; }
    suspend() { this.state = 'suspended'; }
    resume() { this.state = 'running'; }
    close() { this.closed = true; this.state = 'closed'; }
  }
  globalThis.window = { AudioContext: MockCtx };
  try {
    const audio = new AudioSystem({ enabled: true, volume: 0.3 });
    assert.equal(audio._ctx.state, 'running');
    assert.equal(audio.suspend(), true);
    assert.equal(audio._ctx.state, 'suspended');
    // resume() must genuinely restore (one-shot gesture unlock is not relied on)
    assert.equal(audio.resume(), true);
    assert.equal(audio._ctx.state, 'running');
    audio.dispose();
    assert.equal(audio._ctx, null, 'dispose must null the context');
  } finally {
    delete globalThis.window;
  }
});

test('AudioSystem dispose() on an already-disposed context is a safe no-op', () => {
  class MockCtx {
    constructor() { this.state = 'running'; }
    suspend() { this.state = 'suspended'; }
    resume() { this.state = 'running'; }
    close() { this.state = 'closed'; }
  }
  globalThis.window = { AudioContext: MockCtx };
  try {
    const audio = new AudioSystem({ enabled: true, volume: 0.3 });
    audio.dispose();
    assert.equal(audio._ctx, null);
    assert.doesNotThrow(() => audio.dispose());
    assert.doesNotThrow(() => audio.suspend());
    assert.doesNotThrow(() => audio.resume());
  } finally {
    delete globalThis.window;
  }
});

// ── VSS-02 Phase 2: TheHUBBridge must answer 'hub.frame.pause' ─────────────
test('TheHUBBridge routes hub.frame.pause to _pauseGame (VSS-02 defect)', () => {
  const dispatched = [];
  globalThis.window = {
    location: { origin: 'http://localhost:3000' },
    addEventListener: () => {},
    dispatchEvent: (ev) => { dispatched.push(ev.type); }
  };
  let paused = 0;
  let resumed = 0;
  const bridge = new TheHUBBridge({
    onPause: () => { paused += 1; },
    onResume: () => { resumed += 1; }
  });
  try {
    bridge._handleMessage({ type: 'hub.frame.pause' });
    assert.equal(paused, 1, 'hub.frame.pause must reach _pauseGame');
    assert.ok(dispatched.includes('tbh-pause'), 'must dispatch tbh-pause event');

    bridge._handleMessage({ type: 'hub.frame.resume' });
    assert.equal(resumed, 1, 'hub.frame.resume must reach _resumeGame');
    assert.ok(dispatched.includes('tbh-resume'), 'must dispatch tbh-resume event');

    // Legacy vocabulary must still work (contract unchanged)
    bridge._handleMessage({ type: 'hub.companion.pause' });
    assert.equal(paused, 2, 'hub.companion.pause must still route');
    bridge._handleMessage({ type: 'hub.companion.resume' });
    assert.equal(resumed, 2, 'hub.companion.resume must still route');
  } finally {
    delete globalThis.window;
  }
});
