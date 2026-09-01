# Start Hub quickly

## Windows

Double-click:

```txt
start-hub.bat
```

It opens a terminal, starts the local Hub server, and opens Chrome/default browser at:

```txt
http://127.0.0.1:8000
```

Keep the terminal window open while using Hub. Close it or press `Ctrl+C` to stop.

You can right-click `start-hub.bat` → **Create shortcut** → move the shortcut to your Desktop or Start menu.

## macOS

Double-click:

```txt
start-hub.command
```

If macOS blocks it the first time, run this once in Terminal from the Hub folder:

```bash
chmod +x start-hub.command
```

## Linux

Run:

```bash
chmod +x start-hub.sh
./start-hub.sh
```

## Can a note/link start the terminal automatically?

Usually no. Browsers and note apps intentionally block web links from running terminal commands because that would be a major security risk.

The safe quick-start method is a local script/shortcut:

- `start-hub.bat` on Windows
- `start-hub.command` on macOS
- `start-hub.sh` on Linux

You can keep a note with a reminder/link to the script path, but the OS may still ask before running it.

## Recommended Windows shortcut setup

1. Find `start-hub-with-ollama.bat` in the Hub folder.
2. Right-click it → **Create shortcut**.
3. Rename the shortcut to `Start Hub`.
4. Move the shortcut to your Desktop.
5. Optional: right-click the shortcut → **Properties** → **Change Icon**.
6. Double-click `Start Hub` whenever you want to use Hub locally.
7. Keep the terminal windows open while using Hub. Close them or press `Ctrl+C` to stop.

If you do not need the Assistant/Ollama, make the shortcut from `start-hub.bat` instead.

## Why did it open Edge, and why did Chrome show an old Hub?

Windows opens web links in your default browser unless a launcher explicitly opens Chrome. The launchers now try to open Google Chrome directly. If Chrome is not installed in the standard location, Windows falls back to your default browser.

Chrome showing an older Hub is usually caused by the browser/service-worker cache for `http://127.0.0.1:8000`. The launchers now open Hub with a cache-busting URL like:

```txt
http://127.0.0.1:8000/?hub_launch=...
```

The service worker is also changed to network-first for the app page, so future updates should appear immediately.

If Chrome still shows an old version:

1. Open Chrome DevTools on Hub (`F12`).
2. Go to **Application** → **Service Workers**.
3. Click **Unregister** for `127.0.0.1:8000`.
4. Go to **Application** → **Storage**.
5. Click **Clear site data**.
6. Close Hub tabs.
7. Start Hub again with `start-hub.bat` or `start-hub-with-ollama.bat`.

Warning: Clear site data removes local Hub data in that browser. Export a full backup first if you need to keep your data.

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
