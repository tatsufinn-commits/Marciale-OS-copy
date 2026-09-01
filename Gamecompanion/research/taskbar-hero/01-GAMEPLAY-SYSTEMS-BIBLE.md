# TBH: TASK BAR HERO — GAMEPLAY SYSTEMS BIBLE
## Phase 2 Deliverable | Reference for Game Adaptation
**Classification:** Verified Observations | Community Consensus | Engineering Hypotheses

---

# I. THE CORE GAMEPLAY LOOP

## 1.1 Verified Observations

**The Primary Loop:**
```
Deploy Party → Auto-Fight Waves → Collect Gold/XP/Gear/Chests → 
Process Loot (Alchemy/Synthesize) → Upgrade Rune Tree → 
Equip Better Gear → Push Next Stage → Hit Wall → Farm Previous Stage → Repeat
```

**The Player's Experience:**
- The game window lives in the Windows taskbar (approximately 100-200px tall)
- Heroes auto-move from left (taskbar system area) toward right (notification tray)
- Monsters spawn from the right and march leftward
- Combat is linear engagement on a 1D horizontal plane
- The player watches numbers tick up passively, with occasional loot bursts
- Engagement cadence: ~20-30 minutes of "active" attention then longer AFK periods

## 1.2 Community Consensus

The game is described as "Vampire Survivors-style auto-combat meets a Diablo loot grind" — a cozy companion that plays itself while you do something else. The early game feels aimless without understanding the Rune Tree priority system. Most new players stall because they don't know to unlock hero slots first.

## 1.3 Engineering Hypothesis — Architecture

A robust way to independently implement a system that produces similar observable behavior would involve three decoupled layers:

**Layer 1 — Combat Simulation Engine (Tick-Based)**
- Runs entirely client-side
- Uses discrete time ticks (e.g., 100ms intervals)
- Each tick computes: hero positions, monster positions, attack cooldowns, damage calculations, collision detection
- No physics engine needed — combat is 1D horizontal, simplifying to simple distance checks

**Layer 2 — Loot Generation Service**
- Probabilistic drop tables per stage/monster
- Chest state machine: cooldown → available → opened → cooldown
- Rarity roll function with pity timer / pseudo-random distribution
- Separate from combat simulation to avoid coupling

**Layer 3 — Pro Progression Layer**
- Experience tables (Level 1-100+)
- Rune tree graph data structure (197 nodes)
- Crafting/Cube state machine with level locks
- Save/load serialization

## 1.4 Engineering Tradeoffs

| Approach | Pro | Con |
|----------|-----|-----|
| Single-threaded tick loop | Simple, predictable | Can't scale, frame drops on weak hardware |
| Web Worker offload | Non-blocking UI | State sync complexity |
| Fixed timestep | Deterministic replays | Requires interpolation for smooth visuals |

**Recommendation:** Fixed timestep with requestAnimationFrame rendering for web canvas.

---

# II. PROGRESSION SYSTEM

## 2.1 Verified Observations

**Six Progression Pillars:**

1. **Hero Level** (1-100) — XP from kills, increases base stats, unlocks skill points
2. **Hero Slots** (1 → 2 → 3) — Unlocked via Rune Tree, gold cost escalates (~150,000 for 3rd slot)
3. **Stage Progression** (1-120) — 3 Acts × 10 stages × 4 difficulties (Normal/Nightmare/Hell/Torment)
4. **Rune Tree** (197 nodes) — Permanent stat upgrades, system unlocks, gold/XP multipliers
5. **Gear Rarity** (10 grades: Common → Cosmic) — Drops from chests and stage clears
6. **Cube Level** (1-70+) — Levels by consuming items, unlocks crafting functions

**Difficulty Tiers:**
| Tier | Level Range | Notes |
|------|-------------|-------|
| Normal | 1-32 | Tutorial phase |
| Nightmare | 33-52 | First wall |
| Hell | 53-77 | Requires optimized builds |
| Torment | 78-95 | Endgame farming |

**Stage Structure:**
- Each stage has: Level requirement, wave count, enemy composition, gold/XP yield
- X-9 stages give the most XP per run (community consensus: power-leveling spots)
- X-10 stages are bosses — require a Soul Stone (consumed only on successful clear)
- Bosses drop higher-tier gear and unique materials

## 2.2 Player Psychology — Progression Pacing

**Verified Observation:** The game front-loads system unlocks in the first 15-30 minutes:
- Level 3 → Rune Tree unlocked
- Level 4 → Hero-dric Cube unlocked
- Early Rune Tree → 2nd and 3rd hero slots

**Why this works:**
- Creates rapid early "I'm getting something new every few minutes" dopamine hits
- Later progression slows significantly (the grind phase)
- The 8-hour offline cap creates urgency to check in daily

