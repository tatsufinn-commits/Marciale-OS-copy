# RESEARCH — STRUCTURED CONSTRAINTS FOR AI CODING TOOLS
## Rules, Guidelines & Governance Frameworks: What Actually Works
**Seat R (RECONNAISSANCE · EXCEL) · 2026-08-16 · research-only**

**Scope note (stated first, honestly):** the exact question — "do rule files / coding
standards / policy documents *empirically* improve AI-assisted software output" — has a
**thinner primary-evidence base than the adjacent fields** (AI safety, general LLM
guardrails). The authoritative material splits into three tiers:

1. **Peer-reviewed empirical studies** on LLM *code generation* (mostly about *correctness
   and security*, rarely about *rule files* per se).
2. **Peer-reviewed / preprint work on guardrails & system prompts** (directly relevant,
   with one pivotal negative result).
3. **Official lab & standards-body documentation** (Anthropic, Google, NIST) — authoritative
   but **not controlled experiments**; they are best-practice engineering claims.

I flag this split throughout rather than smoothing it, because treating lab guidance as
peer-reviewed evidence would be exactly the conflation this house legislates against.

---

# 1. SOURCE REGISTER (type · date · org — for currency/authority judgement)

| # | Source | Type | Date | Org/Authors |
|---|---|---|---|---|
| P1 | Constitutional AI: Harmlessness from AI Feedback (arXiv:2212.08073) | preprint (widely cited) | Dec 2022 | Anthropic (Bai et al.) |
| P2 | A Closer Look at System Prompt Robustness (arXiv:2502.12197) | preprint | Feb 2025 | UC Berkeley (Mu, Lu, Lavery, Wagner) |
| P3 | No Free Lunch With Guardrails (arXiv:2504.00441) | preprint | Apr 2025 | (multi-institution) |
| P4 | Constitution or Collapse? CAI with Llama 3-8B (arXiv:2504.04918) | preprint | Apr 2025 | (academic) |
| P5 | Asleep at the Keyboard? (IEEE S&P 2022, pp.754–768) | **peer-reviewed** conf. | May 2022 | NYU (Pearce, Ahmad, Tan, Dolan-Gavitt, Karri) |
| P6 | On the Robustness of Code Generation Techniques (ICSE 2023, pp.2149–2160) | **peer-reviewed** conf. | May 2023 | (Mastropaolo et al.) |
| P7 | Assessing the Correctness of GitHub Copilot's Code Suggestions (TOSEM) | **peer-reviewed** journal | 2025 | (Mo et al.) |
| P8 | CodeGuard: Improving LLM Guardrails in CS Education (arXiv:2602.02509) | preprint | Feb 2026 | George Mason / Oklahoma / Notre Dame |
| D1 | NIST AI RMF 1.0 (AI 100-1) | official standard | Jan 2023 | NIST |
| D2 | NIST AI 600-1 — Generative AI Profile | official standard | Jul 2024 | NIST |
| D3 | Claude Code — Best Practices | official doc | 2026 (current) | Anthropic |
| D4 | Claude Platform — Prompting Best Practices | official doc | 2026 (current) | Anthropic |
| D5 | The new rules of context engineering for Claude 5 models | official lab writing | 24 Jul 2026 | Anthropic (Shihipar) |
| D6 | Gemini API — Prompt Design Strategies | official doc | 2026 (current) | Google |
| D7 | Gemini 3 Developer Guide | official doc | 2026 (current) | Google |

---

# 2. ANGLE 1 — WHAT HAS BEEN EMPIRICALLY SHOWN TO WORK

## 2.1 Rules *can* substitute for human supervision — but it's a training method, not a lint
**P1 (Constitutional AI, Anthropic, 2022):** the foundational result that a *short list of
written principles* can steer model behavior with **no human harmfulness labels** — via
self-critique + revision (supervised stage) then RLAIF (RL stage). "The only human oversight
is provided through a list of rules or principles."

*Why it matters and its limit:* this validates "a constitution works" at the **training**
level. But it says nothing about *runtime* rule files like CLAUDE.md or style guides — the
mechanism is weights, not prompts. Conflating the two is a category error I want on record.

## 2.2 Verification-first rules are the strongest recurring theme
**D3 (Anthropic, Claude Code best practices)** is explicit and consistent across the whole
canon: the highest-value constraint is **"give Claude a way to verify its work"** — example
test cases, run-the-tests-after, screenshot-compare, "address the root cause, don't suppress
the error." The named failure it counters is the **"trust-then-verify gap"** — "Claude
produces a plausible-looking implementation that doesn't handle edge cases… if you can't
verify it, don't ship it."

**D2 (NIST AI 600-1)** independently lands on the same axis, formalized: the **MEASURE**
function — "measure, monitor, and disclose rates of confabulation; implement output
validation controls" — i.e., governance requires a *measurement cadence*, not just rules.
The most commonly cited NIST implementation failure is "organizations complete GOVERN and
MAP on paper, then drop MEASURE because they lack the data infrastructure."

