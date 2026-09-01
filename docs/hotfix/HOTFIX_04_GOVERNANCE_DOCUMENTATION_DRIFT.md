# MODIFIED SCENARIO 12 — GOVERNANCE / DOCUMENTATION DRIFT HOTFIX PROPOSAL

**Project:** Marciale-OS + TAMAKEE  
**Mode:** Autonomous SRE Fault, Diagnostic & Vulnerability Scan  
**Disposition:** HOTFIX PROPOSAL — NOT APPLIED  
**Audit date:** 2026-08-11  
**Repository mutation:** NONE

---

## 0. Executive SRE disposition

This proposal addresses the governance, documentation, versioning, and AI-orchestration inconsistencies identified during the second reality audit.

The proposed changes are intentionally **surgical**. They do not redesign TheHUB, Marciale, Companion, TAMA, or the agent architecture.

### Current evidence state

- Repository inspection through current GitHub `main`: **VERIFIED**
- Local clone: **BLOCKED** by network/DNS restrictions in the execution environment
- `npm run health`: **NOT EXECUTED**
- `npm run audit:all`: **NOT EXECUTED**
- `npm test`: **NOT EXECUTED**
- Browser console: **NOT VERIFIED**
- 43-test green status: **NOT VERIFIED**
- Repository files modified: **NONE**

Per Marciale-OS Law X, no runtime/test success is claimed.

---

# 1. Fault cluster: AI constitutional-count drift

## Finding GOV-01

Multiple documents disagree about the number of Supreme Laws.

Observed:

- Root README: **8 Supreme Laws**
- `AI_RULES.md` heading: **9 Supreme Laws**
- `AI_RULES.md` actual content: **13 Laws**
- `DOCS_MASTER_INDEX.md`: **13 Supreme Constitutional Laws**

### Severity

**SEV-2 — AI Governance / Instruction Integrity**

### Risk

An AI entering through different documentation entry points can receive different constitutional instructions.

This is more serious than ordinary documentation staleness because these documents govern agent behavior.

### Surgical remediation

1. Establish `docs/AI_RULES.md` as the single constitutional authority.
2. Confirm the authoritative law count from the actual numbered laws.
3. Change every stale count in:
   - root `README.md`
   - `docs/README.md`
   - `DOCS_MASTER_INDEX.md`
   - other documents discovered by a repository-wide search
4. Do not duplicate the law list into secondary documents.
5. Secondary documents should reference the authoritative source instead.
6. Add a documentation consistency check that detects:
   - stale law counts
   - references to nonexistent laws
   - references to superseded law numbers.

### Acceptance criteria

A repository-wide search must show one authoritative law count and no contradictory counts.

---

# 2. Fault cluster: Scenario-count drift

## Finding GOV-02

The current `PROMPT_PLAYBOOK.md` contains scenarios through Scenario 14, while other documentation still describes older scenario counts/ranges.

Observed:

- `PROMPT_PLAYBOOK.md`: **14 scenarios**
- `DOCS_MASTER_INDEX.md`: recognizes 14 templates but contains routing language referring to **Scenarios 1–12**
- `AI_RULES.md`: contains older language referring to **9 development scenarios**

### Severity

**SEV-2 — AI Workflow / Governance Integrity**

### Risk

An orchestrating AI may not know whether Scenarios 13–14 are active, deprecated, or optional.

This can cause incorrect agent routing.

### Surgical remediation

1. Make `docs/PROMPT_PLAYBOOK.md` the authoritative scenario registry.
2. Add an explicit scenario registry table:
   - scenario number
   - name
   - purpose
   - responsible agent
   - status: ACTIVE / DEPRECATED / EXPERIMENTAL
3. Replace all hard-coded old scenario counts elsewhere.
4. Replace generic text such as "Scenarios 1–12" with a reference to the registry.
5. Add a consistency scanner that extracts `Scenario N` references and verifies that N exists.
6. Mark deprecated scenarios rather than silently deleting historical references.

### Acceptance criteria

Every document mentioning a scenario must resolve to a valid scenario in `PROMPT_PLAYBOOK.md`.

---

# 3. Fault cluster: Marciale-OS version drift

## Finding GOV-03

Multiple version identities exist for TheHUB.

Observed:

- Root `package.json`: `1.5.5-v0.3.0`
- TheHUB `package.json`: `1.5.5.2.3-alpha`
- TheHUB directory name: `TheHUB 1.5.5.2.3 a v`
- `VERSIONING_GUIDE.md`: older `1.3.0.0v` reference

### Severity

**SEV-3 — Release/Documentation Integrity**

### Risk

AI agents and humans can infer different release states from different files.

### Surgical remediation

Do **not** simply replace all numbers with one number.

First define version domains:

```text
ECOSYSTEM_VERSION
THEHUB_VERSION
COMPANION_VERSION
TAMA_VERSION
DOCS_SCHEMA_VERSION
```

Then:

1. Declare the authoritative source for each version.
2. Keep package.json authoritative for executable package versions.
3. Keep ecosystem/release version authoritative only in one explicitly designated release-state document.
4. Remove version numbers from directory names where practical, or explicitly declare them as historical/build identifiers.
5. Update `VERSIONING_GUIDE.md` to describe the actual scheme rather than a historical version.
6. Add a version-drift audit.

