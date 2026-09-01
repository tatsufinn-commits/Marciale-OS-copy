# 🚨 HOTFIX PROPOSAL TEMPLATE (`/docs/patchnotes/templates/HOTFIX_TEMPLATE.md`)
## Standard Format for Auto-Generated Emergency Hotfix Proposals & Prompts
**Originating Authority:** `@sre` (Incident Commander) & `@pangolin` (Field Repair Officer)  
**When Generated:** Whenever an end-process health check detects a complex, unresolvable, or breaking issue requiring user architectural decision.  

---

# 📦 HOTFIX PROPOSAL DOSSIER

### 1. Incident Overview
* **Incident ID:** `HOTFIX-[YYYYMMDD]-[FEATURE_NAME]`
* **Severity Level:** [SEV-1 Catastrophic | SEV-2 Data/Storage | SEV-3 Functional Breakage]
* **Target Files:** [List affected files]
* **Triggering Event:** [e.g. End-process health scan following Build V8.5]

### 2. Error Diagnostics & Reproduction Sequence
* **Error Output:** `[Paste exact terminal error / stack trace]`
* **Failing Test Assertion:** `[Name of failing test]`
* **Root Cause Hypothesis:** `[Why the system broke]`

### 3. Proposed Remediation Options
* **Option A (Surgical Code Patch):** [Describe minimum code diff]
* **Option B (Safe Rollback to Pre-Migration Snapshot):** [Describe rollback path]

---

# 📜 COPY-PASTE PROMPT FOR NEXT AI CHAT (HOTFIX DISPATCH)

```text
Hello AI! An automated SRE end-process health check detected an issue in Marciale-OS.
Here is my repository: https://github.com/tatsufinn-commits/Marciale-OS.git

Please assume the role of [@pangolin (Automated Patchmaster & Repair Officer)] reporting to [@sre] per `docs/AGENTS.md` and `docs/INCIDENT_RESPONSE_SRE_PLAYBOOK.md`.

MODE: SURGICAL EMERGENCY HOTFIX

INCIDENT DETAILS:
[Paste error description and failing test name from this file]

YOUR PANGOLIN DIRECTIVES:
1. Locate the exact broken file and line number.
2. Formulate the surgical fix equation without rewriting un-related working modules (Law I & Law IV).
3. Apply the minimal necessary diff and run `npm test` to verify 100% green checkmarks (Law V).
4. Add a permanent regression test assertion so this bug NEVER recurs.
5. Record the completed patch into `docs/patchnotes/PATCHNOTES_LEDGER.md` and package the updated `Fix.zip`!
```
