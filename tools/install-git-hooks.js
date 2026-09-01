#!/usr/bin/env node
/**
 * Cross-platform hook install (Windows PowerShell / macOS / Linux).
 * Does NOT require WSL or bash on PATH.
 * On Windows, if `git` is missing from PATH, searches GitHub Desktop's bundled Git
 * and "Git for Windows" default install.
 * Reversible: git config --unset core.hooksPath
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const root = path.resolve(__dirname, "..");
const hooksDir = path.join(root, "scripts", "git-hooks");
const prePush = path.join(hooksDir, "pre-push");

if (!fs.existsSync(prePush)) {
  console.error("Missing", prePush);
  process.exit(1);
}

try {
  fs.chmodSync(prePush, 0o755);
} catch (_) {
  /* Windows has no chmod semantics; Git for Windows still runs the hook via its own sh */
}

function quote(p) {
  return /\s/.test(p) ? `"${p}"` : p;
}

function candidates() {
  const list = ["git"];
  if (process.platform !== "win32") return list;
  const local = process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local");
  const pf = process.env["ProgramFiles"] || "C:\\Program Files";
  const pf86 = process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)";
  const desktopRoot = path.join(local, "GitHubDesktop");
  if (fs.existsSync(desktopRoot)) {
    try {
      for (const name of fs.readdirSync(desktopRoot)) {
        if (!name.startsWith("app-")) continue;
        list.push(path.join(desktopRoot, name, "resources", "app", "git", "cmd", "git.exe"));
      }
    } catch (_) {}
  }
  list.push(
    path.join(pf, "Git", "cmd", "git.exe"),
    path.join(pf86, "Git", "cmd", "git.exe"),
    path.join(local, "Programs", "Git", "cmd", "git.exe")
  );
  return list;
}

function resolveGit() {
  for (const c of candidates()) {
    try {
      const cmd = c === "git" ? "git --version" : `${quote(c)} --version`;
      execSync(cmd, { stdio: "pipe" });
      return c;
    } catch (_) {}
  }
  return null;
}

const git = resolveGit();
if (!git) {
  console.error("No git executable found.");
  console.error("PowerShell has npm but not git. Do ONE of:");
  console.error("  1) GitHub Desktop → Repository → Open in Git Bash → npm run hooks:install");
  console.error("  2) Install Git for Windows and reopen the terminal");
  process.exit(1);
}

const gitCmd = git === "git" ? "git" : quote(git);
console.log("using git ->", git);
execSync(`${gitCmd} config core.hooksPath scripts/git-hooks`, { cwd: root, stdio: "inherit" });
const set = execSync(`${gitCmd} config --get core.hooksPath`, { cwd: root, encoding: "utf8" }).trim();
console.log("hooksPath ->", set);
console.log("pre-push will run on `git push` via Git's own sh (not WSL).");
console.log("Skip (Git Bash):  MARCIALE_HOOK_SKIP=1 git push");
console.log("Skip (PowerShell, if git on PATH):  $env:MARCIALE_HOOK_SKIP=1; git push");
