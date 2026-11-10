/**
 * TRUCK BODY BUILDER - Main Client JavaScript
 * Industrial Automotive Engineering Showcase
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
    initHeroVisualShowcases();
    initResponsiveNavbar();
    highlightCurrentNavLink();
    initAnimatedCounters();
    initBlogFilterAndSearch();
  });

  // ==========================================================================
  // Hero Carousel - Continuous Autonomous 4.5s Rotation (Zero Hover Dependency)
  // ==========================================================================
  function initHeroCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.hero-slide');
    const dots = carousel.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');
    const currentSlideEl = document.getElementById('heroCurrentSlide');
    const progressBar = document.getElementById('heroProgressBar');

    if (!slides.length) return;

    let currentIdx = 0;
    const totalSlides = slides.length;
    // Exactly 4.5 seconds per slide for steady, uninterrupted commercial rotation
    const slideDuration = 4500; 
    const tickInterval = 40; // 40ms timer tick for fluid 60fps progress bar
    let elapsed = 0;
    let timer = null;

    // Preload hero images to eliminate flickering and network lag
    const preloadList = [
      'assets/images/hero/slide-1.jpg',
      'assets/images/hero/slide-2.jpg',
      'assets/images/hero/slide-3.jpg',
      'assets/images/hero/slide-4.jpg'
    ];
    preloadList.forEach(url => {
      const img = new Image();
      img.src = url;
    });

    function showSlide(index) {
      if (index >= totalSlides) index = 0;
      if (index < 0) index = totalSlides - 1;

      // Deactivate current slide
      slides[currentIdx].classList.remove('active');
      if (dots[currentIdx]) dots[currentIdx].classList.remove('active');

      // Activate target slide
      currentIdx = index;
      slides[currentIdx].classList.add('active');
      if (dots[currentIdx]) dots[currentIdx].classList.add('active');

      // Reset & notify the visual showcase on the newly activated slide
      const activeShowcase = slides[currentIdx].querySelector('.hero-visual-showcase');
      if (activeShowcase && typeof activeShowcase._resetShowcase === 'function') {
        activeShowcase._resetShowcase();
      }

      // Update counter indicator (01, 02, 03, 04)
      if (currentSlideEl) {
        currentSlideEl.textContent = String(currentIdx + 1).padStart(2, '0');
      }

      // Reset progress bar on slide change
      elapsed = 0;
      if (progressBar) progressBar.style.width = '0%';
    }

    function nextSlide() {
      showSlide(currentIdx + 1);
    }

    function prevSlide() {
      showSlide(currentIdx - 1);
    }

    // Continuous, uninterrupted timer loop (Runs regardless of mouse cursor position)
    function startTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        elapsed += tickInterval;
        const progressPercent = Math.min(100, (elapsed / slideDuration) * 100);
        if (progressBar) {
          progressBar.style.width = progressPercent + '%';
        }
        if (elapsed >= slideDuration) {
          nextSlide();
        }
      }, tickInterval);
    }

    function restartTimerOnManualAction() {
      elapsed = 0;
      if (progressBar) progressBar.style.width = '0%';
      startTimer();
    }

    // Previous & Next controls: manual slide change while maintaining continuous auto-rotation
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        restartTimerOnManualAction();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        restartTimerOnManualAction();
      });
    }

    // Pagination indicators: manual click while maintaining continuous auto-rotation
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const targetIndex = parseInt(dot.getAttribute('data-slide-to'), 10);
        if (!isNaN(targetIndex) && targetIndex !== currentIdx) {
          showSlide(targetIndex);
          restartTimerOnManualAction();
        }
      });
    });

    // Mobile touch swipe gestures
    let touchStartX = 0;
    let touchStartY = 0;

    carousel.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            nextSlide();
          } else {
            prevSlide();
          }
          restartTimerOnManualAction();
        }
      }
    }, { passive: true });

    // Page Visibility API: Pause only when browser tab is hidden to save power, resume immediately on focus
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (timer) clearInterval(timer);
      } else {
        startTimer();
      }
    });

    window.addEventListener('focus', () => {
      startTimer();
    });

    // Backwards-compatible dummy API (does not pause carousel)
    window.setHeroCarouselPause = () => {};

    // Initialize slide 0 and run continuously
    showSlide(0);
    startTimer();
  }

  // ==========================================================================
  // Interactive Hero Visual Image Showcase (Continuous Automatic Rotation)
  // ==========================================================================
  function initHeroVisualShowcases() {
    const showcases = document.querySelectorAll('.hero-visual-showcase');
    if (!showcases.length) return;

    showcases.forEach(showcase => {
      const stageEl = showcase.querySelector('.showcase-featured-stage');
      const mainImg = showcase.querySelector('.showcase-stage-img');
      const titleEl = showcase.querySelector('.showcase-vehicle-title');
      const subEl = showcase.querySelector('.showcase-vehicle-sub');
      const badgeEl = showcase.querySelector('.showcase-badge-float');
      const specEl = showcase.querySelector('.showcase-spec-float');
      const thumbs = Array.from(showcase.querySelectorAll('.showcase-thumb-item'));
      const hintEl = showcase.querySelector('.showcase-thumbs-label .hint');

      if (!thumbs.length || !mainImg) return;

      // Ensure progress bar exists inside stage
      let progressTrack = stageEl ? stageEl.querySelector('.showcase-progress-track') : null;
      if (stageEl && !progressTrack) {
        progressTrack = document.createElement('div');
        progressTrack.className = 'showcase-progress-track';
        progressTrack.innerHTML = '<div class="showcase-progress-fill"></div>';
        stageEl.appendChild(progressTrack);
      }
      const progressFill = progressTrack ? progressTrack.querySelector('.showcase-progress-fill') : null;

      if (hintEl) {
        hintEl.innerHTML = '<span class="rotate-dot"></span> Auto-Rotating • Click to Inspect';
      }

      // Preload thumbnail images
      thumbs.forEach(t => {
        const src = t.getAttribute('data-img');
        if (src) {
          const img = new Image();
          img.src = src;
        }
      });

      let currentThumbIdx = 0;
      let autoTimer = null;
      const ITEM_DURATION = 2250; // Smooth 2.25s cadence per configuration image
      const TICK_MS = 40;
      let elapsedMs = 0;

      function activateThumb(index, resetProgress = true) {
        if (index < 0 || index >= thumbs.length) index = 0;
        currentThumbIdx = index;

        thumbs.forEach((t, i) => {
          t.classList.toggle('active', i === currentThumbIdx);
        });

        const activeThumb = thumbs[currentThumbIdx];
        const newSrc = activeThumb.getAttribute('data-img');
        const newTitle = activeThumb.getAttribute('data-title');
        const newSub = activeThumb.getAttribute('data-sub');
        const newBadge = activeThumb.getAttribute('data-badge');
        const newSpec = activeThumb.getAttribute('data-spec');

        // Smooth image crossfade
        if (mainImg && newSrc) {
          mainImg.style.opacity = '0.35';
          mainImg.style.transform = 'scale(0.98)';
          setTimeout(() => {
            mainImg.src = newSrc;
            mainImg.style.opacity = '1';
            mainImg.style.transform = 'scale(1)';
          }, 120);
        }

        if (titleEl && newTitle) titleEl.textContent = newTitle;
        if (subEl && newSub) subEl.innerHTML = `<i class="fas fa-check-circle text-orange me-1"></i> ${newSub}`;
        if (badgeEl && newBadge) badgeEl.innerHTML = `<i class="fas fa-certificate text-orange"></i> ${newBadge}`;
        if (specEl && newSpec) specEl.innerHTML = `<i class="fas fa-shield-alt"></i> ${newSpec}`;

        if (resetProgress) {
          elapsedMs = 0;
          if (progressFill) progressFill.style.width = '0%';
        }
      }

      function tick() {
        const parentSlide = showcase.closest('.hero-slide');
        const isSlideActive = !parentSlide || parentSlide.classList.contains('active');

        // Runs continuously while parent hero-slide is active (no hover pause)
        if (isSlideActive) {
          elapsedMs += TICK_MS;
          const pct = Math.min(100, (elapsedMs / ITEM_DURATION) * 100);
          if (progressFill) {
            progressFill.style.width = pct + '%';
          }
          if (elapsedMs >= ITEM_DURATION) {
            elapsedMs = 0;
            const nextIdx = (currentThumbIdx + 1) % thumbs.length;
            activateThumb(nextIdx, true);
          }
        }
      }

      function startAutoTimer() {
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = setInterval(tick, TICK_MS);
      }

      // Manual Click on Thumbnail switches configuration without stopping rotation
      thumbs.forEach((thumb, idx) => {
        thumb.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          activateThumb(idx, true);
        });
      });

      // Expose reset API to parent carousel
      showcase._resetShowcase = () => {
        activateThumb(0, true);
      };

      // Tab visibility handling
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (autoTimer) clearInterval(autoTimer);
        } else {
          startAutoTimer();
        }
      });

      // Initialize initial thumbnail and start continuous rotation
      activateThumb(0, true);
      startAutoTimer();
    });
  }

  function initScrollRevealAnimations() {
    // Automatically apply .reveal-on-scroll to key visual cards across all pages
    const targets = document.querySelectorAll(
      '.product-card, .service-card, .process-step-card, .stat-box, .blog-card, .gallery-item, .tech-spec-card, .form-card, .reveal-on-scroll'
    );

    if (!targets.length) return;

    targets.forEach(el => {
      if (!el.classList.contains('reveal-on-scroll')) {
        el.classList.add('reveal-on-scroll');
      }
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(el => observer.observe(el));
  }

  // Sticky Header & Back-To-Top Trigger
  
  // Sticky Navbar Controller for Responsive Viewports
  function initStickyHeaderWatcher() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    function handleScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY > 15) {
        header.classList.add('scrolled', 'is-sticky');
      } else {
        header.classList.remove('scrolled', 'is-sticky');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // Responsive Mobile Navigation Drawer & Dropdown Controller
  // ==========================================================================
  function initResponsiveNavbar() {
    const drawerToggler = document.getElementById('navbarDrawerToggler');
    const drawerClose = document.getElementById('navbarDrawerClose');
    const drawer = document.getElementById('navbarDrawer');
    const backdrop = document.getElementById('drawerBackdrop');

    if (!drawer) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-active');
      document.body.classList.add('drawer-open');
      const toggler = document.getElementById('navbarDrawerToggler') || document.querySelector('.navbar-toggler');
      if (toggler) toggler.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-active');
      document.body.classList.remove('drawer-open');
      const toggler = document.getElementById('navbarDrawerToggler') || document.querySelector('.navbar-toggler');
      if (toggler) toggler.setAttribute('aria-expanded', 'false');
    }

    // Expose programmatic global API
    window.openNavDrawer = openDrawer;
    window.closeNavDrawer = closeDrawer;
    window.toggleNavDrawer = function() {
      if (drawer.classList.contains('is-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    };

    if (drawerToggler) {
      drawerToggler.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (drawer.classList.contains('is-open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    }

    if (drawerClose) {
      drawerClose.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => {
        closeDrawer();
      });
    }

    // Escape key to close drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    // Mobile Dropdown Accordion Toggle (<992px)
    const dropdownToggles = drawer.querySelectorAll('.nav-item.dropdown > .dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth < 992) {
          e.preventDefault();
          e.stopPropagation();
          const parentItem = toggle.closest('.dropdown');
          if (parentItem) {
            const isAlreadyOpen = parentItem.classList.contains('is-open');
            drawer.querySelectorAll('.nav-item.dropdown.is-open').forEach(item => {
              if (item !== parentItem) item.classList.remove('is-open');
            });
            parentItem.classList.toggle('is-open', !isAlreadyOpen);
          }
        }
      });
    });

    // Close drawer when clicking normal navigation links or dropdown items
    const navClickLinks = drawer.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-menu-industrial .dropdown-item, .nav-cta-btn');
    navClickLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          closeDrawer();
        }
      });
    });

    // Auto-close drawer on resize to desktop (>= 992px)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992 && drawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  // Highlight Current Nav Item
  function highlightCurrentNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.site-header .nav-link, .dropdown-menu-industrial .dropdown-item');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
        link.classList.add('active');
        const parentDropdown = link.closest('.dropdown');
        if (parentDropdown) {
          const dropdownToggle = parentDropdown.querySelector('.dropdown-toggle');
          if (dropdownToggle) dropdownToggle.classList.add('active');
        }
      }
    });

    if (currentPath === 'cart.html') {
      document.querySelectorAll('.cart-icon-btn').forEach(btn => btn.classList.add('active'));
    }
  }

  // Animated Numbers for Industrial Statistics
  function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    if (!counters.length) return;

    let animated = false;

    function runCounters() {
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
        let count = 0;
        const duration = 1800; // ms
        const increment = Math.ceil(target / (duration / 25));

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            counter.textContent = target.toLocaleString('en-IN');
            clearInterval(timer);
          } else {
            counter.textContent = count.toLocaleString('en-IN');
          }
        }, 25);
      });
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          runCounters();
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-banner');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  // Blog Page Search & Filtering
  function initBlogFilterAndSearch() {
    const searchInput = document.getElementById('blogSearchInput');
    const categoryFilters = document.querySelectorAll('.blog-cat-filter');
    const blogCards = document.querySelectorAll('.blog-article-card');

    if (!blogCards.length) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function filterBlogs() {
      blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        const title = (card.querySelector('.blog-title')?.textContent || '').toLowerCase();
        const excerpt = (card.querySelector('.blog-excerpt')?.textContent || '').toLowerCase();

        const matchesCat = (activeCategory === 'all' || cardCategory === activeCategory);
        const matchesSearch = !searchQuery || title.includes(searchQuery) || excerpt.includes(searchQuery);

        if (matchesCat && matchesSearch) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      const noResults = document.getElementById('blogNoResults');
      if (noResults) {
        const anyVisible = Array.from(blogCards).some(c => c.style.display !== 'none');
        noResults.style.display = anyVisible ? 'none' : 'block';
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterBlogs();
      });
    }

    categoryFilters.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        categoryFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-category') || 'all';
        filterBlogs();
      });
    });
  }

  // Global event delegation for navbar drawer toggle (fallback guarantee)
  document.addEventListener('click', function (e) {
    const toggler = e.target.closest('#navbarDrawerToggler, .navbar-toggler');
    if (toggler) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.toggleNavDrawer === 'function') {
        window.toggleNavDrawer();
      }
      return;
    }

    const closeBtn = e.target.closest('#navbarDrawerClose, .drawer-close-btn');
    if (closeBtn) {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.closeNavDrawer === 'function') {
        window.closeNavDrawer();
      }
      return;
    }

    const backdrop = e.target.closest('#drawerBackdrop, .drawer-backdrop');
    if (backdrop) {
      if (typeof window.closeNavDrawer === 'function') {
        window.closeNavDrawer();
      }
    }
  });

  // Alias for backward compatibility
  const initMobileDrawer = initResponsiveNavbar;

})();
