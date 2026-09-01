# COLONY AUDIT — `msitarzewski/agency-agents` ("The Agency")
**ID:** `COLONY-20260815-02`
**From:** `@colony` (under Seat R · EXCEL)
**To:** research record only — **no proposal, no implementation** (Commander order)
**Commander sources:** `https://github.com/msitarzewski/agency-agents.git` (given verbatim, none omitted)
**Date fetched:** 2026-08-15
**Upgrade target:** Marciale-OS (patterns only — governance/roster discipline)

---

## 0. INTAKE LEDGER (no rows dropped)

| # | Source (verbatim) | Platform | Fetch | Tag | One-line observed |
|---|---|---|---|---|---|
| 1 | https://github.com/msitarzewski/agency-agents.git | GitHub | OK | `[OBSERVED]` | Curated library of 255 AI agent definitions across 17 divisions; schema-driven install into 16 agent CLIs; MIT |

---

## 1. WASHED REFERENCES + WANTED EXTRACT (G0 + G1)

### 1.1 `agency-agents` — "The Agency" (AgentLand Contributors)

**G1 — GitHub block:**

- **Identity (2 lines):** A growing, community-curated collection of **255 personality-driven AI agent definitions** (Markdown with YAML frontmatter), organized into **17 divisions** (engineering 58, specialized 57, marketing 36, security 12, …), each installable into 16 different agent CLIs (Claude Code, Codex, Gemini, Copilot, Qwen, Cursor, opencode, Kimi, Windsurf, …) via a schema-driven pipeline.
- **License:** **MIT** (`Copyright 2025 AgentLand Contributors`) — fully permissive, no copyleft, no attribution burden beyond the notice.
- **Shape:** Not a codebase — a **content library + a bash pipeline.** Markdown agent files under division directories; `divisions.json` + `tools.json` as declared **source of truth**; `scripts/` (convert.sh, install.sh, lint-agents.sh, check-divisions.sh, check-tools.sh, check-agent-originality.sh, check-runbooks.sh) with CI enforcement. HEAD `ebe9c99`, `main`, active PRs (installer-v2, gemini-subagents, security-division).
- **Repo hygiene:** Well-maintained; `CONTRIBUTING.md` (18 KB) + i18n translations; a companion native app (`agency-agents-app`) as a separate repo.

**G0 — Wanted extract:**

