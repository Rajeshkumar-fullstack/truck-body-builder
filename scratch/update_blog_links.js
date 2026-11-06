const fs = require('fs');

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml.replace(
  '<h3 class="blog-title"><a href="blog-details.html">High-Tensile Hardox Steel vs Mild Steel in Mining Tipper Fabrication</a></h3>',
  '<h3 class="blog-title"><a href="blog-details.html?id=1">High-Tensile Hardox Steel vs Mild Steel in Mining Tipper Fabrication</a></h3>'
);
indexHtml = indexHtml.replace(
  '<a href="blog-details.html" class="fw-bold text-orange">Read Whitepaper <i class="fas fa-angle-right"></i></a>',
  '<a href="blog-details.html?id=1" class="fw-bold text-orange">Read Whitepaper <i class="fas fa-angle-right"></i></a>'
);

indexHtml = indexHtml.replace(
  '<h3 class="blog-title"><a href="blog.html">ARAI AIS-093 Code of Practice: Essential Checklist for Commercial Truck Bodies</a></h3>',
  '<h3 class="blog-title"><a href="blog-details.html?id=2">ARAI AIS-093 Code of Practice: Essential Checklist for Commercial Truck Bodies</a></h3>'
);
indexHtml = indexHtml.replace(
  '<a href="blog.html" class="fw-bold text-orange">Read Article <i class="fas fa-angle-right"></i></a>',
  '<a href="blog-details.html?id=2" class="fw-bold text-orange">Read Article <i class="fas fa-angle-right"></i></a>'
);

indexHtml = indexHtml.replace(
  '<h3 class="blog-title"><a href="blog.html">Aerodynamic Dry Container Engineering: Slashing Highway Drag by 12%</a></h3>',
  '<h3 class="blog-title"><a href="blog-details.html?id=3">Aerodynamic Dry Container Engineering: Slashing Highway Drag by 12%</a></h3>'
);
// The second occurrence of Read Article in index.html is for Article 3
indexHtml = indexHtml.replace(
  '<a href="blog.html" class="fw-bold text-orange">Read Article <i class="fas fa-angle-right"></i></a>',
  '<a href="blog-details.html?id=3" class="fw-bold text-orange">Read Article <i class="fas fa-angle-right"></i></a>'
);

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('index.html blog links updated');

// 2. Update blog.html
let blogHtml = fs.readFileSync('blog.html', 'utf8');

// Featured post
blogHtml = blogHtml.replace(
  '<a href="blog-details.html" class="text-decoration-none">',
  '<a href="blog-details.html?id=1" class="text-decoration-none">'
);
blogHtml = blogHtml.replace(
  '<a href="blog-details.html" class="btn btn-industrial">\n              Read Full Article',
  '<a href="blog-details.html?id=1" class="btn btn-industrial">\n              Read Full Article'
);

// Articles 1 to 6
for (let i = 1; i <= 6; i++) {
  // Replace title link
  blogHtml = blogHtml.replace('<a href="blog-details.html">', `<a href="blog-details.html?id=${i}">`);
  // Replace Read More link
  blogHtml = blogHtml.replace(
    '<a href="blog-details.html" class="fw-bold text-orange">Read More <i class="fas fa-angle-right"></i></a>',
    `<a href="blog-details.html?id=${i}" class="fw-bold text-orange">Read More <i class="fas fa-angle-right"></i></a>`
  );
}

fs.writeFileSync('blog.html', blogHtml, 'utf8');
console.log('blog.html blog links updated');
