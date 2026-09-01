# TBH: TASK BAR HERO — SYSTEM INTERACTION DIAGRAMS
## Phase 2 Deliverable | Reference for Game Adaptation
**Classification:** Engineering Hypotheses

---

# I. MASTER SYSTEM INTERACTION MAP

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  USER       │◄───►│  UI LAYER    │◄───►│  INPUT      │
│  (Player)   │     │  (Tabs/HUD)  │     │  (Mouse)    │
└──────┬──────┘     └──────┬───────┘     └─────────────┘
       │                   │
       │              ┌────▼───────┐
       │              │ EVENT BUS  │
       │              │  (Pub/Sub) │
       │              └────┬───────┘
       │                   │
       ▼                   ▼
┌──────────────────────────────────────────────────────┐
│                   GAME LOOP                            │
│  Fixed Timestep (100ms) + requestAnimationFrame (render)│
│                                                        │
│  ┌─────────┐  ┌──────────┐  ┌────────┐  ┌─────────┐ │
│  │ COMBAT  │  │    AI    │  │  WAVE  │  │  LOOT   │ │
│  │ ENGINE  │◄─┤ MANAGER  │◄─┤MANAGER │  │ ENGINE  │ │
│  └────┬────┘  └──────────┘  └────────┘  └────┬────┘ │
│       │                                       │      │
│       ▼                                       ▼      │
│  ┌──────────┐                          ┌──────────┐  │
│  │ DAMAGE   │                          │  ITEM    │  │
│  │ CALC     │                          │  FACTORY  │  │
│  └────┬─────┘                          └────┬─────┘  │
│       │                                     │        │
└───────┼─────────────────────────────────────┼────────┘
        │                                     │
        ▼                                     ▼
┌──────────────────┐              ┌──────────────────────┐
│  STAT ENGINE     │              │  INVENTORY SYSTEM    │
│  (Aggregates all  │              │  (Items, Chests,     │
│   modifiers)      │              │   Stash)             │
└────────┬─────────┘              └──────────┬───────────┘
         │                                    │
         ▼                                    ▼
┌──────────────────┐              ┌──────────────────────┐
│  RUNE TREE       │              │  CUBE CRAFTING       │
│  (197 nodes,     │              │  (Alch/Synth/Craft    │
│   stat bonuses)  │              │   /Decor/Engrav/etc) │
└────────┬─────────┘              └──────────┬───────────┘
         │                                    │
         └──────────────┬─────────────────────┘
                        │
                        ▼
               ┌────────────────┐
               │  ECONOMY       │
               │  MANAGER       │
               │  (Gold sinks,  │
               │   currencies)  │
               └────────┬───────┘
                        │
                        ▼
               ┌────────────────┐
               │  PERSISTENCE   │
               │  (Save/Load)   │
               └────────────────┘
```

---

# II. PLAYER ENGAGEMENT STATE MACHINE

```
                    ┌──────────────┐
                    │   LAUNCH     │
                    │   GAME       │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
              ┌────►│  CHECK SAVE  │
              │     └──────┬───────┘
              │            │
              │     ┌──────▼───────┐
              │     │  LOAD SAVE   │
              │     │ or NEW GAME  │
              │     └──────┬───────┘
              │            │
              │            ▼
              │     ┌──────────────┐
              │     │  OFFLINE     │
              │     │  CATCHUP     │
              │     │  (Calc &     │ ◄─── Offline rewards screen
              │     │   Display)   │
              │     └──────┬───────┘
              │            │
              │            ▼
              │     ┌──────────────┐
              │     │  MAIN GAME   │
              │     │  (Combat)    │ ◄─── Auto-running in background
              │     └──────┬───────┘
              │            │
              │     ┌──────▼───────┐
              │     │  INTERACTION │
              │     │  PHASE       │ ◄─── Player engages:
              │     │              │      • Click chests
              │     │              │      • Equip items
              │     │              │      • Spend runes
              │     │              │      • Craft at Cube
              │     │              │      • Change formation
              │     │              │      • Push stage
              │     └──────┬───────┘
              │            │
              │            ▼
              │     ┌──────────────┐
              │     │  AFK/AUTO    │
              │     │  PHASE       │ ◄─── Player walks away
              │     │  (Idle)      │
              │     └──────┬───────┘
              │            │
              └────────────┘
             (Loop: check back periodically)
             
             ┌──────────────┐
             │   CLOSE      │
             │   GAME       │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐
             │  AUTO-SAVE   │
             │  + TIMESTAMP │
             └──────────────┘
