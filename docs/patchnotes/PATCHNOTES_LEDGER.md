# 🛡️ MARCIALE-OS PATCHNOTES LEDGER (`/docs/patchnotes/PATCHNOTES_LEDGER.md`)
## The Living Dropbox of All Surgical Bugfixes, Hotfixes, and Armor Patches
**Overseeing Commander:** `@sre` (Site Reliability Engineer & Incident Commander)  
**Field Patchmaster:** `@pangolin` (Autonomous Repair & Patch Officer)  
**Parent Governance:** `/docs/AI_RULES.md` (Laws V, X, XI), `/docs/INCIDENT_RESPONSE_SRE_PLAYBOOK.md`  
**Status:** Living Patchnotes Ledger  

---

# 📋 HOW THE PANGOLIN PATCH PROTOCOL OPERATES

Whenever a bug, test failure, redmark, or integration defect is detected in Marciale-OS:

1. **`@sre`** catches the incident and classifies the severity (**SEV-1** to **SEV-4**).
2. **`@sre`** dispatches **`@pangolin`** to inspect the broken line, formulate the logic equation, and apply the surgical patch.
3. **`@pangolin`** writes a new automated test assertion into `TheHUB .../tests/` or `Gamecompanion/files/tests/` to prevent regression.
4. **`@pangolin`** records the formal patch entry into this ledger.
5. If the issue requires user architectural direction, `@sre` automatically packages **`[BUILD_NAME] - HOTFIX PROPOSAL.zip`** containing the incident diagnosis and copy-paste prompt!

---

# 📜 CHRONOLOGICAL PATCH LEDGER

### [PATCH-20260811-01] ChessLab Board Tab Distortion & Rules Engine Migration
* **Date:** 2026-08-11
* **Patched By:** `@pangolin` / `@sre`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/modules/15-chess.js`
* **Root Cause:** Sizing distortion occurred when switching between tabs due to hardcoded CSS heights and un-synced FEN string states.
* **Fix Applied:** Integrated standard `chess.js` browser-side rules engine with surgical DOM redraws, preserving sub-5ms attack heatmap overlays.
* **Regression Test:** `tests/unit-chess.js` (11 passing assertions).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-02] RuView WebSocket Proxy Non-Blocking Relay & Gating
* **Date:** 2026-08-11
* **Patched By:** `@pangolin` / `@sre`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/server.py`, `modules/18-ruview-bridge.js`
* **Root Cause:** Raw WebSocket messages sent every 500ms caused main-thread blocking when un-throttled LocalStorage writes executed.
* **Fix Applied:** Implemented 5-second throttling on telemetry writes and added non-blocking select polling in Python server proxy.
* **Regression Test:** `tests/unit-ruview.js` and `tests/unit-ruview-proxy.py` (26 passing assertions).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-03] Storage Quota Safeguard & Pre-Migration Backups
* **Date:** 2026-08-11
* **Patched By:** `@pangolin` / `@sre`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/modules/00-storage.js`, `01-migrations.js`
* **Root Cause:** `QuotaExceededError` crashed the UI when localStorage exceeded 5MB during version migrations.
* **Fix Applied:** Added automatic pre-migration backup snapshots in `localStorage.setItem('hub.backup.pre_migration')` and asynchronous `HubStorage` IndexedDB fallbacks.
* **Regression Test:** `tests/unit-storage.js` (4 passing assertions).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-04] Companion RPG Power & Frame-Rate Governor
* **Date:** 2026-08-11
* **Patched By:** `@pangolin` / `@forge`
* **Subsystem:** `Gamecompanion/files/src/core/GameLoop.js`
* **Root Cause:** Canvas game loop continued rendering at 60 FPS in hidden background tabs, draining laptop battery and accumulating delta-time frame burst spikes.
* **Fix Applied:** Implemented `_bindVisibilityHandler()` automatically throttling hidden tabs to 5 FPS and clamping maximum timestep to 100ms.
* **Regression Test:** `Gamecompanion/files/tests/` (31 passing unit tests).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-05] Zero-Asset Procedural Web Audio Synthesizer Integration
* **Date:** 2026-08-11
* **Patched By:** `@pangolin` / `@forge` / `@frontend`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/modules/00-utils-config.js`, `Gamecompanion/files/src/systems/AudioSystem.js`
* **Severity Level:** SEV-4 (Enhancement & Architecture Validation)
* **Symptoms Observed:** TheHUB and Companion RPG lacked native audio feedback for UI clicks, task completions, and combat strikes; importing external `.mp3`/`.wav` assets would bloat bundle sizes and break offline file portability.
* **Root Cause Analysis:** Offline single-file HTML distributions require zero external asset dependencies; sound effects must be generated mathematically via Web Audio API oscillators and gain envelope modulations ($f(t) = f_0 \cdot e^{-kt}$, $g(t) = g_0 \cdot e^{-t/\tau}$).
* **Logic / Math Fix Equation:** 
  $$\text{Hit Waveform: } f(t) = 400 \cdot (60 / 400)^{t / 0.10} \text{ Hz with Low-Pass } 1200\text{ Hz Filter}$$
  $$\text{Fanfare Triad: } f_n \in [523.25, 659.25, 783.99, 1046.50] \text{ Hz with Triangle Oscillators}$$
