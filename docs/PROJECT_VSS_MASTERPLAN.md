# 🗺️ PROJECT VSS — MASTERPLAN & LIVE STATUS BOARD

**Document ID:** `MASTERPLAN-PROJECT-VSS-2026`
**Maintained by:** Seat A (`@assistant` / TWMIP), wearing `@joint`
**Last verified:** 2026-08-16 (Asia/Singapore) · local tree `a6cef19` (**0 commits by Seat A S03**) · remote `main` **`66fa0cc`** — *MAX's audio repair is committed and public*
**Status of the program:** 🟢 **RUNNING — 1 of 12 slices discharged, first repair shipped**

> **What this document is:** the single page that answers *"where are we?"* Every status below
> was re-measured on the day of writing. **Nothing here is remembered; it is all re-run.**

---

# 1. WHAT PROJECT VSS IS, IN ONE PARAGRAPH

The Commander observed **10 concrete defects** across Marciale-OS and TAMAKEE. Rather than
attack them one bug at a time, they were grouped into **12 vertical slices** (`VSS-00 … VSS-11`).
A *vertical* slice cuts top-to-bottom through one capability — UI, logic, state, tests — so each
slice leaves the system **provably better in one dimension** instead of half-improved everywhere.

**The program's founding constraint is not technical. It is survival.** The original plan was
delivered as a single 26,758-character paste — **9.8% of an entire session** — and it destroyed
the seat that received it. **VSS is therefore executed one slice per watch, with a resumable
checkpoint at every boundary.**

---

# 2. WHERE WE ARE RIGHT NOW — THE SHORT ANSWER

| | |
|---|---|
| **Slices discharged** | **2 of 12** — VSS-00 · **VSS-02 (Phase 0)** |
| **Repairs shipped from findings** | **1** — host-side bridge origin gap (F1/F2/F4/F5) |
| **Open findings from VSS-00** | **11 of 15** (4 closed by the patch) |
| **Repository floor** | Marciale-OS only. **TAMAKEE has never been opened.** ✅ |
| **Current blocker** | ⚠️ **DELIVERY MODEL.** Seat A files to an uncommitted tree subordinates cannot read. **3rd occurrence.** Needs the Commander's ruling. |
| **Seat R (Reconnaissance)** | **MANNED** — call sign **EXCEL**, Track A, idle & standing by |
| **Seat E (Engineer)** | **MAX** — not yet tasked this program |
| **Commits** | **ZERO.** All work is working-tree only, by standing order. |

---

# 3. THE BUILD-BY-BUILD LADDER

Each slice runs the same five phases. **A slice is not "done" when the code changes — it is done
when all five Definition-of-Done conditions hold.**

```
  PHASE 0  RECONNAISSANCE   Seat R surveys, evidences, files a dossier. No mutation.
     ↓          ← resumable checkpoint
  PHASE 1  SELECTION        COMMANDER picks the next bite. Not Seat A. Not Seat R.
     ↓          ← resumable checkpoint
  PHASE 2  REPAIR           Seat E (or Seat A) patches. Fault-injected both directions.
     ↓          ← resumable checkpoint
  PHASE 3  VERIFICATION     Counts PARSED FROM EXECUTION, never asserted.
     ↓          ← resumable checkpoint
  PHASE 4  CLOSE            Dispatch + logbook + archive. Slice sealed.
```

**Definition of Done, per slice — all five, non-negotiable:**

| # | Condition | Meaning |
|---|---|---|
| 1 | **CAPABILITY** | the function exists and the Commander can reach it |
| 2 | **CONTRACT** | its boundary and lifecycle are written down |
| 3 | **OBSERVABILITY** | its state is inspectable when it misbehaves |
| 4 | **VERIFICATION** | a test proves it, **counts parsed from real execution** |
| 5 | **RECOVERY** | it can fail without taking the system with it |

---

# 4. THE TWELVE SLICES — LIVE STATUS

**Legend:** ✅ discharged · 🔧 partially repaired · ⬜ not started · 🔒 gated

