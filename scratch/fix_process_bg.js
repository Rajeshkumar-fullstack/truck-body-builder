const fs = require('fs');
const file = 'c:/Users/rajeshkumar.s/Desktop/Truck Body Builder/index.html';
let content = fs.readFileSync(file, 'utf8');

const target = `<section class="py-5" style="background-color: var(--white);">\r\n      <div class="container py-lg-4 text-white">`;
const targetLF = `<section class="py-5" style="background-color: var(--white);">\n      <div class="container py-lg-4 text-white">`;

const replacement = `<section class="py-5 bg-dark-steel text-white" style="background: linear-gradient(180deg, #101B26 0%, #17232F 100%) !important;">\r\n      <div class="container py-lg-4 text-white">`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully replaced CRLF');
} else if (content.includes(targetLF)) {
  content = content.replace(targetLF, replacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully replaced LF');
} else {
  console.log('Target not found, trying regex');
  content = content.replace(/<section class="py-5" style="background-color: var\(--white\);">[\r\n\s]*<div class="container py-lg-4 text-white">/, replacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Replaced via regex');
}
