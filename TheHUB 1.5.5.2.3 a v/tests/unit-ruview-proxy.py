"""Build 33.0 — RuView Proxy unit tests"""
import json
import os
import sys
import threading
import time
import urllib.request
import urllib.error
import unittest.mock

# Add project root to path
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ROOT)

# Import server module
import importlib.util
spec = importlib.util.spec_from_file_location("server", os.path.join(ROOT, "server.py"))
server_mod = importlib.util.module_from_spec(spec)

# Prevent the server from starting when imported
with unittest.mock.patch("builtins.__name__", "__not_main__"):
    spec.loader.exec_module(server_mod)

# ── Helpers ─────────────────────────────────────────────────────────────
passed = 0
failed = 0

def assert_true(cond, msg=""):
    if not cond:
        raise AssertionError(msg or "Assertion failed")

def test(name, fn):
    global passed, failed
    try:
        fn()
        passed += 1
        print(f"  ✅ {name}")
    except Exception as e:
        failed += 1
        print(f"  ❌ {name}: {e}")

def _test_health_offline():
    """Start a test server and verify health check returns offline when RuView is down."""
    from http.server import ThreadingHTTPServer
    import random
    from urllib.parse import urlparse
    
    test_port = random.randint(19000, 19999)
    
    original_url = server_mod.RUVIEW_URL
    server_mod.RUVIEW_URL = f"http://127.0.0.1:{test_port}"
    server_mod.RUVIEW_HOST = "127.0.0.1"
    server_mod.RUVIEW_PORT = test_port
    
    try:
        class TestHandler(server_mod.Handler):
            def log_message(self, *args):
                pass
        
        httpd = ThreadingHTTPServer(("127.0.0.1", 0), TestHandler)
        actual_port = httpd.server_address[1]
        
        t = threading.Thread(target=httpd.serve_forever, daemon=True)
        t.start()
        time.sleep(0.2)
        
        try:
            url = f"http://127.0.0.1:{actual_port}/ruview-proxy/health"
            req = urllib.request.Request(url)
            try:
                resp = urllib.request.urlopen(req, timeout=5)
                data = json.loads(resp.read())
                assert_true(data.get("status") == "offline", f"Expected offline, got {data}")
            except urllib.error.HTTPError as e:
                assert_true(e.code == 503, f"Expected 503, got {e.code}")
                data = json.loads(e.read())
                assert_true(data.get("status") == "offline", f"Expected offline, got {data}")
        finally:
            httpd.shutdown()
    finally:
        server_mod.RUVIEW_URL = original_url
        parsed = urlparse(original_url)
        server_mod.RUVIEW_HOST = parsed.hostname or "127.0.0.1"
        server_mod.RUVIEW_PORT = parsed.port or 3000

# ── Tests ───────────────────────────────────────────────────────────────
print("RuView Proxy unit tests:")

test("RUVIEW_URL has correct default", lambda: (
    assert_true(isinstance(server_mod.RUVIEW_URL, str) and "http" in server_mod.RUVIEW_URL)
))

test("RUVIEW_HOST parsed from URL", lambda: (
    assert_true(server_mod.RUVIEW_HOST in ("127.0.0.1", "localhost", "ruview"))
))

test("RUVIEW_PORT parsed from URL", lambda: (
    assert_true(isinstance(server_mod.RUVIEW_PORT, int) and server_mod.RUVIEW_PORT > 0)
))

test("Handler has _handle_ruview_proxy method", lambda: (
    assert_true(hasattr(server_mod.Handler, '_handle_ruview_proxy'))
))

test("Handler has _ruview_health_check method", lambda: (
    assert_true(hasattr(server_mod.Handler, '_ruview_health_check'))
))

test("Handler has _handle_ruview_ws_upgrade method", lambda: (
    assert_true(hasattr(server_mod.Handler, '_handle_ruview_ws_upgrade'))
))

test("_ws_relay function exists at module level", lambda: (
    assert_true(hasattr(server_mod, '_ws_relay') and callable(server_mod._ws_relay))
))

test("Health check returns offline when RuView is down", _test_health_offline)

def test_csp():
    index_path = os.path.join(ROOT, "index.html")
    with open(index_path) as f:
        html = f.read()
    assert_true("connect-src" in html.lower())
test("CSP allows connect-src for proxy connections", test_csp)

def test_docker_compose():
    dc_path = os.path.join(ROOT, "docker-compose.yml")
    assert_true(os.path.exists(dc_path), "docker-compose.yml not found")
    with open(dc_path) as f:
        content = f.read()
    assert_true("ruview" in content, "Missing ruview service")
    assert_true("3000:3000" in content, "Missing RuView port mapping")
    assert_true("8000:8000" in content, "Missing Hub port mapping")
    assert_true("SIMULATION_MODE" in content, "Missing SIMULATION_MODE env var")
test("docker-compose.yml exists with correct services", test_docker_compose)

def test_dockerfile():
    df_path = os.path.join(ROOT, "ruview", "Dockerfile.hub")
    assert_true(os.path.exists(df_path), "Dockerfile.hub not found")
    with open(df_path) as f:
        content = f.read()
    assert_true("python" in content.lower())
    assert_true("server.py" in content)
test("ruview/Dockerfile.hub exists", test_dockerfile)

def test_readme():
    readme_path = os.path.join(ROOT, "README-ruview.md")
    assert_true(os.path.exists(readme_path), "README-ruview.md not found")
    with open(readme_path) as f:
        content = f.read()
    assert_true("docker-compose" in content)
    assert_true("health" in content.lower())
    assert_true("simulation" in content.lower())
    assert_true("proxy" in content.lower())
test("README-ruview.md exists with correct content", test_readme)

test("server.py has select import for WebSocket relay", lambda: (
    assert_true("import select" in open(os.path.join(ROOT, "server.py")).read())
))

test("server.py has threading import for WS relay", lambda: (
    assert_true("import threading" in open(os.path.join(ROOT, "server.py")).read())
))

print(f"\n✅ RuView Proxy unit tests: {passed} passed, {failed} failed")
if failed > 0:
    sys.exit(1)
