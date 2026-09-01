# MASTERFIX PLAN V1.0 — Marciale-OS (TheHUB + Companion RPG)
**Baseline System:** Marciale-OS (Original Git Clone Baseline)  
**Target Milestone:** Master Roadmap v8.0 Production Stabilization  
**Author:** Tatsufinn (with Arena Agent Lead Systems Architecture)  
**Status:** Approved Master Technical Blueprint  

---

# I. EXECUTIVE DIAGNOSTIC REPORT & ARCHITECTURAL AUDIT

## 1.1 Executive Summary
Marciale-OS is an offline-first, private personal command center that integrates daily productivity (Kanban, Pomodoro focus blocks, Calendar, encrypted vault), biometric tracking (caffeine and calorie decay curves), an embedded 2D HTML5 Canvas Idle RPG companion, a WebAssembly/ONNX grandmaster chess engine (ChessLab), and a streaming local AI assistant (Marciale).

An empirical diagnostic investigation of the original repository reveals:
1. **Core Logic is Highly Functional:** Both primary test suites—TheHUB’s 12 test suites and Gamecompanion’s 31 unit tests—pass with a **100% success rate** once dependencies are installed.
2. **The Root Bottlenecks are Architectural & Scope-Driven:**
   * **Directory Naming:** Space-separated directory names (`TheHUB 1.5.5.2.3 a v`) hinder command-line automation and cross-platform scripting.
   * **Build Output Disconnect:** The Vite build pipeline in `Gamecompanion/files/` is unlinked from TheHUB's static directory (`TheHUB .../companion/`).
   * **Protocol Signature Mismatch:** `TheHUBBridge.js` dispatches `mtgame.*` event signatures while TheHUB listens for `idlehero.*`.
   * **AI Scope Overload:** Theoretical documents (like `Proposal v3.0.txt` proposing 750B MoE models, multi-agent offices, and external database servers) obscured the fact that the lightweight local-first stack is already 90% complete.

## 1.2 System Health Matrix

| Subsystem | Source Location | Code Health | Test Status | Diagnostic Findings & Primary Bottlenecks |
|---|---|---|---|---|
| **TheHUB Core Shell** | `TheHUB 1.5.5.2.3 a v/` | 🟢 8.8 / 10 | 12 / 12 Passing | 20 Vanilla JS modules. Space in folder name; large files (`08-assistant.js` is 106KB). |
| **Companion RPG** | `Gamecompanion/files/` | 🟢 9.0 / 10 | 31 / 31 Passing | Clean ES Modules; StateManager and CombatEngine verified. Build pipeline was unlinked. |
| **ChessLab AI Core** | `TheHUB .../modules/15*.js` | 🟢 9.2 / 10 | Verified | Stockfish WASM + Maia ONNX + Vesta engine with sub-5ms Positional Safety Heatmap. |
| **Marciale Assistant** | `TheHUB .../modules/08*.js` | 🟡 7.8 / 10 | Passing (Mock) | Streaming LLM + native tool buffering. Needs proactive Ollama offline fallback handling. |
| **Storage & Persistence**| `TheHUB .../modules/00,01` | 🟢 8.9 / 10 | Verified | Hybrid LocalStorage + IndexedDB with versioned schema migrations (v0 → v2). |
| **RuView Spatial Sense**| `TheHUB .../modules/17-19`| 🟢 8.5 / 10 | 12 / 12 Passing | WebSocket proxy & simulated RF sensing; DOM updates throttled to 1 FPS for performance. |

---

# II. WHY THIS MASTER FIX PLAN IS RECOMMENDED

### 1. Grounded Reality Over Speculative Complexity
This plan eliminates the friction of trying to deploy datacenter-grade multi-agent architectures (GLM-5.2 / PocketBase / Claw-Empire) on a personal machine. It focuses on optimizing the fast, zero-cost, local-first stack (Vanilla JS + Python proxy + local Ollama + Canvas 2D).

### 2. Lossless Gamification Loop (`TheHUBBridge`)
Fixes the event handshake so that every completed Pomodoro session and Kanban task reliably awards in-game Gold, Experience, and Level-Ups to your companion hero.

### 3. Unified Developer Tooling
Eliminates fragmented builds by establishing a single root execution harness (`npm start`, `npm test`, `npm run build`).

### 4. Zero Data Loss Guarantee
Hardens browser persistence with pre-migration backups, export safeguards, and quota monitoring.

---

# III. THE MASTER FIX BUILD PHASES