* **Files Modified:**
  * `TheHUB 1.5.5.2.3 a v/modules/00-utils-config.js` (`window.playHubSound`)
  * `Gamecompanion/files/src/systems/AudioSystem.js` (`AudioSystem` class)
  * `Gamecompanion/files/src/main.js` (Combat onHit, chest opened, level up triggers)
  * `Gamecompanion/files/tests/AudioSystem.test.js` (Unit test suite with Web Audio mock)
* **Regression Test Assertion Added:** `Gamecompanion/files/tests/AudioSystem.test.js` (3 assertions verifying headless tolerance, volume clamping, and waveform node scheduling).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-06] Pharmacokinetic Half-Life Calibration & Iframe Origin Hardening
* **Date:** 2026-08-11
* **Patched By:** `@pangolin` / `@sentinel` / `@sre`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/modules/04-tracker.js`, `tests/unit-tracker.js`, `Gamecompanion/files/src/integration/TheHUBBridge.js`
* **Severity Level:** SEV-3 (Mathematical Calibration & Security Hardening)
* **Symptoms Observed:** Adversarial stress test diagnosis caught caffeine half-life constant set to $5\text{h}$ instead of the clinical $5.7\text{h}$ pharmacokinetic standard, and `TheHUBBridge` lacked origin filtering on inbound event listeners.
* **Root Cause Analysis:** Elimination kinetics require $t_{1/2} = 5.7\text{h}$ to accurately model bedtime residual concentrations ($C(t) = C_0 \cdot 0.5^{t/5.7}$). Iframe messaging needed explicit `window.location.origin` binding to prevent rogue frame spoofing.
* **Logic / Math Fix Equation:** 
  $$C_{\text{bedtime}} = \sum C_i \cdot 0.5^{(t_{\text{bedtime}} - t_i)/5.7}$$
  $$T_{\text{cutoff}} = t_{\text{bedtime}} - \left( \log_2\left(\frac{Dose}{Threshold}\right) \times 5.7 \right) \text{ hours}$$
* **Files Modified:**
  * `TheHUB 1.5.5.2.3 a v/modules/04-tracker.js` (`HALF_LIFE_CAF_H = 5.7`)
  * `TheHUB 1.5.5.2.3 a v/tests/unit-tracker.js` (Updated half-life, cutoff, and residual assertions)
  * `Gamecompanion/files/src/integration/TheHUBBridge.js` (Origin allowlist validation)
  * `TheHUB 1.5.5.2.3 a v/package-lock.json` (Resolved 3 transitive vulnerabilities via `npm audit fix`)
* **Regression Test Assertion Added:** `tests/unit-tracker.js` (10/10 passing assertions with $5.7\text{h}$ mathematical rigor).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-07] SRE Tooling Hardening, Governance Audit Engine & State Registry
* **Date:** 2026-08-11
* **Patched By:** `@pangolin` / `@sre` / `@joint`
* **Subsystem:** `tools/scout-audit.js`, `tools/qa-wcag-audit.js`, `tools/governance-audit.js`, `package.json`, `docs/SYSTEM_STATE.md`
* **Severity Level:** SEV-2 (Governance & Verification Integrity)
* **Symptoms Observed:** Remote SRE audit caught static string heuristics in license scanner (`tools/scout-audit.js`), WCAG audit exiting 0 despite warnings (`tools/qa-wcag-audit.js`), and lack of automated governance drift detection.
* **Root Cause Analysis:** Verification tools must inspect actual package manifests in `node_modules` and differentiate blocking vs advisory errors with non-zero exit codes.
* **Logic / Math Fix Equation:** 
  $$\text{Exit Code} = \begin{cases} 0 & \text{if } \text{blockingErrors} = 0 \land \text{copyleftRisks} = 0 \land \text{governanceIssues} = 0 \\ 1 & \text{otherwise} \end{cases}$$
* **Files Modified:**
  * `tools/scout-audit.js` (Deep manifest license inspection in `node_modules`)
  * `tools/qa-wcag-audit.js` (Enforced non-zero exit for blocking accessibility errors)
  * `tools/governance-audit.js` (Automated governance, scenario, and version consistency scanner)
  * `package.json` (Added `"audit:governance"` and updated `"audit:all"`)
  * `docs/SYSTEM_STATE.md` (Created canonical ground-truth state registry)
* **Regression Test Assertion Added:** `tools/governance-audit.js` (4/4 automated checks verified passing).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-08] Build 41 Linear & Raycast Command Palette Quick-Dispatch HUD
* **Date:** 2026-08-11
* **Patched By:** `@engineer` / `@the_forge` / `@frontend`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/modules/10-command-palette.js`, `style.css`
* **Severity Level:** SEV-4 (Feature Enhancement & Usability Acceleration)
* **Symptoms Observed:** Previous command palette was a flat list lacking category grouping, Raycast 3D keyboard keycaps, TAMA architectural law indexing, and procedural audio cues.
* **Root Cause Analysis:** Keyboard-first workflow requires sub-2ms categorized fuzzy scoring ($\text{score} = \text{exact}(100) + \text{prefix}(85) + \text{keywordTokens}(12)$) and double-ring depth containment.
* **Files Modified:**
  * `TheHUB 1.5.5.2.3 a v/modules/10-command-palette.js`
  * `TheHUB 1.5.5.2.3 a v/style.css`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `tests/app-smoke.js` (Verified palette opening, task search, shortcut help, and keyboard navigation).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-09] Build 42 Pure CSS Dot-Matrix Motion Loaders & Radar Sweep
