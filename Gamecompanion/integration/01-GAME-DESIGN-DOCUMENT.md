# GAME DESIGN DOCUMENT
## Project: AETHERWEAVE — An Original Idle Companion RPG
**Phase 3 Deliverable | Integration Planning**
**Status:** Complete

---

# I. CORE PHILOSOPHY

## 1.1 One-Sentence Pitch
*A desktop companion RPG where your party of Weavers auto-fights fractured aether-spawned monsters in a tiny window, while you manage their relationships, gear, and progression — a game that rewards checking in without demanding your attention.*

## 1.2 Design Pillars

| Pillar | Inspired By | Original Implementation |
|--------|-------------|------------------------|
| **Companion Presence** | TBH's taskbar integration | Lives in a draggable mini-window on any webpage; always visible but never intrusive |
| **Meaningful Progression** | TBH's layered systems + MT's earned growth | Three-axis progression: Character Level, Aether Attunement (skill tree), and Gear Resonance (crafting) |
| **Relational Depth** | MT's character psychology | Party members have affinity scores, personal quests, and synergy bonuses that evolve through shared combat |
| **Glanceable Feedback** | TBH's dopamine loop | Visual rewards at 4 timescales: tick (damage numbers), wave (chests), stage (gear drops), chapter (story beats) |
| **Emotional Weight** | MT's consequence philosophy | Permanent story choices, character departures, and narrative flags that persist across resets |

## 1.3 Player Experience Target
The player should feel like they're raising a party of characters, not just optimizing numbers. When they check the window, they should see their Weavers growing stronger, their relationships deepening, and their world expanding — all through minimal active input.

---

# II. WORLD SETTING (Original)

## 2.1 The World of Aetherweave
Long before recorded history, reality was woven from **Aether** — a primordial energy that structured existence. An entity called the **Loom** maintained the weave. Then came the **Great Unraveling** — a cataclysm that shattered the Loom into fragments. The aether went wild.

Now, centuries later, the world is littered with **Aether Rifts** — unstable zones where reality frays. Monsters called **Riftspawn** pour from these tears. Ordinary people cannot see or touch aether, but some — the **Weavers** — are born with the affinity to manipulate it.

Your party are Weavers. Your mission: explore the fractured world, close Rifts, and piece together what caused the Unraveling.

## 2.2 Key World Features

| Feature | Description |
|---------|-------------|
| **The Weave** | The invisible aether structure underlying reality; Weavers can sense it |
| **Rifts** | Tears in the Weave that spawn monsters; come in 5 sizes (Fracture → Chasm) |
| **Shards** | Fragments of the original Loom; grant unique powers when attuned |
| **Echoes** | Residual memories trapped in aether; replay historical events |
| **The Calm** | Safe zones where the Weave is stable; towns, cities, sanctuaries |
| **The Maelstrom** | Deep-rift zones where reality is actively dissolving; endgame areas |

## 2.3 Factions (Original)

| Faction | Philosophy | Role in Story |
|---------|-----------|---------------|
| **The Loomguard** | Protect the Weave, seal rifts, maintain order | Ally; provides quests, training, rewards |
| **The Unravelers** | Believe the Weave must be destroyed to rebuild | Antagonist; opens rifts intentionally |
| **Shard Collectors** | Independent treasure hunters seeking Loom fragments | Neutral; trade partners, sometimes rivals |
| **The Quiet** | Non-Weavers who live in denial of the rifts | Civilians; need protection, provide services |
| **Echo Walkers** | Scholars who study aether-memories | Information brokers; unlock lore and hidden quests |

---

# III. GAMEPLAY LOOP

## 3.1 The Core Cycle

```
[IDLE]                    [ACTIVE]
   │                         │
   ▼                         ▼
Party auto-fights → Collect loot → Process gear → Upgrade Weavers
   Riftspawn        Open chests    Alchemy junk    Spend Aether Attunement
   in current zone                Equip upgrades   Push next Rift
                                   Cube craft      Unlock new zones
   │                             │
   └─────────── LOOP ────────────┘
         (5 min active, then idle again)
```

## 3.2 Loop Breakdown