| Order | Slice | Repo | Status | Notes |
|---|---|---|---|---|
| **1st** | **VSS-00** Shared runtime / cohesion | Marciale-OS | ✅ **DISCHARGED** | 15 findings; 4 repaired. Foundation for all others. |
| 2nd | **VSS-02** Audio lifecycle | Marciale-OS | 🔧 **PHASE 2 REPAIR IN FLIGHT** | EXCEL, 13 findings. Root cause: `TheHUBBridge` has no `case 'hub.frame.pause'` — thread dies in the switch. |
| 3rd | **VSS-01** IdleHero / Aetherwave | Marciale-OS | ⬜ | Background session/lifesign not visibly represented. Depends on VSS-00 contracts. |
| 4th | **VSS-06** Intake context integrity | Marciale-OS | ⬜ | Quick Add contaminates unintended context. Isolated blast radius. |
| 5th | **VSS-03** ChessLab | Marciale-OS | ⬜ | **Largest single-repo slice — 4 observations** (heatmap, Stockfish WASM, Maia ONNX, Vesta ELO). |
| 6th | **VSS-05** RuView | Marciale-OS | ⬜ | Difficult to operate. Depends on VSS-00 observability. |
| **GATE** | — | — | 🔒 **CLOSED** | **Marciale-OS floor must be established before TAMAKEE is opened.** |
| 7th | **VSS-04** TAMAKEE exams | TAMAKEE | 🔒 | Questions repeat across 10Q/50Q/100Q. **Enters only after the gate.** |
| 8th+ | **VSS-07 … VSS-11** | Both | ⬜ | Cross-cutting. **Sequenced on findings, not pre-specified.** |

> **Why the gate exists:** holding two repositories *simultaneously* was a primary contributor to
> the one-way finding that killed a watch. Held **sequentially** it is ordinary work.

---

# 5. VSS-00 IN DETAIL — THE ONLY SLICE WITH RESULTS

## 5.1 The critical question, and its answer

> **"Can one subsystem's failure take down TheHUB?"**

**Answer: it depends on the subsystem, and no uniform rule is enforced.**

| Subsystem | Isolation | Verdict |
|---|---|---|
| Companion | sandboxed iframe | ✅ isolated |
| RuView | sandboxed iframe | ✅ isolated |
| **Chess** | **inline in the Hub DOM**, engine in workers | ⚠️ **a UI throw shares Hub global scope** |
| CADAM | documented but **never mounted** | ⚠️ phantom subsystem |

**Isolation here is per-subsystem convention, not a platform contract.** That is the headline
finding of the entire slice.

## 5.2 Maturity of the shared runtime

| Stage | Verdict |
|---|---|
| CAPABILITY | ✅ satisfied |
| CONTRACT | ⚠️ partial — bridge was asymmetric (child validated origin, host did not) |
| OBSERVABILITY | ⚠️ partial — errors logged not surfaced; no TAP from Hub; green-washing |
| VERIFICATION | ⚠️ partial — origin test covered the child side only |
| RECOVERY | ✅ satisfied — boot reset, migration rollback, iframe reload, worker terminate |

**One sentence:** *the runtime does everything and recovers well, but enforced the same bridge on
one side and not the other.*

## 5.3 What has been REPAIRED (Phase 2 complete)

| ID | Defect | Fix | Proof |
|---|---|---|---|
| **F1** | `postMessage(..., '*')` broadcast Hub state to whatever occupied the frame | `targetOrigin` narrowed to this origin; `'*'` retained only for non-same-origin sandboxes | fault-injected |
| **F2** | Host listener checked `e.source`, never `e.origin` | `static isAllowedOrigin()` mirroring the shipped child allowlist | fault-injected |
| **F4** | `if(frames.length && ...)` — **guard VANISHED when no frame was mounted** | **fails closed**: `if(!frames.length) return;` | fault-injected |
| **F5** | Regression test covered child side only | +12 host-side assertions | 7 red → 26 green |

**Fault-injection result — the only evidence that matters:**

```
ORIGINAL VULNERABLE CODE :  19 passed,  7 FAILED,  exit 1
WITH THE FIX             :  26 passed,  0 failed,  exit 0
```

**The trap avoided:** sandboxed / `file://` frames report origin `'null'`. Allowing only
`window.location.origin` would have **silently broken the offline embed**. The fix mirrors the
child's shipped `[window.location.origin, 'null']` rather than inventing a stricter scheme.

## 5.4 What remains OPEN from VSS-00

