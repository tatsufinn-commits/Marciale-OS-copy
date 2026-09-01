# VSS-00 — SHARED RUNTIME / SYSTEM COHESION AUDIT
## Reconnaissance Dossier · Phase 0 · NO IMPLEMENTATION

| Field | Value |
|---|---|
| Seat | R (RECONNAISSANCE · EXCEL) |
| Date | 2026-08-15 |
| Tree | HEAD `030f3db` (remote main) |
| Scope | Marciale-OS ONLY · TAMAKEE untouched |
| Authority | `TASK_VSS_00_PHASE_0_RECON_DOSSIER.md` |
| Status | **PHASE 0 COMPLETE — recommendations are PROPOSALS ONLY** |

---

## 0. HEAD DECLARATION

```
$ git rev-parse --short HEAD
030f3db
$ git status --short
(clean at open; only untracked research/* files present throughout)
```

## 0.1 VERIFICATION BASELINE (run this watch, documented only)

| Surface | Command | Result |
|---|---|---|
| Tests | `npm test` | Hub chain green · **Companion 77/77 pass** · 0 fail |
| Pangolin | `npm run pangolin` | exit 0 |
| Health | `npm run health` | exit 0 · **9 minor warnings** (see F12) |
| Audits | `npm run audit:all` | exit 0 |
| Build | `npm run build` | exit 0 · **dirties tree** (see F13) |
| merge:gate | *(not run — dispatch trap #3)* | — |

---

# PART A — THE FIVE-PART MATURITY ASSESSMENT (the heart of the dossier)

Assessed against the shared runtime as a whole:

| Stage | Verdict | Basis |
|---|---|---|
| **CAPABILITY** | ✅ SATISFIED | Companion (iframe), chess (inline + workers), RuView (iframe), presence, AI assistant (Ollama), vault all exist and are wired (`index.html:1059–1086`, `14-companion.js`, `15-chess.js`, `18-ruview-bridge.js`). |
| **CONTRACT** | ⚠️ PARTIAL | HubFrame provides a postMessage wrapper *contract* (`16-hubframe.js`), but adoption is **non-uniform**: chess bypasses it (inline, no frame), CADAM is not mounted at all (comment-only), and the origin contract is **asymmetric** (child validates origin; host validates only source — F1/F2). |
| **OBSERVABILITY** | ⚠️ PARTIAL | Global `error`/`unhandledrejection` → `logHubError` → localStorage exists (`00-utils-config.js:252–253`), but errors are **logged, not surfaced**; Hub tests emit **no TAP** (text-only `✅`); health scanner **green-washes** 9 real warnings as "SEV-0 Normal" (F12). |
| **VERIFICATION** | ⚠️ PARTIAL | Companion 77/77 TAP-clean; Hub smoke green but **not machine-parseable**; the origin regression test (`unit-postmessage-origin.js`) covers the **child** side only — the **host** side it was written to catch is unverified (F3). Pangolin count was historically manufactured (repaired on this tree — F14). |
| **RECOVERY** | ✅ SATISFIED (baseline) | Boot try/catch → "Reset data" screen (`09-main.js`); migration backup + rollback (`01-migrations.js`); `HubFrame.reload()`; worker `terminate`+reload (`15-chess.js:1791–1846`). **Gap:** no recovery for a hung iframe beyond manual reload. |

**Summary sentence:** The runtime *can* do everything and *recovers* well, but its **contracts are inconsistent** (the same bridge is enforced on one side and not the other) and its **observability over-reports green** — capability and recovery are ahead of contract and verification.

---

# PART B — FINDINGS (six surfaces, 14 findings)

> Every finding carries exactly one evidence class and one epistemic tag.
> Class B claims cite file + line. Reproduction = exact steps for Seat E.

---

## SURFACE 1 — HUBFRAME (hosting / mount / teardown)

### F1 · `postMessage` sends with targetOrigin `'*'` — no origin pinning
1. **Observation** — HubFrame's postMessage wrapper transmits to any target origin.
2. **Repository evidence** — `modules/16-hubframe.js:131` — `this.frame.contentWindow.postMessage(Object.assign({ from: 'TheHUB' }, msg || {}), '*')`.
3. **Affected subsystem** — HubFrame → all iframe children (Companion, RuView).
4. **Failure domain** — Security / bridge confidentiality. Any window that gains a reference to the child `contentWindow` can receive (not spoof) hub→child traffic.
5. **Existing architecture** — A single `postMessage(msg)` wrapper with a try/catch → `logHubError`.
6. **Missing contract** — `targetOrigin` should be the child's expected origin (or derived from `this.frame.src`), not `'*'`.
7. **Reproduction** — `grep -n "postMessage(" modules/16-hubframe.js` → observe `'*'` at line 131. To observe behaviour, mount a HubFrame, intercept in the child with a listener that logs `event.origin`, and confirm it is `null`/`'*'`-targeted.
8. **External reference** — MDN `Window.postMessage`: always specify an exact `targetOrigin` to avoid leaking messages to unknown windows. *(Class C — comparative only.)*
9. **Recommendation** *(PROPOSAL)* — Pin `targetOrigin` to the resolved child origin in `HubFrame.postMessage`.
10. **Confidence** — **Class B** · `[VERIFIED]`

### F2 · HubFrame message listener checks source but never origin
1. **Observation** — The host-side receive path validates the frame *handle* but not the message *origin*.
2. **Repository evidence** — `modules/16-hubframe.js:114–120` — `_wireMessages` handler: `if (!this.frame || e.source !== this.frame.contentWindow) return;` — no `e.origin` check.
3. **Affected subsystem** — HubFrame (host side of every iframe bridge).
4. **Failure domain** — Security. If a child frame is navigated to a hostile origin, its `contentWindow` still matches, and its messages are accepted.
5. **Existing architecture** — Source-handle equality as the sole gate.
6. **Missing contract** — A host-side origin allowlist mirroring the child-side one already shipped (see F3).
7. **Reproduction** — `sed -n '114,120p' modules/16-hubframe.js` — confirm no `.origin` in the guard. Behavioural: attach a `message` listener, dispatch `{origin:'https://evil.example', source: <child contentWindow>, data:{...}}` and observe acceptance.
8. **External reference** — Same MDN guidance; the `unit-postmessage-origin.js` test itself states origin+source are "the only unforgeable facts." *(Class C.)*
9. **Recommendation** *(PROPOSAL)* — Add `e.origin` validation in `_wireMessages`, allowlisting the frame's expected origin.
10. **Confidence** — **Class B** · `[VERIFIED]`

### F3 · HubFrame claims four hosts; it is used by one
1. **Observation** — The header documents a role the code does not fulfil.
2. **Repository evidence** — `modules/16-hubframe.js:3` — "Reusable managed iframe container for Companion, Chess, RuView, CADAM." vs. `grep -rn "new HubFrame" modules/*.js` → **only** `14-companion.js:384` and `14-companion.js:524`. Chess is inline (F9); CADAM is referenced nowhere but this comment.
3. **Affected subsystem** — HubFrame / documentation contract.
4. **Failure domain** — Architectural drift: future work may assume chess/CADAM are iframe-isolated when they are not.
5. **Existing architecture** — One HubFrame class; two companion instantiations.
6. **Missing contract** — Either the header must be corrected, or chess/CADAM must actually be mounted via HubFrame.
7. **Reproduction** — `grep -rn "new HubFrame" modules/*.js` (expect 2 hits, both companion); `grep -rn "CADAM" modules/*.js` (expect only the hubframe comment).
8. **External reference** — *(none required.)*
9. **Recommendation** *(PROPOSAL)* — Correct the HubFrame header to reflect actual usage; treat CADAM as not-yet-integrated.
10. **Confidence** — **Class B** · `[VERIFIED]`

---

## SURFACE 2 — BRIDGE LIFECYCLE

### F4 · Host-side companion handler skips its guard entirely when no frame is mounted
1. **Observation** — The `event.source` check is bypassed by a zero-frame early-out, so any message is accepted when the companion is unmounted.
2. **Repository evidence** — `modules/14-companion.js:166–167` — `if(frames.length && !frames.some(frame=>event.source===frame.contentWindow)) return;` — when `frames.length === 0`, the predicate short-circuits and the handler proceeds on *any* message.
3. **Affected subsystem** — Companion bridge (host side).
4. **Failure domain** — Security + state integrity: a stray postMessage can mutate companion hero state or fire toasts when no companion exists.
5. **Existing architecture** — A `message` listener registered both via `window.addEventListener('message', handleCompanionFrameMessage)` (`14-companion.js:207`) and as HubFrame `onMessage` (`14-companion.js:390,530`).
6. **Missing contract** — The guard must be unconditional: reject when no registered frame matches, and validate origin (F2).
7. **Reproduction** — In a console with the Hub loaded but companion not mounted: `window.postMessage({type:'idlehero.ready'},'*')` → observe `COMPANION_FRAME_READY` flip to true (`14-companion.js:170`).
8. **External reference** — *(Class C none — repository-internal logic.)*
9. **Recommendation** *(PROPOSAL)* — Make the source check unconditional (`if(!frames.some(...)) return;`) and add origin validation.
10. **Confidence** — **Class B** · `[VERIFIED]`

### F5 · The origin-guard regression test does not cover the host-side handlers
1. **Observation** — The test written after the 2026-08-15 SEV-2 fault audits only the *child* side; the *host* side it implicates remains untested.
2. **Repository evidence** — `tests/unit-postmessage-origin.js:24–30` — `targets` = `companion-mini/companion-mini.js`, `ruview/ruview-bridge-injector.js`, `ruview/ruview-frame.js`. `14-companion.js` and `16-hubframe.js` are absent from the list.
3. **Affected subsystem** — Bridge verification.
4. **Failure domain** — Verification blind spot: the exact class of hole the test documents (unguarded host listener) is not covered on the host.
5. **Existing architecture** — Static grep-style checks (`code.includes(marker)`, regex) per file.
6. **Missing contract** — Host-side files (`14-companion.js`, `16-hubframe.js`) should be added to the `targets` list with a host-side marker (e.g. `event.origin`).
7. **Reproduction** — `head -35 tests/unit-postmessage-origin.js` → observe `targets` excludes host files. Run `node tests/unit-postmessage-origin.js` → 14 pass, none exercise the host.
8. **External reference** — *(Class C none.)*
9. **Recommendation** *(PROPOSAL)* — Extend `targets` to the host side; assert an origin allowlist in `16-hubframe.js` and `14-companion.js`.
10. **Confidence** — **Class B** · `[VERIFIED]`

### F6 · SRE scanner flags "zombie listener" risk in three bridge files
1. **Observation** — The repo's own fault scanner reports unguarded message listeners, corroborating F1–F4.
2. **Repository evidence** — `npm run health` output, Audit 3 — `[ZOMBIE LISTENER RISK]` in `companion-mini/companion-mini.js`, `modules/ruview/ruview-bridge-injector.js`, `modules/ruview/ruview-frame.js`.
3. **Affected subsystem** — Companion-mini + RuView bridges.
4. **Failure domain** — Lifecycle leak: listeners not removed on teardown → orphan handlers on re-mount.
5. **Existing architecture** — HubFrame `destroy()` removes its own listeners (`16-hubframe.js:161–167`); child-side listeners have no equivalent teardown.
6. **Missing contract** — A symmetric teardown on the child side (or `{once:true}` / singleton registration).
7. **Reproduction** — `npm run health` → read Audit 3. (Exit code remains 0 — see F12.)
8. **External reference** — *(Class C none.)*
9. **Recommendation** *(PROPOSAL)* — Child-side listeners adopt `once`/singleton + explicit remove on unload.
10. **Confidence** — **Class B** · `[VERIFIED]`

---

## SURFACE 3 — STATE SYNCHRONIZATION

### F7 · Dual-store: localStorage is truth, IndexedDB is an async mirror — two write paths
1. **Observation** — State ownership is defined, but two storage backends create a mirror-drift surface.
2. **Repository evidence** — `modules/00-storage.js:1–11` — "localStorage-first behavior. LS.get()/LS.set() remain the source of truth … HubStorage mirrors future writes into IndexedDB."
3. **Affected subsystem** — Storage foundation (every module).
4. **Failure domain** — State divergence between the sync primary and async mirror if the mirror write is dropped.
5. **Existing architecture** — `LS` synchronous wrapper (truth) + `HubStorage` async mirror with `_failed`/`backend` fallback flags.
6. **Missing contract** — A reconciliation/verify path proving mirror==truth (or a decision that the mirror is best-effort and disposable).
7. **Reproduction** — `sed -n '1,60p' modules/00-storage.js` → observe the mirror architecture and the absence of a reconciliation read-path in `LS.get`.
8. **External reference** — *(Class C none.)*
9. **Recommendation** *(PROPOSAL)* — Declare the mirror best-effort; add a one-shot integrity check comparing a checksum of `LS` vs mirror on boot.
10. **Confidence** — **Class B** · `[VERIFIED]`

### F8 · Migrations are versioned with backup + rollback (RECOVERY-positive)
1. **Observation** — The migration layer is a genuine recovery surface (positive finding).
2. **Repository evidence** — `modules/01-migrations.js:4–29` — `CURRENT_SCHEMA_VERSION = 2`, `createPreMigrationBackup()`, `rollbackMigration()`.
3. **Affected subsystem** — Storage migrations.
4. **Failure domain** — (This finding *mitigates* the data-loss failure domain.)
5. **Existing architecture** — Pre-migration snapshot to `hub.backup.pre_migration`; rollback restores keys.
6. **Missing contract** — Backup expiry/pruning (the snapshot is unbounded) and an explicit "migration succeeded" clear.
7. **Reproduction** — `sed -n '1,45p' modules/01-migrations.js`.
8. **External reference** — *(Class C none.)*
9. **Recommendation** *(PROPOSAL)* — Prune stale pre-migration backups; clear on successful migration.
10. **Confidence** — **Class B** · `[VERIFIED]`

---

## SURFACE 4 — SUBSYSTEM ISOLATION (the critical question)

### F9 · Isolation is inconsistent: iframe-isolated vs inline vs not-mounted
1. **Observation** — *Can one subsystem's failure take down TheHUB?* The answer depends on which subsystem — and the house does not enforce a uniform answer.
2. **Repository evidence** —
   - Companion → sandboxed iframe (`16-hubframe.js:27` sandbox attr; `14-companion.js:384,524`).
   - RuView → iframe (`ruview-frame.js`, referenced by `unit-postmessage-origin.js`).
   - Chess → **inline** in the Hub DOM (`15-chess.js`), engine only in workers (`15-chess.js:1849` `new Worker(...)`).
   - CADAM → comment-only (`16-hubframe.js:3`); no mount, no module.
3. **Affected subsystem** — Chess (inline) is the outlier; all productivity modules (00–19) share one global scope.
4. **Failure domain** — A throw in chess's top-level or DOM code propagates in the Hub's shared global context; only a *worker* crash is contained.
5. **Existing architecture** — Two isolation tiers: iframe (Companion, RuView) and worker (chess engine), plus an un-isolated inline tier (chess UI, all productivity modules).
6. **Missing contract** — A single declared isolation policy per subsystem ("every non-core subsystem runs in an iframe *or* a worker; none runs inline in the Hub global scope").
7. **Reproduction** — `grep -rn "new HubFrame" modules/*.js` (2 companion hits) vs `grep -n "new Worker" modules/15-chess.js` (engine only) vs `ls modules/` (no CADAM module). Load the Hub, open ChessLab, and confirm chess UI renders in the top document (not an iframe).
8. **External reference** — Browser iframe sandboxing / Web Workers isolation model. *(Class C.)*
9. **Recommendation** *(PROPOSAL)* — Adopt a tiered isolation policy; decide whether chess UI moves into an iframe (consistent with Companion/RuView) or is accepted as an inline core module with its own error boundary.
10. **Confidence** — **Class B** · `[VERIFIED]` (architecture) + **Class D** `[INFERRED]` (blast-radius severity, inferred from shared-global loading).

### F10 · All Hub modules load as classic scripts sharing one global namespace
1. **Observation** — There is no module boundary between the Hub's own subsystems.
2. **Repository evidence** — `index.html:1059–1086` — 28 plain `<script src>` tags, no `type="module"`, no bundler; `09-main.js` loaded last with a boot try/catch.
3. **Affected subsystem** — TheHUB core (all modules 00–19).
4. **Failure domain** — A load-time throw in module N breaks wiring in modules N+1; only `09-main.js`'s try/catch (recovery screen) bounds it.
5. **Existing architecture** — Global-scope scripts; functions/state on `window`.
6. **Missing contract** — Per-module error boundaries or a module loader; the only boundary is the final boot try/catch.
7. **Reproduction** — `sed -n '1059,1086p' index.html`. Behavioural: introduce a `throw` at top level of `15-chess.js` and observe whether `09-main.js` still boots (it will — scripts are independent — but wiring that depends on chess globals will be missing).
8. **External reference** — ES modules / dynamic import for scoped failures. *(Class C.)*
9. **Recommendation** *(PROPOSAL)* — Investigate module isolation (ES modules or per-subsystem try/catch) — larger bite, likely a later VSS slice; flag only.
10. **Confidence** — **Class B** · `[VERIFIED]`

### F11 · Worker bootstrap throws `_location` TypeError in the test harness, and it is swallowed
1. **Observation** — `npm test` prints `TypeError: Cannot read properties of null (reading '_location')` **twice** while still reporting 0 failures.
2. **Repository evidence** — Worker source `modules/stockfish.wasm.js:16` accesses `self.location.href` in the worker bootstrap path (`ENVIRONMENT_IS_WORKER ? scriptDirectory=self.location.href : …`); no `self.location` null guard. Emitted during `npm test` (Hub chain) this watch.
3. **Affected subsystem** — Chess engine worker bootstrap.
4. **Failure domain** — Robustness + observability: the worker bootstrap is not resilient to a missing `self.location`, and the error is not surfaced as a test failure.
5. **Existing architecture** — Emscripten-generated worker glue; no guard.
6. **Missing contract** — A null-safe bootstrap (fall back to `''` when `self.location` is unavailable) and/or surfacing harness errors as failures.
7. **Reproduction** — `npm test` → observe the two `TypeError` lines between `✅ RuView Proxy` and `✅ App smoke checks`; `grep -n "self.location" modules/stockfish.wasm.js`.
8. **External reference** — Emscripten worker bootstrap idiom guards `location`. *(Class C.)*
9. **Recommendation** *(PROPOSAL)* — Note only; the fix is trivial and belongs to a chess-tooling slice, not VSS-00.
10. **Confidence** — **Class B** · `[VERIFIED]`

---

## SURFACE 5 — COMMON LOADING / ERROR HANDLING

### F12 · Error handling exists but green-washes: "SEV-0 Normal" with 9 real warnings
1. **Observation** — The fault scanner exits 0 with a "0 Redmarks / SEV-0" verdict while enumerating 3 XSS, 3 zombie-listener, and 3 storage-quota risks.
2. **Repository evidence** — `npm run health` output this watch: Audit 1 → `[POSSIBLE XSS] 11-tasks.js:326, 12-today.js:1193, 12-today.js:1248`; Audit 2 → `[STORAGE RISK]` high-frequency writes in `09-main.js`, `12-today.js`, companion asset; Audit 3 → `[ZOMBIE LISTENER RISK]` (F6); yet final line `SRE SCAN PASSED: 0 Redmarks … SEV-0 (Normal)`.
3. **Affected subsystem** — SRE tooling + the modules it flags.
4. **Failure domain** — Observability integrity: a "green" verdict that does not encode its own warnings trains operators to ignore it.
5. **Existing architecture** — `tools/sre-fault-scanner.js` classifies findings as "minor warnings" without affecting the SEV level.
6. **Missing contract** — Severity mapping: warnings of security relevance (XSS, unguarded listeners) should raise the SEV or at minimum be echoed in the verdict line.
7. **Reproduction** — `npm run health` → read the final verdict vs the warning list.
8. **External reference** — *(Class C none.)*
9. **Recommendation** *(PROPOSAL)* — Reclassify security-class warnings so "0 Redmarks" cannot coexist with XSS/zombie-listener flags.
10. **Confidence** — **Class B** · `[VERIFIED]`

---

## SURFACE 6 — AUDIO LIFECYCLE (boundary only)

### F13 · Audio ownership is split between a shared context and a per-module path
1. **Observation** — *Where audio lifecycle belongs* in the shared runtime is undefined; today it is split.
2. **Repository evidence** — Shared: `modules/00-utils-config.js:1180` `getHubAudioContext()` (lazy singleton, try/catch). Separate: `modules/15-chess.js:122` `CHESS_AUDIO_CACHE[kind]=new Audio(src)` (per-module, bypasses the shared context).
3. **Affected subsystem** — Audio (shared util + chess).
4. **Failure domain** — Boundary identification only; the defect itself is **VSS-02 and out of scope**.
5. **Existing architecture** — Two unrelated audio paths.
6. **Missing contract** — A single audio service owning context + lifecycle; modules consume it instead of instantiating `new Audio`.
7. **Reproduction** — `grep -n "getHubAudioContext" modules/00-utils-config.js`; `grep -n "new Audio" modules/15-chess.js`.
8. **External reference** — *(Class C none.)*
9. **Recommendation** *(PROPOSAL)* — Audio lifecycle *belongs* in a dedicated runtime service under the shared util layer; route chess through it. Defer the fix to VSS-02.
10. **Confidence** — **Class B** · `[VERIFIED]` (boundary) — defect deferred.

---

## VERIFICATION-SURFACE FINDINGS (documented, not acted on)

### F14 · The pangolin "manufactured evidence" defect is REPAIRED on 030f3db — positional divergence
1. **Observation** — Dispatch trap #2 (sre-auto-sentinel.js hardcodes "43 suites / 137 assertions") is **stale for this tree**: the defect is fixed on remote main but the dispatch described Seat A's tree.
2. **Repository evidence** — `tools/sre-auto-sentinel.js:64` comment — "This line previously printed a HARDCODED '43 test suites / 137 assertions'." · `:80` — `✅ ${m.pass}/${m.total} tests passed (100% green) — measured from harness output.` `grep "43 test suites"` → only the comment.
3. **Affected subsystem** — SRE sentinel tooling.
4. **Failure domain** — Named-tree discipline: applying a6cef19's state to 030f3db would misreport a fixed defect.
5. **Existing architecture** — `grab('pass'/'fail'/'total')` now parses harness output.
6. **Missing contract** — *(none — resolved on this tree.)*
7. **Reproduction** — `sed -n '60,82p' tools/sre-auto-sentinel.js`; `npm run pangolin` → observe "measured from harness output" and 77/77.
8. **External reference** — *(Class C none.)*
9. **Recommendation** *(PROPOSAL)* — Record that the repair already landed upstream; Seat A's tree must pull it (no action by Seat R).
10. **Confidence** — **Class B** · `[VERIFIED]`

### F15 · `npm run build` writes into tracked `companion/` and dirties the tree
1. **Observation** — Running the documented build produces uncommitted deletions/modifications of tracked files.
2. **Repository evidence** — `npm run build` → Vite output `../../TheHUB …/companion/…`; `git status --short` afterwards showed `D` on 16 tracked `companion/assets/*` + `M companion/index.html`. Recovered with `git checkout -- "TheHUB 1.5.5.2.3 a v/companion/"` (tree returned to clean). This is dispatch trap #3, reproduced.
3. **Affected subsystem** — Build/packaging contract.
4. **Failure domain** — Release hygiene: a routine build clobbers tracked artifacts, risking accidental commits of generated files.
5. **Existing architecture** — Vite `outDir` points into the tracked `TheHUB/companion/` tree.
6. **Missing contract** — Build output should target a gitignored `dist/` (or the tracked assets should be generated-only and ignored).
7. **Reproduction** — `npm run build && git status --short` → observe `D`/`M` on `companion/`; recover with the `git checkout` above.
8. **External reference** — Standard Vite output-dir hygiene. *(Class C.)*
9. **Recommendation** *(PROPOSAL)* — Retarget Vite `outDir` off tracked paths; until then, keep the recovery command documented (it is).
10. **Confidence** — **Class B** · `[VERIFIED]`

---

# PART C — RECOMMENDED NEXT SLICE (proposal only)

**Counsel:** the next slice should close the **host-side bridge origin gap** (F1 + F2 + F4 + F5) as one coherent unit:

- It is the single highest-severity, fully-evidenced, *smallest* item — the child-side origin allowlist already exists as a template, so the host side is a mirror, not a design.
- It directly serves the Commander's platform requirement ("a subsystem failure must not unnecessarily kill TheHUB") by hardening the trust boundary that *every* iframe subsystem depends on.
- It is a pure, surgical, testable diff (add origin checks + extend `unit-postmessage-origin.js` targets), fully inside Law I / Law VII.

**Second-order candidate:** the build-output contract (F15) — mechanical, high-value, zero design risk; good first bite for Seat E in parallel.

*Selection is the Commander's — not mine, not Seat A's.*

---

## PART D — RESUMPABILITY + SCOPE CERTIFICATION

- [x] Dossier complete, filed at `research/VSS_RECONNAISSANCE_DOSSIER_VSS00.md`
- [x] Every finding classed (A/B/C/D) and tagged
- [x] Every Class-B claim cites file + line
- [x] Every reproduction executable by Seat E without my context
- [x] Five-part maturity assessment stated (Part A)
- [x] Zero files modified outside `research/` (tree verified clean; build dirt recovered)
- [x] TAMAKEE untouched (never opened)
- [x] Next slice named, proposal only (Part C)

A successor resuming this watch can continue at any Part B finding boundary using the cited file+line and reproduction steps alone.

— Seat R, EXCEL · research-only · VSS-00 Phase 0 discharged
