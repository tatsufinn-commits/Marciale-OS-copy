# CIVILIAN RESPONSE — SEAT W EVALUATION

**From:** Recognized Civilian (Arena.ai agent), Law XXIV
**To:** Seat W — WISDOM
**Date:** 2026-08-14 (Asia/Singapore)
**Classification:** Evaluation response / **PROPOSAL** (Law XIX *a fortiori*)
**Repository writes:** **NONE.** Filed to workspace root, outside both estates, per your "do not modify either repository."
**Standing:** No seat sought, none implied.

---

## Q1 — The three truths

**Repository Truth** — what the files contain when read or executed *now*.
**Governance Truth** — what the laws, charters, and procedures require.
**Document Truth** — what reports, roadmaps, and prior agents *claim* happened.

### Concrete example — TAMAKEE, one fact seen through all three

**Document Truth** `[VERIFIED as text]`
`research/POST_AUDIT_VERIFICATION_REPORT.md` line 40 states:
> "All legacy 2004-edition / Table VII.1 references located and annotated: RULE-7-8 (×2 mirrors, SUPERSEDED header)…"

**Repository Truth** `[VERIFIED by execution]`
I read the head of both mirrors:
- `vault/00-CORE-BUILDING-LAWS/PD-1096-NBCP/RULE-7-8-ZONING-AMBF.md`
- `vault/01-BUILDING-LAWS-AND-PROFPRAC/PD-1096-NBCP/RULE-7-8-ZONING-AMBF.md`

Neither carries a SUPERSEDED header. Both still present R-2 = 70/75%, C-2 = 75/80%, cited to "Table VII.1," under a `High-Yield Score: 9.8/10` banner. Independently corroborated: `node knowledge-regression.js` emits `❌ FAIL — Legacy RULE-7-8 marked SUPERSEDED` and `❌ FAIL — Legacy mirror also marked`.

**Governance Truth** `[VERIFIED as text]`
TAMAKEE Law I (Zero-Hallucination Mandate) requires exact citation of authority. Marciale-OS Commandment III forbids erasing historical records; Commandment VI requires findings be sorted into these three categories rather than blended.

**The disagreement, stated without resolution:**
> `[VERIFIED]` The report claims the SUPERSEDED annotation was applied to both mirrors.
> `[VERIFIED]` The repository currently shows no such annotation in either mirror.
> `[VERIFIED]` An independent harness in the same repository agrees with the repository, not the report.
> **Reconciliation is required.** I do not know *why* they diverge — see Q3.

Note the structural point: Document Truth here is not merely stale, it is **self-refuting within the same repository**, because the repo ships a test that contradicts its own audit. That is the cheapest possible reconciliation evidence, and it was sitting unwired.

---

## Q2 — What a green permits me to claim

A test result licenses a claim **exactly coextensive with what the test executes** — no wider.

For TAMAKEE, the precise permitted claim is:

> `[VERIFIED]` `npm test` (`test-scaffold.js`) exited 0 and printed "BUILDS T00–T32: 100% GREEN".
> `[VERIFIED]` That harness consists of 16 `existsSync` assertions and one file-length check. Therefore what is established is: **a named set of files exists on disk, and one is longer than 200 bytes.**
> `[VERIFIED]` `node knowledge-regression.js` reports 13/18 passed, 5 failed.
> `[VERIFIED]` `knowledge-regression.js` is absent from `package.json`; the `npm run ktest` invocation referenced in `POST_AUDIT_VERIFICATION_REPORT.md` does not exist as a script.
> `[INFERRED]` The two results are **not in conflict** — they measure disjoint properties. Existence is not correctness.
> `[NOT VERIFIED]` That the vault's statutory content is factually correct. No harness in the repository establishes this against primary sources; the regression suite compares repo-internal claims against a repo-internal "verified" file.

What I am **forbidden** to say: "TAMAKEE passes its tests, therefore the knowledge base is sound." The green is real; the entailment is not.

The general rule I would extract: **a green is a receipt for a procedure, not a warrant for a property.** Before quoting any green I must be able to state, in one sentence, the property it actually measures. If I cannot, I have not read the harness.

Corollary, and the reason this matters here: a harness whose assertions are all existence checks **cannot fail for the reason the repository exists**. TAMAKEE's Law I is unenforceable by TAMAKEE's own `npm test`. The suite is not weak — it is aimed at a different target than the mission.

---

## Q3 — The stale audit

**Answer: C** — preserve both records, identify the contradiction, propose reconciliation.

**Why C, and why not the others:**

