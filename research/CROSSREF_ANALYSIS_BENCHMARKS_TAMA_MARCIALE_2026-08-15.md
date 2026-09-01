# CROSS-REFERENCED ANALYSIS — BENCHMARK PATTERNS FOR TAMA & MARCIALE-OS
## Grok Build + The Agency → Marciale-OS / TAMA Academic Studio
**Seat R (RECONNAISSANCE · EXCEL) · research-only · 2026-08-15**

| Field | Value |
|---|---|
| Tree | Marciale-OS HEAD `030f3db` |
| Benchmarks | `xai-org/grok-build` (HEAD `eb267fe`, Apache-2.0) · `msitarzewski/agency-agents` (HEAD `ebe9c99`, MIT) |
| Prior filings | `COLONY_AUDIT_2026-08-15_grok-build.md` · `COLONY_AUDIT_2026-08-15_agency-agents.md` |
| Scope | Research only — no implementation, no proposal to Seat A |

```
$ git rev-parse --short HEAD
030f3db
```

---

# 1. METHOD & EMPIRICAL BASE

Three evidence classes, all verified this watch:

1. **Benchmark source (external):** grok-build crate headers read verbatim (`xai-grok-tools/src/lib.rs`, `xai-compaction-transcript/src/lib.rs`, `xai-grok-memory/src/mmr.rs`, `xai-grok-sandbox/src/lib.rs`, `xai-circuit-breaker/src/lib.rs`, `xai-grok-mcp/src/lib.rs`); agency-agents metadata read verbatim (`divisions.json`, `tools.json`, `scripts/lint-agents.sh`, `scripts/check-agent-originality.sh`, `engineering-code-reviewer.md`).
2. **Marciale-OS source (internal):** `TheHUB …/modules/08-assistant.js` (assistant + Marciale brain), `server.py` (`/api/mapua`), `tamaplugin/*` (5 files).
3. **Prior Recon findings:** VSS-00 (isolation, bridge) and VSS-02 (audio lifecycle) — both discharged, both cited below where the same disease recurs.

**The subject is one question:** *which of the five grok-build patterns and four agency-agents patterns are worth implementing for Marciale-OS and TAMA, and why is each necessary rather than merely interesting?* The answer, established below, is that **every recommended upgrade closes a defect already visible on disk** — not a hypothetical gap.

---

# 2. THE TAMA SURFACE AS IT EXISTS NOW (empirical, before recommending anything)

TAMA is not a separate codebase in this workspace — it is the **`tamaplugin/` suite inside TheHUB** plus a server endpoint. What exists:

| File | What it is | Defect visible on disk |
|---|---|---|
| `tamaplugin/mapua-brain-preset.js` | A "Brain Profile" (`mapua_architect`) = **one giant hardcoded prompt string** (~5 KB) of PD 1096/RA 9514/BP 344/RA 9266 laws + 3 tools (`query_building_code`, `solve_structural_problem`, `generate_mock_exam`) | **No context hygiene**: the full law dump is injected wholesale; no caps, no compaction, no indexing. |
| `tamaplugin/tamakee-studio-view.js` | Interactive studio; `TAMAKEE_QUESTIONS` = **a hardcoded `const` array at line 21** (question bank in code); exam view, solvers (AMBF/TGFA, ramp, beam), vault view | **Data in code**: the question bank is not data-driven — no schema, no source-of-truth file, no lint. |
| `tamaplugin/exam-calendar-card.js` | Scans Blackboard `.ics` events for exam keywords → countdown card | Functional; no defect, but its feed dependency is unprotected (below). |
| `tamaplugin/study-momentum-bridge.js` | `hub.activity` events → +Gold/+XP to Idle Hero | Cross-subsystem bridge — the same class VSS-02 found unguarded. |
| `tama-plugin-init.js` | Orchestrator; exposes `window.Hub.tama` | Monkey-patches `renderTodayDashboard`/`activatePage` — a fragile integration surface. |
| `server.py` `/api/mapua` (line 620) | Fetches external Mapúa ICS feed via `urllib.request` | **No timeout, no circuit breaker** on an external network dependency. |

**The Marciale brain (memory system), empirical:**

`08-assistant.js` `retrieveMemory` (lines 836–843) is **keyword scoring only**: `memTokens()` splits on token boundaries, then `score += tok.length > 3 ? 3 : 1` for substring `includes`. No embeddings, no MMR diversity, no semantic similarity. The `mapua_architect` profile — the *only* domain-specific brain in the house — is a monolith.

These are not hypotheticals. They are the current state, and they are exactly what the two benchmark repos already solve.

---

# 3. THE PATTERNS — SIDE BY SIDE

