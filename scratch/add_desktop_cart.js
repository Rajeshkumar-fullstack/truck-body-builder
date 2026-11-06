const fs = require('fs');

const files = [
  'index.html',
  'home-2.html',
  'about.html',
  'services.html',
  'service-details.html',
  'gallery.html',
  'blog.html',
  'blog-details.html',
  'contact.html',
  'cart.html'
];

const desktopCartSnippet = `            <!-- Cart Icon with Live Badge (Desktop) -->
            <a href="cart.html" class="header-icon-btn cart-icon-btn position-relative d-none d-lg-inline-flex" title="View Shopping Cart" aria-label="Shopping Cart">
              <i class="fas fa-shopping-cart"></i>
              <span class="cart-count-badge badge bg-warning text-dark position-absolute top-0 start-100 translate-middle rounded-pill" style="display: none; font-size: 0.65rem; padding: 0.25em 0.5em;">0</span>
            </a>
`;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  let updated = false;

  // Add desktop cart icon inside .header-actions before nav-cta-btn if not present
  if (!html.includes('d-none d-lg-inline-flex" title="View Shopping Cart"') && html.includes('nav-cta-btn')) {
    html = html.replace(/([ \t]*)<a href="contact\.html" class="btn btn-industrial nav-cta-btn">/, (match) => {
      return `${desktopCartSnippet}${match.trim()}`;
    });
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(file, html, 'utf8');
    console.log(`Added desktop cart icon in ${file}`);
  } else {
    console.log(`Desktop cart icon already present or not applicable in ${file}`);
  }
});
