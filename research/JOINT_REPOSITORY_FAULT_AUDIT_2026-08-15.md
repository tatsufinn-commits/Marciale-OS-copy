# ⚙️ JOINT / COMPANY — REPOSITORY FAULT AUDIT
**Filed:** 2026-08-15 (Asia/Singapore) · **Tree:** `a6cef19` · **Dispatch:** `DISPATCH-20260815-085`
**Authority:** Law XXV trigger 1 — *Commander dictates Joint.* Hands worked: `@qa`, `@sre`/`@pangolin`, `@backend`, `@project-manager`.
**Seat:** `@joint` worn by the sitting `@assistant` (TWMIP). Filed here, not in `ASSISTANT/` — *you file where you sat, not where you sleep.*

---

## §0 VERDICT

**The repository's code is healthy. Its instrumentation is not.**

`npm test` is genuinely green. The defect is that **five of seven audit tools cannot report red** — they print a celebration banner unconditionally. The house has been reading verdicts from tools that never formed one.

This is the **same defect class** as the sentinel fabrication fixed on 2026-08-14. That fix repaired one instance. **The pattern was never swept.**

---

## §1 🚨 SEV-2 — THE FAULT-INJECTION MATRIX

Method: broke `npm test` (exit 1, proven), then ran every tool. A tool that reports green over a broken tree is not a tool.

| Tool | exit | Verdict printed while `npm test` was BROKEN | Honest? |
|---|---|---|---|
| `quick-status` | 0 | 🎉 **"SYSTEM INTEGRITY: 100% OPERATIONAL & VERIFIED GREEN"** | ❌ **FABRICATED** |
| `sre-fault-scanner` | 0 | 🎉 "SRE SCAN PASSED, SEV-0" | ⚠️ out of scope, overclaims |
| `scout-audit` | 0 | 🎉 "ZERO risks" | ⚠️ see §3 |
| `qa-wcag-audit` | 0 | 🎉 "5 Categories Passed" | ⚠️ out of scope |
| `bridge-contract-verify` | 0 | 🎉 "100% bi-directional sync" | ⚠️ out of scope |
| `plate-validator` | 0 | 🎉 "100% CODE COMPLIANT" | ⚠️ **no `process.exit(1)` anywhere** |
| `governance-audit` | 0 | 🎉 "4 Checks Nominal" | ⚠️ out of scope |
| **`sre-auto-sentinel`** | — | **❌ "[TEST FAILURE DETECTED]"** | ✅ **the only tool that caught it** |

**The 2026-08-14 patch works.** It is also **the only thing standing between this house and a laundered green.**

### The worst offender
`tools/quick-status.js` **executes no test and inspects no result** — `grep -nE "exec|spawn"` returns nothing. It is an inventory script that ends by declaring the system verified. It also printed a hardcoded **"43 test suites / 137 assertions"** — *the exact string the sentinel was patched for.* **The fabrication was copy-pasted into a second tool and left there.**

---

## §2 🚨 SEV-2 — `merge-gate.js:43`: CAPTURED, NEVER READ

```js
const testOut = execSync('npm test', ...);   // captured
console.log('   ✅ All test suites passed (100% green).');  // asserted anyway
```
`testOut` appeared **exactly once** in the file — the assignment. **Zero reads.** This is the merge gate: the last door before a merge.

**PATCHED & PROVEN** — now parses `# tests` / `# pass` / `# fail`, with an `[EVIDENCE CONFLICT]` branch for exit-0-with-failures and `UNVERIFIED` when no TAP is emitted.
* Green tree → `✅ 77/77 tests passed - measured from harness output.`
* Injected failing test → `❌ [QA FAILURE] Unit test failure detected.`

---

## §3 🚨 SEV-2 — **"77/77" IS HALF THE TREE**

Every green this house has quoted for two sessions is **the Companion suite only.**

| Subsystem | Emits TAP? | Counted in "77/77"? |
|---|---|---|
| `Gamecompanion/files` | ✅ yes — `# tests 77` | ✅ yes |
| `TheHUB 1.5.5.2.3 a v` | ❌ **no TAP line at all** (`grep -c '^# tests'` → **0**) | ❌ **INVISIBLE** |

