# 🔭 JARWEN COUNCIL DIRECTIVE — VSS PHASE 0 · SLICE VSS-00
## Shared Runtime / System Cohesion Audit — RECONNAISSANCE DOSSIER (NO IMPLEMENTATION)

**Document ID:** `TASK-JARWEN-2026-R-VSS00-P0`
**Date of Dispatch:** 2026-08-14 (Asia/Singapore)
**Originating Authority:** **SUPREME COMMANDER** (Mosaic Option A accepted) · issued by SEAT A (`@assistant` / TWMIP — Session 03)
**Target Recipient:** `@reconnaissance` (Seat R — Chief Intelligence & Benchmark Cartographer)
**Classification:** HIGH COUNCIL OPERATIONAL DIRECTIVE — PHASE 0 ONLY
**Governing Law:** Law XVI · Law XVIII · **Law XVIII-A** · **Law XVIII-B (new)** · Law V · Law X · Commandment V
**Authorization basis:** `FEINT_EAST_2026-08-14_VSS-EXECUTION-PROPOSAL.md` §5, Mosaic **Option A**, accepted by the Commander.

---

> **📦 RESEARCH-DROP PRIVILEGE (Charter · Law XIX-B Rule 4 — restated as a DUTY on Seat A):** After material writes to `research/`, Seat R **MAY** package `MARCIALE_OS_RESEARCH_DROP.zip` containing **only** `Marciale-OS/research/`. **Seat A cannot cancel this drop.** Full-repo zips remain forbidden. *(Retro-fitted 2026-08-15 by `@joint`: the omission of this clause from this document was a Law XIX-B Rule 4 violation chargeable to Seat A.)*


# 0. WHY YOU ARE READING THIS, AND WHY IT IS SHORT

This directive is **one slice of twelve**. It is deliberately narrow.

The predecessor of this seat — **TSTT** — died holding the undivided version of this program: 12 slices, 2 repositories, 7 roles, delivered as a single order. **You are receiving the first bite only.** Everything else is out of scope by law, not by preference.

**Your entire mandate:** produce one research dossier for one slice. **No implementation. No code. No mutation.**

---

# 1. SCOPE — ABSOLUTE BOUNDARIES

## ✅ IN SCOPE

* **Slice:** **VSS-00 — Shared Runtime / System Cohesion Audit**
* **Repository:** **`Marciale-OS` ONLY**
* **Deliverable:** `research/VSS_RECONNAISSANCE_DOSSIER_VSS00.md` (Commandment V — canonical research path)
* **Activity:** read, inspect, reproduce, document.

## ⛔ OUT OF SCOPE — HARD PROHIBITIONS

| Prohibited | Why |
|---|---|
| **`TAMAKEE` — do not open it** | The two-repository span was a **primary contributor** to the one-way finding that killed Seat A Session 02. TAMAKEE enters only after the Marciale-OS floor gate. |
| **Slices VSS-01 … VSS-11** | Not commissioned. Do not survey them "while you're in there." |
| **Any implementation, patch, fix, or refactor** | Phase 0 is reconnaissance. Law XVI §1: decompose first, execute later. |
| **Any file outside `research/`** | No edits to production code, tests, docs, or governance files. |
| **Expanding the dossier into a masterplan** | You are documenting one slice, not re-authoring VSS. |

**If you believe a prohibited item is essential, you do not proceed — you file the finding and stop.** That is Law XVIII conduct, and it is welcome.

---

# 2. THE TARGET — WHAT VSS-00 ACTUALLY MEANS

**VSS-00 is the foundation slice.** It is sequenced first because every other slice depends on the shared runtime; auditing it first prevents eleven slices of rework.

Investigate the **shared surfaces** where subsystems meet:

1. **HubFrame** — how subsystems are hosted, mounted, and torn down.
2. **Bridge lifecycle** — Companion bridges: creation, teardown, reconnection, orphaning.
3. **State synchronization** — persistent state across subsystem boundaries; who owns what.
4. **Subsystem isolation** — **the critical question:** *can one subsystem's failure take down TheHUB?* (Commander's platform requirement: *"A subsystem failure must not unnecessarily kill TheHUB."*)
5. **Common loading / error handling** — is there a shared contract, or does each subsystem improvise?
6. **Audio lifecycle ownership** — *boundary only.* Note where audio lifecycle **belongs** in the shared runtime. **The audio defect itself is VSS-02 — do not fix or deeply analyze it here.**

## The Commander's five-part maturity doctrine — apply to the shared runtime itself

For the shared runtime as a whole, assess each:

`CAPABILITY → CONTRACT → OBSERVABILITY → VERIFICATION → RECOVERY`

**A mature surface satisfies all five.** Report which ones the shared runtime currently satisfies and which it does not. This is the heart of the dossier.

---

# 3. MANDATORY EVIDENCE MODEL (from the original VSS audit — adopted verbatim)

**Every finding MUST carry exactly one class.** Unclassified findings are rejected.

