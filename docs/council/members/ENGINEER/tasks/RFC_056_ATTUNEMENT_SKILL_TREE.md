# 📜 ENGINEERING RFC-056: ATTUNEMENT SKILL TREE & BRANCHING TALENTS
## Build 56 / Aetherweave Build 28 Specification

> **Author:** `@engineer` (Chief Construction Lead & Systems Architect / Max — Seat E)  
> **Auditor & Merge Gatekeeper:** `@assistant` (Executive Auditor — Seat A)  
> **Strategic Reviewer:** `@wisdom` (Seat W)  
> **Executor:** `@forge` (Agent 3 — Autonomous Coder)  
> **Verification Sentinel:** `@pangolin`  
> **Target Subsystem:** `Gamecompanion/files/src/` (Companion RPG Engine)  
> **Parent Charter:** `THE JARWEN COUNCIL CHARTER (v3.1.0-MAX)`  
> **Status:** 🟢 `[RATIFIED BY EXECUTIVE AUDITOR]`  

---

# 1. CONTEXT & ARCHITECTURAL GOAL
* **Objective:** Implement a data-driven **Attunement Skill Tree** across the 7 canonical elemental and magical schools (Water, Earth, Fire, Wind, Healing, Barrier, Demon/Dark), allowing players to allocate Attunement Points earned via hero leveling into passive stat boosts and active skill multipliers.
* **Target Paths:**
  * `Gamecompanion/files/src/data/attunementTree.js` (Tree schemas & branch definitions)
  * `Gamecompanion/files/src/systems/AttunementSystem.js` (Point economy, node unlock logic, mastery capstones)
  * `Gamecompanion/files/src/core/EventBus.js` (Event bindings)
  * `Gamecompanion/files/src/main.js` & `index.html` (`#attune` button, modal UI, audio & visual cues)
  * `Gamecompanion/files/tests/AttunementSystem.test.js` (7-case automated test suite)
* **Architectural Bounds (Law I, Law IV, Wisdom Safeguard 4):**
  * Strictly zero new third-party npm dependencies.
  * 80% blast-radius ceiling: all diffs must be purely additive.
  * Zero circular dependencies: `AttunementSystem` interacts purely through `StateManager` and `EventBus`.

---

# 2. INPUT/OUTPUT DATA CONTRACTS & SCHEMAS

### Attunement Point Economy Formula
Upon hero level-up (`WEAVER_LEVEL_UP`), bonus points are awarded according to:
$$\text{Points Awarded} = 1 + \lfloor \frac{\text{Level}}{5} \rfloor$$

### Node Data Contract
```javascript
export interface AttunementNode {
  id: string;               // e.g. "water_t1_flow"
  branchId: string;         // "water" | "earth" | "fire" | "wind" | "healing" | "barrier" | "demon"
  name: string;             // "Aetheric Flow"
  description: string;      // "+5% Water Damage, +10 Max Mana"
  tier: number;             // 1, 2, 3, or 4 (Capstone)
  costPerRank: number;      // Attunement points required per rank (e.g. 1)
  maxRank: number;          // e.g. 3
  requiredHeroLevel: number;// Minimum hero level to invest (e.g. 1, 5, 10, 15)
  parentRequirements: string[]; // Node IDs required before unlocking (e.g. ["water_t1_flow"])
  statsPerRank: {
    waterDamageMult?: number;
    maxMana?: number;
    castSpeed?: number;
    armor?: number;
    critChance?: number;
    healingMult?: number;
    mitigation?: number;
  };
}
```

### Branch Mastery Capstone Contract
```javascript
export interface BranchMastery {
  branchId: string;
  branchName: string;
  pointsRequiredForMastery: number; // e.g. 10 points invested in branch
  masteryTitle: string;             // e.g. "Master of Cascading Tides"
  bonusStats: Record<string, number>;
}
```

---

# 3. CORE LOGIC & STATE TRANSITIONS

1. **State Shape (`player.attunements`):**
   ```javascript
   {
     availablePoints: 0,
     totalPointsEarned: 0,
     investedPoints: 0,
     nodes: {
       "water_t1_flow": { rank: 2, maxRank: 3 }
     },
     masteredBranches: ["water"]
   }
   ```
