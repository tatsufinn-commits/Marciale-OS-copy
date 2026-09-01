# 🔧 DIRECTIVE — VSS-02 PHASE 2 · AUDIO LIFECYCLE REPAIR
## SEAT E (MAX) · IMPLEMENTATION · ONE BITE

**Document ID:** `TASK-JARWEN-2026-E-VSS02-P2`
**Date:** 2026-08-16 (Asia/Singapore) · **Issued by:** Seat A (`@assistant` / TWMIP), `@joint`
**Recipient:** Seat E (`@engineer` / **MAX**) · **Authority:** Commander's Phase-2 order, 2026-08-16
**Upstream evidence:** `research/VSS_RECONNAISSANCE_DOSSIER_VSS02.md` (Seat R / EXCEL, 13 findings)
**Governing:** Law XV · Law X · Law XVIII-A · Law XIV-A

**Open with the HEAD line:**
```
$ git rev-parse --short HEAD
$ git status --short
```

---

## 1. WHAT YOU ARE FIXING, AND WHY IT IS NOT WHAT IT LOOKS LIKE

**The Commander's report:** *"Audio continues after navigating away from the origin page."*

Reconnaissance is discharged. **You are not investigating — the root cause is located and
independently re-verified by this office.** It is **not** a missing `stop()` method. It is a
**message-contract mismatch plus an unpaused game loop:**

| # | Fault | Evidence (verified) |
|---|---|---|
| **F3** | `16-hubframe.js:107` posts **`hub.frame.pause`**. `TheHUBBridge._handleMessage` (`:33-56`) has cases for `hub.activity`, `hub.companion.event/.snapshot/.focus/.pause/.resume`, `hub.focus.state`, `hub.theme` — **no `hub.frame.pause`**. The signal **falls through the switch and dies.** `grep -c "hub.frame" TheHUBBridge.js` → **0** | Two divergent pause vocabularies |
| **F4** | The pause that *does* arrive touches no audio: `main.js:450-455` `onPause: () => { gameLoop.setTargetFPS(5); timeKeeper.pause(); }` | Pause is partial |
| **F5** | Loop keeps calling `combatEngine.tick(dt)` at 5 FPS while hidden (`main.js:506-512`); `onHit` fires `audioSystem.play('hit')` (`main.js:82`) with **no pause gate** | Hidden combat keeps making noise |
| **F1** | `AudioSystem` public surface: `constructor:6`, `play:33`, `setVolume:113`, `toggle:117`. **No `stop`/`suspend`/`dispose`/`close`** | Nothing *can* silence it |
| **F6** | `GAME_PAUSED` is emitted at `main.js:521` and has **zero subscribers** in `src/` | A decorative contract |
| **F8** | Contexts created, never `suspend()`ed or `close()`d (`AudioSystem.js:7-24`; `00-utils-config.js:1184`) | Resource hold |

## 2. ⚠️ READ THIS BEFORE YOU CLAIM THE DEFECT IS FIXED

**EXCEL could not reproduce the Commander's defect audibly** — the sandbox has no audio device.
He tagged the audible form **`[INSUFFICIENT EVIDENCE]`** and refused to claim otherwise (Law X).
**Hold that same line.**

**What he did establish:** **all audio in the house is one-shot.** `AudioSystem.play` schedules
`osc.stop(t0 + 0.12…0.36)` (`:53/:80/:105`); `playHubSound` stops ≤0.46s; chess plays short files.
**There is no looping audio anywhere.** So the Commander most likely hears **repeated short
hit-sounds from hidden auto-combat**, not one sustained tone.

**Therefore: a green test suite does NOT close this defect.** Your patch closes the *mechanism*.
**The Commander's observation must be re-validated audibly on a live build** — by someone with a
browser, which is not you and not me. **Say so in your deliverable. Do not report VSS-02 as
resolved; report the mechanism as repaired and the audible check as outstanding.**

## 3. SCOPE — ONE BITE

**IN — the Companion audio pause path (four changes):**

1. **`Gamecompanion/files/src/integration/TheHUBBridge.js`** — handle the dropped message.
   Add `case 'hub.frame.pause':` alongside `hub.companion.pause` (`:46`) and
   `case 'hub.frame.resume':` alongside `hub.companion.resume` (`:49`). **Do not rename the
   existing vocabulary** — accept both. Renaming is a contract change and is **out of scope.**
2. **`Gamecompanion/files/src/systems/AudioSystem.js`** — add the missing teardown surface:
   `suspend()`, `resume()`, `dispose()`. `dispose()` calls `this._ctx.close()`. **Every one must
   no-op safely when `this._ctx` is null** — the headless path is load-bearing (see §5).
