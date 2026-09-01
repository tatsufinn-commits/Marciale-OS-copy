# 🛡️ MERGE GOVERNANCE, PROTECTED BRANCHES & AGENT DEFENSE RESEARCH
## High Council Strategic Research Dossier — Step 1 Deliverable
**Author:** `SEAT R (@reconnaissance)` & `SEAT A (@assistant)`  
**Requested By:** `SEAT W (@wisdom — Chief Strategic Architect)` & Supreme Commander  
**Classification:** TIER 1 CANONICAL RESEARCH DOSSIER  
**Target Paths:** `/docs/research/MERGE_GOVERNANCE_AND_AGENT_DEFENSE_RESEARCH.md` & `/research/MERGE_GOVERNANCE_AND_AGENT_DEFENSE_RESEARCH.md`  

---

# I. EXECUTIVE SUMMARY

The Jarwen High Council commissioned `@reconnaissance` to investigate mature industry standards, open-source security frameworks (OpenSSF Scorecards, Google Engineering Review, GitHub CODEOWNERS, and SLSA Build Provenance), and multi-agent coordination models to establish the empirical foundation for the **M.I.I. Constitutional Framework (Migration, Incursion, Invasion, and Quarantine)**.

### 🌟 Core Findings:
1. **The Separation of Three Truths:**
   * $\text{Engineering Complete} \neq \text{Merge Authorization} \neq \text{Post-Merge Success}$.
   * A development branch being ahead of `main` is an isolated experimental state, not an error.
   * A distribution `.zip` archive is a compiled filesystem artifact, not equivalent to a merged Git state.
2. **OpenSSF Scorecard Alignment:** Modern software security requires 4 foundational gates:
   * *Branch Protection:* Linear history, force-push blocking, and mandatory status checks.
   * *Independent Code Review:* Separation of authoring and verification (`@engineer` $\neq$ `@pangolin`).
   * *CI/CD Automated Tests:* 100% green deterministic test harness execution.
   * *Vulnerability & Token Permissions:* Static secret and injection scanning.
3. **The M.I.I. Taxonomy:** Provides unambiguous technical definitions for transitions:
   * **Migration:** Authorized, greenlit branch-to-main transition.
   * **Incursion:** Unintended latent defect penetrating `main` despite a legitimate Greenlight (contained with zero-blame learning).
   * **Invasion:** Change entering `main` despite a failed mandatory gate or active Redlight (governance violation).
   * **Quarantine:** Immediate freeze and isolation protocol triggered upon defect detection.

---

# II. RESEARCH METHODOLOGY & SPECIMEN SELECTION

We examined 4 benchmark engineering specimens:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                      BENCHMARK SPECIMEN MATRIX                         │
├────────────────────────────────┬───────────────────────────────────────┤
│ 1. OpenSSF Scorecards (Linux)  │ 18 automated supply-chain risk gates  │
│ 2. Google Engineering Standard │ Independent readability & design QA   │
│ 3. GitHub CODEOWNERS & Rules   │ Branch protection & review gates      │
│ 4. Everything Claude Code (ECC)│ Multi-agent hooks & skill isolation   │
└────────────────────────────────┴───────────────────────────────────────┘
```

---

# III. THE 4 FOUNDATIONAL GOVERNANCE PATTERNS

### 1. Branch Isolation as a Risk-Reduction Sandbox
In high-reliability engineering (Google, Stripe, Meta), `main` is a protected baseline. Complex tasks branch out into isolated environments (`arena/...` / `feat/...`).
* *Principle:* A branch is allowed to fail. A failed branch that stops a defect from reaching `main` is a successful engineering outcome.

### 2. The Two-Key & CODEOWNERS Approval Principle
OpenSSF Scorecard Tier 4 requires multiple independent reviewers before merging.
* *JARWEN Adaptation:*
  * **Key 1 (`@engineer` / Max):** Technical validity, schema integrity, and diff minimalism.
  * **Key 2 (`@assistant`):** Scope compliance, executive safety checks, and branch merge authorization.
  * **Independent QA (`@pangolin`):** Adversarial verification before Key 1 can accept.

### 3. The 3 Operational Signals (Greenlight, Yellowlight, Redlight)
* 🟢 **GREENLIGHT:** All gates passed; authorized for Migration.
* 🟡 **YELLOWLIGHT:** Mergeable only with explicitly documented limitations and Commander approval.
* 🔴 **REDLIGHT:** Mandatory blocker (failing tests, SEV-1/2, broken build, unhandled regression). Cannot be overridden by any AI agent.

### 4. Post-Merge Watch & Artifact Provenance
Merging is not the end of verification. A post-merge smoke check observes the system in its integrated state. The release archive (`MARCIALE_OS_COMPLETE.zip`) carries provenance identifying source commit, branch, test status, and build timestamp.

---

# IV. THE M.I.I. & QUARANTINE FRAMEWORK

```text
ENGINEERING BRANCH
       │
       ▼
     TESTS
       │
       ▼
  @PANGOLIN QA
       │
       ▼
    @SRE GATE
       │
       ▼
