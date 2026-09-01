#!/usr/bin/env python3
"""
Small authenticated proxy in front of Ollama.

Use this if you want to expose local Ollama through a tunnel. Do NOT expose raw
Ollama (port 11434) to the public internet.

Usage:
    export HUB_KEY="paste-a-long-random-string-here"
    python ollama-proxy.py
    cloudflared tunnel --url http://localhost:11435

In Hub → Assistant → ⚙️ settings:
    Ollama URL = the https://....trycloudflare.com URL
    Secret key = HUB_KEY
"""
import json
import os
import sys
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

OLLAMA = os.environ.get("OLLAMA_TARGET", "http://127.0.0.1:11434").rstrip("/")
LISTEN_HOST = os.environ.get("PROXY_HOST", "127.0.0.1")
LISTEN_PORT = int(os.environ.get("PROXY_PORT", "11435"))
KEY = os.environ.get("HUB_KEY", "")
ALLOWED_PATHS = {"/api/tags", "/api/chat", "/api/generate", "/api/ps"}
MAX_BODY = 2 * 1024 * 1024  # 2 MB


class Proxy(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Hub-Key")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def _json(self, obj, code):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _auth_ok(self):
        return bool(KEY) and self.headers.get("X-Hub-Key", "") == KEY

    def _path_ok(self):
        return urlparse(self.path).path in ALLOWED_PATHS

    def _forward(self, method):
        if not self._auth_ok():
            return self._json({"error": "unauthorized"}, 401)
        if not self._path_ok():
            return self._json({"error": "endpoint not allowed"}, 403)

        body = None
        if method == "POST":
            length = int(self.headers.get("Content-Length", 0))
            if length > MAX_BODY:
                return self._json({"error": "request too large"}, 413)
            body = self.rfile.read(length) if length else b""

        url = OLLAMA + self.path
        req = urllib.request.Request(url, data=body, method=method)
        req.add_header("Content-Type", "application/json")
        try:
            with urllib.request.urlopen(req, timeout=300) as resp:
                data = resp.read()
                self.send_response(resp.status)
                self._cors()
                self.send_header("Content-Type", resp.headers.get("Content-Type", "application/json"))
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)
        except urllib.error.HTTPError as e:
            data = e.read()
            self.send_response(e.code)
            self._cors()
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:
            self._json({"error": str(e)}, 502)

    def do_GET(self):
        self._forward("GET")

    def do_POST(self):
        self._forward("POST")

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    if not KEY:
        print("ERROR: HUB_KEY is required. Example:")
        print("  export HUB_KEY='a-long-random-string'")
        sys.exit(1)

    print(f"🔐 Ollama proxy on http://{LISTEN_HOST}:{LISTEN_PORT}  ->  {OLLAMA}")
    print("   Auth: ENABLED (X-Hub-Key required)")
    print("   Allowed endpoints:", ", ".join(sorted(ALLOWED_PATHS)))
    print(f"   Tunnel this proxy, not raw Ollama: cloudflared tunnel --url http://localhost:{LISTEN_PORT}")
    ThreadingHTTPServer((LISTEN_HOST, LISTEN_PORT), Proxy).serve_forever()