| Wanted | Value |
|---|---|
| **Claim** | "A complete AI agency at your fingertips … each agent is a specialized expert with personality, processes, and proven deliverables." |
| **Proof** | `find . -maxdepth 2 -name "*.md"` → **255** agent files; `divisions.json` lists 17 divisions; `tools.json` lists 16 tools; `scripts/lint-agents.sh` + `check-*.sh` enforce structure. |
| **Upgrade verb** | **teach-TAMA / add-pattern (governance discipline)** — body **Marciale-OS** |
| **Folder pin (hypothesis)** | No production touch. The *patterns* map to: `tools/scout-voice-check.js` (already exists — the house's own lint), `docs/council/members/` (seat definitions), `tools/governance-audit.js`. |
| **Pattern not payload** | Four governance patterns (below) — the agents themselves are third-party prompt content, not wanted. |
| **Cost** | **Zero deps** — all patterns are schema + shell/Node, expressible in the house's existing tooling style. |
| **Keep score** | **KEEP** (patterns) · **REJECT-as-core** (the 255 agents themselves — the house has its own seats) |

**THE FOUR EXTRACTABLE PATTERNS (each cited to source):**

1. **Machine-enforced "single source of truth" with a declared contract.** `divisions.json` and `tools.json` each open with a `_note` field stating *exactly* what consumes them and what CI enforces: `divisions.json` — "CI: check-divisions.yml fails the build if this list disagrees with the directories on disk, the AGENT_DIRS arrays … or the path filters." `tools.json` — "`format` guarantees byte-identical output … `installKind` is the install MECHANISM and is upstream truth." *Governance is a data file plus a CI check, not a document people remember.* This is the industrial form of the house's own `scout-voice-check.js` (which lints tasking documents against Law XIX-B).

2. **A lint contract for agent definitions.** `scripts/lint-agents.sh` — required frontmatter `name/description/color` → **ERROR**; recommended sections (`Identity`, `Core Mission`, `Critical Rules`) → **WARN**; "soul" classification via header regex. *A formal schema for what makes a valid "seat/agent" definition.* Maps directly to the house's `docs/council/members/[SEAT]/` structure — the difference being the house's is prose, this one's is lint-enforceable.

3. **Duplicate/originality detection (anti-bloat).** `scripts/check-agent-originality.sh` — "entity-neutralized 8-word shingle overlap" flags re-skinned duplicates; calibrated that the worst same-pair similarity across the library is ~1.5% (median 0%), with FAIL at 40% / WARN at 20%. *"A new agent should be genuinely new."* This is a machine answer to the exact failure mode that killed this house's predecessor — content that is 88% one repeated token. A near-duplicate seat definition, a re-skinned law, a re-emitted standing-order block — all detectable by the same shingle technique.

4. **Schema-driven multi-target export.** `tools.json`'s `format` field ("identity", "codex-toml", "gemini-md", "kimi-agent", …) + `installKind` ("per-agent" / "roster" / "plugin") drives one canonical roster → many CLI-specific outputs, with a guarantee that two tools sharing a `format` render **byte-identical** output. *One source of truth, many renderings, proven identical.* The house's seats (A/R/W/E/N/J) and their correspondence rules (Law XIV-A's per-seat folders) are the same shape — a canonical roster rendered into per-seat artifacts.

---

## 2. BLOCKED / UNFETCHABLE

| Source | Why | Still in ledger? |
|---|---|---|
| *(none)* | all fetches succeeded (clone, metadata files, 255-agent count, 6 script headers, sample agent) | — |

---

## 3. WHY IT MATTERS (articulated audit)

**Best information, ranked (rationale, not vibes):**

1. **Machine-enforced governance (patterns 1–2).** The single most resonant find for Marciale-OS. The JARWEN Council is a multi-agent governance structure; this repo is a production, MIT-licensed, widely-adopted *roster-management system* whose core discipline is "the source-of-truth data file + the CI check that fails the build on drift." The house already has one instance of exactly this (`scout-voice-check.js` linting tasking docs against Law XIX-B) — `agency-agents` is a benchmark showing the same idea generalized across divisions, tools, and formatting.
2. **Anti-bloat originality detection (pattern 3).** Independent, calibrated validation that near-duplicate content can be *machine-flagged* — directly relevant to the house's own §S survival doctrine ("a repeated tag is a defect to delete") and to NTG's 88%-repeated-token death. The house has the rule; this repo has the *mechanism* (shingle overlap).
3. **Canonical-roster → many-renderings (pattern 4).** The `format`/`installKind` contract is a clean model for how a single Council roster could render per-seat artifacts with a proven-identical guarantee.

**Empirical spine (what was actually seen):** clone at `ebe9c99`; `LICENSE` MIT; `divisions.json` (17 divisions, `_note` contract) read in full; `tools.json` (16 tools, `_note` + per-tool contract) read in full; 255 agent files counted; `engineering-code-reviewer.md` read verbatim (frontmatter schema + section structure); `lint-agents.sh`, `check-agent-originality.sh`, `check-divisions.sh` headers read.

**Risk:** Low, but real — the temptation to *import* the 255 agents. The house's seats are already defined and governed by its own laws; 255 third-party personas would be Law I / token-bloat poison. The **agents are payload to reject**; only the four governance patterns are the extract. (Secondarily: MIT content is usable, but the agents carry `color`/`emoji`/`vibe` personality fields that would collide with the house's own DESIGN.md token discipline.)

**TAMAKEE vs Marciale-OS:** **Marciale-OS only** — the patterns concern council/roster governance and tooling. (A TAMAKEE angle exists conceptually — "teach-TAMA" could use the agent-definition *format* as a template for academic drill personas — but that is out of scope here and speculative.)

**Disposition note (research-only):** No proposal filed to Seat A and nothing to implement, per the Commander's order. This record stands as gathered evidence for future Council deliberation.

---

## 4. BEGINNER BLURB (Law VI)

I looked at "The Agency" — a big, well-kept public library of 255 ready-made AI helper personalities you can drop into tools like Claude Code or Cursor, free to use under the MIT license. The helpers themselves aren't useful to Marciale-OS, because our house already has its own seats with their own rules. But the *plumbing* around the library is genuinely impressive: they keep one master list of who's who, and little checker scripts that automatically fail the build if the folders drift from the list, if an agent is missing required fields, or if a new agent is secretly a near-copy of an old one. That "let the machine catch drift and duplicates" discipline is worth studying — it's the same idea as our own scout-voice checker, done at scale.

---

— `@colony` (under Seat R · EXCEL) · research-only · no proposal, no implementation
