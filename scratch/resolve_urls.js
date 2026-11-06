const https = require('https');
const fs = require('fs');

const fileTitles = {
  // SERVICES
  'services/service-design.jpg': 'File:CAD computer-aided design.jpg',
  'services/service-fabrication.jpg': 'File:MAN Truck & Bus AG in Niepołomice.jpg',
  'services/service-welding.jpg': 'File:US Navy 040225-N-8213G-058 Hull Technician 3rd Class Casey Caudill, of Priest River, Idaho, practices different welding techniques to improve his skills aboard USS Ronald Reagan (CVN 76).jpg',
  'services/service-repair.jpg': 'File:Truck Repair - panoramio.jpg',
  'services/service-painting.jpg': 'File:Automotive Paint Booth.jpg',
  'services/service-modification.jpg': 'File:Rear axles tandem.jpg',
  'services/service-maintenance.jpg': 'File:Ryder Truck Rental and Maintenance, Denver, CO.jpg',

  // GALLERY
  'gallery/project-1.jpg': 'File:Mercedes-Benz Arocs - dump truck version (1).JPG',
  'gallery/project-2.jpg': 'File:Colfrance truck, Colombia.jpg',
  'gallery/project-3.jpg': 'File:Extendable 3 Axle Lowbed - Extendable 4 Axle Lowbed - STU TRAILERS 02.jpg',
  'gallery/project-4.jpg': 'File:Automotive Paint Booth.jpg',
  'gallery/project-5.jpg': 'File:Isuzu NQR Dropside Cargo Truck 2026.jpg',
  'gallery/project-6.jpg': 'File:Air pollution by refrigerated truck Lille France 2018 janvier.jpg',
  'gallery/project-7.jpg': 'File:Food grade stainless steel tanker.JPG',
  'gallery/project-8.jpg': 'File:Dump Truck - Tipper - Kipper oplegger - STAS.jpg',
  'gallery/project-9.jpg': 'File:Freightliner 2004 DAF CF truck with China Shipping container on a skeleton trailer, 22 March 2009.jpg',
  'gallery/project-10.jpg': 'File:EM-reo-tow-truck-1.jpg',
  'gallery/project-11.jpg': 'File:Tank truck on Phuentsholing-Thimphu highway, Bhutan.jpg',
  'gallery/project-12.jpg': 'File:CNC Laser Cutting Machine.jpg',

  // BLOG
  'blog/blog-1.jpg': 'File:Heavy dump truck in Italy.jpg',
  'blog/blog-2.jpg': 'File:Volvo Truck FH-Semi-trailer truck-01ASD.jpg',
  'blog/blog-3.jpg': 'File:CSIRO ScienceImage 3497 Truck on highway rural NSW.jpg',
  'blog/blog-4.jpg': 'File:International truck frame (4308250626).jpg',
  'blog/blog-5.jpg': 'File:HTS Ultra-Rack Johnson Refrigerated Bodies.jpg',
  'blog/blog-6.jpg': 'File:Submerge arc welding.jpg',

  // HERO
  'hero/slide-4.jpg': 'File:Scania, Nufam 2025, Rheinstetten (20250927-P1051049).jpg'
};

async function getImageUrl(title) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&titles=' + encodeURIComponent(title) + '&prop=imageinfo&iiprop=url|size|mime&format=json';
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'TruckBodyBuilder/1.0 (contact@truckbodybuilder.com)' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const page = Object.values(json.query.pages)[0];
          const info = page.imageinfo?.[0];
          resolve(info ? { url: info.url, width: info.width, height: info.height } : null);
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

(async () => {
  const resolved = {};
  for (const [targetPath, title] of Object.entries(fileTitles)) {
    const info = await getImageUrl(title);
    if (info) {
      resolved[targetPath] = info;
      console.log(`[RESOLVED] ${targetPath} -> ${info.url.substring(0, 70)}... (${info.width}x${info.height})`);
    } else {
      console.log(`[FAILED] ${targetPath} for ${title}`);
    }
  }
  fs.writeFileSync('scratch/resolved_urls.json', JSON.stringify(resolved, null, 2));
  console.log('All URLs resolved and saved to scratch/resolved_urls.json');
})();
