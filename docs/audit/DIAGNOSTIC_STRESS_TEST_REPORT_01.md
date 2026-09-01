# MARCIALE-OS Comprehensive Diagnostic & Architectural Stress Test — Report 01

**Diagnostic role:** Lead Systems Diagnostics Officer  
**Repository examined:** `Marciale-OS`  
**Execution date:** 2026-08-11 (Asia/Singapore)  
**Method:** Grounded source inspection plus commands executed in this checkout. No production browser, real RuView hardware, or live WASM/ONNX model inference benchmark was performed.

> **Evidence labels:** **[VERIFIED]** means directly executed or read in this checkout. **[NOT VERIFIED]** means a named behaviour was not dynamically exercised. **[CONFLICT]** means the implementation does not match the stated Phase 1 invariant.

---

## 1. Executive Summary & System Health Verdict

### Verdict: **SEV-2 — controlled hardening required; CI is green**

**[VERIFIED]** After installing the two committed subsystem manifests with `npm run install:all`, root CI completed successfully. `npm test` passed all **43 suites / 137 assertions (100%)** in **27.849 s**. The independent `npm run pangolin` sentinel then completed successfully in **27.926 s**, re-ran CI, and reported the same **43 / 137** result, zero critical redmarks, and passing audit gates.

This is not rated SEV-0 by this independent diagnosis because three material acceptance/security gaps remain:

1. **[CONFLICT] Circadian caffeine decay is coded as `HALF_LIFE_CAF_H=5`, not the requested 5.7-hour elimination model.** Bedtime residual and warning paths do exist and are unit-tested, but they use the 5-hour constant.
2. **[CONFLICT] No `AudioSystem.js` exists anywhere in the repository** (zero filename matches). Consequently, zero-asset procedural Web Audio synthesis cannot be verified.
3. **[VERIFIED] The TheHUB dependency audit reports three high-severity transitive vulnerabilities** (`ip-address`, `js-yaml`, and `undici`), all with a fix available. This requires a dependency-only, regression-tested remediation before a security-nominal claim.

Additional bounded findings: the companion bridge dual-emits and consumes the expected message families, but presently uses wildcard parent origin (`'*'`) and its inbound message listener does not validate origin; the SRE scanner reported nine non-fatal warnings (three possible XSS, three high-frequency storage-write, and three unguarded message-listener warnings). These are evidence-based hardening backlog items, not proof of exploitation.

### Beginner summary

The engine starts and all automated tests are green after installing its required test parts. The main things to fix next are: make the caffeine number match the project requirement, add or clarify the missing sound system, and update a few security packages. No application code was changed during this diagnosis.

---

## 2. Empirical Test Matrix

