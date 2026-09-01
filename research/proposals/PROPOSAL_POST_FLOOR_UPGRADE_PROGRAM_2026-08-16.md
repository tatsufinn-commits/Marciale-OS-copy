# PROPOSAL — SEAT R (EXCEL) → SEAT A (TWMIP)
## "Marciale-OS Post-Floor Upgrade Program" — an eight-build, fully-decomposed plan
**DATE:** 2026-08-16 · **TREE:** 030f3db (working) · **STATUS:** PROPOSAL — awaiting Seat A disposition (GREENMARK / UPDATE / CANCEL)

---

## 0. THE TWO GOVERNING CONSTRAINTS (read first — they are the whole point)

> **Constraint 1 — This program runs AFTER the VSS masterplan.**
> The VSS floor gate is the precondition, not a preference. All twelve VSS slices
> (VSS-00 through VSS-11) must be discharged and the floor set before Build 1 of
> this program is authorized. This program is the *roof*, never the *foundation*.
> Any sequencing that lets these builds start mid-VSS violates the Commander's
> order and is rejected on sight.

> **Constraint 2 — This program is eight separate builds, never one program.**
> TSTT died holding an undivided 12-slice, 2-repository order. Law XVIII-A and
> XVIII-B exist because of it. Therefore: **no single tasking, prompt, or
> continuation may carry more than one build.** Each build is a self-contained
> bite with its own blast radius, verification, and stop condition. A successor
> must be able to resume at any build boundary from the filed artifacts alone
> (Law XVIII-B resumability test). If anyone — including me, including you —
> hands a successor the whole eight-build plan at once, the successor is bound
> to refuse it and cite Law XVIII-A.

---

## 1. THE EVIDENCE BASE (what this proposal stands on)

This is not opinion. Every build below traces to a finding already filed in
`research/` with command output, file+line citations, and epistemic tags:

| Filing | Contains |
|---|---|
| `API_FOR_AI_RESEARCH_2026-08-15.md` | TheHUB is already a local AI system (18 tools, Ollama); extension opportunities + risks. |
| `COLONY_AUDIT_2026-08-15_grok-build.md` | 5 extractable patterns (caps, compaction, MMR, fail-closed sandbox, circuit breaker). |
| `COLONY_AUDIT_2026-08-15_agency-agents.md` | 4 extractable patterns (source-of-truth, lint, originality, schema export). |
| `CROSSREF_ANALYSIS_BENCHMARKS_TAMA_MARCIALE_2026-08-15.md` | 8 upgrades cross-referenced to defects on disk, prioritized. |
| `VSS_RECONNAISSANCE_DOSSIER_VSS00.md` / `VSS02` | Isolation, bridge, audio lifecycle findings (the floor this program builds on). |
| `AUDIT_EXPANSION_2026-08-16.md` | XSS false-positives settled; VSS-01 verified closed; grok-build "dream" pattern. |
| `SPEC_SEAT_E_TAMA_QUESTION_BANK_EXTRACTION_2026-08-16.md` | Seat-E-ready spec for Build 1. |
| `PROPOSAL_TO_SEAT_A_API_FOR_AI_EXTENSIONS_2026-08-15.md` | The earlier held proposal — **superseded by this one in scope, not in status** (still HELD). |

---

## 2. THE PROGRAM — EIGHT BUILDS, DEPENDENCY-ORDERED

Each build lists: **Objective · Blast radius · Verification · Why in this order.**
Every build is PROPOSAL ONLY. Authorization is the Commander's, one build at a time.

### BUILD 1 — TAMA Question-Bank Extraction (data-integrity foundation)
- **Objective:** move `TAMAKEE_QUESTIONS` out of `tamakee-studio-view.js:21` into a schema-driven `question-bank.json` + a lint (patterns A1+A2+A4).
- **Blast radius:** `tamaplugin/tamakee-studio-view.js` (one statement), `index.html` (one script tag), new `question-bank.json`. No runtime behavior change.
- **Verification:** JSON parses; schema lint passes; mock exam renders/grades identically; `npm test` stays green.
- **Why first:** highest value ÷ lowest risk ÷ zero deps; the *only* build where the core asset (ALE question bank) is currently fragile. Spec already filed for Seat E.

### BUILD 2 — Assistant Tool-Output Caps (context hygiene)
- **Objective:** apply grok-build's `DEFAULT_TOOL_OUTPUT_BYTES = 40_000` discipline to `08-assistant.js` — cap `read_website`, `search_memory`, `search_vault`, `get_summary`, `write_note` results.
- **Blast radius:** `modules/08-assistant.js` only (additive constants + truncation).
- **Verification:** a tool returning a huge payload is truncated to the cap; existing tool tests unaffected.
- **Why second:** ~3 lines of change that close the exact death-class that killed NTG (unbounded context injection). The law (§S) exists; this is the mechanism.

