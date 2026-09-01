# MASTER ROADMAP — AETHERWEAVE v1.0
## Build 0.0.0 → 1.0.0 | Integration with TheHUB v3
**Status:** Planning Complete — Ready for Build 0

---

## Scope & Vision

This roadmap covers the complete development of **Aetherweave**, an original idle companion RPG that will be housed inside **TheHUB v3**. It follows the same incremental build philosophy as TheHUB's MASTER_ROADMAP_V7: every build is independently executable, no builds are skipped, and each build produces a testable outcome before the next begins.

**Version Convention:**
```
Aetherweave 0.1.2.3.a v
              │ │ │ │ │
              │ │ │ │ └── Stage (a = alpha, b = beta, r = release)
              │ │ │ └──── Iteration (builds within minor)
              │ │ └────── Minor (feature additions)
              │ └──────── Major (system milestones)
              └────────── Publication (public releases)
```

**Placeholder Philosophy:** Character data, monster templates, item definitions, and story content are loaded from external JSON data files — never hardcoded. This allows future expansion without touching game logic.

---

# MILESTONE 0: FOUNDATION (Builds 0 – 4)

## Build 0 — Project Skeleton

**Build Number:** Aetherweave 0.0.0.0.a v

**Build Name:** Project Skeleton & Dev Environment

**Goal:** Establish the project directory structure, build tooling, and the absolute minimum HTML/CSS/JS scaffold that renders a colored canvas in the browser.

**Reason:** Every build after this depends on having a clean, organized codebase with working tooling.

**Prerequisites:** Node.js installed, Vite configured, TheHUB repo cloned for integration testing later.

**Implementation Steps:**
1. Initialize project with Vite (`npm create vite@latest aetherweave -- --template vanilla`)
2. Create directory structure per TDD module map (core/, combat/, entities/, systems/, crafting/, data/, rendering/, ui/ integration/)
3. Create stub files for every module (export default class ModuleName {} — no logic yet)
4. Create `index.html` with a 600×400 canvas element and a basic DOM overlay div
5. Create `styles/variables.css` with the complete color palette (18 CSS custom properties)
6. Create `main.js` entry point that clears the canvas to `--bg-primary` color
7. Configure Vite dev server with hot module replacement
8. Create `.gitignore` excluding node_modules, dist, and .env
9. Create `PLACEHOLDER_DATA.md` explaining the data-file convention (JSON schema stubs)

**Files Affected:**
- `package.json` (new)
- `vite.config.js` (new)
- `index.html` (new)
- `src/main.js` (new — entry point)
- `src/styles/variables.css` (new — color palette)
- `src/styles/base.css` (new — reset & typography)
- `src/data/PLACEHOLDER_DATA.md` (new — convention docs)

**Architecture Changes:** None — this is the initial scaffold.

**Testing Plan:**
- `npm run dev` starts without errors
- Canvas renders a solid #1a1c23 rectangle at 600×400
- CSS variables are accessible in devtools
- File structure matches the module map exactly

**Success Criteria:**
- [x] Dev server launches
- [x] Canvas visible with correct background color
- [x] All stub files exist with correct exports
- [x] Palette variables appear in computed styles

**Regression Risks:** None.

**Future Dependencies:** Build 1 (Canvas Renderer)

---

## Build 1 — Canvas Renderer Foundation

**Build Number:** Aetherweave 0.0.0.1.a v

**Build Name:** Sprite Atlas & Canvas Renderer

**Goal:** Implement the rendering pipeline: sprite atlas loader, canvas clearing, entity rendering (rectangle placeholders), and a simple FPS counter.

**Reason:** The game is 100% visuals. No rendering = no feedback loop. This build proves we can draw things on screen.

**Prerequisites:** Build 0 complete.

**Implementation Steps:**
1. Create `rendering/CanvasRenderer.js` — class that owns the canvas context, exposes `clear()`, `drawSprite()`, `drawRect()`, `drawText()`
2. Create `rendering/SpriteAtlas.js` — class that loads a sprite sheet image, exposes `getFrame(name, frameIndex)`, supports placeholder colored rectangles when no atlas loaded
3. Create `rendering/ParticleSystem.js` — stub class with `addFloatingText(position, text, color)` and `render(timestamp)` — renders one simple floating "0" as proof
4. Hardcode 3 colored rectangles at different Y positions (hero placeholder: blue 16×32, enemy placeholder: red 16×32, chest placeholder: gold 8×8)
5. Implement FPS counter in the top-left corner (updates every 500ms)
6. Create stub `rendering/HUD.js` — renders gold counter and zone name as text

**Files Affected:**
- `src/rendering/CanvasRenderer.js` (new)
- `src/rendering/SpriteAtlas.js` (new)
- `src/rendering/ParticleSystem.js` (new)
- `src/rendering/HUD.js` (new)
- `src/main.js` (update — import and instantiate renderer)
- `src/styles/variables.css` (minor — add FPS counter style)

**Architecture Changes:**
- `CanvasRenderer` becomes the singleton render owner
- `main.js` owns the game loop temporarily (moved to GameLoop in Build 2)

**Testing Plan:**
- Window shows 3 colored rectangles at correct positions
- FPS counter shows ~60 when focused
- Floating text "0" appears on `addFloatingText` call
- Gold counter text visible

**Success Criteria:**
- [x] Blue rectangle for hero placeholder
- [x] Red rectangle for enemy placeholder
- [x] Gold rectangle for chest placeholder
- [x] FPS counter functional
- [x] Floating text appears and fades

**Regression Risks:** None.

**Future Dependencies:** Build 2 (Game Loop & State)

---

## Build 2 — Game Loop & State Management

**Build Number:** Aetherweave 0.0.0.2.a v

**Build Name:** Fixed-Timestep Loop + Central State

**Goal:** Implement the core game loop (fixed-timestep update + variable render) and the central state manager with event bus.

**Reason:** The game loop is the heartbeat of the application. State management prevents spaghetti data flow. Everything in later builds depends on both.

**Prerequisites:** Build 1 complete.

**Implementation Steps:**
1. Create `core/GameLoop.js` — fixed 100ms timestep, RAF render, delta time capping (500ms), FPS management stub (returns target FPS)
2. Create `core/StateManager.js` — central store with `get()`, `set()`, `update()`, `subscribe()` methods; deep-cloned initial state; notification system
3. Create `core/EventBus.js` — typed event emission/listener system with `on()`, `off()`, `emit()`, `once()`
4. Create `core/TimeKeeper.js` — delta tracking, total play time accumulator, offline time calculation stub
5. Wire GameLoop to call `update(dt)` and `render(timestamp)` separately
6. Wire CanvasRenderer to render from state (read hero/enemy positions from state)
7. Create `core/StateManager.test.js` — unit test that state subscriptions fire correctly

**Files Affected:**
- `src/core/GameLoop.js` (new)
- `src/core/StateManager.js` (new)
- `src/core/EventBus.js` (new)
- `src/core/TimeKeeper.js` (new)
- `src/main.js` (update — bootstrap loop, state, bus)
- `src/rendering/CanvasRenderer.js` (update — read from state)

**Architecture Changes:**
- `main.js` delegates to `GameLoop` — no longer owns the loop
- `StateManager` becomes singleton — accessible via import
- `EventBus` decouples systems from each other
- `TimeKeeper` provides unified delta time

