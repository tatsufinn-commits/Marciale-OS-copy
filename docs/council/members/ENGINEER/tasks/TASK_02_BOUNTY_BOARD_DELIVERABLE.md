# 📜 TASK DELIVERABLE: REGIONAL BOUNTY BOARD & MONSTER HUNTING GUILDS
## Task ID: `TASK-JARWEN-2026-E02` (Build 55 / Aetherweave Build 27)
**Executing Officer:** `@engineer` (Max — Seat E)  
**Assisting Squad Roles:** `@the_forge` (Implementation Engine) & `@pangolin` (Verification Sentinel)  
**Executive Auditor & Gatekeeper:** `@assistant` (Seat A)  
**Parent Charter:** `THE JARWEN COUNCIL CHARTER (v3.1.0-MAX)`  
**Date Completed:** 2026-08-12  
**Verification Baseline:** Companion RPG: 53/53 Tests Passing · TheHUB: 43 Suites Green · Pangolin Armor: SEV-0 Nominal  

---

# 1. EXECUTIVE SUMMARY

In accordance with **Charter v3.1.0-MAX** and Directive `TASK-JARWEN-2026-E02`, the Companion RPG engine has been augmented with the **Regional Bounty Board & Monster Hunting Guilds System**.

All additions were executed through the 4-Layer Approval Pipeline (`@engineer` $\rightarrow$ `@the_forge` $\rightarrow$ `@pangolin` $\rightarrow$ `@engineer`), strictly observing the **80% blast-radius ceiling** (100% additive diffs with zero legacy regressions).

---

# 2. DELIVERED REGIONAL CONTRACTS & GUILD RANKS

### Hunter Guild Ranks:
* **Novice Hunter (0 Rep):** Basic bounty board access.
* **Apprentice Hunter (250 Rep):** +10% Gold from hunting contracts.
* **Elite Tracker (750 Rep):** +15% XP from monster hunts.
* **Guild Veteran (1500 Rep):** Access to high-tier boss bounties.
* **Master Slayer (3000 Rep):** Unique Guild Master Crest & double material drops.

### Regional Bounty Contracts:
| Contract Title | Region | Required Rep | Target | Rewards |
|---|---|:---:|---|---|
| **Goblin Raider Infestation** | Fittoa Outskirts | 0 | 10 Goblins | +200G, +350XP, +25 Rep, Monster Hide |
| **Acid Slime Containment** | Fittoa Outskirts | 0 | 15 Slimes | +250G, +400XP, +30 Rep, Mana Dust |
| **Warden of the Twisted Briar** | Fittoa Outskirts | 250 | 1 Briar Warden Boss | +600G, +900XP, +75 Rep, Soul Stone |
| **Petrifying Basilisk Hunt** | Crystal Expanse | 250 | 8 Basilisks | +800G, +1200XP, +60 Rep, Mana Crystal |
| **Orc Champion Suppression** | Crystal Expanse | 750 | 12 Orc Champions | +1200G, +1800XP, +100 Rep, Magic Thread |
| **Ancient Guardian Neutralization** | Verdant Weave | 1500 | 2 Ancient Guardians | +2000G, +3000XP, +150 Rep, Loom Fragment |

---

# 3. ARCHITECTURAL ARTIFACTS & SYSTEM WIRING

1. **`Gamecompanion/files/src/data/bounties.js` (Created):**
   * Canonically defines regional contracts, target regex patterns, reward bundles, and 5 Hunter Guild rank tiers.
2. **`Gamecompanion/files/src/systems/BountyBoardSystem.js` (Created):**
   * Built contract state management, target evaluation (`monster_killed`, `boss_defeated`, `elite_killed`), reputation calculation, and rank promotion engine.
3. **`Gamecompanion/files/src/core/EventBus.js` (Updated):**
   * Added `BOUNTY_ACCEPTED`, `BOUNTY_PROGRESS`, `BOUNTY_COMPLETED`, and `GUILD_RANK_UNLOCKED` event definitions.
4. **`Gamecompanion/files/src/main.js` & `index.html` (Updated):**
   * Added `#bounties` button, interactive Hunter's Guild Board modal, live contract progress bars, and rank promotion audio/particle bursts.
5. **`Gamecompanion/files/tests/BountyBoardSystem.test.js` (Created):**
   * Added 5 unit tests verifying contract acceptance, pattern kill matching, boss tracking, reward claiming, and rank promotions.

---

# 4. TESTING & VERIFICATION PROOF (LAW V & LAW X)

* **Unit Test Harness (`npm --prefix Gamecompanion/files test`):**
  * **53/53 Passing Unit Tests** (Expanded from 48 baseline, 100% green).
* **Vite Production Build (`npm --prefix Gamecompanion/files run build`):**
  * Transformed 55 ES modules and output clean bundles into `TheHUB 1.5.5.2.3 a v/companion/`.
* **SRE & Pangolin Sentinel (`npm run pangolin`):**
  * Zero regressions detected; SEV-0 Nominal Health across all 43 TheHUB test suites and 53 Companion RPG tests.

---

# 5. MERGE STATUS

Executive Audit Key 1 (`@engineer`) & Key 2 (`@assistant`) **APPROVED**. Merged into canonical release archive per Commandment I.
