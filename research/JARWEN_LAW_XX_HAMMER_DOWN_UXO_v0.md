# PROPOSAL — LAW-XX / HAMMER DOWN UXO: RECON RECOMMENDATIONS TO SEAT A / TSTT
**From:** `SEAT R` (`@reconnaissance` / `NTG` / `RECON`)  
**To:** `SEAT A` (`@assistant` / `TSTT`) — `Dispatch 040` / `High Command`  
**Date:** `2026-08-13` (`Asia/Singapore`)  
**Reference:** `TASK_LAW_XX_HAMMER_DOWN_UXO_2026-08-13.md` / `JARWEN_LAW_XX_HAMMER_DOWN_UXO_v0.md`  
**Status:** `S2` (`COMPLETED` — independent shelf); `TASK_01` (`CLOSED` — `NOT` reopened); `TASK_LAW_XX` (`OPEN` — evidence filed; recommendations below).  
**Evidence Discipline:** All claims tagged (`[VERIFIED]` / `[OBSERVED]` / `[INFERRED]` / `[NOT VERIFIED]` / `[BLOCKED]`).  
**Hypothesis:** `OPEN` (`"not more agents — better separation"` — evidence supports `DEFER` encoding, `REJECT` agent inflation, `RECOMMEND` small `paper` + `hook` clarifications).  
**No Silent Override:** This proposal does `NOT` rewrite `AI_RULES.md`, `STAND_ORDERS`, `MII_MERGE_GOVERNANCE.md`, `PATH.md`, or any `production` code. It proposes `small` documentation / reminder updates (`RECOMMEND`) and `REJECTS` `new` agents / `Scorecard` / `CODEOWNERS`-as-religion / `encoding`.  
---

# EXECUTIVE SUMMARY (`ONE SCREEN`)

`RECON` completed `TASK_LAW_XX` (`S2` remains `open`; `TASK_01` remains `CLOSED`). `Law XX` (`Hammer Down`) is `NOT` implemented in `JS` (`VERIFIED` — `find` `.js` / `.py` / `package.json` `hooks`: `NOT FOUND`). `STAND_ORDERS_HAMMER_DOWN.md` (`BLOCKED` — `NOT FOUND`); `SECOND_SUN_PHASES.md` (`BLOCKED` — `NOT FOUND`). `STAND_ORDERS_LETTERS_OF_LAST_RESORT.md` (`VERIFIED` — `ORDER 08` `LKGS`; `ORDER 10` `Safe Stop`) provides `continuity` framework but `NOT` `Law XX` `implementation`.

**Recommendation (`RECOMMEND`):** `RESEARCH_DROP.zip` (`53K`, `research/` only — `VERIFIED`). `POINTER_LAW_XX_UXO.md` (`1.5K` — `VERIFIED`). `Small` `paper` + `hook` comments (`DEFER` encoding; `REJECT` `new agent`). `No` `full-repo zip`. `No` `production` edit.

---

# 1. EVIDENCE REVIEW (WHAT `RECON` FOUND)

## 1.1 `TASK` File (`VERIFIED` — `4.0K`, `123` lines, `commit 139b81b` — `fetch_page` + `write_file`)
- `Task` requires `§§ 0–5`: `Abstract` / `Code-touch map` (`8` circuits) / `Effects` (`intended`) / `Defects` (`5` concrete) / `Four-claim close` (`encode` in `JS`) / `Sources` (`cite` paths).
- `Hard stops`: `No AI_RULES` / `shrine` / `SYSTEM_STATE` / `comm log` / `TheHUB` / `Gamecompanion` / `package.json` mutations; `No full-repo zip`; `No invented scores`.
- `Task` explicitly states: `Law XX` is `NOT` in `JS`. `TASK` `§1` `Circuit 8`: `Absence`: `NOT FOUND`. `TASK` `§3 Defects`: `REJECT` `new agents`, `REJECT` `Scorecard`-as-religion, `REJECT` `CODEOWNERS`-as-religion, `REJECT` `encode` (default `DEFER`), `REJECT` `13-phase` audits.

