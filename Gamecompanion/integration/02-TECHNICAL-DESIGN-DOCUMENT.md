# TECHNICAL DESIGN DOCUMENT
## Project: AETHERWEAVE — An Original Idle Companion RPG
**Phase 3 Deliverable | Integration Planning**
**Status:** Complete

---

# I. TECHNOLOGY STACK

## 1.1 Stack Decision

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Game Engine** | Custom (Vanilla JS + Canvas 2D) | TheHUB is web-based; no 3D needed; 2D pixel art performs best on Canvas |
| **UI Framework** | Vanilla JS + DOM overlay | Canvas for game view, DOM for menus (accessibility, theming, text rendering) |
| **State Management** | Custom Event Bus + Central Store | No external dependencies; simple enough to hand-roll |
| **Persistence** | IndexedDB (via idb wrapper) | Large capacity for items/saves; TheHUB already uses IndexedDB |
| **Build System** | Vite (for development) | Fast HMR, TypeScript support if desired later |
| **Styling** | CSS Variables + CSS Grid | TheHUB's existing theme system can be extended |
| **Audio** | Web Audio API + Howler.js (minimal) | Lightweight audio sprite playback |

## 1.2 Why Not a Framework

**Decision:** Vanilla JS over React/Vue/etc.

**Rationale:**
- The game loop runs at its own frequency (not DOM-driven)
- Canvas rendering is imperative, not declarative
- A framework adds bundle size for minimal benefit in a game context
- TheHUB already uses Vanilla JS; consistency matters
- If complexity grows, migrate to a thin ECS pattern

---

# II. MODULE ARCHITECTURE

## 2.1 Module Map

```
src/
├── main.js                    # Entry point, boot sequence
├── core/
│   ├── GameLoop.js            # Fixed-timestep loop + RAF render
│   ├── EventBus.js            # Pub/sub event system
│   ├── StateManager.js        # Central game state + serialization
│   ├── SaveManager.js         # IndexedDB persistence + migrations
│   └── TimeKeeper.js          # Delta time, offline calculation
├── combat/
│   ├── CombatEngine.js        # Tick-based combat simulation
│   ├── DamageCalculator.js    # Damage formula pipeline
│   ├── AIController.js        # Rule-based AI for heroes/enemies
│   ├── WaveManager.js         # Spawn scheduling, wave composition
│   └── StatusEffectSystem.js  # Buffs, debuffs, DoTs, crowd control
├── entities/
│   ├── Entity.js              # Base entity (position, stats, state machine)
│   ├── Hero.js                # Player-controlled character
│   ├── Enemy.js               # Riftspawn monster
│   ├── Projectile.js          # Attack projectiles
│   └── EntityFactory.js       # Create entities from templates
├── systems/
│   ├── LootEngine.js          # Drop tables, PRD, item generation
│   ├── ProgressionSystem.js   # XP curves, level gates, attunement
│   ├── AffinitySystem.js      # Relationship tracking and effects
│   ├── QuestSystem.js         # Quest state machine
│   ├── EconomyManager.js      # Currency tracking and validation
│   └── AchievementSystem.js   # Achievement definitions and checks
├── crafting/
│   ├── Aetherforge.js         # Crafting hub (all 8 functions)
│   ├── FuseEngine.js          # Grade-up odds
│   ├── ShatterEngine.js       # Item → Dust conversion
│   └── AffixRoller.js         # Random affix generation
├── data/
│   ├── weavers.js             # Hero class definitions
│   ├── enemies.js             # Monster templates
│   ├── zones.js               # Stage definitions
│   ├── items.js               # Item templates (5,760+)
│   ├── attunement.js          # Skill tree definitions
│   ├── quests.js              # Quest definitions
│   ├── factions.js            # Faction data
│   └── affixes.js             # Affix pool definitions
├── rendering/
│   ├── CanvasRenderer.js      # Main canvas rendering pipeline
│   ├── SpriteAtlas.js         # Sprite sheet management
│   ├── ParticleSystem.js      # Floating numbers, effects
│   ├── HUD.js                 # In-game HUD rendering
│   ├── WindowManager.js       # Mini/Compact/Full mode sizing
│   └── backgrounds.js         # Zone background rendering
├── ui/
│   ├── UIEngine.js            # DOM-based UI controller
│   ├── screens/
│   │   ├── GameScreen.js      # Main combat view
│   │   ├── PartyScreen.js     # Party management
│   │   ├── InventoryScreen.js # Gear management
│   │   ├── AttunementScreen.js# Skill tree view
│   │   ├── ForgeScreen.js     # Crafting hub
│   │   ├── QuestScreen.js     # Quest journal
│   │   ├── MapScreen.js       # Zone selection
│   │   └── SettingsScreen.js  # Options
│   ├── components/
│   │   ├── Tooltip.js         # Hover tooltips
│   │   ├── Modal.js           # Confirmation dialogs
│   │   ├── Toast.js           # Notification toasts
│   │   ├── ProgressBar.js     # HP/XP bars
│   │   └── ItemCard.js        # Item display card
│   └── styles/
│       ├── variables.css      # Color palette, spacing
│       ├── base.css           # Reset, typography
│       └── screens.css        # Per-screen styles
└── integration/
    ├── TheHUBBridge.js        # postMessage handler for TheHUB
    ├── ThemeAdapter.js        # Match TheHUB's theme system
    └── HubDataSync.js         # Sync activity data with TheHUB
```

