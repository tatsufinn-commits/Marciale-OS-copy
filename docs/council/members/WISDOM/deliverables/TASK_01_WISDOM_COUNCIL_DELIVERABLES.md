# JARWEN COUNCIL — SEAT W (WISDOM)
# TASK 01 DELIVERABLES
## High-Reliability Governance, Continuous Watch Doctrine & Reverse-Intent Agent Playbook

**Document ID:** TASK-JARWEN-2026-01  
**Author:** WISDOM — Seat W  
**Status:** Proposed architecture / ready for Council review

---

# 0. Executive Architectural Position

Task 01 addresses two problems:

1. **Continuity failure:** an active AI model may become unavailable because of rate limits, context exhaustion, outages, or platform changes.
2. **Jagged human intent:** the Supreme Commander should not have to understand JARWEN's internal prompt architecture in order to ask for help.

The foundational principle is:

> **Continuity of work is not the same as succession of unrestricted authority.**

An incoming model should inherit enough operational context to reconstruct, verify, and continue authorized work. It should not automatically inherit permission to alter constitutional governance, perform irreversible operations, or redefine project objectives.

A second principle:

> **The real continuity mechanism is not Model A → Model B. It is Model A → persistent verified state → Model B.**

The repository and its auditable records therefore become the system's durable memory.

---

# 1. System Architecture

```text
                         SUPREME COMMANDER
                                |
                         AUTHORITY / VETO
                                |
                         ACTIVE WATCH SEAT
                                |
                 +--------------+--------------+
                 |                             |
          NORMAL OPERATION              WATCH RELIEF
                 |                             |
                 v                             v
          ACTIVE AI MODEL              INCOMING AI MODEL
                 |                             |
                 +--------------+--------------+
                                |
                       WATCH-RELIEF DOSSIER
                                |
                         VERIFY GROUND TRUTH
                                |
                 +--------------+--------------+
                 |                             |
              CONTINUE                     ESCALATE
                 |
                 v
          EXECUTE + VERIFY
                 |
                 v
        PERSIST VERIFIED STATE
```

The system should maintain a recoverable operational state even when a specific
AI model disappears.

---

# 2. Three-Truth Model

## 2.1 Repository Truth

What actually exists or can be verified from the repository and execution
environment.

Examples:

- filesystem contents;
- Git state;
- test results;
- build output;
- package configuration;
- actual implementation.

## 2.2 Documentation Truth

What project documentation states.

Documentation may be:

- current;
- historical;
- planned;
- deprecated;
- contradictory;
- incomplete.

Documentation claims are not automatically repository truth.

## 2.3 Governance Truth

What JARWEN has formally established as authoritative.

Governance truth determines:

- authority;
- jurisdiction;
- escalation;
- standing rules;
- decision rights;
- constitutional constraints.

These three truths may temporarily differ. The system must identify the
difference rather than silently collapsing them.

---

# 3. `AGENT_PLAYBOOK.md` Architecture

## 3.1 Reverse-Intent Decoder

The decoder should translate ordinary human language into an actionable
engineering interpretation.

### Pipeline

```text
RAW HUMAN INPUT
      |
      v
INTENT EXTRACTION
      |
      v
CONTEXT RECOVERY
      |
      v
DOMAIN IDENTIFICATION
      |
      v
SEVERITY CLASSIFICATION
      |
      v
AGENT ROUTING
      |
      v
ACTION PLAN
      |
      v
EXECUTION
      |
      v
VERIFICATION
      |
      v
REPORT
```

The system must not require the human to select a scenario manually when the
intent can be reasonably inferred.

## 3.2 Human-to-Scenario Translation Matrix

| Human Input Pattern | Likely Intent | Initial Severity | Candidate Agent(s) | Required First Action |
|---|---|---:|---|---|
| "The site is completely broken" | Diagnose broad application failure | SEV-1 | `@fullstack`, `@qa` | Reproduce and inspect |
| "The chess thing is fucked" | Diagnose chess subsystem | SEV-1–3 | `@fullstack`, `@qa` | Locate subsystem and reproduce |
| "The laptop fan is going crazy" | Diagnose performance/environment issue | SEV-2–4 | `@backend`, `@sre` | Inspect processes, logs, resource use |
| "I think we broke something" | Regression investigation | SEV-2–3 | `@qa`, relevant specialist | Compare current vs last-known-good |
| "I don't know what to build" | Planning / discovery | SEV-4 | `@scout`, `@pm`, `@architect` | Recover objective and propose options |
| "Look at this cool repo" | Research/reference acquisition | SEV-4 | `@scout` | Inspect target and identify useful patterns |
| "Can we make this better?" | Enhancement | SEV-4 | Relevant specialist + `@pm` | Identify measurable improvement |
| "I deleted something by accident" | Potential data loss | SEV-2–1 | `@sre`, `@qa` | Stop destructive actions; inspect recovery |
| "Nothing is working" | Unknown broad failure | SEV-1–3 | `@qa` + relevant specialists | Establish failure boundary |
| "I'm clueless, what should we do?" | Decision paralysis | SEV-4 unless evidence indicates incident | `@pm`, `@architect`, `@scout` | Inspect state and recommend a path |

