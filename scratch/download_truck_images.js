const fs = require('fs');
const path = require('path');

const downloads = [
  {
    name: 'open-body.jpg',
    target: path.join(__dirname, '../assets/images/products/open-body.jpg'),
    url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=85',
    desc: 'Heavy open dropside commercial cargo truck'
  },
  {
    name: 'container-body.jpg',
    target: path.join(__dirname, '../assets/images/products/container-body.jpg'),
    url: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1000&q=85',
    desc: 'Closed logistics container cargo truck'
  },
  {
    name: 'tipper-body.jpg',
    target: path.join(__dirname, '../assets/images/products/tipper-body.jpg'),
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/BHARATBENZ_Heavy_Duty_Truck_3128_C._right_side._Spielvogel_2012.jpg',
    desc: 'Heavy duty mining rock tipper truck body'
  },
  {
    name: 'trailer-body.jpg',
    target: path.join(__dirname, '../assets/images/products/trailer-body.jpg'),
    url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=85',
    desc: 'Multi-axle commercial semi-trailer truck'
  },
  {
    name: 'gallery-project-2.jpg',
    target: path.join(__dirname, '../assets/images/gallery/project-2.jpg'),
    url: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=1000&q=85',
    desc: '32 Ft SXL Multi-Axle Dry Cargo Container (replaces bus)'
  },
  {
    name: 'gallery-project-4.jpg',
    target: path.join(__dirname, '../assets/images/gallery/project-4.jpg'),
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/31/MAN_CLA_26.280_6x4_rear_tipper_for_overseas_market._Spielvogel_1.jpg',
    desc: 'Heavy Commercial Vehicle Tipper & Subframe (replaces car unibody)'
  }
];

async function downloadFile(item) {
  console.log(`Downloading ${item.name} from ${item.url}...`);
  const res = await fetch(item.url, {
    headers: { 'User-Agent': 'TruckBodyBuilderWeb/1.0 (contact@truckbodybuilder.com)' }
  });
  if (!res.ok) {
    throw new Error(`Failed to download ${item.name}: ${res.status} ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(item.target, buffer);
  console.log(`Saved ${item.name} (${(buffer.length / 1024).toFixed(1)} KB) -> ${item.target}`);
}

async function run() {
  for (const item of downloads) {
    try {
      await downloadFile(item);
    } catch (e) {
      console.error(`Error for ${item.name}:`, e.message);
    }
  }
  console.log('Finished downloads.');
}
run();