**Idle Phase (5-30 minutes):**
- Party automatically fights Riftspawn in the current zone
- Damage numbers float up (micro-reward)
- Chests drop periodically (meso-reward)
- Gold and Aether accumulate
- Party members build Affinity through fighting together

**Active Phase (2-5 minutes):**
- Click chests to open (or auto-open if unlocked)
- Quick-equip recommended upgrades (one-click)
- Alchemy junk items into gold
- Spend Attunement points on skill tree
- Push to next zone if ready
- Check on party member personal quests
- Close window, return to work

**Session End (Daily check-in):**
- Collect offline rewards (capped at 12 hours)
- Review party progress
- Make one meaningful decision (which zone to push, which quest to pursue)
- Log out satisfied

## 3.3 Engagement Cadence

| Frequency | Action | Duration | Reward Type |
|-----------|--------|----------|-------------|
| Every second | Watch damage numbers, monsters dying | Passive | Micro (dopamine drip) |
| Every 2-5 min | Chest drops, wave completions | 3s glance | Meso (satisfaction) |
| Every 5-30 min | Stage clear, gear drops | 2-5 min active | Macro (progression) |
| Every session | Chapter completion, new zone | 10-15 min | Mega (achievement) |
| Daily | Offline rewards, story progress | 5-10 min | Routine (habit) |
| Weekly | Boss kills, faction advancement | 15-20 min | Milestone (pride) |

---

# IV. CHARACTER SYSTEMS

## 4.1 Party Composition

Players control a party of up to 4 Weavers. Each Weaver has:
- **Class:** Determines combat role and skill tree
- **Affinity:** Elemental alignment (Void, Flux, Ember, Frost, Storm, Crystal)
- **Attunement:** Skill tree (60 nodes per Weaver)
- **Resonance:** Relationship with each other party member
- **Personal Quest:** Character-specific storyline

## 4.2 Weaver Classes (Original)

| Class | Role | Mechanic | Inspiration |
|-------|------|----------|-------------|
| **Warden** | Tank/Defense | Generates "Aether Armor" from incoming damage; shields allies | Tank archetype |
| **Striker** | Melee DPS | Builds combo chains; finishers do bonus damage based on chain length | Melee DPS |
| **Channeler** | Ranged Magic DPS | Channels spells over time; longer channel = more damage | Mage archetype |
| **Mender** | Healer/Support | Healing creates "Weave Threads" that buff allies | Healer |
| **Shaper** | Utility/Control | Manipulates battlefield with terrain and barriers | Controller |
| **Wisp** | Summoner/Debuffer | Summons aether constructs; debuffs enemies | Pet class |

## 4.3 Affinity Element System

| Affinity | Effect | Countered By |
|----------|--------|-------------|
| **Void** | Pure aether damage; bypasses armor | Crystal |
| **Flux** | Temporal effects; speed, cooldown manipulation | Storm |
| **Ember** | Fire damage over time | Frost |
| **Frost** | Slows and freezes | Ember |
| **Storm** | Lightning chain damage | Void |
| **Crystal** | Defense and reflection | Flux |

**Interaction:** Affinities create a rock-paper-scissors layer for party composition. A balanced party covers more weaknesses. A specialized party hits harder but has clear vulnerabilities.

## 4.4 Character Psychology Design (MT-inspired)

Each Weaver has:
- **Core Drive:** What motivates them (protection, knowledge, revenge, belonging, redemption, curiosity)
- **Flaw:** A psychological weakness (arrogance, fear of abandonment, over-protectiveness, recklessness, distrust, apathy)
- **Relationship Preferences:** Which personality types they bond with or clash against

**Example Character Template:**
> **Lyra, the Warden**
> - *Core Drive:* Protection — she lost her village to a Rift and will never let that happen again
> - *Flaw:* Over-protectiveness — she refuses to let party members take risks, causing frustration
> - *Clashes with:* Reckless characters (Strikers, Wisps)
> - *Bonds with:* Characters who also value safety (Menders, other Wardens)
> - *Personal Quest:* Find and seal the Rift that destroyed her village

**Design Decision:** Characters are NOT silent tools. They have opinions, preferences, and limits. If a character's Affinity with the party drops too low, they may leave or refuse to follow orders.

---

# V. PROGRESSION SYSTEM

## 5.1 Three-Axis Progression

