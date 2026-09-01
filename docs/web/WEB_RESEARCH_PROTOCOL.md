# 🔬 WEB RESEARCH PROTOCOL & RECONNAISSANCE STANDARD (`/docs/web/WEB_RESEARCH_PROTOCOL.md`)
## Technical Intelligence Methodology, Evidence Discipline & License Compliance
**Governing Department:** `/docs/web/`  
**Lead Authority:** `@scout` (Technical Intelligence & Research Specialist)  
**Parent Governance:** `/docs/AI_RULES.md` (Law I: Zero Hallucinations & Law VI: Privacy), `/docs/web/WEB.md`  
**Status:** Authoritative Research Standard  

---

# 1. SCOUT'S CORE RESEARCH MISSION

The mission of **`@scout`** is to conduct systematic, rigorous, and source-grounded technical reconnaissance across external ecosystems, open-source repositories, official specifications, and engineering literature before the engineering team writes a single line of architecture or code.

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                     SCOUT RESEARCH INTELLIGENCE ENGINE                     │
 └────────────────────────────────────────────────────────────────────────────┘
                                       │
     ┌──────────────────┬──────────────┼──────────────┬──────────────────┐
     ▼                  ▼              ▼              ▼                  ▼
┌─────────────┐  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  ┌─────────────┐
│ 1. REPOS &  │  │ 2. OFFICIAL │ │ 3. W3C/WCAG │ │ 4. SECURITY │  │ 5. PATTERNS │
│ OPEN SOURCE │  │ SPECS & DOCS│ │ STANDARDS   │ │ & LICENSES  │  │ & TRADEOFFS │
├─────────────┤  ├─────────────┤ ├─────────────┤ ├─────────────┤  ├─────────────┤
│• Code arch  │  │• API schemas│ │• WCAG 2.2   │ │• MIT/Apache │  │• Benchmark  │
│• Test suites│  │• MDN Web API│ │• ARIA roles │ │• GPL checks │    tradeoffs   │
│• Release log│  │• Frameworks │ │• Semantics  │ │• Dependency │  │• Anti-patt. │
└─────────────┘  └─────────────┘ └─────────────┘ └─────────────┘  └─────────────┘
```

---

# 2. THE 5-TIER EVIDENCE CLASSIFICATION DISCIPLINE

To eliminate hallucinations and unwarranted assumptions, `@scout` must explicitly tag every claim in its dossiers with one of five strict epistemic categories:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                     5-TIER EPISTEMIC EVIDENCE LABELS                       │
 └────────────────────────────────────────────────────────────────────────────┘
```

### 1. `[OBSERVED]`
* **Definition:** Directly verified fact through file reading, running code, inspecting actual source trees, or executing local terminal commands.
* *Example:* *"TheHUB uses Vanilla JS with 20 modules loaded sequentially in index.html [OBSERVED]."*

### 2. `[SOURCED]`
* **Definition:** Fact extracted directly from an official specification, academic paper, or vendor documentation.
* *Example:* *"WCAG 2.2 Success Criterion 1.4.3 requires a minimum contrast ratio of 4.5:1 for normal text [SOURCED: W3C WCAG 2.2]."*

### 3. `[INFERRED]`
* **Definition:** Logical deduction derived from multiple verified observations.
* *Example:* *"Because the Python server runs in a single thread without an async loop, long blocking HTTP requests will delay SSE token streaming [INFERRED]."*

### 4. `[RECOMMENDED]`
* **Definition:** Proposed technical course of action based on evidence and engineering evaluation.
* *Example:* *"We recommend implementing AbortController with a 2.5s timeout on the Ollama fetch probe [RECOMMENDED]."*

### 5. `[SPECULATIVE]`
* **Definition:** Potential hypothesis or forward-looking scenario that has not yet been directly tested or proven.
* *Example:* *"Future multi-agent execution may require upgrading from local IndexedDB to an embedded SQLite store [SPECULATIVE]."*

---

# 3. SOURCE EVALUATION & CONFIDENCE HIERARCHY

When researching technical solutions, `@scout` prioritizes sources according to a 10-tier confidence hierarchy:

```text
 ┌────────────────────────────────────────────────────────────────────────────┐
 │                     SOURCE CONFIDENCE HIERARCHY (1 TO 10)                  │
 └────────────────────────────────────────────────────────────────────────────┘
 
  TIER 1  [HIGHEST] ──► Official International Standards (W3C, ECMA, IETF, ISO, IEEE)
  TIER 2            ──► Official Language & Runtime Specifications (MDN Web Docs, Python.org, Node.js)
  TIER 3            ──► Directly Inspected Source Code (Verified GitHub repos, local files)
  TIER 4            ──► Official Library & Framework Maintainer Documentation
  TIER 5            ──► Peer-Reviewed Academic & Technical Research (ACM, IEEE, Usenix)
  TIER 6            ──► Established Engineering Organization Blogs (Google, Cloudflare, Mozilla)
  TIER 7            ──► Community Technical Discussions & RFCs (StackOverflow, GitHub Issues)
  TIER 8            ──► General Technical Articles, Tutorials & Community Blog Posts
  TIER 9            ──► Unverified Community Claims & Forum Comments
  TIER 10 [LOWEST]  ──► Uncited AI-Generated Summaries
```

---

# 4. LICENSE COMPLIANCE & LEGAL BOUNDARIES

When researching external open-source repositories and codebases, `@scout` must ensure complete legal safety:

1. **License Audit:** Every investigated repository must have its license identified (MIT, Apache-2.0, BSD-3, LGPL, GPL-3.0, AGPL, Proprietary/All Rights Reserved).
2. **Permissible Inspiration:**
   * Architectural patterns, public API structures, mathematical algorithms, and interaction models may be freely studied and re-implemented from scratch.
3. **Prohibited Actions:**
   * Direct verbatim copy-pasting of GPL/AGPL copyleft code into Marciale-OS is strictly prohibited.
   * Proprietary or copyrighted code without an open-source license must never be copied.
4. **Attribution Requirement:** Any open-source algorithm adapted into Marciale-OS must include proper comment attribution and license headers in the source file.

---

# 5. RESEARCH-TO-DECISION TRACEABILITY PIPELINE

To create lasting institutional memory, major technical decisions must follow a transparent audit trail:

$$\text{Problem Definition} \longrightarrow \text{Scout Research Dossier} \longrightarrow \text{Alternatives Evaluation} \longrightarrow \text{Architectural Decision} \longrightarrow \text{Implementation} \longrightarrow \text{QA Verification}$$

This ensures that future developers and AI agents can review why a specific technology was chosen without having to guess or repeat the research.
