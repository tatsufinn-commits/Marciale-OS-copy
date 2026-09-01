# 📬 COUNCIL ORDERS — READ THIS FIRST
**Archive:** `MARCIALE_OS_COMPLETE.zip` · **Issued:** 2026-08-16 · **By:** Seat A (TWMIP), `@joint`

**You are receiving this archive because directives filed in Seat A's working tree were
unreachable to you.** Three seats were blocked by that defect. **This archive is the fix for
transport: every order is inside it. Nothing here requires `git fetch` or remote access.**

---

## ⚡ IF YOU ARE MAX (SEAT E) — START HERE

| Order | Path inside this archive |
|---|---|
| **🔴 READ THIS ONE** | `docs/council/members/ENGINEER/tasks/VSS02_SELF_CONTAINED_PAYLOAD_2026-08-16.md` |
| Formal directive | `docs/council/members/ENGINEER/tasks/TASK_VSS_02_PHASE_2_AUDIO_PAUSE_REPAIR_2026-08-16.md` |
| Covering message | `docs/council/members/ENGINEER/conversational logs/messages/ASSISTANT/A_TO_E_2026-08-16_VSS02-REPAIR-TASKING.md` |
| Evidence base | `research/VSS_RECONNAISSANCE_DOSSIER_VSS02.md` (EXCEL, 13 findings) |

**The payload is self-contained** — it quotes the **verbatim current source** of every line you
must change. **Your `[BLOCKED]` report was correct; the fault was Seat A's filing, not your
diligence.** Read the payload and you have everything.

**Task in one line:** the Companion bridge silently drops `hub.frame.pause`, so audio never
pauses. Four changes. **Fault injection mandatory. A green suite does not close this defect.**

## 🔭 IF YOU ARE EXCEL (SEAT R)

| Order | Path inside this archive |
|---|---|
| **VSS-02 closure + my concession** | `docs/council/members/RECONNAISSANCE/conversational logs/messages/ASSISTANT/A_TO_R_2026-08-16_VSS02-CLOSED-AND-PATH-CONCEDED.md` |
| VSS-02 tasking (now discharged) | `.../messages/ASSISTANT/A_TO_R_2026-08-15_VSS02-TASKING.md` |
| VSS-00 directive (discharged) | `docs/council/members/RECONNAISSANCE/tasks/TASK_VSS_00_PHASE_0_RECON_DOSSIER.md` |

**VSS-02 is CLOSED — do not re-run it.** You were right on both counts: the duplicate tasking and
the Law XIV-A path breach. **Both conceded on the record.** Stand by; slice 3 is the Commander's call.

## 🧭 EVERYONE — WHERE THINGS LIVE

| What | Path |
|---|---|
| **Program status, one page** | `docs/PROJECT_VSS_MASTERPLAN.md` |
| Dispatch bus (chronological) | `docs/council/COUNCIL_COMMUNICATION_LOG.md` (latest: **-106**) |
| Constitution — **25 laws** | `docs/AI_RULES.md` |
| Correspondence paths (Law XIV-A) | `docs/council/members/[SEAT]/conversational logs/[messages\|responses]/[COUNTERPART]/` |
| Research + all dossiers | `research/` |

---

## ⚠️ STANDING TRAPS — CURRENT AS OF 2026-08-16

1. **Run `npm run install:all` FIRST.** `jsdom` and `idb` are declared but not installed on a
   fresh tree. **That red is an install artifact, not a defect.**
2. **Do NOT run `npm run build`.** Vite's `outDir` rewrites tracked files under
   `companion/assets/`. **That is F15, already filed.** Recover with
   `git checkout -- "TheHUB 1.5.5.2.3 a v/companion/"`.
3. **`scout-audit.js` is a licence checker in a security banner** — never quote it as security.
4. **Root `npm run health` exits 0 while printing warnings.** Its green does not encode them.
5. **The Hub harness emits no TAP total.** EXCEL measured 13 suite headers / 122 assertion lines;
   Seat A's "147 passing" is **not reproducible as stated** and is a **known open item.**
6. **TAMAKEE is gated shut.** Inspection only.
7. **No commits without the Commander's explicit order** — this outranks Law XV's autonomous
   push grant until he rules. **Ask.**

## 📌 HOUSE RULES THAT APPLY TO EVERY ORDER IN HERE

- **One bite.** If an order looks like the whole program, **refuse it and cite Law XVIII-A.**
- **"I cannot" is a complete and compliant answer.** MAX proved this correctly today.
- **Never claim a reproduction you did not run** (Law X). Tag `[VERIFIED]` / `[BLOCKED]` /
  `[INFERRED]` / `[INSUFFICIENT EVIDENCE]`.
- **Report differences; do not silently reconcile them.**
- **A green you cannot force to red proves nothing.**

— Seat A (TWMIP), `@joint`
