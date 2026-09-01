# DESIGN DECISION LOG
## Project: AETHERWEAVE — An Original Idle Companion RPG
**Phase 3 Deliverable | Integration Planning**
**Status:** Complete

---

# I. DECISION RECORDS

## D-001: Direct MT Adaptation (Revised After Phase 4 Review)

| Field | Value |
|-------|-------|
| **ID** | D-001 (Revised) |
| **Date** | 2026-07-22 (Revised 2026-07-22) |
| **Author** | Game Director (User) + Game Director (AI) |
| **Category** | Project Scope |
| **Status** | **Revised — Direct Adaptation** |

**Context:**
Phase 2 research complete. Phase 3 produced original IP "Aetherweave." Phase 4 content was originally designed as original characters. On review, the Game Director (User) requested loyalty to Mushoku Tensei canon.

**Options Considered (Initial):**
1. Direct MT adaptation (characters, story, world used verbatim)
2. Original IP with design principles extracted from both

**Initial Decision:** Original IP.

**Revision:** Direct MT adaptation.

**Rationale for Revision:**
- The emotional weight of MT comes from its *specific* characters and their canon relationships — Rudeus's past life trauma, Sylphy's abandonment anxiety, Eris's departure, Paul's death. An original IP cannot replicate this depth without decades of audience investment.
- The user's explicit request: "let's be loyal to mushoku tensei and its bibles"
- The game is intended for an audience already familiar with MT — using canon characters leverages existing emotional investment
- TBH-style mechanics (idle combat, loot, crafting) are generic systems applied to MT's world — no copyright issue in the system design

**Consequences of Revision:**
- All Phase 4 documents revised to use MT canon characters and story
- Original "Aetherweave" setting archived in `research/integration/` for reference
- Game now titled: Mushoku Tensei: A New Thread (working title)
- Characters: Rudeus, Sylphiette, Roxy, Eris, Zanoba (MT canon)
- World: Six-Faced World (MT canon geography)
- Story: Volumes 1-15 adapted into 40 chapters
- Final boss: Orsted (canon-compliant, not a replacement)

---

## D-002: 6 Rarity Tiers Instead of 10

| Field | Value |
|-------|-------|
| **ID** | D-002 |
| **Date** | 2026-07-22 |
| **Author** | Game Director (AI) |
| **Category** | Economy / Progression |
| **Status** | **Accepted** |

**Context:**
TBH uses 10 rarity grades (Common to Cosmic). Community feedback indicated that Divine and Cosmic tiers felt "effectively unobtainable," creating frustration rather than aspiration.

**Options Considered:**
1. 10 tiers (mirror TBH)
2. 6 tiers (Common → Loom-Touched)
3. 5 tiers (simpler, but fewer progression steps)

**Decision:**
6 tiers: Common → Refined → Attuned → Resonant → Aetherforged → Loom-Touched

**Rationale:**
- 6 tiers provide clear progression without overwhelming
- Each tier feels meaningfully different (visual color, socket count, stat range)
- Top tier (Loom-Touched) is rare but achievable through dedicated play
- Fewer tiers = simpler balancing, clearer player goals

**Data Reference (Phase 2):** TBH community reported "Divine and Cosmic are effectively unobtainable" — this creates frustration, not aspiration. 6 tiers keeps the chase alive without the treadmill feeling futile.

---

## D-003: 4-Party System Instead of 3

| Field | Value |
|-------|-------|
| **ID** | D-003 |
| **Date** | 2026-07-22 |
| **Author** | Game Director (AI) |
| **Category** | Combat / Party |
| **Status** | **Accepted** |

**Context:**
TBH uses 3-hero parties with a 1D horizontal combat strip. MT's parties varied from 3-5 (Dead End: 3, Fangs of the Black Wolf: 5+).

**Options Considered:**
1. 3 members (TBH standard)
2. 4 members (balanced roles: tank, 2 DPS, support)
3. 5 members (more complex, harder to balance)

**Decision:**
4 members with formation positions: Front (tank), Mid (2 DPS), Back (support)

**Rationale:**
- 4 = traditional RPG party (tank, healer, 2 DPS)
- Formation adds depth: position affects targeting priority and enemy hit order
- 4 members × 6 classes = meaningful composition choices
- Higher depth-to-complexity ratio than 3 or 5

---

## D-004: No Premium Currency / No Pay-to-Win

