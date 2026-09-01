# 🧭 WEB AGENT REGISTRY & TASK ROUTING MATRIX (`/docs/web/WEB_ROUTING_AND_REGISTRY.md`)
## Departmental Agent Directory, Intent Routing Rules & Escalation Pathways
**Governing Department:** `/docs/web/`  
**Supervisory Authority:** `@project-manager` & `@architect`  
**Parent Governance:** `/docs/web/WEB.md`, `/docs/web/WEB_GOVERNANCE.md`  
**Status:** Authoritative Routing Standard  

---

# 1. THE WEB AGENT DIRECTORY & REGISTRY

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │               WEB DEPARTMENT SPECIALIZED AGENT DIRECTORY                   │
 └────────────────────────────────────────────────────────────────────────────┘
```

| Agent Call Sign | Official Title | Core Mission | Primary Authority | Mandatory Outputs |
|---|---|---|---|---|
| **`@scout`** | Technical Intelligence Specialist | Investigate architectures, repos, standards & external patterns before implementation. | Technical research & source evaluation | `WEB-RESEARCH-DOSSIER.md` |
| **`@project-manager`** | Product & Delivery Lead | Decompose scope into milestones, manage dependencies, and coordinate releases. | Requirements, scheduling & task routing | `WEB-IMPLEMENTATION-PLAN.md` |
| **`@ui-ux`** | Human Experience Authority | Design intuitive user journeys, design systems, visual hierarchy, and WCAG accessibility. | Interface design & usability standards | `WEB-UX-UI-SPEC.md` |
| **`@frontend`** | Browser & Client-Side Engineer | Implement semantic HTML5, high-performance CSS, Vanilla JS modules, and DOM events. | Client-side code & browser performance | `WEB-FRONTEND-CHANGE-REPORT.md` |
| **`@backend`** | Server & Persistence Engineer | Build robust server APIs, data validation, storage drivers, and security filters. | Server code, data integrity & endpoints | `WEB-BACKEND-CHANGE-REPORT.md` |
| **`@fullstack`** | Cross-Layer Integration Engineer | Resolve boundaries between client and server, verify data flow, and fix E2E integration. | Cross-layer debugging & API contracts | `WEB-INTEGRATION-REPORT.md` |
| **`@qa`** | Quality Assurance Authority | Adversarially test edge cases, verify regressions, audit accessibility, and gate releases. | Release gate verification & sign-off | `WEB-QA-REPORT.md` |
| **`@style`** | Pixel / Sprite / Motion Conscience **(cell — NOT a Council Seat, NOT Seat F)** | Own canon fidelity, sprite silhouettes, palettes & atlas id integrity for TheHUB and Companion. Spec before pixels. | Visual canon & sprite specification — **proposal power only; Seat A disposes** | `research/STYLE_SPEC_YYYY-MM-DD_<id>.md` |

---

# 2. INTENT-BASED TASK ROUTING MATRIX

When a user or supervising agent presents an objective, use this standardized routing matrix to determine the primary handler:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                    TASK INTENT TO AGENT ROUTING MATRIX                     │
 └────────────────────────────────────────────────────────────────────────────┘
```

| User / System Prompt Intent | Primary Handler | Secondary Handler | Expected Output & Workflow Tier |
|---|:---:|:---:|---|
| *"How do other apps solve this? What open-source tools exist?"* | **`@scout`** | `@project-manager` | `WEB-RESEARCH-DOSSIER.md` (Tier 2/3) |
| *"Plan out this new feature into manageable milestones and steps."* | **`@project-manager`** | `@ui-ux`, Engineers | `WEB-IMPLEMENTATION-PLAN.md` (Tier 2/3) |
| *"This screen feels cluttered, hard to read, or fails contrast."* | **`@ui-ux`** | `@frontend` | `WEB-UX-UI-SPEC.md` (Tier 2) |
| *"Fix this button click, style glitch, or tab switching bug."* | **`@frontend`** | `@qa` | Code patch + `npm test` pass (Tier 1) |
| *"The server endpoint returns 500 error or fails to persist data."* | **`@backend`** | `@qa` | Server patch + API unit tests (Tier 1/2) |
| *"The frontend sends data but the backend rejects it / integration fails."* | **`@fullstack`** | `@qa` | `WEB-INTEGRATION-REPORT.md` (Tier 2/3) |
| *"Test this feature, find edge-case bugs, and verify if release-ready."* | **`@qa`** | Responsible Dev | `WEB-QA-REPORT.md` (Tier 2/3/4) |
| *"We need to add a major new framework or change root package.json."* | **`@architect`** | `@project-manager` | Architectural Review & Logbook (Tier 4) |
| *"The system is crashing on startup or data is being wiped."* | **`@sre`** | All Agents | Incident Triage & Emergency Patch (Tier 4) |
| *"This sprite looks wrong / who is this character meant to be / what palette?"* | **`@style`** | `@ui-ux`, `@forge` | `STYLE_SPEC_*.md` → **Seat A GREENMARK** (Tier 2) |
| *"Add a new hero, enemy, or loot id to the game data."* | **`@style`** | `@forge`, `@qa` | Spec + `SpriteAtlas.register()` **in the same bite** + `SpriteAtlas.test.js` green (Tier 2) |