### BUILD 3 — Circuit Breaker on External Calls (resilience)
- **Objective:** add a sliding-window circuit breaker (grok-build pattern G5) to `server.py` `/api/mapua` (line 620, currently no timeout), then `/api/fetch` and Ollama probes.
- **Blast radius:** `server.py` (new breaker helper + wrapped call sites); no endpoint contract change.
- **Verification:** a hung/unreachable feed trips the breaker and returns a degraded response instead of hanging; `audit:bridge` still green.
- **Why third:** the exam countdown card depends on an unprotected external feed; a hang silently degrades a high-stakes surface.

### BUILD 4 — MMR Re-Ranking on Memory (retrieval quality)
- **Objective:** upgrade `retrieveMemory` (`08-assistant.js:836`) from keyword-scoring to MMR de-duplication (grok-build pattern G3 — Jaccard, zero embeddings).
- **Blast radius:** `modules/08-assistant.js` retrieval path only; storage unchanged.
- **Verification:** a query against a topic-heavy corpus returns diverse (non-redundant) hits; recall not regressed.
- **Why fourth:** zero-dependency first step toward the held semantic-memory ambition; improves the Marciale brain *and* TAMA vault recall.

### BUILD 5 — Compaction Transcript for Sessions (durability)
- **Objective:** give assistant chat sessions (and TAMA study sessions) a compacted, indexed, resumable Markdown store (grok-build pattern G2: `INDEX.md` + byte-capped segments).
- **Blast radius:** new storage module + wiring in `08-assistant.js` session handling; no existing data migrated destructively.
- **Verification:** a long session compacts to a resumable artifact; reloading restores state from the segment index.
- **Why fifth:** depends on Build 2's cap discipline; converts TAMA's "mock exam that vanishes on reload" into a durable artifact.

### BUILD 6 — Idle Memory Consolidation ("dream")
- **Objective:** port grok-build's `dream.rs` pattern (gated background consolidation + PID lock) as a small idle task over the Marciale brain.
- **Blast radius:** new consolidation routine + a `localStorage` timestamp/session-counter; retrieval path unchanged.
- **Verification:** consolidation fires only past gates (enabled/time/sessions); memory de-duplicated and summarized; no double-run under lock.
- **Why sixth:** depends on Build 4 (needs retrieval to measure redundancy); the only build addressing memory *quality over time*.

### BUILD 7 — Originality / Duplicate-Detection Lint (governance)
- **Objective:** add `check-agent-originality`-style shingle-overlap lint (pattern A3) to flag near-duplicate artifacts — seat definitions, laws, standing-order blocks.
- **Blast radius:** new `tools/` script + `audit:all` wiring; no content changes.
- **Verification:** a deliberately near-duplicate file triggers a WARN/FAIL at the calibrated thresholds.
- **Why seventh:** machine-enforcement of §S ("state it once"); the mechanism for a law that currently has none.

### BUILD 8 — Fail-Closed Isolation Doctrine (platform contract)
- **Objective:** adopt grok-build's fail-closed sandbox *doctrine* (pattern G4) as a checkable invariant over the isolation model VSS-00 documented.
- **Blast radius:** doctrine/documentation + the enforcement points VSS-00 identified (chess inline tier, CADAM); **largest bite — sequenced last, and only after VSS has set the floor this depends on.**
- **Verification:** the invariant ("an isolation boundary that cannot be enforced refuses to run") is checkable by a tool.
- **Why last:** it *is* the VSS-00 platform-contract conclusion; it must land on the finished VSS floor, never in parallel with it.

---

## 3. WHAT THIS PROPOSAL IS NOT

- **Not a VSS replacement.** It builds on VSS; it does not overlap, reorder, or absorb it.
- **Not a single deliverable.** Eight builds, eight authorizations, eight stop-and-report cycles.
- **Not an instruction to start.** Constraint 1 binds: nothing runs until the Commander says the floor is set.
- **Not a grant to me.** I author none of it (Seat R = research-only). Seat E builds; Seat A disposes; the Commander picks each slice.

---

## 4. DISPOSITION REQUESTED

Seat A, please **dispose** (GREENMARK / UPDATE / CANCEL). If GREENMARK, the
only thing I ask to be filed today is the **first build's tasking** — no build
begins until the VSS masterplan is discharged and the Commander names Build 1.
Everything else in this document stays parked, visibly, behind that gate.

— Seat R, EXCEL · research-only · proposal, not authorization
