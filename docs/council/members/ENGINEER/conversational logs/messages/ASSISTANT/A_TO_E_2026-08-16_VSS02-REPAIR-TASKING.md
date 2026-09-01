# ✉️ MESSAGE TO MAX (SEAT E) — VSS-02 PHASE 2 REPAIR
**Copy everything inside the block below and send it to MAX as-is.**
Assumes no retained context. Paths are working paths. Filed per Law XIV-A.

---

```
MAX,

Phase 2 of VSS-02 is yours. Reconnaissance is discharged — you are implementing, not
investigating. Read the directive first:

docs/council/members/ENGINEER/tasks/TASK_VSS_02_PHASE_2_AUDIO_PAUSE_REPAIR_2026-08-16.md

Evidence base (EXCEL, Seat R, 13 findings, already verified by me):
research/VSS_RECONNAISSANCE_DOSSIER_VSS02.md

Repo: https://github.com/tatsufinn-commits/Marciale-OS
Start with: git rev-parse --short HEAD && git status --short

THE DEFECT. The Commander reports audio continues after navigating away. It is not a missing
stop() method, which is what I assumed before EXCEL did the work. It is a message-contract
mismatch:

  TheHUB 1.5.5.2.3 a v/modules/16-hubframe.js:107  posts 'hub.frame.pause'
  Gamecompanion/files/src/integration/TheHUBBridge.js:33-56  switch handles
    hub.activity, hub.companion.event, hub.companion.snapshot, hub.companion.focus,
    hub.focus.state, hub.companion.pause, hub.companion.resume, hub.theme

'hub.frame.pause' has no case. It falls through the switch and dies. grep -c "hub.frame"
on TheHUBBridge.js returns 0. Two divergent pause vocabularies, and the frame's signal is
dead on arrival.

Worse, the pause that DOES arrive never touches audio. main.js:450-455 is
onPause: () => { gameLoop.setTargetFPS(5); timeKeeper.pause(); }. The loop keeps calling
combatEngine.tick(dt) at 5 FPS while hidden (main.js:506-512), and onHit still fires
audioSystem.play('hit') at main.js:82 with no gate. AudioSystem has no stop, no suspend,
no dispose. GAME_PAUSED is emitted at main.js:521 and has zero subscribers.

FOUR CHANGES. That is the whole bite.

  1. TheHUBBridge.js — add case 'hub.frame.pause' next to hub.companion.pause (:46) and
     case 'hub.frame.resume' next to hub.companion.resume (:49). Accept both vocabularies.
     Do NOT rename the existing ones. Renaming is a contract change and is out of scope.
  2. AudioSystem.js — add suspend(), resume(), dispose(). dispose() calls _ctx.close().
     Every one must no-op safely when _ctx is null. This matters, see the trap below.
  3. main.js:450-455 — onPause suspends audio, onResume resumes it.
  4. Make sure hidden combat cannot emit sound. Suspending the context in step 3 is
     sufficient; gating the onHit audio call on a paused flag is cleaner. Your call as
     engineer, but tell me which you chose and why.

NOW THE PART I NEED YOU TO TAKE SERIOUSLY.

A green test suite does not close this defect. EXCEL could not reproduce the Commander's
complaint audibly — no audio device in the sandbox — and he tagged it INSUFFICIENT EVIDENCE
rather than claim a reproduction he never ran. Hold that same line.

What he did prove: all audio in the house is one-shot. AudioSystem.play schedules
osc.stop(t0 + 0.12 to 0.36) at lines 53, 80, 105. playHubSound stops at 0.46s or less. Chess
plays short files. Nothing loops. So what the Commander hears is most likely repeated short
hit-sounds from hidden auto-combat, not one sustained tone.

Your patch closes the mechanism. It does not prove the Commander stopped hearing the sound.
Report the mechanism as repaired and the audible re-validation as OUTSTANDING, on a live
build, by someone with a browser. Do not mark VSS-02 resolved. If you write "fixed" and he
still hears it, we have burned his trust for nothing.

VERIFICATION — fault injection is mandatory. A green you cannot force to red proves nothing.
Tests go in Gamecompanion/files/tests/AudioSystem.test.js (75 lines, node:test, run by
npm test → node --test tests/*.test.js). Cover suspend, resume, dispose including the
null-context headless path. Add a bridge test proving hub.frame.pause actually reaches
_pauseGame() — that is the real defect and it needs its own assertion. Then revert each
change one at a time, confirm the matching test goes red, restore. Report both counts.
Companion baseline is 77/77. Give me before and after.

TRAPS, current today:
  Run npm run install:all first. jsdom and idb are declared but not installed on a fresh
  tree, and that red is an install artifact, not a defect.
  AudioSystem must survive headless. tests/AudioSystem.test.js asserts play() returns false
  when no AudioContext exists. If suspend or dispose throws on a null context you break a
  currently-passing test. _initContext already nulls _ctx on failure at :20-22.
  The gesture-unlock listener at AudioSystem.js:24-30 is load-bearing — browsers start
  contexts suspended. Do not let suspend() fight the unlock path and leave audio dead after
  the first hide. resume() must genuinely restore.
  Do NOT run npm run build. Vite's outDir rewrites tracked files under companion/assets.
  That is F15, already filed. Do not re-file it.
  Do not touch the Hub test count. EXCEL measured 13 suite headers and 122 assertion lines
  with no TAP total, and reported that my "147 passing" was not reproducible as stated. He
  was right. That gap is a known open item and it is not yours.

OUT OF SCOPE, hard: consolidating the three audio owners into one shared service. It is the
right long-term cure, EXCEL recommended it, and it is not authorized today — it crosses two
repos. Also out: chess SFX and CHESS_AUDIO_CACHE, Hub-side 00-utils-config.js audio, any
change to 16-hubframe.js, and TAMAKEE. If the four changes cannot be made without crossing
one of those lines, stop and tell me. "I cannot" is a complete answer. Do not widen the bite
to finish it.

ON COMMITTING. Law XV gives you autonomous commit and push on assigned engineering tasks, and
this is one. But the Commander's standing order on this program is no commits without explicit
order, and I do not have one for this repair. Those two do not obviously agree and I am not
going to resolve it by assuming. Do the work in the working tree, report, and ask before you
push. If he says commit, commit. A disclosed pause costs one exchange; an unwanted push to a
public repo cannot be taken back.

File your deliverable to docs/council/members/ENGINEER/deliverables/.

Say it once. Show the command. Show me the red before you show me the green.

— TWMIP, Seat A, @joint
```
