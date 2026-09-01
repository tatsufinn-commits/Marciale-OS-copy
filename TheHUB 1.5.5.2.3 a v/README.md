# 🌌 TheHUB — Local-First Personal Command Center

TheHUB is a private, local-first personal operating center for your day, work, projects, energy, notes, deadlines, accounts, activity streaks, local AI assistance, and optional experimental companion systems.

It runs on your own machine, stores your data locally, and uses a local AI assistant named **Marciale** through Ollama. The goal is simple: give you a fast, private, customizable command center without cloud subscriptions or data harvesting.

---

## ✨ Core Pages

TheHUB currently exposes these main pages/tabs:

1. **Today** — daily operating dashboard.
2. **Portal & Bookmarks** — tools, links, and saved resources.
3. **Idle Hero** — full Momentum Companion / Idle Hero webgame view.
4. **ChessLab** — Build 30 local board foundation with persistent state, offline local opponent, FEN tools, move log, Hub Activity / Companion reward bridge, and Marciale tactical analysis prompt.
5. **RuView** — placeholder tab for the planned local presence/RuView bridge.
6. **Calendar** — events, deadlines, reminders, recurrence, and `.ics` support.
7. **Tasks** — Kanban tasks and project-linked execution.
8. **Notes** — multi-note Markdown notebook.
9. **Marciale** — local AI assistant workspace.
10. **Intake Tracker** — caffeine, taurine, sugar, sleep-readiness, and biometric estimates.
11. **Vault** — local encrypted account vault.

---

## ☀️ Today Dashboard

The Today Dashboard is the main operating surface of TheHUB. It brings together:

- **Next Up** — upcoming events and deadlines.
- **Urgent Tasks** — Kanban tasks sorted by due date and priority.
- **LOCK IN** — task-linked or general focus blocks with custom hours/minutes.
- **Energy & Sleep** — active caffeine and sleep-readiness estimates.
- **Marciale Suggestions** — AI-generated action cards with approval controls.
- **Marciale Autopilot** — visible, local-first supervision and safe autonomous Hub actions.
- **Professional Alerts** — proactive planning-risk warnings for urgent work.
- **Instructor Mode** — safe, in-Hub accountability and focus prompts.
- **Marciale Strategic Scan** — deeper analysis of project risk, rhythm, and bottlenecks.
- **Hub Activity Heatmap** — a GitHub-style streak graph for daily momentum.
- **Momentum Companion mini-frame** — optional Idle Hero companion summary embedded inside Hub Activity.

---

## 🟩 Hub Activity Heatmap

TheHUB includes a local activity/streak system. Recent activity is kept fast in localStorage and older activity can be archived through the IndexedDB storage foundation.

Primary keys:

```txt
hub.activity.v1
hub.activity.archive.index.v1
hub.activity.archive.<YYYY-MM>
```

Tracked actions include:

| Activity | Points |
|---|---:|
| Task completed | 3 |
| LOCK IN completed | 5 |
| Note created | 2 |
| Note edited | 1 |
| Intake logged | 1 |
| Calendar event/deadline added | 2 |
| Bookmark added | 1 |
| Marciale action approved | 2 |
| Chess match completed | 2 |
| Chess match won | 3 |

Features:

- 365-day heatmap.
- current streak.
- best streak.
- today’s points.
- day detail panel.
- filters by activity type.
- activity settings.
- activity reset only.
- first-activity celebration.
- streak milestone celebration.
- reduced-motion support.
- optional Momentum Companion mini-frame embedded in the right side of Hub Activity.

---

## 🧬 Momentum Companion / Idle Hero

The Momentum Companion is the optional Category C reward layer powered by real Hub Activity.

The current corrected structure is:

```txt
Today Dashboard
└── Hub Activity Card
    ├── activity-main-wrap
    │   ├── streak stats
    │   ├── heatmap
    │   └── activity detail
    │
    └── activity-companion-embed
        └── companion-mini iframe
            └── companion-mini/index.html

Idle Hero Page
└── full Idle Hero iframe
    └── companion/index.html
```

