# 🏆 WEB ENGINEERING QUALITY & ACCESSIBILITY STANDARDS (`/docs/web/WEB_QUALITY_STANDARD.md`)
## Technical Standards for Correctness, Maintainability, WCAG 2.2, Performance & Security
**Governing Department:** `/docs/web/`  
**Quality & Gate Authority:** `@qa` (Quality Assurance Lead) & `@ui-ux` (Accessibility Authority)  
**Parent Governance:** `/docs/AI_RULES.md`, `/docs/DIAGNOSTIC_AND_TESTING_GUIDE.md`  
**Status:** Authoritative Quality Standard  

---

# 1. THE 7 PILLARS OF WEB ENGINEERING QUALITY

Every web deliverable produced within Marciale-OS must satisfy seven rigorous quality dimensions:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                  THE 7 PILLARS OF WEB QUALITY IN MARCIALE-OS               │
 └────────────────────────────────────────────────────────────────────────────┘
                                       │
     ┌──────────────┬──────────────┬───┴──────────┬──────────────┬────────────┐
     ▼              ▼              ▼              ▼              ▼            ▼
┌──────────┐  ┌──────────┐  ┌──────────┐   ┌──────────┐  ┌──────────┐  ┌──────────┐
│CORRECTNESS│ │MAINTAIN- │  │ACCESSIBIL│   │PERFORM-  │  │SECURITY &│  │USABILITY │
│& ZERO BUG│  │ABILITY   │  │WCAG 2.2  │   │ANCE      │  │PRIVACY   │  │& CLARITY │
└──────────┘  └──────────┘  └──────────┘   └──────────┘  └──────────┘  └──────────┘
```

---

# 2. DETAILED QUALITY STANDARDS

---

### A. Correctness & Zero Regression
* **Definition of Done (DoD):** A feature is only complete when it satisfies all functional acceptance criteria, handles edge cases gracefully, and passes all automated test suites (`npm test`) with **0 failures and 0 console errors**.
* **Error Handling:** Every `fetch()`, `JSON.parse()`, and asynchronous promise must have explicit `try...catch` blocks and user-friendly fallback state rendering. No unhandled promise rejections are permitted.

---

### B. Maintainability & Code Hygiene
* **Lightweight Architecture:** Prioritize clean, modern Vanilla JavaScript (ES6+), semantic HTML5, and native CSS variables over heavy external frameworks.
* **Readable Modular Code:** Functions must be small, single-purpose, and clearly named. Shared constants and state must be centralized.
* **Zero Dead Code:** Deprecated functions, commented-out debug code, and temporary scratch variables must be purged before release.

---

### C. WCAG 2.2 Accessibility Standards (W3C/WAI Level AA)
Accessibility is an intrinsic engineering requirement, not an optional afterthought:

1. **Color Contrast (Criterion 1.4.3):**
   * Normal text ($<18\text{pt}$ or $<14\text{pt}$ bold) must achieve a contrast ratio of **$\ge 4.5:1$** against its background.
   * Large text ($\ge 18\text{pt}$ or $\ge 14\text{pt}$ bold) must achieve a contrast ratio of **$\ge 3.0:1$**.
2. **Keyboard Navigability (Criterion 2.1.1):**
   * Every interactive element (buttons, links, form inputs, modal closers, tabs) must be fully navigable and operable using the **`Tab`**, **`Enter`**, **`Space`**, and **`Escape`** keys alone.
3. **Focus Visibility (Criterion 2.4.7 / 2.4.11):**
   * Focused elements must render a clear, high-contrast visual focus ring (`outline: 2px solid var(--acc)`). `outline: none` without replacement is strictly banned.
4. **Semantic HTML & ARIA Attributes (Criterion 4.1.2):**
   * Use native semantic tags (`<button>`, `<nav>`, `<main>`, `<dialog>`, `<section>`).
   * Dynamic status updates must use appropriate ARIA live regions (`aria-live="polite"`, `role="status"`).

---

### D. Usability & Cognitive Ergonomics
* **8px Grid System:** Layout padding, margins, and component dimensions should conform to standard multiples of $8\text{px}$ (or $4\text{px}$ for tight micro-elements).
* **Predictable Hierarchy:** Every screen must possess an unambiguous visual hierarchy: Primary Action $\rightarrow$ Secondary Action $\rightarrow$ Informational Meta.
* **Beginner-Aware Language:** All error messages and notifications must explain *what happened*, *why*, and *what the user can do next* in simple, reassuring language.

---

### E. Performance & Power Budgets
* **UI Responsiveness:** User interface interactions (tab switches, button clicks, modal opens) must respond within **$\le 50\text{ milliseconds}$**.
* **Canvas Frame-Rate Target:** The Companion RPG must sustain **$60\text{ FPS}$** during active gameplay.
* **Background Power Governor:** Hidden background tabs must automatically throttle rendering loops to **$\le 5\text{ FPS}$** to preserve laptop battery and GPU cycles.
* **Storage Latency:** LocalStorage writes must be throttled or debounced; large data collections ($>100\text{ KB}$) must use asynchronous IndexedDB (`HubStorage`).

---

### F. Security & Privacy Assurance (Zero Cloud Leakage)
* **100% Local Execution:** No user data, passwords, study notes, or biometrics may ever be transmitted to external third-party cloud servers (Law VI of the AI Constitution).
* **Input Sanitization:** All user inputs rendered to the DOM must pass through `sanitizeHtml()` or `esc()` escaping helpers to prevent Cross-Site Scripting (XSS).
* **Cryptographic Vault Zeroization:** AES-GCM decrypted keys and credential arrays must be wiped from active memory (`VAULT_KEY = null`) immediately upon vault lock or after $3\text{ minutes}$ of user absence.

---

### G. Documentation Quality & Traceability
* **Living Ledger Updates:** Every completed engineering milestone must be recorded in `docs/BUILD_LOGBOOK.md` with date, agent call sign, modified files, and test verification results.
* **Release Artifact Integrity:** Release zip archives (`Fix.zip`, `TAMA-*.zip`) must be kept clean, lightweight, and synchronized with the latest codebase.
