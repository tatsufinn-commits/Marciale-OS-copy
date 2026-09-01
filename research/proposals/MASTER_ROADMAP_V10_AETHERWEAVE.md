# 🗺️ MASTER ROADMAP V10.0 — AETHERWEAVE COMPANION RPG & HUB INTEGRATION
## The Canonical Sequential Build Roadmap (Builds 50 through 57 | Aetherweave Milestone 2)
**Document ID:** `ROADMAP-MASTER-V10-2026`  
**Classification:** TIER 1 CANONICAL SEQUENTIAL ROADMAP  
**Governing Authority:** `@joint` (The High Council) & Supreme Commander (Director)  
**Parent Governance:** `/docs/THE_10_COMMANDMENTS_OF_DOCS.md`, `/docs/AI_RULES.md` (Laws I–XIV)  
**Target Path:** `/home/user/Marciale-OS/research/proposals/MASTER_ROADMAP_V10_AETHERWEAVE.md`  

---

# 1. EXECUTIVE ROADMAP SUMMARY

Following the 100% completion of **Master Roadmap V9.0 (Builds 41–48)** and **Aetherweave Build 21 (Quest System Foundation)**, the project advances to **Master Roadmap V10.0**.

This roadmap executes the narrative, character, relationship, and faction content designed in the `Gamecompanion/content/` bibles (Content, Quests, NPCs, Monsters, Items, Dialogue, and World Progression) in an incremental, test-driven sequence where **every build is independently testable, produces a verified test suite, and packages a release archive**.

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │               MASTER ROADMAP V10.0 SEQUENTIAL EXECUTION CHAIN              │
 └────────────────────────────────────────────────────────────────────────────┘
                                       │
     ┌──────────────────┬──────────────┼──────────────┬──────────────────┐
     ▼                  ▼              ▼              ▼                  ▼
┌─────────────┐  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  ┌─────────────┐
│  BUILD 50   │  │  BUILD 51   │ │  BUILD 52   │ │  BUILD 53   │  │  BUILD 54   │
│ ACHIEVEMENT │  │ NPC DIALOGUE│ │  AFFINITY   │ │  FACTIONS   │  │ PERSONAL    │
│   SYSTEM    │  │   ENGINE    │ │ RELATIONSHIP│ │ REPUTATION  │  │   QUESTS    │
├─────────────┤  ├─────────────┤ ├─────────────┤ ├─────────────┤  ├─────────────┤
│ 56 Trophies │  │ Branching   │ │ Bond meters │ │ Loomguard / │  │ 5 Companion │
│ Stat buffs  │  │ Dialogue    │ │ Milestone   │ │ Unraveler   │  │ Signature   │
│ Toast HUD   │  │ Lore trees  │ │ Passives    │ │ Shop ranks  │  │ Relics      │
└──────┬──────┘  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘  └──────┬──────┘
       │                │               │               │                │
       └────────────────┴───────────────┼───────────────┴────────────────┘
                                        │
                         ┌──────────────┴──────────────┐
                         ▼                             ▼
                  ┌─────────────┐               ┌─────────────┐
                  │  BUILD 55   │               │  BUILD 56   │
                  │ BOUNTY BOARD│               │ COLLECTIBLE │
                  │ SIDE QUESTS │               │ LORE SHARDS │
                  ├─────────────┤               ├─────────────┤
                  │ Regional    │               │ Memory      │
                  │ Bounties &  │               │ Shards &    │
                  │ Mob Hunts   │               │ Relic Codex │
                  └─────────────┘               └─────────────┘
