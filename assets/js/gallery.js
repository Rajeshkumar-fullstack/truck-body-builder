/**
 * PROJECT 69: TRUCK BODY BUILDER
 * Gallery Filter and Lightbox Module
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initGalleryFilters();
    initLightbox();
  });

  function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');

    if (!filterButtons.length || !galleryItems.length) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = '';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.transition = 'all 0.35s ease';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 30);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  function initLightbox() {
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    if (!galleryItems.length) return;

    let lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'gallery-lightbox';
      lightbox.className = 'lightbox-modal';
      lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close Lightbox">&times;</button>
        <button class="lightbox-nav lightbox-prev" aria-label="Previous Image"><i class="fas fa-chevron-left"></i></button>
        <button class="lightbox-nav lightbox-next" aria-label="Next Image"><i class="fas fa-chevron-right"></i></button>
        <div class="lightbox-content-wrapper">
          <div class="lightbox-img-container">
            <img src="" alt="Project Preview" id="lightbox-img">
          </div>
          <div class="lightbox-caption">
            <div>
              <h4 id="lightbox-title">Project Title</h4>
              <p id="lightbox-desc">Project details and specifications.</p>
            </div>
            <div id="lightbox-counter" class="badge bg-secondary p-2">1 / 10</div>
          </div>
        </div>
      `;
      document.body.appendChild(lightbox);
    }

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentIndex = 0;
    let visibleItems = [];

    function getVisibleItems() {
      return Array.from(document.querySelectorAll('.gallery-item')).filter(el => el.style.display !== 'none');
    }

    function showImage(index) {
      visibleItems = getVisibleItems();
      if (!visibleItems.length) return;

      if (index < 0) index = visibleItems.length - 1;
      if (index >= visibleItems.length) index = 0;
      currentIndex = index;

      const currentItem = visibleItems[currentIndex];
      const img = currentItem.querySelector('.gallery-img');
      const title = currentItem.querySelector('.gallery-title')?.textContent || 'Commercial Vehicle Project';
      const desc = currentItem.querySelector('.gallery-desc')?.textContent || 'Manufactured with high-tensile steel.';

      lightboxImg.src = img.src;
      lightboxImg.alt = title;
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;
      lightboxCounter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        visibleItems = getVisibleItems();
        const clickedIndex = visibleItems.indexOf(item);
        if (clickedIndex > -1) {
          showImage(clickedIndex);
        }
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });
  }
})();
