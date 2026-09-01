# 🔍 DIAGNOSTIC & AUTOMATED TESTING GUIDE — Marciale-OS
## Operational Document 1: Automated Verification, Proactive Health Checks & System Scanning
**Target System:** Marciale-OS (TheHUB + Companion RPG)  
**Operational Philosophy:** Scan ➔ Run ➔ Test ➔ Detect ➔ Report  
**Core Question:** *"Does it work right now?"*  
**Audience:** QA Agents, Autonomous Testers, and AI Lead Engineers  

---

# 1. THE AUTOMATED TESTING ARCHITECTURE

Marciale-OS relies on a two-tier automated testing pyramid with **43 unit, integration, and end-to-end smoke tests**:

```text
               ┌─────────────────────────────────────────┐
               │         FULL REPO REGRESSION TEST       │
               │               `npm test`                │
               └────────────────────┬────────────────────┘
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼                                                     ▼
┌─────────────────────────────────┐           ┌─────────────────────────────────┐
│ TIER 1: TheHUB Dashboard Suite  │           │ TIER 2: Companion RPG Suite     │
│ (12 Automated Test Suites)      │           │ (31 Automated Node Unit Tests)  │
├─────────────────────────────────┤           ├─────────────────────────────────┤
│ • Smoke & Sanitation Tests      │           │ • AI & Combat Engine Tests      │
│ • Storage & IndexedDB Fallback  │           │ • Damage Calculator & Affinities│
│ • Calendar RFC-5545 & Recurrence│           │ • Boss Phase Transitions        │
│ • Caffeine Elimination Math     │           │ • Loot, Inventory & Crafting    │
│ • Chess Engine & WebWorkers     │           │ • SaveManager (IndexedDB)       │
│ • Spatial Presence & Automation │           │ • WaveManager & Stage Portal    │
│ • RuView Proxy & WebSocket Relay│           │ • Stat Engine & Roster System   │
│ • Headless JSDOM App Smoke Test │           │                                 │
└─────────────────────────────────┘           └─────────────────────────────────┘
```

---

# 2. RUNNING THE AUTOMATED TEST SUITES

### 2.1 Full Pre-Commit Run (All 43 Tests)
Run from the root directory before committing or finishing any build:
```bash
npm test
```
* **Success Criteria:** Outputs `✅ App smoke checks passed` and `# pass 31` with `exit code 0`.
* **Failure Indicator:** Any unhandled rejection, assertion error, or non-zero exit code.

### 2.2 Targeted Subsystem Test Commands

| Subsystem | Target Test Command | What It Proves |
|---|---|---|
| **Storage & Migrations** | `node "TheHUB 1.5.5.2.3 a v/tests/unit-storage.js"` | LocalStorage & IndexedDB read/write/fallback work. |
| **Calendar Engine** | `node "TheHUB 1.5.5.2.3 a v/tests/unit-calendar.js"` | `.ics` line unfolding, timezone UTC offsets, recurrence. |
| **Biometrics / Caffeine** | `node "TheHUB 1.5.5.2.3 a v/tests/unit-tracker.js"` | Pharmacokinetic half-life decay curves and bedtime warnings. |
| **ChessLab AI Core** | `node "TheHUB 1.5.5.2.3 a v/tests/unit-chess.js"` | FEN parser, legal move generator, Stockfish WASM. |
| **Presence & RuView** | `node "TheHUB 1.5.5.2.3 a v/tests/unit-ruview.js"` | WebSocket proxying, signal field throttling, health endpoint. |
| **Full Browser Lifecycle** | `node "TheHUB 1.5.5.2.3 a v/tests/app-smoke.js"` | Headless DOM boot, tool buffering, modal creation. |
| **Companion RPG Core** | `npm --prefix "Gamecompanion/files" test` | 31 unit tests covering all RPG combat and state rules. |

---

# 3. PROACTIVE SYSTEM-BY-SYSTEM HEALTH SCAN PROCEDURES

When a specific system behaves erratically or is updated, execute these targeted diagnostic protocols:

---

