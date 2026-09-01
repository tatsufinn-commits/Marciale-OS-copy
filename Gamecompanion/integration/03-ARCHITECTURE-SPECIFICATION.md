# ARCHITECTURE SPECIFICATION
## Project: AETHERWEAVE — An Original Idle Companion RPG
**Phase 3 Deliverable | Integration Planning**
**Status:** Complete

---

# I. SYSTEM ARCHITECTURE OVERVIEW

## 1.1 Layered Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
│                                                             │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐  │
│  │ Canvas 2D  │  │   DOM UI   │  │    Window Manager    │  │
│  │ (Combat)   │  │  (Menus)   │  │ (Mini/Compact/Full) │  │
│  └──────┬─────┘  └──────┬─────┘  └──────────┬───────────┘  │
│         │               │                    │              │
└─────────┼───────────────┼────────────────────┼──────────────┘
          │               │                    │
┌─────────▼───────────────▼────────────────────▼──────────────┐
│                     APPLICATION LAYER                        │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  EVENT BUS                            │  │
│  │  (Decoupled pub/sub for all system communication)    │  │
│  └────────────────────────┬─────────────────────────────┘  │
│                           │                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  STATE MANAGER                        │  │
│  │  (Central store + subscriptions)                     │  │
│  └────────────────────────┬─────────────────────────────┘  │
│                           │                                 │
│  ┌──────────┐ ┌──────────┼──────────┐ ┌─────────────────┐  │
│  │  COMBAT  │ │  SYSTEMS │          │ │    CRAFTING     │  │
│  │  Engine  │ │  Loot    │ Economy  │ │  Aetherforge    │  │
│  │  AI Ctrl │ │  Affinity│ Progres. │ │  Fuse/Shatter   │  │
│  │  WaveMgr │ │  Quests  │ Achievem.│ │  Imbue/Extract  │  │
│  │  Status  │ │  Factions│          │ │  Harmonize      │  │
│  └──────────┘ └──────────┼──────────┘ └─────────────────┘  │
│                          │                                  │
└──────────────────────────┼──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      DATA LAYER                              │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Items   │  │ Weavers  │  │  Zones   │  │  Skills  │  │
│  │  Database│  │ Database │  │ Database │  │ Database │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Enemies  │  │  Quests  │  │ Affixes  │  │  Factions│  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                             │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    PERSISTENCE LAYER                         │
│                                                             │
│  ┌────────────────────┐  ┌──────────────────────────────┐  │
│  │   SaveManager      │  │     TheHUB Bridge            │  │
│  │  IndexedDB R/W     │  │  postMessage Communication   │  │
│  │  Migration Engine  │  │  Activity Sync               │  │
│  └────────────────────┘  └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 1.2 Data Flow Paths

| Path | Data | Direction |
|------|------|-----------|
| Combat → State | Damage results, kill counts, XP | Update tick |
| State → Render | Entity positions, HP bars | Render frame |
| Input → Combat | AI priority changes, formation changes | On user action |
| Loot → Inventory | Generated items | On chest open |
| State → Save | Full state snapshot | On save trigger |
| Save → State | Restored state | On load |
| TheHUB → Game | Activity data, pause/resume | postMessage |
| Game → TheHUB | Level up events, achievement unlocks | postMessage |

---

# II. CRITICAL SYSTEM INTERACTIONS

## 2.1 Combat → AI → Loot Pipeline

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ Combat  │────►│   AI    │────►│  Loot   │────►│Inventory│
│ Engine  │     │Controller│    │ Engine  │     │         │
└────┬────┘     └─────────┘     └────┬────┘     └─────────┘
     │                                │
     │                                │
     ▼                                ▼
┌─────────┐                   ┌──────────────┐
│ Damage  │                   │  ItemFactory │
│ Calculator                  │  + AffixRoll │
└─────────┘                   └──────────────┘
     │                                │
     ▼                                ▼
┌─────────┐                   ┌──────────────┐
│  State  │                   │    State     │
│ (HP -)  │                   │ (item added) │
└─────────┘                   └──────────────┘
```

## 2.2 Save → Load Pipeline

```
Start Game
    │
    ▼
┌────────────────┐
│ Check IndexedDB│
│ for save file  │
└───────┬────────┘
        │
   ┌────┴────┐
   │         │
   ▼         ▼
 Found     Not Found
   │         │
   ▼         ▼
┌────────┐ ┌───────────┐
│ Load   │ │ New Game  │
│ Save   │ │ Initialize│
└───┬────┘ └─────┬─────┘
    │            │
    ▼            ▼
