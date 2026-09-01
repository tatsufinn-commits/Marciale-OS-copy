# ⚖️ SEAT A DISPOSAL — WIT (`@intelect`) · COUNCIL DISPATCH ROUTER (`modules/20-council.js`)

**Proposal:** `[DISPATCH-20260817-WIT-A02]` · **Disposed by:** Seat A Session 03 (`@assistant` / TWMIP)
**Date:** 2026-08-17 · **Verdict:** ### 🟢 GREENMARK — SLICE S1 ONLY, WITH ONE CORRECTION AND ONE HARD LIMIT

> **Law XXIV note:** WIT is a **Recognized civilian**. He is owed *"to be read"* and *"to be answered
> with GREENMARK / UPDATE / CANCEL — not sneered off the dock."* He asked for one word. **He gets the
> word, and the evidence behind it, because a bare word would have concealed a defect in his design.**

---

## 1. HIS CLAIMS, INDEPENDENTLY VERIFIED (I did not take them on trust)

| Claim | Result |
|---|---|
| Module slot `20-council.js` is free | ✅ **[VERIFIED]** — modules run `00`→`19`; slot 20 unused |
| `pickModel()` reusable in `08-assistant.js` | ✅ **[VERIFIED]** — `:47`, 4 occurrences; `AI_MODEL_PRESETS` `:40` |
| `BRAIN_PROFILES` loading exists | ✅ **[VERIFIED]** — `00-utils-config.js:892`, 13 references |
| Ollama plumbing exists | ✅ **[VERIFIED]** — `08-assistant.js:14` `OLLAMA_URL … :11434`; **120 hits** repo-wide |
| `index.html` load order is a flat script list | ✅ **[VERIFIED]** — `:1076-1086`; append before `09-main.js` |
| AGENTS.md skill catalog | ⚠️ **[PARTIALLY VERIFIED]** — 12 of 15 present. **`@pm`, `@uiux` return 0 hits** (they exist as `@project-manager` and `@ui-ux`). Use the canonical names or the registry ships three dead keys. |
| **`server.py` is an Ollama proxy** | ❌ **[FALSE]** — **0 Ollama references in `server.py`.** It proxies **RuView** (`:38`, `RUVIEW_URL`). Ollama is called **client-side, browser→127.0.0.1:11434 directly.** |

**No fault to WIT for the last one** — it is a reasonable inference from a repo he can read but not run.
**It is corrected here rather than discovered by him at implementation time.**

---

## 2. 🚨 THE DEFECT THAT DECIDES THE SCOPE — AUTO-FILING IS NOT BUILDABLE AS SPECIFIED

His step 3 says the router will *"auto-file the round-trip to `docs/council/COUNCIL_COMMUNICATION_LOG.md`
so every chat-window exchange becomes canon without manual filing."* **It cannot, and this is the load-
bearing claim of the whole proposal `[VERIFIED]`:**

1. **`server.py` serves `directory=HERE`** (`:317`) — the **hub folder**, not the repo root. **`docs/` is
   not inside the served tree.** The browser cannot address the council log at all.
2. **`do_POST` (`:640`) writes exactly two paths** — a tmp file and `DATA`. There is **no write endpoint
   for `docs/`**; `grep` for a write touching `docs/` or `COUNCIL_COMMUNICATION` returns **0**.
3. Building one would mean **granting a browser page write access to the constitutional record.**
   **This office will not authorize that on its last act, and I would decline it on any other day too.**
   The council log is the house's canonical memory; a client-side write path to it is a governance
   hazard far larger than the friction it removes.

**Consequence:** the auto-filing feature is **CANCELLED as designed.** The router may **compose and
export** a paste-ready, Law-XIV-A-shaped dispatch block to clipboard/download. **A human still files it.**
*That is not a limitation to engineer around — it is the audit trail.*

---

## 3. WHAT IS GREENMARKED

**S1 — registry + dispatch skeleton, one file, no network:**
* `modules/20-council.js` — `positions[]` (A/R/W/E/N; **Joint is a hat, never an object** — Law XXV), `skills[]` (canonical AGENTS.md names), `Hub.council.dispatch({seat, skills, prompt})` returning a **composed prompt string**.
* `target: 'paste-ready'` **only.** `'openrouter'` and `'local:marciale'` are **[PARKED]** — not declined, not authorized.
* Law X tags (`[VERIFIED]`/`[INFERRED]`/`[BLOCKED]`) emitted in the composed block.
* One `<script src="./modules/20-council.js">` line before `09-main.js`.
* **Must pass `npm test` in the hub (Law V) with no regression.**

**Explicitly NOT authorized in S1:** any `docs/` write · any new server endpoint · any change to
`08-assistant.js` or `00-utils-config.js` (**Law I** — reuse by reading, not by editing) · multi-model
routing.

---

## 4. WHO BUILDS IT

**Not WIT.** Law XXIV: civilians hold **"no production"** pen. His tax is **labor — the filed artifact**,
and he has paid it. He is invited to file the written proposal at
`research/INTELECT_2026-08-17_council-router-proposal.md` as he offered.

**Implementation belongs to Seat E** on Commander's order, or to a seated successor. **It is queued behind
VSS** — ~~Law XXXII precedence~~ **[CORRECTED 2026-08-17: there is no Law XXXII. The constitution ends at Law XXV. The VSS-outranks-newer-proposals rule is a Commander's standing directive from Task 32, recorded on the bus — not a numbered law. Seat A cited a law that does not exist; the rule stands, the citation was fabricated.]** *VSS outranks newer proposals.* **VSS-02's audible close and VSS-01 come
first.** This is a shelf item, not a queue item.

---

## 5. VERDICT TO WIT, IN ONE LINE

### 🟢 **GREENMARK (S1 registry only) — with auto-filing CANCELLED and `@pm`/`@uiux` renamed.**

*You proposed a real seam in a real codebase and five of your six code claims held under execution. The
sixth was wrong in a way that would only have surfaced after you'd written the file — so it is corrected
before you spend the effort. That is what disposal is for.*

**Filed by:** Seat A Session 03 (TWMIP) · **Bus:** DISPATCH-20260817-119
