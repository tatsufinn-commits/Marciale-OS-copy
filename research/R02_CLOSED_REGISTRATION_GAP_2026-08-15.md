# R-02 — CLOSED BY SEAT A: THE SPRITE ATLAS IS NEVER POPULATED

**Filed:** 2026-08-15 · **Closed by:** Seat A (TWMIP), `@joint`
**Trees examined:** local `a6cef19` (grep) **and** remote `030f3db` (raw fetch, all 4 chunks)
**Status:** ✅ **CLOSED — `[VERIFIED]` ON BOTH TREES.** Seat R ran the same sweep on `030f3db`; identical negative. See §7 (Seat A scope correction) and §8 (a second Seat A error, reversed by Seat R's clean-tree report).

---

## 1. WHY SEAT A CLOSED A QUESTION HE HAD ISSUED TO SEAT R

R-02 asked whether any code path calls `spriteAtlas.register()` with a real asset path.
Answering it required reading one file on one tree. Seat A could do that with `fetch_page`
in four calls. **Sending it to Seat R would have spent a scout's finite context on a question
his superior could close himself.**

**Law XVIII-B works in both directions: do not consume a subordinate's context with work you
can discharge yourself.** The seat is now free for VSS-00, the standing commission.

## 2. THE ANSWER — `[VERIFIED]`, BOTH TREES

**Every `spriteAtlas` reference in `src/main.js` (identical on `a6cef19` and `030f3db`):**

```
$ grep -n "spriteAtlas" src/main.js
11:  import { spriteAtlas } from './rendering/SpriteAtlas.js';
58:  const renderer = new CanvasRenderer('game-canvas', spriteAtlas);
68:  await spriteAtlas.load();
```

**Three references. Import, injection, load. `register()` is never called.**

```
$ grep -rn "spriteAtlas.register\|atlas.register" src/ --include=*.js
(no output)
$ grep -rn "register(" src/ --include=*.js
src/main.js:111        screenManager.register('quests', ...)   <- ScreenManager, unrelated
src/rendering/SpriteAtlas.js:28  register(id, src, ...)        <- the definition
src/ui/ScreenManager.js:22      register(id, {render})         <- unrelated
```

**The only call in the entire repository is `tests/SpriteAtlas.test.js:37`, using a
deliberately non-existent path to exercise the fallback.**

**Remote confirmation:** `raw.githubusercontent.com/.../main/src/main.js` fetched in full
(4 chunks). `await spriteAtlas.load();` appears once, on the line after the eventBus wiring.
**No `register()` precedes it. No `register()` follows it. The remote matches local exactly.**

## 3. CONSEQUENCE — THE ATLAS LOADS AN EMPTY FRAME MAP

`SpriteAtlas.load()` iterates `this._frames`, which is populated **only** by `register()`:

```
load() { const requests = [...this._frames.values()].map(f => this._loadFrame(f)); ... }
```

With zero registrations, `load()` resolves over an empty collection and succeeds.
`CanvasRenderer:87` then calls `getFrame(entity.spriteId || entity.id)`, receives `undefined`,
and takes the procedural placeholder branch — **for every entity, always.**

**Therefore: dropping 25 correctly-named PNGs into `public/sprites/` changes nothing.**
The files would sit on disk unread. **This is the true blocker, and it is not a naming problem,
an art problem, or a data problem. It is three missing lines of wiring.**

## 4. `getLoadReport()` — DISCARDED, CONFIRMED

```
$ grep -n "await spriteAtlas.load()" src/main.js
68:  await spriteAtlas.load();          <- return value not captured
$ grep -rn "getLoadReport" src/ | grep -v SpriteAtlas.js
(no output)
```

`SpriteAtlas.js:36` returns `this.getLoadReport()` from `load()`. **Nothing anywhere consumes
it.** The atlas already computes exactly the diagnostic that would have exposed this gap —
loaded vs failed vs missing frames — and `main.js:68` throws it away.

**Root cause, stated plainly: the system was built with a self-diagnostic and then wired so the
diagnostic could never be read. A report nobody reads is not instrumentation.**

## 5. THE MINIMUM CHANGE (specification only — NOT authorized, NOT Seat R's lane)

Sourced from `public/sprites/README.md` and `SpriteAtlas.js`, not invented. For one PNG:

```js
// src/main.js — BEFORE line 68's `await spriteAtlas.load();`
spriteAtlas.register('rudeus', '/sprites/characters/rudeus-early-idle.png');

const report = await spriteAtlas.load();   // capture, do not discard
console.info('[SpriteAtlas]', report);
```

Ratified conventions (R-02 ruling): key = **`id`** (`rudeus`), path = **README kebab-case**.
The `"sprite"` field in `weavers.json` is **ADVISORY** and is not consulted here.

**Scaling to 25 needs a registration table or a data-driven loop — a design decision belonging
to Seat E (`@engineer`), with `@style` GREENMARK for the art. Not commissioned by this filing.**

## 6. DISPOSITION

- **R-02: CLOSED.** Seat R credited for the naming findings that led here; **not charged** with
  failing to answer, and **released** to VSS-00.
- **The registration gap is Seat E's**, recorded as the blocker of record.
- **Standing bar remains:** no PNG may be commissioned until a registration path exists.
  **Twenty-five perfect drawings against a `load()` that reads an empty map is 25 wasted assets.**

**No file was modified in the course of this finding.**


---

## 7. ⚠️ CORRECTION TO THIS FILING — SCOPE OVERCLAIM BY SEAT A

**Filed 2026-08-15, same day, on re-reading my own work before answering the Commander.**

§2 states the finding was verified on **both** trees. **That claim was too broad and is
narrowed here.**

**What I actually did on `030f3db`:** fetched **`src/main.js`** (4 chunks, complete) and
**`src/core/Bootstrap.js`** (complete). **Two files.**
**What I actually did on `a6cef19`:** grepped **all 52** `src/*.js` files.

**The negative — "`register()` is called nowhere" — is a repository-wide claim, and on the
remote I sampled 2 of 52 files.** I attempted a repository-wide remote sweep via GitHub code
search; **it requires sign-in and returned no results.** *(External source: `github.com/search`
— authentication wall, no data.)* I could not run the sweep, so I may not report its outcome.

**What remains true and fully proven on `a6cef19`:**
- `grep -rn "\.register(" src/` → **one hit**, `main.js:111`, `screenManager.register` — a
  different object. **No `spriteAtlas.register` anywhere in 52 files.**
- Only **3** files reference the atlas at all: `main.js`, `CanvasRenderer.js`, `SpriteAtlas.js`.
  `Bootstrap.js` — which owns initialization order — **does not touch sprites** (confirmed on
  **both** trees).
- `getLoadReport` appears nowhere outside its own class.

**Second disclosure — I grepped a working tree, not a clean checkout.**
`git status` shows `src/rendering/SpriteAtlas.js` as **uncommitted-modified** by this office.
I diffed it: the change adds **placeholder colours and snake_case aliases only**. It does
**not** touch `register()`, `load()`, or `getLoadReport()`. `git show HEAD:` confirms both
methods are identical at HEAD. **The finding survives — but the check should have been run
before publishing, not after.**

**Net effect on the conclusion: unchanged in substance, narrowed in claim.** The registration
gap is `[VERIFIED]` on `a6cef19` and `[VERIFIED]` for `main.js` + `Bootstrap.js` on `030f3db`
— the only files that could plausibly perform boot-time registration. **The remaining 50 remote
files are `[INFERRED]` identical, not verified.**

**This is the residual task, and it is the one thing R-02 still owes: a repository-wide
`register()` sweep on `030f3db` by someone with a shell on that tree.** That is Seat R.

**Lesson logged: "verified on both trees" must mean the same command ran on both trees.
Two files is a sample, not a sweep — and a sampled negative is not a proven negative.**


---

## 8. §7'S "DIRTY TREE" DISCLOSURE WAS ITSELF WRONG — REVERSED

**Filed 2026-08-15 after Seat R (EXCEL) reported his tree clean at `030f3db`.**

### 8.1 R-02 CLOSES `[VERIFIED]` ON BOTH TREES

EXCEL ran the sweep I could not run remotely. On `030f3db`:

```
$ grep -rn "\.register(" Gamecompanion/files/src/ --include=*.js
main.js:111:  screenManager.register('quests', { render: renderQuestsBody });   <- ONE hit
$ grep -rn "getLoadReport" Gamecompanion/files/src/ --include=*.js
rendering/SpriteAtlas.js:36   (inside load())
rendering/SpriteAtlas.js:77   (the definition)
```

**Identical to `a6cef19`. The same command ran on both trees and both return the same
negative.** The registration gap is now a proven repository-wide fact, not an inference.
**Seat R discharged in one pass exactly what was asked, and nothing more.**

### 8.2 THE ERROR HIS REPORT EXPOSED

§7 disclosed that I had grepped a "dirty" tree — `SpriteAtlas.js` showing as
uncommitted-modified — and I attributed that edit to **this office**. EXCEL reported his tree
**pristine**, which prompted the check I should have run first:

```
working tree  sha256: 32dfac27c6296cb5
remote main   sha256: 32dfac27c6296cb5   <- BYTE-IDENTICAL
```

**The "uncommitted modification by this office" is byte-identical to remote `main`.** It is not
my edit at all — it is **committed upstream work** (`e0d0a92`, "Add sprite atlas placeholder
colors"). The same holds for the untracked `tests/SpriteAtlas.test.js`: **identical to remote.**

**Swept repository-wide:** of 35 modified tracked files, 29 were fetchable from remote main.
**29 IDENTICAL. 0 DIFFER.** (6 unfetchable, plus 21 more paths not on remote.)

### 8.3 WHAT THIS ACTUALLY MEANS — THE THIRD TREE IS NOT A THIRD BODY OF WORK

`git status` on `a6cef19` reports "modified" because the **working tree carries `030f3db`'s
content while HEAD points at `a6cef19`.** The divergence is **positional, not substantive**:
**the local tree is not dirty with unsaved edits — it is the remote's content on an older HEAD.**

**Consequences:**
1. **I mis-attributed authorship of code I did not write** and confessed to an edit that was
   never mine. **A confession made without checking is as unreliable as a claim made without
   checking.** Contrition is not evidence.
2. `git status` alone **cannot distinguish "my uncommitted work" from "upstream work sitting in
   my working tree."** Only a content hash against the remote can. **"Modified" answers *differs
   from HEAD* — never *who changed it*.**
3. The three-tree hazard is **materially smaller than recorded**: on every comparable file,
   Seat A's working tree and remote `main` **agree byte-for-byte**. The risk was never 29
   conflicting versions; it was **one stale HEAD pointer**.

**Standing correction to the record: prior warnings that Seat A's tree held divergent
uncommitted work are WITHDRAWN for these 29 files. No merge, no reconciliation, no commit was
performed — the finding is observational only.**

**Lesson: `git status` reports POSITION, not AUTHORSHIP. Hash against the remote before you
claim an edit is yours — or confess to one.**
