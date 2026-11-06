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

const list = [
  // Blog 1: Hardox Steel / Heavy Tipper / Metal Cutting
  { name: 'b1-welder-sparks.jpg', id: 'photo-1504307651254-35680f356dfd' },
  { name: 'b1-industrial-sparks.jpg', id: 'photo-1581092162384-8987c1d64718' },
  { name: 'b1-heavy-dump.jpg', id: 'photo-1590496793929-36417d3117de' },
  { name: 'b1-steel-plasma.jpg', id: 'photo-1581091226825-a6a2a5aee158' },
  { name: 'b1-excavator-dump.jpg', id: 'photo-1566576912321-d58ddd7a6088' },

  // Blog 2: ARAI AIS-093 Compliance / Chassis Inspection / Homologation Testing
  { name: 'b2-chassis-inspect.jpg', id: 'photo-1486006920555-c77dce18193b' },
  { name: 'b2-diagnostics.jpg', id: 'photo-1580273916550-e323be2ae537' },
  { name: 'b2-underchassis.jpg', id: 'photo-1619642751034-765dfdf7c58e' },
  { name: 'b2-cad-model.jpg', id: 'photo-1581092160607-ee22621dd758' }
];

async function run() {
  for (const item of list) {
    const dest = path.join(artDir, item.name);
    const url = `https://images.unsplash.com/${item.id}?auto=format&fit=crop&w=900&h=600&q=85`;
    try {
      await download(url, dest);
      console.log('Saved', item.name, fs.statSync(dest).size, 'bytes');
    } catch (e) {
      console.log('Failed', item.name, e.message);
    }
  }
}

run();