---

# 3. INTER-AGENT HANDOFF TRIGGER PROTOCOL

```text
  ┌──────────────┐     Handoff: WEB-RESEARCH-DOSSIER.md
  │    @scout    │──────────────────────────────────────────┐
  └──────────────┘                                          │
                                                            ▼
  ┌──────────────┐     Handoff: WEB-IMPLEMENTATION-PLAN   ┌───────────────────┐
  │      @pm     │───────────────────────────────────────►│       @ui-ux      │
  └──────┬───────┘                                        └─────────┬─────────┘
         │                                                          │
         │                                                          ▼
         │             Handoff: WEB-UX-UI-SPEC.md         ┌───────────────────┐
         ├───────────────────────────────────────────────►│ @frontend/@backend│
         │                                                └─────────┬─────────┘
         │                                                          │
         │                                                          ▼
         │             Handoff: WEB-INTEGRATION-REPORT    ┌───────────────────┐
         └───────────────────────────────────────────────►│    @fullstack     │
                                                          └─────────┬─────────┘
                                                                    │
                                                                    ▼
                       Handoff: Code + Build Check        ┌───────────────────┐
                       ──────────────────────────────────►│        @qa        │
                                                          └─────────┬─────────┘
                                                                    │
                                                           PASS / FAIL Release Gate
```

---

# 4. THE `@style` VISUAL PIPELINE (Enacted 2026-08-14)

`@style` is a **cell, not a Council Seat.** It holds **proposal power only** — every spec is a proposal until **Seat A GREENMARK** (Law XIV, Law XIX). It **may not** commission Recon, write production JS, or claim a Council vote.

```text
  Commander  or  Seat A
        │
        ▼
  ┌─────────────┐   STYLE_SPEC_YYYY-MM-DD_<id>.md
  │   @style    │──────────────────────────────────┐
  └─────────────┘   (spec before pixels)           │
                                                   ▼
                                        ┌────────────────────┐
                                        │  SEAT A  GREENMARK │
                                        │  / UPDATE / CANCEL │
                                        └─────────┬──────────┘
                                                  │ authorized bite
                                                  ▼
                                        ┌────────────────────┐
                                        │      @forge        │
                                        │ PNG + register()   │
                                        │ + CanvasRenderer   │
                                        └─────────┬──────────┘
                                                  │
                                                  ▼
                                        ┌────────────────────┐
                                        │     @pangolin      │
                                        │ id completeness ·  │
                                        │ no-throw · npm test│
                                        └────────────────────┘
```

**Reporting lines:** `@ui-ux` (TheHUB) · `@engineer` / `@forge` (Companion). **Disposal authority:** Seat A.
**Governing document:** `/docs/web/style/STYLE.md` — authored by **Seat A Session 02 (TSTT)**, recovered by Session 03 (Law XVII-C).
**Hard gate:** every new `HeroId` / `EnemyId` / loot id **MUST** be registered or given a named placeholder **in the same bite as its data row**. Enforced by `Gamecompanion/files/tests/SpriteAtlas.test.js`.
**Forbidden pipelines:** Gemini HD-2D normal/roughness maps · Dead Cells 3D-to-2D skeletal bake · Taxpayer 18×18 React string matrices as production. See `research/civilian-artifacts/REJECTED_SEAT_F_STYLE_PROPOSAL_civilian.md`.