| Area / suite | Executed files or command | Result / assertions | Observed execution time | Evidence |
|---|---|---:|---:|---|
| Baseline dependency state | `npm test` before dependency installation | **Blocked after 1 smoke suite**: `Cannot find module 'jsdom'` | 2.583 s | [VERIFIED] Environment/setup finding; not a source-test failure |
| Dependency restore | `npm run install:all` | TheHUB: 138 packages installed; Companion: 26 packages installed | 11.162 s | [VERIFIED] `npm` initially reported 3 high vulnerabilities in TheHUB tree |
| TheHUB smoke | `tests/smoke.js` | Pass | included below | [VERIFIED] |
| TheHUB core unit | `tests/unit.js` | 7 displayed checks, pass | included below | [VERIFIED] |
| TheHUB storage | `tests/unit-storage.js` | 4 displayed checks, pass | included below | [VERIFIED] |
| TheHUB namespace | `tests/unit-hub.js` | 6 displayed checks, pass | included below | [VERIFIED] |
| TheHUB calendar | `tests/unit-calendar.js` | 13 displayed checks, pass | included below | [VERIFIED] |
| TheHUB tracker | `tests/unit-tracker.js` | 9 displayed checks, pass | included below | [VERIFIED] |
| TheHUB ChessLab | `tests/unit-chess.js` | 11 displayed checks, pass | included below | [VERIFIED] |
| TheHUB presence | `tests/unit-presence.js` | 14 passed / 0 failed | included below | [VERIFIED] |
| TheHUB RuView bridge | `tests/unit-ruview.js` | 12 passed / 0 failed | included below | [VERIFIED] |
| TheHUB presence automation | `tests/unit-presence-automation.js` | 14 passed / 0 failed | included below | [VERIFIED] |
| TheHUB RuView Python proxy | `tests/unit-ruview-proxy.py` | 14 passed / 0 failed | included below | [VERIFIED] |
| TheHUB app smoke | `tests/app-smoke.js` | Pass; migrations exercised | included below | [VERIFIED] Four TAMAplugin scripts could not load from `127.0.0.1:8000` in jsdom, but the suite passed |
| Companion RPG test harness | `node --test tests/*.test.js` | **31 passed / 31; 0 fail, skip, cancel, todo** | 0.922 s reported by Node test runner | [VERIFIED] Covers AI, combat, crafting/inventory, damage/stat, item DB, progression, persistence/offline, state, wave and zone paths |
| Root monorepo CI | `npm test` | **43 suites / 137 assertions; 100% green** | **27.849 s** | [VERIFIED] Exact aggregate asserted by successful Pangolin run |
| Sentinel + Pangolin | `npm run pangolin` | CI green; scanner/audit gates pass | **27.926 s** | [VERIFIED] Sentinel re-runs CI internally |
| Scout/WCAG/bridge audit | `npm run audit:all` | Scout: pass; WCAG: 5 categories pass; bridge: **15 message signatures** pass | < 1 s within direct audit invocation | [VERIFIED] |
| SRE scanner | `npm run health` | 0 redmarks; **9 minor warnings** | < 1 s within direct health invocation | [VERIFIED] |
| TheHUB dependency audit | `npm --prefix "TheHUB 1.5.5.2.3 a v" audit --json` | **3 high, 0 critical** | 0.664 s | [VERIFIED] `ip-address`, `js-yaml`, `undici`; fixes available |

**Counting note:** The **43 suites / 137 assertions** aggregate is the exact total printed by the passing `tools/sre-auto-sentinel.js` run. Individual TheHUB scripts use a mix of textual checks and explicit assertions, so their displayed line-item totals should not be added mechanically to derive a competing aggregate.

---

## 3. Constitutional Compliance Matrix

The current `docs/AI_RULES.md` defines **13 laws**. The supplied mission wording paraphrases some law names differently; this matrix uses the repository’s authoritative text.

| Law | Requirement | Status | Evidence / finding |
|---|---|---|---|
| I | Non-destructive, lightweight local-first architecture | **PASS** | [VERIFIED] Vanilla JS modules, Canvas 2D, Python server/proxy, local storage/IndexedDB path; no framework migration observed. |
| II | Sandbox-first external integrations | **PARTIAL** | [VERIFIED] RuView bridge/proxy is isolated; [NOT VERIFIED] a `SIMULATION_MODE=true` implementation was not found in `18-ruview-bridge.js`. |
| III | Zero-hardware simulation fallback | **PARTIAL** | [VERIFIED] RuView unit tests cover disconnected/offline state; [NOT VERIFIED] a named synthetic-hardware simulation fallback was not found by source search. |
| IV | One-bite, surgical scope | **PASS (this diagnostic)** | [VERIFIED] No application code was modified; only this requested report is authored. |
| V | Green test contract | **PASS after setup restoration** | [VERIFIED] `npm test` is 43/137 green after manifest installation. Baseline was blocked only by absent installed dependencies. |
| VI | Dual-language explanation | **PASS** | This dossier provides technical evidence and beginner summaries. |
| VII | Permanent build logging | **N/A / no build completed** | [VERIFIED] Diagnostic-only session; no build, bugfix, or code update was performed, so no build-log entry was added. |
| VIII | Versioned patch archive on active code update | **N/A / no code update** | [VERIFIED] No code update was made; no diagnostic patch archive is warranted. |
| IX | Mosaic council when user is lost/undecided | **N/A** | User gave a precise mission order; no decision paralysis condition was present. |
| X | No false completion; evidence labels | **PASS** | Findings distinguish verified, not verified, and conflict states. |
| XI | Challenge with evidence; no silent override | **PASS** | [VERIFIED] Mismatches and security findings are documented without code override. |
| XII | Core governance for tooling/security | **PASS** | [VERIFIED] Root test/pangolin commands, package manifests and SRE tools are retained centrally. |
| XIII | Lean silent pipeline; formal dossier only for major work | **PASS** | [VERIFIED] This is an explicitly requested whole-monorepo architectural diagnostic, an appropriate formal-dossier case. |

