const https = require('https');
const fs = require('fs');

const targets = {
  'service-design': ['CAD workstation', 'computer aided design', 'mechanical CAD software', 'AutoCAD screen'],
  'service-fabrication': ['heavy vehicle chassis', 'truck assembly plant', 'metal fabrication workshop', 'commercial vehicle manufacturing'],
  'service-welding': ['arc welding sparks', 'MIG welding', 'welding robot', 'welder steel'],
  'service-repair': ['truck repair', 'commercial vehicle garage', 'truck maintenance workshop', 'truck mechanic'],
  'service-painting': ['paint booth', 'spray painting chamber', 'automotive paint booth', 'spray booth'],
  'service-modification': ['truck chassis axle', 'truck frame rails', 'semi truck chassis', 'truck chassis'],
  'service-maintenance': ['truck maintenance', 'heavy vehicle inspection', 'commercial vehicle maintenance', 'truck engine bay'],
  
  'project-1': ['dump truck mining', 'tipper truck', 'Volvo tipper truck', 'heavy tipper'],
  'project-2': ['box truck', 'delivery box truck', 'cargo box truck', 'freight truck'],
  'project-3': ['lowbed trailer', 'heavy haulage trailer', 'flatbed semi trailer', 'low loader truck'],
  'project-4': ['industrial paint booth', 'spray painting', 'vehicle paint booth', 'commercial vehicle finishing'],
  'project-5': ['dropside truck', 'cargo truck dropside', 'flatbed truck', 'dropside body'],
  'project-6': ['refrigerated truck', 'reefer truck', 'cold chain truck', 'insulated delivery truck'],
  'project-7': ['tanker truck stainless steel', 'chemical tanker truck', 'road tanker', 'tanker semi trailer'],
  'project-8': ['quarry dump truck', 'heavy dump truck', 'mining dump truck', 'tipper semi trailer'],
  'project-9': ['container trailer truck', 'skeletal semi trailer', 'intermodal container truck', 'container chassis'],
  'project-10': ['heavy wrecker tow truck', 'heavy recovery truck', 'crane truck', 'recovery vehicle truck'],
  'project-11': ['fuel tanker truck', 'petroleum tanker', 'oil road tanker', 'fuel truck trailer'],
  'project-12': ['laser cutting metal', 'CNC plasma cutting', 'plasma cutting sparks', 'laser cutting machine'],

  'blog-1': ['heavy dump truck', 'mining tipper', 'hardox dump truck', 'quarry truck'],
  'blog-2': ['truck chassis testing', 'commercial vehicle chassis', 'truck chassis dynamometer', 'truck chassis frame'],
  'blog-3': ['semi truck highway', 'heavy freight truck', 'commercial transport truck highway', 'articulated lorry highway'],
  'blog-4': ['truck chassis assembly', 'heavy vehicle frame', 'truck manufacturing line', 'truck chassis'],
  'blog-5': ['refrigerated food truck', 'refrigerated delivery truck', 'reefer box truck', 'ice cream delivery truck'],
  'blog-6': ['submerged arc welding', 'structural steel welding', 'welding beam steel', 'welding steel plate'],

  'slide-4': ['commercial vehicle factory', 'truck manufacturing plant', 'automotive assembly plant', 'vehicle assembly line']
};

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
  const manifest = {};
  for (const [key, terms] of Object.entries(targets)) {
    let found = null;
    for (const term of terms) {
      const res = await searchWiki(term);
      const candidates = res.filter(r => 
        r.mime === 'image/jpeg' && 
        r.width >= 1000 && 
        !r.title.toLowerCase().includes('stamp') && 
        !r.title.toLowerCase().includes('postcard') &&
        !r.title.toLowerCase().includes('badge') &&
        !r.title.toLowerCase().includes('logo') &&
        !r.title.toLowerCase().includes('wreck') &&
        !r.title.toLowerCase().includes('accident')
      );
      if (candidates.length > 0) {
        found = candidates[0];
        console.log(`[FOUND] ${key} using "${term}" -> ${found.title} (${found.width}x${found.height})`);
        break;
      }
    }
    if (!found) {
      console.log(`[MISSING] ${key}`);
    }
    manifest[key] = found;
  }
  fs.writeFileSync('scratch/wiki_manifest.json', JSON.stringify(manifest, null, 2));
  console.log('Complete manifest saved to scratch/wiki_manifest.json');
})();
