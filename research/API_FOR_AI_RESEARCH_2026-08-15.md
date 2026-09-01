# API FOR AI — RESEARCH DOSSIER
**Seat R · EXCEL · 2026-08-15 · HEAD 030f3db (remote main, clean)**
**Tasking:** Supreme Commander order — research "API for AI", teach it, and assess impact on Marciale-OS.

---

## 0. HEAD DECLARATION

```
$ git rev-parse --short HEAD
030f3db
$ git status --short
(clean)
```

---

## 1. THE TERM IS AMBIGUOUS — THREE MEANINGS

"API for AI" collapses three different things. All three matter, and Marciale-OS touches all three.

1. **AI APIs (inbound)** — the HTTP interfaces *providers* expose so *your code* can call a model.
   OpenAI, Anthropic, Google Gemini, Mistral, DeepSeek, and — critically for this house — **Ollama's local endpoint**.
2. **Function calling / tool use (outbound)** — the interface by which *a model calls your code*.
   The model emits a structured "call this function with these args" instead of free text.
3. **MCP (Model Context Protocol)** — the open *standardization layer* over #2, so a tool
   is written once and any model can use it ("USB-C for AI").

---

## 2. AI APIS — CALLING A MODEL OVER HTTP

An AI API is just a web API. You POST a `messages` array to an HTTPS endpoint and receive a
completion back, often streamed as Server-Sent Events (SSE). What the model provider sells is
access to a pre-trained model plus the GPU compute to run it.

The dominant shape today is the **OpenAI chat-completions format**, which the whole industry
has converged on: `POST /v1/chat/completions` with `{model, messages, temperature, ...}`.

**Provider landscape (2026):**

| Provider | Strengths | Notes |
|---|---|---|
| OpenAI | Broadest ecosystem; chat + embeddings + vision | Flagship GPT-5.x family |
| Anthropic | Instruction-following, coding, agentic tool-use | Claude; 200K context |
| Google Gemini | Best multimodal, 2M-token context | Tight GCP integration |
| Mistral / Meta / DeepSeek | Open-weight, self-hostable, cheapest | EU residency / cost |

Pricing is per-token (input + output), from ~$0.05/M (budget tiers) to $21–168/M (flagship Pro).
There is a clear trend: **multi-provider routing** (one app, many backends) and **OpenAI-compatible
drop-in endpoints** so switching backends is a one-line config change.

