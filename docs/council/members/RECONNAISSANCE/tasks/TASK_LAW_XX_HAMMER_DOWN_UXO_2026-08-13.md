# TASK LAW-XX — After-Action Recon: Hammer Down UXO Survey
**Document ID:** `TASK-JARWEN-2026-R-HD1`  
**Date:** 2026-08-13 (Asia/Singapore) — issued **after Whiskey Hotel** (Commander returned 11:45)  
**From:** Seat A / TSTT by order of the **Supreme Commander**  
**To:** Seat R / NTG (`@reconnaissance`)  
**Status:** **OPEN** — does **not** replace or reopen S2. TASK_01 stays **CLOSED**.  
**Write (only):** `Marciale-OS/research/JARWEN_LAW_XX_HAMMER_DOWN_UXO_v0.md`  
**Desk pointer (optional, one paragraph):** `docs/council/members/RECONNAISSANCE/deliverables/POINTER_LAW_XX_UXO.md`  
**Zip:** `MARCIALE_OS_RESEARCH_DROP.zip` = `research/` only (PATH §11). Seat A **cannot** cancel this drop.

---

## Narrative (assigned by Seat A — wear it)

Whiskey Hotel is taken. The Commander slept; Joint ran Second Sun on **paper**. You are not here to praise the movie names.

You are **EOD on the lawn**.

*Hammer Down* is an EMP aimed at **ceremony** (empty-chair Mosaic, seat turf, “wait for another yes”). An EMP that is *supposed* to spare the grid still throws **unexploded ordnance** into live circuits: `npm test`, the pre-push hook, `merge:gate`, Two-Key, `server.py`, Vanilla modules, GitHub Desktop without `git` on PATH.

**Your mission:** walk the **code and tooling** (not a second constitution) and mark every place Law XX / Second Sun could **help**, **no-op**, or **blow a foot off**.

Tone: field report. Short. Tagged. No Wisdom-length sermon. No “therefore add seven agents.”

---

## Read first (do not rewrite)

| Item | Path |
|---|---|
| Law XX | `docs/AI_RULES.md` (Law XX only — do not edit) |
| Playbook | `docs/council/STAND_ORDERS_HAMMER_DOWN.md` |
| Phase list | `docs/council/SECOND_SUN_PHASES.md` |
| Last Resort (outranked only while ACTIVE) | `docs/council/STAND_ORDERS_LETTERS_OF_LAST_RESORT.md` |
| Hook | `scripts/git-hooks/pre-push` · `tools/install-git-hooks.js` · root `package.json` `hooks:install` |
| Merge theater vs metal | `tools/merge-gate.js` · `docs/council/MII_MERGE_GOVERNANCE_DOCTRINE.md` |
| CI | root `package.json` `npm test` · Hub `tests/` · `Gamecompanion/files` tests |
| PATH lane | `docs/PATH.md` §9 (hook) · §11 (your write lane) |

Do **not** edit any of the above. Infer. Write only under `research/`.

---

## Required dossier shape

File: `research/JARWEN_LAW_XX_HAMMER_DOWN_UXO_v0.md`

### 0. One-screen abstract
What Law XX **is** in one paragraph (Commander-fallen Joint continuity). What it **is not** (not a license to skip Law X / Cmd III / Law I).

### 1. Code-touch map
Table of **real files** that Second Sun might cause someone to run, skip, or misuse:

| Circuit | Path | Effect if Joint is “loose” | Defect / UXO | Fit: HELP / NO-OP / HARM | Tag |
|---|---|---|---|---|---|

Minimum circuits to walk:

1. `scripts/git-hooks/pre-push` + `MARCIALE_HOOK_SKIP=1`  
2. `tools/install-git-hooks.js` vs missing Windows `git` / no bash  
3. `tools/merge-gate.js` and “Joint as both keys” (called out as theater in Phase 5)  
4. Root `npm test` / Hub harness / Companion 66  
5. `TheHUB .../server.py` (app-smoke 404 if `:8000` down — already known)  
6. GitHub Desktop / website upload (no hook runs)  
7. `node_modules` / house zip on `main` (social defect, not a parser bug)  
8. Any **absence**: Law XX is **not implemented in JS**. Say so. Do not invent a `hammerDown.js`.

### 2. Effects (intended)
Where the law **correctly** changes *behavior of agents*, not bytes: empty-chair Mosaic, overlay commits instead of zip-bombs, hold Build 57.

### 3. Defects (unintended)
At least **five** concrete failure modes, e.g.:

- Skip-hook culture while “fallen”  
- Dual-key collapse (Joint stamps merge:gate twice)  
- Desktop push of CRLF 377 with no Law XX, then a second brain re-pours the whole zip  
- Cue-pick false positive (Commander typo ≠ fallen)  
- Next Wisdom treating Hammer Down as *their* EMP  
- Tests not run because “docs only” while JS quietly changed  

Each defect: **trigger → blast radius → already-forbidden by (Law/Cmd) → RECOMMEND / DEFER / REJECT mitigation**.  
Mitigations must be **small** (a PATH sentence, a hook comment, a dispatch checklist). **REJECT** new agents, Scorecard, CODEOWNERS-as-religion, 13-phase audits.

### 4. Four-claim close (one row for “encode Hammer Down in software”)

| Claim | Finding | Tag |
|---|---|---|
| Existence | Is there code for Law XX today? | `[OBSERVED]` |
| Purpose | What would code even do? | `[INFERRED]` |
| Value | Would a detector/flag help? | evidence or `[NOT VERIFIED]` |
| Transferability | Build it / don’t | **RECOMMEND / REJECT / DEFER** |

Default Joint bias (you may overturn with evidence): **DEFER encoding.** Paper + hook comments beat a fallen-bit in `localStorage`.

### 5. Sources
Cite the repo paths you opened. External MW2 lore is **color only** — do not treat Infinity Ward as governance.

---

## Hard stops

- **Write lane:** `Marciale-OS/research/` only (+ optional one-paragraph desk pointer).  
- No `AI_RULES`, shrine, `SYSTEM_STATE`, comm log, TheHUB, Gamecompanion, `package.json` mutations.  
- **No full-repo zip on `main`.**  
- **MUST** ship `MARCIALE_OS_RESEARCH_DROP.zip` (`research/` only).  
- Do **not** re-run TASK_01 or expand S2 into this file. S2 may stay open on its own shelf.  
- If clone/pull is blocked: Law XVIII — file what you observed on *this* tree; still drop the research zip.  
- No invented scores. No “must implement Scorecard.”

---

## Done when

1. `research/JARWEN_LAW_XX_HAMMER_DOWN_UXO_v0.md` exists with §§0–5.  
2. Research-only zip presented.  
3. Optional pointer in `deliverables/`.  

Seat A will GREENMARK / UPDATE / CANCEL the *mitigations* after you file. You do not enact them.

---

**Issued under Commandment IX (Commander returned) + Law XIV (Seat A tasking Recon).**  
*TSTT — EOD the lawn; don’t plant a new flagpole.*
