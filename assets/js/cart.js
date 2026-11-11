/**
 * PROJECT 69: TRUCK BODY BUILDER & COMMERCIAL VEHICLE FABRICATION
 * Fully Functional Add to Cart & B2B Procurement System (Vanilla JS & LocalStorage)
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'truck_body_builder_cart';
  const GST_RATE = 0.18;
  const FREE_SHIPPING_THRESHOLD = 25000;
  const STANDARD_SHIPPING_FEE = 1500;

  // Commercial Truck Body Builder Catalog (Exclusively Commercial Vehicles & Heavy Haulage)
  const CATALOG = [
    // 1. Truck Body Accessories
    {
      id: 'prod-01',
      name: 'Heavy-Duty Underbody Steel Tool Box (36")',
      sku: 'TBB-ACC-010',
      category: 'Truck Body Accessories',
      price: 14500,
      priceType: 'fixed',
      image: 'assets/images/products/acc-toolbox.jpg?v=2',
      stockStatus: 'In Stock - Ready to Dispatch',
      badge: 'Bestseller',
      specs: ['Dimensions: 900 x 450 x 450 mm', 'Material: 2.5mm CRCA Automotive Steel', 'Lock: Dual Stainless Keyed T-Latch'],
      description: 'Heavy gauge weather-resistant underbody storage box equipped with EPDM automotive water seal and reinforced structural subframe brackets.'
    },
    {
      id: 'prod-02',
      name: 'Rear Heavy-Duty Rubber Impact Buffer Guard (Pair)',
      sku: 'TBB-ACC-048',
      category: 'Truck Body Accessories',
      price: 7600,
      priceType: 'fixed',
      image: 'assets/images/products/acc-bumper.jpg?v=2',
      stockStatus: 'In Stock - Ready to Dispatch',
      badge: 'Dock Protection',
      specs: ['Size: 400 x 200 x 120 mm per block', 'Compound: High-Durometer Natural Rubber', 'Fastening: Pre-Drilled Steel Core Flanges'],
      description: 'Heavy impact-absorbing dock bumper blocks designed to prevent structural rear frame damage during loading bay reverse docking.'
    },
    {
      id: 'prod-03',
      name: 'Commercial Aluminium Cab-Mount Access Ladder',
      sku: 'TBB-ACC-032',
      category: 'Truck Body Accessories',
      price: 11200,
      priceType: 'fixed',
      image: 'assets/images/products/acc-ladder.jpg?v=5',
      stockStatus: 'In Stock - Ready to Dispatch',
      badge: 'Ergonomic Access',
      specs: ['Material: Marine-Grade 6061-T6 Structural Aluminium', 'Rungs: 5 Serrated Anti-Slip High-Traction Treads', 'Mounting: Universal Chassis Bolt-On Flange Kit'],
      description: 'All-welded industrial aluminium ladder engineered for safe 3-point cab-mount climbing and roof inspections on commercial tippers and container rigs.'
    },

    // 2. Truck Chassis Components
    {
      id: 'prod-04',
      name: 'Multi-Axle Heavy Leaf Spring Suspension Assembly (16T)',
      sku: 'TBB-CHS-095',
      category: 'Truck Chassis Components',
      price: 34000,
      priceType: 'fixed',
      image: 'assets/images/products/part-leafspring.jpg',
      stockStatus: 'In Stock - Heavy Haul',
      badge: '16T Axle Load',
      specs: ['Leaves: 12-Leaf Parabolic Stack', 'Steel Grade: 55Si7 High-Tensile Spring Steel', 'Finish: Shot-Peened & Anti-Rust Primed'],
      description: 'Severe duty multi-leaf spring suspension engineered for heavy tandem axles, quarry tippers, and high-capacity freight chassis.'
    },
    {
      id: 'prod-05',
      name: 'Heavy-Duty Forged 2" / 3.5" Fifth Wheel Kingpin Assembly',
      sku: 'TBB-CHS-050',
      category: 'Truck Chassis Components',
      price: 21500,
      priceType: 'fixed',
      image: 'assets/images/products/part-kingpin.jpg?v=5',
      stockStatus: 'In Stock - ARAI Certified',
      badge: '50-Ton D-Value',
      specs: ['Standard: DIN 74080 / SAE J700 & ARAI AIS-090 Compliant', 'Alloy: Drop-Forged 42CrMo4 Quenched & Tempered', 'Mounting: 8-Bolt Bolster Skid Flange (50-Ton D-Value)'],
      description: 'Precision-machined high-tensile trailer kingpin with heavy-duty bolster mounting flange, rated for severe articulation load and multi-axle freight haulage.'
    },
    {
      id: 'prod-06',
      name: 'Heavy Tandem Bogie Equalizer Beam Kit (32T)',
      sku: 'TBB-CHS-120',
      category: 'Truck Chassis Components',
      price: 46000,
      priceType: 'fixed',
      image: 'assets/images/products/part-equalizer.jpg',
      stockStatus: 'In Stock - Factory Tested',
      badge: '32-Ton Tandem',
      specs: ['Bushings: Heavy Bronze Greasable Bushes', 'Forging: Heavy Cast Steel Rocker Arm', 'Rating: 32,000 kg Axle Combination'],
      description: 'Rocking beam equalizer designed for heavy tri-axle and tandem dump trucks to balance ground pressure over uneven quarry terrain.'
    },

    // 3. Hydraulic Equipment
    {
      id: 'prod-07',
      name: 'Commercial Heavy Tipper Hydraulic Hoist Cylinder (50 Ton)',
      sku: 'TBB-HYD-050',
      category: 'Hydraulic Equipment',
      price: 78000,
      priceType: 'fixed',
      image: 'assets/images/products/hyd-cylinder.jpg',
      stockStatus: 'In Stock - Factory Tested',
      badge: 'Heavy Mining',
      specs: ['Capacity: 50 Metric Ton Payload', 'Type: 4-Stage Telescopic Single-Acting', 'Stroke: 4200mm Extended'],
      description: 'Hard-chrome plated micro-honed multi-stage tipping hoist cylinder engineered for severe rock and iron-ore aggregate dumping.'
    },
    {
      id: 'prod-08',
      name: 'Pneumatic Tipper Proportional Cabin Joystick Valve Kit',
      sku: 'TBB-HYD-028',
      category: 'Hydraulic Equipment',
      price: 26500,
      priceType: 'fixed',
      image: 'assets/images/products/hyd-valve.jpg?v=3',
      stockStatus: 'In Stock - Ready to Dispatch',
      badge: 'OEM Quality',
      specs: ['Working Pressure: 250 Bar (3,600 PSI)', 'Controls: In-Cabin Pneumatic Joystick', 'Ports: Standard 1/2" BSP'],
      description: 'Integrated cabin air-control kit with proportional lowering, PTO automatic disconnect, and secondary hydraulic relief protection.'
    },
    {
      id: 'prod-09',
      name: 'Direct Transmission PTO Heavy Hydraulic Gear Pump (85 L/min)',
      sku: 'TBB-HYD-085',
      category: 'Hydraulic Equipment',
      price: 32000,
      priceType: 'fixed',
      image: 'assets/images/products/hyd-pump.jpg?v=3',
      stockStatus: 'In Stock - Heavy Duty',
      badge: 'High Flow',
      specs: ['Displacement: 85 L/min at 1,000 RPM', 'Mount: 4-Bolt ISO Flange Fitment', 'Pressure Peak: 280 Bar Continuous'],
      description: 'Bi-directional heavy cast-iron gear pump engineered for direct transmission PTO mounting on Tata, Ashok Leyland, and BharatBenz chassis.'
    },

    // 4. Truck Body Spare Parts
    {
      id: 'prod-10',
      name: 'Forged Container Door Cam Lock & Hinge Hardware Kit (SS-304)',
      sku: 'TBB-SPR-104',
      category: 'Truck Body Spare Parts',
      price: 9800,
      priceType: 'fixed',
      image: 'assets/images/products/part-camlock.jpg?v=5',
      stockStatus: 'In Stock - Ready to Dispatch',
      badge: 'SS-304 Marine',
      specs: ['Material: Marine-Grade Austenitic SS-304 Stainless', 'Components: Dual Lock Rods, 4 Cams, 4 Keepers & Hinges', 'Standard: ISO 1496 Cargo Container Anti-Rack Spec'],
      description: 'Complete mirror-finished stainless steel rear cargo door locking gear with anti-rack forged cams, heavy-duty bracket keepers, and ergonomic safety catch levers.'
    },
    {
      id: 'prod-11',
      name: 'Automatic Pneumatic Tipper Tailgate Locking Actuator',
      sku: 'TBB-SPR-062',
      category: 'Truck Body Spare Parts',
      price: 16500,
      priceType: 'fixed',
      image: 'assets/images/products/part-tailgate-lock.jpg',
      stockStatus: 'In Stock - Ready to Dispatch',
      badge: 'Air Actuated',
      specs: ['Cylinder Bore: 63mm Pneumatic Stroke', 'Claw: Hardened Alloy Steel Cam Hook', 'Operation: Automatic Interlock with Tipping Lever'],
      description: 'Pneumatic tailgate bottom latching cylinder ensuring aggregate rock seal during haulage and instant automatic release on tipping.'
    },
    {
      id: 'prod-12',
      name: 'Heavy Dropside Spring-Loaded Locking Handles (Set of 6)',
      sku: 'TBB-SPR-044',
      category: 'Truck Body Spare Parts',
      price: 8400,
      priceType: 'fixed',
      image: 'assets/images/products/part-dropside-handle.jpg?v=5',
      stockStatus: 'In Stock - Ready to Dispatch',
      badge: 'Heavy Dropside',
      specs: ['Pack Size: Complete Matched Set of 6 Latches & Keepers', 'Mechanism: Internal Heavy Compression Spring Over-Center', 'Finish: Hot-Dip Galvanized Zinc (Corrosion Class C4)'],
      description: 'Industrial over-center spring toggle latches with integrated safety releases, maintaining positive lock tension on truck dropside panels under extreme road vibration.'
    },

    // 5. Fabrication Components
    {
      id: 'prod-13',
      name: 'Intermodal Container Twist Lock Assembly (Set of 4)',
      sku: 'TBB-FAB-072',
      category: 'Fabrication Components',
      price: 18500,
      priceType: 'fixed',
      image: 'assets/images/products/part-twistlock.jpg',
      stockStatus: 'In Stock - Heavy Haul',
      badge: 'ISO Standard',
      specs: ['Standard: ISO 1161 Corner Casting Fit', 'Material: Drop-Forged 42CrMo4 Alloy', 'Operation: Retractable Twist Lock Pin'],
      description: 'High-strength trailer deck twist locks designed for securing 20-ft and 40-ft ISO sea-containers onto skeletal flatbed chassis.'
    },
    {
      id: 'prod-14',
      name: 'Rolled Structural Longitudinal Subframe C-Channel (225x75x8mm, 6m)',
      sku: 'TBB-FAB-225',
      category: 'Fabrication Components',
      price: 28000,
      priceType: 'fixed',
      image: 'assets/images/products/part-c-channel.jpg?v=3',
      stockStatus: 'In Stock - Mill Certified',
      badge: 'High-Yield IS 2062',
      specs: ['Profile: Channel 225 x 75 x 8 mm', 'Length: 6,000 mm Structural Beam', 'Yield Strength: 350-450 MPa Structural Grade'],
      description: 'Factory-rolled longitudinal subframe channel engineered for rigid truck body base frames, tipper subchassis, and trailer runners.'
    },
    {
      id: 'prod-15',
      name: 'Hardox 450 Wear-Resistant Liner Plate (2500 x 1250 x 8mm)',
      sku: 'TBB-FAB-450',
      category: 'Fabrication Components',
      price: 42000,
      priceType: 'fixed',
      image: 'assets/images/products/part-hardox-plate.jpg?v=3',
      stockStatus: 'In Stock - Authentic SSAB',
      badge: 'Genuine Hardox',
      specs: ['Hardness: 450 HBW Abrasion Resistant', 'Dimensions: 2500 x 1250 x 8 mm', 'Impact Toughness: 50 J at -40°C'],
      description: 'Genuine Swedish Hardox 450 quenched steel plate for quarry tipper floors, aggregate chutes, and mining dumper tubs.'
    },

    // 6. Industrial Vehicle Accessories
    {
      id: 'prod-16',
      name: 'High-Intensity LED Side & Clearance Marker Lights (Set of 6)',
      sku: 'TBB-ELE-024',
      category: 'Industrial Vehicle Accessories',
      price: 4800,
      priceType: 'fixed',
      image: 'assets/images/products/acc-lights.jpg?v=6',
      stockStatus: 'In Stock - Ready to Dispatch',
      badge: 'ARAI AIS-008',
      specs: ['Voltage: 12V / 24V Multi-Voltage', 'Rating: IP68 Submersible Sealed', 'Compliance: ARAI AIS-008 Norms'],
      description: 'High-visibility amber and red polycarbonate LED outline marker lights with integrated optical reflectors for commercial trailers.'
    },
    {
      id: 'prod-17',
      name: 'ARAI-Certified Reflective Conspicuity Safety Tape (50m Roll)',
      sku: 'TBB-SAF-088',
      category: 'Industrial Vehicle Accessories',
      price: 4200,
      priceType: 'fixed',
      image: 'assets/images/products/acc-tape.jpg?v=3',
      stockStatus: 'In Stock - Ready to Dispatch',
      badge: 'CMVR Rule 104',
      specs: ['Dimensions: 50mm x 50 Meter Roll', 'Pattern: Microprismatic High-Reflective', 'Standard: AIS-090 / CMVR Rule 104'],
      description: 'Mandatory commercial vehicle perimeter marking tape with heavy industrial pressure adhesive, resistant to fuel spills and pressure washing.'
    },
    {
      id: 'prod-18',
      name: 'Industrial Heavy-Duty Ratchet Cargo Lashing Belt (10T, 12m)',
      sku: 'TBB-CRG-055',
      category: 'Industrial Vehicle Accessories',
      price: 3200,
      priceType: 'fixed',
      image: 'assets/images/products/acc-strap.jpg?v=3',
      stockStatus: 'In Stock - Ready to Dispatch',
      badge: '10 Ton Rated',
      specs: ['Capacity: 10,000 kg Lashing Strength', 'Webbing: 50mm 100% High-Tenacity PES', 'Hardware: Double-J Forged Steel Hooks'],
      description: 'Pre-stretched industrial tie-down assembly with zinc-plated dual-gear ratchet buckle for flatbed cargo, steel coils, and machinery.'
    },
    {
      id: 'prod-19',
      name: 'Heavy Commercial Anti-Spray Rain Flap & Mounting Bracket Set',
      sku: 'TBB-ACC-082',
      category: 'Industrial Vehicle Accessories',
      price: 5400,
      priceType: 'fixed',
      image: 'assets/images/products/acc-mudflap.jpg?v=5',
      stockStatus: 'In Stock - Ready to Dispatch',
      badge: 'AIS-013 Ready',
      specs: ['Flaps: Pair 600x400mm Ribbed Thermoplastic (AIS-013)', 'Hardware: Galvanized Tubular Steel Arms & Chassis Brackets', 'Fastening: Grade 8.8 High-Tensile Chassis Mounting Bolts'],
      description: 'ARAI AIS-013 compliant anti-spray rain suppression flap kit with structural tubular steel mounting arms, minimizing highway splash and protecting following traffic.'
    },

    // 7. Custom Truck Bodies (Custom Fabrication – Price on Request / Quotation List)
    {
      id: 'prod-20',
      name: 'Custom Open Truck Body (Dropside & Fixed Side)',
      sku: 'TBB-BDY-OPN',
      category: 'Custom Truck Bodies',
      price: null,
      priceType: 'quote',
      image: 'assets/images/products/open-body.jpg',
      stockStatus: 'Custom Fabrication - Made to Order',
      badge: 'Heavy Haulage',
      specs: ['Payload: 9T - 40T Commercial Capacity', 'Floor: 4-6mm Heavy Chequered Steel', 'Chassis Fit: Tata / Leyland / BharatBenz Multi-Axle'],
      description: 'Heavy-duty dropside and fixed-side open cargo truck bodies built with corrugated high-tensile steel panels, reinforced headboards, and tie-down hooks.'
    },
    {
      id: 'prod-21',
      name: 'Custom Closed Container Body (Corrugated Logistics Box)',
      sku: 'TBB-BDY-CNT',
      category: 'Custom Truck Bodies',
      price: null,
      priceType: 'quote',
      image: 'assets/images/products/container-body.jpg',
      stockStatus: 'Custom Fabrication - Made to Order',
      badge: 'Logistics',
      specs: ['Volume: Up to 1200 cu.ft High-Cube', 'Walls: Corrugated MS / GI Steel Panels', 'Doors: Rear Double Doors with SS-304 Cam Locks'],
      description: 'All-weather corrugated steel logistics containers with leak-proof monocoque roofing, EPDM seals, and high-security dual cam lock rods.'
    },
    {
      id: 'prod-22',
      name: 'Custom Tipper Truck Body (Mining & Quarry Scoop)',
      sku: 'TBB-BDY-TIP',
      category: 'Custom Truck Bodies',
      price: null,
      priceType: 'quote',
      image: 'assets/images/products/tipper-body.jpg',
      stockStatus: 'Custom Fabrication - Made to Order',
      badge: 'Mining & Quarry',
      specs: ['Capacity: 14m³ - 24m³ Rock Tub', 'Liner: 8-10mm Hardox 450 Wear Plate', 'Hydraulics: Hyva FE Multi-Stage Hoist'],
      description: 'Severe-duty rock and scoop tip bodies with subframe reinforcement, automatic pneumatic tailgate interlock, and cabin rock protection shield.'
    },
    {
      id: 'prod-23',
      name: 'Custom Commercial Trailer Body (Skeletal & Flatbed)',
      sku: 'TBB-BDY-TRL',
      category: 'Custom Truck Bodies',
      price: null,
      priceType: 'quote',
      image: 'assets/images/products/trailer-body.jpg',
      stockStatus: 'Custom Fabrication - Made to Order',
      badge: 'Interstate Haul',
      specs: ['Length: 40ft & 50ft Platform Bed', 'Axles: 2-Axle & 3-Axle York/BPW Rated', 'Suspension: Heavy Mechanical / Air Ride'],
      description: 'Skeletal ISO container carriers and heavy flatbed semi-trailers equipped with Jost landing gear, twist locks, and WABCO ABS brakes.'
    },
    {
      id: 'prod-24',
      name: 'Custom Road Tanker Body (Fuel, Milk & Chemical)',
      sku: 'TBB-BDY-TNK',
      category: 'Custom Truck Bodies',
      price: null,
      priceType: 'quote',
      image: 'assets/images/products/tanker-body.jpg',
      stockStatus: 'Custom Fabrication - Made to Order',
      badge: 'Liquid Logistics',
      specs: ['Capacity: 12,000L - 40,000L Multi-Compartment', 'Shell: Food-Grade SS304 / Chemical SS316L', 'Safety: Pneumatic Bottom Emergency Foot Valves'],
      description: 'High-safety road tanker bodies engineered for petroleum, solvent, chemical, and milk transport with anti-surge baffles and PESO approval.'
    },
    {
      id: 'prod-25',
      name: 'Custom Refrigerated Body (Cold Chain Reefer)',
      sku: 'TBB-BDY-REF',
      category: 'Custom Truck Bodies',
      price: null,
      priceType: 'quote',
      image: 'assets/images/products/refrigerated-body.jpg',
      stockStatus: 'Custom Fabrication - Made to Order',
      badge: 'Cold Chain',
      specs: ['Insulation: 100-120mm High-Density PUF Core', 'Temp Range: +15°C down to -25°C Deep Freeze', 'Skin: Food-Grade Seamless GRP with T-Floor'],
      description: 'HACCP and Pharma GDP compliant temperature-controlled reefer truck bodies compatible with Thermo King and Carrier refrigeration units.'
    },
    {
      id: 'prod-26',
      name: 'Custom Flatbed Truck Body (Machinery & Steel Carrier)',
      sku: 'TBB-BDY-FLT',
      category: 'Custom Truck Bodies',
      price: null,
      priceType: 'quote',
      image: 'assets/images/products/flatbed-body.jpg',
      stockStatus: 'Custom Fabrication - Made to Order',
      badge: 'Heavy Plant',
      specs: ['Payload: Up to 55 Tons High Point-Load', 'Deck: 6mm Heavy Chequered Steel Bed', 'Lashing: Integrated Winches & Stake Pockets'],
      description: 'Heavy equipment platform bodies with structural headboard protection shields, side stake pockets, and heavy-duty load binder tracks.'
    },
    {
      id: 'prod-27',
      name: 'Custom Fabricated Body (Special Commercial Rig)',
      sku: 'TBB-BDY-CUS',
      category: 'Custom Truck Bodies',
      price: null,
      priceType: 'quote',
      image: 'assets/images/products/custom-body.jpg',
      stockStatus: 'Custom Fabrication - Made to Order',
      badge: 'Custom Built',
      specs: ['Engineering: 3D SolidWorks CAD & FEA Validated', 'Chassis Fit: All Commercial Chassis (ARAI Compliant)', 'Warranty: 5-Year Structural Frame Guarantee'],
      description: 'Bespoke commercial vehicle modifications: heavy vehicle recovery breakdown bodies, mobile workshop vans, defense, and municipal utility rigs.'
    }
  ];

  // ==========================================================================
  // LocalStorage Helpers
  // ==========================================================================
  function getCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      // Clean invalid entries
      return parsed
        .filter(item => item && item.id && item.name && typeof item.quantity === 'number' && item.quantity > 0)
        .map(item => {
          const match = CATALOG.find(p => p.id === item.id);
          if (match && match.image) {
            item.image = match.image;
          } else if (!item.image || typeof item.image !== 'string' || item.image.trim() === '') {
            item.image = 'assets/images/products/acc-toolbox.jpg';
          }
          return item;
        });
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      updateCartBadge();
      window.dispatchEvent(new CustomEvent('truck_cart_updated', { detail: cart }));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }

  // ==========================================================================
  // Live Cart Count Badge Updater (Navbar Integration)
  // ==========================================================================
  function updateCartBadge() {
    const cart = getCart();
    const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(badge => {
      badge.textContent = totalCount;
      if (totalCount > 0) {
        badge.style.display = 'inline-flex';
        badge.setAttribute('aria-label', `${totalCount} items in procurement cart`);
      } else {
        badge.style.display = 'none';
        badge.removeAttribute('aria-label');
      }
    });
  }

  // ==========================================================================
  // Toast Notification System
  // ==========================================================================
  function showToast(title, message, iconClass = 'fas fa-check-circle', showViewCart = true) {
    let toast = document.querySelector('.cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'cart-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="cart-toast-icon"><i class="${iconClass}"></i></div>
      <div class="cart-toast-body flex-grow-1">
        <strong class="cart-toast-title text-white">${title}</strong>
        <p class="cart-toast-msg mb-0 small text-light">${message}</p>
      </div>
      ${showViewCart ? '<a href="cart.html" class="cart-toast-btn text-nowrap ms-2" title="View Shopping Cart">View Cart &rarr;</a>' : ''}
    `;

    toast.classList.add('show');
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // ==========================================================================
  // Add Product to Cart / Quotation List
  // ==========================================================================
  function addToCart(product, qtyToAdd = 1) {
    if (!product || !product.id) return;
    const addQuantity = Math.max(1, parseInt(qtyToAdd, 10) || 1);
    const isQuoteItem = product.priceType === 'quote' || product.price === null;

    const cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += addQuantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        sku: product.sku || 'TBB-PROD',
        price: typeof product.price === 'number' ? product.price : null,
        priceType: isQuoteItem ? 'quote' : 'fixed',
        image: product.image || 'assets/images/products/container-body.jpg',
        category: product.category || 'Truck Hardware',
        stockStatus: product.stockStatus || 'In Stock',
        quantity: addQuantity
      });
    }

    saveCart(cart);
    const countTotal = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (isQuoteItem) {
      showToast('Added to Cart', `Added ${addQuantity}x "${product.name}" to your cart (${countTotal} items total).`);
    } else {
      showToast('Product Added to Cart', `Added ${addQuantity}x "${product.name}" to your cart (${countTotal} items total).`);
    }
  }

  // ==========================================================================
  // Update Item Quantity
  // ==========================================================================
  function updateQuantity(id, newQty) {
    const qty = parseInt(newQty, 10);
    let cart = getCart();

    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    const item = cart.find(item => item.id === id);
    if (item) {
      item.quantity = qty;
      saveCart(cart);
      if (document.getElementById('cart-page-content')) {
        renderCartPage();
      }
    }
  }

  // ==========================================================================
  // Remove Item from Cart
  // ==========================================================================
  function removeFromCart(id) {
    let cart = getCart();
    const target = cart.find(item => item.id === id);
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    if (target) {
      showToast('Item Removed', `Removed "${target.name}" from your procurement list.`, 'fas fa-trash-alt', false);
    }
    if (document.getElementById('cart-page-content')) {
      renderCartPage();
    }
  }

  // ==========================================================================
  // Clear Entire Cart
  // ==========================================================================
  function clearCart() {
    const cart = getCart();
    if (cart.length === 0) return;
    if (confirm('Are you sure you want to clear all items from your shopping cart?')) {
      saveCart([]);
      showToast('Cart Cleared', 'All items have been removed from your shopping cart.', 'fas fa-info-circle', false);
      if (document.getElementById('cart-page-content')) {
        renderCartPage();
      }
    }
  }

  function formatCurrency(amount) {
    if (amount === null || isNaN(amount)) return 'Price on Request';
    return '₹' + Number(amount).toLocaleString('en-IN');
  }

  // ==========================================================================
  // Render Full Cart Page (cart.html)
  // ==========================================================================
  function renderCartPage() {
    const container = document.getElementById('cart-page-content');
    if (!container) return;

    const cart = getCart();

    // 1. EMPTY CART STATE
    if (cart.length === 0) {
      container.innerHTML = `
        <div class="col-12 py-5 text-center">
          <div class="p-5 bg-white rounded shadow-sm border mx-auto" style="max-width: 650px;">
            <div style="font-size: 4.5rem; color: #cbd5e1; margin-bottom: 20px;">
              <i class="fas fa-truck-ramp-box"></i>
            </div>
            <h2 class="h3 fw-bold mb-2">Your Shopping Cart is Empty</h2>
            <p class="text-muted mb-4">
              You currently have no commercial vehicle accessories, hydraulic spares, or custom fabrication bodies in your procurement list.
            </p>
            <div class="d-flex justify-content-center gap-3 flex-wrap">
              <a href="shop.html" class="btn btn-industrial btn-lg px-4">
                <i class="fas fa-shopping-bag me-2"></i> Continue Shopping
              </a>
              <a href="index.html#truck-body-types" class="btn btn-outline-steel btn-lg px-4">
                <i class="fas fa-truck me-2"></i> View Truck Bodies
              </a>
            </div>
          </div>
        </div>
      `;
      return;
    }

    // 2. SEPARATE FIXED-PRICE PRODUCTS AND QUOTATION ITEMS
    const fixedItems = cart.filter(i => typeof i.price === 'number' && i.price > 0);
    const quoteItems = cart.filter(i => !i.price || i.priceType === 'quote');

    const subtotal = fixedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gstAmount = Math.round(subtotal * GST_RATE);
    const shipping = subtotal === 0 ? 0 : (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE);
    const grandTotal = subtotal + gstAmount + shipping;
    const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Fixed Items Table Rows
    const fixedRowsHtml = fixedItems.map(item => {
      const itemSubtotal = formatCurrency(item.price * item.quantity);
      return `
        <tr class="cart-item-row" data-id="${item.id}">
          <td class="cart-product-cell">
            <div class="cart-product-media-wrap">
              <img src="${item.image || 'assets/images/products/acc-toolbox.jpg'}" alt="${item.name}" class="cart-product-img rounded border" loading="lazy" onerror="this.onerror=null; this.src='assets/images/products/acc-toolbox.jpg';">
              <div class="cart-product-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-meta">
                  <span class="badge bg-light text-dark border me-1">${item.category}</span>
                  <span class="text-muted">SKU: ${item.sku}</span>
                </div>
              </div>
            </div>
          </td>
          <td class="text-nowrap font-monospace fw-bold">
            ${formatCurrency(item.price)}
          </td>
          <td>
            <div class="cart-qty-ctrl">
              <button type="button" class="qty-btn" onclick="TruckCart.updateQty('${item.id}', ${item.quantity - 1})" aria-label="Decrease quantity">-</button>
              <input type="text" class="qty-input" value="${item.quantity}" readonly aria-label="Quantity">
              <button type="button" class="qty-btn" onclick="TruckCart.updateQty('${item.id}', ${item.quantity + 1})" aria-label="Increase quantity">+</button>
            </div>
          </td>
          <td class="text-nowrap font-monospace fw-bold text-end">
            ${itemSubtotal}
          </td>
          <td class="text-center">
            <button type="button" class="btn btn-sm btn-outline-danger border-0" onclick="TruckCart.remove('${item.id}')" title="Remove item" aria-label="Remove item">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Quote Items Table Rows
    const quoteRowsHtml = quoteItems.map(item => {
      return `
        <tr class="cart-item-row table-warning-subtle" data-id="${item.id}">
          <td class="cart-product-cell">
            <div class="cart-product-media-wrap">
              <img src="${item.image || 'assets/images/products/container-body.jpg'}" alt="${item.name}" class="cart-product-img rounded border" loading="lazy" onerror="this.onerror=null; this.src='assets/images/products/container-body.jpg';">
              <div class="cart-product-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-meta">
                  <span class="badge bg-dark text-white me-1">${item.category}</span>
                  <span class="text-muted">SKU: ${item.sku}</span>
                </div>
              </div>
            </div>
          </td>
          <td class="text-nowrap">
            <span class="badge bg-warning text-dark"><i class="fas fa-file-invoice me-1"></i> Price on Request</span>
          </td>
          <td>
            <div class="cart-qty-ctrl">
              <button type="button" class="qty-btn" onclick="TruckCart.updateQty('${item.id}', ${item.quantity - 1})" aria-label="Decrease quantity">-</button>
              <input type="text" class="qty-input" value="${item.quantity}" readonly aria-label="Quantity">
              <button type="button" class="qty-btn" onclick="TruckCart.updateQty('${item.id}', ${item.quantity + 1})" aria-label="Increase quantity">+</button>
            </div>
          </td>
          <td class="text-nowrap text-end text-muted small">
            <em>Custom Quotation</em>
          </td>
          <td class="text-center">
            <button type="button" class="btn btn-sm btn-outline-danger border-0" onclick="TruckCart.remove('${item.id}')" title="Remove item" aria-label="Remove item">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Pre-fill body types for quote form
    const quoteBodyNames = quoteItems.map(i => `${i.name} (${i.quantity} Unit${i.quantity > 1 ? 's' : ''})`).join(', ');

    container.innerHTML = `
      <!-- Left Column: Tables & Checkout Forms -->
      <div class="col-lg-8 mb-4">

        <!-- 1. FIXED-PRICE PRODUCTS TABLE (If any) -->
        ${fixedItems.length > 0 ? `
          <div class="mb-4">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <h3 class="h5 fw-bold mb-0">
                <i class="fas fa-shopping-cart text-orange me-2"></i> Commercial Products & Hardware (${fixedItems.length})
              </h3>
              <span class="text-muted small">Direct Order Checkout</span>
            </div>
            <div class="cart-table-wrapper mb-3">
              <table class="cart-table">
                <thead>
                  <tr>
                    <th class="cart-th-product">Product Details</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th class="text-end">Subtotal</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${fixedRowsHtml}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}

        <!-- 2. CUSTOM FABRICATION QUOTATION LIST (If any) -->
        ${quoteItems.length > 0 ? `
          <div class="mb-4">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <h3 class="h5 fw-bold mb-0 text-dark">
                <i class="fas fa-file-invoice text-orange me-2"></i> Custom Truck Bodies (Quotation List - ${quoteItems.length})
              </h3>
              <span class="badge bg-secondary">Price on Request</span>
            </div>
            <div class="cart-table-wrapper mb-2">
              <table class="cart-table">
                <thead>
                  <tr style="background-color: #273646;">
                    <th class="cart-th-product">Vehicle Body Type</th>
                    <th>Price Status</th>
                    <th>Fleet Qty</th>
                    <th class="text-end">Pricing Mode</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${quoteRowsHtml}
                </tbody>
              </table>
            </div>
            <p class="small text-muted mb-4">
              <i class="fas fa-info-circle text-orange me-1"></i> Custom truck bodies are fabricated to exact chassis specifications. Submitting this list generates a formal engineering proposal & ARAI homologation roadmap.
            </p>
          </div>
        ` : ''}

        <!-- Navigation Buttons: Continue Shopping & Clear Cart -->
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5 p-3 bg-white rounded border shadow-sm">
          <a href="shop.html" class="btn btn-outline-steel">
            <i class="fas fa-arrow-left me-2"></i> Continue Shopping
          </a>
          <button type="button" class="btn btn-outline-danger" onclick="TruckCart.clear()">
            <i class="fas fa-trash-can me-2"></i> Clear Entire Cart
          </button>
        </div>

        <!-- 3. CHECKOUT & ENQUIRY PROCESS SECTION -->
        
        <!-- Case A: Fixed Price Order Checkout -->
        ${fixedItems.length > 0 ? `
          <div class="card p-4 p-md-5 border rounded shadow-sm bg-white mb-4" id="checkout-form-card">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 border-bottom pb-3">
              <div>
                <h3 class="h4 fw-bold mb-1">
                  <i class="fas fa-file-invoice text-orange me-2"></i>Commercial Order Checkout
                </h3>
                <p class="text-muted small mb-0">Submit your B2B procurement details for dispatch invoice processing and fleet delivery scheduling.</p>
              </div>
              <span class="badge bg-dark text-white px-3 py-2 font-monospace">GST 18% Input Credit Eligible</span>
            </div>

            <form id="procurementCheckoutForm" onsubmit="TruckCart.handleCheckout(event)" novalidate>
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="custName" class="form-label fw-bold small">Customer / Contact Person *</label>
                  <input type="text" class="form-control" id="custName" required placeholder="e.g. Ramesh Chandra">
                  <div class="invalid-feedback">Please enter contact person name.</div>
                </div>
                <div class="col-md-6">
                  <label for="custCompany" class="form-label fw-bold small">Company / Fleet Operator Name *</label>
                  <input type="text" class="form-control" id="custCompany" required placeholder="e.g. Apex Logistics Pvt Ltd">
                  <div class="invalid-feedback">Please enter your company or fleet name.</div>
                </div>

                <div class="col-md-6">
                  <label for="custEmail" class="form-label fw-bold small">Work Email Address *</label>
                  <input type="email" class="form-control" id="custEmail" required placeholder="name@company.com">
                  <div class="invalid-feedback">Please enter a valid work email address.</div>
                </div>
                <div class="col-md-6">
                  <label for="custMobile" class="form-label fw-bold small">Mobile Number (10 Digits) *</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light">+91</span>
                    <input type="tel" class="form-control" id="custMobile" pattern="[6-9][0-9]{9}" maxlength="10" required placeholder="9876543210">
                  </div>
                  <div class="invalid-feedback">Please provide a valid 10-digit Indian mobile number.</div>
                </div>

                <div class="col-md-6">
                  <label for="custGstin" class="form-label fw-bold small">GSTIN (For 18% Input Tax Credit)</label>
                  <input type="text" class="form-control text-uppercase" id="custGstin" maxlength="15" placeholder="e.g. 27AAAAA0000A1Z5 (Optional)">
                  <small class="text-muted">GST tax invoice printed with verified GSTIN for enterprise claims.</small>
                </div>
                <div class="col-md-6">
                  <label for="custChassis" class="form-label fw-bold small">Target Vehicle / Chassis Model</label>
                  <input type="text" class="form-control" id="custChassis" placeholder="e.g. Tata Signa 3525.K / BharatBenz 2823C">
                  <small class="text-muted">Helps our engineers verify chassis fitment dimensions.</small>
                </div>

                <div class="col-12">
                  <label for="custAddress" class="form-label fw-bold small">Delivery / Plant Consignment Address *</label>
                  <textarea class="form-control" id="custAddress" rows="2" required placeholder="Full factory, workshop or warehouse delivery address"></textarea>
                  <div class="invalid-feedback">Please provide delivery destination address.</div>
                </div>

                <div class="col-md-6">
                  <label for="custCity" class="form-label fw-bold small">City & State *</label>
                  <input type="text" class="form-control" id="custCity" required placeholder="e.g. Pune, Maharashtra">
                  <div class="invalid-feedback">Please specify city and state.</div>
                </div>
                <div class="col-md-6">
                  <label for="custPincode" class="form-label fw-bold small">Postal Pincode (6 Digits) *</label>
                  <input type="text" class="form-control" id="custPincode" pattern="[0-9]{6}" maxlength="6" required placeholder="e.g. 411018">
                  <div class="invalid-feedback">Please enter valid 6-digit postal pincode.</div>
                </div>

                <div class="col-12">
                  <label for="custNotes" class="form-label fw-bold small">Additional Requirements / Mounting Specifications</label>
                  <textarea class="form-control" id="custNotes" rows="2" placeholder="Any specific chassis wheelbase notes, paint shade, or freight delivery instructions..."></textarea>
                </div>

                <div class="col-12 pt-2">
                  <button type="submit" class="btn btn-industrial btn-lg w-100 py-3 fw-bold" id="submitOrderBtn">
                    <i class="fas fa-truck-fast me-2"></i> Place Commercial Procurement Order
                  </button>
                  <p class="text-muted small text-center mt-2 mb-0">
                    <i class="fas fa-shield-alt text-success me-1"></i> Frontend Demo Order Processed – Ready for ERP / Payment Gateway Integration.
                  </p>
                </div>
              </div>
            </form>
          </div>
        ` : ''}

        <!-- Case B: Custom Fabrication Quotation Request Form (If quote items present) -->
        ${quoteItems.length > 0 ? `
          <div class="card p-4 p-md-5 border rounded shadow-sm bg-white" id="quote-form-card" style="border-top: 4px solid #273646 !important;">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3 border-bottom pb-3">
              <div>
                <h3 class="h4 fw-bold mb-1">
                  <i class="fas fa-drafting-compass text-orange me-2"></i>Custom Truck Body Quotation Enquiry
                </h3>
                <p class="text-muted small mb-0">Submit your vehicle fleet specifications for a formal engineering quote, structural FEA design & ARAI roadmap.</p>
              </div>
              <span class="badge bg-warning text-dark px-3 py-2 font-monospace">Formal Proposal in 4 Hours</span>
            </div>

            <form id="cartQuoteEnquiryForm" onsubmit="TruckCart.handleQuoteEnquiry(event)" novalidate>
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="enqBodyType" class="form-label fw-bold small">Requested Truck Body Type(s) *</label>
                  <input type="text" class="form-control" id="enqBodyType" required value="${quoteBodyNames || 'Custom Truck Body'}">
                  <div class="invalid-feedback">Please specify truck body type.</div>
                </div>
                <div class="col-md-6">
                  <label for="enqVehicleModel" class="form-label fw-bold small">Vehicle / Chassis Model *</label>
                  <input type="text" class="form-control" id="enqVehicleModel" required placeholder="e.g. Tata Prima 5530.S / Ashok Leyland 3520">
                  <div class="invalid-feedback">Please enter chassis make and model.</div>
                </div>

                <div class="col-md-6">
                  <label for="enqQuantity" class="form-label fw-bold small">Required Fleet Quantity *</label>
                  <input type="number" class="form-control" id="enqQuantity" min="1" value="${quoteItems.reduce((s, i) => s + i.quantity, 0) || 1}" required>
                </div>
                <div class="col-md-6">
                  <label for="enqContactName" class="form-label fw-bold small">Customer Contact Name *</label>
                  <input type="text" class="form-control" id="enqContactName" required placeholder="e.g. Arvind Mehta">
                  <div class="invalid-feedback">Please provide your contact name.</div>
                </div>

                <div class="col-md-6">
                  <label for="enqCompany" class="form-label fw-bold small">Company / Fleet Name</label>
                  <input type="text" class="form-control" id="enqCompany" placeholder="e.g. Bharat Freightways Ltd">
                </div>
                <div class="col-md-6">
                  <label for="enqMobile" class="form-label fw-bold small">Mobile Number (10 Digits) *</label>
                  <div class="input-group">
                    <span class="input-group-text bg-light">+91</span>
                    <input type="tel" class="form-control" id="enqMobile" pattern="[6-9][0-9]{9}" maxlength="10" required placeholder="9876543210">
                  </div>
                  <div class="invalid-feedback">Please provide a valid 10-digit Indian mobile number.</div>
                </div>

                <div class="col-12">
                  <label for="enqEmail" class="form-label fw-bold small">Email Address *</label>
                  <input type="email" class="form-control" id="enqEmail" required placeholder="contact@company.com">
                  <div class="invalid-feedback">Please provide a valid email.</div>
                </div>

                <div class="col-12">
                  <label for="enqDescription" class="form-label fw-bold small">Project Description & Operating Payload Specs *</label>
                  <textarea class="form-control" id="enqDescription" rows="3" required placeholder="Target payload volume, floor wear plate requirements (e.g. Hardox 450), operating route conditions, hydraulic specs..."></textarea>
                  <div class="invalid-feedback">Please enter project description.</div>
                </div>

                <div class="col-12 pt-2">
                  <button type="submit" class="btn btn-outline-steel btn-lg w-100 py-3 fw-bold" style="background-color: #273646; color: #FFF;">
                    <i class="fas fa-paper-plane me-2"></i> Request Formal Engineering Quotation
                  </button>
                  <p class="text-muted small text-center mt-2 mb-0">
                    <i class="fas fa-clock text-warning me-1"></i> Technical estimation team will contact you within 4 business hours.
                  </p>
                </div>
              </div>
            </form>
          </div>
        ` : ''}

      </div>

      <!-- Right Column: Cart Summary Sidebar -->
      <div class="col-lg-4">
        <div class="cart-summary-box position-sticky" style="top: 100px;">
          <h4 class="h5 mb-3 fw-bold text-uppercase border-bottom pb-2">
            <i class="fas fa-receipt text-orange me-2"></i>Procurement Summary
          </h4>
          
          <div class="summary-row">
            <span class="text-muted">Total Cart Items:</span>
            <span class="fw-bold">${totalItemsCount} Unit${totalItemsCount > 1 ? 's' : ''}</span>
          </div>

          ${fixedItems.length > 0 ? `
            <div class="summary-row">
              <span class="text-muted">Priced Subtotal:</span>
              <span class="fw-bold text-dark">${formatCurrency(subtotal)}</span>
            </div>

            <div class="summary-row">
              <span class="text-muted">Commercial GST (18%):</span>
              <span class="fw-bold text-dark">${formatCurrency(gstAmount)}</span>
            </div>

            <div class="summary-row">
              <span class="text-muted">Heavy Freight Delivery:</span>
              <span class="fw-bold">
                ${shipping === 0 ? '<span class="badge bg-success">FREE DISPATCH</span>' : formatCurrency(shipping)}
              </span>
            </div>

            ${shipping > 0 ? `<p class="small text-muted mb-2">*Free insured freight shipping on hardware orders above ₹25,000.</p>` : ''}
          ` : `
            <div class="alert alert-light border py-2 px-3 small my-2">
              <i class="fas fa-info-circle text-orange me-1"></i> Cart contains custom fabrication products priced on project specifications.
            </div>
          `}

          ${quoteItems.length > 0 ? `
            <div class="alert alert-warning py-2 px-3 small my-2">
              <i class="fas fa-file-invoice me-1"></i> Includes ${quoteItems.length} custom body quotation item(s).
            </div>
          ` : ''}

          <div class="summary-row total-row">
            <span>Estimated Grand Total:</span>
            <span class="text-orange fw-bold" style="color: var(--industrial-orange); font-size: 1.35rem; letter-spacing: -0.2px;">
              ${fixedItems.length > 0 ? formatCurrency(grandTotal) : 'Price on Request'}
            </span>
          </div>

          <div class="alert alert-info mt-3 p-2 small">
            <i class="fas fa-shield-halved me-1"></i> B2B GST tax invoice & manufacturer warranty certificate included with every dispatch.
          </div>

          <div class="d-grid gap-2 mt-4">
            ${fixedItems.length > 0 ? `
              <button type="button" class="btn btn-industrial btn-lg w-100 btn-proceed-checkout" onclick="TruckCart.scrollToSection('checkout-form-card', 'custName')">
                <i class="fas fa-check-double me-2"></i> Proceed to Order Checkout
              </button>
            ` : ''}
            ${quoteItems.length > 0 ? `
              <button type="button" class="btn btn-outline-steel btn-lg w-100 btn-proceed-quote" onclick="TruckCart.scrollToSection('quote-form-card', 'enqVehicleModel')" style="background: #273646; color: #FFF; border-color: #273646;">
                <i class="fas fa-drafting-compass me-2"></i> Request Body Quotation
              </button>
            ` : ''}
            <a href="contact.html?source=cart" class="btn btn-outline-steel w-100">
              <i class="fas fa-headset me-2"></i> Speak with Chief Engineer
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // Handle Fixed-Price Order Checkout Submission
  // ==========================================================================
  function handleCheckout(event) {
    event.preventDefault();
    const form = event.target;
    const cart = getCart();
    const fixedItems = cart.filter(i => typeof i.price === 'number' && i.price > 0);

    if (fixedItems.length === 0) {
      alert('Your cart contains no fixed-price products for direct purchase.');
      return;
    }

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const name = document.getElementById('custName').value.trim();
    const company = document.getElementById('custCompany').value.trim();
    const email = document.getElementById('custEmail').value.trim();
    const mobile = document.getElementById('custMobile').value.trim();
    const gstin = document.getElementById('custGstin') ? document.getElementById('custGstin').value.trim() : '';
    const chassis = document.getElementById('custChassis') ? document.getElementById('custChassis').value.trim() : '';
    const address = document.getElementById('custAddress').value.trim();
    const city = document.getElementById('custCity').value.trim();
    const pincode = document.getElementById('custPincode').value.trim();
    const notes = document.getElementById('custNotes') ? document.getElementById('custNotes').value.trim() : '';

    // Mobile Validation (10 digits starting with 6-9)
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      document.getElementById('custMobile').focus();
      return;
    }

    // Pincode Validation (6 digits)
    if (!/^\d{6}$/.test(pincode)) {
      alert('Please enter a valid 6-digit postal pincode.');
      document.getElementById('custPincode').focus();
      return;
    }

    const orderId = 'TBB-ORD-2026-' + Math.floor(10000 + Math.random() * 90000);
    const orderDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    const subtotal = fixedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gstAmount = Math.round(subtotal * GST_RATE);
    const shipping = subtotal === 0 ? 0 : (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE);
    const grandTotal = subtotal + gstAmount + shipping;

    const modalHtml = `
      <div class="modal fade" id="orderSuccessModal" tabindex="-1" aria-labelledby="orderSuccessModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content border-0 shadow-lg">
            <div class="modal-header bg-dark text-white border-bottom border-warning">
              <div class="d-flex align-items-center gap-2">
                <i class="fas fa-check-circle text-warning fs-4"></i>
                <h5 class="modal-title fw-bold" id="orderSuccessModalLabel">Procurement Order Confirmed</h5>
              </div>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
              <div class="alert alert-success d-flex align-items-center gap-3">
                <i class="fas fa-receipt fs-2 text-success"></i>
                <div>
                  <strong>Order Reference: ${orderId}</strong>
                  <p class="mb-0 small">Date: ${orderDate} | Status: <span class="badge bg-success">Received &amp; Queued for Dispatch</span></p>
                </div>
              </div>

              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <div class="p-3 bg-light rounded border h-100">
                    <h6 class="fw-bold mb-2 text-uppercase small text-muted">Customer &amp; Enterprise Info</h6>
                    <p class="mb-1"><strong>Name:</strong> ${name}</p>
                    <p class="mb-1"><strong>Company:</strong> ${company}</p>
                    <p class="mb-1"><strong>Email:</strong> ${email}</p>
                    <p class="mb-1"><strong>Phone:</strong> +91 ${mobile}</p>
                    ${gstin ? `<p class="mb-0"><strong>GSTIN:</strong> ${gstin}</p>` : ''}
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="p-3 bg-light rounded border h-100">
                    <h6 class="fw-bold mb-2 text-uppercase small text-muted">Consignment Delivery Destination</h6>
                    <p class="mb-1"><strong>Address:</strong> ${address}</p>
                    <p class="mb-1"><strong>City/State:</strong> ${city} - ${pincode}</p>
                    ${chassis ? `<p class="mb-1"><strong>Chassis Fit:</strong> ${chassis}</p>` : ''}
                    ${notes ? `<p class="mb-0 small text-muted"><strong>Notes:</strong> ${notes}</p>` : ''}
                  </div>
                </div>
              </div>

              <h6 class="fw-bold text-uppercase small text-muted mb-2">Itemized Commercial Breakdown</h6>
              <div class="table-responsive mb-3 border rounded">
                <table class="table table-sm table-striped mb-0">
                  <thead class="table-dark">
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th class="text-end">Unit Price</th>
                      <th class="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${fixedItems.map(i => `
                      <tr>
                        <td>
                          <strong>${i.name}</strong><br>
                          <small class="text-muted">SKU: ${i.sku} | ${i.category}</small>
                        </td>
                        <td>${i.quantity}</td>
                        <td class="text-end font-monospace">${formatCurrency(i.price)}</td>
                        <td class="text-end font-monospace">${formatCurrency(i.price * i.quantity)}</td>
                      </tr>
                    `).join('')}
                    <tr class="fw-bold">
                      <td colspan="3" class="text-end">Subtotal:</td>
                      <td class="text-end font-monospace">${formatCurrency(subtotal)}</td>
                    </tr>
                    <tr>
                      <td colspan="3" class="text-end text-muted">18% Commercial GST:</td>
                      <td class="text-end font-monospace">${formatCurrency(gstAmount)}</td>
                    </tr>
                    <tr>
                      <td colspan="3" class="text-end text-muted">Heavy Freight Delivery:</td>
                      <td class="text-end">${shipping === 0 ? '<span class="badge bg-success">FREE DISPATCH</span>' : formatCurrency(shipping)}</td>
                    </tr>
                    <tr class="table-warning fw-bold fs-6">
                      <td colspan="3" class="text-end">Estimated Grand Total:</td>
                      <td class="text-end text-danger font-monospace">${formatCurrency(grandTotal)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="alert alert-secondary small mb-0">
                <i class="fas fa-info-circle me-1"></i>
                <strong>Notice:</strong> This is an integration-ready frontend procurement demo. In live operation, this order is dispatched to the ERP manufacturing queue and commercial tax invoice is generated automatically.
              </div>
            </div>
            <div class="modal-footer bg-light">
              <button type="button" class="btn btn-outline-secondary" onclick="window.print()"><i class="fas fa-print me-1"></i> Print Invoice Summary</button>
              <button type="button" class="btn btn-industrial" data-bs-dismiss="modal">Close &amp; Return to Shop</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('orderSuccessModal');
    if (existingModal) existingModal.remove();

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modalEl = document.getElementById('orderSuccessModal');
    const modalInstance = new bootstrap.Modal(modalEl);
    modalInstance.show();

    // Remove fixed items from cart (retain custom quote items if any, or clear all)
    const remainingQuoteItems = cart.filter(i => !i.price || i.priceType === 'quote');
    saveCart(remainingQuoteItems);
    renderCartPage();

    modalEl.addEventListener('hidden.bs.modal', () => {
      modalEl.remove();
      if (remainingQuoteItems.length === 0) {
        window.location.href = 'shop.html';
      }
    });
  }

  // ==========================================================================
  // Handle Custom Quote Enquiry Submission (From Cart Page)
  // ==========================================================================
  function handleQuoteEnquiry(event) {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const bodyType = document.getElementById('enqBodyType').value.trim();
    const vehicleModel = document.getElementById('enqVehicleModel').value.trim();
    const quantity = document.getElementById('enqQuantity').value.trim();
    const contactName = document.getElementById('enqContactName').value.trim();
    const company = document.getElementById('enqCompany') ? document.getElementById('enqCompany').value.trim() : '';
    const mobile = document.getElementById('enqMobile').value.trim();
    const email = document.getElementById('enqEmail').value.trim();
    const description = document.getElementById('enqDescription').value.trim();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert('Please provide a valid 10-digit Indian mobile number.');
      document.getElementById('enqMobile').focus();
      return;
    }

    const quoteId = 'TBB-QT-2026-' + Math.floor(1000 + Math.random() * 9000);
    const quoteDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    const quoteModalHtml = `
      <div class="modal fade" id="quoteSuccessModal" tabindex="-1" aria-labelledby="quoteSuccessModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content border-0 shadow-lg">
            <div class="modal-header bg-dark text-white border-bottom border-warning">
              <div class="d-flex align-items-center gap-2">
                <i class="fas fa-drafting-compass text-warning fs-4"></i>
                <h5 class="modal-title fw-bold" id="quoteSuccessModalLabel">Custom Body Quotation Enquiry Received</h5>
              </div>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
              <div class="alert alert-success d-flex align-items-center gap-3">
                <i class="fas fa-clipboard-check fs-2 text-success"></i>
                <div>
                  <strong>Quotation Reference: ${quoteId}</strong>
                  <p class="mb-0 small">Date: ${quoteDate} | Status: <span class="badge bg-success">Assigned to Commercial Engineering Desk</span></p>
                </div>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <div class="p-3 bg-light rounded border h-100">
                    <h6 class="fw-bold mb-2 text-uppercase small text-muted">Customer &amp; Fleet Information</h6>
                    <p class="mb-1"><strong>Contact Person:</strong> ${contactName}</p>
                    ${company ? `<p class="mb-1"><strong>Company:</strong> ${company}</p>` : ''}
                    <p class="mb-1"><strong>Phone:</strong> +91 ${mobile}</p>
                    <p class="mb-0"><strong>Email:</strong> ${email}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="p-3 bg-light rounded border h-100">
                    <h6 class="fw-bold mb-2 text-uppercase small text-muted">Vehicle &amp; Fabrication Scope</h6>
                    <p class="mb-1"><strong>Body Type:</strong> ${bodyType}</p>
                    <p class="mb-1"><strong>Chassis Model:</strong> ${vehicleModel}</p>
                    <p class="mb-0"><strong>Required Fleet Qty:</strong> ${quantity} Unit(s)</p>
                  </div>
                </div>
              </div>

              <div class="p-3 bg-light rounded border mb-3">
                <h6 class="fw-bold mb-1 text-uppercase small text-muted">Payload &amp; Structural Notes</h6>
                <p class="mb-0 small">${description}</p>
              </div>

              <div class="alert alert-secondary small mb-0">
                <i class="fas fa-info-circle me-1"></i>
                <strong>Notice:</strong> This frontend demo recorded your quotation request. In live deployment, an engineering proposal with 3D CAD drawings and ARAI compliance timeline is dispatched to your email within 4 business hours.
              </div>
            </div>
            <div class="modal-footer bg-light">
              <button type="button" class="btn btn-outline-secondary" onclick="window.print()"><i class="fas fa-print me-1"></i> Print Enquiry</button>
              <button type="button" class="btn btn-industrial" data-bs-dismiss="modal">Close &amp; Return</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const existingQuoteModal = document.getElementById('quoteSuccessModal');
    if (existingQuoteModal) existingQuoteModal.remove();

    document.body.insertAdjacentHTML('beforeend', quoteModalHtml);
    const quoteModalEl = document.getElementById('quoteSuccessModal');
    const quoteModalInstance = new bootstrap.Modal(quoteModalEl);
    quoteModalInstance.show();

    // Clear quotation items from cart
    const cart = getCart();
    const remainingFixed = cart.filter(i => typeof i.price === 'number' && i.price > 0);
    saveCart(remainingFixed);
    renderCartPage();

    quoteModalEl.addEventListener('hidden.bs.modal', () => {
      quoteModalEl.remove();
      if (remainingFixed.length === 0) {
        window.location.href = 'shop.html';
      }
    });
  }

  // ==========================================================================
  // Handle Custom Quote Submission from Shop Modal
  // ==========================================================================
  // ==========================================================================
  // Request Custom Truck Body Quotation: Strict Real-Time Form Validation
  // ==========================================================================
  function initCustomQuoteFormValidation() {
    const form = document.getElementById('customQuoteModalForm');
    const modalEl = document.getElementById('customQuoteModal');
    if (!form) return;

    const fields = {
      bodyType: {
        el: document.getElementById('quoteBodyType'),
        errEl: document.getElementById('quoteBodyTypeError'),
        touched: false,
        validate: function() {
          const val = (this.el ? this.el.value : '').trim();
          if (!val || val === 'Select Truck Body Type') {
            return 'Please select a valid truck body type.';
          }
          return '';
        }
      },
      vehicleModel: {
        el: document.getElementById('quoteVehicleModel'),
        errEl: document.getElementById('quoteVehicleModelError'),
        touched: false,
        validate: function() {
          const val = (this.el ? this.el.value : '').trim();
          if (!val) return 'Please enter a valid chassis make and model.';
          if (val.length < 2 || val.length > 100) return 'Please enter a valid chassis make and model.';
          if (!/[a-zA-Z0-9]/.test(val)) return 'Please enter a valid chassis make and model.';
          if (!/^[a-zA-Z0-9\s\-\/\.,\(\)]+$/.test(val)) return 'Please enter a valid chassis make and model.';
          return '';
        }
      },
      quantity: {
        el: document.getElementById('quoteQuantity'),
        errEl: document.getElementById('quoteQuantityError'),
        touched: false,
        validate: function() {
          const raw = (this.el ? this.el.value : '').trim();
          if (!raw || !/^\d+$/.test(raw)) return 'Please enter a valid vehicle quantity (minimum 1).';
          const n = parseInt(raw, 10);
          if (isNaN(n) || n < 1 || n > 10000) return 'Please enter a valid vehicle quantity (minimum 1).';
          return '';
        }
      },
      contactName: {
        el: document.getElementById('quoteContactName'),
        errEl: document.getElementById('quoteContactNameError'),
        touched: false,
        validate: function() {
          const val = (this.el ? this.el.value : '').trim();
          if (!val) {
            return 'Please enter authorized contact person name.';
          }
          if (/^\d+$/.test(val)) {
            return 'Contact name cannot be numbers only. If you are entering your phone, please use the Mobile field below.';
          }
          if (/\d/.test(val)) {
            return 'Contact name cannot contain numbers. Please enter letters only (e.g. Rajesh Kumar).';
          }
          if (val.length < 2) {
            return 'Contact name must be at least 2 characters.';
          }
          if (val.length > 60) {
            return 'Contact name cannot exceed 60 characters.';
          }
          if (!/^[a-zA-Z\s'\-\.]+$/.test(val)) {
            return 'Contact name can only contain letters, spaces, dots, and hyphens.';
          }
          if (!/[a-zA-Z]/.test(val)) {
            return 'Please enter a valid contact name with letters.';
          }
          return '';
        }
      },
      contactMobile: {
        el: document.getElementById('quoteContactMobile'),
        groupEl: document.getElementById('quoteMobileGroup'),
        errEl: document.getElementById('quoteContactMobileError'),
        touched: false,
        validate: function() {
          const val = (this.el ? this.el.value : '').trim();
          if (!val) return 'Please enter your 10-digit mobile number.';
          if (val.length !== 10) return `Mobile number must be exactly 10 digits (${val.length}/10 entered).`;
          if (!/^[6-9]/.test(val)) return 'Mobile number must start with 6, 7, 8, or 9.';
          if (!/^[6-9]\d{9}$/.test(val)) return 'Please enter a valid 10-digit Indian mobile number.';
          return '';
        }
      },
      contactEmail: {
        el: document.getElementById('quoteContactEmail'),
        errEl: document.getElementById('quoteContactEmailError'),
        touched: false,
        validate: function() {
          const val = (this.el ? this.el.value : '').trim().toLowerCase();
          if (!val) return 'Please enter a valid email address.';
          const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailPattern.test(val)) return 'Please enter a valid email address.';
          return '';
        }
      },
      details: {
        el: document.getElementById('quoteDetails'),
        errEl: document.getElementById('quoteDetailsError'),
        counterEl: document.getElementById('quoteDetailsCharCount'),
        touched: false,
        validate: function() {
          const val = (this.el ? this.el.value : '');
          if (val.length > 1000) return 'Payload specifications cannot exceed 1000 characters.';
          return '';
        }
      }
    };

    function applyFieldStatus(fieldKey) {
      const field = fields[fieldKey];
      if (!field || !field.el) return true;

      const errMsg = field.validate();
      const isValid = (errMsg === '');

      if (!field.touched) {
        // Do not show errors before user interaction
        return isValid;
      }

      if (isValid) {
        field.el.classList.remove('field-invalid');
        field.el.classList.add('field-valid');
        if (field.groupEl) {
          field.groupEl.classList.remove('group-invalid');
          field.groupEl.classList.add('group-valid');
        }
        if (field.errEl) {
          field.errEl.style.display = 'none';
          field.errEl.innerHTML = '';
        }
      } else {
        field.el.classList.remove('field-valid');
        field.el.classList.add('field-invalid');
        if (field.groupEl) {
          field.groupEl.classList.remove('group-valid');
          field.groupEl.classList.add('group-invalid');
        }
        if (field.errEl) {
          field.errEl.style.display = 'flex';
          field.errEl.innerHTML = `<i class="fas fa-exclamation-circle me-1"></i> ${errMsg}`;
        }
      }

      return isValid;
    }

    // Attach real-time input & blur events
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (!field.el) return;

      // Real-time sanitization and counter
      if (key === 'contactMobile') {
        field.el.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
          if (field.touched) applyFieldStatus(key);
        });
      } else if (key === 'quantity') {
        field.el.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 5);
          if (field.touched) applyFieldStatus(key);
        });
      } else if (key === 'details') {
        field.el.addEventListener('input', (e) => {
          const len = e.target.value.length;
          if (field.counterEl) {
            field.counterEl.textContent = `${len} / 1000 characters`;
            field.counterEl.classList.toggle('near-limit', len >= 950);
          }
          if (field.touched) applyFieldStatus(key);
        });
      } else if (key === 'contactName') {
        field.el.addEventListener('input', (e) => {
          // If digits or numbers are typed in contact name, immediately show helpful message
          if (/\d/.test(e.target.value)) {
            field.touched = true;
          }
          if (field.touched) applyFieldStatus(key);
        });
      } else {
        field.el.addEventListener('input', () => {
          if (field.touched) applyFieldStatus(key);
        });
      }

      field.el.addEventListener('blur', () => {
        field.touched = true;
        applyFieldStatus(key);
      });

      if (field.el.tagName === 'SELECT') {
        field.el.addEventListener('change', () => {
          field.touched = true;
          applyFieldStatus(key);
        });
      }
    });

    // Form submit listener
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopPropagation();

      let isAllValid = true;
      let firstInvalidEl = null;

      Object.keys(fields).forEach(key => {
        const field = fields[key];
        field.touched = true;
        const valid = applyFieldStatus(key);
        if (!valid) {
          isAllValid = false;
          if (!firstInvalidEl && field.el) {
            firstInvalidEl = field.el;
          }
        }
      });

      if (!isAllValid) {
        if (firstInvalidEl) {
          firstInvalidEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalidEl.focus();
        }
        return false;
      }

      // Collect validated data
      const bodyType = fields.bodyType.el.value.trim();
      const vehicleModel = fields.vehicleModel.el.value.trim();
      const quantity = parseInt(fields.quantity.el.value.trim(), 10) || 1;
      const contactName = fields.contactName.el.value.trim();
      const contactMobile = fields.contactMobile.el.value.trim();
      const contactEmail = fields.contactEmail.el.value.trim().toLowerCase();
      const details = fields.details.el ? fields.details.el.value.trim() : '';

      const quoteId = 'TBB-QT-2026-' + Math.floor(1000 + Math.random() * 9000);

      // Persist quote request to browser storage
      try {
        const stored = JSON.parse(localStorage.getItem('tbb_quote_requests') || '[]');
        stored.unshift({
          quoteId: quoteId,
          bodyType: bodyType,
          chassis: vehicleModel,
          quantity: quantity,
          contactName: contactName,
          mobile: '+91 ' + contactMobile,
          email: contactEmail,
          details: details,
          date: new Date().toLocaleString()
        });
        localStorage.setItem('tbb_quote_requests', JSON.stringify(stored.slice(0, 50)));
      } catch (err) {
        console.warn('Storage warning:', err);
      }

      // Render Confirmation View inside Modal
      const container = document.getElementById('quoteModalBodyContainer');
      const originalFormHtml = form.outerHTML;

      if (container) {
        container.innerHTML = `
          <div class="p-4 p-md-5 text-center">
            <div class="mb-3">
              <span class="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle shadow-sm" style="width: 64px; height: 64px; font-size: 2rem;">
                <i class="fas fa-check"></i>
              </span>
            </div>
            <h4 class="h5 fw-bold mb-1 text-dark">Quotation Request Validated & Logged</h4>
            <p class="text-muted small mb-3">Your fabrication enquiry details have passed all validation checks.</p>

            <div class="badge bg-light text-dark border font-monospace px-3 py-2 mb-3 fs-6">
              Quotation Reference: #${quoteId}
            </div>

            <!-- Frontend Demo Disclaimer Notice -->
            <div class="alert alert-warning border text-start small mb-3" style="font-size: 0.82rem; line-height: 1.45;">
              <i class="fas fa-info-circle text-warning me-1"></i>
              <strong>Prototype Demonstration Notice:</strong> This website operates in frontend presentation mode without an active backend database. Your quotation enquiry has been validated according to commercial truck body specifications and saved to your browser session storage (ready for production API integration).
            </div>

            <!-- Summary Card -->
            <div class="card bg-light border text-start p-3 mb-4 small">
              <div class="row g-2">
                <div class="col-sm-6"><span class="text-muted">Body Type:</span> <strong class="d-block text-dark">${escapeHtml(bodyType)}</strong></div>
                <div class="col-sm-6"><span class="text-muted">Target Chassis:</span> <strong class="d-block text-dark">${escapeHtml(vehicleModel)}</strong></div>
                <div class="col-sm-6"><span class="text-muted">Fleet Quantity:</span> <strong class="d-block text-dark">${quantity} Unit(s)</strong></div>
                <div class="col-sm-6"><span class="text-muted">Authorized Contact:</span> <strong class="d-block text-dark">${escapeHtml(contactName)}</strong></div>
                <div class="col-sm-6"><span class="text-muted">Phone Number:</span> <strong class="d-block text-dark">+91 ${contactMobile}</strong></div>
                <div class="col-sm-6"><span class="text-muted">Email Address:</span> <strong class="d-block text-dark">${escapeHtml(contactEmail)}</strong></div>
                ${details ? `<div class="col-12 mt-2 pt-2 border-top"><span class="text-muted">Specifications:</span> <p class="mb-0 text-dark small">${escapeHtml(details)}</p></div>` : ''}
              </div>
            </div>

            <div class="d-flex justify-content-center gap-2 flex-wrap">
              <button type="button" class="btn btn-sm btn-outline-steel px-3" onclick="window.print()">
                <i class="fas fa-print me-1"></i> Print Summary
              </button>
              <button type="button" class="btn btn-sm btn-industrial px-4" data-bs-dismiss="modal">
                <i class="fas fa-check me-1"></i> Done &amp; Close
              </button>
            </div>
          </div>
        `;
      }

      // Restore form when modal is hidden
      if (modalEl) {
        modalEl.addEventListener('hidden.bs.modal', function onModalHidden() {
          if (container) {
            container.innerHTML = originalFormHtml;
            initCustomQuoteFormValidation();
          }
          modalEl.removeEventListener('hidden.bs.modal', onModalHidden);
        }, { once: true });
      }

      showToast(
        'Quote Request Validated',
        `Reference #${quoteId} captured for ${quantity}x "${bodyType}". Ready for production engineering review.`,
        'fas fa-check-circle',
        false
      );
    });
  }

  function handleQuoteRequest(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // ==========================================================================
  // Public API
  // ==========================================================================
    // Smooth scroll with header offset and focus for checkout / quotation forms
  function scrollToSection(targetId, focusInputId) {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) {
      console.warn('Target section not found:', targetId);
      return;
    }

    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 80;
    const targetRect = targetEl.getBoundingClientRect();
    const targetTop = targetRect.top + window.pageYOffset - (headerHeight + 20);

    // Primary smooth window scroll
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth'
    });

    // Secondary fallback for cross-browser mobile support
    try {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Offset fixed header if scrollIntoView places top of element behind header
      setTimeout(() => {
        window.scrollBy({ top: -(headerHeight + 20), behavior: 'smooth' });
      }, 80);
    } catch (e) {
      // scrollIntoView unsupported or fallback
    }

    targetEl.classList.remove('checkout-card-pulse');
    void targetEl.offsetWidth; // retrigger animation
    targetEl.classList.add('checkout-card-pulse');

    setTimeout(() => {
      const inp = focusInputId ? document.getElementById(focusInputId) : targetEl.querySelector('input:not([type="hidden"]):not([disabled]), select');
      if (inp) {
        inp.focus({ preventScroll: true });
        if (typeof inp.select === 'function' && inp.value) {
          inp.select();
        }
      }
    }, 480);
  }

  window.TruckCart = {
    add: addToCart,
    updateQty: updateQuantity,
    remove: removeFromCart,
    clear: clearCart,
    getCart: getCart,
    render: renderCartPage,
    scrollToSection: scrollToSection,
    handleCheckout: handleCheckout,
    handleQuoteEnquiry: handleQuoteEnquiry,
    handleQuoteRequest: handleQuoteRequest,
    formatCurrency: formatCurrency,
    catalog: CATALOG
  };

  // Synchronize cart across browser tabs via storage event
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      updateCartBadge();
      if (document.getElementById('cart-page-content')) {
        renderCartPage();
      }
    }
  });

  // ==========================================================================
  // DOM Event Listeners & Delegation
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();

    if (document.getElementById('cart-page-content')) {
      renderCartPage();
    }

    // Initialize custom quotation modal form validation on page load
    initCustomQuoteFormValidation();

    // Attach click events to elements with data-add-to-cart
    document.body.addEventListener('click', (e) => {
      // 1. Add to Cart / Add to Quote List Button
      const btn = e.target.closest('[data-add-to-cart]');
      if (btn) {
        e.preventDefault();
        const itemId = btn.getAttribute('data-add-to-cart');
        const product = CATALOG.find(p => p.id === itemId);

        // Find associated quantity input if present in the same card
        const card = btn.closest('.product-card, .shop-item-card, .product-item');
        let qty = 1;
        if (card) {
          const qtyInput = card.querySelector('.product-qty-input');
          if (qtyInput) {
            qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
          }
        }

        if (product) {
          addToCart(product, qty);
        } else {
          // Dynamic product object from data attributes
          const customItem = {
            id: itemId,
            name: btn.getAttribute('data-name') || 'Truck Component',
            price: btn.getAttribute('data-price') ? Number(btn.getAttribute('data-price')) : null,
            sku: btn.getAttribute('data-sku') || 'TBB-CUSTOM',
            image: btn.getAttribute('data-image') || 'assets/images/products/container-body.jpg',
            category: btn.getAttribute('data-category') || 'Truck Accessories',
            priceType: btn.getAttribute('data-price-type') || 'fixed'
          };
          addToCart(customItem, qty);
        }
      }

      // 2. Quantity controls on product cards (- and + buttons)
      const qtyBtn = e.target.closest('.card-qty-btn');
      if (qtyBtn) {
        e.preventDefault();
        const card = qtyBtn.closest('.product-card, .shop-item-card, .product-item');
        if (card) {
          const qtyInput = card.querySelector('.product-qty-input');
          if (qtyInput) {
            let current = parseInt(qtyInput.value, 10) || 1;
            if (qtyBtn.classList.contains('qty-minus')) {
              current = Math.max(1, current - 1);
            } else if (qtyBtn.classList.contains('qty-plus')) {
              current = current + 1;
            }
            qtyInput.value = current;
          }
        }
      }

      // 3. Quick Request Quote Trigger
      const quoteBtn = e.target.closest('[data-request-quote]');
      if (quoteBtn) {
        e.preventDefault();
        const bodyType = quoteBtn.getAttribute('data-request-quote') || '';
        const modalEl = document.getElementById('customQuoteModal');
        if (modalEl) {
          const select = modalEl.querySelector('#quoteBodyType');
          if (select && bodyType) {
            // Check if options match bodyType
            let found = false;
            for (let i = 0; i < select.options.length; i++) {
              if (select.options[i].text.includes(bodyType) || bodyType.includes(select.options[i].value)) {
                select.selectedIndex = i;
                found = true;
                break;
              }
            }
            if (!found) {
              select.value = 'Custom Special Vehicle';
            }
          }
          const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
          bsModal.show();
        } else {
          window.location.href = `contact.html?product=${encodeURIComponent(bodyType)}`;
        }
      }
    });
  });
})();
