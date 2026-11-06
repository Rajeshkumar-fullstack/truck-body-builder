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

const mobileCartSnippet = `          <!-- Cart Icon with Live Badge (Mobile) -->
          <a href="cart.html" class="header-icon-btn cart-icon-btn position-relative" title="View Shopping Cart" aria-label="Shopping Cart">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-count-badge badge bg-warning text-dark position-absolute top-0 start-100 translate-middle rounded-pill" style="display: none; font-size: 0.65rem; padding: 0.25em 0.5em;">0</span>
          </a>
          `;

const desktopCartSnippet = `            <!-- Cart Icon with Live Badge (Desktop) -->
            <a href="cart.html" class="header-icon-btn cart-icon-btn position-relative d-none d-lg-inline-flex" title="View Shopping Cart" aria-label="Shopping Cart">
              <i class="fas fa-shopping-cart"></i>
              <span class="cart-count-badge badge bg-warning text-dark position-absolute top-0 start-100 translate-middle rounded-pill" style="display: none; font-size: 0.65rem; padding: 0.25em 0.5em;">0</span>
            </a>
            `;

const shopNavSnippet = `            <li class="nav-item">
              <a class="nav-link" href="shop.html">Shop</a>
            </li>
`;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  let updated = false;

  // 1. Add mobile cart icon before navbar-toggler if not present
  if (!html.includes('cart-icon-btn') && html.includes('id="navbarDrawerToggler"')) {
    html = html.replace(/([ \t]*)<button class="navbar-toggler"[^>]*id="navbarDrawerToggler"/, (match) => {
      return `${mobileCartSnippet}${match.trim()}`;
    });
    updated = true;
  }

  // 2. Add desktop cart icon before nav-cta-btn if not present
  if (html.includes('cart.html" class="header-icon-btn cart-icon-btn') === false && html.includes('nav-cta-btn')) {
    html = html.replace(/([ \t]*)<a href="contact\.html" class="btn btn-industrial nav-cta-btn">/, (match) => {
      return `${desktopCartSnippet}${match.trim()}`;
    });
    updated = true;
  }

  // 3. Add Shop nav item before Contact if not present
  if (!html.includes('href="shop.html"') && html.includes('href="contact.html">Contact</a>')) {
    html = html.replace(/([ \t]*)<li class="nav-item">\s*<a class="nav-link" href="contact\.html">Contact<\/a>\s*<\/li>/, (match) => {
      return `${shopNavSnippet}${match.trim()}`;
    });
    updated = true;
  }

  // 4. Add Shop and Cart to footer quick links if not present
  if (!html.includes('<li><a href="shop.html">') && html.includes('<li><a href="contact.html"><i class="fas fa-angle-right"></i> Contact & Quote</a></li>')) {
    html = html.replace('<li><a href="contact.html"><i class="fas fa-angle-right"></i> Contact & Quote</a></li>', `<li><a href="shop.html"><i class="fas fa-angle-right"></i> Hardware Shop</a></li>\n            <li><a href="cart.html"><i class="fas fa-angle-right"></i> Shopping Cart</a></li>\n            <li><a href="contact.html"><i class="fas fa-angle-right"></i> Contact & Quote</a></li>`);
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(file, html, 'utf8');
    console.log(`Updated navbar and links in ${file}`);
  } else {
    console.log(`No changes needed in ${file}`);
  }
});
