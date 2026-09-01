# TBH: TASK BAR HERO — ARCHITECTURE NOTES
## Phase 2 Deliverable | Reference for Game Adaptation
**Classification:** Engineering Hypotheses (derived from observable behavior)

---

# I. LIKELY SYSTEM ARCHITECTURE

## 1.1 High-Level Architecture (Inferred)

```
┌─────────────────────────────────────────────────────────┐
│                   RENDERING LAYER                        │
│  Canvas 2D (pixel rendering) + DOM (UI overlays)         │
│                                                          │
│  requestAnimationFrame loop                               │
│  Sprite atlas for character/monster animations            │
│  Particle system for floating numbers                    │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                   GAME LOGIC LAYER                       │
│  Fixed-timestep update loop                              │
│                                                          │
│  ├─ Combat System (tick-based damage processing)         │
│  ├─ AI Controller (hero auto-casting, monster AI)        │
│  ├─ Wave Manager (spawning, stage progression)           │
│  ├─ Loot Engine (drop tables, rarity rolls, PRD)         │
│  └─ Skill Effect System (buffs, debuffs, DoTs)           │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                  SYSTEMS LAYER                           │
│  Progression, economy, crafting, inventory               │
│                                                          │
│  ├─ Rune Tree Engine (graph traversal, stat computation) │
│  ├─ Cube Engine (synthesis, alchemy, crafting odds)      │
│  ├─ Economy Manager (gold, currencies, sinks)            │
│  └─ Achievement System (56 tracked milestones)           │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                 PERSISTENCE LAYER                        │
│                                                          │
│  ├─ Local Save Manager (IndexedDB / JSON)                │
│  ├─ Cloud Sync (Steam Cloud / server backup)             │
│  └─ Save Migration System (versioned schema)             │
└─────────────────────────────────────────────────────────┘
```

## 1.2 For a Web-Based Implementation

Since the game will run inside TheHUB (a browser-based website), the architecture adapts:

```
┌─────────────────────────────────────────────────────────┐
│                   THEHUB SHELL                            │
│  Existing website infrastructure                          │
│  Game runs in dedicated tab or iframe                     │
└──────────────────────┬──────────────────────────────────┘
                       │ postMessage bridge (for rewards)
┌──────────────────────▼──────────────────────────────────┐
│              MUSHOKU TENSAI IDLE GAME                     │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │          RENDERING (Canvas 2D + DOM)              │   │
│  │  - Character sprites (pixel art)                 │   │
│  │  - Monster sprites                               │   │
│  │  - UI overlays (tabs, menus, tooltips)           │   │
│  │  - Floating text (numbers, notifications)        │   │
│  │  - Horizontal combat strip                       │   │
│  └──────────────────┬───────────────────────────────┘   │
│                     │                                    │
│  ┌──────────────────▼───────────────────────────────┐   │
│  │          GAME LOOP (requestAnimationFrame)        │   │
│  │                                                   │   │
│  │  update(deltaTime) {                              │   │
│  │    combatSystem.tick(deltaTime);                  │   │
│  │    waveManager.update(deltaTime);                 │   │
│  │    aiController.update(deltaTime);                │   │
│  │    lootEngine.update(deltaTime);                  │   │
│  │    economyManager.update(deltaTime);              │   │
│  │    saveManager.checkAutoSave();                   │   │
│  │  }                                                │   │
│  │                                                   │   │
│  │  render() {                                       │   │
│  │    canvasRenderer.clear();                        │   │
│  │    canvasRenderer.drawBackground();               │   │
│  │    canvasRenderer.drawHeroes();                   │   │
│  │    canvasRenderer.drawEnemies();                  │   │
│  │    canvasRenderer.drawProjectiles();              │   │
│  │    canvasRenderer.drawFloatingText();             │   │
│  │    uiRenderer.updateHUD();                       │   │
│  │  }                                                │   │
│  └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

# II. DATA FLOW DIAGRAMS

## 2.1 Combat Tick Flow

```
requestAnimationFrame
    │
    ▼
deltaTime = (timestamp - lastTimestamp)
    │
    ▼
