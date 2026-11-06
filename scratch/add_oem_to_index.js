const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const targetStr = '    <!-- TRUCK BODY TYPES SHOWCASE -->';

const oemSection = `    <!-- OEM CHASSIS COMPATIBILITY -->
    <section class="py-4 border-top border-bottom bg-white">
      <div class="container py-2">
        <div class="row align-items-center g-4">
          <div class="col-lg-4 text-center text-lg-start">
            <span class="text-uppercase fw-bold small text-orange" style="color: var(--industrial-orange); letter-spacing: 1.5px;">Chassis Engineering</span>
            <h3 class="h4 fw-bold mb-1" style="color: var(--deep-steel);">Built for Leading Commercial OEM Brands</h3>
            <p class="small text-muted mb-0">Engineered to factory BBG guidelines and ARAI norms without voiding chassis manufacturer warranty.</p>
          </div>
          <div class="col-lg-8">
            <div class="row g-3 text-center">
              <div class="col-6 col-sm-4">
                <div class="oem-brand-card shadow-sm h-100">
                  <div class="oem-brand-logo-wrap">
                    <img src="assets/images/brands/tata-motors.svg" alt="Tata Motors Commercial Vehicles" class="oem-brand-logo" loading="lazy">
                  </div>
                  <h6 class="oem-brand-name">Tata Motors</h6>
                  <small class="oem-brand-desc">Signa, Prima &amp; Ultra Series (4×2 to 10×4)</small>
                </div>
              </div>
              <div class="col-6 col-sm-4">
                <div class="oem-brand-card shadow-sm h-100">
                  <div class="oem-brand-logo-wrap">
                    <img src="assets/images/brands/ashok-leyland.svg" alt="Ashok Leyland Commercial Vehicles" class="oem-brand-logo" loading="lazy">
                  </div>
                  <h6 class="oem-brand-name">Ashok Leyland</h6>
                  <small class="oem-brand-desc">AVTR Modular Platform (19T to 55T Tractor)</small>
                </div>
              </div>
              <div class="col-6 col-sm-4">
                <div class="oem-brand-card shadow-sm h-100">
                  <div class="oem-brand-logo-wrap">
                    <img src="assets/images/brands/bharatbenz.svg" alt="BharatBenz Commercial Vehicles" class="oem-brand-logo" loading="lazy">
                  </div>
                  <h6 class="oem-brand-name">BharatBenz</h6>
                  <small class="oem-brand-desc">Heavy Construction &amp; Long Haul (1623 to 3528)</small>
                </div>
              </div>
              <div class="col-6 col-sm-4">
                <div class="oem-brand-card shadow-sm h-100">
                  <div class="oem-brand-logo-wrap">
                    <img src="assets/images/brands/eicher.svg" alt="Eicher Trucks &amp; Buses" class="oem-brand-logo" loading="lazy">
                  </div>
                  <h6 class="oem-brand-name">Eicher Trucks</h6>
                  <small class="oem-brand-desc">Pro 3000, 6000 &amp; 8000 Series Rigid &amp; Tippers</small>
                </div>
              </div>
              <div class="col-6 col-sm-4">
                <div class="oem-brand-card shadow-sm h-100">
                  <div class="oem-brand-logo-wrap">
                    <img src="assets/images/brands/volvo-scania.svg" alt="Volvo &amp; Scania Commercial Vehicles" class="oem-brand-logo" loading="lazy">
                  </div>
                  <h6 class="oem-brand-name">Volvo &amp; Scania</h6>
                  <small class="oem-brand-desc">Heavy Mining FMX &amp; Heavy Haulage Tractors</small>
                </div>
              </div>
              <div class="col-6 col-sm-4">
                <div class="oem-brand-card shadow-sm h-100">
                  <div class="oem-brand-logo-wrap">
                    <img src="assets/images/brands/mahindra-isuzu.svg" alt="Mahindra &amp; Isuzu Commercial Vehicles" class="oem-brand-logo" loading="lazy">
                  </div>
                  <h6 class="oem-brand-name">Mahindra &amp; Isuzu</h6>
                  <small class="oem-brand-desc">Blazo X &amp; D-Max Heavy Duty Commercial Lines</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

`;

if (!html.includes('Built for Leading Commercial OEM Brands')) {
  html = html.replace(targetStr, oemSection + targetStr);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('SUCCESS: Added OEM section to index.html');
} else {
  console.log('Already present in index.html');
}