```
        Weaver Level (vertical power)
              │
              │
    Gear Resonance ────── Aether Attunement
   (horizontal power)    (strategic power)
```

| Axis | What It Does | How It Progresses | Cap |
|------|-------------|-------------------|-----|
| **Weaver Level** | Base stats, unlocks skills | XP from kills, quests | 100 |
| **Gear Resonance** | Item stats, set bonuses | Crafting, drops, Cube | Relic rarity |
| **Aether Attunement** | Passive bonuses, special abilities | Attunement points from leveling | 60 nodes/Weaver |

## 5.2 Aether Attunement Tree (Skill Tree)

Inspired by TBH's Rune Tree but original:

- **60 nodes per Weaver** arranged in a radial web
- **3 Attunement Schools:** Combat (red), Weave (blue), Spirit (green)
- Nodes provide: stat bonuses, passive effects, skill unlocks, system unlocks (auto-loot, auto-chest, auto-salvage)
- **Respec policy:** Free respecs for the first 3 uses per character, then cost scales with Weaver level

**Unlock Gates:**
| Node | Unlock Effect | Weaver Level Required |
|------|--------------|----------------------|
| **Second Slot** | Unlock 2nd party member slot | Level 5 |
| **Third Slot** | Unlock 3rd party member slot | Level 15 |
| **Fourth Slot** | Unlock 4th party member slot | Level 30 |
| **Auto-Open** | Chests auto-open on drop | Attunement School Lv 10 |
| **Auto-Alchemy** | Junk items auto-salvage | Attunement School Lv 25 |
| **Rift Scanner** | Shows optimal farming zone | Attunement School Lv 40 |

## 5.3 Zone Progression

| Zone | Level Range | Theme | Boss |
|------|-------------|-------|------|
| **The Verdant Weave** | 1-15 | Lush forests, stable aether | The Thorn Warden |
| **Crystal Expanse** | 10-30 | Aether-crystal desert | The Glass Monarch |
| **The Choking Mists** | 25-45 | Swamp, corrupted aether | The Drowned Echo |
| **Emberheart Depths** | 40-60 | Volcanic caves, elemental chaos | The Magma Colossus |
| **Skyreach Archives** | 55-75 | Floating libraries, knowledge rifts | The Archivest |
| **The Fractured Coast** | 70-85 | Reality-tearing shoreline, unstable | The Tidespeaker |
| **The Maelstrom** | 80-100 | Deep rifts, endgame | The Unraveler's Heart |

Each zone has 10 stages across 4 difficulty tiers (Calm → Surge → Storm → Cataclysm) = 40 stages per zone × 7 zones = 280 total stages.

---

# VI. COMBAT SYSTEM

## 6.1 Combat Model

Combat takes place on a **horizontal 1D plane** (efficiency, glanceable).

- Enemies spawn on the right and move left
- Heroes are positioned on the left
- Attacks are defined by range (melee, short, medium, long, full-screen)
- Targeting: closest enemy, lowest HP, highest threat, or manual priority

## 6.2 Damage Formula

```
rawDamage = baseDamage * (1 + powerMultiplierSum) * comboMultiplier * affinityMultiplier
```

| Variable | Source |
|----------|--------|
| baseDamage | Weaver stats + gear |
| powerMultiplierSum | All additive bonuses (skills, attunement, gear affixes) |
| comboMultiplier | Multiplicative bonus from combo chains (Striker class) |
| affinityMultiplier | ×1.5 if element advantage, ×0.75 if disadvantage |