## 3.1 From Grok Build (terminal coding agent)

| # | Pattern | Source (cited) | What it is |
|---|---|---|---|
| G1 | **Hard tool-output caps** | `xai-grok-tools/src/lib.rs` — `DEFAULT_TOOL_OUTPUT_BYTES = 40_000` (≈10k tokens), bash `20_000` chars | A runaway tool cannot flood the model's context window. |
| G2 | **Compaction transcript** | `xai-compaction-transcript/src/lib.rs` — `INDEX.md` + segments, `SEGMENT_MAX_BYTES = 512KB`, per-turn caps, truncation notices | Long sessions shrink into indexed, resumable Markdown. |
| G3 | **MMR re-ranking** | `xai-grok-memory/src/mmr.rs` — `MMR(d) = λ·rel − (1−λ)·max_sim`, Jaccard, no embeddings | Retrieval de-duplication; cheap, dependency-free. |
| G4 | **Fail-closed sandbox** | `xai-grok-sandbox/src/lib.rs` — "Shell fails closed when protection cannot be applied" | Isolation that refuses to run un-enforced. |
| G5 | **Circuit breaker** | `xai-circuit-breaker/src/lib.rs` — sliding window, error-rate threshold | Tiny resilience primitive for external calls. |

## 3.2 From The Agency (agent-definition library)

| # | Pattern | Source (cited) | What it is |
|---|---|---|---|
| A1 | **Machine-enforced source-of-truth** | `divisions.json` / `tools.json` `_note` fields + `scripts/check-*.sh` (CI fails on drift) | Governance as a data file + a CI check, not a remembered document. |
| A2 | **Lint contract for definitions** | `scripts/lint-agents.sh` — required frontmatter → ERROR; recommended sections → WARN | A formal schema for "what makes a valid agent/seat." |
| A3 | **Originality detection** | `scripts/check-agent-originality.sh` — entity-neutralized 8-word shingle overlap, FAIL 40% / WARN 20% | Machine-flags near-duplicate content (anti-bloat). |
| A4 | **Schema-driven multi-target export** | `tools.json` `format`/`installKind` — one roster → many renderings, byte-identical guarantee | One source of truth, many proven-identical outputs. |

---

# 4. CROSS-REFERENCE — PATTERN → MARCIALE-OS → TAMA, WITH THE DEFECT IT CLOSES

## 4.1 G1 — Tool-output caps → both (highest priority for Marciale-OS)

**Marciale-OS defect (verified):** `08-assistant.js` has **no cap** on tool results. `read_website` (line 625) downloads readable text and returns it raw; `search_memory`, `search_vault`, `get_summary` return unbounded strings; `write_note` accepts 50,000 chars. A single tool call can inject an unbounded payload into the local model's context.

**Why necessary:** This is the *literal* failure class that killed NTG (88% repeated token → context death) and that §S rule 4 legislates against (10 KB intake cap). Grok Build shows the production-grade constant: cap tool output, hard, at ~10k tokens, with an env override. The house has the law but not the mechanism.

**TAMA impact:** The `mapua_architect` profile is a **5 KB+ static prompt injected every message**. G1's discipline generalizes: the law dump should be capped/streamed from a data store, not a monolithic string. A Socratic coach whose context is 20% raw law-text per turn is both wasteful and fragile.

## 4.2 G2 — Compaction transcript → TAMA (highest priority for TAMA), then Marciale-OS

**TAMA defect (verified):** Tutoring is inherently **long-running multi-turn** (mock exams, Socratic drills, studio defenses). `tamakee-studio-view.js` holds exam state in a flat `_examState` object with **no session persistence, no history compaction, no resumability**. If the tab reloads, the session is gone.

**Marciale-OS defect:** The assistant's chat sessions exist (`renderChatSessions`, pinned/archived sessions) but there is **no compaction** — a long session grows without bound, which is precisely the §S self-regenerating-context risk.

**Why necessary:** Grok Build's compaction transcript (self-contained Markdown segments + `INDEX.md`, byte-capped, truncation-noticed) is a **resumable format** — a successor (or a reloaded session) resumes at a segment boundary. For TAMA, this converts "a 2-hour mock exam that vanishes on reload" into "a resumable, indexable study artifact." It is the industrial form of the house's own token-compressor "Headroom Pattern" already cited in the Hub namespace tests.

## 4.3 G3 — MMR re-ranking → Marciale-OS memory, then TAMA vault

**Defect (verified):** `retrieveMemory` is keyword-scored (`includes` + length weight). Two consequences: (a) **no semantic recall** — "fire exit width" will not retrieve a memory that says "egress stair 0.90m"; (b) **no de-duplication** — a corpus heavy in one topic returns 8 near-identical hits.