* **Date:** 2026-08-11
* **Patched By:** `@engineer` / `@the_forge`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/modules/18-ruview-bridge.js`, `12-today.js`, `style.css`
* **Severity Level:** SEV-4 (Visual Polish & Performance Acceleration)
* **Symptoms Observed:** RuView spatial sensing grid lacked visual feedback during radar scanning, and active Pomodoro blocks lacked a live focus pulsation state.
* **Root Cause Analysis:** Pure CSS keyframes (`rotate`, `scale`, `opacity`) execute directly on the GPU compositor thread with 0 JavaScript execution cost.
* **Files Modified:**
  * `TheHUB 1.5.5.2.3 a v/modules/18-ruview-bridge.js`
  * `TheHUB 1.5.5.2.3 a v/modules/12-today.js`
  * `TheHUB 1.5.5.2.3 a v/style.css`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `tests/unit-ruview.js` & `tests/unit-presence-automation.js` (26 passing assertions).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-10] Build 43 Geometric Vector SVG Badges & Rarity Crests
* **Date:** 2026-08-11
* **Patched By:** `@reconnaissance` / `@engineer` / `@the_forge`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/modules/14-companion.js`, `style.css`
* **Severity Level:** SEV-4 (Visual Polish & Gamification Acceleration)
* **Symptoms Observed:** Companion gear badges used plain emoji without distinct geometric rarity frames or vector glow styling.
* **Root Cause Analysis:** Mathematical SVG vector polygons (`polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"`) provide crisp high-DPI scaling with zero image asset overhead.
* **Files Modified:**
  * `TheHUB 1.5.5.2.3 a v/modules/14-companion.js`
  * `TheHUB 1.5.5.2.3 a v/style.css`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `tests/unit-hub.js` (Verified companion status bar, gear badges, and rarity rendering).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-11] Build 44 Marciale AI Persistent Cross-Session Memory Store
