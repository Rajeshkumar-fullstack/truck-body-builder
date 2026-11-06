async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|size`;
  const res = await fetch(url, { headers: { 'User-Agent': 'TruckBodyBuilderWeb/1.0 (contact@truckbodybuilder.com)' } });
  const data = await res.json();
  if (!data.query || !data.query.pages) return [];
  return Object.values(data.query.pages)
    .filter(p => p.imageinfo?.[0]?.url && p.title.match(/\.(jpg|jpeg|png)$/i))
    .map(p => ({
      title: p.title,
      url: p.imageinfo[0].url,
      width: p.imageinfo[0].width,
      height: p.imageinfo[0].height
    }));
}

async function run() {
  const queries = [
    'Tata truck India',
    'Ashok Leyland truck',
    'box truck cargo van',
    'semi trailer truck container'
  ];
  for (const q of queries) {
    console.log(`\n=== Query: ${q} ===`);
    const results = await searchCommons(q);
    results.slice(0, 5).forEach(r => console.log(`- ${r.title} (${r.width}x${r.height})\n  ${r.url}`));
  }
}
run();
