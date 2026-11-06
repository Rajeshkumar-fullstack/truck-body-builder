const fs = require('fs');

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Slide 1
indexHtml = indexHtml.replace(
  /<p class="hero-subtitle animate-item">[\s\S]*?Transforming raw chassis into[\s\S]*?<\/p>/,
  `<p class="hero-subtitle animate-item text-white">
                  Transforming raw chassis into <strong class="text-white">ultra-high-yield commercial assets</strong>. Designed with <span class="tech-highlight">Hardox 450</span> abrasion-resistant steel, aerodynamic contouring, and automated robotic manufacturing for demanding mining, logistics, and bulk transport.
                </p>`
);

// Slide 2
indexHtml = indexHtml.replace(
  /<p class="hero-subtitle animate-item">[\s\S]*?Advanced fabrication and custom-built truck body solutions[\s\S]*?<\/p>/,
  `<p class="hero-subtitle animate-item text-white">
                  Advanced fabrication and custom-built truck body solutions. Engineered with high-precision <span class="tech-highlight">CNC laser profiling</span>, <strong class="text-white">800-ton hydraulic press forming</strong>, and automated submerged arc welding.
                </p>`
);

// Slide 3
indexHtml = indexHtml.replace(
  /<p class="hero-subtitle animate-item">[\s\S]*?Durable container, tipper and customized truck body solutions[\s\S]*?<\/p>/,
  `<p class="hero-subtitle animate-item text-white">
                  Durable container, tipper and customized truck body solutions. Engineered with genuine <span class="tech-highlight">Hardox 450</span> wear plates and <strong class="text-white">ultra-rigid corrugated logistics sidewalls</strong>.
                </p>`
);

// Slide 4
indexHtml = indexHtml.replace(
  /<p class="hero-subtitle animate-item">[\s\S]*?Professional truck body design, modification and manufacturing[\s\S]*?<\/p>/,
  `<p class="hero-subtitle animate-item text-white">
                  Professional commercial vehicle body design, modification and heavy manufacturing. From <span class="tech-highlight">3D CAD &amp; FEA stress simulations</span> to <strong class="text-white">ARAI-certified multi-axle chassis integration</strong>.
                </p>`
);

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('SUCCESS: Updated index.html hero subtitles');

// 2. Update home-2.html
let home2Html = fs.readFileSync('home-2.html', 'utf8');
home2Html = home2Html.replace(
  /<p class="hero-subtitle animate-item">[\s\S]*?Transforming raw chassis into[\s\S]*?<\/p>/,
  `<p class="hero-subtitle animate-item text-white">
              Transforming raw chassis into <strong class="text-white">ultra-high-yield commercial assets</strong>. Designed with <span class="tech-highlight">Hardox 450</span> abrasion-resistant steel, aerodynamic contouring, and automated robotic manufacturing for demanding mining, logistics, and bulk transport.
            </p>`
);
fs.writeFileSync('home-2.html', home2Html, 'utf8');
console.log('SUCCESS: Updated home-2.html hero subtitles');