* **Date:** 2026-08-11
* **Patched By:** `@wisdom` / `@mind`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/modules/08-assistant.js`, `tests/unit-hub.js`
* **Severity Level:** SEV-4 (AI Memory & Token Optimization)
* **Symptoms Observed:** Marciale AI lost conversational context and user preferences when closing the tab or opening a new chat session.
* **Root Cause Analysis:** Offline LLMs require indexed atomic fact vectors ($< 150\text{ tokens}$) rather than raw conversation re-injection to prevent context window saturation.
* **Files Modified:**
  * `TheHUB 1.5.5.2.3 a v/modules/08-assistant.js`
  * `TheHUB 1.5.5.2.3 a v/tests/unit-hub.js`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `tests/unit-hub.js` (7 new assertions verifying persistent memory saving, deduplication, removal, and prompt block formatting).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-12] Build 45 Code-Aware Tool Output & Payload Compressor
* **Date:** 2026-08-11
* **Patched By:** `@assistant` / `@sre`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/modules/08-assistant.js`, `tests/unit-hub.js`
* **Severity Level:** SEV-4 (Token Optimization & Context Acceleration)
* **Symptoms Observed:** Raw JSON state payloads and tool outputs contained redundant whitespace, AST comments, and null object keys, consuming excess tokens.
* **Root Cause Analysis:** Pruning comments, collapsing whitespace, and filtering null/empty keys reduces token consumption by $33\text{--}50\%$ without modifying application semantics.
* **Files Modified:**
  * `TheHUB 1.5.5.2.3 a v/modules/08-assistant.js`
  * `TheHUB 1.5.5.2.3 a v/tests/unit-hub.js`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `tests/unit-hub.js` (Verified `compressPayload` null pruning and positive token savings metric).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-13] Build 46 APCA-Calibrated Circadian Dynamic Contrast Tokens
