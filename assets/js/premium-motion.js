/**
 * ============================================================================
 * TRUCK BODY BUILDER – PREMIUM MOTION & INTERACTIVE ANIMATION ENGINE
 * 60 FPS Fluid Scrolling, Staggered Reveals, Magnetic Buttons & Interactive Depth
 * ============================================================================
 */

(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrollNavigation();
    initStickyHeaderGlassmorphism();
    initScrollStaggerEngine();
    initAnimatedStatsCounters();
    initButtonRippleFeedback();

    // Desktop-only interactive physics (no touch interference)
    if (!isTouchDevice && !prefersReducedMotion && window.innerWidth >= 992) {
      initMagneticButtons();
      initCardPerspectiveTilt();
      initHeroParallaxDepth();
    }
  });

  // ==========================================================================
  // 1. Buttery-Smooth Anchor Navigation Scrolling
  // ==========================================================================
  function initSmoothScrollNavigation() {
    document.querySelectorAll('a[href^="#"]:not([href="#"]):not([data-bs-toggle])').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const header = document.querySelector('.site-header');
          const headerOffset = header ? header.offsetHeight + 15 : 85;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Close mobile drawer if open
          const drawer = document.getElementById('navbarDrawer');
          const backdrop = document.getElementById('drawerBackdrop');
          if (drawer && drawer.classList.contains('show')) {
            drawer.classList.remove('show');
            if (backdrop) backdrop.classList.remove('show');
            document.body.style.overflow = '';
          }
        }
      });
    });
  }

  // ==========================================================================
  // 2. Glassmorphism Sticky Navbar on Scroll
  // ==========================================================================
  function initStickyHeaderGlassmorphism() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 40) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ==========================================================================
  // 3. Fluid Staggered Scroll Reveal Engine (IntersectionObserver)
  // ==========================================================================
  function initScrollStaggerEngine() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-fade-up, .reveal-slide-left, .reveal-slide-right, .reveal-zoom-in, .reveal-on-scroll').forEach(el => {
        el.classList.add('is-revealed');
      });
      return;
    }

    // Automatically apply staggered reveal classes to grid items across sections
    document.querySelectorAll('.row.g-4, .row.g-3, .gallery-grid').forEach(grid => {
      const items = grid.children;
      Array.from(items).forEach((item, index) => {
        if (!item.classList.contains('reveal-fade-up') && !item.classList.contains('reveal-on-scroll')) {
          item.classList.add('reveal-fade-up');
          const staggerIndex = (index % 4) + 1;
          item.classList.add(`stagger-${staggerIndex}`);
        }
      });
    });

    // Also target standalone headings and callouts
    document.querySelectorAll('.section-header, .stats-banner, .process-section, .estimator-card').forEach(sec => {
      if (!sec.classList.contains('reveal-fade-up')) {
        sec.classList.add('reveal-fade-up');
      }
    });

    const revealTargets = document.querySelectorAll(
      '.reveal-fade-up, .reveal-slide-left, .reveal-slide-right, .reveal-zoom-in, .reveal-on-scroll'
    );

    if (!revealTargets.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealTargets.forEach(target => observer.observe(target));
  }

  // ==========================================================================
  // 4. Ultra-Smooth Decelerated Counter Animation
  // ==========================================================================
  function initAnimatedStatsCounters() {
    const statsSection = document.querySelector('.stats-banner');
    const counters = document.querySelectorAll('.stat-num, [data-counter-target]');
    if (!counters.length) return;

    let hasRun = false;

    function runCounters() {
      if (hasRun) return;
      hasRun = true;

      counters.forEach(counter => {
        const text = counter.innerText.trim();
        const numericMatch = text.match(/[\d,.]+/);
        if (!numericMatch) return;

        const rawTarget = numericMatch[0].replace(/,/g, '');
        const target = parseFloat(rawTarget);
        if (isNaN(target)) return;

        const isDecimal = rawTarget.includes('.');
        const prefix = text.slice(0, text.indexOf(numericMatch[0]));
        const suffix = text.slice(text.indexOf(numericMatch[0]) + numericMatch[0].length);

        const duration = 2200; // 2.2s silky smooth count
        let startTime = null;

        function updateCount(timestamp) {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Quintic Ease-Out curve for luxurious deceleration
          const easeOut = 1 - Math.pow(1 - progress, 5);
          const currentVal = target * easeOut;

          let formattedVal = isDecimal 
            ? currentVal.toFixed(1) 
            : Math.floor(currentVal).toLocaleString();

          counter.innerText = `${prefix}${formattedVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = text; // Ensure exact final string
          }
        }

        requestAnimationFrame(updateCount);
      });
    }

    if (statsSection) {
      const statsObserver = new IntersectionObserver((entries, obs) => {
        if (entries[0].isIntersecting) {
          runCounters();
          obs.unobserve(statsSection);
        }
      }, { threshold: 0.25 });
      statsObserver.observe(statsSection);
    } else {
      runCounters();
    }
  }

  // ==========================================================================
  // 5. Magnetic CTA Buttons (Subtle Elastic Pull on Cursor)
  // ==========================================================================
  function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll(
      '.btn-magnetic, .btn-industrial.btn-lg, #heroQuickQuoteBtn'
    );

    magneticBtns.forEach(btn => {
      btn.classList.add('btn-magnetic');

      btn.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - btnCenterX) * 0.26;
        const deltaY = (e.clientY - btnCenterY) * 0.26;

        this.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      });

      btn.addEventListener('mouseleave', function () {
        this.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // ==========================================================================
  // 6. Interactive 3D Perspective Tilt on Feature Cards
  // ==========================================================================
  function initCardPerspectiveTilt() {
    const tiltCards = document.querySelectorAll(
      '.service-card, .process-step-card, .product-card'
    );

    tiltCards.forEach(card => {
      card.classList.add('tilt-card');

      card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;

        this.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // ==========================================================================
  // 7. Satisfying Click Ripple Effect on Buttons
  // ==========================================================================
  function initButtonRippleFeedback() {
    const buttons = document.querySelectorAll('.btn-industrial, .btn-outline-steel, .btn-magnetic');

    buttons.forEach(btn => {
      btn.classList.add('btn-ripple');

      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.className = 'ripple-wave';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        const existing = this.querySelector('.ripple-wave');
        if (existing) existing.remove();

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 700);
      });
    });
  }

  // ==========================================================================
  // 8. Hero Subtle Parallax Depth Drift on Scroll
  // ==========================================================================
  function initHeroParallaxDepth() {
    const heroVisual = document.querySelector('.hero-carousel-section');
    if (!heroVisual) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          if (scrolled < 900) {
            const ambient = heroVisual.querySelector('.hero-ambient-mesh');
            if (ambient) {
              ambient.style.transform = `translate3d(0, ${scrolled * 0.18}px, 0)`;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

})();
