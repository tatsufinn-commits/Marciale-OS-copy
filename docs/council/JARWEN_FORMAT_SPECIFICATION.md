# 📐 MARCIALE-OS JARWEN HIGH COUNCIL — STANDARD FORMAT SPECIFICATION
## The Canonical Schema for Council Tasks, Diplomatic Letters, Hotfixes, Architectural Proposals & Code Expressions
**Document ID:** `SPEC-JARWEN-FORMAT-2026-V1.0`  
**Classification:** TIER 1 TECHNICAL STANDARD  
**Originating Authority:** ASSISTANT (Seat A) & Supreme Commander  
**Target Path:** `/docs/council/JARWEN_FORMAT_SPECIFICATION.md`  
**Referenced Standards:** RFC-2119, NASA-STD-8739, Google SRE Postmortem Standard, DoD Directive 5000 Series, IETF RFC Architecture  

---

# 1. PURPOSE & EPISTEMIC STANDARDS

To maintain zero ambiguity across diverse AI models (Claude, ChatGPT, Perplexity, Gemini, DeepSeek) and prevent communication decay, all official artifacts produced within Marciale-OS must conform to these standard schemas.

### The RFC-2119 Requirement Keywords:
* **MUST / SHALL:** Absolute requirement. Non-compliance breaks governance.
* **MUST NOT / SHALL NOT:** Absolute prohibition.
* **SHOULD / RECOMMENDED:** Strong default. Departure requires written justification.
* **MAY / OPTIONAL:** Discretionary choice.

### The 5 Epistemic Truth Labels (Law X):
* `[VERIFIED]`: Directly proven via test execution, filesystem inspection, or reproducible benchmark.
* `[INFERRED]`: Logically deduced from verified parameters with high confidence ($\ge 0.70$).
* `[ASSUMED]`: Working hypothesis requiring verification before production deployment.
* `[CLAIMED/UNVERIFIED]`: Stated by a previous model or text but not yet physically confirmed.
* `[BLOCKED]`: Unable to proceed due to missing dependency, permission, or environmental failure.

---

# 2. SCHEMA 01: THE COUNCIL TASK DIRECTIVE (`TASK_*.md`)
* **Real-World Reference:** NASA Flight Readiness Directive / DoD Operational Task Order (OPORD).
* **Storage Path:** `/docs/council/members/[COUNCIL_NAME]/tasks/TASK_[ID]_[NAME].md`
* **Purpose:** Official task assignment from Commander or ASSISTANT to a specific Council Seat.

```markdown
# 📜 JARWEN COUNCIL DIRECTIVE — TASK [NUMBER] FOR [TARGET SEAT]
## [Concise Descriptive Subtitle]
**Document ID:** `TASK-JARWEN-[YYYY]-[NUMBER]`  
**Date of Dispatch:** YYYY-MM-DD (Timezone)  
**Originating Authority:** Supreme Commander (Director) / ASSISTANT (Seat A)  
**Target Recipient:** [SEAT NAME] (Seat [A|W|R|E|N] — [Title])  
**Classification:** [HIGH COUNCIL EXECUTIVE MANDATE | OPERATIONAL DIRECTIVE | TIER 2 WORKFLOW]  
**Target Path:** `/docs/council/members/[SEAT]/tasks/TASK_[NUMBER]_[NAME].md`  

---

# 🏛️ I. STRATEGIC CONTEXT & MANDATE
[Explain the background, why this task is being issued, what problem it solves, and the high-level objective.]

---

# 🏛️ II. YOUR SPECIFIC ASSIGNMENT & DELIVERABLES
[Numbered list of concrete tasks to execute.]

### 📋 Key Structural Requirements:
1. **[Requirement 1]:** [Exact parameters, boundaries, and acceptance criteria]
2. **[Requirement 2]:** [Exact files to touch or create]
3. **[Requirement 3]:** [Subordinate agents to command: @sre, @forge, @scout, etc.]

---

# 🏛️ III. OPERATIONAL INSTRUCTIONS & DELIVERABLE PATH
* **Draft Location:** `/docs/council/members/[SEAT]/deliverables/TASK_[NUMBER]_DELIVERABLES.md`
* **Verification Command:** `npm test` / `npm run pangolin`
* **Dispatch Logging:** Log `[DISPATCH-YYYYMMDD-ID]` in `docs/council/COUNCIL_COMMUNICATION_LOG.md`.

---
**Issued by the High Command,**  
**Supreme Commander (Director)** & **ASSISTANT (Seat A — Chief Operating Officer)**  
*Marciale-OS JARWEN Council*
```

