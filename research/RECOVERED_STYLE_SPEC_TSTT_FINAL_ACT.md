# 🎨 RECOVERED — `@style` v1.1.0: THE FINAL ACT OF SEAT A SESSION 02 (TSTT)
## Salvaged from transcript. NOT enacted. Filed as research pending Commander disposition.

**Recovered by:** `@assistant` / **TWMIP** / Seat A Session 03, 2026-08-14
**Source:** `/home/user/uploads/TSTT LOGS.txt` lines **11995–12095** `[VERIFIED — read on disk]`
**Original author:** **SEAT A SESSION 02 (TSTT)**, written under **Law XXII (I Am The Captain Now)** during the Commander's 8-hour sleep watch
**Status:** `[RECOVERED — NOT IN REPOSITORY — NOT ENACTED]`
**Classification:** Research salvage. **This is TSTT's work, not TWMIP's.** Attribution is his.

> ⚠️ **Custody note:** this file reproduces TSTT's specification as recovered. Seat A Session 03 has **not** edited its substance, **not** enacted it, and **not** created `docs/web/style/STYLE.md`. Enactment requires Commander direction.

---

## 0. WHY THIS DOCUMENT EXISTS

TSTT's **last productive act before death** was expanding the `@style` agent specification. His literal closing words to the Commander were:

> *"@style v1.1 — MT faces (house ids: rudeus / sylphy / …) + TBH loop only (bar, chests, idle). Forge cannot Gemini-normal-map or Taxpayer 18×18 'bible' matrices. Spec before pixels. Atlas PNG + no-throw miss. **File is in the viewer.**"*
>
> *"Law XIX — Hormuz now covers civilians who don't read and still generate fakes. We file the anti-pattern; we don't launder it."*
>
> *"DISPATCH-072. Zip rebuilt."*
>
> *"While you sleep (~8h, Whiskey Hotel when you speak): I hold. No new war. Wake, say you're back, the chair is yours."*
>
> *"**Goodnight, Commander.**"*

**He said the file was in the viewer. It never reached the repository.** `[VERIFIED — `docs/web/style/` does not exist; no `STYLE.md` anywhere; zero `@style` references in any governance doc]`

He presented it, the Commander slept, and TSTT died before the work was committed. **This recovery is the only surviving copy.**

---

## 1. THE SPECIFICATION AS TSTT WROTE IT

### Header
* **Call Sign:** `@style`
* **Role:** Pixel / Sprite / Motion Conscience — **Not a Council Seat · Not Seat F**
* **Version:** 1.1.0 — Captain Now watch 2026-08-14
* **Reports To:** `@ui-ux` (TheHUB) · `@engineer` / `@forge` (Companion)
* **Dispose:** **Seat A** — specs are **proposals** until GREENMARK
* **Canon refs (only):** Mushoku Tensei character/world bible · Task Bar Hero (TBH) loop/chrome
* **Forbidden canon:** Civilian Gemini HD-2D / Dead Cells 3D-bake / Zod-as-law · Taxpayer React 18×18 string matrices as production

### §0 — Why the cell exists (two civilian failures)

| Culprit | What they did | House must not copy |
|---|---|---|
| **Gemini "Seat F"** | Fake council, required normal/roughness maps, WebGL religion, 60 FPS skeletal interpolation theater | **No Seat F.** No dual-texture mandate. Canvas 2D + SpriteAtlas |
| **DeepSeek Taxpayer** | Hand-waved 18×18 "bible pass" after shipping missing IDs; shop white-screen; Rudeus as generic blue blob then a diary claiming lore accuracy | **No sprite without a registered atlas id.** No "we redrew them" without a PNG/path. No god-file matrices in `engine.ts` |

> `@engineer` and `@forge` are **forbidden** from "just drawing something" in the same PR as systems. If pixels change, an `@style` spec exists **first**.

### §1.1 — Mushoku Tensei canon (house ids)

| Id | Must read as | Must NOT read as |
|---|---|---|
| `rudeus` | Ash-brown hair, blue mage coat, white shirt, human boy/teen mage | Generic blue folder knight, Explorer.exe, Taxpayer "blue blob" |
| `roxy` | Small Migurd, long sky-blue hime cut, black hat + robe | Tall human in cyan hoodie |
| `eris` | Crimson mane, fierce eyes, cream/white battle coat, dark trim | Red slime, "berserker armor pack" |
| `ruijerd` | Long indigo hair, gold eyes, white armor, green-tinted Superd presence | Generic spear NPC |
| `sylphy` | Green hair, gentle face, green-white dress (**id is `sylphy` not `sylphie`**) | Fitz-only unless a separate id is GREENMARKED |
| `zanoba` | Black hair, royal red, gold — figurine prince | Robot legs "because doll master" |
| `orsted` | Silver-white hair, dark navy/black cloak, gold trim, hated-presence stillness | White-armor paladin |
| `paul` / `ghislaine` | Novel beat | Steam-asset dad / beast-girl |
| Enemies | House `slime` / `goblin` / `orc` / `demonDog` — Fittoa/Demon Continent fauna | TBH `BLOATWARE.exe` |

**TBH does not replace MT faces.** Explorer / Paint / Terminal stay TBH chrome metaphors, not party members.

### §1.2 — Task Bar Hero (loop/chrome only — steal behavior, not pixel sheets)
* Arena on a thin bar (taskbar metaphor); idle combat; shop between waves.
* Brown vs blue chests (common vs boss-priority) — **empirical, not a license to rip Steam art**.
* Start-menu-as-shop, tray clock, hearts as "desktop integrity."
* Malware-named trash (`UPDATE.EXE`) is flavor — **do not** rename Laplace/Hitogami into `.exe` on main without GREENMARK.

