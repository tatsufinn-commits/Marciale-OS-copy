# MARCIALE-OS — DOCUMENTATION & GOVERNANCE REPAIR DESIGN REVIEW
## Phase: Second-Pass Repair Blueprint, Epistemic Truth Modeling & Pre-Authorization Review
**Document ID:** `GOV-REPAIR-DESIGN-2026-V1.0`  
**Authoring Authority:** Systems Architecture & Diagnostics Lead  
**Audit Reference:** `/docs/audit/MARCIALE_OS_DOCUMENTATION_GOVERNANCE_INTEGRITY_AUDIT.md`  
**Governing Standard:** `Audit → Repair Design → User Authorization → Surgical Repair → Verification → Governance Baseline`  
**Status:** Pre-Authorization Review (Awaiting User Sign-Off)  

---

# 1. THE 3-TRUTH EPISTEMIC MODEL

To eliminate second-generation documentation drift, every statement, file, and proposed repair in Marciale-OS is evaluated against three distinct layers of truth:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │               THE 3-TRUTH EPISTEMIC MODEL FOR AI AGENTS                    │
 └────────────────────────────────────────────────────────────────────────────┘
                                       │
     ┌──────────────────┬──────────────┴──────────────┬──────────────────┐
     ▼                  ▼                             ▼                  ▼