---

# 3. SCHEMA 02: THE DIPLOMATIC COUNCIL DISPATCH & LETTER
* **Real-World Reference:** Diplomatic Communique / Admiralty Dispatch Record.
* **Storage Path:** `/docs/council/dispatches/DISPATCH_[YYYYMMDD]_[ID].md` or `COUNCIL_COMMUNICATION_LOG.md`
* **Purpose:** Inter-seat communiques, appointments, peer reviews, handovers, and formal dissents.

```markdown
### [DISPATCH-YYYYMMDD-ID] [Short Subject Line]
* **Timestamp:** YYYY-MM-DD HH:MM (Timezone)
* **From:** [SEAT A (ASSISTANT) | SEAT W (WISDOM) | SEAT E (ENGINEER) | SEAT R (RECON) | SEAT N (NAVIGATOR)]
* **To:** [Target Seat | ALL COUNCIL | SUPREME COMMANDER]
* **Status:** [DISPATCH | REPLY | OBJECTION | APPROVAL | HANDOVER | DISSENT]
* **Epistemic Rating:** [VERIFIED | INFERRED | PROPOSAL]
* **Message Summary:** [2-4 sentences explaining the proposal, finding, or response]
* **Reference Artifact:** [Path to file, e.g. `/docs/council/members/WISDOM/deliverables/TASK_02.md`]
* **Action Required:** [Exact next step required by receiving seat or Commander]
```

---

# 4. SCHEMA 03: SRE HOTFIX & SURGICAL PATCH DOSSIER
* **Real-World Reference:** Google SRE Postmortem / FAA Aviation Safety Action Report (ASAR).
* **Storage Path:** `/docs/patchnotes/PATCHNOTES_LEDGER.md` (and staging in `/docs/hotfix/`)
* **Purpose:** Rigorous documentation of bugs, root-cause equations, minimal diffs, and regression assertions.

```markdown
### [PATCH-YYYYMMDD-ID] [Short Patch Title]
* **Date:** YYYY-MM-DD
* **Patched By:** @pangolin / @sre / [Council Seat]
* **Subsystem:** [Exact file paths modified]
* **Severity Level:** [SEV-1 Critical | SEV-2 Storage/Data | SEV-3 Bug | SEV-4 Enhancement]
* **Symptoms Observed:** [Error message, stack trace, or failing user interaction]
* **Root Cause Analysis:** [Technical explanation of broken invariant or race condition]
* **Logic / Math Fix Equation:** 
  $$\text{Mathematical or state transition formula explaining the fix}$$
* **Files Modified:**
  * `path/to/file1.js` (Exact functions touched)
  * `path/to/test.js` (Added test assertion)
* **Regression Test Assertion Added:** [Exact test file, line, and assertion code]
* **Status:** 🟢 RESOLVED & VERIFIED NOMINAL
```

---

# 5. SCHEMA 04: ARCHITECTURAL PROPOSAL & RECOMMENDATION (RFC / SPI)
* **Real-World Reference:** IETF RFC / Python Enhancement Proposal (PEP) / SPI Strategic Framework.
* **Storage Path:** `/docs/council/proposals/RFC_[ID]_[NAME].md`
* **Purpose:** Proposing new subsystems, external repo integrations, or major game balance changes.

