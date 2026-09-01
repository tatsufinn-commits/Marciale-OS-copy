# 🏛️ TAMAplugin — Mapúa Academic Studio Plugin for TheHUB (Marciale-OS)
## Seamless Integration between TAMA Architecture Vault & TheHUB Command Center

This directory contains the live integration suite connecting your Mapúa Architecture studies directly into your personal OS:

---

## 📦 Features & Capabilities:

### 1. `mapua-brain-preset.js`
* Adds the **`mapua_architect` (Mapúa Exam Coach)** Brain Profile to Marciale AI.
* Socratic mentor specializing in building laws (PD 1096, RA 9514, BP 344, RA 9266), structural mechanics, and MEPFS utilities.

### 2. `exam-calendar-card.js`
* Scans parsed Blackboard `.ics` feeds for upcoming Departmentals and Exit Exams ($<14\text{ days}$).
* Renders an urgent, glowing **Mapúa Exam Countdown Card** on the Today Dashboard with a 1-click **"Start Socratic Review"** shortcut.

### 3. `study-momentum-bridge.js`
* Dispatches `hub.activity` events whenever you finish studying in TAMA, granting **+200 Gold, +100 XP, and floating celebration particles** to your hero in the Idle Hero companion game!

### 4. `tama-plugin-init.js`
* Sandboxed orchestrator that initializes the plugin on boot and exposes `window.Hub.tama`.
