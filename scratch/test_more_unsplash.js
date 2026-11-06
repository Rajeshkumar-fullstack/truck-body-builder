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
  { name: 'cand-tipper-quarry.jpg', id: 'photo-1508974239320-0a029497e820' },
  { name: 'cand-semi-highway.jpg', id: 'photo-1586191582056-a60d62c262f2' },
  { name: 'cand-heavy-truck.jpg', id: 'photo-1591768793355-74d04bb6608f' },
  { name: 'cand-workshop-weld.jpg', id: 'photo-1504328345606-18bbc8c9d7d1' },
  { name: 'cand-metal-fabrication.jpg', id: 'photo-1581092335878-2d9ff86ca2bf' },
  { name: 'cand-engineer-inspect.jpg', id: 'photo-1581092334651-ddf26d9a09d0' },
  { name: 'cand-yellow-dump.jpg', id: 'photo-1579783902614-a3fb3927b675' },
  { name: 'cand-truck-cab.jpg', id: 'photo-1519003722824-194d4455a60c' }
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