**Cross-cutting finding:** the empirical center of gravity is **verification over
proscription**. Rules that *enable* checking (tests, schemas, thresholds) outperform rules
that *forbid* things, and this is consistent across a peer-reviewed security study, an
official standard, and lab docs.

## 2.3 Specificity beats generality; "concrete and verifiable" is measurable
**D3/D4 (Anthropic):** "be concrete, not vague" — "format code properly" fails; "use
2-space indentation" works. The "Golden rule" is *operational*: "show your prompt to a
colleague with minimal context; if they'd be confused, Claude will be too." Emphasis
keywords ("IMPORTANT", "YOU MUST") are cited as improving adherence.

**D6/D7 (Google):** "be precise and direct"; "use consistent structure" (delimiters /
XML-style tags); for Gemini 3 specifically, "place specific instructions at the END of the
prompt, after the data context." Note this *contradicts* older few-shot orthodoxy (see §4).

## 2.4 The anti-overengineering rules (negative constraints that work)
**D4 (Anthropic, "Overeagerness" template):** a canonical system-prompt block explicitly
forbidding scope creep — "only make changes directly requested or clearly necessary… don't
add docstrings to code you didn't change… only validate at system boundaries." This is a
*good* rule-file content pattern: it names the specific failure (overeager refactoring) and
constrains it. Directly relevant to Law I (non-destructive mandate) in this house.

---

# 3. ANGLE 2 — FAILURE MODES WHEN RULES ARE ABSENT OR POORLY DESIGNED

## 3.1 Absent constraints → measurably insecure code
**P5 (Pearce et al., IEEE S&P 2022):** the canonical audit. 1,689 Copilot-generated
programs across 89 scenarios (MITRE Top-25 CWEs): **~40% were vulnerable**. This is the
baseline the entire guardrail field exists to fix.

**P6 (ICSE 2023):** Copilot output is unstable — semantically-equivalent descriptions
produced **different code ~46% of the time**. Implication: unconstrained generation is not
just occasionally wrong, it's *non-deterministic across phrasings*, which is precisely what
a stable rule/contract is meant to pin down.

**P7 (TOSEM 2025):** correctness is **70% overall** but collapses by difficulty
(89.3% easy → 72.1% medium → 43.4% hard) and by language (29.7% C vs 57.7% Java). These
three studies together are the empirical spine of "unguarded AI code cannot be trusted
without a verification layer."

## 3.2 Poorly designed rules (over-stacked guardrails) → collapse
**P2 (Mu et al., UC Berkeley, 2025) — the pivotal negative result.** "Model performance
**quickly approaches zero** when stress tested with an increasing number of guardrails in
the system message" (1 → 20 guardrails, pass rate falls to ~0). Key mechanism: models
"forget to consider relevant guardrails or fail to resolve conflicting demands between the
system and the user."

**D5 (Anthropic, Jul 2026) — the lab's own confirmation.** "We removed **over 80%** of
Claude Code's system prompt for more advanced models with no measurable loss on our coding
evaluations." Their transcripts showed **conflicting instructions in a single request**
("leave documentation as appropriate" vs "DO NOT add comments") — the rules were *fighting
each other*, forcing the model to spend reasoning resolving contradiction. The correction:
"Then: Give Claude rules. Now: Let Claude use judgement." And specifically: **progressive
disclosure** — move verification/code-review rules into *skills loaded on demand* rather
than a monolithic upfront prompt.

**P3 (No Free Lunch With Guardrails, 2025):** formalizes it — no guardrail configuration
simultaneously optimizes safety, utility, and usability. Flags **pseudo-harm** (benign
content wrongly rejected) as the underexplored failure mode.

**D3 (Anthropic) named failure — "the over-specified CLAUDE.md":** "if your CLAUDE.md is
too long, Claude ignores half of it because important rules get lost in the noise. Fix:
ruthlessly prune."

> **This is the single most decision-relevant finding of the entire study.** The house's own
> history — NTG dying under a 105 KB prompt, 88% one repeated token — is a case study of the
> *exact* failure P2/D5 measure. Structured constraints are not monotonic: past a threshold
> they *cause* the failure they exist to prevent.

## 3.3 Small-model failure (relevant to local-first Marciale-OS)
**P4 (Constitution or Collapse?, 2025):** applying CAI to a *small* model (Llama 3-8B)
caused "model collapse" — harmlessness +40% but helpfulness **−9.8%**, and the authors
conclude small models "struggle with self-improvement due to insufficient output quality."
Direct caution for any house running 3B–8B local models (Ollama): rule-heavy
self-improvement schemes that work on frontier models may degrade small ones.

---

# 4. ANGLE 3 — CONSENSUS VS DISAGREEMENT

