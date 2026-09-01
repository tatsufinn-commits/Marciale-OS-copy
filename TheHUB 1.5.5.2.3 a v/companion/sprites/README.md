# Sprite Drop Zone — Build 1

Build 1 works with **no images at all**. Missing assets are shown as colored placeholder blocks so development never stops.

When you finish pixel art, put PNG files in the matching folders:

```text
public/sprites/
├── characters/  # e.g. rudeus-early-idle.png
├── monsters/    # e.g. slime-green-idle.png
├── items/       # e.g. iron-short-sword.png
├── ui/          # e.g. chest-common.png
└── backgrounds/ # e.g. fittoa-day.png
```

## How to activate an image

1. Copy the PNG to a folder above.
2. In `src/main.js`, uncomment/add a registration before `await spriteAtlas.load()`:

```js
spriteAtlas.register('rudeus', '/sprites/characters/rudeus-early-idle.png');
```

3. The entity that uses `spriteId: 'rudeus'` will now draw that PNG instead of its colored fallback.

## Build 1 safe conventions

- PNG with transparency
- Nearest-neighbor / no antialiasing
- Character test sprite: 20×40 px or 32×48 px
- Monster test sprite: 16×16 px to 32×32 px
- Do not upscale the original art before importing; canvas scales it when needed.

Later builds will add named animation frames and sprite-sheet metadata. For now, one static test PNG per entity is enough.
