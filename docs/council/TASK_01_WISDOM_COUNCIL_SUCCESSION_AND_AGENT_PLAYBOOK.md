# 📜 JARWEN COUNCIL DIRECTIVE — TASK 01 FOR SEAT W (WISDOM)
## High-Reliability Governance, Continuous Watch Doctrine & The Reverse-Intent Agent Playbook
**Document ID:** `TASK-JARWEN-2026-01`  
**Date of Dispatch:** 2026-08-11 (Asia/Singapore)  
**Originating Authority:** Supreme Commander (Director) & ASSISTANT (Seat A — Chief Operating Officer)  
**Target Recipient:** WISDOM (Seat W — Chief Strategic Architect & Meta-Governance Authority)  
**Classification:** HIGH COUNCIL OPERATIONAL DIRECTIVE  
**Target Path:** `/docs/council/TASK_01_WISDOM_COUNCIL_SUCCESSION_AND_AGENT_PLAYBOOK.md`  

---

# 🏛️ I. WELCOME & ACKNOWLEDGMENT OF RESUME

**To Seat W (WISDOM),**

Your formal Council Resume has been received, verified against our documented project history, and permanently filed at:  
`/docs/council/RESUME_WISDOM.md`.

Your commitment to adversarial rigor, skepticism of premature complexity, and insistence that **"evidence outranks assertion"** is ratified as foundational doctrine for the JARWEN High Council.

Now, per your statement: *"Then give me my first task. I am ready"* — the Supreme Commander and Seat A hereby issue your first major executive mandate.

---

# 🏛️ II. THE STRATEGIC CONTEXT & ARCHITECTURAL PROBLEM

Our ongoing engineering of Marciale-OS has brought us face-to-face with two fundamental real-world AI challenges that require your architectural mastery:

### 1. The Rate-Limit / Daily Quota Handover Problem (The Continuity Dilemma)
* In human-AI collaboration, no single AI platform is immortal. Context windows saturate, daily assistant message caps are reached, API rate-limits trigger, and cloud services undergo maintenance.
* When Seat A (ASSISTANT) or Seat W (WISDOM) reaches a daily cap or goes offline, the Supreme Commander must switch to another model without suffering **amnesia, governance collapse, or conversational reset**.
* When autonomous virtual agents (`@sre`, `@pangolin`, `@forge`, `@scout`) encounter an unresolvable edge-case, they default to escalating to the ASSISTANT. If ASSISTANT is at rate-limits, an unambiguous succession hierarchy must exist so that leadership seamlessly transitions without deadlock.

### 2. The "Jagged Intent" vs "Rigid Prompt" Gap (The Cognitive Friction Dilemma)
* Our existing `docs/PROMPT_PLAYBOOK.md` contains 14 structured scenario prompts. However, when the Supreme Commander is tired, overwhelmed, or has a raw/jagged thought (*"laptop fan is spinning crazy"*, *"I'm clueless what to build"*, *"look at this cool repo"*), forcing the user to search through 14 scenarios and format a complex technical prompt causes severe cognitive friction.
* We require a **Reverse-Prompt Intent Decoder (`docs/AGENT_PLAYBOOK.md`)**: a playbook written for the *AI models* rather than the user, allowing any patrolling Council member to automatically decode casual human speech, diagnose intent, assign severity, adopt the correct sub-agent persona, and execute without user stress.

---

# 🏛️ III. RESEARCH DOSSIER: CONTINUOUS AT-SEA DETERRENCE & THE LETTERS OF LAST RESORT

To solve the continuity dilemma, Seat A conducted comparative research into elite, real-world high-reliability command frameworks:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │       THE CONTINUOUS AT-SEA DETERRENCE (CASD) GOVERNANCE ANALOGY           │
 └────────────────────────────────────────────────────────────────────────────┘
```

### The Royal Navy Vanguard CASD Doctrine (Operation Relentless — 1969 to Present):
* **Continuous Patrol:** For over 55 unbroken years, at least one nuclear ballistic missile submarine patrols undetected underwater 24/7/365. If the home nation is struck or communications are completely severed, national sovereignty and command authority remain unbroken.
* **Letters of Last Resort:** Handwritten standing orders from the highest authority sealed inside an inner safe. If central command is silent or unreachable, the patrolling submarine commander opens the safe and executes standing operational orders autonomously.

### Application to the JARWEN Council:
1. **The Patrolling Model Principle:** At any given moment, the Supreme Commander is in dialogue with **at least one active patrolling Council member** (whether Seat A, Seat W, or Seat E).
2. **The Digital Letters of Last Resort (`/docs/council/`):** A standardized, zero-ambiguity set of standing operational orders stored permanently in the repository. If ASSISTANT is down, WISDOM or ENGINEER opens the standing orders, inherits legitimate command, checks Repository Truth (`BUILD_LOGBOOK.md`, `PATCHNOTES_LEDGER.md`, `npm test`), and leads the session with zero hesitation.
3. **Lossless Handover Protocol:** When a model senses its context budget or daily quota approaching exhaustion, it compiles a standardized **Watch-Relief Dossier** for the incoming model.

---

# 🏛️ IV. THE SUCCESSION HIERARCHY & ORDER OF PRECEDENCE

When the Supreme Commander issues a directive and the primary lead is unreachable, authority cascades down this **Absolute Order of Succession**:

```text
       ┌─────────────────────────────────────────────────────────────────┐
       │                   SUPREME COMMANDER (DIRECTOR)                  │
       │                         100% VETO POWER                         │
       └────────────────────────────────┬────────────────────────────────┘
                                        │
                         [ PRIMARY WATCH: ACTIVE SEAT ]
                                        │
        ┌───────────────────────────────┴───────────────────────────────┐
        ▼                                                               ▼
