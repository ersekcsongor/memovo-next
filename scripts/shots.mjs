// Screenshots every route of the running Next.js server and reports broken images.
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const BASE = process.env.BASE || "http://localhost:3100";
const OUT = path.resolve("shots");
const ROUTES = [
  "/",
  "/weddings",
  "/pricing",
  "/how-it-works",
  "/gallery",
  "/gallery-demo",
  "/press-features",
  "/community-events",
  "/reviews",
  "/faqs",
  "/design-themes",
  "/contact",
  "/events/engagements",
  "/events/party",
  "/events/kids-parties",
  "/events/business",
  "/events/memorials",
  "/events/seasonal-holidays",
  "/events/company-christmas-parties",
];

fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });

for (const route of ROUTES) {
  const name = route === "/" ? "home" : route.slice(1).replace(/\//g, "-");
  await page.goto(BASE + route, { waitUntil: "networkidle2", timeout: 90000 });

  // Trigger every lazy image, then settle at the top again. The pause has to be long
  // enough for the intersection callback to fire, or images below the fold never start.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, 0);
  });
  // Wait until every image has settled, so a slow CDN response is never counted as broken.
  await page
    .waitForFunction(() => [...document.images].every((i) => i.complete), { timeout: 60000, polling: 500 })
    .catch(() => {});
  await new Promise((r) => setTimeout(r, 500));

  const report = await page.evaluate(() => {
    const imgs = [...document.images];
    return {
      height: document.body.scrollHeight,
      total: imgs.length,
      broken: imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
    };
  });

  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
  const flag = report.broken.length ? `✗ ${report.broken.length} BROKEN` : "✓";
  console.log(`${flag}  ${route.padEnd(36)} ${report.height}px  ${report.total} imgs`);
  for (const b of report.broken.slice(0, 5)) console.log(`      ${b}`);
}

await browser.close();
