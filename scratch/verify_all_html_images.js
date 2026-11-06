const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const missing = [];
const found = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const matches = [...content.matchAll(/src=["'](assets\/images\/[^"']+)["']/g)];
  for (const m of matches) {
    const p = m[1].split('?')[0];
    if (!fs.existsSync(p)) {
      missing.push({ html: f, img: p });
    } else {
      found.push({ html: f, img: p });
    }
  }
}

console.log(`Verified ${found.length} image references across ${files.length} HTML files.`);
if (missing.length === 0) {
  console.log('ALL HTML IMAGE REFERENCES ARE VALID AND PRESENT ON DISK!');
} else {
  console.error('Missing references:', missing);
}
