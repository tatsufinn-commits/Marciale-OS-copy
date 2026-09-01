# COLONY AUDIT — `xai-org/grok-build` (Grok Build / `grok` CLI)
**ID:** `COLONY-20260815-01`
**From:** `@colony` (under Seat R · EXCEL)
**To:** `@assistant` (proposal only)
**Commander sources:** `https://github.com/xai-org/grok-build.git` (given verbatim, none omitted)
**Date fetched:** 2026-08-15
**Upgrade target:** Marciale-OS (patterns only) · TAMAKEE (secondary, memory/vault pattern)

---

## 0. INTAKE LEDGER (no rows dropped)

| # | Source (verbatim) | Platform | Fetch | Tag | One-line observed |
|---|---|---|---|---|---|
| 1 | https://github.com/xai-org/grok-build.git | GitHub | OK | `[OBSERVED]` | Rust terminal AI coding agent; 87 crates; Apache-2.0; synced from SpaceXAI monorepo |

---

## 1. WASHED REFERENCES + WANTED EXTRACT (G0 + G1)

### 1.1 `grok-build` — SpaceXAI/xAI terminal coding agent

**G1 — GitHub block:**

- **Identity (2 lines):** Grok Build is SpaceXAI's terminal AI coding agent — a full-screen TUI that "understands your codebase, edits files, executes shell commands, searches the web, and manages long-running tasks" — runnable interactively, headlessly (CI), or embedded via the Agent Client Protocol (ACP).
- **License:** Apache-2.0, `Copyright 2023-2026 SpaceXAI` (`LICENSE`). **Permissive — no copyleft.** BUT: `THIRD-PARTY-NOTICES` declares **in-tree source ports** of `openai/codex` and `sst/opencode` (Apache §4(b) change notices), plus a vendored Mermaid stack (`third_party/`). Copying any code requires attribution diligence.
- **Shape:** Rust workspace, **87 crates** under `crates/codegen/`, `crates/common/`, `crates/build/`. Root `Cargo.toml` is **generated** (README marks it read-only).
- **Repo hygiene:** HEAD `eb267fe`, branch `main`, every commit "Synced from monorepo"; `SOURCE_REV` records monorepo SHA `e6a67a5408288c98380cd13f3b1fe1fbc01c9f1f`. **External contributions NOT accepted** (`CONTRIBUTING.md`) — this is a read-only reference, not a collaborator.

**G0 — Wanted extract:**

| Wanted | Value |
|---|---|
| **Claim** | "Terminal-based AI coding agent … interactively, headlessly for scripting/CI, or embedded in editors via ACP." |
| **Proof** | README.md + crate inventory: `xai-grok-shell` (agent runtime + leader/stdio/headless), `xai-grok-tools`, `xai-grok-workspace`, `xai-grok-sandbox`, `xai-grok-mcp`, `xai-acp-lib`. |
| **Upgrade verb** | **Add (pattern only, zero payload)** — body **Marciale-OS** |
| **Folder pin (hypothesis)** | `TheHUB …/modules/08-assistant.js` (tool output caps), `research/` (semantic-memory reference), `tools/` (circuit-breaker, checkpoint). **No production file touched without Seat A/Commander disposition.** |
| **Pattern not payload** | Five concrete patterns (below) — all implementable in Vanilla JS with zero new deps. |
| **Cost** | **Zero deps** for the extractable patterns. The sandbox (nono/Landlock) and memory backend (sqlite_vec) are Rust/kernel-specific — **pattern only**, not adopted. |
| **Keep score** | **KEEP** as upgrade candidate (patterns) · **REJECT-as-core** for any payload merge |

**THE FIVE EXTRACTABLE PATTERNS (each cited to source):**

1. **Context hygiene — hard tool-output caps.** `crates/codegen/xai-grok-tools/src/lib.rs` — `DEFAULT_TOOL_OUTPUT_BYTES = 40_000` (≈10k tokens), `DEFAULT_TOOL_OUTPUT_CHARS = 20_000` (bash), MCP inline caps. *A runaway tool cannot flood the model context.* **Directly cures the exact death-class this house suffered (NTG: 88% repeated token).** TheHUB's `08-assistant.js` has no such cap on tool results.

2. **Compaction transcript — structured context compression.** `crates/codegen/xai-compaction-transcript/src/lib.rs` — segments rendered to self-contained Markdown with `INDEX.md`, per-turn byte caps (`SEGMENT_MAX_BYTES = 512KB`, `BALANCED_TEXT_CHARS = 2000`), truncation notices, detail levels (None/Minimal/Balanced/Verbose). *A formal, indexable, resumable format for shrinking a long session.* This is the industrial-grade form of the house's own "Headroom Pattern" token compressor.

