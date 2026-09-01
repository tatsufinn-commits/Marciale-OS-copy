# 🚨 INCIDENT RESPONSE & SRE PLAYBOOK — Marciale-OS
## Operational Document 3: Incident Coordination, Rapid Triage & Reliability Engineering
**Target System:** Marciale-OS (TheHUB + Companion RPG)  
**Operational Philosophy:** Detect ➔ Classify ➔ Prioritize ➔ Investigate ➔ Root-Cause ➔ Plan ➔ Implement ➔ Test ➔ Verify ➔ Document ➔ Prevent  
**Core Purpose:** Fast, structured, non-destructive resolution of serious bugs and system failures  
**Audience:** Incident Commanders, AI Repair Agents, and SRE Specialists  

---

# 1. INCIDENT SEVERITY CLASSIFICATION (SEV MATRIX)

When a failure is detected by the Diagnostic Guide or reported by the user, immediately classify its severity:

| Severity Level | Definition | Examples | Max Response Strategy |
|---|---|---|---|
| 🔴 **SEV-1 (CRITICAL)** | Total system outage, data loss risk, or blank screen crash. | Server fails to start; `hub-data.json` corrupt; `npm test` completely fails. | **Immediate Halt:** Roll back to last working commit or apply emergency hotfix. |
| 🟠 **SEV-2 (MAJOR)** | Core subsystem degraded; primary user workflow broken. | Companion RPG not gaining XP; ChessLab Stockfish worker deadlocks; Marciale chat hangs. | **Surgical Repair:** Quarantine affected subsystem; implement isolated bugfix. |
| 🟡 **SEV-3 (MINOR)** | Feature works with non-fatal glitches or console warnings. | Particle effect misaligned; missing audio file; minor CSS scrollbar overflow. | **Scheduled Fix:** Batch into the next regular milestone build. |
| ⚪ **SEV-4 (COSMETIC)**| Minor visual imperfection or documentation typo. | Text wrap in modal; icon spacing; comment typo. | **Low Priority:** Fix during routine polish passes. |

---

# 2. THE 10-STEP RAPID INCIDENT WORKFLOW

```text
 ┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
 │ 1. DETECT   │ ──► │ 2. CLASSIFY  │ ──► │ 3. PRIORITIZE│ ──► │ 4. INVESTIGATE
 └─────────────┘     └──────────────┘     └──────────────┘     └──────┬───────┘
                                                                      │
 ┌─────────────┐     ┌──────────────┐     ┌──────────────┐            │
 │ 8. VERIFY   │ ◄── │ 7. TEST      │ ◄── │ 6. IMPLEMENT │ ◄──────────┴───────┐
 └──────┬──────┘     └──────────────┘     └──────────────┘                    │
        │                                                              5. PLAN FIX
        ▼
 ┌─────────────┐     ┌──────────────┐
 │ 9. DOCUMENT │ ──► │ 10. PREVENT  │
 └─────────────┘     └──────────────┘
```

---

### Step 1: Detect
Capture the raw failure from `npm test`, terminal output, browser console (`F12`), or user report.

### Step 2: Classify
Assign severity level (**SEV-1** through **SEV-4**) and identify the primary affected subsystem.

### Step 3: Prioritize & Assign Agent Role
Assign the appropriate specialized AI persona:
* **Storage/Security Incident:** `Core Storage Engineer`
* **Canvas/Combat Incident:** `Game Systems Engineer`
* **Ollama/Streaming Incident:** `AI Backend Specialist`
* **Chess/WebWorker Incident:** `Multithreading Specialist`

### Step 4: Investigate (Zero-Modification Phase)
* Read `docs/AI_CONTEXT.md` and `docs/CODEBASE_DEEP_DIVE_STUDY.md`.
* Locate exact file paths, line numbers, and event listeners.
* Identify what other systems depend on this code (Blast Radius).

### Step 5: Plan Fix
* Formulate a surgical, minimal-diff repair plan.
* Identify what must **NOT** be changed.

### Step 6: Implement (Surgical Code Modification)
* Apply changes to targeted files only.
* Strictly uphold the 6 Laws of the AI Constitution (`docs/AI_RULES.md`).

### Step 7: Automated Testing
* Run `npm test` across both TheHUB and Companion test suites.
* Ensure all 43 tests pass with 0 errors.

### Step 8: Empirical Verification
* Test the user workflow manually in the browser (click button, move chess piece, complete task).

### Step 9: Document (Post-Incident Review)
* Fill out the Post-Incident Review (PIR) template below.

### Step 10: Prevent Recurrence
* If the bug was subtle, write a new regression test in `tests/` to guarantee it never happens again.

---

# 3. EMERGENCY CONTAINMENT PLAYBOOKS