TheHUB self-reports `14 passed`, `12 passed`, `14 passed`, `14 passed` across 12 suites in prose. `parseTapCounts()` cannot see any of it.

**Consequence:** the sentinel's *measured* `77/77` is **accurate for what it parsed and silently partial as a tree verdict.** A TheHUB regression that still exits non-zero is caught by exit code — but the **count is not a whole-tree count**, and the house has been reading it as one. Scope warning now printed by merge-gate.

---

## §4 ⚠️ SEV-3 — `scout-audit` MISSES 4 HIGH-SEVERITY CVEs

`npm run scout` → *"5 dependencies scanned with ZERO risks."*
`npm audit` → **4 HIGH severity vulnerabilities.**

`extract-zip` **unvalidated symlink path traversal** (`GHSA-jmr9-qjv8-65gv`) via `@puppeteer/browsers` → `puppeteer` / `puppeteer-core`.

**Cause:** scout iterates `pkg.dependencies` only — **5 direct deps** against **127 packages actually on disk** in TheHUB. It is a *direct-dependency licence* checker; it has never been a vulnerability scanner. **The banner claims security it does not test.** Fix is `npm audit fix --force` → **breaking change** (puppeteer 19.8.0). **NOT taken — requires Commander authorization.**

Also: `Gamecompanion/files` declares **`UNSPECIFIED`** licence while root and TheHUB declare ISC.

---

## §5 ⚠️ SEV-3 — REAL CODE WARNINGS, UNTRIAGED

`sre-fault-scanner` reports **9 warnings** and then **SEV-0 "Zero Active Incidents"** — warnings never escalate, so they are never worked:
* **3 × POSSIBLE XSS** — `modules/11-tasks.js:326`, `modules/12-today.js:1193`, `:1248`
* **3 × STORAGE RISK** — high-frequency writes inside intervals (`09-main.js`, `12-today.js`, built bundle)
* **3 × ZOMBIE LISTENER** — unguarded `message` listeners (`companion-mini.js`, `ruview-bridge-injector.js`, `ruview-frame.js`) — **`postMessage` handlers with no origin guard, on the TheHUB↔Companion bridge**

---

## §6 ⚠️ SEV-4 — WORKING TREE

**66 modified paths, zero commits.** Two `WISDOM/Deliverables/` files show ` D ` (deleted) including a mojibake-named file `# JARWEN COUNCIL ΓÇö TASK 02`. `SpriteAtlas.test.js` untracked. `docs/` at 26 of 66. **Not resolvable without a commit order.**

---

## §7 WHAT WAS CHANGED THIS WATCH

| File | Change | Proof |
|---|---|---|
| `tools/quick-status.js` | Fabricated verdict → `INVENTORY COMPLETE - NO VERDICT RENDERED`; hardcoded counts removed | run, correct |
| `tools/merge-gate.js` | Line 43 parses TAP; conflict + unverified branches; scope warning | **fault-injected both ways** |

**Untouched:** all production code, `TAMAKEE/`, laws, charters, shrine. **No commits.** Test files restored byte-for-byte (`npm test` → 77/77).

---

## §8 RECOMMENDATIONS — NOT AUTHORIZED, AWAITING ORDER

1. **Make TheHUB emit TAP** (`node --test`), so a whole-tree count exists. Until then, no one may quote "77/77" as a tree verdict.
2. **Decide the puppeteer CVE:** accept a breaking bump, or record a documented risk acceptance. It is dev-only tooling — but it is 4 HIGH and the scanner says zero.
3. **`plate-validator` must exit 1** on a red flag; it currently cannot fail.
4. **Rename `scout-audit`'s banner** to licence-only, or teach it `npm audit`.
5. **Triage the 3 origin-unguarded `postMessage` listeners** — highest real security value in this report.
6. **Sweep rule:** every tool that prints 🎉 must be fault-injected before its verdict is quoted. *A green that cannot go red is decoration.*

---

**— TWMIP, Seat A, wearing `@joint` · Law XXV**
*A tool that cannot report failure is not reporting success. It is reporting nothing, loudly.*