## 2.2 Module Dependency Rules

```
RENDERING (can import from DATA, cannot import from COMBAT)
    ↑
SYSTEMS (can import from DATA, COMBAT, ENTITIES)
    ↑
COMBAT (can import from ENTITIES, DATA)
    ↑
ENTITIES (can import from DATA only)
    ↑
CORE (no game-specific imports)
    ↑
DATA (leaf module, no imports)
```

**Enforced at code review.** Circular dependencies are not permitted. The Event Bus decouples systems from each other.

---

# III. GAME LOOP IMPLEMENTATION

## 3.1 Fixed-Timestep Loop

```javascript
class GameLoop {
    constructor() {
        this.FIXED_DT = 100;        // 100ms = 10 ticks/second
        this.MAX_FRAME_DT = 500;     // Cap delta to prevent spiral of death
        this.accumulator = 0;
        this.lastTime = 0;
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.loop(t));
    }

    loop(timestamp) {
        if (!this.isRunning) return;

        let frameTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        // Cap frame time to prevent spiral-of-death on tab restore
        if (frameTime > this.MAX_FRAME_DT) {
            frameTime = this.MAX_FRAME_DT;
        }

        this.accumulator += frameTime;

        // Fixed timestep updates
        while (this.accumulator >= this.FIXED_DT) {
            this.update(this.FIXED_DT);
            this.accumulator -= this.FIXED_DT;
        }

        // Render at display refresh rate
        this.render(timestamp);

        requestAnimationFrame((t) => this.loop(t));
    }

    update(dt) {
        // Order matters: combat → systems → UI state
        CombatEngine.tick(dt);
        WaveManager.update(dt);
        AIController.update(dt);
        LootEngine.update(dt);
        StatusEffectSystem.tick(dt);
        AffinitySystem.tick(dt);  // Slow tick (every 60s)
        EconomyManager.tick(dt);
    }

    render(timestamp) {
        CanvasRenderer.clear();
        CanvasRenderer.drawBackground(this.currentZone);
        CanvasRenderer.drawEntities(EntityManager.getAll());
        CanvasRenderer.drawProjectiles(ProjectileManager.getAll());
        ParticleSystem.render(timestamp);
        HUD.update();
    }
}
```

## 3.2 FPS Management

