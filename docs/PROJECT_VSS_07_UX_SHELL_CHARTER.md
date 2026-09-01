# 🎨 VSS-07 — UX & ACCESSIBILITY SHELL (TheHUB)
**Charter · opened 2026-08-16 by Seat A (TWMIP) on the Commander's order**
**Slice:** VSS-07, the first of the five reserved cross-cutting slices (VSS-07…VSS-11)

---

## 1. WHERE THIS GOES, AND WHY THERE

**The Commander asked where to file 17 UX suggestions. Answer: VSS-07.**

The VSS execution proposal (line 204) reserves **VSS-07…VSS-11** as *"Cross-cutting; sequenced on
findings"* — **five deliberately unnamed slices** held open for work that spans subsystems rather
than living inside one. **This list is exactly that**, and it is why those slots exist. Nothing
needs to be invented and no slice is displaced: **VSS-07 is now named.**

**It does not jump the queue.** Slice order is unchanged: VSS-02 (audio) is in verification,
VSS-01, VSS-06, VSS-03, VSS-05 remain ahead of it, the **TAMAKEE gate stays closed**.

## 2. ⚠️ FINDING BEFORE BUILDING — TheHUB ALREADY HAS A THEME ENGINE

**Measured this watch, `TheHUB 1.5.5.2.3 a v/`:**

| Item | Evidence | Consequence |
|---|---|---|
| **Theme system EXISTS** | `modules/00-utils-config.js:691` `applyTheme(t=THEME)`, `:701` `setThemePreset(name)`, `:706` boot call; `index.html:53-54` `data-theme-preset` buttons (Arena, Discord) | **A "darkmode toggle" must EXTEND this, not add a parallel one.** Building a second theme path would be the audio disease again: two owners, no contract. |
| `prefers-reduced-motion` honoured | 2 files | Loading animations/hover states **must respect it** |
| `aria-live` in use | 2 files | Form success/error states should reuse the existing announcer |
| back-to-top / skip-link | 1 file each | **Partial — verify before rebuilding** |
| **Absent:** cookie banner, scroll progress, sticky headers, print stylesheet, FAQ, `@media print` | 0 files | Genuinely net-new |

**This is the single most important line in this charter: check what exists before writing.**
Seat A already shipped a false claim this program by grepping a filename instead of a capability.

## 3. THE 17 ITEMS, DECOMPOSED (Law XVI / XVIII-B)

**Law XVIII-B: a mountain is not impossible, it is merely undivided.** Seventeen items is a
mountain. **Five bites, each independently shippable and independently revertible:**

| Bite | Items | Why grouped |
|---|---|---|
| **07-A · Accessibility floor** | skip-to-content, sticky headers, focus/hover states, `aria-live` form success + error states | One a11y pass; reuses the existing announcer |
| **07-B · Mobile shell** ⭐ | mobile menus, top button, sticky header behaviour, touch targets | **Commander's stated priority: "I will use Marciale OS on phone most of the time."** |
| **07-C · Theme & chrome** | **darkmode toggle (EXTENDING `applyTheme`)**, loading animations, scroll progress bar | Must not fork the theme engine |
| **07-D · Content utilities** | site search, expandable FAQ, last-updated date, copy button, print stylesheet | Content-layer, no state coupling |
| **07-E · Consent & forms** | cookie banner, confirmation modals, password-visibility toggle | Consent + destructive-action guards; **the only bite with legal surface** |

**Recommended order: 07-B first** (the Commander's daily surface), then 07-A, 07-C, 07-D, 07-E.

## 4. STANDING CONSTRAINTS ON THIS SLICE

- ⛔ **`npm run build` is barred** (F15 — Vite `outDir` rewrites tracked `companion/assets/`).
  **UI work will tempt this. Do not.**
- ⛔ **No parallel theme system** (§2).
- ⛔ **TAMAKEE untouched.** Gate closed.
- ⚠️ **Cookie banner is not a widget** — it is a consent contract. If it claims to gate anything,
  it must actually gate it. **A banner that lies is worse than no banner.**
- ⚠️ **17 items is a Phase-1 selection, not a work order.** Each bite needs its own directive.

## 5. STATUS

**OPEN — charter only. No implementation authorized.** Awaiting the Commander's bite selection.

— Seat A (TWMIP), `@joint`
