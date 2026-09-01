# TBH: TASK BAR HERO — UX BIBLE
## Phase 2 Deliverable | Reference for Game Adaptation
**Classification:** Verified Observations | Engineering Hypotheses

---

# I. THE TASKBAR EXPERIENCE

## 1.1 Verified Observations

**Physical Window Properties:**
- Window lives in the Windows taskbar (the strip at the bottom of the screen)
- Approximately 100-200 pixels tall
- Width: approximately 300-500 pixels
- Always-on-top behavior (critical for the "companion" feel)
- Window cannot be minimized to the taskbar (it IS the taskbar)
- Click-through areas: some UI elements coexist with taskbar click zones

**Player's Visual Experience:**
- Pixel art characters visible at very small scale
- Monsters and heroes move horizontally
- Health bars float above characters
- Loot appears as chests that must be clicked to open
- Numbers float up for gold/XP gains
- The game must be readable at a glance — you look at it for 1-2 seconds maximum

## 1.2 Community Consensus — The Companion Feel

The game's primary appeal is that it lives in the corner of your screen without competing for attention. Players describe it as a "cozy companion" — satisfying to check in on, but not demanding.

**The Problem Observed:**
- Uncapped background FPS (running at monitor's native refresh rate — 120/144Hz)
- Causes unnecessary GPU usage for a tiny window
- Focus stealing — hitboxes overlap with standard taskbar clicks
- Players reported accidentally clicking the game when aiming for taskbar icons
- Workaround: force background FPS cap via GPU control panel

## 1.3 Engineering Hypothesis — Window Management

A robust way to independently implement a persistent mini-window on a web page:

```typescript
interface GameWindowConfig {
    width: number;              // Default: 400px
    height: number;             // Default: 150px
    position: 'bottom-left' | 'bottom-right' | 'corner';
    alwaysOnTop: boolean;       // Via CSS z-index or popup window
    fpsCap: number;             // Default: 30 for background, 60 for foreground
    clickThrough?: boolean;     // For non-interactive background mode
}

// For web: Implement as a draggable overlay div with pointer-events toggle
// FPS capping via requestAnimationFrame throttling:
let lastFrame = 0;
function gameLoop(timestamp: number) {
    const fps = isVisible ? 60 : 30;
    if (timestamp - lastFrame >= 1000 / fps) {
        lastFrame = timestamp;
        update(timestamp);
        render(timestamp);
    }
    requestAnimationFrame(gameLoop);
}
```

## 1.4 UX Design Principles from TBH

| Principle | Implementation |
|-----------|---------------|
| **Glanceable** | All critical info must be readable in <2 seconds |
| **Non-Intrusive** | No sound spikes, no sudden pop-ups requiring attention |
| **Rewarding Check-ins** | Loot feels good to collect after time away |
| **Visual Feedback** | Numbers float up for every action — gold, XP, damage |
| **Clear State** | Is the game running? Are heroes alive? Dead? Status must be obvious |
| **Minimal Input** | Primary interactions: click chests, drag window, occasional menu |

---

# II. UI LAYOUT ANALYSIS

## 2.1 Verified Observations (from Screenshots)

**Main Game View (Taskbar Mode):**
```
┌──────────────────────────────────────────────┐
│ Hero Avatar | HP Bar | XP Bar | Gold Display │
│ [Characters fighting on a horizontal plane]   │
│ Monster HP bars | Damage numbers floating     │
│ Loot chests (clickable) appear near heroes    │
└──────────────────────────────────────────────┘
```

**Full UI Menu (Expanded View):**
```
┌──────────────────────────────────────────────┐
│ Tab Bar: Formation | Inventory | Rune | Cube │
│                                              │
│ Main content area (changes by tab)           │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│ │ Hero 1   │ │ Hero 2   │ │ Hero 3   │      │
│ │ Portrait │ │ Portrait │ │ Portrait │      │
│ │ Stats    │ │ Stats    │ │ Stats    │      │
│ └──────────┘ └──────────┘ └──────────┘      │
│                                              │
│ Slot Indicator: 3/3 heroes deployed          │
│ Stage: Act 1-5 | Difficulty: Normal          │
└──────────────────────────────────────────────┘
```

**Formation Screen:**
```
┌──────────────────────────────────────────────┐
│ [Hero 1] → [Hero 2] → [Hero 3]              │
│  ↑ Arrow buttons to reorder                  │
│  Swap in/out from roster                     │
│  60s cooldown on hero deployment change      │
│                                              │
│ Pet Slot (8 pet types)                       │
└──────────────────────────────────────────────┘
```

## 2.2 Navigation Model

**Verified Observation:** Tab-based navigation with clear hierarchical organization:
1. **Formation** — Party management, hero slots, pets
2. **Inventory** — Gear grid, item details, equipping
3. **Rune Tree** — Node map (graph visualization)
4. **Cube** — Crafting hub with function tabs
5. **Stages** — Map view with stage selection
6. **Shop/Market** — DLC purchases, Steam Market access

**Interaction model:** Mouse-only (community confirmed: "Mouse Only Option" accessibility feature)

## 2.3 Engineering Hypothesis — UI Architecture

A robust way to independently implement the UI:

```
Component Tree:
├── GameCanvas (the combat viewport)
│   ├── HeroSprite[] (auto-attacking)
│   ├── EnemySprite[] (wave-spawning)
│   ├── FloatingText[] (damage, gold, XP)
│   └── ChestSprite[] (clickable loot)
├── HUD (overlaid stats)
│   ├── GoldDisplay
│   ├── StageInfo
│   └── HeroStatus[]
└── MenuPanel (tabbed overlay)
    ├── FormationTab
    ├── InventoryTab
    ├── RuneTreeTab
    ├── CubeTab
    └── MapTab
```

**UI State Management:**
```typescript
interface GameUIState {
    currentTab: TabId | null;       // null = game view only
    selectedHero: string | null;
    selectedItem: string | null;
    isDragging: boolean;
    tooltipData: TooltipData | null;
    modalData: ModalData | null;    // For confirmations, warnings
}
```

---

# III. IDLE MECHANICS

## 3.1 Verified Observations

**Online Idle (AFK):**
- Game runs continuously while window is open and focused/backgrounded
- Heroes auto-fight without input
- Chests accumulate (up to a cap, then despawn)
- Gold and XP trickle in
- Chest automation requires Rune Tree unlock later

**Offline Progression:**
- Generates gold and XP only (no chests)
- Cap: 8 hours of accumulated rewards
- Very large idle gaps (~30 days+) are ignored
- Offline rewards are strictly inferior to active play
- Chests are the primary source of gear — so offline is for gold/XP only

## 3.2 Community Consensus

"Offline progression is good but not great — you still need to actively check in every 20-30 minutes for chests." The game doesn't fully idle until you unlock automation through the Rune Tree.

## 3.3 Engineering Hypothesis — Idle/Offline Systems

A robust way to independently implement idle mechanics:

```typescript
interface OfflineReward {
    gold: number;
    xp: number;
    calculatedAt: Date;
    offlineDuration: number;  // seconds, capped at 28,800 (8h)
}

function calculateOfflineReward(
    lastSave: Date,
    currentTime: Date,
    playerStats: PlayerStats
): OfflineReward {
    const elapsed = Math.min(
        (currentTime.getTime() - lastSave.getTime()) / 1000,
        28800  // 8 hour cap
    );
    
    // Scale by player's clear speed / stage efficiency
    const goldRate = playerStats.goldPerSecond;  // Based on last active performance
    const xpRate = playerStats.xpPerSecond;
    
    return {
        gold: Math.floor(goldRate * elapsed * 0.5),  // 50% efficiency offline
        xp: Math.floor(xpRate * elapsed * 0.5),
        calculatedAt: currentTime,
        offlineDuration: elapsed
    };
}
```

**Online Idle Combat Loop:**
```
Each tick:
  1. Check if hero should use skill (AI decision)
  2. Check attack cooldown on each hero
  3. If ready: spawn projectile / apply damage
  4. Move monsters toward heroes (leftward)
  5. Check collision / distance thresholds
  6. Apply damage to monsters
  7. If monster dies: add XP, roll for loot, increment kill counter
  8. Check spawn timer: spawn next wave if ready
  9. Check stage clear condition
  10. If all heroes dead: auto-retry (if enabled) or stop
```

## 3.4 Engineering Tradeoffs

| Decision | Pro | Con |
|----------|-----|-----|
| Offline gives gold/XP only | Preserves chest excitement | Feels punishing if you can't check often |
| 8-hour cap | Healthy play pattern | Arbitrary limit feels bad |
| 50% offline efficiency | Rewards active play | Can feel like punishment for not playing |
| Auto-Retry toggle | True idle | May waste resources on unwinnable stages |

---

# IV. SAVE SYSTEM

## 4.1 Verified Observations

- **Steam Cloud** supported — syncs saves across machines
- **Save corruption risk** noted by developers — version mismatch between client versions can cause unrecoverable item loss (v1.00.12 warning)
- **Local save + server backup** architecture implied by migration to own servers

## 4.2 Engineering Hypothesis

A robust way to independently implement a save system for a web-based idle game:

```typescript
interface SaveData {
    version: string;            // Schema version for migrations
    timestamp: number;          // Date.now() when saved
    playTime: number;           // Total seconds played
    
    // System state
    player: PlayerState;
    heroes: HeroState[];
    inventory: InventoryState;
    runeTree: RuneTreeState;
    cube: CubeState;
    stages: StageProgressState;
    achievements: AchievementState[];
    
    // Metadata
    unlocks: string[];          // Feature flags for migrated unlocks
    settings: GameSettings;
}

// Serialization strategy:
// 1. JSON.stringify → compress → IndexedDB (local)
// 2. Auto-save on: stage clear, chest open, equipment change, every 60s
// 3. Manual save option in menu
// 4. Export/Import as encrypted JSON string for backup

// Save versioning for migrations:
const SAVE_MIGRATIONS: Record<string, (data: any) => SaveData> = {
    '1.0.0': migrateV1ToV2,
    '1.1.0': migrateV2ToV3,
    // ...
};
```

**Save Frequency Strategy:**
| Trigger | Frequency |
|---------|-----------|
| On stage clear | Always |
| On chest open | Always |
| On equipment change | Always |
| On Rune Tree purchase | Always |
| Auto-save (background) | Every 60 seconds |
| On visibility change (tab switch) | Always |
| On beforeunload | Always |

## 4.3 Engineering Tradeoffs

| Decision | Pro | Con |
|----------|-----|-----|
| IndexedDB (browser) | Large capacity, async | Complex API |
| localStorage | Simple API | 5MB limit, synchronous |
| Auto-save on every action | No data loss | Performance overhead |
| Throttled auto-save | Better performance | Risk of losing recent actions |

---

# V. NOTIFICATIONS & DESKTOP INTERACTION

## 5.1 Verified Observations

- No intrusive notifications observed (game is meant to be checked visually)
- Steam achievements (56 total) — pop via Steam overlay
- Warning pop-ups added after cheat discovery (community noted)
- Sound effects for combat (configurable volume)

## 5.2 Engineering Hypothesis

For a web-based game housed in an existing website (TheHUB):

```typescript
// Desktop notifications for idle game:
interface GameNotification {
    type: 'chest_available' | 'hero_died' | 'stage_cleared' | 'level_up';
    title: string;
    message: string;
    icon?: string;
    priority: 'low' | 'medium' | 'high';
}

// Use browser Notification API with permission check
function sendNotification(notification: GameNotification): void {
    if (Notification.permission === 'granted' && !document.hasFocus()) {
        new Notification(notification.title, {
            body: notification.message,
            icon: notification.icon,
            tag: 'tbh-game'
        });
    }
}
```

---

# VI. THE DOPAMINE LOOP ARCHITECTURE

## 6.1 Verified Observations

TBH uses a carefully layered reward schedule:

**Micro-Loop (Every 3-10 seconds):**
- Damage numbers float up
- Monsters die with visual feedback
- Gold/XP increment in displays

**Meso-Loop (Every 30 seconds - 2 minutes):**
- Chests drop (visible, clickable rewards)
- Wave clears (stage progress bar advances)
- Skill cooldowns finish (visual flash)

**Macro-Loop (Every 5-30 minutes):**
- Stage complete → new stage unlocked
- Boss beaten → major loot payout
- Inventory full → must process items
- Level up → stat increase + skill point

**Mega-Loop (Every session):**
- Rune Tree node purchased
- Gear rarity upgraded
- New content unlocked (higher difficulty, new function)

## 6.2 Why It Works

The critical insight: **no reward is far away enough to forget about, but they're spaced far enough apart to feel earned.**

- Damage numbers are constant micro-rewards (dopamine drip)
- Chests create predictable excitement (5-10 minute cadence)
- Rune Tree purchases feel permanent and meaningful
- Gear upgrades show visible improvement

## 6.3 Engineering Hypothesis — Timing Control

```typescript
interface RewardTiming {
    damageNumberDuration: 2000;      // ms
    chestDropInterval: {
        min: 300000;                  // 5 minutes
        max: 600000;                  // 10 minutes
    };
    chestDespawnTime: 120000;        // 2 minutes if unopened
    stageClearTime: 60000;           // ~1 minute per stage clear
    autoSaveInterval: 60000;         // 1 minute
    offlineRewardCap: 28800;         // 8 hours (seconds)
}
```

**The Pity Timer (Engineering Hypothesis):**
Based on community observations, a robust way to independently implement consistent chest drops:

```typescript
class ChestDropManager {
    private baseChance: number = 0.05;      // 5% base
    private increment: number = 0.01;        // +1% per non-drop
    private currentProbability: number = 0.05;
    
    checkDrop(): boolean {
        const roll = Math.random();
        if (roll < this.currentProbability) {
            this.currentProbability = this.baseChance;  // Reset on success
            return true;
        }
        this.currentProbability = Math.min(
            this.currentProbability + this.increment,
            1.0  // Cap at 100% for guaranteed pity
        );
        return false;
    }
    
    // Reset on hero death (penalizes dying)
    reset(): void {
        this.currentProbability = this.baseChance * 0.5;  // Partial reset on death
    }
}
```

---

*End of UX Bible*
