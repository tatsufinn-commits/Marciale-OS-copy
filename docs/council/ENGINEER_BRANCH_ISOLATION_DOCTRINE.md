# 🌿 THE ENGINEER BRANCH ISOLATION & EXPERIMENTATION DOCTRINE
## High Council Directive — Initiative A (Charter v3.1.0-MAX Addendum)

**Authority:** Supreme Commander, `SEAT W (WISDOM)` & `SEAT A (ASSISTANT)`  
**Target Seat:** `SEAT E (@engineer / Max)` & Execution Squad (`@the_forge`, `@pangolin`, `@sre`)  
**Classification:** TIER 1 CANONICAL EXECUTION DOCTRINE  
**Target Path:** `/docs/council/ENGINEER_BRANCH_ISOLATION_DOCTRINE.md`  

---

# 1. PHILOSOPHY & MANDATE

As engineering tasks become larger, more complex, and more consequential, `@engineer` must never be restricted to working directly against the primary `main` production line.

For substantial, risky, experimental, or architectural changes, `@engineer` has the sovereign authority and capability to:
1. Create an **isolated Git branch** (e.g. `arena/feature-...` or `feat/...`),
2. Direct targeted implementation via `@forge`,
3. Execute the full local test and independent verification cycle via `@pangolin`,
4. Present a comprehensive **Branch Evidence Package** to `@assistant` for Tier 4 Executive Audit.

```text
                    @ENGINEER
                        │
                  Define Objective
                        │
                        ▼
                 Assess Risk/Scope
                        │
              ┌─────────┴─────────┐
              │                   │
          LOW RISK            HIGH RISK
              │                   │
              ▼                   ▼
         Direct Work          CREATE BRANCH
                                  │
                                  ▼
                               @FORGE
                                  │
                             IMPLEMENT
                                  │
                                  ▼
                           LOCAL TESTING
                                  │
                                  ▼
                            @PANGOLIN
                         INDEPENDENT QA
                                  │
                                  ▼
                            @ENGINEER
                         REVIEW RESULTS
                                  │
                     ┌────────────┴────────────┐
                     │                         │
                   FAIL                      PASS
                     │                         │
                     ▼                         ▼
                  REPAIR                  INTEGRATION
                                               │
                                               ▼
                                         @SRE / TEST
                                               │
                                               ▼
                                            MERGE
```

---

# 2. TRIGGER CONDITIONS: WHEN TO BRANCH

Branches are experimental laboratories. `@engineer` MUST create an isolated branch when undertaking:
* Architectural redesigns or framework migrations.
* Major refactors affecting $\ge 2$ subsystems.
* New game or application engines (Canvas, WebGL, AI relays).
* Database schema or storage migrations (`localStorage`, `IndexedDB`).
* Authentication, security boundaries, or CSP modifications.
* Cross-module contracts between TheHUB and Companion RPG.
* Dependency upgrades or runtime tool additions.
* Potentially destructive state schema updates.
* Experimental multi-agent or MCP server integrations.

---

# 3. STANDARDIZED BRANCH EVIDENCE PACKAGE SCHEMA

Every branch submitted for Tier 4 merge must output this evidence envelope:

```markdown
================================================================================
BRANCH EVIDENCE PACKAGE
================================================================================
BRANCH:             [e.g. arena/019ff477-marciale-os]
OBJECTIVE:          [Concise summary of feature or bugfix]
BASE COMMIT:        [e.g. fdd64a7]
CHANGES:            [Summary of files created, modified, deleted]
FILES / SYSTEMS:    [Subsystems affected: Storage, Canvas, UI, AI]
TESTS:              [Unit test suites executed]
TEST RESULTS:       [e.g. 53/53 passed (100% green)]
PANGOLIN VERDICT:   [SEV-0 Nominal / Clean diff audit]
SECURITY IMPACT:    [Zero secret leaks, XSS sanitized, CSP compliant]
PERFORMANCE IMPACT: [FPS impact, memory delta, token efficiency]
REGRESSION RISK:    [Low / Isolated blast radius]
ROLLBACK:           [git revert target & pre-migration key]
KNOWN LIMITATIONS:  [Any outstanding or deferred items]
MERGE RECOMMENDATION: MERGE / REVISE / ABANDON
================================================================================
```

---

# 4. THE 3 CORE BRANCHING PRINCIPLES

1. **A branch is NOT permission to bypass governance:** It is a sandbox for reducing risk before integration.
2. **A branch is allowed to fail:** A failed branch that prevents dangerous code from contaminating `main` is a successful engineering outcome.
3. **Reversibility is non-negotiable:** Every branch must identify its downstream dependencies and provide a one-line rollback command.