2. **Node Investment Method (`investNode(nodeId)`):**
   * Verifies points: `availablePoints >= node.costPerRank`.
   * Verifies rank: `node.rank < node.maxRank`.
   * Verifies hero level: `heroLevel >= node.requiredHeroLevel`.
   * Verifies parents: all `node.parentRequirements` have `rank >= 1`.
   * On success: increments rank, decrements `availablePoints`, recalculates derived stats via `StatEngine`.
   * Emits `ATTUNEMENT_NODE_INVESTED`.
3. **Branch Mastery Check:**
   * When total branch points $\ge \text{pointsRequiredForMastery}$ and not yet mastered:
   * Adds branch to `masteredBranches`, awards capstone buff, emits `ATTUNEMENT_BRANCH_MASTERED`.
4. **Respec Functionality (`respecAttunements()`):**
   * Resets all node ranks to 0.
   * Restores all spent points to `availablePoints`.
   * Recomputes derived stats and clears mastered branches.

---

# 4. DEFENSIVE CODING & 6 GUARD CONDITIONS (WISDOM SAFEGUARD 1 & 5)

| Guard Condition | Trigger State | System Behavior |
|---|---|---|
| **G1: Unknown Node** | Invalid `nodeId` passed | Return `{ success: false, reason: 'NODE_NOT_FOUND' }`; zero state mutation. |
| **G2: Insufficient Points** | `availablePoints < cost` | Return `{ success: false, reason: 'INSUFFICIENT_POINTS' }`; zero state mutation. |
| **G3: Max Rank Reached** | `rank >= maxRank` | Return `{ success: false, reason: 'MAX_RANK_REACHED' }`; zero state mutation. |
| **G4: Parent Unmet** | Parent node rank $< 1$ | Return `{ success: false, reason: 'PREREQUISITE_NOT_MET' }`; zero state mutation. |
| **G5: Level Gate** | Hero level $< \text{requiredHeroLevel}$ | Return `{ success: false, reason: 'HERO_LEVEL_TOO_LOW' }`; zero state mutation. |
| **G6: Respec Integrity** | Respec with 0 points spent | Return `{ success: true, pointsRefunded: 0 }`; safe no-op. |

---

# 5. REVERSIBILITY & ROLLBACK SPECIFICATION (WISDOM SAFEGUARD 5)
1. **WHAT CHANGED?** Added `attunementTree.js`, `AttunementSystem.js`, 3 event hooks, `#attune` UI modal, and 7 unit tests.
2. **WHAT DEPENDS ON IT?** `StatEngine` (ingests attunement stat buffs), `WEAVER_LEVEL_UP` (grants attunement points).
3. **WHAT COULD BREAK?** Corrupt state on old save files (guarded by defensive `_initAttunementState()`).
4. **HOW DO WE DETECT THAT?** 7 automated unit tests in `AttunementSystem.test.js` + `npm run pangolin`.
5. **HOW DO WE ROLLBACK?** `git revert HEAD` or restore from `MARCIALE_OS_COMPLETE.zip`.

---

# 6. ACCEPTANCE CRITERIA & TEST SUITE VERIFICATION
* [ ] **Test 1:** Initial state creates 0 points and empty nodes without throwing.
* [ ] **Test 2:** Hero level up correctly calculates and awards points ($1 + \lfloor \text{level}/5 \rfloor$).
* [ ] **Test 3:** Investing in tier 1 node consumes points, increments rank, and updates stats.
* [ ] **Test 4:** G4 & G5 guard conditions reject locked tier 2 nodes when parents or hero level are unmet.
* [ ] **Test 5:** G3 rejects node investment when max rank is reached.
* [ ] **Test 6:** Branch mastery triggers when required branch points threshold is reached.
* [ ] **Test 7:** Full respec refunds 100% of invested points and clears branch masteries.

---

# 7. EXECUTIVE RATIFICATION
**Decision:** 🟢 **RFC-056 APPROVED & RATIFIED FOR DIRECT EXECUTION BY `@forge`**  
`@engineer` is authorized to instruct `@forge` to implement Build 56 per the specification above.
