const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = [...content.matchAll(/<a\s+[^>]*href=["'](contact\.html[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  if (matches.length) {
    console.log(`=== ${f} (${matches.length} links) ===`);
    matches.forEach(m => {
      const text = m[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
      console.log(`  href="${m[1]}" | text="${text}"`);
    });
  }
});