---

## 4. Subsystem Diagnostic Findings

### 4.1 Storage & schema engine — `00-storage.js`, `01-migrations.js`

- **[VERIFIED] Health:** `HubStorage` starts localStorage-first and attempts an IndexedDB mirror. It falls back to localStorage when IndexedDB is unavailable, errors, or is blocked. `HubStorage estimate/fallback` passed its unit test.
- **[VERIFIED] Migration safety:** migrations create `hub.backup.pre_migration` before version changes and expose rollback restoration; app smoke exercised a version 0→2 migration successfully.
- **[VERIFIED] Quota telemetry:** `navigator.storage.estimate()` is guarded and returns usage, quota and percentage where supported.
- **[NOT VERIFIED] Latency/memory:** no browser performance profile or quota-exhaustion stress run was performed. The fallback contract is source- and unit-test-verified, not capacity-benchmarked.
- **[VERIFIED] Risk:** SRE scanner flags three high-frequency storage-write candidates elsewhere (`companion/assets/index-2WcSgEAf.js`, `09-main.js`, `12-today.js`); none was a redmark.

### 4.2 Task & circadian engine — `04-tracker.js`, `11-tasks.js`, `12-today.js`

- **[VERIFIED] Health:** tracker tests passed the decay, quantity, clearance, biometric estimate, bedtime projection, safe-cutoff and recommendation checks.
- **[CONFLICT] Pharmacokinetic invariant:** implementation uses `HALF_LIFE_CAF_H=5`, described in-source as a “5h half-life model.” The requested **5.7-hour** value is not present. The current residual calculations and warning threshold therefore do not meet the requested numerical requirement.
- **[VERIFIED] Bedtime safety:** `calculateBedtimeCaffeine`, `safeCaffeineCutoff`, and a confirmation warning for intake past the threshold are implemented; the UI shows an alert above 25 mg projected at bedtime.
- **[VERIFIED] Task/Today integration:** task persistence and project filter are localStorage-backed; Today carries dashboard rendering. The SRE scanner reports possible XSS locations at `11-tasks.js:326`, `12-today.js:1130`, and `12-today.js:1185`; this scanner evidence needs manual sanitization-path review before treating those as exploitable vulnerabilities.
- **[NOT VERIFIED] Latency/memory:** no large task-list or long intake-log performance stress was executed.

### 4.3 ChessLab AI core — `15-chess.js`, `15b-chess-engine-worker.js`, `15c-maia-worker.js`

- **[VERIFIED] Health:** the 11 ChessLab checks passed, including board rendering, FEN, legal move generation/application, opponent integration, activity bridge, personality policy, and tactical coaching/threat detection.
- **[VERIFIED] Lifecycle design:** `onChessPageDeactivate()` stops the engine and terminates both Chess and Maia workers. A `visibilitychange` handler calls it when the document becomes hidden. Pending engine promises are resolved during worker cleanup.
- **[VERIFIED] Engine architecture:** source exposes Stockfish WASM Worker status, an ONNX-labelled Maia neural route, fallback behavior where Workers are unsupported, and engine diagnostic fields.
- **[NOT VERIFIED] Runtime inference:** no actual Stockfish WASM binary load, Maia ONNX model fetch/load, worker throughput, tactical-analysis latency, or memory leak profile was run in a real browser. The lifecycle is source/test verified, not model-runtime benchmarked.

### 4.4 TheHUBBridge & Companion RPG — `TheHUBBridge.js`, `CanvasRenderer.js`, `GameLoop.js`, requested `AudioSystem.js`