**Community Pain Points:**
- Progression wall hits hard around Stage 20-30 without proper builds
- Gold costs for Rune Tree escalate non-linearly
- Early game feels aimless without knowing the optimal unlock path

## 2.3 Engineering Hypothesis — Progression Data Structures

A robust way to independently implement progression systems would be:

```typescript
// Hero state
interface HeroState {
    id: string;
    level: number;
    xp: number;
    baseStats: Stats;       // From hero definition
    bonusStats: Stats;      // From gear, runes, skills
    equippedGear: GearSlots;
    skillPoints: number;
    skillAllocations: SkillAllocation[];
}

// Stage definition
interface StageDefinition {
    id: string;
    act: number;
    stage: number;          // 1-10
    difficulty: Difficulty;
    levelRequirement: number;
    waves: WaveDefinition[];
    boss: MonsterDefinition | null;
    goldReward: number;
    xpReward: number;
    lootTable: LootEntry[];
}

// Rune tree as directed graph
interface RuneNode {
    id: number;
    name: string;
    description: string;
    position: { x: number; y: number };
    prerequisites: number[];    // Node IDs that must be purchased first
    cost: number;               // Gold cost
    effects: StatModifier[];
    maxLevel: number;
}
```

## 2.4 Engineering Tradeoffs

| System | Tradeoff |
|--------|----------|
| XP curves | Linear feels flat, exponential feels punishing. Diminishing returns (logarithmic) is safest for idle games. |
| Gold economy | Tight gold = engagement (check more often). Loose gold = retention (less frustration). Balance target: steady drip with occasional windfalls. |
| Stage difficulty | Scaling by numbers alone is boring. Mix: new enemy types, ability combinations, environmental modifiers. |

---

# III. ECONOMY SYSTEM

## 3.1 Verified Observations

**Three Currency Layers:**

1. **Gold** — Primary currency for Rune Tree, Cube operations, crafting
   - Sources: Stage clears, Alchemy (selling items), chests, offline rewards
   - Sinks: Rune Tree nodes, Cube Extraction costs, Synthesis gold fees, Crafting costs
   - Economy tension: Gold is needed for everything — spending strategy matters

2. **Soul Stones** — Boss entry tokens
   - Consumed only on successful boss kills
   - Prevents wasted attempts but gates boss farming

3. **Anniversary Coins** — Premium gacha currency
   - Used in Cube Offering function (Cube Level 20+)
   - 10 tiers of coins with escalating costs and reward quality
   - Equivalent to "pull currency" in gacha games

**Gear Economy:**
- Items drop from chests and stage clears
- Items have both Level and Rarity → creates a 2D gear grid (level × rarity)
- Alchemy converts items to gold (primary gold source)
- Synthesis combines 9 same-rarity items into 1 higher-rarity item
- Steam Market: Immortal+ gear can be sold for real Steam Wallet funds

## 3.2 Community Consensus

The Steam Market integration is the game's standout feature — one of the few casual games where consistent play has tangible return beyond in-game progression. However, it caused significant launch issues:
- Player surge overloaded Steam item servers
- 411 accounts banned for cheat-produced high-tier items (June 1)
- Market temporarily closed (June 8) then reopened on staggered schedule
- Server migration to own infrastructure (v1.00.12)

## 3.3 Engineering Hypothesis — Economy Architecture

A robust way to independently implement an economy system would involve:

```
Game Logic Layer
    ↓
Economy Engine
    ├── Gold Manager          — Earn/spend validation, anti-bloat
    ├── Loot Table Engine     — Probabilistic item generation
    ├── Inventory Manager     — Stacking, capacity limits, stash
    └── Market Interface      — (if connecting to external marketplace)
    ↓
Persistence Layer (IndexedDB)
```

**Loot Generation — Pseudo-Random Distribution (PRD):**
Instead of true randomness, use a escalating probability system:
- Start with a base probability (e.g., 5% for a chest drop)
- Each non-drop increases the probability by an increment (e.g., +1%)
- On successful drop, reset to base probability
- This creates more consistent, feel-better loot pacing

**Gold Sink Balancing:**
- Track total gold earned and total gold spent per player
- If the ratio exceeds a threshold, introduce optional sinks
- Use logarithmic scaling for costs (steep early, gentler later)

## 3.4 Engineering Tradeoffs

| Decision | Pro | Con |
|----------|-----|-----|
| Client-side economy | Offline-capable, fast | Cheating risk (mitigated by server validation of high-value items) |
| Server-authoritative economy | Secure | Requires always-online, latency |
| Steam Market integration | Viral growth driver | Server load nightmare, cheating exploits |
| Multiple currencies | Depth, strategic choices | Complexity for casual players |

---

# IV. INVENTORY & EQUIPMENT SYSTEM

## 4.1 Verified Observations

