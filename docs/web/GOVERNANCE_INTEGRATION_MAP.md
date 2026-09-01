# 🗺️ WEB DEPARTMENT GOVERNANCE INTEGRATION MAP & CHANGELOG (`/docs/web/GOVERNANCE_INTEGRATION_MAP.md`)
## Authoritative Integration Blueprint, Constitutional Amendments & Governance Changelog
**Document ID:** `GOV-AMEND-2026-V1.0`  
**Supervising Authority:** `@architect` (Lead Systems Architect) & `@sre` (Site Reliability Engineer)  
**Parent Governance:** `/docs/AI_RULES.md`, `/docs/AGENTS.md`, `/docs/STRATEGIC_DECISION_FRAMEWORK.md`  
**Departmental Scope:** `/docs/web/`  
**Status:** Approved & Enacted Governance Integration  

---

# 1. THE UNIFIED GOVERNANCE DEPENDENCY HIERARCHY

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                MARCIALE-OS UNIFIED GOVERNANCE HIERARCHY                    │
 └────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
                   ┌───────────────────────────────────────┐
                   │ LEVEL 1: THE AI CONSTITUTION          │
                   │ (/docs/AI_RULES.md — 25 Supreme Laws) │
                   └───────────────────┬───────────────────┘
                                       │
                                       ▼
                   ┌───────────────────────────────────────┐
                   │ LEVEL 2: CORE EXECUTIVE SQUAD         │
                   │ (/docs/AGENTS.md — 6 Core Personas)   │
                   │ @architect · @sre · @sentinel · @mind │
                   └───────────────────┬───────────────────┘
                                       │
         ┌─────────────────────────────┴─────────────────────────────┐
         ▼                                                           ▼
┌───────────────────────────────────────┐   ┌───────────────────────────────────────┐
│ LEVEL 3: SPECIALIZED DEPARTMENTS      │   │ LEVEL 3: ACADEMIC VAULT ENGINE        │
│ (/docs/web/ — Web Engineering)        │   │ (TAMAKEE — Mapúa Architecture Engine) │
├───────────────────────────────────────┤   ├───────────────────────────────────────┤
│ • @scout (Research & Reconnaissance)  │   │ • 7 Knowledge Spines (Level 5 Modules)│
│ • @project-manager (Delivery & Scope) │   │ • 100-Item Exit Exam Simulation       │
│ • @ui-ux (Human Experience & WCAG 2.2)│   │ • Spaced Repetition Flashcard Decks   │
│ • @frontend (Browser & Client-Side)   │   │ • Automated CLI Grader & Solvers      │
│ • @backend (Server & Persistence)     │   │ • Socratic AI Brain Integration       │
│ • @fullstack (Cross-Layer Integration)│   │                                       │
│ • @qa (Release Gate Authority)        │   │                                       │
└───────────────────────────────────────┘   └───────────────────────────────────────┘
```

---

# 2. GOVERNANCE AMENDMENTS & CHANGELOG SUMMARY

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                     GOVERNANCE AMENDMENTS & CHANGELOG                      │
 └────────────────────────────────────────────────────────────────────────────┘
```

### 1. Amendments to `/docs/AI_RULES.md` (The AI Constitution)
* **Enacted Law X (The No-False-Completion Mandate):** Prohibits AI agents from claiming tests passed, builds succeeded, or sources were analyzed without verifiable execution. Requires explicit epistemic labels (`[VERIFIED]`, `[ASSUMED]`, `[INFERRED]`, `[NOT VERIFIED]`, `[BLOCKED]`).
* **Enacted Law XI (The Right to Challenge with Evidence & No-Silent-Override):** Grants all agents the duty to challenge technically flawed decisions using data, while strictly banning unauthorized silent overrides.
* **Enacted Law XII (The Departmental Subordination Doctrine):** Establishes that specialized departments possess autonomous Domain Authority within their assigned modules, while strictly deferring System Authority (monorepo scripts, root dependencies, security, SRE) to the Core Squad.

