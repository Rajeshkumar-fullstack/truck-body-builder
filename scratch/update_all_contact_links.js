const fs = require('fs');

console.log('--- Updating index.html links ---');
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Slide 1 Hero Button: CONFIGURE CUSTOM BUILD
indexHtml = indexHtml.replace(
  '<a href="contact.html?spec=custom-build" class="btn btn-hero-primary">\n                    <i class="fas fa-sliders-h me-2"></i> CONFIGURE CUSTOM BUILD\n                  </a>',
  '<a href="shop.html?category=custom&openQuote=true" class="btn btn-hero-primary">\n                    <i class="fas fa-sliders-h me-2"></i> CONFIGURE CUSTOM BUILD\n                  </a>'
);
indexHtml = indexHtml.replace(
  '<a href="contact.html?spec=mining-tipper" class="spec-download-action">',
  '<a href="service-details.html?spec=mining-tipper" class="spec-download-action">'
);

// Slide 2 Hero Right Column Spec Panel
indexHtml = indexHtml.replace(
  '<a href="contact.html?spec=cargo-container" class="spec-download-action">',
  '<a href="service-details.html?spec=cargo-container" class="spec-download-action">'
);

// Slide 3 Hero Button: REQUEST SPECIFICATIONS
indexHtml = indexHtml.replace(
  '<a href="contact.html?spec=tipper-body" class="btn btn-hero-secondary">\n                    <i class="fas fa-download me-2"></i> REQUEST SPECIFICATIONS\n                  </a>',
  '<a href="service-details.html?spec=tipper-body" class="btn btn-hero-secondary">\n                    <i class="fas fa-clipboard-list me-2"></i> VIEW SPECIFICATIONS\n                  </a>'
);
indexHtml = indexHtml.replace(
  '<a href="contact.html?spec=rock-tipper" class="spec-download-action">',
  '<a href="service-details.html?spec=rock-tipper" class="spec-download-action">'
);

// Slide 4 Hero Button: START CUSTOM BUILD
indexHtml = indexHtml.replace(
  '<a href="contact.html" class="btn btn-hero-primary">\n                    <i class="fas fa-pencil-ruler me-2"></i> START CUSTOM BUILD\n                  </a>',
  '<a href="shop.html?category=custom&openQuote=true" class="btn btn-hero-primary">\n                    <i class="fas fa-pencil-ruler me-2"></i> START CUSTOM BUILD\n                  </a>'
);
indexHtml = indexHtml.replace(
  '<a href="contact.html?spec=custom-engineering" class="spec-download-action">',
  '<a href="service-details.html?spec=custom-engineering" class="spec-download-action">'
);

// 8 Product Cards in index.html
const productCards = [
  { oldLink: 'contact.html?product=Open+Truck+Body', shopLink: 'shop.html', specLink: 'service-details.html?product=open-body' },
  { oldLink: 'contact.html?product=Closed+Container+Body', shopLink: 'shop.html?search=Container', specLink: 'service-details.html?product=container-body' },
  { oldLink: 'contact.html?product=Tipper+Truck+Body', shopLink: 'shop.html?search=Tipper', specLink: 'service-details.html?product=tipper-body' },
  { oldLink: 'contact.html?product=Trailer+Body', shopLink: 'shop.html?category=chassis', specLink: 'service-details.html?product=trailer-body' },
  { oldLink: 'contact.html?product=Tanker+Body', shopLink: 'shop.html?search=Tanker', specLink: 'service-details.html?product=tanker-body' },
  { oldLink: 'contact.html?product=Refrigerated+Body', shopLink: 'shop.html?category=custom', specLink: 'service-details.html?product=refrigerated-body' },
  { oldLink: 'contact.html?product=Flatbed+Truck+Body', shopLink: 'shop.html?category=custom', specLink: 'service-details.html?product=flatbed-body' },
  { oldLink: 'contact.html?product=Custom+Fabricated+Body', shopLink: 'shop.html?category=custom&openQuote=true', specLink: 'service-details.html?product=custom-body' }
];

