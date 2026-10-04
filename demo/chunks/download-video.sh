#!/usr/bin/env bash
set -euo pipefail
BASE="https://raw.githubusercontent.com/aiwithrajan/hacktoberfest-build-for-a-friend/main/demo/chunks"
OUT="${1:-$HOME/Downloads/ghostsub-demo-voiced.mp4}"
TMP=$(mktemp)
for i in $(seq -w 0 16); do
  curl -fsSL "$BASE/${i}.b64part" >> "$TMP"
done
base64 -d < "$TMP" > "$OUT"
rm -f "$TMP"
echo "Saved: $OUT"
open "$OUT" 2>/dev/null || true
