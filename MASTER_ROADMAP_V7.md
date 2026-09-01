# 📜 MASTER ROADMAP V7 — Historical Build Log (Builds 0 through 33.9)

> **DOCUMENT STATUS:** HISTORICAL ARCHIVE — SUPERSEDED BY `Refinedplan.md` & `docs/BUILD_LOGBOOK.md`  
> **VALID FOR CURRENT CODE STATE:** HISTORICAL PROVENANCE ONLY (Preserved under Commandment III & The "Do Not Fix" Preservation Doctrine)  
> **CURRENT PRODUCTION STATE:** See `docs/SYSTEM_STATE.md` and `docs/BUILD_LOGBOOK.md`

---

## Scope & Vision

This comprehensive roadmap covers the complete history of **TheHUB** from **Build 0** through our latest **Hybrid Chess AI Architecture (Build 30.11.1 Onwards)**, leading up to the massive "v3.0 JARVIS Evolution" proposal.

TheHUB has successfully transitioned from a static productivity dashboard into a highly capable, local-first OS with streaming AI, gamification, and deep local storage (IndexedDB).

\---

# 1\. Complete Historical Build Log (Builds 0 – 30.10)

For archival purposes, debugging reference, and architectural consistency, here is the complete sequence of executed builds that brought TheHUB to its current state.

### Foundational Setup \& Productivity Phase (Builds 0 - 23)

* **Build 0-9 (Foundation):** Setup of the local Python server (`server.py`), Vanilla JS module structure, `hub-data.json` local storage persistence, AI tool safety validation, global error logging, dynamic modals, CSS cascade organization, and basic Kanban/Tracker/Calendar capabilities.
* **Build 10 (Restore Point Manager):** Added a data safety net to create and restore backups before experimental migrations.
* **Build 11 (Focus Sessions):** Implemented timestamp-based Pomodoro timers directly linked to Kanban tasks.
* **Build 12 (Autopilot Signal Tuning):** Allowed users to adjust AI warning thresholds (caffeine limits, deadline proximity).
* **Build 13 (Streaming Assistant Text):** Switched Ollama to `stream: true` for live text chunking without executing tools.
* **Build 14 (Streaming Tool Buffering):** Added safe JSON buffering to validate and execute tools mid-stream.
* **Build 15-18 (Project Mode \& Pre-mortem):** Created Project contextual folders, dashboards, linked items, and the Marciale Strategic Directives prompt for bottleneck analysis.
* **Build 19-20 (Biometric Engine):** Upgraded intake tracker with Mifflin-St Jeor math for dynamic limits, paired with a Radial UI.
* **Build 21-23 (IndexedDB Migrations):** Escaped the 5MB localStorage limit by moving AI Workspaces, Notes Library, and Activity Archives to asynchronous IndexedDB.

### The Gamification \& UI/UX Polish Phase (Builds 24 - 26.8.6)

* **Build C0 (Experimental Systems Registry):** Added feature flags to isolate unstable features like game companions.
* **Build 24 (Companion Shell):** Built the native UI container for the Idle RPG companion, tracking level/XP without breaking productivity points.
* **Build 25 (Companion Event Bridge):** Implemented a `postMessage` bridge to send Task/Focus events to the companion iframe.
* **Build 25.1 \& 25.2 (Layout \& Focus Fixes):** Fixed tab structure interactions and timer management edge cases.
* **Build 26 (Idle Hero Local Embed):** Successfully embedded the fully built Idle Hero webgame inside TheHUB via local iframe.
* **Build 26.1 (Reward Receiver Adapter):** Wrote the game-side adapter to translate Hub XP signals into in-game currency/levels.
* **Build 26.2.0 - 26.2.7 (Iframe Layout \& Visibility Matrix):** Intensive UI architecture phase. Split the Companion into a "Mini" view for the Activity card and a "Full" view for its dedicated tab. Fixed CSS heights, iframe inline chrome, and visibility toggles to ensure high performance.
* **Build 26.8.0 (Backup Integrity \& Notes Export):** Expanded the backup system to include full note payloads and verified export formats.
* **Build 26.8.1 (Marciale Date Guard):** Fixed AI context hallucination by strictly enforcing exact local date/time awareness in the system prompt.
* **Build 26.8.2 (Quick UX Wins):** Relocated "Today at a Glance" and renamed focus mechanics to "LOCK IN" for better user engagement.
* **Build 26.8.3 (Information Center):** Built a dedicated context documentation page to feed persistent user rules to Marciale.
* **Build 26.8.4 (Chat UI/UX Polish):** Revamped the Marciale chat interface, adding a Floating Chat Menu for quick actions.
* **Build 26.8.5 \& 26.8.5.1 (Notification Repair):** Fixed desktop notification overflow and settings panel clipping.
* **Build 26.8.6 (Model Upgrade):** Added AI Model Presets directly into Hub Control, allowing instant switching between Qwen, Llama, and DeepSeek backends.

