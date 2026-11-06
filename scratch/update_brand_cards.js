const fs = require('fs');

let html = fs.readFileSync('home-2.html', 'utf8');

const regex = /<div class="col-lg-8">[\s\S]*?<div class="row g-3 text-center">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newContent = `<div class="col-lg-8">
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
        </div>`;

if (regex.test(html)) {
  html = html.replace(regex, newContent);
  fs.writeFileSync('home-2.html', html, 'utf8');
  console.log('SUCCESS: Replaced OEM Brand Cards in home-2.html');
} else {
  console.log('Regex did not match.');
}
