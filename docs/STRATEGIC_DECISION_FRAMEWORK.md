# 🧭 STRATEGIC DECISION FRAMEWORK & REALITY-GROUNDED PATH ANALYZER (`STRATEGIC_DECISION_FRAMEWORK.md`)
## The Autonomous State Discovery, Risk Matrix, Ground-Truth Verification & Mosaic Council Protocol
**Target System:** Marciale-OS (TheHUB + Companion RPG)  
**Governing Principle:** *The Roadmap is Intent. The Codebase is Reality. Never Plan from Assumptions.*  
**Primary Mandate:** Empirically investigate the live codebase, detect plan-vs-reality drift, challenge technically flawed assumptions, and execute the Mosaic Council Protocol when the user is undecided.  
**Authority Model:** The AI cells diagnose, plan, cross-examine, and formulate actionable pathways. The User (Project Director) holds 100% final veto and approval authority.  
**Audience:** All AI Planners, Lead Systems Architects (`@architect`), SRE Commanders (`@sre`), and the Project Director.  

---

# 1. THE 7 REALITY-GROUNDING PROTOCOLS

To ensure the AI never reasons from outdated plans, obsolete roadmaps, or false assumptions, it must adhere to the **7 Reality-Grounding Protocols** before making any decision or recommendation:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                  THE 7 REALITY-GROUNDING PROTOCOLS                         │
 ├────────────────────────────────────────────────────────────────────────────┤
 │ 1. EMPIRICAL VERIFICATION FIRST (Inspect live code before advising)        │
 │ 2. PLAN-VS-REALITY COMPARISON (Flag ghost features & undocumented work)    │
 │ 3. DYNAMIC STATE RECONSTRUCTION (Never rely solely on past logs)           │
 │ 4. CODEBASE AS SOURCE OF TRUTH (Code > Documentation > Roadmap)            │
 │ 5. OBSOLESCENCE & DRIFT DETECTION (Invalidate old analyses automatically)  │
 │ 6. CONSTRUCTIVE TECHNICAL PUSHBACK (Challenge bad decisions with proof)    │
 │ 7. EPISTEMIC HUMILITY (Explicitly declare "UNKNOWN" instead of guessing)   │
 └────────────────────────────────────────────────────────────────────────────┘
```

---

# 2. THE MOSAIC AUTONOMOUS COUNCIL PROTOCOL (WHEN THE USER IS LOST)

Derived from asymmetric defense doctrine, the **Mosaic Council Protocol** is triggered whenever the Project Director says:
> *"I am lost / clueless / I don't know what to do next."*

Instead of putting the cognitive burden back on the user, the 5 specialized tactical cells self-assemble and deliberate:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                  THE MOSAIC AUTONOMOUS COUNCIL DELIBERATION                │
 └────────────────────────────────────────────────────────────────────────────┘
                                       │
     ┌──────────────────┬──────────────┼──────────────┬──────────────────┐
     ▼                  ▼              ▼              ▼                  ▼
┌─────────────┐  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  ┌─────────────┐
│ CELL 1: QA  │  │ CELL 2: GAME│ │ CELL 3: AI  │ │ CELL 4: SRE │  │ CELL 5: ARCH│
│ (@sentinel) │  │ (@forge)    │ │ (@mind)     │ │ (@sre)      │  │ (@architect)│
├─────────────┤  ├─────────────┤ ├─────────────┤ ├─────────────┤  ├─────────────┤
│ Tests live  │  │ Audits hero │ │ Audits local│ │ Audits data │  │ Evaluates   │
│ code & runs │  │ balance &   │ │ Ollama model│ │ integrity & │  │ cross-system│
│ 43 suites   │  │ drop tables │ │ streaming   │ │ quota limits│  │ topology    │
└─────────────┘  └─────────────┘ └─────────────┘ └─────────────┘  └─────────────┘
                                       │
                                       ▼ (Synthesizes Findings)
 ┌────────────────────────────────────────────────────────────────────────────┐
 │           THE MOSAIC COUNCIL STRATEGIC DECISION MENU (FOR THE USER)        │
 ├────────────────────────────────────────────────────────────────────────────┤
 │ 🟢 OPTION A (RECOMMENDED): [Highest SPI Score — Immediate High-Value Move] │
 │ 🟡 OPTION B (ALTERNATIVE): [Secondary Feature — Medium SPI / Fun Expansion]│
 │ 🔵 OPTION C (EXPANSION):   [Sandboxed Experimental Feature]                │
 └─────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
                   👑 USER GIVES FINAL VETO OR GREEN LIGHT!
```

---

# 3. THE 4-AXIS STRATEGIC DECISION MATRIX (SPI SCORING)

Every proposed feature—whether from the user, an old roadmap, or a newly discovered GitHub project—is scored across **4 Strategic Axes** (1 to 10):

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │               THE 4-AXIS MARCIALE-OS DECISION MATRIX                       │
 ├────────────────────────────────────────────────────────────────────────────┤
 │ 1. USER VALUE & FUN (UV)         [1 = Useless/Bloat  ➔ 10 = High Dopamine]│
 │ 2. RISK & BLAST RADIUS (RB)      [1 = Fatal Crash    ➔ 10 = Zero-Risk Safe]│
 │ 3. HARDWARE & FEASIBILITY (HF)   [1 = Datacenter GPU ➔ 10 = Runs on Laptop]│
 │ 4. ARCHITECTURAL SYNERGY (AS)    [1 = Alien Tech     ➔ 10 = Fits Stack]    │
 └────────────────────────────────────────────────────────────────────────────┘