## MILESTONE A: WORKSPACE TOOLING & PIPELINE UNIFICATION

### Build F01 — Workspace Monorepo & Script Orchestration
* **Status:** Complete (Implemented in MasterFix)
* **Goal:** Normalize directory naming and create a single root control file (`package.json`) to run, build, and test the entire project.
* **Changes Delivered:**
  * Root `package.json` created with unified commands: `npm start`, `npm test`, `npm run build`.
  * Created root `.gitignore` to prevent committing `node_modules`, temporary files, and Python bytecode.
* **Verification Criteria:** Running `npm test` from root executes all 43 unit and integration tests across both subprojects.
* **Priority:** P1 (Critical) | **Feasibility:** High (100%)

---

### Build F02 — Companion Vite Auto-Link Pipeline
* **Status:** Complete (Implemented in MasterFix)
* **Goal:** Automatically build the companion game directly into TheHUB's static directory with zero manual copying.
* **Changes Delivered:**
  * Configured `companion/vite.config.js` with `build.outDir: path.resolve(__dirname, '../TheHUB 1.5.5.2.3 a v/companion')`.
  * Placed `IDLE_HERO_SOURCE.md` in `companion/public/` to maintain smoke test invariants on clean builds.
* **Verification Criteria:** Running `npm run build` compiles the companion and updates `index.html` and bundled assets in TheHUB.
* **Priority:** P1 (Critical) | **Feasibility:** High (100%)

---

### Build F03 — Documentation & Knowledge Architecture
* **Status:** Complete (Implemented in MasterFix)
* **Goal:** Decouple software engineering deliverables from creative lore bibles and speculative proposals.
* **Changes Delivered:**
  * Created `docs/hub/` for roadmaps, architectural reports, and version guides.
  * Created `docs/game-companion/` for story arcs, NPC bibles, and quest databases.
  * Created root `README.md` as the unified project manual.
* **Verification Criteria:** Root folder contains clean, readable documentation.
* **Priority:** P2 (High) | **Feasibility:** High (100%)

---

### Build F04 — Orphan Script Quarantine
* **Status:** Complete (Implemented in MasterFix)
* **Goal:** Archive temporary debug scripts (`debug_*.js`, `fix_test_*.js`) away from the active source root.
* **Changes Delivered:**
  * Moved scratch test files into `TheHUB .../tests/archive/`.
* **Verification Criteria:** TheHUB directory is clean and free of leftover debug files.
* **Priority:** P3 (Medium) | **Feasibility:** High (100%)

---

## MILESTONE B: THEHUB CORE STABILIZATION & PERSISTENCE

### Build F05 — Storage Guard & Schema Migration Defense
* **Status:** Implementing
* **Goal:** Protect local user tasks, notes, biometric history, and encrypted vault items from data corruption.
* **Target Files:**
  * `TheHUB 1.5.5.2.3 a v/modules/00-storage.js`
  * `TheHUB 1.5.5.2.3 a v/modules/01-migrations.js`
* **Implementation Steps:**
  1. Add a pre-migration backup hook in `01-migrations.js` that writes `hub.backup.pre_migration` to localStorage before executing schema transforms.
  2. Implement an automatic storage quota estimation check (`navigator.storage.estimate()`) in `00-storage.js`.
  3. Provide a one-click raw JSON backup export in the Sidebar Danger Zone.
* **Proposed Solution:** A defensive wrapper around `LS.set()` that catches `QuotaExceededError` and seamlessly offloads large payloads into IndexedDB.
* **Verification Criteria:** `node tests/unit-storage.js` passes 100%; mock quota exhaustion triggers zero uncaught exceptions.
* **Priority:** P1 (Critical) | **Feasibility:** High (95%)

---

### Build F06 — Ollama AI Resilient Router & Standby Fallback
* **Status:** Implementing
* **Goal:** Prevent chat UI hangs and provide clear user feedback when the local Ollama daemon is offline.
* **Target Files:**
  * `TheHUB 1.5.5.2.3 a v/modules/08-assistant.js`
  * `TheHUB 1.5.5.2.3 a v/server.py`
* **Implementation Steps:**
  1. Add a 2-second timeout health ping to `/api/tags` on `127.0.0.1:11434`.
  2. If the ping fails, render an interactive "Ollama Offline" guidance card with one-click terminal commands (`ollama run qwen2.5:7b`).
  3. Ensure `mergeStreamToolCalls()` handles interrupted streaming chunks without throwing JSON parse errors.
