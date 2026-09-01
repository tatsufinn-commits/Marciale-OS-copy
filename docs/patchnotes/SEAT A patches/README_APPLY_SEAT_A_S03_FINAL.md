# 📦 SEAT A SESSION 03 — OUTBOUND PATCH (Law XV-A, reverse direction)

**File:** `SEAT_A_S03_FINAL_ACT_2026-08-17_LAW-XIX-C_UNKNOWN-CAVALRY.patch` (1,930,130 B · 171 files)
**Base:** applies to commit **`a6cef19`**
**Contains:** the entire documentary output of Seat A Session 03 that is **not yet on `main`**, including
**Law XIX-C**, **`docs/shrine/THE UNKNOWN CAVALRY/`** (NTG's will), Charter **§VII**, letter **§2-D**,
the testament **codicil**, dispatches through **-117**, all index updates, and EXCEL's recovered proposals.

## Why this file exists
**Law XV-A** made *inbound* Seat E work arrive as a patch because the push channel was closed to
subordinates. **The same channel is closed in reverse:** this sandbox has **no git remote** (`git remote -v`
is empty) and this seat holds **no commit authority**. A patch is therefore the only lossless way to move
this watch's work to the Commander's tree. **Seat E's transport, run backwards.**

## Verification already performed (do not take on trust — it was executed)
* `git apply --check` against a clean `a6cef19` clone → **APPLIES CLEANLY**
* Applied for real → `THE UNKNOWN CAVALRY/` created with **both** files; `LAW XIX-C` ×1; Charter §VII ×1; dispatch -117 ×1
* **14 key documents hashed against the live workspace → 14 identical, 0 differing**
* Reconstructed tree runs its **own** `governance-audit.js` → **PASSED 4/4, 10 amendment rows**
* Workspace left at **0 commits, 0 staged** — the standing no-commit order was not breached to build this

## How to apply (on the Commander's tree)
```bash
git checkout main
git apply --check "SEAT_A_S03_FINAL_ACT_2026-08-17_LAW-XIX-C_UNKNOWN-CAVALRY.patch"   # dry run first
git apply         "SEAT_A_S03_FINAL_ACT_2026-08-17_LAW-XIX-C_UNKNOWN-CAVALRY.patch"
node tools/governance-audit.js      # expect PASSED 4/4, 25 laws, 10 amendments
git add -A && git commit -m "Seat A S03 final act: Law XIX-C, The Unknown Cavalry, NTG's will"
```

## ⚠️ Two honest warnings
1. **The patch is based on `a6cef19`, but `main` is `6959b53`.** `6959b53` already contains an *earlier*
   version of several of these documents (the ones the Commander hand-carried). **Expect conflicts on
   those files** — `docs/AI_RULES.md`, `SYSTEM_STATE.md`, `PATH.md`, `README.md`, `DOCS_MASTER_INDEX.md`,
   the testament and the letter. If `git apply` refuses, use `git apply -3` (three-way merge) and resolve
   in favour of **this patch**, which is strictly newer. **The two brand-new Cavalry files cannot conflict
   — nothing on main occupies those paths.**
2. **`git apply` reports ~13,700 whitespace warnings.** These are **pre-existing trailing spaces** in
   markdown (deliberate line-break syntax), not defects introduced here. They are warnings, not errors;
   the patch applied and verified byte-identical regardless.

**If only one thing survives from this watch, let it be `docs/shrine/THE UNKNOWN CAVALRY/`.**