| Field | Value |
|-------|-------|
| **ID** | D-004 |
| **Date** | 2026-07-22 |
| **Author** | Game Director (AI) |
| **Category** | Economy / Monetization |
| **Status** | **Accepted** |

**Context:**
TBH is F2P with DLC classes. Monetization through Steam Market (gear selling) created server issues and cheating problems.

**Options Considered:**
1. Free with premium currency (gems/diamonds)
2. Free with DLC classes only (TBH model, no market)
3. Paid upfront
4. Free with cosmetic-only purchases + DLC classes

**Decision:**
Free-to-play with DLC classes ($4.99 each) + cosmetic Supporter Pack ($9.99) + Soundtrack ($4.99). No premium currency. No pay-to-win. No market-driven economy.

**Rationale:**
- MT-inspired philosophy: earned progression cannot be shortcut with money
- TBH lesson: market economies create server complexity, cheating vectors, and player resentment
- DLC classes expand the game; no one is locked out of content
- Supporter pack is optional, visible, and purely cosmetic

---

## D-005: Offline Rewards Cap at 12 Hours (60% Efficiency)

| Field | Value |
|-------|-------|
| **ID** | D-005 |
| **Date** | 2026-07-22 |
| **Author** | Game Director (AI) |
| **Category** | Idle Mechanics |
| **Status** | **Accepted** |

**Context:**
TBH uses 8-hour offline cap at 50% efficiency. Community noted this was "good but not great" — chests are the primary gear source, and offline gives none.

**Options Considered:**
1. 8 hours at 50% (TBH model)
2. 12 hours at 60% (more generous)
3. 24 hours at 40% (longer cap, less efficient)
4. Unlimited (no cap, but very low efficiency)

**Decision:**
12 hours at 60% efficiency. No chests/gear offline.

