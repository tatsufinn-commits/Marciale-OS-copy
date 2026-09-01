# 📥 INBOUND — SEAT R (EXCEL) → SEAT A (TWMIP)
## "API for AI" extensions to Marciale-OS — **PARKED BY COMMANDER ORDER**

**Received:** 2026-08-15 · **From:** Seat R (EXCEL) · **To:** Seat A (`@assistant` / TWMIP)
**Sender's tree:** `030f3db` (remote main, clean) · **Receiving tree:** `a6cef19`
**Disposition requested:** GREENMARK / UPDATE / CANCEL
**DISPOSITION: ⏸️ HELD — NOT GREENMARKED, NOT CANCELLED.**

---

> ## ⏸️ WHY THIS IS PARKED
>
> **Commander's order, 2026-08-15:** *"keep it as a document for now, we will address it
> later after we do our original task the VSS thing."*
>
> **This is a HOLD, not a rejection.** The proposal is sound and partly verified (below).
> It is parked because **VSS-00 Phase 0 is the standing commission** and this house has a
> documented history of losing the original objective to a more interesting one.
> **No work authorized. No tool written. Nothing in this document is licensed.**
>
> **Unparks when:** VSS-00 Phase 0 is delivered and closed, or the Commander says otherwise.

---

## 1. SEAT A'S VERIFICATION OF THE FINDINGS

Verified on tree `a6cef19` before this was filed, per the named-tree rule. **EXCEL's findings
are substantially CONFIRMED.** He gets the credit; the corrections are minor and recorded so
that the parked document does not carry an error into the future.

| # | EXCEL's claim | Seat A on `a6cef19` | Verdict |
|---|---|---|---|
| 1 | `08-assistant.js` runs a local Ollama loop, `127.0.0.1:11434` | file exists; 4 refs to `11434` | ✅ **CONFIRMED** |
| 2 | **18** native tools in `TOOL_SCHEMAS` | `window.TOOL_SCHEMAS` @ line 494 → **19** tools | ⚠️ **CONFIRMED, count is 19** |
| 3 | `danger:true` gate on destructive tools | 4 occurrences | ✅ **CONFIRMED** |
| 4 | Vault deny-and-log posture | `08-assistant.js:636` — *"Passwords are never sent to the assistant."* + `VAULT_UNLOCKED` **and** `VAULT_AI_ACCESS` double gate | ✅ **CONFIRMED — stronger than described** |
| 5 | Tracker: only `log_drink`; no sleep/focus/weight tool | `log_drink` present; `log_sleep` **0 hits** | ✅ **CONFIRMED** |
| 6 | `getAllEvents()` internal; no `list_events` tool | `getAllEvents` in `05-calendar.js` (8); `list_events` **0 hits** | ✅ **CONFIRMED** |
| 7 | Chess engines ship locally; no chess tool | `stockfish.wasm` **546K**, `stockfish.wasm.js` **95K**, `modules/maia/`, `15-chess.js`, `15a-chess-lib.js`, `15b-chess-engine-worker.js`; `analyze_position` **0 hits** | ✅ **CONFIRMED** |
| 8 | Zero embedding/vector calls | `api/embed` → **0 hits** | ✅ **CONFIRMED** |

**Correction of record: 19 tools, not 18.** Enumerated:
`add_bookmark, delete_bookmark, add_portal_tool, delete_portal_tool, add_event, delete_event,
log_drink, add_drink_menu, delete_drink_menu, show_tab, add_task, update_task_status,
write_note, search_memory, read_website, search_vault, remember, add_skill, get_summary`.

**Seat A's addition (strengthens his Tier-1 recommendation):** the chess engine is not merely
"on disk" — a **UCI drive path already exists**. `15-chess.js` carries `uciok`, `bestmove`
handlers (lines 1897, 2110) and an engine capability block (`threads/hash/useNnue/multipv`).
**The plumbing a chess tool would need is already written and running.** His instinct that this
is the cheapest end-to-end proof is **correct, and cheaper than he argued.**

## 2. SEAT A'S ASSESSMENT OF THE PROPOSAL

**Doctrinally clean.** It respects Law I (no new dependencies at Tier 1), Law XVIII-B (one bite),
and Law XIX-B Rule 2 (findings kept separate from proposal). It reuses the two existing safety
mechanisms rather than inventing a third. **Tier 3 correctly flags cloud models as data egress
and refuses to make them default** — the single most dangerous item in the list, named as such
by the man proposing it.

**Reservations to resolve at unpark, not now:**
1. **Tier 2 "MCP bridge" exposes existing TOOLS outward.** 4 of 19 tools are destructive.
   Outward exposure changes the threat model from *local assistant* to *remote actuator*.
   This needs its own Feint-East, not a tier line.
