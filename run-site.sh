#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${ROOT_DIR}"

HOST="${HOST:-}"
PORT="${PORT:-4180}"
OPEN_BROWSER="${OPEN_BROWSER:-1}"
MODE="${1:-dev}"
LT_SUBDOMAIN="${LT_SUBDOMAIN:-}"

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
    RUN_HOST="${HOST:-127.0.0.1}"
    echo "[run-site] Starting dev server on http://${RUN_HOST}:${PORT}"
    open_url "http://127.0.0.1:${PORT}"
    npm run serve -- --host "${RUN_HOST}" --port "${PORT}"
    ;;
  build)
    echo "[run-site] Building production assets..."
    npm run build
    ;;
  preview)
    RUN_HOST="${HOST:-127.0.0.1}"
    echo "[run-site] Building then previewing dist on http://${RUN_HOST}:${PORT}"
    npm run build
    open_url "http://127.0.0.1:${PORT}"
    python3 -m http.server "${PORT}" --bind "${RUN_HOST}" --directory dist
    ;;
  public)
    RUN_HOST="${HOST:-0.0.0.0}"
    echo "[run-site] Building and starting public server on http://${RUN_HOST}:${PORT}"
    npm run build
    open_url "http://127.0.0.1:${PORT}"
    HOST="${RUN_HOST}" PORT="${PORT}" node ./server/feedback-server.js
    ;;
  public-tunnel)
    RUN_HOST="${HOST:-0.0.0.0}"
    echo "[run-site] Building and starting server on http://${RUN_HOST}:${PORT}"
    npm run build
    HOST="${RUN_HOST}" PORT="${PORT}" node ./server/feedback-server.js &
    SERVER_PID=$!
    trap 'kill ${SERVER_PID} >/dev/null 2>&1 || true' EXIT INT TERM

    sleep 1
    echo "[run-site] Local server is running. Creating public tunnel..."
    if [[ -n "${LT_SUBDOMAIN}" ]]; then
      npx localtunnel --port "${PORT}" --subdomain "${LT_SUBDOMAIN}"
    else
      npx localtunnel --port "${PORT}"
    fi
    ;;
  *)
    echo "Usage: ./run-site.sh [dev|build|preview|public|public-tunnel]"
    exit 1
    ;;
esac
