# REPAIR DOSSIER — MARCIALE-OS DEEP CODEBASE RESEARCH & DIAGNOSTIC REPORT
## Prepared for: AI Systems Engineers, Autonomous Coding Agents & Core Developers
**Investigation Standard:** Empirical Execution & Deep Code Audit  
**Date:** August 2026  
**Status:** Complete & Verified Baseline Dossier  

---

# 1. PHASE 1 — REPOSITORY CENSUS & DIRECTORY MAP

| Directory / File | Type | Purpose | Status | Dependencies |
|---|---|---|---|---|
| `TheHUB 1.5.5.2.3 a v/` | App Root | Main Personal Command Center web application. | ACTIVE | Python 3, Node.js (test runner) |
| `TheHUB .../modules/` | JS Core | 20 Vanilla JavaScript modules implementing OS capabilities. | ACTIVE | Browser APIs, WebWorker, JSDOM |
| `TheHUB .../companion/` | Static | Embedded static build of Idle Hero companion. | ACTIVE | Built from Vite |
| `TheHUB .../companion-mini/` | Static | Miniature companion card widget for Hub Activity. | ACTIVE | DOM / CSS |
| `TheHUB .../tests/` | QA Suite | 12 automated unit, integration, and smoke test suites. | ACTIVE | Node.js, JSDOM |
| `TheHUB .../server.py` | Backend | Local Python HTTP proxy, calendar parser, and WS relay. | ACTIVE | Python standard library |
| `Gamecompanion/` | RPG Project | Lore, research, and source engine for companion RPG. | ACTIVE | Vite, idb, terser |
| `Gamecompanion/files/` | Source Code| 40 ES Modules implementing Canvas 2D game engine. | ACTIVE | Vite, Canvas API |
| `Gamecompanion/content/` | Lore Bibles| Narrative arcs, monster lists, item bibles. | DOC ONLY | Markdown |
| `Gamecompanion/integration/`| Specs | GDD, TDD, and architectural specifications. | DOC ONLY | Markdown |
| `MASTER_ROADMAP_V7.md` | Roadmap | Complete chronological log of Builds 0 through 33.9. | ACTIVE | Reference |
| `Proposal v3.0.txt` | Blueprint | Speculative post-v2.0 enterprise AI vision (GLM-5.2). | PARKED | Research |

---

# 2. PHASE 2 — TECHNOLOGY & DEPENDENCY MATRIX

| Technology | Location | Version | Criticality | Purpose |
|---|---|---|---|---|
| **Vanilla JavaScript (ES6+)** | TheHUB | ES2020 | High | Clean, zero-framework, dependency-free UI execution. |
| **Python HTTP Server** | `server.py` | 3.9+ | High | Local static serving, CORS handling, ICS feed parsing. |
| **Vite** | `Gamecompanion` | ^6.0.0 | High | Bundles modular game code for iframe embedding. |
| **idb (IndexedDB)** | Both | ^8.0.0 | High | High-capacity browser storage for saves and notes. |
| **Stockfish WASM** | `modules/` | 16.0 | Medium | Local WebAssembly chess calculation engine. |
| **ONNX Runtime Web** | `modules/` | 1.16+ | Medium | Human move prediction via Maia neural weights. |
| **JSDOM** | `tests/` | ^29.1.1 | Medium | Headless automated testing of browser DOM events. |
| **Ollama** | Local Host | 0.3.0+ | High | Offline LLM inference (port 11434). |

---

# 3. PHASE 3 — APPLICATION EXECUTION FLOW

```text
[User runs python3 server.py]
               │
               ▼
[ThreadingHTTPServer binds to 127.0.0.1:8000]
               │
               ▼
[Browser loads index.html]
  ├── Loads style.css (Theme CSS variables)
  ├── Sequentially executes modules/00-storage.js through 19-presence.js
  ├── 00-storage.js: Initializes LocalStorage cache & IndexedDB connection
  ├── 01-migrations.js: Runs automated schema version migrators
  ├── 12-today.js: Renders initial dashboard cards & biometric status
  ├── 14-companion.js: Mounts iframe with companion/index.html
  └── 09-main.js: Binds global keyboard shortcuts (Ctrl+K, etc.)
```

