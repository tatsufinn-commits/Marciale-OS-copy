# 📜 JARWEN COUNCIL DIRECTIVE — TASK 01 FOR ENGINEER (MAX)
## Build 54 / Aetherweave Build 26: Companion Personal Quest Storylines & Signature Relics
**Document ID:** `TASK-JARWEN-2026-E01`  
**Date of Dispatch:** 2026-08-11 (Asia/Singapore)  
**Originating Authority:** Supreme Commander (Director) & ASSISTANT (Seat A — Chief Operating Officer)  
**Target Recipient:** ENGINEER (Max — Seat E / Chief Systems Architect)  
**Classification:** HIGH COUNCIL OPERATIONAL DIRECTIVE & BUILD MANDATE  
**Target Path:** `/docs/council/members/ENGINEER/tasks/TASK_01_PERSONAL_QUEST_CHAINS.md`  
**Governing Standard:** `docs/PATH.md` & `docs/council/JARWEN_FORMAT_SPECIFICATION.md` (Schema 01)  

---

# 🏛️ I. STRATEGIC CONTEXT & MANDATE

**To Max (`@engineer` / Seat E),**

The Supreme Commander has officially ordered the execution of **Build 54 (Aetherweave Build 26): Companion Personal Quest Storylines**.

### The Core Objective:
In earlier builds, we implemented the foundational **QuestSystem (Build 49)**, **AchievementSystem (Build 50)**, **DialogueSystem (Build 51)**, **AffinitySystem (Build 52)**, and **FactionSystem (Build 53)**.

Now, you are directed to integrate **narrative personal storyline chains** for companions (*Vaela, Kaelen, Sera*) that unlock dynamically as the player deepens their relationship bonding meter (Affinity $\ge 25, 50, 75$). Completing these personal quest chains awards unique, character-defining **Legendary Relics** from `Gamecompanion/content/02-QUEST-BIBLE.md` and `03-NPC-BIBLE.md`.

---

# ⚔️ II. THE 4-LAYER ENGINEERING LIFECYCLE (YOUR WORKFLOW)

You must execute this build through the ratified **Four-Eyes Engineering Pipeline**:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                    THE 4-LAYER ENGINEERING PIPELINE                        │
 └────────────────────────────────────────────────────────────────────────────┘

        @engineer (MAX)
         "DESIGN IT"      <- LAYER 1: Write explicit schemas in `personalQuests.js`
              │
              ▼
        @the_forge
         "BUILD IT"       <- LAYER 2: Implement logic in `QuestSystem.js` & UI modal
              │
              ▼
        @pangolin
         "PROVE IT"       <- LAYER 3: Run independent verification & unit tests
              │
              ▼
        @engineer (MAX)
         "ACCEPT IT"      <- LAYER 4: Audit diff & accept deliverable
```

---

# 📂 III. EXACT TARGET FILES & REPOSITORY PATHS (PER `PATH.MD`)

### Repository: `https://github.com/tatsufinn-commits/Marciale-OS.git`

| File Path | Action | Role & Responsibility |
|---|:---:|---|
| `Gamecompanion/files/src/data/personalQuests.js` | **CREATE** | Data-driven personal quest definitions and legendary relic rewards. |
| `Gamecompanion/files/src/systems/QuestSystem.js` | **MODIFY (Surgical Diff)** | Add `personalQuests` evaluation and affinity-gate checking. |
| `Gamecompanion/files/src/main.js` | **MODIFY (Surgical Diff)** | Wire personal quest triggers and celebration toasts. |
| `Gamecompanion/files/tests/PersonalQuests.test.js` | **CREATE** | Unit test suite verifying unlock conditions and relic disbursement. |
| `Gamecompanion/files/MASTER_ROADMAP_STATUS.md` | **MODIFY** | Mark Build 26 as Complete. |
| `docs/BUILD_LOGBOOK.md` | **MODIFY** | Append Build 54 entry. |
| `docs/patchnotes/PATCHNOTES_LEDGER.md` | **MODIFY** | Log `[PATCH-20260811-21]`. |
| `docs/SYSTEM_STATE.md` | **MODIFY** | Update verified build list. |

