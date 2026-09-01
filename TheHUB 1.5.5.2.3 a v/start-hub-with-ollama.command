#!/bin/zsh
cd "$(dirname "$0")"
if command -v ollama >/dev/null 2>&1; then
  echo "Starting Ollama for Hub in the background..."
  OLLAMA_ORIGINS=http://127.0.0.1:8000 ollama serve >/tmp/hub-ollama.log 2>&1 &
else
  echo "Ollama command not found. Starting Hub only."
fi
sleep 2
./start-hub.command