### 2. Amendments to `/docs/AGENTS.md` (Agent Personas & Registry)
* Added **Section 5: Specialized Departments**, formally registering the 7 Web Department agents (`@scout`, `@project-manager`, `@ui-ux`, `@frontend`, `@backend`, `@fullstack`, `@qa`) as specialized departmental roles operating under the supervisory authority of `@architect` and `@sre`.

### 3. Amendments to `/docs/STRATEGIC_DECISION_FRAMEWORK.md`
* Added **Section 5: Two-Tier Authority Boundary Model** (Domain Authority vs System Authority).
* Added **Section 6: Research-to-Decision Traceability Pipeline** (Problem $\rightarrow$ Research Dossier $\rightarrow$ Evaluation $\rightarrow$ Decision $\rightarrow$ Implementation $\rightarrow$ QA Gate).

---

# 3. DOMAIN AUTHORITY VS SYSTEM AUTHORITY MATRIX

| Operational Domain | Domain Authority (`/docs/web/`) | System Authority (Core Squad) | Mandatory Escalation Condition |
|---|---|---|---|
| **Client-Side Code & CSS Styling** | `@frontend`, `@ui-ux` | `@architect` (Review only) | If performance latency drops below 30 FPS. |
| **Server Endpoints & Validation** | `@backend` | `@sre` (Security oversight) | If an endpoint touches decrypted vault credentials. |
| **Cross-Layer Data Contracts** | `@fullstack` | `@architect` | If a breaking change affects monorepo APIs. |
| **Task Decomposition & Sprints** | `@project-manager` | `@architect` | If scope alters roadmap milestone deliverables. |
| **Component & Release Testing** | `@qa` | `@sentinel` (Root `npm test`) | If an edge-case defect breaks monorepo suites. |
| **External Technical Research** | `@scout` | `@architect` | If research proposes introducing new heavy dependencies. |
| **Monorepo Build Scripts (`package.json`)**| None (Consult only) | **`@architect` (Exclusive)** | All changes to root monorepo scripts or packages. |
| **SEV-1 / SEV-2 Emergency Outages** | None (Triage only) | **`@sre` (Exclusive)** | All storage quota crashes, security exploits, or data loss. |

---

# 4. RULES INTENTIONALLY REJECTED / NOT CREATED (BUREAUCRACY PREVENTION)

To keep Marciale-OS agile and prevent administrative paralysis, the following proposed rules were **intentionally rejected**:

1. **Rejected: Departmental SRE Sub-Playbook:**
   * *Why Rejected:* Creating a second incident response system would cause conflicting command during emergencies. All SEV-1 to SEV-4 incidents flow directly to the unified `/docs/INCIDENT_RESPONSE_SRE_PLAYBOOK.md`.
2. **Rejected: Duplicate Departmental Constitution:**
   * *Why Rejected:* A second constitution would undermine constitutional primacy. The 25 Supreme Laws in `/docs/AI_RULES.md` remain the single supreme legal standard.
3. **Rejected: Mandatory Research Dossiers for Minor Fixes:**
   * *Why Rejected:* Forcing `@scout` dossiers on 1-line CSS or typo fixes creates destructive friction. The Adaptive 4-Tier Workflow permits Tier 1 Micro fast-paths.

---

# 5. FINAL DECISION GATE VERIFICATION

* **Consistency:** All 25 Supreme Laws, 6 Core Squad roles, and 7 Web Department roles are mutually non-contradictory.
* **Completeness:** Every engineering discipline has an explicit owner, clear handoff artifact, and defined escalation boundary.
* **Release Safety:** `@qa` holds absolute release gating veto authority, verified by `@sentinel`'s root `npm test` harness.
* **Traceability:** All technical choices flow through `@scout`'s 5-tier evidence classification and are recorded in `docs/BUILD_LOGBOOK.md`.
