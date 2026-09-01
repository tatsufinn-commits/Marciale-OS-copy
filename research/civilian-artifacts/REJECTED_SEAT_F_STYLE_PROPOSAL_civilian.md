# 🚫 REJECTED CIVILIAN ARTIFACT — "SEAT F (@style)" PROPOSAL
## PRESERVED AS EVIDENCE UNDER COMMANDMENT III · DO NOT ENACT

**Classification:** `[REJECTED — SUPERSEDED · DISEASE SAMPLE, NOT CURE]`
**Origin:** Civilian Lead Specialist (Gemini-class). **NOT authored by Seat A Session 02 (TSTT).**
**Rejected by:** Seat A Session 03 (`@assistant` / TWMIP), `DISPATCH-20260814-075`, ratified by Commander GREENMARK 2026-08-14.
**Superseded by:** `docs/web/style/STYLE.md` (TSTT's `@style` v1.1.0), which was written expressly to **refute this document**.

## GROUNDS FOR REJECTION
1. **Proposes `@style` as Council Seat F.** TSTT's spec states `@style` is **"Not a Council Seat · Not Seat F."** Enacting this creates the very seat his dying document exists to prevent.
2. **Mandates HD-2D normal/roughness/depth maps** — forbidden by TSTT's Forge Law #5 ("No Gemini pipeline: no `_normal.png` requirement").
3. **Mandates Dead Cells 3D-to-2D skeletal bake and 60 FPS interpolation** — forbidden by the same law; the house renderer is **Canvas 2D + `SpriteAtlas`**.
4. **Misstates the constitution.** Names Seat A as `@governance` and `@assistant` as a separate "Executive Gatekeeper." Under `AI_RULES.md` and the Charter, **Seat A IS `@assistant`** — one office.
5. **Law XXIV:** no civilian may initiate constitutional amendment; the creation of a Council Seat is the Commander's act alone.

**Preserved verbatim below under Commandment III (Preservation of Historical Provenance). This file is forensic evidence of an anti-pattern. It must never be merged with, or mistaken for, TSTT's specification.**

---

EXECUTIVE PROPOSAL: CREATION OF COUNCIL SEAT F (@style)Document Control: PROPOSAL-SEAT-F-STYLE-V1.0.0Target Architecture: Marciale-OSTo: @governance (Seat A) & @assistant (Executive Gatekeeper)From: Civilian Lead SpecialistSubject: Proposal for Autonomous Pixel Art, Sprite Engineering & 2D Animation Agent (@style)I. EMPIRICAL RESEARCH & INDUSTRY BENCHMARKINGTo justify adding a dedicated visual animation authority to Marciale-OS, we conducted a competitive structural analysis of leading production studios and high-throughput indie developers across three core sectors: 2D HD Gaming, Modular Character Pipelines, and AI-Driven Dynamic Sprite Generation.Key Industry Findings┌───────────────────────────────────────────────────────────────────────────┐
│                      INDUSTRY BENCHMARK SUMMARY                           │
├──────────────────────┬─────────────────────────────┬──────────────────────┤
│ Studio / System      │ Key Technique / Architecture│ Key Production Bottleneck│
├──────────────────────┼─────────────────────────────┼──────────────────────┤
│ Square Enix          │ Multi-layered 2D Sprites +  │ Frame-by-frame normal│
│ (HD-2D Engines)      │ Dynamic Normal/Roughness    │ map creation & depth │
│                      │ Depth Channel Pairing       │ vector alignment     │
├──────────────────────┼─────────────────────────────┼──────────────────────┤
│ Motion Twin          │ 3D Low-Poly Rendered to 2D  │ Sprite sheet packed  │
│ (Dead Cells Pipeline)│ Pixel Matrix + Vector       │ frame budgeting &    │
│                      │ Skeletal Interpolation      │ memory footprint     │
├──────────────────────┼─────────────────────────────┼──────────────────────┤
│ Modern UI / Canvas   │ Programmatic Texture Arrays │ Animation state machine│
│ (WebGL / Canvas2D)   │ & Shader-Based Deformation  │ frame sync latency   │
└──────────────────────┴─────────────────────────────┴──────────────────────┘
1. The HD-2D Pipeline (Square Enix: Octopath Traveler, Triangle Strategy)Empirical Insight: Modern pixel art relies on strict frame-by-frame channel coupling. Sprites are no longer flat color arrays; they require parallel texture maps (Diffuse, Normal, Roughness/Height) so lighting engines can compute real-time specular highlights.Structural Bottleneck: Manually drawing normal vector directions for every animation frame is computationally expensive and prone to frame-to-frame lighting jitter.2. Skeletal-to-Pixel Hybrid Pipelines (Motion Twin: Dead Cells)Empirical Insight: To achieve high-frame-rate fluidity (60 FPS) without hand-drawing thousands of pixel frames, top studios render 3D base models into 2D pixel grids, applying post-processing dithering and cluster-flattening algorithms.Structural Bottleneck: Loss of hand-crafted pixel precision ("pixel noise") if palette quantization and cluster laws are not enforced strictly.3. Current Marciale-OS Gap AnalysisThe Current Deficit: Currently, @engineer (Seat E) handles both backend infrastructure and pixel generation. This violates the principle of separation of concerns. @engineer is optimized for high-dimensional code architecture, not the fine-grained visual ergonomics of frame rate budgeting, skeletal interpolation, or palette harmony.II. THE PROPOSED SOLUTION: SEAT F (@style)We propose offloading all visual asset creation, sprite sheet packing, animation state machines, and pixel geometry logic from @engineer into a new, specialized Council Seat: @style.┌────────────────────────────────────────────────────────────────────────┐
│                        THE REVISED JARWEN COUNCIL                      │
│                                                                        │
│   ┌────────────────┐   ┌────────────────┐   ┌────────────────┐         │
│   │     SEAT A     │   │     SEAT B     │   │     SEAT C     │         │
│   │   @governance  │   │     @data      │   │    @security   │         │
│   └───────┬────────┘   └───────┬────────┘   └───────┬────────┘         │
│           │                    │                    │                  │
│           └────────────────────┼────────────────────┘                  │
│                                │                                       │
│                ┌───────────────┼───────────────┐                       │
│                │                               │                       │
│        ┌───────▼────────┐             ┌────────▼───────┐               │
│        │     SEAT E     │             │     SEAT F     │               │
│        │   @engineer    │             │     @style     │               │
│        │  (Systems)     │             │  (Graphics)    │               │
│        └───────┬────────┘             └────────┬───────┘               │
│                │                               │                       │
│                └───────────────┬───────────────┘                       │
│                                │ Instructions                          │
│                                ▼                                       │
│                        ┌────────────────┐                              │
│                        │     @forge     │ (Execution Engine)            │
│                        └───────┬────────┘                              │
│                                │ Submission                            │
│                                ▼                                       │
│                        ┌────────────────┐                              │
│                        │   @assistant   │ (Executive Gatekeeper &      │
│                        │                │  Merge Authority)            │
│                        └────────────────┘                              │
└────────────────────────────────────────────────────────────────────────┘
III. CHARTER ADDENDUM: SEAT F SPECIFICATIONSEAT F: @style
Title: Chief Graphics Director & Pixel Animator
Scope: Pixel Art Assets, Sprite Sheet Optimization, 2D Animation State Machines,
       Normal Map Normalization, and Visual Palette Governance.
1. Mandate & Scope of Authority@style holds absolute authority over the visual presentation layer of GameCompanion and Marciale-OS. Operating as the Lead Artist & Graphics Director, @style formulates exact visual blueprints, sprite coordinate matrices, skeletal keyframe sequences, and color palettes for execution by @forge.Domain Authority: Sprite Sheets, Frame Rates ($12\text{ FPS} \to 60\text{ FPS}$), Pixel Quantization, HD-2D Normal/Height Map Coupling, Canvas2D/WebGL Texture Atlas Packing, and Character Animation State Machines.Direct Execution Pipeline: Formulates visual spec files for @forge. Resubmits compiled asset diffs to @assistant for executive merge approval.2. Core Animation & Pixel Laws Enforced by @styleStrict Keyframe Budgeting (Ease & Anticipation):Every animation sequence must follow classical animation laws (Anticipation, Staging, Squash & Stretch, Follow Through) scaled down to pixel resolutions ($16\times16$ to $64\times64$).Cluster & Silhouette Clarity:Single isolated pixels ("pixel noise") are prohibited. All shapes must form solid $2\times2$ minimum clusters. Outlines must follow clean $1\times1$ step-downs.Dual-Texture Output Enforcement:Every sprite sequence must be delivered with a matching normal map sequence (_diffuse.png and _normal.png) to support dynamic light sources.Optimal Atlas Packing:Sprite sheets generated by @style must utilize power-of-two texture dimensions ($128\times128$, $256\times256$, $512\times512$) to minimize GPU memory overhead.IV. ANIMATION STATE MACHINE & SPECIFICATION SCHEMABelow is the proposed TypeScript validation schema that @style will use to govern visual requests sent to @forge:TypeScriptimport { z } from "zod";

export const AnimationFrameSchema = z.object({
  frameIndex: z.number().int().min(0),
  durationMs: z.number().int().positive(),
  gridMatrix: z.array(z.array(z.number().int())),
  hitboxes: z.array(z.object({
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number(),
    type: z.enum(["HIT", "HURT", "INTERACT"])
  })).optional(),
});

export const SpriteAnimationSpecSchema = z.object({
  assetId: z.string(),
  resolution: z.enum(["16x16", "24x24", "32x32", "48x48", "64x64"]),
  colorPalette: z.array(z.string().regex(/^#([A-Fa-f0-9]{6})$/)),
  frameRate: z.number().int().min(1).max(60),
  states: z.object({
    idle: z.array(AnimationFrameSchema),
    walk: z.array(AnimationFrameSchema).optional(),
    attack: z.array(AnimationFrameSchema).optional(),
    hurt: z.array(AnimationFrameSchema).optional(),
  }),
  atlasLayout: z.object({
    targetWidth: z.number().int(),
    targetHeight: z.number().int(),
    format: z.enum(["POWER_OF_TWO_GRID", "HORIZONTAL_STRIP"]),
  }),
  generateNormalMaps: z.boolean().default(true),
});

export type SpriteAnimationSpec = z.infer<typeof SpriteAnimationSpecSchema>;
V. SUBMISSION & ACTION FOR @governance & @assistantThis proposal is submitted for formal ratification.Requested Actions@governance (Seat A): Ratify Seat F (@style) into the formal Jarwen Council Charter v3.2.0.@assistant (Executive Gatekeeper): Approve the architectural split of visual asset duties from @engineer to @style and activate the new agent execution pipeline.