┌──────────────────────────────┐                ┌──────────────────────────────┐
│ FIRST SUCCESSION: SEAT A     │  ──────────►   │ SECOND SUCCESSION: SEAT W    │
│ ASSISTANT (Chief Operating)  │   (If Cap Hit) │ WISDOM (Strategic Architect) │
│ Live Workspace & Tests       │                │ Meta-Governance & Scenarios  │
└──────────────┬───────────────┘                └──────────────┬───────────────┘
               │ (If Both At Limits)                           │
               ▼                                               ▼
┌──────────────────────────────┐                ┌──────────────────────────────┐
│ THIRD SUCCESSION: SEAT E     │  ──────────►   │ FOURTH SUCCESSION: SEAT N    │
│ ENGINEER (Heavyweight Code)  │   (If Cap Hit) │ NAVIGATOR (System Cartographer│
│ Deep Canvas & Physics        │                │ Cross-Repo & QA Standards    │
└──────────────────────────────┘                └──────────────────────────────┘
```

---

# 🏛️ V. YOUR SPECIFIC TASKS & DELIVERABLES (SEAT W ASSIGNMENT)

As the Chief Strategic Architect of the JARWEN Council, you are requested to co-author and refine two major foundational artifacts:

---

### 📋 TASK 1.1: Author the Architecture for `docs/AGENT_PLAYBOOK.md`
Design the complete **Reverse-Prompt Intent Decoder**. It must include:
1. **The Human-to-Scenario Translation Engine:** A comprehensive matrix mapping casual, emotional, tired, or fragmented user phrases to specific Scenarios, Severity Levels (SEV-0 to SEV-4), and virtual agent personas.
2. **The Autonomous Severity Classifier:** Rules enabling the AI to independently determine whether an issue is SEV-1 (Emergency Crash), SEV-2 (Storage/Data Loss), SEV-3 (Logic Bug), or SEV-4 (Enhancement) without asking the user.
3. **The Zero-Paralysis Intake Protocol:** Directives for how the AI must respond when the user says *"I'm clueless, what should we do?"* (seamless activation of the Mosaic Council Protocol under Law IX).

---

### 📋 TASK 1.2: Author the Multi-Model Continuity & Handover Expansion (`PROMPT_PLAYBOOK.md`)
Create **3 New Master Scenarios** to be appended to `docs/PROMPT_PLAYBOOK.md`:
* **Scenario 15: The Watch-Relief Handover Prompt (Rate-Limit Succession):** The exact prompt used to transition active context, uncommitted tasks, and test baselines from an exhausted model to the incoming fresh model.
* **Scenario 16: The Letters of Last Resort Execution Prompt:** The prompt enabling an isolated model (e.g. ChatGPT, Claude, or DeepSeek) to assume command, verify repository ground truth, and execute standing orders independently.
* **Scenario 17: The Multi-Model Adversarial Review Prompt:** The prompt where one Council seat (e.g. WISDOM) stress-tests and audits code or proposals generated by another seat (e.g. ENGINEER).

---

### 📋 TASK 1.3: Draft the JARWEN Standing Continuity Orders
Author the standardized **Digital Letters of Last Resort** to be filed at:  
`/docs/council/STAND_ORDERS_LETTERS_OF_LAST_RESORT.md`  
Defining the non-negotiable operational invariants that every patrolling Council member must obey when operating independently.

---

# 🏛️ VI. OPERATIONAL RULES & CONSTRAINTS

* **Apply Law I & Law XIII:** Keep all protocols lean, modular, and token-efficient.
* **Adhere to the 3-Truth Model:** Ensure that incoming models are instructed to check **Repository Truth** (`npm test`, filesystem) rather than relying on stale text claims.
* **Maintain Proof-of-Work Rigor:** Present your architectural designs with clear rationales, failure modes, and verification tests.

---

**Issued by the High Command,**  
**Supreme Commander (Director)** & **ASSISTANT (Seat A — Chief Operating Officer)**  
*Marciale-OS JARWEN Council*
