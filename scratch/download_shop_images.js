const fs = require('fs');
const https = require('https');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'assets', 'images', 'products');

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

// Curated high quality authentic industrial components
const items = [
  {
    name: 'acc-toolbox.jpg',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&h=450&q=85'
  },
  {
    name: 'acc-hydraulic.jpg',
    url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&h=450&q=85'
  },
  {
    name: 'acc-lights.jpg',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&h=450&q=85'
  },
  {
    name: 'acc-tarpaulin.jpg',
    url: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=600&h=450&q=85'
  },
  {
    name: 'acc-bumper.jpg',
    url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&h=450&q=85'
  },
  {
    name: 'acc-strap.jpg',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&h=450&q=85'
  },
  {
    name: 'acc-twistlock.jpg',
    url: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&h=450&q=85'
  },
  {
    name: 'acc-tape.jpg',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=450&q=85'
  }
];

async function run() {
  for (const item of items) {
    const dest = path.join(targetDir, item.name);
    try {
      await download(item.url, dest);
      console.log('Saved', item.name, fs.statSync(dest).size, 'bytes');
    } catch (e) {
      console.log('Failed', item.name, e.message);
    }
  }
}

run();
