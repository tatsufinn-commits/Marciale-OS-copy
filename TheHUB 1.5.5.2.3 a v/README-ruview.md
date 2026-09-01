# 🛰️ RuView Integration — TheHUB Build 33.0

## Overview

RuView is a WiFi sensing platform that turns ordinary WiFi signals into spatial intelligence. It detects people through walls, measures breathing and heart rate, and tracks movement — all without cameras or wearables.

TheHUB integrates RuView as a local service alongside `server.py` and Ollama. The integration uses a Docker container for the RuView sensing server and proxies all requests through TheHUB's server to solve CORS.

---

## Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Start both TheHUB and RuView in simulation mode
docker-compose up

# Or start them in the background
docker-compose up -d
```

After startup:
- **TheHUB:** http://127.0.0.1:8000
- **RuView (direct):** http://127.0.0.1:3000
- **RuView (proxied):** http://127.0.0.1:8000/ruview-proxy/
- **Health check:** http://127.0.0.1:8000/ruview-proxy/health

### Option 2: Manual (No Docker)

```bash
# Terminal 1: Start RuView (if installed locally)
python -m v1.src.sensing.ws_server
# Or with Docker only for RuView:
docker run -p 3000:3000 -p 8765:8765 -e CSI_SOURCE=simulated ruvnet/wifi-densepose:latest

# Terminal 2: Start TheHUB
python3 server.py
```

### Option 3: TheHUB Only (No RuView)

```bash
python3 server.py
```

TheHUB works without RuView. The health check will return `503 offline`, and the RuView tab will show an offline state. All other features (tasks, notes, calendar, Marciale, etc.) work normally.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         Browser (TheHUB)                         │
│                                                                  │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐  │
│  │ Today Tab   │    │ RuView Tab  │    │ Marciale Assistant  │  │
│  │ (presence   │    │ (iframe     │    │ (context injection) │  │
│  │  card)      │    │  embed)     │    │                     │  │
│  └──────┬──────┘    └──────┬──────┘    └──────────┬──────────┘  │
│         │                  │                       │             │
│         └──────────────────┼───────────────────────┘             │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                    http://127.0.0.1:8000
                             │
                ┌────────────┼────────────────┐
                │      server.py (proxy)      │
                │                             │
                │  /ruview-proxy/*  ──────────┼──→ http://localhost:3000
                │  /ruview-proxy/health       │    (RuView Docker)
                │  /ruview-proxy/ws/*  ───────┼──→ ws://localhost:3000
                │                             │
                │  /api/*  (Hub APIs)         │
                │  /*      (static files)     │
                └─────────────────────────────┘
                             │
                ┌────────────┼────────────────┐
                │     RuView Docker Container │
                │                             │
                │  :3000  UI Dashboard        │
                │  :8765  WebSocket Sensing   │
                │  /api/v1/*  REST API        │
                │  /health  Health Check      │
                │                             │
                │  Mode: SIMULATION           │
                └─────────────────────────────┘
```

---

## Proxy Routes

| TheHUB Route | Target | Purpose |
|---|---|---|
| `/ruview-proxy/health` | Local health check | Returns RuView connection status |
| `/ruview-proxy/` | `http://localhost:3000/` | RuView UI (served in iframe) |
| `/ruview-proxy/ui/index.html` | `http://localhost:3000/ui/index.html` | RuView main page |
| `/ruview-proxy/api/v1/*` | `http://localhost:3000/api/v1/*` | RuView REST API |
| `/ruview-proxy/ws/sensing` | `ws://localhost:3000/ws/sensing` | WebSocket sensing stream |

---

## Health Check

The health endpoint lets TheHUB detect if RuView is running before trying to embed or connect.

### Request
```
GET /ruview-proxy/health
```

### Success Response (200)
```json
{
  "status": "ok",
  "ruview_url": "http://127.0.0.1:3000",
  "response": { ... }
}
```

### Failure Response (503)
```json
{
  "status": "offline",
  "ruview_url": "http://127.0.0.1:3000",
  "error": "Connection refused"
}
```

---

## Simulation Mode

By default, Docker Compose runs RuView in **simulation mode** (`CSI_SOURCE=simulated`). This generates synthetic WiFi sensing data so you can develop and test without real ESP32 hardware.

Simulation data includes:
- Presence detection (person detected / not detected)
- Motion level classification (still, seated, moving, active)
- Breathing rate (12–18 BPM simulated)
- Signal field (20×20 Gaussian splat grid)
- RSSI values (simulated WiFi signal strength)

---

## Real Hardware (Future)

When you're ready to use real ESP32 hardware:

1. **Flash an ESP32-S3** ($9) with the RuView CSI firmware:
   ```bash
   python -m esptool --chip esp32s3 --port COM9 --baud 460800 \
     write_flash 0x0 bootloader.bin 0x8000 partition-table.bin \
     0xf000 ota_data_initial.bin 0x20000 esp32-csi-node.bin
   ```

2. **Provision WiFi**:
   ```bash
   python firmware/esp32-csi-node/provision.py --port COM9 \
     --ssid "YourWiFi" --password "secret" --target-ip 192.168.1.20
   ```

3. **Update Docker Compose** — change `CSI_SOURCE=simulated` to `CSI_SOURCE=esp32`

4. **Restart**: `docker-compose restart ruview`

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `RUVIEW_URL` | `http://127.0.0.1:3000` | RuView server URL (Docker uses `http://ruview:3000`) |
| `CSI_SOURCE` | `simulated` | Data source: `simulated`, `esp32`, `auto`, `wifi` |
| `SIMULATION_MODE` | `true` | Enable synthetic data generation |
| `HUB_PORT` | `8000` | TheHUB server port |
| `HUB_HOST` | `127.0.0.1` | TheHUB bind address |
| `RUVIEW_ALLOW_UNAUTHENTICATED` | `1` | Allow unauthenticated API access (safe on localhost) |

---

## Troubleshooting

### Health check returns 503
```
{"status": "offline", "error": "Connection refused"}
```
**Cause:** RuView Docker container is not running.
**Fix:** `docker-compose up ruview` or `docker-compose up`

### iframe shows blank page
**Cause:** RuView UI files not found at the proxy path.
**Fix:** Check that RuView is running: `curl http://127.0.0.1:3000/health`

### WebSocket connection fails
**Cause:** WebSocket proxy not reaching RuView.
**Fix:** Verify the WS port is exposed: `docker ps` should show `8765:8765`

### CORS errors in browser console
**Cause:** Direct connection to `localhost:3000` instead of through proxy.
**Fix:** Always access RuView through `/ruview-proxy/` — never directly.

---

## Build History

- **Build 33.0** — Service foundation: Docker Compose, server.py proxy, health check, README

---

## References

- [RuView GitHub](https://github.com/ruvnet/RuView)
- [RuView Docker Hub](https://hub.docker.com/r/ruvnet/wifi-densepose)
- [RuView Pretrained Model](https://huggingface.co/ruvnet/wifi-densepose-pretrained)
- [MASTER_ROADMAP_V7.md](./MASTER_ROADMAP_V7.md)
