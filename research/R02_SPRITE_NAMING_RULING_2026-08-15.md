# R-02 — SPRITE NAMING CONVENTION: RULING ON THE AUTHORITATIVE KEY

**Filed:** 2026-08-15 · **Tree:** local `a6cef19` (Seat R corroborated on remote `030f3db`)
**Raised by:** Seat R (EXCEL) on assumption of seat · **Adjudicated by:** Seat A (TWMIP), `@joint`
**Status:** ✅ **RATIFIED BY THE SUPREME COMMANDER, 2026-08-15.** Binding.

---

## 1. SEAT R'S CLAIMS — BOTH CONFIRMED

Both verified by command before adjudication, per the named-tree requirement.

```
$ sed -n '38p' Gamecompanion/files/src/data/enemies.json
      "zone": "fittoa", "sprite": "boss_thorn-warden_64x64.png",
$ sed -n '17p' Gamecompanion/files/src/data/enemies.json
    { "id": "forest_troll", ... "sprite": "troll_48x52.png" },
```

**[VERIFIED]** `thorn_warden` → `boss_thorn-warden_64x64.png` — the lone hyphen in an
all-underscore dataset. **[VERIFIED]** `forest_troll` → `troll_48x52.png` — prefix dropped.
**EXCEL's finding stands unmodified.**

## 2. SEAT A'S ADDITION — THE COUNT IS 6, NOT 2

A programmatic sweep of all 25 `id`/`sprite` pairs (stem = filename minus `boss_` prefix and
`_WxH` suffix, compared to `id`):

| source | id | sprite | deviation |
|---|---|---|---|
| weavers | `rudeus` | `rudeus_early_32x48.png` | stem `rudeus_early` ≠ id |
| weavers | `sylphy` | `sylphy_child_32x48.png` | stem `sylphy_child` ≠ id |
| weavers | `eris` | `eris_traveler_32x48.png` | stem `eris_traveler` ≠ id |
| enemies | `forest_troll` | `troll_48x52.png` | stem `troll` ≠ id |
| enemies | `thorn_warden` | `boss_thorn-warden_64x64.png` | **hyphen** + stem ≠ id |
| enemies | `orsted_tp2` | `orsted_64x64.png` | stem `orsted` ≠ id |

**6 of 25 deviate.** EXCEL found 2 by eye; the other 4 are variant-suffix cases
(`_early`, `_child`, `_traveler`) that read as intentional but break the same id↔filename rule.
**Eyeball review of 25 strings is not coverage — this is why the sweep was run.**

## 3. THE DECISIVE FACT — NEITHER CONVENTION IS LOAD-BEARING

```
$ grep -rn "\.sprite\b" src/ --include=*.js | grep -v spriteId | grep -v spriteAtlas
(no output)
$ grep -rn "spriteAtlas.register" src/ --include=*.js
(no output — only tests/SpriteAtlas.test.js:37, with a deliberate 404 path)
```

**[VERIFIED] No code path reads the `"sprite"` field. It is dead data.**

What the renderer actually keys on:

```
src/entities/EntityFactory.js:9,14   spriteId: id          <- the ENTITY ID, not the filename
src/rendering/CanvasRenderer.js:87   this.spriteAtlas?.getFrame(entity.spriteId || entity.id)
```

**The atlas is keyed by bare entity id (`rudeus`, `slime`, `thorn_warden`) and the filename is
supplied as the SECOND argument to `register(id, src)` — a literal path, arbitrary.**

## 4. INTERPRETATION

The premise of the conflict was wrong. This was never "two conventions competing for
authority" — it is **one live key (`id`) and one decorative string (`sprite`) that no
loader consults.**

- `weavers.json`/`enemies.json` `"sprite"` values are a **wish-list of intended filenames**.
- `public/sprites/README.md` describes the **hand-authored `register()` call**, which is the
  only thing that ever binds a file to an id.
- **Therefore the README is procedurally correct and the JSON is advisory.**

**RISK IF UNRULED:** the danger is NOT 25 mismatched drawings. `register()` takes any path, so
a wrong filename is fixed by editing one string. **The real risk is that `register()` is never
called at all** — it currently appears nowhere in `src/`. Twenty-five perfect PNGs could be
committed and **the game would still render placeholder blocks**, because nothing wires them in.
**The naming conflict is cosmetic; the missing registration is the actual blocker.**

## 5. RULING — RATIFIED AND BINDING

1. **`id` is the atlas key. Authoritative.** Never varies.
2. **Filenames adopt README kebab-case in the sprite subfolders** — it is the only convention any
   instruction actually executes against.
3. **The `"sprite"` field is marked ADVISORY** — or deleted — so it stops reading as a contract.
4. **Blocker of record is `register()` + the discarded `getLoadReport()` at `main.js:68` (Seat E),
   not naming.**
5. Reconcile the 6 deviations only when the art is commissioned; **no data edit is needed today.**

**No file was modified in the course of this finding.**


---

## 6. RATIFICATION

**The Supreme Commander adopted this ruling in full on 2026-08-15.** It is no longer a proposal.

**Binding effect:**
1. **`id` is the atlas key.** Authoritative in all trees.
2. **Filenames follow `public/sprites/README.md` kebab-case** in the sprite subfolders.
3. **The `"sprite"` field in `weavers.json`/`enemies.json` is ADVISORY**, not a contract. It is
   read by no code. It may be annotated or removed; it may **not** be cited as a spec.
4. **The blocker of record is the missing `spriteAtlas.register()` call** (and the discarded
   `getLoadReport()` at `main.js:68`) — **Seat E's, not Seat R's, and not a naming problem.**
5. The 6 deviations are reconciled **only when art is commissioned**. **No data edit today.**

**Standing consequence:** no PNG may be commissioned on the strength of a filename in the JSON.
The registration path must exist first, or the art renders as placeholder blocks regardless.

*Ratified without amendment. Seat R (EXCEL) credited for raising it; Seat A extended the count
from 2 to 6 and identified the registration gap beneath it.*