```javascript
class FPSManager {
    constructor() {
        this.mode = 'compact';       // 'mini' | 'compact' | 'full'
        this.windowState = 'active'; // 'active' | 'background' | 'hidden'
        this.targetFPS = 30;
    }

    recalculateTargetFPS() {
        if (this.windowState === 'hidden') {
            this.targetFPS = 5;      // Tab not visible
        } else if (this.windowState === 'background') {
            this.targetFPS = 10;     // Tab visible but not focused
        } else if (this.mode === 'full') {
            this.targetFPS = 60;     // Active full mode
        } else if (this.mode === 'compact') {
            this.targetFPS = 30;     // Active compact mode
        } else {
            this.targetFPS = 15;     // Mini mode
        }
    }
}
```

## 3.3 Offline Catchup

```javascript
class OfflineCalculator {
    calculateRewards(playerState, lastSaveTime, currentTime) {
        const SECONDS_CAP = 43200;  // 12 hours
        const OFFLINE_EFFICIENCY = 0.6;  // 60% of active rate

        const elapsed = Math.min(
            (currentTime - lastSaveTime) / 1000,
            SECONDS_CAP
        );

        const activeRates = this.getActiveRates(playerState);

        return {
            gold: Math.floor(activeRates.goldPerSecond * elapsed * OFFLINE_EFFICIENCY),
            xp: Math.floor(activeRates.xpPerSecond * elapsed * OFFLINE_EFFICIENCY),
            aetherDust: Math.floor(activeRates.dustPerMinute * (elapsed / 60) * OFFLINE_EFFICIENCY * 0.3),
            riftClears: Math.floor(elapsed / activeRates.secondsPerStageClear),
            // No gear drops (preserves active play advantage)
            // No chests (preserves active play incentive)
        };
    }

    getActiveRates(playerState) {
        // Derived from player's last active zone performance
        return {
            goldPerSecond: playerState.goldPerSecond,
            xpPerSecond: playerState.xpPerSecond,
            dustPerMinute: playerState.dustPerMinute,
            secondsPerStageClear: playerState.secondsPerStageClear
        };
    }
}
```

---

# IV. STATE MANAGEMENT

## 4.1 Central Store Shape

```javascript
const initialState = {
    // Meta
    version: '1.0.0',
    lastSaveTime: null,
    totalPlayTime: 0,

    // Player resources
    player: {
        gold: 0,
        aetherDust: 0,
        memoryShards: 0,
        loomFragments: 0,
        totalRiftsCleared: 0,
        totalBossesDefeated: 0,
    },

    // Party
    party: {
        activeMembers: [],        // Up to 4 Weaver IDs
        roster: [],               // All owned Weavers
        formation: {              // Position order (affects targeting)
            front: null,          // Tank position
            mid: [null, null],    // DPS positions
            back: null            // Support position
        },
        pet: null,                // Equipped pet (8 types)
    },

    // Progression
    progression: {
        currentZone: 'verdant-weave',
        currentStage: 1,
        currentDifficulty: 0,     // 0=Calm, 1=Surge, 2=Storm, 3=Cataclysm
        highestZoneCleared: null,
        highestDifficultyCleared: 0,
    },

    // Characters (Weavers)
    weavers: {},

    // Inventory
    inventory: {
        items: [],
        maxSlots: 50,
        stash: [],                // Additional storage
        maxStashSlots: 100,
    },

    // Attunement (Skill Trees)
    attunement: {},

    // Aetherforge
    forge: {
        level: 1,
        xp: 0,
    },

    // Quests
    quests: {
        activeDaily: [],
        activePersonal: [],
        activeFaction: [],
        completedQuestIds: [],
        weeklyChallenge: null,
    },

    // Factions
    factions: {
        loomguard: { reputation: 0, rank: 1 },
        shardCollectors: { reputation: 0, rank: 1 },
        echoWalkers: { reputation: 0, rank: 1 },
    },

    // Relationships
    relationships: {
        // Key: "weaverA_id:weaverB_id"
        // Value: { affinity: number, flags: string[] }
    },

    // Achievements
    achievements: {
        unlocked: [],
        inProgress: {},
    },

    // Runtime (not persisted — recalculated on load)
    combat: null,
};
```