```

**State Transitions:**
| From | To | Trigger |
|------|-----|---------|
| Launch | Check Save | App start |
| Check Save | Load Save | Valid save found |
| Check Save | New Game | No save or corrupted |
| Load/New | Offline Catchup | Time elapsed since last save > 60s |
| Offline Catchup | Main Game | Player dismisses rewards |
| Main Game | Interaction | Player clicks/interacts |
| Interaction | Main Game | Player closes menu |
| Main Game | AFK/Auto | Player idle > 30s |
| AFK/Auto | Interaction | Player clicks/returns |
| Any State | Close | App close/beforeunload |

---

# III. COMBAT LOOP SEQUENCE DIAGRAM

```
Hero         Monster       WaveMgr       LootEng     UI/Canvas
  │             │             │             │            │
  │◄─── tick ───┤─────────────┤─────────────┤────────────┤
  │             │             │             │            │
  │[Check CD]   │             │             │            │
  │───Skill?───►│             │             │            │
  │             │             │             │            │
  │──ApplyDmg──►│             │             │            │
  │             │[HP <= 0]   │             │            │
  │             │──Monster──►│             │            │
  │             │  Death     │             │            │
  │             │            │[Check wave] │            │
  │             │            │──RollLoot──►│            │
  │             │            │             │──GenItem──►│
  │             │            │             │  (display) │
  │             │            │[Next wave?] │            │
  │             │            │──Spawn─────►│            │
  │◄───new──────┤            │             │            │
  │  enemies    │            │             │            │
  │             │            │             │            │
  │[All waves done]           │             │            │
  │──────────────Stage Clear────────────────►│            │
  │             │            │             │──Show──────►│
  │             │            │             │  Results    │
  │             │            │             │            │
```

---

# IV. LOOT GENERATION SEQUENCE

```
Monster Death Event
    │
    ▼
┌─────────────────────────────────────────────┐
│           LOOT ENGINE                        │
│                                              │
│  1. Determine if loot drops (PRD check)      │
│     ├─ Roll base chance + pity accumulator   │
│     └─ No → exit, increment pity counter     │
│                                              │
│  2. Roll drop source:                        │
│     ├─ Chest drop                            │
│     └─ Direct item drop                      │
│                                              │
│  3. If chest:                               │
│     ├─ Add to chest queue (max N pending)    │
│     ├─ Start chest despawn timer (2 min)     │
│     └─ Emit chest_spawned event              │
│                                              │
│  4. If direct item:                          │
│     ├─ Roll item slot (weighted)             │
│     ├─ Roll base template (by player level)  │
│     ├─ Roll rarity (by stage difficulty)      │
│     ├─ Roll affixes (by rarity + slot)       │
│     └─ Create ItemInstance                   │
│                                              │
│  5. Emit loot_available event                │
└─────────────────────────────────────────────┘
    │
    ▼
Player Interaction:
    ├─ Click chest → Add to inventory
    ├─ Auto-loot (if unlocked) → Add to inventory
    └─ Chest despawns (if not clicked in time)
```

---

# V. ECONOMY FLOW

```
                    GOLD ECONOMY
                    ────────────

    SOURCES                              SINKS
    ───────                              ─────
┌──────────────┐                  ┌──────────────┐
│ Stage Clears │                  │ Rune Tree    │
│ (Gold reward)│                  │ (Node costs) │
└──────┬───────┘                  └──────┬───────┘
       │                                 │
┌──────▼───────┐                  ┌──────▼───────┐
│ Alchemy      │                  │ Cube         │
│ (Sell items) │──►  GOLD  ◄──────│ Extraction   │
└──────┬───────┘    POOL         │ (Socket fees)│
       │            ──────       └──────┬───────┘
┌──────▼───────┐                  ┌──────▼───────┐
│ Chests       │                  │ Synthesis    │
│ (Gold inside)│                  │ (Gold fee)   │
└──────┬───────┘                  └──────┬───────┘
       │                                 │
┌──────▼───────┐                  ┌──────▼───────┐
│ Offline      │                  │ Crafting     │
│ (50% eff)    │                  │ (Gold cost)  │
└──────────────┘                  └──────────────┘

    INFLATION CONTROLS:
    • Alchemy value scales with item rarity (10→355,607 gold)
    • Cube extraction costs scale by tier (100→50,000 gold)
    • Offline capped at 8 hours
    • Gold costs for Rune Tree escalate quadratically
```

---

# VI. GAME STARTUP FLOW

```
User loads page
    │
    ▼