## ♟️ 3.1 ChessLab Diagnostic Protocol (Common Pain Point)
* **Objective:** Ensure Stockfish WASM, Maia ONNX inference, and DOM heatmaps function without thread deadlocks.
* **Scan Steps:**
  1. **Worker Instantiation Check:** Verify WebWorker file paths in `15-chess.js`:
     * `modules/15b-chess-engine-worker.js` must be reachable.
     * `modules/stockfish.wasm` must be loaded with mime-type `application/wasm`.
  2. **Attack Heatmap Benchmark:** Ensure `renderSquareAttackHeatmap()` computes all 64 squares in $<5\text{ms}$.
  3. **Pawn Promotion Intercept:** Verify that moving a pawn to the 8th/1st rank pauses board execution and triggers `#pawnPromotionModal` rather than auto-promoting.
  4. **Worker Cleanup on Tab Blur:** Verify that navigating away from ChessLab tab dispatches `engineWorker.postMessage({ type: 'stop' })`.

---

## 📡 3.2 RuView & Spatial Presence Diagnostic Protocol (Common Pain Point)
* **Objective:** Ensure WebSocket relays and simulated RF telemetry do not cause UI thrashing or memory leaks.
* **Scan Steps:**
  1. **Proxy Route Health Probe:** Execute:
     ```bash
     curl -s http://127.0.0.1:8000/ruview-proxy/health
     ```
     * Must return `{ "ok": true, "status": "online" }` if daemon lives, or `{ "ok": false, "status": "offline" }` with zero 500 server crashes.
  2. **Simulation Mode Fallback:** In `18-ruview-bridge.js`, verify that when `RUVIEW_HOST` is unreachable, `SIMULATION_MODE = true` triggers synthetic 2D Gaussian splat generation.
  3. **Throttling Verification:** Ensure WebSocket incoming frames trigger DOM updates at **max 1 FPS** (`1000ms` interval) and localStorage persistence at **max 5000ms**.

---

## 🎮 3.3 Companion RPG Engine Diagnostic Protocol
* **Objective:** Guarantee that the HTML5 Canvas loop, StateManager, and postMessage bridge stay synchronized.
* **Scan Steps:**
  1. **postMessage Handshake Verification:**
     * Open browser console $\rightarrow$ Complete a task in Kanban $\rightarrow$ Verify that `[MT-TBH] Received hub.activity` appears in game console.
     * Verify that the game sends back `idlehero.ack` and floating particle `+50 XP` spawns on canvas.
  2. **Frame Rate Throttling:** Switch to another browser tab $\rightarrow$ Verify that `gameLoop.setTargetFPS(5)` drops Canvas render loop to 5 FPS.
  3. **SaveManager IndexedDB Integrity:** Verify `SaveManager.save('manual')` creates a valid record in IndexedDB `mushoku-tensei-saves` with schema version `3`.

---

## 🤖 3.4 Local AI (Marciale & Ollama) Diagnostic Protocol
* **Objective:** Verify streaming text parsing, tool call buffering, and offline fallback cards.
* **Scan Steps:**
  1. **Daemon Connectivity Ping:** Execute:
     ```bash
     curl -s http://127.0.0.1:11434/api/tags
     ```
     * If connection refused, verify that Marciale Chat renders the interactive "Ollama Offline" guidance card.
  2. **Streaming Tool Reassembly:** In `08-assistant.js`, verify that split JSON tool call packets (e.g. `{"title":` followed by `"Task"}`) are buffered safely by `mergeStreamToolCalls()` without JSON parse syntax errors.

---

# 4. DIAGNOSTIC REPORT TEMPLATE

When an automated scan or test detects a failure, the testing agent must file a report in this exact format:

```text
================================================================================
DIAGNOSTIC TEST REPORT
================================================================================
DATE/TIME: [YYYY-MM-DD HH:MM]
SUBSYSTEM: [ChessLab | RuView | Companion | Ollama | Storage | Calendar]
TEST SUITE: [e.g. tests/unit-chess.js]
STATUS: [FAIL | DEGRADED | PASS]

OBSERVED FAILURE / ERROR:
[Paste exact terminal error, stack trace, or console log]

REPRODUCTION STEPS:
1. [Step 1]
2. [Step 2]

IMPACT / BLAST RADIUS:
- Primary affected feature: [e.g. Stockfish WASM fails to calculate best move]
- Secondary unaffected systems: [e.g. Tasks, Notes, Calendar continue functioning]

ROUTING:
- Forward to: CODE_ANALYSIS_AND_ISSUE_DETECTION.md (For root cause investigation)
- Severity Level: [SEV-1 | SEV-2 | SEV-3 | SEV-4]
================================================================================
```
