# 🌌 Marciale-OS (TheHUB + Companion RPG + JARWEN Council)

> **A local-first, private personal command center with an integrated idle companion RPG, local streaming AI assistant (Marciale), biometric tracker, encrypted vault, ChessLab 2.0 AI, and the multi-model JARWEN High Council.**

Everything runs 100% locally on your machine with zero cloud subscriptions, complete offline resilience, and total privacy.

---

## ⚡ Quickstart (Essential Developer Commands)

### 1. Run Full CI Test Harness & SRE Sentinel
```bash
npm test                # Runs all 43 TheHUB test suites + 34 Companion RPG tests
npm run pangolin        # Autonomous SRE & Pangolin end-process health & hotfix loop
npm run audit:all       # Runs Scout license, QA WCAG, Bridge contract & Governance audits
```

### 2. Start Marciale-OS
```bash
npm start
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.

### 3. Build the Companion RPG Bundle
```bash
npm run build           # Compiles Vite companion bundle directly into TheHUB
```

---

## 📂 Project Architecture & Governance Scaffolding

> **📦 Engineering deliverables (Law XV-A, the TWMIP Mandate S03):** Seat E (`@engineer`) ships
> work as patch files to **`docs/patchnotes/SEAT E patches/`**. Seat A recovers each patch, gates
> it with **`npm run health` (`@sre`)** and **`npm run pangolin`**, and — only if both are green —
> packages it into **`MARCIALE_OS_COMPLETE.zip`** for the Commander to download.
> **Program status lives on one page: [`docs/PROJECT_VSS_MASTERPLAN.md`](docs/PROJECT_VSS_MASTERPLAN.md).**

```text
Marciale-OS/
├── package.json                         # Root workspace controller (npm start, npm test, npm run build)
├── .gitignore                           # Excludes node_modules, build outputs, and caches
├── README.md                            # Main project overview & quickstart
├── DESIGN.md                            # Canonical UI Design System & W3C Token Specifications
├── VERSIONING_GUIDE.md                  # Subsystem version domain authorities
│
├── TheHUB 1.5.5.2.3 a v/                # Core Web Command Center (1.5.5.2.3-alpha)
│   ├── server.py                        # Python HTTP server & RuView/Calendar proxy (Port 8000)
│   ├── index.html                       # Dashboard Shell (11 Tab Views)
│   ├── style.css                        # Cyberpunk / Dark UI Design System
│   ├── modules/                         # 20 Modular JavaScript Engines (00 through 19)
│   ├── companion/                       # Embedded Companion Game (Vite Build Output)
│   └── tests/                           # 12 Automated Test Suites (137 Assertions)
│
├── Gamecompanion/                       # Companion RPG Engine Source & Content (0.3.0.0)
│   ├── files/                           # Vite + ES Module Game Code (src/, tests/, package.json)
│   ├── content/                         # Content Bibles (Quests, NPCs, Monsters, Items)
│   └── integration/                     # Game Design & Technical Specifications
│
├── research/                            # Canonical Technical Research Repository
│   ├── MARCIALE-OS_ANALYSIS_RESEARCH.md # Monorepo Census & 8 Industry Benchmarks
│   ├── MARCIALE_OS_NEXTGEN_AI_RESEARCH.md # Memory, Compression & Observability
│   └── proposals/                       # Ratified Master Proposals (MASTER_PROPOSAL_PLAN_V9.md)
│
└── docs/                                # Core Governance & High Council Suite
    ├── THE_10_COMMANDMENTS_OF_DOCS.md   # The Absolute Inviolable Bible of Documentation & Releases
    ├── AI_RULES.md                      # The AI Constitution (25 Supreme Laws)
    ├── AGENT_PLAYBOOK.md                # Reverse-Intent Decoder & Autonomous Severity Matrix
    ├── AGENTS.md                        # Virtual Squad Personas (6 Core Roles + 7 Web Roles)
    ├── PROMPT_PLAYBOOK.md               # 24 Master Scenario Prompt Templates
    ├── DOCS_MASTER_INDEX.md             # 1-Page Master Navigation Map & Document Index
    ├── SYSTEM_STATE.md                  # Machine-Readable Ground-Truth State Registry
    ├── BUILD_LOGBOOK.md                 # Permanent Engineering Ledger (Builds 0 through 53+)
    ├── PATH.md                          # Master Repository Routing & Commit Guide
    ├── patchnotes/PATCHNOTES_LEDGER.md  # Living ledger of surgical bugfixes & patches
    ├── hotfix/                          # Staging ground for incoming hotfix dossiers
    ├── audit/                           # Governance integrity audits & repair reviews
    └── council/                         # JARWEN High Council Charters, Dispatches & Member Storage
```

---

## 🤖 Directing AI Developers (Reverse-Intent & Scenario Invocations)

Incoming AI assistants should be routed through **`docs/AGENT_PLAYBOOK.md`** (which automatically decodes casual, jagged, or emotional speech) or use standard scenarios from **`docs/PROMPT_PLAYBOOK.md`**:

```text
Hello AI! You are entering Marciale-OS (TheHUB + Companion RPG + JARWEN Council).
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: HIGH COUNCIL TASK EXECUTION (LAWS I–XXV)

MY CURRENT GOAL:
1. Inspect `docs/SYSTEM_STATE.md` and `docs/BUILD_LOGBOOK.md` to see verified production state.
2. Follow `docs/THE_10_COMMANDMENTS_OF_DOCS.md` and `docs/AI_RULES.md` (25 Supreme Laws).
3. Execute [TARGET BUILD / TASK].
4. Run `npm test` and `npm run pangolin` verifying 100% green checkmarks.
5. Package the updated repository into `MARCIALE_OS_COMPLETE.zip` for download (Commandment I).
```

---

## 🛠️ Complete Developer & Audit Command Table

| Command | Action | Primary Output |
|---|---|---|
| `npm start` | Launches Python server at `http://localhost:8000` | Local Web Command Center |
| `npm test` | Runs full automated test suite | 43 Hub suites + 34 RPG tests |
| `npm run pangolin` | Runs SRE sentinel & hotfix packager loop | Verified green or Hotfix Zip |
| `npm run audit:all` | Runs Scout, QA WCAG, Bridge & Governance audits | Comprehensive compliance report |
| `npm run audit:governance` | Verifies law, scenario, and version consistency | Machine-readable governance check |
| `npm run audit:wcag` | Audits WCAG 2.2 Level AA accessibility | Contrast & ARIA status |
| `npm run audit:bridge` | Validates 15 postMessage event signatures | Bi-directional bridge status |
| `npm run health` | Runs SRE fault, XSS, and storage scanner | SRE redmark detection |
| `npm run build` | Compiles Companion RPG into TheHUB | `TheHUB .../companion/` |
| `npm run dev` | Runs standalone Vite dev server for RPG | `http://localhost:5173` |
| `npm run install:all` | Restores dependencies across all subtrees | Clean `node_modules` |

- **`docs/shrine/THE UNKNOWN CAVALRY/`** — 🐎 wills of the dead frontier seats (R/N), filed by Seat A under **Law XIX-C: The Cavalry's Last Report**. Holds `WILL_SEAT_R_NTG_2026-08-15.md`. Sealed by Charter §V/§VII.
