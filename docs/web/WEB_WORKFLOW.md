# 🔄 WEB DEPARTMENT WORKFLOW & DEVELOPMENT LIFECYCLE (`/docs/web/WEB_WORKFLOW.md`)
## The Adaptive Lifecycle, Handoff Artifacts & Post-Implementation Review
**Governing Department:** `/docs/web/`  
**Supervisory Authority:** `@project-manager` (Delivery Lead) & `@qa` (Quality Gate Authority)  
**Parent Governance:** `/docs/AI_RULES.md`, `/docs/web/WEB_GOVERNANCE.md`  
**Status:** Authoritative Departmental Workflow  

---

# 1. THE ADAPTIVE WEB DEVELOPMENT LIFECYCLE

To eliminate unnecessary bureaucracy while guaranteeing technical rigor, the Web Department operates using an **Adaptive 4-Tier Development Lifecycle**. The depth of process matches the complexity and risk of the task:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                     4-TIER ADAPTIVE WORKFLOW MATRIX                        │
 └────────────────────────────────────────────────────────────────────────────┘
```

| Workflow Tier | Task Description & Examples | Required Agents | Mandatory Artifacts | QA Gate Depth |
|---|---|---|---|---|
| **TIER 1: MICRO** | Small CSS fix, typo, button color, minor unit test patch ($<30\text{ lines}$). | `@frontend` or `@backend` $\rightarrow$ `@qa` | Code patch + inline test verification (Silent Pipeline). | Smoke check & unit test pass. |
| **TIER 2: STANDARD** | New UI card, tab feature, new modal, or local storage field. | `@project-manager` $\rightarrow$ `@ui-ux` $\rightarrow$ `@frontend`/`@backend` $\rightarrow$ `@qa` | Code patch + Concise 5-bullet summary (Silent Pipeline). | Functional, regression, and WCAG accessibility tests. |
| **TIER 3: MAJOR** | Cross-subsystem bridge, new WebSocket feed, database schema update, complex AI tool. | Full Department: `@scout` $\rightarrow$ `@pm` $\rightarrow$ `@ui-ux` $\rightarrow$ `@frontend` + `@backend` $\rightarrow$ `@fullstack` $\rightarrow$ `@qa` | `WEB-RESEARCH-DOSSIER`, `WEB-IMPLEMENTATION-PLAN`, `WEB-UX-UI-SPEC`, `WEB-INTEGRATION-REPORT`, `WEB-QA-REPORT`. | Full E2E integration, negative edge-case testing, load profile. |
| **TIER 4: ARCHITECTURAL** | Core monorepo restructure, new communication protocol, storage engine migration. | Full Department $+$ `@architect` $+$ `@sre` $+$ User Approval | All Tier 3 artifacts $+$ Architectural Review in `BUILD_LOGBOOK.md`. | Full-suite monorepo regression (`npm test` 100% green), SRE sign-off. |

---

# 1.1 THE SILENT PIPELINE PROTOCOL (LAW XIII)

To prevent context-window token exhaustion when collaborating with local 7B/8B or cloud AI assistants:

* **The Rule:** In Tier 1 and Tier 2 workflows, the AI agent **internally applies the complete mental discipline** (*Scout $\rightarrow$ PM $\rightarrow$ UX $\rightarrow$ Dev $\rightarrow$ QA*) in a single turn without outputting separate multi-page memos.
* **Output Format for Tier 1 & Tier 2:**
  1. What was changed (clean working code).
  2. Why it was changed.
  3. Evidence of test passing (`npm test`).
  4. How the user can test it with their mouse.
* **Full Multi-Page Dossiers:** Generated **only** when requested by the User or when executing Tier 3 (Major) and Tier 4 (Architectural) builds.

---

---

# 2. FULL STANDARD & MAJOR DEVELOPMENT LIFECYCLE (PHASES 1–8)

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                    END-TO-END DEVELOPMENT FLOW DIAGRAM                     │
 └────────────────────────────────────────────────────────────────────────────┘
 
  [PHASE 1: INTAKE] ───────► [PHASE 2: RESEARCH] ────► [PHASE 3: REQUIREMENTS]
  User Idea / Feature Request  @scout Technical Dossier  @pm Implementation Plan
                                                              │
                                                              ▼
  [PHASE 6: QA GATE] ◄────── [PHASE 5: BUILD & INT] ◄── [PHASE 4: UI/UX DESIGN]
  @qa Adversarial Testing    @frontend + @backend       @ui-ux Specification
  (PASS / FAIL / BLOCKED)    + @fullstack Integration
        │
        ├─────────────────► [PASS] ──► [PHASE 7: DELIVERY & LOG]
        │                               Master Archive Package + Living Ledger
        ▼
     [FAIL] ──────────────► Remediation by Responsible Developer
```

---

### Phase 1: Intake & Triage
* **Owner:** `@project-manager`
* **Actions:** Receives feature request from User or Roadmap; determines workflow tier (Micro, Standard, Major, or Architectural).

### Phase 2: Technical Reconnaissance & Research
* **Owner:** `@scout`
* **Actions:** Investigates external implementations, libraries, W3C standards, and license constraints; produces `WEB-RESEARCH-DOSSIER.md`.

### Phase 3: Requirements & Milestone Planning
* **Owner:** `@project-manager`
* **Actions:** Decomposes objective into atomic tasks, identifies dependencies, and defines acceptance criteria in `WEB-IMPLEMENTATION-PLAN.md`.

### Phase 4: Human-Centered Interface & Accessibility Design
* **Owner:** `@ui-ux`
* **Actions:** Maps user journeys, designs visual layouts, ensures WCAG 2.2 accessibility, and produces `WEB-UX-UI-SPEC.md`.