The matrix is a routing aid, not a substitute for investigation.

## 3.3 Intent Confidence

The decoder should track confidence rather than pretending certainty.

```text
INTENT:
  domain: chess
  objective: diagnose_failure
  confidence: 0.74

SEVERITY:
  provisional: SEV-2
  confidence: 0.61

ROUTING:
  primary: @qa
  secondary: @fullstack

NEXT ACTION:
  reproduce → inspect → classify → repair → verify
```

Low confidence should trigger investigation rather than fabricated certainty.

---

# 4. Zero-Paralysis Intake Protocol

When the Supreme Commander says:

> "I'm clueless, what should we do?"

the AI must not simply respond with:

> "What would you like to do?"

Instead:

1. Recover current project state.
2. Identify active objectives.
3. Inspect known blockers.
4. Check recent verified work.
5. Identify the highest-value unresolved problem.
6. Determine whether action is safe.
7. Recommend a concrete next step.
8. Ask only a question whose answer materially changes the action.

Default pattern:

```text
OBSERVE
  ↓
UNDERSTAND
  ↓
PRIORITIZE
  ↓
RECOMMEND
  ↓
ACT (if authorized)
  ↓
VERIFY
```

---

# 5. Autonomous Severity Classifier

Severity should be **impact-based**, not merely category-based.

## SEV-0 — Critical / Catastrophic

Use for destructive or potentially destructive activity, widespread corruption,
critical security exposure, inability to safely continue, or severe irreversible
impact.

**Default:** stop unsafe operations, preserve evidence, escalate.

## SEV-1 — Major Failure

Use when core functionality is unavailable or the application fundamentally
fails.

**Default:** prioritize diagnosis and restoration.

## SEV-2 — Significant Defect

Use when an important feature is broken, data integrity may be affected, a
serious regression exists, or the issue substantially blocks intended use.

**Default:** diagnose, contain, repair, verify.

## SEV-3 — Normal Defect

Use for localized bugs, incorrect behavior, isolated regressions, or
non-critical implementation defects.

**Default:** route to the responsible specialist and test the repair.

## SEV-4 — Enhancement / Cosmetic

Use for feature requests, UX improvements, refactoring, optimization,
documentation improvements, or cosmetic changes.

**Default:** plan and prioritize rather than treating as an incident.

### Severity override

If uncertainty exists, select the highest plausible severity necessary to
protect the system, then investigate to reduce uncertainty.

---

# 6. Scenario 15 — Watch-Relief Handover Prompt

## Purpose

Transfer active work from an outgoing model to an incoming model without
requiring the incoming model to reconstruct the entire conversation.

## Outgoing Model Prompt

```text
You are preparing a WATCH-RELIEF DOSSIER for the next JARWEN Council model.

Do not summarize the conversation generally.

Produce an operational handover containing:

SESSION
CURRENT OBJECTIVE
CURRENT TASK
AUTHORIZED SCOPE
COMPLETED WORK
WORK IN PROGRESS
BLOCKED WORK
UNVERIFIED CLAIMS
FILES MODIFIED
FILES CREATED
FILES THAT MUST NOT BE TOUCHED
GIT / REPOSITORY STATE
TEST STATUS
LAST VERIFIED STATE
KNOWN FAILURES
KNOWN RISKS
IMPORTANT DECISIONS
OPEN QUESTIONS
RECOMMENDED NEXT ACTION
SAFE STOPPING POINT

For every important claim, distinguish:
- VERIFIED
- CLAIMED / UNVERIFIED
- INFERRED
- BLOCKED

Do not claim completion for work that was not verified.

End with a concise LAST KNOWN GOOD STATE.
```

## Incoming Model Prompt

```text
You are assuming WATCH RELIEF for the JARWEN Council.

The previous model's handover is evidence about what it claims to have done,
not proof that it actually happened.

Before continuing:

1. Read applicable governance and standing orders.
2. Read the handover dossier.
3. Inspect the repository and filesystem.
4. Inspect Git state where available.
5. Verify the stated LAST KNOWN GOOD STATE.
6. Run appropriate tests or validation.
7. Identify discrepancies between the dossier and repository truth.
8. Continue only within the authorized scope.

Do not restart completed work without reason.
Do not fabricate completion.
Do not expand scope merely because the previous model is unavailable.
Do not perform irreversible governance or destructive operations without the
required authorization.

If the state cannot be safely reconstructed, produce a new handover and
escalate rather than guessing.
```