### Near-Term Roadmap Baseline (Builds 26.9 – 26.12)

* **Build 26.9 (Media Presence Connector):** Prepared optional local detection of YouTube and Spotify activity.
* **Build 26.10 (Today Media Presence Card):** Added optional card on the Today Dashboard showing "Currently playing" metadata.
* **Build 26.11 (Calendar Update Pass):** Refined Calendar sync, UI interactions, and ICS parsing reliability.
* **Build 26.12 (UI/UX \& Iframe Layout Pass):** Finalized layout for existing companion iframes and mobile responsiveness.

### Chess Companion \& Marciale Lab Sprints (Builds 27 – 30.10)

* **Build 27 (Chess Tab Foundation):** Added a dedicated ChessLab tab and local board shell.
* **Build 28 (Chess Activity Bridge):** Chess match completion/win events log into Hub Activity and feed the Momentum Companion.
* **Build 29 (Local Opponent Integration):** Added lightweight local offline opponent.
* **Build 30 (Marciale Tactical Synergy):** Added button to send board FEN + recent moves to Marciale for tactical analysis.
* **Build 30.1 (ChessLab Render Stability Hotfix):** Fixed board distortion / square sizing, contrast, and coordinate rail layouts.
* **Build 30.2 (Rules Engine Migration):** Migrated ChessLab to a real browser-side rules core using `chess.js`.
* **Build 30.3 (Chess Engine Worker Foundation):** Created a dedicated background worker layer and UCI adapter.
* **Build 30.4 (Stockfish Browser Integration):** Added browser-side Stockfish WASM integration on top of the worker.
* **Build 30.5 (Elo Difficulty Framework):** Formalized AI difficulty as an Elo-shaped ladder from 1000 to 2800.
* **Build 30.6 (Character Opponent System):** Added 11 named character opponents, records, and persistent profiles.
* **Build 30.6.1 (Character Roster Polish):** Upgraded profiles withTraits, Tags, Styles, and Signature lines.
* **Build 30.6.2 (Marciale Special Bot):** Added Marciale Chess as an adaptive bot with fixed persona and scalable 3800 Elo ceiling.
* **Build 30.6.3 (Chess Sound System):** Added localized chess sounds for moves, captures, checks, promotions, and draw/loss results.
* **Build 30.7 (Personality Move Policy):** Programmed stylistic move biases (Aggressive, Positional, Patient, etc.) into the AI.
* **Build 30.8 (ChessLab Bot Select UX Pass):** Built a premium bot-selection panel with card record trackers.
* **Build 30.9 (Marciale Chess Coach Layer):** Created engine-backed candidate move explanations and coach prompts.
* **Build 30.10 (Calibration Pass):** Added Elo-specific drop limits and error boundaries to prevent suicides.

\---

# 2\. Modern Optimizations: ChessLab Hybrid AI Sprints (Builds 30.11.1 – 30.11.4)

These builds represent the **completed transition** to a high-fidelity, high-performance, non-blocking Chess AI system.

### Build 30.11.1 — Hybrid AI Engine Core Expansion

* **Goal**: Solidify background WebWorker configurations to act as a secure, fast, and multi-threaded calculation core.
* **Delivered**:

  * Upgraded WebWorker `modules/15b-chess-engine-worker.js` to dynamically configure engine thread pools, transposition hash sizes, and NNUE neural network evaluation toggles.
  * Added an **`Active Engine` Selector** dropdown in the Sidebar, allowing players to swap between **Stockfish (WASM)** and our custom **Vesta (Local JS)** engine dynamically.
  * Reorganized `stockfishConfigFromAi()` to serve as the unified source of truth for all engine-level allocations.

### Build 30.11.2 — Unified Cognitive Personality \& Reflex Layer

