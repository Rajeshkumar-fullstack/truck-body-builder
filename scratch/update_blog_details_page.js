const fs = require('fs');

let html = fs.readFileSync('blog-details.html', 'utf8');

// 1. Breadcrumb ID
html = html.replace(
  '<li class="breadcrumb-item active" aria-current="page">Hardox Steel vs Mild Steel in Tipper Fabrication</li>',
  '<li class="breadcrumb-item active" id="articleBreadcrumb" aria-current="page">Hardox Steel vs Mild Steel in Tipper Fabrication</li>'
);

// 2. Category Badge ID
html = html.replace(
  '<span class="badge mb-3 px-3 py-2 text-uppercase fw-bold" style="background-color: rgba(240, 120, 36, 0.12); color: var(--industrial-orange); font-size: 0.8rem;">\n                Metallurgy & Commercial Body Engineering\n              </span>',
  '<span class="badge mb-3 px-3 py-2 text-uppercase fw-bold" id="articleCategoryBadge" style="background-color: rgba(240, 120, 36, 0.12); color: var(--industrial-orange); font-size: 0.8rem;">\n                Metallurgy & Commercial Body Engineering\n              </span>'
);

// 3. Title ID
html = html.replace(
  '<h1 class="display-6 fw-bold mb-3" style="line-height: 1.3;">',
  '<h1 class="display-6 fw-bold mb-3" id="articleTitle" style="line-height: 1.3;">'
);

// 4. Meta Row ID
html = html.replace(
  '<div class="d-flex align-items-center flex-wrap gap-4 py-3 mb-4 border-top border-bottom text-muted small">',
  '<div class="d-flex align-items-center flex-wrap gap-4 py-3 mb-4 border-top border-bottom text-muted small" id="articleMetaRow">'
);

// 5. Featured Image & Caption ID
html = html.replace(
  '<img src="assets/images/blog/blog-1.jpg" alt="Heavy Mining Tipper Fabricated with Hardox Steel" class="w-100" style="max-height: 440px; object-fit: cover;">',
  '<img src="assets/images/blog/blog-1.jpg" id="articleImage" alt="Heavy Mining Tipper Fabricated with Hardox Steel" class="w-100" style="max-height: 440px; object-fit: cover;">'
);
html = html.replace(
  '<div class="p-2 bg-dark text-white text-center small">\n                  <em>Figure 1: Heavy 24 Cu.M rock body fabricated using Hardox 450 floor and Domex 700 ribs on Tata Signa 3525.K 8x4 chassis.</em>\n                </div>',
  '<div class="p-2 bg-dark text-white text-center small" id="articleImageCaption">\n                  <em>Figure 1: Heavy 24 Cu.M rock body fabricated using Hardox 450 floor and Domex 700 ribs on Tata Signa 3525.K 8x4 chassis.</em>\n                </div>'
);

// 6. Article Body ID
html = html.replace(
  '<div class="article-prose" style="font-size: 1.02rem; line-height: 1.8; color: var(--body-text);">',
  '<div class="article-prose" id="articleBody" style="font-size: 1.02rem; line-height: 1.8; color: var(--body-text);">'
);

// 7. Tags ID
html = html.replace(
  '<div class="d-flex align-items-center gap-2 flex-wrap">\n                    <span class="fw-bold small text-muted"><i class="fas fa-tags me-1"></i> Tags:</span>',
  '<div class="d-flex align-items-center gap-2 flex-wrap" id="articleTags">\n                    <span class="fw-bold small text-muted"><i class="fas fa-tags me-1"></i> Tags:</span>'
);

// 8. Author Card IDs
html = html.replace(
  '<img src="assets/images/about/author-natarajan.jpg" alt="Er. R. Natarajan" class="rounded-circle flex-shrink-0" style="width: 64px; height: 64px; object-fit: cover; border: 2px solid var(--industrial-orange); box-shadow: 0 3px 10px rgba(0,0,0,0.18);" loading="lazy">',
  '<img src="assets/images/about/author-natarajan.jpg" id="authorAvatar" alt="Er. R. Natarajan" class="rounded-circle flex-shrink-0" style="width: 64px; height: 64px; object-fit: cover; border: 2px solid var(--industrial-orange); box-shadow: 0 3px 10px rgba(0,0,0,0.18);" loading="lazy">'
);
html = html.replace(
  '<h5 class="fw-bold mb-1">Er. R. Natarajan</h5>',
  '<h5 class="fw-bold mb-1" id="authorName">Er. R. Natarajan</h5>'
);
html = html.replace(
  '<p class="small text-muted mb-0">Chief Metallurgist & VP of Commercial Body Engineering with 24 years experience in automotive chassis stress-testing, AWS certified welding inspection, and high-tensile tipper design.</p>',
  '<p class="small text-muted mb-0" id="authorBio">Chief Metallurgist & VP of Commercial Body Engineering with 24 years experience in automotive chassis stress-testing, AWS certified welding inspection, and high-tensile tipper design.</p>'
);

// 9. Related Articles Container ID
html = html.replace(
  '<div class="row g-4">\n                <div class="col-md-6">\n                  <div class="blog-card h-100">',
  '<div class="row g-4" id="relatedArticlesContainer">\n                <div class="col-md-6">\n                  <div class="blog-card h-100">'
);