**Testing Plan:**
- GameLoop ticks update at exactly 100ms intervals (measured by console.time)
- State.set() triggers subscribed callbacks
- State.get() returns deep clone (mutations don't affect store)
- EventBus.on() fires on emit()

**Success Criteria:**
- [x] Game loop runs at 10 logic updates/sec
- [x] Render runs at display refresh rate
- [x] State subscriptions fire correctly
- [x] Event bus passes typed events
- [x] TimeKeeper returns accurate delta

**Regression Risks:** None.

**Future Dependencies:** Build 3 (Persistence)

---

## Build 3 — Save & Persistence System

**Build Number:** Aetherweave 0.0.0.3.a v

**Build Name:** Save/Load Engine

**Goal:** Implement IndexedDB-based save/load with versioned schema, auto-save triggers, and offline reward calculation.

**Reason:** An idle game is meaningless without persistence. Players must be able to close the browser and return to their progress.

**Prerequisites:** Build 2 complete.

**Implementation Steps:**
1. Create `core/SaveManager.js` — IndexedDB wrapper using the `idb` library:
   - `save(state)` — serializes + stores in `aetherweave.v1` object store
   - `load()` — retrieves latest save
   - `getSaveTimestamp()` — returns last save time for offline calc
2. Implement save triggers: on stage clear, chest open, equip change, attunement spend, level up, and every 120s auto-save
3. Implement save migration system: `MIGRATIONS` object with version keyed functions
4. Create `core/SaveManager.test.js` — test save/load round-trip with mock state
5. Create offline reward calculation stub (`calculateOfflineRewards()` returning gold + XP formula)
6. Wire auto-save to `window.addEventListener('beforeunload')`

**Files Affected:**
- `src/core/SaveManager.js` (new)
- `src/core/StateManager.js` (update — add save triggers)
- `src/core/GameLoop.js` (update — auto-save interval timer)
- `src/main.js` (update — init SaveManager after StateManager)
- `package.json` (add `idb` dependency)

**Architecture Changes:**
- IndexedDB store `aetherweave.v1` created on first launch
- Save schema version tracked in `state.version`
- Migration chain applies on version mismatch

**Testing Plan:**
- Save → close tab → reopen → load restores exact state
- Manual save via console preserves state
- Auto-save fires at 120s intervals
- Migration runs when version is incremented artificially
- Offline calculation returns positive values

**Success Criteria:**
- [x] Save round-trip preserves state fidelity
- [x] Auto-save triggers on all specified events
- [x] Tab close saves before unload
- [x] Migration engine runs without error
- [x] Offline rewards formula produces expected output

**Regression Risks:** Schema changes in later builds require migration entries.

**Future Dependencies:** Build 4 (Event Bus Full Wiring)

---

## Build 4 — Event Bus Wiring & Initialization Flow

**Build Number:** Aetherweave 0.0.0.4.a v

**Build Name:** Full Bootstrap Sequence

**Goal:** Wire all foundation systems together into a complete bootstrap sequence: load → initialize → check save → calculate offline → start loop.

**Reason:** Builds 0-3 created isolated systems. This build proves they work together as a unified application.

**Prerequisites:** Build 3 complete.

**Implementation Steps:**
1. Create complete `main.js` bootstrap sequence:
   ```
   DOMContentLoaded
     → Init CanvasRenderer (get canvas context)
     → Init StateManager (default state)
     → Init SaveManager (open IndexedDB, check for save)
       → Save found? Load → migrate → hydrate state → calculate offline rewards
       → No save? Initialize default → show first-launch indicator
     → Init TimeKeeper (set start time)
     → Init EventBus (clear listeners)
     → Init GameLoop (start update/render cycle)
     → Post-init: emit 'game:loaded' event
   ```
2. Wire all EventBus event types from the catalog (stub listeners that console.log for now)
3. Create a "New Game" reset function that clears IndexedDB and reinitializes state
4. Add offline rewards display (simple modal showing gold + XP earned while away)
5. Add a version badge in the corner showing current build number

**Files Affected:**
- `src/main.js` (rewrite — full bootstrap sequence)
- `src/core/EventBus.js` (update — full event catalog)
- `src/core/SaveManager.js` (minor — clear save function)
- `src/ui/components/Modal.js` (new — for offline rewards)

**Architecture Changes:**
- Bootstrap is now deterministic: same sequence every load
- All future systems hook into `EventBus` and `StateManager`, not `main.js`
- `main.js` becomes a thin orchestrator

**Testing Plan:**
- Clear IndexedDB → reload → first-launch flow works
- Play for 10 seconds → reload → offline rewards modal appears with positive values
- Console output shows all EventBus events firing correctly
- Version badge visible

**Success Criteria:**
- [x] Bootstrap completes without errors
- [x] First-launch flow vs returning-player flow both work
- [x] Offline rewards modal displays correctly
- [x] All EventBus events have stub listeners
- [x] Version badge shows current build number

**Regression Risks:** None.

**Future Dependencies:** Build 5 (Combat Engine — Start of Core Systems)

---

# MILESTONE 1: CORE SYSTEMS (Builds 5 – 14)

## Build 5 — Combat Engine Tick

**Build Number:** Aetherweave 0.1.0.0.a v

**Build Name:** Combat Simulation Core

**Goal:** Implement the combat tick — entities with HP, position, attack cooldowns, and basic damage processing. Heroes and enemies exist on a 1D plane and can damage each other.

**Reason:** Combat is the primary activity of the game. Without it, nothing happens.

**Prerequisites:** Build 4 complete.

**Implementation Steps:**
1. Create `entities/Entity.js` — base class with `id`, `hp`, `maxHp`, `position`, `attackDamage`, `attackSpeed`, `attackCooldown`, `alive`
2. Create `entities/Hero.js` — extends Entity, adds `classId`, `mana`, `affinity`, `skills[]`, `gearSlots{}`
3. Create `entities/Enemy.js` — extends Entity, adds `monsterTemplateId`, `xpReward`, `goldReward`, `dropTable`
4. Create `entities/EntityFactory.js` — creates Hero and Enemy from template data (reads from data/ JSON)
5. Create `combat/CombatEngine.js` — tick method:
   - Iterate heroes → check attack cooldown → find nearest living enemy → deal damage
   - Iterate enemies → move toward left → if in range, attack nearest hero
   - Apply damage, track kills, emit monster:killed events
   - Remove dead entities after delay
6. Create stub `data/enemies.js` with 3 enemy templates (Rift Slime, Thorn Crawler, Aether Wisp)
7. Create stub `data/weavers.js` with 2 hero class templates (Warden, Striker)
8. Wire combat to game loop: `CombatEngine.tick(dt)` called each update

**Files Affected:**
- `src/entities/Entity.js` (new)
- `src/entities/Hero.js` (new)
- `src/entities/Enemy.js` (new)
- `src/entities/EntityFactory.js` (new)
- `src/combat/CombatEngine.js` (new)
- `src/data/enemies.js` (new — 3 templates)
- `src/data/weavers.js` (new — 2 templates)
- `src/core/GameLoop.js` (update — call CombatEngine.tick)

**Architecture Changes:**
- `CombatEngine` becomes the central combat authority
- All entity CRUD goes through `EntityFactory` or `CombatEngine`
- Enemy and hero data is JSON-driven — adding new types doesn't require code changes

**Testing Plan:**
- Place one hero and one enemy on canvas → hero attacks enemy → enemy HP decreases
- Enemy reaches hero → enemy attacks hero → hero HP decreases
- Entity dies at 0 HP → removed from canvas after delay
- Multiple enemies spawn and move left

**Success Criteria:**
- [x] Hero and enemy auto-attack each other
- [x] HP decreases correctly based on damage formula
- [x] Entity removal at 0 HP works
- [x] Enemy movement toward hero works (1D leftward)
- [x] Attack cooldowns respected

**Regression Risks:** CanvasRenderer must be updated to render from entity list.

**Future Dependencies:** Build 6 (Damage Calculator)

---

## Build 6 — Damage Calculator & Defense Pipeline

**Build Number:** Aetherweave 0.1.0.1.a v

**Build Name:** Damage Formula Pipeline

**Goal:** Implement the full damage calculation pipeline: raw damage → element check → dodge/block → armor/resistance → absorption → minimum damage floor.

**Reason:** Without proper damage formulas, combat is meaningless. This build gives combat mathematical depth.

**Prerequisites:** Build 5 complete.

**Implementation Steps:**
1. Create `combat/DamageCalculator.js`:
   - `calculateDamage(attacker, defender, skill)` → returns `{ raw, mitigated, final, isCrit, isDodged, isBlocked }`
   - Implementation: raw → crit roll → dodge check → block check → armor/resistance → damage reduction → absorption → clamp to minimum 1
2. Armor formula: `armorReduction = armor² / (armor² + (14 * stageLevel + 12) * (armor + 0.4 * damage))` — cap 75%
3. Implement affinity multiplier table (×1.5 advantage, ×0.75 disadvantage, ×1.0 neutral)
4. Wire DamageCalculator into CombatEngine.tick
5. Emit damage events with full breakdown for debug display

**Files Affected:**
- `src/combat/DamageCalculator.js` (new)
- `src/combat/CombatEngine.js` (update — use calculator)
- `src/data/affixes.js` (new — element interactions table)

**Architecture Changes:**
- `DamageCalculator` is a pure function module — no state, easy to test
- CombatEngine no longer does arithmetic; delegates to calculator

**Testing Plan:**
- Unit test: raw damage in → correct final damage out
- Unit test: armor reduces damage but not below 1
- Unit test: dodge roll cancels damage
- Unit test: affinity advantage gives ×1.5
- Integration: combat tick shows correct damage numbers

**Success Criteria:**
- [x] Damage pipeline produces correct final values
- [x] Armor cap at 75% works
- [x] Minimum damage floor of 1 enforced
- [x] Affinity advantage/disadvantage applied
- [x] All defense layers checked in correct order

**Regression Risks:** Balancing will need tuning later, but the formula structure is solid.

**Future Dependencies:** Build 7 (Wave Manager & Stage System)

---

## Build 7 — Wave Manager & Stage Progression

**Build Number:** Aetherweave 0.1.0.2.a v

**Build Name:** Wave Spawning & Stage Flow

**Goal:** Implement wave-based combat: enemies spawn in waves, stages have a set number of waves, clearing all waves = stage complete. Portal mechanic to return to previous stages.

**Reason:** The core loop `fight → clear → collect → push` needs stage boundaries to create clear progression points.

**Prerequisites:** Build 6 complete.

**Implementation Steps:**
1. Create `combat/WaveManager.js`:
   - `getWaveDefinition(stageId, waveNumber)` → reads from stage data
   - `spawnWave(stageId, waveNumber)` → creates enemies via EntityFactory at intervals
   - `update(dt)` → checks if current wave is cleared → spawns next wave
   - `isStageCleared()` → true when all waves cleared + no enemies remain
2. Create first stage definition in `data/zones.js` (Verdant Weave, stage 1-1, 10 waves)
3. Implement stage flow state machine: `ENTERING → FIGHTING → WAVE_CLEAR → STAGE_CLEAR → REWARD → NEXT_STAGE`
4. Create `renderBackground(currentZone)` — zone-appropriate background color
5. Add Portal button (blue icon) — returns to stage selection, no penalty
6. Implement stage selection UI (simple list of unlocked stages)

**Files Affected:**
- `src/combat/WaveManager.js` (new)
- `src/data/zones.js` (new — zone definitions)
- `src/entities/EntityFactory.js` (update — spawn enemies by template)
- `src/rendering/CanvasRenderer.js` (update — zone backgrounds)
- `src/core/StateManager.js` (update — stage progress tracking)
- `src/rendering/HUD.js` (update — stage info, Portal button)

**Architecture Changes:**
- `WaveManager` becomes the authoritative source of "what is happening right now"
- Stage state machine enables deterministic stage transitions
- Zone data is JSON — adding zones = adding data, not code

**Testing Plan:**
- Stage 1-1: enemies spawn in 10 waves, each wave harder
- After wave clear: brief pause, then next wave
- After final wave + all enemies dead: stage clear event
- Portal returns to stage selection
- Stage selection shows correct unlock state

**Success Criteria:**
- [x] 10 waves spawn with correct enemy compositions
- [x] Stage clear triggers after final wave
- [x] Portal button returns to stage select
- [x] Stage state machine transitions correctly
- [x] Zone background renders per zone

**Regression Risks:** None.

**Future Dependencies:** Build 8 (AI Controller)

---

## Build 8 — AI Controller & Skill Usage

**Build Number:** Aetherweave 0.1.0.3.a v

**Build Name:** Auto-AI & Skill Casting

**Goal:** Implement rule-based AI for heroes and enemies. Heroes can use skills automatically based on configurable priority. Enemies have basic attack patterns.

**Reason:** The game plays itself — AI decisions determine whether the party succeeds or fails. This is the "auto" in "auto-battler."

**Prerequisites:** Build 7 complete.

**Implementation Steps:**
1. Create `combat/AIController.js`:
   - For each hero: evaluate situation → select action → execute
   - Priority system: survival → AoE → boss burst → basic attack
   - Supports config: Balanced, Aggressive, Defensive, Support, Reckless
2. Implement AI priority selector UI (dropdown per hero in formation panel)
3. For enemies: basic attack pattern (attack nearest, or random if multiple)
4. Create stub `data/skills.js` with 2 skills per hero class (Warden: Shield Wall, Vengeful Strike; Striker: Blade Flurry, Finishing Blow)
5. Wire AIController into GameLoop.update after CombatEngine.tick
6. Emit `skill:used` events for visual feedback

**Files Affected:**
- `src/combat/AIController.js` (new)
- `src/data/skills.js` (new — skill definitions)
- `src/core/GameLoop.js` (update — add AI update phase)
- `src/rendering/CanvasRenderer.js` (update — skill visual feedback stub)

**Architecture Changes:**
- `AIController` runs after combat tick but before render
- AI decisions are stateless — same situation = same decision (deterministic)

**Testing Plan:**
- Hero with Balanced AI: attacks normally, uses heal when HP < 30%
- Hero with Aggressive AI: prioritizes damage skills over survival
- Enemy AI: moves toward heroes, attacks when in range
- AI config change respected immediately

**Success Criteria:**
- [x] AI uses skills automatically based on situation
- [x] Priority modes change behavior observably
- [x] Enemy AI functions (move + attack)
- [x] Skill data drives AI decisions

**Regression Risks:** AI priority tuning may need adjustment, but structure is sound.

**Future Dependencies:** Build 9 (Loot Engine)

---

## Build 9 — Loot Engine & Chest System

**Build Number:** Aetherweave 0.1.0.4.a v

**Build Name:** Loot Drops & Chest Mechanics

**Goal:** Implement PRD-based loot drops, chest spawning, chest opening, and item generation.

**Reason:** Loot is the primary reward loop. Without it, players have no reason to push stages.

**Prerequisites:** Build 8 complete.

**Implementation Steps:**
1. Create `systems/LootEngine.js`:
   - PRD implementation: base probability + increment per non-drop + reset on drop
   - Partial reset on hero death (50% of accumulated probability, not 0%)
   - `onMonsterKilled(monster, stageId)` → returns loot result or null
2. Create chest entity (golden rectangle, shimmer animation)
3. Implement chest spawning on combat strip (clickable)
4. Chest despawn timer (120 seconds if unopened)
5. Create `systems/ItemFactory.js`:
   - `generateItem(stageLevel, zoneId, slot?)` → creates ItemInstance
   - Rarity roll (weighted by stage difficulty)
   - Affix roll (pool filtered by rarity + slot)
6. Wire LootEngine into CombatEngine (on monster kill)
7. Create `data/items.js` with 6 weapon template stubs

**Files Affected:**
- `src/systems/LootEngine.js` (new)
- `src/systems/ItemFactory.js` (new)
- `src/data/items.js` (new — item template stubs)
- `src/entities/EntityFactory.js` (update — chest entity)
- `src/combat/CombatEngine.js` (update — call loot engine on kill)

**Architecture Changes:**
- `LootEngine` and `ItemFactory` are separate concerns (generation vs creation)
- Chest entity has its own lifecycle on the combat strip

**Testing Plan:**
- Kill 100 monsters: approximately 5-10 chests drop (PRD)
- Chest despawns if left for 120s
- Clicking chest adds item to inventory
- Items have correct rarity and affixes for stage level

**Success Criteria:**
- [x] PRD produces consistent chest drops (~5-10%)
- [x] Chest despawn timer functions
- [x] Chest click → item added to inventory
- [x] Item generation produces valid ItemInstances
- [x] Rarity scales with stage difficulty

**Regression Risks:** None.

**Future Dependencies:** Build 10 (Inventory System)

---

## Build 10 — Inventory System

**Build Number:** Aetherweave 0.1.1.0.a v

**Build Name:** Inventory & Equipment Management

**Goal:** Implement the full inventory: item storage, equip/unequip, lock/shatter, sorting, filtering, and capacity management.

**Reason:** Loot is meaningless if players can't manage it. The inventory is the primary interaction surface for gear progression.

**Prerequisites:** Build 9 complete.

**Implementation Steps:**
1. Create `systems/InventoryManager.js`:
   - `addItem(item)` → auto-stack, check capacity, emit warning if full
   - `removeItem(itemId)` → remove from inventory
   - `equipItem(itemId, heroId, slot)` → move from inventory to hero slot
   - `unequipItem(heroId, slot)` → move from hero slot to inventory
   - `shatterItem(itemId)` → destroy item, add Aether Dust
   - `lockItem(itemId)` → toggle lock (Alt+Click protection)
   - `getItems(filter)` → filter by slot, rarity, level range
2. Implement Inventory tab UI (grid view, 6 columns, sortable by rarity/level/type)
3. Implement equipment tooltip on hover (item name, stats, rarity color, affixes)
4. Implement quick-equip button (auto-equip best-in-slot based on simple stat comparison)
5. Add capacity indicator (50/50 slots, red when full)
6. Wire `ITEM_EQUIPPED` and `ITEM_SHATTERED` events to EventBus

**Files Affected:**
- `src/systems/InventoryManager.js` (new)
- `src/ui/screens/InventoryScreen.js` (new)
- `src/ui/components/Tooltip.js` (new)
- `src/ui/components/ItemCard.js` (new)
- `src/entities/Hero.js` (update — equip/unequip methods)
- `src/core/StateManager.js` (update — inventory state schema)

**Architecture Changes:**
- `InventoryManager` is the singleton authority on item location
- Hero stats are recalculated on equip/unequip (stat engine in Build 11)

**Testing Plan:**
- Add 60 items: first 50 succeed, last 10 trigger "inventory full" warning
- Equip item → hero stats increase
- Unequip → item returns to inventory
- Shatter → item gone, Dust added
- Lock → Alt+Click doesn't shatter

**Success Criteria:**
- [x] Inventory capacity enforced
- [x] Equip/unequip works bidirectionally
- [x] Shatter confirmation + item destruction
- [x] Lock prevents accidental destruction
- [x] Tooltip shows correct item data

**Regression Risks:** Equip/unequip must recalculate hero stats — covered in Build 11.

**Future Dependencies:** Build 11 (Stat Engine & Gear Integration)

---

## Build 11 — Stat Engine & Gear Integration

**Build Number:** Aetherweave 0.1.1.1.a v

**Build Name:** Stats, Gear Bonuses & Attunement Tree

**Goal:** Implement the stat aggregation engine: base stats + gear bonuses + attunement bonuses = final stats. Also implement the first 10 attunement nodes.

**Reason:** Stats are the language of progression. Without a stat engine, gear and levels are cosmetic.

**Prerequisites:** Build 10 complete.

**Implementation Steps:**
1. Create `systems/StatEngine.js`:
   - `getFinalStats(heroId)` → aggregates all stat sources
   - Sources: `hero.baseStats × hero.level + gearSum + attunementSum + affinityBonuses`
   - Caching: stat cache invalidated on equip, level up, attunement purchase
2. Implement stat display in hero tooltip (hover portrait shows breakdown)
3. Create `systems/AttunementEngine.js`:
   - Radial tree data structure (60 nodes per hero)
   - Implement first school: "Combat" (20 nodes — attack damage, speed, crit)
   - Purchasable nodes with gold cost + level requirement
   - Free respec (first 3 uses)
4. Create Attunement tab UI with radial tree visualization (svg-based)
5. Wire stat recalculation on `HERO_LEVEL_UP`, `ITEM_EQUIPPED`, `ATTUNEMENT_PURCHASED` events

**Files Affected:**
- `src/systems/StatEngine.js` (new)
- `src/systems/AttunementEngine.js` (new)
- `src/ui/screens/AttunementScreen.js` (new)
- `src/data/attunement.js` (new — node definitions for Combat school)

**Architecture Changes:**
- `StatEngine` is the single source of truth for final combat values
- All other systems query StatEngine, not raw hero stats
- Attunement purchases emit events that StatEngine listens to

**Testing Plan:**
- Hero at level 1, no gear: base stats match template
- Equip +10 ATK weapon: final ATK increases by 10
- Purchase +5% ATK attunement node: final ATK increases by 5%
- Respec: nodes refunded, gold returned, stats revert
- Cache invalidates on state change

**Success Criteria:**
- [x] Stat aggregation correct (base + gear + attunement)
- [x] Attunement nodes purchasable and refundable
- [x] Stat changes reflected in combat immediately
- [x] Respec system functional
- [x] Radial tree UI renders

**Regression Risks:** Stat ordering (additive vs multiplicative) must be consistent. Documented in TDD.

**Future Dependencies:** Build 12 (Aetherforge — Crafting)

---

## Build 12 — Aetherforge Crafting

**Build Number:** Aetherweave 0.1.1.2.a v

**Build Name:** Crafting Hub — Shatter, Fuse, Reshape

**Goal:** Implement the first 3 Aetherforge functions: Shatter (item→Dust), Fuse (5 items→higher rarity), Reshape (slot conversion).

**Reason:** Crafting is the primary gold sink and the main way players upgrade gear. Without it, loot is just clutter.

**Prerequisites:** Build 11 complete.

**Implementation Steps:**
1. Create `crafting/Aetherforge.js`:
   - Forge level tracking (xp from all forging activities)
   - Function registry (each function is a plugin)
2. Create `crafting/ShatterEngine.js`:
   - `shatter(item)` → destroy item, add Dust (value by rarity), add Forge XP
   - Batch shatter (select multiple, shatter all)
3. Create `crafting/FuseEngine.js`:
   - `fuse(items, targetLevel)` → validate 5 same-rarity, roll outcome, create new item
   - Odds table: Common 95% Refined, 5% Attuned, etc.
4. Create `crafting/ReshapeEngine.js`:
   - `reshape(item, targetSlot)` → same rarity, different slot type, costs Dust + Gold
   - Minimum Forge Level 5
5. Create Forge tab UI with function selector tabs
6. Wire forge events to EventBus

**Files Affected:**
- `src/crafting/Aetherforge.js` (new)
- `src/crafting/ShatterEngine.js` (new)
- `src/crafting/FuseEngine.js` (new)
- `src/crafting/ReshapeEngine.js` (new)
- `src/ui/screens/ForgeScreen.js` (new)

**Architecture Changes:**
- `Aetherforge` is the single crafting authority
- Each engine is independent, registered in the forge
- Forge XP is tracked independently from player XP

**Testing Plan:**
- Shatter item → Dust gained, Forge XP gained
- Fuse 5 Common → 1 Refined → 1 Attuned (5% chance, test 100 rolls)
- Fuse 5 Common → Fails if less than 5 selected
- Reshape sword → staff → keeps rarity
- Forge level increases with use

**Success Criteria:**
- [x] Shatter produces correct Dust values
- [x] Fuse odds match probability table
- [x] Reshape swaps slot type
- [x] Forge level increases and gates functions
- [x] UI shows all 3 functions with correct inputs

**Regression Risks:** None.

**Future Dependencies:** Build 13 (Economy Manager & Gold Sinks)

---

## Build 13 — Economy Manager

**Build Number:** Aetherweave 0.1.1.3.a v

**Build Name:** Economy & Gold Sink Balancing

**Goal:** Implement the economy manager: gold tracking, Dust tracking, Memory Shards, Loom Fragments, and all gold sinks with dynamic cost scaling.

**Reason:** The economy must be balanced from the start. Inflation control and sink scaling prevent late-game economic collapse.

**Prerequisites:** Build 12 complete.

**Implementation Steps:**
1. Create `systems/EconomyManager.js`:
   - Currency tracking (Gold, Dust, Shards, Fragments)
   - Validation: cannot spend more than available
   - Dynamic sink scaling: costs scale with player's gold/hour rate
   - `canAfford(cost)` check
   - `spend(cost, category)` → deduct, track by category for analytics
   - `earn(amount, source)` → add, emit GOLD_CHANGED
2. Wire economy to all gold sinks:
   - Attunement tree purchases
   - Forge operations (Fuse, Reshape, Imbue, Extract, ReForge, Harmonize, Manifest)
   - Stash expansion
3. Implement gold display in HUD (animated counter)
4. Create gold earn-rate display in stats panel

**Files Affected:**
- `src/systems/EconomyManager.js` (new)
- `src/rendering/HUD.js` (update — animated gold counter)
- `src/core/GameLoop.js` (update — EconomyManager tick)

**Architecture Changes:**
- `EconomyManager` is a singleton — all money flows through it
- Every gold transaction is logged with source/sink category (for analytics)

**Testing Plan:**
- Kill monster → gold increases by correct amount
- Purchase attunement node → gold decreases by cost
- Attempt purchase with insufficient gold → denied
- Shatter item → Dust increases
- Dynamic scaling: sink cost adjusts with gold rate

**Success Criteria:**
- [x] Gold tracking accurate (earn/spend/validate)
- [x] Insufficient funds properly rejected
- [x] Dust, Shards, Fragments track independently
- [x] Animated gold counter functional
- [x] Dynamic sink scaling produces sensible costs

**Regression Risks:** Inflation tracking system is simple but effective.

**Future Dependencies:** Build 14 (Progression System — XP, Levels, Unlocks)

---

## Build 14 — Progression System

**Build Number:** Aetherweave 0.1.2.0.a v

**Build Name:** XP Curves, Level Gates & System Unlocks

**Goal:** Implement the full progression system: XP accumulation, level-up mechanics, unlock gates (hero slots, auto-systems, difficulties), and the XP curve.

**Reason:** Progression is the "why" players keep playing. Clear level gates create goals.

**Prerequisites:** Build 13 complete.

**Implementation Steps:**
1. Create `systems/ProgressionSystem.js`:
   - XP tables (levels 1-100, gentle exponential)
   - `addXp(heroId, amount)` → check level-up, handle overflow
   - `getLevel(heroId)` → current level
   - `xpForNextLevel(level)` → returns XP needed
2. Implement unlock gates:
   - Level 5: 2nd hero slot
   - Level 15: 3rd hero slot
   - Level 30: 4th hero slot
   - Level 10: Auto-Open chests (attunement)
   - Level 25: Auto-Shatter junk (attunement)
   - Level 40: Rift Scanner
3. Implement level-up animation (portrait pulse + particle burst)
4. Create XP bar component for HUD
5. Implement stage unlock logic: clear stage N to unlock stage N+1; clear all 10 to unlock next zone; clear all zones to unlock next difficulty

**Files Affected:**
- `src/systems/ProgressionSystem.js` (new)
- `src/ui/components/ProgressBar.js` (new)
- `src/rendering/HUD.js` (update — XP bar)
- `src/core/EventBus.js` (update — level-up event)

**Architecture Changes:**
- `ProgressionSystem` owns all level/unlock logic
- Other systems query it for unlock status

**Testing Plan:**
- Kill monsters → XP increases → bar fills → level up at threshold
- Level 5: 2nd hero slot unlocks
- Level 15: 3rd hero slot unlocks
- Stage clear → next stage unlocked
- All stages clear → next zone unlocked

**Success Criteria:**
- [x] XP accumulation matches curve
- [x] Level-up triggers stat recalculation
- [x] Hero slot gates unlock at correct levels
- [x] Stage/zone unlock progression works
- [x] XP bar animation smooth

**Regression Risks:** XP curve may need tuning after playtesting — data-driven so easy to adjust.

**Future Dependencies:** Build 15 (Characters — Start of Content Milestone)

---

# MILESTONE 2: CONTENT (Builds 15 – 22)

## Build 15 — Character Roster & Weaver Data

**Build Number:** Aetherweave 0.2.0.0.a v

**Build Name:** Full Weaver Roster (6 Classes)

**Goal:** Implement all 6 Weaver classes with full stat templates, skill trees, and visual placeholders. Load from data files, not code.

**Reason:** Characters are the heart of the game. This build populates the roster and proves the data-driven character system works.

**Prerequisites:** Build 14 complete.

**Implementation Steps:**
1. Create full weaver data file `src/data/weavers.js`:
   - Warden: tank, 130 HP, 45 armor, 1.82 DPS, shield skills
   - Striker: melee DPS, 80 HP, 20 armor, 1.43 DPS, combo skills
   - Channeler: ranged magic DPS, 60 HP, 10 armor, 1.14 DPS, channel skills
   - Mender: healer, 90 HP, 25 armor, 0.91 DPS, heal/buff skills
   - Shaper: controller, 70 HP, 15 armor, 1.0 DPS, terrain skills
   - Wisp: summoner, 55 HP, 8 armor, 1.2 DPS, construct skills
2. Create `data/weavers.js` complete with:
   - Base stats at level 1
   - Stat scaling per level
   - 6 named skills per class
   - Starting gear
3. Create placeholder pixel portraits for each class (colored rectangles with class symbols)
4. Create `ui/components/CharacterCard.js` — reusable card showing portrait, name, HP bar, class icon
5. Implement "hero detail" panel — click hero portrait to see full stats, skills, equipped gear

**Files Affected:**
- `src/data/weavers.js` (rewrite — full 6-class data)
- `src/data/skills.js` (rewrite — 36 skills, 6 per class)
- `src/ui/components/CharacterCard.js` (new)
- `src/rendering/SpriteAtlas.js` (update — class portraits)

**Architecture Changes:**
- All 6 classes are now available for party composition
- Future DLC classes require only data file additions (no code changes)

**Testing Plan:**
- Load game: all 6 classes visible in roster
- Start with Warden: correct stats, correct skills
- Skill data drives AI decisions correctly
- Switching classes in roster shows different stats

**Success Criteria:**
- [x] 6 classes fully defined
- [x] 36 skills fully defined (6 per class)
- [x] Portrait placeholders render
- [x] Character card shows correct data
- [x] Hero detail panel functional

**Regression Risks:** None.

**Future Dependencies:** Build 16 (Zone Content — All 7 Zones)

---

## Build 16 — Zone Content & Stage Data

**Build Number:** Aetherweave 0.2.0.1.a v

**Build Name:** All 7 Zones with Stage Data

**Goal:** Populate all 7 zones with full stage data: enemy compositions, difficulty scaling, gold/XP rewards, and boss definitions. 280 stages total.

**Reason:** The game needs content breadth. This build populates the entire stage tree with data-driven definitions.

**Prerequisites:** Build 15 complete.

**Implementation Steps:**
1. Create complete `data/zones.js`:
   - 7 zones × 10 stages × 4 difficulties = 280 entries
   - Each entry: `{ zoneId, stageNum, difficulty, levelReq, waves[], enemies[], goldReward, xpReward, boss? }`
   - Difficulty scaling multipliers: Calm ×1.0, Surge ×1.5, Storm ×2.0, Cataclysm ×3.0
2. Create complete `data/enemies.js`:
   - 30 enemy types across 7 zones (5 per zone, differentiated by zone)
   - Each: stats, behaviors, drops
3. Create zone background assets (7 colored backgrounds with simple patterns)
4. Create zone selection UI (map view with nodes)
5. Implement zone exploration tracking (unlocked stages, completion %, hidden caches)

**Files Affected:**
- `src/data/zones.js` (rewrite — all 280 stages)
- `src/data/enemies.js` (rewrite — all 30 enemies)
- `src/rendering/backgrounds.js` (new — zone background patterns)
- `src/ui/screens/MapScreen.js` (new — zone selection)

**Architecture Changes:**
- Stage data is now complete — content bucket filled
- Zone exploration tracking in state

**Testing Plan:**
- Navigate from Verdant Weave → Maelstrom via map
- Stage 1-1 (Calm) enemies are level-appropriate
- Stage 3-10 (Cataclysm) enemies are significantly harder
- Correct gold/XP rewards per stage
- Boss stage requires Soul Stone

**Success Criteria:**
- [x] All 280 stages defined
- [x] All 30 enemies defined
- [x] Difficulty scaling produces harder content
- [x] Map navigation works
- [x] Exploration tracking persists

**Regression Risks:** Balancing across 280 stages will require tuning — data-driven for easy adjustment.

**Future Dependencies:** Build 17 (Item Database — 6 Rarities, Full Loot Tables)

---

## Build 17 — Item Database & Loot Tables

**Build Number:** Aetherweave 0.2.0.2.a v

**Build Name:** Full Item Database (5,760+ Items)

**Goal:** Populate the complete item database: 20 gear types across 6 rarity tiers with level progressions, affix pools, and loot tables per stage.

**Reason:** Items are the primary reward. A complete item database ensures every stage drop is meaningful.

**Prerequisites:** Build 16 complete.

**Implementation Steps:**
1. Create `data/items.js` — complete item template data:
   - 6 weapon types × 20 levels × 6 rarities = 720 weapons
   - 6 off-hand types × 20 levels × 6 rarities = 720 off-hands
   - 4 armor types × 20 levels × 6 rarities = 480 armor
   - 4 accessory types × 20 levels × 6 rarities = 480 accessories
   - Total: 2,400 items (scalable — base template + level scaling reduces manual entries)
2. Create `data/affixes.js` — affix pools per slot/rarity:
   - Common: no affixes
   - Refined: 1 stat boost
   - Attuned: 2 stat boosts
   - Resonant: 2 boosts + 1 suffix
   - Aetherforged: 3 boosts + 2 suffixes
   - Loom-Touched: 4 boosts + 3 suffixes
3. Implement loot tables per stage (data/zones.js update: `lootTable: [{ itemId: 'weapon_sword', weight: 30, minRarity: 'common', maxRarity: 'aetherforged' }]`)
4. Generate test item pool to verify all 2,400 templates are valid

**Files Affected:**
- `src/data/items.js` (rewrite — complete database)
- `src/data/affixes.js` (new — affix definitions)
- `src/data/zones.js` (update — loot tables per stage)
- `src/systems/ItemFactory.js` (update — use complete data)

**Architecture Changes:**
- Item templates are purely data — adding expansion items requires only data changes
- Affix generation uses weighted pools

**Testing Plan:**
- Generate 100 items from various stages: correct rarity distribution
- Affixes match slot type
- Level ranges appropriate for stage level
- No invalid item templates

**Success Criteria:**
- [x] 2,400 item templates valid
- [x] Affix generation correct by rarity
- [x] Loot tables produce stage-appropriate items
- [x] No nulls or undefined in item generation

**Regression Risks:** None.

**Future Dependencies:** Build 18 (Boss Encounters — 7 Zone Bosses)

---

## Build 18 — Boss Encounters

**Build Number:** Aetherweave 0.2.1.0.a v

**Build Name:** 7 Zone Bosses + Mechanics

**Goal:** Implement all 7 zone bosses with unique mechanics, Soul Stone system, and loot payouts.

**Reason:** Bosses are the climax of each zone. They provide milestones, unique loot, and narrative progression.

**Prerequisites:** Build 17 complete.

**Implementation Steps:**
1. Create boss definitions in `data/enemies.js` (boss entries):
   - The Thorn Warden (Verdant) — healing reduction mechanic
   - The Glass Monarch (Crystal) — reflection shield
   - The Drowned Echo (Mists) — DoT + cleanse mechanic
   - The Magma Colossus (Emberheart) — tank swap
   - The Archivest (Skyreach) — interrupt timing
   - The Tidespeaker (Coast) — positioning hazard
   - The Void Fragment (Maelstrom) — all mechanics combined (pre-Elaathor gate)
2. Implement Soul Stone system:
   - Stones drop from regular stage clears (rare)
   - X-10 boss stage consumes 1 stone
   - Stone only consumed on successful clear
   - Failed attempts are free
3. Unique boss mechanics system:
   - Each boss has a `mechanics` array in definition
   - CombatEngine checks boss mechanics each tick
   - Visual telegraphs for telegraphed attacks
4. Boss loot table (guaranteed Memory Shard + high-rarity gear chance)

**Files Affected:**
- `src/data/enemies.js` (update — 7 boss entries)
- `src/combat/CombatEngine.js` (update — boss mechanic hooks)
- `src/ui/components/BossHealthBar.js` (new — larger HP bar)

**Architecture Changes:**
- Boss mechanics are data-driven (config per boss)
- Soul Stone economy adds a gating layer to boss farming

**Testing Plan:**
- Each boss fightable at correct zone end
- Boss mechanics trigger correctly
- Soul Stone consumed on win, not on loss
- Boss loot drops Memory Shards

**Success Criteria:**
- [x] 7 bosses implemented with unique mechanics
- [x] Soul Stone system gates boss attempts
- [x] Boss mechanics function correctly
- [x] Boss loot tables work

**Regression Risks:** Boss balancing is complex and will need tuning.

**Future Dependencies:** Build 19 (Difficulty System — Surge/Storm/Cataclysm)

---

## Build 19 — Difficulty System

**Build Number:** Aetherweave 0.2.1.1.a v

**Build Name:** 4 Difficulty Tiers — Calm, Surge, Storm, Cataclysm

**Goal:** Implement the full 4-tier difficulty system. Normal unlocks naturally; higher difficulties unlock through progression.

**Reason:** Replayability depends on difficulty tiers. They extend content without requiring new zones.

**Prerequisites:** Build 18 complete.

**Implementation Steps:**
1. Implement Calm → Surge → Storm → Cataclysm unlock chain:
   - Surge: clear all 7 zones on Calm
   - Storm: clear all 7 zones on Surge
   - Cataclysm: clear all 7 zones on Storm
2. Implement difficulty multipliers:
   - StatMultiplier (1.0 → 1.5 → 2.0 → 3.0)
   - LootMultiplier (1.0 → 1.3 → 1.6 → 2.0)
   - GoldMultiplier (1.0 → 1.2 → 1.5 → 2.0)
   - XP gain scales with difficulty
3. Add difficulty selector to map screen (tab/radio)
4. Implement "best clear" tracking per stage per difficulty
5. Add visual indicator of difficulty in stage selection (border color)

**Files Affected:**
- `src/data/zones.js` (update — difficulty multipliers)
- `src/ui/screens/MapScreen.js` (update — difficulty selector)
- `src/systems/ProgressionSystem.js` (update — difficulty unlock logic)

**Architecture Changes:**
- Difficulty is a global state modifier applied to all stage calculations
- "Best clear" per difficulty enables completion tracking

**Testing Plan:**
- Calm: standard difficulty, clearable at level 1-15
- Surge: unlocked after all Calm cleared, enemies noticeably harder
- Storm: enemies hit harder, drop better loot
- Cataclysm: significantly harder, best loot rates

**Success Criteria:**
- [x] 4 difficulty tiers playable
- [x] Unlock chain works (Calm → Surge → Storm → Cataclysm)
- [x] Stat/loot multipliers applied correctly
- [x] Best clear tracking persists

**Regression Risks:** None.

**Future Dependencies:** Build 20 (Offline System — Complete)

---

# MILESTONE 3: NARRATIVE (Builds 20 – 28)

## Build 20 — Offline Progression System

**Build Number:** Aetherweave 0.3.0.0.a v

**Build Name:** Complete Offline Rewards

**Goal:** Implement the complete offline system: reward calculation, display modal, efficiency scaling, and all edge cases.

**Reason:** Offline progression is the core of an idle game. It must be complete before narrative content ships so returning players feel rewarded.

**Prerequisites:** Build 19 complete.

**Implementation Steps:**
1. Create complete `core/OfflineCalculator.js`:
   - `calculateRewards(playerState, lastSaveTime)` → gold, XP, Dust
   - Cap: 12 hours (43,200 seconds)
   - Efficiency: 60% of active rates
   - Very large gaps (>30 days): ignored after 30 days
2. Create offline rewards modal:
   - Shows: time elapsed, gold earned, XP earned, Dust earned
   - Animation: counters tick up from 0 to final value
   - Dismiss button → rewards added to state
3. Wire offline calculation into save load flow
4. Implement edge case: first-ever load (no offline time)
5. Implement edge case: game updated between sessions (offline rewards based on current balance, not old)

**Files Affected:**
- `src/core/SaveManager.js` (update — integrate offline calculator)
- `src/ui/components/OfflineRewardsModal.js` (new)
- `src/core/GameLoop.js` (minor — timestamp tracking)

**Architecture Changes:**
- `OfflineCalculator` is a pure function module
- Rewards display uses animated counter component

**Testing Plan:**
- Save game → wait 1 hour in real time → reload → offline rewards show ~60% of active rates
- 12 hour gap: rewards capped at 12h rate
- 40 day gap: rewards capped at 30d rate, then ignored
- First launch: no offline modal

**Success Criteria:**
- [x] Offline rewards compute correctly
- [x] 12h cap enforced
- [x] 30d gap handling correct
- [x] Animated reward display works

**Regression Risks:** None.

**Future Dependencies:** Build 21 (Quest System Foundation)

---

## Build 21 — Quest System Foundation

**Build Number:** Aetherweave 0.3.0.1.a v

**Build Name:** Quest Journal & Daily Quests

**Goal:** Implement the quest system: quest definitions, tracking, completion logic, daily quest rotation. Data-driven quests that can be added without code changes.

**Reason:** Quests provide directed goals beyond "push next stage." They structure daily play sessions.

**Prerequisites:** Build 20 complete.

**Implementation Steps:**
1. Create `systems/QuestSystem.js`:
   - `getActiveQuests(type)` → returns quests by category
   - `updateQuestProgress(questId, delta)` → increment, check completion
   - `completeQuest(questId)` → grant rewards, emit event
   - `getAvailableQuests()` → filter by level, zone, and completion status
2. Create `data/quests.js`:
   - Daily quest definitions (5 rotating templates)
   - Weekly challenge definitions (6-week rotation)
   - Achievement definitions (56 total)
3. Create Quest Journal UI tab
4. Create daily quest rotation logic (3 random from pool, 1 free reroll)
5. Wire quest progression to EventBus events (monster kills, chest opens, etc.)

**Files Affected:**
- `src/systems/QuestSystem.js` (new)
- `src/data/quests.js` (new — all quest definitions)
- `src/ui/screens/QuestScreen.js` (new)
- `src/core/EventBus.js` (update — quest-related events)

**Architecture Changes:**
- `QuestSystem` is the single authority on quest state
- Quest rewards flow through EconomyManager
- Data-driven: adding quests = adding data + hooking existing events

**Testing Plan:**
- Daily quest: "Kill 50 Riftspawn" → kills increment counter → complete at 50
- Weekly challenge: "Clear 5 stages without deaths" → tracks streak
- Complete quest → gold/Dust rewards granted
- Daily refresh gives new set

**Success Criteria:**
- [x] Daily quests generate and track progress
- [x] Weekly challenges functional
- [x] Quest completion grants correct rewards
- [x] Quest journal UI shows active/completed

**Regression Risks:** None.

**Future Dependencies:** Build 22 (Achievement System)

---

## Build 22 — Achievement System

**Build Number:** Aetherweave 0.3.0.2.a v

**Build Name:** 56 Achievements

**Goal:** Implement all 56 achievements with tracking, unlock notifications, and rewards.

**Reason:** Achievements provide long-term goals and retention hooks. They're checked off as a player mastery meter.

**Prerequisites:** Build 21 complete.

**Implementation Steps:**
1. Create `systems/AchievementSystem.js`:
   - 56 achievement definitions in `data/achievements.js`
   - Categories: Progression (15), Combat (12), Exploration (8), Crafting (8), Social (5), Hidden (8)
   - Each: id, name, description, condition function, reward
2. Implement achievement unlock detection (check conditions on EventBus events)
3. Implement achievement notification toast (slides in from top, stays 5s)
4. Create achievement display screen
5. Implement hidden achievements (no description until unlocked)

**Files Affected:**
- `src/systems/AchievementSystem.js` (new)
- `src/data/achievements.js` (new — 56 definitions)
- `src/ui/components/Toast.js` (new — achievement popup)
- `src/ui/screens/QuestScreen.js` (update — achievements tab)

**Architecture Changes:**
- Achievement conditions are pure functions evaluated on relevant events
- Hidden achievements are stored with `hidden: true` flag

**Testing Plan:**
- Trigger "Complete Chapter 1" → achievement unlocks → toast appears
- Hidden achievement: no description before unlock, appears after
- All 56 definitions load without error

**Success Criteria:**
- [x] 56 achievements defined and trackable
- [x] Unlock toast displays correctly
- [x] Achievement screen shows progress
- [x] Hidden achievements work

**Regression Risks:** Achievement definitions may need balancing — data-driven.

**Future Dependencies:** Build 23 (NPC & Dialogue System)

---

## Build 23 — NPC & Dialogue System

**Build Number:** Aetherweave 0.3.1.0.a v

**Build Name:** NPC Definitions & Dialogue Engine

**Goal:** Implement NPC definitions, a dialogue engine with branching choices, and the first major NPC interactions.

**Reason:** NPCs give the world soul. The dialogue engine is required for all narrative content (personal quests, faction quests, story progression).

**Prerequisites:** Build 22 complete.

**Implementation Steps:**
1. Create `data/npcs.js`:
   - 5 companions (Vaela, Kaelen, Sera, Mira, Rynn) — see NPC Bible for full definitions
   - Major NPCs: Orin (mentor), Elathor (Eternal Weaver), faction leaders
   - Minor NPCs: vendors, quest givers, background characters
   - Each NPC: id, name, class, portrait, personality tags, relationship preferences
2. Create dialogue engine:
   - Dialogue node format: `{ id, speaker, text, choices[], condition?, effects[] }`
   - Branching: choices lead to different dialogue nodes
   - Conditions: check player state (quest progress, affinity, level)
   - Effects: modify state (affinity change, quest flag, item reward)
3. Create dialogue UI (portrait + text box + choice buttons)
4. Implement companion campfire conversations (appears after zone completions)
5. Create `data/dialogue/` folder with initial dialogue files

**Files Affected:**
- `src/data/npcs.js` (new)
- `src/data/dialogue/` (new folder — dialogue files)
- `src/ui/components/DialogueBox.js` (new)
- `src/systems/DialogueEngine.js` (new)

**Architecture Changes:**
- Dialogue is data-driven (JSON nodes with branching)
- Dialogue system emits events that other systems listen to (quest flags, affinity changes)

**Testing Plan:**
- Start campfire conversation → Vaela's first dialogue plays → choices appear
- Choose option → NPC reacts differently based on choice
- Affinity changes after conversation
- Condition-gated dialogue only appears when met

**Success Criteria:**
- [x] Dialogue engine loads and displays conversations
- [x] Branching choices work
- [x] Affinity changes apply after dialogue
- [x] Condition-gated dialogue works

**Regression Risks:** None.

**Future Dependencies:** Build 24 (Affinity & Relationship System)

---

## Build 24 — Affinity & Relationship System

**Build Number:** Aetherweave 0.3.1.1.a v

**Build Name:** Relationship Tracking & Synergy

**Goal:** Implement the full affinity system: tracking, synergy bonuses, milestone unlocks, and departure mechanics.

**Reason:** Relationships are the emotional core of the game (MT-inspired). This system gives the party depth beyond combat stats.

**Prerequisites:** Build 23 complete.

**Implementation Steps:**
1. Create `systems/AffinitySystem.js`:
   - Tracks score per pair (0-100), stored as `"heroA:heroB" → number`
   - Changes on: combat together (+1/hr), saving from lethal (+5), personal quest completion (+10), item gifting (+3-8), personality clash (-3), letting die (-10)
   - Milestone thresholds: 20 (Strained), 40 (Neutral), 60 (Comfortable), 80 (Trusted), 100 (Bonded)
2. Implement synergy bonuses:
   - Comfortable: +5% combat stats
   - Trusted: +10% + auto-assist (ally intercepts attacks)
   - Bonded: +15% + unique combo skill unlocked
3. Implement departure mechanic:
   - Daily check: if average affinity < 15 for 3 consecutive days
   - Emit `weaver:departed` event
   - Weaver leaves party, added to "returnable" list
   - Recruitable later, affinity reset to 30
4. Create relationship screen (web of connections between party members)
5. Wire affinity changes to EventBus

**Files Affected:**
- `src/systems/AffinitySystem.js` (new)
- `src/ui/screens/RelationshipScreen.js` (new)
- `src/data/npcs.js` (update — personality data for clash detection)
- `src/core/StateManager.js` (update — relationship state schema)

**Architecture Changes:**
- `AffinitySystem` runs a slow tick (every 60s of combat time)
- Departure check runs on game load (checks timestamps)

**Testing Plan:**
- Two heroes fight together for 1 hour → affinity +1
- Save from lethal → +5
- Let hero die → -10
- Affinity drops below 15 for 3 days → departure event
- Re-recruit → affinity reset to 30

**Success Criteria:**
- [x] Affinity tracking correct
- [x] Synergy bonuses apply at thresholds
- [x] Departure mechanic triggers correctly
- [x] Re-recruitment works
- [x] Relationship web UI functional

**Regression Risks:** Departure may feel punishing — monitor player sentiment.

**Future Dependencies:** Build 25 (Faction System)

---

## Build 25 — Faction System

**Build Number:** Aetherweave 0.3.1.2.a v

**Build Name:** Factions, Reputation & Faction Quests

**Goal:** Implement all 5 factions with reputation tracking, rank rewards, and faction quest chains.

**Reason:** Factions provide alignment choices, additional content, and replay value.

**Prerequisites:** Build 24 complete.

**Implementation Steps:**
1. Create `data/factions.js`:
   - Loomguard: protectors of the Weave
   - Shard Collectors: treasure hunters
   - Echo Walkers: lore scholars
   - Unraveler Splinter: reformed antagonists
   - The Quiet: civilian support
2. Create `systems/FactionSystem.js`:
   - Reputation tracking per faction (0 → 3,000)
   - Rank system: Initiate (0), Sentinel (500), Warden (1000), Champion (2000), Paragon (3000)
   - Each rank unlocks: shop access, discounts, exclusive gear, unique skills
3. Implement faction quest chains (6 quests per faction, 30 total)
4. Implement faction reputation screen
5. Implement faction-locked gear (equippable only at certain ranks)

**Files Affected:**
- `src/data/factions.js` (new)
- `src/systems/FactionSystem.js` (new)
- `src/data/quests.js` (update — faction quest definitions)
- `src/ui/screens/FactionScreen.js` (new)
- `src/data/items.js` (update — faction-locked items)

**Architecture Changes:**
- Faction reputation is a currency-like tracker
- Faction-locked items check reputation on equip

**Testing Plan:**
- Complete Loomguard quest → rep increases → rank unlocks shop
- Reach Sentinel → discounted gear available
- Reach Warden → exclusive skill unlocked
- All 5 factions track independently

**Success Criteria:**
- [x] 5 factions with reputation tracking
- [x] 5 ranks per faction with rewards
- [x] 30 faction quests functional
- [x] Faction-locked gear equippable at correct rank

**Regression Risks:** None.

**Future Dependencies:** Build 26 (Personal Quests — Companion Storylines)

---

## Build 26 — Companion Personal Quests

**Build Number:** Aetherweave 0.3.2.0.a v

**Build Name:** 5 Companion Storylines (25 Chapters)

**Goal:** Implement all 5 companion personal quests (5 chapters each, 25 total quests) with unique rewards, dialogue, and lore.

**Reason:** Personal quests are the heart of the relationship system. They make companions feel real.

**Prerequisites:** Build 25 complete.

**Implementation Steps:**
1. Create personal quest data files in `data/quests/personal/`:
   - Vaela: "The Roots of Belonging" (5 chapters)
   - Kaelen: "The Knight's Redemption" (5 chapters)
   - Sera: "The Echo Seeker's Truth" (5 chapters)
   - Mira: "The Healer's Reckoning" (5 chapters)
   - Rynn: "The Last Summoner" (5 chapters)
2. Each quest chapter: objectives, dialogue tree, rewards, Affinity changes
3. Implement personal quest unlock conditions (chapter availability tied to main story progress)
4. Implement companion signature items as final rewards
5. Create dialogue content for all 5 storylines

**Files Affected:**
- `src/data/quests/personal/vaela.json` (new)
- `src/data/quests/personal/kaelen.json` (new)
- `src/data/quests/personal/sera.json` (new)
- `src/data/quests/personal/mira.json` (new)
- `src/data/quests/personal/rynn.json` (new)
- `src/data/items.js` (update — signature items)
- `src/data/dialogue/` (update — companion dialogue files)

**Architecture Changes:**
- Personal quests are data-only additions (no engine changes needed)
- Each quest chain is self-contained

**Testing Plan:**
- Complete Vaela chapter 1 → dialogue plays → affinity changes
- Progress through all 5 chapters → signature item unlocks
- Quests gate at correct main story points
- Dialogue choices affect affinity

**Success Criteria:**
- [x] 25 personal quest chapters implemented
- [x] Dialogue trees functional for all 5 companions
- [x] Signature items unlocked on completion
- [x] Affinity changes consistent with narrative

**Regression Risks:** None.

**Future Dependencies:** Build 27 (Side Quest Content)

---

## Build 27 — Side Quest Content

**Build Number:** Aetherweave 0.3.2.1.a v

**Build Name:** 12 Side Quests + 6 Hidden Quests

**Goal:** Implement all 12 side quests and 6 hidden quests with unique rewards, lore, and gameplay variety.

**Reason:** The world needs to feel lived-in. Side quests provide optional content for curious players.

**Prerequisites:** Build 26 complete.

**Implementation Steps:**
1. Create side quest data in `data/quests/side/`:
   - 12 side quests from Content Bible
   - Varied types: escort, collect, hunt, investigate, defend
2. Create hidden quest discovery system:
   - Check player actions against hidden conditions
   - No quest log entry until condition met
3. Implement all 6 hidden quests:
   - The Lonely Echo (interact with same Echo 3 times)
   - The Quiet Weaver (spare a non-hostile enemy)
   - The Broken Thread (return to Loom's Rest at max level)
   - The Ten-Thousandth Loop (final boss with no deaths)
   - The Namesake (collect all 40 Echoes)
   - The Forgotten Ally (save specific NPC in chapter 8)
4. Create quest reward hooks for unique items, titles, and cosmetics

**Files Affected:**
- `src/data/quests/side/` (new folder — 12 quest files)
- `src/data/quests/hidden/` (new folder — 6 quest files)
- `src/systems/QuestSystem.js` (update — hidden quest detection)
- `src/data/items.js` (update — hidden quest rewards)

**Architecture Changes:**
- Hidden quest detection runs as a passive check on EventBus events
- No UI for hidden quests until found

**Testing Plan:**
- Speak to side quest NPC → quest appears in journal
- Complete side quest → rewards granted
- Hidden quest discovered through special action → appears in journal
- All 18 quests completable

**Success Criteria:**
- [x] 12 side quests functional
- [x] 6 hidden quests discoverable through gameplay
- [x] Rewards granted correctly
- [x] Hidden quest discovery feels rewarding

**Regression Risks:** None.

**Future Dependencies:** Build 28 (Collectible Content — Echoes, Shards, Fragments)

---

## Build 28 — Collectible Content

**Build Number:** Aetherweave 0.3.2.2.a v

**Build Name:** Echoes, Memory Shards & Loom Fragments

**Goal:** Implement all collectible systems: 40 Aether Echoes (lore), 30 Memory Shards (character lore), 25 Loom Fragments (endgame crafting), 20 Weaver's Journals, 15 Rift Crystals.

**Reason:** Collectibles reward exploration and provide lore depth for players who want it.

**Prerequisites:** Build 27 complete.

**Implementation Steps:**
1. Create collectible data files:
   - `data/collectibles/echoes.json` (40 entries — zone lore)
   - `data/collectibles/memory-shards.json` (30 entries — character memories)
   - `data/collectibles/loom-fragments.json` (25 entries — ancient fragments)
   - `data/collectibles/journals.json` (20 entries — past Weavers' notes)
   - `data/collectibles/crystals.json` (15 entries — aesthetic only)
2. Create collectible discovery system (check zone completion %, hidden locations)
3. Create collectible gallery screen (progress per category)
4. Implement Echo viewing mode (lore text + image card)
5. Wire Loom Fragment collection to Manifest crafting (high-end gambling pulls)

**Files Affected:**
- `src/data/collectibles/` (new folder — 5 JSON files)
- `src/ui/screens/CollectiblesScreen.js` (new)
- `src/systems/AchievementSystem.js` (update — collection achievements)
- `src/crafting/Aetherforge.js` (update — Manifest uses Loom Fragments)

**Architecture Changes:**
- Collectibles are entirely data-driven
- Collection progress is tracked in state

**Testing Plan:**
- Find Echo in zone → collected → appears in gallery
- View Echo → lore text displayed
- Collect all 40 Echoes → achievement unlocks
- Use 5 Loom Fragments → Manifest function available

**Success Criteria:**
- [x] 130 collectibles across 5 categories
- [x] Discovery through gameplay
- [x] Gallery screen shows collection progress
- [x] Echo viewing mode functional

**Regression Risks:** None.

**Future Dependencies:** Build 29 (UI Polish — Start of Polish Milestone)

---

# MILESTONE 4: UI & POLISH (Builds 29 – 34)

## Build 29 — Full UI Screen Implementation

**Build Number:** Aetherweave 0.4.0.0.a v

**Build Name:** All UI Screens

**Goal:** Implement all remaining UI screens with consistent design language, tooltips, and responsive layouts.

**Reason:** Good UI is the difference between a prototype and a game. Players interact with the game through its interface.

**Prerequisites:** Build 28 complete.

**Implementation Steps:**
1. Complete Party Screen (hero cards, formation, AI priority selector)
2. Complete Inventory Screen (grid, sort, filter, equip/unequip, shatter)
3. Complete Attunement Screen (radial tree visualization, purchase/respec)
4. Complete Forge Screen (8 function tabs, drag-drop, odds display)
5. Complete Map Screen (zone nodes, difficulty selector, exploration %)
6. Complete Quest Screen (active quests, achievements, collectibles tabs)
7. Complete Settings Screen (FPS cap, audio, reduced motion, color blind, font size)
8. Implement consistent hover tooltip system (300ms delay, follows mouse)
9. Implement right-click context menu (lock, info, shatter, equip)

**Files Affected:**
- All existing UI screen files (rewrite for consistency)
- `src/ui/UIEngine.js` (new — centralized UI controller)
- `src/ui/styles/screens.css` (new — consolidated screen styles)

**Architecture Changes:**
- `UIEngine` becomes the UI manager — handles tab switching, modals, toasts
- All screens follow the same pattern: `create()`, `update(state)`, `destroy()`

**Testing Plan:**
- Navigate through all tabs without errors
- Each screen updates correctly when state changes
- Tooltips appear with correct data
- Right-click context menu functions

**Success Criteria:**
- [x] All 8 screens functional
- [x] Consistent design language across all screens
- [x] Tooltip system works everywhere
- [x] Right-click context menu functional

**Regression Risks:** None.

**Future Dependencies:** Build 30 (Window Modes — Mini, Compact, Full)

---

## Build 30 — Window Mode System

**Build Number:** Aetherweave 0.4.0.1.a v

**Build Name:** Mini/Compact/Full Mode Transitions

**Goal:** Implement the 3 window modes (Mini 180×60, Compact 320×120, Full 600×400) with smooth transitions and appropriate content per mode.

**Reason:** The game must work at multiple sizes to be a proper desktop companion.

**Prerequisites:** Build 29 complete.

**Implementation Steps:**
1. Create `rendering/WindowManager.js`:
   - Mode state: 'mini' | 'compact' | 'full'
   - `setMode(mode)` → transition with 100ms CSS animation
   - `getCurrentMode()` → returns current mode
   - Bounds enforcement (minimum sizes)
2. Implement per-mode rendering:
   - Mini: HP dots, gold counter, alive/dead status (no combat strip)
   - Compact: Combat strip, HUD, chest indicators (no tabs)
   - Full: Combat strip + tab bar + all screens
3. Implement resize handles:
   - Bottom edge drag to resize height
   - Corner drag to resize width
   - Expand button (mini → compact), fullscreen button (compact → full)
4. Implement FPS management per mode:
   - Mini: 15 FPS
   - Compact: 30 FPS
   - Full (focused): 60 FPS
   - Full (background): 10 FPS

**Files Affected:**
- `src/rendering/WindowManager.js` (new)
- `src/rendering/CanvasRenderer.js` (update — per-mode rendering)
- `src/ui/UIEngine.js` (update — mode-aware tab visibility)
- `src/core/GameLoop.js` (update — FPS targeting)

**Architecture Changes:**
- `WindowManager` is queried by renderer and UI engine
- FPS target is dynamic based on mode + focus state

**Testing Plan:**
- Start in Full mode → click collapse → Compact mode
- Compact mode: combat strip visible, tabs hidden
- Click collapse again → Mini mode: only HP dots + gold
- Expand button returns to Compact → Fullscreen returns to Full
- FPS changes with mode

**Success Criteria:**
- [x] All 3 modes render correct content
- [x] Transitions smooth (100ms)
- [x] Resize handles functional
- [x] FPS target matches mode

**Regression Risks:** None.

**Future Dependencies:** Build 31 (Visual Effects — Particles, Animations)

---

## Build 31 — Visual Effects

**Build Number:** Aetherweave 0.4.0.2.a v

**Build Name:** Particle System, Animations & Screen Shake

**Goal:** Implement the full particle system, entity animations, screen shake on boss hits, and the damage number system.

**Reason:** Visual polish makes the game feel satisfying. Without it, actions lack weight.

**Prerequisites:** Build 30 complete.

**Implementation Steps:**
1. Expand `rendering/ParticleSystem.js`:
   - Damage numbers (float up, fade, red=crtitical)
   - Gold pickup sparkles
   - Level-up burst
   - Chest shimmer
   - Boss hit screen shake
2. Implement entity sprite animation (idle bobbing, attack frames, death fade)
3. Implement chest open animation (scale up, sparkle, item reveal)
4. Implement stage clear sweep effect
5. Add configurable "reduced motion" toggle (disables all particle effects and screen shake)

**Files Affected:**
- `src/rendering/ParticleSystem.js` (rewrite — full system)
- `src/rendering/CanvasRenderer.js` (update — animation integration)
- `src/rendering/SpriteAtlas.js` (update — animation frame support)

**Architecture Changes:**
- Particle system is performance-aware (caps particle count, auto-reduces at low FPS)
- Animation state is part of entity data

**Testing Plan:**
- Kill monster → damage number floats up and fades
- Critical hit → larger red number
- Level up → burst animation
- Boss hit → screen shake
- Reduced motion toggle → all particle effects disabled

**Success Criteria:**
- [x] Damage numbers visible and satisfying
- [x] Chest open animation
- [x] Level-up burst
- [x] Screen shake on boss
- [x] Reduced motion toggle functional

**Regression Risks:** Performance impact — mitigated by particle cap + auto-reduce.

**Future Dependencies:** Build 32 (Audio System)

---

## Build 32 — Audio System

**Build Number:** Aetherweave 0.4.1.0.a v

**Build Name:** Sound Effects & Lo-Fi Ambient Music

**Goal:** Implement audio system with SFX and optional lo-fi ambient soundtrack.

**Reason:** Audio adds emotional depth. Even subtle sounds make interactions feel more real.

**Prerequisites:** Build 31 complete.

**Implementation Steps:**
1. Create `systems/AudioManager.js`:
   - SFX: pop (damage), shimmer (chest), chime (level up), whoosh (wave clear), rumble (boss), click (UI)
   - Music: 1 lo-fi ambient loop per zone (7 tracks)
   - Volume controls: master, SFX, music (independent sliders)
   - Mute by default (opt-in)
2. Create SFX sprite (single audio file with timing markers for each sound)
3. Implement music transitions (crossfade between zones)
4. Wire audio triggers to EventBus events
5. Add audio settings to Settings screen

**Files Affected:**
- `src/systems/AudioManager.js` (new)
- `src/ui/screens/SettingsScreen.js` (update — audio controls)
- `src/core/EventBus.js` (update — audio hook events)

**Architecture Changes:**
- AudioManager is opt-in (no audio on first launch)
- Uses Web Audio API for low-latency playback

**Testing Plan:**
- Enable audio → SFX play on combat events
- Change zone → music crossfades
- Mute → no audio plays
- Volume sliders change levels correctly

**Success Criteria:**
- [x] SFX play on relevant events
- [x] Music crossfades between zones
- [x] Volume controls functional
- [x] Mute by default respected

**Regression Risks:** None.

**Future Dependencies:** Build 33 (Accessibility Features)

---

## Build 33 — Accessibility Features

**Build Number:** Aetherweave 0.4.1.1.a v

**Build Name:** Color Blind Mode, Font Scaling & Reduced Motion

**Goal:** Implement all accessibility features: color blind mode, font size options, reduced motion, pause behavior, and mouse-only navigation.

**Reason:** Games should be playable by everyone. Accessibility is not optional.

**Prerequisites:** Build 32 complete.

**Implementation Steps:**
1. Color blind mode:
   - Patterns + icons on rarity indicators (stripes for Refined, dots for Attuned, stars for Resonant, etc.)
   - Element affinity shown as symbols + text, not just color
2. Font size scaling:
   - Small (default): 10-12px
   - Medium: 13-16px
   - Large: 16-20px
   - Affects all UI text
3. Reduced motion (already implemented in Build 31, ensure toggle in settings)
4. Pause behavior:
   - Opening any menu pauses game (toggleable in settings)
   - Auto-pause on tab visibility loss (configurable)
5. Mouse-only verification: all interactions possible without keyboard

**Files Affected:**
- `src/ui/styles/variables.css` (update — CSS custom properties for accessibility)
- `src/ui/components/Tooltip.js` (update — pattern icons)
- `src/ui/screens/SettingsScreen.js` (update — accessibility controls)
- `src/core/GameLoop.js` (update — pause on menu open)

**Architecture Changes:**
- Accessibility settings are persisted in the save file
- CSS variables drive font size and rarity patterns

**Testing Plan:**
- Enable color blind mode → rarity shown with patterns
- Change font to Large → all UI text increases
- Enable "pause on menu" → opening inventory pauses game
- Play entirely with mouse → no required keyboard input

**Success Criteria:**
- [x] Color blind mode functional (patterns + symbols)
- [x] 3 font size options work
- [x] Pause behavior configurable
- [x] Mouse-only navigation verified

**Regression Risks:** None.

**Future Dependencies:** Build 34 (Performance Optimization)

---

## Build 34 — Performance Optimization

**Build Number:** Aetherweave 0.4.1.2.a v

**Build Name:** Performance Pass

**Goal:** Optimize rendering, state updates, and memory usage to hit performance budget targets.

**Reason:** An idle game must run for hours without degrading performance. Memory leaks and frame drops are unacceptable.

**Prerequisites:** Build 33 complete.

**Implementation Steps:**
1. Implement object pooling for entities (reuse dead entities instead of GC)
2. Implement dirty-flag rendering (only redraw when state changes, for DOM elements)
3. Implement sprite atlas batching (single draw call for all sprites of same atlas)
4. Memory audit:
   - Ensure no detached DOM nodes
   - Verify event listeners are cleaned up on screen destroy
   - Check IndexedDB save size < 500KB
5. Implement performance monitoring (FPS counter, memory usage, save size)
6. Add auto-quality reduction: if FPS < 15 for 5 seconds, auto-reduce particles and simplify background

**Files Affected:**
- `src/rendering/CanvasRenderer.js` (update — sprite batching)
- `src/entities/Entity.js` (update — object pooling)
- `src/ui/UIEngine.js` (update — screen destroy cleanup)
- `src/core/GameLoop.js` (update — auto-quality reduction)

**Architecture Changes:**
- Object pool for entities pre-allocates entity instances
- Auto-quality system monitors FPS and adjusts render complexity

**Testing Plan:**
- Run game for 2 hours → memory stable (no leak)
- FPS stays above 30 in Compact mode
- Save file size < 500KB
- Force low FPS (throttle CPU) → auto-quality reduces particles

**Success Criteria:**
- [x] Memory stable after 2 hours
- [x] FPS above 30 in Compact, above 50 in Full
- [x] Save size < 500KB
- [x] Auto-quality reduction triggers at low FPS

**Regression Risks:** Object pooling adds complexity — ensure pool correctly reset.

**Future Dependencies:** Build 35 (TheHUB v3 Integration — Start of Integration Milestone)

---

# MILESTONE 5: INTEGRATION (Builds 35 – 37)

## Build 35 — TheHUB v3 Bridge

**Build Number:** Aetherweave 0.5.0.0.a v

**Build Name:** TheHUB postMessage Integration

**Goal:** Implement the TheHUB bridge: postMessage communication, activity sync, pause/resume, theme sync.

**Reason:** The game lives inside TheHUB. Integration with TheHUB's existing companion bridge pattern is required for Activity Heatmap rewards and UI consistency.

**Prerequisites:** Build 34 complete.

**Implementation Steps:**
1. Create `integration/TheHUBBridge.js`:
   - postMessage listener: `hub.activity`, `hub.companion.snapshot`, `hub.companion.pause/resume`, `hub.theme`
   - PostMessage sender: `mtgame.ready`, `mtgame.ack`, `mtgame.levelup`, `mtgame.achievement`
   - Same protocol as existing Idle Hero companion (preserving backward compatibility)
2. Implement activity-to-reward conversion:
   - Hub activity points → gold + XP bonus
   - Reward acknowledged via `mtgame.ack`
3. Implement theme sync:
   - Read CSS variables from parent TheHUB document
   - Apply to game styles (--hub-primary, --hub-background, --hub-text)
4. Implement pause/resume from TheHUB
5. Add Experimental toggle in TheHUB settings (enable/disable Aetherweave)

**Files Affected:**
- `src/integration/TheHUBBridge.js` (new)
- `src/integration/ThemeAdapter.js` (new)
- `src/integration/HubDataSync.js` (new)
- `src/main.js` (update — init bridge)
- `src/styles/variables.css` (update — TheHUB theme variables)

**Architecture Changes:**
- Game becomes aware of parent TheHUB context
- Falls back gracefully if not in TheHUB (standalone mode)

**Testing Plan:**
- Run inside TheHUB → bridge connects → ready message sent
- Complete task in TheHUB → activity data received → in-game rewards granted
- Change TheHUB theme → game theme updates
- Pause from TheHUB → game pauses

**Success Criteria:**
- [x] postMessage bridge connects successfully
- [x] Activity rewards granted
- [x] Theme sync works
- [x] Pause/resume from TheHUB functional
- [x] Standalone mode (outside TheHUB) works without bridge

**Regression Risks:** If TheHUB changes its postMessage protocol, the bridge needs updating.

**Future Dependencies:** Build 36 (Final Balance Pass)

---

## Build 36 — Final Balance Pass

**Build Number:** Aetherweave 0.5.0.1.a v

**Build Name:** Economy & Progression Tuning

**Goal:** Run comprehensive balance tests and adjust all tuning knobs: XP curves, gold earn rates, sink costs, drop rates, and difficulty scaling.

**Reason:** Balance is what separates a fun game from a frustrating one. Data-driven tuning allows precise adjustment.

**Prerequisites:** Build 35 complete.

**Implementation Steps:**
1. Run playthrough simulation:
   - Simulate 60h of active play
   - Record: level progression, gold accumulation, gear quality, stage completion rate
2. Adjust XP curve:
   - Ensure level 30 reached by ~15h
   - Ensure level 60 reached by ~80h
   - Ensure level 85 (story endgame) by ~55h
3. Adjust gold economy:
   - Verify early game (1-20) has gentle gold curve
   - Verify mid game (21-50) has meaningful gold decisions
   - Verify late game (51-100) has sufficient sinks to prevent inflation
4. Adjust drop rates:
   - PRD base probability tuned per zone
   - Rarity weights ensure Aetherforged feels rare but achievable
   - Loom-Touched is aspirational (not expected to be common)
5. Adjust difficulty scaling:
   - Verify no "unwinnable" stage at correct level
   - Verify boss fights require some strategy, not just gear check

**Files Affected:**
- `src/data/zones.js` (update — tuning values)
- `src/data/enemies.js` (update — stat adjustments)
- `src/systems/ProgressionSystem.js` (update — XP curve)
- `src/systems/EconomyManager.js` (update — sink costs)

**Architecture Changes:**
- All tuning values are in data files — no code changes for balance
- Create a `TUNING.md` document listing all adjustable values

**Testing Plan:**
- New game to level 30: ~15 hours of active/idle
- Gold never hits zero unless spending aggressively
- Stage 1-10 (Thorn Warden) beatable at level 5-8 with Refined gear
- Stage 7-10 (Void Fragment) beatable at level 85-90 with Aetherforged gear

**Success Criteria:**
- [x] Progression pacing matches design targets
- [x] Gold economy stable (no inflation, no poverty)
- [x] Drop rates feel fair (data from simulation)
- [x] Difficulty curve smooth (no impossible walls)

**Regression Risks:** Tuning changes may break existing saves — communicate via patch notes.

**Future Dependencies:** Build 37 (Bug Fixing & QA)

---

## Build 37 — QA & Bug Fixing

**Build Number:** Aetherweave 0.5.1.0.a v

**Build Name:** Quality Assurance Pass

**Goal:** Comprehensive bug fixing, edge case handling, and crash prevention.

**Reason:** A buggy launch destroys player trust. This build ensures the game is stable and reliable.

**Prerequisites:** Build 36 complete.

**Implementation Steps:**
1. Create test scenarios for every system:
   - Combat: all damage types, all defense types, all skill interactions
   - Crafting: all forge functions, all rarity combinations
   - Economy: all currencies, all sinks, edge cases (negative gold prevention)
   - Save: load after upgrade, load corrupted save, migration from old version
   - UI: all screens at all window sizes, all modals, all tooltips
2. Fix all discovered bugs:
   - Priority 1: Crash bugs (fix immediately)
   - Priority 2: Data loss bugs (fix same day)
   - Priority 3: Display bugs (fix before launch)
   - Priority 4: Minor visual issues (fix or document for later)
3. Implement error logging:
   - Log errors to browser console with stack traces
   - Create `ErrorLogger` module with rate-limited reporting
4. Implement graceful degradation:
   - If any system fails, pause game and show error modal
   - Never crash the parent TheHUB page

**Files Affected:**
- `src/core/ErrorLogger.js` (new)
- Multiple files (bug fixes as discovered)

**Architecture Changes:**
- ErrorLogger wraps all system calls in try/catch
- Error modal prevents TheHUB crash

**Testing Plan:**
- Run all test scenarios → no crashes
- Force error (simulate save corruption) → error modal, game pauses
- TheHUB continues running after game error
- No console errors during normal gameplay

**Success Criteria:**
- [x] All test scenarios pass
- [x] No crash bugs in normal gameplay
- [x] Error handling catches and displays failures gracefully
- [x] TheHUB survives game errors

**Regression Risks:** None.

**Future Dependencies:** Build 38 (Final Boss — Start of Release Milestone)

---

# MILESTONE 6: RELEASE (Builds 38 – 40)

## Build 38 — Final Boss Encounter

**Build Number:** Aetherweave 0.6.0.0.a v

**Build Name:** Elathor — The Eternal Weaver

**Goal:** Implement the final boss encounter: all 3 phases + hidden phase 3b, narrative choice, and 3 ending variants.

**Reason:** The final boss is the culmination of the entire game. It must be mechanically satisfying and narratively impactful.

**Prerequisites:** Build 37 complete.

**Implementation Steps:**
1. Create Elathor boss definition:
   - Phase 1: "The Eternal's Judgment" — cycles through 6 attack patterns (one per class)
   - Phase 2: "The Cycle Unbroken" — creates Echo copies of the party, introduces Cycle Fatigue debuff
   - Phase 3: "The Final Thread" — 3 nodes (Memory, Regret, Hope), must damage all simultaneously
2. Implement phase transitions (cutscenes between phases)
3. Implement Phase 3b (hidden): The Choice
   - Fight pauses at 10% HP
   - 3 choices presented (narrative dialogue)
   - Each choice leads to different ending sequence
4. Create 3 ending cutscenes:
   - Ending A: "The Hero's Sacrifice" — Cael takes the burden, Elathor fades
   - Ending B: "Strength in Unity" — Party shares burden, Elathor becomes mentor
   - Ending C (Secret): "The New Dawn" — Requires 100% exploration + all collectibles
5. Implement credits sequence

**Files Affected:**
- `src/data/enemies.js` (update — Elathor boss definition)
- `src/combat/CombatEngine.js` (update — special boss mechanics)
- `src/data/dialogue/final-boss.json` (new — Elathor dialogue)
- `src/ui/components/CutscenePlayer.js` (new — cutscene sequence)
- `src/data/items.js` (update — endgame rewards)

**Architecture Changes:**
- Final boss has its own phase state machine separate from normal combat
- Cutscene player renders text + images with timing

**Testing Plan:**
- Enter final boss → Phase 1 plays → all 6 patterns cycled
- Phase 2 → Echo copies created → defeated
- Phase 3 → 3 nodes damaged simultaneously → boss reaches 10%
- Choice appears → each choice leads to different ending
- Ending credits roll

**Success Criteria:**
- [x] Phase 1 functions (6 patterns)
- [x] Phase 2 functions (Echo copies)
- [x] Phase 3 functions (multi-target damage)
- [x] 3 ending choices work
- [x] Credits sequence plays

**Regression Risks:** None.

**Future Dependencies:** Build 39 (Content Completion Verification)

---

## Build 39 — Content Completion & Verification

**Build Number:** Aetherweave 0.6.0.1.a v

**Build Name:** Full Game Verification

**Goal:** Verify all content is completable end-to-end: all quests, all achievements, all collectibles, all zones, all difficulties.

**Reason:** Before declaring v1.0, every piece of content must be verified as reachable and completable.

**Prerequisites:** Build 38 complete.

**Implementation Steps:**
1. Run full playthrough from start to credits:
   - Verify all 40 chapters accessible
   - Verify all 7 zones × 4 difficulties reachable
   - Verify all 7 bosses defeatable
   - Verify all 280 stages completable
2. Verify all 25 personal quest chapters completable
3. Verify all 12 side quests + 6 hidden quests completable
4. Verify all 56 achievements unlockable
5. Verify all 130 collectibles findable
6. Verify all 3 endings reachable (including secret)
7. Document any unreachable content as bugs

**Files Affected:**
- `TESTING_REPORT.md` (new — test results)
- Bug fixes as discovered

**Architecture Changes:** None — this is a verification build.

**Testing Plan:**
- Full playthrough on a fresh save
- Document every piece of content verified
- Fix any blockers found

**Success Criteria:**
- [x] 100% of content reachable and completable
- [x] No soft-locks (unwinnable states)
- [x] All achievements unlockable
- [x] All endings reachable
- [x] No save corruption on any path

**Regression Risks:** None.

**Future Dependencies:** Build 40 (v1.0 Release)

---

## Build 40 — v1.0 Release

**Build Number:** Aetherweave 1.0.0.0.r v

**Build Name:** Version 1.0 Launch

**Goal:** Package, final testing, documentation, and release.

**Reason:** The culmination of all 39 previous builds. Shipping the game.

**Prerequisites:** Build 39 complete.

**Implementation Steps:**
1. Final build optimization:
   - Minify all JS, CSS
   - Optimize sprite atlases
   - Generate production build via Vite
2. Create README:
   - Setup instructions (Vite dev, production build, TheHUB integration)
   - Architecture overview
   - Data convention documentation (for future content creators)
   - Expansion strategy
3. Create CHANGELOG:
   - Every build from 0 to 39 documented
   - User-facing changes highlighted
4. Final QA pass:
   - Smoke test on Chrome, Firefox, Edge
   - Test inside TheHUB (all modes)
   - Test standalone (outside TheHUB)
   - Test save migration from alpha builds
5. Tag release: `v1.0.0`
6. Deploy to TheHUB v3 integration

**Files Affected:**
- `README.md` (new)
- `CHANGELOG.md` (new)
- `vite.config.js` (update — production build settings)

**Architecture Changes:** None — release stabilization.

**Testing Plan:**
- Production build deploys without errors
- Load in Chrome, Firefox, Edge — no console errors
- Inside TheHUB: all integration features work
- Save from alpha loadable and migratable
- All links and documentation correct

**Success Criteria:**
- [x] Production build generates without errors
- [x] Game runs in all 3 major browsers
- [x] TheHUB integration verified
- [x] Save migration works from alpha save
- [x] README and CHANGELOG complete
- [x] Version tagged and deployed

**Regression Risks:** None.

**Future Dependencies:** v1.1 (Post-Launch Balance) → v2.0 (Echoes Expansion)

---

# POST-LAUNCH ROADMAP (v1.1+)

## v1.x — Monthly Updates

| Update | Focus | Content |
|--------|-------|---------|
| v1.1 | Balance Tuning | Adjust XP curve, gold sinks, drop rates based on live data |
| v1.2 | Quality of Life | Player-requested UI improvements |
| v1.3 | New Zone | "The Whispering Dunes" — new zone, enemies, boss |
| v1.4 | Event System | Seasonal events (no FOMO — events rerun) |
| v1.5 | Pet System | 8 pets with unique bonuses |
| v1.6 | Additional Quests | More side quests, hidden quests |

## v2.0 — Echoes Expansion

| Build | Focus | Content |
|-------|-------|---------|
| 2.0 | Echo System | Full Echo mechanics: time manipulation, Echo challenges, unique rewards |
| 2.1 | New Zone | "The Sunken Weave" — underwater zone |
| 2.2 | Echo Bosses | Boss variants locked behind Echo challenges |
| 2.3 | Weaver DLC Pack 1 | 2 new classes (Void Knight, Tide Caller) — $4.99 each |

## v3.0 — Convergence Expansion

| Build | Focus | Content |
|-------|-------|---------|
| 3.0 | Multi-Party | Manage 2 parties across different zones simultaneously |
| 3.1 | Raid Bosses | 8-player alliances (optional, not required) |
| 3.2 | Guild System | Player-created guilds with shared progression |
| 3.3 | Weaver DLC Pack 2 | 2 new classes (Dream Walker, Chronomancer) |

## v4.0 — The Weave Expansion

| Build | Focus | Content |
|-------|-------|---------|
| 4.0 | Player Content Creator | Design custom Rift layouts, share via JSON export |
| 4.1 | Workshop Integration | Steam Workshop / browser-based sharing |
| 4.2 | Leaderboards | Weekly challenge leaderboards (optional, opt-in) |

---

*End of Master Roadmap — Aetherweave v1.0*