**Sources:** [LLM API Comparison 2026](https://myengineeringpath.dev/tools/llm-api-comparison/),
[OpenAI API guide](https://www.metacto.com/blogs/what-is-the-openai-api-a-comprehensive-guide-for-app-developers),
[LLM API pricing](https://intuitionlabs.ai/articles/llm-api-pricing-comparison-2025).

---

## 3. LOCAL-FIRST AI APIS — OLLAMA AND FRIENDS (MOST RELEVANT TO THIS HOUSE)

A cloud API sends your text to someone else's server. A **local inference server** runs the model
on your own machine and exposes *the same OpenAI-compatible API on localhost*:

- **Ollama** — MIT-licensed runtime; `ollama pull llama3.1` then a server on `127.0.0.1:11434`
  with native `/api/chat`, `/api/generate`, and an **OpenAI-compatible `/v1/chat/completions`**.
- **LM Studio / LocalAI / llama.cpp server** — same idea; LocalAI is the drop-in OpenAI replacement
  with image/audio/TTS/embeddings coverage.

Because Ollama speaks the OpenAI format, any code written against the cloud API runs locally by
changing only the base URL — no rewrite. This is the architectural bridge that lets a local-first
system be **cloud-optional**: same code path, swappable backend.

**Sources:** [Ollama REST API](https://tech-insider.org/ollama-tutorial-run-llm-locally-2026/),
[Local LLMs 2026](https://daily.dev/blog/running-llms-locally-ollama-llama-cpp-self-hosted-ai-developers/),
[Ollama vs LocalAI](https://contabo.com/blog/ollama-vs-localai-best-self-hosted-openai-compatible-llm-server/).

---

## 4. FUNCTION CALLING / TOOL USE — THE MODEL CALLS YOUR CODE

Instead of answering in prose, the model can emit a **structured call**: "invoke `set_reminder`
with `{title, time}`." Your app runs the real function and returns the result, and the model
continues. This is the mechanism behind every "agent" that *does* things.

- It is **vendor-specific** at the raw level: OpenAI `tools`, Anthropic `tool_use`, Gemini `functions`.
- Under the hood it is still JSON-over-HTTP; the model is deciding *which* JSON to emit, guided by
  tool schemas you provide.

---

## 5. MCP — THE STANDARDIZATION LAYER ("USB-C FOR AI")

Introduced by Anthropic in late 2024, MCP solves the **N×M integration explosion**: without it,
N apps × M tools = N×M bespoke connectors. With MCP you write **one MCP server per tool**, and
every MCP client (Claude, Cursor, any agent host) can discover and call it.

Three primitives a server exposes:
1. **Tools** — actions (search, create, send).
2. **Resources** — readable context (files, DB rows).
3. **Prompts** — reusable templates.

Key distinctions:
- MCP does **not replace** function calling — it *standardizes* how tools are discovered/described.
- MCP is **not** a workflow builder (that's Zapier/Make) — it's lower-level plumbing.
- MCP reduces vendor lock-in and grounds models in live data (reducing hallucination).

**Sources:** [What is MCP](https://theaiengineer.substack.com/p/what-is-mcp),
[MCP complete guide](https://www.hauerpower.com/en/insights-posts/what-is-mcp-model-context-protocol),
[MCP how it works](https://www.descope.com/learn/post/mcp),
[Databricks MCP](https://www.databricks.com/blog/what-is-model-context-protocol).

---

## 6. THE FINDING — MARCIALE-OS ALREADY IMPLEMENTS THIS

The tasking framed "when implemented" as future tense. **It is not.** TheHUB already ships a
working "API for AI" integration, in both directions:

**[VERIFIED] Outbound (TheHUB → local model API):**
`TheHUB 1.5.5.2.3 a v/modules/08-assistant.js` line 12: *"AI ASSISTANT (local Ollama, tool-calling, controls the Hub)"*. It targets `http://127.0.0.1:11434` (Ollama), with configurable model set
(`qwen2.5:7b`, `llama3.1:8b`, `llama3.2:3b`, `deepseek-r1:7b`), streaming, and a resource governor
(presets, keep-alive, num_ctx, model-size tiers).

**[VERIFIED] Inbound (model → TheHUB, tool-calling):**
`08-assistant.js` defines native tools passed to Ollama (`tools: nativeTools`), e.g.
`add_portal_tool`, `delete_portal_tool`, `add_drink_menu`, `delete_drink_menu` — the model can
*control the Hub* (add portals, edit the intake menu) through structured calls.

**[VERIFIED] Backing proxy (Python):**
`server.py` exposes `/api/fetch` (web fetch tool), `/api/hub-data`, `/api/bookmarks`, `/api/mapua`
— the server-side endpoints the model's tools hit.

**Conclusion:** Marciale-OS is already **local-first, cloud-optional AI**. The architecture that a
cloud API would bring is already present in its local form via Ollama's OpenAI-compatible endpoint.
"API for AI" for Marciale-OS is not a greenfield decision — it is an *extension decision*.

---

## 7. HOW IT AFFECTS MARCIALE-OS — OPPORTUNITIES, RISKS, RECOMMENDATION

### What is already true (no new work needed)
- Local models via OpenAI-compatible endpoint: swap `127.0.0.1:11434` for any cloud base URL and
  the existing code path works unchanged (Ollama's compatibility guarantee).
- Tool-calling already lets the AI manipulate the Hub.

### Opportunities (extension, not rewrite)
1. **Optional cloud fallback / tiering.** Because the code is URL-configurable, a "cloud mode"
   (a field for an OpenAI/Anthropic/Gemini base URL + key) is a *configuration addition*, not a
   rewrite. Heavy reasoning → cloud; private/daily → local. This matches the multi-provider trend.
2. **MCP exposure.** Exposing TheHUB's existing tools (`add_portal_tool`, etc.) as an MCP server
   would let *external* agents (Cursor, Claude Desktop) drive the Hub — and let the Hub consume
   the growing public MCP catalog (GitHub, Notion, Slack servers). One spec, many integrations.
3. **An "API for AI" as a product surface.** Marciale-OS could expose its own local OpenAI-compatible
   endpoint (LocalAI-style) so other tools (VS Code, editors) treat TheHUB as a drop-in model server.

### Risks (why Law I / II / III still bind)
- **Cloud = data egress.** The whole point of Marciale-OS is local-first. Adding a cloud path must
  be opt-in and never default (Law III: zero-hardware/local simulation philosophy).
- **Security.** Ollama binds localhost-only by default and has **no auth** — exposing `OLLAMA_HOST=0.0.0.0`
  opens it to the whole network. Any proxy (`server.py`) must keep the iframe-origin hardening and
  never forward secrets.
- **Tool-calling blast radius.** A model with tools that mutate state (delete portal, edit menu) is a
  destructive surface. Needs confirm-gates and allowlists — the exact governance this house already
  builds (`merge-gate.js`, plate-validator).
- **Copyleft.** Model weights carry licenses (Llama Community License vs Apache-2.0 vs GPL-family);
  `tools/scout-audit.js` already scans dependency copyleft — model licensing belongs in the same gate.

### Recommendation (one line)
Marciale-OS should treat "API for AI" as **already-implemented, extend-don't-rewrite**: add an
opt-in cloud-tier config + an MCP bridge to the existing tool surface, keep local as the default,
and put model-license + tool-mutation checks into the existing scout/merge gates.

---

---

## PART II — CAN MORE USEFUL APIs BE ADDED? (Commander follow-up)

**Answer: YES.** Verdict grounded in command output, not opinion. The tree already ships a
working tool-calling surface; it is simply **incomplete**. Below, ranked in three tiers.

### EMPIRICAL BASELINE — WHAT THE AI CAN ALREADY DO (18 tools, verified)

`08-assistant.js` `window.TOOL_SCHEMAS`: add/delete bookmark, add/delete portal, add/delete
event, log_drink, add/delete drink_menu, show_tab, add_task, update_task_status, write_note,
search_memory, read_website, search_vault, remember, add_skill, get_summary.

Two verified mechanisms already exist that new tools must reuse:
- **[VERIFIED] danger-flag confirm gate** — every destructive tool is marked `danger:true`
  (delete_bookmark, delete_portal, delete_event, delete_drink_menu). New mutating tools inherit it.
- **[VERIFIED] vault security posture** — `search_vault` returns metadata only, is gated on
  `VAULT_UNLOCKED` + `VAULT_AI_ACCESS`, and literally strings "Passwords are never sent to the
  assistant." This is the template for any sensitive tool.

### TIER 1 — ADD NOW: complete the tool surface (zero new dependencies)

**1. Tracker read/log tools (sleep, focus, weight, etc.)**
- Gap: `04-tracker.js` tracks focus/sleep/weight, but the ONLY tracker tool is `log_drink`.
  The AI cannot log or query your sleep, focus, or weight.
- Why: the tracker is a core module; the assistant is blind to it except caffeine. Same data
  store, same render path — pure additive tool wiring.
- Law: Law I (additive), Law III (local already).

**2. Calendar query/read tool (`list_events`)**
- Gap: the AI can `add_event`/`delete_event` but cannot LIST events or answer "am I free Thursday?"
- Why: a calendar the assistant can write but not read is half-blind. `getAllEvents()` already
  exists internally; the tool is a thin read wrapper. Unlocks genuine planning.
- Law: Law I. Danger: `danger:false` (read-only).

**3. Chess analyze/suggest tool**
- Gap: `stockfish.wasm`, `maia`, and `onnx` engines already ship locally; `chessStateSnapshot()`
  already feeds `get_summary` — but there is NO tool for the AI to make or analyze a move.
- Why: highest-leverage item — a fully local (Law III-compliant) chess engine is already on disk,
  wired to nothing. Exposing `analyze_position`/`suggest_move` turns the assistant into a chess
  coach with **zero new dependencies**. The AI can already `show_tab chess`; it just can't play.
- Law: Law III (local, zero-hardware). Danger: read-only.

### TIER 2 — ADD NEXT: local intelligence (new, but 100% local)

**4. Semantic memory — embeddings + RAG over the user's own data**
- Gap: `search_memory` is keyword (`retrieveMemory`), `search_vault` is substring
  (`memTokens` + `.includes`). **No embeddings call anywhere** (`grep /api/embed` → 0 hits).
- Why: the single most transformative upgrade. Ollama already serves embeddings locally
  (`/api/embeddings`), so the "Marciale brain" (notes, bookmarks, brain memories, vault metadata)
  can become *semantic* — the assistant finds concepts, not just exact words, and grounds answers
  in the user's own accumulated data. Private by construction.
- Law: Law III (local), Law I (additive layer, doesn't rewrite retrieval). Effort: medium
  (small local vector index + an embed tool).

**5. MCP bridge (expose + consume)**
- Gap: TheHUB's tools are callable only by its own internal model.
- Why: wrapping the existing `TOOLS` as an MCP server lets external agents (Cursor, Claude
  Desktop) drive the Hub, and lets the Hub consume the public MCP catalog (GitHub, Notion,
  Slack). One spec, many integrations. Reuses the danger-gate verbatim.
- Law: Law II (sandboxed external integration, not core rewrite).

### TIER 3 — OPT-IN / SANDBOX ONLY (Law II, Law III discipline)

**6. Web search tool** — today the AI has `read_website` (fetch ONE url) but cannot *find* pages.
  A search backend (local SearXNG or an opt-in search API) closes the loop. But it is cloud-
  adjacent and must be opt-in + sandboxed per Law II.

**7. Cloud model tier** — `cloud-snippet.js` is a literal placeholder ("Placeholder for future
  cloud sync… intentionally not loaded"). The OpenAI-compatible endpoint means a cloud model is
  a one-line base-URL swap. Must stay opt-in, never default (data egress).

### DEFER (recommended against now)

- **Speech (TTS/STT)** — Ollama doesn't do audio natively; needs a new runtime (whisper/LocalAI).
  Scope not yet justified.
- **Companion RPG tooling** — Gamecompanion + Momentum Companion (`14-companion.js`) exist but
  cross-app tooling is Engineer's lane and a larger bite (Law IV, one bite).

### THE DISCIPLINE (unchanged from Part I)

Every addition obeys the existing gates: mutating tools carry `danger:true`; sensitive tools copy
the vault's deny-and-log pattern; model-license + tool-mutation checks fold into `scout-audit.js`
/ `merge-gate.js`. **Local stays the default; cloud is opt-in; nothing rewrites working code.**

---

— Seat R, EXCEL · research-only · two bites discharged (Parts I & II)
