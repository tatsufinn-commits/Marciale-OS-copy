# 🌌 TheHUB — Updated Feature README

TheHUB is a local-first personal command center. It combines planning, bookmarks, calendar, tasks, projects, notes, intake tracking, encrypted vault storage, activity streaks, a local AI assistant named Marciale, and optional experimental companion systems.

Everything is designed to run locally on your machine.

---

## Major Features

### Today Dashboard

The Today Dashboard shows:

- Next Up calendar items and deadlines
- urgent Kanban tasks
- LOCK IN card with custom hours/minutes
- energy and sleep readiness
- Marciale suggestions and approval cards
- Marciale Autopilot card
- Professional proactive alerts
- safe Instructor Mode focus prompts
- Marciale Strategic Scan insights
- Hub Activity Heatmap
- optional Momentum Companion mini-frame inside Hub Activity

### Main Pages

TheHUB currently includes these main pages:

```txt
Today
Portal & Bookmarks
Idle Hero
ChessLab
RuView
Calendar
Tasks
Notes
Marciale
Intake Tracker
Vault
```

Idle Hero is the full Momentum Companion webgame page. ChessLab and RuView are prepared Category C pages/placeholders for later builds.

---

## Hub Activity Heatmap

The heatmap tracks meaningful productivity actions locally:

- completed tasks
- completed LOCK IN sessions
- created notes
- edited notes
- intake logs
- calendar additions
- bookmarks
- approved Marciale actions

It includes:

- 365-day heatmap grid
- today points
- current streak
- best streak
- day detail panel
- filters by activity type
- settings for which activity types count
- reset activity history only
- first-activity and streak milestone celebrations
- recent localStorage data plus older activity archive support

Related keys:

```txt
hub.activity.v1
hub.activity.archive.index.v1
hub.activity.archive.<YYYY-MM>
```

---

## Momentum Companion / Idle Hero

The Momentum Companion is an optional Category C reward layer powered by real Hub Activity.

Corrected structure:

```txt
Hub Activity card
├── activity-main-wrap
│   ├── streak stats
│   ├── heatmap
│   └── activity details
│
└── activity-companion-embed
    └── companion-mini iframe
        └── companion-mini/index.html

Idle Hero page
└── full Idle Hero iframe
    └── companion/index.html
```

The mini companion displays compact status inside Hub Activity.

The full Idle Hero page loads the real built Idle Hero webgame from:

```txt
https://github.com/alexis-labs/idle-hero.git
```

Built files live in:

```txt
companion/index.html
companion/assets/
companion/IDLE_HERO_SOURCE.md
```

Mini files live in:

```txt
companion-mini/index.html
companion-mini/companion-mini.css
companion-mini/companion-mini.js
```

Important rule:

```txt
Hub progress powers Idle Hero.
Idle Hero gameplay does not create main Hub productivity points by default.
```

Companion data keys:

```txt
hub.companion.v1
hub.companion.events.v1
```

---

## Experimental Systems

TheHUB has a Category C Experimental Systems registry stored in:

```txt
hub.experimental.v1
```

Hub Control includes toggles for:

- Companion
- Companion display in Hub Activity
- Companion pause/reduced-motion behavior
- ChessLab
- Chess activity rewards
- Presence
- RuView bridge
- RuView WebSocket URL

Experimental systems are optional and fail-safe. If Companion, ChessLab, Presence, or RuView fails, core Hub should continue working.

---

## Kanban Tasks and Projects

- To Do / In Progress / Done
- calendar deadline dropbox
- drag deadline into Kanban to create a task
- priority, due date, project, estimate, notes
- project dashboard
- project detail view
- project pre-mortem prompts
- overdue styling
- completed tasks feed Hub Activity and the optional Companion reward bridge

---

## Calendar

- events and deadlines
- priority
- reminders
- recurrence
- .ics import/export
- upcoming cards
- project linking
- optional Mapúa feed through MAPUA_ICS_URL

---

## Markdown Notes

- multi-note library
- Markdown editor
- sanitized preview
- formatting tools
- code block rendering
- note activity tracking
- project linking
- note metadata in localStorage
- note bodies stored through the IndexedDB payload layer

Related keys:

```txt
hub.notes.library.v1
hub.notes.body.<id>
```

---

## Intake Tracker

