# REFINED PLAN — Integrated Master Roadmap V8.0 (TheHUB + Companion RPG)
## Seamless Integration of Master Roadmap V7 & MasterFix Plan V1.0
**Target Architecture:** Marciale-OS v2.0 → v8.0 Production Release  
**Author:** Tatsufinn (with Arena Agent Lead Systems Architecture)  
**Status:** Unified Strategic Roadmap  

---

# I. THE UNIFIED ARCHITECTURAL VISION

The **Refined Plan** merges all completed historical builds (Builds 0 through 33.9 from Roadmap V7) with the architectural stability fixes from **MasterFix Plan V1.0 (Builds F01 through F16)**, establishing the foundation for **Master Roadmap V8: The Autonomous Hybrid Command Center**.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MARCIALE-OS EVOLUTIONARY TRAJECTORY                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
 ┌───────────────────────────────────────────────────────────────────────────┐
 │ HISTORICAL FOUNDATION (Builds 0 – 33.9) [COMPLETE]                        │
 │ • Foundational Productivity (Tasks, Calendar, Vault, Biometrics)          │
 │ • Gamification & Idle Hero Embed (Iframe, XP Bridge)                      │
 │ • Hybrid ChessLab (Stockfish WASM + Maia AI + Vesta Engine)               │
 │ • RuView Spatial Sensing & Presence Automation                            │
 └─────────────────────────────────────┬─────────────────────────────────────┘
                                       │
                                       ▼
 ┌───────────────────────────────────────────────────────────────────────────┐
 │ MASTERFIX STABILIZATION (Builds F01 – F16) [ACTIVE / IN-PROGRESS]         │
 │ • Milestone A (F01–F04): Workspace Monorepo & Pipeline Auto-Linking       │
 │ • Milestone B (F05–F08): Storage Defense, Ollama Standby, Chess Memory    │
 │ • Milestone C (F09–F12): Companion Bridge Handshake, Procedural Sprites   │
 │ • Milestone D (F13–F16): Token Budgeting, Native Tool Schema, CI Suite    │
 └─────────────────────────────────────┬─────────────────────────────────────┘
                                       │
                                       ▼
 ┌───────────────────────────────────────────────────────────────────────────┐
 │ MASTER ROADMAP V8: THE AUTONOMOUS HYBRID OS [100% COMPLETED IN PRODUCTION]│
 │ • Milestone V8.1: Zero-Configuration Local AI Engine (Model Routing) [DONE]│
 │ • Milestone V8.2: Circadian & Biometric Focus Orchestration [DONE]        │
 │ • Milestone V8.3: Full Bi-Directional Companion Progression [DONE]        │
 │ • Milestone V8.4: Spatial Privacy & Hardware Sensing [DONE]               │
 │ • Milestone V8.5: ChessLab 2.0 (Coach Personality & Blunder Analysis)[DONE]│
 └───────────────────────────────────────────────────────────────────────────┘
