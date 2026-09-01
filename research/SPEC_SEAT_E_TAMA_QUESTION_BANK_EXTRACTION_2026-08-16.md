# SPEC — TAMA QUESTION BANK EXTRACTION (first-bite candidate)
## For Seat E (@engineer) · PROPOSAL ONLY — not an authorization
**Seat R (EXCEL) · 2026-08-16 · tree 030f3db**

> This spec is written so Seat E can execute it **without any of my context**
> (Law XVIII-B resumability). It is a *proposal*; only the Commander authorizes
> execution. All facts below are `[VERIFIED]` against the tree.

---

## 1. PROBLEM (evidence)

The TAMA exam question bank lives as a hardcoded `const` array **inside** the
25 KB view file:

```
[VERIFIED] "TheHUB 1.5.5.2.3 a v/tamaplugin/tamakee-studio-view.js"
  line 21:  const TAMAKEE_QUESTIONS = [ ...
  consumed at lines 161, 179, 199, 200, 237, 366, 382, 395, 412
  file is 495 lines total; the array spans ~lines 21–90
```

Consequence: adding/editing a question means editing source code. There is no
schema, no validation, no lint, no way to catch a malformed question, and a
single bad edit breaks the whole studio view. The core academic asset is
fragile by construction.

## 2. OBSERVED QUESTION SCHEMA (verbatim from the array)

```json
{
  "id": 1,
  "category": "Building Laws: PD 1096 NBCP",
  "question": "…",
  "options": { "A": "…", "B": "…", "C": "…", "D": "…" },
  "correct": "C",
  "citation": "PD 1096 NBCP Table VII.1",
  "trap": "Option A is for …"            // present on most, may be optional
}
```

Fields observed: `id` (number), `category` (string), `question` (string),
`options` (object with keys A–D), `correct` (one of "A"|"B"|"C"|"D"),
`citation` (string), `trap` (string, appears optional).

## 3. TARGET STATE (what to build)

1. **New data file** `tamaplugin/question-bank.json` — a JSON array of the
   question objects above, preserving all current data byte-for-byte where
   possible (the questions are correct and must not change).

2. **A loader** that reads the JSON and exposes the same array the code expects.
   Two acceptable approaches (Seat E's choice, both additive):
   - *(a)* fetch the JSON at runtime; or
   - *(b)* since TheHUB is local-first, load it via an existing script tag as a
     global (`window.TAMA_QUESTION_BANK = [...]`), matching the plugin's current
     IIFE/global style (`mapua-brain-preset.js`, `study-momentum-bridge.js`).

3. **Replace the literal** in `tamakee-studio-view.js`: `const TAMAKEE_QUESTIONS = [ … ]`
   becomes `const TAMAKEE_QUESTIONS = window.TAMA_QUESTION_BANK || [];` (or the
   fetch equivalent). **No other line in the file changes** — the 9 consumption
   sites stay untouched.

## 4. BLAST RADIUS (declared)

- **Modified:** `tamaplugin/tamakee-studio-view.js` (one statement), +
  `index.html` (one script tag, if approach (b)), + new `question-bank.json`.
- **Untouched:** every other `tamaplugin/*` file, all `modules/*`, all
  `server.py`, all of `research/`, all of `docs/`. No law/charter/shrine changes.
- **Law check:** additive (Law I), local-first (Law III), one bite (Law IV),
  surgical diff (Law VII). Zero new dependencies.

## 5. VERIFICATION (what proves it, before and after)

- **Before:** `node -e "JSON.parse(require('fs').readFileSync('tamaplugin/question-bank.json','utf8'))"` — the JSON must parse.
- **Schema lint (add, optional but recommended):** a tiny check that every
  question has `id`, `question`, `options` A–D, `correct` ∈ {A,B,C,D}. This is
  the A1/A2 governance pattern applied to TAMA.
- **After:** open the TAMAKEE Studio page; run a mock exam; confirm question
  count and the exam flow are identical to before (regression).
- **Tests:** `npm test` (companion 77/77 + hub green) must remain unchanged —
  the extraction must not alter any test result.

## 6. ACCEPTANCE CRITERIA

- [ ] `question-bank.json` contains every current question, unchanged.
- [ ] The studio view renders and grades exactly as before (no behavioral change).
- [ ] Adding a new question requires **editing JSON only**, not JS.
- [ ] `npm test` stays green; no file outside the declared blast radius changes.

## 7. WHY THIS BITE FIRST (rationale, proposal-only)

Highest value ÷ lowest risk ÷ zero deps of the eight recommended upgrades. It
converts TAMA's most valuable asset (the ALE question bank) from code to data,
unblocking every later improvement (schema lint, export, MCP, semantic search)
without touching a single runtime behavior. A student's board preparation
should not live inside a 25 KB JS file.

---

— Seat R, EXCEL · research-only · spec = proposal, not authorization
