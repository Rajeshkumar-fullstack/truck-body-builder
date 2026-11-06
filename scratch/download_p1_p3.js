const fs = require('fs');
const path = require('path');

const downloads = [
  {
    name: 'project-1.jpg',
    target: path.join(__dirname, '../assets/images/gallery/project-1.jpg'),
    // High-res quarry mining tipper truck
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=85',
    desc: '22 Cu.M Hardox 450 Rock Tipper Body in quarry'
  },
  {
    name: 'project-3.jpg',
    target: path.join(__dirname, '../assets/images/gallery/project-3.jpg'),
    // Multi-axle commercial trailer truck
    url: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=1200&q=85',
    desc: '40 Ft Tri-Axle Skeletal Trailer with Air Suspension'
  }
];

async function run() {
  for (const item of downloads) {
    try {
      console.log(`Downloading ${item.name}...`);
      const res = await fetch(item.url, { headers: { 'User-Agent': 'TruckBodyBuilderWeb/1.0' } });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(item.target, buf);
      console.log(`Saved ${item.name} (${(buf.length / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`Failed ${item.name}:`, e.message);
    }
  }
}
run();
