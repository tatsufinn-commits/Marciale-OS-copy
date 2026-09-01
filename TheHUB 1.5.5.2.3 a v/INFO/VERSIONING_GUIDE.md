# TheHUB Versioning Guide

## Purpose

This document defines the official version naming convention for **TheHUB** releases and internal builds.

The goal is to make every version number easy to understand at a glance, while still leaving room for public releases, major feature milestones, smaller improvements, and internal testing iterations.

---

## Current Version

TheHUB 1.5.5.2.3.a v

---

## Current Build

Build 33.3 — postMessage Bridge & Event Protocol

---

## Version Format

TheHUB uses the following version format:

```txt
TheHUB 1.2.3.4.a v
```

Where each part has a specific meaning:

```txt
TheHUB [Publication].[Major].[Minor].[Iteration].[Stage] v
```

---

## Version Number Breakdown

| Segment | Example | Meaning |
|---|---:|---|
| **Publication** | `1` | Public release generation or publication cycle. |
| **Major Update** | `2` | Large feature updates, architecture changes, or major system additions. |
| **Minor Update** | `3` | Smaller feature additions, UI improvements, focused module upgrades, or quality-of-life changes. |
| **Iteration** | `4` | Build iterations, fixes, tuning passes, layout corrections, and implementation refinements. |
| **Stage** | `a` | Release/testing stage. `a` means **alpha**, used for internal testing. |
| **v** | `v` | Indicates that the string is a version label. |

---

## Segment Definitions

## 1. Publication Number

The first number represents the **publication cycle**.

Example:

```txt
TheHUB 1.x.x.x.a v
```

The publication number should increase when TheHUB reaches a new publicly meaningful generation.

Use this when there is a large release milestone such as:

- first public publication
- second public publication
- major release generation
- major packaging or distribution milestone
- public-facing identity shift

Example:

```txt
TheHUB 1.0.0.0.a v
```

Means:

```txt
Publication 1, initial alpha build.
```

---

## 2. Major Update Number

The second number represents **major updates**.

Example:

```txt
TheHUB 1.2.x.x.a v
```

Increase this number when adding major systems or large functional milestones.

Examples of major updates:

- Marciale Autopilot
- Project Mode
- AI Resource Governor
- Idle Hero / Momentum Companion integration
- IndexedDB storage expansion
- ChessLab foundation
- RuView / Presence system
- major redesign of core pages

Example:

```txt
TheHUB 1.2.0.0.a v
```

Means:

```txt
Publication 1, major update 2, no minor updates or iterations yet, alpha stage.
```

---

## 3. Minor Update Number

The third number represents **minor updates**.

Example:

```txt
TheHUB 1.2.3.x.a v
```

Increase this number for smaller feature additions, focused upgrades, and improvements that do not redefine the whole app.

Examples of minor updates:

- new settings controls
- UI polish
- new helper functions
- activity filters
- quick-add controls
- companion reward log improvements
- extra project dashboard actions
- improved documentation
- isolated module enhancements

Example:

```txt
TheHUB 1.2.3.0.a v
```

Means:

```txt
Publication 1, major update 2, minor update 3, no iteration yet, alpha stage.
```

---

## 4. Iteration Number

The fourth number represents **iterations**.

Example:

```txt
TheHUB 1.2.3.4.a v
```

Increase this number for implementation passes, bug fixes, layout fixes, refinements, test fixes, and small corrections within the same minor update.

Examples of iterations:

- fixing a cramped UI control
- adjusting Companion iframe sizing
- correcting Today dashboard grid behavior
- patching a broken helper function
- improving a test after a build
- tuning a CSS layout
- small repair after user testing

Example:

```txt
TheHUB 1.2.3.4.a v
```

Means:

```txt
Publication 1, major update 2, minor update 3, fourth iteration, alpha/internal testing.
```

---

## 5. Stage Letter

The stage letter indicates the release or testing stage.

Current defined stage:

| Stage | Name | Meaning |
|---|---|---|
| `a` | Alpha | Internal testing build. Features may still change, break, or be redesigned. |

### Alpha Builds

Alpha builds are used for internal development and testing.

Use `a` when:

- the build is not final
- features are still experimental
- UI may still change
- data structures may still evolve
- tests are still being expanded
- the build is not meant as a stable public release

Example:

```txt
TheHUB 1.2.3.4.a v
```

Means:

```txt
Alpha/internal testing build.
```

---

## Increment Rules

When increasing one version segment, lower segments should usually reset.

## Publication increment

When the publication number increases:

```txt
TheHUB 1.9.4.7.a v
→ TheHUB 2.0.0.0.a v
```

## Major update increment

When the major update number increases:

```txt
TheHUB 1.2.8.5.a v
→ TheHUB 1.3.0.0.a v
```

## Minor update increment

When the minor update number increases:

```txt
TheHUB 1.3.2.6.a v
→ TheHUB 1.3.3.0.a v
```

## Iteration increment

When only refining or fixing the current build:

```txt
TheHUB 1.3.3.0.a v
→ TheHUB 1.3.3.1.a v
```

---

## Practical Examples

| Version | Meaning |
|---|---|
| `TheHUB 1.0.0.0.a v` | First publication cycle, initial alpha build. |
| `TheHUB 1.1.0.0.a v` | Publication 1, first major update, alpha. |
| `TheHUB 1.1.2.0.a v` | Publication 1, major update 1, minor update 2, alpha. |
| `TheHUB 1.1.2.5.a v` | Fifth iteration of minor update 2 under major update 1. |
| `TheHUB 1.2.0.0.a v` | Second major update under publication 1. |
| `TheHUB 1.2.6.0.a v` | Major update 2, minor update 6, first implementation build. |
| `TheHUB 1.2.6.3.a v` | Third iteration of minor update 6. |

---

## Recommended Usage

Use the version number in:

- folder names
- release notes
- changelogs
- zip file names
- README headers
- test build labels
- backup package labels
- internal roadmap references

Example zip naming:

```txt
TheHUB-1.2.6.3.a-v.zip
```

Example folder naming:

```txt
TheHUB 1.2.6.3.a v
```

---

## Versioning Policy

The version should communicate the scope of change.

Use this rule of thumb:

```txt
Publication = public generation
Major = major system milestone
Minor = focused feature/update
Iteration = fix/refinement pass
Stage = testing/release state
```

---

## Current Stage Definition

The current active stage is:

```txt
a = alpha / internal testing
```

This means current builds may include:

- experimental features
- incomplete Category C systems
- layout refinements
- test-driven fixes
- changing internal APIs
- local-only assumptions

---

## Summary

TheHUB versioning follows this structure:

```txt
TheHUB Publication.Major.Minor.Iteration.Stage v
```

Example:

```txt
TheHUB 1.2.3.4.a v
```

Meaning:

```txt
Publication 1
Major update 2
Minor update 3
Iteration 4
Alpha/internal testing stage
Version label
```
