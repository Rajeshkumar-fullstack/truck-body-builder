const fs = require('fs');
const https = require('https');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  const dest = path.join('assets', 'images', 'about', 'author-natarajan.jpg');
  await download('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&h=250&q=85', dest).catch(() => {});
  // Or let's use an experienced engineer headshot:
  await download('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&h=250&q=85', dest);
  console.log('Saved author-natarajan.jpg');

  let blogDetails = fs.readFileSync('blog-details.html', 'utf8');
  const oldAuthorCircle = /<div class="rounded-circle d-flex align-items-center justify-content-center bg-secondary text-white fw-bold fs-4 flex-shrink-0" style="width: 64px; height: 64px;">\s*RN\s*<\/div>/;
  console.log('Match RN author box:', oldAuthorCircle.test(blogDetails));
  if (oldAuthorCircle.test(blogDetails)) {
    blogDetails = blogDetails.replace(oldAuthorCircle, `<img src="assets/images/about/author-natarajan.jpg" alt="Er. R. Natarajan" class="rounded-circle flex-shrink-0" style="width: 64px; height: 64px; object-fit: cover; border: 2px solid var(--industrial-orange); box-shadow: 0 3px 10px rgba(0,0,0,0.18);" loading="lazy">`);
    fs.writeFileSync('blog-details.html', blogDetails, 'utf8');
    console.log('Updated blog-details.html author box!');
  }
}
run();
