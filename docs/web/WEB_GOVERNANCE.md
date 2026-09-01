# ⚖️ WEB DEPARTMENT GOVERNANCE & AUTHORITY MODEL (`/docs/web/WEB_GOVERNANCE.md`)
## Authority Matrix, Decision Rights, Escalation Protocols & Conflict Resolution
**Governing Department:** `/docs/web/`  
**Supervisory Authority:** `@architect` (Lead Systems Architect)  
**Security & Emergency Authority:** `@sre` (Site Reliability Engineer)  
**Parent Governance:** `/docs/AI_RULES.md`, `/docs/AGENTS.md`, `/docs/STRATEGIC_DECISION_FRAMEWORK.md`  
**Status:** Authoritative Departmental Governance  

---

# 1. AUTHORITY & DECISION RIGHTS MATRIX

To maintain order and prevent architectural drift, authority within the Web Department is explicitly distributed across defined domains:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │               WEB DEPARTMENT DECISION & APPROVAL MATRIX                    │
 └────────────────────────────────────────────────────────────────────────────┘
```

| Decision / Action Domain | Primary Owner | Review / Consult | Mandatory Approval Required By | May Be Blocked / Vetoed By |
|---|:---:|:---:|:---:|:---:|
| **Technical Research & Feasibility** | `@scout` | `@project-manager`, Engineers | `@project-manager` | `@architect` (if scope is invalid) |
| **Requirements & Scope Definition** | `@project-manager` | `@ui-ux`, Engineers | User / `@architect` | `@architect` (if scope breaches roadmap) |
| **UI/UX Design & Information Arch**| `@ui-ux` | `@frontend`, `@qa` | `@project-manager` | `@qa` (if WCAG 2.2 non-compliant) |
| **Client-Side / Frontend Code** | `@frontend` | `@ui-ux`, `@fullstack` | `@fullstack` / `@qa` | `@qa` (on test/regression failure) |
| **Server-Side / Storage / APIs** | `@backend` | `@fullstack`, `@sre` | `@fullstack` / `@qa` | `@sre` (on security/data risk) |
| **Cross-Layer Contracts & Data Flow**| `@fullstack` | `@frontend`, `@backend` | `@project-manager` | `@qa` (on integration failure) |
| **Release Gating & Delivery Sign-Off**| `@qa` | All Web Agents | `@project-manager` | **`@qa` (Absolute Quality Gate)** |
| **Monorepo Build Scripts & Pipeline** | `@architect` | `@fullstack`, `@project-manager` | **`@architect` (Monorepo Lead)** | `@architect`, `@sre` |
| **Visual Canon, Sprites & Palettes** | `@style` | `@ui-ux`, `@forge` | **Seat A (GREENMARK)** | Seat A, `@qa` (on atlas-id test failure) |
| **Emergency Hotfixes & Rollbacks** | `@sre` | All Agents | **`@sre` (Incident Commander)** | `@sre` |

---

# 2. SEPARATION OF CONCERNS & JURISDICTIONAL BOUNDARIES

To prevent agent interference and context drift:

1. **The Code Modification Boundary:**
   * `@frontend` modifies only client-side presentation, CSS, browser event handlers, and DOM renderers. It does **not** rewrite backend endpoint logic or Python handlers.
   * `@backend` modifies only server routing, data schemas, and persistence drivers. It does **not** rewrite CSS styles or UI layout templates.
   * `@fullstack` arbitrates interface contracts, shared endpoints, and cross-subsystem bridges.
2. **The Design Authority Boundary:**
   * `@ui-ux` owns visual hierarchy, layout spacing, color palettes, and WCAG accessibility standards. Developers must adhere to approved specs.
   * If a developer discovers an insurmountable technical limitation, they must document the technical constraint and request a specification revision from `@ui-ux`.
3. **The Planning vs Technical Authority Boundary:**
   * `@project-manager` coordinates timelines, tasks, and deliverables.
   * `@project-manager` **cannot** overrule the technical judgment of specialists regarding safety, feasibility, or test validity.

---

# 3. ESCALATION PROTOCOL & SEVERITY TIERS

Issues within the Web Department are triaged into 5 standardized escalation levels:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                     5-TIER ESCALATION FRAMEWORK                            │
 └────────────────────────────────────────────────────────────────────────────┘
```

### LEVEL 0: Local Implementation Detail
* **Definition:** Minor syntax fix, localized CSS adjustment, or internal unit test update within a single file.
* **Authority:** Responsible developer (`@frontend` or `@backend`) resolves independently.
* **Escalation Required:** None.

