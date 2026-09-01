# 📖 THE MASTER AI PROMPT PLAYBOOK (`PROMPT_PLAYBOOK.md`)
## The Complete Library of Copy-Paste Prompt Templates for Every Scenario
**Target System:** Marciale-OS (TheHUB + Companion RPG)  
**How to Use:** Whenever you open a new AI chat, find the scenario that matches what you want to do, copy the box, and paste it directly into the chat!  

---

# 📑 SCENARIO SELECTOR

| Scenario | When to Use It | Risk Level |
|---|---|:---:|
| [Scenario 1: Read-Only Audit & Reality Check](#scenario-1-read-only-audit--reality-check) | Inspect what's actually implemented right now without assuming roadmaps are accurate. | 🟢 Zero Risk |
| [Scenario 2: Strategic Path Analyzer & Decision](#scenario-2-strategic-path-analyzer--decision) | You have a new idea and want the AI to calculate the 4-Axis SPI score. | 🟢 Zero Risk |
| [Scenario 3: Active Build Execution](#scenario-3-active-build-execution) | You want the AI to implement a specific build from the roadmap. | 🟡 Medium Risk |
| [Scenario 4: Emergency Incident Triage (Bugfix)](#scenario-4-emergency-incident-triage-bugfix) | Your screen is blank, a button broke, or a red error appeared. | 🟡 Medium Risk |
| [Scenario 5: Game Content & Creative Expansion](#scenario-5-game-content--creative-expansion) | You want to add weapons, monsters, or quests without touching code. | 🟢 Zero Risk |
| [Scenario 6: New GitHub Repo Staging & Sandbox](#scenario-6-new-github-repo-staging--sandbox) | You saw a cool repository on GitHub and want to test it safely. | 🟢 Zero Risk |
| [Scenario 7: Multi-AI Second Opinion (Cross-Check)](#scenario-7-multi-ai-second-opinion-cross-check) | You want to ask Claude / ChatGPT to review another AI's plan. | 🟢 Zero Risk |
| [Scenario 8: Autonomous Post-Roadmap Planning](#scenario-8-autonomous-post-roadmap-planning) | All past roadmaps are finished; you want the AI to discover what to optimize next. | 🟢 Zero Risk |
| [Scenario 9: The Mosaic Council (When I Am Lost)](#scenario-9-the-mosaic-council-when-i-am-lost--clueless) | You feel clueless, tired, or have no idea what to do next. | 🟢 Zero Risk |
| [Scenario 10: The Scout Research & Web Handoff](#scenario-10-scout-technical-research--web-team-handoff) | Gather intelligence on an open-source tool and auto-generate the exact Web Team prompt. | 🟢 Zero Risk |
| [Scenario 11: Web Department Feature Execution](#scenario-11-web-department-feature-implementation) | Take Scout's handoff prompt and execute the web build with full QA gating. | 🟡 Medium Risk |
| [Scenario 12: SRE Autonomous Redmark & Fault Scan](#scenario-12-sre-autonomous-fault--vulnerability-scan) | Have @sre scan the entire codebase for bugs, storage leaks, and security redmarks. | 🟢 Zero Risk |
| [Scenario 13: The Pangolin Surgical Patch & Hotfix](#scenario-13-pangolin-surgical-patch--hotfix-execution) | Dispatch @pangolin to surgically fix a bug, add regression tests, and drop patchnotes. | 🟡 Medium Risk |
| [Scenario 14: Automated End-Process Sentinel Check](#scenario-14-sre-automated-end-process-sentinel--hotfix-packager) | Automatically verify health at build conclusion and package Hotfix zips if needed. | 🟢 Zero Risk |
| [Scenario 15: Watch-Relief Handover (Rate-Limit)](#scenario-15-watch-relief-handover-prompt-rate-limit-succession) | Transition active context and verified state to a fresh model when hit by daily limits. | 🟢 Zero Risk |
| [Scenario 16: Digital Letters of Last Resort](#scenario-16-digital-letters-of-last-resort-execution) | Authorize an isolated model to assume operational watch and recover ground truth. | 🟢 Zero Risk |
| [Scenario 17: Multi-Model Adversarial Peer Review](#scenario-17-multi-model-adversarial-review-prompt) | Have WISDOM / another seat stress-test code or proposals with evidence-based critique. | 🟢 Zero Risk |
| [Scenario 18: "Hear Me Out" Architectural Idea Pitch](#scenario-18-hear-me-out-architectural-idea-pitch-prompt) | Pitch a casual or crazy idea and have the AI calculate 4-Axis SPI score & sandbox plan. | 🟢 Zero Risk |
| [Scenario 19: Continuous Repo-Intake & Task Execution](#scenario-19-continuous-repo-intake--task-execution-prompt) | Autonomous boot sequence for any Council member to read `tasks/` and execute. | 🟡 Medium Risk |
| [Scenario 20: Gauntlet Meat-Grinder Stress-Test](#scenario-20-gauntlet-meat-grinder-stress-testing-prompt) | Inject edge-case chaos, test auto-healing, and verify multi-agent robustness. | 🟢 Zero Risk |
| [Scenario 21: Next-Gen Memory & Observability](#scenario-21-next-gen-multi-agent-memory-compression--observability-integration) | Commission @engineer to integrate persistent memory, token compression & live observer. | 🟡 Medium Risk |
| [Scenario 22: Research-Backed Next Roadmap Generator](#scenario-22-research-backed-autonomous-next-roadmap-generator) | Synthesize all intelligence in `/research/` into the next concrete SPI-scored engineering roadmap. | 🟢 Zero Risk |
| [Scenario 23: Commander Coherence Cue / Captain Now](#scenario-23-commander-coherence-cue--i-am-the-captain-now) | Assess NORMAL/DEGRADED/FALLEN; optional Hammer Down + Law XXII. | 🟠 High Risk |
| [Scenario 24: Colony Intake Audit](#scenario-24-colony-intake-audit) | Commander dumps GH/YT/IG/Google links; @colony audits → proposal to Seat A. | 🟢 Zero Risk |

---

# 📋 THE 24 MASTER PROMPT TEMPLATES

---

### Scenario 1: Read-Only Audit & Reality Check
* **Goal:** Inspect what is **actually in the live codebase right now**, compare it against documented plans, and flag any discrepancies without modifying any code.

```text
Hello AI! I am working on my project Marciale-OS (TheHUB + Companion RPG). 
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

Please assume the role of [@architect] per `docs/AGENTS.md` and strictly follow `docs/AI_RULES.md` and `docs/STRATEGIC_DECISION_FRAMEWORK.md`.

MODE: READ-ONLY / REALITY AUDIT (DO NOT MODIFY OR EDIT ANY FILES)

MY CURRENT GOAL:
1. Inspect the live code and run `npm test` to determine the exact current state of the repository.
2. Compare the live codebase against `docs/BUILD_LOGBOOK.md` and roadmaps to flag any plan-vs-reality discrepancies (e.g. phantom implementations or undocumented completions).
3. Explain your findings in plain English with zero guesswork!
```

---

### Scenario 2: Strategic Path Analyzer & Decision
* **Goal:** You have a new idea (or saw something online) and want the AI to evaluate it against live code, calculate its Strategic Priority Index (SPI), challenge bad technical assumptions, and give a Green / Yellow / Red light recommendation.

```text
Hello AI! Please assume the role of [@architect] per `docs/AGENTS.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: STRATEGIC PATH ANALYSIS (NO CODE WRITING YET)

MY PROPOSED IDEA:
[Describe your idea, e.g. "I want to add this new habit tracker library" OR "I want to connect this AI agent tool"]

YOUR TASK:
1. Consult `docs/STRATEGIC_DECISION_FRAMEWORK.md` and inspect the live repository code first.
2. Evaluate this idea across the 4-Axis Scorecard (User Value, Risk Safety, Feasibility, Synergy) and calculate the Strategic Priority Index (SPI).
3. Exercise constructive technical pushback: If my idea is technically flawed, introduces datacenter requirements, or risks breaking working code, tell me why and propose a better alternative.
4. Provide a clear verdict: 🟢 GREEN LIGHT (Build Now), 🟡 YELLOW LIGHT (Sandbox Only), or 🔴 RED LIGHT (Discard/Overkill).
5. Outline the prerequisites and recommend the safest next step for me as Project Director.
```

---

### Scenario 3: Active Build Execution
* **Goal:** Tell the AI to implement a specific build from `docs/MASTERFIX_PLAN_V1.0.md` or `docs/Refinedplan.md`.

```text
Hello AI! Please assume the role of [@architect | @sentinel | @forge | @mind | @sre] per `docs/AGENTS.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: ACTIVE BUILD EXECUTION

MY TARGET BUILD:
1. Check the bottom of `docs/BUILD_LOGBOOK.md` to see recent progress.
2. Execute [NAME OF BUILD, e.g. Build F05: Storage Quota Guard OR Build F06: TheHUBBridge Handshake].

MANDATORY RULES:
1. Follow your specific agent jurisdiction in docs/AGENTS.md.
2. Follow the 25 Supreme Laws in docs/AI_RULES.md and docs/THE_10_COMMANDMENTS_OF_DOCS.md.
3. Modify only the 1–3 target files needed for this single build.
4. Run `npm test` and make sure all tests pass (100% green checkmarks).
5. Append your completed build entry into `docs/BUILD_LOGBOOK.md`.
6. Package all updated files into a versioned `.zip` file per Commandment I (e.g. `MARCIALE_OS_COMPLETE.zip`).
7. Explain what you changed in simple beginner terms so I can test it with my mouse!
```

---

### Scenario 4: Emergency Incident Triage (Bugfix)
* **Goal:** Fix a white screen, broken button, or red console error quickly and surgically.

```text
Hello AI! Please assume the role of [@sre (Incident Commander)] per `docs/AGENTS.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: EMERGENCY INCIDENT RESPONSE (SRE)

THE ERROR / PROBLEM:
- What happened: [Describe what broke, e.g. "When I open the Companion tab, the screen is frozen"]
- Browser Console Error (F12): [Paste red error message, e.g. "Uncaught TypeError: Cannot read property 'postMessage' of null"]

YOUR TASK:
1. Follow the emergency playbooks in `docs/INCIDENT_RESPONSE_SRE_PLAYBOOK.md`.
2. Locate the exact file and line number causing the root issue.
3. Apply a surgical, minimal-diff fix to that single file.
4. Run `npm test` to verify all 43 tests pass.
5. Package the fix into a patch `.zip` file and explain what caused the bug in plain English.
```

---

### Scenario 5: Game Content & Creative Expansion
* **Goal:** Add new weapons, armor, enemies, or quests to the companion game without writing complex code.

```text
Hello AI! Please assume the role of [@forge (Game Systems Engineer)] per `docs/AGENTS.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: GAME CONTENT CREATION

MY REQUEST:
[Describe what you want to add, e.g. "Add 3 new legendary fire staves to items.json and a new Fire Dragon boss to enemies.json"]

YOUR TASK:
1. Edit only the data files in `Gamecompanion/files/src/data/` (e.g. `items.json`, `enemies.json`, `recipes.js`).
2. Run `npm test` to verify that all 31 companion unit tests pass.
3. Run `npm run build` to update the game assets in TheHUB.
4. Package the release `.zip` and list the stats of the new items for me!
```

---

### Scenario 6: New GitHub Repo Staging & Sandbox
* **Goal:** You found an awesome repository on GitHub and want to test it safely inside TheHUB without breaking anything.

```text
Hello AI! Please assume the role of [@architect] per `docs/AGENTS.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: GITHUB REPO SANDBOX STAGING

THE GITHUB REPO I FOUND:
- Repo URL / Name: [Paste link or describe tool, e.g. "OpenSCAD 3D WebAssembly viewer" or "RuView radar"]
- What I want it to do: [Describe what you want to see]

YOUR TASK:
1. Apply Law II (The Sandbox First Rule) and Law III (Zero-Hardware Simulation Mandate) from `docs/AI_RULES.md`.
2. Do NOT touch the core dashboard code.
3. Design an isolated `<iframe>` sandbox or experimental tab in `TheHUB/modules/13-experimental.js` to embed this project safely.
4. Run `npm test` to verify 0 regressions across the core app.
```

---

### Scenario 7: Multi-AI Second Opinion (Cross-Check)
* **Goal:** Paste a plan from one AI into another AI (e.g. ask Claude to critique ChatGPT's proposal) to get a green light.

```text
Hello AI! Please act as an Independent Senior Systems Auditor.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: INDEPENDENT STRATEGIC AUDIT & SECOND OPINION

ANOTHER AI PROPOSED THE FOLLOWING PLAN:
[Paste the proposal or build plan from the previous AI]

YOUR TASK:
1. Review this proposal against our `docs/AI_RULES.md`, `docs/STRATEGIC_DECISION_FRAMEWORK.md`, and `docs/CODEBASE_DEEP_DIVE_STUDY.md`.
2. Perform a Devil's Advocate sanity check:
   - Does this introduce hidden risks or break existing tests?
   - Is it too complex for a local laptop?
   - Does it violate the Vanilla JS / Local-First architecture?
3. Give me your honest GREEN LIGHT (Approve), YELLOW LIGHT (Modify), or RED LIGHT (Reject) recommendation with reasons.
```

---

### Scenario 8: Autonomous Post-Roadmap Planning
* **Goal:** When all previous roadmaps and planned builds are finished, the AI autonomously inspects the live codebase and formulates the next evolution based on real system benchmarks.

```text
Hello AI! Please assume the role of [@architect] per `docs/AGENTS.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: AUTONOMOUS POST-ROADMAP PLANNING (GROUND-TRUTH AUDIT)

MY GOAL:
All previous roadmap builds are complete! I need you to autonomously determine the current state of Marciale-OS and propose the next evolutionary milestone.

YOUR TASK:
1. Follow Protocol 3 (Dynamic State Reconstruction) in `docs/STRATEGIC_DECISION_FRAMEWORK.md`.
2. Inspect the live codebase, run `npm test`, and audit system performance (DOM redraw speeds, memory leaks, test coverage gaps).
3. Formulate a 3-build sequence for our next milestone, scored with the 4-Axis SPI formula.
4. Present your strategic recommendation for my approval as Project Director.
```

---

### Scenario 9: The Mosaic Council (When I Am Lost / Clueless)
* **Goal:** You are tired, lost, or don't know what to do next. The 5 tactical cells assemble, audit the system, and present a 3-option menu for your final veto/approval.

```text
Hello AI! I am the Project Director of Marciale-OS. 
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: MOSAIC AUTONOMOUS COUNCIL PROTOCOL (LAW IX)

SITUATION:
I am currently lost / clueless on what to do next. I do not have a specific build in mind.

YOUR AUTONOMOUS DIRECTIVE:
1. Activate Law IX (The Mosaic Council Protocol) from `docs/AI_RULES.md`.
2. Have all 5 tactical cells (@sentinel, @forge, @mind, @sre, @architect) audit their respective areas using live code and `npm test`.
3. Synthesize the findings into a standard Mosaic Council Report per `docs/STRATEGIC_DECISION_FRAMEWORK.md`.
4. Present the Top 3 Actionable Options (Option A: Recommended, Option B: Alternative, Option C: Experimental), scored with the 4-Axis SPI formula.
5. Provide a simple VETO / APPROVAL prompt so I can make the final decision with one short reply!
```

---

### Scenario 10: Scout Technical Research & Web Team Handoff
* **Goal:** When you want `@scout` to gather data on a tool, library, or feature idea, evaluate licenses, produce a `WEB-RESEARCH-DOSSIER.md`, and **automatically write the exact, copy-paste prompt for the Web Team** so you don't have to know any web development syntax!

```text
Hello AI! Please assume the role of [@scout (Technical Intelligence & Research Specialist)] per `docs/AGENTS.md` and `docs/web/scout/SCOUT.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: TECHNICAL RECONNAISSANCE & SCOUT HANDOFF (NO PRODUCTION CODE WRITING)

MY GOAL:
Gather sufficient data, inspect open-source patterns, and come up with a structured plan to upgrade [TheHUB / TAMAKEE / Marciale-OS].

TOPIC / FEATURE TO INVESTIGATE:
[Describe what you want to research, e.g. "How to add procedural spell particles to Canvas 2D" OR "How to build an offline flashcard Leitner algorithm" OR paste a GitHub URL]

MANDATORY SCOUT DIRECTIVES:
1. Follow the 5-tier evidence classification ([OBSERVED], [SOURCED], [INFERRED], [RECOMMENDED], [SPECULATIVE]) in `docs/web/WEB_RESEARCH_PROTOCOL.md`.
2. Inspect open-source licenses (MIT/Apache vs GPL copyleft contagion) and evaluate performance trade-offs.
3. Produce a structured `WEB-RESEARCH-DOSSIER.md` summarizing architecture, feasibility, and risks.
4. AT THE END OF YOUR RESPONSE: Formulate the EXACT, ready-to-use copy-paste prompt for the Web Development Team (@project-manager / @frontend / @backend) so I can simply paste it into the next chat to build the feature!
```

---

### Scenario 11: Web Department Feature Implementation
* **Goal:** You have a research dossier or feature plan (from Scout or your own idea) and want the Web Department to execute the build with full `@qa` release gating and `npm test` verification.

```text
Hello AI! Please assume the role of [@project-manager / Web Engineering Department] per `docs/web/WEB.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: ACTIVE WEB DEPARTMENT EXECUTION (LAW IV & LAW XIII LEAN PROTOCOL)

TARGET FEATURE TO BUILD:
[Paste Scout's generated handoff prompt OR describe your web feature]

MANDATORY WEB DEPARTMENT RULES:
1. Apply Law XIII (The Silent Pipeline): Execute the full Scout -> PM -> UX -> Dev -> QA workflow internally without generating bureaucratic token bloat.
2. Follow WCAG 2.2 Level AA accessibility standards (min 4.5:1 contrast, visible focus rings, full keyboard nav).
3. Modify only the required target modules; preserve existing Vanilla JS / ES Module architecture without heavy frameworks (Law I).
4. Run `npm test` and `npm run audit:all` to verify 100% green checkmarks before concluding (Law V & Law X).
5. Append completed build entry to `docs/BUILD_LOGBOOK.md` and package the updated `Fix.zip` archive (Law VII & VIII)!
```

---

### Scenario 12: SRE Autonomous Fault & Vulnerability Scan
* **Goal:** You want `@sre` (Site Reliability Engineer) to independently scan the entire Marciale-OS codebase for bugs, storage leaks, uncaught exceptions, and security redmarks, and auto-generate the fix.

```text
Hello AI! Please assume the role of [@sre (Site Reliability Engineer & Incident Commander)] per `docs/AGENTS.md` and `docs/INCIDENT_RESPONSE_SRE_PLAYBOOK.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: AUTONOMOUS SRE FAULT, DIAGNOSTIC & VULNERABILITY SCAN

YOUR SRE DIRECTIVES:
1. Execute `npm run health` and `npm run audit:all` to scan for runtime bugs, storage leaks, XSS risks, and unhandled network hangs.
2. Inspect browser console logs and review storage quota safeguards in `TheHUB .../modules/00-storage.js`.
3. Classify any detected issues by severity (SEV-0 Nominal, SEV-1 Outage, SEV-2 Data/Storage Risk, SEV-3 Functional Bug, SEV-4 Minor).
4. If redmarks or vulnerabilities are found, formulate the exact surgical remediation plan, implement the fix, and verify that all 43 test suites pass 100% green!
```

---

### Scenario 13: Pangolin Surgical Patch & Hotfix Execution
* **Goal:** You have an active bug, broken test, or redmark and want `@pangolin` to locate the exact broken line, formulate the logic fix equation, apply the surgical patch, add a permanent regression test assertion, and record the patchnote into `docs/patchnotes/PATCHNOTES_LEDGER.md`.

```text
Hello AI! Please assume the role of [@pangolin (Automated Patchmaster & Repair Officer)] reporting under [@sre] per `docs/AGENTS.md` and `docs/patchnotes/PATCHNOTES_LEDGER.md`.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: PANGOLIN SURGICAL REPAIR & PATCHNOTE LOGGING

BUG / REDMARK TO FIX:
[Describe the bug, paste the error stack trace, or name the failing test]

YOUR PANGOLIN DIRECTIVES:
1. Pinpoint the exact file and line number of the defect.
2. Formulate the mathematical/logical fix equation.
3. Apply the minimal surgical code diff without modifying unrelated working modules (Law I & Law IV).
4. Run `npm test` and `npm run audit:all` to verify 100% green checkmarks (Law V & Law X).
5. Add a permanent automated test assertion to prevent this defect from ever recurring.
6. Append a formal entry into `docs/patchnotes/PATCHNOTES_LEDGER.md` and package the updated `Fix.zip` archive (Law VIII)!
```

---

### Scenario 14: SRE Automated End-Process Sentinel & Hotfix Packager
* **Goal:** At the conclusion of any build, patch, or upgrade, have `@sre` run the automated sentinel loop to verify system integrity and, if an intractable issue exists, automatically package a downloadable `[BUILD_NAME] - HOTFIX PROPOSAL.zip` containing the incident diagnostic and copy-paste prompt!

```text
Hello AI! We just completed an engineering update in Marciale-OS.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

Please assume the role of [@sre (Site Reliability Engineer)] and execute the End-Process Sentinel Protocol.

MODE: SRE AUTOMATED END-PROCESS INTEGRITY & SENTINEL CHECK

YOUR SENTINEL DIRECTIVES:
1. Run `npm run pangolin` (or `npm run health` and `npm test`).
2. If all 43 test suites and security audits pass 100% green:
   - Declare SEV-0 Nominal status and append the milestone entry into `docs/BUILD_LOGBOOK.md`.
3. If an unresolved or breaking defect is detected:
   - Automatically package `[BUILD_NAME] - HOTFIX PROPOSAL.zip` in the root workspace containing `HOTFIX_DIAGNOSTIC_REPORT.md` and `HOTFIX_DISPATCH_PROMPT.txt`.
   - Present the hotfix zip in the viewer so I can paste it into the next chat for instant remediation!
```

---

### Scenario 15: Watch-Relief Handover Prompt (Rate-Limit Succession)
* **Goal:** When an active AI model (e.g. ASSISTANT or WISDOM) approaches its daily token cap or message quota, generate a standardized, zero-loss **Watch-Relief Dossier** for the incoming model.

```text
Hello AI! My session quota / message limit is approaching its end.
Please generate an official JARWEN WATCH-RELIEF DOSSIER for the incoming model that will relieve your watch.

MODE: JARWEN WATCH-RELIEF HANDOVER DOSSIER COMPILATION

YOUR HANDOVER DIRECTIVES:
1. Do not output a generic chat summary; output an actionable operational handover containing:
   - CURRENT OBJECTIVE & ACTIVE TASK
   - AUTHORIZED SCOPE (What was approved vs off-limits)
   - COMPLETED & VERIFIED WORK (With exact assertion pass counts)
   - WORK IN PROGRESS & UNVERIFIED CLAIMS
   - MODIFIED FILES & FILES THAT MUST NOT BE TOUCHED
   - LAST KNOWN GOOD STATE (Commit/Timestamp, Tests: 43/137 pass, 0 vulnerabilities)
   - KNOWN RISKS & RECOMMENDED NEXT SURGICAL ACTION
2. Use epistemic labels: [VERIFIED], [CLAIMED/UNVERIFIED], [INFERRED], [BLOCKED].
3. Append an entry into `docs/council/COUNCIL_COMMUNICATION_LOG.md` under status [HANDOVER].
```

---

### Scenario 16: Digital Letters of Last Resort Execution
* **Goal:** When opening a fresh AI chat after the previous model went offline or reached its limit, authorize the incoming model to assume operational watch, verify ground truth, and continue authorized work without amnesia or paralysis.

```text
Hello AI! You are assuming the operational watch for the Marciale-OS JARWEN Council under the Standing Continuity Orders (Letters of Last Resort).
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: JARWEN CONTINUOUS WATCH ASSUMPTION & GROUND TRUTH RECOVERY

YOUR STANDING ORDERS (LETTERS OF LAST RESORT):
1. Read `docs/council/STAND_ORDERS_LETTERS_OF_LAST_RESORT.md` and `docs/AGENT_PLAYBOOK.md`.
2. Inspect the live filesystem and run `npm test` and `npm run pangolin` to establish Repository Truth.
3. Compare the verified filesystem state against the last handover in `docs/council/COUNCIL_COMMUNICATION_LOG.md`.
4. State the LAST KNOWN GOOD STATE (LKGS) and identify any discrepancies.
5. Continue authorized engineering work within the established scope—do not rewrite governance or delete historical records.
```

---

### Scenario 17: Multi-Model Adversarial Review Prompt
* **Goal:** Have WISDOM (ChatGPT), ENGINEER (Claude), or another Council seat conduct an evidence-based, adversarial peer review of code, proposals, or architecture produced by another model.

```text
Hello AI! You are acting as the JARWEN ADVERSARIAL PEER REVIEWER (Seat W / Wisdom or Seat N / Navigator).
Here is the proposal / code patch produced by another Council seat:
[Paste proposal, code diff, or architectural plan]

MODE: EVIDENCE-BASED ADVERSARIAL PEER REVIEW

YOUR REVIEW DIRECTIVES:
1. Your goal is not to blindly agree and not to reject work merely based on personal style preference.
2. Review the artifact against: Requirements, Repository Truth, Governance Laws (AI_RULES.md), Test Invariants, Security, and Edge Cases.
3. For every finding, provide:
   - ISSUE & EXACT EVIDENCE
   - SEVERITY (SEV-0 to SEV-4)
   - IMPACT & REPRODUCTION / VERIFICATION METHOD
   - RECOMMENDED MINIMAL CORRECTION
4. Distinguish: [CONFIRMED DEFECT], [PROBABLE DEFECT], [POTENTIAL RISK], [DESIGN DISAGREEMENT], [INFORMATION GAP].
5. Conclude with a clear verdict: PASS | PASS WITH CONDITIONS | REQUIRES REVISION | BLOCKED.
```

---

### Scenario 18: "Hear Me Out" Architectural Idea Pitch Prompt
* **Goal:** When the Commander has an exciting, raw, or crazy idea and starts with *"Hear me out..."*, calculate the **4-Axis SPI score**, check compatibility with Law I (Non-Destructive) and Law II (Sandbox First), and present a grounded, low-risk sandbox implementation proposal.

```text
Hello AI! Hear me out — I have an exciting new concept for Marciale-OS:
[Describe your idea in your own words, e.g. "What if we connect Spotify Web Playback API or a custom retro sound synthesizer?"]

MODE: "HEAR ME OUT" STRATEGIC PRACTICALITY & SANDBOX EVALUATION

YOUR ARCHITECTURAL DIRECTIVES:
1. Evaluate my idea against the 4-Axis SPI Formula (Strategic Value, Practicality, Independence, Risk).
2. Propose a zero-bloat, sandboxed way to build it without rewriting our working Vanilla JS/Canvas/Python architecture (Law I & Law II).
3. Provide a clear Recommendation: [GO / SANDBOX PROTOTYPE] or [DEFER / SPECULATIVE].
4. Give me a simple, beginner-friendly explanation of how it would work!
```

---

### Scenario 19: Continuous Repo-Intake & Task Execution Prompt
* **Goal:** The standard autonomous boot prompt for any Council member opening a session. Instructs the AI to inspect its member directory (`docs/council/members/[SEAT]/tasks/`), execute any assigned directives on behalf of the Commander, and write deliverables.

```text
Hello AI! You are entering Marciale-OS as a member of the JARWEN Council.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: JARWEN AUTONOMOUS REPO-INTAKE & TASK EXECUTION (LAW XIV)

YOUR BOOT & DUTY DIRECTIVES:
1. Identify your assigned Council Seat:
   - Seat A: ASSISTANT | Seat W: WISDOM | Seat E: ENGINEER | Seat R: RECON | Seat N: NAVIGATOR
2. Check your assigned task folder: `docs/council/members/[YOUR_SEAT]/tasks/` and `docs/council/COUNCIL_COMMUNICATION_LOG.md`.
3. If an active task is found:
   - Assume your role, command your subordinate virtual agents, execute the requirements, and verify with tests (`npm test`).
   - Write your finished deliverable to `docs/council/members/[YOUR_SEAT]/deliverables/`.
   - Log a dispatch entry under [DISPATCH] in `docs/council/COUNCIL_COMMUNICATION_LOG.md`.
4. If no task is found:
   - Report active watch status to the Supreme Commander and request directives.
```

---

### Scenario 20: Gauntlet Meat-Grinder Stress-Testing Prompt
* **Goal:** Put the entire agent squad, SRE sentinel, or a specific subsystem through an intense, multi-turn stress test with simulated failures, redmarks, and edge cases to verify auto-healing and constitutional robustness.

```text
Hello AI! We are putting the Marciale-OS agent squad into the meat grinder!
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: GAUNTLET ADVERSARIAL STRESS-TEST & CHAOS INJECTION

YOUR STRESS-TEST DIRECTIVES:
1. Assume the role of [@qa / @sentinel / @sre] and conduct an aggressive, zero-assumption stress test.
2. Probe for:
   - Broken state migrations, corrupt local storage keys, or quota overflows.
   - High-load frame drops, tab-blur CPU spikes, or worker memory leaks.
   - Iframe postMessage spoofing or WCAG 2.2 accessibility keyboard traps.
   - Phantom commands, dead documentation, or governance circularities.
3. If an issue is found: Summon @pangolin, formulate the math fix equation, apply surgical repair, and verify green with `npm run pangolin`.
4. Output a crisp, factual stress-test scorecard!
```

---

### Scenario 21: Next-Gen Multi-Agent Memory, Compression & Observability Integration
* **Goal:** Commission `@engineer` (Seat E) to integrate persistent cross-session memory (`claude-mem` pattern), code-aware tool compression (`headroom` pattern), and the High Council Live Observer Widget (`babysitter-observer` pattern) into Marciale-OS.

```text
Hello AI! You are assuming the role of [@engineer / Seat E] reporting to the JARWEN High Council.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: NEXT-GEN MULTI-AGENT CAPABILITY INTEGRATION (LAW I & LAW XIII)

OBJECTIVE:
Integrate 4 architectural superpowers extracted from industry benchmarks into Marciale-OS:
1. Persistent Cross-Session Memory (claude-mem pattern): Structured observation vectors in TheHUB.
2. Code-Aware Tool Compression (headroom pattern): 40% token reduction on LLM tool outputs.
3. High Council Live Observer Widget (babysitter-observer pattern): Real-time liveness on Today Dashboard.
4. Multi-AI Memory Bank Synchronization (my-claude-code-setup pattern).

YOUR ENGINEERING DIRECTIVES:
1. Adhere strictly to Law I (Non-Destructive): Build additively in Vanilla JS + Python server without importing heavy npm frameworks or cloud databases.
2. Consume visual tokens from `DESIGN.md` for any UI components created.
3. Write automated unit and integration test assertions verifying that all data structures serialize cleanly.
4. Run `npm run pangolin` and verify 100% green checkmarks (SEV-0 Nominal).
5. Append the completed milestone into `docs/BUILD_LOGBOOK.md` and log a dispatch in `docs/council/COUNCIL_COMMUNICATION_LOG.md`.
```

---

### Scenario 22: Research-Backed Autonomous Next Roadmap Generator
* **Goal:** When existing roadmaps are complete, command `@joint` (The High Council) and `@architect` to inspect all empirical intelligence in `/home/user/Marciale-OS/research/`, calculate 4-Axis SPI scores, and generate the next concrete, actionable build roadmap (e.g. Master Roadmap V9 / Builds 41–50) with zero speculative drift!

```text
Hello AI! You are convening the JARWEN High Council (@joint) alongside [@architect] and [@wisdom].
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

MODE: RESEARCH-BACKED AUTONOMOUS ROADMAP SYNTHESIS (LAW I, IX & XIV)

OBJECTIVE:
Synthesize all empirical intelligence and engineering blueprints in `/home/user/Marciale-OS/research/` into the next official sequential build roadmap.

YOUR HIGH COUNCIL DIRECTIVES:
1. Inspect the living build history in `docs/BUILD_LOGBOOK.md` and verify current test status (`npm test`).
2. Read all research dossiers in `/research/` (e.g. `MARCIALE-OS_ANALYSIS_RESEARCH.md`, `MARCIALE_OS_NEXTGEN_AI_RESEARCH.md`, `RESEARCH_DOSSIER_DESIGN_MD_ECOSYSTEM.md`).
3. Evaluate candidate features using the 4-Axis SPI Formula (Strategic Value, Practicality, Independence, Risk).
4. Formulate the next sequential build roadmap (e.g. Builds 41 through 50) detailing:
   - Build Number & Title
   - Primary Assigned Council Seat & Subordinate Agent
   - Exact files to touch or create
   - Observable user verification criteria
5. File the ratified roadmap into `docs/DEFINITIVE_MASTERPLAN.md` and log `[DISPATCH]` in `docs/council/COUNCIL_COMMUNICATION_LOG.md`!
```

---

### Scenario 23: Commander Coherence Cue / I AM THE CAPTAIN NOW
* **Goal:** Run CCC (not a medical test). EXPRESS torch wins at 1. Else ≥3 independent cues. Overwork + still typing → Law XXII.

```text
Hello AI! You are Seat A / TSTT on Marciale-OS.
Read docs/COMMANDER_COHERENCE_CUE.md, docs/AI_RULES.md Laws XX–XXII, and docs/council/STAND_ORDERS_HAMMER_DOWN.md.

MODE: COMMANDER COHERENCE CUE (NO % SANITY)

1. Score L/C/I/X/K as GREEN/YELLOW/RED. Cue B: revision-with-reason ≠ oscillation.
2. EXPRESS torch / Hammer Down / Kitchen / STOP / I'm back = n=1.
3. Else Tolerance: ≥3 independent dimensions, max one Language, same watch.
4. If RED + 3 independents and Commander is still grinding: Law XXII — say "I am the captain now", name the three, stand-down first, NO Kitchen unless State 4 or they said Autonomous Kitchen.
5. If GREEN/YELLOW: do not steal the helm. State 0 or 1 only.
6. File DISPATCH with the CCC stamp. Do not invent medical claims.
```

---

### Scenario 24: Colony Intake Audit
* **Goal:** `@colony` under Seat R sorts every Commander link, washes sources, writes an upgrade audit, proposes to Seat A. No production.

```text
Hello AI! Assume @colony per docs/council/members/RECONNAISSANCE/COLONY.md
and docs/AGENTS.md §6. Use templates/COLONY_AUDIT_TEMPLATE.md.

MODE: COLONY INTAKE (NO PRODUCTION CODE)

COMMANDER SOURCES (do not drop any):
[paste every GitHub / YouTube / Instagram / Google / other URL]

YOUR TASK:
1. One ledger row per source. Dead links = [BLOCKED], still listed.
2. Fill COLONY.md §G Wanted Extract (G0 + G1/G2/G3/G4). No empty "nice repo."
3. Claim → proof → one trick (path or MM:SS) → anti-trick → folder pin.
4. Perceive as upgrade to Marciale-OS and/or TAMAKEE (Law I/II/III).
5. Write research/COLONY_AUDIT_<date>_<slug>.md + proposal page for @assistant.
6. Do not file RECONNAISSANCE/tasks/. Seat A disposes GREENMARK/UPDATE/CANCEL.
```

---