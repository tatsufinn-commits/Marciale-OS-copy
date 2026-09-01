#!/usr/bin/env bash
# =============================================================
#  TheHUB Startup Script — Build 33.3.1
#  Auto-starts RuView Docker container, then launches TheHUB
# =============================================================

set -e

echo ""
echo "========================================"
echo "  TheHUB Personal Command Center"
echo "  Starting up services..."
echo "========================================"
echo ""

# --- Detect Docker ---
if ! command -v docker &> /dev/null; then
    echo "[WARN] Docker not installed. RuView will be unavailable."
else
    # --- Ensure Docker daemon is running ---
    if ! docker info &> /dev/null; then
        echo "[INFO] Docker daemon not running."
        if [[ "$OSTYPE" == "darwin"* ]]; then
            echo "[INFO] Starting Docker Desktop for Mac..."
            open -a Docker
            # Wait up to 60s for Docker to start
            counter=0
            while ! docker info &> /dev/null && [ $counter -lt 60 ]; do
                sleep 3
                counter=$((counter + 3))
            done
        else
            echo "[INFO] Attempting to start Docker service..."
            sudo systemctl start docker 2>/dev/null || true
            sleep 5
        fi

        if docker info &> /dev/null; then
            echo "[OK] Docker is running."
        else
            echo "[ERROR] Docker did not start. Continuing without RuView."
        fi
    fi

    # --- Start RuView container if not already running ---
    if docker info &> /dev/null; then
        if docker ps --filter "name=thehub-ruview" --filter "status=running" --format "{{.Names}}" | grep -q "thehub-ruview"; then
            echo "[OK] RuView is already running."
        else
            echo "[INFO] Starting RuView container..."
            docker-compose up -d
            echo "[INFO] Waiting for RuView to become ready..."
            counter=0
            while [ $counter -lt 30 ]; do
                if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ui/observatory.html | grep -q "200"; then
                    echo "[OK] RuView ready at http://localhost:3000"
                    break
                fi
                sleep 2
                counter=$((counter + 2))
            done
            if [ $counter -ge 30 ]; then
                echo "[WARN] RuView did not respond in time. Continuing anyway."
            fi
        fi
    fi
fi

# --- Launch TheHUB ---
echo ""
echo "[INFO] Launching TheHUB on http://localhost:8000"
echo ""

# Open browser after short delay
(sleep 3 && (xdg-open http://localhost:8000 2>/dev/null || open http://localhost:8000 2>/dev/null)) &

# Run the server (blocking)
python3 server.py
