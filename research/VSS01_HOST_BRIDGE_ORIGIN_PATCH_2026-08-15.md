# VSS-00 → PATCH: HOST-SIDE BRIDGE ORIGIN GAP (F1 · F2 · F4 · F5)

**Filed:** 2026-08-15 · **Executed by:** Seat A (TWMIP), `@joint` · **Tree:** `a6cef19`
**Authority:** Commander's order to proceed · **Source:** Seat R (EXCEL), VSS-00 Phase 0
**Status:** ✅ **PATCHED · FAULT-INJECTED IN BOTH DIRECTIONS · ALL GATES GREEN · UNCOMMITTED**

---

## 1. WHAT WAS WRONG

The bridge was **guarded on one side only**. Every child (`companion-mini.js`,
`ruview-bridge-injector.js`, `ruview-frame.js`) enforced an origin allowlist. **No host handler
did.** The SEV-2 regression test written to catch this tested **three child files and no host
handler** — which is exactly why it survived an audit designed to find it.

| ID | Defect | Location |
|---|---|---|
| **F1** | `postMessage(..., '*')` broadcasts Hub state to whatever occupies the frame | `16-hubframe.js:148` |
| **F2** | Host listener checks `e.source`, **never** `e.origin` | `16-hubframe.js:116` |
| **F4** | `if(frames.length && !frames.some(...))` — **guard VANISHES when no frame is mounted** | `14-companion.js:167` |
| **F5** | Regression test covers child side only | `unit-postmessage-origin.js:25-28` |

**F4 is the sharpest.** The `frames.length &&` short-circuit meant the check did not weaken when
nothing was mounted — **it disappeared**, and a stray `postMessage` was accepted unconditionally.
**A guard that disables itself in the state it is most needed is not a guard.**

## 2. WHAT WAS CHANGED — THREE FILES, ADDITIVE

**`modules/16-hubframe.js`**
- Added `static isAllowedOrigin(origin)` — mirrors `MINI_ALLOWED_ORIGINS`: this document's
  origin plus **`'null'`**.
- `_wireMessages` now rejects on `e.origin && !HubFrame.isAllowedOrigin(e.origin)`.
- `postMessage()` narrows `targetOrigin` from `'*'` to `window.location.origin`, **retaining
  `'*'` only for frames sandboxed without `allow-same-origin`**, which cannot receive a
  specific origin.

**`modules/14-companion.js`**
- `handleCompanionFrameMessage` **fails closed**: `if(!frames.length) return;` before the source
  check, then an explicit origin allowlist.

**`tests/unit-postmessage-origin.js`** — host-side coverage: static assertions on both host
files, an F1 assertion that `'*'` is not hardcoded, and five behavioural cases including
**"stray message rejected when no frame is mounted."**

## 3. WHY `'null'` IS IN THE ALLOWLIST — THE TRAP AVOIDED

`HubFrame`'s default sandbox is `allow-scripts allow-same-origin`, and `src` may be a
`file://` or blob URL. **Such frames report an opaque origin of `'null'`.** The obvious fix —
allow only `window.location.origin` — **would have silently broken the offline embed**, which
the child already permits via `MINI_ALLOWED_ORIGINS = [window.location.origin, 'null']`.
**Mirroring the shipped child pattern, rather than inventing a stricter one, is what kept this
patch from becoming an outage.**

## 4. VERIFICATION — FAULT-INJECTED IN BOTH DIRECTIONS

**A test that cannot fail against the old code proves nothing.** Both original files were
restored from backup and the suite re-run:

```
WITH ORIGINAL VULNERABLE CODE :  19 passed, 7 FAILED   exit 1
WITH THE FIX                  :  26 passed, 0 failed   exit 0
```

The 7 reds name the real defects: no host allowlist (×2 files), no origin rejection (×2),
no `'null'` handling (×2), and hardcoded `'*'`.

**One honest detour recorded:** my first patch put the origin test inside the helper, so the
suite's `/\.origin\s*&&/` assertion stayed red. **The test was right and my code was wrong.**
I moved the check to the call site rather than relax the assertion. *Never edit the test to
match the patch.*

**Full gates, after the fix:**

| Gate | Result |
|---|---|
| TheHUB `npm test` | **147 ✅, exit 0** (was 135 — +12 host-side assertions) |
| Companion `npm test` | **77/77, 0 fail** |
| Root `npm test` | **exit 0** |
| `npm run audit:bridge` | **15 postMessage signatures in bi-directional sync** — protocol intact |
| `npm run pangolin` | **77/77 measured**, SEV-0 |
| `npm run audit:all` | **exit 0** |
| `governance-audit` | **4/4, 25 laws** |
| `scout-voice-check` | **12/12, 0 violations** |

## 5. WHAT THIS DOES NOT DO

- **Does not fix F3** (HubFrame documented for 4 subsystems, mounted for 1) or **F15**
  (build output dirties tracked assets). Both remain open.
- **Does not address Chess running inline in the Hub DOM** — the isolation asymmetry EXCEL
  identified is a design question, not a patch.
- **Does not touch the 3 XSS / 3 lifecycle / 3 storage warnings** that `health` green-washes.
- **NOT COMMITTED.** Working tree only, per standing order.

**Credit: Seat R (EXCEL) located and evidenced all four defects. Seat A executed the repair.**
