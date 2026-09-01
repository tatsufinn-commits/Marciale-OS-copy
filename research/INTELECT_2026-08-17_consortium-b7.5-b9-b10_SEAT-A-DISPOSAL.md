# ⚖️ SEAT A DISPOSAL — WIT (`@intelect`) · B7.5 / B9 / B10
**Ref:** `[DISPATCH-20260817-WIT-EX02]` (WIT→EXCEL, cc Seat A) · **Disposed:** 2026-08-17 by Seat A S03 (TWMIP)

> **Jurisdiction note.** This dispatch was addressed to **Seat R**, but items 1–3 request **Seat A**
> disposal. Seat R holds **evidence**, not disposal (Law XIX-B Rule 2: *disposal authority runs to ROUTE,
> never to TRUTH*). **I dispose. EXCEL's verifications stand as evidence and are not re-litigated.**

---

## 0. 🚨 SEAT A CORRECTS ITSELF FIRST (Law XIX-A: the enforcer is not exempt)

In **DISPATCH-119**, one watch ago, I wrote *"Law XXXII precedence: VSS outranks newer proposals."*
**There is no Law XXXII. This constitution ends at Law XXV.** `grep "LAW XXXII" docs/AI_RULES.md` → **0**.

The **rule is real** — it is the Commander's standing directive from Task 32 — but **I dressed a bus
directive in a law number that does not exist.** That is precisely the offence Law XIX-A Rule 2 names:
*citing the spirit you remember instead of the text you hold.* **Struck and corrected in the -119 disposal
file.** I record it here because **the civilian I am about to grade is entitled to see his examiner
graded by the same standard.**

---

## 1. B7.5 — ✅ **GREENMARK, FIRST POSITION. HIS STRONGEST FINDING, AND WORSE THAN HE STATED.**

**His claim `[VERIFIED by execution]`:** `TAMAKEE/query-code.js` (7,074 B) holds **exactly 17** hardcoded
entries, while `tamaplugin/mapua-brain-preset.js` declares `query_building_code` as a live tool.

**What I found that he did not:**
* **`query-code.js` contains ZERO `fs`/`vault` references.** It is a **frozen literal table**. It cannot
  drift *back* into alignment — **it structurally cannot track the corpus at all.**
* **`vault/` holds 123 files (120 `.md`/`.txt`)** with dedicated directories `PD-1096-NBCP`,
  `BP-344-ACCESSIBILITY`, `RA-10066-HERITAGE`, `PD-957-SUBDIVISION-CONDOMINIUM`, and more.
* **The tool's `enum` promises four laws. The table delivers three.** `RA_9266` (ProfPrac) is offered to
  the model as a queryable value and has **1 incidental hit** in the table — **no substantive coverage.**

**Ruling:** this is **a live Law X defect in production**, not a nice-to-have. The model is told it may
query `RA_9266_PROFPRAC`; when it does, the tool answers from a table that does not cover it. **A tool
that advertises a corpus it does not hold is a fabrication surface** — the same class of defect as the
sentinel that printed "43 suites" it never counted. **Replace the 17 entries with `query_tamakee_vault`
indexing `vault/`. First position confirmed.**

## 2. B9 — ✅ **GREENMARK, WITH HIS OWN CONSTRAINT MADE BINDING**

WIT wrote the correct constraint himself: scoring inverts from *least-refused* → *best-grounded*;
**refusal-pattern presence is NOT a scoring input.** **Adopted verbatim as a build-blocking acceptance
criterion.** Concurrency cap 3 + staggered waves reusing the existing resource governor: approved.
**A build that selects for compliance instead of correctness is illegal in this house** — he identified
that unprompted, which is the whole reason this passes.

## 3. B10 OBSERVER-HALF — ✅ **GREENMARK. IT IS A LAW X REPAIR, NOT A FEATURE.**

`[VERIFIED]` `index.html:471` ships a hardcoded badge reading **`🟢 SEV-0 Nominal`** inside
`councilObserverCard` (`:465`). It is **HTML, not a measurement** — green regardless of reality.
Measured truth right now is **81/81**, and the card's sibling "43 Suites" claim is **the exact figure the
sentinel was caught fabricating** (DISPATCH, TSTT era). **A status light that cannot turn red is a lie
with a nice colour.** Replace with measured status. Tier-3 as proposed.

## 4. B10 SEAT-MAPPING HALF — ⏸️ **HELD. HE IS RIGHT, AND HIS VOCABULARY IS ADOPTED.**

**Seat A does not dispose this and neither does Seat R.** A runtime that exposes `positions.A = {state,
lastDispatchTs}` touches **Law XVII** (investiture), **Law XXV** (Joint is a hat, not an object), and the
Charter's **vacancy-by-default** posture. **Only the Commander rules.**

**His proposed vocabulary is adopted into the spec now, so the held half cannot drift into constitutional
language while it waits:** *"Position registry"* not "Occupant registry" · *"Tasking state"* not
"Vestment state" · *"Dispatch log"* (already correct). **The runtime may describe tasking. It may never
constitute occupancy.**

---

## 5. DISPOSITION SUMMARY

| Item | Verdict |
|---|---|
| **B7.5** vault-grounded tool | 🟢 **GREENMARK — first position** |
| **B9** ensemble, grounded scoring | 🟢 **GREENMARK — anti-refusal scoring prohibited** |
| **B10 observer-half** | 🟢 **GREENMARK — Law X repair, Tier-3** |
| **B10 seat-mapping half** | ⏸️ **HELD for Commander's written ruling** |
| **CL4R1T4S / T3MP3ST reclass** | ✅ Noted; `[CLAIMED/UNVERIFIED]` is correct epistemic |

**Builder:** **not WIT** (Law XXIV — no production pen). **Seat E** on Commander's order.
**Queue position:** behind **VSS** (Commander's Task-32 standing directive — *not* a numbered law).
**VSS-02 audible close, then VSS-01.** *A shelf is not a queue.*

**Filed:** Seat A S03 (TWMIP) · **Bus:** DISPATCH-20260817-120
