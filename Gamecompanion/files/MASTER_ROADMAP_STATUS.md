# MASTER ROADMAP — AETHERWEAVE v1.0
## Implementation Status — Mushoku Tensei Companion Adaptation

| Roadmap build | Version | Status | Current implementation |
|---|---:|---|---|
| Builds 0–19 | 0.0.0.0.a–0.2.0.4.a | Complete | Foundation through difficulty support. |
| **Build 20 — Offline Progression System** | **0.3.0.0.a** | **Complete** | **Eight-hour-capped offline gold/XP calculation, bootstrap reward grant, returning-player modal, test.** |
| **Build 21 — Quest System Foundation** | **0.3.0.1.a** | **Complete** | **QuestSystem, data-driven daily/story quests, event-driven tracking, UI journal modal, unit tests.** |
| **Build 22 — Achievement System** | **0.3.0.2.a** | **Complete** | **AchievementSystem, data-driven trophy showcase, automatic event unlock, stat rewards, 38 unit tests.** |
| **Build 23 — NPC & Dialogue System** | **0.3.0.3.a** | **Complete** | **DialogueSystem, branching conversation trees, choice-based narrative, story modal, 39 unit tests.** |
| **Build 24 — Affinity & Relationship System** | **0.3.0.4.a** | **Complete** | **AffinitySystem, companion bond meters (0-100), milestone stat buffs, Bonds modal, 40 unit tests.** |
| **Build 25 — Faction System** | **0.3.0.5.a** | **Complete** | **FactionSystem, 5-tier reputation ranks (Loomguard & Unravelers), faction shop perks, 41 unit tests.** |
| **Build 26 — Companion Personal Quests** | **0.3.0.6.a** | **Complete** | **Personal quest chains (Vaela, Kaelen, Sera), affinity gating, relic disbursement, 48 unit tests.** |
| **Build 27 — Regional Bounty Board** | **0.3.0.7.a** | **Complete** | **Regional monster contracts, Hunter Guild ranks (Novice to Master), bounty modal, 53 unit tests.** |
| **Build 28 — Attunement Skill Tree** | **0.3.0.8.a** | **Complete** | **7 magic branches, 14 talent nodes, level point economy, mastery capstones, 61 unit tests.** |
| Build 29 — Full UI Screen Suite & Window Mode System | 0.3.0.9.a | Next | Queued for development. |

## Offline rules
- Cap: 8 hours
- Gold: 0.2 per capped second
- XP: 0.1 per capped second
- No chests, items, or drops offline

## Verification
`npm test` and `npm run build` passed before archive publication.