**Gear Slots (20 total per hero):**
- Weapons (6 types): Sword, Bow, Staff, Scepter, Crossbow, Axe
- Off-hands (6 types): Shield, Arrow, Orb, Tome, Bolt, Hatchet
- Armor (4 slots): Helmet, Armor, Gloves, Boots
- Accessories (4 slots): Amulet, Earring, Ring, Bracer

**Rarity Ladder (10 grades):**
| Grade | Color | Alchemy Value | Cube XP | Socket Capacity (D/E/I) |
|-------|-------|--------------|---------|------------------------|
| Common | White | 10 gold | 2 | 0/0/0 |
| Uncommon | Green | 30 | 6 | 1/0/0 |
| Rare | Blue | 90 | 18 | 1/1/0 |
| Legendary | Orange | 270 | 54 | 2/2/0 |
| Immortal | Red | 810 | 162 | 2/2/1 |
| Arcana | Purple | 2,592 | 518 | 3/2/1 |
| Beyond | Pink | 8,294 | 1,658 | 3/2/2 |
| Celestial | Cyan | 29,029 | 5,803 | 3/2/2 |
| Divine | Gold | 101,602 | 20,311 | 3/2/2 |
| Cosmic | White-Glow | 355,607 | 71,089 | 3/2/2 |

**Total Database Observed:** 5,760 gear items, 20 types, 396 level progressions

## 4.2 Player Psychology — The Loot Loop

**Why layered rarity works in idle games:**
1. **Constant drip** — Even Common drops have value (→ Alchemy → Gold)
2. **Occasional spikes** — Rare/Legendary drops create dopamine hits
3. **Endless chase** — Divine/Cosmic are effectively unobtainable legitimately → infinite aspirational goal
4. **BIS (Best-in-Slot) hunting** — Perfect stat rolls on the right item type create deep endgame

**The problem with 10 tiers:** Without careful pacing, players on tier 5 feel like they're not even halfway. The community observed this — Divine and Cosmic are "near-unobtainable through legitimate play."

## 4.3 Engineering Hypothesis — Inventory Architecture

A robust way to independently implement an inventory system:

```typescript
// Item instance
interface ItemInstance {
    id: string;                         // Unique ID
    templateId: string;                 // References ItemTemplate
    level: number;
    rarity: Rarity;
    stats: RolledStat[];               // Randomly rolled affixes
    socketState: SocketState;          // D/E/I sockets and contents
    isLocked: boolean;                 // Alt+Click protection
    equippedTo: string | null;         // Hero ID or null
}

// Item template (database-driven, not hardcoded)
interface ItemTemplate {
    templateId: string;
    name: string;
    slot: EquipmentSlot;
    baseStats: StatRange[];            // Min-max per level
    possibleAffixes: AffixPool[];      // Which stats can roll at which rarity
    visualAsset: string;               // Sprite reference
    levelProgression: number[];        // Levels at which this item upgrades
}

// Inventory
interface InventoryState {
    items: ItemInstance[];
    maxCapacity: number;
    stashTabs: StashTab[];
    gold: number;
}
```

**Loot Generation Flow:**
```
Monster Dies → Check Drop Table (by monster type + stage)
  → Roll: Does item drop? (PRD check)
    → Yes → Roll: Which slot?
      → Roll: Base item level (stage-dependent)
        → Roll: Rarity (weighted odds by stage difficulty)
          → Roll: Affixes (pool filtered by rarity/slot)
            → Create ItemInstance → Add to chest/pickup pool
```

## 4.4 Engineering Tradeoffs

| Decision | Pro | Con |
|----------|-----|-----|
| 10 rarity grades | Deep endgame progression | Can feel overwhelming early |
| Item lock (Alt+Click) | Prevents accidental loss | Requires gold sinks for unlocking |
| Level × Rarity grid | 2D progression space | Complex balancing |
| Socket system (D/E/I) | Deep customization | Extraction cost friction |

---

# V. THE HERO-DRIC CUBE — CRAFTING SYSTEM

## 5.1 Verified Observations

**Eight Cube Functions (unlocked progressively by Cube Level):**

| Function | Unlock | Description |
|----------|--------|-------------|
| Alchemy | Initial | Convert items → gold + Cube XP. Main early gold source. |
| Synthesis | Initial | Combine 9 same-rarity items → 1 higher-rarity item |
| Craft | Cube Lv 5 | Build random gear from materials |
| Decoration | Cube Lv 8 | Socket single-stat gems into Rare+ gear |
| Removal/Extraction | Cube Lv 10 | Strip sockets from gear (costs gold) |
| Engraving/Sculpture | Cube Lv 15 | Socket 2-stat monster materials into Immortal+ gear |
| Offering/Wish | Cube Lv 20 | Gacha pulls using Anniversary Coins |
| Inscription | Cube Lv 25 | Scroll adds 1 random stat to Arcana+ gear |

