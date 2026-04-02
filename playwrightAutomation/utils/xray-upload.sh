#!/bin/bash
set -euo pipefail

VERBOSE=0

JIRA_URL="https://jira.dedalus.com"
XRAY_ENDPOINT="/rest/raven/1.0/import/execution"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
JSON_PATH="${SCRIPT_DIR}/../test-results/xray-report.json"

# ====== Read PAT from environment ======
: "${JIRA_PAT:?ERROR: JIRA_PAT environment variable is not set}"

echo "Using JSON_PATH: $JSON_PATH"

if [[ ! -f "$JSON_PATH" ]]; then
  echo "[ERROR] File not found: $JSON_PATH"
  exit 1
fi

RESP_FILE="$(mktemp /tmp/xray_upload_response_XXXX.json)"

HTTP_STATUS=$(curl -sS --fail \
  -H "Authorization: Bearer $JIRA_PAT" \
  -H "Content-Type: application/json" \
  --write-out "%{http_code}" \
  --output "$RESP_FILE" \
  --data-binary @"$JSON_PATH" \
  "$JIRA_URL$XRAY_ENDPOINT")

echo "[OK] Upload completed."
echo "HTTP Status: $HTTP_STATUS"
echo "Response saved to: $RESP_FILE"

exit 0