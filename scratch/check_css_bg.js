const fs = require('fs');

const css1 = fs.readFileSync('c:/Users/rajeshkumar.s/Desktop/Truck Body Builder/assets/css/style.css', 'utf8');
const css2 = fs.readFileSync('c:/Users/rajeshkumar.s/Desktop/Truck Body Builder/assets/css/dark-mode.css', 'utf8');

console.log('--- Checking for section background overrides in dark-mode.css ---');
const lines2 = css2.split('\n');
lines2.forEach((line, idx) => {
  if (line.includes('background') && (line.includes('section') || line.includes('!important'))) {
    if (line.includes('white') || line.includes('#fff') || line.includes('var(--white)')) {
      console.log(`dark-mode.css L${idx+1}: ${line.trim()}`);
    }
  }
});
