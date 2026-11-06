const fs = require('fs');

// 1. UPDATE index.html
const indexFile = 'c:/Users/rajeshkumar.s/Desktop/Truck Body Builder/index.html';
let indexHtml = fs.readFileSync(indexFile, 'utf8');

const targetProcessSectionRegex = /<!-- MANUF[^\n\r]*PROCESS -->[\s\S]*?<\/section>/;

const newProcessSection = `<!-- MANUFACTURING PROCESS -->
    <section class="py-5 process-section" id="manufacturing-process">
      <div class="container py-lg-4">
        <div class="section-header text-center mx-auto" style="max-width: 700px;">
          <div class="section-subtitle">Streamlined Workflow</div>
          <h2 class="section-title process-section-title">Our 4-Stage Manufacturing Process</h2>
          <p class="section-desc process-section-desc mx-auto">
            From initial payload analysis to final RTO/ARAI certification, we adhere to strict ISO quality control protocols.
          </p>
        </div>

        <div class="row g-4 mt-2">
          <div class="col-md-6 col-lg-3">
            <div class="process-step-card">
              <div class="step-number">01</div>
              <h5 class="process-step-title">Design & Engineering</h5>
              <p class="process-step-desc">3D CAD design, weight distribution, axle load calculations, and OEM chassis compliance verification.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="process-step-card">
              <div class="step-number">02</div>
              <h5 class="process-step-title">Precision Fabrication</h5>
              <p class="process-step-desc">CNC plasma cutting, press brake bending, subframe alignment, and certified MIG/SAW structural welding.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="process-step-card">
              <div class="step-number">03</div>
              <h5 class="process-step-title">Surface & Coating</h5>
              <p class="process-step-desc">Automated shot blasting to SA 2.5 standard, zinc phosphate priming, and bake-cured polyurethane finish.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="process-step-card">
              <div class="step-number">04</div>
              <h5 class="process-step-title">Testing & Dispatch</h5>
              <p class="process-step-desc">Static water leak tests, ultrasonic weld inspection, electrical harness check, and ARAI roadworthiness sign-off.</p>
            </div>
          </div>
        </div>
      </div>
    </section>`;

if (targetProcessSectionRegex.test(indexHtml)) {
  indexHtml = indexHtml.replace(targetProcessSectionRegex, newProcessSection);
  fs.writeFileSync(indexFile, indexHtml, 'utf8');
  console.log('Successfully updated index.html process section');
} else {
  console.error('Target regex not found in index.html');
}