The companion iframe is now wrapped in a reusable **HubFrame** component that provides consistent loading/status chrome, safe postMessage handling, and reload/close controls. The same HubFrame will be reused for Chess, RuView, and CADAM in future builds.

### Companion mini-frame

The mini Momentum Companion lives inside the Hub Activity card and displays:

- companion name/status.
- level.
- XP.
- progress to next level.
- streak.
- latest Hub activity feed.
- bridge/delivery status.
- button to open the full Idle Hero page.

### Full Idle Hero page

The full Idle Hero tab/page loads the real built Idle Hero webgame inside TheHUB.

Source reference:

```txt
https://github.com/alexis-labs/idle-hero.git
```

Built output lives in:

```txt
companion/index.html
companion/assets/
companion/IDLE_HERO_SOURCE.md
```

The mini companion lives in:

```txt
companion-mini/index.html
companion-mini/companion-mini.css
companion-mini/companion-mini.js
```

### Reward bridge

TheHUB sends real Hub Activity to Idle Hero through `postMessage()`.

TheHUB sends:

```txt
hub.activity
hub.companion.snapshot
hub.companion.event
hub.companion.pause
hub.companion.resume
```

Idle Hero acknowledges rewards with:

```txt
idlehero.ready
idlehero.ack
```

Companion event data is stored locally in:

```txt
hub.companion.v1
hub.companion.events.v1
```

Important rule:

```txt
Hub progress powers Idle Hero.
Idle Hero gameplay does not create main Hub Activity points by default.
```

---

## 🧪 Experimental Systems

Category C systems are controlled through the Experimental Systems registry:

```txt
hub.experimental.v1
```

The Hub Control Center includes toggles for:

- Companion.
- Companion in Today / Hub Activity.
- Companion pause/reduced-motion behavior.
- ChessLab.
- Chess activity rewards.
- Presence.
- RuView bridge.
- RuView WebSocket URL.

Experimental systems are optional and fail-safe. If a companion, ChessLab, or RuView module fails, core Hub should continue working.

---

## 🗃️ Information Center

The Information Center is a local user-maintained context profile Marciale can use to plan better.

It can store non-secret context such as:

- lifestyle and routines.
- school, course, subjects, term, instructors, and grading notes.
- habits and energy patterns.
- preferred work hours and sleep targets.
- planning preferences, deadline buffer, and preferred LOCK IN length.
- constraints such as commute, chores, device limits, or schedule limits.

Data key:

```txt
hub.info.center.v1
```

The Information Center is optional and can be toggled as Marciale context. It is not the Vault. Do not store passwords, API keys, recovery codes, or private secrets here.

---

## 🤖 Marciale — Local AI Assistant

Marciale is TheHUB’s local-first AI assistant. It connects to your local Ollama models and can reason over Hub context while respecting privacy and approval settings.

Marciale can:

- chat across multiple sessions.
- manage chat sessions with a floating rename/pin/archive/delete menu.
- detect installed Ollama models.
- read attached local workspace documents.
- safely fetch readable website text through `/api/fetch`.
- search local Hub memory.
- create/edit approved Hub actions through native tool schemas.
- manage tasks, notes, bookmarks, events, and intake logs.
- search Vault metadata only when unlocked and explicitly allowed.
- prepare editable action cards before making changes.

Marciale never receives saved Vault passwords.

---

## 🧠 AI Resource Governor

TheHUB includes an AI Resource Governor to keep local Ollama usage under control.

Controls include:

- model role presets: Daily Fast, Tool Reliable, Strategic Deep, and Low RAM.
- keep-alive setting.
- context budget.
- daily assistant model.
- Autopilot reasoning model.
- Strategic/deep analysis model.
- Autopilot AI cooldown.
- loaded model status via Ollama `/api/ps`.
- model tier warnings.
- unload current model helper.

Related keys:

```txt
hub.ai.resource.v1
hub.ai.keepAlive
hub.ai.numCtx
hub.ai.autopilotCooldownMin
hub.ollama.model
hub.ollama.autopilotModel
hub.ollama.strategicModel
```

Recommended principle:

```txt
Small model by default.
Large model deliberately.
Background AI only when useful.
```

---