```

> **CURRENT STATUS:** Master Roadmap V8 is **100% COMPLETED & VERIFIED in production**. See `docs/BUILD_LOGBOOK.md` (Builds V8.1 through V8.5) and `docs/SYSTEM_STATE.md`.
> **NEXT ROADMAP:** Master Roadmap V9.0 (Builds 41 through 48) is ratified in `research/proposals/MASTER_PROPOSAL_PLAN_V9.md`.

---

# II. COMPLETE HISTORICAL & STABILIZATION LOG (BUILDS 0 — F16)

### Historical Baseline (Builds 0 – 33.9)
* **Builds 0 – 23 (Productivity Core):** Python server, LocalStorage/IndexedDB cache, Pomodoro timer, caffeine decay mathematics, encrypted vault, calendar `.ics` parser.
* **Builds 24 – 26.8.6 (Companion Embed):** Idle RPG iframe embed, postMessage bridge, Mini vs Full view visibility matrix, model switching presets.
* **Builds 27 – 30.11.4 (Hybrid Chess AI):** Stockfish 16 WebAssembly integration, Maia ONNX neural prediction, surgical DOM redraws, Positional Safety Heatmap overlay.
* **Builds 31 – 33.9 (Spatial Sensing):** Local WebSocket bridge for presence detection, automated vault locking on user away, throttled state writes.

### MasterFix Stability Enhancements (Builds F01 – F16)
* **Build F01 (Monorepo Normalization):** Unified root `package.json` with single-command start, build, and test scripts.
* **Build F02 (Companion Auto-Link):** Vite `outDir` targeting TheHUB's static companion directory.
* **Build F03 (Documentation Knowledge Architecture):** Decoupled lore bibles from code repositories.
* **Build F04 (Script Quarantine):** Archived temporary debug scripts into `tests/archive/`.
* **Build F05 (Storage Quota Guard):** Automatic pre-migration backup snapshots in `01-migrations.js`.
* **Build F06 (Ollama Resilient Router):** Proactive `/api/tags` health check and offline guidance card.
* **Build F07 (Biometric & Calendar Pass):** Validated caffeine half-life formulas and multi-line ICS unfolding.
* **Build F08 (ChessLab Worker Lifecycle):** Memory cleanup on tab change and sub-5ms attack map caching.
* **Build F09 (Procedural Sprite Atlas):** Canvas 2D fallback rendering for characters and monsters.
* **Build F10 (TheHUBBridge Handshake):** Fixed `mtgame.*` vs `idlehero.*` signature mismatch.
* **Build F11 (Combat & Item Tuning):** Hard-capped 75% physical mitigation and balanced loot tables.
* **Build F12 (Power & Frame-Rate Governor):** Throttled hidden background tabs to 5 FPS.
* **Build F13 (Prompt Token Budgeting):** Injected system date anchor and rolling 6-turn context window.
* **Build F14 (Native Tool Calling):** Human-in-the-loop confirmation cards for task/calendar creation.
* **Build F15 (Spatial Telemetry Gating):** Lazy-mounted WebGL iframes to preserve GPU resources.
* **Build F16 (End-to-End CI Harness):** Single `npm test` pre-commit verification.

---

# III. MASTER ROADMAP V8: THE AUTONOMOUS HYBRID OS

With the foundation stabilized by MasterFix V1.0, Marciale-OS advances to **Version 8.0**.

---

## MILESTONE V8.1 — ZERO-CONFIGURATION LOCAL AI ENGINE

### Build 34.0 — Local Model Auto-Discovery & Quant Router
* **Goal:** Automatically scan local Ollama installations, detect installed models, and select the optimal quant based on available system RAM.
* **Implementation:**
  * Probe `GET /api/tags` and `GET /api/ps` to detect VRAM/RAM capacity.
  * Route simple quick queries to lightweight models (e.g. `llama3.2:3b`) and deep strategic planning queries to reasoning models (e.g. `qwen2.5:7b` or `deepseek-r1:8b`).
* **Target Files:** `TheHUB .../modules/08-assistant.js`, `TheHUB .../server.py`.

### Build 34.1 — Multi-Turn Streaming Tool Execution
* **Goal:** Allow Marciale to execute sequential tools in a single conversational turn (e.g. *"Log 2 coffees, then schedule a 25-minute study block"*).
* **Implementation:**
  * Implement an asynchronous tool queue that executes approved actions sequentially and feeds execution results back into the context window for final conversational confirmation.
* **Target Files:** `TheHUB .../modules/08-assistant.js`.

---

## MILESTONE V8.2 — CIRCADIAN & BIOMETRIC FOCUS ORCHESTRATION

### Build 35.0 — Dynamic Focus Session Recommendations
* **Goal:** Intelligently suggest optimal Pomodoro work blocks based on current caffeine concentration and historical daily productivity peaks.
* **Implementation:**
  * Calculate active caffeine level from `04-tracker.js`.
  * If caffeine is in the peak stimulation zone ($>100\text{mg}$), recommend a **50-minute Deep Focus Block**.
  * If caffeine is decaying below bedtime thresholds, recommend **Light Administrative Tasks**.
* **Target Files:** `TheHUB .../modules/12-today.js`, `TheHUB .../modules/04-tracker.js`.

### Build 35.1 — Sleep & Caffeine Evening Warnings
* **Goal:** Provide subtle, non-intrusive notifications when consuming caffeine too close to target bedtime.
* **Implementation:**
  * Compute projected bedtime caffeine concentration: $\text{bedtime\_level} = \text{current} \cdot 0.5^{(\text{hours\_to\_bed} / 5.7)}$.
  * If projected concentration exceeds $25\text{mg}$, trigger an alert on the Today Dashboard.
* **Target Files:** `TheHUB .../modules/04-tracker.js`, `TheHUB .../modules/12-today.js`.

---

## MILESTONE V8.3 — FULL BI-DIRECTIONAL COMPANION PROGRESSION

### Build 36.0 — Companion Roster & Equipment Visual Sync
* **Goal:** Synchronize hero equipment and party roster changes directly between the embedded Canvas game and TheHUB sidebar.
* **Implementation:**
  * Emit `companion.snapshot` from the game engine whenever gear is equipped or new characters are unlocked.
  * Render a miniature equipment status badge in TheHUB navigation bar.
* **Target Files:** `Gamecompanion/files/src/main.js`, `TheHUB .../modules/14-companion.js`.

### Build 36.1 — Offline Progression & Milestone Loot Drops
* **Goal:** Calculate offline experience and gold progression up to an 8-hour cap and present a welcome-back modal on login.
* **Implementation:**
  * `SaveManager.js` records `lastTimestamp`.
  * On reload, `calculateOfflineProgress(elapsedMs)` calculates accumulated monster kills and awards bonus loot chests.
* **Target Files:** `Gamecompanion/files/src/core/SaveManager.js`.

---

## MILESTONE V8.4 — SPATIAL PRESENCE & HARDWARE INTEGRATION

### Build 37.0 — Presence Security Lockdown & Auto-Vault
* **Goal:** Automatically lock the AES-GCM encrypted vault when the user walks away from their desk for $>3\text{ minutes}$.
* **Implementation:**
  * `17-presence.js` detects idle state or RuView away signal.
  * Fired automation dispatches `Hub.vault.lock()`, purging encryption keys from active browser memory.
* **Target Files:** `TheHUB .../modules/19-presence-automation.js`, `TheHUB .../modules/07-vault.js`.

---

## MILESTONE V8.5 — CHESSLAB 2.0 TACTICAL COACHING

### Build 38.0 — Marciale Real-Time Tactical Coach Overlay
* **Goal:** Provide instant, grandmaster-quality tactical hints without giving away full moves.
* **Implementation:**
  * Send current board FEN to Stockfish WASM.
  * Identify tactical threats (forks, pins, hanging pieces).
  * Render a visual speech bubble from Marciale explaining the tactical idea in plain English.
* **Target Files:** `TheHUB .../modules/15-chess.js`.

---

# IV. SUMMARY OF RECOMMENDED INTEGRATION

The **Refined Plan** bridges the gap between past achievements and future evolution. By applying the **MasterFix V1.0 (Builds F01–F16)**, the codebase becomes stable, well-tested, and ready for **Roadmap V8.0**.

| Milestone | Scope | Primary Objective |
|---|---|---|
| **MasterFix (F01–F16)** | Architecture & Stability | Monorepo unification, build auto-linking, data persistence, and protocol fixes. |
| **V8.1 – V8.2** | AI & Biometrics | Model routing, multi-turn tools, circadian focus scheduling. |
| **V8.3 – V8.5** | Companion & ChessLab 2.0 | Bi-directional gear sync, offline loot, auto-lock vault, tactical AI coaching. |
