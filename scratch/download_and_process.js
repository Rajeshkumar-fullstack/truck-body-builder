const https = require('https');
const fs = require('fs');
const path = require('path');

const resolved = JSON.parse(fs.readFileSync('scratch/resolved_urls.json', 'utf8'));

const tempDir = path.join(__dirname, 'temp_raw');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, { headers: { 'User-Agent': 'TruckBodyBuilder/1.0 (contact@truckbodybuilder.com)' } }, response => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, { headers: { 'User-Agent': 'TruckBodyBuilder/1.0 (contact@truckbodybuilder.com)' } }, res2 => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', err => { fs.unlink(destPath, () => {}); reject(err); });
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', err => { fs.unlink(destPath, () => {}); reject(err); });
  });
}

(async () => {
  for (const [targetRel, info] of Object.entries(resolved)) {
    const safeName = targetRel.replace(/[\/\\]/g, '__');
    const dest = path.join(tempDir, safeName);
    console.log(`Downloading ${targetRel}...`);
    try {
      await downloadFile(info.url, dest);
      const stat = fs.statSync(dest);
      console.log(` -> Saved ${safeName} (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch(err) {
      console.error(`Error downloading ${targetRel}:`, err.message);
    }
  }
  console.log('All downloads completed!');
})();