**Synthesis Grade-Up Odds (Community Data):**
| From | Result | Great Success (+2 grades) |
|------|--------|--------------------------|
| 9× Common | 95% Uncommon | 4.8% Rare |
| 9× Uncommon | 96% Rare | 3.8% Legendary |
| 9× Rare | 98% Legendary | 2.4% Immortal |
| 9× Legendary | 99% Immortal | 0.99% Arcana |
| 9× Immortal | 50% keep / 50% Arcana | 0.25% Beyond |
| 9× Arcana | 67% keep / 33% Beyond | 0.17% Celestial |
| 9× Beyond | 77% keep / 23% Celestial | 0.08% Divine |

## 5.2 Player Psychology — The Crafting Loop

The Cube is the primary dopamine driver after the initial loot dopamine wears off. It works because:
1. **Alchemy** solves inventory bloat (turns trash into gold) — satisfaction
2. **Synthesis** is gambling-adjacent — the chance of a "great success" (+2 grades) creates excitement
3. **Crafting odds table** shows clear improvement with investment — progression is visible
4. **Extraction costs** create meaningful decisions — do you strip that socket or keep it?

## 5.3 Engineering Hypothesis — Cube Architecture

A robust way to independently implement a crafting system:

```typescript
interface CubeState {
    currentLevel: number;
    currentXp: number;
    unlockedFunctions: CubeFunction[];
}

interface CubeFunction {
    id: string;
    name: string;
    minLevel: number;
    execute(input: CubeInput): CubeOutput;
    validate(input: CubeInput): ValidationResult;
}

// Synthesis example
class SynthesisFunction implements CubeFunction {
    execute(input: { items: ItemInstance[]; targetLevel: number }): CubeOutput {
        // Validate: exactly 9 items, same rarity
        // Roll for outcome grade
        // Return new item + destroy inputs
    }
}
```

**Crafting Odds Engine:**
- Weighted random selection from a tiers table
- Odds improve with higher material tier selection
- Great success is a separate roll on a secondary table
- For web implementation: Seeded RNG (so results are deterministic for offline/loading consistency)

## 5.4 Engineering Tradeoffs

| Decision | Pro | Con |
|----------|-----|-----|
| Free Cube XP (from any item) | Feels generous, encourages interaction | Risk of inflation |
| Gold costs for extraction | Gold sink, meaningful choice | Feels punishing if too expensive |
| Locked functions by level | Natural progression gate | Frustrating if you want a feature you can see |
| Gambling odds (great success) | Addictive dopamine | Can feel "rigged" |

---

# VI. SKILLS & PASSIVES SYSTEM

## 6.1 Verified Observations

**Total observed:** 214 skills/passives
- 106 active/attack skills (6 per hero × ~6 named + variations + base attacks)
- 108 passive stat nodes

**Each hero has:**
- Base attack (auto-attack)
- 6 named active skills (unique to their class)
- Skill levels 1-10 per skill

**Class Skill Examples:**
- Knight: Piercing Thrust, Shield Charge, Retribution Strike, Aegis Field, Sacred Blade, Unyielding Will
- Sorcerer: Fireball, Ice Orb, Lightning, Flame Hydra, Snowstorm, Meteor Strike
- Priest: Heal, Blessing of Might, Wrath of Heaven, Sanctuary, Blessing of Warding, Resurrection

**Damage Tags:** Physical, Fire, Cold, Lightning, Chaos; Delivery: Melee, Projectile, AoE, Trap, Summon

## 6.2 Player Psychology

- Free respecs (community confirmed) — encourages experimentation
- Hyper-specialization rewarded — hybrid builds mathematically inferior
- Skill points from leveling → natural drip of engagement

## 6.3 Engineering Hypothesis

A robust way to independently implement a skill system:

```typescript
interface Skill {
    id: string;
    name: string;
    heroClassId: string;
    type: 'active' | 'passive' | 'baseAttack';
    damageType: DamageType;
    deliveryType: DeliveryType;
    cooldown?: number;          // ms
    manaCost?: number;
    levels: SkillLevelData[];   // Stats at each level 1-10
}

interface SkillLevelData {
    level: number;
    damageMultiplier: number;   // e.g., "deal {150}% damage"
    additionalEffects: Effect[];
    unlockCost: number;         // Skill points
}
```

**AI Decision Engine for Auto-Casting:**
```typescript
function decideSkillAction(hero: HeroState, enemies: EnemyState[]): SkillAction {
    // Priority system:
    // 1. Survival skills (heal, shield) if HP < threshold
    // 2. AoE skills if enemy density > threshold
    // 3. Single-target skills for bosses
    // 4. Default: basic attack
}
```

---

*End of Gameplay Systems Bible*
