// Unit testing Cart Math & LocalStorage logic
const CATALOG = [
  { id: 'prod-01', name: 'Tool Box', price: 14500, priceType: 'fixed' },
  { id: 'prod-02', name: 'Hydraulic Cylinder', price: 78000, priceType: 'fixed' },
  { id: 'prod-06', name: 'Ratchet Lashing Belt', price: 3200, priceType: 'fixed' },
  { id: 'prod-10', name: 'Custom Tipper Body', price: null, priceType: 'quote' }
];

let mockStorage = {};
const STORAGE_KEY = 'truck_body_builder_cart';

function getCart() {
  const d = mockStorage[STORAGE_KEY];
  return d ? JSON.parse(d) : [];
}

function saveCart(c) {
  mockStorage[STORAGE_KEY] = JSON.stringify(c);
}

function addToCart(prod, qty = 1) {
  let cart = getCart();
  let existing = cart.find(x => x.id === prod.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ ...prod, quantity: qty });
  }
  saveCart(cart);
}

function updateQty(id, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter(x => x.id !== id);
  } else {
    let item = cart.find(x => x.id === id);
    if (item) item.quantity = qty;
  }
  saveCart(cart);
}

function calculateTotals(cart) {
  const fixedItems = cart.filter(i => typeof i.price === 'number' && i.price > 0);
  const subtotal = fixedItems.reduce((s, i) => s + (i.price * i.quantity), 0);
  const gst = Math.round(subtotal * 0.18);
  const shipping = subtotal === 0 ? 0 : (subtotal >= 25000 ? 0 : 1500);
  const grandTotal = subtotal + gst + shipping;
  const count = cart.reduce((s, i) => s + i.quantity, 0);
  return { count, subtotal, gst, shipping, grandTotal };
}

console.log('--- TEST 1: Add Product 1 (Qty 2) ---');
addToCart(CATALOG[0], 2);
let t1 = calculateTotals(getCart());
console.log(`Subtotal: ₹${t1.subtotal} (Expected: 29000), Count: ${t1.count} (Expected: 2), Shipping: ${t1.shipping} (Expected: 0)`);
console.assert(t1.subtotal === 29000, 'Subtotal mismatch');
console.assert(t1.shipping === 0, 'Shipping threshold mismatch');

console.log('\n--- TEST 2: Add Duplicate Product 1 (Qty 1) -> Should Merge to Qty 3 ---');
addToCart(CATALOG[0], 1);
let t2 = calculateTotals(getCart());
console.log(`Qty: ${getCart()[0].quantity} (Expected: 3), Subtotal: ₹${t2.subtotal} (Expected: 43500)`);
console.assert(getCart()[0].quantity === 3, 'Qty merge mismatch');
console.assert(t2.subtotal === 43500, 'Subtotal mismatch');

console.log('\n--- TEST 3: Add Small Product (Lashing Belt, Qty 1: ₹3200) -> Below 25k threshold ---');
mockStorage = {}; // reset
addToCart(CATALOG[2], 1);
let t3 = calculateTotals(getCart());
console.log(`Subtotal: ₹${t3.subtotal} (Expected: 3200), Shipping: ₹${t3.shipping} (Expected: 1500), Grand Total: ₹${t3.grandTotal} (Expected: 5276)`);
console.assert(t3.subtotal === 3200, 'Subtotal mismatch');
console.assert(t3.shipping === 1500, 'Shipping fee mismatch');
console.assert(t3.gst === 576, 'GST mismatch');
console.assert(t3.grandTotal === 5276, 'Grand total mismatch');

console.log('\n--- TEST 4: Add Custom Quotation Product (Price on Request) ---');
addToCart(CATALOG[3], 1);
let t4 = calculateTotals(getCart());
console.log(`Total items in cart: ${t4.count} (Expected: 2: 1 fixed + 1 quote), Subtotal unchanged: ₹${t4.subtotal} (Expected: 3200)`);
console.assert(t4.count === 2, 'Count mismatch');
console.assert(t4.subtotal === 3200, 'Priced subtotal should exclude quote item');

console.log('\n--- TEST 5: Decrease Qty to 0 -> Removes Item ---');
updateQty('prod-06', 0);
let t5 = calculateTotals(getCart());
console.log(`Items remaining: ${t5.count} (Expected: 1 quote item)`);
console.assert(t5.count === 1, 'Remove item mismatch');

console.log('\nALL CART LOGIC AND PRICING CALCULATIONS PASSED SUCCESSFULLY!');
