# 🔍 PLAN-vs-REALITY CODEBASE AUDIT — 2026-08-09
## Inspection-Only Report (Zero Code Changes)
**Agent in Charge:** `@architect` (Lead Systems Engineer) with `@sentinel` assist for test verification
**Mode:** Audit / Inspection Mode — no code was modified, per project-director instruction
**Governing Protocol:** `docs/STRATEGIC_DECISION_FRAMEWORK.md` §1 (Reality-Grounding Protocols), Law I (Non-Destructive), Law V (Green Test Contract)

---

# 1. EXECUTIVE SUMMARY

The system **runs and all 43 tests pass**. But the **documentation is ahead of the code in some places and behind it in others**:

- **2 builds documented as "Complete" are NOT actually in the live code** (F02 Auto-Link, F04 Script Quarantine) — plus parts of F01 (`.gitignore`) and F03 (`PATCH V1.0.zip`, docs structure).
- **2 builds documented as "Implementing / not done" are ALREADY in the live code** (F13 Date Anchor + Rolling Context, F14 Native Tool Calling) — plus F11's core math and part of F15.
- **6 builds are genuinely not started** (F05, F06, F08, F09, F10, F12) — matching the plan's "Implementing" status.
- **The 8 scratch `debug_*`/`fix_test_*` files were never archived** — Build F04's claim is factually wrong.
- **Cross-doc drift:** The AI Constitution is cited as "6 Laws", "7 Laws", and "8 Laws" in different documents; the cited `docs/PROMPT_PLAYBOOK.md` does not exist.
- **Evidence of root cause:** the git history is a series of wholesale "Add files via upload" commits, so the code snapshot is not guaranteed to match the docs that were uploaded alongside it.

---

# 2. TEST VERIFICATION (`npm test`) — 43/43 GREEN ✅

Run from repo root on 2026-08-09 (Node v20.20.2, Python 3.13.14, after `npm install` in both subprojects):

```
> npm test
> npm --prefix "TheHUB 1.5.5.2.3 a v" test && npm --prefix "Gamecompanion/files" test
```

| Suite | Result |
|---|---|
| TheHUB smoke (12 suites total) | ✅ all green |
| TheHUB unit/calendar/tracker/chess/presence/ruview/automation/proxy/app-smoke | ✅ all green |
| Gamecompanion `node --test` | ✅ 31 / 31 passed, 0 failed |
| **Total** | **43 / 43 — exit code 0** ✅ |

> Convention note: the project counts "43 tests" as **12 TheHUB test suites + 31 Gamecompanion unit tests**. The root harness in `package.json` (Build F01/F16) works exactly as documented.

---

# 3. BUILD-BY-BUILD VERDICT TABLE (F01 – F16)

Legend: ✅ = documented status matches code · 🟡 = partial · 🔴 = documented ≠ code (phantom or undocumented)

