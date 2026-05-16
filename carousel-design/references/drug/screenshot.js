/**
 * screenshot.js
 * Screenshots each .slide element at true 1080×1920.
 * Overrides the dev preview layout so slides render full-width before capture.
 * Saves as slide_01.jpg, slide_02.jpg, etc. in the output directory.
 *
 * Usage:
 *   node screenshot.js --html path/to/carousel_render.html --out path/to/slides/
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const htmlArg = args[args.indexOf('--html') + 1];
const outArg  = args[args.indexOf('--out')  + 1];

if (!htmlArg || !outArg) {
  console.error('Usage: node screenshot.js --html <file> --out <dir>');
  process.exit(1);
}

const htmlPath = path.resolve(htmlArg);
const outDir   = path.resolve(outArg);

if (!fs.existsSync(htmlPath)) {
  console.error('HTML file not found: ' + htmlPath);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // 1080px wide viewport — slides fill full width via aspect-ratio 1080/1920
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);

  // Strip the dev preview wrapper layout so slides stack single-column at full width
  await page.addStyleTag({ content: `
    body { padding: 0 !important; }
    .app-header { display: none !important; }
    .stage {
      display: flex !important;
      flex-direction: column !important;
      gap: 0 !important;
      width: 1080px !important;
      max-width: 1080px !important;
    }
  ` });

  const slides = await page.$$('.slide');

  if (slides.length === 0) {
    console.error('No .slide elements found in HTML.');
    process.exit(1);
  }

  for (let i = 0; i < slides.length; i++) {
    const box = await slides[i].boundingBox();

    if (!box) {
      console.error('Could not get bounding box for slide ' + (i + 1));
      process.exit(1);
    }

    const filename = 'slide_' + String(i + 1).padStart(2, '0') + '.jpg';
    const outPath  = path.join(outDir, filename);

    await page.screenshot({
      path: outPath,
      type: 'jpeg',
      quality: 95,
      clip: {
        x: Math.round(box.x),
        y: Math.round(box.y),
        width: Math.round(box.width),
        height: Math.round(box.height),
      },
    });

    console.log('✓ ' + filename + ' (' + Math.round(box.width) + 'x' + Math.round(box.height) + ')');
  }

  await browser.close();
  console.log('Done. ' + slides.length + ' slides written to ' + outDir);
})();