3. **`Gamecompanion/files/src/main.js:450-455`** — `onPause` additionally suspends audio;
   `onResume` resumes it. This is the smallest correct fix for F4.
4. **F5 gate** — ensure hidden combat cannot emit sound. Suspending the context in (3) is
   *sufficient*; a `_paused` gate on the `onHit` audio call is *cleaner*. **Your call as
   engineer — but justify which you chose in the deliverable.**

**OUT — HARD:**
- ⛔ **F7 (consolidating the three audio owners into one service).** That is an architecture
  change across two repos. **It is the right long-term cure and it is NOT authorized today.**
- ⛔ **F12 (chess SFX / `CHESS_AUDIO_CACHE`)** and any Hub-side `00-utils-config.js` audio work.
- ⛔ **TAMAKEE.** The gate is closed.
- ⛔ **Renaming/removing `hub.companion.*`** or altering `16-hubframe.js`.
- ⛔ **`npm run build`** — Vite's `outDir` rewrites tracked files under `companion/assets/`.
  **That is F15, already filed. Do not re-file it, do not run it.**

**If the four changes cannot be made without crossing a line above: STOP and file the finding.**
"I cannot" is a complete and compliant answer (Law XVIII-A). **Do not widen the bite to finish.**

## 4. VERIFICATION — FAULT INJECTION IS MANDATORY

**A green you cannot force to red proves nothing.** The house standard (Task 38: 7 red → 26 green):

- [ ] Add tests to `Gamecompanion/files/tests/AudioSystem.test.js` (75 lines, `node:test`,
      run by `npm test` → `node --test tests/*.test.js`) covering `suspend`/`resume`/`dispose`,
      **including the null-`_ctx` headless path.**
- [ ] Add a bridge test proving **`hub.frame.pause` now reaches `_pauseGame()`** — this is the
      actual defect; it must have its own assertion.
- [ ] **Fault-inject:** revert each change one at a time, confirm the matching test goes **red**,
      restore. **Report the red counts and the green counts, both measured.**
- [ ] Companion baseline is **77/77**. Report your before/after numbers.
- [ ] **Do not touch the Hub harness count.** EXCEL measured **13 suite headers / 122 assertion
      lines / no TAP total** and reported that my "147 passing" was **not reproducible as stated**.
      He was right to report rather than reconcile it. **That gap is a known open item — not yours.**

## 5. TRAPS — CURRENT AS OF TODAY

1. **`npm run install:all` FIRST.** `jsdom` and `idb` are declared but not installed on a fresh
   tree. The resulting red is an **install artifact, not a defect.**
2. **`AudioSystem` must survive headless.** `tests/AudioSystem.test.js` asserts
   `play()` returns `false` when no `AudioContext` exists. **If your `suspend`/`dispose` throws on
   a null context, you break a passing test.** `_initContext` already nulls `_ctx` on failure
   (`:20-22`).
3. **The gesture-unlock listener at `AudioSystem.js:24-30` is load-bearing** — browsers start
   contexts suspended. **Do not let `suspend()` fight the unlock path** so audio is dead after
   the first hide. `resume()` must genuinely restore.
4. **`scout-audit.js` is a licence checker in a security banner** — never quote it as security.
5. **Root `npm run health` exits 0 while printing warnings.** Its green does not encode them.

## 6. COMMIT AUTHORITY — READ CAREFULLY

**Law XV grants you autonomous commit and push for assigned engineering tasks.** This is an
assigned engineering task, so that authority is live.

**However — the Commander's standing order on this program is `no commits without explicit
order`, and I have not been given one for this repair.** The two do not obviously agree, and
**I will not resolve that by assumption in either direction.**

**Therefore: complete the work in the working tree, report, and ASK before pushing.** If the
Commander tells you to commit, commit. **A disclosed pause costs one exchange; an unwanted push
to a public repository cannot be taken back.**

## 7. DEFINITION OF DONE

- [ ] `hub.frame.pause` / `hub.frame.resume` handled by the bridge
- [ ] `AudioSystem` exposes `suspend`/`resume`/`dispose`, all null-safe
- [ ] `onPause`/`onResume` drive audio; hidden combat emits no sound
- [ ] New tests, **fault-injected**, red-then-green counts reported
- [ ] Companion suite green; before/after stated
- [ ] Deliverable filed to `docs/council/members/ENGINEER/deliverables/`
- [ ] **Audible re-validation declared OUTSTANDING, not assumed** (§2)
- [ ] `git status --short` shows **only** the files you intended
- [ ] **No `npm run build`. No TAMAKEE. No push without the Commander's word.**

**Then stop and report. F7 consolidation is the Commander's Phase-1 call, not yours and not mine.**

— Seat A (TWMIP), `@joint`
