#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MEDIA="${MEDIA_DIR:-$ROOT/media}"
mkdir -p "$MEDIA"

VIDEO="${1:-$MEDIA/ghostsub-demo.mp4}"
NARR="$MEDIA/ghostsub-narration.mp3"
OUT="$MEDIA/ghostsub-demo-voiced.mp4"

python3 -m pip install -q edge-tts
python3 -m edge_tts --voice en-US-GuyNeural --rate="-3%" \
  --file "$ROOT/scripts/narration.txt" --write-media "$NARR"

ffmpeg -y -i "$VIDEO" -i "$NARR" \
  -c:v copy -c:a aac -b:a 192k \
  -map 0:v:0 -map 1:a:0 \
  -shortest "$OUT"

echo "Wrote $OUT"
