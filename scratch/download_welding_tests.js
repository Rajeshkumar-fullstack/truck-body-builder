const https = require('https');
const fs = require('fs');

const testUrls = [
  { id: 'press_brake', url: 'https://upload.wikimedia.org/wikipedia/commons/2/28/High-tonnage_press_brake.jpg' },
  { id: 'gmaw_welding', url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/GMAW.welding.af.ncs.jpg' },
  { id: 'precision_machining', url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Precision_metal_machining_and_welding_for_heavy_industrial_components.jpg' }
];

async function dl(item) {
  return new Promise((resolve) => {
    https.get(item.url, { headers: { 'User-Agent': 'TruckBodyBuilder/1.0 (contact@truckbodybuilder.com)' } }, res => {
      const dest = `scratch/${item.id}.jpg`;
      const f = fs.createWriteStream(dest);
      res.pipe(f);
      f.on('finish', () => {
        console.log(`Saved ${dest} (${fs.statSync(dest).size} bytes)`);
        resolve();
      });
    }).on('error', () => resolve());
  });
}

(async () => {
  for (const item of testUrls) {
    await dl(item);
  }
})();
