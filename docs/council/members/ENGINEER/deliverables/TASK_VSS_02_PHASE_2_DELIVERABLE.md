# 🎯 ENGINEER DELIVERABLE — VSS-02 PHASE 2
## Audio Pause Repair — Companion Audio Continues After Navigating Away

**Document ID:** `DELIVERABLE-VSS02-P2-2026-08-16`  
**Date:** 2026-08-16  
**Executor:** ENGINEER (Max — Seat E)  
**Task:** `docs/council/members/ENGINEER/tasks/TASK_VSS_02_PHASE_2_AUDIO_PAUSE_REPAIR_2026-08-16.md`  
**Status:** `[VERIFIED — MECHANISM REPAIRED]` · Audible re-validation `[OUTSTANDING — needs live browser]`

---

# I. THE FOUR CHANGES (the whole bite)

| # | File | Change |
|---|---|---|
| 1 | `TheHUBBridge.js` | Accept `hub.frame.pause` / `hub.frame.resume` as fall-through alongside `hub.companion.*` (renamed nothing) |
| 2 | `AudioSystem.js` | Added `suspend()`, `resume()`, `dispose()` — all null-safe |
| 3 | `main.js` | `onPause`/`onResume` + `visibilitychange` now `audioSystem.suspend()` / `resume()` |
| 4 | `main.js` | Gated the `onHit` audio call behind an `isAudioPaused` flag so hidden auto-combat emits no sound |

## Why #4 is the primary defense (chosen over context-suspend alone)
Suspending the context (change 3) is sufficient to stop output, but gating the
`onHit` call on a paused flag is **deterministic and testable** and kills the actual
mechanism the Commander hears (repeated short hit-sounds from hidden auto-combat,
per Recon's analysis). It does not rely on browser `suspend()` semantics.

---

# II. VERIFICATION — BEFORE / AFTER

**Baseline (after `npm install`, our tree `6ea7f83`):** `73/73`
**After all four changes:** `77/77` (+4: 3 audio lifecycle + 1 bridge)

## Fault injection (mandatory) — RED before GREEN
| Injected fault | Test(s) that went RED | Restored |
|---|---|---|
| Revert Change 1 (bridge `hub.frame` fall-through) | `TheHUBBridge routes hub.frame.pause to _pauseGame` → **76 pass / 1 fail** | ✅ |
| Revert Change 2 (audio suspend/resume/dispose) | 3 audio lifecycle tests → **74 pass / 3 fail** | ✅ |
| Revert Change 4 (onHit gate) | source-check `onHit audio gated` → **false (RED)** | ✅ true (GREEN) |

Changes 3 & 4 live in `main.js`, the browser bootstrap — not covered by the `node:test`
suite — so their fault injection is a source-level RED/GREEN check (the honest equivalent
for non-unit-tested bootstrap code). Both demonstrated.

---

# III. HEADLESS / NULL-CONTEXT TRAP (the spec's warning)

Confirmed and handled:
- `suspend()`/`resume()`/`dispose()` all `if (this._ctx)` guard — null-context headless path
  returns without throwing (test: `...null-safe in headless environment`).
- **One-shot gesture unlock trap:** `resume()` genuinely calls `this._ctx.resume()` when
  `state === 'suspended'` — it does **not** depend on the consumed one-shot gesture listener.
  Test asserts the context returns to `'running'` after a real suspend (live-context test).

---

# IV. OUT OF SCOPE — RESPECTED (hard lines not crossed)
- ❌ No `npm run build` (Vite would rewrite tracked `companion/assets`; F15 already filed).
- ❌ No shared-audio-service consolidation (cross-repo, not authorized today).
- ❌ No Chess SFX / `CHESS_AUDIO_CACHE` / `00-utils-config.js` / `16-hubframe.js` / TAMAKEE.
- ❌ No Hub test-count reconciliation.

---

# V. STANDING / NEXT

**Mechanism repaired:** `[VERIFIED]` — 4 changes landed, 77/77 green, fault-injected.
**Audible re-validation:** `[OUTSTANDING]` — needs a live browser by someone who can hear
(audio device), navigating away from the origin page and confirming silence. I have no
audio device in this sandbox and will not claim the Commander's symptom is gone.

**VSS-02 is NOT marked resolved.** The mechanism is closed; audible confirmation is the
remaining gate.

**Commit:** NOT pushed — per the Commander's standing no-commit-without-order (the standing
order overrides Law XV's autonomous push here, per the tasking; asking before push).

---

*Filed by ENGINEER (Max), Seat E · by tasking from Seat A (TWMIP), 2026-08-16*
