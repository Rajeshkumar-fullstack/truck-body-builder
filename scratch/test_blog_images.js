const fs = require('fs');
const https = require('https');
const path = require('path');

const artDir = 'C:\\Users\\rajeshkumar.s\\.gemini\\antigravity\\brain\\41ffd321-0c5a-47cd-9b93-18e62af5caa5';

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

const candidates = [
  // For Blog 1: High-Tensile Hardox Steel Tipper / Heavy Steel Fabrication
  {
    name: 'cand-blog1-sparks.jpg',
    url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=900&h=600&q=85'
  },
  {
    name: 'cand-blog1-miningtipper.jpg',
    url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=900&h=600&q=85'
  },
  {
    name: 'cand-blog1-steelfab.jpg',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&h=600&q=85'
  },

  // For Blog 2: ARAI AIS-093 Commercial Truck Body Compliance / Vehicle CAD & Inspection
  {
    name: 'cand-blog2-cad.jpg',
    url: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=900&h=600&q=85'
  },
  {
    name: 'cand-blog2-eng.jpg',
    url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&h=600&q=85'
  },
  {
    name: 'cand-blog2-chassisinspect.jpg',
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&h=600&q=85'
  },

  // For Blog 3: Aerodynamic Dry Container Engineering: Slashing Highway Drag
  {
    name: 'cand-blog3-containertruck.jpg',
    url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&h=600&q=85'
  },
  {
    name: 'cand-blog3-freight.jpg',
    url: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&h=600&q=85'
  },
  {
    name: 'cand-blog3-highway.jpg',
    url: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=900&h=600&q=85'
  }
];

async function run() {
  for (const c of candidates) {
    const dest = path.join(artDir, c.name);
    try {
      await download(c.url, dest);
      console.log('Downloaded', c.name, fs.statSync(dest).size, 'bytes');
    } catch (e) {
      console.error('Failed', c.name, e.message);
    }
  }
}

run();