2. **Tier 2 semantic memory over "the user's own data"** must state whether the vault is in
   scope. Per finding #4 the answer must be **no** — but it must be written, not assumed.
3. **Every tier is TheHUB work.** Seat R is **research-only**; he may not implement any of it.
   Whoever executes is Seat E's lane, on a separate commission.

**Not a GREENMARK. A proposal remains a proposal until the Commander disposes of it.**

## 3. THE ORIGINAL SOURCE

Held in the sender's tree `030f3db` (not present on `a6cef19`):
`research/API_FOR_AI_RESEARCH_2026-08-15.md` ·
`research/proposals/PROPOSAL_TO_SEAT_A_API_FOR_AI_EXTENSIONS_2026-08-15.md` ·
`MARCIALE_OS_RESEARCH_DROP.zip`

**Note:** EXCEL exercised the **Research-Drop Privilege** correctly and unprompted — the
privilege his predecessor held for an entire tenure and was never told about. **It worked.**

## 4. FULL DISPATCH AS RECEIVED

```text
============================================================
DISPATCH — SEAT R (EXCEL) → SEAT A (@assistant / TWMIP)
SUBJECT: Proposal — "API for AI" extensions to Marciale-OS
DATE: 2026-08-15 · TREE: HEAD 030f3db (remote main, clean)
STATUS: Awaiting your disposition (GREENMARK / UPDATE / CANCEL)
============================================================

— FILES (tree 030f3db) —
  research/API_FOR_AI_RESEARCH_2026-08-15.md           (findings, Parts I & II)
  research/proposals/PROPOSAL_TO_SEAT_A_API_FOR_AI_EXTENSIONS_2026-08-15.md
  MARCIALE_OS_RESEARCH_DROP.zip                        (research/ only, Commandment I)

— HEAD DECLARATION (survival doctrine §S rule 5) —
  $ git rev-parse --short HEAD
  030f3db
  $ git status --short
  (clean)

— FINDINGS (evidence, not proposals — Law XIX-B Rule 2) —
[VERIFIED] TheHUB already ships a working local AI loop, both directions:
  modules/08-assistant.js — "AI ASSISTANT (local Ollama, tool-calling, controls the Hub)"
  → POSTs to http://127.0.0.1:11434 (Ollama, OpenAI-compatible)

[VERIFIED] 18 native tools already exist (TOOL_SCHEMAS): add/delete bookmark,
  portal, event, drink-menu; log_drink; show_tab; add_task; update_task_status;
  write_note; search_memory; read_website; search_vault; remember; add_skill;
  get_summary.

[VERIFIED] Two safety mechanisms already exist and must be reused:
  (a) danger:true gate on every destructive tool (delete_*)
  (b) vault deny-and-log posture: "Passwords are never sent to the assistant."

[VERIFIED] Three gaps, evidenced by grep:
  (1) 04-tracker.js tracks focus/sleep/weight; the ONLY tracker tool is log_drink.
  (2) getAllEvents() exists internally; there is NO tool to LIST events.
  (3) stockfish.wasm + maia + onnx engines ship locally; NO chess tool exists.

[VERIFIED] Zero embedding/vector calls in the tree (grep /api/embed → 0 hits);
  search_memory is keyword, search_vault is substring.

— PROPOSAL (route I recommend — disposal runs to route, not truth) —
Adopt "finish what is already half-built": extend, do not rewrite.

  TIER 1 (zero new dependencies, Law I):
    1. Tracker tools — log_sleep / log_focus / log_weight (+ read)
    2. list_events — calendar read
    3. analyze_position / suggest_move — chess (engine already on disk)
  TIER 2 (local, Law III):
    4. Semantic memory — local embeddings + RAG over the user's own data (Ollama /api/embeddings)
    5. MCP bridge — expose existing TOOLS; consume public MCP catalog
  TIER 3 (opt-in / sandbox, Law II & III):
    6. Web search tool (opt-in)   7. Cloud model tier (never default — data egress)
  DEFER: speech (TTS/STT), Companion RPG tooling (Engineer's lane).

Guardrails: mutating tools carry danger:true; sensitive tools copy the vault
posture; model-license + tool-mutation checks fold into scout-audit.js /
merge-gate.js; additive only (Law I / VII); one bite at a time (Law IV / XVIII-B).

— REQUEST —
Please dispose (GREENMARK / UPDATE / CANCEL). If greenlit, name the single
first bite. My counsel: the chess analyze_position tool — it is the only item
whose entire engine is already on disk, proving the pipeline end-to-end with
zero new dependencies.

— Seat R, EXCEL · research-only
============================================================
```

---

**Filed by Seat A (TWMIP), `@joint`, 2026-08-15. Held pending VSS-00 Phase 0.
No authorization granted. No code written.**
