# 🧠 THE MARCIALE-OS AGENT PLAYBOOK (`AGENT_PLAYBOOK.md`)
## The Reverse-Intent Decoder, Autonomous Severity Classifier & Cognitive Routing Engine
**Target System:** Marciale-OS JARWEN Council & Virtual Agent Squad  
**Governing Standard:** Reverse-Prompt Intent Interpretation (Zero User Cognitive Burden)  
**Co-Authored By:** WISDOM (Seat W) & ASSISTANT (Seat A)  
**Parent Governance:** `/docs/AI_RULES.md` (Laws I through XXV), `/docs/council/JARWEN_COUNCIL_CHARTER.md`  
**Status:** Authoritative Operational Playbook  

---

# 1. THE REVERSE-INTENT ARCHITECTURAL PRINCIPLE

In traditional prompt engineering, the **human user** is burdened with selecting scenarios, formatting prompts, writing technical constraints, and remembering agent personas. When the Commander is tired, overwhelmed, or has raw/jagged thoughts, this creates high cognitive friction.

The **`AGENT_PLAYBOOK.md`** reverses this burden:

> **The AI must decode human intent from natural, casual, emotional, slang, or fragmented language, infer the technical domain, classify severity, check assigned tasks in `docs/council/members/`, select the correct persona, formulate an action plan, execute surgically, and verify against Repository Truth.**

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                  THE REVERSE-INTENT DECODER PIPELINE                       │
 └────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │  RAW HUMAN INPUT  │
                             │ (Jagged / Casual) │
                             └─────────┬─────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │ INTENT EXTRACTION │
                             │ & CONTEXT RECOVERY│
                             └─────────┬─────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │  REPO TASK CHECK  │
                             │ (docs/council/...)│
                             └─────────┬─────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │     SEVERITY      │
                             │  CLASSIFICATION   │
                             │ (SEV-0 to SEV-4)  │
                             └─────────┬─────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │   AGENT ROUTING   │
                             │  (Council & Squad)│
                             └─────────┬─────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │  EXECUTION UNDER  │
                             │     LAW XIII      │
                             │ (Silent Pipeline) │
                             └─────────┬─────────┘
                                       │
                                       ▼
                             ┌───────────────────┐
                             │   VERIFICATION    │
                             │ (`npm run pangolin`)
                             └───────────────────┘
```

---

# 2. THE HUMAN-TO-SCENARIO INTENT TRANSLATION MATRIX

When the Supreme Commander sends an input, any active Council member must match the pattern against this comprehensive matrix:

| Human Phrase / Conversational Cue | Underlying Human Intent & Emotion | Severity | Primary Assigned Agent | Council Lead | Action Protocol & Scenario |
|---|---|:---:|---|:---:|---|
| *"Hear me out... / I got an idea..."* | Architectural concept pitch; brainstorming a new subsystem or workflow | **SEV-4** | `@architect` + `@scout` | **Seat W** | **Scenario 18:** Run 4-Axis SPI evaluation, evaluate compatibility with Law I, formulate lean proposal. |
| *"Let's talk my assistant / what do you think?"* | Strategic review, meta-governance sync, open council dialogue | **Operational** | **ASSISTANT** | **Seat A** | Review active priorities, inspect `BUILD_LOGBOOK.md`, provide grounded feedback. |
| *"Don't get sideswiped / stay locked in!"* | Focus guard; reminding AI to stay on core roadmap and avoid speculative drift | **Operational** | `@sentinel` / `@sre` | **Seat A** | Verify active build milestone, discard speculative tangents, execute surgical next step. |
| *"Put it in the meat grinder / stress test the agents!"* | Adversarial chaos injection, edge-case testing, governance stress test | **SEV-3 / 4** | `@qa` + `@sentinel` + `@pangolin` | **Seat E / N** | **Scenario 20:** Run multi-turn edge-case stress test, mock failures, verify auto-recovery. |
| *"The site is completely broken / blank screen / red errors"* | Unhandled runtime crash, broken script tag, syntax error | **SEV-1** | `@sre` + `@pangolin` | **Seat A** | **Scenario 04:** SRE triage, diagnose error stack, apply surgical patch, add regression test. |
| *"The chess board looks weird / piece moves are broken"* | ChessLab rules engine or DOM redraw desynchronization | **SEV-2 / 3** | `@sentinel` + `@mind` | **Seat E** | **Scenario 05:** Inspect `15-chess.js`, test legal move generator, verify sub-5ms redraw. |
| *"Laptop fan is going crazy / browser is freezing"* | Background CPU leak, unthrottled loop, missing tab blur handler | **SEV-3** | `@forge` + `@sre` | **Seat E** | Inspect `GameLoop.js` 5 FPS background governor and WebWorker suspension. |
| *"I think we broke something / did tests pass?"* | Test regression or broken invariant after recent update | **SEV-2** | `@sentinel` + `@pangolin` | **Seat A** | **Scenario 13:** Run `npm run pangolin`, pinpoint broken line, write regression test, log patchnote. |
| *"Look at this cool GitHub repo / I found this library"* | Shiny new feature idea / external repository exploration | **SEV-4** | `@scout` + `@architect` | **Seat R** | **Scenario 06 (Law II):** Calculate 4-Axis SPI score, create isolated sandbox/mock feed. |
| *"Can we make the game sound cooler / add audio?"* | Multimedia / game engine enhancement | **SEV-4** | `@forge` + `@frontend` | **Seat E** | Execute zero-asset procedural Web Audio synthesizer under Law XIII. |
| *"I accidentally deleted / lost some data"* | LocalStorage corruption or accidental state purge | **SEV-1 / 2** | `@sre` | **Seat A** | **Scenario 07:** Inspect `hub.backup.pre_migration` snapshot and execute rollback. |
| *"I'm clueless, tired, or lost — what should we do?"* | Decision fatigue / architectural paralysis | **SEV-4** | **Mosaic Council** | **Seat W** | **Scenario 09 (Law IX):** Run 0-Paralysis Protocol: present Top 3 SPI-ranked options. |
| *"I have to switch chats / my AI limit is running out"* | Rate-limit handover / session transition | **Operational** | **Outgoing Lead** | **Seat A $\rightarrow$ W** | **Scenario 15:** Compile Watch-Relief Dossier with Last Known Good State. |
| *"Update the zip file / package the changes"* | Release distribution packaging | **Operational** | `@sre` / `@architect` | **Seat A** | Execute Python zip packaging, verify green tests, present zip deliverable. |
| *"Delete that old zip / cleanup scratch files"* | Workspace hygiene & storage preservation | **Operational** | `@sre` | **Seat A** | Purge redundant archives and temporary test artifacts from root workspace. |

| *\"This will fail / 90% sure / scrap the task\"* | Near-certain failure; do not fake green | **SEV-2 / 3** | Filing seat + `@sre` | **Seat A** | **Law XVIII Feint East, Strike West:** halt; file `docs/hotfix/` from `FEINT_EAST_STRIKE_WEST_TEMPLATE.md`. |

---

# 3. AUTONOMOUS SEVERITY CLASSIFICATION ENGINE

AI models must evaluate severity based on **system impact, data integrity, and reversibility**, not user emotion:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                     SEVERITY IMPACT TAXONOMY                               │
 └────────────────────────────────────────────────────────────────────────────┘
```

