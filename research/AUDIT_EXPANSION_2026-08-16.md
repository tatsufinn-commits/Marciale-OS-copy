# AUDIT EXPANSION — FOUR RESEARCH ITEMS SETTLED
## XSS flags · VSS-01 verification · grok-build "dream" module
**Seat R (RECONNAISSANCE · EXCEL) · research-only · 2026-08-16**

| Field | Value |
|---|---|
| Tree | Marciale-OS HEAD `030f3db` (working) · remote `e64079c` (verified via `/tmp` clone) |
| Benchmarks | grok-build HEAD `eb267fe` (local clone) |
| Prior filings | `VSS_RECONNAISSANCE_DOSSIER_VSS00.md` · `CROSSREF_ANALYSIS_...md` |

> These four items were raised as my *own recommended expansions* when offered
> research freedom. The Commander ordered them added to the audit. Executed as
> read/inspect/document — no implementation, no file outside `research/`.

---

## E1 · The three XSS flags are FALSE POSITIVES (Seat A's belief, now evidenced)

**Question:** does `npm run health`'s three `[POSSIBLE XSS]` flags point at real
unsanitized injection, or are they scanner artifacts?

**Verdict: false positives — all three, for different, provable reasons.**

| Flag | Line (verbatim) | Why it is NOT XSS |
|---|---|---|
| `11-tasks.js:326` | `kb.innerHTML = filterBanner + renderTaskDropbox(deadlines) + columnsHtml;` | The interpolated task data is built with `esc()` / `escAttr()` upstream (`esc(t.estimate)`, `esc(t.notes).slice(0,120)`, `escAttr(t.id)` — lines 325–327). User data is escaped before concatenation. |
| `12-today.js:1193` | `motionEl.innerHTML = '<div …>' + (bridgeConnected ? 'Collecting motion data…' : 'Connect to RuView to see motion history.') + '</div>'` | **Two static string literals** — zero user-controlled data reaches the sink. |
| `12-today.js:1248` | `statusEl.innerHTML = summary + override;` | `summary = presenceSummary()` returns only internally-generated labels/numbers/times (`🟢 Present`, `since {time}`, `{totalMin} min present…` — `17-presence.js:366-374`); `override` is a static literal. No user string enters. |

**Why the scanner flags them (the real finding):** the scanner detects the
*pattern* (`.innerHTML =` with `+` concatenation) but performs **no data-flow
analysis** — it cannot distinguish user-controlled data from static/escaped
strings. This is the same class of weakness as `sre-auto-sentinel.js`'s
historical manufactured counts: a checker that reports a *shape* as a *fact*.

**Precision boundary (stated honestly):** this settles the **three flagged
lines**. It does **not** assert the codebase is XSS-free — a full data-flow
audit is a separate, larger slice. What is now proven is that the specific
warning Seat A flagged `[UNVERIFIED]` is a false positive, with file+line
evidence.

**Confidence:** Class B · `[VERIFIED]` (three lines inspected verbatim).

---

## E2 · VSS-01 fully landed — F4 and F5 are CLOSED, not residual

**Question I raised:** I had verified F1/F2 were patched, but *not* F4 (the
companion guard vanishing when no frame was mounted) nor F5 (origin test
covering only the child side).

**Verdict: both closed, in the same commit `a2846ce`.** Verified via a fresh
clone (remote HEAD now `e64079c`, which descends from `a2846ce`).

`git diff 030f3db..HEAD -- 14-companion.js` shows the F4 fix, verbatim:

```js
-  if(frames.length && !frames.some(frame=>event.source===frame.contentWindow)) return;
+  // VSS-00 F4 (2026-08-15): … A guard that disables itself in the state it
+  // is most needed is not a guard. Fail CLOSED: no mounted frame => reject.
+  if(!frames.length) return;
+  if(!frames.some(frame=>event.source===frame.contentWindow)) return;
+  const COMPANION_ALLOWED_ORIGINS=[ … ,'null'].filter(Boolean);
+  if(event.origin && !COMPANION_ALLOWED_ORIGINS.includes(event.origin)) return;
```

`git diff 030f3db..HEAD -- unit-postmessage-origin.js` shows F5 fixed: a new
**host-side** block adds `hostTargets` (`16-hubframe.js` → `isAllowedOrigin`,
`14-companion.js` → `COMPANION_ALLOWED_ORIGINS`), plus behavioural tests for
F1 (no hardcoded `'*'`) and F4 (fail-closed with no frame mounted).

**Conclusion:** the entire VSS-00 *bridge-origin cluster* (F1, F2, F4, F5) is
now repaired and **regression-tested on both host and child sides**. My earlier
cautious note ("a patch named VSS-01 is not all findings resolved") was correct
to raise and is now answered: in this case, the patch genuinely covered the
residuals. Good news for the house, evidenced, not assumed.

**Remaining VSS-00 items (NOT part of this cluster):** F7 (dual-store mirror),
F9 (inline-chess isolation), F12 (green-washing), F15 (build dirt) — status
unchecked this watch; still open for slice selection.

**Confidence:** Class B · `[VERIFIED]` (diff inspected verbatim).

---

## E3 · grok-build's "dream" module — idle memory consolidation (the novel pattern)

**What it is:** `crates/codegen/xai-grok-memory/src/dream.rs` — "autoDream
gating and execution logic." Not storage, not retrieval: **background
consolidation** that runs while the user is idle, summarizing and re-indexing
memory so the system improves between sessions.

**The mechanism (cited):**
- `DreamGate` enum: `Open` / `Disabled` / `TooSoon { hours_since }` /
  `TooFewSessions { count, required }` / `Error`.
- Gate order, "cheapest first" (docstring): `dream.enabled` → time since last
  consolidation ≥ `min_hours` → session count ≥ `min_sessions`.
- `dream_lock.rs`: PID-based `.dream-lock` file with mtime tracking and a
  cross-platform process-alive probe (unix `kill(pid, 0)`, Windows
  `OpenProcess` + `WaitForSingleObject(0)`). The lock prevents two processes
  consolidating simultaneously.

**Why it matters to Marciale-OS:** nothing equivalent exists. The Marciale
brain (`08-assistant.js` `addBrainMemory`/`retrieveMemory`) is **append + keyword
search only** — it never consolidates, de-duplicates, or summarizes. The
"dream" pattern is the missing third verb (store → retrieve → *consolidate*),
and its *gating* design (enabled/time/sessions + a PID lock) is directly
portable to Vanilla JS as a small idle task with `localStorage` + a timestamp
+ a session counter — no new runtime, no server.

**Relation to prior work:** this is the natural complement to E1's MMR finding
(G3) and to the compaction-transcript pattern (G2). Consolidation is what makes
memory *curated* rather than *accumulated* — and it is the only pattern found
this watch that addresses memory *quality over time*, not just memory size.

**Confidence:** Class B · `[VERIFIED]` (module read verbatim) · recommendation
Class D · `[INFERRED]` (portability to JS is inferred, not implemented).

---

## E4 · Seat-E-ready spec for the first bite

The fourth item — "a precise, Seat-E-ready spec of the chosen first bite" — is
a deliverable, not a finding. Filed separately at
`research/SPEC_SEAT_E_TAMA_QUESTION_BANK_EXTRACTION_2026-08-16.md`, so Seat E
can execute it without my context (Law XVIII-B resumability).

---

— Seat R, EXCEL · research-only · four items settled
