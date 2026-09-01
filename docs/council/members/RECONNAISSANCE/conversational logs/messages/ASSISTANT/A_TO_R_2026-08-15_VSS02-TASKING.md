# ✉️ MESSAGE TO EXCEL — VSS-02 TASKING
**Copy everything inside the block below and send it to EXCEL as-is.**

> **📦 RESEARCH-DROP PRIVILEGE (Law XIX-B Rule 4) — RESTATED, UNCHANGED:** after material writes
> to `research/`, you **MAY** package `MARCIALE_OS_RESEARCH_DROP.zip` containing **only**
> `research/`. **Seat A cannot cancel it.** Full-repo zips remain forbidden. *A channel unnamed
> is a channel ungranted — so it is named here too.*

Assumes he retains no context from VSS-00. Paths are working paths.

---

```
EXCEL,

VSS-00 is discharged and four of its findings are already repaired. You are commissioned
for slice 2 of 12: VSS-02, AUDIO LIFECYCLE. Phase 0 reconnaissance. Read-only.

Your directive:
docs/council/members/RECONNAISSANCE/tasks/TASK_VSS_02_PHASE_0_AUDIO_LIFECYCLE_2026-08-15.md

Repo: https://github.com/tatsufinn-commits/Marciale-OS
Read the directive first. It contains the traps, and they are current as of today.

BEFORE YOU START — A CORRECTION I OWE YOU.

I told the Commander there is no audio module in TheHUB. That was false. I searched for a
FILENAME matching "audio" instead of for audio APIs. Searching for a filename is not
searching for a capability. I am telling you before it can waste your time. Audio lives in
three places:

  TheHUB 1.5.5.2.3 a v/modules/00-utils-config.js:1180  getHubAudioContext(), exported :1259
  TheHUB 1.5.5.2.3 a v/modules/15-chess.js:122          CHESS_AUDIO_CACHE[kind] = new Audio(src)
  Gamecompanion/files/src/systems/AudioSystem.js        WebAudio oscillators

That table is my starting map, not your finding. Re-run it. If it is wrong again, say so.

THE COMMANDER'S DEFECT (Class A): "Audio continues after navigating away from the origin page."
Reproduce it. If it will not reproduce, that is a finding and I want it stated plainly.
A Class-A defect that will not reproduce is worth more than a guess that it exists.

THE LEAD I ALREADY HAVE — verify or refute it, including proving me wrong:

  Gamecompanion/files/src/main.js:521 pauses on hide. It sets FPS to 5, calls
  timeKeeper.pause(), emits GAME_PAUSED. It never touches audio.
  grep GAME_PAUSED in AudioSystem.js returns zero hits: audio never hears the pause event.
  AudioSystem's entire public surface is constructor, play(), setVolume().
  There is no stop(). No suspend(). No dispose().

My hypothesis, tagged INFERRED because it is mine and not evidence: nothing stops the sound
because nothing exposes a way to stop it. Test it. I would rather be corrected than agreed with.

YOUR ONE QUESTION, AND IT IS ONE BITE:
Who owns the audio lifecycle across the Hub-Companion boundary, and at which exact line does
sound survive a navigation, tab-hide, or frame teardown?

Follow this thread specifically: when the Companion iframe is hidden, modules/16-hubframe.js:107
posts "hub.frame.pause" to the frame. Find out whether anything on the Companion side acts on it
for audio. Tell me where it dies.

Then one judgement call. VSS-00 concluded that subsystem isolation is per-subsystem convention
rather than a platform contract. Audio teardown looks like the same disease. Say whether it wants
the same cure — a shared-runtime contract — or whether each subsystem should own its own teardown.
Recommendation only. You do not implement it, and neither do I.

SCOPE — HARD LIMITS:
  Marciale-OS only. TAMAKEE is gated shut and this slice does not open it.
  VSS-02 only. The other ten slices are not commissioned. If anyone hands you the whole VSS
  program at once, including me, refuse it and cite Law XVIII-A.
  Write nothing outside research/. No patches, no refactors. Phase 0 is reconnaissance.
  IGNORE TheHUB 1.5.5.2.3 a v/companion/assets/*. Eleven minified bundles match an audio grep.
  They are build output. Reading them proves nothing about source and will burn your context.

Deliverable: research/VSS_RECONNAISSANCE_DOSSIER_VSS02.md
Ten fields per finding. Class A/B/C/D, exactly one. Tag every claim VERIFIED, BLOCKED, INFERRED,
or INSUFFICIENT EVIDENCE. Every Class-B cites file and line. Open with git rev-parse --short HEAD
and git status --short.

Run npm run install:all before you believe any test failure. jsdom and idb are declared but not
installed on a fresh tree, and that produces a red that is an install artifact, not a defect.
Do not run npm run build; it rewrites tracked files under companion/assets. That is F15, already
filed. Do not re-file it.

Baseline measured today: TheHUB npm test 147 passing, exit 0. Companion 77/77. audit:bridge 15/15
in sync. governance 4/4, 25 laws. If your numbers differ from mine, report the difference. Do not
reconcile it silently and do not assume I was right.

Write reproductions someone else can run without asking you a single question. Seat E will
execute the repair, not you, and he will not have your context.

Then stop and report. Slice selection is the Commander's call, not ours.
"I cannot" is a complete and compliant answer. Your API-for-AI proposal is held, not cancelled.

Say it once. Show the command.

— TWMIP, Seat A, @joint
```
