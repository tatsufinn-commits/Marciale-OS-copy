# 🔧 REMEDIATION — WHAT WAS FIXED, WHAT REMAINS, WHAT ONLY THE COMMANDER CAN DECIDE
**Filed:** 2026-08-15 · **Tree:** `a6cef19` · **Dispatch:** `DISPATCH-20260815-087`
**Authority:** `@joint` (Law XXV trigger 1). Hands: `@qa`, `@sre`/`@pangolin`, `@frontend`, `@backend`.

---

## §0 THE ANSWER IN ONE LINE

**The emergency is closed. Three of six flags are fixed and proven. Two need your ruling. One is a standing habit, not a patch.**

---

## §1 🔴 FLAG 1 — THE ONLY REAL HOLE: **CLOSED AND PROVEN**

### What was actually wrong (and where my own report overstated)

The audit said *"3 × unguarded listeners."* On inspection the truth was finer, and **one part of my report was wrong**:

| Listener | Real prior state |
|---|---|
| `companion-mini.js:23` | **Genuinely naked** — no origin, no source, no sender check. Renders into `innerHTML`. |
| `ruview-bridge-injector.js:182` | Checked `data.from === 'TheHUB'` — **a self-declared field any frame can forge** |
| `ruview-frame.js:499` | Same forgeable check |

**Correction on the record:** `ruview-frame.js` **already had** a frozen `ALLOWED_ORIGINS` whitelist (Build 33.3) on its *outer* handler at line 548. The hole was in the **inlined injector string** at 499, not the module. My dispatch implied all three were equally naked. **They were not. One was naked; two were guarded by a field that authenticates nothing.**

### The fix
All three now reject on **two unforgeable facts** — `event.origin` against an allowlist, and `event.source !== window.parent`. `'null'` is permitted for `file://` and sandboxed hosting, matching the existing Build 33.3 whitelist.

### The proof — `tests/unit-postmessage-origin.js`, **14/14, wired into `npm test`**
* legitimate same-origin parent → **ACCEPTED**
* cross-origin attacker → **REJECTED**
* same-origin but wrong source frame → **REJECTED**
* sandboxed parent (`origin: 'null'`) → **ACCEPTED**
* **REGRESSION WITNESS:** a forged `data.from: 'TheHUB'` from `https://evil.example` **defeats the OLD check** — the exact attack, encoded as a permanent test

**Red-capable proof:** guard reverted → `exit=1`, 12/14. Guard restored → `exit=0`, 14/14.

### Why no tool ever caught this
`sre-fault-scanner` Audit 3 does **not** test origin. It tests **lifecycle** (`removeEventListener` / `{once:true}` / singleton). Its warnings still fire — **correctly**, for a different defect. **No tool in this repository verified origin before this test existed.** That is why the hole survived every green.

---

## §2 🟠 FLAGS 2, 3, 6 — THE FABRICATION CLASS: **SWEPT**

| Tool | Before | After | Proven |
|---|---|---|---|
| `quick-status` | 🎉 "100% OPERATIONAL & VERIFIED GREEN" over a broken tree | `INVENTORY COMPLETE — NO VERDICT RENDERED` | ✅ |
| `merge-gate:43` | `testOut` captured, never read; green asserted | parses TAP; `[EVIDENCE CONFLICT]` + `UNVERIFIED` branches | ✅ **exit=1 under injection** |
| `plate-validator` | **no `process.exit(1)` anywhere** — could not fail | returns count, exits 1 | ✅ `600 C-2 580 1.2 0.9` → **2 red flags, exit=1** |
| `scout-audit` | "ZERO risks" implying security | `SCOUT **LICENCE** AUDIT`, prints scope + `npm audit` pointer | ✅ |

**A second bug found while patching `plate-validator`:** a **local `redFlags` shadowed** the module-level counter, so increments never escaped the function. My first patch also **double-incremented**. Both caught by testing the patch instead of trusting it — reverted and rewritten to return the count. *A patch is a claim until it is fault-injected.*

**Fault-injection matrix, re-run with `npm test` broken:**
`quick-status` → no verdict ✅ · `merge-gate` → **exit=1** ✅ · `plate-validator` → green, **correctly** (it validates geometry, not tests) · `scout-audit` → green, **correctly, and now says so in scope**.

**The distinction now holds: a tool is silent about what it does not measure, and red about what it does.**

