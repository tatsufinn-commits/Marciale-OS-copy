# 🔬 MARCIALE-OS: COMPREHENSIVE CODEBASE STUDY & TECHNICAL DEEP DIVE
## The Definitive Reference Manual for AI Coding Agents & Systems Engineers
**Target System:** Marciale-OS (TheHUB v1.5.5 + Companion RPG v0.3.0)  
**Standard:** Exhaustive Source-Code Anatomy & Runtime Reference  
**Status:** Canonical Engineering Reference Document  

---

# TABLE OF CONTENTS
1. [System Architectural Topology](#1-system-architectural-topology)
2. [TheHUB Core Engine: Module-by-Module Source Anatomy](#2-thehub-core-engine-module-by-module-source-anatomy)
3. [Companion RPG Engine: Source Anatomy & State Schema](#3-companion-rpg-engine-source-anatomy--state-schema)
4. [Inter-Process Protocols & Event Bus Specifications](#4-inter-process-protocols--event-bus-specifications)
5. [Local AI (Marciale) Tool Calling & Streaming Pipeline](#5-local-ai-marciale-tool-calling--streaming-pipeline)
6. [ChessLab Hybrid WASM/ONNX Multithreading Subsystem](#6-chesslab-hybrid-wasmonnx-multithreading-subsystem)
7. [Security, CORS & Server Proxy Architecture (`server.py`)](#7-security-cors--server-proxy-architecture-serverpy)
8. [Automated QA Test Invariants & Safety Verification](#8-automated-qa-test-invariants--safety-verification)

---

# 1. SYSTEM ARCHITECTURAL TOPOLOGY

Marciale-OS operates as a **tri-layer local-first architecture**:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │ LAYER 1: PYTHON HOST & PROXY SERVER (server.py)                            │
 │ • SimpleHTTP + ThreadingHTTPServer on 127.0.0.1:8000                        │
 │ • Serves static assets, proxies ICS calendar feeds, handles RuView WS relay │
 └─────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
 ┌────────────────────────────────────────────────────────────────────────────┐
 │ LAYER 2: THEHUB WEB COMMAND SHELL (index.html + modules/00 - 19)           │
 │ • Synchronous DOM + Global State (window.Hub, window.TASKS, window.EVENTS) │
 │ • Storage Layer: Hybrid LocalStorage (sync config) + IndexedDB (large data)│
 └─────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                   ┌───────────────────┴───────────────────┐
                   ▼                                       ▼
 ┌───────────────────────────────────┐   ┌────────────────────────────────────┐
 │ LAYER 3A: COMPANION RPG IFRAME    │   │ LAYER 3B: LOCAL OLLAMA DAEMON      │
 │ • HTML5 Canvas 2D + GameLoop      │   │ • REST API on 127.0.0.1:11434      │
 │ • StateManager + SaveManager (IDB)│   │ • Streaming token generator        │
 │ • Communication: postMessage      │   │ • Native JSON tool executor        │
 └───────────────────────────────────┘   └────────────────────────────────────┘
```

---

# 2. THEHUB CORE ENGINE: MODULE-BY-MODULE SOURCE ANATOMY

The dashboard is structured into 20 sequentially loaded Vanilla JavaScript modules in `TheHUB .../modules/`.

```text
index.html Script Loading Order:
00-storage.js ➔ 00-utils-config.js ➔ 01-migrations.js ➔ 02-portal.js ➔ 03-bookmarks.js ➔
04-tracker.js ➔ 05-calendar.js ➔ 06-notebook.js ➔ 07-vault.js ➔ 08-assistant.js ➔
10-command-palette.js ➔ 11-tasks.js ➔ 12-today.js ➔ 13-experimental.js ➔ 14-companion.js ➔
15a-chess-lib.js ➔ 15-chess.js ➔ 16-hubframe.js ➔ 17-presence.js ➔ 18-ruview-bridge.js ➔
19-presence-automation.js ➔ ruview/ruview-frame.js ➔ 09-main.js
```

---

### Module 00: `00-storage.js` (Storage Engine & IndexedDB Bridge)
* **Responsibility:** Provides the global `LS` (LocalStorage) and `HubStorage` (IndexedDB) wrappers.
* **Key Global Objects:** `window.LS`, `window.HubStorage`.
* **Functions:**
  * `LS.get(key, fallback)`: Safely parses JSON with fallback; traps corrupt strings.
  * `LS.set(key, value)`: Serializes JSON with quota exhaustion protection.
  * `HubStorage.getItem(key)` / `HubStorage.setItem(key, value)`: Asynchronous Promise-based IndexedDB adapter for large items (`hub.ai.chats.v1`, `hub.notes.v1`, `hub.archive.v1`).
* **Critical Invariant:** Synchronous dashboard initialization reads `LS`; heavy background data loads via `HubStorage`.

---

### Module 00B: `00-utils-config.js` (Utilities, Security & Brain Profiles)
* **Responsibility:** Sanitization, escaping, ID generation, date math, and AI Brain profile presets.
* **Key Functions:**
  * `escapeHtml(str)` / `sanitizeHtml(str)`: XSS defense against untrusted AI outputs.
  * `uid(prefix)`: Generates timestamped random alphanumeric IDs.
  * `todayStr()`: Returns local `YYYY-MM-DD` string strictly formatted to local system time.
  * `BRAIN_PROFILES`: Preset system prompts: `balanced`, `assistant`, `professional`, `instructor`, `marciale`.

---

### Module 01: `01-migrations.js` (Schema Migration Engine)
* **Responsibility:** Runs on startup to upgrade user data across versions without loss.
* **Key Functions:**
  * `runMigrations()`: Checks `hub.version.v1`. Migrates schema from version 0 $\rightarrow$ 1 (Kanban array normalization) $\rightarrow$ 2 (Biometric limits).
* **Storage Key:** `hub.version.v1` (Current integer version: `2`).

---

### Module 04: `04-tracker.js` (Biometric & Pharmacokinetic Engine)
* **Responsibility:** Caffeine elimination decay math, macronutrient tracking, and Mifflin-St Jeor metabolic math.
* **Key Algorithms:**
  * **Caffeine Elimination Curve:**
    $$\text{caffeine}(t) = \sum C_i \cdot 0.5^{(t - t_i) / 5.7}$$
  * **Bedtime Caffeine Safety:** Calculates active mg projected at target bedtime; warns if $>25\text{mg}$.
* **Storage Keys:** `hub.tracker.v1`, `hub.tracker.history.v1`.

---

### Module 05: `05-calendar.js` (RFC-5545 Calendar & Recurrence Engine)
* **Responsibility:** Visual calendar grid, deadline countdowns, and `.ics` feed parser.
* **Key Functions:**
  * `parseIcsEvents(icsText)`: Parses `VEVENT`, handles folded lines, converts UTC timestamps to local browser timezone, processes `RRULE` (DAILY, WEEKLY, MONTHLY), and extracts `VALARM` triggers.
* **Storage Key:** `hub.events.v1`.

---

### Module 07: `07-vault.js` (AES-GCM-256 Encrypted Note Vault)
* **Responsibility:** Client-side zero-knowledge encryption for sensitive user secrets.
* **Cryptographic Spec:**
  * Algorithm: `AES-GCM` with 256-bit keys.
  * Key Derivation: `PBKDF2` (SHA-256, 100,000 iterations) from user master password.
  * IV: Cryptographically secure 12-byte random IV (`crypto.getRandomValues`) per record.
  * **Zero-Knowledge Guarantee:** Master password is never saved in LocalStorage, IndexedDB, or server logs.

---

### Module 08: `08-assistant.js` (Streaming Local LLM & Native Tool Engine)
* **Responsibility:** Manages Ollama communication, streaming text output, prompt budgeting, and native JSON tool call buffering.
* **Key Functions:**
  * `readOllamaChatStream(response, onChunk, onTool)`: Consumes `ReadableStream` line-by-line, parses partial JSON chunks.
  * `mergeStreamToolCalls(buffer, chunkToolCalls)`: Reassembles fragmented tool call chunks across streaming packets.
  * `strictToolActionsFromCalls(toolCalls)`: Validates arguments against schemas and renders interactive user approval cards.
* **Supported Native Tools:**
  * `add_task(title, priority, column)`
  * `log_drink(drink, quantity)`
  * `add_calendar_event(title, date, type)`
  * `start_focus_timer(minutes)`

---

### Module 11: `11-tasks.js` (Kanban Task Board & Pomodoro Focus Engine)
* **Responsibility:** Drag-and-drop task columns (`todo`, `in_progress`, `done`), Pomodoro "LOCK IN" timer, and productivity XP generation.
* **Key Functions:**
  * `startFocusSession(minutes, linkedTaskId)`: Launches Pomodoro timer; broadcasts heartbeat.
  * `completeFocusSession()`: Logs activity event; triggers reward burst to Companion RPG.
* **Storage Keys:** `hub.tasks.v1`, `hub.focus.v1`.

---

### Module 14: `14-companion.js` (Hub-to-Companion Event Bridge)
* **Responsibility:** Manages the iframe container lifecycle for Idle Hero and mini-companion card; dispatches reward events via `postMessage`.
* **Key Functions:**
  * `emitCompanionEvent(activityEvent)`: Wraps real Hub activity (task done, focus completed) into structured reward payloads.
  * `postCompanionMessage(message)`: Dispatches `{ from: 'TheHUB', type: 'hub.activity', payload: ... }` to `iframe.contentWindow`.
  * `handleCompanionFrameMessage(event)`: Listens for `idlehero.ready`, `idlehero.ack`, and `mtgame.*` acknowledgements.

---

### Module 15: `15-chess.js` & Workers (ChessLab AI Engine)
* **Responsibility:** Grandmaster chess analysis, board UI, Stockfish WASM, Maia ONNX inference, and Positional Safety Heatmap.
* **Files Involved:**
  * `15-chess.js`: Surgical DOM board renderer, piece drag handler, move history.
  * `15a-chess-lib.js`: Real rules validator (`chess.js` engine).
  * `15b-chess-engine-worker.js`: WebWorker isolating Stockfish WASM UCI loop.
  * `15c-maia-worker.js`: WebWorker evaluating human move probability via neural weights.

---

### Modules 17–19: `17-presence.js`, `18-ruview-bridge.js`, `19-presence-automation.js`
* **Responsibility:** Spatial presence monitoring, WebSocket bridge to RuView RF sensing daemon, and desk automation routines.
* **Key Automations:**
  * Auto-lock vault when user leaves desk for $>3\text{ minutes}$.
  * Auto-pause Pomodoro timer on absence.
  * Welcome-back greeting upon desk return.

---

# 3. COMPANION RPG ENGINE: SOURCE ANATOMY & STATE SCHEMA

Located in `Gamecompanion/files/src/`, built with Vite and pure ES Modules.

```text
Game Engine Architecture:
main.js (Orchestrator)
 ├── core/ (Bootstrap, StateManager, GameLoop, EventBus, SaveManager, TimeKeeper)
 ├── combat/ (CombatEngine, DamageCalculator, AIController, WaveManager, BossEncounter)
 ├── systems/ (LootEngine, InventorySystem, CraftingSystem, EconomyManager, ProgressionSystem, StatEngine, ZoneContentSystem, RosterSystem)
 ├── rendering/ (CanvasRenderer, SpriteAtlas, ParticleSystem, HUD)
 └── integration/ (TheHUBBridge)
```

---

### 3.1 StateManager Schema (`core/StateManager.js`)
All game state is stored in a single reactive tree accessed via dot-notation paths (`stateManager.get('combat.hero')`):

```json
{
  "player": {
    "gold": 0,
    "totalGoldEarned": 0,
    "createdAt": 1700000000000
  },
  "combat": {
    "state": "fighting",
    "currentWave": 1,
    "hero": {
      "id": "rudeus",
      "name": "Rudeus",
      "hp": 100,
      "maxHp": 100,
      "attack": 15,
      "defense": 5,
      "attackRange": 120,
      "attackSpeed": 1.2,
      "x": 80,
      "y": 230,
      "aiMode": "balanced"
    },
    "enemies": [],
    "chests": []
  },
  "inventory": {
    "maxSlots": 24,
    "items": [
      {
        "uid": "item_123",
        "id": "apprentice_staff",
        "name": "Apprentice Staff",
        "slot": "weapon",
        "rarity": "rare",
        "stats": { "magicAttack": 12 }
      }
    ]
  },
  "progression": {
    "level": 1,
    "xp": 0,
    "nextLevelXp": 100,
    "currentZone": "fittoa",
    "unlockedStages": ["fittoa-1"]
  }
}
```

---

### 3.2 Combat & Damage Formulas (`combat/DamageCalculator.js`)
* **Physical Damage Mitigation Formula:**
  $$\text{Damage Reduction} = \min\left(0.75, \; \frac{\text{Armor}}{\text{Armor} + 100}\right)$$
  $$\text{Final Physical Damage} = \text{Raw Attack} \cdot (1 - \text{Damage Reduction})$$
* **Magical Damage Mitigation Formula:**
  $$\text{Final Magic Damage} = \text{Spell Power} \cdot (1 - \text{Magic Resistance}) \cdot \text{Affinity Multiplier}$$

---

# 4. INTER-PROCESS PROTOCOLS & EVENT BUS SPECIFICATIONS

### 4.1 TheHUB $\leftrightarrow$ Companion RPG (`window.postMessage`)

| Direction | Event `type` | Payload Schema | Action Taken |
|---|---|---|---|
| TheHUB $\rightarrow$ Game | `hub.activity` | `{ type: 'task_done', title: 'Task', points: 5 }` | Game grants gold ($10\times\text{pts}$) and XP ($5\times\text{pts}$). |
| TheHUB $\rightarrow$ Game | `hub.companion.pause` | `{}` | GameLoop pauses Canvas tick. |
| TheHUB $\rightarrow$ Game | `hub.companion.resume`| `{}` | GameLoop resumes 60 FPS tick. |
| TheHUB $\rightarrow$ Game | `hub.theme` | `{ primary: '#00f0ff', background: '#0b0f1a' }` | Game updates CSS root variables. |
| Game $\rightarrow$ TheHUB | `idlehero.ready` | `{ version: '0.3.0' }` | TheHUB marks frame ready and flushes queue. |
| Game $\rightarrow$ TheHUB | `idlehero.ack` | `{ sourceActivityId: 'act_1', reward: {...} }` | TheHUB marks event acknowledged. |
| Game $\rightarrow$ TheHUB | `idlehero.levelup` | `{ heroId: 'rudeus', newLevel: 5 }` | TheHUB logs celebration toast. |

---

# 5. LOCAL AI (MARCIALE) TOOL CALLING & STREAMING PIPELINE

### 5.1 Native Tool Parameter JSON Schemas
The assistant module sends native OpenAI/Ollama compatible tool definitions to `/api/chat`:

```json
[
  {
    "type": "function",
    "function": {
      "name": "add_task",
      "description": "Create a new Kanban task on TheHUB board",
      "parameters": {
        "type": "object",
        "properties": {
          "title": { "type": "string", "description": "Title of task" },
          "priority": { "type": "string", "enum": ["low", "normal", "high", "urgent"] },
          "column": { "type": "string", "enum": ["todo", "in_progress", "done"] }
        },
        "required": ["title"]
      }
    }
  },
  {
    "type": "function",
    "function": {
      "name": "log_drink",
      "description": "Log caffeine, water, or calorie intake to Biometric Tracker",
      "parameters": {
        "type": "object",
        "properties": {
          "drink": { "type": "string", "enum": ["coffee", "tea", "water", "energy", "soda"] },
          "qty": { "type": "number", "description": "Number of servings" }
        },
        "required": ["drink"]
      }
    }
  }
]
```

---

# 6. CHESSLAB HYBRID WASM/ONNX MULTITHREADING SUBSYSTEM

### 6.1 Worker Message Protocol (`15b-chess-engine-worker.js`)
* **Inbound Command:** `{ type: 'position', fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', moves: ['e2e4'] }`
* **Inbound Search:** `{ type: 'go', depth: 12, movetime: 1000 }`
* **Outbound Evaluation:** `{ type: 'eval', depth: 12, score: 35, bestmove: 'e7e5', pv: 'e7e5 g1f3' }`

### 6.2 Positional Safety Heatmap Algorithm
For all 64 squares:
$$\text{Safety Score}(sq) = \text{Count}(\text{Friendly Attackers}) - \text{Count}(\text{Enemy Attackers})$$
* Score $>0$: Square rendered **Green** (Friendly control).
* Score $<0$: Square rendered **Red** (Enemy control).
* Score $=0$ (Contested): Square rendered **Orange**.

---

# 7. SECURITY, CORS & SERVER PROXY ARCHITECTURE (`server.py`)

### 7.1 Server Endpoint Routing Table

| Route | Method | Handler Method | Purpose & Security Constraint |
|---|---|---|---|
| `/` | `GET` | `SimpleHTTPRequestHandler` | Serves dashboard HTML/CSS/JS with strict CSP. |
| `/api/hub-data` | `POST` | `do_POST` | Persists JSON key-value store; rejects non-`hub.*` keys. |
| `/api/bookmarks`| `POST` | `do_POST` | Saves user bookmark arrays to `bookmarks.json`. |
| `/api/fetch` | `GET` | `do_GET` | SSRF-filtered web page fetcher (max $1\text{ MB}$). |
| `/ruview-proxy/*`| `ALL` | `_handle_ruview_proxy` | CORS-stripping proxy for local RuView sensing server. |
| `/ruview-proxy/health` | `GET` | `_ruview_health_check` | Returns `{ ok: true, status: 'online' }` if daemon lives. |
| `/ruview-proxy/ws/*` | `UPGRADE` | `_ws_relay` | Bidirectional TCP socket relay for WebSocket frames. |

---

# 8. AUTOMATED QA TEST INVARIANTS & SAFETY VERIFICATION

The codebase contains two complete automated test harnesses that must pass on every change:

### Test Suite 1: TheHUB Dashboard (`hub/tests/`)
Executed via `npm test` inside `TheHUB 1.5.5.2.3 a v/`:
1. `tests/smoke.js`: Asserts file existence, module exports, and CSS variable completeness.
2. `tests/unit.js`: Core string sanitation, ID generation, date validation.
3. `tests/unit-storage.js`: LocalStorage and IndexedDB read/write/fallback operations.
4. `tests/unit-hub.js`: Global `window.Hub` bridge methods and modal builders.
5. `tests/unit-calendar.js`: ICS recurrence parsing, VALARM detection, timezone offsets.
6. `tests/unit-tracker.js`: Pharmacokinetic caffeine elimination half-life curve math.
7. `tests/unit-chess.js`: FEN parsing, legal move generation, Stockfish worker lifecycle.
8. `tests/unit-presence.js`: User present/away state transitions and idle timers.
9. `tests/unit-ruview.js`: WebSocket frame handling and DOM rendering throttling.
10. `tests/unit-presence-automation.js`: Auto-vault lock and Pomodoro pause triggers.
11. `tests/unit-ruview-proxy.py`: Python-level proxy routing and WebSocket relay verification.
12. `tests/app-smoke.js`: Full headless JSDOM browser simulation with mock Ollama streaming.

### Test Suite 2: Companion RPG Engine (`companion/tests/`)
Executed via `node --test tests/*.test.js` inside `Gamecompanion/files/`:
1. `AIController.test.js`: Aggressive, balanced, defensive skill selection and cooldowns.
2. `BossEncounter.test.js`: Boss phase-two transition below 50% HP.
3. `CombatEngine.test.js`: Auto-attack range detection, hit registration, monster kill events.
4. `DamageCalculator.test.js`: 75% physical armor cap, elemental affinities, critical hits.
5. `DifficultySystem.test.js`: Dynamic monster HP and damage scaling per stage.
6. `EconomyManager.test.js`: Item selling gold grants and balance bounds.
7. `InventorySystem.test.js`: Item stacking, max slot limits, filtering.
8. `LootEngine.test.js`: Stage clear chest drops and template roll queries.
9. `ProgressionSystem.test.js`: Character leveling XP curves and spillover calculation.
10. `RosterSystem.test.js`: Multi-character unlock flags and template loading.
11. `SaveManager.test.js`: IndexedDB round-trip serialization, migration, corruption defense.
12. `StatEngine.test.js`: Derived stats from equipment affixes.
13. `StateManager.test.js`: Reactive path subscriber notifications and immutable snapshots.
14. `WaveManager.test.js`: Multi-wave monster spawning and portal stage select.
15. `ZoneContentSystem.test.js`: Zone stage arrays and background asset mapping.

---
**End of Study Document.**
