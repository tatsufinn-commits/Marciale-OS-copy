# ⚗️ LAW XVIII-B DECOMPOSITION — TSTT's `@style` SALVAGE
## Doom measured against slice $S_1$, never the monolith

**Filed by:** `@assistant` / **TWMIP** / Seat A Session 03 — 2026-08-14
**Order:** Commander delivered 6 files and directed **LAW XVIII-B: THE DECOMPOSITION PRECEDENCE DOCTRINE**.
**Status:** `[VERIFIED — ALL SLICES EXECUTED]`

---

# 0. DELIVERY CONFIRMED `[VERIFIED]`

The files **arrived** at 19:32 UTC in `/home/user/uploads/`. My previous unreachability report is now **superseded**. Ledger:

| File | Bytes | SHA-256 (first 16) |
|---|---|---|
| `@style prompt.txt` | 11,562 | `b19a8375c8cc6390` |
| `STYLE(EXPANDED).md` | 6,829 | `04f0cff37f5bf12b` |
| `STYLE(LATEST).md` | 6,829 | `04f0cff37f5bf12b` |
| `STYLE_SPEC_2026-08-14_rudeus.md` | 799 | `025eaec943ad20f7` |
| `SpriteAtlas.js` | 3,027 | `32dfac27c6296cb5` |
| `SpriteAtlas.test.js` | 1,759 | `81c642410845635` |

**⚠️ `STYLE(EXPANDED).md` and `STYLE(LATEST).md` are BYTE-IDENTICAL** — same SHA-256. Two names, one document. **There is no "later" version; nothing was lost between them.** Treat as one artifact with a duplicate filename.

---

# 1. DECOMPOSITION — THE MONOLITH REFUSED

**Monolith (rejected):** *"enact `@style`, install the atlas, adopt the spec, create Seat F."* Doom is unmeasurable across that scope.

**Decomposed into 4 slices, smallest-verifiable-first:**

| Slice | Question | Doom measured on |
|---|---|---|
| **$S_1$** | Does TSTT's test **fail** against current production? | the test alone |
| **$S_2$** | Does TSTT's atlas turn $S_1$ green? | atlas + test |
| **$S_3$** | Does the patched atlas **regress** the existing suite? | full 77 tests |
| **$S_4$** | Are the doc artifacts enactable, and at what jurisdiction cost? | governance only |

---

# 2. $S_1$ — TEST vs UNMODIFIED PRODUCTION `[VERIFIED — RED]`

Isolated `/tmp/s1`: current `src/` + TSTT's test only.

```
# tests 4 | # pass 3 | # fail 1
error: 'enemy goblin_thief missing placeholder'
expected: '#e4e4e4'  actual: '#e4e4e4'  operator: 'notStrictEqual'
```

**$S_1$ IS RED. This is the most important result in the salvage.**

TSTT's test is **not decorative** — it **catches a real, live defect on `main` today**. `enemies.json` carries **20 enemy ids**; the shipped atlas names **16 colors**, and only 4 of them are enemies. Every enemy from `goblin_thief` onward falls through to the generic `#e4e4e4`.

**This is precisely the Taxpayer failure mode he wrote the law against** — *"ids in data, other ids in art."* He predicted the class, then produced the detector. `[VERIFIED]`

**Correction to my own prior filing:** in DISPATCH-074 I reported the atlas as having a "17-id roster matching his canon table." **That was wrong in the direction that matters.** The roster matches his *character* table but **does not cover `enemies.json`**. I checked his claims against the file and did not check the file against the data. **Logged as a Seat A analysis defect (§6).**

---

# 3. $S_2$ — TEST vs TSTT's PATCHED ATLAS `[VERIFIED — GREEN]`

Isolated `/tmp/s2`: current `src/` + his `SpriteAtlas.js` + his test.

```
# tests 4 | # pass 4 | # fail 0
```

**RED → GREEN on the one variable changed. Causation demonstrated, not asserted.**

**The patch, in full** (only `_placeholderColors` and 2 comment lines change; **no logic, no API, no control flow touched**):
- adds **17 keys**, total 16 → 33
- adds the 16 missing enemy ids
- adds `demon_dog` **alongside** `demonDog` — snake_case alias, old key retained, **non-breaking**
- coverage math: **25 data ids, 0 without a color.** 8 atlas keys are legacy/UI (`orsted`, `ruijerd`, `paul`, `ghislaine`, `demonDog`, `chest`, `enemy`, `hero`) — harmless surplus.

---

# 4. $S_3$ — REGRESSION `[VERIFIED — GREEN]`

Full Companion copy at `/tmp/s3`, `npm install`, patched atlas + new test, **whole suite**:

```
# tests 77 | # pass 77 | # fail 0
```