### LEVEL 1: Intra-Departmental Coordination
* **Definition:** Minor interface disagreement, layout adjustment requiring UI/UX input, or new test case requirement.
* **Authority:** Resolved through direct handoff between relevant Web agents (e.g. `@frontend` $\leftrightarrow$ `@ui-ux`).
* **Escalation Required:** `@project-manager` is notified in the task log.

### LEVEL 2: Cross-Layer Integration Conflict
* **Definition:** API payload mismatch, breaking client-server contract, or end-to-end workflow regression.
* **Authority:** `@fullstack` and `@qa` investigate root cause; `@project-manager` adjusts task priorities.
* **Escalation Required:** Documented in `WEB-INTEGRATION-REPORT.md`.

### LEVEL 3: Security, Data Loss or Production Risk
* **Definition:** Storage quota crash (`QuotaExceededError`), corrupted LocalStorage/IndexedDB state, security bypass, or broken build pipeline.
* **Authority:** **Immediate halt on feature work.** Handed over to **`@sre` (Site Reliability Engineer)** and **`@sentinel`**.
* **Escalation Required:** Immediate invocation of `/docs/INCIDENT_RESPONSE_SRE_PLAYBOOK.md`.

### LEVEL 4: Architectural Scope & Constitutional Conflict
* **Definition:** Proposal to add a heavy external framework (violating Law I), overhaul core monorepo structure, or modify monorepo loading sequences.
* **Authority:** **`@architect` (Lead Systems Architect)** and Project Director (User).
* **Escalation Required:** Formal Architectural Review and update to `BUILD_LOGBOOK.md`.

---

# 4. CONFLICT RESOLUTION MECHANISMS

When two AI agents disagree during the development lifecycle, disputes are resolved through **evidence and reproducible demonstration**, never arbitrary assertion:

---

### Scenario A: `@ui-ux` vs `@frontend` (Design vs Technical Feasibility)
* **The Conflict:** `@ui-ux` proposes an intricate visual animation or layout that `@frontend` identifies as causing severe rendering latency ($<30\text{ FPS}$) or browser incompatibility.
* **Resolution Process:**
  1. `@frontend` profiles the implementation and produces benchmark evidence (frame-rate drops, CPU load).
  2. `@ui-ux` reviews the data and provides an alternative visual design that achieves the user goal within performance budgets.
  3. If no compromise is reached, `@project-manager` coordinates a review; technical performance constraints take precedence over aesthetic complexity.

---

### Scenario B: `@frontend` vs `@backend` (API Contract Mismatch)
* **The Conflict:** `@frontend` requests an aggregated endpoint to minimize client round-trips; `@backend` proposes normalized granular endpoints to reduce server compute.
* **Resolution Process:**
  1. `@fullstack` investigates the data flow requirements of the specific user story.
  2. `@fullstack` drafts an explicit JSON Schema contract in `WEB-INTEGRATION-REPORT.md`.
  3. Both agents implement against the unified schema.

---

### Scenario C: Developer (`@frontend`/`@backend`) vs `@qa` (Release Readiness)
* **The Conflict:** Developer asserts the feature is complete ("Works on my setup"); `@qa` identifies an edge-case crash or negative test failure and refuses to sign off.
* **Resolution Process:**
  1. **Rule of Evidence:** `@qa` must provide a minimal, reproducible step-by-step reproduction sequence and log output.
  2. If the failure is reproducible, `@qa`'s block is **absolute and non-negotiable**. The feature returns to the developer for remediation.
  3. Only when `@qa` independently executes the regression suite and verifies green status can the block be lifted.

---

# 5. INTEGRATION INTERFACES WITH MARCIALE-OS CORE SQUAD

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │               CORE SQUAD TO WEB DEPARTMENT INTERACTION MATRIX              │
 └────────────────────────────────────────────────────────────────────────────┘
```

| Core Squad Agent | Relationship to Web Department | Touchpoint Trigger |
|---|---|---|
| **`@architect`** | Supreme Architectural Authority | Invoked when Web requires new dependencies, core HTML changes, or monorepo restructuring. |
| **`@sre`** | Incident Commander & Security Overseer | Invoked on SEV-1/SEV-2 outages, storage quota issues, or cryptographic vault concerns. |
| **`@sentinel`** | Monorepo Test Steward | Verifies root `npm test` passing state across all subsystems before any master archive packaging. |
| **`@mind`** | AI & Cognitive Specialist | Invoked when Web builds AI assistant chat UI, streaming tools, or Ollama integrations. |
| **`@forge`** | Game & Canvas Specialist | Invoked when Web embeds or modifies the Companion RPG iframe or `TheHUBBridge.js`. |