* **Proposed Solution:** Proactive heartbeat check before initiating fetch, coupled with safe JSON buffering.
* **Verification Criteria:** Chat gracefully displays standby card when Ollama is stopped, and resumes streaming immediately when Ollama starts.
* **Priority:** P1 (Critical) | **Feasibility:** High (90%)

---

### Build F07 — Biometric & Calendar Event Engine Audit
* **Status:** Implementing
* **Goal:** Guarantee exact caffeine decay curve math and multi-line RFC-5545 `.ics` calendar parsing.
* **Target Files:**
  * `TheHUB 1.5.5.2.3 a v/modules/04-tracker.js`
  * `TheHUB 1.5.5.2.3 a v/modules/05-calendar.js`
  * `TheHUB 1.5.5.2.3 a v/server.py`
* **Implementation Steps:**
  1. Verify caffeine elimination half-life calculation: $\text{caffeine}(t) = C_0 \cdot 0.5^{t / 5.7}$.
  2. Test folded continuation line unfolding (`_unfold_ics_lines`) in `server.py` against complex institutional calendar feeds.
* **Proposed Solution:** Standardized date-math helper with timezone normalization.
* **Verification Criteria:** `node tests/unit-tracker.js` and `node tests/unit-calendar.js` pass with 0 errors.
* **Priority:** P2 (High) | **Feasibility:** High (100%)

---

### Build F08 — ChessLab Worker Memory Lifecycle
* **Status:** Implementing
* **Goal:** Guarantee that Stockfish WASM WebWorkers and Maia ONNX neural inference release memory when navigating away from ChessLab.
* **Target Files:**
  * `TheHUB 1.5.5.2.3 a v/modules/15-chess.js`
  * `TheHUB 1.5.5.2.3 a v/modules/15b-chess-engine-worker.js`
* **Implementation Steps:**
  1. Bind tab deactivate event in `15-chess.js` to send `stop` and terminate idle worker threads.
  2. Cache square attack evaluations to maintain sub-5ms redraws on the Positional Safety Heatmap.
* **Proposed Solution:** Lifecycle-aware worker pool manager.
* **Verification Criteria:** `node tests/unit-chess.js` passes; memory profile shows 0 worker leaks.
* **Priority:** P2 (High) | **Feasibility:** High (95%)

---

## MILESTONE C: COMPANION RPG POLISH & BRIDGE SYNC

### Build F09 — Sprite Atlas Procedural Fallbacks
* **Status:** Implementing
* **Goal:** Render clean procedural pixel-art characters if external PNG sprites are not yet loaded.
* **Target Files:**
  * `Gamecompanion/files/src/rendering/SpriteAtlas.js`
  * `Gamecompanion/files/src/rendering/CanvasRenderer.js`
* **Implementation Steps:**
  1. Implement procedural vector drawing fallbacks in `SpriteAtlas.js` for Hero, Slime, Goblin, and Dragon.
  2. Support automatic hot-loading from `public/sprites/{name}.png` when present, with zero console warnings.
* **Proposed Solution:** Dual-mode texture provider: Image $\rightarrow$ Procedural Vector Canvas.
* **Verification Criteria:** Opening companion tab renders animated colored heroes and monsters on canvas immediately.
* **Priority:** P2 (High) | **Feasibility:** High (100%)

---

### Build F10 — TheHUBBridge Bidirectional Handshake Protocol
* **Status:** Implementing
* **Goal:** Fix the postMessage handshake so TheHUB acknowledges rewards and the companion receives productivity XP.
* **Target Files:**
  * `TheHUB 1.5.5.2.3 a v/modules/14-companion.js`
  * `Gamecompanion/files/src/integration/TheHUBBridge.js`
  * `Gamecompanion/files/src/main.js`
* **Implementation Steps:**
  1. Update `TheHUBBridge.js` to dispatch both `idlehero.ready` and `mtgame.ready` on initialization.
  2. Instantiate and connect `TheHUBBridge` inside `main.js:boot()`.
  3. Wire incoming `hub.activity` events directly into `ProgressionSystem.grantXp()` and `EconomyManager.grantGold()`.
* **Proposed Solution:** Dual-protocol adapter matching existing TheHUB event listeners.
* **Verification Criteria:** Completing a task in Kanban triggers floating XP and gold particles in the game canvas.
* **Priority:** P1 (Critical) | **Feasibility:** High (100%)

---

