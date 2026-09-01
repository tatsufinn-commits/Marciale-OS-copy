# Launch Guide — Hub

## Run locally

```bash
python server.py
```

Open:

```txt
http://127.0.0.1:8000
```

You can also open `index.html` directly, but PWA/service-worker features and local API routes work best through the Python server.

---

## Optional: Mapúa/Blackboard calendar sync

Set your private calendar feed URL as an environment variable before starting the server:

```bash
export MAPUA_ICS_URL="https://...your-private-feed-url..."
python server.py
```

Do not commit the feed URL or downloaded `.ics` files to git.

---

## Optional: local Ollama assistant

Start Ollama with a restricted origin:

```bash
OLLAMA_ORIGINS=http://127.0.0.1:8000 ollama serve
```

Then open the Assistant tab in Hub. If needed, click ⚙️ and set:

```txt
Ollama URL = http://127.0.0.1:11434
Secret key = blank
```

---

## Optional: phone access to your local Ollama

Do not expose raw Ollama. Use the authenticated proxy:

```bash
export HUB_KEY="use-a-long-random-secret"
python ollama-proxy.py
cloudflared tunnel --url http://localhost:11435
```

On your phone, open your hosted/local Hub → Assistant → ⚙️:

```txt
Ollama URL = https://...trycloudflare.com
Secret key = the same HUB_KEY
```

Keep your PC, Ollama, `ollama-proxy.py`, and cloudflared running.

---

## Deploying the static app

The app is static, so you can host the folder on GitHub Pages, Netlify, Vercel, or any static host.

Important limitations for hosted copies:

- Browser data is still per-device unless you implement cloud sync.
- The AI assistant needs a reachable Ollama endpoint, usually via `ollama-proxy.py`.
- Calendar notifications are browser/session dependent; for reliable phone reminders, export events with the `.ics` button and add them to Apple/Google Calendar.

---

## If something breaks

Use **Reset data** in the footer. This clears all Hub localStorage keys, including Markdown notes, sleep-readiness settings, drinks, and Ollama settings.


## Notes and sleep-readiness

- The Notebook now uses Markdown plus a sanitized preview. Existing old HTML notes are migrated automatically on first launch.
- The intake tracker Today cards now show active/residual values, not just raw daily totals. Active caffeine uses the same 5-hour half-life math as the graph.
- The intake tracker has a Sleep Readiness card. Set your caffeine threshold and target bedtime; Hub previews the selected drink and warns if logging it may keep you above threshold past bedtime.

## Sidebar controls

Use the ☰ button to open/collapse the sidebar. From there you can change themes, adjust assistant approval behavior, click command-guide prompt templates, export a full Hub backup, or reset local data. For safest AI behavior, keep “Ask before every tool action” enabled and only turn on “Open/switch tabs without asking” if you want hands-free navigation.

## Full backup and restore

Use Sidebar → Data & maintenance → Export full Hub backup to download all local `hub.*` data. Use Import/restore backup to move the full Hub state to another browser/profile/local install.

## Intake tracker time logging

When logging a drink, set both Date and Time. Today defaults to the current time; backdated entries default to noon unless you choose a time. Active caffeine and sleep-readiness use the timestamp.

## Calendar upgrades

Calendar items now support Priority and Repeat. Use Export `.ics` on the Calendar page to download an upcoming-events calendar file.

## Encrypted Vault

Open the Vault tab, enter a master password, and add websites/accounts. The vault is encrypted locally before saving. The Assistant can only search metadata while unlocked and will not reveal or receive stored passwords. Use the Vault UI copy buttons for passwords.

## Security notes

For best protection, run Hub through `python server.py` at `http://127.0.0.1:8000`. The local server binds to your own machine and sends additional security headers. The Vault is encrypted locally, but your overall safety still depends on your PC, browser profile, extensions, and OS account security.

## Importing calendar files

Use Calendar → Import `.ics` to bring Apple/Google/Outlook calendar exports into Hub. Hub imports events into local browser storage; it does not stay synced with the original calendar after import.

## Chrome launcher and stale-cache fix

The local launch scripts now try to open Google Chrome directly and use a cache-busting URL to avoid old service-worker cached versions of Hub. The service worker is network-first for the app page, and `server.py` sends revalidation headers for `/`, `/index.html`, and `/sw.js`.

## Shared local data across Chrome profiles

When Hub is opened through `python server.py` at `http://127.0.0.1:8000`, it now syncs all `hub.*` browser data to a local file:

```txt
hub-data.json
```

That file lives beside `server.py` and lets different Chrome profiles/accounts on the same PC see the same Hub data. The file is ignored by git because it contains private local data.

Notes:

- This works only when using the local Python server, not `file://`, Netlify, or GitHub Pages.
- The Vault remains encrypted in `hub-data.json`; it still requires your master password.
- If one browser profile has old data, open your main/current profile first after updating Hub so it can seed `hub-data.json`, then open the other profile.
- Use Sidebar → Export full Hub backup before clearing site data or resetting.

## Marciale brain

The Assistant is now named **Marciale**. In the sidebar, use **Marciale brain** to configure:

- assistant name
- prefix injection
- long-term memories
- skills/style profile
- suffix injection
- whether memories and skills are injected into the prompt

Marciale can also append to its brain through approved tools:

```txt
remember {text}
add_skill {text}
```

Do not store passwords or secrets in Marciale brain. Use the encrypted Vault for credentials.

## UI optimizer

The sidebar includes a **UI optimizer** section. It can:

- choose a balanced, focus, compact, comfort, or performance preset
- adjust density, wide layout, glass/depth effects, reduced motion, corner radius, and font scale
- **Optimize UI** automatically for the current screen/device
- **Apply preset / reconfigure** from the selected preset
- **Reset UI** without deleting Hub data

UI settings are saved in `hub.ui.v1` and sync through the local shared-data file when running through `python server.py`.
