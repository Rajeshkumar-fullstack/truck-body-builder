const https = require('https');
const fs = require('fs');

async function searchWiki(query, limit = 5) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=${limit}&gsrnamespace=6&prop=imageinfo&iiprop=url|size|extmetadata&format=json`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'TruckBodyBuilderBot/2.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query?.pages ? Object.values(json.query.pages) : [];
          resolve(pages.map(p => ({
            title: p.title,
            url: p.imageinfo?.[0]?.url,
            width: p.imageinfo?.[0]?.width,
            height: p.imageinfo?.[0]?.height
          })).filter(x => x.url && (x.url.endsWith('.jpg') || x.url.endsWith('.png') || x.url.endsWith('.jpeg'))));
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const queries = [
    { key: 'hardox_tipper', q: 'mining dump truck haul quarry' },
    { key: 'steel_fabrication', q: 'plasma cutting steel sparks fabrication' },
    { key: 'cad_truck', q: 'computer aided design truck chassis automotive' },
    { key: 'truck_inspection', q: 'commercial vehicle inspection testing' },
    { key: 'container_truck', q: 'freightliner container truck highway semi trailer' },
    { key: 'reefer_truck', q: 'refrigerated semi trailer truck' }
  ];

  for (const q of queries) {
    console.log(`\n=== Query: ${q.key} (${q.q}) ===`);
    const results = await searchWiki(q.q, 6);
    results.forEach(r => console.log(`- ${r.title}: ${r.width}x${r.height} -> ${r.url}`));
  }
}

run();