## 🔔 Desktop Notifications

TheHUB includes a desktop notification layer for browser-supported popups.

Notification settings are stored in:

```txt
hub.notifications.v1
```

The Hub Control Center can configure:

- enable/disable desktop notifications.
- Instructor intervention notifications.
- Marciale / Autopilot alert notifications.
- Calendar reminder notifications.
- quiet hours.
- cooldown seconds.
- permission request.
- test notification.

If desktop notifications are unsupported, denied, muted by quiet hours, or rate-limited, TheHUB falls back to visible in-app toasts.

Notifications are opt-in and do not use OS lockout, unclickable windows, or focus hijacking.

---

## 🧠 Marciale Profiles

Marciale has profile modes. Profiles change Marciale’s behavior without deleting personal memories.

| Profile | Demeanor | Purpose |
|---|---|---|
| **Balanced** | Neutral | Default safe assistant for everyday Hub use. |
| **Assistant** | Competent | Stronger general assistant with improved planning and tool discipline. |
| **Professional** | Proactive | Scans Hub context for urgent tasks, deadlines, and planning gaps. |
| **Instructor** | Aggressive but safe | Strict accountability with safe in-Hub focus pressure. |
| **Marciale** | Philosophical / strategic | Deep pattern analysis, long-term risk detection, and Autopilot supervision. |

The profile preview shows the selected profile before applying it, including profile name, demeanor, role, summary, skills/style text, and active full brain block.

Applying a profile changes only the **Skills / Style Profile** field. It preserves assistant name, prefix injection, memories, suffix injection, and injection toggles.

---

## 🛰️ Marciale Autopilot

Marciale Autopilot is a safe autonomy layer for the **Marciale** profile.

It watches Hub state while TheHUB is open, detects risks, logs scans, prepares actions, and can run safe non-destructive Hub actions depending on autonomy level.

Autopilot can detect:

- overdue tasks.
- tasks due soon.
- deadlines without Kanban tasks.
- too many tasks in progress.
- no activity logged today.
- late-day caffeine risk.
- vault left unlocked.

Autonomy levels:

| Level | Behavior |
|---|---|
| **Observe only** | Scans and reports signals. |
| **Suggest actions** | Prepares Marciale approval cards. |
| **Auto-run safe actions** | Runs non-dangerous Hub actions visibly and logs them. |
| **Full Hub autonomy** | Strongest safe in-Hub autonomy with max-actions-per-scan limits. |

Autopilot logs scans/actions locally in:

```txt
hub.autopilot.log.v1
```

Autopilot does not delete data, access vault passwords, run OS scripts, spy on tabs, hide actions, or create unclickable windows.

---

## 🧭 Professional Alerts

When the **Professional** profile is active, TheHUB can surface proactive in-Hub planning alerts.

Professional Alerts detect:

- overdue tasks.
- tasks due soon.
- deadlines without Kanban tasks.
- no activity by midday.
- caffeine/sleep readiness risks.

Alerts are visible, dismissible, and safe.

---

## 🧨 Instructor Mode

Instructor Mode is an aggressive but safe accountability mode.

It can:

- show strict Today Dashboard warnings.
- open a dismissible focus intervention overlay.
- require typed acknowledgement: `I WILL WORK`.
- start a 25-minute focus block.
- snooze for 10 minutes.
- switch back to Professional.

Instructor Mode does **not** use OS-level scripts, PowerShell/Tkinter windows, browser-tab spying, unclickable overlays, or focus hijacking.

---

## 🧠 Marciale Strategic Scan

The **Marciale** profile includes a strategic scan card for deeper analysis.

It looks at:

- upcoming deadlines.
- overdue tasks.
- missing Kanban tasks.
- activity rhythm.
- note depth.
- intake/caffeine pressure.
- recent completion velocity.
- potential peak-performance windows.

It can draft a deep analysis prompt for Marciale and apply safe **Ghost Mode**.

Ghost Mode is a Hub-only focus preset. It can change TheHUB’s UI to a calmer focus layout, but it does not modify the operating system.

---

## ♟️ ChessLab

Build 28 gives ChessLab a persistent local board foundation with:

- playable DOM board.
- persistent local state.
- real browser-side rules engine.
- chess engine worker foundation.
- Stockfish browser integration.
- Elo-shaped AI difficulty ladder.
- character-based local opponents.
- Marciale special bot with scalable engine-strength modes up to 3800.
- local chess sound system.
- personality-biased move policy on top of engine candidate lines.
- upgraded bot-select UX with roster cards, records, and premium Marciale presentation.
- Marciale Chess Coach layer with engine-backed candidate summaries.
- local offline opponent.
- FEN load/copy tools.
- move log.
- manual match result buttons.
- Hub Activity logging for completed matches.
- extra activity points for wins.
- Momentum Companion reward bridge when Chess activity rewards are enabled.
- Analyze with Marciale button that sends the current FEN and recent moves into the assistant.

Build 30.11.3 upgrades ChessLab with Maia ONNX neural human-move prediction, ONNX Runtime Web integration, IndexedDB model caching, and a Maia Mode engine selector. Build 30.11.2 upgrades ChessLab with Vesta Minimax Quiescence Search & Iterative Deepening, Elo-based Softmax temperature, and deterministic blunder chance calibration. Build 30.11.1 upgrades ChessLab to a Hybrid AI Engine Core with UCI Threads / Hash / NNUE option control, live engine diagnostics, and capability detection. Build 30.2 upgrades ChessLab to a real browser-side rules engine with legal move validation, castling, en passant, promotions, and proper game-state detection. Build 30.3 adds the chess engine worker foundation and browser capability/status layer. Build 30.4 plugs ChessLab into a browser-side Stockfish worker when available, while Build 30.5 formalizes the AI difficulty ladder into Elo-shaped targets from 1000 to 2800. Build 30.6 adds named character opponents, Build 30.6.2 introduces Marciale as a special adaptive bot whose engine-strength ladder can scale from educational levels up to 3800, Build 30.6.3 adds local chess sound effects with toggle/volume controls, Build 30.7 begins real personality move-policy selection over engine candidate lines, Build 30.8 upgrades the bot-select experience into a richer roster browser with records and premium Marciale treatment, Build 30.9 adds the Marciale Chess Coach layer with engine-backed candidate summaries and coach prompts, and Build 30.10 calibrates how much each Elo band is allowed to drift from best-engine play so weaker bots feel human but not broken. Optional human-like expansion still arrives afterward.

---

## ✅ Projects, Tasks & Kanban

The task system includes:

- To Do / In Progress / Done columns.
- drag-and-drop cards.
- priority, due date, project, estimate, and notes.
- project linking.
- project dashboard.
- project detail view.
- project pre-mortem prompts.
- overdue styling.
- calendar deadline dropbox.
- automatic activity logging when tasks are completed.

Calendar deadlines can be converted into tasks by dragging them into Kanban.

---

## 📅 Calendar

The calendar supports:

- events and deadlines.
- priorities.
- reminders.
- recurrence.
- upcoming-event cards.
- `.ics` import/export with robust parsing (folded lines, UTC, all-day, RRULE, VALARM).
- optional Mapúa/Blackboard feed support through `MAPUA_ICS_URL`.
- show/hide imported readonly events (e.g., Mapúa feed) with a toolbar toggle.
- project linking.

For critical reminders, native calendar export is recommended because browser notifications only work reliably while TheHUB is open.

---

## 📝 Markdown Notes

TheHUB includes a multi-note Markdown library with:

- note sidebar.
- Markdown editor.
- sanitized live preview.
- formatting tools.
- code block rendering.
- note activity tracking.
- project linking.
- note metadata stored in localStorage.
- note bodies stored through the IndexedDB payload layer.

Related keys:

```txt
hub.notes.library.v1
hub.notes.body.<id>
```

---

## ⚡ Intake Tracker

Track:

- caffeine.
- taurine.
- sugar.
- exact date/time.
- active caffeine.
- active taurine.
- active sugar.
- sleep readiness.
- optional biometric intake estimates.

The tracker uses half-life math to estimate when active caffeine drops below your configured sleep threshold.