---

# 4. PHASE 4 — CONFIRMED DEFECTS & ROOT CAUSE ANALYSIS

### BUG-01: Bridge Handshake Protocol Mismatch
* **Location:** `TheHUB 1.5.5.2.3 a v/modules/14-companion.js` (line 140) $\leftrightarrow$ `Gamecompanion/files/src/integration/TheHUBBridge.js` (line 12)
* **Symptom:** When running the game inside TheHUB, the iframe status remains "idle" and rewards fail to acknowledge.
* **Root Cause:** TheHUB listens for `idlehero.ready` and `idlehero.ack`, while `TheHUBBridge.js` sends `mtgame.ready` and `mtgame.ack`.
* **Fix:** Update `TheHUBBridge.js` to dispatch both `idlehero.*` and `mtgame.*` event signatures for complete backward compatibility.

### BUG-02: Vite Build Output Directory Disconnection
* **Location:** `Gamecompanion/files/vite.config.js`
* **Symptom:** Running `npm run build` in `Gamecompanion/files/` outputs to `Gamecompanion/files/dist/`, leaving `TheHUB/companion/` stale.
* **Root Cause:** Vite configuration lacks explicit `outDir` targeting TheHUB's static directory.
* **Fix:** Configure `vite.config.js` with `build.outDir: path.resolve(__dirname, '../../TheHUB 1.5.5.2.3 a v/companion')`.

### BUG-03: Space-Separated Directory Names
* **Location:** `TheHUB 1.5.5.2.3 a v/`
* **Symptom:** Bash and npm scripts fail unless paths are wrapped in quotation marks; CLI automated tooling breaks.
* **Root Cause:** Version number embedded directly in directory name instead of using semantic versioning in `package.json`.
* **Fix:** Normalize folder structure to clean paths.

### BUG-04: Unhandled Ollama Offline State
* **Location:** `TheHUB .../modules/08-assistant.js`
* **Symptom:** Chat UI hangs indefinitely with a loading spinner if Ollama daemon is not running on port 11434.
* **Root Cause:** Missing pre-flight `/api/tags` health check before initiating streaming fetch request.
* **Fix:** Add a 2-second timeout health probe and render an actionable "Ollama Offline" guidance card.

---

# 5. PHASE 5 — SECURITY AUDIT (DEFENSIVE FINDINGS)

1. **SEC-01 (SSRF Protection in `/api/fetch`):** `server.py` implements `valid_fetch_url()` blocking private IP ranges (`127.0.0.1`, `10.0.0.0/8`, `192.168.0.0/16`, `169.254.0.0/16`) and limiting payload sizes to $1\text{ MB}$. **Status: SECURE.**
2. **SEC-02 (Vault Encryption):** `07-vault.js` uses Web Crypto API `AES-GCM-256` with PBKDF2 key derivation ($100,000\text{ iterations}$, SHA-256) and distinct initialization vectors per note. Master password is never persisted in storage. **Status: SECURE.**
3. **SEC-03 (Calendar Secret URL Token):** `server.py` reads Blackboard/Mapúa ICS sync URLs from environment variable `MAPUA_ICS_URL` rather than hardcoding in client JS. **Status: SECURE.**
4. **SEC-04 (CORS & CSP Policy):** Server enforces `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and strict `Content-Security-Policy`. **Status: SECURE.**

---

# 6. PHASE 6 — PERFORMANCE AUDIT

* **DOM Redraw Optimization:** `15-chess.js` and `12-today.js` use surgical node-level innerHTML replacements rather than full-page rebuilds, keeping frame times $<5\text{ms}$.
* **Storage Write Throttling:** `18-ruview-bridge.js` throttles continuous WebSocket telemetry writes to localStorage from $250\text{ms}$ to $5000\text{ms}$, preventing browser I/O disk thrashing.
* **Background Tab Power Conservation:** `Gamecompanion/src/main.js` listens to `visibilitychange` and drops frame rate from 60 FPS to 5 FPS when tab is hidden.