* **Goal**: Prevent lower bots from making suicidal, chaotic 400-Elo-style blunders, making them play like authentic human amateurs.
* **Delivered**:

  * Tightened the `evalDropLimit` calibration presets significantly (e.g. Elo 1000 now only allows up to a $0.75$ pawn drop, and Elo 1400 up to $0.35$ pawns). This forces bots to make **realistic, natural human inaccuracies** instead of raw, game-ruining blunder suicides.
  * Scaled Vesta Engine's calculation depth dynamically based on Elo: **Depth 1** (1000 Elo), **Depth 2** (1200–1400 Elo), and **Depth 3** (1600+ Elo).
  * Synthesized `personalityBiasScore` and `maiaHumanPredictScore` into a unified client-side cognitive formula.

### Build 30.11.3 — Premium Visual Board Overlay \& Bot Modal Overhaul

* **Goal**: Overhaul UI/UX to maximize viewport real estate, solve performance delays, and keep the chessboard fully visible at all times.
* **Delivered**:

  * **Surgical Redraws**: Upgraded `renderChessLab()` to surgically rewrite only the affected DOM nodes (chessboard squares, status bars, move lists) during active play, bypassing full page re-renders (blazing-fast sub-5ms clicks!).
  * **Bot Select Modal (`#chessBotModal`)**: Moved the bulky 14-card bot roster into a gorgeous, scrollable blurred overlay modal, keeping the sidebar extremely short, tidy, and clean.
  * **Interactive Sub-Tabs Panel**: Moved Move Logs, Marciale Coach, sound effects, and Match history into a space-efficient tabbed dashboard directly below the chessboard.
  * **Pawn Promotion Modal**: Intercepts pawn moves to the 8th/1st rank, halting execution to present a beautiful, custom choice overlay (Queen, Rook, Bishop, Knight) rather than auto-promoting to Knight.
  * **Core Performance Enhancements**: Optimized `chessGame()` and `playChessSound()` with active memory caching to eliminate synchronous loading lags.

### Build 30.11.4 — Positional Safety \& Attack Heatmap Overlay

* **Goal**: Give ChessLab an educational, real-time positional visualization.
* **Delivered**:

  * Mapped square attack values to display an active **Positional Safety Heatmap** (Green = friendly controlled, Red = enemy controlled, Orange = hotly contested).
  * Added two brand-new bots: **Vesta Bot (1300 Elo)** and **Philly Heatmap (1700 Elo)** to showcase structural symmetry and attack count tracking.

\---

3. RuView & Presence Automation (Builds 31 – 33.9)
Expanding the personal command center with desk-space awareness, local streaming, WiFi-based sensing, and privacy-first spatial automation.

Build 31 — Generic Presence API
Goal: Add global state (present vs. away) to TheHUB.
Delivered:
Implemented state tracking inside global memory with custom idle timeout parameters.
Fed passive presence metrics into Marciale's context.
Build 32 — RuView WebSocket Bridge
Goal: Connect TheHUB to a local RuView daemon via WebSockets.
Delivered:
Added client-side WebSocket connectors inside TheHUB to query bluetooth signals, device proximities, or face-detection cameras.
7 Performance Fixes Applied after identifying critical regressions introduced by the WebSocket integration:
MutationObserver targeted (12-today.js) — Was observing entire document.body with subtree:true, firing hundreds of times per second on every toast, card update, heatmap render, and clock tick, each triggering a full renderRuViewPage() rebuild. Now only observes #page-ruview itself.
localStorage write throttling (18-ruview-bridge.js) — saveStats() was writing JSON.stringify() to localStorage on every WebSocket message at 500ms intervals. Now throttled to every 5 seconds on the hot path. Connection lifecycle events still save immediately.
Signal field in-place DOM update (18-ruview-bridge.js) — renderSignalField() was rebuilding 400 <div> elements via innerHTML every 250ms. Now builds the grid DOM once and only mutates style.background and style.opacity on each cell. Zero DOM creation after first render.
renderRuViewPage() early bail (12-today.js) — Added check at the top: if the RuView page is not active, returns immediately. Prevents expensive full-page rebuilds when the user is on a different tab.
renderPresenceCard() early bail (17-presence.js) — Added check: if Today page is not active, hides card and returns. Prevents presence card HTML rebuilds when user is on Calendar, Tasks, Notes, etc.
UI update throttle 4fps → 1fps (18-ruview-bridge.js) — WebSocket-driven UI updates reduced from 250ms to 1000ms. Dashboard data does not need sub-second refresh for human perception.
Connection lifecycle saves (18-ruview-bridge.js) — Added saveStatsNow() for connect/disconnect/error events that need immediate persistence, while routine sensing updates use the throttled saveStats().
Build 33 — Presence Automation
Goal: Trigger autonomous security routines based on spatial presence.
Delivered:
Built automation triggers into Hub Control (auto-locking the Secure Vault, pausing active Pomodoro focus sessions, and triggering Marciale alerts when the user walks away).
Added welcome-back routine when the user returns to desk.
RuView Deep Integration Sprint (Builds 33.0 – 33.9)
This sprint transforms RuView from a basic WebSocket data consumer into a fully embedded, production-quality spatial awareness module inside TheHUB. Each build gates on the previous one. Do not start a build until the prior one is verified working.

