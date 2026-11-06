const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const map = [
  ['Open+Truck+Body', 'shop.html?search=Open+Body', 'service-details.html?product=open-body'],
  ['Closed+Container+Body', 'shop.html?search=Container', 'service-details.html?product=container-body'],
  ['Tipper+Truck+Body', 'shop.html?search=Tipper', 'service-details.html?product=tipper-body'],
  ['Trailer+Body', 'shop.html?category=chassis', 'service-details.html?product=trailer-body'],
  ['Tanker+Body', 'shop.html?search=Tanker', 'service-details.html?product=tanker-body'],
  ['Refrigerated+Body', 'shop.html?category=custom', 'service-details.html?product=refrigerated-body'],
  ['Flatbed+Truck+Body', 'shop.html?category=custom', 'service-details.html?product=flatbed-body'],
  ['Custom+Fabricated+Body', 'shop.html?category=custom&openQuote=true', 'service-details.html?product=custom-body']
];

map.forEach(([param, shopLink, specLink]) => {
  const needle = `contact.html?product=${param}`;
  const idx = html.indexOf(needle);
  if (idx !== -1) {
    // Find the opening <div class="product-footer mt-auto"> before it
    const startDiv = html.lastIndexOf('<div class="product-footer mt-auto">', idx);
    const endDiv = html.indexOf('</div>', idx) + 6;
    if (startDiv !== -1 && endDiv !== -1) {
      const oldSnippet = html.substring(startDiv, endDiv);
      const newSnippet = `<div class="product-footer mt-auto d-flex gap-2">
                  <a href="${shopLink}" class="btn btn-sm btn-industrial flex-grow-1"><i class="fas fa-shopping-cart me-1"></i> Order / Shop</a>
                  <a href="${specLink}" class="btn btn-sm btn-outline-steel px-3" title="Technical Specs"><i class="fas fa-info-circle"></i> Specs</a>
                </div>`;
      html = html.replace(oldSnippet, newSnippet);
      console.log('Replaced', param);
    }
  } else {
    console.log('Needle not found:', needle);
  }
});

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done updating product cards in index.html');