┌──────────────────┐
│  MERGE GATEWAY   │
└────────┬─────────┘
         │
    ┌────┴────┐
    ▼         ▼
[GREEN]    [RED] ──► BLOCKED
    │
    ▼
MIGRATION (Merged to main)
    │
    ▼
POST-MERGE WATCH
    │
    ▼
┌──────────────────┐
│  INCIDENT STATE  │
└────────┬─────────┘
         │
    ┌────┴────┐
    ▼         ▼
INCURSION   INVASION
(Sneak-in)  (Bypass)
    │         │
    └────┬────┘
         ▼
    QUARANTINE (Freeze & Isolate)
         │
         ▼
     RECOVERY (Rollback or Patch)
         │
         ▼
  POST-INCIDENT REVIEW
```

---

# V. COMPARISON MATRIX: INDUSTRY VS. ECC VS. MARCIALE-OS

| Dimension | OpenSSF / Google Standard | Everything Claude Code (ECC) | Marciale-OS Proposed (M.I.I.) |
|---|---|---|---|
| **Branch Isolation** | Protected `main` + PR branches | Worktree isolation / manual | Branch Isolation Doctrine (`arena/...`) |
| **Merge Gate** | Required CI status + 2 Approvals | Planner/Reviewer subagents | Two-Key Gate (`@engineer` + `@assistant`) |
| **QA Verification** | Automated tests + Adversarial QA | TDD guide + code reviewer | `@pangolin` Independent Verification |
| **Reliability Check** | SRE Production Readiness | Inline build resolvers | `@sre` Rollback & Quota Guardian |
| **Incident Classification**| Outage / Post-Mortem | Error loop intervention | **M.I.I. (Migration, Incursion, Invasion)** |
| **Release Artifact** | SLSA Level 3 Provenance | Plugin zip distribution | `MARCIALE_OS_COMPLETE.zip` with Provenance |

---

# VI. ANTI-PATTERNS IDENTIFIED & REJECTED

1. ❌ **Governance Bloat:** Avoid 50-page legal documents that agents cannot parse. Every rule must map to an automated CLI command or a 10-line Markdown envelope.
2. ❌ **Ceremonial Greenlights:** A green test suite is evidence, not absolute proof. Greenlights are explicit risk assessments.
3. ❌ **Silent Overrides:** No AI agent may bypass a Redlight without Supreme Commander authorization.
4. ❌ **ZIP as Source of Truth:** `main` in Git is the canonical source of truth; the `.zip` is a compiled distribution artifact.

---

# VII. RECOMMENDATIONS FOR STEP 2 (CANONICAL DOCTRINE)

Based on this empirical research, Step 2 should draft:
1. **`docs/council/MII_MERGE_GOVERNANCE_DOCTRINE.md`**: Defining Migration, Incursion, Invasion, Quarantine, and the 7-Layer Merge Defense Stack.
2. **`docs/council/MII_INCIDENT_LEDGER.md`**: Tracking all post-merge incidents and lessons learned.
3. **Artifact Provenance Header**: Injected into `MARCIALE_OS_COMPLETE.zip` releases.