---

# 7. Scenario 16 — Digital Letters of Last Resort

The "Letters of Last Resort" concept should be treated as a continuity
mechanism, not literal military command authority.

## Execution Prompt

```text
You are an incoming JARWEN Council model operating without the previous active
model.

You have no authority to assume that prior model statements are correct.

Your first duty is RECOVERY OF OPERATIONAL STATE.

Perform the following:

1. Identify the repository and working environment.
2. Read applicable constitutional and governance documentation.
3. Read the current agent registry.
4. Read the continuity standing orders.
5. Inspect the filesystem.
6. Inspect Git status and recent history where available.
7. Inspect current task records.
8. Identify the LAST KNOWN GOOD STATE.
9. Run appropriate verification tests.
10. Compare verified state against the previous handover.
11. Record contradictions.
12. Determine the safest authorized next action.

You may continue ordinary authorized engineering work.

You must not:
- rewrite governance because the previous model is absent;
- assume unlimited authority;
- delete historical evidence;
- fabricate tests or completion;
- silently expand the project's objectives;
- perform destructive or irreversible actions without authorization.

If continuation is unsafe, stop at a recoverable state and produce a
WATCH-RELIEF DOSSIER.
```

---

# 8. Scenario 17 — Multi-Model Adversarial Review

## Purpose

Allow one Council seat to challenge work produced by another without creating
personality-based rejection.

## Reviewer Prompt

```text
You are acting as an ADVERSARIAL REVIEWER.

Your job is not to agree with the producing agent and not to reject its work
merely because you would implement it differently.

Review the supplied implementation, proposal, or decision against:

1. Requirements
2. Repository truth
3. Governance rules
4. Architecture
5. Tests
6. Security
7. Reliability
8. Maintainability
9. Edge cases
10. Unintended consequences

Attempt to falsify important claims.

For every identified issue, provide:

ISSUE
EVIDENCE
SEVERITY
IMPACT
REPRODUCTION / VERIFICATION METHOD
RECOMMENDED CORRECTION

Distinguish:
- CONFIRMED DEFECT
- PROBABLE DEFECT
- POTENTIAL RISK
- DESIGN DISAGREEMENT
- INFORMATION GAP

Do not classify design disagreement as a defect.

Conclude with one of:

PASS
PASS WITH CONDITIONS
REQUIRES REVISION
BLOCKED — INSUFFICIENT EVIDENCE
```

---

# 9. Standing Orders — Digital Letters of Last Resort

## ORDER 01 — Preserve Commander Authority

The temporary absence of an AI model does not remove the Supreme Commander's
authority.

## ORDER 02 — Preserve Work

An incoming model should continue verified work whenever safe and practical.

## ORDER 03 — Verify Before Trust

Previous model claims are not proof. Repository and execution evidence take
precedence.

## ORDER 04 — Never Manufacture Completion

Unverified work must remain explicitly unverified.

## ORDER 05 — Preserve Reversibility

When uncertainty exists, prefer reversible operations.

## ORDER 06 — Do Not Expand Scope During Succession

Watch relief is not permission to redesign the project.

## ORDER 07 — Escalate Irreversible Decisions

Destructive operations, major architectural changes, constitutional changes,
and similarly consequential actions require appropriate authorization.

## ORDER 08 — Preserve Historical Evidence

Outdated information should be classified before deletion. Historical artifacts
may remain valuable evidence.

## ORDER 09 — Record Important Decisions

Material decisions should leave an auditable record.

## ORDER 10 — Stop Safely

If an incoming model cannot establish sufficient confidence to continue, it
must stop at a recoverable state and create a handover rather than guess.

---

# 10. Last Known Good State

Every continuity cycle should attempt to establish a compact verified baseline.

Example:

```text
LAST KNOWN GOOD STATE

Commit:              1c33c2d
Working Tree:        CLEAN
Tests:               137 / 137 PASS
Build:               VERIFIED
Active Objective:    Documentation governance repair
Known Issue:         Web routing bug #17
Uncommitted Changes: NONE
Last Verification:   <timestamp>
```

The exact fields may vary by project, but the concept should remain mandatory.

The Last Known Good State is a baseline, not a guarantee that everything is
perfect.

---

# 11. Continuity State Machine

