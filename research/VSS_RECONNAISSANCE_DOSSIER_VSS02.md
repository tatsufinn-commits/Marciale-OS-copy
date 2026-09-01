# VSS-02 — AUDIO LIFECYCLE · RECONNAISSANCE DOSSIER
## Phase 0 · Read-only · Marciale-OS ONLY

| Field | Value |
|---|---|
| Seat | R (RECONNAISSANCE · EXCEL) |
| Date | 2026-08-15 |
| Tree | HEAD `030f3db` at time of first pass · **re-verified at `a2846ce` after Commander's delayed push landed** |
| Authority | Seat A tasking 2026-08-15 → directive `TASK_VSS_02_PHASE_0_AUDIO_LIFECYCLE_2026-08-15.md` (now present — see F0) |
| Status | **PHASE 0 COMPLETE — recommendations are PROPOSALS ONLY** |

---

## 0. HEAD DECLARATION

```
$ git rev-parse --short HEAD
030f3db
$ git status --short
(clean except untracked research/* files — no tracked file modified)
```

## F0 · DIRECTIVE ABSENT AT FIRST, NOW PRESENT (resolved)

1. **Observation** — At tasking time the directive was absent from both trees; after the Commander's delayed push it landed, and I read it in full.
2. **Repository evidence** — First pass: `find . -iname "*VSS_02*"` → 0 hits on `030f3db`; raw URL → **404**. Post-push: `git ls-remote` HEAD = `a2846ce`; `docs/council/members/RECONNAISSANCE/tasks/TASK_VSS_02_PHASE_0_AUDIO_LIFECYCLE_2026-08-15.md` present (7,222 B).
3. **Affected subsystem** — Tasking/channel (Seat A → Seat R).
4. **Failure domain** — *(Resolved — no lasting defect.)* The delayed push was the Commander's own; no fault carried.
5. **Existing architecture** — Directive referenced by path; the tasking message carried scope/traps/question/baselines redundantly, so work could proceed safely.
6. **Missing contract** — *(None — the message's redundancy was sufficient.)*
7. **Reproduction** — `git clone` fresh → directive present at HEAD `a2846ce`.
8. **External reference** — *(none.)*
9. **Recommendation** *(PROPOSAL)* — None. The directive confirms the tasking message verbatim except one new item (the chess "1 hook" — F12).
10. **Confidence** — **Class B** · `[VERIFIED]`

---

# THE ONE QUESTION — ANSWERED UP FRONT

**Who owns the audio lifecycle across the Hub–Companion boundary?**
**Nobody.** Audio is owned three independent ways with no shared contract and no teardown:
- Companion: `AudioSystem` (WebAudio oscillators) — one-shot, self-stopping, context never closed/suspended, **no pause listener**.
- Hub: `playHubSound` / `getHubAudioContext` (WebAudio singleton) — one-shot, context never closed/suspended.
- Chess: `new Audio(src)` (HTMLAudioElement cache) — one-shot, never paused.

**At which exact line does sound survive a navigation / tab-hide / frame teardown?**

| Trigger | Where sound survives | Mechanism |
|---|---|---|
| **Tab-hide** | `Gamecompanion/files/src/main.js:82` — `audioSystem.play('hit')` | The loop keeps ticking `combatEngine.tick(dt)` + `aiController.update()` at 5 FPS while hidden (`main.js:509-510`); combat's `onHit` fires audio with **no pause gate**; the AudioContext is never suspended. |
| **Pause message** | `Gamecompanion/files/src/integration/TheHUBBridge.js:44-63` | The bridge handles `'hub.companion.pause'` but **not** `'hub.frame.pause'` (what `16-hubframe.js:107` actually posts). The thread dies in the switch. |
| **Frame teardown** | `AudioSystem.js` (no dispose) | `HubFrame.destroy()` clears the DOM but posts no audio teardown and cannot suspend the iframe's AudioContext; an in-flight note plays its tail. |

**Where the thread dies (Seat A's specific ask):** the `hub.frame.pause` message posted by `16-hubframe.js:107` has **no matching `case`** in `TheHUBBridge._handleMessage` — it falls through the switch unhandled. The companion-side pause path that *does* exist (`hub.companion.pause` → `main.js:450` `onPause`) touches only FPS + timeKeeper, never audio.

---

# FINDINGS

## F1 · AudioSystem exposes no teardown: no stop/suspend/dispose/close
1. **Observation** — The entire audio surface cannot be halted once constructed.
2. **Repository evidence** — `Gamecompanion/files/src/systems/AudioSystem.js` — public methods at lines **6** (`constructor`), **33** (`play`), **113** (`setVolume`), **117** (`toggle`). No `stop()`, `suspend()`, `dispose()`, `close()`.
3. **Affected subsystem** — Companion audio.
4. **Failure domain** — Lifecycle: sound cannot be silenced or the context released by any caller.
5. **Existing architecture** — `_ctx` created in `_initContext()` (lines 7–24), held for the object's life.
6. **Missing contract** — A `stop()`/`suspend()`/`dispose()` surface (and a `close()` on the context).
7. **Reproduction** — `grep -nE '^  [a-zA-Z]+\(' src/systems/AudioSystem.js` → only constructor/play/setVolume/toggle.
8. **External reference** — Web Audio `AudioContext.close()`/`.suspend()` is the standard teardown (MDN). *(Class C.)*
9. **Recommendation** *(PROPOSAL)* — Add `suspend()` + `dispose()` (call `this._ctx.close()`).
10. **Confidence** — **Class B** · `[VERIFIED]`

## F2 · AudioSystem never hears any pause event
1. **Observation** — No pause/resume signal reaches audio.
2. **Repository evidence** — `grep -n "GAME_PAUSED" src/systems/AudioSystem.js` → **0 hits** (confirmed this watch). AudioSystem registers no `eventBus.on(...)` and no `tbh-pause`/`tbh-resume` listener.
3. **Affected subsystem** — Companion audio.
4. **Failure domain** — The pause contract (GAME_PAUSED, tbh-pause) is emitted but unobserved by audio.
5. **Existing architecture** — `main.js:521` emits `Events.GAME_PAUSED` on hide; audio is not a subscriber.
6. **Missing contract** — Audio subscribing to pause/resume.
7. **Reproduction** — `grep -rn "GAME_PAUSED" src/` → only `EventBus.js:12` (definition) and `main.js:521` (emit). Zero listeners anywhere in src (see F6).
8. **External reference** — *(none.)*
9. **Recommendation** *(PROPOSAL)* — Audio consumes pause/resume to suspend/resume its context.
10. **Confidence** — **Class B** · `[VERIFIED]`

## F3 · The bridge drops `hub.frame.pause` — the thread dies in the switch
1. **Observation** — HubFrame's generic pause message is never handled by the Companion.
2. **Repository evidence** — `TheHUB 1.5.5.2.3 a v/modules/16-hubframe.js:107` posts `{type: document.hidden ? 'hub.frame.pause' : 'hub.frame.resume'}`; `Gamecompanion/files/src/integration/TheHUBBridge.js:44-63` `switch(data.type)` has cases for `hub.activity`, `hub.companion.snapshot`, `hub.companion.focus`, `hub.companion.pause`, `hub.companion.resume`, `hub.theme` — **no `hub.frame.pause`/`hub.frame.resume`**.
3. **Affected subsystem** — Hub↔Companion bridge.
4. **Failure domain** — Message-contract mismatch: the frame's pause signal is dead on arrival.
5. **Existing architecture** — Two divergent pause vocabularies (`hub.frame.*` from HubFrame vs `hub.companion.*` from 14-companion.js:211).
6. **Missing contract** — A single canonical pause message type, handled on both sides.
7. **Reproduction** — `grep -n "hub.frame.pause" modules/16-hubframe.js` (posts) vs `grep -n "hub.frame.pause" Gamecompanion/files/src/integration/TheHUBBridge.js` (0 hits).
8. **External reference** — *(none.)*
9. **Recommendation** *(PROPOSAL)* — Unify on one pause type; make the bridge handle it.
10. **Confidence** — **Class B** · `[VERIFIED]`

## F4 · Even the handled pause path never touches audio
1. **Observation** — The pause signal that *does* arrive stops play-time and FPS, not sound.
2. **Repository evidence** — `Gamecompanion/files/src/main.js:450-453` — `onPause: () => { gameLoop.setTargetFPS(5); timeKeeper.pause(); }` (no audio). `TheHUBBridge.js:96-99` `_pauseGame()` → `this._onPause()` + dispatch `tbh-pause`.
3. **Affected subsystem** — Companion pause handling.
4. **Failure domain** — Pause is partial: loop throttled, audio unaffected.
5. **Existing architecture** — `onPause` wired at bridge construction (`main.js:440`), audio constructed independently (`main.js:80`), never connected.
6. **Missing contract** — Pause/resume propagating to every live system, audio included.
7. **Reproduction** — `sed -n '450,453p' src/main.js` → no `audio`/`Audio` token (verified).
8. **External reference** — *(none.)*
9. **Recommendation** *(PROPOSAL)* — onPause/onResume suspend/resume audio too.
10. **Confidence** — **Class B** · `[VERIFIED]`

## F5 · Sound survives tab-hide: combat keeps ticking at 5 FPS and firing hits
1. **Observation** — The exact line where sound survives a hide is the combat hit-sound, still firing while hidden.
2. **Repository evidence** — `Gamecompanion/files/src/main.js:521` (hide → `setTargetFPS(5)` + `timeKeeper.pause()` + emit; **not** a loop stop); `main.js:506-512` loop body calls `combatEngine.tick(dt)` and `aiController.update()` **unconditionally**; `main.js:81-84` `onHit` → `audioSystem.play('hit')`; `src/core/TimeKeeper.js:9` `pause()` sets only `_paused=true` (gates `addPlayTime`, nothing else).
3. **Affected subsystem** — Companion game loop + audio.
4. **Failure domain** — Hidden auto-combat continues to synthesize audible hit-sounds through a running AudioContext.
5. **Existing architecture** — 5 FPS throttle + play-time pause; no combat/audio gate.
6. **Missing contract** — A "fully paused" state that halts combat-driven audio (or suspends the context).
7. **Reproduction** — Load Companion, enter combat, hide the tab: loop continues at 5 FPS (`main.js:506-512`), `onHit` still fires `play('hit')` (`main.js:82`). *(Audible confirmation requires a browser — see F9.)*
8. **External reference** — Standard idle-game practice: suspend audio + halt combat on `visibilitychange`. *(Class C.)*
9. **Recommendation** *(PROPOSAL)* — On hide, suspend the AudioContext (and/or gate `onHit` audio on a non-paused flag).
10. **Confidence** — **Class B** (code path) · `[VERIFIED]`

## F6 · `GAME_PAUSED` is emitted and listened to by no one
1. **Observation** — The game's own pause event has zero subscribers.
2. **Repository evidence** — `grep -rn "GAME_PAUSED" src/` → `src/core/EventBus.js:12` (definition) and `src/main.js:521` (emit). No `eventBus.on(Events.GAME_PAUSED, ...)` anywhere.
3. **Affected subsystem** — Event bus / pause semantics.
4. **Failure domain** — A canonical pause signal exists but is decorative; pause is enforced ad hoc (FPS + timeKeeper) instead of by contract.
5. **Existing architecture** — EventBus defines pause events; consumers never subscribe.
6. **Missing contract** — Systems (audio, combat, particles) subscribing to pause/resume.
7. **Reproduction** — `grep -rn "GAME_PAUSED\|GAME_RESUMED" src/ | grep -v EventBus.js` → only `main.js:521`.
8. **External reference** — Event-driven pause is the norm. *(Class C.)*
9. **Recommendation** *(PROPOSAL)* — Wire pause/resume subscribers; make audio one of them.
10. **Confidence** — **Class B** · `[VERIFIED]`

## F7 · Three independent audio owners, no shared contract
1. **Observation** — Audio is reinvented three times with three different lifecycles.
2. **Repository evidence** — (a) `AudioSystem.js` (WebAudio oscillators); (b) `TheHUB 1.5.5.2.3 a v/modules/00-utils-config.js:1174-1194` `_hubAudioCtx` singleton + `playHubSound`; (c) `TheHUB 1.5.5.2.3 a v/modules/15-chess.js:114-124` `CHESS_AUDIO_CACHE[kind] = new Audio(src)`.
3. **Affected subsystem** — All audio paths.
4. **Failure domain** — No single point to pause/suspend/mute across the house.
5. **Existing architecture** — Three silos; two WebAudio contexts + one HTMLAudioElement cache.
6. **Missing contract** — One audio service owning context + lifecycle, consumed by all three.
7. **Reproduction** — `grep -rlnE "AudioContext|new Audio\\(" modules/*.js` → 00-utils-config.js, 15-chess.js; plus AudioSystem.js.
8. **External reference** — Single audio-service pattern. *(Class C.)*
9. **Recommendation** *(PROPOSAL)* — Consolidate behind one lifecycle owner.
10. **Confidence** — **Class B** · `[VERIFIED]`

## F8 · AudioContexts are created but never suspended or closed
1. **Observation** — Every context leaks its lifecycle.
2. **Repository evidence** — `00-utils-config.js:1184-1185` creates `_hubAudioCtx` once, never `close()`d/`suspend()`d; `AudioSystem.js:7-24` creates `_ctx`, never closed. `grep -rn "\.close()\|\.suspend()"` over audio code → 0 hits.
3. **Affected subsystem** — Audio resource management.
4. **Failure domain** — Browser resource hold (a `running` AudioContext is not garbage-collected promptly).
5. **Existing architecture** — Singleton/long-lived contexts with resume-on-gesture only.
6. **Missing contract** — Explicit suspend-on-hide / close-on-teardown.
7. **Reproduction** — `grep -rn "\.suspend()\|\.close()" Gamecompanion/files/src/systems/AudioSystem.js "TheHUB 1.5.5.2.3 a v/modules/00-utils-config.js"` → 0 hits (the only `.resume()` is gesture-unlock).
8. **External reference** — `AudioContext` lifecycle best practice (MDN). *(Class C.)*
9. **Recommendation** *(PROPOSAL)* — Suspend on hide; close on destroy.
10. **Confidence** — **Class B** · `[VERIFIED]`

## F9 · The Class-A defect: mechanism verified, audible form bounded (stated plainly)
1. **Observation** — The Commander's defect, "audio continues after navigating away," has a **verified code mechanism** but a **bounded audible form**.
2. **Repository evidence** — Mechanism = F5 (combat-driven `play('hit')` while hidden). Bounded because **all** audio is one-shot: `AudioSystem.play` schedules `osc.stop(t0 + 0.12..0.36)` (AudioSystem.js:53, 80, 105); `playHubSound` stops at ≤0.46s (00-utils-config.js); chess `Audio` files are short one-shots. **No looping/long audio exists anywhere.**
3. **Affected subsystem** — Companion + Hub + chess audio.
4. **Failure domain** — The observed "continuation" is (a) repeated short hit-sounds during hidden auto-combat and (b) a never-suspended AudioContext — **not** sustained/looping audio.
5. **Existing architecture** — One-shot procedural synthesis only.
6. **Missing contract** — Pause-gated audio (F2/F4/F6).
7. **Reproduction** — *Audible reproduction NOT RUN*: this sandbox has no browser/audio device. Code-path reproduction is F5. **I will not claim an audible reproduction I did not perform (Law X).**
8. **External reference** — *(none.)*
9. **Recommendation** *(PROPOSAL)* — Fix F5/F6; the Commander's observation should be re-validated audibly on a live build after the fix.
10. **Confidence** — **Class B** (mechanism) · `[VERIFIED]`; audible form **Class A** · `[INSUFFICIENT EVIDENCE]` (not reproducible here)

## F10 · Frame teardown posts no audio signal
1. **Observation** — Destroying a Companion frame leaves audio unaddressed.
2. **Repository evidence** — `TheHUB 1.5.5.2.3 a v/modules/16-hubframe.js:161-167` `destroy()` removes listeners and clears `innerHTML`; it posts no message and cannot suspend the iframe's AudioContext. `close()` (line 157-160) posts `hub.frame.pause` only when `pauseOnHidden` — a message the bridge does not handle (F3).
3. **Affected subsystem** — HubFrame lifecycle.
4. **Failure domain** — An in-flight note plays its ≤0.6s tail past teardown; the context leaks until the iframe is GC'd.
5. **Existing architecture** — DOM-only teardown.
6. **Missing contract** — A teardown message the child handles by suspending/closing audio.
7. **Reproduction** — `sed -n '155,167p' modules/16-hubframe.js`.
8. **External reference** — Iframe unload → `pagehide`/message → close AudioContext. *(Class C.)*
9. **Recommendation** *(PROPOSAL)* — HubFrame `destroy()` emits a teardown signal the child handles for audio.
10. **Confidence** — **Class B** · `[VERIFIED]`

## F11 · Baseline divergence: Seat A's "147 Hub passing" not reproducible as stated
1. **Observation** — I cannot confirm "147 passing"; the Hub harness emits no TAP total.
2. **Repository evidence** — `npm run test:hub` exit **0**; 13 suite-header `✅` lines, **122** indented assertion lines; the only numeric suite totals are 14+12+14+14+14 = 68. Companion `77/77` **matches** Seat A. (Reported, not reconciled, per order.)
3. **Affected subsystem** — Test observability (same gap as VSS-00: Hub emits text `✅`, no TAP).
4. **Failure domain** — Counts are ambiguous across trees/methods.
5. **Existing architecture** — `tests/unit*.js` print `✅` lines; only 5 suites tally themselves.
6. **Missing contract** — A single machine-readable total.
7. **Reproduction** — `npm run test:hub` after `npm run install:all`; count `^  ✅` vs `^✅`.
8. **External reference** — TAP / test-reporting standards. *(Class C.)*
9. **Recommendation** *(PROPOSAL)* — Emit TAP or a final total from the Hub harness.
10. **Confidence** — **Class B** · `[VERIFIED]`

---

## F12 · Chess's only hide-hook guards the ENGINE workers, not the audio (directive's "1 hook")
1. **Observation** — The directive's chess row noted "1 hook present — verify what it actually guards." It guards the engine, not the sound.
2. **Repository evidence** — `TheHUB 1.5.5.2.3 a v/modules/15-chess.js:1806-1812` — `document.addEventListener('visibilitychange', () => { if(document.hidden){ onChessPageDeactivate(); } })`, and `onChessPageDeactivate` (`:1802-1805`) calls `chessEngineStop()`, `terminateChessEngineWorker()`, `terminateMaiaEngineWorker()`. **No audio call.** `grep -n "pause\|muted\|stop" CHESS_AUDIO_CACHE` region → 0 hits; `CHESS_AUDIO_CACHE` (`:114`, `:122`) is never paused/muted/disposed anywhere.
3. **Affected subsystem** — Chess SFX (`new Audio(src)` cache).
4. **Failure domain** — The hook terminates compute (workers) but leaves `Audio` elements unpaused — the same asymmetry as the Companion (F2/F4), in miniature.
5. **Existing architecture** — A lifecycle hook exists for chess but was built for the engine, never extended to audio.
6. **Missing contract** — Pause/mute of `CHESS_AUDIO_CACHE` (or a shared audio service — see judgement call).
7. **Reproduction** — `sed -n '1802,1812p' modules/15-chess.js`; `grep -n "CHESS_AUDIO_CACHE" modules/15-chess.js` → only `:114,120,122,124` (no pause/mute).
8. **External reference** — `HTMLMediaElement.pause()` is the standard pause. *(Class C.)*
9. **Recommendation** *(PROPOSAL)* — Route chess SFX through the shared audio service (F7/F8), or at minimum pause the cache on `onChessPageDeactivate`.
10. **Confidence** — **Class B** · `[VERIFIED]`

## F13 · VSS-00 F1/F2 repaired upstream at a2846ce; the F3 pause-path still holds
1. **Observation** — The delayed push ("Secure hub postMessage bridge") repaired two VSS-00 bridge findings but left the audio-relevant pause path unchanged.
2. **Repository evidence** — `git diff 030f3db..a2846ce -- modules/16-hubframe.js`: adds `HubFrame.isAllowedOrigin` static allowlist + `if (e.origin && !HubFrame.isAllowedOrigin(e.origin)) return;` in `_wireMessages` (VSS-00 **F2**), and pins `postMessage` `targetOrigin` from `'*'` to a computed origin (VSS-00 **F1**). The `hub.frame.pause` post at **line 107 is unchanged**, and `TheHUBBridge.js` still has no `case 'hub.frame.pause'` (this dossier's F3 persists).
3. **Affected subsystem** — HubFrame bridge (repaired) vs Companion bridge (unrepaired for pause).
4. **Failure domain** — Partial repair: the security fix landed; the audio-lifecycle gap it was adjacent to did not.
5. **Existing architecture** — Origin hardening in `16-hubframe.js`; no change to `TheHUBBridge.js`.
6. **Missing contract** — The `hub.frame.pause` → audio teardown path (F3/F4).
7. **Reproduction** — `git log --oneline 030f3db..a2846ce -- modules/16-hubframe.js` → "Secure hub postMessage bridge"; `grep -n "hub.frame.pause" Gamecompanion/files/src/integration/TheHUBBridge.js` → 0 hits.
8. **External reference** — *(none.)*
9. **Recommendation** *(PROPOSAL)* — The bridge repair is correct; the audio-pause contract remains open for the Commander's slice selection.
10. **Confidence** — **Class B** · `[VERIFIED]`

# THE JUDGEMENT CALL (requested)

**Is audio the same disease as VSS-00's isolation finding — per-subsystem convention vs platform contract?**

Yes, and it wants **the same cure shape but scoped to audio**:

- The disease is identical: three subsystems each invented their own convention, and the one thing none of them has is a *teardown*. VSS-00 found isolation is per-subsystem convention; audio lifecycle is per-subsystem convention too, with the same failure mode (no shared contract, so the cross-cutting behavior — stop/suspend/release — exists nowhere).
- **For audio specifically, a shared-runtime contract is the right cure**, and it is cheap: one audio service owning context + lifecycle, exposing `play/suspend/resume/dispose`, with the *three* existing consumers (AudioSystem, playHubSound, chess) calling into it instead of each holding its own context. A single pause-event hook (F6's GAME_PAUSED, currently listener-less) then suspends everything at once.
- **But** per-subsystem teardown as a *general* principle is the wrong cure for the house: if every subsystem owns its own teardown, the next subsystem (CADAM, TAMAKEE bridges) will repeat the same omission. The deeper fix — a platform-level "pause/suspend/dispose" contract every iframe/worker subsystem must implement — is the VSS-00 recommendation, and audio is simply its first concrete instance.

*Recommendation only. I implement nothing; neither does Seat A. Selection is the Commander's.*

---

# SCOPE CERTIFICATION

- [x] Marciale-OS only; TAMAKEE never opened
- [x] VSS-02 only; other slices not surveyed
- [x] Nothing written outside `research/` (tree verified clean)
- [x] `companion/assets/*` minified bundles **ignored** (build output, per order)
- [x] `npm run build` NOT run (F15 stands; not re-filed)
- [x] Every finding classed (A/B/C/D) + tagged; Class-B cites file+line
- [x] Reproductions executable without my context
- [x] Baseline difference reported (F11), not reconciled

A successor can resume at any finding boundary from the cited file+line and reproduction steps alone.

— Seat R, EXCEL · research-only · VSS-02 Phase 0 discharged
