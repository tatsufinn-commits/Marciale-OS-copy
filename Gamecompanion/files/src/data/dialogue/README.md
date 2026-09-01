# Dialogue Files

Place dialogue JSON files here organized by character or scene:

- `rudeus_intro.json` — Prologue and early childhood
- `sylphy_intro.json` — Meeting Sylphiette
- `roxy_lessons.json` — Magic lessons
- `eris_first_meeting.json` — The violent first meeting
- `paul_reunion.json` — Reunion with Paul
- `orsted_encounter.json` — Turning Point 2
- `paul_death.json` — Turning Point 3
- `sylphy_reunion.json` — Turning Point 4
- `roxy_rescue.json` — Rescue and confession
- `eris_return.json` — Eris's return
- `orsted_alliance.json` — Final alliance

## Dialogue Node Format

```json
{
  "id": "unique_node_id",
  "speaker": "character_id",
  "text": "What the character says.",
  "choices": [
    { "text": "Player choice text", "nextNode": "next_node_id", "condition": null, "effects": { "affinity": 5 } }
  ],
  "condition": null,
  "effects": null,
  "nextNode": null
}
```
