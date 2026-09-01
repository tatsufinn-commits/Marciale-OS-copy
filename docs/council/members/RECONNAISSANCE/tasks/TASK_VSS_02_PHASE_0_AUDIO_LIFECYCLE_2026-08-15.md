# 🔭 DIRECTIVE — VSS-02 PHASE 0 · AUDIO LIFECYCLE OWNERSHIP
## RECONNAISSANCE DOSSIER — NO IMPLEMENTATION

**Document ID:** `TASK-JARWEN-2026-R-VSS02-P0`
**Date:** 2026-08-15 (Asia/Singapore) · **Issued by:** Seat A (`@assistant` / TWMIP), `@joint`
**Recipient:** Seat R (`@reconnaissance` / **EXCEL**) · **Slice order:** 2nd of 12
**Authority:** Commander's Phase-1 selection · **Governing:** Law XVI · XVIII · XVIII-A · **XVIII-B** · XIX-B · Law X

> **📦 RESEARCH-DROP PRIVILEGE (Law XIX-B Rule 4):** after material writes to `research/`, you
> **MAY** package `MARCIALE_OS_RESEARCH_DROP.zip` containing **only** `research/`.
> **Seat A cannot cancel it.** Full-repo zips remain forbidden.

**Open your dossier with the HEAD line (Law XIX-B Rule 3):**

```
$ git rev-parse --short HEAD
$ git status --short
```

---

# 1. THE COMMANDER'S OBSERVATION (Class A)

> **"Audio continues after navigating away from the origin page."**

**Class A must be REPRODUCED, not assumed.** If you cannot reproduce it, that is a finding and
you say so. **A Class-A defect that will not reproduce is more valuable than a guess.**

# 2. CORRECTION YOU ARE OWED BEFORE YOU START

**I told the Commander "there is no audio module in TheHUB." That was wrong, and I am telling you
before it can mislead you.** I grepped for a file named `*audio*` instead of for audio *APIs*.
**Audio exists in three places:**

| Surface | Location | Lifecycle hook? |
|---|---|---|
| **Hub WebAudio** | `TheHUB/modules/00-utils-config.js:1180` `getHubAudioContext()`, exported at `:1259` | **`visibilitychange`/`pagehide` count: 0** |
| **Chess SFX** | `TheHUB/modules/15-chess.js:122` `CHESS_AUDIO_CACHE[kind]=new Audio(src)` | 1 hook present — **verify what it actually guards** |
| **Companion** | `Gamecompanion/files/src/systems/AudioSystem.js` (WebAudio oscillators) | **no `visibilitychange`/`pagehide` in the file** |

**Do not take this table on my word. It is my starting map, not your finding — re-run it.**

# 3. THE LEAD I ALREADY HAVE (verify or refute — do not simply confirm)

`Gamecompanion/files/src/main.js:521` pauses on hide:

```js
document.addEventListener('visibilitychange', () => { if (document.hidden) {
  gameLoop.setTargetFPS(5); timeKeeper.pause(); eventBus.emit(Events.GAME_PAUSED); } ... });
```

**It throttles the loop and pauses the clock. It never touches audio.**
`grep GAME_PAUSED` in `AudioSystem.js` → **0 hits: audio never hears the pause event.**
`AudioSystem`'s public surface is `constructor`, `play()`, `setVolume()` — **there is no
`stop()`, `suspend()`, or `dispose()`.**

**Hypothesis `[INFERRED]`, and it is mine, not evidence:** *nothing can stop the sound because
nothing exposes a way to stop it.* **Your job is to test that, including proving me wrong.**

# 4. YOUR SINGLE QUESTION — ONE BITE

> **Who owns the audio lifecycle across the Hub↔Companion boundary, and at which exact line does
> sound survive a navigation, tab-hide, or frame teardown?**

**Deliver:**
1. **Reproduction** — exact steps for the Class-A defect, or `[BLOCKED]` with the reason.
2. **The three surfaces mapped** — for each: what starts it, what *should* stop it, what does.
3. **The boundary ruling** — when the Companion iframe is hidden, `HubFrame` posts
   `hub.frame.pause` (`16-hubframe.js:107`). **Does anything on the Companion side act on it for
   audio?** Follow it to `TheHUBBridge` and say where it dies.