┌─────────────────────────────────────────────┐
│              INITIALIZATION                   │
│                                              │
│  1. Initialize Canvas 2D renderer             │
│  2. Load static assets (sprite atlases)       │
│  3. Load game data (items, monsters, etc.)   │
│  4. Check for existing save (IndexedDB)      │
│     ├─ Found → Load and restore state        │
│     └─ Not found → Show "New Game" screen    │
│  5. Calculate offline rewards (if applicable) │
│  6. Start game loop                           │
│     ├─ Combat simulation begins               │
│     └─ UI rendered                            │
│  7. Set up event listeners (mouse, keyboard)  │
│                                              │
└─────────────────────────────────────────────┘
    │
    ▼
Game is running
```

---

# VII. THEHUB INTEGRATION FLOW (For Your Implementation)

```
┌─────────────────────────────────────────────────┐
│                   THEHUB                          │
│                                                   │
│  ┌───────────────────────────────────────────┐   │
│  │  Existing Pages: Dashboard, Tasks, etc.   │   │
│  └───────────────────────────────────────────┘   │
│                                                   │
│  ┌───────────────────────────────────────────┐   │
│  │  Games Tab (New or replacing Idle Hero)   │   │
│  │                                           │   │
│  │  ┌───────────────────────────────────┐   │   │
│  │  │  Game Canvas (Combat View)        │   │   │
│  │  │  [Pixel art heroes fighting]      │   │   │
│  │  └───────────────────────────────────┘   │   │
│  │                                           │   │
│  │  ┌───────────────────────────────────┐   │   │
│  │  │  Mini View (in Activity Card)     │   │   │
│  │  │  [Compact status display]         │   │   │
│  │  └───────────────────────────────────┘   │   │
│  │                                           │   │
│  │  ┌───────────────────────────────────┐   │   │
│  │  │  postMessage Bridge               │   │   │
│  │  │  TheHUB → Game: "hub.activity"    │   │   │
│  │  │  Game → TheHUB: "idlehero.ack"    │   │   │
│  │  └───────────────────────────────────┘   │   │
│  └───────────────────────────────────────────┘   │
│                                                   │
│  Storage: IndexedDB (persistent game saves)       │
│  Data Keys: hub.mt-game.v1 (Mushoku Tensei state) │
└─────────────────────────────────────────────────┘
```

**Bridge Messages (preserving your existing pattern):**
```
TheHUB → Game:
  "hub.activity"          — Real Hub activity data for rewards
  "hub.companion.snapshot" — Current state summary
  "hub.companion.event"    — Specific event (task done, focus complete)
  "hub.companion.pause"    — Pause game
  "hub.companion.resume"   — Resume game

Game → TheHUB:
  "idlehero.ready"        — Game has loaded
  "idlehero.ack"          — Reward acknowledged
  "mtgame.levelup"        — Hero/Player leveled up
  "mtgame.achievement"    — Achievement unlocked
```

---

# VIII. COMPLETE SYSTEM DEPENDENCY GRAPH

```
 Game Loop
    ├── depends on → Combat Engine
    │   ├── depends on → Stat Engine
    │   │   ├── depends on → Hero Definitions
    │   │   ├── depends on → Gear Stats
    │   │   ├── depends on → Rune Tree Bonuses
    │   │   └── depends on → Skill Effects
    │   ├── depends on → AI Controller
    │   │   ├── depends on → Hero Skill Config
    │   │   └── depends on → Enemy Behavior Data
    │   ├── depends on → Damage Calculator
    │   │   ├── depends on → Defense Formulas
    │   │   └── depends on → Elemental System
    │   └── depends on → Wave Manager
    │       ├── depends on → Stage Definitions
    │       └── depends on → Spawn Tables
    │
    ├── depends on → Loot Engine
    │   ├── depends on → Drop Tables
    │   ├── depends on → PRD System
    │   ├── depends on → Item Factory
    │   │   ├── depends on → Item Templates
    │   │   └── depends on → Affix Roll Tables
    │   └── depends on → Economy Manager
    │       ├── depends on → Currency Definitions
    │       └── depends on → Gold Formulas
    │
    ├── depends on → Progression System
    │   ├── depends on → XP Tables
    │   ├── depends on → Rune Tree Data
    │   └── depends on → Stage Unlock Logic
    │
    └── depends on → Persistence
        ├── depends on → Save Schema
        ├── depends on → Migration Logic
        └── depends on → Storage API (IndexedDB)
```

**Circular Dependency Warning:** Note that Stat Engine depends on Gear Stats, but Gear depends on Stat Engine for damage calculations. Solution: Compute gear stats as static values (pre-calculated on equip), don't derive them from the stat engine at runtime.

---

*End of System Interaction Diagrams*
