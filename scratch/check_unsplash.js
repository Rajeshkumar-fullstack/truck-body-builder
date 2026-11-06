const unsplashCandidates = [
  // Flatbed / open cargo truck
  { id: 'open-1', url: 'https://images.unsplash.com/photo-1586191582056-a664e43f07a4?auto=format&fit=crop&w=1000&q=80', desc: 'Commercial dropside / open body flatbed truck' },
  { id: 'open-2', url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80', desc: 'Heavy transport truck on highway' },
  { id: 'open-3', url: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=1000&q=80', desc: 'Commercial cargo truck' },
  // Box / closed container truck
  { id: 'box-1', url: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=1000&q=80', desc: 'Commercial box container truck' },
  { id: 'box-2', url: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=1000&q=80', desc: 'Logistics delivery container truck' },
  { id: 'box-3', url: 'https://images.unsplash.com/photo-1519074069444-1ba4e414163c?auto=format&fit=crop&w=1000&q=80', desc: 'Semi truck container freight' },
  // Tipper / dump truck
  { id: 'tipper-1', url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80', desc: 'Heavy dump tipper truck construction quarry' },
  { id: 'tipper-2', url: 'https://images.unsplash.com/photo-1580901368919-7738efb0f899?auto=format&fit=crop&w=1000&q=80', desc: 'Heavy construction tipper dump truck' },
  // Trailer / skeletal trailer
  { id: 'trailer-1', url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80', desc: 'Multi-axle heavy haulage semi-trailer' },
  { id: 'trailer-2', url: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=1000&q=80', desc: 'Skeletal semi-trailer truck' },
  // Fabrication / chassis welding
  { id: 'welding-1', url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80', desc: 'Structural metal fabrication and welding' },
  { id: 'welding-2', url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80', desc: 'Industrial manufacturing robotic line' }
];

async function checkAll() {
  for (const c of unsplashCandidates) {
    try {
      const res = await fetch(c.url, { method: 'HEAD' });
      console.log(`${c.id}: ${res.status} ${res.headers.get('content-type')} - ${c.desc}`);
    } catch (e) {
      console.log(`${c.id}: FAILED - ${e.message}`);
    }
  }
}
checkAll();
