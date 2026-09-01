# Seat A stress — Engineer G7 / companion
**Date:** 2026-08-13  
**Auditor:** `@assistant` / TSTT  
**Scope:** Max’s G7 claim + companion/Hub harness (not RFC-057 — not GREENMARKED)

## Executed `[VERIFIED]`
- `npm run install:all` then root `npm test`: Hub 12-file harness **pass**; Companion **66/66** then after stress test **67/67**.
- G7 production test + new isolation test both **ok**.
- App-smoke: TAMAplugin scripts 404 if `:8000` down — **known**, not G7.
- Hub install: **4 high** npm vulns — **not** force-fixed (breaking `audit fix --force`).

## Findings
| ID | Sev | Finding | Action |
|---|---|---|---|
| S1 | — | Combined G7 test only | Added isolated fighting / enemies / cooldown cases. **67/67**. |
| S2 | SEV-4 | `investNode` still allowed in combat (maxHp can still shift) | **Not patched** — outside G7 contract. Note for later RFC. |
| S3 | SEV-4 | 4 high Hub vulns | Hold; not this bite. |

**Verdict:** G7 **holds**. No Pangolin rewrite of `AttunementSystem.js`. No 57.