```

---

# 2. SEQUENTIAL BUILD SPECIFICATIONS

---

### 🏆 BUILD 50 (Aetherweave Build 22): Achievement System & Trophy Showcase
* **Responsible Seat:** `@engineer` (Seat E) / `@the_forge`
* **SPI Score:** **92 / 100** (Strategic: 24, Practicality: 25, Independence: 25, Risk: 2)
* **Goal:** Implement the data-driven achievement system with 56 structured trophies, automatic event evaluation (combat kills, gold earned, stages cleared, chests opened), permanent account stat passives, and in-game unlock toast banners.
* **Target Files:**
  * `Gamecompanion/files/src/data/achievements.js` (New data definitions)
  * `Gamecompanion/files/src/systems/AchievementSystem.js` (New system class)
  * `Gamecompanion/files/src/main.js` (Wire achievement modal & toasts)
  * `Gamecompanion/files/tests/AchievementSystem.test.js` (New unit tests)
* **Verification Criteria:** Clearing milestone triggers achievement unlock $\rightarrow$ emits `Events.ACHIEVEMENT_UNLOCKED` $\rightarrow$ reports snapshot to TheHUB.

---

### 💬 BUILD 51 (Aetherweave Build 23): NPC & Branching Dialogue Engine
* **Responsible Seat:** `@engineer` (Seat E) / `@the_forge`
* **SPI Score:** **91 / 100** (Strategic: 23, Practicality: 24, Independence: 25, Risk: 1)
* **Goal:** Implement the interactive dialogue engine supporting branching conversation trees, choice-based narrative paths, NPC portraits, and story progression unlocks from `06-DIALOGUE-BIBLE.md`.
* **Target Files:**
  * `Gamecompanion/files/src/data/dialogue/chapters.js` (Dialogue scripts)
  * `Gamecompanion/files/src/systems/DialogueSystem.js` (Branching state engine)
  * `Gamecompanion/files/src/ui/components/DialogueModal.js` (Dialogue UI overlay)
  * `Gamecompanion/files/tests/DialogueSystem.test.js` (Unit test suite)
* **Verification Criteria:** Interacting with NPCs opens dialogue modal with choice options, branching correctly to next dialogue nodes.

---

### 💖 BUILD 52 (Aetherweave Build 24): Affinity & Companion Relationship System
* **Responsible Seat:** `@engineer` (Seat E) / `@the_forge`
* **SPI Score:** **90 / 100** (Strategic: 23, Practicality: 24, Independence: 25, Risk: 2)
* **Goal:** Implement companion relationship bonding meters ($0\text{ to }100$ Affinity), milestone stat buffs (e.g. +5% crit with Vaela, +10% defense with Kaelen), and affinity gain on quest completion.
* **Target Files:**
  * `Gamecompanion/files/src/systems/AffinitySystem.js` (Relationship state authority)
  * `Gamecompanion/files/src/data/affinities.js` (Milestone bonus tables)
  * `Gamecompanion/files/tests/AffinitySystem.test.js` (Unit test suite)
* **Verification Criteria:** Completing shared quests increments companion affinity $\rightarrow$ hits milestone threshold $\rightarrow$ unlocks passive party buff.

---

### 🛡️ BUILD 53 (Aetherweave Build 25): Faction Reputation & Guild Supply System
* **Responsible Seat:** `@engineer` (Seat E) / `@the_forge`
* **SPI Score:** **90 / 100** (Strategic: 22, Practicality: 24, Independence: 25, Risk: 1)
* **Goal:** Implement the 5-rank faction reputation system (Loomguard & Unravelers: *Initiate $\rightarrow$ Sentinel $\rightarrow$ Warden $\rightarrow$ Champion $\rightarrow$ Paragon*) with discounted gear shops and faction skill unlocks from `02-QUEST-BIBLE.md`.
* **Target Files:**
  * `Gamecompanion/files/src/systems/FactionSystem.js` (Reputation authority)
  * `Gamecompanion/files/src/data/factions.js` (Faction ranks & reward tables)
  * `Gamecompanion/files/tests/FactionSystem.test.js` (Unit test suite)
* **Verification Criteria:** Faction quest turns in reputation points $\rightarrow$ advances rank $\rightarrow$ unlocks faction shop items in EconomyManager.

---

### 🗝️ BUILD 54 (Aetherweave Build 26): Companion Personal Quest Storylines
* **Responsible Seat:** `@engineer` (Seat E) / `@the_forge`
* **SPI Score:** **91 / 100** (Strategic: 24, Practicality: 24, Independence: 25, Risk: 2)
* **Goal:** Implement 5-quest personal storyline chains for each companion (*Vaela's Roots of Belonging, Kaelen's Oathblade, Sera's Echo Lens, Mira's Grace, Rynn's Summoning Core*) awarding unique legendary relics.
* **Target Files:**
  * `Gamecompanion/files/src/data/personalQuests.js` (Personal quest chains)
  * `Gamecompanion/files/src/systems/QuestSystem.js` (Hook personal quest triggers)
  * `Gamecompanion/files/tests/PersonalQuests.test.js` (Unit test suite)
* **Verification Criteria:** Reaching Affinity milestones triggers personal companion quests $\rightarrow$ completion awards unique character signature gear.

---

### 📜 BUILD 55 (Aetherweave Build 27): Regional Bounty Board & Side Quest Engine
* **Responsible Seat:** `@engineer` (Seat E) / `@the_forge`
* **SPI Score:** **89 / 100** (Strategic: 22, Practicality: 24, Independence: 25, Risk: 2)
* **Goal:** Add dynamic Regional Bounty Boards across world zones (Fittoa, Crystal Expanse, Verdant Weave) offering hunting contracts for elite monster variants with bonus gold and crafting dust.
* **Target Files:**
  * `Gamecompanion/files/src/data/bounties.js` (Bounty hunt definitions)
  * `Gamecompanion/files/src/systems/BountySystem.js` (Bounty contract tracker)
  * `Gamecompanion/files/tests/BountySystem.test.js` (Unit test suite)
* **Verification Criteria:** Accepting a regional bounty tracks target kills $\rightarrow$ auto-claims reward and refreshes available contracts.

---

### 💎 BUILD 56 (Aetherweave Build 28): Collectible Relics & Memory Shard Codex
* **Responsible Seat:** `@reconnaissance` (Seat R) / `@engineer` (Seat E)
* **SPI Score:** **90 / 100** (Strategic: 23, Practicality: 24, Independence: 25, Risk: 2)
* **Goal:** Implement the Collectible Codex system: finding hidden Memory Shards across stages, assembling ancient Weaver lore compendiums, and unlocking permanent account bonuses.
* **Target Files:**
  * `Gamecompanion/files/src/data/collectibles.js` (Memory Shard definitions)
  * `Gamecompanion/files/src/systems/CollectibleSystem.js` (Codex discovery tracker)
  * `Gamecompanion/files/tests/CollectibleSystem.test.js` (Unit test suite)
* **Verification Criteria:** Discovering memory shards adds entries to the Codex UI $\rightarrow$ completing a 5-shard set grants permanent mana/stat buff.

---

### 🖥️ BUILD 57 (Aetherweave Build 29): Full UI Screen Suite & Window Mode System
* **Responsible Seat:** `@engineer` (Seat E) / `@frontend`
* **SPI Score:** **92 / 100** (Strategic: 24, Practicality: 25, Independence: 25, Risk: 2)
* **Goal:** Finalize the complete game UI screen suite (Inventory, Quests, Roster, Codex, Achievements, Factions) with seamless window mode switching (Embedded Mini-Widget vs Floating Modal vs Full-Screen View) conforming to `DESIGN.md`.
* **Target Files:**
  * `Gamecompanion/files/src/ui/ScreenManager.js`
  * `Gamecompanion/files/index.html`
  * `TheHUB 1.5.5.2.3 a v/style.css`
* **Verification Criteria:** 1-click modal navigation between all game screens with zero visual clipping and 60 FPS smooth transitions.

---

# 3. IMPLEMENTATION RULES & CONSTRAINTS

1. **Law I (Non-Destructive):** All additions are 100% modular ES Modules; existing combat formulas, state structures, and save files remain backward-compatible.
2. **Law V & Commandment II (Green Test Contract):** Every single build MUST add automated unit tests and pass `npm test` and `npm run pangolin` before proceeding.
3. **Law XIII (Silent Pipeline):** Individual builds are executed concisely in a single turn without intermediate bureaucracy.
4. **Commandment I (Release Archive):** Every build packages `MARCIALE_OS_COMPLETE.zip` and presents the primary deliverable.

---

# 4. RATIFICATION & HIGH COUNCIL SIGN-OFF

```text
================================================================================
HIGH COUNCIL RATIFICATION SIGN-OFF (MASTER ROADMAP V10.0)
================================================================================
SUPREME COMMANDER:       [APPROVED FOR SEQUENTIAL EXECUTION]
SEAT J (@joint):         RATIFIED — Sovereign Plenary Council Consent
SEAT A (@assistant):     CONCURRED — Workspace & CI Harness Operational
SEAT W (@wisdom):        CONCURRED — Intent Decoding & Lore Architecture Aligned
SEAT E (@engineer):      CONCURRED — Game Engine & Construction Specs Ready
SEAT R (@reconnaissance):CONCURRED — Data Bibles & Asset Integrity Verified
SEAT N (@navigator):     CONCURRED — Subsystem Contracts & Quality Verified
================================================================================
```

**Master Roadmap V10.0 permanently archived at:**  
📁 `/home/user/Marciale-OS/research/proposals/MASTER_ROADMAP_V10_AETHERWEAVE.md`
