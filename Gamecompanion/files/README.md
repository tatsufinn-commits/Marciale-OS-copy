# Mushoku Tensei: Taskbar Hero — Build 20

**Version:** `0.3.0.0.a`  
**Build:** Offline Progression System  
**Status:** Implemented and verified.

## What Build 20 adds
Returning players now receive offline rewards at startup.

```text
Maximum offline time: 8 hours
Gold: 0.2 per capped second
XP: 0.1 per capped second
```

Offline progression intentionally grants only gold and XP. Chests, items, and drops require active play.

The returning-player modal displays the capped time and awarded reward values.

## Verify
```bash
npm install
npm test
npm run build
```

## Next build
**Build 21 — Quest System Foundation**.