┌─────────────┐  ┌─────────────┐               ┌─────────────┐    ┌─────────────┐
│ LAYER 1     │  │ LAYER 2     │               │ LAYER 3     │    │ EVALUATION  │
│ REPOSITORY  │  │ GOVERNANCE  │               │ DOCUMENT    │    │ SYNTHESIS   │
│ TRUTH       │  │ TRUTH       │               │ TRUTH       │    │ RULE        │
├─────────────┤  ├─────────────┤               ├─────────────┤    ├─────────────┤
│ What exists │  │ What is     │               │ What text   │    │ Match vs    │
│ on disk and │  │ formally    │               │ in any file │    │ Drift       │
│ in CI tests │  │ enacted     │               │ claims      │    │ Resolution  │
└─────────────┘  └─────────────┘               └─────────────┘    └─────────────┘
```

* **1. REPOSITORY TRUTH (Physical Reality):**
  * The actual working code, test runners, and configuration files on disk.
  * *Current State:* 43 TheHUB test suites / 137 assertions passing 100% green; 34 Companion RPG unit tests passing; 0 npm vulnerabilities; `HALF_LIFE_CAF_H = 5.7`; zero-asset Web Audio synthesis operational.
* **2. GOVERNANCE TRUTH (Constitutional Intent):**
  * What the project director and architecture council have formally ratified.
  * *Current State:* 13 Supreme Laws (Laws I–XIII); 6 Core Executive Roles (`@architect`, `@sentinel`, `@forge`, `@mind`, `@sre`, `@pangolin`); 7 Subordinate Web Department Roles; Law XIII Silent Pipeline.
* **3. DOCUMENT TRUTH (Written Prose):**
  * The raw text inside individual `.md` and `.txt` files.
  * *Current State:* Contains fragments claiming "8 Laws", "9 Laws", "12 Laws", "5 Core Roles", and references to external scripts.

**The Golden Repair Principle:** *We repair Document Truth to faithfully reflect Governance Truth and Repository Truth. We never destroy Historical Truth.*

---

# 2. THE "DO NOT FIX" (PRESERVATION) REGISTER

The following items are intentionally **locked and protected from modification**. They represent valid historical evidence, intentional compatibility shims, or parked research that must NOT be erased or normalized:

| Item / Document | Status | Reason for Preservation (Why It Must NOT Be Changed) |
|---|:---:|---|
| **`MASTER_ROADMAP_V7.md`** | TIER 6 HISTORICAL | Canonical record of historical Builds 0 through 33.9. Changing its internal numbers would destroy historical provenance. |
| **`Proposal v3.0.txt`** | TIER 6 PARKED | Speculative enterprise AI vision (GLM-5.2 / 750B MoE). It is harmless as parked research and is gated by Law I. |
| **`docs/REPAIR_DOSSIER.md`** | TIER 5 HISTORICAL | Baseline census documenting the repository state prior to MasterFix Plan V1.0. |
| **`Gamecompanion/content/*`** | TIER 5 LORE | Narrative bibles (Mushoku Tensei lore, dialogue tables, quest lists). Not code governance. |
| **`TheHUB .../INFO/`** | TIER 6 ARCHIVE | Legacy readmes and versioning notes from earlier standalone releases. |
| **`docs/STRATEGIC_DECISION_FRAMEWORK.md`** | TIER 2 LOCKED | 4-Axis SPI formula, Reality Protocols, and Mosaic Council governance are mathematically stable. |
| **`docs/INCIDENT_RESPONSE_SRE_PLAYBOOK.md`** | TIER 2 LOCKED | SEV-1 to SEV-4 emergency response workflows are battle-tested and authoritative. |
| **Dual PostMessage Signatures** | COMPATIBILITY | `idlehero.*` and `mtgame.*` dual-emission in `TheHUBBridge.js` must remain for cross-version compatibility. |

---

# 3. SECOND-PASS SURGICAL REPAIR DESIGN

Below is the detailed 9-point evaluation for each candidate repair:

---

### 🔧 REPAIR 01: Constitutional Header & Scenario Count Synchronization
* **1. Exact Problem Solved:** `docs/AI_RULES.md` header states "9 Supreme Laws" while defining 13 laws; line 116 references "all 9 development scenarios" while `docs/PROMPT_PLAYBOOK.md` defines 14 scenarios.
* **2. Documents Changed:** `docs/AI_RULES.md` (2 lines only).
* **3. Risk of New Contradictions:** **None.** Aligns Document Truth with Governance Truth (Laws I–XIII enacted).
* **4. Classification:** **Editorial / Constitutional Alignment.**
* **5. Requires User Approval?** **No.** (Pure numerical correction of existing ratified laws).
* **6. Automated Safety:** **Yes.** Minimal regex/string replace.
* **7. Historical Info Preserved:** Full text and evolution of Laws I–XIII untouched.
* **8. Smallest Change:** 
  * Change line 10 to: `# ⚖️ THE 13 SUPREME LAWS OF MARCIALE-OS`
  * Change line 116 to: `across all 14 development scenarios`
* **9. Verification Method:** Exact text grep for `# ⚖️ THE 13 SUPREME LAWS` and scenario count match against `PROMPT_PLAYBOOK.md`.

---

### 🔧 REPAIR 02: Agent Squad Topology & Law Reference Sync
* **1. Exact Problem Solved:** `docs/AGENTS.md` Section 1 diagram shows 5 roles (missing `@pangolin`); Section 4 user invocation prompt mentions "8 Supreme Laws"; Section 3 handoff template omits `@pangolin`.
* **2. Documents Changed:** `docs/AGENTS.md` (ASCII diagram, Section 3 handoff list, Section 4 prompt template).
* **3. Risk of New Contradictions:** **None.** `@pangolin` is already fully implemented in Section 2 and in `tools/sre-auto-sentinel.js`.
* **4. Classification:** **Governance Alignment.**
* **5. Requires User Approval?** **No.** (Reconciles existing committed role).
* **6. Automated Safety:** **Yes.**
* **7. Historical Info Preserved:** All 5 original core roles and 7 web roles remain intact.
* **8. Smallest Change:** Update the Section 1 ASCII box to display all 6 Core Personas; update prompt template from "8 Supreme Laws" to "13 Supreme Laws".
* **9. Verification Method:** Check that `docs/AGENTS.md` matches `tools/sre-auto-sentinel.js` and `docs/patchnotes/PATCHNOTES_LEDGER.md`.

---

### 🔧 REPAIR 03: Web Governance Integration Map Synchronization
* **1. Exact Problem Solved:** `docs/web/GOVERNANCE_INTEGRATION_MAP.md` Section 1 references "12 Supreme Laws" and "5 Core Personas".
* **2. Documents Changed:** `docs/web/GOVERNANCE_INTEGRATION_MAP.md` (Lines 18 and 23).
* **3. Risk of New Contradictions:** **None.**
* **4. Classification:** **Editorial / Subsystem Governance Sync.**
* **5. Requires User Approval?** **No.**
* **6. Automated Safety:** **Yes.**
* **7. Historical Info Preserved:** All amendment changelogs preserved.
* **8. Smallest Change:** Update `12 Supreme Laws` $\rightarrow$ `13 Supreme Laws` and `5 Core Personas` $\rightarrow$ `6 Core Personas (@pangolin included)`.
* **9. Verification Method:** Cross-check against `docs/AI_RULES.md` and `docs/AGENTS.md`.

---

### 🔧 REPAIR 04: Master Index Command Clarification & Scope Note
* **1. Exact Problem Solved:** `docs/DOCS_MASTER_INDEX.md` quick dispatch table references external TAMAKEE commands (`npm run code`, `node grade-exam.js`) without stating that they belong to the external TAMA academic vault.
* **2. Documents Changed:** `docs/DOCS_MASTER_INDEX.md`.
* **3. Risk of New Contradictions:** **None.**
* **4. Classification:** **Operational Clarification.**
* **5. Requires User Approval?** **No.**
* **6. Automated Safety:** **Yes.**
* **7. Historical Info Preserved:** All external TAMAKEE linkages remain documented.
* **8. Smallest Change:** Add explicit scope tag: `[TAMAKEE Academic Studio / External Vault]` in the description column for external commands.
* **9. Verification Method:** Check that all root monorepo commands match `package.json` exactly.

---

### 🔧 REPAIR 05: MasterFix Plan & Roadmap Status Tagging
* **1. Exact Problem Solved:** `docs/MASTERFIX_PLAN_V1.0.md` lists Builds F01–F16 as "Future Proposed", creating confusion for AI agents when `docs/BUILD_LOGBOOK.md` shows they are already completed.
* **2. Documents Changed:** `docs/MASTERFIX_PLAN_V1.0.md` (Header status block only).
* **3. Risk of New Contradictions:** **None.** Prevents AI from re-implementing finished builds.
* **4. Classification:** **Operational Status Tagging.**
* **5. Requires User Approval?** **No.**
* **6. Automated Safety:** **Yes.**
* **7. Historical Info Preserved:** 100% of the technical blueprint and architecture rationale is preserved verbatim.
* **8. Smallest Change:** Add header banner: `> **Status:** [COMPLETED HISTORICAL BLUEPRINT] — All builds F01 through F16, Roadmap V8, and Milestones G01/G02 are fully implemented in production. See docs/BUILD_LOGBOOK.md for living state.`
* **9. Verification Method:** Check that incoming AI agents route to `BUILD_LOGBOOK.md` for current production state.

---

# 4. IMPLEMENTATION RISK & ORDER MATRIX

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │               RECOMMENDED SURGICAL REPAIR EXECUTION ORDER                  │
 └────────────────────────────────────────────────────────────────────────────┘
```

| Step | Target File | Repair Scope | Risk Level | Requires Authorization? |
|:---:|---|---|:---:|:---:|
| **1** | `docs/AI_RULES.md` | Sync header title (13 Laws) & scenario count (14). | **LOW** | Pre-authorized |
| **2** | `docs/AGENTS.md` | Sync topology diagram (6 Core Roles) & prompt law count. | **LOW** | Pre-authorized |
| **3** | `docs/web/GOVERNANCE_INTEGRATION_MAP.md` | Sync Level 1 (13 Laws) & Level 2 (6 Roles). | **LOW** | Pre-authorized |
| **4** | `docs/DOCS_MASTER_INDEX.md` | Add scope tags for external TAMA academic commands. | **LOW** | Pre-authorized |
| **5** | `docs/MASTERFIX_PLAN_V1.0.md` | Add `[COMPLETED HISTORICAL BLUEPRINT]` header status tag. | **LOW** | Pre-authorized |

**Total Modified Lines Across Entire Ecosystem:** $< 25\text{ lines}$ across 5 files.  
**Files Deleted or Renamed:** **0.**  
**Historical Documents Touched:** **0.**  

---

# 5. POST-REPAIR VERIFICATION PROTOCOL

Following execution, the system will execute an automated verification pass:
1. **Grep Verification:** Ensure zero occurrences of `"9 Supreme Laws"`, `"8 Supreme Laws"`, or `"12 Supreme Laws"` in active governance files.
2. **Sentinel Check:** Run `npm run pangolin` to verify that test suites (43 suites / 137 assertions) and health gates remain 100% nominal.
3. **Living Ledger Entry:** Append `[PATCH-20260811-07]` to `docs/patchnotes/PATCHNOTES_LEDGER.md` documenting the governance synchronization.
