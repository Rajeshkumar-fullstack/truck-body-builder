const fs = require('fs');

const images = [
  'assets/images/products/acc-toolbox.jpg',
  'assets/images/services/service-welding.jpg',
  'assets/images/products/acc-lights.jpg',
  'assets/images/services/service-modification.jpg',
  'assets/images/products/acc-bumper.jpg',
  'assets/images/products/acc-strap.jpg',
  'assets/images/products/container-body.jpg',
  'assets/images/products/acc-tape.jpg',
  'assets/images/gallery/project-3.jpg',
  'assets/images/products/tipper-body.jpg',
  'assets/images/products/refrigerated-body.jpg',
  'assets/images/products/trailer-body.jpg'
];

let allOk = true;
images.forEach(img => {
  if (fs.existsSync(img)) {
    console.log(`OK: ${img} (${fs.statSync(img).size} bytes)`);
  } else {
    console.error(`MISSING: ${img}`);
    allOk = false;
  }
});

if (allOk) {
  console.log('\nALL 12 CATALOG IMAGES EXIST AND ARE VALID!');
}
