# Demo video (Mac / local download)

The voiced walkthrough is **not** copied to your Mac automatically — it is generated in the cloud or on your machine.

## Fastest on Mac (if you already cloned the repo)

```bash
cd hacktoberfest-build-for-a-friend
npm install
npx playwright install chromium
# Terminal 1
npm run dev
# Terminal 2
TARGET_SEC=50 npm run record:demo
npm run voice:demo
open media/ghostsub-demo-voiced.mp4
```

## While this Cloud Agent is running

1. Open [this agent](https://cursor.com/agents/bc-6a087c4c-9f1a-4ac1-827f-824c392bfea3) → **Desktop** / preview.
2. In the browser go to: `http://127.0.0.1:43123/ghostsub-demo-voiced.mp4`
3. **Save** the file (right‑click → Save, or drag from the player).

## Project Context (Cursor)

**Context** tab → `media/ghostsub-demo-voiced.mp4` → Download.

## Decode from repo (after `git pull` with `demo/ghostsub-demo-voiced.b64`)

```bash
base64 -d demo/ghostsub-demo-voiced.b64 > ~/Downloads/ghostsub-demo-voiced.mp4
open ~/Downloads/ghostsub-demo-voiced.mp4
```