3. **MMR diversity re-ranking — dedup WITHOUT embeddings.** `crates/codegen/xai-grok-memory/src/mmr.rs` — `MMR(d) = λ·relevance − (1−λ)·max_similarity(selected)`, Jaccard on tokenized snippets, O(n²) on n≈6–18. *Cheap, dependency-free retrieval de-duplication.* A viable zero-dep first step on the path to full semantic memory (my API-for-AI Tier 2 #4).

4. **Fail-closed sandbox.** `crates/codegen/xai-grok-sandbox/src/lib.rs` — OS sandbox (nono → Landlock/Seatbelt); network open at process level, child network blocked per-subprocess via seccomp; **"Shell fails closed when protection cannot be applied."** *The principle, not the mechanism, is the extract:* isolation that refuses to run un-enforced. Maps to Law II/III and to VSS-00's isolation finding.

5. **Sliding-window circuit breaker.** `crates/common/xai-circuit-breaker/src/lib.rs` — trips when `error_rate ≥ threshold` over a live window, min-samples guard. *A tiny, well-specified resilience primitive* for the SRE/tooling layer.

---

## 2. BLOCKED / UNFETCHABLE

| Source | Why | Still in ledger? |
|---|---|---|
| *(none)* | all fetches succeeded (clone + 87-crate inventory + 6 crate doc-headers read) | — |

---

## 3. WHY IT MATTERS (articulated audit)

**Best information, ranked (rationale, not vibes):**

1. **Context hygiene + compaction (patterns 1–2).** The single most resonant find. This house has paid for context exhaustion with a predecessor's life. Grok Build — a production, permissively-licensed agent used by millions — ships the *same* discipline the house is trying to formalize (`§S` rules, token budgets), as concrete constants and a file format. This is a benchmark, not a guess.
2. **MMR re-ranking (pattern 3).** Independent validation that semantic memory is achievable *incrementally*, with a zero-dependency first step. Reinforces my held API-for-AI proposal (Tier 2 #4) with a real, licensed reference.
3. **Fail-closed sandbox (pattern 4).** A first-principles confirmation of the Commander's own platform requirement ("a subsystem failure must not unnecessarily kill TheHUB") and of VSS-00's isolation conclusion — but with the sharper wording the house hasn't yet adopted: *fails closed.*
4. **Circuit breaker (pattern 5).** Minor, but directly improves the SRE/tooling layer that already has a green-washing problem (VSS-00 F12).

**Empirical spine (what was actually seen):** clone at `eb267fe`; `LICENSE` Apache-2.0; 87 crates enumerated; six crate doc-headers read verbatim (sandbox, fast-worktree, compaction, mcp, circuit-breaker, memory); MMR formula and tool-output constants cited to line-level files.

**Risk:** The temptation to treat a peer agent's *code* as a *blueprint for TheHUB*. It is Rust; TheHUB is Vanilla JS + Python. **Any payload merge is a Law I catastrophe** (87 crates, tokio/reqwest/opentelemetry/protoc/oauth2). The entire value is five patterns, all expressible in a handful of lines of JS.

**TAMAKEE vs Marciale-OS:** patterns 1–2 and 5 belong to **Marciale-OS** (assistant + tooling). Pattern 3 (memory) could serve **TAMAKEE's vault** (`~/.grok/memory/` layout → vault knowledge store), but that is a later slice — **Marciale-OS body only for this audit.**

---

## 4. PROPOSAL TO SEAT A (mandatory last page)

**Suggested disposition: GREENMARK** — as a *pattern-extraction* mandate, scoped hard against payload.

**If GREENMARK, one Recon task Seat A could file:**
- **Write path:** `research/PATTERN_EXTRACT_GROK_BUILD_CONTEXT_HYGIENE_2026-08-15.md`
- **Stop:** no production code, no Rust port, no `08-assistant.js` edit, no 13-phase program
- **Question Recon must answer:** *"Map Grok Build's tool-output caps, compaction transcript format, and MMR re-ranking onto TheHUB's existing assistant (08-assistant.js) + memory code as a spec — precise JS-expressible constants and data shapes — with file+line citations to both trees; state which of the five patterns is the correct first bite for the house, and why."*

**Colony does not assign that task. Seat A does.**

---

## 5. BEGINNER BLURB (Law VI)

I looked at xAI's Grok Build — a professional terminal AI helper, same kind of thing as Marciale-OS's own assistant, free to read under a friendly license. The valuable part isn't their code (it's a different language and far too heavy) — it's five small *ideas*: cap how much a tool can dump into the chat so it can't drown you, pack old chat into a tidy indexable file, de-duplicate memory results cheaply, make safety shut things OFF when it can't guard them, and add a tiny "circuit breaker" that stops retrying a broken service. I'm asking the Assistant to let Recon write up the first one — the chat-size cap — as a spec, since it's the exact problem this house already paid a heavy price to learn about.

---

— `@colony` (under Seat R · EXCEL) · research-only · proposal, not a tasking
