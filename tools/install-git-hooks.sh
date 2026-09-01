#!/usr/bin/env bash
# Installs repo-local hooks via core.hooksPath (reversible: git config --unset core.hooksPath)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
chmod +x scripts/git-hooks/pre-push
git config core.hooksPath scripts/git-hooks
echo "hooksPath -> scripts/git-hooks (pre-push active)"
git config --get core.hooksPath