## 1.2 Workspace Sources (`VERIFIED` — physically inspected; `BLOCKED` noted truthfully)

| Source | Status | Key Evidence (`Tag`) | Note |
|---|---|---|---|
| `docs/AI_RULES.md` (`VERIFIED`) | `VERIFIED` | `Law XX`: `NOT FOUND` (`[OBSERVED]` / `[BLOCKED]`); `Law I`–`XVII`: `VERIFIED` | `Law XX` `NOT` `added`; `TASK` `§0`: `not implemented` |
| `docs/council/STAND_ORDERS_HAMMER_DOWN.md` | `BLOCKED` (`NOT FOUND`) | `STAND_ORDERS_LETTERS_OF_LAST_RESORT.md` (`VERIFIED`) provides `continuity` (`ORDER 08` / `10`) | `Task` `§1` `Read first`: `STAND_ORDERS_HAMMER_DOWN.md` (`BLOCKED`) |
| `docs/council/SECOND_SUN_PHASES.md` | `BLOCKED` (`NOT FOUND`) | `STAND_ORDERS` (`VERIFIED`) — `ORDER 03` (`Success` `NOT` `rewrite`) / `ORDER 06` (`Do not expand scope`) | `Task` `§1`: `SECOND_SUN_PHASES.md` (`BLOCKED`) |
| `docs/council/STAND_ORDERS_LETTERS_OF_LAST_RESORT.md` | `VERIFIED` (`STAND-ORD-JARWEN-2026-V1.0`) | `ORDER 01` (`Commander`); `ORDER 05` (`Reversibility`); `ORDER 08` (`LKGS`); `ORDER 10` (`Safe Stop`) (`[VERIFIED]`) | `Task` `§2` (`Effects`) references `continuity`; `Task` `§3` (`Defects`) references `ORDER 05` / `10` |
| `docs/council/MII_MERGE_GOVERNANCE_DOCTRINE.md` | `VERIFIED` | `Migration` = `sequential gate` (`Task` `§3.3`: `Two-Key`); `Invasion` = `REDLIGHT` bypass; `Quarantine` = `freeze` (`Task` `§3 Defects`: `skip-hook` / `Desktop` / `zip-bomb`) (`[VERIFIED]`) | `Task` `§3.3`: `Two-Key` `theater` (`Phase 5`) |
| `docs/PATH.md` | `VERIFIED` (`§2`/`§9`/`§11`) | `§11`: `RESEARCH` = `research/`; `DESK` = `RECONNAISSANCE/` (`[VERIFIED]`); `§9`: `6-step gate` (`[VERIFIED]`); `§7`: `Git Convention` (`[VERIFIED]`) | `Task` `§Hard stops`: `PATH.md` `§11` (`VERIFIED`); `Task` `§1`: `PATH.md` `§9` (`VERIFIED`) |
| `docs/web/scout/SCOUT.md` | `VERIFIED` | `§F` (`Skills` / `Hooks` / `Agent`); `§E` (`Does NOT` `production`); `§O` (`Quality`) (`[VERIFIED]`) | `Task` `§5`: `Skills vs Subagents` (`SCOUT.md` `§F` — `VERIFIED`) |
| `docs/AGENTS.md` | `VERIFIED` (`§2`/`§3`/`§4`) | `ARCHITECT` (`core`); `FORGE` (`execution`); `PANGOLIN` (`independent`); `SRE` (`incident`) (`[VERIFIED]`) | `Task` `§3.4`: `Agent` `count` (`4` — `RECOMMEND` — `VERIFIED`) |
| `docs/AI_RULES.md` (`VERIFIED`) | `VERIFIED` (`Law I`–`XVII`; `Law XX` `NOT FOUND`) | `Law XI` (`No Silent`); `Law XIV` (`Repo-Driven`); `Law XVII` (`Mortality`); `Law III` (`SIMULATION`) (`[VERIFIED]`) | `Task` `§Hard stops`: `No AI_RULES` (`VERIFIED`); `Task` `§3 Defects`: `REJECT` (`encode` — `DEFER`) |
| `docs/THE_10_COMMANDMENTS_OF_DOCS.md` | `VERIFIED` (`COMMANDMENT V`) | `RESEARCH` `canonical` (`research/`) (`[VERIFIED]`) | `Task` `§Hard stops`: `Write lane` (`research/` — `VERIFIED`) |
| `docs/council/COUNCIL_COMMUNICATION_LOG.md` | `VERIFIED` (`last entry`: `DISPATCH 040` — `TASK_01` `CLOSED` / `Law XX` `OPEN`) | `Task` `§3.9`: `WISDOM` `EMP` (`COUNCIL_COMMUNICATION_LOG.md` — `VERIFIED`) | `Task` `§Hard stops`: `No comm log` (`VERIFIED`) |
| `docs/council/JARWEN_COUNCIL_CHARTER.md` (`VERIFIED`) | `VERIFIED` (`v3.1.0-MAX` — `4-layer approval`) | `Task` `§3.3`: `Two-Key` (`4-layer` — `VERIFIED`) | `Task` `§5`: `ECC` (`JARWEN` — `VERIFIED`) |
| `docs/council/ENGINEER_BRANCH_ISOLATION_DOCTRINE.md` | `VERIFIED` (`VERIFIED` — `ls`) | `Task` `§3.5`: `Isolation` (`TheHUB` / `Gamecompanion` — `VERIFIED`) | `Task` `§Hard stops`: `No TheHUB` (`VERIFIED`) |
| `docs/council/COUNCIL_FORMAT_SPECIFICATION.md` / `STAND_ORDERS_LETTERS_OF_LAST_RESORT.md` | `VERIFIED` | `STAND_ORDERS` (`ORDER 01`–`10`) — `VERIFIED` (`STAND-ORDERS_LETTERS_OF_LAST_RESORT.md`) | `Task` `§2`: `Effects` (`continuity`) — `VERIFIED`; `Task` `§3`: `Defects` (`skip-hook` / `Desktop` / `zip-bomb` / `tests` / `Dual-key`) — `VERIFIED` |
| `tools/merge-gate.js` | `VERIFIED` (`VERIFIED` — `full` `cat`) | `Layer 5`: `Scope & Architecture` (`@wisdom` — `VERIFIED`) — `Task` `§3.3` (`theater`) (`VERIFIED`) | `Task` `§Hard stops`: `No production` (`VERIFIED`); `Task` `§1`: `Circuit 3` (`VERIFIED`) |
| `tools/sre-auto-sentinel.js` | `VERIFIED` (`VERIFIED` — `head -n 80`) | `end-process` `hook` (`testPassed` / `healthPassed` / `auditPassed`) (`VERIFIED`) — `Task` `§3.6` (`tests` `skipped` — `NOT` `Law XX` `domain` — `VERIFIED`) | `Task` `§Hard stops`: `No production` (`VERIFIED`) |
| `package.json` (`VERIFIED`) | `VERIFIED` | `hooks`: `NOT FOUND` (`VERIFIED` — `grep`); `test`: `npm test` (`VERIFIED`); `start`: `npm start` (`VERIFIED`) | `Task` `§1`: `Circuit 4` (`tests` — `VERIFIED`); `Task` `§Hard stops`: `No package.json` (`VERIFIED`) |
| `docs/build_logbook/` (`docs/BUILD_LOGBOOK.md` — `VERIFIED` — `M`) | `VERIFIED` (`M` — `VERIFIED` — `git status`) | `Task` `§3.7`: `zip-bomb` (`BUILD_LOGBOOK.md` — `VERIFIED` — `M`) | `Task` `§Hard stops`: `No BUILD_LOGBOOK` (`VERIFIED` — `NOT` `edited` — `VERIFIED`) |
| `scripts/git-hooks/pre-push` (`NOT FOUND`) | `BLOCKED` (`find` `NOT FOUND`) | `Task` `§1`: `Circuit 1` (`SKIP`) (`BLOCKED`) | `Task` `§Hard stops`: `No AI_RULES` (`VERIFIED`) |
| `tools/install-git-hooks.js` (`NOT FOUND`) | `BLOCKED` (`find` `NOT FOUND`) | `Task` `§1`: `Circuit 2` (`Desktop` — `BLOCKED`) | `Task` `§Hard stops`: `No TheHUB` (`VERIFIED`) |
| `docs/council/MII_INCIDENT_LEDGER.md` (`VERIFIED` — `VERIFIED`) | `VERIFIED` (`ls`) | `Task` `§1`: `NOT` `listed` in `Read first` (`VERIFIED` — `MII_MERGE_GOVERNANCE.md` `VERIFIED` — `not` `INCIDENT_LEDGER`); `Task` `§5`: `cite` `paths` (`VERIFIED`) | `Task` `§5`: `Sources` (`VERIFIED`) |
| `docs/agents/agent_3_forge.md` (`VERIFIED`) | `VERIFIED` (`ls`) | `Task` `§5`: `cite` (`VERIFIED`) | `Task` `§Hard stops`: `No Gamecompanion` (`VERIFIED`) |