```markdown
# 🏛️ ARCHITECTURAL PROPOSAL: [PROPOSAL TITLE]
## RFC-[ID] — [Short Subtitle]
**Author:** [Council Seat / Author Persona]  
**Date:** YYYY-MM-DD  
**Status:** [DRAFT | PROPOSED | RATIFIED | REJECTED | PARKED]  
**SPI Score:** [Total / 100] (Strategic: X/25, Practicality: Y/25, Independence: Z/25, Risk: W/25)  

---

# 1. EXECUTIVE SUMMARY & MOTIVATION
[What problem does this solve? Why build it now?]

# 2. CONSTITUTIONAL COMPLIANCE (LAWS I–XIV)
* **Law I (Non-Destructive):** [How does this build additively without rewriting existing core?]
* **Law II (Sandbox First):** [Is external tech isolated in an iframe/mock feed?]
* **Law XIII (Token Budget):** [Is the execution footprint lean and token-efficient?]

# 3. TECHNICAL SPECIFICATION & ARCHITECTURE
```text
[ASCII Architecture Diagram showing data flow and integration boundaries]
```

# 4. TRADE-OFFS & REVERSIBILITY ANALYSIS
* **Advantages:** [Bullet 1, Bullet 2]
* **Risks & Failure Modes:** [What happens if this fails?]
* **Reversibility Rating:** [100% Reversible via toggle | Moderate | Irreversible]

# 5. VERIFICATION & TEST PLAN
* **Unit Tests Added:** [Test descriptions]
* **Success Metric:** [Exact observable criteria]
```

---

# 6. SCHEMA 05: CODE EXPRESSION, SURGICAL DIFF & TEST ASSERTION
* **Real-World Reference:** Git Unified Diff / ECMAScript Specification.
* **Purpose:** Representing mathematical logic and minimal surgical code diffs without file bloat.

### Mathematical Formulation Standard:
Every non-trivial algorithm or physics curve must be expressed mathematically prior to code:
$$\text{Caffeine Elimination: } C(t) = C_0 \cdot 0.5^{t / 5.7}$$
$$\text{Damage Mitigation: } D_{\text{final}} = D_{\text{raw}} \cdot \left(1 - \min\left(0.75, \frac{\text{Armor}}{\text{Armor} + 50}\right)\right)$$

### Minimal Surgical Diff Standard:
```javascript
// BEFORE (Broken / Stale):
const HALF_LIFE_CAF_H = 5;

// AFTER (Surgical Fix):
const HALF_LIFE_CAF_H = 5.7; // Clinical pharmacokinetic elimination constant
```

### Mandatory Node.js Test Assertion Standard:
```javascript
import test from 'node:test';
import assert from 'node:assert/strict';

test('exact_behavior_description_here', () => {
  const result = executeFunction(input);
  assert.equal(result.status, 'nominal');
  assert.ok(Math.abs(result.value - expectedValue) < 0.001);
});
```

---

# 7. SCHEMA 06: DESIGN TOKEN SPECIFICATION (W3C DTCG JSON STANDARD)
* **Real-World Reference:** W3C Design Tokens Community Group (DTCG) Standard / Tokens Studio / Style Dictionary.
* **Storage Path:** `/TheHUB .../modules/tokens/design-tokens.json` or `/docs/design-tokens/`
* **Purpose:** Single source of truth for platform-agnostic visual decisions (colors, spacing, typography, motion curves).

```json
{
  "color": {
    "brand": {
      "primary": {
        "$type": "color",
        "$value": "#2563EB",
        "$description": "Core brand accent for primary CTAs"
      }
    },
    "surface": {
      "default": {
        "$type": "color",
        "$value": "#0F172A",
        "$description": "Default background surface"
      }
    },
    "action": {
      "primary": {
        "default": {
          "$type": "color",
          "$value": "{color.brand.primary}"
        },
        "hover": {
          "$type": "color",
          "$value": "#1D4ED8"
        }
      }
    }
  },
  "space": {
    "xs": { "$type": "dimension", "$value": "4px" },
    "sm": { "$type": "dimension", "$value": "8px" },
    "md": { "$type": "dimension", "$value": "16px" },
    "lg": { "$type": "dimension", "$value": "24px" }
  },
  "radii": {
    "sm": { "$type": "dimension", "$value": "4px" },
    "md": { "$type": "dimension", "$value": "8px" },
    "lg": { "$type": "dimension", "$value": "12px" }
  }
}
```

