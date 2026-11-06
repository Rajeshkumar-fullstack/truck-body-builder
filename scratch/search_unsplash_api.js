const https = require('https');
const fs = require('fs');
const path = require('path');

function searchUnsplash(keyword) {
  return new Promise((resolve) => {
    const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(keyword)}&per_page=10`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.results.map(r => ({
            id: r.id,
            desc: r.alt_description || r.description,
            url: r.urls.regular,
            thumb: r.urls.small
          })));
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  console.log('Searching tipper truck...');
  const tippers = await searchUnsplash('dump truck quarry');
  tippers.forEach(t => console.log(`- ${t.id}: ${t.desc}`));

  console.log('\nSearching truck CAD / automotive engineering...');
  const cads = await searchUnsplash('truck chassis engineering');
  cads.forEach(t => console.log(`- ${t.id}: ${t.desc}`));

  console.log('\nSearching aerodynamic semi truck container...');
  const containers = await searchUnsplash('semi truck container highway');
  containers.forEach(t => console.log(`- ${t.id}: ${t.desc}`));
}

run();