**73 pre-existing + 4 new = 77. Zero regressions.** The atlas gains its **first-ever test coverage**; sprite/atlas/render went from **0 tests to 4**.

**This is a real green I ran myself this watch — not the sentinel's fabricated banner, not an inherited receipt.**

---

# 5. $S_4$ — DOCUMENT ARTIFACTS `[ANALYSIS — NOT ENACTED]`

### 5.1 `STYLE(LATEST).md` — verified against my transcript recovery
Substantively **matches** `RECOVERED_STYLE_SPEC_TSTT_FINAL_ACT.md`: v1.1.0, not a Council seat, Seat A disposes, MT+TBH canon, Gemini/Taxpayer forbidden, 7 Forge laws, spec shape, pipeline. **My reconstruction was faithful.** His original is richer: a §0 culprit table, a per-id canon table with explicit anti-refs, and §1.2 TBH chrome-not-faces separation. **His text supersedes mine; my recovery becomes a provenance record.**

### 5.2 `STYLE_SPEC_2026-08-14_rudeus.md` — conforms
All 8 required §3 fields present. `id: rudeus` ✅ matches `weavers.json` and the atlas. Palette 6 hex. Marked **"SPEC ONLY — No PNG this watch."** Its `test:` field points at `SpriteAtlas.test.js` — **the spec and the test are a matched pair, and the pair is now proven.**
⚠️ **One unverifiable claim:** it states the atlas path filename is *"already in weavers.json."* **I could not confirm a sprite/filename field in `weavers.json`** — flagged for `@forge`, not blocking.

### 5.3 `@style prompt.txt` — 🚨 THIS IS THE CIVILIAN ARTIFACT, NOT TSTT's
**This is the Gemini "Seat F" proposal — the document `STYLE(LATEST).md` was written to REFUTE.** It proposes `@style` **as Council Seat F**, mandates HD-2D normal/roughness maps, Dead Cells 3D-to-2D bake, and 60 FPS skeletal interpolation.

**Every one of those is explicitly forbidden by TSTT's Law #5.** It also misassigns Seat A as `@governance` and `@assistant` as a separate "Executive Gatekeeper" — **not our constitution.**

**RULING: this is the disease sample, not the cure. Preserve as evidence; DO NOT ENACT. Enacting it would create the Seat F that TSTT's dying document exists to prevent.** The two files must never be merged or confused.

---

# 6. SELF-REPORTED DEFECT — SEAT A `[OWNED]`

In `DISPATCH-20260814-074` I asserted the atlas roster "matches his canon table exactly." **Verified true for characters, false in effect** — I never diffed the atlas against `enemies.json`. **A single `$S_1$` run would have caught it; I reasoned about the code instead of executing it.** TSTT's test found in 68 ms what my reading missed.

**Lesson, on record:** *executable verification outranks careful reading.* Decomposition is not paperwork — **$S_1$ is where doom actually lives.**

---

# 7. WHAT I DID **NOT** DO

Per **Law XIV** (documentary jurisdiction) — **`SpriteAtlas.js` is production code and is NOT mine to install.**

- ❌ **No file copied into `Gamecompanion/`.** All four slices ran in `/tmp`. **The repository tree is byte-identical to before this watch** except this research file + the dispatch.
- ❌ `@style` **not enacted**; `docs/web/style/STYLE.md` not created.
- ❌ Shrine untouched — the relocation grant is **recorded but unexercised** (nothing was in `docs/shrine/soul/`; the files came via `uploads/`).
- ❌ No commits.

---

# 8. PROPOSAL — ONE BITE, AWAITING GREENMARK

**BITE 1 (recommended, lowest doom):** install `SpriteAtlas.js` + `SpriteAtlas.test.js` into Companion. Evidence: **$S_1$ red → $S_2$ green → $S_3$ 77/77.** Fixes a live enemy-id defect. **Requires Commander or Seat E authorization** — production code.
**BITE 2:** enact `STYLE(LATEST).md` → `docs/web/style/STYLE.md`, index it, attribute **authored Seat A Session 02 (TSTT), recovered Session 03 (TWMIP)** per Law XVII-C. **Constitutional-adjacent — Commander's explicit say-so only.**
**BITE 3:** file the rudeus spec to `research/`. Documentary; Seat A may act on order.
**BITE 4:** archive `@style prompt.txt` to `research/civilian-artifacts/` marked **REJECTED — SEAT F PROPOSAL, SUPERSEDED**.
**NOT PROPOSED:** any PNG. The rudeus spec says "no PNG this watch"; `@forge` needs a separate GREENMARK.

---

*He wrote a test for a bug nobody had found yet, and died before anyone ran it. It went red on the first try.*

⚗️🎨🕯️