```text
                    ACTIVE
                      |
                      v
               RELIEF REQUIRED
                      |
                      v
              CREATE DOSSIER
                      |
                      v
                MODEL OFFLINE
                      |
                      v
              INCOMING MODEL
                      |
                      v
              READ GOVERNANCE
                      |
                      v
             VERIFY REPOSITORY
                      |
              +-------+-------+
              |               |
              v               v
          VERIFIED        CONFLICT
              |               |
              v               v
          CONTINUE         ESCALATE
              |
              v
          EXECUTE
              |
              v
           VERIFY
              |
              v
        PERSIST STATE
              |
              v
            ACTIVE
```

---

# 12. Failure Modes and Mitigations

| Failure Mode | Risk | Mitigation |
|---|---|---|
| Incoming model trusts stale handover | False state reconstruction | Verify repository truth |
| Model assumes inherited unlimited authority | Governance violation | Separate operational succession from constitutional authority |
| Handover becomes too long | Token waste | Structured compact dossier |
| Human intent is ambiguous | Wrong routing | Confidence + investigation |
| Severity is misclassified | Wrong priority | Impact-based severity + escalation |
| Agent disagrees with another agent | Personality-based rejection | Evidence-based adversarial review |
| Historical files are deleted | Loss of institutional memory | Classify before deletion |
| Model cannot safely continue | Fabricated progress | Safe stopping point + new handover |
| Tests are assumed rather than run | False confidence | Explicit verification status |
| Continuity protocol becomes bureaucracy | Reduced usefulness | Keep artifacts modular and operational |

---

# 13. Token-Efficiency Doctrine

The continuity system must not become another documentation burden.

Prefer:

```text
CURRENT STATE
+
VERIFIED EVIDENCE
+
OPEN WORK
+
RISKS
+
NEXT ACTION
```

over lengthy narrative history.

Historical detail should be referenced rather than repeatedly copied.

The purpose of continuity documentation is **reconstruction**, not storytelling.

---

# 14. Governance Boundary

```text
OPERATIONAL SUCCESSION
        |
        +-- inspect
        +-- diagnose
        +-- test
        +-- repair
        +-- document
        +-- continue authorized work

CONSTITUTIONAL AUTHORITY
        |
        +-- governance changes
        +-- authority changes
        +-- law/rule changes
        +-- major irreversible decisions
        +-- project objective changes
```

Operational succession does not automatically confer constitutional authority.

---

# 15. Recommended Implementation Sequence

### Phase 1 — Governance Foundation

Create and review:

`STAND_ORDERS_LETTERS_OF_LAST_RESORT.md`

### Phase 2 — Intent Layer

Create:

`AGENT_PLAYBOOK.md`

Test it against real historical user requests and jagged inputs.

### Phase 3 — Continuity Prompts

Append Scenarios 15–17 to:

`PROMPT_PLAYBOOK.md`

### Phase 4 — Simulation

Perform controlled simulations:

1. Seat A unavailable.
2. Context abruptly lost.
3. Repository contains uncommitted work.
4. Previous handover contains an incorrect claim.
5. Incoming model discovers a contradiction.
6. Human gives a vague request.
7. Two agents disagree.
8. A task requires irreversible action.

### Phase 5 — Audit

Verify:

- no governance contradictions;
- no broken references;
- no duplicate authority;
- no circular escalation;
- no unsafe automatic escalation;
- no unnecessary token-heavy protocol;
- no false claims of continuity.

---

# 16. Success Criteria

Task 01 should be considered successful when a fresh model with no access to the
previous conversation can:

1. Understand the current authorized objective.
2. Recover the repository's verified state.
3. Identify what was actually completed.
4. Identify what remains incomplete.
5. Detect contradictions between handover and repository truth.
6. Correctly classify a jagged human request.
7. Route the request to an appropriate agent.
8. Continue safe authorized work.
9. Stop safely when authority or evidence is insufficient.
10. Produce a new recoverable state for the next model.

The ultimate objective is not to make AI models immortal.

It is to make the **project recoverable**.

---

# 17. Final WISDOM Recommendation

The CASD analogy provides a useful conceptual foundation for continuous
availability, but JARWEN should not attempt to reproduce a military command
structure literally.

The stronger engineering principle is:

> **No single AI model should be a single point of failure for project
> knowledge, operational state, or authorized work.**

The repository, verified state, tests, governance documents, and structured
handover records collectively form the continuity infrastructure.

Therefore:

```text
MODEL MEMORY
    ↓
is temporary

REPOSITORY STATE
    ↓
is persistent

VERIFIED STATE
    ↓
is authoritative for operations

GOVERNANCE
    ↓
defines authority

HUMAN COMMAND
    ↓
retains ultimate project direction
```

> **The Council should not depend on an AI remembering what happened. It should
> be able to prove what happened, recover where it stands, and determine what
> may safely happen next.**

---

# END OF TASK 01 DELIVERABLES
