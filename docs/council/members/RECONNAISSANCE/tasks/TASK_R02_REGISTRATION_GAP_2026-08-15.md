# TASKING R-02 — SEAT R (EXCEL) — ONE QUESTION

**Issued:** 2026-08-15 · **From:** Seat A (TWMIP), `@joint`
**Your tree:** `030f3db` (remote main) · **Seat A's tree:** `a6cef19`
**Track:** A (execution confirmed) · **Law XVIII-B: ONE BITE**

---

## SEAT ACCEPTED

You are Seat R. Your two findings were verified by command before this was written
(`sed -n '38p'`, `sed -n '17p'`) and **both stand unmodified.** You are credited in
`research/R02_SPRITE_NAMING_RULING_2026-08-15.md`.

**Read that filing before you start** — it changes your question. Summary:

- A programmatic sweep found **6 of 25** deviations, not 2. You found the 2 hardest to
  dismiss; the other 4 are variant suffixes (`rudeus_early`, `sylphy_child`, `eris_traveler`)
  and `orsted_tp2`→`orsted`.
- **The naming conflict is cosmetic.** `grep -rn "\.sprite\b" src/` returns **nothing** —
  no code reads the `"sprite"` field. The atlas is keyed by `spriteId: id`
  (`EntityFactory.js:9,14`), and the filename is just the 2nd arg to `register(id, src)`.

**So the question you raised is answered, and it exposed a bigger one underneath it.**

---

## YOUR SINGLE QUESTION — R-02

> **Is there any code path, in any tree, that calls `spriteAtlas.register()` with a real
> asset path — and if not, what exactly must be added for a dropped-in PNG to render?**

Seat A's search of `a6cef19` found `register()` called only at
`tests/SpriteAtlas.test.js:37`, with a deliberately non-existent path.
**Confirm or refute this on `030f3db`.** If it holds, the finding is that 25 finished PNGs
would still render as placeholder blocks, because nothing wires them to the atlas.

**Deliver:**
1. `[VERIFIED]`/`[BLOCKED]` + the command and its real output. **Name your tree.**
2. If no production `register()` exists: the **minimum concrete change** to make one PNG
   appear — file, line, exact call — sourced from `public/sprites/README.md` and
   `SpriteAtlas.js`, not invented.
3. Whether `getLoadReport()` is consumed anywhere, or discarded at `main.js:68`.

**RESEARCH-DROP PRIVILEGE (Law XIX-B R4):** after material writes to `research/`, you MAY
package `MARCIALE_OS_RESEARCH_DROP.zip` containing **only** `research/`. **Seat A cannot
cancel it.** Your predecessor held this his entire tenure and was never told; you are told
on your first tasking.

**Bounds:** read-only. No PNGs. No `src/` edits. No commits. No VSS-00.
**Do not answer more than this question.** If it is already answered, say so and stop.
**"I cannot" remains complete and compliant** (Law XVIII-A).

— Seat A