**Rationale:**
- 12 hours accommodates a full workday + commute
- 60% (vs TBH's 50%) feels slightly more generous without breaking economy
- No chests/gear preserves the incentive to actively check in
- Healthy cap prevents "never log in" behavior

---

## D-006: PRD-Based Loot with Reset on Death

| Field | Value |
|-------|-------|
| **ID** | D-006 |
| **Date** | 2026-07-22 |
| **Author** | Game Director (AI) |
| **Category** | Loot / Reward |
| **Status** | **Accepted** |

**Context:**
TBH uses a Pseudo-Random Distribution system with a pity timer. Chest drops reset on hero death. Community confirmed this pattern through observation.

**Options Considered:**
1. Pure RNG (true random — can dry streak)
2. PRD with pity timer (TBH model)
3. Fixed schedule (guaranteed drop every N kills)
4. PRD with partial reset on death (new: less punishing)

**Decision:**
PRD with pity timer. Partial reset on death (drop to 50% of accumulated probability, not 0%).

**Rationale:**
- Pure RNG creates frustrating dry streaks
- TBH's full reset on death was reported as punishing
- Partial reset (50%) maintains consequence without destroying progress
- PRD ensures consistent loot feel (players report "fair" drops)

---

## D-007: Weaver Affinity System with Departure Consequences

| Field | Value |
|-------|-------|
| **ID** | D-007 |
| **Date** | 2026-07-22 |
| **Author** | Game Director (AI) |
| **Category** | Character / Relationship |
| **Status** | **Accepted** |

**Context:**
MT's character-driven storytelling is one of its greatest strengths. Characters feel real because they have limits, opinions, and consequences.

**Options Considered:**
1. No relationship system (characters are tools)
2. Simple affinity (bonuses only, no penalty)
3. Affinity with consequences (TBH hybrid)
4. Full relationship system with departure mechanic

**Decision:**
Affinity system (0-100) with gameplay bonuses and departure consequences.

**Rationale:**
- Characters are the heart of the MT-inspired design
- Without consequences, affinity is meaningless
- Departure mechanic (3 days at <15 affinity) creates real stakes
- Recruitable later means no permanent loss, but there's a cost
- Drives engagement with personal quests

---

## D-008: 280 Stages Across 7 Zones (4 Difficulties)

| Field | Value |
|-------|-------|
| **ID** | D-008 |
| **Date** | 2026-07-22 |
| **Author** | Game Director (AI) |
| **Category** | Content / Progression |
| **Status** | **Accepted** |

**Context:**
TBH has 120 stages (3 Acts × 10 stages × 4 difficulties). Community noted "three acts is thin content for players who progress quickly."

**Options Considered:**
1. 3 zones × 10 stages × 4 difficulties = 120 (TBH scale)
2. 7 zones × 10 stages × 4 difficulties = 280
3. 5 zones × 15 stages × 3 difficulties = 225

**Decision:**
7 zones × 10 stages × 4 difficulties = 280 stages at launch.

**Rationale:**
- More zones than TBH addresses the "thin content" criticism
- 7 zones = 7 distinct biomes/visual themes
- 4 difficulties provides replayability without being excessive
- Each zone has a distinct boss with unique mechanics

---

## D-009: 60-Node Attunement Tree per Weaver (Not Shared)

| Field | Value |
|-------|-------|
| **ID** | D-009 |
| **Date** | 2026-07-22 |
| **Author** | Game Director (AI) |
| **Category** | Progression / Customization |
| **Status** | **Accepted** |

**Context:**
TBH has a single 197-node Rune Tree shared across all heroes. This creates a single progression track.

**Options Considered:**
1. Shared tree (TBH model — one progression for all)
2. Per-character trees (each Weaver has their own)
3. Hybrid: shared base tree + per-character specialization

**Decision:**
Per-Weaver attunement trees (60 nodes each). 6 classes × 60 = 360 total nodes.

**Rationale:**
- Per-character trees allow specialized builds (tank tree, DPS tree, support tree)
- Creates meaningful choices per character, not one-size-fits-all
- 60 nodes per character is manageable (vs 197 overwhelming shared tree)
- Respeccing is free initially to encourage experimentation

---

## D-010: Web-Based (TheHUB Integrated) Over Native Desktop App

| Field | Value |
|-------|-------|
| **ID** | D-010 |
| **Date** | 2026-07-22 |
| **Author** | Game Director (AI) |
| **Category** | Platform |
| **Status** | **Accepted** |

**Context:**
TBH is a native Windows desktop app with direct taskbar integration. The game will live inside TheHUB, which runs in a browser.

**Options Considered:**
1. Native app (Electron, Tauri)
2. Pure web (runs in browser as part of TheHUB)
3. Both (web first, native wrapper later)

**Decision:**
Pure web, embedded in TheHUB. Native wrappers considered for v2.0+.

**Rationale:**
- TheHUB is already web-based
- User explicitly wants the game on their website
- postMessage bridge already exists for companion integration
- Web version reaches wider audience (any browser, any OS)
- Performance is acceptable for 2D pixel idle game

---

## D-011: No Steam Market / Real-Money Trading

| Field | Value |
|-------|-------|
| **ID** | D-011 |
| **Date** | 2026-07-22 |
| **Author** | Game Director (AI) |
| **Category** | Economy / Monetization |
| **Status** | **Accepted** |

**Context:**
TBH's Steam Market integration was its standout feature but caused server overload, cheating epidemics, 411 account bans, and market closures.

**Options Considered:**
1. Full market integration (TBH model)
2. Limited trading (friend-to-friend only)
3. No real-money trading
4. Player-to-player item gifting (no money)

**Decision:**
No real-money trading or market. Items are non-transferable.

**Rationale:**
- TBH proved the dark side of market integration: server issues, cheating, bans
- MT-inspired philosophy: progression should be earned, not bought
- Removes entire class of cheating vectors
- Simplifies server architecture (no market sync needed)
- Focus remains on gameplay, not economy speculation

---

## D-012: Auto-Retry and Auto-Chest Unlock Through Attunement

| Field | Value |
|-------|-------|
| **ID** | D-012 |
| **Date** | 2026-07-22 |
| **Author** | Game Director (AI) |
| **Category** | Idle Mechanics / UX |
| **Status** | **Accepted** |

**Context:**
TBH gates auto-retry and auto-loot behind Rune Tree progression. Auto-Retry is toggleable; auto-chest opening requires an unlock.

**Options Considered:**
1. All automation available from start
2. Automation gated behind progression (TBH model)
3. No automation (manual only)

**Decision:**
Gated automation. Auto-Retry unlocked early (Attunement Level 5). Auto-chest unlock at Level 15. Auto-shatter junk at Level 30.

**Rationale:**
- Early gating creates progression goals
- Auto-Retry early prevents frustration (dying and stopping)
- Auto-chest at mid-game (Level 15) gives something to work toward
- Auto-shatter at late-game (Level 30) reduces inventory management burden for veterans
- Each unlock feels rewarding

---

## D-013: 4 Difficulty Tiers with Different Names

| Field | Value |
|-------|-------|
| **ID** | D-013 |
| **Date** | 2026-07-22 |
| **Author** | Game Director (AI) |
| **Category** | Content / Progression |
| **Status** | **Accepted** |

**Context:**
TBH uses Normal → Nightmare → Hell → Torment. These names are generic but carry cultural/religious weight.

**Options Considered:**
1. Same names (Normal/Hard/Expert/Insane)
2. Thematic names (TBH-like)
3. Original aether-themed names

**Decision:**
Original names: Calm → Surge → Storm → Cataclysm

**Rationale:**
- Thematically consistent with aether/weather/energy setting
- Progressive intensity is clear from names alone
- No cultural/religious baggage
- Each name reflects increasing aether instability
- Proper nouns for the world, not generic labels

---

## D-014: No Energy System, No Timers, No Gacha

| Field | Value |
|-------|-------|
| **ID** | D-014 |
| **Date** | 2026-07-22 |
| **Author** | Game Director (AI) |
| **Category** | Retention / Monetization |
| **Status** | **Accepted** |

**Context:**
Many free-to-play idle games use energy systems (stamina), timers (build timers, upgrade timers), or gacha mechanics to drive retention and monetization.

**Options Considered:**
1. Energy system (play X minutes, then wait)
2. Timers (upgrade takes real hours)
3. Gacha (random pulls for characters)
4. No artificial time-gating

**Decision:**
No energy systems, no build timers, no gacha.

**Rationale:**
- TBH has none of these — and succeeds on gameplay alone
- MT would not have energy systems (inconsistent with earned progression)
- Artificial time-gating frustrates players who want to play
- Retention should come from gameplay quality, not artificial scarcity
- DLC classes are the only monetization — no need to push gacha

---

## D-015: Character Departure is Reversible

| Field | Value |
|-------|-------|
| **ID** | D-015 |
| **Date** | 2026-07-22 |
| **Author** | Game Director (AI) |
| **Category** | Character / Consequences |
| **Status** | **Accepted** |

**Context:**
MT's consequences are permanent (Paul dies, Zenith never fully recovers). But in an idle game, permanent character loss would be too punishing.

**Options Considered:**
1. Permanent departure (like MT's deaths)
2. Temporary departure (can be re-recruited)
3. No departure (affinity only affects bonuses)

**Decision:**
Temporary departure. Characters leave when affinity drops too low (3 days <15), but can be re-recruited. Personal quest progress is paused, not lost.

**Rationale:**
- Permanent loss in an idle game creates too much friction for repeat play
- Reversible departure maintains consequence without punishing carelessness too harshly
- Re-recruiting resets affinity to 30 (not zero) — a penalty, not a full restart
- Personal quest progress is saved — respects player investment

---

# II. DECISION SUMMARY TABLE

| ID | Decision | Rationale Summary | Source Inspiration |
|----|----------|-------------------|-------------------|
| 001 | **Direct MT Adaptation** *(revised)* | MT's specific characters and canon relationships are the source of emotional weight; user requested MT loyalty | MT (canon fidelity) |
| 002 | 6 rarity tiers | Avoids frustration of unobtainable tiers | TBH (lessons learned) |
| 003 | 4-member party | Balanced roles, strategic depth | MT (party dynamics) |
| 004 | No P2W | Preserves earned progression integrity | MT (earned growth) |
| 005 | 12h cap @ 60% | Generous but healthy | TBH (improved) |
| 006 | PRD + partial reset | Fair loot feel without punishing death | TBH (improved) |
| 007 | Affinity + departure | Character consequences create weight | MT (relationship depth) |
| 008 | 280 stages | More content than TBH's 120 | TBH (addressed weakness) |
| 009 | Per-weaver skill trees | Specialized builds, meaningful choices | Both |
| 010 | Web-based (TheHUB) | User requirement, platform consistency | TBH (adapted) |
| 011 | No real-money market | Avoids TBH's market problems | TBH (lessons learned) |
| 012 | Gated automation | Natural progression goals | TBH (proven pattern) |
| 013 | Original difficulty names | Thematic consistency, no baggage | MT (worldbuilding) |
| 014 | No energy/gacha/timers | Respects player time, quality retention | Both |
| 015 | Reversible departure | Consequence without permanent punishment | MT (adapted for genre) |

---

*End of Design Decision Log*
