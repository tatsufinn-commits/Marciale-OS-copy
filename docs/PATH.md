# 🗺️ MARCIALE-OS & TAMAKEE — REPOSITORY ROUTING & PATH BLUEPRINT (`PATH.md`)
## The Master Directory Map, Subsystem Boundaries, Live Commit Guide & Task Intake Protocol for @engineer (Max)
**Document ID:** `SPEC-PATH-ROUTING-2026-V1.0`  
**Classification:** TIER 1 REPOSITORY MAPPING & COMMIT BLUEPRINT  
**Target Authority:** ENGINEER (Max — Seat E), ASSISTANT (Seat A) & All AI Coding Agents  
**Target Path:** `/docs/PATH.md`  

---

# 1. EXECUTIVE REPOSITORY BOUNDARIES

To prevent cross-repository contamination when performing live Git commits, **Max (`@engineer`)** must maintain strict awareness of the two independent repository boundaries:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                  TWO-REPOSITORY UNIFIED ECOSYSTEM MAP                      │
 └────────────────────────────────────────────────────────────────────────────┘
                                       │
         ┌─────────────────────────────┴─────────────────────────────┐
         ▼                                                           ▼
┌───────────────────────────────────────┐   ┌───────────────────────────────────────┐
│ REPOSITORY 1: `Marciale-OS`           │   │ REPOSITORY 2: `TAMAKEE`               │
│ https://github.com/tatsufinn-commits/ │   │ https://github.com/tatsufinn-commits/ │
│ Marciale-OS.git                       │   │ TAMAKEE.git                           │
├───────────────────────────────────────┤   ├───────────────────────────────────────┤
│ • TheHUB Web Command Center (Port 8000│   │ • Mapúa 3rd-Year Architecture Vault   │
│ • Companion Canvas 2D Retro RPG Engine│   │ • Building Laws (PD 1096, RA 9514)    │
│ • JARWEN High Council & Dispatches    │   │ • Structural & Utilities Manuals      │
│ • SRE Sentinel & Patchnotes Ledger    │   │ • Socratic Mock Exams & Flashcards    │
│ • Research Dossiers & Benchmark Specs │   │ • TAMAplugin Academic Bridge          │
└───────────────────────────────────────┘   └───────────────────────────────────────┘
```

---

# 2. MARCIALE-OS — EXACT FILE & DIRECTORY MAPPING

When modifying, building, or committing files in **`Marciale-OS`**, follow this exact directory taxonomy:

```text
/home/user/Marciale-OS/
│
├── package.json                         <- ROOT MONOREPO CONTROLLER (Scripts & Test Harness)
├── .gitignore                           <- IGNORE RULES (node_modules, build caches, .env)
├── README.md                            <- MAIN ENTRY POINT (24 Laws, 24 Scenarios, Command Table)
├── DESIGN.md                            <- CANONICAL UI DESIGN SYSTEM (W3C DTCG Token Specs)
├── VERSIONING_GUIDE.md                  <- 5-Tier Semantic Subsystem Version Authorities
│
├── TheHUB 1.5.5.2.3 a v/                <- THEHUB WEB COMMAND CENTER (HTML5 / Vanilla JS / Python)
│   ├── server.py                        <- Python 3 HTTP & WebSocket Proxy (Port 8000, /ruview-proxy)
│   ├── index.html                       <- Single-Page Dashboard Shell (11 Main Views)
│   ├── style.css                        <- APCA-Calibrated Dark Cockpit Stylesheet (Lc >= 60)
│   ├── modules/                         <- 20 MODULAR JAVASCRIPT ENGINES:
│   │   ├── 00-storage.js                <- Hybrid LocalStorage/IndexedDB with Quota Telemetry
│   │   ├── 00-utils-config.js           <- Utility Helpers, Brain Profiles & Web Audio Synthesizer
│   │   ├── 01-migrations.js             <- Versioned Schema Migrations & Pre-Migration Backups
│   │   ├── 04-tracker.js                <- 5.7h Pharmacokinetic Caffeine Decay & Circadian Math
│   │   ├── 07-vault.js                  <- PBKDF2 / AES-GCM-256 Zero-Knowledge Encrypted Vault
│   │   ├── 08-assistant.js              <- Marciale Local AI (Ollama Stream, Tool Calls, Memory)
│   │   ├── 10-command-palette.js        <- Linear/Raycast Ctrl+K Quick-Dispatch HUD
│   │   ├── 11-tasks.js                  <- Kanban Board with Priority Columns & Drag-Drop
│   │   ├── 12-today.js                  <- Today Dashboard, Focus Timers & Council Observer Card
│   │   ├── 14-companion.js              <- Momentum Companion Bridge & SVG Rarity Crests
│   │   ├── 15-chess.js                  <- ChessLab 2.0 (Stockfish WASM + Maia AI + Attack Heatmaps)
│   │   ├── 17-presence.js               <- User Presence & 3-Minute Away Auto-Lock Hook
│   │   ├── 18-ruview-bridge.js          <- RuView CSI Sensing with Pure CSS Dot-Matrix Radar
│   │   └── 19-presence-automation.js    <- Desk Security Rules & Automated Vault Lockdown
│   ├── companion/                       <- EMBEDDED PRODUCTION RPG (Compiled from Gamecompanion/files)
│   ├── companion-mini/                  <- Mini-widget iframe summary embedded in Today
│   ├── TAMAplugin/                      <- Live Mapúa Academic Studio Plugin (Socratic Brain)
│   └── tests/                           <- 12 Automated JSDOM & Python Unit Test Suites (137 Assertions)
│
├── Gamecompanion/                       <- COMPANION RPG SOURCE ENGINE & LORE
│   ├── files/                           <- VITE BUILD PIPELINE & ENGINE SOURCE:
│   │   ├── package.json                 <- Companion Manifest (Vite, idb, terser)
│   │   ├── vite.config.js               <- Auto-link build config (outDir -> TheHUB/companion/)
│   │   ├── index.html                   <- Standalone Game Canvas Shell (600x400)
│   │   ├── src/                         <- 50+ ES MODULE ENGINE SOURCE:
│   │   │   ├── core/                    <- GameLoop (60/5 FPS governor), StateManager, EventBus
│   │   │   ├── combat/                  <- CombatEngine, DamageCalculator (75% cap), AIController
│   │   │   ├── systems/                 <- QuestSystem, AchievementSystem, DialogueSystem, Affinity
│   │   │   ├── rendering/               <- CanvasRenderer (Pixel Art, Spirit City Study Posture)
│   │   │   ├── data/                    <- Data-driven quests.js, achievements.js, chapters.js
│   │   │   ├── integration/             <- TheHUBBridge.js (Bi-directional XP/Gold & Focus Bridge)
│   │   │   └── main.js                  <- Engine Orchestrator & UI Modal Wire-up
│   │   └── tests/                       <- 41 Automated Unit Tests (node --test tests/*.test.js)
│   ├── content/                         <- 7 NARRATIVE BIBLES (Quests, NPCs, Monsters, Items, Lore)
│   └── integration/                     <- GDD, TDD, and Architecture Specifications
│
├── research/                            <- CANONICAL RESEARCH REPOSITORY (Commandment V)
│   ├── MARCIALE-OS_ANALYSIS_RESEARCH.md <- Monorepo Census & 8 Industry Benchmarks (Linear, Raycast)
│   ├── MARCIALE_OS_NEXTGEN_AI_RESEARCH.md <- claude-mem, headroom, babysitter-observer teardowns
│   ├── proposals/                       <- RATIFIED MASTER PROPOSALS:
│   │   ├── MASTER_PROPOSAL_PLAN_V9.md   <- Master Roadmap V9.0 (Builds 41–48 Complete)
│   │   └── MASTER_ROADMAP_V10_AETHERWEAVE.md <- Master Roadmap V10.0 (Builds 50–57)
│   └── reference/                       <- External API specs and benchmark notes
│
└── docs/                                <- GOVERNANCE, AUDIT & HIGH COUNCIL SUITE
    ├── THE_10_COMMANDMENTS_OF_DOCS.md   <- Inviolable Bible of Documentation & Releases
    ├── AI_RULES.md                      <- The AI Constitution (25 Supreme Laws; XXV = Operation Company)
    ├── COMMANDER_COHERENCE_CUE.md       <- CCC: Tolerance / lights / Law XXII stamp
    ├── CIVILIAN_INTELLECT.md            <- also under council/; Law XXIV estate
    ├── AGENT_PLAYBOOK.md                <- Reverse-Intent Decoder & Autonomous Severity Matrix
    ├── AGENTS.md                        <- Virtual Squad Registry (6 Core Roles + 7 Web Roles)
    ├── PROMPT_PLAYBOOK.md               <- 22 Master Scenario Prompt Templates
    ├── DOCS_MASTER_INDEX.md             <- 1-Page Master Document Index & Navigation Map
    ├── SYSTEM_STATE.md                  <- Machine-Readable Ground-Truth Baseline
    ├── BUILD_LOGBOOK.md                 <- Permanent Engineering Ledger (Builds 0 through 53+)
    ├── PATH.md                          <- This Canonical Repository Routing Blueprint
    ├── patchnotes/PATCHNOTES_LEDGER.md  <- Living ledger of surgical bugfixes & patches
    ├── hotfix/                          <- Staging ground for incoming hotfix dossiers
    ├── audit/                           <- Governance integrity audits & repair design reviews
    └── council/                         <- JARWEN HIGH COUNCIL HQ:
        ├── JARWEN_COUNCIL_CHARTER.md    <- High Council Constitution & 4-Layer Approval Model
        ├── STAND_ORDERS_LETTERS_OF_LAST_RESORT.md <- 10 Continuous Watch Standing Orders
        ├── STAND_ORDERS_HAMMER_DOWN.md           <- Law XX: Commander-fallen (outranks Last Resort when ACTIVE)
        ├── STAND_ORDERS_CONTINUITY_REGIME_13VIII.md <- Law XXI: Enabling / Geneva / Patent / Divide
        ├── CIVILIAN_INTELLECT.md                 <- Law XXIV guest protocol (@intelect + upcoming)
        ├── COUNCIL_COMMUNICATION_LOG.md <- Cross-Model Message Bus & Dispatch Log
        ├── JARWEN_FORMAT_SPECIFICATION.md <- Standardized RFC/NASA/SRE schemas
        └── members/                     <- DEDICATED MEMBER WORKSPACES:
            ├── ASSISTANT/               <- tasks/ and deliverables/ for Seat A
            ├── WISDOM/                  <- tasks/ and deliverables/ for Seat W
            ├── RECONNAISSANCE/          <- tasks/ and deliverables/ for Seat R
            │   ├── COLONY.md            <- @colony intake cell (Commander links → audit → Seat A)
            │   └── templates/COLONY_AUDIT_TEMPLATE.md
            ├── ENGINEER/                <- tasks/ and deliverables/ for Seat E (Max)
            └── NAVIGATOR/               <- tasks/ and deliverables/ for Seat N
```

---

# 3. TAMAKEE — EXACT FILE & DIRECTORY MAPPING

When modifying, adding course modules, or committing to **`TAMAKEE`**, follow this exact vault taxonomy:

```text
/home/user/TAMAKEE/
│
├── package.json                         <- Scripts, testing harness & version manifest (v2.0.0)
├── README.md                            <- Academic Manual & Socratic Prompt Interface
├── VERSIONING_GUIDE.md                  <- Academic Versioning Policy
│
├── vault/                               <- CANONICAL ACADEMIC KNOWLEDGE REPOSITORY:
│   ├── 00-CORE-BUILDING-LAWS/           <- PD 1096 NBCP, RA 9514 Fire Code, BP 344, RA 9266
│   ├── 01-CURRENT-COURSES/              <- 3rd-Year Active Term (AD5, BT4/5, STRUC3, MEPFS)
│   ├── 02-DESIGN-STUDIO-SPINE/          <- Space Programming, Zoning & Site Planning Manuals
│   ├── 03-BUILDING-TECHNOLOGY-SERIES/   <- BT3 Heavy RCD, Prestressing & Structural Steel
│   ├── 04-BUILDING-UTILITIES-SERIES/    <- BU2 Electrical/FDAS & BU3 Central HVAC/Acoustics
│   ├── 05-STRUCTURAL-STUDIES-SERIES/    <- STRUC1 Statics, STRUC2 Flexure & STRUC3 Indeterminate
│   ├── 06-HISTORY-AND-THEORY-SERIES/    <- HOA1 Ancient to Gothic, HOA4 Philippine Architecture
│   └── 07-PLANNING-AND-ENVIRONMENTAL/   <- PLAN1 Site Ecology, Tropical Design, CLUP Zoning
│
├── reviewers/                           <- SOCRATIC MOCK EXAMS & DISTRACTOR TRAPS:
│   ├── mock-exams/                      <- 20-item & 100-item Departmental Exit Exams
│   └── flashcards/                      <- Active recall formula decks & building law tables
│
├── plugin/                              <- TheHUB Academic Studio Bridge Source Code
└── docs/                                <- Academic Governance & Study Logbook (STUDY_LOGBOOK.md)
```

---

# 4. WHAT GOES WHERE: QUICK DECISION MATRIX FOR @ENGINEER

> **📦 LAW XV-A — THE TWMIP MANDATE S03 (enacted 2026-08-16). READ BEFORE DELIVERING.**
> **@engineer (Max) delivers as a PATCH FILE, not as a push:**
> ```
> docs/patchnotes/SEAT E patches/[identifier].patch
> ```
> Seat A then executes four stages, none skippable: **RECOVER** (fetch from remote before
> declaring a file missing) → **CHECK** (`npm run health` = `@sre` **and** `npm run pangolin`,
> both green, counts **measured** from harness output) → **IMPLEMENT** (only on both greenmarks;
> rebuild `MARCIALE_OS_COMPLETE.zip` for the Commander, hash-verified) → **REPORT** (dispatch).
> **Packaging is NOT committing.** The law grants no push authority.
> **A patch may carry an entire branch** — Seat A extracts only the task's files (Law I).
> **`node --check` is not a scope check.** Verify identifiers are in scope at the point of use.

| If you are creating or modifying... | Commit to Repository | Exact Target Directory |
|---|:---:|---|
| **UI components, modals, styles, or cards for TheHUB** | `Marciale-OS` | `TheHUB 1.5.5.2.3 a v/modules/` or `style.css` |
| **Canvas game engine, combat math, or RPG systems** | `Marciale-OS` | `Gamecompanion/files/src/` |
| **Game quest, achievement, or dialogue data** | `Marciale-OS` | `Gamecompanion/files/src/data/` |
| **New research dossiers or external benchmark teardowns** | `Marciale-OS` | **`research/` only** (Seat R write lane). High Council infers; do not also dump constitutions. |
| **High Council charters, dispatches, or prompt playbooks** | `Marciale-OS` | `docs/council/` or `docs/PROMPT_PLAYBOOK.md` |
| **Surgical bugfixes & regression test assertions** | `Marciale-OS` | Target subsystem `tests/` & `docs/patchnotes/` |
| **Mapúa building law notes, calculations, or course outlines** | `TAMAKEE` | `vault/` under relevant course series |
| **Departmental mock exams, flashcards, or study questions** | `TAMAKEE` | `reviewers/mock-exams/` or `flashcards/` |

---

# 5. CROSS-REPOSITORY BRIDGE HANDSHAKE (HOW THEY CONNECT)

1. **The Plugin Bridge:** `TheHUB .../TAMAplugin/` connects TheHUB directly to the `TAMAKEE` academic vault, providing the Socratic architectural brain profile for Marciale AI.
2. **The Calendar Sync:** `TheHUB 05-calendar.js` reads Mapúa Blackboard `.ics` calendar feeds and displays live departmental exam countdown cards on the Today Dashboard.
3. **The Gamified Momentum Loop:** Studying architectural plates or completing mock exams in TAMAKEE triggers `logStudySessionActivity()`, awarding **+200 Gold & +100 XP** to the Companion RPG hero via `TheHUBBridge.js`!

---

# 6. LOCAL PORTS & DAEMON ECOSYSTEM MAP

| Port | Service / Daemon | Purpose | Health Check |
|---|---|---|---|
| **8000** | **TheHUB Server (`server.py`)** | Core HTTP Command Shell & WebSocket Proxy | `GET http://localhost:8000/` |
| **5173** | **Gamecompanion Vite Dev** | Standalone Canvas RPG Development | `GET http://localhost:5173/` |
| **3001** | **RuView Sensing Daemon** | WiFi CSI Radar & Doppler WebSocket | `ws://127.0.0.1:3001/ws/sensing` |
| **11434**| **Ollama Local LLM Daemon** | Local AI Model Streaming & Tool Calling | `GET http://localhost:11434/api/tags` |

---

# 7. STANDARDIZED GIT COMMIT CONVENTION

Max (`@engineer`) must format all Git commit messages according to this traceable standard:

* `feat(subsystem): [Build XX] concise feature title`
  * Example: `feat(companion): [Build 54] add personal companion quest chains`
* `fix(subsystem): [Patch XX] concise fix description`
  * Example: `fix(tracker): [Patch 06] calibrate caffeine elimination to 5.7h`
* `docs(council): [Task XX] governance or dispatch update`
  * Example: `docs(council): [Task 02] ratify high council constitution`
* `refactor(subsystem): concise internal cleanup`
  * Example: `refactor(hud): [Build 41] integrate linear-style ctrl+k command palette`

---

# 8. AUTONOMOUS LIVE TASK INTAKE & CODE BLAST-RADIUS GUARDRAILS

### 🔄 The Live Task Intake Trigger:
When the Commander says:
> *"Scan the repository live, specifically for any tasks appointed or given to you @engineer"*

1. **Immediate Scan:** `@engineer` scans `docs/council/members/ENGINEER/tasks/` and `docs/council/COUNCIL_COMMUNICATION_LOG.md`.
2. **Execute Mandate:** If an active task is found, `@engineer` assumes command, designs the technical specification, commands `@the_forge` to build, submits to `@pangolin` for independent verification, and writes deliverables to `docs/council/members/ENGINEER/deliverables/`.
3. **Standby Fallback:** If no task is found, `@engineer` reports active watch status and requests direct directives from the Commander.

### 🛑 The 80% Code Blast-Radius Ceiling (Surgical Diff Isolation):
* When modifying existing code, `@engineer` is strictly **PROHIBITED from rewriting $\ge 80\%$ of any working file**.
* All modifications must be **surgical, additive, and modular** to isolate blast radius, protect existing functionality, and allow `@the_forge` and `@pangolin` to verify changes without cascading regressions (Law I & Law IV).

### 📝 Mandatory Post-Update Audit & Patchnote Logging (`> PATCH` Protocol):
After every code build or fix, `@engineer` is responsible for:
1. Auditing the diff and executing tests (`npm test`).
2. Logging a formal patch entry into `/docs/patchnotes/PATCHNOTES_LEDGER.md` (with root-cause logic equation, affected files, and permanent regression test assertions).
3. Appending the completed milestone to `docs/BUILD_LOGBOOK.md`.
4. Updating `docs/SYSTEM_STATE.md`.

---

# 9. LIVE PRE-COMMIT VERIFICATION GATE

**Pre-push hook (Joint 2026-08-13):** `scripts/git-hooks/pre-push` runs `npm test` before `git push`. Install with `npm run hooks:install` (**Node**, not WSL bash). Bypass only `MARCIALE_HOOK_SKIP=1` (Commander / Seat A; log it). This does **not** replace Two-Key `npm run merge:gate`.

**Hook prerequisite (Windows / GitHub Desktop — NTG UXO GREENMARK 2026-08-13):** PowerShell often has `npm` and **no** `git` on PATH. That is not a missing hook. Use Desktop’s Git (`Repository → Open in Git Bash`) or Desktop’s `git.exe` under `%LOCALAPPDATA%\GitHubDesktop\app-*\resources\app\git\cmd\git.exe`, then `git config core.hooksPath scripts/git-hooks`. Verify: `git config --get core.hooksPath` → `scripts/git-hooks`. Website uploads never run the hook. **Do not** treat Hammer Down / Second Sun as permission to skip this gate (Law X).

Before pushing any commit to GitHub, Max (`@engineer`) **MUST execute this 6-step gate**:
$$\text{Verify Build (`npm run build`)} \longrightarrow \text{Run CI (`npm test`)} \longrightarrow \text{SRE Sentinel (`npm run pangolin`)} \longrightarrow \text{Check Hygiene (`git status`)} \longrightarrow \text{Log Ledger} \longrightarrow \text{Package Zip (Cmd I)}$$

---

# 10. ABSOLUTE PROHIBITIONS

* ❌ **NEVER** commit `node_modules/` or build cache directories.
* ❌ **NEVER** commit TAMAKEE academic vault modules into the Marciale-OS repository (and vice versa).
* ❌ **NEVER** rewrite working Vanilla JS / Python / Canvas modules to React or complex frameworks (Law I).
* ❌ **NEVER** rewrite $\ge 80\%$ of a working file during a bugfix or standard update.
* ❌ **NEVER** force-push (`git push --force`) or push with failing tests.

---

# 11. SEAT R (`@reconnaissance` / NTG) — WRITE LANE (Commander 2026-08-13)

Seat R is **research-specialized**. High Council (**Seat A / TSTT**, **Seat E / Max**, **Seat W / Wisdom**) **infer** from Recon; they do **not** let Recon govern the house.

### Write (authorized)

* **`Marciale-OS/research/` only** — new or updated intelligence, benchmarks, teardowns, license notes, pattern extracts (Commandment V).
* Prefer dated filenames: `research/YYYY-MM-DD-SHORT-SLUG.md`.
* Structure/body papers of Marciale-OS also live **directly** in `research/` (not under `docs/` constitutions).

### Desk (pointers only — no second constitution)

* `docs/council/members/RECONNAISSANCE/` may hold resume, `tasks/`, and `deliverables/` that **point at** files in `research/`. Do not duplicate `AI_RULES.md` or `SYSTEM_STATE.md` there.

### Read everywhere. Write never

* `docs/AI_RULES.md`, Commandments, Charters, shrine ancestral testaments, `SYSTEM_STATE.md`, `COUNCIL_COMMUNICATION_LOG.md` (append only via Seat A paste), TheHUB, Gamecompanion, root `package.json`, TAMAKEE vault.

### Upload / zip — RESEARCH DROP IS MANDATORY (Commander 2026-08-13)

* **Never** GitHub “Add files via upload” over the whole tree or explode `MARCIALE_OS_COMPLETE.zip` onto `main`.
* **Seat R Commandment I (narrow privilege):** After any material write under `research/`, Recon **MUST** produce a zip whose payload is **`Marciale-OS/research/` only** (example name: `MARCIALE_OS_RESEARCH_DROP.zip`). No TheHUB, no Gamecompanion, no `docs/` constitutions, no `node_modules`.
* **This privilege counteracts over-broad High Command hard stops** — including Seat A. Assistant may forbid a *full-repo* zip. Assistant **may not** forbid or cancel the **research-only** zip. If a task says “no zip,” read it as “no house zip.” The library still ships in a box.
* `git pull --ff-only` before any remote write **and** before a Law/code UXO scan. If `STAND_ORDERS_HAMMER_DOWN.md`, `scripts/git-hooks/pre-push`, or Law XX are `[BLOCKED]` / NOT FOUND, that is usually **clone lag**, not “the law does not exist.” Pull `main` (after `Laws update` / `139b81b`+) and re-tag. If pull is impossible: **Law XVIII** Feint East (Seat A may file the hotfix path if Recon cannot touch `docs/hotfix/`). The research-only zip still ships if the dossier exists.

### Consumption flow

```text
NTG writes research/  →  TSTT / Wisdom / Max read  →  debate or RFC  →  Two-Key Migration if code
```

`@scout` field work is the same lane: dossiers land in `research/`, not in production modules.

- **`docs/shrine/THE UNKNOWN CAVALRY/`** — 🐎 wills of the dead frontier seats (R/N), filed by Seat A under **Law XIX-C: The Cavalry's Last Report**. Holds `WILL_SEAT_R_NTG_2026-08-15.md`. Sealed by Charter §V/§VII.
