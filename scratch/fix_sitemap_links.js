const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('href="contact.html">Site Map</a>')) {
    content = content.replace('href="contact.html">Site Map</a>', 'href="services.html">Site Index</a>');
    fs.writeFileSync(f, content, 'utf8');
    console.log('Fixed Site Map in ' + f);
  }
});
