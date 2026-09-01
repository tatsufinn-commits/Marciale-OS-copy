# MARCIALE-OS SRE HOTFIX PROPOSAL

**Mode:** Autonomous SRE Fault, Diagnostic & Vulnerability Scan  
**Scope:** Read-only repository audit; no repository files modified  
**Repository:** `tatsufinn-commits/Marciale-OS`  
**Audit date:** 2026-08-11  
**Status:** DIAGNOSTIC / NOT APPLIED

## Executive status

**Current verified runtime status: NOT VERIFIED.**

The requested commands:

- `npm run health`
- `npm run audit:all`
- `npm test`

could not be executed in the current environment because the execution environment cannot resolve `github.com`, so a working repository checkout and its installed dependencies were unavailable.

Browser-console inspection was also not possible from this environment.

Therefore this report deliberately does **not** claim 43/43 tests green, SEV-0 runtime health, or absence of vulnerabilities.

## Findings

### FINDING SRE-01 — Audit scanner has XSS false-negative paths

**Severity:** SEV-2 — Data/Security Risk  
**Confidence:** VERIFIED STATIC DEFECT

`tools/sre-fault-scanner.js` only detects `.innerHTML =` on one line and explicitly excludes lines containing backticks. This means dynamic template-literal HTML assignments can escape the scanner.

It also requires simple textual patterns such as `esc(`, `escAttr(`, or `sanitizeHtml(` rather than proving that the assigned value is actually sanitized.

**Impact:** A real DOM-XSS sink can potentially pass `npm run health` without being reported.

**Surgical remediation:**
1. Replace the line-pattern heuristic with an AST-based or conservative sink scan.
2. Flag every `innerHTML`, `outerHTML`, `insertAdjacentHTML`, and HTML-string assignment.
3. Permit a sink only when the source is statically proven to pass an approved sanitizer/escape helper.
4. Add regression fixtures containing:
   - dynamic template literals
   - string concatenation
   - nested helper calls
   - sanitized and unsanitized variants
5. Make the scanner exit non-zero for confirmed unsafe sinks.

**Do not modify application modules as part of this remediation until a real finding is confirmed.**

---

### FINDING SRE-02 — Storage quota "safeguard" is telemetry, not enforcement

**Severity:** SEV-2 — Data/Storage Risk  
**Confidence:** VERIFIED STATIC DEFECT

`TheHUB .../modules/00-storage.js` exposes `estimate()`, which reports `quota`, `usage`, and `usagePercent`, but the write path does not use that information as a quota guard.

`set()` writes directly through an IndexedDB read/write transaction and returns `false` on failure. There is no configurable usage threshold, pre-write size check, retry policy, or explicit quota-exceeded handling.

**Impact:** The system can detect storage pressure but does not proactively prevent or clearly classify quota exhaustion.

**Surgical remediation:**
1. Keep `estimate()` as the telemetry primitive.
2. Add a small storage policy helper with a conservative threshold.
3. Before large writes, estimate available quota.
4. Catch `QuotaExceededError` explicitly.
5. Return a typed failure reason rather than only `false`.
6. Preserve the existing localStorage-first architecture.
7. Add tests for:
   - normal write
   - quota rejection
   - IndexedDB unavailable
   - blocked database
   - fallback behavior.

**Do not introduce a new storage framework or rewrite the persistence layer.**

---

### FINDING SRE-03 — `audit:all` can report success despite WCAG warnings

**Severity:** SEV-3 — Functional/QA Bug  
**Confidence:** VERIFIED STATIC DEFECT

`tools/qa-wcag-audit.js` increments `warnings` for failed checks but exits with status `0` regardless of warning count.

Therefore `npm run audit:all` can continue and ultimately succeed even when the WCAG audit reports warnings.

**Impact:** CI/manual audit gating can produce a false green result.

**Surgical remediation:**
1. Preserve warning reporting.
2. Decide which WCAG findings are blocking.
3. Exit non-zero when a blocking finding exists.
4. Keep cosmetic/advisory findings distinguishable from release blockers.
5. Add a regression test proving a deliberately broken fixture fails the audit.

---

### FINDING SRE-04 — License audit does not actually inspect package licenses

**Severity:** SEV-3 — Functional/QA Bug  
**Confidence:** VERIFIED STATIC DEFECT