### Acceptance criteria

A reader can determine the current version of each subsystem without comparing several documents.

---

# 4. Fault cluster: TAMA version drift

## Finding GOV-04

TAMA currently exposes conflicting version declarations.

Observed:

- TAMA `package.json`: `1.9.0-a`
- TAMA README: `3.0.0.0.a v`
- TAMA `VERSIONING_GUIDE.md`: `1.2.0.0.a v`

### Severity

**SEV-2 — Academic-System / Release-State Integrity**

### Surgical remediation

1. Treat TAMA's executable `package.json` version as the runtime package version unless the project explicitly defines another authority.
2. Define whether README version text is:
   - package version,
   - ecosystem release version,
   - milestone label,
   - or obsolete.
3. Update `VERSIONING_GUIDE.md`.
4. Remove unsupported "official version" claims from README until reconciled.
5. Add a version consistency audit covering both repositories.
6. Record the decision in the build/release log.

### Acceptance criteria

No document may call a TAMA version "official" unless it matches the designated authority.

---

# 5. Fault cluster: README/documentation entry-point duplication

## Finding GOV-05

Marciale-OS contains several README-like entry points:

- root `README.md`
- `README.txt`
- `README(updated).txt`
- `docs/README.md`

Some are repository overview material while others contain detailed subsystem material.

### Severity

**SEV-3 — Documentation Routing Risk**

### Risk

An AI may enter through the wrong document and treat stale or specialized material as the canonical project state.

### Surgical remediation

1. Define one canonical repository README.
2. Define the purpose of every additional README/text file.
3. Rename specialized README material to an explicit subsystem/documentation name where safe.
4. Add a "Document Authority" section to `DOCS_MASTER_INDEX.md`.
5. Add a `Canonical?` classification:
   - CANONICAL
   - DERIVED
   - HISTORICAL
   - SPECIALIZED
   - DEPRECATED
6. Ensure obsolete README copies explicitly redirect to the canonical document.

### Acceptance criteria

There is exactly one obvious first-entry README for the repository.

---

# 6. Fault cluster: `/docs` inventory drift

## Finding GOV-06

The root README describes `/docs` as an older "11-document" suite, while the actual directory has grown substantially and includes additional governance systems, web-department material, patchnotes, and other documents.

### Severity

**SEV-3 — Documentation Architecture Drift**

### Surgical remediation

1. Make `DOCS_MASTER_INDEX.md` the authoritative documentation inventory.
2. Replace fixed phrases such as "11-document suite" with dynamic/category-based language.
3. Categorize the current docs tree:
   - Constitutional
   - Architecture
   - SRE/QA
   - Planning
   - Agent Operations
   - Web Department
   - Historical/Patchnotes
4. Add status labels.
5. Add a "last inventory verification" field.
6. Add a scanner that checks whether every Markdown file in `/docs` is indexed or intentionally excluded.

### Acceptance criteria

Every active `/docs/*.md` document is either indexed or explicitly marked as non-indexed.

---

# 7. Fault cluster: Scenario 12 assumes runtime access

## Finding SRE-GOV-07

Modified Scenario 12 instructs an agent to execute tests, inspect browser behavior, repair issues, and verify all tests.

That is correct when the agent has a functional repository/runtime environment, but it lacks an explicit blocked-environment branch.

### Severity

**SEV-3 — SRE Procedure Weakness**

### Risk

An agent may interpret inability to execute as permission to infer success.

This conflicts with Law X.

### Surgical remediation

Add an explicit Scenario 12 execution state machine:

```text
ACCESS CHECK
    |
    +-- repository unavailable --> BLOCKED
    |
    +-- dependencies unavailable --> BLOCKED
    |
    +-- browser unavailable --> RUNTIME NOT VERIFIED
    |
    +-- execution available --> RUN AUDITS
                                |
                                +-- redmark --> DIAGNOSE
                                |
                                +-- green --> VERIFY
```

The scenario must explicitly prohibit:

- claiming tests passed when not executed
- claiming browser-console cleanliness without browser access
- claiming runtime security from static inspection alone
- applying a hotfix without a writable verified checkout

### Acceptance criteria

A blocked execution environment produces a formal `[BLOCKED]` report rather than a simulated green result.

---

# 8. Fault cluster: "43 tests" evidence model

## Finding SRE-GOV-08

The project repeatedly states that there are 43 tests/suites, but the actual test commands are distributed across root, TheHUB, and Companion package scripts.

### Severity

**SEV-3 — Verification Integrity**

### Surgical remediation

Do not hard-code "43" as a certification criterion unless the count is generated.

Instead:

1. Make the test runner enumerate discovered tests.
2. Generate a machine-readable test manifest.
3. Report:
   - discovered tests
   - executed tests
   - passed
   - failed
   - skipped
   - duration
4. Have CI/SRE report the actual count.
5. If "43" remains the expected baseline, compare the discovered count against 43 and flag drift.
6. Update documentation only after execution confirms the count.