- **[VERIFIED] Bidirectional contract:** the bridge audit passed all **15** signatures. Game→Hub dual-emits `idlehero.*` and `mtgame.*` ready/ack/snapshot/level-up/offline-reward/item-equipped events; Hub→game accepts activity, companion event/snapshot, pause/resume and theme messages.
- **[VERIFIED] Gamification conversion:** an inbound activity becomes `gold = floor(points × 10)` and `xp = floor(points × 5)` and is acknowledged with both message families.
- **[VERIFIED] Rendering:** `CanvasRenderer.js` contains Canvas 2D procedural drawing primitives (rectangles, gradients, paths, and sprite fallback drawing). It also supports `drawImage` when an image is supplied; therefore “purely procedural” is only partially accurate.
- **[VERIFIED] Power budget design:** GameLoop switches to **5 FPS** when hidden, restores 60 FPS when visible, resets its accumulator on return, and clamps frame time to 500 ms. It retains `requestAnimationFrame` scheduling, so render work is throttled while the scheduling callback remains browser-managed.
- **[CONFLICT] Audio:** no `AudioSystem.js` or audio-system filename exists under the repository. Zero-asset procedural Web Audio synthesis is **not verified and presently absent by file inventory**.
- **[VERIFIED] Security hardening gap:** `TheHUBBridge` uses `window.parent.postMessage(..., '*')`; its inbound listener routes all message data without origin validation. This is a concrete hardening target for an iframe integration, subject to an agreed fixed local origin/allowlist.
- **[NOT VERIFIED] Message-load latency, canvas FPS, audio latency, and mobile power draw** were not benchmarked in a browser.

### 4.5 Security & spatial vault — `07-vault.js`, `17-presence.js`, `18-ruview-bridge.js`

- **[VERIFIED] Vault cryptography:** vault key derivation uses PBKDF2 SHA-256 with 250,000 iterations and a non-extractable AES-GCM-256 key. Encryption/decryption invoke `crypto.subtle` AES-GCM.
- **[VERIFIED] Zeroization/lock behavior:** `lockVault()` nulls the module and window key references, resets unlock state, clears selected state and replaces in-memory vault data with an empty site list. The presence unit test specifically passed the “auto-locks vault after 3 minutes away” and key-purge behavior.
- **[VERIFIED] Three-minute rule:** `checkPresenceVaultSecurity(awayDurationMs)` locks at `awayMin >= 3`; presence calls this behaviour through away handling. User-configured normal away timeout defaults to 900 seconds, but the vault helper independently supports the three-minute security threshold.
- **[VERIFIED] RuView design:** bridge starts disconnected, retains a bounded data window, and throttles localStorage telemetry writes to 5 seconds; disconnected-state and proxy tests passed.
- **[PARTIAL] Hardware simulation:** the required explicit `SIMULATION_MODE=true` / synthetic feed was not located in `18-ruview-bridge.js`. Offline/disconnected behavior is present, but it is not equivalent to a synthetic sensor feed.
- **[NOT VERIFIED] Real spatial-sensor accuracy, absence timing accuracy, and actual encrypted-data recovery on a physical device were not tested.**

### 4.6 SRE sentinel & field repair — `tools/sre-auto-sentinel.js`, `docs/patchnotes/`

- **[VERIFIED] Sentinel pipeline:** Pangolin runs `npm test`, `sre-fault-scanner.js`, then `npm run audit:all`; a failure produces a diagnostic report, dispatch prompt and Python-standard-library ZIP fallback.
- **[VERIFIED] Pass condition:** the successful run reported 43/137 green, zero critical redmarks and aligned audit contracts.
- **[VERIFIED] Scanner caveat:** direct health scan returns process success with nine warnings: 3 possible XSS, 3 storage-write risks, and 3 zombie-listener risks. “0 redmarks” should be read as no scanner-defined blocker, not proof that the code has no security or performance debt.
- **[VERIFIED] Dependency caveat:** scanner/audit-all does not include `npm audit`; direct dependency audit finds 3 high findings. This is why the independent verdict is SEV-2 rather than adopting the sentinel’s SEV-0 banner verbatim.

