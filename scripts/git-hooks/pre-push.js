#!/usr/bin/env node
/**
 * Pre-push (Node) — Windows-safe. GitHub Desktop + no WSL bash.
 * Skip: MARCIALE_HOOK_SKIP=1
 * Law XX / Second Sun is NOT a skip.
 */
const { spawnSync } = require("child_process");
const path = require("path");

if (process.env.MARCIALE_HOOK_SKIP === "1") {
  console.log("⚠️  MARCIALE_HOOK_SKIP=1 — pre-push bypassed (must be logged).");
  process.exit(0);
}

const root = spawnSync("git", ["rev-parse", "--show-toplevel"], {
  encoding: "utf8",
  shell: process.platform === "win32",
});
const cwd = (root.stdout || "").trim() || path.resolve(__dirname, "..", "..");

console.log("🛡️  Marciale-OS pre-push: npm test (Law V / Law X)");
const r = spawnSync("npm", ["test"], {
  cwd,
  stdio: "inherit",
  shell: process.platform === "win32",
  env: process.env,
});
if (r.status !== 0) process.exit(r.status == null ? 1 : r.status);
console.log("✅ pre-push green — push may proceed. Two-Key still required for main.");
process.exit(0);
