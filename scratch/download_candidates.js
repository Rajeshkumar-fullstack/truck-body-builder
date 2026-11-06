const https = require('https');
const fs = require('fs');

// Promising industrial truck fabrication, welding, chassis assembly candidates:
const candidates = [
  { id: 'truck-mfg-1', url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=85&w=1400&auto=format&fit=crop' }, // heavy welding sparks metal
  { id: 'truck-mfg-2', url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=85&w=1400&auto=format&fit=crop' }, // commercial truck highway/transport
  { id: 'truck-mfg-3', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=85&w=1400&auto=format&fit=crop' }, // heavy industrial machinery technician
  { id: 'truck-mfg-4', url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=85&w=1400&auto=format&fit=crop' }, // industrial welding sparks
  { id: 'truck-mfg-5', url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=85&w=1400&auto=format&fit=crop' }, // heavy factory warehouse crane
  { id: 'truck-mfg-6', url: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?q=85&w=1400&auto=format&fit=crop' }, // industrial steel factory sparks
  { id: 'truck-mfg-7', url: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=85&w=1400&auto=format&fit=crop' }  // industrial laser/cutting sparks
];

async function download(item) {
  return new Promise((resolve) => {
    https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode === 200) {
        const dest = `scratch/${item.id}.jpg`;
        const f = fs.createWriteStream(dest);
        res.pipe(f);
        f.on('finish', () => {
          console.log(`Saved ${dest} (${fs.statSync(dest).size} bytes)`);
          resolve();
        });
      } else {
        console.log(`Failed ${item.id}: status ${res.statusCode}`);
        resolve();
      }
    }).on('error', () => resolve());
  });
}

(async () => {
  for (const c of candidates) {
    await download(c);
  }
})();