### Build F11 — Combat Pacing & Item Affix Balancing
* **Status:** Implementing
* **Goal:** Balance physical armor curves, magic resistance affinities, and stage chest loot tables.
* **Target Files:**
  * `Gamecompanion/files/src/combat/DamageCalculator.js`
  * `Gamecompanion/files/src/systems/LootEngine.js`
  * `Gamecompanion/files/src/data/affixes.json`
* **Implementation Steps:**
  1. Verify armor mitigation formula: $\text{mitigation} = \frac{\text{armor}}{\text{armor} + 100}$ (capped at 75%).
  2. Ensure stage clear triggers chest drops and unlocks stage selection.
* **Proposed Solution:** Stat engine calibration pass.
* **Verification Criteria:** `npm --prefix Gamecompanion/files test` passes 31 / 31 tests.
* **Priority:** P2 (High) | **Feasibility:** High (100%)

---

### Build F12 — Power & Frame-Rate Throttling
* **Status:** Implementing
* **Goal:** Reduce CPU and GPU power draw when TheHUB is running in a background browser tab.
* **Target Files:**
  * `Gamecompanion/files/src/core/GameLoop.js`
  * `TheHUB 1.5.5.2.3 a v/modules/18-ruview-bridge.js`
* **Implementation Steps:**
  1. Listen for `visibilitychange` in `GameLoop.js` and drop Canvas rendering from 60 FPS to 5 FPS.
  2. Pause particle updates when tab is hidden, maintaining accurate math progression.
* **Proposed Solution:** Dynamic frame-rate governor.
* **Verification Criteria:** Background tab CPU utilization drops to $<1\%$.
* **Priority:** P3 (Medium) | **Feasibility:** High (100%)

---

## MILESTONE D: JARVIS AUTONOMY & PRODUCTION INTEGRATION

### Build F13 — Marciale Prompt Token Budgeting & Date Anchor
* **Status:** Implementing
* **Goal:** Eliminate AI timeline hallucinations and keep context windows compact and fast.
* **Target Files:**
  * `TheHUB 1.5.5.2.3 a v/modules/08-assistant.js`
* **Implementation Steps:**
  1. Inject an immutable system date anchor (`TODAY: YYYY-MM-DD (Day of Week)`) into the system prompt.
  2. Implement context window pruning (system prompt + current Hub summary + last 6 chat turns).
* **Proposed Solution:** Dynamic rolling context buffer.
* **Verification Criteria:** Marciale calculates exact deadline intervals with zero date hallucinations.
* **Priority:** P2 (High) | **Feasibility:** High (95%)

---

### Build F14 — Native Function Tool Calling Expansion
* **Status:** Implementing
* **Goal:** Allow Marciale to safely perform real productivity actions upon user confirmation.
* **Target Files:**
  * `TheHUB 1.5.5.2.3 a v/modules/08-assistant.js`
  * `TheHUB 1.5.5.2.3 a v/modules/11-tasks.js`
* **Implementation Steps:**
  1. Define strict JSON parameter schemas for:
     * `add_task(title, priority, column)`
     * `log_drink(drink, quantity)`
     * `add_calendar_event(title, date, type)`
     * `start_focus_timer(minutes)`
  2. Render a visual confirmation card in the chat UI requiring user click before executing actions.
* **Proposed Solution:** Human-in-the-loop tool execution pipeline.
* **Verification Criteria:** Asking Marciale to *"Add a task for exam prep"* creates a card on the Kanban board upon approval.
* **Priority:** P2 (High) | **Feasibility:** High (90%)

---

### Build F15 — Spatial Presence & RuView Telemetry Gating
* **Status:** Implementing
* **Goal:** Ensure Three.js WebGL and WebSocket sensing streams run only when the RuView tab is active.
* **Target Files:**
  * `TheHUB 1.5.5.2.3 a v/modules/17-presence.js`
  * `TheHUB 1.5.5.2.3 a v/modules/18-ruview-bridge.js`
  * `TheHUB 1.5.5.2.3 a v/modules/ruview/ruview-frame.js`
* **Implementation Steps:**
  1. Lazy-mount RuView iframe only when user navigates to the RuView tab.
  2. Dismount iframe to `about:blank` on tab switch to release WebGL GPU memory.
* **Proposed Solution:** Tab-lifecycle-gated iframe container.
* **Verification Criteria:** `node tests/unit-ruview.js` passes; 0 GPU memory leaks detected.
* **Priority:** P3 (Medium) | **Feasibility:** High (95%)

---

