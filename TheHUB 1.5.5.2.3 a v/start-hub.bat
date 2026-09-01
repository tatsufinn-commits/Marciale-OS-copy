@echo off
setlocal EnableDelayedExpansion

:: =============================================================
::  TheHUB Startup Script — Build 33.3.1 (Hotfix Revision 2)
::  Auto-starts RuView Docker container, then launches TheHUB
:: =============================================================

echo.
echo ========================================
echo   TheHUB Personal Command Center
echo   Starting up services...
echo ========================================
echo.

:: --- Step 1: Check if Docker is installed ---
where docker >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [WARN] Docker is not installed. RuView will be unavailable.
    echo        TheHUB will start without WiFi sensing features.
    echo.
    goto start_hub
)

:: --- Step 2: Check if Docker daemon is running ---
docker info >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [INFO] Docker daemon not running. Attempting to start Docker Desktop...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    echo [INFO] Waiting for Docker to initialize ^(up to 60 seconds^)...

    set /a counter=0
    :wait_docker
    timeout /t 3 /nobreak >nul
    docker info >nul 2>&1
    if !ERRORLEVEL! equ 0 goto docker_ready
    set /a counter=!counter!+3
    if !counter! lss 60 goto wait_docker

    echo [ERROR] Docker failed to start within 60 seconds.
    echo         TheHUB will start without RuView.
    goto start_hub

    :docker_ready
    echo [OK] Docker is now running.
)

:: --- Step 3: Check if RuView container is already up ---
docker ps --filter "name=thehub-ruview" --filter "status=running" --format "{{.Names}}" | findstr /i "thehub-ruview" >nul
if %ERRORLEVEL% equ 0 (
    echo [OK] RuView is already running.
    goto start_hub
)

:: --- Step 4: Start RuView via docker-compose ---
echo [INFO] Starting RuView container...
docker-compose up -d
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to start RuView. TheHUB will start without it.
    goto start_hub
)

:: --- Step 5: Wait for RuView HTTP to respond ---
echo [INFO] Waiting for RuView to become ready...
set /a counter=0
:wait_ruview
timeout /t 2 /nobreak >nul
curl -s -o nul -w "%%{http_code}" http://localhost:3000/ui/observatory.html 2>nul | findstr "200" >nul
if !ERRORLEVEL! equ 0 goto ruview_ready
set /a counter=!counter!+2
if !counter! lss 30 goto wait_ruview

echo [WARN] RuView did not respond within 30 seconds. Continuing anyway.
goto start_hub

:ruview_ready
echo [OK] RuView is ready at http://localhost:3000

:start_hub
echo.
echo [INFO] Launching TheHUB server on http://localhost:8000
echo.

:: --- Step 6: Open browser after short delay, then run server ---
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:8000"

:: Run the Python server (blocking, keeps window open)
python server.py

endlocal
pause
