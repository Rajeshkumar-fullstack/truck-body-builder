const fs = require('fs');

// 1. Update style.css
const stylePath = 'c:/Users/rajeshkumar.s/Desktop/Truck Body Builder/assets/css/style.css';
let styleCss = fs.readFileSync(stylePath, 'utf8');

const targetStyleRegex = /\/\* =+\r?\n\s*Manufacturing Process Steps\r?\n\s*=+ \*\/[\s\S]*?(?=\/\* =+\r?\n\s*Gallery)/;

const newStyleSection = `/* ==========================================================================
   Manufacturing Process Steps
   ========================================================================== */

.process-section {
  background-color: #F8FAFC;
  transition: background-color 0.3s ease;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.process-section-title {
  color: var(--deep-steel, #17232F) !important;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.process-section-desc {
  color: #475569 !important;
  font-size: 1.05rem;
  line-height: 1.6;
}

.process-step-card {
  position: relative;
  padding: 34px 22px;
  text-align: center;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  height: 100%;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, background-color 0.3s ease;
}

.process-step-card:hover {
  transform: translateY(-6px);
  border-color: var(--industrial-orange, #F07824) !important;
  box-shadow: 0 14px 30px rgba(240, 120, 36, 0.16) !important;
}

.step-number {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #F07824 0%, #D45B0E 100%) !important;
  color: #FFFFFF !important;
  font-family: var(--font-heading);
  font-size: 1.3rem;
  font-weight: 800;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  border: 3px solid rgba(255, 255, 255, 0.9) !important;
  box-shadow: 0 4px 16px rgba(240, 120, 36, 0.35);
}

.process-step-title,
.process-step-card h5 {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--deep-steel, #17232F) !important;
  margin-top: 10px;
  margin-bottom: 12px;
}

.process-step-desc,
.process-step-card p {
  font-size: 0.92rem;
  line-height: 1.6;
  color: #475569 !important;
  margin-bottom: 0;
}

`;

if (targetStyleRegex.test(styleCss)) {
  styleCss = styleCss.replace(targetStyleRegex, newStyleSection);
  fs.writeFileSync(stylePath, styleCss, 'utf8');
  console.log('Successfully updated assets/css/style.css');
} else {
  console.error('Target regex not found in style.css');
}

// 2. Update dark-mode.css
const darkPath = 'c:/Users/rajeshkumar.s/Desktop/Truck Body Builder/assets/css/dark-mode.css';
let darkCss = fs.readFileSync(darkPath, 'utf8');

const targetDarkRegex = /\/\* 2\. Process Section & 4-Stage Manufacturing Step Cards \*\/[\s\S]*?(?=\/\* 3\. Safety override)/;

const newDarkSection = `/* 2. Process Section & 4-Stage Manufacturing Step Cards */
[data-theme="dark"] .process-section {
  background-color: #101B26 !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

[data-theme="dark"] .process-section-title {
  color: #FFFFFF !important;
}

[data-theme="dark"] .process-section-desc {
  color: #CBD5E1 !important;
}

[data-theme="dark"] .process-step-card {
  background: #17232F !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4) !important;
}

[data-theme="dark"] .process-step-card:hover {
  border-color: #F07824 !important;
  box-shadow: 0 14px 30px rgba(240, 120, 36, 0.35) !important;
}

[data-theme="dark"] .step-number {
  border-color: rgba(255, 255, 255, 0.3) !important;
  box-shadow: 0 4px 16px rgba(240, 120, 36, 0.5) !important;
}

[data-theme="dark"] .process-step-title,
[data-theme="dark"] .process-step-card h5 {
  color: #FFFFFF !important;
}

[data-theme="dark"] .process-step-desc,
[data-theme="dark"] .process-step-card p {
  color: #CBD5E1 !important;
}

[data-theme="light"] .process-section {
  background-color: #F8FAFC !important;
  border-color: #E2E8F0 !important;
}

[data-theme="light"] .process-section-title {
  color: #17232F !important;
}

[data-theme="light"] .process-section-desc {
  color: #475569 !important;
}

[data-theme="light"] .process-step-card {
  background: #FFFFFF !important;
  border: 1px solid #E2E8F0 !important;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05) !important;
}

[data-theme="light"] .process-step-card:hover {
  border-color: #F07824 !important;
  box-shadow: 0 14px 30px rgba(240, 120, 36, 0.16) !important;
}

[data-theme="light"] .process-step-title,
[data-theme="light"] .process-step-card h5 {
  color: #17232F !important;
}

[data-theme="light"] .process-step-desc,
[data-theme="light"] .process-step-card p {
  color: #475569 !important;
}

`;

if (targetDarkRegex.test(darkCss)) {
  darkCss = darkCss.replace(targetDarkRegex, newDarkSection);
  fs.writeFileSync(darkPath, darkCss, 'utf8');
  console.log('Successfully updated assets/css/dark-mode.css');
} else {
  console.error('Target regex not found in dark-mode.css');
}
