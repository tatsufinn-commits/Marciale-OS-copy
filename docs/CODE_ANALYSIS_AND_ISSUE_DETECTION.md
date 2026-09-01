# 🔬 CODE ANALYSIS & ISSUE DETECTION GUIDE — Marciale-OS
## Operational Document 2: Root-Cause Investigation, Static Analysis & Vulnerability Auditing
**Target System:** Marciale-OS (TheHUB + Companion RPG)  
**Operational Philosophy:** Inspect ➔ Analyze ➔ Root-Cause ➔ Prove ➔ Remediate  
**Core Question:** *"Why does it work or fail this way, and what structural flaws exist inside the code?"*  
**Audience:** Code Reviewers, Systems Architects, and Debugging Specialists  

---

# 1. ANALYSIS METHODOLOGY & TAXONOMY

While the Diagnostic Guide asks *"Does it work?"*, this Code Analysis Guide investigates the underlying implementation across **8 Critical Dimensions**:

```text
 ┌──────────────────────────────────────────────────────────────────────────┐
 │                   THE 8 CODE ANALYSIS DIMENSIONS                         │
 ├──────────────────────────────────────────────────────────────────────────┤
 │ 1. LOGICAL ERRORS & EDGE CASES (Math boundaries, off-by-one errors)      │
 │ 2. ASYNC RACES & LIFECYCLE (Unmounted iframes, unclosed WebWorkers)      │
 │ 3. BROKEN ASSUMPTIONS (Assuming Ollama or hardware is always reachable) │
 │ 4. INTEGRATION MISMATCHES (Protocol signatures, JSON schema drift)       │
 │ 5. SECURITY & TRUST BOUNDARIES (SSRF, XSS, plaintext secrets)           │
 │ 6. PERFORMANCE & DOM LEAKS (Unthrottled loops, heavy WebGL overlays)    │
 │ 7. TECHNICAL DEBT & COUPLING (Oversized monolithic modules, global vars) │
 │ 8. INCOMPLETE IMPLEMENTATIONS (Stubs, unhandled switch cases)           │
 └──────────────────────────────────────────────────────────────────────────┘
```

---

# 2. SYSTEM-BY-SYSTEM VULNERABILITY & DEBT AUDIT

---

### 2.1 TheHUB Core Dashboard (`TheHUB .../modules/`)

#### A. Monolithic Module Complexity
* **Observation:** `08-assistant.js` (106 KB), `15-chess.js` (172 KB), and `12-today.js` (85 KB) contain dense inline logic.
* **Risk:** High cognitive burden when editing; increased chance of unintentional side-effects.
* **Evidence:** In `08-assistant.js`, chat UI rendering, Ollama HTTP streaming, tool buffering, system prompt injection, and audio synthesis are tightly coupled.
* **Remediation:** Keep individual functions small and pure; isolate streaming tool parsers into distinct helper functions.

#### B. Global Scope Window Contamination
* **Observation:** TheHUB uses `window.Hub`, `window.LS`, `window.TASKS`, `window.EVENTS`, and `window.BRAIN`.
* **Risk:** Potential naming collisions if new third-party scripts are added.
* **Current Safeguard:** All modules use strict namespacing prefixes (`hub.*` in localStorage and `Hub.*` on window).
* **Remediation:** Do not introduce arbitrary global variables; mount all new APIs under `window.Hub.<subsystem>`.

#### C. LocalStorage Quota Exceeded Trap
* **Observation:** Browsers enforce a strict $5\text{ MB} - 10\text{ MB}$ limit on `localStorage`.
* **Risk:** If a user accumulates thousands of chat turns or calendar events, `localStorage.setItem()` throws a fatal `QuotaExceededError`.
* **Remediation:** Ensure large datasets (AI chats, notes library, long-term history) are stored strictly in `HubStorage` (IndexedDB), reserving `LS` for synchronous UI preferences only.

---

### 2.2 Companion RPG Engine (`Gamecompanion/files/src/`)

#### A. Bridge Handshake Protocol Incompatibility
* **Defect ID:** `ANA-01`
* **Location:** `Gamecompanion/files/src/integration/TheHUBBridge.js` $\leftrightarrow$ `TheHUB .../modules/14-companion.js`
* **Root Cause:** `TheHUBBridge.js` dispatches `mtgame.ready` and `mtgame.ack`, while `14-companion.js` listens for `idlehero.ready` and `idlehero.ack`.
* **Impact:** Handshake never completes; rewards remain in an unacknowledged queue.
* **Recommended Fix:** Dual-emit both message types in `TheHUBBridge.js`:
  ```javascript
  this._send('idlehero.ready', { version: '0.3.0' });
  this._send('mtgame.ready', { version: '0.3.0' });
  ```