- caffeine, taurine, sugar logs
- date/time precision
- active caffeine half-life math
- sleep readiness forecast
- biometric intake estimates
- radial intake cards
- quick-add drink tiles
- daily and intra-day charts

---

## Vault

- local AES-GCM encrypted account vault
- master password protected
- passwords are never sent to Marciale
- optional vault metadata search only when unlocked and enabled

---

## Information Center

The Information Center stores local non-secret context Marciale can use for better planning:

- lifestyle
- school/course/subjects
- routines and habits
- energy patterns
- constraints
- work hours and sleep targets
- planning preferences

Data key:

```txt
hub.info.center.v1
```

It can be enabled or disabled as Marciale context. It should not contain passwords, API keys, recovery codes, or secrets; use Vault for secrets.

---

## Marciale AI Assistant

Marciale runs through local Ollama models.

Capabilities:

- multi-session chat
- floating chat history action menu for rename, pin, archive, and delete
- auto model detection
- local workspace document context
- IndexedDB-backed workspace document storage
- safe website text fetch through /api/fetch
- local memory search
- native tool calling with JSON schemas
- editable action approval cards
- task/calendar/note/bookmark/intake tools
- vault metadata search when enabled

### Desktop Notifications

TheHUB includes opt-in browser desktop notifications for Instructor interventions, Marciale/Autopilot alerts, and calendar reminders. Settings support quiet hours, cooldowns, permission request, and a test notification. If browser notifications are unavailable or denied, TheHUB falls back to in-app toasts.

### AI Resource Governor

TheHUB includes local model controls:

- model presets: Daily Fast, Tool Reliable, Strategic Deep, Low RAM
- keep-alive
- context budget
- daily assistant model
- Autopilot model
- Strategic model
- Autopilot cooldown
- loaded model status
- model tier warning
- unload current model helper

### Marciale Profiles

1. Balanced — neutral default
2. Assistant — competent advanced helper
3. Professional — proactive planning-risk scanner
4. Instructor — aggressive but safe accountability mode
5. Marciale — philosophical strategic-analysis mode

### Autopilot

Marciale Autopilot can detect:

- overdue tasks
- tasks due soon
- deadlines without Kanban tasks
- too many tasks in progress
- no activity by configured time
- caffeine/sleep risks
- vault left unlocked

It is visible, logged, opt-in, and does not run OS-level scripts or access vault passwords.

---

## Settings / Hub Control Center

The settings drawer includes:

- navigation
- theme editor
- UI optimizer
- Activity Heatmap controls
- AI Resource Governor
- assistant permissions
- Marciale Autopilot tuning
- keyboard shortcuts
- Marciale brain profiles and hygiene
- command guide
- Projects
- Experimental Systems
- data/maintenance
- backup and restore
- debug log
- install/PWA
- Danger Zone

Settings are searchable and collapsible.

Danger Zone reset requires three-step verification:

1. confirm reset
2. type RESET
3. type DELETE HUB DATA

---

## Keyboard Shortcuts

- Ctrl/Cmd + K: command palette
- Alt + 1–0: switch pages
- ?: shortcut overlay
- Esc: close topmost dialog
- Arrow keys: move in command palette
- Enter: run command / send Marciale
- Shift + Enter: new line in Marciale

---

## Quick Start

Run:

```bash
python3 server.py
```

Open:

```txt
http://127.0.0.1:8000
```

For Marciale, start Ollama with CORS enabled:

```bash
OLLAMA_ORIGINS="http://127.0.0.1:8000" ollama serve
```

Windows launcher scripts are included for normal Hub launch and Hub-with-Ollama launch.

---

## Development

Install dependencies:

```bash
npm ci --ignore-scripts
```

Run tests:

```bash
npm test
```

The test suite checks syntax, app smoke behavior, tasks, Marciale tools, command palette, settings, activity heatmap, storage foundations, brain profiles, Autopilot behavior, Companion/Idle Hero basics, and server safety behavior.

---

## Privacy Notes

- Data is local-first.
- Private data files such as hub-data.json and bookmarks.json should not be committed.
- Vault passwords are encrypted and never sent to Marciale.
- Marciale Brain is not for secrets.
- /api/fetch blocks private/local IP targets.
- POST endpoints check origins.
- Idle Hero receives limited reward events only, not Vault secrets, full notes, full chat history, or biometric details by default.
