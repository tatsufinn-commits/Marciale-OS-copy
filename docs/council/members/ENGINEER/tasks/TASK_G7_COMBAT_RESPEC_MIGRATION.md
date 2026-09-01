# TASK G7 — Combat Respec Lock · Migration to `main`
**ID:** `TASK-JARWEN-2026-E-G7`  
**From:** Seat A / TSTT · Mosaic **Option A** · Commander approved  
**To:** `@engineer` / Max (Seat E)  
**Status:** **CLOSED** — Seat A 2026-08-13. Verification path. G7 on `origin/main` (`AttunementSystem.js`). Engineer commit `5fb06d0` on `arena/019ff477-marciale-os` (dossier; branch ahead). No Build 57.  
**Charter:** 4-layer `@engineer` → `@the_forge` → `@pangolin` → `@engineer`  
**Laws:** I, IV, V, X, XV, XVI (this is **one bite**)

---

## Why

Cadet-02 / Session 02 lab has **G7**: `respecAttunements()` must **reject** while combat is live or attack cooldown > 0, **without mutating** attunement/combat state. Companion tests include `G7: AttunementSystem rejects respec during active combat...`.

That lock may already be on the Commander’s latest `main` pour — or only in some trees. Your job is **Migration**: **repository truth on `origin/main`**, then surgical land + verify. Not a new feature. Not UI suite.

---

## Do this (in order)

1. `git pull --ff-only` on Marciale-OS. If blocked: Law XVIII, stop, file hotfix path — do not force-push.  
2. Inspect:
   - `Gamecompanion/files/src/systems/AttunementSystem.js` — `_isCombatRespecLocked()`, `respecAttunements()` returns `{ success: false, reason: 'COMBAT_ACTIVE', pointsRefunded: 0 }` when locked.  
   - `Gamecompanion/files/tests/AttunementSystem.test.js` — G7 test (fighting + cooldown + after-combat succeeds).  
3. **If already identical on `main` and tests green:** deliverable = verification dossier only. Do **not** rewrite the file for style (Law I).  
4. **If missing or incomplete:** surgical add **only** those guards + test. Blast radius: those two files (+ Vite rebuild into TheHUB companion **only if** the test/source change requires it).  
5. `npm test` at repo root. Report **discovered** Hub + Companion counts. Companion must include G7 and stay green.  
6. `npm run merge:gate` / pangolin per Law XV before push.  
7. Commit semantic: `fix(companion): [G7] lock attunement respec during combat`  
8. Push (Law XV). If Windows hook/WSL bash bites: do **not** re-enable bash hook; Node hook is `scripts/git-hooks/pre-push.js` + `.cmd`. Commander’s clone may have `hooksPath` **unset** — do not surprise-rehire bash.  
9. Commandment I: `MARCIALE_OS_COMPLETE.zip`. Dispatch on the council bus.  
10. Deliverable: `docs/council/members/ENGINEER/deliverables/TASK_G7_MIGRATION.md`

---

## Stop

- **No Build 57.** No window-mode. No new agents. No Scorecard. No CODEOWNERS.  
- No ≥80% rewrite of `AttunementSystem.js`.  
- No “while I’m here” attunement economy tweaks.  
- UI toast for COMBAT_ACTIVE is **out of scope** unless it is a 5-line existing modal hook — prefer skip.

---

## Acceptance

- [ ] `origin/main` has G7 guard + test **or** a written `[VERIFIED]` “already present, SHA …”  
- [ ] `npm test` green this watch (counts reported, not hardcoded 43/34)  
- [ ] Combat respec reject does not change `player.attunements`  
- [ ] After combat, respec still works  
- [ ] Zip presented · dispatch filed · **57 not started**

---

**Issued:** Seat A Mosaic A. Max: scalpel, not piano.