| Build | Documented status | Live-code reality | Verdict |
|---|---|---|---|
| **F01** Monorepo & scripts | Complete | Root `package.json` with `npm test/start/build/dev` exists ✅ — but plan also claims a root `.gitignore`; **none exists anywhere** | 🟡 Partial |
| **F02** Vite auto-link pipeline | Complete | `Gamecompanion/files/vite.config.js` has `outDir: 'dist'`, **not** `TheHUB .../companion`. `IDLE_HERO_SOURCE.md` is in `TheHUB .../companion/` (test reads it there), not in `public/` as the logbook says | 🔴 **PHANTOM — claimed complete, not in code** |
| **F03** Documentation suite | Complete | The 6 docs listed in the logbook **do exist** ✅ — but the plan's F03 (`docs/hub/`, `docs/game-companion/`, root `README.md`) does **not**; and the logbook's `PATCH V1.0.zip` **does not exist** at root | 🟡 Partial (docs exist; zip & structure don't) |
| **F04** Orphan script quarantine | Complete | `tests/archive/` **does not exist**; 8 scratch files still at TheHUB root: `debug_agent.js`, `debug_final.js`, `debug_models.js`, `debug_rag.js`, `debug_tasks.js`, `fix_test_agent.js`, `fix_test_agent2.js`, `fix_test_final.js` | 🔴 **PHANTOM — claimed complete, not in code** |
| **F05** Storage guard & quota | Implementing | No `navigator.storage.estimate`, no `QuotaExceededError` wrapper in `00-storage.js`, no pre-migration backup in `01-migrations.js` | 🔴 Not started (matches "Implementing" only in name) |
| **F06** Ollama resilient router | Implementing | No `/api/tags` heartbeat, no "Ollama Offline" standby card in `08-assistant.js` | 🔴 Not started |
| **F07** Biometric & calendar audit | Implementing | `unit-tracker.js` (7) and `unit-calendar.js` (14) all pass; caffeine half-life and ICS folding verified green | ✅ Effectively complete & verified |
| **F08** Chess worker lifecycle | Implementing | `terminateChessEngineWorker()` / `terminateMaiaEngineWorker()` exist (15-chess.js:1791, 2042) but are only used on reload — **no tab-deactivate/visibility binding** | 🔴 Not started (the required trigger is missing) |
| **F09** Procedural sprite fallback | Implementing | `SpriteAtlas.js` has placeholder **colors only**; no procedural canvas drawing; `CanvasRenderer.js` has no procedural path | 🔴 Not started |
| **F10** Bridge handshake | Implementing | `TheHUBBridge.js` exists but is **never imported anywhere** (dead code); still sends `mtgame.*` while `14-companion.js` listens for `idlehero.*` (lines 150–159) — the exact mismatch the plan §1.1 describes **persists** | 🔴 Not started |
| **F11** Combat & item tuning | Implementing | `DamageCalculator.js:30` has the `Math.min(0.75, …)` armor cap and line 33 caps resistance at 75; LootEngine/chest test passes | 🟡 Core done & tested; loot-balance pass unverifiable |
| **F12** Power & frame-rate throttle | Implementing | `GameLoop.js` has `setTargetFPS()` but **no `visibilitychange`** handler → no 5 FPS background throttle | 🔴 Not started |
| **F13** Token budget & date anchor | Implementing | System prompt contains `Today's date is ${todayStr()}.` + DATE SAFETY rules (08-assistant.js:749, ~797); rolling context = last 12 messages (line 1615); chat storage pruned to 40/200 (lines 196–208) | 🟡 **Undocumented completion — largely DONE in code** |
| **F14** Native tool calling | Implementing | Full JSON tool schemas (`add_task`, `log_drink`, `add_event`, `show_tab`, `write_note`, …) + `actionNeedsApproval()` (line 810) human-in-the-loop confirmation | 🟡 **Undocumented completion — largely DONE in code** |
| **F15** Telemetry gating | Implementing | `ruview-frame.js` has `pauseOnHidden: true`, `SUSPEND_SRC='about:blank'` (line 22), visibility handler (line 181) — but `lazy: false` (line 250) | 🟡 Partial (suspend yes, lazy-mount no) |
| **F16** End-to-end CI harness | Implementing | Root `npm test` runs all 43 in ~27s — this is exactly F16's deliverable | ✅ **Done & verified** (also credited to F01) |

---

# 4. THE 8 SCRATCH FILES STILL AT THEHUB ROOT (F04 failure)

```
TheHUB 1.5.5.2.3 a v/
  debug_agent.js      debug_final.js       debug_models.js     debug_rag.js
  debug_tasks.js      fix_test_agent.js    fix_test_agent2.js  fix_test_final.js
```
- `index.html` module list (lines 1029–1051) does **not** load any of them → they are harmless orphan files, but the F04 logbook claim ("Moved scratch test files into `TheHUB .../tests/archive/`") is **factually false** today.
- They were never archived; they are not in any `tests/archive/` folder (that folder does not exist).

---

# 5. CROSS-DOCUMENT INCONSISTENCIES

1. **How many Laws?** Three different counts exist:
   - `docs/AI_RULES.md` = **8** Supreme Laws (authoritative file) — and `docs/AI_CONTEXT.md` agrees ("The 8 Supreme Laws").
   - `docs/BUILD_LOGBOOK.md` F03 entry says "AI_RULES.md (6 Laws)".
   - `docs/AGENTS.md` §4 template says "the 6 Laws".
   - Your session prompt said "the 7 Laws".
   → **Recommendation:** standardize on **8** everywhere.
2. **`docs/PROMPT_PLAYBOOK.md` is referenced but missing.** `AI_RULES.md` (Prompt Playbook Reference) and `AI_CONTEXT.md` (which claims a "13-Document Operational System") both cite it. `docs/` contains only **12 files** — no `PROMPT_PLAYBOOK.md`.
3. **`PATCH V1.0.zip`** is cited in `BUILD_LOGBOOK.md` F03 as the release package — no zip file exists at the repo root.
4. **F03's contents differ between plan and logbook:** `MASTERFIX_PLAN_V1.0.md` F03 = `docs/hub/`, `docs/game-companion/`, root `README.md`; `BUILD_LOGBOOK.md` F03 = the 6 operational docs (which do exist). The plan and the logbook describe different F03s.

---

# 6. OPERATIONAL HAZARDS FOUND (no fixes applied — audit only)

1. **No `.gitignore` anywhere** (root, TheHUB, Gamecompanion). Proof: after `npm install`, `git status` shows `node_modules/` as untracked. Next `git add .` would commit thousands of dependency files.
2. **The gamification loop is currently dead end-to-end.** `TheHUBBridge.js` is never imported by `main.js` (verified: grep across `src/` finds only the file itself), and it still emits `mtgame.*` while TheHUB listens for `idlehero.*`. So "every completed task → hero XP/gold" (documented in `AI_CONTEXT.md`) does **not** actually fire today.
3. **`npm run build` writes to the wrong place.** With `outDir: 'dist'`, a fresh build lands in `Gamecompanion/files/dist` and never updates `TheHUB .../companion/` — the embedded game would silently keep its old bundle. (F02's auto-link config was reverted at some point.)
4. **Chess workers are not released on tab switch** (F08 trigger missing) — a slow memory leak in long sessions.
5. **No offline fallback card for the AI assistant** (F06 missing) — if Ollama is off, the user gets no guided recovery UI.

---

# 7. ROOT-CAUSE OBSERVATION (evidence, not speculation)

`git log` on `main` shows a long chain of **"Add files via upload"** commits (and occasional "Delete docs directory" commits) with no per-feature history. This pattern — whole snapshots uploaded repeatedly — is the most plausible reason the docs claim F01–F04 complete while the code shows F02/F04 reverted: the docs in the latest upload describe work done in a previous session, but the code snapshot that was uploaded with them is older than that work (e.g. `vite.config.js` still on `dist`, debug files present, no archive folder, no `.gitignore`).

---

# 8. BEGINNER SUMMARY (Law VI — Explain Like I'm Five)

Think of your project like a house with a "to-do board" (the plans) and the actual rooms (the code).

- **The house is fine and the lights work:** I ran the whole check-up — **all 43 tests pass**. ✔
- **But the to-do board is lying in two spots:** it says the "auto-build pipe" (F02) and the "trash-tidy-up" (F04) were finished. When I looked at the rooms, the pipe was unhooked (`vite` still saves builds to a side folder, not into TheHUB) and the old debug papers are still lying on the floor (8 `debug_`/`fix_test_` files at the root, no archive folder).
- **And two things the board says are "future work" are actually already built:** the AI already knows today's date and only remembers the last few chats (F13), and it already has "confirm before acting" tool buttons (F14). Nobody updated the board.
- **One important note for you:** there's no `.gitignore` in the project, so if you press "commit" right now, Git would try to save thousands of library files. I did **not** change any code — this was just a look-around, exactly as you asked.

---

# 9. RECOMMENDED NEXT SESSION (for future agents)

Per `docs/MASTERFIX_PLAN_V1.0.md` build order, but with a reconciliation step first:

1. **Reconcile F02 + F04** (re-apply auto-link `outDir` and quarantine the 8 scratch files into `tests/archive/`) — these are documented "Complete" but missing from code.
2. Then execute **F05 — Storage Guard & Schema Migration Defense** (P1) in a fresh session under Law IV (One-Bite Rule).
3. Add the missing root `.gitignore` (part of F01's original scope) before any future commits.

*No code changes were made in this audit session; no patch zip was produced because Law VIII (versioned patch packaging) applies to Active Build Execution, not inspection-only audits.*