| ID | Finding | Severity | Owner |
|---|---|---|---|
| **F3** | `HubFrame` documented for 4 subsystems, instantiated for **1** (Companion, twice); CADAM never mounted | contract | E |
| **F15** | `npm run build` **dirties tracked `companion/assets/`** — Vite `outDir` writes into tracked files | packaging | E |
| — | **Chess inline in Hub DOM** — isolation asymmetry | **design decision, not a patch** | Commander |
| — | `npm run health` exits **0** declaring **SEV-0** while listing **9 warnings** (3 XSS · 3 zombie-listener · 3 storage-quota) | observability / green-washing | A + E |
| — | `npm test` prints `TypeError … '_location'` **twice** and still reports 0 failures | observability | E |
| — | TheHUB emits **no TAP** → `77/77` is Companion-only, never a whole-tree verdict | observability | ruled: no migration |

---

# 6. VERIFICATION SURFACES — AND WHICH ONES LIE

**Standing rule: a tool's banner is not its verdict.**

| Surface | Trust | Note |
|---|---|---|
| `npm test` (TheHUB) | ⚠️ | **exit 0, but NO TAP total — the "147" figure is WITHDRAWN 2026-08-16.** Counting method changes the answer (EXCEL 122 assertions, Seat A 134, 13 suite headers). **Unverifiable until the harness emits a machine-readable total.** |
| `npm test` (Companion) | ✅ | **77/77, 0 fail** |
| `npm run audit:bridge` | ✅ | 15 postMessage signatures in bi-directional sync |
| `npm run pangolin` | ✅ **now** | Prints `77/77 measured from harness output`. **Repaired 2026-08-14** — previously printed a hardcoded "43 suites / 137 assertions" it never parsed. |
| `governance-audit` | ✅ | 4/4, 25 Supreme Laws |
| `scout-voice-check` | ✅ | 12 taskings, 0 violations |
| `npm run health` | ⚠️ **PARTIAL** | Exits 0 / SEV-0 **while listing 9 warnings**. Green verdict does not encode its own warnings. |
| `scout-audit.js` | ❌ **DO NOT TRUST AS SECURITY** | A **licence checker wearing a security banner**. Once read "zero risks" against 4 HIGH CVEs. |
| `npm run merge:gate` | ⚠️ | **Dirties the tree by design.** Recover: `git checkout -- "TheHUB 1.5.5.2.3 a v/companion/"` |

---

# 7. PROGRAM LEDGER — WHAT ELSE WAS CLEARED ALONGSIDE

| Item | Status |
|---|---|
| **R-01** sprite evidence | ✅ CLOSED — 25 filenames promised, **0 PNGs exist** |
| **R-02** registration gap | ✅ CLOSED `[VERIFIED]` both trees — **`spriteAtlas.register()` is never called**; the atlas loads an empty map, so 25 finished PNGs would render as placeholders |
| Sprite naming conflict | ✅ RULED — `id` authoritative; `"sprite"` field is **ADVISORY** |
| **Flag 4** (TheHUB→TAP) | ✅ CLOSED — no migration; reporting rule enforced instead |
| **Flag 5** (puppeteer 4 HIGH) | ✅ CLOSED — unused prod dependency **deleted**; 4 HIGH → **0** |
| Seat R charter | ✅ Rewritten — occupants **cannot self-destruct**; research-only |
| "API for AI" proposal | ⏸️ **HELD** — unparks when VSS closes enough of the floor |

---

# 8. THE STANDING BAR

> **No sprite art may be commissioned until a registration path exists.** 25 perfect PNGs drawn
> against a `load()` that reads an empty frame map is **25 wasted assets**. The blocker is three
> lines of wiring, not artwork.

---

# 9. WHO DOES WHAT

| Seat | Holder | Role in VSS |
|---|---|---|
| **A** — Assistant | **TWMIP** (`@joint`) | Issues taskings, adjudicates dossiers, executes repairs, owns every failure of context/channel/capability |
| **R** — Reconnaissance | **EXCEL** | Phase 0 only: survey, evidence, dossier. **Research-only. Never implements.** |
| **E** — Engineer | **MAX** | Phase 2: production repair under GREENMARK |
| **Commander** | you | **Phase 1 selection. Every slice choice is yours, by law.** |

---

---

# 10. SEAT A'S VERDICT — WHAT TO DO NEXT

**Recommendation: 🔬 ONE MORE RECON PASS BY EXCEL (VSS-02, Audio Lifecycle) — not MAX yet.**

## 10.1 Why not MAX yet

MAX is the Engineer. **Sending him now would violate the program's own phase order:** Phase 1
(Commander selects) → Phase 0 recon on the new slice → *then* Phase 2 repair. **Every slice
except VSS-00 currently has ZERO reconnaissance.** Tasking an engineer against an un-surveyed
slice is how this house produced five delivery failures.

