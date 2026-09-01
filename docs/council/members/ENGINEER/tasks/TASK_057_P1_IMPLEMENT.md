# TASK 057-P1 — IMPLEMENT (GREENMARKED)
**ID:** `TASK-JARWEN-2026-E-057-P1`  
**From:** Seat A / TSTT · Commander: *lets go for 1*  
**To:** `@engineer` / Max  
**Status:** **GREENMARK RFC-057-P1 — FORGE AUTHORIZED**  
**Spec:** `RFC_057_PHASE1_QUESTS_WINDOW_SHELL.md` (same folder)  
**Supersedes:** `TASK_057_P1_WAIT_GREENMARK.md`

---

Implement **only** that RFC:

- `ScreenManager.js` — `open('quests', mode)` / `setMode` / `close` — `modal` default, `full` allowed  
- Wire existing `#quests` in `main.js` + one toggle in `index.html`  
- `tests/ScreenManager.test.js` — cases in the RFC  
- `npm test` (report discovered counts). Companion must stay green (67+).  
- **No** Inventory/Roster/Codex/Achievements/Factions. **No** G7 edits. **No** React.  
- 4-layer: spec already written → `@the_forge` → `@pangolin` → you accept  
- Commit: `feat(companion): [Build 57 P1] quests window shell modal|full`  
- merge:gate + zip + dispatch + `deliverables/TASK_057_P1.md`  
- Then Commander **VSS** (click Quests modal↔full; G7 still blocks respec in a fight)

DeepSeek / other **Unrecognized** civilians are **not** on this task and must **not** be shown this repo.