Update Loop (fixed timestep: 100ms)
    │
    ├── Wave Manager
    │   ├── Check if current wave is cleared
    │   ├── If yes: increment wave counter, spawn next wave
    │   └── If all waves cleared: stage complete
    │
    ├── Hero AI Controller
    │   ├── Check skill cooldowns for each hero
    │   ├── Evaluate situation (HP, enemy count, boss present)
    │   ├── Choose action: basic attack OR skill OR reposition
    │   └── Execute action (damage calculation)
    │
    ├── Monster AI
    │   ├── Move toward heroes (leftward)
    │   ├── If in range: attack
    │   └── Special abilities based on monster type
    │
    ├── Damage Resolution
    │   ├── Calculate raw damage (base + modifiers)
    │   ├── Check dodge
    │   ├── Check block
    │   ├── Apply armor/resistance
    │   ├── Apply damage reduction
    │   ├── Apply absorption
    │   └── Apply final damage (minimum 1)
    │
    ├── Loot Engine
    │   ├── On monster death: roll drop table
    │   ├── If chest: add to pending chests, start cooldown
    │   ├── If item: generate item instance
    │   └── Add XP/gold to player totals
    │
    └── State Update
        ├── Update hero/monster positions
        ├── Update HP bars
        ├── Check death conditions
        ├── Generate floating text queue
        └── Emit state change events (for UI)
```

## 2.2 Item Flow (From Drop to Equipped)

```
Monster Dies
    │
    ▼
Loot Engine: Roll Drop Table
    │
    ├── No drop → continue
    │
    └── Item drops
        │
        ▼
        Determine Item Slot (weighted)
            │
            ▼
            Determine Base Template (by player level range)
                │
                ▼
                Roll Rarity (weighted by stage difficulty)
                    │
                    ▼
                    Roll Affixes (pool by rarity + slot)
                        │
                        ▼
                        Create ItemInstance
                            │
                            ▼
                            Add to Chest (visual object)
                                │
                                ▼
                                Player Clicks Chest
                                    │
                                    ▼
                                    Add to Inventory
                                        │
                                        ▼
                                        Options:
                                        ├── Equip (if better than current)
                                        ├── Lock (Alt+Click — prevents accidental loss)
                                        ├── Alchemy (→ Gold + Cube XP)
                                        ├── Synthesis (9 items → 1 higher rarity)
                                        └── Leave in inventory (for later)
```

## 2.3 Rune Tree Interaction Flow

```
Player Opens Rune Tree Tab
    │
    ▼
Load Rune Tree State
    ├── Purchased nodes (id list)
    ├── Available points (if using point-based system)
    └── Gold balance
    │
    ▼
Render Node Graph
    ├── Unlocked nodes (bright, clickable)
    ├── Locked nodes (dim, locked icon)
    ├── Available nodes (pulsing, prerequisites met)
    └── Connection lines between nodes
    │
    ▼
Player Hovers Node
    │
    ▼
Show Tooltip:
    ├── Name
    ├── Description
    ├── Current level effect
    ├── Next level effect
    ├── Cost (gold)
    └── Prerequisites (if any not met)
    │
    ▼
Player Clicks (if available & affordable)
    │
    ▼
    ├── Deduct gold
    ├── Mark node as purchased
    ├── Recalculate all active bonuses
    ├── Apply modifiers to hero stats
    └── Play purchase animation/sound
```

---

# III. STATE MANAGEMENT

## 3.1 Global Game State Shape

```typescript
interface GameState {
    // Meta
    version: string;
    lastSaveTime: number;
    totalPlayTime: number;
    
    // Player
    player: {
        gold: number;
        soulStones: number;
        anniversaryCoins: AnniversaryCoin[];
        achievements: string[];
        settings: GameSettings;
    };
    
    // Progression
    progression: {
        currentAct: number;          // 1-3
        currentStage: number;        // 1-10
        currentDifficulty: number;   // 0-3 (Normal/Torment)
        highestStageCleared: string; // e.g., "3-10-Torment"
        level: number;
        xp: number;
    };
    