productCards.forEach(pc => {
  const oldSnippet = `<div class="product-footer mt-auto">
                  <a href="${pc.oldLink}" class="btn btn-sm btn-industrial w-100">Get Quote</a>
                </div>`;
  const newSnippet = `<div class="product-footer mt-auto d-flex gap-2">
                  <a href="${pc.shopLink}" class="btn btn-sm btn-industrial flex-grow-1"><i class="fas fa-shopping-cart me-1"></i> Order / Shop</a>
                  <a href="${pc.specLink}" class="btn btn-sm btn-outline-steel px-3" title="Technical Specs"><i class="fas fa-info-circle"></i> Specs</a>
                </div>`;
  if (indexHtml.includes(oldSnippet)) {
    indexHtml = indexHtml.replace(oldSnippet, newSnippet);
    console.log(`Updated product card: ${pc.oldLink}`);
  } else {
    // Regex fallback
    const reg = new RegExp(`<div class="product-footer mt-auto">\\s*<a href="${pc.oldLink.replace(/\+/g, '\\+')}"[^>]*>[^<]*<\\/a>\\s*<\\/div>`);
    if (reg.test(indexHtml)) {
      indexHtml = indexHtml.replace(reg, newSnippet);
      console.log(`Updated product card (regex): ${pc.oldLink}`);
    } else {
      console.log(`Snippet not found: ${pc.oldLink}`);
    }
  }
});

// CTA section
indexHtml = indexHtml.replace(
  '<a href="contact.html" class="btn btn-industrial btn-lg">\n                <i class="fas fa-calculator me-2"></i> Request Technical Quotation\n              </a>',
  '<a href="shop.html?category=custom&openQuote=true" class="btn btn-industrial btn-lg">\n                <i class="fas fa-calculator me-2"></i> Request Technical Quotation\n              </a>'
);

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('SUCCESS: index.html updated');

// --- Updating home-2.html ---
console.log('--- Updating home-2.html links ---');
let home2Html = fs.readFileSync('home-2.html', 'utf8');

// Hero button
home2Html = home2Html.replace(
  '<a href="contact.html?spec=custom-build" class="btn btn-hero-primary">\n                <i class="fas fa-sliders-h me-2"></i> CONFIGURE CUSTOM BUILD\n              </a>',
  '<a href="shop.html?category=custom&openQuote=true" class="btn btn-hero-primary">\n                <i class="fas fa-sliders-h me-2"></i> CONFIGURE CUSTOM BUILD\n              </a>'
);
home2Html = home2Html.replace(
  '<a href="contact.html?spec=mining-tipper" class="spec-download-action">',
  '<a href="service-details.html?spec=mining-tipper" class="spec-download-action">'
);

// Specialized products in home-2.html
home2Html = home2Html.replace(
  '<a href="contact.html?product=tanker-body" class="btn btn-sm btn-industrial"><i class="fas fa-file-invoice me-1"></i> Request Tanker Quote</a>',
  '<div class="d-flex gap-2"><a href="shop.html?search=Tanker" class="btn btn-sm btn-industrial"><i class="fas fa-shopping-cart me-1"></i> Order in Shop</a><a href="service-details.html?spec=tanker" class="btn btn-sm btn-outline-steel"><i class="fas fa-file-alt me-1"></i> Specs</a></div>'
);
home2Html = home2Html.replace(
  '<a href="contact.html?product=refrigerated-body" class="btn btn-sm btn-industrial"><i class="fas fa-file-invoice me-1"></i> Request Reefer Quote</a>',
  '<div class="d-flex gap-2"><a href="shop.html?category=custom" class="btn btn-sm btn-industrial"><i class="fas fa-shopping-cart me-1"></i> Order in Shop</a><a href="service-details.html?spec=reefer" class="btn btn-sm btn-outline-steel"><i class="fas fa-file-alt me-1"></i> Specs</a></div>'
);
home2Html = home2Html.replace(
  '<a href="contact.html?product=flatbed-body" class="btn btn-sm btn-industrial"><i class="fas fa-file-invoice me-1"></i> Request Flatbed Quote</a>',
  '<div class="d-flex gap-2"><a href="shop.html?category=chassis" class="btn btn-sm btn-industrial"><i class="fas fa-shopping-cart me-1"></i> Order in Shop</a><a href="service-details.html?spec=flatbed" class="btn btn-sm btn-outline-steel"><i class="fas fa-file-alt me-1"></i> Specs</a></div>'
);
home2Html = home2Html.replace(
  '<a href="contact.html?product=custom-body" class="btn btn-sm btn-industrial"><i class="fas fa-file-invoice me-1"></i> Request Custom Build</a>',
  '<div class="d-flex gap-2"><a href="shop.html?category=custom&openQuote=true" class="btn btn-sm btn-industrial"><i class="fas fa-tools me-1"></i> Custom Build in Shop</a><a href="service-details.html?spec=custom" class="btn btn-sm btn-outline-steel"><i class="fas fa-file-alt me-1"></i> Specs</a></div>'
);
home2Html = home2Html.replace(
  '<a href="contact.html" class="btn btn-industrial btn-lg">Book Engineering Consultation</a>',
  '<a href="shop.html?category=custom&openQuote=true" class="btn btn-industrial btn-lg">Book Engineering Consultation</a>'
);