---

### 🚨 PLAYBOOK A: TheHUB Blank Screen / Script Boot Crash (SEV-1)
* **Trigger:** Opening `http://localhost:8000` shows a blank page or white screen.
* **Immediate Triage:**
  1. Open browser console (`F12` $\rightarrow$ Console). Find the red error (e.g. `Uncaught ReferenceError` in `08-assistant.js:140`).
  2. Check script import order in `index.html`. Ensure `00-storage.js` and `00-utils-config.js` load before downstream modules.
  3. Verify `hub.version.v1` in `localStorage`. If corrupt, call `LS.get()` fallback or clear test keys:
     ```javascript
     localStorage.removeItem('hub.version.v1');
     ```
  4. Run `node tests/app-smoke.js` to verify JSDOM DOM tree boots cleanly.

---

### 🚨 PLAYBOOK B: Companion RPG Freeze / postMessage Deadlock (SEV-2)
* **Trigger:** Hero stops attacking, canvas is frozen, or task completion does not award XP.
* **Immediate Triage:**
  1. Check iframe cross-origin status in `14-companion.js`.
  2. Verify that `TheHUBBridge.js` dispatches `idlehero.ready` upon boot.
  3. Check `COMPANION_FRAME_QUEUE` in `14-companion.js`: if queue length $>20$, flush queue manually.
  4. Run `npm --prefix "Gamecompanion/files" test` to confirm CombatEngine and StateManager rules are intact.

---

### 🚨 PLAYBOOK C: Ollama AI Chat Hang / Infinite Spinner (SEV-2)
* **Trigger:** Sending a chat message in Marciale tab shows a permanent loading spinner with no text stream.
* **Immediate Triage:**
  1. Check if Ollama is running locally:
     ```bash
     curl -s http://127.0.0.1:11434/api/tags
     ```
  2. If connection is refused: Launch Ollama (`ollama run qwen2.5:7b`).
  3. If Ollama is running but response hangs: Check `readOllamaChatStream()` in `08-assistant.js` for unhandled `ReadableStream` error traps.

---

### 🚨 PLAYBOOK D: Autonomous Git Push Regression & Rapid Rollback (SEV-1 / SEV-2)
* **Trigger:** An autonomous Git push by `@engineer` introduces an unexpected breaking change or test regression in production.
* **Immediate Triage:**
  1. **Immediate Execution Freeze:** Run `npm run pangolin` to capture exact failing test suites and error traces.
  2. **Automated Hotfix Staging:** If the issue cannot be resolved in a single surgical diff, `@sre` triggers `tools/sre-auto-sentinel.js` to package `[BUILD_NAME] - HOTFIX PROPOSAL.zip` in the root workspace.
  3. **Rollback Execution:**
     * To revert a bad Git commit:
       ```bash
       git revert HEAD --no-edit
       npm test
       ```
     * To restore pre-migration storage data:
       ```javascript
       localStorage.setItem('hub.data', localStorage.getItem('hub.backup.pre_migration'));
       ```
  4. **Post-Rollback Verification:** Run `npm test` and `npm run audit:governance` to ensure the repository has returned to the Last Known Good State (LKGS).

---

# 4. POST-INCIDENT REVIEW (PIR) TEMPLATE

When an incident is resolved, file this record in `docs/` for historical tracking:

```text
================================================================================
POST-INCIDENT REVIEW (PIR)
================================================================================
INCIDENT ID: [INC-YYYYMMDD-01]
DATE RESOLVED: [YYYY-MM-DD]
SEVERITY: [SEV-1 | SEV-2 | SEV-3 | SEV-4]
SUBSYSTEM: [Storage | Companion | ChessLab | Ollama | Server | Calendar]
LEAD RESOLVER: [AI Engineer Persona / Agent]

1. SUMMARY OF INCIDENT:
[One-paragraph explanation of what went wrong]

2. ROOT CAUSE:
[Detailed technical description of the underlying bug]

3. BLAST RADIUS & IMPACT:
- Affected features: [e.g. In-game gold rewards]
- User impact: [e.g. Gold counter did not update for 2 focus sessions]

4. SURGICAL REPAIR APPLIED:
- Target files modified: [e.g. Gamecompanion/files/src/integration/TheHUBBridge.js]
- Exact change: [e.g. Added dual-emit for idlehero.ready event]

5. VERIFICATION & PROOF:
- Test output: [Paste `npm test` 43/43 passing verification]
- Manual verification: [Confirmed XP particle animation in browser]

6. PREVENTIVE MEASURES:
- New regression test added: [e.g. Added test in tests/unit-hub.js]
- Documentation updated: [Updated CODEBASE_DEEP_DIVE_STUDY.md]
================================================================================
```
