const https = require('https');

async function searchWiki(query) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=' + encodeURIComponent(query) + '&gsrlimit=12&prop=imageinfo&iiprop=url|size|mime&format=json';
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'TruckBodyBuilder/1.0 (contact@truckbodybuilder.com)' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query ? Object.values(json.query.pages) : [];
          resolve(pages.map(p => ({
            title: p.title,
            url: p.imageinfo?.[0]?.url,
            mime: p.imageinfo?.[0]?.mime,
            width: p.imageinfo?.[0]?.width,
            height: p.imageinfo?.[0]?.height
          })));
        } catch(e) { resolve([]); }
      });
    }).on('error', () => resolve([]));
  });
}

(async () => {
  const queries = [
    'truck assembly plant',
    'truck manufacturing',
    'welding steel truck',
    'semi-trailer manufacturing',
    'truck chassis assembly',
    'Scania production',
    'Volvo truck production',
    'Kenworth manufacturing',
    'Peterbilt factory',
    'Mercedes Arocs factory',
    'truck frame manufacturing'
  ];

  for (const q of queries) {
    const res = await searchWiki(q);
    const j = res.filter(r => r.mime === 'image/jpeg' && r.width >= 1200);
    console.log('=== ' + q + ' ===');
    for (const item of j) {
      console.log('  ' + item.title + ' -> ' + item.url);
    }
  }
})();
