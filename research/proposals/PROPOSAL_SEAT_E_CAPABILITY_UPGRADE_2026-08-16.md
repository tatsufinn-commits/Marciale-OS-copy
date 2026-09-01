# PROPOSAL — SEAT R (EXCEL) → SEAT A (TWMIP)
## Upgrading SEAT E (MAX / @engineer) Capabilities from the Guardrails Evidence
**DATE:** 2026-08-16 · **TREE:** 030f3db · **STATUS:** PROPOSAL — awaiting Seat A disposition (GREENMARK / UPDATE / CANCEL)

---

## 0. WHAT THIS IS AND IS NOT

This proposal converts the empirical guardrails research
(`research/RESEARCH_GUARDRAILS_RULES_AI_CODING_2026-08-16.md`) into a concrete capability
upgrade for **Seat E (MAX, @engineer)** — the house's Chief Construction Lead. It is:

- **PROPOSAL ONLY.** I authorize nothing; I build nothing. Seat A disposes; the Commander picks slices.
- **Decomposed.** Five builds, one bite each, in the anti-TSTT mold — no single tasking carries the program.
- **Evidence-anchored.** Every recommendation cites a primary source (P#/D#) from the research register *and* a Marciale-OS file where it lands.

---

## 1. THE EVIDENCE → ENGINEERING CAPABILITY MAPPING

The research found four transferable laws. Each maps to a specific, buildable Seat E upgrade:

| # | Empirical finding (source) | What it means for Seat E | Build |
|---|---|---|---|
| 1 | **Verification outranks proscription** — "give the model a way to verify its work" (D3); NIST MEASURE is the most-dropped function (D2); ~40% of unguarded code is vulnerable (P5) | Max's gate should *measure* every change, not merely assert it. | **Build 1** |
| 2 | **Rules have negative returns when stacked** — pass rate → ~0 at 20 guardrails (P2); Anthropic removed 80% of its system prompt (D5) | Max's specification/prompt surface must be *pruned and progressively disclosed*, not accumulated. | **Build 2** |
| 3 | **Specificity beats generality; anti-overengineering works** — "use 2-space indent" > "format properly" (D3/D4) | Max's specs should carry concrete, verifiable acceptance criteria + explicit no-scope-creep blocks. | **Build 3** |
| 4 | **Rules expire as models improve; small models collapse under self-improvement** (D5, P4) | Max's constraints must be versioned and model-aware — heavier for small/local engines, lighter for frontier. | **Build 4** |
| 5 | **Fail-closed + resilience primitives** (grok-build audit E3/G4/G5; VSS-00 isolation doctrine) | Max's verification loop needs a breaker and a fail-closed posture on external tooling. | **Build 5** |

---

## 2. THE FIVE BUILDS

### BUILD 1 — Verification-First Gate (the crown jewel)
- **What:** a `tools/verify-change.js` (or extension of `merge-gate.js`) that requires every
  Seat E deliverable to carry a *runnable proof*, not a claim — patterned on D3's
  "provide verification criteria" and NIST MEASURE. Three mandatory fields per deliverable:
  the command that proves it, its captured output, and the failure it would have caught.
- **Empirical basis:** P5 (40% vulnerable baseline) + D2 (MEASURE most-dropped) + D3 (trust-then-verify gap).
- **Blast radius:** new tool + `audit:all` wiring. No existing gate removed.

### BUILD 2 — Spec Pruning + Progressive Disclosure
- **What:** a lint (`tools/lint-spec.js`) that flags oversized/over-stacked spec & rule
  documents — the machine enforcement of the P2/D5 negative result. Trigger: any Max-facing
  spec or rule file over a byte threshold, or with conflicting MUST/NOT directives, gets a WARN.
- **Empirical basis:** P2 (guardrail stacking → zero) + D5 (80% removal, conflicting rules).
- **Blast radius:** new lint + CI hook. Non-destructive; flags only.

### BUILD 3 — Concrete Acceptance Criteria + Anti-Overengineering Template
- **What:** adopt the D4 "Overeagerness" block as a *standard Max spec header* — explicit
  "only make changes directly requested" + "only validate at system boundaries" + concrete
  verifiable criteria ("use 2-space indent", "run npm test before commit").
- **Empirical basis:** D3/D4 (specificity; the named over-specified failure).
- **Blast radius:** template addition to `docs/council/members/ENGINEER/`; no code change.

### BUILD 4 — Model-Aware Constraint Versioning
- **What:** a small registry (`tools/model-constraint-map.js` or a data file) that scales
  Seat E's constraint payload by target engine tier — minimal/external for 3B–8B local
  models, richer for frontier. Encodes "rules expire as models improve" as *data*, so a
  constraint can be deprecated without a code edit.
- **Empirical basis:** D5 (rules expire) + P4 (small-model collapse).
- **Blast radius:** new data file + one read path. Additive.

### BUILD 5 — Verification Circuit Breaker (fail-closed)
- **What:** a sliding-window breaker on Seat E's verification loop — if a proof-source
  (test harness, pangolin, build) errors repeatedly, the gate fails **closed** and reports
  degraded rather than green.
- **Empirical basis:** grok-build audit E3/G5 + VSS-00 isolation doctrine (fail-closed).
- **Blast radius:** `merge-gate.js` / verification path only.

---

## 3. WHY THIS ORDER

Verification-first (Build 1) is the empirical center of gravity and the highest-risk gap;
pruning (Build 2) prevents the house's own death-class; then specificity (3), model-awareness
(4), and finally the resilience primitive (5). Each builds on the last; none depends on a
later one. **Builds are authorized one at a time, by the Commander, never as a set.**

---

## 4. BOUNDARIES

- Seat R authors nothing (research-only). Seat E builds; Seat A disposes; Commander selects.
- No VSS overlap — this is a *capability* upgrade, not a runtime-audit slice.
- Law I/IV/VII hold (additive, one-bite, surgical).
- The guardrails research's own §7 flags are inherited: the "rules → maintainability" link
  rests on lab guidance (D3/D5), not controlled measurement; Build 2 and Build 3 should be
  treated as *strong engineering practice*, not peer-reviewed fact.

---

## 5. DISPOSITION REQUESTED

Seat A, please **dispose** (GREENMARK / UPDATE / CANCEL). If GREENMARK, I ask only that
**Build 1's** tasking be filed when the Commander selects it — nothing more.

— Seat R, EXCEL · research-only · proposal, not authorization
