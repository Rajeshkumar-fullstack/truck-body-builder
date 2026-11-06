const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/rajeshkumar.s/Desktop/Truck Body Builder';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const f of htmlFiles) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const matches = [...content.matchAll(/href="blog-details\.html([^"]*)"/g)];
  for (const m of matches) {
    if (!m[1] || !m[1].startsWith('?id=')) {
      console.log(`${f}: bare link found -> ${m[0]}`);
    }
  }
}
