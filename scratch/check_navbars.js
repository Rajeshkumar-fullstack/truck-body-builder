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

files.forEach(f => {
  if (!fs.existsSync(f)) {
    console.log(`File not found: ${f}`);
    return;
  }
  const html = fs.readFileSync(f, 'utf8');
  const hasMobileControls = html.includes('mobile-nav-controls');
  const hasHeaderActions = html.includes('header-actions');
  const hasCartIcon = html.includes('cart-icon-btn') || html.includes('fa-shopping-cart');
  const hasShopLink = html.includes('shop.html');
  console.log(`${f}: MobileControls=${hasMobileControls}, HeaderActions=${hasHeaderActions}, CartIcon=${hasCartIcon}, ShopLink=${hasShopLink}`);
});