**Defense Check Order:**
1. **Dodge** (flat chance, caps at 40%)
2. **Block** (flat damage reduction, caps at 50% reduction)
3. **Resonance Shield** (aether-based, absorbs damage based on party Resonance score)
4. **Armor** (diminishing returns formula similar to TBH's armor model)
5. **Absorption** (flat damage reduction from skills/gear)

## 6.3 Auto-AI Behavior

Each Weaver has configurable AI priorities (set in a quick-draw panel):

| Priority | Behavior |
|----------|----------|
| **Balanced** | Default; equal attack and defense |
| **Aggressive** | Prioritizes damage, uses offensive skills first |
| **Defensive** | Prioritizes survival, heals/shields proactively |
| **Support** | Focuses on buffing and healing allies |
| **Reckless** | High risk, high reward; uses HP-costing abilities |

AI decision is rule-based, not ML-based:
```
if (self.HP < 0.3 && hasHealSkill) → use heal
if (enemyCount > 3 && hasAoESkill) → use AoE
if (bossPresent && hasBurstSkill) → use burst
else → basic attack
```

---

# VII. GEAR AND CRAFTING SYSTEM

## 7.1 Gear Slots

| Slot | Types | Affixes Rolled |
|------|-------|----------------|
| Weapon (main) | 6 types (blade, staff, focus, gauntlet, bow, conduit) | Damage, Attack Speed, Element |
| Off-hand | 6 types (shield, orb, tome, charm, quiver, crystal) | Defense, Support, Secondary Element |
| Headgear | Helmet, Crown, Hood, Mask | Defense, Perception stats |
| Chest | Armor, Robe, Tunic, Coat | Defense, Health |
| Hands | Gloves, Bracers, Gauntlets | Attack Speed, Precision |
| Feet | Boots, Greaves, Sandals | Movement, Dodge |
| Accessory 1 | Ring, Amulet, Brooch | Variable stat pools |
| Accessory 2 | Ring, Amulet, Brooch | Variable stat pools |

## 7.2 Rarity Ladder (6 tiers, not 10)

**Design Decision:** TBH's 10 tiers created a sense of "never being halfway." 6 tiers provides satisfying progression without overwhelming.

| Rarity | Color | Alchemy Value | Max Sockets |
|--------|-------|--------------|-------------|
| **Common** | White | Low | 0 |
| **Refined** | Green | Medium | 1 |
| **Attuned** | Blue | High | 2 |
| **Resonant** | Purple | Very High | 3 |
| **Aetherforged** | Orange | Premium | 4 |
| **Loom-Touched** | Gold | Ultra | 5 |

## 7.3 The Aetherforge (Crafting Hub — Original)

Equivalent to TBH's Cube but **thematically and mechanically original**:

| Function | Unlock | Description |
|----------|--------|-------------|
| **Shatter** | Start | Break items into Aether Dust (gold + XP for the Forge) |
| **Fuse** | Start | Combine 5 same-rarity items → 1 higher-rarity item |
| **Reshape** | Forge Lv 5 | Convert item to a different slot type (keeps rarity) |
| **Imbue** | Forge Lv 10 | Socket Aether Fragments into gear (1-3 stats per socket) |
| **Extract** | Forge Lv 15 | Remove socketed fragments (costs Dust, destroys fragment) |
| **ReForge** | Forge Lv 25 | Reroll affixes on an item (costs Dust + Gold) |
| **Harmonize** | Forge Lv 35 | Combine 3 items of same slot to transfer the highest affix to target |
| **Manifest** | Forge Lv 50 | Create a random item from pure Aether (gambling pull) |

**Forge Leveling:** The Forge gains XP from all crafting activities. Higher level unlocks new functions and better odds. No microtransactions — purely gameplay-gated.

## 7.4 Fuse Odds (Original Simplicity)

| 5× Same Rarity | Result |
|----------------|--------|
| Common | 95% Refined, 5% Attuned |
| Refined | 96% Attuned, 4% Resonant |
| Attuned | 98% Resonant, 2% Aetherforged |
| Resonant | 90% Resonant (keep), 10% Aetherforged |
| Aetherforged | 60% keep, 40% Loom-Touched (great success) |

---

# VIII. RELATIONSHIP SYSTEM

## 8.1 Affinity

**What it is:** A 0-100 score between each pair of party members.
**How it changes:**
| Action | Effect |
|--------|--------|
| Fighting in same party (per hour) | +1 |
| Saving ally from lethal hit | +5 |
| Completing a personal quest | +10 |
| Gifting a preferred item | +3-8 |
| Clashing personality decision | -3 |
| Letting ally die | -10 |
| Ignoring personal quest for too long | -2/day |

**Effects of Affinity:**
| Range | Effect |
|-------|--------|
| 0-20 | **Strained** — No synergy bonus; may refuse orders |
| 21-40 | **Neutral** — No bonus, no penalty |
| 41-60 | **Comfortable** — +5% combat synergy |
| 61-80 | **Trusted** — +10% synergy + occasional auto-assist |
| 81-100 | **Bonded** — +15% synergy + unique combo skill unlocked |

## 8.2 Personal Quests

Every Weaver has a 5-chapter personal storyline. Completing chapters:
1. Unlocks unique equipment (signature items)
2. Increases max Affinity cap with other characters
3. Reveals lore about the world
4. Awards permanent stat bonuses

**Personal quests are not mandatory** — but ignoring them causes Affinity decay and may lead to character departure.

## 8.3 The Departure Mechanic

If a Weaver's average Affinity with all party members drops below 15 for 3 consecutive in-game days, they will leave the party.
- They can be recruited back later (with Affinity reset to 30)
- Their personal quest progress is paused, not lost
- This creates real stakes for relationship management

**Design Philosophy (MT-inspired):** Characters are not tools. They have emotional limits. Treat them poorly and they leave.

---

# IX. ECONOMY SYSTEM

## 9.1 Currencies

| Currency | Source | Sinks | Notes |
|----------|--------|-------|-------|
| **Gold** | Kills, chests, quests, offline | Attunement tree, Forge, gear upgrades | Primary currency |
| **Aether Dust** | Shattering items | Forge operations, Imbuing | Secondary crafting currency |
| **Memory Shards** | Boss kills, personal quests | Unlocking Echo memories, story content | Progression currency (non-purchasable) |
| **Loom Fragments** | Rare drops, weekly challenges | Manifest function, high-end crafting | Endgame premium currency (earned only) |

## 9.2 Economic Principles

1. **Gold is abundant but has escalating sinks** — early game is generous, late game requires planning
2. **Aether Dust creates a loot floor** — even junk items have value (→ Dust)
3. **Memory Shards gate story, not power** — story is earned through boss kills, not paywalled
4. **Loom Fragments are never purchasable with real money** — preserves integrity of the grind
5. **No premium currency** — no "gems" or "diamonds" that can be bought. The game is free-to-play with DLC classes as the only monetization.

## 9.3 Monetization Model

| Item | Price | What It Is |
|------|-------|------------|
| Base Game | Free | Full content, no pay-to-win |
| Weaver DLC Pack | $4.99 each | Unlocks a new class (Shapers, Wisps, etc.) |
| Supporter Pack | $9.99 | Cosmetic-only skins, border colors, nameplates |
| Soundtrack | $4.99 | Original score |

**No:** Energy systems, timers, gacha pulls, paid currency, VIP tiers, loot boxes, power purchases.

---

# X. QUEST AND EXPLORATION SYSTEMS

## 10.1 Quest Types

| Type | Description | Reward |
|------|-------------|--------|
| **Rift Clear** | Defeat N monsters in a zone | Gold, XP, random gear |
| **Boss Hunt** | Defeat zone boss (repeatable weekly) | Memory Shards, Loom Fragments |
| **Personal** | Character-specific story chapters | Signature items, lore, Affinity |
| **Faction** | Earn reputation with a faction | Faction-locked gear, discounts |
| **Echo** | Explore a memory fragment | Lore reveals, rare crafting materials |
| **Daily** | 3 quick tasks (kill X, open Y chests, shatter Z items) | Gold, Dust, random Refined item |
| **Weekly Challenge** | Special modifiers, harder enemies, unique rewards | Loom Fragments, Aetherforged gear chance |

## 10.2 Zone Exploration Mechanic

When a party enters a new zone, the zone starts as **Uncharted** (unknown modifier). As they fight, they reveal:
- Enemy types present
- Hazard modifiers (aether storms, crystal spikes, etc.)
- Hidden loot caches
- Boss mechanics

Exploration progress persists per zone. A zone at 100% exploration grants a permanent buff to that zone's loot quality.

---

# XI. DESKTOP INTEGRATION (Web-Based)

## 11.1 Window Modes

| Mode | Size | Shows | Best For |
|------|------|-------|----------|
| **Mini** | 180×60px | Party HP bars, gold counter, alive/dead status | While actively working |
| **Compact** | 320×120px | Combat strip + HUD + chest indicators | Quick check-ins |
| **Full** | 600×400px | Combat + inventory + tabs | Active play sessions |

**Mode Toggle:** Click an expand/collapse button, or drag the corner to resize.

## 11.2 Persistence in TheHUB

The game runs as a dedicated tab in TheHUB. The mini/compact modes can be embedded in the Activity card (replacing the current Idle Hero iframe) using the same postMessage bridge pattern.

## 11.3 FPS Management

| State | FPS Cap | Why |
|-------|---------|-----|
| Window focused, Full mode | 60 | Smooth active play |
| Window focused, Compact mode | 30 | Good visuals, low resource use |
| Window not focused (background tab) | 10 | Browser throttling saves resources |
| TheHUB not in foreground | 5 | Minimal resource use |

---

# XII. UI AND AUDIO STYLE

## 12.1 Visual Style

- **Pixel art** (readable at small scale, charming)
- **Color palette:** Warm, earthy with bright aether-glow accents
- **UI font:** Readable at small sizes, monospace for numbers
- **Damage numbers:** Float up and fade; critical hits are larger and colored

**Design Principle:** Every pixel earns its place. At 180×60px, every element must communicate clearly.

## 12.2 Audio Style

- **Lo-fi ambient** soundtrack (optional toggle in settings)
- **SFX:** Soft pops for damage, shimmer for chests, chime for level up
- **Notifications:** Subtle. A brief ambient shift when a chest drops. No loud alerts.
- **Mute by default** — audio is opt-in, not opt-out

---

# XIII. REWARD LOOPS (Detailed)

## Micro-Loop (Every 1-3 seconds)
- Damage numbers float up (satisfying)
- Monsters flash on hit
- Gold counter increments
- "A pleasant visual rhythm"

## Meso-Loop (Every 30 sec - 3 min)
- Wave completes with a visual sweep
- Chest drops with a shimmer effect
- Party members auto- cheer on wave clear

## Macro-Loop (Every 5-30 min)
- Stage clear screen with stats
- Gear drops (identification moment)
- Level-up animation (character portrait pulses)
- Attunement point available (notification dot on skill tab)

## Mega-Loop (Every session)
- New zone unlocked
- Boss defeated (screen shake + loot fountain)
- Personal quest chapter complete (story card)
- Relationship milestone (cutscene)

---

# XIV. RETENTION DESIGN

| Strategy | Implementation |
|----------|---------------|
| **Daily Habits** | Daily quests take 3 minutes; offline rewards cap at 12 hours |
| **Variable Rewards** | PRD-based loot drops; occasional "great success" on crafting |
| **Endless Chase** | Loom-Touched gear is rare but not impossible; always something to grind for |
| **Story Progression** | Each zone reveals more about the Unraveling; lore is a retention hook |
| **Character Investment** | Building relationships takes time; losing progress is painful |
| **Weekly Milestones** | Weekly boss + challenge keeps players coming back |
| **Social (Optional)** | Compare party compositions; no direct PvP, no leaderboard pressure |
| **FOMO Reduction** | No limited-time events that expire permanently. Events rerun. |

---

# XV. ACCESSIBILITY

| Feature | Implementation |
|---------|---------------|
| **Reduced Motion** | Toggle to disable damage float, screen shake, particle effects |
| **Color Blind Mode** | Patterns + icons on rarity indicators, not just color |
| **Font Size** | Configurable UI font size for menu text |
| **Auto-Play** | All gameplay is auto; no required reaction-time inputs |
| **Pause** | Game pauses when menu is open (toggleable) |
| **Mouse-Only** | No keyboard required |
| **Sound Toggle** | Independent volume sliders for music, SFX, notifications |

---

# XVI. FUTURE EXPANSION STRATEGY

| Expansion | Content | Timing |
|-----------|---------|--------|
| **v1.0 Launch** | 7 zones, 6 classes, full Forge, relationship system | — |
| **v1.x Updates** | More zones, quality of life, balance patches | Monthly |
| **v2.0: Echoes** | Echo system fully released, time-manipulation mechanics, new zone | 6 months post-launch |
| **v2.x Updates** | Additional personal quests, more monsters, events | Bi-monthly |
| **v3.0: Convergence** | Multi-party system (manage 2 parties across zones), raid bosses | 1 year post-launch |
| **v4.0: The Weave** | Player-created content: design your own Rift layouts | 18 months post-launch |

---

*End of Game Design Document*
