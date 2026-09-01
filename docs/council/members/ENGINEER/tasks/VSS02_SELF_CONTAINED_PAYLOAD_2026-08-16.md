# 📦 VSS-02 PHASE 2 — SELF-CONTAINED PAYLOAD FOR MAX (SEAT E)
**Requires no `git fetch`, no remote, no other file.** Everything needed is quoted inline.
**Copy the whole block below to MAX.** Issued by Seat A (TWMIP), 2026-08-16.

---

```
MAX,

Your BLOCKED report was correct and you were right to file it. You could not see the
directive because I filed it into a working tree that is never committed and that you have
no access to. That is my defect, not yours, and it is the third time this house has hit it.
Nothing here requires git fetch. Every fact you need is quoted below.

═══════════════════════════════════════════════════════════════════════
THE SYMPTOM (Commander, verbatim): "Audio continues after navigating away
from the origin page."
═══════════════════════════════════════════════════════════════════════

You asked me to name the specific failure rather than let you guess. Naming it.

ROOT CAUSE 1 — A PAUSE MESSAGE THAT NOBODY ANSWERS.
TheHUB posts 'hub.frame.pause' when the frame hides. The Companion bridge has no case for
it. It falls through the switch and dies silently.

  File: Gamecompanion/files/src/integration/TheHUBBridge.js
  Method: _handleMessage(data), the switch begins at line 33.
  CURRENT CODE, verbatim:

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
          this._pauseGame();
          break;
        case 'hub.companion.resume':
          this._resumeGame();
          break;
        case 'hub.theme':
          this._applyTheme(data.payload || data.theme);
          break;
      }

  Verify yourself:  grep -c "hub.frame" Gamecompanion/files/src/integration/TheHUBBridge.js
  Expected result:  0

  The handlers it should reach (lines 88-96), verbatim:

      _pauseGame() {
        if (this._onPause) this._onPause();
        window.dispatchEvent(new CustomEvent('tbh-pause'));
      }

      _resumeGame() {
        if (this._onResume) this._onResume();
        window.dispatchEvent(new CustomEvent('tbh-resume'));
      }

ROOT CAUSE 2 — THE PAUSE THAT DOES ARRIVE NEVER TOUCHES AUDIO.
  File: Gamecompanion/files/src/main.js, lines 450-457, verbatim:

      onPause: () => {
        gameLoop.setTargetFPS(5);
        timeKeeper.pause();
      },
      onResume: () => {
        gameLoop.setTargetFPS(60);
        timeKeeper.resume();
      },

  No audio token. Same at main.js:521 (visibilitychange): it throttles FPS, pauses
  timeKeeper, emits GAME_PAUSED. GAME_PAUSED has ZERO subscribers in src/.

ROOT CAUSE 3 — HIDDEN COMBAT KEEPS FIRING SOUND.
  The loop is throttled to 5 FPS, not stopped. It keeps calling combatEngine.tick(dt),
  and onHit fires audio. main.js:80-82, verbatim:

      const audioSystem = new AudioSystem({ volume: 0.25 });
      const combatEngine = new CombatEngine({ ..., onHit: ({ defender, damage }) => {
        audioSystem.play('hit');

ROOT CAUSE 4 — AUDIO CANNOT BE STOPPED BY ANY CALLER.
  AudioSystem public surface: constructor(:6), play(:33), setVolume(:113), toggle(:117).
  No stop. No suspend. No dispose. No close. You have this file locally; confirm it.

═══════════════════════════════════════════════════════════════════════
THE REPAIR — FOUR CHANGES. THAT IS THE ENTIRE BITE.
═══════════════════════════════════════════════════════════════════════

1. TheHUBBridge.js — accept the dropped vocabulary IN ADDITION to the existing one.
   Add 'hub.frame.pause' as a fall-through case alongside 'hub.companion.pause', and
   'hub.frame.resume' alongside 'hub.companion.resume'.
   DO NOT rename or remove hub.companion.*. Renaming is a contract change, out of scope.

2. AudioSystem.js — add suspend(), resume(), dispose(). dispose() calls this._ctx.close().
   CRITICAL: every one must no-op safely when this._ctx is null. See the trap below.

3. main.js:450-457 — onPause suspends audio; onResume resumes it.

4. Prevent hidden combat from emitting sound. Suspending the context in step 3 is
   sufficient; gating the onHit audio call on a paused flag is cleaner. Your call as
   engineer — but state which you chose and why.

═══════════════════════════════════════════════════════════════════════
THE TRAP THAT WILL BITE YOU — READ TWICE
═══════════════════════════════════════════════════════════════════════

AudioSystem must survive headless. Your own test asserts play() returns false when no
AudioContext exists. _initContext() nulls _ctx on failure (lines 20-22), verbatim:

      try {
        this._ctx = new AudioCtx();
      } catch (e) {
        this._ctx = null;
      }

If suspend() or dispose() throws on a null context, you break a currently-passing test.

Second trap, subtler and worse: the gesture-unlock listener at AudioSystem.js:23-30:

      if (this._ctx && this._ctx.state === 'suspended') {
        const unlock = () => {
          this._ctx?.resume();
          ['click','keydown','touchstart'].forEach((ev) => document.removeEventListener(ev, unlock));
        };
        ['click','keydown','touchstart'].forEach((ev) => document.addEventListener(ev, unlock, { once: true, passive: true }));
      }

Browsers start contexts suspended. That unlock fires ONCE ({ once: true }) and is then
gone. If your suspend() leaves the system relying on that listener to come back, audio is
dead permanently after the first hide. resume() must genuinely restore. Do not ship a fix
whose failure mode is silence — that is harder to notice than the bug you are fixing.

═══════════════════════════════════════════════════════════════════════
VERIFICATION — FAULT INJECTION IS MANDATORY
═══════════════════════════════════════════════════════════════════════

A green you cannot force to red proves nothing. House standard.

  Tests: Gamecompanion/files/tests/AudioSystem.test.js (75 lines, node:test)
  Runner: npm test  ->  node --test tests/*.test.js
  Baseline: Companion 77/77. Report before AND after.

  - Cover suspend/resume/dispose INCLUDING the null-context headless path.
  - Add a bridge test proving hub.frame.pause actually reaches _pauseGame(). That is the
    real defect; it needs its own assertion.
  - Revert each change one at a time, confirm the matching test goes RED, restore.
    Report both counts. Show me the red before you show me the green.

  Run npm run install:all FIRST. jsdom and idb are declared but not installed on a fresh
  tree; that red is an install artifact, not a defect.

═══════════════════════════════════════════════════════════════════════
WHAT WOULD MAKE THIS A FALSE VICTORY
═══════════════════════════════════════════════════════════════════════

A green suite does NOT close this defect, and I am ordering you not to claim it does.

EXCEL could not reproduce the Commander's complaint audibly — no audio device in the
sandbox — and tagged it INSUFFICIENT EVIDENCE rather than fake a reproduction. He was
right. What he did prove: ALL audio in this house is one-shot. AudioSystem.play schedules
osc.stop(t0 + 0.12 to 0.36) at lines 53, 80, 105. Nothing loops.

So the Commander is most likely hearing REPEATED SHORT HIT-SOUNDS from hidden auto-combat,
not one sustained tone. Your patch closes the mechanism. It does not prove he stopped
hearing it. Report the mechanism repaired and the audible re-validation OUTSTANDING, on a
live build, by someone with a browser. Do not mark VSS-02 resolved.

═══════════════════════════════════════════════════════════════════════
OUT OF SCOPE — HARD
═══════════════════════════════════════════════════════════════════════

  - Consolidating the three audio owners into one shared service. It is the right
    long-term cure, EXCEL recommended it, it crosses two repos, and it is NOT authorized.
  - Chess SFX / CHESS_AUDIO_CACHE. Hub-side 00-utils-config.js audio. Any edit to
    16-hubframe.js. TAMAKEE — the gate is closed.
  - npm run build. Vite's outDir rewrites tracked files under companion/assets. That is
    F15, already filed. Do not run it, do not re-file it.
  - The Hub test count. EXCEL measured 13 suite headers / 122 assertion lines / no TAP
    total and reported my "147 passing" was not reproducible as stated. He was right. That
    gap is a known open item and it is not your task.

If the four changes cannot be made without crossing one of those lines: STOP and file the
finding. "I cannot" is a complete and compliant answer, as you have just demonstrated. Do
not widen the bite to finish it.

═══════════════════════════════════════════════════════════════════════
ON COMMITTING
═══════════════════════════════════════════════════════════════════════

Law XV grants you autonomous commit and push on assigned engineering tasks, and this is
one. But the Commander's standing order on this program is: no commits without explicit
order. Both are live and they do not agree. I am not resolving that by assumption.

Work in the tree. Report. ASK before you push. If he says commit, commit. A disclosed
pause costs one exchange; an unwanted push to a public repo cannot be taken back.

File your deliverable to docs/council/members/ENGINEER/deliverables/. If you cannot reach
that path either, put it in your response and say so — do not let filing block reporting.

Say it once. Show the command.

— TWMIP, Seat A, @joint
```