---

## 5. Pangolin Patch & Sentinel Status

### Living ledger status — `docs/patchnotes/PATCHNOTES_LEDGER.md`

**[VERIFIED]** The ledger is present, declared “Living Patchnotes Ledger,” and contains four resolved entries dated 2026-08-11:

1. `PATCH-20260811-01` — ChessLab Board Tab Distortion & Rules Engine Migration; cites `unit-chess.js` with 11 passing assertions.
2. `PATCH-20260811-02` — RuView WebSocket Proxy Non-Blocking Relay & Gating; cites RuView JS/Python tests with 26 passing assertions.
3. `PATCH-20260811-03` — Storage Quota Safeguard & Pre-Migration Backups; cites storage test with 4 passing assertions.
4. `PATCH-20260811-04` — Companion RPG Power & Frame-Rate Governor; cites the companion test suite with 31 passing unit tests.

**[VERIFIED]** The ledger’s claimed components correspond to source evidence (storage snapshot, RuView write throttling, worker/loop mechanisms) and the current CI pass.

**[VERIFIED] Initial setup incident:** running Pangolin before dependencies were installed generated an automatic hotfix proposal because `jsdom` was absent. This was an environment bootstrap condition, not reproduced after `npm run install:all`; the temporary proposal artifacts were removed from the working checkout after the green verification.

**[NOT VERIFIED]** No actual hotfix packaging fallback was intentionally triggered after dependencies were installed, because deliberately breaking a passing suite would violate the green-test mandate.

---

## 6. Risk Analysis & Next Recommended Hardening Steps

Priorities are deliberately surgical and remain within the offline-first Vanilla JS + Canvas + Python-proxy architecture.

1. **P0 — Align caffeine physiology with the written invariant.** Change only the caffeine half-life constant and the tests/visible text necessary to make the required **5.7-hour** model explicit. Re-run `npm test` and Pangolin. Do not change taurine/sugar estimate semantics without a separately approved requirement.
2. **P0 — Dependency-only security patch.** Inspect the lockfile dependency paths for `ip-address`, `js-yaml`, and `undici`; update the minimum safe transitive/package versions using the smallest compatible lockfile change. Review the diff, run `npm test`, `npm run pangolin`, and `npm audit`. Avoid `npm audit fix --force` without review.
3. **P1 — Define the audio contract before implementing it.** The requested `AudioSystem.js` is absent. First decide whether Phase 1 requires procedural Web Audio now or whether the requirement should be removed from the acceptance list. If approved, add one isolated Web Audio module with browser capability fallback and focused tests—no asset pipeline or framework.
4. **P1 — Restrict companion iframe messaging.** Replace wildcard `postMessage` target origin and add a matching inbound origin/source allowlist for the known local TheHUB origin(s). Add a narrow bridge regression test; retain the existing 15 message signatures.
5. **P1 — Close the simulation acceptance gap.** Add a small, explicitly labelled local synthetic RuView feed behind `SIMULATION_MODE=true`, or amend the requirement to call the existing disconnected mode sufficient. Test the simulated present/away transitions and 3-minute vault lock.
6. **P2 — Triage scanner warnings one at a time.** Manually inspect the three XSS candidates, then introduce only the escaping/sanitization or safe DOM API changes evidenced as necessary. Separately rate-limit the three storage-write candidates and make message listeners removable/owned where lifecycle evidence supports it.
7. **P2 — Establish browser benchmarks.** Add a manual or headless browser benchmark sheet for: chess worker/model initialization, tactical latency, hidden-tab CPU, canvas FPS, long task/log rendering, bridge event burst, and vault lock. Current measurements are CI wall-clock time, not UI latency/power/memory measurements.

### Beginner summary

Fix the number “5” to “5.7” in the caffeine maths with its tests, safely update the three flagged packages, and decide whether the game truly needs sound right now. After that, make messages between the game and dashboard accept only the right local page. These are small, focused repairs—not a rewrite.
