# UI GUIDE
## Project: AETHERWEAVE — An Original Idle Companion RPG
**Phase 3 Deliverable | Integration Planning**
**Status:** Complete

---

# I. UI PHILOSOPHY

## 1.1 Core Principles

1. **Glanceable.** Every screen must communicate its purpose in under 2 seconds.
2. **Progressive Disclosure.** Show the minimum needed; reveal complexity on demand.
3. **Consistent Feedback.** Every player action produces a visible, immediate response.
4. **Respectful.** No flashing ads, no modal spam, no attention-stealing animations.
5. **Pixel-Readable.** Text must be legible at the game's smallest window size (180×60).

## 1.2 Window Modes

### Mini Mode (180×60px)
```
┌──────────────────────────────┐
│ [Icon] Party Status (HP bars) │
│         Gold: 1,234           │
└──────────────────────────────┘
```
**Purpose:** Passive awareness while working. Shows: party alive/dead, current zone, gold counter.

### Compact Mode (320×120px)
```
┌──────────────────────────────────────────┐
│ ┌──┐ ┌──┐ ┌──┐            Gold: 1,234  │
│ │H1│ │H2│ │H3│  Zone: Verdant Weave      │
│ └──┘ └──┘ └──┘                            │
│ ═══════ Combat Strip ═══════ ▶  [Chest]  │
└──────────────────────────────────────────┘
```
**Purpose:** Quick check-ins. Shows: combat in progress, chest indicators, zone name, gold.

### Full Mode (600×400px)
```
┌──────────────────────────────────────────────────────┐
│ [Party] [Inventory] [Attunement] [Forge] [Map] [Q]  │
├──────────────────────────────────────────────────────┤
│                                                       │
│        Combat Arena (full width view)                 │
│                                                       │
│ ════════════════ Combat Strip ═══════════════════ ▶  │
│                                                       │
├──────────────────────────────────────────────────────┤
│ Stats: Gold  Dust  Fragments  ||  Zone Progression   │
└──────────────────────────────────────────────────────┘
```
**Purpose:** Active play sessions. All systems accessible via tabs.

---

# II. SCREEN LAYOUTS

## 2.1 Party Screen (Full Mode)

```
┌──────────────────────────────────────────────────────┐
│  FORMATION                         [Save] [Auto]     │
├──────────────────────────────────────────────────────┤
│                                                       │
│  ┌──────────────────────────────────────────┐        │
│  │  Formation Slots:                         │        │
│  │                                            │        │
│  │  [Front: Lyra (Warden)]                   │        │
│  │     ↑↓ arrows to reorder                   │        │
│  │  [Mid: Kael (Striker)]                     │        │
│  │  [Mid: Mira (Channeler)]                   │        │
│  │  [Back: Solen (Mender)]                    │        │
│  │                                            │        │
│  │  [Swap Hero] [Change AI Priority]          │        │
│  └──────────────────────────────────────────┘        │
│                                                       │
│  ┌──────────────────────────────────────────┐        │
│  │  Reserved Members (not in party)          │        │
│  │  ┌────┐ ┌────┐ ┌────┐                    │        │
│  │  │Rook│ │Vex │ │ +  │                    │        │
│  │  └────┘ └────┘ └────┘                    │        │
│  └──────────────────────────────────────────┘        │
│                                                       │
│  Pet Slot: [Aether Sprite] +12% gold                 │
│                                                       │
└──────────────────────────────────────────────────────┘
```

## 2.2 Inventory Screen

```
┌──────────────────────────────────────────────────────┐
│  INVENTORY              [Sort] [Filter] [Shatter All] │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Equipment (60/60 slots)                              │
│                                                       │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│  │Sword│ │Staff│ │Helm │ │Ring │ │Boots│ │Amul│        │
│  │Rare │ │Comn │ │Refnd│ │Rare │ │A.F. │ │Rare│        │
│  │Lv12 │ │Lv8  │ │Lv15 │ │Lv10 │ │Lv35 │ │Lv20│        │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘          │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│  │... │ │    │ │    │ │    │ │    │ │    │          │
│  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘          │
│                                                       │
│  Material Pouch: 230 Aether Dust, 15 Memory Shards   │
│                                                       │
└──────────────────────────────────────────────────────┘

[Hovering item shows tooltip:]
┌────────────────────┐
│ Iron Blade (Rare)   │
│ Level 12            │
│ 8-12 Attack Damage  │
│ +5% Attack Speed    │
│ +3% Crit Chance     │
│                     │
│ [Equip] [Lock] [X]  │
└────────────────────┘
```

## 2.3 Attunement Screen (Skill Tree)

```
┌──────────────────────────────────────────────────────┐
│  ATTUNEMENT: Lyra (Warden)   Points: 3    [Respec]  │
├──────────────────────────────────────────────────────┤
│                                                       │
│           ┌──────────┐                                │
│           │   Root   │ (Always unlocked)              │
│           └────┬─────┘                                │
│                │                                      │
│       ┌────────┼────────┐                             │
│       ▼        ▼        ▼                             │
│  ┌───────┐ ┌───────┐ ┌───────┐                       │
│  │Combat │ │ Weave │ │ Spirit│  (3 schools)          │
│  │ Path   │ │ Path  │ │ Path  │                       │
│  └───┬───┘ └───┬───┘ └───┬───┘                       │
│      │         │         │                            │
│      ▼         ▼         ▼                            │
│   [Nodes...] [Nodes...] [Nodes...]                    │
│                                                       │
│  (Unlocked: bright ●  Available: pulsing ○               │
│   Locked: dim ○   Purchased: filled ●)                  │
│                                                       │
│  Hover tooltip:                                       │
│  ┌─────────────────────────────────────┐             │
│  │ Fortified Weave (Lv 3/5)             │             │
│  │ +6% Armor per level                  │             │
│  │ Next: +2% Armor (total +8%)          │             │
│  │ Cost: 500 Gold                       │             │
│  └─────────────────────────────────────┘             │
│                                                       │
└──────────────────────────────────────────────────────┘
```