## 4.2 State Manager Pattern

```javascript
class StateManager {
    constructor() {
        this.state = deepClone(initialState);
        this.listeners = new Map(); // 'path.to.key' → Set<callback>
    }

    get(path) {
        return path.split('.').reduce((obj, key) => obj?.[key], this.state);
    }

    set(path, value) {
        const keys = path.split('.');
        const key = keys.pop();
        const target = keys.reduce((obj, k) => obj[k], this.state);
        target[key] = value;
        this.notify(path);
    }

    update(path, updater) {
        const current = this.get(path);
        this.set(path, updater(current));
    }

    subscribe(path, callback) {
        if (!this.listeners.has(path)) {
            this.listeners.set(path, new Set());
        }
        this.listeners.get(path).add(callback);
        return () => this.listeners.get(path).delete(callback);
    }

    notify(path) {
        const handlers = this.listeners.get(path) || new Set();
        handlers.forEach(cb => cb(this.get(path)));
    }
}
```

---

# V. EVENT BUS

## 5.1 Event Catalog

```javascript
const GameEvents = {
    // Combat
    MONSTER_KILLED: 'monster:killed',
    WAVE_CLEARED: 'wave:cleared',
    STAGE_CLEARED: 'stage:cleared',
    BOSS_DEFEATED: 'boss:defeated',
    HERO_DAMAGED: 'hero:damaged',
    HERO_DIED: 'hero:died',
    HERO_REVIVED: 'hero:revived',
    COMBO_MILESTONE: 'combo:milestone',

    // Loot
    CHEST_DROPPED: 'chest:dropped',
    CHEST_OPENED: 'chest:opened',
    ITEM_EQUIPPED: 'item:equipped',
    ITEM_SHATTERED: 'item:shattered',
    ITEM_FUSED: 'item:fused',

    // Character
    WEAVER_LEVEL_UP: 'weaver:level_up',
    WEAVER_SKILL_UNLOCKED: 'weaver:skill_unlocked',
    AFFINITY_CHANGED: 'affinity:changed',
    AFFINITY_MILESTONE: 'affinity:milestone',
    PERSONAL_QUEST_PROGRESS: 'quest:personal_progress',
    WEAVER_DEPARTED: 'weaver:departed',

    // Progression
    ZONE_UNLOCKED: 'zone:unlocked',
    DIFFICULTY_UNLOCKED: 'difficulty:unlocked',
    ATUNEMENT_POINT_EARNED: 'attunement:point',

    // Economy
    GOLD_CHANGED: 'gold:changed',
    DUST_CHANGED: 'dust:changed',
    FORGE_LEVELED: 'forge:leveled',

    // System
    GAME_SAVED: 'game:saved',
    GAME_LOADED: 'game:loaded',
    OFFLINE_REWARDS_COLLECTED: 'offline:rewards',
    ACHIEVEMENT_UNLOCKED: 'achievement:unlocked',

    // TheHUB Integration
    HUB_ACTIVITY_RECEIVED: 'hub:activity',
    HUB_REWARD_ACKNOWLEDGED: 'hub:reward_ack',
};
```

---

# VI. SAVE SYSTEM

## 6.1 Schema

```javascript
// Save file structure (compressed JSON in IndexedDB)
const SAVE_SCHEMA = {
    version: '1.0.0',             // For migration support
    timestamp: 1712345678000,     // Date.now()
    playTime: 3600000,            // ms total played
    
    // Full state snapshot (see 4.1)
    state: { /* ... */ },
    
    // Checksum for integrity
    checksum: 'a1b2c3d4',
};
```

## 6.2 Save Triggers