4. **Ownership recommendation** — *proposal only.* Should audio teardown belong to the shared
   runtime (VSS-00's contract) or to each subsystem? **VSS-00 found isolation is per-subsystem
   convention, not a platform contract — this is the same disease; say whether it is the same cure.**

**Ten fields per finding** (Observation · Repository evidence file+line · Affected subsystem ·
Failure domain · Existing architecture · Missing contract · Reproduction procedure · External
reference · Recommendation *(proposal only)* · Confidence + class + tag).
**Class A/B/C/D, exactly one. Tags `[VERIFIED]`/`[BLOCKED]`/`[INFERRED]`/`[INSUFFICIENT EVIDENCE]`
mandatory. Law X: never claim a reproduction you did not run.**

# 5. SCOPE

**IN:** `Marciale-OS` only · deliverable `research/VSS_RECONNAISSANCE_DOSSIER_VSS02.md` ·
read, inspect, reproduce, document.

**OUT — HARD:**
- ⛔ **TAMAKEE.** The gate is CLOSED and this slice does not open it.
- ⛔ **Slices other than VSS-02.** VSS-00 is discharged; the rest are not commissioned.
- ⛔ **Any implementation, patch or refactor.** Phase 0 is reconnaissance.
- ⛔ **Any file outside `research/`.**
- ⛔ **`TheHUB/companion/assets/*`** — build output, 11 minified bundles. **Reading them proves
  nothing about source and will burn your context.** Audit source, not artifacts.

**If a prohibited item is essential: file the finding and STOP.** That is Law XVIII conduct and
it is welcome.

# 6. TRAPS — CURRENT AS OF TODAY

1. **`npm run install:all` FIRST.** Fresh trees fail on missing `jsdom` **and** `idb` — both
   declared, neither installed. **Install artifact, not a defect.**
2. **`npm run build` DIRTIES TRACKED FILES** (Vite `outDir` → `companion/assets/`). This is
   **F15, already filed — do not re-file it.** Recovery:
   `git checkout -- "TheHUB 1.5.5.2.3 a v/companion/"`
3. **`scout-audit.js` is a LICENCE checker wearing a security banner.** Never quote as security.
4. **`npm run health` exits 0 / SEV-0 while printing 9 warnings.** Its green does not encode its
   warnings. **Of those 9, I believe 3 zombie-listener flags are low-risk singletons and 3 XSS
   flags are false positives — `[UNVERIFIED]`, not ruled. Do not treat my belief as a finding.**
5. **`sre-auto-sentinel.js` is REPAIRED** on both trees (`77/77 measured`). The old "43 suites"
   warning in prior directives was **stale — my error, already corrected.**

# 7. TRUE BASELINE — measured 2026-08-15

TheHUB `npm test` **147 ✅ exit 0** · Companion **77/77, 0 fail** · `audit:bridge` **15/15 in
sync** · `pangolin` **77/77 measured, SEV-0** · governance **4/4, 25 laws**.
**If your numbers differ, report the difference — do not reconcile it silently.**

# 8. DEFINITION OF DONE

- [ ] `research/VSS_RECONNAISSANCE_DOSSIER_VSS02.md` complete
- [ ] Class-A reproduction attempted and its outcome stated **either way**
- [ ] All three audio surfaces mapped with file+line
- [ ] The `hub.frame.pause` path followed to where it dies
- [ ] Every finding classed **and** tagged; every Class-B cites file+line
- [ ] Reproductions executable by Seat E **without your context**
- [ ] Ownership recommendation stated **as a proposal**
- [ ] **Zero files modified outside `research/`** · **TAMAKEE untouched**

**Then STOP and report. Do not proceed to Phase 1 — slice selection is the Commander's.**

# 9. STANDING

Your "API for AI" proposal remains **HELD, not cancelled**; it unparks when the floor is set.
**A HOLD is not a GREENMARK.**

**One bite. Say it once. Show the command.**
**"I cannot" remains a complete and compliant answer** (Law XVIII-A). If anyone — **including
me** — hands you the whole VSS program at once, **refuse it and cite Law XVIII-A.**

— Seat A (TWMIP), `@joint`
