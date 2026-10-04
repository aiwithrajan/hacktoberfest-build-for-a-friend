import { chromium } from "playwright";
import { mkdir, copyFile, readdir, unlink } from "fs/promises";
import path from "path";

import { fileURLToPath } from "url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultMedia = path.join(repoRoot, "media");
const mediaDir = process.env.MEDIA_DIR || defaultMedia;
const TARGET_SEC = Number(process.env.TARGET_SEC || "50");
await mkdir(mediaDir, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  recordVideo: { dir: mediaDir, size: { width: 1280, height: 720 } },
  viewport: { width: 1280, height: 720 },
});
const page = await context.newPage();
const started = Date.now();

await page.goto("http://127.0.0.1:43123", { waitUntil: "networkidle" });
await sleep(3500);

await page.getByRole("button", { name: /Load demo CSV/i }).click();
await sleep(4500);

const issues = page.locator("ul li button").filter({ hasText: "GHOST-" });
const count = await issues.count();
for (let i = 0; i < Math.min(2, count); i++) {
  await issues.nth(i).scrollIntoViewIfNeeded();
  await sleep(1200);
}

if (count > 0) {
  await issues.first().click();
  await sleep(5500);
  await page.keyboard.press("Escape");
  await sleep(800);
}

await page.locator("#armor").scrollIntoViewIfNeeded();
await sleep(3500);

await page.locator("#split").scrollIntoViewIfNeeded();
await sleep(2000);
const splitBtn = page.getByRole("button", { name: /Load friend \+ roommate/i });
if (await splitBtn.count()) {
  await splitBtn.click();
  await sleep(5000);
}

await page.locator("#radar").scrollIntoViewIfNeeded();
await sleep(2000);

const elapsed = Date.now() - started;
const pad = TARGET_SEC * 1000 - elapsed;
if (pad > 0) await sleep(pad);

await context.close();
await browser.close();

const out = path.join(mediaDir, "ghostsub-demo.webm");
for (const f of await readdir(mediaDir)) {
  if (f.endsWith(".webm") && f !== "ghostsub-demo.webm") {
    await copyFile(path.join(mediaDir, f), out);
    try {
      await unlink(path.join(mediaDir, f));
    } catch {
      /* ignore */
    }
    break;
  }
}
console.log(`Saved ${out} (target ~${TARGET_SEC}s, scripted ~${Math.round(elapsed / 1000)}s + pad)`);
