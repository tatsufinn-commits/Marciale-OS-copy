# ARCHITECTURE AUDIT — AETHERWEAVE → MUSHOKU TENSAI TERMINOLOGY MIGRATION
## Phase 7 Supplement | System Renaming Guide
**Purpose:** Standardize all terminology to be MT-consistent while preserving the game's original system architecture.

---

# RENAMING TABLE

## WORLD & SETTING

| Old (Aetherweave) | New (MT) | Reason |
|-------------------|----------|--------|
| Aetherweave | Mushoku Tensei: Taskbar Hero (working title) | The game is an MT adaptation |
| The Aetherweave | The Six-Faced World / The Weave | Canon MT cosmology term |
| Aether | Mana | Canon MT magic resource |
| Aether Rifts / Rifts | Mana Rifts / Calamity Zones | The Mana Calamity is canon |
| Riftspawn | Riftborn Monsters / Magic Beasts | Canon term for monsters from rifts |
| The Great Unraveling | The Mana Calamity | Canon Vol 1 event |
| The Loom | The World's Mana System (no direct equivalent) | Keep as "The Weave's Foundation" — original keepsake |
| Loom Fragments | Ancient Mana Crystals / Laplace's Fragments | Fits canon lore |
| Weavers | Mages / Magic Users | Canon term |
| Shattered Continent | The Six-Faced World (Human World) | Canon geography |

## CHARACTERS

| Old (Aetherweave) | New (MT) | Reason |
|-------------------|----------|--------|
| Cael (Protagonist) | Rudeus Greyrat | Canon protagonist |
| Vaela | Sylphiette | Canon childhood friend |
| Kaelen | Eris Boreas Greyrat | Canon first love / third wife |
| Sera | Roxy Migurdia | Canon first teacher / second wife |
| Mira | — (absorbed into Roxy/Sylphy's roles) | Roxy handles healing; Sylphy handles support |
| Rynn | — (deferred for post-launch DLC) | New original character not needed |
| Master Orin | Paul Greyrat / Roxy Migurdia | Paul as father figure; Roxy as teacher |
| The Eternal Weaver (Elathor) | Orsted, the Dragon God | Canon final boss |
| The Void Whisperer | Hitogami / Laplace | Canon main antagonist |

## SYSTEMS

| Old (Aetherweave) | New (MT) | Reason |
|-------------------|----------|--------|
| Aether Attunement | Mana Attunement / Magic Study | Canon magic learning |
| Attunement Tree | Magic Skill Tree / Spell Progression | Canon magic ranks |
| Attunement Points | Skill Points / Study Points | — |
| Aetherforge | Hero-dric Cube / Magic Crafting Workshop | Inspired by TBH's Cube, MT's enchanting |
| Aether Dust | Mana Dust / Magic Ore Powder | Crafting material |
| Resonance Shield | Mana Barrier / Magic Shield | Canon barrier magic |
| Affinity (elemental) | Magic Affinity / Elemental Affinity | Canon magic system |
| Weave (the energy structure) | Mana Flow / The World's Mana | — |
| The Loomguard | Adventurer's Guild / Magic Corps | Canon organization |
| The Unravelers | Followers of Hitogami / Laplace's Remnants | Canon antagonist group |
| Shard Collectors | Labyrinth Delvers / Treasure Hunters | Canon adventurer type |
| Echo Walkers | Researchers of Ancient Magic / Historians | — |
| The Quiet | Civilians / Non-Magic Users | — |
| Echoes | Magical Recordings / Residual Memories | Canon concept (the teleport labyrinth left records) |

## COMBAT & MAGIC

| Old (Aetherweave) | New (MT) | Reason |
|-------------------|----------|--------|
| Aether Damage | Mana-Enhanced Damage / Magic Damage | Canon |
| Void (element) | Dark Magic / Demon Magic | Canon |
| Flux (element) | Time / Gravity Magic | Canon (Orsted uses gravity) |
| Ember | Fire Magic | Canon |
| Frost | Water / Ice Magic | Canon |
| Storm | Wind / Lightning Magic | Canon |
| Crystal | Earth / Barrier Magic | Canon |
| Warden (class) | Knight / Tank Class | TBH tank archetype |
| Striker | Swordsman / Warrior Class | Canon |
| Channeler | Mage / Sorcerer Class | Canon |
| Mender | Healer / Priest Class | Canon |
| Shaper | Barrier Mage / Enchanter | — |
| Wisp | Summoner / Familiar Master | — |
| Magic Armor (equipment type) | Magic Armor Mk I / Mk 0 | Rudeus's signature gear, stays as-is |
| Combo Chains (Striker mechanic) | Sword God Style Techniques | Canon |

## RARITY & ITEMS

| Old (Aetherweave) | New (MT) | Reason |
|-------------------|----------|--------|
| Common | Common | Stay |
| Refined | Uncommon | Canon fits better |
| Attuned | Magic-Grade | Canon |
| Resonant | Rare | Canon |
| Aetherforged | Legendary | Canon |
| Loom-Touched | Immortal / God-Tier | Canon (God-tier items exist) |
| Dungeon | Labyrinth | Canon term for dungeons |

## UI & HUD

| Old (Aetherweave) | New (MT) | Reason |
|-------------------|----------|--------|
| Mini: 180×60 | Mini: Taskbar Mode | — |
| Compact: 320×120 | Compact: Quick View | — |
| Full: 600×400 | Full: Adventurer's Journal | — |
| The Forge | The Crafting Workshop | — |

---

# FILES TO UPDATE

| File | What to Change |
|------|---------------|
| `src/data/weavers.js` | All class names, affinity types, skill names |
| `src/data/items.js` | Rarity names, item descriptions, element types |
| `src/data/zones.js` | Zone names to MT continent/stage names |
| `src/data/enemies.js` | Monster names to MT canon names |
| `src/data/skills.js` | Skill names to MT canon spells |
| `src/data/affixes.js` | Element types to MT magic schools |
| `src/data/npcs.js` | All NPC names to MT characters |
| `src/data/quests.js` | Quest names, faction names |
| `src/data/factions.js` | Faction names to MT organizations |
| `src/core/StateManager.js` | State path names (e.g., `forge` → `craftingWorkshop`) |
| `src/systems/AttunementEngine.js` → `src/systems/MagicStudyEngine.js` | File rename + internals |
| `src/crafting/Aetherforge.js` → `src/crafting/CraftingWorkshop.js` | File rename + internals |
| All UI screen files | Screen titles, labels, tooltip text |

---

# RENAME IMPLEMENTATION ORDER

| Build | Files to Update |
|-------|----------------|
| Build 0 (Skeleton) | `src/data/` stub files — create them with MT names from the start |
| Build 3 (Save System) | `src/core/StateManager.js` — use MT state paths |
| Build 5 (Combat) | `src/data/weavers.js`, `src/data/enemies.js`, `src/data/skills.js` |
| Build 9 (Loot) | `src/data/items.js`, `src/data/affixes.js` |
| Build 7 (Zones) | `src/data/zones.js` |
| Build 21 (Quests) | `src/data/quests.js`, `src/data/npcs.js`, `src/data/factions.js` |
| Build 12 (Crafting) | `src/crafting/Aetherforge.js` → rename |
| Build 11 (Stats) | `src/systems/AttunementEngine.js` → rename |

**Decision:** The old Aetherweave names will remain as internal code variable names for simplicity during early builds. The MT names will be used in:
1. All user-facing UI text
2. All data file values
3. Public documentation

Internal engine code (class names, file names, state paths) can be migrated incrementally starting from Build 11+ when the systems stabilize.

---

*End of Architecture Audit*