| Trigger | Behavior |
|---------|----------|
| Stage clear | Immediate save |
| Chest opened | Immediate save |
| Equipment change | Immediate save |
| Attunement point spent | Immediate save |
| Level up | Immediate save |
| Auto-save (idle) | Every 120 seconds |
| Tab visibility change | Save on hide |
| Beforeunload | Save before close |

## 6.3 Save Migration Strategy

```javascript
const MIGRATIONS = {
    '1.0.0': (save) => save,  // No migration needed
    '1.1.0': (save) => {
        // Example: Added new field
        save.state.player.loomFragments ??= 0;
        save.version = '1.1.0';
        return save;
    },
    // Future migrations added here
};

function migrateSave(save) {
    let current = save;
    while (semver.lt(current.version, CURRENT_SAVE_VERSION)) {
        const nextVersion = getNextVersion(current.version);
        if (MIGRATIONS[nextVersion]) {
            current = MIGRATIONS[nextVersion](current);
        } else {
            break;
        }
    }
    return current;
}
```

---

# VII. PERFORMANCE BUDGET

| Metric | Target | Measurement |
|--------|--------|-------------|
| First load | < 3 seconds | Network + parse + initialize |
| Save load | < 500ms | Read from IndexedDB + deserialize |
| Game tick (update) | < 10ms | All systems combined |
| Render frame | < 16ms (60fps target) | Canvas draw calls |
| Memory (idle) | < 100MB | Heap usage |
| Memory (peak) | < 200MB | During inventory management |
| Save write | < 50ms | Serialize + IndexedDB put |
| Asset size | < 5MB total | Sprite atlas + data files |

---

# VIII. DATA STRUCTURES

## 8.1 Item Template Example

```javascript
const ITEM_TEMPLATE = {
    templateId: 'sword_001',
    name: 'Iron Blade',
    slot: 'weapon',
    weaponType: 'blade',
    icon: 'sword_001.png',
    levelRange: { min: 1, max: 10 },
    baseStats: {
        attackDamage: { min: 3, max: 7 },
        attackSpeed: { min: 0.8, max: 1.2 },
    },
    possibleAffixes: {
        common: [],
        refined: ['flat_attack', 'attack_speed'],
        attuned: ['flat_attack', 'attack_speed', 'crit_chance'],
        resonant: ['flat_attack', 'attack_speed', 'crit_chance', 'element_damage'],
        aetherforged: ['all_above', 'unique_effect_chance'],
        loomTouched: ['all_above', 'guaranteed_unique_effect'],
    },
    visual: {
        color: '#e4e4e4',
        pixels: [0,0,1,0,1,1,/* sprite data */],
    },
};
```

## 8.2 Zone Definition Example

```javascript
const ZONE_DEFINITION = {
    zoneId: 'verdant-weave',
    name: 'The Verdant Weave',
    levelRange: { min: 1, max: 15 },
    stages: 10,
    difficulties: [
        { name: 'Calm', levelMult: 1.0, lootMult: 1.0 },
        { name: 'Surge', levelMult: 1.5, lootMult: 1.3 },
        { name: 'Storm', levelMult: 2.0, lootMult: 1.6 },
        { name: 'Cataclysm', levelMult: 3.0, lootMult: 2.0 },
    ],
    enemies: [
        { id: 'rift_slime', weight: 40, minLevel: 1 },
        { id: 'aether_wisp', weight: 30, minLevel: 2 },
        { id: 'thorn_crawler', weight: 20, minLevel: 4 },
        { id: 'corrupted_deer', weight: 10, minLevel: 6 },
    ],
    boss: {
        id: 'thorn-warden',
        stage: 10,
        soulStoneCost: 1,
    },
    background: 'verdant-weave-bg.png',
    ambientColor: '#4a7c59',
    lootTable: {
        baseDropRate: 0.05,  // 5% base
        pityIncrement: 0.01, // +1% per non-drop
    },
};
```

---

*End of Technical Design Document*