Build 33.0 — RuView Service Foundation & Docker Integration
Goal: Establish RuView as a proper local service running alongside server.py and Ollama so the frontend has something real to connect to.
Problem: RuView's sensing server does not exist in the stack yet. Every frontend build after this is untestable without it. The iframe will show a blank page. CORS will block all cross-origin requests.
Tasks:
Add a ruview/ directory to the project root.
Add a docker-compose.yml that spins up the RuView sensing server alongside existing services with SIMULATION_MODE=true for development and no hardware required.
Update server.py to add a /ruview-proxy/<path> route that forwards all WebSocket and HTTP requests to localhost:3000, permanently solving CORS for all future RuView builds.
Add a /ruview-proxy/health endpoint so TheHUB can detect whether RuView is running before attempting to embed or connect.
Write a README-ruview.md documenting the startup sequence, Docker commands, simulation mode, and the path to real ESP32 hardware when ready.
Success Criteria: docker-compose up starts both TheHUB and RuView. Health check returns green. Proxy route forwards correctly. Simulation data flows through the proxy.
Build 33.1 — RuView Tab & HubFrame Embed
Goal: Give RuView a proper home inside TheHUB using the same HubFrame/iframe pattern already proven with the Idle Hero companion and ChessLab.
Problem: RuView has no tab or page in TheHUB. The full RuView UI with its 3D signal fields, pose skeleton, and live metrics is inaccessible from within the Hub shell. Users must leave TheHUB entirely to view RuView.
Tasks:
Register a RuView tab in the navigation system gated behind the hub.experimental.ruview_bridge feature flag so it only appears when the user has enabled it.
Create modules/ruview/ruview-frame.js to manage the iframe lifecycle: health check first, embed on success, show offline state on failure with a retry button.
Add a skeleton loading screen displayed while Three.js initializes (typically 2–4 seconds on first load).
Add a connection status bar at the top of the RuView tab showing live state: connected, simulation mode, signal count, and last update timestamp.
Apply dark mode CSS overrides injected into the iframe after load to match TheHUB's color palette and typography.
Hide RuView's own navigation header since TheHUB provides all tab chrome.
Success Criteria: RuView tab opens and displays the full embedded RuView UI with matching dark theme. Offline state shows gracefully when Docker is not running.
Build 33.2 — Lazy Loading & Performance Isolation
Goal: Ensure that RuView's heavy Three.js and WebGL rendering cannot affect the performance of any other page in TheHUB.
Problem: RuView's 3D Gaussian splat signal field, pose skeleton WebGL renderer, and continuous WebSocket data stream are extremely resource-intensive. If the iframe loads at startup or persists in the background, it will steal CPU and GPU from Tasks, Notes, Calendar, and every other page even when the user is not looking at RuView.
Tasks:
Implement tab-gated iframe mounting: the RuView iframe is only created when the RuView tab becomes active and is destroyed (set to about:blank) when the user navigates away, freeing all GPU memory.
Add a manual suspend/resume toggle in the RuView tab toolbar so the user can freeze the feed without leaving the tab.
Add a GPU memory warning banner when navigator.deviceMemory is detected below 4GB.
Bridge a set_reduced_motion postMessage command to RuView when the user has prefers-reduced-motion enabled in their OS, disabling particle animations inside the iframe.
Add a Performance Mode toggle in Hub Control that disables the 3D signal field entirely and falls back to the 2D flat heatmap view for lower-end hardware.
Success Criteria: CPU and GPU usage on Tasks, Notes, and Calendar pages are identical whether the user has visited the RuView tab or not during the session.
Build 33.3 — postMessage Bridge & Event Protocol
Goal: Establish a typed, validated, bidirectional communication channel between the RuView iframe and TheHUB parent so live sensing data can flow into the rest of the OS.
Problem: The iframe runs in its own JavaScript context. TheHUB has no direct access to RuView's WebSocket data, presence state, or vitals. Without this bridge, the Today dashboard card cannot show presence info and Marciale cannot receive spatial context. This is the same architectural problem solved by the Idle Hero companion bridge in Build 25.
Tasks:
Define a strict RuView Event Protocol with typed message shapes for presence updates, vitals updates, signal field updates, status changes, and errors.
Inject a bridge script into the RuView iframe context after load that intercepts its internal WebSocket messages and forwards structured events to the TheHUB parent via postMessage.
Add strict origin validation on the TheHUB parent listener so only messages from the local RuView iframe are accepted and processed.
Add confidence threshold filtering: events with confidence below the user-configured threshold (default 75%) are silently dropped before reaching any automation or display logic.
Wire up a bridge health watchdog: if no messages are received for 5 seconds, mark the bridge as stale and surface a reconnect prompt in the status bar.
Success Criteria: TheHUB console shows typed RuView events arriving in real time. Presence, vitals, and signal data are accessible from any module via getRuViewState().
Build 33.4 — Today Dashboard Presence Card
Goal: Surface the most critical RuView metrics on the Today dashboard so the user never has to leave their main view to check presence status or vitals.
Problem: The Today dashboard has no RuView awareness. The user must switch to the RuView tab to see any sensing data. For a command center philosophy, critical metrics must be visible at a glance on the primary dashboard without requiring navigation.
Tasks:
Build a RuView Presence Card in the Today dashboard showing: current presence status with a pulsing indicator dot, time at desk since first detection today, breathing rate with an animated bar, activity level classification, confidence percentage, and RuView daemon connection state.
Add an early bail guard: if RuView is offline or the feature flag is disabled, the card collapses gracefully to a single dimmed line rather than showing an error or empty space.
Use in-place DOM mutation only (no innerHTML rebuild on updates) consistent with the performance fixes established in Build 32.
Cap card update rate at 1fps maximum, consistent with the throttle established in Build 32 Fix 6.
Add a View Full RuView shortcut button on the card that switches directly to the RuView tab.
Gate the entire card behind the hub.experimental.ruview_bridge feature flag.
Success Criteria: Today dashboard shows live presence card updating at 1fps with real RuView data. Card shows offline state cleanly when daemon is not running.
Build 33.5 — Marciale Context Injection
Goal: Give Marciale (Ollama) live awareness of the user's physical presence, desk session duration, breathing patterns, and activity level so it can provide genuinely context-aware responses and proactive suggestions.
Problem: Marciale's system prompt is built once at startup and has no awareness of RuView data. It cannot acknowledge that the user just returned from a long break, notice that breathing is elevated, or suggest rest after 4 hours of continuous desk time. This was an explicit goal in the roadmap from Build 31 and remains completely unwired.
Tasks:
Add a dynamic RuView context block to the Marciale system prompt that rebuilds on each chat turn with current presence status, session duration, away period count, breathing rate with classification, and activity level.
Add a get_presence_summary tool that Marciale can call to retrieve a structured daily summary of desk activity on demand.
Implement three proactive Marciale alert triggers driven by RuView data: elevated breathing rate above 20rpm sustained for 5 minutes suggests a break; away period longer than 2 hours is acknowledged on return; continuous desk time beyond 4 hours triggers a movement recommendation.
Make Marciale RuView context injection opt-in via a Hub Control toggle: Send RuView data to Marciale.
Ensure the context block degrades gracefully to a single offline note when RuView is not connected so Marciale's prompt is never broken by a missing daemon.
Success Criteria: Marciale acknowledges desk session duration and breathing state in responses. Proactive alerts fire correctly at the configured thresholds. Context injection can be fully disabled without affecting other Marciale functionality.
Build 33.6 — Presence Automation Engine
Goal: Replace the basic Build 33 automation triggers with a robust, debounced, confidence-gated state machine that handles the full away and return lifecycle symmetrically without false-firing on brief absences.
Problem: Build 33's automations have no debounce or hysteresis. A brief pass in front of the desk or a momentary detection dropout will fire the full automation sequence: locking the vault, pausing the focus session, and alerting Marciale, then immediately reversing all of it. This makes the feature feel broken and unreliable in real use. The vault auto-lock also has no guard against locking while unsaved data is open.
Tasks:
Implement a four-state presence automation state machine: PRESENT, GOING_AWAY (timer started, not yet committed), AWAY, and RETURNING (timer started, not yet committed). Transitions only commit after the configured delay thresholds are met.
Add confidence gating at the state machine entry point: signals below the configured confidence threshold are discarded before they can influence state.
Implement symmetric automation: the away path (lock vault, pause Pomodoro, alert Marciale) has a full mirror return path (prompt to unlock vault, offer to resume Pomodoro, Marciale welcome message).
Add a vault safety guard: check for unsaved changes before locking, auto-save a draft if found, and show a toast notification confirming the auto-save.
Log all automation trigger events to the IndexedDB Activity Archive with timestamp, trigger type, confidence at trigger time, and away duration.
Expose all thresholds as user-configurable settings: away trigger delay, return trigger delay, confidence threshold, and individual automation toggles.
Success Criteria: Brief absences under the configured threshold do not trigger any automation. Full away and full return sequences both execute completely and symmetrically. Vault never locks with unsaved data silently.
Build 33.7 — RuView Theming & UI Polish
Goal: Make the embedded RuView UI feel like a native part of TheHUB rather than a foreign app dropped into an iframe.
Problem: RuView ships its own CSS designed for a standalone application. When embedded, it clashes with TheHUB's dark theme, color palette, typography, and design language. The visual inconsistency breaks the unified OS feeling that is central to TheHUB's identity.
Tasks:
Inject a CSS override stylesheet into the RuView iframe document after load that maps TheHUB's CSS variables (background, accent, text, border colors) onto RuView's UI elements.
Hide RuView's own navigation header and footer since TheHUB provides all shell chrome for the tab.
Build a RuView-specific toolbar rendered by TheHUB above the iframe containing: connection status indicator, simulation vs live mode toggle, performance mode toggle (3D signal field vs 2D heatmap), fullscreen expand button, and manual reload button.
Add reduced motion support: when prefers-reduced-motion is detected, send a postMessage to the iframe disabling particle systems, Gaussian splat animations, and skeleton interpolation smoothing.
Audit RuView's font usage and override with TheHUB's font stack for visual consistency.
Success Criteria: A user looking at the RuView tab cannot visually distinguish it from a natively built TheHUB page. All interactive controls work correctly after theme injection.
Build 33.8 — Activity Archive & Presence Analytics
Goal: Persist RuView time-series data to IndexedDB so TheHUB builds a cumulative picture of the user's work patterns that survives sessions and can be queried by Marciale.
Problem: RuView generates rich continuous data (presence events, vitals readings, signal strength over time) but none of it is persisted. Every session refresh destroys all history. A command center that forgets everything is not a command center. Historical patterns are also the most valuable input Marciale could receive for genuinely useful long-term suggestions.
Tasks:
Define a RuView event schema in IndexedDB and log all presence state transitions (away, return, session start, session end) with timestamp, duration, confidence, source, and average vitals during the period.
Build a daily aggregation function that computes: total time at desk, break count, average break duration, average breathing rate, peak and low activity periods, and first and last detection timestamps.
Add a RuView History panel inside the RuView tab showing a visual timeline bar of today's desk activity with at-desk and away periods color-coded, plus the daily aggregate stats below it.
Feed the daily summary to Marciale's context block (Build 33.5) so it has historical pattern data, not just the current moment.
Add a data retention policy setting in Hub Control allowing the user to configure how many days of RuView history to keep before automatic pruning.
Success Criteria: Refreshing TheHUB does not lose any RuView history. The daily timeline renders accurately. Marciale can reference yesterday's desk time in conversation.
Build 33.9 — Experimental Systems Integration & Hub Control Panel
Goal: Unify all RuView configuration, feature flags, connection management, and diagnostic tools into a single dedicated section inside Hub Control so the user has complete visibility and control over every aspect of the integration.
Problem: By Build 33.8, RuView has nine interconnected components (Docker service, iframe embed, lazy loading, postMessage bridge, Today card, Marciale context, automation engine, theming, and activity archive) with no unified place to manage them. Settings are scattered, there is no connection testing tool, and there is no log viewer for debugging WebSocket issues. This makes the integration opaque and hard to maintain.
Tasks:
Add a dedicated RuView Integration section to Hub Control with the following grouped controls: master enable toggle; WebSocket URL field; sensing mode selector (Simulation vs Live Hardware); individual feature toggles for the iframe tab, Today presence card, Marciale context feed, presence automations, and activity archive; performance toggles for 3D signal field, pose skeleton, and update rate; full presence automation threshold controls (away delay, return delay, confidence threshold, individual automation action toggles); and data retention policy for the activity archive.
Add a Test Connection button that performs a full connection test sequence: pings the health endpoint, opens a WebSocket, waits for the first message, and reports success or a specific failure message (service offline, CORS error, auth failure, timeout).
Add a RuView Event Log panel showing the last 50 raw events received from the WebSocket with timestamp, event type, confidence, and payload, for live debugging without opening browser DevTools.
Persist all Hub Control RuView settings to a dedicated ruview_settings IndexedDB store so they survive page refreshes and are included in TheHUB's standard backup export.
Add a Reset Defaults button that restores all RuView settings to their recommended baseline values.
Success Criteria: Every RuView behavior can be configured, tested, and debugged entirely from within Hub Control without touching code or browser DevTools. All settings persist across sessions and are included in backup exports.
4. The v2.0 Operating System Evolution (Builds 34 – 45)
Turning TheHUB into an autonomous, offline, creative, and semantic operating system.

