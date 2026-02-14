#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${ROOT_DIR}"

HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-4180}"
OPEN_BROWSER="${OPEN_BROWSER:-1}"
MODE="${1:-dev}"

if [[ ! -d node_modules ]]; then
  echo "[run-site] node_modules not found, installing dependencies..."
  npm install
fi

open_url() {
  local url="$1"
  if [[ "${OPEN_BROWSER}" != "1" ]]; then
    return
  fi

  if command -v open >/dev/null 2>&1; then
    (sleep 2; open "${url}") >/dev/null 2>&1 &
  elif command -v xdg-open >/dev/null 2>&1; then
    (sleep 2; xdg-open "${url}") >/dev/null 2>&1 &
  fi
}

case "${MODE}" in
  dev)
    echo "[run-site] Starting dev server on http://${HOST}:${PORT}"
    open_url "http://${HOST}:${PORT}"
    npm run serve -- --host "${HOST}" --port "${PORT}"
    ;;
  build)
    echo "[run-site] Building production assets..."
    npm run build
    ;;
  preview)
    echo "[run-site] Building then previewing dist on http://${HOST}:${PORT}"
    npm run build
    open_url "http://${HOST}:${PORT}"
    python3 -m http.server "${PORT}" --bind "${HOST}" --directory dist
    ;;
  *)
    echo "Usage: ./run-site.sh [dev|build|preview]"
    exit 1
    ;;
esac
