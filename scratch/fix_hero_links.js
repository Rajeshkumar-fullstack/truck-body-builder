const fs = require('fs');

// 1. index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Replace Slide 1 button
indexHtml = indexHtml.replace(
  'href="contact.html?spec=custom-build"',
  'href="shop.html?category=custom&openQuote=true"'
);

// Replace Slide 3 button
indexHtml = indexHtml.replace(
  'href="contact.html?spec=tipper-body"',
  'href="service-details.html?spec=tipper-body"'
);
indexHtml = indexHtml.replace(
  '<i class="fas fa-download me-2"></i> REQUEST SPECIFICATIONS',
  '<i class="fas fa-clipboard-list me-2"></i> VIEW SPECIFICATIONS'
);

// Replace Slide 4 button (START CUSTOM BUILD)
const startCustomOld = `<div class="hero-buttons animate-item">
                  <a href="contact.html" class="btn btn-hero-primary">
                    <i class="fas fa-pencil-ruler me-2"></i> START CUSTOM BUILD
                  </a>`;
const startCustomNew = `<div class="hero-buttons animate-item">
                  <a href="shop.html?category=custom&openQuote=true" class="btn btn-hero-primary">
                    <i class="fas fa-pencil-ruler me-2"></i> START CUSTOM BUILD
                  </a>`;
if (indexHtml.includes(startCustomOld)) {
  indexHtml = indexHtml.replace(startCustomOld, startCustomNew);
} else {
  // Regex fallback
  indexHtml = indexHtml.replace(
    /<a href="contact\.html" class="btn btn-hero-primary">\s*<i class="fas fa-pencil-ruler me-2"><\/i>\s*START CUSTOM BUILD\s*<\/a>/,
    `<a href="shop.html?category=custom&openQuote=true" class="btn btn-hero-primary">\n                    <i class="fas fa-pencil-ruler me-2"></i> START CUSTOM BUILD\n                  </a>`
  );
}

// Bottom CTA
indexHtml = indexHtml.replace(
  /<a href="contact\.html" class="btn btn-industrial btn-lg">\s*<i class="fas fa-calculator me-2"><\/i>\s*Request Technical Quotation\s*<\/a>/,
  `<a href="shop.html?category=custom&openQuote=true" class="btn btn-industrial btn-lg">\n                <i class="fas fa-calculator me-2"></i> Request Technical Quotation in Shop\n              </a>`
);

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('index.html hero links updated');

// 2. home-2.html
let home2Html = fs.readFileSync('home-2.html', 'utf8');
home2Html = home2Html.replace(
  'href="contact.html?spec=custom-build"',
  'href="shop.html?category=custom&openQuote=true"'
);
fs.writeFileSync('home-2.html', home2Html, 'utf8');
console.log('home-2.html hero links updated');
