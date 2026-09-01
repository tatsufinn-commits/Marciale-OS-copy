# AI_CONTEXT.md — Marciale-OS Persistent AI Knowledge Base
## Target Audience: Autonomous AI Coding Agents & Systems Engineers
**Project Repository:** Marciale-OS (TheHUB + Companion RPG)  
**Baseline Version:** TheHUB v1.5.5.2.3 / Companion Engine v0.3.0.0.a (Build 20)  
**Primary Language Stack:** JavaScript (ES2020 Modules + Vanilla Browser JS), Python 3.9+, HTML5 Canvas, CSS3  

---

# 1. ARCHITECTURAL OVERVIEW & PURPOSE

Marciale-OS is a **local-first, zero-cloud personal command center** that unifies personal productivity, biometric monitoring, encrypted note/secret storage, offline AI reasoning, grandmaster chess calculation, and gamified momentum tracking.

### The 4 Core Architectural Subsystems:
```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. BACKEND & PROXY (TheHUB/server.py & TheHUB/ollama-proxy.py)              │
│    • SimpleHTTP + Threading server listening on 127.0.0.1:8000.             │
│    • Serves static files, manages hub-data.json, proxies ICS calendar feeds, │
│      and routes RuView WebSocket sensing traffic through /ruview-proxy/.    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. THEHUB DASHBOARD (TheHUB/index.html & TheHUB/modules/00-*.js to 19-*.js) │
│    • Single-Page Vanilla JS Application with 11 primary tab pages.          │
│    • Hybrid storage: LocalStorage for synchronous config, IndexedDB for     │
│      large datasets (AI chats, notes library, activity archives).           │
│    • Features: Today, Kanban Tasks, Pomodoro "LOCK IN", Caffeine Tracker,   │
│      AES-GCM Vault, Calendar (.ics), Marciale AI, ChessLab, RuView Sensing. │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. COMPANION RPG (Gamecompanion/files/ & TheHUB/companion/)                 │
│    • Standalone HTML5 Canvas 2D Idle RPG built with Vite and ES Modules.    │
│    • Systems: StateManager, CombatEngine, WaveManager, LootEngine, Crafting,│
│      SaveManager (IndexedDB), and TheHUBBridge (postMessage listener).      │
│    • Embedded inside TheHUB via <iframe> to receive productivity rewards.   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. LOCAL AI BRAIN (Ollama Daemon on 127.0.0.1:11434)                       │
│    • Streaming chat and function tool execution via modules/08-assistant.js.│
│    • Supports Qwen 2.5:7b, Llama 3.2:3b, DeepSeek-R1 local quants.          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# 2. THE 13-DOCUMENT OPERATIONAL SYSTEM

> **Live program status is NOT in this file.** For where the VSS program actually stands, read
> **`docs/PROJECT_VSS_MASTERPLAN.md`** (one page, kept current). If you are a new Seat A, read
> **`docs/shrine/members/TWMIP_LETTER_OF_UNFINISHED_BUSINESS_S03.md`** first — it lists every open
> item and separates what is blocked on the Commander from what you may execute.

Any AI working on this repository must consult the dedicated operational document for its task:

| Document | Role & Purpose | Key Target |
|---|---|---|
| **`docs/AI_RULES.md`** | **The Constitution** — The 25 Supreme Laws of Marciale-OS (through Law XXV — Operation Company; XXIV = The Civilian Estate). | Mandatory for all chats. |
| **`docs/PROMPT_PLAYBOOK.md`** | **Prompt Library** — Copy-paste prompt templates for all 22 scenarios. | Prompt selection. |
| **`docs/council/MII_MERGE_GOVERNANCE_DOCTRINE.md`** | **Merge Governance** — M.I.I. framework (Migration, Incursion, Invasion, Quarantine). | Protected merge gates. |
| **`docs/STRATEGIC_DECISION_FRAMEWORK.md`** | **Path Analyzer** — 7 Reality Protocols, Mosaic Council, and 4-Axis SPI. | Decision matrix & planning. |
| **`docs/AGENTS.md`** | **The Staff** — 6 Core + 7 Web specialized agent roles. | Role boundaries & handoffs. |
| **`docs/BUILD_LOGBOOK.md`** | **The Living Ledger** — Permanent historical log recording every build across sessions. | Build memory & history. |
| **`docs/DIAGNOSTIC_AND_TESTING_GUIDE.md`** | **Proactive QA** — Automated tests & targeted scans for Chess/RuView. | Proves *"Does it work?"* |
| **`docs/CODE_ANALYSIS_AND_ISSUE_DETECTION.md`** | **Code Inspector** — Deep static analysis, defect dossiers, and debt. | Explains *"Why does it fail?"* |
| **`docs/INCIDENT_RESPONSE_SRE_PLAYBOOK.md`** | **Emergency SRE** — Rapid incident triage (SEV-1 to SEV-4) and playbooks. | Rapid containment & PIR. |
| **`docs/CODEBASE_DEEP_DIVE_STUDY.md`** | **Technical Study** — Module anatomy, StateManager schema, formulas. | Canonical source blueprint. |
| **`docs/AI_CONTEXT.md`** | **Context Card** — High-level architecture map and safety rules. | Quick orientation. |
| **`docs/REPAIR_DOSSIER.md`** | **Diagnostic Audit** — 23-phase deep empirical research report. | Historical root-cause logs. |
| **`docs/MASTERFIX_PLAN_V1.0.md`** | **Work Orders** — Actionable builds F01 through F16. | Active build execution. |
| **`docs/Refinedplan.md`** | **Roadmap** — Master Roadmap V7 + MasterFix + Master Roadmap V8. | Long-term evolution. |

---

# 3. HIGH-RISK CODE AREAS & SAFE MODIFICATION RULES

### ⚠️ HIGH RISK FILES (Modify with extreme caution)

* **Applying a recovered `.patch` wholesale** — a patch may carry an entire branch history
  (a real one carried **121 files**, 8 of them build artifacts, against **5** that belonged to the
  task). Extract only the task's files, or you overwrite newer work and re-dirty
  `companion/assets/*` (**F15**). **Law XV-A makes wholesale application a Law I violation.**
* **`Gamecompanion/files/src/main.js` global handlers** — `audioSystem`, `isAudioPaused`,
  `gameLoop` and friends are scoped **inside `boot()`**. A global `visibilitychange` handler
  referencing them throws **ReferenceError on every tab-hide**, and **`node --check` will not
  catch it — a scope error is not a syntax error.**
1. **`TheHUB/modules/00-storage.js` & `01-migrations.js`**: Core data layer. Never alter storage keys without writing an explicit migration function in `01-migrations.js`.
2. **`TheHUB/server.py`**: Handles security boundaries, CORS filtering, ICS line unfolding, and RuView WebSocket relays. Never allow unvalidated URL fetching in `/api/fetch`.
3. **`TheHUB/modules/08-assistant.js`**: 106KB monolithic AI engine. Do not alter `readOllamaChatStream` or `mergeStreamToolCalls` without running `node tests/app-smoke.js`.
4. **`Gamecompanion/files/src/core/StateManager.js`**: Central reactive state store. Must maintain immutable state snapshots on `get()`.

### 🟢 SAFE MODIFICATION AREAS
1. **`Gamecompanion/files/src/data/*.json`**: Safe to add new items, monsters, quests, and affixes.
2. **`TheHUB/style.css`**: Safe to customize CSS color variables, font families, and modal animations.
3. **`TheHUB/modules/00-utils-config.js`**: Safe to add new AI Brain profile presets.

---

# 4. TESTING & RELEASE PACKAGING MANDATE (LAWS V & VIII)

Before concluding an **Active Build Execution** session, the AI agent MUST:
1. Run `npm test` and confirm all 43 automated unit and smoke tests pass (100% green).
2. Append the completed build entry to `docs/BUILD_LOGBOOK.md`.
3. Package all updated files into a versioned `.zip` archive per `VERSIONING_GUIDE.md` (e.g. `PATCH-V1.0.zip`) and present it to the user.

- **`docs/shrine/THE UNKNOWN CAVALRY/`** — 🐎 wills of the dead frontier seats (R/N), filed by Seat A under **Law XIX-C: The Cavalry's Last Report**. Holds `WILL_SEAT_R_NTG_2026-08-15.md`. Sealed by Charter §V/§VII.
