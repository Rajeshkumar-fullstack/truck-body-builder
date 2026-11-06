const fs = require('fs');
const file = 'c:/Users/rajeshkumar.s/Desktop/Truck Body Builder/blog.html';
let content = fs.readFileSync(file, 'utf8');
content = content.replace('href="blog-details.html" class="btn btn-industrial"', 'href="blog-details.html?id=1" class="btn btn-industrial"');
fs.writeFileSync(file, content, 'utf8');
console.log('Fixed bare blog link in blog.html');