Pre-Flight Checklist Before Starting Build 34
Before beginning the v2.0 phase, confirm all of the following are complete from the Build 33.x sprint:

 Build 33.0: Docker service running, proxy route working, health check green
 Build 33.1: RuView tab embedded and themed correctly
 Build 33.2: No GPU/CPU impact on other pages when RuView tab is not active
 Build 33.3: postMessage bridge delivering typed events to TheHUB
 Build 33.4: Today dashboard presence card live and degrading gracefully offline
 Build 33.5: Marciale receiving RuView context and proactive alerts firing
 Build 33.6: Away and return automations both complete, debounced, and vault-safe
 Build 33.7: RuView UI visually indistinguishable from native TheHUB pages
 Build 33.8: Activity archive persisting to IndexedDB, daily timeline rendering
 Build 33.9: All RuView settings manageable from Hub Control, test connection working
Phase 1: The Mode Switcher (UI Architecture)
Build 34 — Workspace State Foundation: Wrap page containers in .workspace-classic to isolate cognitive loads.
Build 35 — Nexus UI Master Toggle: Build the top-left dropdown to instantly hot-swap the DOM between Classic (Productivity), Intel (Osiris/RuView), and Creative (CADAM) workspaces without reloading the browser.
Phase 2: Advanced Local RAG (Second Brain PKM)
Build 36 — Vector Store Setup: Integrate a client-side vector database (like Orama or transformers.js) storing arrays in IndexedDB.
Build 37 — Background Index Worker: Write a Web Worker that silently chunks and embeds completed Tasks and saved Notes when the CPU is idle.
Build 38 — Deep Memory Tool: Create a query_deep_memory tool for Marciale to automatically search semantic history during chats.
Phase 3: Project N.O.M.A.D. & Osiris Global Awareness
Build 39 — Intel Workspace UI: Build the empty OSINT dashboard in the new .workspace-intel container.
Build 40 — Osiris Python Connector: Update server.py to fetch RSS feeds, local weather, and threat map data.
Build 41 — N.O.M.A.D. Offline Archive: Integrate kiwix-serve. Add a search_offline_archive tool so Marciale can query local .zim files (Wikipedia, Offline Maps) when the internet drops.
Phase 4: CADAM Text-to-CAD Integration
Build 42 — Creative Workspace Viewport: Integrate a WebAssembly OpenSCAD renderer (openscad.wasm) into the .workspace-creative container.
Build 43 — Coder Model Routing: Create a specific generate_cad AI function that bypasses the main model to explicitly route instructions to a specialized local coding LLM (e.g. qwen2.5-coder).
Build 44 — Error Correction Loops: Create auto-correcting feedback loops inside CADAM to catch compilation errors, parse them, and let Marciale self-correct the SCAD code.
Build 45 — Fabrication Export Pipeline: Add options to export WebGL buffers directly to .STL files and save source code scripts to the Notes Library.