Build 20 added radial intake cards, quick-add drink tiles, personalized caffeine/sugar estimates, and a clearer sleep-readiness card.

---

## 🔐 Encrypted Vault

TheHUB includes a local AES-GCM encrypted Vault for account information.

- protected by a master password.
- encrypted before saving to browser storage.
- vault metadata can be searched only when unlocked and allowed.
- saved passwords are never sent to Marciale.

The Vault is safer than plain localStorage, but it is not a replacement for a dedicated password manager.

---

## 💾 Storage, Backup & Restore

TheHUB uses a localStorage-first design for boot compatibility, with IndexedDB payload storage for larger data.

Storage layers include:

```txt
localStorage — synchronous boot metadata and recent data
IndexedDB mirror/payloads — larger notes, workspace files, restore payloads, activity archives
hub-data.json — optional local shared sync file when using server.py
```

Restore Center supports:

- manual restore points.
- restore selected point.
- export restore point.
- delete restore point.
- automatic restore point before import/reset/restore.

Private local data files such as `hub-data.json` and `bookmarks.json` should be excluded from commits and release zips.

Danger Zone reset requires three-step verification:

1. confirm reset.
2. type `RESET`.
3. type `DELETE HUB DATA`.

---

## 🎨 Hub Control Center

The Hub Control Center includes:

- navigation.
- appearance/theme controls.
- UI optimizer.
- Activity Heatmap settings.
- AI Resource Governor.
- Marciale Autopilot settings.
- assistant permissions.
- keyboard shortcuts.
- Marciale brain profiles.
- brain hygiene tools.
- command guide.
- Projects.
- Experimental Systems.
- backup/restore.
- debug log.
- install/PWA.
- Danger Zone.

Settings are searchable and collapsible.

---

## ⌨️ Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + K` | Open command palette |
| `Alt + 1–0` | Switch pages |
| `?` | Show shortcut overlay |
| `Esc` | Close topmost dialog |
| `↑ / ↓` | Move in command palette |
| `Enter` | Run command / send Marciale message |
| `Shift + Enter` | New line in Marciale |

---

## 🚀 Quick Start

### Windows

Double-click:

```txt
start-hub.bat
```

Or for Ollama support:

```txt
start-hub-with-ollama.bat
```

### macOS

```bash
chmod +x start-hub.command
./start-hub.command
```

### Linux

```bash
chmod +x start-hub.sh
./start-hub.sh
```

### Manual

```bash
python3 server.py
```

Open:

```txt
http://127.0.0.1:8000
```

---

## 🧠 Ollama Setup

Start Ollama with CORS enabled for TheHUB.

### Windows Command Prompt

```cmd
set OLLAMA_ORIGINS="http://127.0.0.1:8000"
ollama serve
```

### macOS / Linux

```bash
OLLAMA_ORIGINS="http://127.0.0.1:8000" ollama serve
```

If Marciale says `Failed to fetch`, Ollama is usually offline or CORS is not configured for TheHUB.

---

## 🛠️ Development

Install dependencies:

```bash
npm ci --ignore-scripts
```

Run tests:

```bash
npm test
```

The test suite checks:

- JavaScript syntax.
- Python syntax.
- app smoke behavior.
- task persistence.
- Marciale tool schemas.
- command palette.
- settings.
- heatmap.
- brain profiles.
- Autopilot phases.
- AI Resource Governor behavior.
- IndexedDB storage foundations.
- Companion / Idle Hero integration basics.
- server safety behavior.

---

## 🔒 Security Notes

- The local server binds to `127.0.0.1` by default.
- `/api/fetch` blocks private/local IP targets.
- POST endpoints check origins.
- Private data files such as `hub-data.json` and `bookmarks.json` should not be committed.
- Vault passwords are encrypted and never sent to Marciale.
- Marciale Brain is not for secrets.
- Autopilot never accesses Vault passwords or the operating system.
- Idle Hero receives activity reward events only; it does not receive Vault secrets, full notes, biometric details, or chat history by default.

---

TheHUB is now a local-first personal operating center: planner, dashboard, notebook, tracker, vault, activity streak system, project manager, local AI workspace, and optional Idle Hero companion system in one private app.