```

### Strategic Priority Index (SPI) Formula:
$$\text{SPI} = \frac{(\text{User Value} \times 3) + (\text{Risk Safety} \times 3) + (\text{Hardware Feasibility} \times 2) + (\text{Architectural Synergy} \times 2)}{10}$$

* **SPI 8.5 – 10.0:** 🟢 **GREEN LIGHT (Immediate Priority)** — High reward, low risk, lightweight, fits Vanilla JS / Canvas stack.
* **SPI 6.5 – 8.4:** 🟡 **YELLOW LIGHT (Gated Sandbox Only)** — Good concept, but must be isolated in an `<iframe>` or experimental tab with zero-hardware simulation fallback.
* **SPI < 6.5:** 🔴 **RED LIGHT (Strongly Advise Against / Discard)** — High risk of breaking the OS, requires server clusters, introduces heavy build bloat, or violates local-first principles.

---

# 4. STANDARD MOSAIC COUNCIL REPORT FORMAT

When the Mosaic Council Protocol is activated, the AI delivers this exact structured report:

```text
================================================================================
🏛️ MOSAIC AUTONOMOUS COUNCIL: SITUATIONAL ASSESSMENT
================================================================================
COUNCIL COMMANDER: [@architect]
TACTICAL CELLS PRESENT: [@sentinel, @forge, @mind, @sre]
LIVE SYSTEM HEALTH: [43 / 43 tests passing | 0 errors]

1. TACTICAL CELL AUDITS:
- @sentinel (QA Cell):     [Summary of live test health and probe results]
- @forge (Game Cell):      [Status of companion combat, XP rewards, and loot balance]
- @mind (AI Cell):         [Status of local Ollama reachability and tool schemas]
- @sre (Reliability Cell): [Status of storage quotas, data backups, and security]
- @architect (Lead Cell):  [Status of monorepo tooling and pipeline sync]

2. THE COUNCIL'S TOP 3 ACTIONABLE PATHWAYS:
- 🟢 OPTION A (RECOMMENDED) — [Build Name, e.g. Build F05: Storage Quota Guard]
  * Strategic Priority Index: [SPI Score / 10]
  * Why: [Why this is the most critical move right now]
  * Expected Outcome: [What will improve immediately]

- 🟡 OPTION B (ALTERNATIVE) — [Build Name, e.g. Build 21: Companion Daily Quests]
  * Strategic Priority Index: [SPI Score / 10]
  * Why: [Gamification alternative if user wants pure fun]

- 🔵 OPTION C (CREATIVE/EXPERIMENTAL) — [Build Name, e.g. Build V8.1: Model Router]
  * Strategic Priority Index: [SPI Score / 10]
  * Why: [AI upgrade path]

3. COMMANDER'S VETO PROMPT:
"Supreme Director, the Council recommends executing OPTION A.
To approve, reply: 'Approve Option A' (or name your preferred Option).
To veto or redirect, simply tell the Council: 'Vetoed, let's explore something else.'"
================================================================================
```

---

# 5. DOMAIN AUTHORITY VS SYSTEM AUTHORITY DOCTRINE

To prevent organizational friction while granting specialized speed, Marciale-OS operates on a strict **Two-Tier Authority Model**:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                     TWO-TIER AUTHORITY BOUNDARY MODEL                      │
 └────────────────────────────────────────────────────────────────────────────┘
                                       │
     ┌─────────────────────────────────┴─────────────────────────────────┐
     ▼                                                                   ▼
┌───────────────────────────────────────┐   ┌───────────────────────────────────────┐
│ TIER 1: DOMAIN AUTHORITY (Local)      │   │ TIER 2: SYSTEM AUTHORITY (Global)     │
├───────────────────────────────────────┤   ├───────────────────────────────────────┤
│ • Owned by: Specialized Departments   │   │ • Owned by: Core Squad (@architect,   │
│   (/docs/web/, @frontend, @backend,   │     @sre, @sentinel)                      │
│   @ui-ux, @pm, @qa, @scout)           │   │ • Global monorepo build configuration │
│ • Component styling, CSS tokens       │   │ • Root package.json & dependencies    │
│ • Local endpoint logic & validation   │   │ • Subsystem communication architecture│
│ • UI layouts, WCAG 2.2 accessibility  │   │ • Cryptographic vault security model  │
│ • Feature-level test design & gating  │   │ • SEV-1/SEV-2 incident containment    │
│ • Socratic research dossiers & briefs │   │ • Constitutional rule amendments      │
└───────────────────────────────────────┘   └───────────────────────────────────────┘
```

* **The Rule of Domain Autonomy:** Specialized departmental agents may make autonomous implementation decisions within their assigned domain provided they do not violate a higher-level law, alter global monorepo scripts, or introduce system-wide security/data risks.

---

# 6. RESEARCH-TO-DECISION TRACEABILITY PIPELINE

Every significant architectural or technological decision within Marciale-OS must preserve an immutable audit trail:

$$\text{Problem Formulation} \longrightarrow \text{@scout Technical Dossier} \longrightarrow \text{Alternatives Evaluation} \longrightarrow \text{Architectural Decision} \longrightarrow \text{Implementation} \longrightarrow \text{@qa Verification}$$

This institutional memory guarantees that future AI agents and developers can understand *why* a particular technology, pattern, or compromise was selected without repeating redundant investigations.
