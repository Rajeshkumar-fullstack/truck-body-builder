const https = require('https');
const fs = require('fs');
const path = require('path');

const artDir = 'C:\\Users\\rajeshkumar.s\\.gemini\\antigravity\\brain\\41ffd321-0c5a-47cd-9b93-18e62af5caa5';

function fetchJSON(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'TruckBodyBuilder/2.0 (info@truckbodybuilder.com)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'TruckBodyBuilder/2.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
      const f = fs.createWriteStream(dest);
      res.pipe(f);
      f.on('finish', () => { f.close(); resolve(); });
    }).on('error', reject);
  });
}

async function searchWiki(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=10&gsrnamespace=6&prop=imageinfo&iiprop=url|size|mime&format=json`;
  const res = await fetchJSON(url);
  if (!res?.query?.pages) return [];
  return Object.values(res.query.pages)
    .map(p => ({
      title: p.title,
      url: p.imageinfo?.[0]?.url,
      w: p.imageinfo?.[0]?.width,
      h: p.imageinfo?.[0]?.height,
      mime: p.imageinfo?.[0]?.mime
    }))
    .filter(x => x.url && x.mime === 'image/jpeg' && x.w >= 1200);
}

async function run() {
  console.log('Searching for tipper candidates...');
  const tippers = await searchWiki('Volvo FMX tipper OR Scania tipper dump truck');
  console.log('Tippers found:', tippers.length);
  for (let i = 0; i < Math.min(3, tippers.length); i++) {
    const t = tippers[i];
    const dest = path.join(artDir, `wiki-tipper-${i+1}.jpg`);
    console.log(`Downloading ${t.title} (${t.w}x${t.h})...`);
    await download(t.url, dest);
    console.log(`Saved wiki-tipper-${i+1}.jpg`);
  }

  console.log('Searching for truck CAD / testing / homologation candidates...');
  const tests = await searchWiki('truck chassis testing OR commercial vehicle inspection OR truck homologation');
  console.log('Tests found:', tests.length);
  for (let i = 0; i < Math.min(3, tests.length); i++) {
    const t = tests[i];
    const dest = path.join(artDir, `wiki-test-${i+1}.jpg`);
    console.log(`Downloading ${t.title} (${t.w}x${t.h})...`);
    await download(t.url, dest);
    console.log(`Saved wiki-test-${i+1}.jpg`);
  }
}

run();