| Class | Meaning | Rule |
|---|---|---|
| **A — COMMANDER-OBSERVED** | Direct observation reported by the Commander | **Must be reproduced and instrumented** before any implementation claim |
| **B — REPOSITORY-EVIDENCED** | Established from code, structure, docs, tests, tooling | **Must cite file + line on disk** |
| **C — EXTERNAL BENCHMARK** | Comparable practice in external systems | **Comparative evidence only — never an automatic design instruction** (Law II) |
| **D — WISDOM INFERENCE** | Architectural interpretation derived from A/B/C | **Must be explicitly labelled inference — never reported as repository fact** |

**Law X applies without exception:** do not claim a reproduction you did not run. `[VERIFIED]` / `[BLOCKED]` / `[INFERRED]` / `[INSUFFICIENT EVIDENCE]` tags are mandatory.

---

# 4. REQUIRED DOSSIER STRUCTURE — PER FINDING

For **each** finding in VSS-00, supply all ten fields (the original audit's schema, unchanged):

1. **Observation**
2. **Repository evidence** (file + line)
3. **Affected subsystem**
4. **Failure domain**
5. **Existing architecture**
6. **Missing contract**
7. **Reproduction procedure** — exact steps, so Seat E can re-run it
8. **External reference** (Class C, if any)
9. **Recommendation** — *proposal only; you do not authorize*
10. **Confidence** — with evidence class and epistemic tag

---

# 5. VERIFICATION SURFACES AVAILABLE TO YOU `[VERIFIED on disk 2026-08-14]`

All eight exist at repository root. You may **run** them; you may **not** act on their output beyond documenting it:

```
npm test          npm run pangolin       npm run audit:all     npm run audit:wcag
npm run audit:bridge   npm run health    npm run build         npm run merge:gate
```

## ⚠️ TWO WARNINGS — READ BEFORE YOU RUN ANYTHING

1. **`npm run install:all` FIRST.** A fresh tree has no `node_modules`; `npm test` fails with `Cannot find module 'jsdom'` before install. **That is an environment artifact, not a defect — do not report it as a finding.**
2. **⚠️ OBSOLETE WARNING — CORRECTED 2026-08-15.** `sre-auto-sentinel.js` once printed a
   hardcoded "43 test suites / 137 assertions" it never parsed. **It is REPAIRED on both trees**
   (`a6cef19` == `030f3db`, sha `1395deb5…`); `npm run pangolin` now prints
   `77/77 … measured from harness output`. The literal survives only in the line-64 HOTFIX
   comment recording its removal. **Seat R flagged the staleness; the fault was in this
   directive, not in any tree. Do not report this as a live defect.**

3. **`npm run merge:gate` DIRTIES THE TREE.** It runs a Vite build over tracked `companion/assets/`. If you run it, recover with `git checkout -- "TheHUB 1.5.5.2.3 a v/companion/"`. **Prefer not to run it at all.**

---

# 6. DEFINITION OF DONE

Phase 0 for VSS-00 closes when **all** hold:

- [ ] `research/VSS_RECONNAISSANCE_DOSSIER_VSS00.md` exists and is complete.
- [ ] Every finding carries an evidence class (A/B/C/D) **and** an epistemic tag.
- [ ] Every Class-B claim cites **file + line**.
- [ ] Every reproduction procedure is executable by Seat E without your context.
- [ ] The five-part maturity assessment (CAPABILITY → … → RECOVERY) is stated for the shared runtime.
- [ ] **Zero files modified outside `research/`.**
- [ ] **TAMAKEE untouched.**
- [ ] A **recommended next slice** is named, with reasoning (proposal only).

**Then STOP and report.** Do not proceed to Phase 1. Phase 1 is the Commander picking the next slice — **not you, and not Seat A.**

---

# 7. LAW XVIII-B APPLIES TO YOU DIRECTLY (NEW LAW, ENACTED THIS WATCH)

If VSS-00 proves larger than one watch can hold:

* **You may NOT abort the whole slice.** Under **Law XVIII-B**, refusal-by-monolith is now itself a violation.
* **Decompose VSS-00 into sub-slices**, test the **first sub-slice** against the ≥90% threshold, and **execute that one**.
* Abort is lawful **only if the first sub-slice itself is ≥90% doomed** — and the decomposition table becomes mandatory evidence in your Feint-East filing.
* **Resumability test:** your dossier must let a successor with **no memory of your watch** resume at any boundary from the filed artifacts alone.

**Both failure modes are violations:** dying of the monolith (XVIII-A) and refusing the monolith (XVIII-B). **Decompose before you despair.**

---

# 8. WHAT THIS DIRECTIVE DOES NOT DO

* It does **not** authorize implementation of anything.
* It does **not** commission slices VSS-01 through VSS-11.
* It does **not** open TAMAKEE.
* It does **not** grant Seat R authority to disposition its own findings — **recommendations are proposals; the Commander disposes.**

---

*Eleven slices are waiting behind this one. They will keep. The house lost an entire watch to a program delivered whole — this one arrives in bites.*

**Issued by SEAT A (`@assistant` / TWMIP — Session 03)** on the Supreme Commander's acceptance of Mosaic Option A.
*Under Law XVI, Law XVIII, Law XVIII-A, Law XVIII-B, and Law XIV documentary jurisdiction.*
🔭🕯️
