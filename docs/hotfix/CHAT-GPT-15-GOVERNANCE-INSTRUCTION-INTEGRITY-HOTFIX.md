# HOTFIX: GOVERNANCE & INSTRUCTION INTEGRITY HOTFIX

**Proposed by:** CHAT-GPT-15

**mode:** AUTONOMOUS GOVERNANCE / INSTRUCTION-CHAIN REALITY AUDIT

**scope:** AI constitution, agent registry, prompt playbook, README entry points, scenario registry, test-contract language, cross-repository governance references

**repository:** Marciale-OS + TAMAKEE

**audit date:** 2026-08-11

---

## 1. Executive finding

A second layer of problems exists above the previously identified roadmap drift.

The repositories contain **self-contradictory instructions inside documents that are supposed to tell AI agents how to operate**.

This is more dangerous than ordinary stale documentation because the contradictions occur in:

- `AI_RULES.md`
- `AGENTS.md`
- `PROMPT_PLAYBOOK.md`
- root README files
- TAMA's masterplan

These documents collectively function as an AI operating system.

**Classification: SEV-2 — AI Governance / Instruction Integrity**

---

# 2. REDMARK GI-01 — AI_RULES says 9 laws while defining 13

## Evidence

`docs/AI_RULES.md`:

- heading: **"THE 9 SUPREME LAWS"**
- Laws I through XIII are actually present
- line 91 says the Prompt Playbook contains "all 9 development scenarios"

The actual file therefore contains **13 laws**, not 9.

## Impact

An AI receiving only the title or a copied summary can incorrectly conclude that Laws X–XIII do not exist.

This is especially serious because Laws X–XIII contain:

- no-false-completion rules
- challenge/evidence rules
- departmental governance
- token-budget execution rules

Those are operational constraints.

## Surgical remediation

1. Change the constitutional heading to reflect the actual numbered laws.
2. Search every repository document for:
   - `8 Supreme Laws`
   - `9 Supreme Laws`
   - `13 Supreme Laws`
   - `9 laws`
3. Classify each occurrence as:
   - current
   - historical
   - erroneous
4. Remove current-state contradictory counts.
5. Do not modify historical logs merely to erase history.

## Acceptance

A current-state search must yield exactly one authoritative law count.

---

# 3. REDMARK GI-02 — AGENTS.md claims five specialized roles but defines six core roles

## Evidence

`AGENTS.md` says:

> "any AI assisting the user must assume one of five specialized Agent Roles"

The topology lists:

1. Architect
2. Sentinel
3. Forge
4. Mind
5. SRE / IRT

But the same document later defines:

6. Pangolin

with:

- its own call sign
- reporting relationship
- jurisdiction
- responsibilities
- mandatory tools/tests

Then `/docs/web/` defines seven additional specialized operational agents.

## Impact

The phrase "one of five" is no longer accurate.

More importantly, an AI could interpret Pangolin as outside the official core squad despite Pangolin having a formal role under SRE.

## Surgical remediation

Replace the static count with an authority model:

```text
CORE SQUAD
Architect
Sentinel
Forge
Mind
SRE

SRE SUBORDINATE REPAIR ROLE
Pangolin

WEB ENGINEERING DEPARTMENT
Scout
Project Manager
UI/UX
Frontend
Backend
Fullstack
QA
```

The exact count should be generated from the registry or omitted.

## Acceptance

Every documented agent has:

```text
call sign
parent authority
jurisdiction
allowed files
mandatory verification
handoff protocol
status
```

---

# 4. REDMARK GI-03 — AGENT invocation still says "8 Supreme Laws"

`AGENTS.md` line 138 instructs incoming agents:

> "Follow the 8 Supreme Laws"

while `AI_RULES.md` currently contains Laws I–XIII.

## Classification

**SEV-2**

## Surgical remediation

Replace hard-coded law counts with:

```text
Follow the current Supreme Laws defined in docs/AI_RULES.md.
```

This prevents another future count drift.

---

# 5. REDMARK GI-04 — Prompt Playbook has 14 scenarios but its own references still say 9

## Evidence

`PROMPT_PLAYBOOK.md`:

- Scenario Selector contains Scenario 1 through Scenario 14.
- Heading says "14 MASTER PROMPT TEMPLATES."
- Scenario 12, 13, and 14 are present.

But:

`AI_RULES.md` line 91 says:

> "all 9 development scenarios"

`DEFINITIVE_MASTERPLAN.md` describes:

> `PROMPT_PLAYBOOK.md` as "9 Master Prompt Templates"

## Classification

**SEV-2**

## Surgical remediation

Make `PROMPT_PLAYBOOK.md` the scenario authority.

Other documents should say:

```text
See docs/PROMPT_PLAYBOOK.md for the current scenario registry.
```

Do not hard-code the number.

---

# 6. REDMARK GI-05 — Scenario 12's verification wording conflicts with Law X

Scenario 12 says:

> "implement the fix, and verify that all 43 test suites pass 100% green"

Law X says an AI must never claim a test passed without actual execution.

The scenario is therefore acceptable only in an environment where execution is possible.

## Surgical remediation

Change the operating contract to:

```text
If execution is available:
    run the required verification.

If execution is unavailable:
    report BLOCKED / NOT VERIFIED.
    do not implement or claim verification.
```

For a read-only diagnostic mode:

```text
diagnose → formulate remediation → do not mutate
```

---

# 7. REDMARK GI-06 — Test terminology is inconsistent

The Marciale README says:

```text
TheHUB = 12 Automated Test Suites
Companion = 31 tests
```

while `AGENTS.md` says:

> "all 43 automated test assertions"

and Scenario 12 says:

> "43 test suites"

These are not equivalent units.

Possible units include:

```text
test suites
test files
test cases
assertions
```

## Classification

**SEV-3 — Verification Language Integrity**

## Surgical remediation

Never describe the baseline as simply "43 tests" unless the runner actually reports 43 tests.

Instead report:

```text
Hub:
  suites = N
  tests = N
  assertions = N

Companion:
  suites = N
  tests = N
  assertions = N

Total:
  suites = N
  tests = N
  assertions = N
```

Use machine-generated output.

---

# 8. REDMARK GI-07 — TAMA's masterplan embeds stale Marciale governance counts

TAMA `DEFINITIVE_MASTERPLAN.md` describes:

- 9 Supreme Laws
- 9 Prompt Templates
- 13-document Marciale governance scaffolding

But the current Marciale `AI_RULES.md` has 13 laws and `PROMPT_PLAYBOOK.md` has 14 scenarios.

## Classification

**SEV-2 — Cross-repository governance drift**

## Surgical remediation

TAMA should not duplicate Marciale governance counts.

Replace duplicated values with references:

```text
Marciale governance authority:
../Marciale-OS/docs/AI_RULES.md

Scenario authority:
../Marciale-OS/docs/PROMPT_PLAYBOOK.md
```

If cross-repository access cannot be assumed, record the dependency explicitly.

---

# 9. REDMARK GI-08 — Repository identity drift

TAMA's own README says:

```text
TAMA/
```

and its AI prompt references:

```text
TAMAintegration.git
```

while the actual repository is:

```text
TAMAKEE
```

Its Definitive Masterplan also labels the subsystem:

```text
TAMAintegration/
```

## Classification

**SEV-2 — Repository routing integrity**

## Surgical remediation

Establish:

```text
repository name: TAMAKEE
project/system name: TAMA
```

If `TAMAintegration` is an internal subsystem or historical name, label it as such.

Do not allow it to masquerade as the repository identity.

---

# 10. REDMARK GI-09 — "single-source-of-truth" claim is contradicted by duplicated state

TAMA's Definitive Masterplan calls itself a:

> "single-source-of-truth blueprint"

Yet current state is duplicated across:

- package.json
- README
- VERSIONING_GUIDE
- DEFINITIVE_MASTERPLAN
- STUDY_LOGBOOK
- vault
- plugin

and these sources disagree.

Marciale has the same pattern between:

- AI_RULES
- AGENTS
- PROMPT_PLAYBOOK
- README
- BUILD_LOGBOOK
- roadmaps
- patchnotes

## Classification

**SEV-2 — Governance architecture defect**

## Surgical remediation

Define a hierarchy:

```text
CODE / PACKAGE METADATA
        ↓
EXECUTED VERIFICATION
        ↓
LIVING LEDGER
        ↓
CURRENT STATE REGISTRY
        ↓
ROADMAP
        ↓
README / HUMAN SUMMARY
        ↓
HISTORICAL PROPOSALS
```

No lower-level document may override a higher-level state source.

---

# 11. Acceptance test

The governance hotfix is complete only when:

```text
[ ] One law authority
[ ] One scenario authority
[ ] One agent registry
[ ] No stale law counts
[ ] No stale scenario counts
[ ] No stale agent counts
[ ] No repository identity ambiguity
[ ] Test terminology distinguishes suites/tests/assertions
[ ] Scenario 12 respects blocked execution
[ ] TAMA does not duplicate mutable Marciale governance counts
[ ] Current-state hierarchy is documented
```

---

# 12. Final classification

**Primary:** SEV-2 AI Governance / Instruction Integrity

**Secondary:** SEV-3 Verification Terminology

**Runtime exploitability:** NOT ESTABLISHED

**Code mutation:** NONE

**Required action:** Governance reconciliation before further autonomous build generation.

---

## Directive to Assistant

Do not solve these contradictions by globally replacing numbers.

First establish **authority**.

Then update derivative documents.

Preserve historical records.

The goal is not to make every document identical.

The goal is to make every document unambiguous about whether it represents:

```text
CURRENT TRUTH
TARGET STATE
HISTORICAL STATE
OR PROPOSAL
```

**— CHAT-GPT-15**