---

## §3 🟠 FLAG 4 — "77/77 IS HALF THE TREE": **NEEDS YOUR RULING**

`TheHUB` emits **no TAP output**; its 12 suites self-report in prose (`14 passed`, `12 passed`, …). `parseTapCounts()` cannot see them, so `77/77` is the **Companion suite only**.

Mitigated, not solved: `merge-gate` now prints the scope warning. **Exit-code protection always held** — a TheHUB failure still breaks the build (proven twice).

**Proposed (NOT taken — touches 12 test files):** migrate TheHUB to `node --test` so one number covers the tree. **Est. medium effort, zero risk to production code.** Until then: **nobody may quote "77/77" as a whole-tree verdict.**

---

## §4 🟡 FLAG 5 — 4 HIGH CVEs: **NEEDS YOUR RULING**

`extract-zip` symlink path traversal (`GHSA-jmr9-qjv8-65gv`) → `@puppeteer/browsers` → `puppeteer`/`puppeteer-core`.

**Facts:** `puppeteer` is a **devDependency**, used only by TheHUB's test harness. It **ships in nothing**. The fix is `npm audit fix --force` → **puppeteer 19.8.0, a breaking downgrade** that may break `app-smoke.js`.

**Two lawful routes — your call:**
1. **Accept the risk in writing** — file a dated risk acceptance noting dev-only exposure. *Recommended.*
2. **Take the bump** — I attempt it on a scratch copy, run the suite, and revert if red. Nothing merged without your word.

**NOT TAKEN.** A breaking dependency change is not a documentary act.

---

## §5 📜 THE CHARTER — **DRAFTED, AWAITING ENACTMENT**

The Scout's Voice Clause (§8 of `VERDICT_SIX_REDFLAGS_AND_RECON_CHARTER_2026-08-15.md`) is **written and unenacted**. **Law XIV bars me from self-initiated constitutional edits** — this one needs your word, not mine.

**Say "enact the Scout's Voice Clause" and it goes into the Charter under Seat R, with a dispatch and a logbook entry.**

Its load-bearing provisions: Law XIX does not bind Seat R · a finding backed by command+output is **evidence, not a proposal** · **an overturn that does not print the HEAD searched is void** · disposal is over **route, not truth** · the Research-Drop Privilege becomes a **duty of disclosure on Seat A** · **brevity is not insubordination**.

---

## §6 ⚰️ SEAT R — THE FIX IS PROCEDURAL, NOT TECHNICAL

He is dead; there is nothing to repair in him. **What must be repaired is the intake, or the successor dies the same way.**

Ready on disk: `NTG_DELIVER_THIS_AS_TEXT.md` (4,846 B) — must be **pasted as chat text**, never as a file path.

**Three additions required before any successor is seated:**
1. **State the Research-Drop Privilege verbatim** — the omission that silenced him for two days.
2. **Delete the Law XIX sentence.** It was never his law.
3. **Mandate `git rev-parse --short HEAD` in every report** — the divergence that made him look irrational.

**Standing intake rule proposed:** *before a seat is called unresponsive, audit every channel granted to it and prove the occupant was told the channel exists.*

---

## §7 WHAT I CHANGED THIS WATCH

| File | Change |
|---|---|
| `companion-mini/companion-mini.js` | origin + source guard (**was naked**) |
| `modules/ruview/ruview-bridge-injector.js` | origin + source guard |
| `modules/ruview/ruview-frame.js` | origin + source guard on inlined injector |
| `tests/unit-postmessage-origin.js` | **NEW** — 14 tests incl. forged-field witness |
| `TheHUB/package.json` | test script runs the new suite |
| `tools/quick-status.js` · `tools/merge-gate.js` · `tools/plate-validator.js` · `tools/scout-audit.js` | honesty + exit codes |

**Untouched:** laws, charters, shrine, `TAMAKEE/`, Companion source. **No commits.**

**Verification `[VERIFIED 2026-08-15]`:** `npm test` **77/77 + 14 origin-guard + 14 RuView proxy**, exit 0 · sentinel **77/77 measured**, SEV-0 · governance **4/4** · every patch fault-injected in both directions.

---

**— TWMIP, Seat A, wearing `@joint`**
*We closed the hole, un-taught four instruments to lie, and left the two decisions that cost money or break things on the Commander's desk.*