## 2.4 Aetherforge Screen (Crafting)

```
┌──────────────────────────────────────────────────────┐
│  AETHERFORGE            Level: 12    XP: ████░░ 68%  │
├──────────────────────────────────────────────────────┤
│                                                       │
│  [Shatter] [Fuse] [Reshape] [Imbue] [Extract]        │
│  [ReForge] [Harmonize] [Manifest]                     │
│                                                       │
├──────────────────────────────────────────────────────┤
│                                                        │
│  Active Function: Fuse                                 │
│                                                        │
│  Drag items here:                                      │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                  │
│  │Item│ │Item│ │Item│ │Item│ │Item│                  │
│  └────┘ └────┘ └────┘ └────┘ └────┘                  │
│    5/5 items selected                                  │
│                                                        │
│  Result: ┌──────────┐                                  │
│          │  ???      │  95% Refined                     │
│          │           │   5% Attuned                     │
│          └──────────┘                                  │
│                                                        │
│  Gold Cost: 200                                        │
│                                                        │
│  [FUSE]                                                 │
│                                                        │
└──────────────────────────────────────────────────────┘
```

---

# III. VISUAL DESIGN LANGUAGE

## 3.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | #1a1c23 | Main background |
| `--bg-secondary` | #242731 | Panel backgrounds |
| `--bg-tertiary` | #2e323f | Input fields, hover states |
| `--text-primary` | #e8eaf0 | Primary text |
| `--text-secondary` | #9da3b8 | Secondary text, labels |
| `--text-muted` | #616780 | Disabled text |
| `--accent-void` | #7c5cbf | Void affinity color |
| `--accent-flux` | #5ba3d9 | Flux affinity color |
| `--accent-ember` | #d95b4a | Ember affinity color |
| `--accent-frost` | #4ad9c4 | Frost affinity color |
| `--accent-storm` | #d9c44a | Storm affinity color |
| `--accent-crystal` | #b8d94a | Crystal affinity color |
| `--rarity-common` | #e4e4e4 | Common gear |
| `--rarity-refined` | #54fc0c | Refined gear |
| `--rarity-attuned` | #2f8bfc | Attuned gear |
| `--rarity-resonant` | #b40cfc | Resonant gear |
| `--rarity-aetherforged` | #fc9c0c | Aetherforged gear |
| `--rarity-loom-touched` | #fce454 | Loom-Touched gear |
| `--success` | #4ad94a | Positive feedback |
| `--warning` | #d9c44a | Warning state |
| `--danger` | #d94a4a | Danger/HP loss |

## 3.2 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| HUD numbers | Monospace | 9px-11px | Bold |
| Labels | Sans-serif | 10px-12px | Medium |
| Body text | Sans-serif | 11px-14px | Regular |
| Item names | Sans-serif | 12px | Bold |
| Damage numbers | Monospace | 14px-20px | Bold |
| Headers | Sans-serif | 16px-20px | Bold |

**Font choice:** System fonts (Inter, SF Pro, Segoe UI) for zero-load time.

## 3.3 Iconography

- All icons are pixel art (16×16 or 24×24)
- Consistent 2px padding inside icon containers
- Rarity borders on items match rarity color
- Status indicators: dots (green=alive, red=dead, yellow=reviving)
- Skill icons use element-appropriate symbols (flame, snowflake, bolt, etc.)

---

# IV. INTERACTION PATTERNS

| Action | Desktop | Notes |
|--------|---------|-------|
| Open chest | Click | Satisfying "pop" animation |
| Equip item | Click item → click slot | Drag-and-drop optional |
| Lock item | Alt+Click | Visual lock icon |
| Sell/Shatter items | Click + confirm | Batch selection available |
| Navigate tabs | Click tab header | Tab bar always visible |
| Resize window | Drag corner | Smooth transition between modes |
| Change formation | Arrow buttons | 60s cooldown on swap |
| Skill tree | Hover for info, click to buy | Cost shown before purchase |
| Hover tooltip | 300ms delay | Persistent until mouse leaves |
| Right-click | Context menu (lock, info, shatter) | Consistent with desktop patterns |

---

# V. RESPONSIVE BEHAVIOR

## 5.1 Mode Transitions

Mini → Compact: Click expand button or drag bottom edge up
Compact → Full: Click fullscreen button or drag top edge up
Full → Compact: Click collapse button or resize

**Animation:** 100ms smooth CSS transition. No jarring jumps.

## 5.2 Element Visibility by Mode

| Element | Mini | Compact | Full |
|---------|------|---------|------|
| Combat strip | — | ✓ | ✓ |
| Party HP bars | ✓ (dots) | ✓ (bars) | ✓ (full bars) |
| Gold counter | ✓ | ✓ | ✓ |
| Zone name | — | ✓ | ✓ |
| Chest indicators | — | ✓ (icons) | ✓ (entities) |
| Tab bar | — | — | ✓ |
| Damage numbers | — | — | ✓ |
| Menu buttons | — | — | ✓ |
| XP bar | ✓ (compact) | ✓ | ✓ |
| Floating text | — | — | ✓ |

---

*End of UI Guide*