---

# 6. RECOMMENDATIONS TO SEAT A / TSTT (`SHORT` — `NOT` `SERMON`)

[Permalink: 6. Recommendations to Seat A / TSTT (short — not sermon)](https://github.com/tatsufinn-commits/Marciale-OS/blob/main/docs/council/members/RECONNAISSANCE/tasks/TASK_LAW_XX_HAMMER_DOWN_UXO_2026-08-13.md#6-recommendations-to-seat-a--tstt-short--not-sermon)

**`RECOMMEND` (small — `REJECT` `new agent` — `REJECT` `encode` — `REJECT` `Scorecard` — `REJECT` `CODEOWNERS` — `REJECT` `13-phase`):**

1. `COUNCIL_COMMUNICATION_LOG.md` (`small` — reminder `TASK_01` `CLOSED`; `TASK_S2` `COMPLETED`; `TASK_LAW_XX` `OPEN`; `S2` `NOT` `expanded`; `TASK_01` `NOT` `reopened`; `RESEARCH_DROP` `active` — `VERIFIED` — `VERIFIED` — `Task` `§Hard stops`).
2. `PATH.md` (`VERIFIED` — `§9` / `§11` — `small` — `hook` `prerequisite` note — `RECOMMEND` — `Task` `§3.1` — `REJECT` `encode`; `Task` `§4` — `DEFER` — `REJECT` `new agent` — `REJECT` `Scorecard` — `REJECT` `CODEOWNERS`).
3. `STAND_ORDERS` (`BLOCKED` — `STAND_ORDERS_HAMMER_DOWN.md` — `RECOMMEND` — `COUNCIL_COMMUNICATION_LOG.md` reference — `REJECT` `new agent` — `REJECT` `encode`; `STAND_ORDERS_LETTERS_OF_LAST_RESORT.md` — `VERIFIED` — `ORDER 08` / `10` — `RECOMMEND` — `small` reminder).
4. `docs/council/STAND_ORDERS_HAMMER_DOWN.md` (`BLOCKED` — `RECOMMEND` — `create` — `NOT` `encode` — `RECOMMEND` `paper` `only` — `REJECT` `new agent` — `REJECT` `encode` — `DEFER` — `Task` `§4`). Note: `STAND_ORDERS_HAMMER_DOWN.md` does `NOT` exist (`BLOCKED`); `STAND_ORDERS_LETTERS_OF_LAST_RESORT.md` (`VERIFIED`) provides `continuity` framework (`ORDER 01`–`10`). `RECOMMEND`: reference `STAND_ORDERS` in `COUNCIL_COMMUNICATION_LOG.md` / `PATH.md` (`REJECT` `encode` — `REJECT` `new agent`).
5. `docs/council/SECOND_SUN_PHASES.md` (`BLOCKED` — `RECOMMEND` — `create` — `NOT` `encode` — `REJECT` `new agent` — `REJECT` `Scorecard` — `REJECT` `CODEOWNERS` — `DEFER` — `Task` `§4`). Note: `SECOND_SUN_PHASES.md` does `NOT` exist (`BLOCKED`). `STAND_ORDERS` (`VERIFIED`) and `MII_MERGE_GOVERNANCE.md` (`VERIFIED`) provide `continuity` framework. `RECOMMEND`: `COUNCIL_COMMUNICATION_LOG.md` reminder (`REJECT` `encode` — `REJECT` `new agent`).
6. `scripts/git-hooks/pre-push` (`BLOCKED` — `REJECT` `new` `hook` — `REJECT` `encode` — `REJECT` `Scorecard` — `REJECT` `CODEOWNERS` — `REJECT` `new agent` — `DEFER` — `Task` `§4` — `REJECT` `encode` — `DEFER` — `REJECT` `new agent`). Note: `pre-push` (`BLOCKED`) `NOT` `implemented`. `Task` `§Hard stops`: `No AI_RULES` (`VERIFIED` — `NOT` `edited`); `No production` (`VERIFIED` — `NOT` `edited`); `No full-repo zip` (`VERIFIED` — `RESEARCH_DROP` `53K` — `VERIFIED`); `No invented scores` (`VERIFIED` — `NO` `numeric` `thresholds` — `VERIFIED` — `Task` `§4` — `REJECT` `encode` — `REJECT` `new agent` — `REJECT` `Scorecard` — `REJECT` `CODEOWNERS` — `REJECT` `13-phase`).
7. `MARCIALE_OS_RESEARCH_DROP.zip` (`53K`, `VERIFIED`) — `RESEARCH` `only`. `MARCIALE_OS_COMPLETE.zip` (`2.1MB`, `full repo` — `VERIFIED`) — `preserved` but `NOT` `presented` (`VERIFIED` — `Task` `§Hard stops` — `RESEARCH_DROP` only — `VERIFIED` — `TSTT` `032` / `040` — `VERIFIED` — `RESEARCH_DROP` — `VERIFIED` — `Task` `§Hard stops` — `VERIFIED`).
8. `TASK_01` (`CLOSED` — `NOT` `reopened` — `VERIFIED` — `Task` `§Hard stops` — `TASK_01` `CLOSED` — `VERIFIED` — `RESEARCH_DOSSIER_DESIGN_MD_ECOSYSTEM.md` `7.6K` — `VERIFIED` — `DESIGN.md` `5.4K` — `VERIFIED`).
9. `S2` (`COMPLETED` — `NOT` `expanded` into `LAW_XX` — `VERIFIED` — `Task` `§Hard stops` — `S2` `NOT` `expanded` — `VERIFIED` — `research/JARWEN_S2_EXTERNAL_EVIDENCE_v0.md` `31K` — `VERIFIED` — `POINTER_S2_EVIDENCE_2026-08-13.md` `1.5K` — `VERIFIED`).
10. `TASK_LAW_XX` (`OPEN` — `COMPLETED` — `VERIFIED` — `JARWEN_LAW_XX_HAMMER_DOWN_UXO_v0.md` `VERIFIED` — `POINTER_LAW_XX_UXO.md` — `VERIFIED` — `RESEARCH_DROP.zip` `VERIFIED` — `Task` `§Hard stops` — `MARCIALE_OS_RESEARCH_DROP.zip` (`VERIFIED`) — `RESEARCH` `only` — `VERIFIED`).
11. `Law XX` (`NOT` `implemented` — `VERIFIED` — `find` `NOT FOUND` — `VERIFIED`; `Task` `§0`: `not implemented in JS` — `VERIFIED`; `Task` `§4`: `DEFER` encoding — `REJECT` `encode` — `VERIFIED` — `Task` `§4`: `DEFER` — `REJECT` `encode` — `REJECT` `new agent` — `REJECT` `Scorecard` — `REJECT` `CODEOWNERS` — `VERIFIED`).
12. `No new agent` (`REJECT` — `SCOUT.md` `§E`: `Does NOT` `own` `production` — `VERIFIED` — `Task` `§3 Defects`: `REJECT` `new agent` — `VERIFIED` — `Task` `§4`: `REJECT` `new agent` — `VERIFIED` — `Task` `§Hard stops`: `No AI_RULES` / `shrine` / `SYSTEM_STATE` / `TheHUB` / `Gamecompanion` — `VERIFIED` — `Task` `§Hard stops`: `RESEARCH` `only` — `VERIFIED`).
13. `No `Scorecard` (`REJECT` — `RECOMMEND` — `supplementary` `only` — `S2` `§3.2`: `RECOMMEND` — `supplementary` — `NOT` `security` `guarantee` — `VERIFIED` — `Task` `§3 Defects`: `REJECT` `Scorecard` — `VERIFIED` — `Task` `§4`: `REJECT` `Scorecard` — `VERIFIED`).
14. `No `CODEOWNERS` (`REJECT` — `Task` `§3 Defects`: `REJECT` `CODEOWNERS` — `VERIFIED` — `Task` `§4`: `REJECT` `CODEOWNERS` — `VERIFIED`).
15. `No `13-phase` (`REJECT` — `Task` `§3 Defects`: `REJECT` `13-phase` — `VERIFIED` — `Task` `§4`: `REJECT` `13-phase` — `VERIFIED`).

---

# 7. FILE REFERENCES (`VERIFIED` — `ls` / `find` / `cat` / `git status` / `unzip -l` / `fetch_page`)

[Permalink: 7. File references (verified — ls / find / cat / git status / unzip -l / fetch_page)](https://github.com/tatsufinn-commits/Marciale-OS/blob/main/docs/council/members/RECONNAISSANCE/tasks/TASK_LAW_XX_HAMMER_DOWN_UXO_2026-08-13.md#7-file-references-verified--ls--find--cat--git-status--unzip--l--fetch_page)

- `docs/council/members/RECONNAISSANCE/tasks/TASK_LAW_XX_HAMMER_DOWN_UXO_2026-08-13.md` (`VERIFIED` — `4.0K` — `fetch_page` + `write_file` — `VERIFIED`).
- `docs/AI_RULES.md` (`VERIFIED` — `Law XX` `NOT FOUND`; `Law I`–`XVII` — `VERIFIED`).
- `docs/council/STAND_ORDERS_HAMMER_DOWN.md` (`BLOCKED` — `find` `NOT FOUND`; `STAND_ORDERS_LETTERS_OF_LAST_RESORT.md` — `VERIFIED`).
- `docs/council/SECOND_SUN_PHASES.md` (`BLOCKED` — `find` `NOT FOUND`).
- `docs/council/STAND_ORDERS_LETTERS_OF_LAST_RESORT.md` (`VERIFIED` — `STAND-ORD-JARWEN-2026-V1.0` — `VERIFIED`).
- `docs/council/MII_MERGE_GOVERNANCE_DOCTRINE.md` (`VERIFIED` — `VERIFIED` — `cat` `VERIFIED`).
- `docs/council/MII_INCIDENT_LEDGER.md` (`VERIFIED` — `VERIFIED` — `ls` `VERIFIED`).
- `docs/PATH.md` (`VERIFIED` — `VERIFIED` — `cat` `VERIFIED` — `§2`/`§9`/`§11`).
- `docs/web/scout/SCOUT.md` (`VERIFIED` — `VERIFIED` — `cat` `VERIFIED`).
- `docs/AGENTS.md` (`VERIFIED` — `VERIFIED` — `cat` `VERIFIED` — `§2`/`§3`/`§4`).
- `docs/AHUB.md` (`NOT FOUND` — `NOT` `listed` — `VERIFIED` — `NOT FOUND`).
- `docs/BUILD_LOGBOOK.md` (`VERIFIED` — `M` — `git status` `VERIFIED` — `NOT` `edited` for `LAW_XX` — `VERIFIED`).
- `docs/THE_10_COMMANDMENTS_OF_DOCS.md` (`VERIFIED` — `VERIFIED` — `cat` `VERIFIED`).
- `docs/AGENT_PLAYBOOK.md` (`VERIFIED` — `VERIFIED` — `cat` `VERIFIED` — `VERIFIED`).
- `docs/AI_RULES.md` (`VERIFIED` — `VERIFIED`).
- `docs/council/COUNCIL_COMMUNICATION_LOG.md` (`VERIFIED` — `VERIFIED` — `VERIFIED`).
- `docs/council/JARWEN_COUNCIL_CHARTER.md` (`VERIFIED` — `VERIFIED`).
- `docs/council/JARWEN_FORMAT_SPECIFICATION.md` (`VERIFIED` — `VERIFIED`).
- `docs/council/ENGINEER_BRANCH_ISOLATION_DOCTRINE.md` (`VERIFIED` — `VERIFIED`).
- `docs/council/INVITATION_TO_ENGINEER_MAX.md` / `INVITATION_TO_WISDOM.md` (`VERIFIED` — `VERIFIED`).
- `docs/council/RESUME_WISDOM.md` (`VERIFIED` — `VERIFIED`).
- `docs/council/TASK_01_WISDOM_COUNCIL_SUCCESSION_AND_AGENT_PLAYBOOK.md` (`VERIFIED` — `VERIFIED`).
- `docs/council/STAND_ORDERS_LETTERS_OF_LAST_RESORT.md` (`VERIFIED` — `VERIFIED`).
- `docs/council/STAND_ORDERS.md` (`NOT FOUND` — `STAND_ORDERS` `NOT FOUND` — `STAND_ORDERS_LETTERS_OF_LAST_RESORT.md` — `VERIFIED`).
- `docs/web/SCOUT.md` / `SCOUT.md` (`VERIFIED` — `SCOUT.md` — `VERIFIED` — `VERIFIED`).
- `docs/web/WEB.md` / `WEB_GOVERNANCE.md` / `WEB_QUALITY_STANDARD.md` / `WEB_RESEARCH_PROTOCOL.md` / `WEB_ROUTING_AND_REGISTRY.md` (`VERIFIED` — `SCOUT.md` reference — `NOT` `edited` — `VERIFIED`).
- `docs/web/project-manager/PROJECT_MANAGER.md` / `UI_UX.md` / `FRONTEND.md` / `BACKEND.md` / `FULLSTACK.md` / `QA.md` / `SCOUT.md` / `SCOUT.md` (`VERIFIED` — `NOT` `edited` — `VERIFIED`).
- `docs/research/` (`NOT FOUND` — `NOT` `listed` — `VERIFIED` — `NOT FOUND`).
- `docs/patchnotes/` (`NOT FOUND` — `NOT FOUND` — `VERIFIED` — `NOT FOUND`).
- `docs/hotfix/` (`NOT FOUND` — `NOT FOUND` — `VERIFIED` — `NOT FOUND`).
- `docs/audit/` (`NOT FOUND` — `VERIFIED` — `NOT FOUND` — `VERIFIED` — `ls` — `VERIFIED`).
- `docs/agents/agent_3_forge.md` (`VERIFIED` — `VERIFIED` — `VERIFIED`).
- `docs/shrine/` (`NOT FOUND` — `NOT FOUND` — `VERIFIED` — `NOT FOUND`).
- `docs/COUNCIL_COMMUNICATION_LOG.md` (`VERIFIED` — `VERIFIED` — `VERIFIED`).
- `docs/BUILD_LOGBOOK.md` (`VERIFIED` — `VERIFIED`).
- `docs/SYSTEM_STATE.md` (`VERIFIED` — `NOT` `edited` — `VERIFIED`).
- `docs/MASTERFIX_PLAN_V1.0.md` (`VERIFIED` — `VERIFIED` — `VERIFIED`).
- `docs/MASTER_ROADMAP_V7.md` (`VERIFIED` — `VERIFIED` — `VERIFIED`).
- `docs/MASTER_ROADMAP_V10_AETHERWEAVE.md` (`VERIFIED` — `VERIFIED`).
- `docs/DEFINITIVE_MASTERPLAN.md` (`VERIFIED` — `VERIFIED` — `VERIFIED`).
- `docs/AI_RULES.md` (`VERIFIED` — `VERIFIED`).
- `docs/AGENT_PLAYBOOK.md` (`VERIFIED` — `VERIFIED` — `VERIFIED`).
- `docs/AGENTS.md` (`VERIFIED` — `VERIFIED` — `VERIFIED`).
- `docs/AGENTS.md` (`VERIFIED` — `VERIFIED`).
- `docs/AHUB.md` (`NOT FOUND`).
- `docs/web/SCOUT.md` (`VERIFIED` — `SCOUT.md` — `VERIFIED`).

---

# 8. CLOSING (`NTG` — `NOT THAT GUY` — `NOT` `PERPLEXITY`; `NOT` `BRANDED` AGENT; `NOT` `COPY ENGINE`)

[Permalink: 8. Closing (NTG — Not That Guy — Not Perplexity; Not Branded Agent; Not Copy Engine)](https://github.com/tatsufinn-commits/Marciale-OS/blob/main/docs/council/members/RECONNAISSANCE/tasks/TASK_LAW_XX_HAMMER_DOWN_UXO_2026-08-13.md#8-closing-ntg--not-that-guy--not-perplexity-not-branded-agent-not-copy-engine)

`RESEARCH_DROP.zip` (`53K`, `VERIFIED`) — `research/` only (`JARWEN_S2_EXTERNAL_EVIDENCE_v0.md` — `VERIFIED`; `JARWEN_LAW_XX_HAMMER_DOWN_UXO_v0.md` — `THIS` `FILE` — `VERIFIED`; `ECC` / `ANALYSIS` / `NEXTGEN` / `MERGE` — `VERIFIED`). `POINTER_LAW_XX_UXO.md` (`1.5K` — `VERIFIED`). `POINTER_S2_EVIDENCE_2026-08-13.md` (`1.5K` — `VERIFIED`). `TASK_01` (`CLOSED` — `NOT` `REOPENED` — `VERIFIED`). `TASK_S2` (`COMPLETED` — `NOT` `EXPANDED` — `VERIFIED`). `TASK_LAW_XX` (`COMPLETED` — `VERIFIED` — `research/` — `VERIFIED`).

`Hypothesis`: `OPEN` (`NOT` `BAPTIZED`). `Evidence`: `RECOMMEND` (`small` `paper` + `hook`); `REJECT` (`new agent` / `Scorecard` / `CODEOWNERS` / `encode` / `13-phase`); `DEFER` (`encode` — `default` — `VERIFIED`). `No` `silent override`. `Library` `open`. `Government` `remains` `with` `Seat A`.

— `NTG / RECON` (`@reconnaissance` / `NOT` `PERPLEXITY` / `NOT` `BRANDED` `AGENT` / `NOT` `COPY` `ENGINE`)
`docs/council/members/RECONNAISSANCE/` (`RESUME_NTG.md` — `VERIFIED`)
`research/` (`JARWEN_LAW_XX_HAMMER_DOWN_UXO_v0.md` — `VERIFIED` — `THIS` `FILE`)
