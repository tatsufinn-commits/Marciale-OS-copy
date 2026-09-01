# 📦 MARCIALE-OS VERSIONING GUIDE & DOMAIN AUTHORITY
## The Multi-Subsystem Version Architecture & Semantic Release Policy
**Governing Standard:** Multi-Subsystem Version Domain Isolation  
**Authoritative State Registry:** `/docs/SYSTEM_STATE.md`  
**Classification:** TIER 1 VERSIONING POLICY  
**Target Path:** `/VERSIONING_GUIDE.md`  

---

# 1. SUBSYSTEM VERSION DOMAINS

To eliminate version drift across independent subsystems, Marciale-OS separates version authority into **5 distinct version domains**:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                     MARCIALE-OS VERSION DOMAIN MATRIX                      │
 └────────────────────────────────────────────────────────────────────────────┘
```

| Version Domain | Authoritative File | Current Version | Purpose |
|---|---|---|---|
| **1. `ECOSYSTEM_VERSION`** | `package.json` | `1.5.5-v0.3.0` | Root monorepo release bundle identifier. |
| **2. `THEHUB_VERSION`** | `TheHUB 1.5.5.2.3 a v/package.json` | `1.5.5.2.3-alpha` | Core command center web application version. |
| **3. `COMPANION_VERSION`** | `Gamecompanion/files/package.json` | `0.3.0.0` | Companion Canvas 2D RPG engine version. |
| **4. `TAMA_VERSION`** | `TAMAplugin` & Academic Vault | `2.0.0` | Mapúa Architecture Academic Studio knowledge spine. |
| **5. `GOVERNANCE_VERSION`** | `docs/AI_RULES.md` & `SYSTEM_STATE.md` | `Laws I–XIV / Scenarios 1–22` | Constitutional and prompt scenario standard. |

---

# 2. THEHUB DETAILED VERSION STRING FORMAT

TheHUB internal releases use the 5-tier semantic format:
```text
TheHUB [Publication].[Major].[Minor].[Iteration].[Stage] v
e.g., TheHUB 1.5.5.2.3-alpha v
```

| Segment | Meaning | Example |
|---|---|---|
| **Publication** | Public release generation / major architecture shift. | `1` |
| **Major Update** | Subsystem addition (e.g. ChessLab, RuView, Vault). | `5` |
| **Minor Update** | Focused module upgrade (e.g. Biometrics, Audio). | `5` |
| **Iteration** | Patch / tuning iteration (e.g. caffeine calibration). | `2` |
| **Sub-Iteration**| Surgical bugfix / hotfix pass. | `3` |
| **Stage** | Release stage (`alpha` for internal, `prod` for release).| `alpha` |

---

# 3. RELEASE ARCHIVE NAMING POLICY (COMMANDMENT I)

Every release archive generated at the root of the workspace must follow this standardized naming convention:

* **Production Release:** `MARCIALE_OS_COMPLETE.zip` (Always available for immediate user download).
* **Emergency Hotfix Proposal:** `[BUILD_NAME] - HOTFIX PROPOSAL.zip` (Generated automatically by `@sre` when tests fail).

---

# 4. SINGLE SOURCE OF TRUTH (SSOT)

For live, machine-readable verification of the current production state, always consult:
> **`/docs/SYSTEM_STATE.md`**