### Acceptance criteria

A green report contains machine-generated evidence rather than a manually maintained number.

---

# 9. Recommended new source-of-truth document

## Finding ARCH-GOV-09

The ecosystem currently lacks a sufficiently compact machine-readable declaration of its current state.

### Severity

**SEV-2 — Architectural Governance Risk**

### Recommendation

Create:

```text
docs/SYSTEM_STATE.md
```

This should be a **state registry**, not another narrative roadmap.

Suggested fields:

```text
Repository
Commit
Ecosystem version
TheHUB version
Companion version
TAMA version
AI law count
Scenario count
Active agents
Documentation schema version
Test baseline
Last verified test run
Runtime verification status
Known blockers
```

### Critical rule

`SYSTEM_STATE.md` must not override code.

Its authority hierarchy should be:

```text
Executable/package metadata
        ↓
Runtime-generated verification
        ↓
SYSTEM_STATE.md
        ↓
Documentation
        ↓
Roadmap / plans
```

Where a conflict exists, the conflict is reported rather than silently resolved.

---

# 10. New automated governance audit

Add a dedicated audit such as:

```text
npm run audit:governance
```

It should check:

### Laws

- authoritative count
- stale count references
- nonexistent law references

### Scenarios

- authoritative scenario registry
- stale scenario references
- missing scenario documentation

### Versions

- package.json versions
- documented versions
- version-guide references

### Documentation

- unindexed Markdown files
- duplicate README claims
- deprecated documents without labels

### Test claims

- documented test count vs discovered test count
- stale "all green" claims without generated evidence

### Agent registry

- documented agents
- prompt-playbook agents
- AGENTS.md agents
- conflicting jurisdictions

The audit should produce machine-readable output and exit non-zero for contradictions that can cause agent misrouting.

---

# 11. Surgical implementation order

Do NOT attempt a broad documentation rewrite.

Recommended order:

```text
PHASE 1 — Freeze evidence
        ↓
PHASE 2 — Establish authorities
        ↓
PHASE 3 — Fix constitutional/scenario references
        ↓
PHASE 4 — Fix version declarations
        ↓
PHASE 5 — Fix README routing
        ↓
PHASE 6 — Add SYSTEM_STATE
        ↓
PHASE 7 — Add governance audit
        ↓
PHASE 8 — Execute full test suite
        ↓
PHASE 9 — Browser/runtime verification
        ↓
PHASE 10 — Update logbook
```

---

# 12. Files that should NOT be mass-edited

The following should not be mechanically rewritten merely to make numbers match:

- `BUILD_LOGBOOK.md`
- historical patchnotes
- repair dossiers
- incident reports
- historical roadmaps
- archived documents

Historical documents should retain historical truth.

Instead, label them:

```text
STATUS: HISTORICAL
VALID_FOR_CURRENT_STATE: NO
```

This avoids destroying the project's engineering history.

---

# 13. Verification requirements before declaring this hotfix complete

The implementing agent must execute:

```bash
npm run health
npm run audit:all
npm run audit:governance
npm test
```

Then verify:

```text
[ ] No constitutional-count contradictions
[ ] No scenario-count contradictions
[ ] No current-version contradictions
[ ] All active docs indexed
[ ] README authority is unambiguous
[ ] Agent registry is consistent
[ ] Test count is machine-generated
[ ] Scenario 12 has a blocked-environment path
[ ] Browser console checked
[ ] IndexedDB checked
[ ] No new SRE redmarks
```

Only after these are complete may the hotfix be labeled:

```text
VERIFIED / GREEN
```

---

# 14. Explicit non-claims

This proposal does NOT claim:

- that the application is currently down
- that an exploitable XSS exists in production
- that data loss is occurring
- that 43 tests currently pass
- that browser runtime is clean
- that every historical document is wrong
- that package.json is automatically the correct ecosystem-level version authority

Those require runtime or explicit project-owner decisions.

---

# 15. Final SRE classification

## Primary incident

**AI GOVERNANCE / DOCUMENTATION STATE DRIFT**

## Overall severity

**SEV-2**

## Immediate operational state

**STABLE BUT GOVERNANCE-UNSAFE**

The codebase should not be treated as unusable. However, the documentation layer should not continue accumulating major AI-generated changes without first establishing authoritative state and eliminating contradictory constitutional/version/scenario instructions.

## Hotfix status

**PROPOSED — NOT APPLIED**

## Runtime verification status

**BLOCKED / NOT VERIFIED**

## Repository mutation

**NONE**

---

## Architect's final recommendation

Do not make the next Assistant-generated feature update the immediate priority.

First establish:

```text
ONE LAW AUTHORITY
        +
ONE SCENARIO AUTHORITY
        +
ONE VERSION AUTHORITY
        +
ONE DOCS INDEX
        +
ONE MACHINE-GENERATED SYSTEM STATE
        +
ONE GOVERNANCE AUDITOR
```

Then let the Assistant continue building on top of that foundation.

That is the smallest intervention that addresses the observed root problem without rewriting Marciale-OS's architecture.
