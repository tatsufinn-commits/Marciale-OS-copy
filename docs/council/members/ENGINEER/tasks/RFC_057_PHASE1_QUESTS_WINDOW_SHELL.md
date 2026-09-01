# RFC-057 PHASE 1 — Quests Window Shell (NOT the suite)
**ID:** `RFC-JARWEN-2026-057-P1`  
**Build:** 57 / Aetherweave 29 — **one slice only**  
**From:** Seat A / TSTT · Mosaic **A** · Commander 2026-08-13 17:11  
**To:** `@engineer` / Max  
**Status:** **PLAN FILED — DO NOT FORGE until Commander says `GREENMARK RFC-057-P1`**  
**After implement:** Commander **VSS** (below) + `npm test` / Scenario 20.  

Parent roadmap: `research/proposals/MASTER_ROADMAP_V10_AETHERWEAVE.md` Build 57 (suite).  
This RFC **narrows** that goal. The suite (Inventory, Roster, Codex, Achievements, Factions, all window modes everywhere) is **out of scope**.

---

## 1. One screen

**Quests journal** — already has `#quests` / `QuestSystem`.  
**Add:** a tiny **window-mode shell** so that *this one modal* can be:

| Mode | Meaning |
|---|---|
| `modal` | Current floating overlay (default — must not regress) |
| `full` | Same content, full companion canvas / panel |

**Not this phase:** mini-widget embed, Inventory, Achievements, drag-chrome, React, new npm deps.

---

## 2. Files (blast radius)

| Touch | Why |
|---|---|
| `Gamecompanion/files/src/ui/ScreenManager.js` | **Create** if missing. `open('quests', mode)`, `setMode()`, `close()`. Vanilla ES module. |
| `Gamecompanion/files/src/main.js` | Wire `#quests` through ScreenManager. Default `modal`. |
| `Gamecompanion/files/index.html` | One control: toggle modal ↔ full on the open quests UI. `DESIGN.md` tokens only. |
| `Gamecompanion/files/tests/ScreenManager.test.js` | **Create.** Cases below. |

**Do not touch** unless a 3-line import forces it: combat, attunement, G7, TheHUB `style.css` (prefer companion-local CSS).

80% rewrite of `main.js` = **forbidden**.

---

## 3. Tests (acceptance)

1. `open('quests','modal')` → quests panel visible, not `full` class.  
2. `setMode('full')` while open → `full` without losing quest list state.  
3. `close()` → panel gone; reopen still `modal` default.  
4. Unknown screen id → `{ ok: false }` no throw.  
5. Existing QuestSystem tests still pass.  
6. Root `npm test` — report **discovered** counts. Companion stays green (66+).

---

## 4. Stop

No other Build 57 screens. No window manager framework. No G7 edits. No Scorecard. Law I / IV / V / X / XV / XVI.

---

## 5. Pipeline

`@engineer` spec-lock this RFC → `@the_forge` implement → `@pangolin` tests → `@engineer` merge:gate + zip + dispatch.  
Commit: `feat(companion): [Build 57 P1] quests window shell modal|full`

---

## 6. Commander VSS (after GREENMARK + code lands)

**VSS** = Commander’s **Visual / Scenario Stress** on Max’s slice (not Visual SourceSafe; not the arena 62-commit merge).

1. `npm test` + `npm run pangolin` (or Scenario 20 prompt).  
2. Click: open Quests → toggle full → toggle modal → close → reopen.  
3. Start a fight, confirm G7 still blocks respec (regression).  
4. If fail: `@pangolin` surgical, not “rewrite ScreenManager.”

Seat A does not run VSS in this sandbox (no your mouse). You run it in TheHUB / companion.

---

## 7. Beginner

We are not building every game menu. We are adding two window sizes to the **Quests** list you already have. Max waits until you say the plan is good. Then you click around to try to break it.

**Commander:** reply `GREENMARK RFC-057-P1` to release Forge. Until then Max only reads this file.
