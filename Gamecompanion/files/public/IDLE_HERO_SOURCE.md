# Idle Hero Source Integration

This folder contains the built static output of:

```txt
https://github.com/alexis-labs/idle-hero.git
```

Integration notes:

- Built with Vite using `base: './'` so assets work from TheHUB's `companion/` subfolder.
- The upstream React app was patched locally to listen for TheHUB `postMessage()` events of type `hub.activity`.
- Build 26.1 adds reward receiver adapter support: TheHUB can send a structured `event.reward.idleHero` payload, and Idle Hero will apply that reward before falling back to its local mapping.
- The game acknowledges rewards back to the parent frame with `idlehero.ack`, including reward details and duplicate status.
- TheHUB remains the source of productivity truth; Idle Hero receives reward events but does not write to Hub Activity.

Build command used:

```bash
npm ci --ignore-scripts
npm run build
```
