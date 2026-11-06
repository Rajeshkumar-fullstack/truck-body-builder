const fs = require('fs');
const css = fs.readFileSync('assets/css/style.css', 'utf8');
const lines = css.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('[data-theme="dark"]')) {
    console.log(`${idx + 1}: ${line.trim()}`);
  }
});
