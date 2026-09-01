# 🛡️ THE M.I.I. MERGE GOVERNANCE & DEFENSE DOCTRINE
## Migration, Incursion, Invasion & Quarantine Framework

**Version:** `1.0.0-CANONICAL`  
**Authority:** Supreme Commander, `SEAT W (WISDOM)`, `SEAT A (ASSISTANT)`, & High Council  
**Classification:** TIER 1 CANONICAL CONSTITUTIONAL MERGE DOCTRINE  
**Target Path:** `/docs/council/MII_MERGE_GOVERNANCE_DOCTRINE.md`  

---

# I. CONSTITUTIONAL PREAMBLE & THE THREE TRUTHS

To maintain absolute production stability without sacrificing engineering throughput, Marciale-OS strictly distinguishes three distinct development states:

$$\mathbf{Engineering\ Completion} \quad \neq \quad \mathbf{Merge\ Authorization} \quad \neq \quad \mathbf{Post\text{-}Merge\ Success}$$

1. **An isolated branch being ahead of `main` is NOT an error:** It is an isolated experimental laboratory protecting production.
2. **A `.zip` archive is NOT a merged Git state:** It is a compiled release artifact on the filesystem.
3. **A green test suite is NOT absolute proof of zero defects:** It is rigorous evidence satisfying defined risk criteria.

---

# II. THE M.I.I. TAXONOMY

```text
 ┌────────────────────────────────────────────────────────────────────────┐
 │                    THE M.I.I. INCIDENT CLASSIFICATION                  │
 └────────────────────────────────────────────────────────────────────────┘
                                       │
     ┌──────────────────┬──────────────┴──────────────┬──────────────────┐
     ▼                  ▼                             ▼                  ▼
┌─────────────┐  ┌─────────────┐               ┌─────────────┐    ┌─────────────┐
│      M      │  │      I      │               │      I      │    │  QUARANTINE │
│  MIGRATION  │  │  INCURSION  │               │   INVASION  │    │    STATE    │
├─────────────┤  ├─────────────┤               ├─────────────┤    ├─────────────┤
│ Authorized, │  │ Defect enters│               │ Change enters│   │ Mandatory   │
│ greenlit    │  │ main despite │               │ main despite │   │ freeze &    │
│ transition  │  │ legitimate  │               │ redlight or │    │ isolation   │
│ into main   │  │ Greenlight  │               │ prohibition │    │ on incident │
└─────────────┘  └─────────────┘               └─────────────┘    └─────────────┘
```

### 1. 🟢 M — MIGRATION
* **Definition:** The planned, fully verified, and authorized transition of an engineering branch into `main`.
* **Required Gate Chain:**
  $$\text{Task Complete} \longrightarrow \text{Branch Tested} \longrightarrow \text{@pangolin GREEN} \longrightarrow \text{@sre GREEN} \longrightarrow \text{Two-Key Gate} \longrightarrow \text{MIGRATION}$$

### 2. 🟠 I — INCURSION
* **Definition:** An unintended latent defect, regression, or edge case that penetrates `main` despite having received a legitimate pre-merge Greenlight based on all available evidence.
* **Non-Negligence Principle:** An Incursion is NOT an act of negligence. A Greenlight is an empirical risk assessment, not a guarantee of omniscience.
* **Response:** Zero-blame rapid containment:
  $$\text{Detect} \longrightarrow \text{Quarantine} \longrightarrow \text{Diagnose} \longrightarrow \text{Patch / Rollback} \longrightarrow \text{PIR} \longrightarrow \text{Regression Test}$$

### 3. 🔴 I — INVASION
* **Definition:** A change entering or remaining in `main` despite an active REDLIGHT, unresolved blocking condition, failed mandatory test, or explicit governance prohibition.
* **Severity:** **SEV-1 Governance Breach**. Represents a circumvention of the defense perimeter itself.
* **Response:** Immediate emergency rollback (`git revert`) + mandatory Council Incident Inquiry.

### 4. 🛑 QUARANTINE RESPONSE STATE
* **Trigger:** Instantly activated upon detection of an Incursion or Invasion.
* **Mandatory Actions:**
  1. Freeze further merges touching the affected subsystem.
  2. Preserve the offending commit SHA and error stack trace.
  3. Formulate repair in an isolated branch (`@engineer`).
  4. Verify repair independently (`@pangolin` & `@sre`).
  5. Lift quarantine only upon verified Greenlight.

---

# III. THE 7-LAYER MERGE DEFENSE STACK

```text
┌────────────────────────────────────────────────────────┐
│ LAYER 1: Git & Diff Integrity (Clean rebase onto main) │
├────────────────────────────────────────────────────────┤
│ LAYER 2: Build Verification (Vite production bundle)   │
├────────────────────────────────────────────────────────┤
│ LAYER 3: Functional QA (@pangolin 65+ Unit Tests)      │
├────────────────────────────────────────────────────────┤
│ LAYER 4: Reliability & Security (@sre Quota/AST Scan)  │
├────────────────────────────────────────────────────────┤
│ LAYER 5: Scope & Architecture (@wisdom 6 Safeguards)   │
├────────────────────────────────────────────────────────┤
│ LAYER 6: Governance Authorization (Two-Key Merge Gate) │
├────────────────────────────────────────────────────────┤
│ LAYER 7: Post-Merge Watch (Live DOM & Smoke Probes)    │
└────────────────────────────────────────────────────────┘
```

---

# IV. MERGE SIGNALS & EMERGENCY OVERRIDE RULES

* 🟢 **GREENLIGHT:** All 6 pre-merge layers pass with 0 defects. Safe for Migration.
* 🟡 **YELLOWLIGHT:** Non-breaking warnings present. Mergeable ONLY with explicitly documented risks and Commander authorization.
* 🔴 **REDLIGHT:** Mandatory blocker (test failure, build error, SEV-1/2 finding, unhandled regression).
* **Emergency Override Rule:**
  * **NO AI AGENT** may override a Redlight.
  * **ONLY the Supreme Commander** may authorize an exceptional override, requiring an explicit logged rationale, rollback plan, and expiration timestamp.

---

# V. ARTIFACT PROVENANCE HIERARCHY

To eliminate ambiguity between the Git repository and the release archive:
$$\text{Git Canonical Commit (main)} \quad \longrightarrow \quad \text{Compiled Vite Assets} \quad \longrightarrow \quad \text{MARCIALE\_OS\_COMPLETE.zip}$$

The release archive is a distribution vehicle carrying provenance metadata identifying its source commit SHA, branch, test status, and build timestamp.