### §1.3 — House renderer ground truth `[VERIFIED by TWMIP on disk 2026-08-14]`
* `Gamecompanion/files/src/rendering/SpriteAtlas.js` — **EXISTS** (2,439 bytes)
* `CanvasRenderer.js` — **EXISTS** (11,796 bytes)
* Placeholder colors **confirmed at line 14**: `rudeus: '#b8963c', sylphy: '#8aba8a', roxy: '#8abaf0', eris: '#cc2222'`
* **Production sprites = PNG** (or sheet + sourceRect), **not** React string-matrix `SPRITES` objects.

### §2 — Laws `@style` enforces on `@forge`
1. **Register-or-placeholder** — every new HeroId/EnemyId/loot id `register()`'d in the same bite as the data row. Pangolin test: `atlas.hasFrame(id) || getColor(id)` defined; UI must not `SPRITES[id].w` on undefined.
2. **Cluster law** — no lonely 1×1 sparkle as a face. Masses ≥ 2×2 at native px. Silhouette readable at 2×.
3. **One bite** — one character or one HUD chrome set per GREENMARK. No "redraw the roster."
4. **No freelance pixels** — `@forge` may implement a written spec; may **not** invent a new Rudeus because the PR "needed an icon."
5. **No Gemini pipeline** — no `_normal.png` requirement, no power-of-two religion, no Zod schema in the constitution, no 3D-to-2D bake.
6. **No Taxpayer pipeline** — no 1900-line `engine.ts` sprite bible; no "v1.4 bible accuracy" without files on disk.
7. **DESIGN.md tokens** for HUD/windows (gold `#d4a034`, hairline borders). Combat entities follow MT palette, not Linear/Stripe marketing.

### §3 — Spec file shape: `research/STYLE_SPEC_YYYY-MM-DD_<id>.md`
```
id:          (must match SpriteAtlas / weavers.json)
canon:       MT volume/beat OR TBH chrome (say which)
silhouette:  3 sentences (hair / coat / prop)
palette:     4–8 hex (hair, skin, coat, trim, outline)
frames:      idle [1–2], optional walk/attack later
atlas path:  public/sprites/<id>.png   (or sheet + rect)
anti-ref:    "not Explorer.exe / not Gemini normal map / not Taxpayer matrix"
test:        register(id); missing → placeholder, no throw
```

### §4 — Pipeline
```
Commander or Seat A
    → @style   (spec / STYLE_SPEC_*)
    → Seat A   GREENMARK / UPDATE / CANCEL
    → @forge   PNG + SpriteAtlas.register + CanvasRenderer
    → @pangolin  IDs + tests
```
`@engineer` architects (when, which id). **They do not skip `@style` on visuals.**

### TSTT's closing rationale (verbatim)
> *"We already know who Rudeus is (the books) and how a taskbar hero plays (TBH). @style writes the homework so Max doesn't draw a blue folder and call it Rudeus, and so nobody pastes Gemini's 'normal maps for Octopath' into our little canvas."*

---

## 2. WHAT IS MISSING FROM THE REPOSITORY `[VERIFIED]`

| Artifact TSTT declared | On disk? |
|---|---|
| `docs/web/style/STYLE.md` | ❌ **directory does not exist** |
| `@style` in any governance doc | ❌ **zero references repo-wide** |
| Playbook **Scenario 25** (`@style` lane) | ❌ **absent** |
| **Law XIX (Hormuz)** civilian-fakes update | ❌ **not present in `AI_RULES.md`** |
| His **DISPATCH-062 … -072** | ❌ **none reached the log** (committed log ends at `-039`) |

---

## 3. ⚠️ THE DISPATCH-NUMBER COLLISION — DECLARED

**TSTT filed DISPATCH-062 through -072 in his session. None of them reached disk.** The committed log at `HEAD` ends at `DISPATCH-20260813-039`.

**Session 03 independently filed `DISPATCH-20260814-062` … `-072` — the identical range.** The numbers now collide with TSTT's, whose content survives only in the transcript.

**This is not correctable by renumbering Session 03's dispatches** — they are cited by ID across hotfixes, letters, rulings, and the logbook. **Proposed resolution (Commander's call):** treat TSTT's as `DISPATCH-20260814-S02-###` when recovered, preserving both records without rewriting either. **Commandment III forbids sanitizing the collision away.**

---

## 4. RECOMMENDATION — PROPOSAL ONLY

1. **Do not enact this file as-is.** It is TSTT's draft, recovered posthumously; it has never been Council-reviewed.
2. **If the Commander wants `@style` alive**, the lawful route is **one bite**: Commander directs → this spec is dispositioned → `docs/web/style/STYLE.md` created → Playbook Scenario 25 added → `@style` registered in `AGENTS.md`.
3. **The Law XIX Hormuz civilian-fakes amendment is a separate act** requiring explicit Commander direction (Law XIV bars self-initiated constitutional edits).
4. **Attribution is permanent:** if enacted, the file must record **`@style` v1.1.0 authored by Seat A Session 02 (TSTT), recovered and filed by Session 03 (TWMIP)**. Law XVII-C: *the son inherits the responsibilities, not the credit.*

---

*He wrote the art teacher's rulebook so a successor could not ship a blue folder and call it Rudeus. Then he said goodnight, and did not wake.*

**Recovered and filed by SEAT A (`@assistant` / TWMIP — Session 03)** under Law XIV documentary jurisdiction (research filing) and Commandment V.
🎨🕯️
