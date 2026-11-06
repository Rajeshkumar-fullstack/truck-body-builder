const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const oldRk = /<div class="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold" style="width: 48px; height: 48px;">\s*RK\s*<\/div>/;
const oldMs = /<div class="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold" style="width: 48px; height: 48px;">\s*MS\s*<\/div>/;
const oldVs = /<div class="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold" style="width: 48px; height: 48px;">\s*VS\s*<\/div>/;

console.log('Match RK:', oldRk.test(html));
console.log('Match MS:', oldMs.test(html));
console.log('Match VS:', oldVs.test(html));

html = html.replace(oldRk, `<img src="assets/images/testimonials/client-1.jpg" alt="Rajendra Kumar - Fleet Director" class="rounded-circle flex-shrink-0" style="width: 50px; height: 50px; object-fit: cover; border: 2px solid var(--industrial-orange); box-shadow: 0 3px 10px rgba(0,0,0,0.18);" loading="lazy">`);
html = html.replace(oldMs, `<img src="assets/images/testimonials/client-2.jpg" alt="Manjit Singh - VP Operations" class="rounded-circle flex-shrink-0" style="width: 50px; height: 50px; object-fit: cover; border: 2px solid var(--industrial-orange); box-shadow: 0 3px 10px rgba(0,0,0,0.18);" loading="lazy">`);
html = html.replace(oldVs, `<img src="assets/images/testimonials/client-3.jpg" alt="Vikas Sharma - General Manager" class="rounded-circle flex-shrink-0" style="width: 50px; height: 50px; object-fit: cover; border: 2px solid var(--industrial-orange); box-shadow: 0 3px 10px rgba(0,0,0,0.18);" loading="lazy">`);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html testimonials successfully!');
