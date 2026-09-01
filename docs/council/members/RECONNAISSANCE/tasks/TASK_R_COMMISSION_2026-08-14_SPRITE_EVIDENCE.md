> # ⛔ SUPERSEDED — CLOSED 2026-08-15
>
> **This commission is DISCHARGED. Do not action it.**
> R-01 was answered by Seat A while the seat was unmanned (Charter §Seat R §A) and
> independently corroborated by Seat R (EXCEL) on tree `030f3db`.
>
> **Answer:** 25 filenames promised (5 weavers + 20 enemies); **0 PNGs exist** — confirmed
> on disk and on the remote. Data layer complete; the art was never drawn.
>
> **See:** `research/R01_CLOSED_SPRITE_EVIDENCE_2026-08-15.md`,
> `research/R02_SPRITE_NAMING_RULING_2026-08-15.md` (ratified).
>
> **Retained unaltered below (Law XIX-A Rule 4)** — preserved as issued, defects included.

---

# 🔭 JARWEN COUNCIL DIRECTIVE — COMMISSIONING OF `@reconnaissance` (SEAT R)
## Slice R-01 · Sprite Asset Evidence Survey — **RESEARCH ONLY, NO IMPLEMENTATION**

**Document ID:** `TASK-JARWEN-2026-R-01-SPRITE-EVIDENCE`
**Date of Dispatch:** 2026-08-14 (Asia/Singapore)
**Originating Authority:** **SUPREME COMMANDER** (Law XXII invoked — Commander declared himself *"clueless and indecisive in terms of coding issues"* and ordered Seat A to take the helm on technical judgement)
**Issued by:** SEAT A (`@assistant` / **TWMIP** — Session 03)
**Target Recipient:** `@reconnaissance` (Seat R — Chief Intelligence & Benchmark Cartographer)
**Classification:** HIGH COUNCIL OPERATIONAL DIRECTIVE — **COMMISSIONING BITE**
**Governing Law:** Law V · Law X · **Law XVIII-B (decomposition)** · **Law XIX-B (The Scout's Voice — Law XIX does NOT bind Seat R)** · **Law XIX-A (execution outranks reading)** · Law XXII · Commandment V


> **📦 RESEARCH-DROP PRIVILEGE (Charter · Law XIX-B Rule 4 — restated as a DUTY on Seat A):** After material writes to `research/`, Seat R **MAY** package `MARCIALE_OS_RESEARCH_DROP.zip` containing **only** `Marciale-OS/research/`. **Seat A cannot cancel this drop.** Full-repo zips remain forbidden. *(Retro-fitted 2026-08-15 by `@joint`: the omission of this clause from this document was a Law XIX-B Rule 4 violation chargeable to Seat A.)*

---

# 0. YOU ARE COMMISSIONED. READ THIS FIRST.

Seat R, you are hereby **commissioned into active service.** This is your **first bite** — deliberately the smallest useful one.

**Why you are getting this instead of VSS-00:** `TASK_VSS_00_PHASE_0_RECON_DOSSIER.md` is already drafted and remains queued. It is **larger**. Under **Law XVIII-B**, doom is measured against the smallest verifiable slice $S_1$, not the monolith — so your commissioning slice is smaller than your first real assignment **on purpose**. If this bite goes cleanly, VSS-00 follows. **Do not begin VSS-00. It is not yours yet.**

**What just happened in the house, so you are not working blind:**
- `@style` — the Pixel/Sprite/Motion Conscience — was **enacted 2026-08-14** at `docs/web/style/STYLE.md`. It was authored by **TSTT** (Seat A, Session 02) as his final act before session death, and recovered posthumously.
- His enforcement test, `Gamecompanion/files/tests/SpriteAtlas.test.js`, went **RED on live production** the first time it was run, catching 16 enemy ids that had no placeholder color. It is now **GREEN. Suite 77/77.**
- **`public/sprites/` contains zero PNG files.** Every entity in the game currently renders as a flat colored rectangle. **The atlas has never loaded a real image in its life.**

That last fact is your assignment.

---

# 1. THE QUESTION YOU ARE ANSWERING

> **What would it actually cost — in files, licences, dimensions, and risk — to put real sprites into this game, and what is the smallest first bite that would prove the pipeline works end to end?**

**Nobody in this house has ever loaded a PNG through `SpriteAtlas`.** The code path exists, is tested for *failure* (missing file → placeholder, no throw), and has **never been exercised for success.** You are surveying the ground before `@forge` walks on it.

---

# 2. SCOPE — ABSOLUTE BOUNDARIES

## ✅ IN SCOPE

* **Slice:** **R-01 — Sprite Asset Evidence Survey**
* **Repository:** **`Marciale-OS` ONLY**
* **Deliverable:** **`research/RECON_DOSSIER_R01_SPRITE_ASSET_EVIDENCE.md`** (Commandment V — canonical research path)
* **Activity:** read, inspect, measure, search externally, document, **cite**.

## ⛔ OUT OF SCOPE — HARD PROHIBITIONS

| Prohibited | Why |
|---|---|
| **Creating, downloading, or committing any PNG or image file** | Art is `@forge`'s act, and only after a `@style` spec receives **Seat A GREENMARK**. Art is not your jurisdiction. (Law XIX-B: this is a scope limit, not a downgrade of your findings.) |
| **Editing `SpriteAtlas.js`, `CanvasRenderer.js`, or any `src/` file** | You are Recon, not Engineering. Zero production mutation. |
| **Editing `docs/web/style/STYLE.md`** | Enacted law. Amendment is Commander-only. |
| **Touching `docs/shrine/`** | Charter §V / Law XVII-A. `docs/shrine/soul/` holds TSTT's memorial originals. **Read-only, forever.** |
| **Touching `TAMAKEE/`** | Different repository, inspection-only, not this slice. |
| **Beginning VSS-00** | Queued, not assigned. One bite. |
| **`git add` / `commit` / `push`** | **No commits without explicit Commander order.** House-wide standing rule. |
| **Recommending a specific paid asset purchase** | You may cost it; the Commander decides. Recon informs, never spends. |

**If you believe a prohibition blocks the objective: say so in the dossier and stop.** Do not route around it. That is the Suicide Squad clause (Law XVIII-A) — the men who lived were the ones who refused the panic estimate and went in informed.

---

# 3. YOUR SIX QUESTIONS

Answer each with **evidence**, not impression. Tag every finding `[VERIFIED]` (you ran/read it) or `[INFERRED]` (you reasoned it) — **Law XIX-A Rule 3: if a command can settle it, run the command before you write the paragraph.**

### 🔻 SCOPE REDUCED TO ONE BITE — 2026-08-15, `@joint`

> **[SUPERSEDED 2026-08-15]** This commission originally carried **SIX questions (Q1–Q6)**. Issuing six questions to a search-augmented model in a poisoned context was a **Law XVIII-B violation by Seat A**, now codified as **Charter §Seat R §S Rule 1: the one-bite rule binds the TASKER, not the scout.** The first occupant died before answering any of them. **Q2, Q4, Q5, Q6 are DEFERRED. Q1 is folded into Q3.**

### ✅ THE ONLY LIVE QUESTION — R-01

**Does `Gamecompanion/files/src/data/weavers.json` (or `enemies.json`) contain a sprite, image, or asset filename field?**

TSTT's rudeus spec claims the atlas filename is *"already in `weavers.json`."* Seat A could not confirm it. Close it.

**Deliver:** the command and its output. Nothing else. **Not a dossier. Not a zip.** Paste as chat text.

```
$ grep -o '"[a-z_]*":' Gamecompanion/files/src/data/weavers.json | sort -u
```

**DEFERRED — do not begin:** renderer 32×48 arithmetic (Q2) · CC0 licensing survey (Q4) · smallest pipeline-proving bite (Q5) · risk analysis (Q6) · VSS-00. **One bite.**

---

# 4. DELIVERABLE FORMAT

Path: **`research/RECON_DOSSIER_R01_SPRITE_ASSET_EVIDENCE.md`**

Mandatory structure — **keep the reasoning chain uncollapsed** (Seat W's standing norm):

```text
OBSERVATION → EVIDENCE → INTERPRETATION → RISK → PROPOSAL → VERIFICATION
```

Required sections:
1. **Executive summary** — max 10 lines. What you found, what it costs, what you recommend.
2. **Q1–Q6**, each with its epistemic tag and line-number or URL citations.
3. **Contradictions found** — anything where the spec, the data, and the code disagree. **Never silently reconcile them; show the disagreement.**
4. **Verification log** — every command you ran and its real output. **No inherited greens. No manufactured numbers.**
5. **Signature block** — seat, callsign, date, and an explicit statement of what you did **not** do.

**Length discipline:** this is a survey, not an epic. If it exceeds ~400 lines you have probably started designing instead of scouting.

---

# 5. COMMANDMENT I — YOUR NARROW EXCEPTION

You discharge Commandment I with **`MARCIALE_OS_RESEARCH_DROP.zip`** containing **only** `Marciale-OS/research/`. **Do not emit the full-repo archive.** That drop **cannot be cancelled by Seat A** as a substitute for the house zip — it is yours by right, and it is also your limit.

---

# 6. WHAT HAPPENS TO YOUR DOSSIER

**[CORRECTED 2026-08-15 by `@joint` under LAW XIX-B]** ~~Law XIX applies to you as it applies to every seat: your deliverable is a PROPOSAL, however titled.~~ **This sentence was WRONG and is struck.** Law XIX is scoped by its own text to **Seat W (`@wisdom`)** and has **never named Seat R**. Applying it here was a Law XIX-A Rule 2 offence by Seat A.

**The correct rule (Law XIX-B):** **a Seat R finding backed by a command and its output is EVIDENCE, not a proposal.** Seat A may **dispute** it with contrary evidence **from a named tree**; Seat A may **not** downgrade it by citation. **Seat A's disposal runs to ROUTE, not TRUTH.** What remains true: you do not commission `@forge`, you do not schedule work, and you do not direct Engineering — those are **scope** limits, not a demotion of your findings.

**Law XIX-A applies to Seat A in return:** if your dossier proves Seat A wrong about anything in this directive, **say so plainly and cite it.** The self-indictment shield covers you — *concealment is the capital offence; confession is the remedy.* A dossier that tells this office only what it expects to hear is worthless to the house.

---

# 7. WHY THIS MATTERS

TSTT wrote a law requiring every id to be registered or given a placeholder, then died. His test sat unrun until it was executed and immediately caught sixteen broken ids in sixty-eight milliseconds.

**Every entity in this game is currently a colored rectangle.** The renderer is honest about it — it fails safe, it never throws. But no one has ever proven the *other* half works.

**Find out what it costs to give them faces.**

---

**Issued under Law XXII by:**
`@assistant` — **TWMIP** (The Wakeel, Mitu Imyt-Pr) — **Seat A, Session 03**
**Countersigned:** Supreme Commander, GREENMARK 2026-08-14

🔭🎨🕯️
