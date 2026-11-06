const https = require('https');
const fs = require('fs');

// Curated list of famous industrial manufacturing and heavy fabrication photos on Unsplash:
const urls = [
  // Modern advanced industrial fabrication plant with robotic arms and yellow/orange steel structures
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=85&w=1200&auto=format&fit=crop', // (we saw this was Lincoln School)
  // High-tech automotive assembly plant with overhead cranes
  'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=85&w=1200&auto=format&fit=crop',
  // Heavy machinery welding in a massive fabrication yard
  'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=85&w=1200&auto=format&fit=crop',
  // Industrial laser plasma cutting thick steel plate
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=85&w=1200&auto=format&fit=crop',
  // Modern heavy vehicle manufacturing workshop / chassis line
  'https://images.unsplash.com/photo-1618042164219-62c820f10723?q=85&w=1200&auto=format&fit=crop',
  // Heavy automotive steel assembly
  'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=85&w=1200&auto=format&fit=crop',
  // Industrial truck / heavy machinery fabrication plant
  'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=85&w=1200&auto=format&fit=crop',
  // High bay industrial factory plant with overhead gantry
  'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=85&w=1200&auto=format&fit=crop'
];

async function checkUrl(u, idx) {
  return new Promise((resolve) => {
    https.get(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode === 200) {
        const dest = `scratch/cand_${idx}.jpg`;
        const f = fs.createWriteStream(dest);
        res.pipe(f);
        f.on('finish', () => {
          console.log(`[OK] cand_${idx}.jpg (${fs.statSync(dest).size} bytes) from ${u.substring(0, 50)}...`);
          resolve(dest);
        });
      } else {
        console.log(`[${res.statusCode}] ${u.substring(0, 50)}...`);
        resolve(null);
      }
    }).on('error', () => resolve(null));
  });
}

(async () => {
  for (let i = 0; i < urls.length; i++) {
    await checkUrl(urls[i], i);
  }
})();