`tools/scout-audit.js` describes itself as a license audit, but its copyleft detection checks whether a dependency's **package name** contains strings such as `gpl`, `agpl`, `sspl`, or `cpal`.

That is not a license determination.

**Impact:** A package with a copyleft license but an unrelated name can pass; a package whose name contains a matching string can generate a false positive.

**Surgical remediation:**
1. Read dependency license metadata from installed package manifests/lockfile.
2. Distinguish direct and transitive dependencies.
3. Report `UNKNOWN` when metadata cannot be established.
4. Fail only according to an explicit policy.
5. Add fixtures covering permissive, copyleft, and unknown metadata.

---

### FINDING SRE-05 — Bridge contract audit is substring-based

**Severity:** SEV-3 — Functional/QA Bug  
**Confidence:** VERIFIED STATIC DEFECT

`tools/bridge-contract-verify.js` determines whether an event is supported using `source.includes(eventName)`.

This verifies textual presence, not whether the event is actually emitted, handled, validated, or routed correctly.

**Impact:** Dead code/comments can satisfy the audit while a real runtime contract remains broken.

**Surgical remediation:**
1. Parse the actual event emit/receive sites.
2. Verify directionality.
3. Verify handler registration.
4. Verify payload schema where applicable.
5. Add positive and negative bridge fixtures.

---

### FINDING SRE-06 — Root `health` and `audit:all` are static scanners, not runtime health tests

**Severity:** SEV-3 — Functional/QA Gap  
**Confidence:** VERIFIED STATIC FACT

`npm run health` executes `tools/sre-fault-scanner.js`.

`npm run audit:all` executes three source-text audits.

These tools do not themselves prove:
- browser runtime health
- IndexedDB behavior in a real browser
- Ollama stream behavior
- postMessage lifecycle behavior
- memory leaks
- real network timeouts
- browser console cleanliness.

**Impact:** A green scan cannot be treated as equivalent to an end-to-end runtime health check.

**Surgical remediation:**
1. Keep the fast static scans.
2. Add a separate browser/runtime smoke layer.
3. Capture console errors.
4. Exercise IndexedDB and quota failure paths.
5. Exercise Companion postMessage handshake.
6. Exercise Ollama timeout/cancellation behavior.
7. Keep runtime checks separate from static scans so failures remain attributable.

---

## Browser console status

**NOT VERIFIED.**

No live browser session was available in this environment. No claim is made about current console errors.

Required local verification:

```bash
npm run health
npm run audit:all
npm test
npm --prefix "TheHUB 1.5.5.2.3 a v" test
npm --prefix "Gamecompanion/files" test
```

Then launch TheHUB and inspect:

```text
F12 → Console
F12 → Application → Local Storage
F12 → Application → IndexedDB → HubDB
```

Record any red exceptions verbatim.

## Test-count correction

The repository currently defines the root test command as two delegated test commands:

```text
TheHUB test
+
Companion test
```

TheHUB's `package.json` explicitly chains 12 test commands, while Companion uses `node --test tests/*.test.js`.

The project's documentation repeatedly refers to "43 tests/suites", but this report has **not independently verified that count** because the tests could not be executed.

## Required verification gate

A future applied hotfix must not be declared complete until all of the following are empirically true:

- `npm run health` → exit 0
- `npm run audit:all` → exit 0
- `npm test` → exit 0
- TheHUB test suite → 0 failures
- Companion test suite → 0 failures
- browser console → no new red errors
- storage failure tests → pass
- bridge contract tests → pass
- security fixtures → pass

## Recommended repair order

1. **SRE-01:** Harden XSS scanner.
2. **SRE-03:** Make WCAG audit fail when blocking findings exist.
3. **SRE-04:** Make dependency license audit inspect actual metadata.
4. **SRE-05:** Make bridge audit semantic rather than substring-based.
5. **SRE-02:** Add explicit storage quota/error policy.
6. **SRE-06:** Add browser-runtime verification.

This ordering improves the reliability of the verification machinery before relying on it to certify application changes.

## Important non-action

No application hotfix should be applied solely from this remote audit.

The findings above are primarily **verification-system and storage-policy weaknesses**. They are not proof that the production application currently has an exploitable XSS, active data loss, or runtime outage.

**Final status: HOLD / HOTFIX PROPOSAL ONLY.**