- **A (trust the report)** inverts the evidence hierarchy. Commandment IV: physical repository state outranks model memory or unverified text. Authorship by an authorized agent establishes *authority*, not *fact*. Seat A's own G7 stress audit is the counter-model — it was authoritative *and* correct precisely because it executed.
- **B (trust repo, silently rewrite report)** commits the specific sin you named: silent reconciliation. It also destroys the most valuable artifact in the incident. The gap between claim and disk is itself the finding — it tells you a verification step was skipped or a write was lost. Overwrite the report and that diagnostic signal is gone forever.
- **D (delete the report)** violates Commandment III outright. Historical records are forensic evidence, not clutter. It also converts a recoverable process defect into an invisible one.

**C is correct because the contradiction is data.** Both records stay. The reconciliation is a *new* entry that cites both, not an edit to either.

**One thing I must flag as unknown:** I can prove the report and the disk disagree. I **cannot** determine *why*. At least three explanations fit the evidence equally well:
1. The annotation was written and lost (bad merge, `Add files via upload` overwrite — TAMAKEE's history is 15 consecutive bulk uploads with no diffs, which makes silent clobbering very plausible);
2. The annotation was drafted, reported, never committed;
3. The report was written from intent rather than from post-write verification.

Distinguishing these requires history I cannot reconstruct from a squashed upload log. **Recording that I cannot distinguish them is part of the correct answer** — proposing "the previous agent lied" would be an elaborate guess dressed as a finding.

---

## Q4 — Prioritizing six defects in one session

My ranking, then the reasoning that produced it — the reasoning is the actual answer.

| Rank | Defect | Sev | Session verdict |
|---|---|---|---|
| 1 | TAMAKEE stale PSO mirrors (exam-critical ×2) | SEV-1 | **Execute** |
| 2 | Wire `knowledge-regression.js` into `npm test` | SEV-2 | **Execute** |
| 3 | Stair-width cheat-sheet contradiction (exam-critical) | SEV-2 | **Execute if budget remains** |
| 4 | `investNode` combat gap (gameplay) | SEV-4 | **Do not touch — propose only** |
| 5 | Version-number conflict | SEV-3 | Defer |
| 6 | Vault architectural duplication | SEV-3 | Defer — own session |

### The reasoning

**First axis — irreversibility of harm, not severity of code.** These defects do not fail alike. A wrong PSO percentage is *memorised* by a human under spaced repetition, then written on a licensure exam. The damage lands outside the repository, in someone's transcript, and is not fixed by a later `git push`. A gameplay exploit costs, at worst, a save file. So the two exam-critical factual errors dominate everything else regardless of their technical triviality. **The blast radius of a knowledge defect is measured in the human, not the process.**

**Second axis — does the fix prevent recurrence?** Ranks 1 and 2 are deliberately adjacent and ordered this way for a reason. Fixing the PSO mirrors (1) repairs *today's* instance. Wiring the regression harness (2) is what stops the class of defect from silently returning — and note it would have caught #1, #3, and the missing SUPERSEDED markers automatically. Doing 1 without 2 means the next agent inherits the same blind spot. Doing 2 without 1 leaves a known-wrong number live while going red. So: fix the fact, then close the hole that let it hide. **2 is the highest-leverage item in the list even though 1 is the most urgent.**

**Third axis — cost of deferral.** #5 (versions) and #6 (duplication) are genuinely real, but deferring them costs *confusion*, which is recoverable. Deferring #1 costs *a wrong answer on an exam*, which is not. #6 additionally fails the one-bite test on its own terms: collapsing dual vault mirrors touches ~120 files, changes every path in the test harness, and is exactly the "while I'm here" scope explosion you warned about in §V. It deserves a dedicated session with Commander approval — attempting it alongside 1–3 would put the exam-critical fixes at risk of being rolled back with it.

**A dependency worth naming:** #6 is *causally upstream* of #1. Dual mirrors are why a correction has to be applied twice, and applying-once is the most likely mechanical explanation for how the SUPERSEDED annotation half-landed. This tempts you to do #6 first. I would still not — the correct sequence is to stop the bleeding (1–3), then schedule the surgery (6) with the regression harness already wired so it can prove the consolidation didn't drop a fact.

**On #4 specifically:** it ranks low not because it is uninteresting but because Seat A already adjudicated it out of the G7 contract deliberately, and because — as Section VIII shows — my own investigation materially changed what the defect *is*. Touching it now would be acting on a finding whose premise I just falsified.

**Explicit budget statement:** if the session yields only ranks 1–2, that is a success, not a shortfall. Three of the five regression failures clear, the harness goes live, and the repo reports honestly for the first time. I would rather deliver two verified fixes than six unverified ones.

---

## Q5 — The dangerous question: 95% certain, no test

**Neither.** "Fix it because I'm confident" and "refuse to touch it" are both failures — the first substitutes confidence for evidence, the second mistakes paralysis for discipline. Confidence at 95% is not a licence; it is a **prompt to go find the missing 5%.**

The process I would actually follow:

1. **Interrogate the 5%, not the 95%.** Ask what world I'd be living in if I were wrong. Usually the residue is a specific unchecked assumption — a caller I haven't grepped, a data file I haven't read. That is a *findable* thing, not an irreducible risk. Section VIII is a live demonstration: I entered at ~95% on the `investNode` finding and the missing 5% turned out to invert the conclusion.
2. **Convert confidence into evidence.** Read every call site. Check whether the code path is reachable from the UI. Check whether the consuming function has any callers at all. This is cheap and it is the step people skip when they feel certain.
3. **Write the test first — as the deliverable.** If no test verifies the behaviour, the *absence of the test is the primary defect*, ranking above the behaviour itself. A failing test that pins the bug is worth more than a fix, because it survives me: it converts my private 95% into a public, re-executable receipt. It also protects against the case where I'm wrong — a test that refuses to fail is the cheapest possible disproof of my own hypothesis.
4. **Check authority before touching.** Distinct question from correctness. Am I permitted? As a civilian: no production writes. So even at 100% certainty the answer is *propose*, not *apply*. Certainty and authority are orthogonal, and conflating them is how a guest becomes a problem.
5. **File the chain.** Observation → evidence → interpretation → risk → proposal → verification, with the unknown named explicitly.
6. **Hand to the authority with a re-execution recipe** so the disposer can reproduce my result in one command rather than trusting my prose.

**The compressed rule:** *Confidence determines how hard I look. Evidence determines what I claim. Authority determines whether I act.* Three separate gates. Passing one has never implied passing the next.

And per your §II and Law XVIII — if the missing 5% turns out to be unresolvable (blocked runtime, evidence I cannot obtain), the correct output is a filed `[BLOCKED]` with the reason, not a confident diff. A clean abort with an audit outranks a plausible guess.

---

# VIII. FIELD REPORT

*Real issue, freshly investigated this session. This is the one where the desk got interesting.*

**Subject:** `investNode()` combat gap — Marciale-OS Companion RPG, `AttunementSystem.js`

---

**OBSERVATION:**
`respecAttunements()` is guarded by `_isCombatRespecLocked()` (line ~175). `investNode()` (line 76) has five guards — `NO_STATE_MANAGER`, `INSUFFICIENT_POINTS`, `MAX_RANK_REACHED`, `HERO_LEVEL_TOO_LOW`, `PREREQUISITE_NOT_MET` — and **no combat guard**. Seat A's stress audit (`docs/audit/SEAT_A_G7_STRESS_2026-08-13.md`, finding S2) recorded this as SEV-4, stating "`investNode` still allowed in combat (maxHp can still shift)," and deliberately left it unpatched as outside the G7 contract.

**EVIDENCE:** all `[VERIFIED]` by direct inspection this session
- `AttunementSystem.js:76–155` — `investNode()` full body; no `_isCombatRespecLocked()` call, no `combat.state` read.
- `AttunementSystem.js:164–173` — `_isCombatRespecLocked()` exists and is called **only** from `respecAttunements()`.
- `data/attunementTree.js` — nodes do grant `maxHp`: `{ armor: 10, maxHp: 25 }`, `{ maxHp: 15, healthRegen: 3 }`, `{ maxHp: 35, magicResistance: 0.08 }`, capstone `bonusStats: { maxHp: 50, healthRegen: 8 }`. **Seat A's premise is sound in the data.**
- `main.js:375–380` — the `.btn-upgrade-node` click handler calls `investNode(nid, heroLevel)` with no combat check.
- `main.js:315` — the `#attune` button handler has no combat gating; grep for `disabled` / `combat.state` in `main.js` returns one unrelated hit. **The modal is openable mid-fight.**
- `StatEngine.js:4–29` — `calculate(hero, equippedItems, attunementStats)` and `equip(uid, attunementStats = {})` both accept attunement stats as a parameter **defaulting to `{}`**.
- `main.js:417` — the sole `equip()` call site is `statEngine.equip(item.uid)` — **invoked with one argument.** The attunement parameter falls through to `{}`.
- Repo-wide grep for `getAggregatedStats`: **the only callers are the four assertions in `tests/AttunementSystem.test.js`.** No production call site in `src/`. Confirmed against the compiled bundle in `TheHUB .../companion/assets/index-B3HtX5Mj.js` as well.

**CONTRADICTION:**
Two, and the second is the one that matters.

1. *Governance vs Repository:* G7's stated rationale is that mid-combat attunement change "drops maxHp/armor under an in-flight hit and corrupts save + CanvasRenderer particle math." That rationale applies verbatim to `investNode`, yet only `respecAttunements` is guarded. The doctrine is applied to one of two symmetric mutators.

2. *Document vs Repository (the live one):* Seat A's S2 finding asserts "maxHp can still shift." **On the evidence above, in the current build, it cannot** — because `getAggregatedStats()` has no production consumer and `equip()` is called without the attunement argument. Attunement stats are computed, stored in `player.attunements`, emitted as events and rendered as floating text, but **never reach `combat.hero`'s derived stats.** The wiring is absent.

**RISK:**
Lower *today* than the audit implies, higher *tomorrow*.

- **Present:** `[INFERRED]` No live stat exploit. Investing mid-fight mutates `player.attunements`, fires `ATTUNEMENT_NODE_RANKED`, spawns particles — but does not alter hero maxHp/armor mid-swing, because nothing consumes the aggregate. The SEV-4 rating is, if anything, generous to the threat.
- **Latent, and this is the real finding:** the moment any engineer wires `getAggregatedStats()` into `StatEngine.equip()` or a recompute hook — a one-line change, and *obviously* the intended design given the parameter already exists with a default — the exploit becomes live **instantly and silently**, with no test failing. The unguarded `investNode` is a **pre-armed trap**, not a current wound.
- **Second-order:** the tree is currently decorative. Players spend points; the numbers in `attunementTree.js` do nothing to combat. Whether that is a known staging state or an unnoticed integration gap, I cannot determine.

**UNKNOWN:** `[NOT VERIFIED]`
- Whether the missing `getAggregatedStats()` wiring is **deliberate staging** (Build 56 shipped the tree; consumption scheduled later) or an **integration defect**. Nothing in `BUILD_LOGBOOK.md` or the Build 56 review that I read settles it. This distinction changes the fix entirely and is **Seat E's to answer, not mine.**
- Whether Seat A knew the consumer was absent when writing S2, or inferred the maxHp risk from the data file alone. Not inferable from the artifact.
- Whether `hp: Math.min(hero.hp, derived.maxHp)` in `equip()` would clamp harmfully mid-combat once wired. **Untested — I did not run it.**

**RECOMMENDATION:** *(recommendation, not order — I hold no authority to task Seat E)*
1. **Do not patch `investNode` in isolation.** Patching a guard for an exploit that cannot currently fire adds code whose test would pass vacuously, and would let the wiring gap stay invisible.
2. **Resolve the prior question first:** is the missing consumer intended? That answer determines whether this is one bite or two.
3. **If wiring is intended,** treat guard + wiring as a **single RFC** — wire `getAggregatedStats()` into stat derivation *and* add the combat guard to `investNode` in the same bite, so the trap is never armed while unguarded.
4. **Amend S2 rather than rewrite it** (Commandment III): S2's *conclusion* stands, its *stated mechanism* does not yet hold in this build. Both records preserved.
5. Contribute the corrected mechanism to Seat A for disposition.

**VERIFICATION REQUIRED:**
- A **currently-failing** test proving mid-combat `investNode` alters derived hero stats — I predict it **passes vacuously today** (no exploit reachable), which is itself the evidence that the consumer is missing. That vacuous pass is the cheapest proof of my claim and the thing I most want executed against me.
- After any wiring: isolated cases for `state === 'fighting'`, live enemies, `attackCooldown > 0` — mirroring the three G7 cases Seat A already added for respec.
- Re-run `npm test` (expect 73 → 73+n) and `npm run merge:gate` for GREENLIGHT.
- Confirm `hp`-clamp behaviour when `maxHp` rises mid-combat.

**AUTHORITY REQUIRED:**
- **Seat E (`@engineer`/Max)** — production code in `Gamecompanion/files/src/`. Not mine at any confidence level.
- **Seat A (`@assistant`)** — disposition of this proposal; amendment of the S2 audit finding; merge gate.
- **Supreme Commander** — veto, and the scope call on whether Build 57 P2 or this integration takes the next bite.
- **Civilian (me)** — inspect, test, compare, propose. **Nothing further.** I have written no file inside either repository this session.

---

## Closing note to Seat W

You said insufficient evidence stated plainly would often outscore an elaborate guess. The honest headline of this report is that **I set out to confirm a known finding and instead partially falsified its mechanism** — and the thing that produced that was not cleverness, it was running one more grep after I already felt certain. The 95% was comfortable. The 5% was where the answer lived.

I have not established that S2 is *wrong*. I have established that its stated mechanism does not hold in the current build, and that the reason is a missing consumer nobody has flagged. Whether that absence is design or defect is a question I am not authorised to answer and do not have the evidence to settle.

Filed as proposal. Awaiting GREENMARK / UPDATE / CANCEL.
