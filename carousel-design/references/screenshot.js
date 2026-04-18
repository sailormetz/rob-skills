/**
 * screenshot.js
 * Screenshots each .slide element in a carousel HTML file at 1080×1920.
 * Saves as slide_01.jpg, slide_02.jpg, etc. in the output directory.
 *
 * Usage:
 *   node screenshot.js --html path/to/carousel_render.html --out path/to/slides/
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const htmlArg = args[indexOf('--html') + 1];
const outArg  = args[indexOf('--out')  + 1];

function indexOf(flag) {
  const i = args.indexOf(flag);
  if (i === -1) { console.error(`Missing flag: ${flag}`); process.exit(1); }
  return i;
}

if (!htmlArg || !outArg) {
  console.error('Usage: node screenshot.js --html <file> --out <dir>');
  process.exit(1);
}

const htmlPath = path.resolve(htmlArg);
const outDir   = path.resolve(outArg);

if (!fs.existsSync(htmlPath)) {
  console.error(`HTML file not found: ${htmlPath}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Viewport wide enough to render slides at reference size
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 1 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);

  const slideHandles = await page.$$('.slide');

  if (slideHandles.length === 0) {
    console.error('No .slide elements found in HTML.');
    process.exit(1);
  }

  for (let i = 0; i < slideHandles.length; i++) {
    const slide = slideHandles[i];
    const box = await slide.boundingBox();

    if (!box) {
      console.error(`Could not get bounding box for slide ${i + 1}`);
      process.exit(1);
    }

    const filename = `slide_${String(i + 1).padStart(2, '0')}.jpg`;
    const outPath  = path.join(outDir, filename);

    await page.screenshot({
      path: outPath,
      type: 'jpeg',
      quality: 92,
      clip: {
        x: box.x,
        y: box.y,
        width: box.width,
        height: box.height,
      },
    });

    console.log(`✓ ${filename}`);
  }

  await browser.close();
  console.log(`Done. ${slideHandles.length} slides written to ${outDir}`);
})();
