# TBH: TASK BAR HERO — TECHNICAL ANALYSIS
## Phase 2 Deliverable | Reference for Game Adaptation
**Classification:** Engineering Hypotheses (derived from observable behavior and community data)

---

# I. COMBAT ENGINE

## 1.1 Damage Calculation Pipeline

Based on community-datamined formulas (Probonk), a robust way to independently implement damage calculation:

**Stat Composition Formula:**
```
final = (base + flatTotal) * (1 + additivePercentTotal) * multiplierProduct
```

**Expected DPS:**
```
expectedDps = attackSpeed * attackDamage * (1 + critChance * (critDamage - 1))
```

**Armor Reduction (Simple Estimate):**
```
armorReduction ≈ armor / (armor + 14 * stageLevel + 12)
```

**Armor Reduction (Full Calculation):**
```
armorReduction = armor² / (armor² + (14 * stageLevel + 12) * (armor + 0.4 * damage))
finalDamage = damage * (1 - armorReduction)
```
Cap: 75% maximum reduction.

**Resistance (Elemental):**
```
effectiveResistance = elementResistance + allElementalResistance
finalDamage = damage * (1 - effectiveResistance / 100)
```

**Defense Check Order:**
1. Dodge (flat probability, checked first)
2. Block (reduces incoming damage if successful)
3. Armor/Resistance calculation (type-dependent)
4. Damage Reduction (general %, applies after type-specific defense)
5. Damage Absorption (flat amount, near end)
6. Minimum damage floor (1 HP minimum)

## 1.2 Stat Types

| Category | Stats |
|----------|-------|
| Offensive | Attack Speed, Attack Damage, Crit Chance, Crit Damage |
| Defensive | Dodge, Block, Armor, Resistance, Damage Reduction, Absorption |
| Elemental | Fire/Cold/Lightning/Chaos Damage%, All Elemental Resistance |
| Utility | Movement Speed, Gold%, XP%, Drop Rate |
| Damage Tags | Melee, Projectile, Area, Summon |

## 1.3 Combat Balance Targets

From observed stage data (Normal difficulty):
- Stage 1-1 Slime: 50 HP, 10 ATK → heroes start with ~1.82 DPS (Knight)
- Stage 1-10 Skeleton King: 1,050 HP, 50 ATK → boss requires ~10x player scaling
- Stage 3-10: Level 32 requirement

**Scaling Curve (Inferred):**
- Monster HP scales approximately 2-3x per act
- Gold/XP rewards scale exponentially per stage
- Player power scales through: level-ups (linear) + gear (step functions) + runes (exponential late)

---

# II. RUNE TREE SYSTEM

## 2.1 Observed Data

- 197 nodes total
- Nodes provide: stat bonuses, system unlocks (hero slots, automation), gold/XP multipliers
- Rushed early-game priority: unlock 2nd and 3rd hero slots (costs ~150,000 gold for 3rd)
- Free respecs available to encourage experimentation

## 2.2 Engineering Hypothesis — Rune Tree as Graph

A robust way to independently implement a rune tree:

```typescript
interface RuneTreeDefinition {
    nodes: RuneNodeDefinition[];
    edges: RuneEdge[];  // Connection between nodes
    rootNodeId: number;
}

interface RuneNodeDefinition {
    id: number;
    name: string;
    description: string;
    position: { x: number; y: number };  // Visual layout position
    
    // In TBH, the tree has distinct regions/quadrants
    region?: 'core' | 'north' | 'south' | 'east' | 'west';
    
    // Up to 5 levels per node
    maxLevel: number;
    
    // Cost scaling per level
    cost: number | number[];  // Fixed or per-level array
    
    // Effects at each level
    effects: RuneEffect[];
}

interface RuneEdge {
    from: number;  // Parent node ID
    to: number;    // Child node ID
    // Directional: must purchase 'from' before 'to'
}

interface RuneEffect {
    stat: StatType;
    value: number | number[];  // Per level
    operation: 'add' | 'multiply' | 'unlock';
    unlockTarget?: string;  // For unlock-type effects (e.g., "hero_slot_2")
}
```

**Stat Calculation from Rune Tree:**
```typescript
function calculateRuneBonuses(
    purchasedNodes: Record<number, number>,  // nodeId → level
    runeTree: RuneTreeDefinition
): Record<StatType, number> {
    const bonuses: Record<StatType, number> = {};
    
    for (const [nodeId, level] of Object.entries(purchasedNodes)) {
        const node = runeTree.nodes.find(n => n.id === Number(nodeId));
        if (!node) continue;
        
        for (const effect of node.effects) {
            const value = Array.isArray(effect.value) ? effect.value[level] : effect.value * level;
            bonuses[effect.stat] = (bonuses[effect.stat] || 0) + value;
        }
    }
    
    return bonuses;
}
```

---

# III. CUBE CRAFTING SYSTEM

## 3.1 Synthesis Odds Engine

Based on the community-datamined grade-up tables, a robust way to independently implement:

```typescript
enum Rarity {
    Common, Uncommon, Rare, Legendary, Immortal, 
    Arcana, Beyond, Celestial, Divine, Cosmic
}

// Synthesis recipe: 9 items of same rarity → 1 item of higher rarity
type SynthesisTable = Record<Rarity, {
    keep: number;        // Same rarity (failure) percentage
    upgrade: number;     // +1 rarity percentage
    greatSuccess: number; // +2 rarity percentage (rare)
}>;

// From datamined data:
const SYNTHESIS_ODDS: SynthesisTable = {
    [Rarity.Common]:      { keep: 0,   upgrade: 95.2, greatSuccess: 4.8 },
    [Rarity.Uncommon]:    { keep: 0,   upgrade: 96.2, greatSuccess: 3.8 },
    [Rarity.Rare]:        { keep: 0,   upgrade: 97.6, greatSuccess: 2.4 },
    [Rarity.Legendary]:   { keep: 0,   upgrade: 99.0, greatSuccess: 1.0 },
    [Rarity.Immortal]:    { keep: 0,   upgrade: 99.75, greatSuccess: 0.25 },
    [Rarity.Arcana]:      { keep: 67,  upgrade: 32.83, greatSuccess: 0.17 },
    [Rarity.Beyond]:      { keep: 77,  upgrade: 22.92, greatSuccess: 0.08 },
    [Rarity.Celestial]:   { keep: 83,  upgrade: 16.98, greatSuccess: 0.02 },
    [Rarity.Divine]:      { keep: 91,  upgrade: 9.0, greatSuccess: 0.0 },
    [Rarity.Cosmic]:      { keep: 100, upgrade: 0, greatSuccess: 0.0 },
};

function rollSynthesisOutcome(inputRarity: Rarity): Rarity {
    const table = SYNTHESIS_ODDS[inputRarity];
    const roll = Math.random() * 100;
    
    if (roll < table.greatSuccess) {
        return inputRarity + 2;  // Great success: jump 2 grades
    } else if (roll < table.greatSuccess + table.upgrade) {
        return inputRarity + 1;  // Normal success: 1 grade
    } else {
        return inputRarity;      // Fail: stays same grade
    }
}
```

## 3.2 Crafting Odds by Tier

From observed data, crafting odds improve with higher-tier materials:

```typescript
interface CraftingTier {
    levelRange: [number, number];  // Material levels accepted
    cubeLevelRequired: number;
    goldCost: number;
    odds: Record<Rarity, number>;  // Percentage chance
}

// Tier 1 (Levels 1-10, no Cube level requirement):
// 50% Uncommon, 40% Rare, 8% Legendary, 2% Immortal
// Tier 8 (Levels 80, Cube Level 70):
// 48% Rare, 30% Legendary, 18% Immortal, 3.8% Arcana, 0.2% Beyond
```

---

# IV. OFFLINE PROGRESSION MATH

## 4.1 Reward Calculation

A robust way to independently implement offline rewards:

```typescript
function calculateOfflineRewards(
    playerStats: PlayerStats,
    lastActiveTime: number,
    currentTime: number
): OfflineRewards {
    const SECONDS_CAP = 28800;  // 8 hours
    const OFFLINE_EFFICIENCY = 0.5;  // 50% of active rate
    
    const elapsedSeconds = Math.min(
        (currentTime - lastActiveTime) / 1000,
        SECONDS_CAP
    );
    
    // Base rates from player's last active stage performance
    const baseGoldPerSecond = calculateGoldPerSecond(playerStats);
    const baseXpPerSecond = calculateXpPerSecond(playerStats);
    
    // Apply offline + rune bonuses
    const goldRate = baseGoldPerSecond * OFFLINE_EFFICIENCY * (1 + playerStats.offlineGoldBonus);
    const xpRate = baseXpPerSecond * OFFLINE_EFFICIENCY * (1 + playerStats.offlineXpBonus);
    
    return {
        gold: Math.floor(goldRate * elapsedSeconds),
        xp: Math.floor(xpRate * elapsedSeconds),
        secondsOffline: elapsedSeconds,
        // Note: No chests in offline mode
        chests: []
    };
}
```

## 4.2 Drop Rate Scaling

From community data: drop-rate values use a 1000-point scale (160 = 16%)

```typescript
interface DropRateConfig {
    scale: 1000;  // 1000-point system
    baseChestDrop: number;    // e.g., 50 = 5% base
    perMonsterIncrement: number;  // e.g., 10 = +1% per kill without drop
    stageLevelMultiplier: number;  // Higher stages have better rates
}
```

---

# V. DATABASE SCHEMA INFERENCE

Based on the observed 5,760 gear items, 61 monsters, 120 stages, 214 skills, 197 rune nodes:

## 5.1 Data Volume

| Entity | Count | Storage Estimate |
|--------|-------|-----------------|
| Item Templates | 5,760 | ~2MB JSON |
| Monsters | 61 | ~50KB |
| Stages | 120 | ~200KB |
| Skills/Passives | 214 | ~300KB |
| Rune Nodes | 197 | ~150KB |
| Pets | 8 | ~10KB |
| Achievements | 56 | ~20KB |
| **Total Static Data** | | **~2.7MB** |

## 5.2 Player Save Size

| Save Component | Size Estimate |
|----------------|--------------|
| Player state (gold, level, etc.) | ~1KB |
| Heroes (6 × stats) | ~3KB |
| Inventory (up to ~100 items) | ~30KB |
| Rune Tree (197 boolean/level states) | ~2KB |
| Cube state | ~1KB |
| Achievement flags | ~1KB |
| Settings | ~1KB |
| **Total Save** | **~40KB** (well under 5MB localStorage limit, comfortably in IndexedDB) |

---

# VI. PERFORMANCE BUDGET (Web Implementation)

| System | CPU Budget per Tick | Notes |
|--------|-------------------|-------|
| Combat logic | 2-5ms | Simple math, no physics |
| AI decisions | 1-2ms | Priority-based, not pathfinding |
| Loot rolling | 1ms | Table lookups + random |
| Canvas render | 5-10ms | Sprite blitting |
| UI render | 2-5ms | DOM updates only on state change |
| Save serialization | 1-5ms | Async, avoid blocking |
| **Total per frame** | **~15-25ms** | Target: 30 FPS = 33ms budget |

**Key Insight for Web:** The combat is 1D horizontal. No pathfinding, no complex collision detection, no physics — just distance calculations and attack timers. This is computationally cheap and well-suited for browser Canvas 2D.

---

*End of Technical Analysis*