#### B. Missing Fallback for Texture Sprites
* **Defect ID:** `ANA-02`
* **Location:** `Gamecompanion/files/src/rendering/SpriteAtlas.js`
* **Root Cause:** If `public/sprites/hero.png` fails to load or is missing, `CanvasRenderer.drawEntity()` attempts to draw a broken image handle.
* **Recommended Fix:** Add a procedural canvas fallback drawing a colored rectangle and character glyph when the sprite image handle is null.

#### C. Floating-Point Rounding in Stat Calculations
* **Defect ID:** `ANA-03`
* **Location:** `Gamecompanion/files/src/combat/DamageCalculator.js`
* **Root Cause:** Armor reduction calculations ($\frac{\text{Armor}}{\text{Armor}+100}$) produce irrational floating-point numbers that accumulate precision errors.
* **Remediation:** Always apply `Math.floor()` or `Math.round()` at the final step of damage calculation.

---

### 2.3 Local AI & Assistant Engine (`08-assistant.js` & `server.py`)

#### A. Fragmented Tool Call JSON Chunking
* **Defect ID:** `ANA-04`
* **Location:** `08-assistant.js: mergeStreamToolCalls()`
* **Root Cause:** Ollama streaming emits partial JSON tokens across multiple chunks (e.g. Chunk 1: `{"name":"add_task", "arguments":"{\"title\":\"Re`); Chunk 2: `view Notes\"}"}`).
* **Risk:** Parsing partial chunks immediately throws `JSON.parse` syntax errors.
* **Current Solution:** `mergeStreamToolCalls()` buffers raw argument strings until the stream emits `done: true` or `tool_calls` closes, followed by schema validation in `strictToolActionsFromCalls()`.

#### B. Ollama Unreachable UI Hang
* **Defect ID:** `ANA-05`
* **Location:** `08-assistant.js: sendAssistantMessage()`
* **Root Cause:** If Ollama daemon is offline, `fetch()` hangs until browser default timeout ($300\text{ seconds}$).
* **Remediation:** Implement an `AbortController` with a $3\text{ second}$ timeout for health pings and render an interactive "Ollama Offline" guidance card.

---

# 3. STATIC ISSUE DETECTION CHECKLIST

Before approving any code changes, the AI code reviewer must perform this 10-point static check:

| # | Inspection Point | Failure Condition | Safe Standard |
|---|---|---|---|
| 1 | **DOM Node Leak** | Creating new elements inside render loops. | Mutate existing DOM attributes or reuse pools. |
| 2 | **Storage Key Integrity**| Writing keys without `hub.` prefix. | All keys must strictly start with `hub.`. |
| 3 | **XSS Injection** | Using `innerHTML` with unsanitized user/AI text.| Wrap all dynamic text with `sanitizeHtml()` or `escapeHtml()`. |
| 4 | **SSRF Defense** | Fetching arbitrary private network IPs in `server.py`. | Enforce `valid_fetch_url()` blocking private CIDRs. |
| 5 | **WebWorker Cleanup**| Leaving Stockfish / Maia workers running on tab switch. | Send `stop` and terminate idle workers. |
| 6 | **Async Error Traps**| Bare Promises without `.catch()` or `try/catch`. | All async storage and fetch calls must handle errors. |
| 7 | **CSS Variable Drift**| Hardcoded hex colors in JS DOM manipulation. | Read colors from CSS custom properties (`--hub-primary`). |
| 8 | **Date Timezone Shift**| Using raw `new Date().getDate()` across UTC boundaries.| Use `todayStr()` to anchor local system timezone. |
| 9 | **Audio Caching** | Creating new `new Audio()` objects per sound tick. | Preload sound elements in memory dictionary. |
| 10| **Hardware Gating** | Calling RuView or WebGL without fallback. | Gate behind `SIMULATION_MODE` and feature flags. |

---

# 4. CODE ANALYSIS ISSUE REPORT TEMPLATE

When an analysis reveals a bug or vulnerability, format the finding as follows:

```text
================================================================================
CODE ANALYSIS & DEFECT DOSSIER
================================================================================
DEFECT ID: [ANA-XX]
TITLE: [Brief descriptive title]
SEVERITY: [CRITICAL | HIGH | MEDIUM | LOW]
SUBSYSTEM: [TheHUB | Companion | ChessLab | Ollama | Server]

LOCATION:
- File: [Exact file path]
- Function/Class: [Exact function name & line numbers]

SYMPTOM:
[What user-facing or runtime failure occurs]

ROOT CAUSE ANALYSIS:
[Technical explanation of why the code fails]

AFFECTED SYSTEMS & DEPENDENCIES:
- Direct: [Components directly touching this code]
- Indirect: [Downstream features affected]

RECOMMENDED REPAIR:
[Exact code change or algorithmic solution]

REGRESSION RISKS:
[What could break if this fix is implemented poorly]

VERIFICATION PROCEDURE:
1. [Step-by-step test command or reproduction procedure]
================================================================================
```
