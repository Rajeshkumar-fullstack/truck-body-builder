const fs = require('fs');
const path = require('path');

const g1 = path.join(__dirname, '../assets/images/gallery/project-1.jpg');
const g3 = path.join(__dirname, '../assets/images/gallery/project-3.jpg');

console.log('project-1.jpg size:', fs.statSync(g1).size);
console.log('project-3.jpg size:', fs.statSync(g3).size);