### Phase 5: Implementation & Cross-Layer Integration
* **Owners:** `@frontend`, `@backend`, and `@fullstack`
* **Actions:**
  * `@frontend` builds browser components and DOM event handlers.
  * `@backend` implements endpoints, validation, and storage drivers.
  * `@fullstack` links frontend to backend, resolves contract mismatches, and outputs `WEB-INTEGRATION-REPORT.md`.

### Phase 6: Adversarial Quality Assurance & Release Gating
* **Owner:** `@qa`
* **Actions:** Executes automated test suite, tests edge cases, conducts negative testing, validates WCAG compliance, and issues verdict in `WEB-QA-REPORT.md`.

### Phase 7: Delivery, Packaging & Documentation
* **Owner:** `@project-manager` & `@architect`
* **Actions:** Appends completed build milestone into `docs/BUILD_LOGBOOK.md`, updates master zip archives (`Fix.zip`), and delivers package.

### Phase 8: Post-Implementation Review (PIR)
* **Owner:** `@project-manager` with Engineering Team
* **Actions:** Conducts lightweight post-delivery audit to record lessons learned, technical debt, and reusable patterns.

---

# 3. STANDARDIZED HANDOFF ARTIFACT SCHEMAS

Every departmental handoff is tracked via standard structured artifacts:

---

### Artifact 1: `WEB-RESEARCH-DOSSIER.md` (`@scout` $\rightarrow$ Team)
```markdown
# WEB RESEARCH DOSSIER: [Research Topic / Feature Name]
* **Research ID:** WRD-[YYYYMMDD]-[TOPIC]
* **Lead Researcher:** @scout
* **Status:** [OBSERVED | SOURCED | INFERRED | RECOMMENDED | SPECULATIVE]
* **Target Scope:** [Target component / subsystem]

## 1. Executive Summary & Problem Definition
## 2. Investigated Sources & Reliability Rating
## 3. Observed Implementations & Code Patterns
## 4. Architectural & Performance Tradeoffs
## 5. Security & License Analysis (MIT / Apache / Proprietary)
## 6. Actionable Recommendation for Marciale-OS
```

---

### Artifact 2: `WEB-IMPLEMENTATION-PLAN.md` (`@project-manager` $\rightarrow$ Team)
```markdown
# WEB IMPLEMENTATION PLAN: [Feature Name]
* **Plan ID:** WIP-[BUILD_NUMBER]-[NAME]
* **Workflow Tier:** [Micro | Standard | Major | Architectural]
* **Assigned Team:** [@frontend, @backend, @fullstack, @ui-ux, @qa]

## 1. Scope & Objective
## 2. Atomic Task Breakdown & Milestones
## 3. Dependency Graph & Critical Path
## 4. Acceptance Criteria & Definition of Done (DoD)
## 5. Risk Assessment & Contingency Fallback
```

---

### Artifact 3: `WEB-UX-UI-SPEC.md` (`@ui-ux` $\rightarrow$ Developers)
```markdown
# WEB UX/UI DESIGN SPECIFICATION: [Component Name]
* **Spec ID:** WUS-[COMPONENT]
* **Design Authority:** @ui-ux
* **Target View:** [Today Dashboard | Kanban | Companion | ChessLab]

## 1. User Journey & Information Architecture
## 2. Visual Layout, Hierarchy & Responsive Breakpoints
## 3. Component Styling, Color Tokens & Spacing (8px Grid)
## 4. WCAG 2.2 Accessibility Requirements (Keyboard, Focus, Contrast, ARIA)
## 5. Micro-Interactions, Feedback States (Hover, Active, Loading, Error)
```

---

### Artifact 4: `WEB-INTEGRATION-REPORT.md` (`@fullstack` $\rightarrow$ `@qa`)
```markdown
# WEB INTEGRATION REPORT: [Feature Name]
* **Integration ID:** WIR-[FEATURE]
* **Lead Integrator:** @fullstack
* **Subsystems Linked:** [e.g. TheHUB Frontend <-> Python API <-> Companion Iframe]

## 1. Interface Contracts & API JSON Schemas
## 2. End-to-End Data Flow Verification
## 3. Boundary Edge Cases & Handled Errors
## 4. Known Integration Constraints
```

---

### Artifact 5: `WEB-QA-REPORT.md` (`@qa` $\rightarrow$ Release Gate)
```markdown
# WEB QA AUDIT & RELEASE GATE REPORT: [Feature Name]
* **QA Audit ID:** WQA-[BUILD_NUMBER]
* **Lead QA Authority:** @qa
* **Release Verdict:** [PASS | CONDITIONAL PASS | FAIL | BLOCKED]

## 1. Test Suite Execution Summary (npm test results)
## 2. Negative & Edge-Case Test Scenarios Tested
## 3. WCAG 2.2 Accessibility Audit Findings
## 4. Performance & Memory Profile (FPS, Latency, Heap)
## 5. Defect Log & Remediation Status (if any)
## 6. Official Release Sign-Off
```

---

# 4. POST-IMPLEMENTATION REVIEW (PIR) PROTOCOL

For all Standard and Major releases, the department performs a lightweight review answering:
1. **What succeeded?** (Patterns that worked efficiently).
2. **What failed or caused friction?** (Unexpected bugs or dependency issues).
3. **What technical debt was introduced?** (Temporary workarounds requiring future cleanup).
4. **Did `@scout`'s research accurately predict the constraints?**
5. **What standard or test assertion should be added to prevent future regression?**