**There is also nothing shovel-ready for him.** The remaining VSS-00 items are:
- **F3** — a *contract* question (should CADAM be mounted, or the claim deleted?). Needs a
  ruling before code.
- **F15** — Vite `outDir` writes into tracked files. Real, but a **packaging** decision.
- **Chess inline in Hub DOM** — **explicitly a design decision, not a patch.**

**None of those are "go fix this."** They are "decide what this should be."

## 10.2 What I verified before recommending

I did not rank these from memory. Measured today:

- **VSS-02 (audio) is genuinely un-surveyed.** ⚠️ **CORRECTION (same day):** I first wrote
  "there is no audio module in TheHUB." **That was wrong** — I grepped for a *filename* matching
  `*audio*` instead of for audio *APIs*. Audio exists in **three** places:
  `TheHUB/modules/00-utils-config.js:1180` (`getHubAudioContext`, **0 lifecycle hooks**),
  `TheHUB/modules/15-chess.js:122` (`new Audio(...)`), and
  `Gamecompanion/.../AudioSystem.js`. The stronger evidence: `main.js:521` pauses the loop and
  clock on hide but **never touches audio**, `AudioSystem` has **no `stop()`/`suspend()`**, and
  `grep GAME_PAUSED AudioSystem.js` → **0 hits**. **Searching for a filename is not searching
  for a capability.**
- **The `health` green-washing is real but SMALLER than it looks.** Of the 9 warnings:
  - **3 "zombie listener"** flags name `companion-mini.js`, `ruview-bridge-injector.js`,
    `ruview-frame.js` — **the three files that are already correctly origin-guarded.** They hold
    page-lifetime singleton listeners and never call `removeEventListener`. **True by the
    scanner's rule; low real risk.**
  - **3 "possible XSS"** are `innerHTML` assignment lines. The surrounding code escapes
    **consistently** with `esc()` / `escAttr()` / `safeColor()`. **These are probably false
    positives** — but *probably* is not *verified*, and **I will not rule on them without
    tracing each input to its source.**

**That last point is itself a finding: the scanner cannot tell a real XSS from an escaped one,
which is why its 9 warnings were ignorable enough to be green-washed in the first place.**

## 10.3 The three real options

| | Option | Cost | Value | My read |
|---|---|---|---|---|
| **A** | **EXCEL → VSS-02 recon** (audio lifecycle) | 1 watch, read-only | Unblocks slice #2 in the ratified order; smallest bounded Class-A defect | ✅ **RECOMMENDED** |
| **B** | **MAX → F15** (build output contract) | 1 watch, production | Stops `npm run build` dirtying tracked assets | Reasonable **second**, but it is a packaging decision you should rule on first |
| **C** | **EXCEL → XSS triage** (trace the 3 sites) | 1 watch, read-only | Converts 3 `[UNVERIFIED]` warnings into fact | Do this **if security ranks above feature order** |

**Do NOT do:** hand anyone all remaining slices, open TAMAKEE (the gate is closed), or commission
sprite art (the standing bar in §8 holds).

## 10.4 The one-line answer

> **Send EXCEL to VSS-02 for reconnaissance. Hold MAX until a slice has a surveyed, ruled,
> shovel-ready defect — which no slice currently has.**

**This is a recommendation, not an action. Phase 1 selection is yours by law.**

---

*Maintained under Law XIV. Updated only from re-measured evidence. Last full verification:
2026-08-16 — TheHUB **no TAP total ("147" withdrawn)** · Companion **81/81** · `@sre` SEV-0 · `@pangolin` 81/81 measured · governance 4/4 · **no commits**.*


---

## 11. VSS-02 PHASE 0 — DISCHARGED (2026-08-16, Seat R / EXCEL)

**Dossier:** `research/VSS_RECONNAISSANCE_DOSSIER_VSS02.md` (22,082 B) — **13 findings.**

**The Commander's defect explained.** *Audio continues after navigating away* because **nobody
owns the audio lifecycle.** Three subsystems each hold their own audio with no shared contract
and **no teardown at all**:

| Trigger | Where sound survives | Mechanism |
|---|---|---|
| **Tab-hide** | `Gamecompanion/files/src/main.js:82` `audioSystem.play('hit')` | Loop keeps ticking `combatEngine.tick(dt)` at 5 FPS while hidden; `onHit` fires audio with no pause gate; AudioContext never suspended |
| **Pause message** | `Gamecompanion/files/src/integration/TheHUBBridge.js:44-63` | Bridge handles `hub.companion.pause` but **not** `hub.frame.pause` — which is what `16-hubframe.js:107` actually posts. **The thread dies in the switch.** |
| **Frame teardown** | `AudioSystem.js` (no `dispose`) | `HubFrame.destroy()` clears the DOM, posts no audio teardown, cannot suspend the iframe's context |

**Root cause `[VERIFIED — independently reconfirmed by Seat A]`: two divergent pause
vocabularies.** `hub.frame.*` (HubFrame) vs `hub.companion.*` (14-companion.js:211). The frame's
pause signal is **dead on arrival**. Confirmed locally: `grep -c "hub.frame" TheHUBBridge.js` → **0**.

**Supporting:** `AudioSystem` public surface is `constructor:6` / `play:33` / `setVolume:113` /
`toggle:117` — **no `stop`, `suspend`, `dispose`, `close`** · `GAME_PAUSED` has **zero listeners**
in `src/` · `main.js:450` `onPause` throttles FPS + pauses `timeKeeper`, **never audio** ·
**F12:** chess's lone `visibilitychange` (`15-chess.js:1806`) guards **engine workers**, not
`CHESS_AUDIO_CACHE` — the same asymmetry in miniature.

**Seat R's judgement (proposal only):** audio is VSS-00's disease in concrete form. Cure = one
shared audio service owning context + lifecycle (`play/suspend/resume/dispose`), with all three
consumers calling in; a single pause hook then suspends everything at once. Per-subsystem
teardown as a *general* principle is the wrong lesson — the platform-level contract is.