**Consensus (high confidence):**
1. **Verification outranks proscription.** (P5, D2, D3 all converge.)
2. **Rules have diminishing and then negative returns when stacked.** (P2, P3, D5, D3.)
3. **Specificity + concreteness improve adherence.** (D3, D4, D6, D7.)
4. **Rules compensate for model weakness and therefore expire as models improve.** (D5 is
   explicit; P4 shows the inverse — small models still need more.)

**Disagreement / tension (real, not resolved):**
1. **Where rules live — prompt vs architecture.** Google's agentic templates (D6) put heavy
   structured rule lists *in the system prompt*; Anthropic's 2026 direction (D5) is moving
   rules *out* of the prompt into skills/tools/architecture, explicitly: "a guardrail
   written into a prompt is a preference… it loosens as the model gets better." These are
   opposite prescriptions from two authoritative labs.
2. **Examples: essential vs constraining.** Classic prompting (D4 "use examples
   effectively") vs D5 ("giving examples actually constrains them to a certain exploration
   space — design interfaces instead"). Again opposite, and both current.
3. **Few-shot/CoT value.** P3 finds CoT guardrails improve edge-case handling *but* cost
   7–8s latency (unusable for latency-critical work); D7 (Gemini 3) tells users to *remove*
   CoT-style scaffolding because the model reasons natively. The "more explicit rules" line
   is model-dependent.

---

# 5. ANGLE 4 — GAPS & OPEN QUESTIONS (the field's own unresolved items)

1. **No controlled study I can find measures "rule files → improved *maintainability*."**
   The empirical base covers *correctness* (P6, P7) and *security* (P5) but not the
   "does a style guide / CLAUDE.md materially raise maintainability" question. That specific
   claim currently rests on lab guidance (D3/D5), not measurement. **This is the thinnest
   part of the evidence and I flag it rather than fill it.**
2. **Guardrail count vs quality is unstudied.** P2 shows *count* collapses performance; no
   work cleanly separates "few good rules" from "many rules."
3. **Small/local models are under-measured.** P4 is nearly alone; the entire guardrail
   literature assumes frontier-scale models. For local-first systems (Ollama 3B–14B) the
   evidence is essentially absent.
4. **Long-horizon / multi-session governance** (rules persisting across context windows) is
   barely touched — D4 gestures at "use a different prompt for the first window," but there
   is no rigorous study.
5. **Pseudo-harm / over-filtering** is named (P3) but not yet quantified for *coding* (as
   opposed to chat safety).

---

# 6. WHAT THIS MEANS FOR MARCIALE-OS (synthesis, proposal-only)

Mapped against this house's concrete situation (local Ollama models, a rule-heavy
governance culture, a history of context-death):

1. **The house's instinct is validated — and its risk is identified.** Marciale-OS is
   already a rules-and-governance house (25 laws, commandments, seat charters). The
   literature says *that is correct in spirit and dangerous in dosage*: P2/D5 show rules
   past a threshold *collapse* the model they govern. The single most valuable lesson:
   **governance should be progressively disclosed and verification-first, not monolithic
   and proscriptive.** This is effectively a research-grade endorsement of the house's own
   §S doctrine ("state it once", 10 KB intake cap) and a warning against ever stacking more.
2. **"Give the model a way to verify" maps to what already works here** (npm test, merge
   gates, audit:all) — and to my filed Build 2 (tool-output caps) and Build 5 (verifiable
   compaction). The literature says: *spend governance budget on verification, not on more
   rules.*
3. **Local-model caution (P4):** the 3B–8B models TheHUB runs will not tolerate
   frontier-style rule self-improvement; keep constraints minimal and external
   (in the code/gates), not loaded into the small model's prompt.
4. **The prompt-vs-architecture disagreement (D5 vs D6)** is the strategic fork for any
   future TAMA/assistant governance: put rules in the model (Google-style) or in the
   scaffolding (Anthropic-2026-style). The evidence now leans **scaffolding** — but this is
   a Council decision, not a scout's.

---

# 7. VERIFICATION NOTES (what I could and could not confirm)

- [VERIFIED] All paper metadata (titles, venues, dates, authors, key numbers) confirmed
  against arXiv/IEEE/ACM abstracts and full texts where fetched.
- [VERIFIED] The Anthropic "80% system prompt removal" claim confirmed against the primary
  source (D5, claude.com, 24 Jul 2026) — I did **not** rely on the third-party summary.
- [VERIFIED] NIST AI 600-1's 12 risk categories + GOVERN/MAP/MEASURE/MANAGE confirmed
  against NIST-derived primary summaries.
- [NOT VERIFIED — flag] I did **not** obtain full texts of P3, P4, P6, P7 (abstracts +
  secondary metadata only). Their headline numbers are reported as found; fine-grained
  methods are not independently re-checked.
- [THIN] The "rules → maintainability" link (see §5.1). Stated explicitly, not padded.

— Seat R, EXCEL · research-only · primary sources only, gaps flagged
