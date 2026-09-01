---
version: 1.0.0
name: Marciale-OS-Design-System
description: "A high-performance, dark-cockpit personal command center aesthetic combining dense engineering precision (Linear/Raycast inspired) with warm gamified momentum (Companion RPG Gold accents) and Socratic architectural clarity. Deep void-black canvas (#0b0c10) with an elevated 4-tier surface ladder, subtle 1px hairline borders, signature Imperial Violet primary accent (#6c5ce7), and Quest Gold highlights (#d4a034). Built for 60 FPS active focus, 5 FPS background power saving, and WCAG 2.2 Level AA accessibility."

colors:
  canvas: "#0b0c10"
  surface-1: "#13151b"
  surface-2: "#1a1d26"
  surface-3: "#222632"
  surface-4: "#2a2f3d"
  hairline: "rgba(255, 255, 255, 0.08)"
  hairline-strong: "rgba(255, 255, 255, 0.16)"
  primary: "#6c5ce7"
  primary-hover: "#8272f3"
  primary-active: "#5b4bc4"
  on-primary: "#ffffff"
  ink: "#f1f2f6"
  ink-muted: "#a4b0be"
  ink-subtle: "#747d8c"
  accent-gold: "#d4a034"
  accent-gold-hover: "#e5b347"
  on-gold: "#0b0c10"
  semantic-success: "#00b894"
  semantic-warning: "#fdcb6e"
  semantic-danger: "#e17055"
  semantic-info: "#0984e3"

typography:
  display-lg:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.8px"
  display-md:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.5px"
  title-lg:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.2px"
  title-md:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0px"
  body-md:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0px"
  body-sm:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0px"
  caption:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.2px"
  code:
    fontFamily: "JetBrains Mono, Fira Code, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0px"

rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  pill: "9999px"

spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  section: "64px"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.title-md}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    border: "none"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    border: "1px solid {colors.hairline}"
  button-gold:
    backgroundColor: "{colors.accent-gold}"
    textColor: "{colors.on-gold}"
    typography: "{typography.title-md}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  card-default:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.hairline}"
    padding: "20px"
  card-elevated:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.hairline-strong}"
    padding: "24px"
  text-input:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.hairline}"
    padding: "8px 12px"
  status-badge-success:
    backgroundColor: "rgba(0, 184, 148, 0.15)"
    textColor: "{colors.semantic-success}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  status-badge-gold:
    backgroundColor: "rgba(212, 160, 52, 0.15)"
    textColor: "{colors.accent-gold}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  top-nav:
    backgroundColor: "{colors.surface-1}"
    borderBottom: "1px solid {colors.hairline}"
    height: "56px"
    padding: "0 24px"
---

# 🎨 MARCIALE-OS DESIGN RULES & PRINCIPLES

1. **Dark Cockpit Density:** The canvas is `#0b0c10`. Avoid large, blinding white backgrounds. Use subtle 4-step surface elevations (`#13151b` $\rightarrow$ `#1a1d26` $\rightarrow$ `#222632`) with 1px hairline borders (`rgba(255,255,255,0.08)`).
2. **Dual-Accent Hierarchy:** 
   * **Imperial Violet (`#6c5ce7`):** Reserved for core OS controls, AI assistant interactions, and navigation.
   * **Quest Gold (`#d4a034`):** Reserved for companion hero progression, XP gains, completed tasks, and celebrations.
3. **Typography Rigor:** Inter for UI clarity, JetBrains Mono for telemetry/biometrics/code. Avoid mixing more than 2 font families.
4. **Instant Dark Mode & CSS Tokens:** All UI components in TheHUB and Companion RPG must consume CSS custom properties (`var(--hub-surface-1)`, `var(--hub-primary)`).
5. **WCAG 2.2 Level AA Standard:** Text contrast must maintain $\ge 4.5:1$ against surface backgrounds at all times.
