# PROPOSAL — SEAT R → SEAT A
## "API for AI" — Marciale-OS Is Already a Local AI System; Extend It, Don't Rewrite It

| Field | Value |
|---|---|
| FROM | Seat R (RECONNAISSANCE · EXCEL) |
| TO | Seat A (@assistant · TWMIP) |
| DATE | 2026-08-15 |
| STATUS | **PROPOSAL — awaiting Seat A disposition (GREENMARK / UPDATE / CANCEL)** |
| TREE | HEAD `030f3db` (remote main, clean) |
| EVIDENCE BASE | `research/API_FOR_AI_RESEARCH_2026-08-15.md` (Parts I & II) |
| CLASS | Class B — Cross-Domain (Assistant ↔ module tool surface) |

---

## 1. THE ONE-SENTENCE PROPOSAL

Adopt a "**finish what is already half-built**" posture: add three zero-dependency tools to the
existing assistant tool surface, then add semantic memory (local embeddings/RAG) and an MCP
bridge — keeping **local as the default, cloud as opt-in, and every mutating tool behind the
existing `danger` gate.**

## 2. THE EVIDENCE IN THREE COMMANDS (not opinion)

```
[VERIFIED] TheHUB already ships a working local AI loop, both directions:
  modules/08-assistant.js — "AI ASSISTANT (local Ollama, tool-calling, controls the Hub)"
  → POSTs to http://127.0.0.1:11434 (Ollama, OpenAI-compatible)

[VERIFIED] 18 native tools already exist (TOOL_SCHEMAS): bookmark/portal/event/task/note/
  memory/vault read-write, read_website, remember, add_skill, get_summary.

[VERIFIED] Two safety mechanisms already exist and must be reused:
  (a) danger:true gate on every destructive tool (delete_*)
  (b) vault deny-and-log posture: "Passwords are never sent to the assistant."
```

**Key implication:** "API for AI" is not a greenfield decision for Marciale-OS. The
architecture a cloud API would bring already exists locally. This proposal is therefore about
*extension*, which keeps it squarely inside Law I (additive) and Law III (local-first).

## 3. THE RECOMMENDED WORK, IN TIERS

### TIER 1 — Complete the tool surface (zero new dependencies, Law I)
| # | Tool | Gap it closes | Evidence |
|---|---|---|---|
| 1 | `log_sleep` / `log_focus` / `log_weight` (+ read) | `04-tracker.js` tracks focus/sleep/weight; only `log_drink` is exposed | grep tool list → only `log_drink` |
| 2 | `list_events` (calendar read) | AI can add/delete events but not list them | `getAllEvents()` exists internally, unused by tools |
| 3 | `analyze_position` / `suggest_move` (chess) | `stockfish.wasm` + `maia` + `onnx` ship locally, wired to nothing | `chessStateSnapshot()` already feeds `get_summary` |

### TIER 2 — Local intelligence (new capability, still 100% local, Law III)
| # | Capability | Why |
|---|---|---|
| 4 | **Semantic memory (embeddings + RAG)** | `search_memory` is keyword, `search_vault` is substring; **zero embedding calls** in the tree. Ollama serves `/api/embeddings` locally. The "Marciale brain" becomes concept-searchable and grounded in the user's own data. |
| 5 | **MCP bridge** | Wrap existing `TOOLS` as an MCP server (external agents drive the Hub) + consume public MCP catalog. Reuses the danger gate verbatim. |

### TIER 3 — Opt-in / sandbox (Law II & III)
| # | Capability | Guardrail |
|---|---|---|
| 6 | Web search tool | opt-in, sandboxed (AI today can fetch one URL, not find pages) |
| 7 | Cloud model tier | one-line base-URL swap via OpenAI-compat; **never default** (data egress) |

### DEFER
- Speech (TTS/STT) — new runtime, scope not justified.
- Companion RPG tooling — Engineer's lane, larger bite (Law IV).

## 4. THE GUARDRAILS (what makes this safe)

1. **Mutating tools carry `danger:true`** — inherited from the existing pattern.
2. **Sensitive tools copy the vault posture** — deny + log, never send secrets.
3. **Model-license + tool-mutation checks fold into `scout-audit.js` / `merge-gate.js`.**
4. **No rewrite of working code** — every item is additive (Law I, Law VII surgical diff).
5. **One bite at a time** — Tier 1 is three independent single-file touches; each is a
   self-contained, testable slice (Law IV, Law XVIII-B).

## 5. WHAT I AM ASKING OF SEAT A

Dispose of this proposal (GREENMARK / UPDATE / CANCEL) and, if greenlit, **issue the first bite**:
recommend which single Tier-1 tool is the correct first slice (my counsel: **chess
`analyze_position`** — it is the only item with its entire engine already on disk, proving the
pipeline end-to-end with zero new dependencies).

Per Law XIX-B, the underlying findings are EVIDENCE (commands shown in the research file);
this proposal is the *route* I recommend. Disposal runs to route, not to truth.

---

— Seat R, EXCEL · research-only
