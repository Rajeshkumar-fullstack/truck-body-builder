const https = require('https');

async function searchWiki(query) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=' + encodeURIComponent(query) + '&gsrlimit=6&prop=imageinfo&iiprop=url|size|mime&format=json';
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
  const testQueries = [
    { target: 'project-4 (paint booth)', q: 'automotive spray paint booth' },
    { target: 'project-4 alt', q: 'vehicle paint booth industrial' },
    { target: 'project-5 (modern dropside)', q: 'Isuzu dropside truck' },
    { target: 'project-5 alt', q: 'Fuso Canter dropside' },
    { target: 'project-8 (tipper)', q: 'KAMAZ tipper truck' },
    { target: 'project-8 alt', q: 'Scania tipper truck dump' },
    { target: 'slide-4 (truck plant)', q: 'MAN Truck Bus plant' },
    { target: 'slide-4 alt', q: 'automotive assembly plant robotic' },
    { target: 'blog-2 (chassis)', q: 'heavy truck chassis suspension' },
    { target: 'blog-4 (chassis frame)', q: 'commercial vehicle chassis frame' }
  ];

  for (const t of testQueries) {
    const res = await searchWiki(t.q);
    const j = res.filter(r => r.mime === 'image/jpeg' && r.width >= 1000);
    console.log(t.target, '->', j.map(x => x.title + ' (' + x.width + 'x' + x.height + ')'));
  }
})();
