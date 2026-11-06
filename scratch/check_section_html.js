const fs = require('fs');
const html = fs.readFileSync('c:/Users/rajeshkumar.s/Desktop/Truck Body Builder/index.html', 'utf8');

// Check lines 1220 to 1350
const lines = html.split('\n');
console.log('Lines 1285 to 1340:');
for (let i = 1284; i < 1340; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
