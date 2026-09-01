# ITEM BIBLE — AETHERWEAVE
## Phase 4 Deliverable | Equipment, Magic & Crafting
**Status:** Complete

---

# I. EQUIPMENT DESIGN PHILOSOPHY

1. **Every item slot matters.** There are no "dump slots" — each contributes meaningfully to a build.
2. **Rarity is about power ceiling, not RNG frustration.** A Refined item is always usable. An Aetherforged item is a chase goal.
3. **Set bonuses exist but are optional.** They reward dedication, not mandatory for success.
4. **Visual progression is visible.** Better gear changes character appearance in the combat strip.

---

# II. EQUIPMENT SLOTS & STAT RANGES

## Weapons (6 types)

| Type | Primary Stat | Secondary Stat | Class Affinity |
|------|-------------|---------------|----------------|
| **Blade** | Attack Damage | Crit Chance | Striker, Warden |
| **Staff** | Spell Power | Mana Regen | Channeler, Mender |
| **Focus** | Channel Speed | Crit Damage | Channeler, Shaper |
| **Gauntlet** | Attack Speed | Combo Duration | Striker |
| **Bow** | Ranged Damage | Precision | Striker |
| **Conduit** | Aether Damage | (Element) Damage | Wisp, Shaper |

## Off-Hands (6 types)

| Type | Primary Stat | Class |
|------|-------------|-------|
| **Shield** | Armor | Warden |
| **Orb** | Elemental Resistance | Channeler |
| **Tome** | Cast Speed | Mender |
| **Charm** | Affinity Boost | All (utility) |
| **Quiver** | Attack Speed (ranged) | Striker |
| **Crystal** | Mana Capacity | Shaper, Wisp |

## Armor (4 slots)

| Slot | Primary Stat | Secondary |
|------|-------------|-----------|
| **Headgear** | Armor / Perception | Crit avoidance Sight range |
| **Chest** | Max HP | Damage reduction |
| **Hands** | Attack Speed / Cast Speed | Precision |
| **Feet** | Dodge / Move Speed | Resistances |

## Accessories (4 slots)

| Slot | Stat Pool | Examples |
|------|-----------|----------|
| **Ring 1** | Offensive | Attack, Spell Power, Crit, Speed |
| **Ring 2** | Defensive | HP, Armor, Resistance, Dodge |
| **Amulet** | Hybrid | Mana, Lifesteal, All Stats |
| **Brooch** | Utility | Gold%, XP%, Drop Rate, Affinity% |

---

# III. RARITY TIERS

| Rarity | Color | Sockets | Unique Affixes | Alchemy Value |
|--------|-------|---------|----------------|--------------|
| Common | White | 0 | — | 10 Dust |
| Refined | Green | 1 | — | 30 Dust |
| Attuned | Blue | 2 | — | 90 Dust |
| Resonant | Purple | 3 | 1 suffix | 270 Dust |
| Aetherforged | Orange | 4 | 2 suffixes | 810 Dust |
| Loom-Touched | Gold | 5 | 3 suffixes | 2,430 Dust |

**Suffix System (Endgame):**
Suffixes are special modifiers that only appear on Resonant+ gear. Examples:
- "of the Warden" — +15% armor, +5% HP regeneration
- "of the Echo" — +10% all resistance, +5% mana
- "of the Cycle" — +10% damage when HP > 80%
- "of the Eternal" — Unique effect per class (Loom-Touched only)

---

# IV. MAGIC SYSTEM — AETHER MANIPULATION

**Schools of Aether Magic:**

| School | Effect | Tag |
|--------|--------|-----|
| **Resonance** | Pure aether damage, ignores some armor | Aether |
| **Void** | Corrupted aether, damage over time | DoT |
| **Flux** | Temporal effects (speed, cooldown) | Buff |
| **Ember** | Fire, heat, explosion | Elemental |
| **Frost** | Cold, slow, freeze | Elemental |
| **Storm** | Lightning, chain damage | Elemental |
| **Crystal** | Defense, barrier, reflection | Defensive |

**Damage Type Interaction:**
| Attacker ↓ Defender → | Aether | Elemental | Physical |
|----------------------|--------|-----------|----------|
| Aether | — | ×1.0 | ×0.75 (resisted by armor) |
| Elemental | ×0.75 | Affinity-dependent | ×1.0 |
| Physical | ×1.0 | ×1.0 | — |

**Elemental Affinity Damage Table:**
| Attack → Target ↓ | Ember | Frost | Storm |
|-------------------|-------|-------|-------|
| Ember-weak | ×1.5 | ×0.75 | ×1.0 |
| Frost-weak | ×0.75 | ×1.5 | ×1.0 |
| Storm-weak | ×1.0 | ×0.75 | ×1.5 |
| Neutral | ×1.0 | ×1.0 | ×1.0 |

---

# V. CRAFTING — THE AETHERFORGE

## Item Tiers (By Zone)

| Zone | Common Item Level | Max Rarity Drop |
|------|------------------|-----------------|
| Verdant Weave | 1-10 | Refined |
| Crystal Expanse | 10-25 | Attuned |
| Choking Mists | 25-40 | Resonant |
| Emberheart Depths | 40-55 | Aetherforged |
| Skyreach Archives | 55-70 | Aetherforged |
| Fractured Coast | 70-85 | Loom-Touched |
| Maelstrom | 85-100 | Loom-Touched |

## Crafting Functions (Full Detail in Phase 3 TDD)

| Function | Input | Output | Gold Cost | Forge Level |
|----------|-------|--------|-----------|-------------|
| **Shatter** | Any item | Aether Dust + Forge XP | — | 1 |
| **Fuse** | 5x same rarity | 1x higher rarity (see odds) | 200-5,000 | 1 |
| **Reshape** | 1 item + Dust | Same item, different slot | 500 | 5 |
| **Imbue** | Item + Aether Fragment | Socketed item | 100/socket | 10 |
| **Extract** | Socketed item | Removes sockets (destroys fragments) | 200/tier | 15 |
| **ReForge** | Item + Dust + Gold | Rerolled affixes | 1,000+ | 25 |
| **Harmonize** | 3x same slot | Best affix transfers to target | 5,000 | 35 |
| **Manifest** | Dust + Fragments | Random item (gambling) | 3,000 | 50 |

---

# VI. SIGNATURE ITEMS (Companion Personal Quest Rewards)

| Item | Owner | Slot | Effect |
|------|-------|------|--------|
| Vaela's Amulet | Vaela | Amulet | +15% Aether damage, +10% Affinity gain |
| Kaelen's Oathblade | Kaelen | Weapon (Blade) | +20% Combo damage, +5% Crit chance |
| Sera's Lens | Sera | Off-hand (Crystal) | +20% Echo duration, +15% resistance piercing |
| Mira's Grace | Mira | Armor (Chest) | +20% Healing, +15% Max HP |
| Rynn's Core | Rynn | Accessory (Ring) | +1 summon limit, +20% summon damage |

---

# VII. LOOT TABLE EXAMPLE: Verdant Weave (Stage 1-5)

| Drop | Rate | Type |
|------|------|------|
| Gold (10-30) | Guaranteed | Currency |
| Aether Dust (1-3) | 60% | Material |
| Common Sword | 15% | Gear |
| Common Staff | 15% | Gear |
| Refined Boots | 5% | Gear |
| Refined Ring | 3% | Gear |
| Attuned (any slot) | 1% | Gear |
| Memory Shard | 0.5% | Collectible |
| Loom Fragment | 0.01% | Ultra-rare |

---

*End of Item Bible*
