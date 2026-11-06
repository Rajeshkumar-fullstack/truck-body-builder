async function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|size|extmetadata`;
  const res = await fetch(url, { headers: { 'User-Agent': 'TruckBodyBuilderWeb/1.0 (contact@truckbodybuilder.com)' } });
  const data = await res.json();
  if (!data.query || !data.query.pages) return [];
  return Object.values(data.query.pages).map(p => ({
    title: p.title,
    url: p.imageinfo?.[0]?.url,
    thumb: p.imageinfo?.[0]?.thumburl,
    desc: p.imageinfo?.[0]?.extmetadata?.ObjectName?.value || p.title
  }));
}

async function run() {
  const queries = [
    'tipper truck dump truck commercial',
    'box truck container truck cargo',
    'dropside truck flatbed commercial truck',
    'semi-trailer flatbed trailer truck'
  ];
  for (const q of queries) {
    console.log(`\n=== Query: ${q} ===`);
    const results = await searchCommons(q);
    results.slice(0, 4).forEach(r => console.log(`- ${r.title}\n  URL: ${r.url}`));
  }
}
run();
