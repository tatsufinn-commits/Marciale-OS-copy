# =============================================================
#  TheHUB Startup Script — Build 33.3.1
#  Auto-starts RuView Docker container, then launches TheHUB
# =============================================================

Set-Location -LiteralPath $PSScriptRoot

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TheHUB Personal Command Center" -ForegroundColor Cyan
Write-Host "  Starting up services..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

function Test-DockerInstalled {
    return $null -ne (Get-Command docker -ErrorAction SilentlyContinue)
}

function Test-DockerRunning {
    try {
        docker info 2>&1 | Out-Null
        return $LASTEXITCODE -eq 0
    } catch { return $false }
}

function Test-RuViewRunning {
    $running = docker ps --filter "name=thehub-ruview" --filter "status=running" --format "{{.Names}}" 2>$null
    return $running -match "thehub-ruview"
}

function Wait-RuViewReady {
    param([int]$TimeoutSec = 30)
    $elapsed = 0
    while ($elapsed -lt $TimeoutSec) {
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:3000/ui/observatory.html" -TimeoutSec 2 -UseBasicParsing -ErrorAction SilentlyContinue
            if ($response.StatusCode -eq 200) { return $true }
        } catch {}
        Start-Sleep -Seconds 2
        $elapsed += 2
    }
    return $false
}

# --- Step 1: Check Docker installation ---
if (-not (Test-DockerInstalled)) {
    Write-Host "[WARN] Docker not installed. RuView will be unavailable." -ForegroundColor Yellow
} else {
    # --- Step 2: Ensure Docker daemon is running ---
    if (-not (Test-DockerRunning)) {
        Write-Host "[INFO] Starting Docker Desktop..." -ForegroundColor Yellow
        Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe" -ErrorAction SilentlyContinue
        $timeout = 60
        while (-not (Test-DockerRunning) -and $timeout -gt 0) {
            Start-Sleep -Seconds 3
            $timeout -= 3
        }
        if (Test-DockerRunning) {
            Write-Host "[OK] Docker is running." -ForegroundColor Green
        } else {
            Write-Host "[ERROR] Docker failed to start. Continuing without RuView." -ForegroundColor Red
        }
    }

    # --- Step 3 & 4: Start RuView if not running ---
    if (Test-DockerRunning) {
        if (Test-RuViewRunning) {
            Write-Host "[OK] RuView is already running." -ForegroundColor Green
        } else {
            Write-Host "[INFO] Starting RuView container..." -ForegroundColor Yellow
            docker-compose up -d
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[INFO] Waiting for RuView to become ready..." -ForegroundColor Yellow
                if (Wait-RuViewReady -TimeoutSec 30) {
                    Write-Host "[OK] RuView ready at http://localhost:3000" -ForegroundColor Green
                } else {
                    Write-Host "[WARN] RuView did not respond in time. Continuing anyway." -ForegroundColor Yellow
                }
            }
        }
    }
}

# --- Step 5: Launch TheHUB ---
Write-Host ""
Write-Host "[INFO] Launching TheHUB on http://localhost:8000" -ForegroundColor Cyan
Write-Host ""

# Open browser after short delay
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 3
    Start-Process "http://localhost:8000"
} | Out-Null

# Run server (blocking)
python server.py