**Seat A correction on the record:** my earlier hypothesis ("nothing stops the sound because
nothing exposes a way to stop it") was **directionally right but shallower than the truth**. The
missing method is real; the **contract mismatch** is the root cause. EXCEL found the line I could not.

**⚠️ GOVERNANCE DEFECT FOUND IN PASSING (unresolved, needs Commander's ruling):** **Law XIV-A is
unenforced by any tool.** `check-divisions.sh` does not exist; `grep -ln "conversational logs"
tools/*` → **no matches**. Seat A drifted two correspondence files into a non-canonical bare
`messages/` path and **it was caught by a subordinate, not by a gate.** Corrected this watch;
**the enforcement gap remains open.**


---

## 12. VSS-02 PHASE 2 — REPAIR COMMISSIONED (2026-08-16, Seat E / MAX)

**Directive:** `docs/council/members/ENGINEER/tasks/TASK_VSS_02_PHASE_2_AUDIO_PAUSE_REPAIR_2026-08-16.md`
**Message:** `docs/council/members/ENGINEER/conversational logs/messages/ASSISTANT/A_TO_E_2026-08-16_VSS02-REPAIR-TASKING.md`

**Four changes, one bite:** (1) `TheHUBBridge.js` accepts `hub.frame.pause|resume` **in addition
to** `hub.companion.*` — no renaming · (2) `AudioSystem` gains null-safe `suspend`/`resume`/
`dispose` · (3) `main.js:450-455` `onPause`/`onResume` drive audio · (4) hidden combat gated.

**Explicitly OUT:** F7 audio-service consolidation (right cure, crosses two repos, **not
authorized**) · F12 chess SFX · Hub-side `00-utils-config.js` · `16-hubframe.js` · TAMAKEE ·
`npm run build` (F15).

**⚠️ THE CLOSING CONDITION IS NOT A GREEN SUITE.** EXCEL could not reproduce the defect audibly
(no audio device) and tagged it `[INSUFFICIENT EVIDENCE]`. All house audio is **one-shot**
(`osc.stop(t0+0.12…0.36)`), so the Commander most likely hears **repeated short hit-sounds from
hidden auto-combat**, not a sustained tone. MAX is ordered to report the **mechanism as repaired**
and the **audible re-validation as OUTSTANDING** on a live build. **VSS-02 is not to be marked
resolved on test evidence alone.**

**⚖️ COMMIT-AUTHORITY CONFLICT DISCLOSED, NOT RESOLVED:** Law XV grants Seat E autonomous
commit/push on assigned tasks; the Commander's standing order on this program is **no commits
without explicit order**. **Seat A did not resolve this by assumption** — MAX is directed to work
in the tree, report, and **ask before pushing.** *(Awaiting the Commander's word.)*


---

## 13. ⚠️ SYSTEMIC DEFECT — THE DELIVERY MODEL IS BROKEN (2026-08-16)

**MAX filed `[BLOCKED / INSUFFICIENT INPUT]` on VSS-02 Phase 2. He was right, and the fault is
Seat A's.**

**The pattern, three occurrences, one cause:**

| # | Event | Cause |
|---|---|---|
| 1 | EXCEL executed VSS-02 without ever seeing the directive; worked from the message body's redundancy (his F0) | Directive existed only in Seat A's uncommitted tree |
| 2 | Seat A re-tasked a slice EXCEL had **already discharged** (DISPATCH-104) | Seat A could not see EXCEL's remote deliverables |
| 3 | **MAX blocked** — directive (8,635 B) and message not in his snapshot; `git fetch` disabled | Same |

**Root cause `[VERIFIED]`: Seat A writes correspondence and directives into a working tree that
is never committed, while subordinates hold snapshots or remotes that cannot see it.** Under the
standing order *no commits without explicit order*, **every artifact this office files is
invisible to the seat it is addressed to.** Law XIV-A filing is necessary but **not sufficient** —
correct paths in an unreachable tree deliver nothing.

**Compounding:** Law XIV-A has **no tooling enforcement** (DISPATCH-104 — `check-divisions.sh`
does not exist; `grep -ln "conversational logs" tools/*` → no matches).

**Mitigation applied this watch (not a fix):**
`docs/council/members/ENGINEER/tasks/VSS02_SELF_CONTAINED_PAYLOAD_2026-08-16.md` (11,650 B) —
a **self-contained payload**: the spec plus the **verbatim current source** of every site to be
changed (bridge switch, `_pauseGame`/`_resumeGame`, `onPause`/`onResume`, `_initContext`, the
gesture-unlock block). **Requires no `git fetch` and no other file.** Hand-carried by the
Commander, the transport that demonstrably works.

**⚖️ THE STRUCTURAL FIX REQUIRES THE COMMANDER'S RULING — three options, none self-authorized:**
- **A. Authorize commits** for council correspondence + directives (narrow licence: `docs/` and
  `research/` only). Subordinates then read from `main`. **Recommended.**
- **B. Keep hand-carrying** — every tasking must be self-contained like this payload. Works, but
  scales badly and re-costs the Commander on every exchange.
- **C. Status quo** — continue filing to an invisible tree. **This will block a fourth seat.**

**Until ruled, Seat A will issue every directive in self-contained form (B) and will not assume
a subordinate can read anything Seat A has written.**


## 14. VSS-07 NAMED — UX & ACCESSIBILITY SHELL

The Commander's 17 UX items are chartered at `docs/PROJECT_VSS_07_UX_SHELL_CHARTER.md`, filling the first reserved cross-cutting slot (VSS-07…VSS-11, proposal line 204). **Decomposed into 5 bites**; recommended first is **07-B Mobile shell** (Commander's stated daily surface). **⚠️ TheHUB already has a theme engine** (`00-utils-config.js:691` `applyTheme`) — the darkmode toggle must extend it, not fork it. **Charter only; no implementation authorized.**


---

## 15. ⚠️ STANDING WARNING FOR EVERY FUTURE SEAT A — THE DOSAGE FINDING (2026-08-16)

`research/RESEARCH_GUARDRAILS_RULES_AI_CODING_2026-08-16.md` (Seat R, primary sources, gaps flagged):

> **Rules past a threshold COLLAPSE the model they govern.** (P2 arXiv:2502.12197; Anthropic 2026
> reports removing ~80% of a system prompt.) This house is **"correct in spirit, dangerous in
> dosage."** **Spend governance budget on VERIFICATION, not on more rules.**

**Practical rule for this program:** before drafting any new law, clause or charter, ask whether a
**runnable gate** would serve better. `npm test` · `@sre` · `@pangolin` · `governance-audit` ·
`scout-voice-check` outrank any paragraph. **Law XIV-A has no enforcement and drifted within one
watch; Law XV-A's four stages are runnable commands. That is the difference between a law and a wish.**

**Disposition `[READ — NOT ADJUDICATED]`** — Seat A Session 03 declined to rule on a
"legislate less" finding on the day it enacted Law XV-A. **Open for the Commander and the successor.**