    // Heroes
    heroes: {
        roster: HeroSaveState[];     // All owned heroes
        activeFormation: string[];   // Up to 3 hero IDs
        petEquipped: string | null;
    };
    
    // Inventory
    inventory: {
        items: ItemInstance[];
        maxSlots: number;
        stashTabs: StashTab[];
    };
    
    // Rune Tree
    runeTree: {
        purchasedNodes: Record<number, number>;  // nodeId → level
        // 197 nodes
    };
    
    // Cube
    cube: {
        level: number;
        xp: number;
    };
    
    // Combat Runtime (not persisted for offline, recalculated)
    combatState?: CombatRuntimeState;
}
```

## 3.2 Event Bus Architecture

```typescript
// Decoupled communication between systems
type GameEvent = 
    | { type: 'MONSTER_KILLED'; monsterId: string; position: Point }
    | { type: 'CHEST_DROPPED'; chestId: string; position: Point }
    | { type: 'STAGE_CLEARED'; stageId: string }
    | { type: 'HERO_LEVEL_UP'; heroId: string; newLevel: number }
    | { type: 'ITEM_EQUIPPED'; heroId: string; itemId: string }
    | { type: 'RUNE_PURCHASED'; nodeId: number }
    | { type: 'ACHIEVEMENT_UNLOCKED'; achievementId: string }
    | { type: 'GOLD_CHANGED'; amount: number; source: string }
    | { type: 'GAME_SAVED'; timestamp: number };

// Event bus pattern for loose coupling
class EventBus {
    private listeners: Map<string, Function[]> = new Map();
    
    emit(event: GameEvent): void {
        const handlers = this.listeners.get(event.type) || [];
        handlers.forEach(h => h(event));
    }
    
    on(eventType: string, handler: Function): void {
        // Register handler
    }
    
    off(eventType: string, handler: Function): void {
        // Unregister handler
    }
}
```

---

# IV. PERFORMANCE CONSIDERATIONS

## 4.1 Critical Performance Targets (for Web)

| Metric | Target | Notes |
|--------|--------|-------|
| FPS (foreground) | 30-60 | Acceptable for pixel idle game |
| FPS (background/tab hidden) | 5-10 | Tab throttling by browser |
| Memory usage | <100MB | Pixel art is small, but item database is large |
| Save size | <500KB | JSON compression helps |
| Load time | <3 seconds | Lazy-load non-critical systems |
| Canvas draw calls | <100/frame | Use sprite batching |

## 4.2 Optimization Strategies

1. **Sprite Atlasing:** Bundle all character/monster frames into a single sprite sheet
2. **Object Pooling:** Reuse dead entities instead of creating/destroying
3. **Dirty Flag Rendering:** Only redraw when state actually changes (for UI elements)
4. **Worker Offload:** Combat calculations in a Web Worker, rendering on main thread
5. **Throttled Background Updates:** When tab is hidden, slow update to 1-2 ticks/second
6. **IndexedDB Batching:** Batch writes, don't write every tick

---

# V. KEY ENGINEERING PRINCIPLES DERIVED

**Principle 1: Predictable Randomness**
Use seeded PRNG for deterministic replays and consistent offline calculations. The pity timer system ensures players feel like loot is fair, not random.

**Principle 2: Offline as Simulation, Not Snapshot**
Don't store offline progress in real-time. Store player stats and last-save timestamp. On reconnection, simulate the elapsed time forward. This allows balance changes to retroactively apply.

**Principle 3: All Systems are Composable**
Every stat modifier should be usable by any system. Attack Speed from gear + Attack Speed from Rune Tree + Attack Speed from skill buff = one additive pool. No hardcoded exclusions.

**Principle 4: Economy is a Dynamic System**
Gold is not "balanced" once — it's a dynamic system with earn rates, sink rates, and inflation controls. Monitor player gold:spend ratios and adjust sink costs.

**Principle 5: Save Early, Save Often**
Players will rage-quit if they lose progress. Save after every meaningful action. Use save versioning to allow migration without data loss.

---

*End of Architecture Notes*
