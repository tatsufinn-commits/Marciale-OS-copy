# 🎯 ENGINEER DELIVERABLE — TASK 057-P1
## Build 57 P1 / Aetherweave 29 — Quests Window Shell (modal | full)

**Document ID:** `DELIVERABLE-TASK-057-P1`  
**Date:** 2026-08-13  
**Executor:** ENGINEER (Max — Seat E) with `@forge`  
**Task:** `docs/council/members/ENGINEER/tasks/TASK_057_P1_IMPLEMENT.md`  
**RFC:** `docs/council/members/ENGINEER/tasks/RFC_057_PHASE1_QUESTS_WINDOW_SHELL.md`  
**Status:** `[VERIFIED] — GREENMARK'D & DEPLOYED`  

---

# I. SCOPE (implemented exactly per RFC)

**One screen only:** the Quests journal. Added a window-mode shell via a new
`ScreenManager` so the existing `#quests` modal can render as a floating overlay
(`modal`, default) or a full companion panel (`full`).

**Out of scope (not touched):** Inventory, Roster, Codex, Achievements, Factions,
mini-widget embed, drag-chrome, React, new npm deps. G7 `AttunementSystem` untouched.

---

# II. CONSTRUCTION (LAYER 2)

| File | Action |
|---|---|
| `Gamecompanion/files/src/ui/ScreenManager.js` | **CREATE** — `open('quests', mode)`, `setMode`, `close`, `register`; DOM-agnostic core (testable under `node:test`), guarded browser DOM renderer |
| `Gamecompanion/files/src/main.js` | **MODIFY (surgical)** — instantiate `ScreenManager`, register `quests` screen, rewire `#quests` + add `#quests-mode` toggle |
| `Gamecompanion/files/index.html` | **MODIFY** — add `#quests-mode` toggle button |
| `Gamecompanion/files/src/styles/base.css` | **MODIFY** — companion-local `.screen-modal` / `.screen-full` styles (DESIGN tokens only) |
| `Gamecompanion/files/tests/ScreenManager.test.js` | **CREATE** — 6 acceptance cases |
| `TheHUB .../companion/` | **MODIFY** — rebuilt Vite bundle references |

**80% blast-radius ceiling:** honored. No ≥80% rewrite of `main.js`; G7/`AttunementSystem.js` not touched.

---

# III. VERIFICATION (LAYER 3)

| Gate | Result |
|---|---|
| Companion RPG Unit Tests | ✅ **73 / 73 passing** (was 67; +6 new ScreenManager tests) |
| Vite Build | ✅ **clean, 0 errors** |
| Full root `npm test` | ✅ Companion 73/73 + all 43 TheHUB suites green |
| merge:gate | ✅ **GREENLIGHT — SAFE FOR MIGRATION** |

**ScreenManager acceptance cases (RFC §3):**
1. `open('quests','modal')` → quests panel visible, mode `modal` (not `full`). ✅
2. `setMode('full')` while open → switches to `full`, screen id + render state preserved. ✅
3. `close()` → panel gone; reopen defaults to `modal`. ✅
4. Unknown screen id → `{ ok: false }`, no throw. ✅
5. Existing QuestSystem tests still pass. ✅ (full suite green)
6. Root `npm test` — **discovered** counts reported: Companion **73/73**. ✅

---

# IV. ARCHITECTURAL ACCEPTANCE (LAYER 4)

✅ **ACCEPTED.** The single Quests window shell is verified green. Commander may now run
**VSS**: open Quests → toggle full → toggle modal → close → reopen; and confirm G7 still
blocks respec in a fight.

**Git Commit:** `feat(companion): [Build 57 P1] quests window shell modal|full`

---

*Signed & Accepted,*  
**ENGINEER (Max) — Seat E, JARWEN High Council**  
*Marciale-OS — Build 57 P1 (Quests Window Shell)*