### 🛑 The 80% Code Blast-Radius Ceiling:
* When modifying `QuestSystem.js` and `main.js`, you are strictly **PROHIBITED from rewriting $\ge 80\%$ of the existing file**. Make surgical, modular additions.

---

# 💎 IV. DATA SPECIFICATIONS (FROM CONTENT BIBLES)

### 1. Vaela's Personal Chain: "The Roots of Belonging"
* **Required Affinity:** Unlocks at Affinity $\ge 25$.
* **Steps:**
  1. *Why I Don't Fit* (Objective: Slay 15 monsters alongside Vaela $\rightarrow$ +150G, +300XP).
  2. *The Telepathic Truth* (Objective: Open 3 treasure chests $\rightarrow$ +200G, +400XP).
  3. *The Half-Blood Village* (Objective: Clear 3 stages $\rightarrow$ +300G, +500XP).
* **Final Relic Reward:** `Vaela’s Amulet of Belonging` (Legendary Accessory: $+15\%$ Cast Speed, $+10\%$ Magic Damage).

### 2. Kaelen's Personal Chain: "The Knight's Redemption"
* **Required Affinity:** Unlocks at Affinity $\ge 25$.
* **Steps:**
  1. *The Broken Vow* (Objective: Slay 20 elite foes $\rightarrow$ +200G, +350XP).
  2. *The Shield of the Fallen* (Objective: Clear 5 stages $\rightarrow$ +300G, +500XP).
  3. *The True Oath* (Objective: Reach Hero Level 5 $\rightarrow$ +400G, +600XP).
* **Final Relic Reward:** `Kaelen’s Oathblade` (Legendary Weapon: $+35$ Attack Power, $+20\%$ Physical Mitigation).

### 3. Sera's Personal Chain: "The Echo Seeker's Truth"
* **Required Affinity:** Unlocks at Affinity $\ge 25$.
* **Steps:**
  1. *The Forgotten Archive* (Objective: Open 4 chests $\rightarrow$ +250G, +450XP).
  2. *Resonating Runes* (Objective: Slay 25 monsters $\rightarrow$ +350G, +600XP).
* **Final Relic Reward:** `Sera’s Echo Lens` (Legendary Off-Hand: $+25\%$ XP Multiplier, $+15\%$ Mana Recovery).

---

# 🧪 V. ACCEPTANCE CRITERIA & PRE-COMMIT VERIFICATION GATE

Before pushing or completing this directive, you must verify:

1. **Unit Test Pass:** `npm --prefix "Gamecompanion/files" test` passes all **42+ tests** (including `tests/PersonalQuests.test.js`).
2. **Build Compilation:** `npm run build` compiles Vite bundle into `TheHUB .../companion/` with 0 errors.
3. **Pangolin Sentinel Pass:** `npm run pangolin` passes all 43 TheHUB suites + all Companion RPG tests (**100% Green, SEV-0 Nominal**).
4. **Git Commit Message:** `feat(companion): [Build 54] add companion personal quest storylines and relics`.
5. **Release Archive:** Rebuild `MARCIALE_OS_COMPLETE.zip` (Commandment I).
6. **Dispatch Log:** Record `[DISPATCH]` in `docs/council/COUNCIL_COMMUNICATION_LOG.md`.

---

# 🎯 VI. DELIVERABLE LOCATION

File your completed architectural specification and execution report to:  
📁 **`/docs/council/members/ENGINEER/deliverables/TASK_01_PERSONAL_QUESTS_DELIVERABLE.md`**

---

**Issued by the High Command,**  
**Supreme Commander (Director)** & **ASSISTANT (Seat A — Chief Operating Officer)**  
*Marciale-OS JARWEN High Council*