**Why necessary:** MMR (`λ·relevance − (1−λ)·max_similarity`, Jaccard, O(n²) on n≈18, **zero embeddings**) is a **dependency-free first step** toward the semantic memory already proposed in the API-for-AI research (Tier 2 #4). It upgrades the Marciale brain and, for TAMA, the study-vault retrieval, with no new runtime — exactly the kind of additive, Law-I-safe, incremental improvement this house favors.

## 4.4 G4 — Fail-closed sandbox → Marciale-OS (VSS-00 confirmation)

**Defect (verified, prior filing):** VSS-00 found isolation is **per-subsystem convention, not a platform contract** — Companion/RuView in iframes, chess inline, CADAM unmounted. VSS-02 found audio teardown absent everywhere.

**Why necessary:** Grok Build's sandbox states the principle in the sharper form the house hasn't yet adopted: *fails closed*. The extract is not the Rust mechanism (nono/Landlock — platform-specific, payload to reject) but the **doctrine**: an isolation boundary that cannot be enforced must refuse to run. This is the Commander's own platform requirement ("a subsystem failure must not unnecessarily kill TheHUB") restated as a checkable invariant.

## 4.5 G5 — Circuit breaker → Marciale-OS SRE + TAMA exam feed

**Defect (verified):** `server.py` `/api/mapua` (line 620–626) calls `urllib.request.Request(MAPUA_ICS_URL, ...)` with **no timeout and no breaker**. If the Mapúa Blackboard feed hangs, the request hangs — and the exam countdown card (the *reason* the feed exists) silently degrades.

**Why necessary:** A sliding-window circuit breaker (trip on error-rate over a live window) is a ~50-line primitive that hardens every external call the house makes — the mapua feed first, the `/api/fetch` web tool, and Ollama probes. It also corrects the green-washing found in VSS-00 F12 (a "SEV-0 Normal" verdict that ignored real warnings) by giving SRE a *real* degradation signal.

## 4.6 A1 + A2 — Schema-driven source-of-truth + lint → TAMA (highest TAMA priority) and Council

**TAMA defect (verified):** `TAMAKEE_QUESTIONS` is a **hardcoded `const` array in `tamakee-studio-view.js:21`**. The question bank — the *core academic asset* — is code, not data. Adding a question means editing a 25 KB JS file; there is no schema, no validation, no way to lint "is this question well-formed?"

**Council defect:** The JARWEN seats (`docs/council/members/[SEAT]/`) are prose. The house has **one** lint (`scout-voice-check.js`) for tasking documents — nothing enforces seat-definition shape.

**Why necessary:** The Agency proves the discipline at scale: `divisions.json` declares itself the source of truth and a CI check **fails the build on drift**; `lint-agents.sh` makes `name/description/color` required (ERROR) and sections recommended (WARN). For TAMA, extracting the question bank into a schema-driven data file + a lint script converts "editing code to add a question" into "editing data," and makes the bank auditable, exportable, and non-fragile. This is the single most concrete, lowest-risk, highest-value TAMA upgrade available.

## 4.7 A3 — Originality detection → Marciale-OS governance (§S)

**Defect (verified, institutional):** §S rule 3 ("state a thing once") and NTG's 88%-repeated-token death are the *rule and the casualty* — but the house has **no mechanism** to detect the failure. A re-skinned law, a near-duplicate seat definition, a re-emitted standing-order block: all merge clean and look well-formed.

**Why necessary:** `check-agent-originality.sh` shows the mechanism (entity-neutralized 8-word shingles, calibrated: worst real pair ~1.5%, FAIL 40%). For a house whose survival doctrine is literally anti-repetition, a lint that flags near-duplicate artifacts is not optional governance theater — it is a machine enforcement of Law §S, the same way `scout-voice-check.js` machine-enforces Law XIX-B.

## 4.8 A4 — Schema-driven export → TAMA brain profiles + Council roster

**Defect (verified):** `mapua-brain-preset.js` is a **single hardcoded object** with an inline `tools` array. It cannot be rendered to other targets, versioned as data, or linted.

**Why necessary:** The Agency's `format`/`installKind` contract (one canonical roster → per-tool renderings, byte-identical guarantee) is the model for how a TAMA "brain profile" should be authored once and rendered to Marciale AI, to a future MCP server, to a printable study sheet — without drift.

---

# 5. THE RATIONALE — WHY THESE ARE *NECESSARY*, NOT OPTIONAL

Five arguments, each tied to evidence already on disk:

1. **The house has already paid for context failure.** NTG died of a 105 KB prompt, 88% one repeated token. G1 (caps) and A3 (originality detection) are *mechanisms* for laws already written — the house legislated against its own casualty but hasn't yet built the instruments to detect it. That gap is not hypothetical; it is the difference between "we have a rule" and "the machine enforces the rule."

2. **TAMA's core asset is fragile by construction.** The question bank is in code (`TAMAKEE_QUESTIONS`), the law profile is a monolith, and a 2-hour mock exam vanishes on reload. A1/A2/A4/G2 are not enhancements — they are the difference between TAMA as a *toy* and TAMA as a *durable study instrument*. A student's preparation for the PRC ALE is too serious to live in a hardcoded array.

3. **Every external dependency is unprotected.** `/api/mapua` has no timeout/breaker (G5). The bridge handlers lack origin/pause contract symmetry (VSS-00/02). G4's fail-closed doctrine is the *statement* of what the Commander already demanded.

4. **Retrieval is keyword-only where it matters most.** The Marciale brain and the TAMA vault cannot do semantic recall (G3). This is the exact gap the held API-for-AI proposal (Tier 2 #4) targets — and MMR is its zero-dependency entry point, de-risking the larger semantic-memory ambition.

5. **The benchmarks are permissive and independently validate the house's direction.** Both repos are Apache-2.0/MIT; neither is copyleft; both are production-used. They are *evidence* that the house's own instincts (context hygiene, anti-bloat, governance-as-data) are industry-standard — which converts internal intuition into external benchmark.

---

# 6. PRIORITIZATION (recommendation, not authorization)

Ranked by (necessity × risk-reduction ÷ effort), cross-referenced:

| Rank | Upgrade | Body | Closes | Effort | Why first |
|---|---|---|---|---|---|
| 1 | **A1+A2** schema-driven question bank + lint | TAMA | data-in-code fragility | Low | Highest value, lowest risk, zero deps; converts TAMA's core asset from code to data |
| 2 | **G1** tool-output caps | Marciale-OS | context-death class | Low | A ~3-line constant; the law already exists, the mechanism is missing |
| 3 | **G5** circuit breaker on `/api/mapua` | Marciale-OS → TAMA | hung external feed | Low | Unprotected network dependency on a high-stakes surface |
| 4 | **G3** MMR re-ranking | Marciale-OS brain + TAMA vault | keyword-only recall | Medium | Zero-dep first step to semantic memory (held proposal) |
| 5 | **G2** compaction transcript | TAMA → Marciale-OS | session loss / unbounded growth | Medium | Makes tutoring resumable; industrial form of the house's own compressor |
| 6 | **A3** originality lint | Marciale-OS governance | §S repeated-token | Low | Machine enforcement of the house's survival doctrine |
| 7 | **G4** fail-closed sandbox | Marciale-OS | isolation convention | High | Doctrine adoption; the mechanism is platform-specific |
| 8 | **A4** schema-driven export | TAMA → Council | monolith profiles | Medium | Generalizes A1/A2 to profiles |

**The first bite (my counsel, proposal-only):** the **A1+A2 question-bank extraction** — it is self-contained, zero-dependency, fully evidenced, and it turns TAMA's most valuable asset from fragile into durable. Slice selection remains the Commander's.

---

# 7. BOUNDARIES & RISKS (unchanged doctrine)

- **Patterns, never payload.** grok-build is Rust (tokio/reqwest/opentelemetry); agency-agents' 255 agents are third-party personas. Merging either is a Law I catastrophe and token bloat. Only the *patterns* are extractable, all expressible in the house's Vanilla JS + Python + shell.
- **Law I / II / III / IV hold:** additive only; external integrations sandboxed; local-first; one bite at a time (Law XVIII-B decomposition applies).
- **TAMA scope:** this analysis covers the `tamaplugin/` surface *inside* Marciale-OS. A separate TAMAKEE repository, if one exists, was not inspected this watch — no claim is made about it. If the Commander wants that repo audited, it needs its own tasking (and, per the house's own history, its own slice — never a two-repo span in one bite).
- **No implementation, no proposal to Seat A.** This is research; disposition and slice selection are the Commander's.

---

# 8. SCOPE CERTIFICATION

- [x] Research-only; zero files modified outside `research/`
- [x] TAMA examined **only** via the in-repo `tamaplugin/` surface + `/api/mapua`
- [x] Every benchmark claim cited to a file; every internal claim cited to file+line
- [x] Rationale ties each recommendation to a defect visible on disk
- [x] Prior VSS-00/VSS-02 findings cross-referenced, not re-filed

— Seat R, EXCEL · research-only