fs.writeFileSync('home-2.html', home2Html, 'utf8');
console.log('SUCCESS: home-2.html updated');

// --- Updating service-details.html ---
console.log('--- Updating service-details.html links ---');
let sdHtml = fs.readFileSync('service-details.html', 'utf8');
sdHtml = sdHtml.replace(
  '<a href="contact.html?service=fabrication" class="btn btn-industrial">\n                  <i class="fas fa-file-invoice me-2"></i> Request Official Quote\n                </a>',
  '<a href="shop.html?category=custom&openQuote=true" class="btn btn-industrial">\n                  <i class="fas fa-file-invoice me-2"></i> Request Official Quote in Shop\n                </a>'
);
sdHtml = sdHtml.replace(
  '<a href="contact.html?brochure=download" class="btn btn-sm btn-industrial w-100">',
  '<a href="javascript:void(0)" onclick="window.print()" class="btn btn-sm btn-industrial w-100">'
);
sdHtml = sdHtml.replace(
  '<a href="contact.html" class="btn btn-industrial btn-lg">Request Fabrication Estimate</a>',
  '<a href="shop.html?category=custom&openQuote=true" class="btn btn-industrial btn-lg">Request Fabrication Estimate in Shop</a>'
);
fs.writeFileSync('service-details.html', sdHtml, 'utf8');
console.log('SUCCESS: service-details.html updated');

// --- Updating services.html ---
console.log('--- Updating services.html links ---');
let sHtml = fs.readFileSync('services.html', 'utf8');
sHtml = sHtml.replace(
  '<a href="contact.html" class="btn btn-industrial btn-lg"><i class="fas fa-file-invoice me-2"></i> Request Commercial Estimate</a>',
  '<a href="shop.html?category=custom&openQuote=true" class="btn btn-industrial btn-lg"><i class="fas fa-file-invoice me-2"></i> Request Commercial Estimate in Shop</a>'
);
fs.writeFileSync('services.html', sHtml, 'utf8');
console.log('SUCCESS: services.html updated');

// --- Updating blog-details.html & blog.html ---
console.log('--- Updating blog-details.html & blog.html links ---');
let bdHtml = fs.readFileSync('blog-details.html', 'utf8');
bdHtml = bdHtml.replace(
  '<a href="contact.html" class="btn btn-industrial w-100"><i class="fas fa-download me-2"></i> Download PDF (18 MB)</a>',
  '<a href="service-details.html#serviceSpecsBody" class="btn btn-industrial w-100"><i class="fas fa-book me-2"></i> View AIS-093 Full Technical Specs</a>'
);
bdHtml = bdHtml.replace(
  '<a href="contact.html" class="btn btn-industrial"><i class="fas fa-calculator me-2"></i> Request Tipper Quote</a>',
  '<a href="shop.html?category=custom&openQuote=true" class="btn btn-industrial"><i class="fas fa-calculator me-2"></i> Request Tipper Quote in Shop</a>'
);
fs.writeFileSync('blog-details.html', bdHtml, 'utf8');

let bHtml = fs.readFileSync('blog.html', 'utf8');
bHtml = bHtml.replace(
  '<a href="contact.html" class="btn btn-industrial btn-lg">\n                <i class="fas fa-file-pdf me-2"></i> Request Engineering Manual (PDF)\n              </a>',
  '<a href="service-details.html" class="btn btn-industrial btn-lg">\n                <i class="fas fa-book-open me-2"></i> View Technical Engineering Specs\n              </a>'
);
fs.writeFileSync('blog.html', bHtml, 'utf8');
console.log('SUCCESS: blog files updated');