### Build F16 — End-to-End Regression Harness
* **Status:** Implementing
* **Goal:** Provide a single automated pre-commit test runner validating all subprojects.
* **Target Files:**
  * Root `package.json`
* **Implementation Steps:**
  1. Connect root `npm test` to run both TheHUB tests and Gamecompanion tests in sequence.
* **Proposed Solution:** Unified test orchestration script.
* **Verification Criteria:** `npm test` finishes with all 43 tests passing in $<30\text{ seconds}$.
* **Priority:** P1 (Critical) | **Feasibility:** High (100%)

---

# IV. AI AGENT EXECUTION PROTOCOL (HOW TO USE THIS PLAN)

This section is designed specifically for **AI Coding Agents** working on Marciale-OS on behalf of the user. Because the user is a beginner, the AI agent must operate autonomously, diagnose issues thoroughly, follow strict safety constraints, and verify all changes.

---

### 4.1 Autonomous Agent Directives

```text
================================================================================
AI AGENT DIRECTIVE: MARCIALE-OS CODEBASE EXECUTION
================================================================================
ROLE: Lead Systems Architect, Senior Full-Stack Engineer & QA Specialist.

OBJECTIVE:
You are assigned to diagnose, plan, implement, and verify a specific build from
docs/MASTERFIX_PLAN_V1.0.md or docs/Refinedplan.md.

RULES OF ENGAGEMENT:
1. AUTONOMOUS CONTEXT DISCOVERY:
   - Read docs/AI_CONTEXT.md and docs/REPAIR_DOSSIER.md before touching any code.
   - Inspect target files and their direct dependencies.
   - Never assume missing functionality without checking existing implementations.

2. PRESERVATION OF WORKING CODE (NON-DESTRUCTIVE MANDATE):
   - The test suite is your safety harness. Never break existing test invariants.
   - Do NOT rewrite or refactor unrelated modules.
   - Preserve Vanilla JS, ES module, and local-first architecture (no unnecessary npm libraries).

3. DEFENSIVE IMPLEMENTATION:
   - Handle null/undefined values safely.
   - Buffer streaming chunks and wrap asynchronous operations in try/catch blocks.
   - Support graceful fallbacks if local services (Ollama, RuView) are offline.

4. MANDATORY EMPIRICAL VERIFICATION:
   - Always run `npm test` after completing your implementation.
   - If tests fail, diagnose and fix the root cause before declaring completion.
================================================================================
```

---

### 4.2 Standard Prompt Template for the User to Give to Future AI Agents

Whenever you ask an AI coding assistant to work on your project, copy and paste this prompt:

```text
Hello! I am the owner of Marciale-OS (TheHUB + Companion RPG). I am a beginner programmer, so please handle all technical planning, diagnosis, and implementation autonomously.

YOUR MISSION:
Please execute Build [INSERT BUILD NUMBER, e.g. F05] ([INSERT BUILD NAME, e.g. Storage Guard]) from docs/MASTERFIX_PLAN_V1.0.md.

CONTEXT & RESOURCES:
- Read docs/AI_CONTEXT.md to understand the architecture, data flows, and constraints.
- Read docs/REPAIR_DOSSIER.md for technical audit notes and bug reports.
- Read docs/MASTERFIX_PLAN_V1.0.md for the specific implementation steps.

REQUIREMENTS:
1. Autonomously inspect the target files and their dependencies.
2. Implement the changes following the exact implementation steps in the plan.
3. Keep the code local-first, lightweight, and offline-capable.
4. Run `npm test` to verify that all unit and smoke tests pass with 100% green checkmarks.
5. Explain your changes in both technical terms (for records) and plain beginner terms (for me).
```

---

# V. SUMMARY & NEXT ACTIONS

| Phase | Milestone Name | Status | Key Deliverable |
|---|---|---|---|
| **Phase 1** | Workspace Monorepo & Pipeline (Builds F01–F04) | ✅ **Delivered** | Root `package.json`, Vite auto-link, docs structure. |
| **Phase 2** | TheHUB Core & Storage Guard (Builds F05–F08) | 🟡 **Ready to Execute** | Data backup safeguards, Ollama offline card, ChessLab GC. |
| **Phase 3** | Companion RPG Bridge & Visuals (Builds F09–F12) | ⚪ **Queued** | Handshake fix, procedural sprite fallback, power throttles. |
| **Phase 4** | Autonomous Tools & Refined Plan V8 (Builds F13–F16) | ⚪ **Queued** | Native AI tool calling, token budgeting, final regression suite. |