┌────────────────────┐
│ Run Migrations     │
│ (version check)    │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Hydrate State      │
│ (restore from JSON)│
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Calculate Offline  │
│ Rewards            │
│ (if time elapsed)  │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Start Game Loop    │
│ Render First Frame │
└────────────────────┘
```

---

# III. EVENT FLOW DIAGRAMS

## 3.1 Monster Death Event Flow

```
[Combat Engine detects monster HP <= 0]
    │
    ├── Emit: monster:killed { monsterId, position, zone }
    │       │
    │       ├── LootEngine: check drop table
    │       │       │
    │       │       ├── No drop → update PRD counter
    │       │       │
    │       │       └── Drop → ItemFactory.generate()
    │       │               │
    │       │               ├── Chest dropped → emit: chest:dropped
    │       │               └── Direct item → add to pending loot
    │       │
    │       ├── ProgressionSystem: add XP for each hero
    │       │       │
    │       │       └── Check level-up → emit: weaver:level_up
    │       │
    │       ├── EconomyManager: add gold
    │       │       │
    │       │       └── emit: gold:changed
    │       │
    │       ├── QuestSystem: check kill quests
    │       │
    │       └── AffinitySystem: no change per kill (too frequent)
    │
    ├── WaveManager: decrement wave monster count
    │       │
    │       └── If 0 remaining → emit: wave:cleared
    │               │
    │               └── If last wave → emit: stage:cleared
    │
    └── Renderer: trigger kill animation
            │
            └── ParticleSystem: floating text + death effect
```

## 3.2 Chest Interaction Flow

```
[LootEngine determines chest drop]
    │
    ├── Create chest entity on combat strip
    ├── Start despawn timer (120 seconds)
    └── Emit: chest:dropped { chestId, position }
            │
            ├── If Auto-Open unlocked:
            │       │
            │       └── Automatically open after 3s delay
            │
            └── If manual (default):
                    │
                    └── [Player clicks chest]
                            │
                            ├── Emit: chest:opened { chestId }
                            ├── LootEngine.resolveChest(chestId)
                            │       │
                            │       ├── Roll: item templates in chest
                            │       ├── Roll: rarity for each
                            │       └── Create ItemInstance[]
                            │
                            ├── InventorySystem: add items
                            │       │
                            │       └── If inventory full → emit warning
                            │
                            ├── ParticleSystem: loot fountain animation
                            │
                            └── SaveManager: trigger save
```

## 3.3 Relationship Milestone Flow

```
[AffinitySystem tick - every 60 seconds of combat]
    │
    ├── For each pair of active party members:
    │       │
    │       ├── If fighting together > 60s → +0.5 affinity
    │       │
    │       ├── Check for milestone thresholds:
    │       │       │
    │       │       ├── 20 → "Strained" → debuff notification
    │       │       ├── 40 → "Neutral" → no notification
    │       │       ├── 60 → "Comfortable" → +5% synergy applied
    │       │       ├── 80 → "Trusted" → +10% synergy applied
    │       │       └── 100 → "Bonded" → unlock combo skill
    │       │
    │       └── Emit: affinity:changed { pair, newValue, milestone? }
    │
    └── Check departure conditions:
            │
            └── If any Weaver has avg affinity < 15 for 3+ days:
                    │
                    └── Emit: weaver:departed { weaverId, reason }
                            │
                            ├── Remove from party
                            ├── Add to "returnable" list
                            └── Save immediately
```

---

# IV. PERFORMANCE HOT PATHS

## 4.1 Update Tick (Called 10x/second)

| Operation | Cost | Frequency |
|-----------|------|-----------|
| Entity position update (1D, simple += velocity×dt) | O(n) | Every tick |
| Attack cooldown check for each hero | O(heroes) | Every tick |
| AI decision for each hero | O(heroes) | Every tick (or staggered) |
| Monster AI (move toward heroes, basic attack) | O(enemies) | Every tick |
| Damage calculation per active attack | O(1) | Per attack |
| Status effect tick (DoTs, buff timers) | O(effects) | Every tick |
| Wave spawn check | O(1) | Every tick |
| PRD loot check per kill | O(1) | Per kill |
| State store updates (path set) | O(1) | Per change |

**Estimated total per tick:** < 5ms for typical combat (4 heroes, 15 enemies)

## 4.2 Render Frame (Called ~30x/second)

| Operation | Cost | Frequency |
|-----------|------|-----------|
| Clear canvas | O(pixels) | Every frame |
| Draw background | O(1) tile | Every frame |
| Draw hero sprites | O(heroes) | Every frame |
| Draw enemy sprites | O(enemies) | Every frame |
| Draw projectiles | O(projectiles) | Every frame |
| Draw floating text | O(texts) | Every frame (decay) |
| Update HUD | O(1) DOM writes | Every frame |
| Draw chests | O(chests) | Every frame |

**Estimated total per frame:** < 10ms for typical combat

---

# V. THEHUB INTEGRATION ARCHITECTURE

## 5.1 Bridge Design

```javascript
/**
 * TheHUBBridge.js
 * 
 * Communicates with the parent TheHUB application via window.postMessage.
 * Handles:
 *   - Receiving Hub activity data (for reward conversion)
 *   - Sending game events back to TheHUB (for Activity Heatmap)
 *   - Pause/resume signals from TheHUB
 *   - Theme synchronization
 * 
 * Protocol matches existing TheHUB companion pattern.
 */