// 10. Script loading and Dynamic Article Controller
const scriptBlock = `  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/theme.js"></script>
  <script src="assets/js/cart.js"></script>
  <script src="assets/js/blog-data.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (!window.TruckBlogData) return;
      const urlParams = new URLSearchParams(window.location.search);
      let articleId = urlParams.get('id') || urlParams.get('article');
      
      // If slug was passed instead of id, resolve it
      if (articleId && isNaN(articleId)) {
        const found = Object.values(window.TruckBlogData).find(a => a.slug === articleId);
        if (found) articleId = found.id;
      }
      
      if (!articleId || !window.TruckBlogData[articleId]) {
        articleId = "1";
      }

      const article = window.TruckBlogData[articleId];
      if (!article) return;

      // 1. Update Title & Meta
      document.title = \`\${article.title} | Truck Body Builder Knowledge Base\`;

      // 2. Breadcrumb
      const bc = document.getElementById('articleBreadcrumb');
      if (bc) bc.textContent = article.shortTitle || article.title;

      // 3. Category Badge
      const catBadge = document.getElementById('articleCategoryBadge');
      if (catBadge) catBadge.textContent = article.category;

      // 4. Headline
      const titleEl = document.getElementById('articleTitle');
      if (titleEl) titleEl.textContent = article.title;

      // 5. Meta Row
      const metaRow = document.getElementById('articleMetaRow');
      if (metaRow) {
        metaRow.innerHTML = \`
          <span><i class="fas fa-user-tie text-orange me-1" style="color: var(--industrial-orange);"></i> \${article.authorName}, \${article.authorTitle}</span>
          <span><i class="fas fa-calendar-alt text-orange me-1" style="color: var(--industrial-orange);"></i> Published \${article.date}</span>
          <span><i class="fas fa-clock text-orange me-1" style="color: var(--industrial-orange);"></i> \${article.readTime}</span>
          <span><i class="fas fa-eye text-orange me-1" style="color: var(--industrial-orange);"></i> \${article.views}</span>
        \`;
      }

      // 6. Featured Image & Caption
      const imgEl = document.getElementById('articleImage');
      if (imgEl) {
        imgEl.src = article.image;
        imgEl.alt = article.title;
      }
      const captionEl = document.getElementById('articleImageCaption');
      if (captionEl) {
        captionEl.innerHTML = \`<em>\${article.imageCaption}</em>\`;
      }

      // 7. Body & Lead
      const bodyEl = document.getElementById('articleBody');
      if (bodyEl) {
        bodyEl.innerHTML = \`
          <p class="lead fw-normal">\${article.lead}</p>
          \${article.contentHtml}
        \`;
      }

      // 8. Tags
      const tagsEl = document.getElementById('articleTags');
      if (tagsEl && article.tags) {
        tagsEl.innerHTML = \`
          <span class="fw-bold small text-muted"><i class="fas fa-tags me-1"></i> Tags:</span>
          \${article.tags.map(t => \`<span class="badge bg-light text-dark border">\${t}</span>\`).join(' ')}
        \`;
      }

      // 9. Author Card
      const authorNameEl = document.getElementById('authorName');
      if (authorNameEl) authorNameEl.textContent = article.authorName;
      const authorBioEl = document.getElementById('authorBio');
      if (authorBioEl) authorBioEl.textContent = article.authorBio;
      const authorAvatarEl = document.getElementById('authorAvatar');
      if (authorAvatarEl && article.authorAvatar) authorAvatarEl.src = article.authorAvatar;

      // 10. Related Articles (Pick 2 other articles)
      const relatedContainer = document.getElementById('relatedArticlesContainer');
      if (relatedContainer) {
        const allKeys = Object.keys(window.TruckBlogData);
        const otherKeys = allKeys.filter(k => k !== article.id);
        const rel1 = window.TruckBlogData[otherKeys[0]];
        const rel2 = window.TruckBlogData[otherKeys[1]];
        const list = [rel1, rel2].filter(Boolean);

        relatedContainer.innerHTML = list.map(item => \`
          <div class="col-md-6">
            <div class="blog-card h-100">
              <div class="blog-thumb-wrapper" style="height: 180px;">
                <img src="\${item.image}" alt="\${item.title}" class="blog-thumb">
              </div>
              <div class="blog-body p-3">
                <span class="blog-category">\${item.category}</span>
                <h4 class="blog-title fs-6"><a href="blog-details.html?id=\${item.id}">\${item.title}</a></h4>
                <p class="small text-muted mb-2">\${item.lead.substring(0, 115)}...</p>
                <a href="blog-details.html?id=\${item.id}" class="small fw-bold text-orange">Read Article &rarr;</a>
              </div>
            </div>
          </div>
        \`).join('');
      }
    });
  </script>
  <script src="assets/js/gallery.js"></script>
  <script src="assets/js/main.js"></script>`;

html = html.replace(
  `  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="assets/js/theme.js"></script>
  <script src="assets/js/cart.js"></script>
  <script src="assets/js/gallery.js"></script>
  <script src="assets/js/main.js"></script>`,
  scriptBlock
);

fs.writeFileSync('blog-details.html', html, 'utf8');
console.log('SUCCESS: blog-details.html updated with dynamic article renderer');