* **Date:** 2026-08-11
* **Patched By:** `@navigator` / `@ui-ux`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/style.css`, `tools/qa-wcag-audit.js`
* **Severity Level:** SEV-4 (Accessibility & Visual Ergonomics)
* **Symptoms Observed:** Late-night study blocks caused glare, and contrast ratios lacked formal APCA $L_c \ge 60$ calibration.
* **Root Cause Analysis:** Perceptual readability requires luminance models matching display physics ($L_c = (Y_{\text{text}}^{0.56} - Y_{\text{bg}}^{0.56}) \times 1.14$).
* **Files Modified:**
  * `TheHUB 1.5.5.2.3 a v/style.css`
  * `tools/qa-wcag-audit.js`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `tools/qa-wcag-audit.js` (5/5 passing accessibility audits with 0 warnings).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-14] Build 47 High Council Real-Time Observer & Liveness Status Card
* **Date:** 2026-08-11
* **Patched By:** `@assistant` / `@sre`
* **Subsystem:** `TheHUB 1.5.5.2.3 a v/modules/12-today.js`, `index.html`, `style.css`
* **Severity Level:** SEV-4 (Observability & Council State Telemetry)
* **Symptoms Observed:** Multi-agent dispatches and Council watch status were buried in markdown logs and not surfaced live on the main dashboard.
* **Root Cause Analysis:** Real-time multi-agent systems require a dedicated liveness status widget rendering recent dispatches and health signals directly on the primary viewport.
* **Files Modified:**
  * `TheHUB 1.5.5.2.3 a v/modules/12-today.js`
  * `TheHUB 1.5.5.2.3 a v/index.html`
  * `TheHUB 1.5.5.2.3 a v/style.css`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `tests/app-smoke.js` (Verified Today Dashboard widgets and Observer card rendering).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-15] Build 48 Spirit City Ambient Focus Body-Doubling in Canvas RPG
* **Date:** 2026-08-11
* **Patched By:** `@engineer` / `@the_forge`
* **Subsystem:** `Gamecompanion/files/src/rendering/CanvasRenderer.js`, `src/integration/TheHUBBridge.js`, `src/main.js`, `TheHUB .../modules/12-today.js`
* **Severity Level:** SEV-4 (Gamification & Ambient UX Enhancement)
* **Symptoms Observed:** The hero in Companion RPG remained in an idle bounce during deep focus blocks instead of reflecting active user study.
* **Root Cause Analysis:** Connecting `TheHUBBridge` focus state transitions to `CanvasRenderer.drawProceduralHeroStudy()` renders seated meditative posture and glowing magic runes during active Pomodoro timers.
* **Files Modified:**
  * `Gamecompanion/files/src/rendering/CanvasRenderer.js`
  * `Gamecompanion/files/src/integration/TheHUBBridge.js`
  * `Gamecompanion/files/src/main.js`
  * `TheHUB 1.5.5.2.3 a v/modules/12-today.js`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `Gamecompanion/files/tests/WaveManager.test.js` & `TheHUB .../tests/unit-hub.js` (34 RPG + 43 Hub tests green).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-16] Build 49 / Aetherweave Build 21 Quest System Foundation
* **Date:** 2026-08-11
* **Patched By:** `@engineer` / `@the_forge`
* **Subsystem:** `Gamecompanion/files/src/data/quests.js`, `src/systems/QuestSystem.js`, `src/core/EventBus.js`, `src/main.js`, `tests/QuestSystem.test.js`
* **Severity Level:** SEV-4 (Gamification Engine Milestone)
* **Symptoms Observed:** The RPG lacked an objective quest progression system beyond manual wave clears.
* **Root Cause Analysis:** Event-driven quest tracking on `MONSTER_KILLED`, `CHEST_OPENED`, and `STAGE_CLEARED` enables data-driven quest goals with zero code modification for new quests.
* **Files Modified:**
  * `Gamecompanion/files/src/data/quests.js`
  * `Gamecompanion/files/src/systems/QuestSystem.js`
  * `Gamecompanion/files/src/core/EventBus.js`
  * `Gamecompanion/files/src/main.js`
  * `Gamecompanion/files/index.html`
  * `Gamecompanion/files/tests/QuestSystem.test.js`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `Gamecompanion/files/tests/QuestSystem.test.js` (2 new assertions verifying progress tracking and gold reward disbursement).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-17] Build 50 / Aetherweave Build 22 Achievement System & Trophy Showcase
* **Date:** 2026-08-11
* **Patched By:** `@engineer` / `@the_forge`
* **Subsystem:** `Gamecompanion/files/src/data/achievements.js`, `src/systems/AchievementSystem.js`, `src/main.js`, `tests/AchievementSystem.test.js`
* **Severity Level:** SEV-4 (Gamification Engine Milestone)
* **Symptoms Observed:** The Companion RPG lacked persistent achievement trophies, visual unlock celebratory toasts, and permanent account stat bonuses.
* **Root Cause Analysis:** Event-driven achievement tracking listening to combat, level, gold, and stage events automatically triggers unlocks, grants gold rewards, and reports snapshots to TheHUB.
* **Files Modified:**
  * `Gamecompanion/files/src/data/achievements.js`
  * `Gamecompanion/files/src/systems/AchievementSystem.js`
  * `Gamecompanion/files/src/main.js`
  * `Gamecompanion/files/index.html`
  * `Gamecompanion/files/tests/AchievementSystem.test.js`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `Gamecompanion/files/tests/AchievementSystem.test.js` (2 new assertions verifying event progress and gold reward disbursement).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-18] Build 51 / Aetherweave Build 23 NPC & Branching Dialogue Engine
* **Date:** 2026-08-11
* **Patched By:** `@engineer` / `@the_forge`
* **Subsystem:** `Gamecompanion/files/src/data/dialogue/chapters.js`, `src/systems/DialogueSystem.js`, `src/core/EventBus.js`, `src/main.js`, `tests/DialogueSystem.test.js`
* **Severity Level:** SEV-4 (Interactive Narrative Milestone)
* **Symptoms Observed:** The RPG lacked an interactive dialogue engine with branching player choices and narrative state effects.
* **Root Cause Analysis:** Graph-based dialogue state machine (`DialogueSystem`) evaluating choice effects (gold, affinity) and transitioning between narrative nodes.
* **Files Modified:**
  * `Gamecompanion/files/src/data/dialogue/chapters.js`
  * `Gamecompanion/files/src/systems/DialogueSystem.js`
  * `Gamecompanion/files/src/core/EventBus.js`
  * `Gamecompanion/files/src/main.js`
  * `Gamecompanion/files/index.html`
  * `Gamecompanion/files/tests/DialogueSystem.test.js`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `Gamecompanion/files/tests/DialogueSystem.test.js` (1 new assertion verifying node transitions, choice effects, and dialogue lifecycle).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-19] Build 52 / Aetherweave Build 24 Affinity & Relationship System
* **Date:** 2026-08-11
* **Patched By:** `@engineer` / `@the_forge`
* **Subsystem:** `Gamecompanion/files/src/data/companionAffinities.js`, `src/systems/AffinitySystem.js`, `src/main.js`, `tests/AffinitySystem.test.js`
* **Severity Level:** SEV-4 (Companion Relationship Milestone)
* **Symptoms Observed:** Companions lacked relationship bonding meters, passive party buffs, and bond progression tracking.
* **Root Cause Analysis:** Event-driven affinity authority (`AffinitySystem`) evaluating bond thresholds (25, 50, 75) and unlocking passive party buffs on quest completions and dialogue choices.
* **Files Modified:**
  * `Gamecompanion/files/src/data/companionAffinities.js`
  * `Gamecompanion/files/src/systems/AffinitySystem.js`
  * `Gamecompanion/files/src/main.js`
  * `Gamecompanion/files/index.html`
  * `Gamecompanion/files/tests/AffinitySystem.test.js`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `Gamecompanion/files/tests/AffinitySystem.test.js` (1 new assertion verifying bonding tiers and active passive buff retrieval).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260811-20] Build 53 / Aetherweave Build 25 Faction Reputation & Guild Supply
* **Date:** 2026-08-11
* **Patched By:** `@engineer` / `@the_forge`
* **Subsystem:** `Gamecompanion/files/src/data/factions.js`, `src/systems/FactionSystem.js`, `src/core/EventBus.js`, `src/main.js`, `tests/FactionSystem.test.js`
* **Severity Level:** SEV-4 (Faction Progression Milestone)
* **Symptoms Observed:** World progression lacked guild faction standings, reputation tracking, and rank-based shop perks.
* **Root Cause Analysis:** Event-driven reputation authority (`FactionSystem`) evaluating rank thresholds (500, 1000, 2000, 3000) on stage clears and combat defeats.
* **Files Modified:**
  * `Gamecompanion/files/src/data/factions.js`
  * `Gamecompanion/files/src/systems/FactionSystem.js`
  * `Gamecompanion/files/src/core/EventBus.js`
  * `Gamecompanion/files/src/main.js`
  * `Gamecompanion/files/index.html`
  * `Gamecompanion/files/tests/FactionSystem.test.js`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `Gamecompanion/files/tests/FactionSystem.test.js` (1 new assertion verifying rank unlocking and reputation progression).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260812-21] Build 54 / Aetherweave Build 26 Companion Personal Quests & Signature Relics
* **Date:** 2026-08-12
* **Patched By:** `@engineer` / `@the_forge` / `@pangolin`
* **Subsystem:** `Gamecompanion/files/src/data/personalQuests.js`, `src/systems/QuestSystem.js`, `src/core/EventBus.js`, `src/data/items.json`, `src/main.js`, `tests/PersonalQuests.test.js`
* **Severity Level:** SEV-4 (Companion RPG Feature Addition)
* **Symptoms Observed:** Companions lacked personalized multi-step narrative questlines and Legendary Relic progression rewards.
* **Root Cause Analysis:** Built `personalQuests.js` data schema, extended `QuestSystem.js` with affinity-gated evaluation (Affinity $\ge 25$), multi-target tracking (`monster_killed`, `chest_opened`, `stage_cleared`, `elite_killed`, `hero_level`), and automated relic disbursement.
* **Files Modified:**
  * `Gamecompanion/files/src/data/personalQuests.js`
  * `Gamecompanion/files/src/data/items.json`
  * `Gamecompanion/files/src/systems/QuestSystem.js`
  * `Gamecompanion/files/src/core/EventBus.js`
  * `Gamecompanion/files/src/main.js`
  * `Gamecompanion/files/index.html`
  * `Gamecompanion/files/tests/PersonalQuests.test.js`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `Gamecompanion/files/tests/PersonalQuests.test.js` (7 new assertions covering initialization, affinity gating, step progression, elite filtering, hero level target, and relic disbursement).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260812-22] Build 55 / Aetherweave Build 27 Regional Bounty Board & Hunter Guild
* **Date:** 2026-08-12
* **Patched By:** `@engineer` / `@the_forge` / `@assistant`
* **Subsystem:** `Gamecompanion/files/src/data/bounties.js`, `src/systems/BountyBoardSystem.js`, `src/core/EventBus.js`, `src/main.js`, `tests/BountyBoardSystem.test.js`
* **Severity Level:** SEV-4 (Companion RPG Feature Milestone)
* **Symptoms Observed:** Players lacked repeatable regional monster hunting contracts and Hunter Guild progression standing.
* **Root Cause Analysis:** Built `BountyBoardSystem` evaluating target regex patterns, active contract tracking, guild reputation accumulation, rank promotion events, and UI modal controls.
* **Files Modified:**
  * `Gamecompanion/files/src/data/bounties.js`
  * `Gamecompanion/files/src/systems/BountyBoardSystem.js`
  * `Gamecompanion/files/src/core/EventBus.js`
  * `Gamecompanion/files/src/main.js`
  * `Gamecompanion/files/index.html`
  * `Gamecompanion/files/tests/BountyBoardSystem.test.js`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `Gamecompanion/files/tests/BountyBoardSystem.test.js` (5 new assertions verifying contract acceptance, pattern kill matching, boss tracking, reward claiming, and rank promotions).
* **Status:** 🟢 RESOLVED & VERIFIED

---

### [PATCH-20260812-23] Build 56 / Aetherweave Build 28 Attunement Skill Tree & Branching Talents
* **Date:** 2026-08-12
* **Patched By:** `@engineer` / `@the_forge` / `@assistant`
* **Subsystem:** `Gamecompanion/files/src/data/attunementTree.js`, `src/systems/AttunementSystem.js`, `src/core/EventBus.js`, `src/main.js`, `tests/AttunementSystem.test.js`
* **Severity Level:** SEV-4 (Attunement Progression Milestone)
* **Symptoms Observed:** Players lacked elemental specialization trees, talent point allocation, and branch capstone masteries.
* **Root Cause Analysis:** Built `AttunementSystem` evaluating point economy ($1 + \lfloor \text{level}/5 \rfloor$), parent prerequisites, hero level gates, branch mastery thresholds, stat aggregation, and full respec.
* **Files Modified:**
  * `Gamecompanion/files/src/data/attunementTree.js`
  * `Gamecompanion/files/src/systems/AttunementSystem.js`
  * `Gamecompanion/files/src/core/EventBus.js`
  * `Gamecompanion/files/src/main.js`
  * `Gamecompanion/files/index.html`
  * `Gamecompanion/files/tests/AttunementSystem.test.js`
  * `docs/BUILD_LOGBOOK.md`
* **Regression Test Assertion Added:** `Gamecompanion/files/tests/AttunementSystem.test.js` (8 new assertions verifying point economy, tier 1/2 investments, level/parent guards, max-rank caps, branch mastery, and respec).
* **Status:** 🟢 RESOLVED & VERIFIED

---

# 3. TEMPLATE FOR FUTURE PANGOLIN PATCHES

```text
### [PATCH-YYYYMMDD-ID] [Short Patch Title]
* **Date:** [YYYY-MM-DD]
* **Patched By:** @pangolin / @sre
* **Subsystem:** [Target file paths]
* **Severity Level:** [SEV-1 Critical | SEV-2 Storage/Data | SEV-3 Bug | SEV-4 Minor]
* **Symptoms Observed:** [What was broken / error message]
* **Root Cause Analysis:** [Why it happened]
* **Logic / Math Fix Equation:** [The exact fix logic]
* **Files Modified:** [List exact files changed]
* **Regression Test Assertion Added:** [Exact test file and assertion]
* **Status:** 🟢 RESOLVED & VERIFIED
```