class TheHUBBridge {
    constructor() {
        this.hubOrigin = window.location.origin; // Same-origin or configured
        this.ready = false;
        this.pendingRewards = [];
    }

    init() {
        window.addEventListener('message', (event) => {
            if (event.origin !== this.hubOrigin && event.origin !== 'null') return;
            this.handleMessage(event.data);
        });
        this.send('mtgame.ready', { version: '1.0.0' });
        this.ready = true;
    }

    handleMessage(data) {
        switch (data.type) {
            case 'hub.activity':
                // Convert Hub activity into in-game currency/XP
                this.convertActivityToRewards(data.payload);
                break;
            case 'hub.companion.snapshot':
                // Update mini companion display
                this.updateMiniDisplay(data.payload);
                break;
            case 'hub.companion.pause':
                this.pauseGame();
                break;
            case 'hub.companion.resume':
                this.resumeGame();
                break;
            case 'hub.theme':
                this.applyTheme(data.payload);
                break;
        }
    }

    send(type, payload) {
        window.parent.postMessage({ type, payload, source: 'aetherweave' }, '*');
    }

    convertActivityToRewards(activity) {
        const reward = {
            gold: Math.floor(activity.points * 10),
            xp: Math.floor(activity.points * 5),
        };
        this.pendingRewards.push(reward);
        this.send('mtgame.ack', { received: true, reward });
    }

    reportLevelUp(weaverId, newLevel) {
        this.send('mtgame.levelup', { weaverId, newLevel });
    }

    reportAchievement(achievementId) {
        this.send('mtgame.achievement', { achievementId });
    }

    pauseGame() {
        // Freeze game loop updates
        GameLoop.pause();
    }

    resumeGame() {
        GameLoop.resume();
    }

    applyTheme(theme) {
        // Sync with TheHUB's CSS variable system
        document.documentElement.style.setProperty('--hub-primary', theme.primary);
        document.documentElement.style.setProperty('--hub-background', theme.background);
        document.documentElement.style.setProperty('--hub-text', theme.text);
    }
}
```

## 5.2 Integration Points

| TheHUB Feature | Aetherweave Integration |
|----------------|------------------------|
| **Activity Heatmap** | Game reports level-ups, boss kills, achievements |
| **Hub Activity Card** | Mini companion view shows party status, gold, current zone |
| **Idle Hero Page (replacing)** | Full game view in dedicated tab |
| **Hub Control Settings** | Experimental toggle for Aetherweave |
| **Theme System** | Game reads CSS variables from TheHUB |
| **Data Storage** | Uses same IndexedDB pattern (hub.aetherweave.v1) |

---

# VI. ERROR HANDLING

## 6.1 Error Categories

| Category | Example | Recovery |
|----------|---------|----------|
| **Save Corrupted** | JSON parse failure | Show error, offer last auto-backup |
| **IndexedDB Full** | Storage quota exceeded | Warn user, offer export/clear |
| **Asset Load Failure** | Sprite failed to download | Use placeholder sprite, retry |
| **State Inconsistency** | Negative gold, null entity | Validate on load, clamp values |
| **Performance Degradation** | Frame rate drops below 15 | Auto-reduce render quality (no particles, simpler background) |

## 6.2 Graceful Degradation

Aetherweave should never crash TheHUB. All failures are contained:

```
try {
    GameLoop.tick();
} catch (error) {
    ErrorLogger.log(error);
    GameLoop.pause();
    UI.showErrorModal('A minor error occurred. Game has been paused.');
    // TheHUB continues functioning
}
```

---

*End of Architecture Specification*
