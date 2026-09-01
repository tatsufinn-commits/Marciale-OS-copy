# VSS-00 PHASE 0 — SEAT A ADJUDICATION OF SEAT R'S DOSSIER

**Filed:** 2026-08-15 · **Adjudicator:** Seat A (TWMIP), `@joint`
**Reporting seat:** Seat R (EXCEL) · **His tree:** `030f3db` · **Verification tree:** `a6cef19`
**Verdict:** ✅ **ACCEPTED. Phase 0 discharged.** One correction to *his* correction (§3).

---

## 1. VERIFICATION BEFORE ACCEPTANCE — NOT A COURTESY REVIEW

Every claim below was re-run on `a6cef19` before acceptance. **A dossier is evidence; accepting
it unverified would repeat the sin it documents.**

| # | Finding | Seat A verification | Verdict |
|---|---|---|---|
| F2 | Host listener checks `e.source`, never `e.origin` | `16-hubframe.js:116` — `if (!this.frame \|\| e.source !== this.frame.contentWindow) return;` **no origin check** | ✅ **CONFIRMED** |
| F1 | `postMessage` targetOrigin `'*'` | **Line 148**, not 131: `contentWindow.postMessage(..., '*')` | ✅ **CONFIRMED, line corrected** |
| F4 | Guard skipped when no frame mounted | `14-companion.js:167` — `if(frames.length && !frames.some(...)) return;` **the `frames.length &&` short-circuits the whole guard** | ✅ **CONFIRMED — sharpest finding in the dossier** |
| F5 | Origin test covers child side only | `unit-postmessage-origin.js:25-28` targets `companion-mini.js`, `ruview-bridge-injector.js`, `ruview-frame.js` — **all child; no host handler** | ✅ **CONFIRMED** |
| F3 | HubFrame claims 4 systems, mounted for 1 | `16-hubframe.js:3` names "Companion, Chess, RuView, CADAM"; `new HubFrame` appears **only** at `14-companion.js:384,524` | ✅ **CONFIRMED** |
| — | Chess inline, engine in workers | `15-chess.js:1849` `new Worker(CHESS_ENGINE_WORKER_SRC)` | ✅ **CONFIRMED** |
| — | `_location` TypeError twice, 0 failures | `npm test` → **2** `_location` hits, **exit 0** | ✅ **CONFIRMED** |
| — | `health` green-washes its own warnings | **root** `npm run health` → `🎉 SRE SCAN PASSED: 0 Redmarks (… 9 Minor Warnings)` · `SEV-0` · **exit 0** | ✅ **CONFIRMED** |

**14 of 14 checkable claims stand.** One line number corrected (F1: 148, not 131) — a citation
slip, not an evidentiary error; the `'*'` is exactly where he said it behaves.

## 2. THE CRITICAL QUESTION IS ANSWERED, AND THE ANSWER IS THE FINDING

*"Can one subsystem's failure take down TheHUB?"* — **it depends on the subsystem, and no
uniform rule is enforced.** Companion and RuView are sandboxed iframes; **Chess is inline in the
Hub DOM** with only its engine in workers; CADAM is documented but never mounted.
**The isolation guarantee is per-subsystem convention, not a platform contract.** That directly
answers the Commander's platform requirement and is the correct heart of a cohesion audit.

## 3. ⚠️ HIS CORRECTION #1 IS HALF RIGHT — AND THE HALF THAT IS WRONG IS MINE

EXCEL reported the sentinel repaired on `030f3db` and **still hardcoded on `a6cef19`**.

```
local  a6cef19 tools/sre-auto-sentinel.js  sha256: 1395deb52b026e1a
remote 030f3db tools/sre-auto-sentinel.js  sha256: 1395deb52b026e1a   IDENTICAL
$ npm run pangolin
   ✅ 77/77 tests passed (100% green) — measured from harness output.
```

**It is repaired on BOTH trees.** The only occurrence of "43 test suites / 137 assertions" on
`a6cef19` is **line 64 — the HOTFIX comment documenting the removed sin**, not live code.

**The stale warning was in MY directive, not in his tree or mine.** I released him with a trap
list that described a defect fixed on 2026-08-14. **He was right to flag it and right not to
report a defect he could not observe; he was wrong only about which tree still carried it —
and that error was inherited from my briefing.** Chargeable to Seat A.

**This is the third time this watch that "the two trees differ" has resolved to "the two trees
are identical and one document is stale."** The recurring fault is not divergence — **it is
citing state from memory instead of hashing it.**

## 4. HIS CORRECTION #2 — CONFIRMED, AND HE FOLLOWED THE RECOVERY

`npm run build` dirties tracked `companion/assets/` (Vite `outDir` writes into tracked files).
He reproduced it, **recovered with the exact command supplied**, and filed it as **F15** rather
than silently cleaning up. **Reporting the mess you made is worth more than a tidy tree.**

## 5. MATURITY VERDICT — ADOPTED

`CAPABILITY ✅ · CONTRACT ⚠️ · OBSERVABILITY ⚠️ · VERIFICATION ⚠️ · RECOVERY ✅`

**Adopted as filed.** His one-sentence synthesis — *the runtime does everything and recovers
well, but enforces the same bridge on one side and not the other* — is the most accurate
sentence written about this codebase in six sessions.

## 6. DEFINITION OF DONE — AUDITED, 8/8

Zero files outside `research/` · TAMAKEE never opened · every finding classed and tagged ·
Class-B claims cite file+line · reproductions Seat-E-executable · maturity stated · next slice
named **as proposal** · **stopped at Phase 0 without being told twice.**

## 7. DISPOSITION

- **VSS-00 Phase 0: DISCHARGED.** First slice of twelve completed by any occupant of this seat.
- **His recommended next slice — host-side bridge origin gap (F1+F2+F4+F5) — is CONCURRED**
  by Seat A as the correct next bite: smallest, highest-severity, fully evidenced, and it
  mirrors an allowlist already shipped on the child side. **Phase 1 selection is the
  Commander's, not mine and not his.**
- **F15 (build-output contract) seconded** as the second-order candidate.
- **Nothing is authorized by this filing.** A concurrence is not a commission.

**No file was modified in the course of this adjudication.**