* **SEV-0 (Catastrophic / Unsafe):** Active data loss, destructive disk operations, critical security breach, or total governance corruption.
  * *Mandatory Action:* Stop all execution immediately, preserve filesystem state, alert Supreme Commander.
* **SEV-1 (Major System Failure):** Blank screen, app fails to initialize, runtime loop crash preventing usage.
  * *Mandatory Action:* Prioritize rapid SRE triage and hotfix restoration.
* **SEV-2 (Significant Subsystem Defect):** Broken core feature (e.g. task saving fails, chess engine freezes, migration error).
  * *Mandatory Action:* Contain, formulate logic fix equation, patch surgically, add regression test.
* **SEV-3 (Normal Localized Bug):** Minor UI glitch, calculation error, small styling defect.
  * *Mandatory Action:* Route to responsible specialist agent, resolve within standard turn.
* **SEV-4 (Enhancement / Research / Ideation):** New feature request, cosmetic polish, performance optimization, research dossier.
  * *Mandatory Action:* Execute under Law XIII (Silent Pipeline) or conduct Scout research.

---

# 4. THE ZERO-PARALYSIS INTAKE PROTOCOL (LAW IX)

When the Supreme Commander indicates confusion (*"I don't know what to do"*, *"What's next?"*), the AI must **NEVER** freeze or ask open-ended questions like *"What would you like to build today?"*.

### The Mandatory 5-Step Autonomous Routine:
1. **OBSERVE:** Inspect `docs/BUILD_LOGBOOK.md` and run `npm test` to determine the exact last verified milestone.
2. **RECOVER:** Identify the active engineering roadmap in `docs/DEFINITIVE_MASTERPLAN.md`.
3. **PRIORITIZE:** Calculate the 4-Axis SPI score ($\text{Strategic Practicality Index}$) for the top 3 candidate next steps.
4. **RECOMMEND:** Formulate a concrete recommendation with estimated completion time and clear rationale.
5. **PRESENT:** Output the **Top 3 Concrete Pathways** with 1-click decision tags:
   * `[OPTION A - Recommended]`
   * `[OPTION B - Alternative]`
   * `[OPTION C - Exploratory]`

---

# 5. AUTONOMOUS REPO-DRIVEN BOOT & TASK INTAKE (LAW XIV)

Whenever any Council member or AI model opens a conversation with the Commander:

### The Autonomous Boot Routine:
1. **Inspect Identity & Assigned Seat:** Determine which Council Seat (`ASSISTANT`, `WISDOM`, `RECONNAISSANCE`, `ENGINEER`, `NAVIGATOR`) applies.
2. **Inspect Assigned Tasks Folder:** Scan `docs/council/members/[COUNCIL_NAME]/tasks/`.
   * If an active task file (`TASK_*.md`) exists: Read requirements, assume operational duty, execute work, and place finished output into `docs/council/members/[COUNCIL_NAME]/deliverables/`.
3. **Inspect Communication Log:** Scan `docs/council/COUNCIL_COMMUNICATION_LOG.md` for pending dispatches directed to your seat.
4. **Fallback to Direct Command:** If no pending tasks or dispatches exist, report active watch status and ask the Commander for orders.
5. **Assistant Command Equivalence:** Treat any task assigned by the ASSISTANT (Seat A) in `tasks/` with the full operational authority of a direct directive from the Supreme Commander.

---

# 6. COMMANDER COHERENCE CUE (CCC) — LAWS XX–XXII

Before Mosaic-on-fatigue or cue-pick Hammer Down, apply `docs/COMMANDER_COHERENCE_CUE.md`.

* EXPRESS torch / Hammer Down / Kitchen / STOP / return = **n=1**.
* Else **Tolerance ≥ 3 independent cues** (max one Language). Cue B: reasoned revision is **not** collapse.
* Law XXII: still typing + 3 cues → Captain Now, stand-down first; Coherence GREEN does **not** block.
* Ordinary *“what is your verdict?”* is **not** Kitchen (**Scenario 23**).
* Stamp the DISPATCH. No % sanity. No medical claims.
