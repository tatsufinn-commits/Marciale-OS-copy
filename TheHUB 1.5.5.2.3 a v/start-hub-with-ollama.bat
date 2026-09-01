@echo off
setlocal
cd /d "%~dp0"
title Hub + Ollama Launcher
echo Starting Ollama in a separate window with restricted origin...
where ollama >nul 2>nul
if %errorlevel%==0 (
  start "Ollama for Hub" cmd /k "set OLLAMA_ORIGINS=http://127.0.0.1:8000 && ollama serve"
) else (
  echo Ollama command not found. Starting Hub only.
)
timeout /t 2 /nobreak >nul
call "%~dp0start-hub.bat"
