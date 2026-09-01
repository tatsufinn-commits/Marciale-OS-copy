# 🛡️ ENGINEER DELIVERABLE — TASK G7 (TASK-JARWEN-2026-E-G7)
## Combat Respec Lock — Migration Verification Dossier

**Document ID:** `DELIVERABLE-TASK-G7-2026-E`  
**Date:** 2026-08-12  
**Executor:** ENGINEER (Max — Seat E)  
**Task Reference:** `/docs/council/members/ENGINEER/tasks/TASK_G7_COMBAT_RESPEC_MIGRATION.md`  
**Status:** `[VERIFIED] — G7 ALREADY PRESENT ON origin/main`  
**Integrated into house zip:** Seat A 2026-08-13 — copied from `arena/019ff477-marciale-os` **this file only** (not the 62-commit compare).

---

# I. DECISION: G7 ALREADY LANDED (VERIFICATION ONLY)

Per Task G7 instructions (#3), when the guard + test are **already identical on `main`**
and tests are green, the deliverable is a **verification dossier only**. **No code was
written or rewritten** in this watch (Law I — Non-Destructive Mandate).

## Repository Truth — `origin/main` at commit `3d133fd`
SHA: **`3d133fd` "Add council dispatch and G7 combat respec task"**

---

# II. GUARD VERIFICATION — `AttunementSystem.js`

File: `Gamecompanion/files/src/systems/AttunementSystem.js` (lines 155–193)

```js
_isCombatRespecLocked() {
  const combat = this.stateManager?.get('combat') || {};
  if (combat.state === 'fighting') return true;
  const enemies = Array.isArray(combat.enemies) ? combat.enemies : [];
  if (enemies.some((e) => e?.isAlive)) return true;
  const hero = combat.hero || {};
  if (Number(hero.attackCooldown) > 0) return true;
  return false;
}
```

Reject path: `{ success: false, reason: 'COMBAT_ACTIVE', pointsRefunded: 0 }` — no `stateManager.set`.

---

# III. TEST VERIFICATION — `AttunementSystem.test.js`

Test present: **"G7: AttunementSystem rejects respec during active combat without mutating state"** (line 303).

---

# IV. TEST COUNTS (DISCOVERED, NOT HARDCODED) — Engineer `[CLAIMED]`

| Suite | Discovered Result |
|---|---|
| Companion RPG | **66 / 66** (incl. G7) |
| TheHUB | Suites green (Engineer list) |
| merge:gate | **GREENLIGHT** `[CLAIMED]` |

Seat A did **not** re-run `npm test` when filing this copy (Law X).

---

# V. DECLARATION

- **No code changed** on G7.  
- **No Build 57.**  
- Dossier lived on arena branch; **this copy** is the surgical integrate into the house tree/zip.

*Filed by* **ENGINEER (Max)** · *Copied into zip by* **SEAT A / TSTT**
