const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\rajeshkumar.s\\.gemini\\antigravity\\brain\\41ffd321-0c5a-47cd-9b93-18e62af5caa5';
const files = fs.readdirSync(brainDir).filter(f => (f.startsWith('view-') || f.startsWith('cand-')) && f.endsWith('.jpg'));
console.log('Found candidate files:', files.length);

for (const f of files) {
  const stat = fs.statSync(path.join(brainDir, f));
  console.log(`${f}: ${(stat.size / 1024).toFixed(1)} KB`);
}
