/**
 * ============================================================================
 * TRUCK BODY BUILDER – PREMIUM MOTION & INTERACTIVE ANIMATION ENGINE
 * 60 FPS Fluid Scrolling, Scroll Progress, Staggered Reveals & 3D Interactive Depth
 * ============================================================================
 */

(function () {
  'use strict';

  // Check for reduced motion preference and touch device
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgressBar();
    initBackToTopWithProgressRing();
    initSmoothScrollNavigation();
    initStickyHeaderGlassmorphism();
    initScrollStaggerEngine();
    initAnimatedStatsCounters();
    initButtonRippleFeedback();
    initMobileTouchFeedback();
    initHeroSparksCanvas();
    initCadLaserScanner();

    // Desktop-only interactive physics & spotlights (zero touch interference)
    if (!isTouchDevice && !prefersReducedMotion && window.innerWidth >= 992) {
      initMagneticButtons();
      initCardSpotlightAndTilt();
      initHeroParallaxDepth();
    }
  });

  // ==========================================================================
  // 1. Viewport Top Scroll Progress Bar
  // ==========================================================================
  function initScrollProgressBar() {
    let progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) {
      const track = document.createElement('div');
      track.className = 'scroll-progress-track';
      track.id = 'scrollProgressTrack';
      track.setAttribute('aria-hidden', 'true');

      progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress-bar';
      progressBar.id = 'scrollProgressBar';

      track.appendChild(progressBar);
      document.body.prepend(track);
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ==========================================================================
  // 2. Floating Back-to-Top Button with Circular SVG Progress Ring
  // ==========================================================================
  function initBackToTopWithProgressRing() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    // Inject SVG ring if not present
    if (!btn.querySelector('.progress-ring')) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'progress-ring');
      svg.setAttribute('width', '46');
      svg.setAttribute('height', '46');
      svg.setAttribute('viewBox', '0 0 46 46');

      const circleTrack = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circleTrack.setAttribute('class', 'progress-ring-track');
      circleTrack.setAttribute('cx', '23');
      circleTrack.setAttribute('cy', '23');
      circleTrack.setAttribute('r', '20');
      circleTrack.setAttribute('stroke', 'rgba(255, 255, 255, 0.12)');
      circleTrack.setAttribute('stroke-width', '2.5');
      circleTrack.setAttribute('fill', 'none');

      const circleProgress = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circleProgress.setAttribute('class', 'progress-ring-circle');
      circleProgress.setAttribute('id', 'scrollProgressCircle');
      circleProgress.setAttribute('cx', '23');
      circleProgress.setAttribute('cy', '23');
      circleProgress.setAttribute('r', '20');
      circleProgress.setAttribute('stroke', '#F07824');
      circleProgress.setAttribute('stroke-width', '2.5');
      circleProgress.setAttribute('stroke-dasharray', '125.66');
      circleProgress.setAttribute('stroke-dashoffset', '125.66');
      circleProgress.setAttribute('stroke-linecap', 'round');
      circleProgress.setAttribute('fill', 'none');

      svg.appendChild(circleTrack);
      svg.appendChild(circleProgress);
      btn.prepend(svg);
    }

    const circle = document.getElementById('scrollProgressCircle');
    const circumference = 2 * Math.PI * 20; // ~125.66

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPct = docHeight > 0 ? scrollTop / docHeight : 0;

          // Toggle visibility threshold
          if (scrollTop > 240) {
            btn.classList.add('show');
          } else {
            btn.classList.remove('show');
          }

          // Update SVG circumference offset
          if (circle) {
            const offset = circumference - scrollPct * circumference;
            circle.style.strokeDashoffset = `${Math.max(0, offset)}`;
          }

          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // 3. Buttery-Smooth Anchor Navigation Scrolling (Event-Delegated Site-Wide)
  // ==========================================================================
  function initSmoothScrollNavigation() {
    document.addEventListener('click', function (e) {
      const anchor = e.target.closest('a[href^="#"]:not([href="#"]):not([data-bs-toggle])');
      if (!anchor) return;

      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      let targetEl = null;
      try {
        targetEl = document.querySelector(targetId);
      } catch (err) {}

      if (targetEl) {
        e.preventDefault();
        const header = document.querySelector('.site-header');
        const headerOffset = header ? header.offsetHeight + 20 : 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });

        // Close mobile drawer if open
        const drawer = document.getElementById('navbarDrawer');
        const backdrop = document.getElementById('drawerBackdrop');
        if (drawer && drawer.classList.contains('is-open')) {
          drawer.classList.remove('is-open');
          if (backdrop) backdrop.classList.remove('is-active');
          document.body.classList.remove('drawer-open');
        }
      }
    });
  }

  // ==========================================================================
  // 4. Glassmorphism Sticky Navbar on Scroll
  // ==========================================================================
  function initStickyHeaderGlassmorphism() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 30) {
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
  // 5. Fluid Staggered Scroll Reveal Engine (IntersectionObserver)
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
  // 6. Ultra-Smooth Decelerated Counter Animation
  // ==========================================================================
  function initAnimatedStatsCounters() {
    const statsSection = document.querySelector('.stats-banner');
    const counters = document.querySelectorAll('.stat-num, .stat-counter, [data-counter-target]');
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
            counter.innerText = text;
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
  // 7. Magnetic CTA Buttons (Subtle Elastic Pull on Cursor)
  // ==========================================================================
  function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll(
      '.btn-magnetic, .btn-hero-primary, .btn-hero-secondary, .btn-industrial.btn-lg, #heroQuickQuoteBtn'
    );

    magneticBtns.forEach(btn => {
      btn.classList.add('btn-magnetic');

      btn.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - btnCenterX) * 0.22;
        const deltaY = (e.clientY - btnCenterY) * 0.22;

        this.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      });

      btn.addEventListener('mouseleave', function () {
        this.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // ==========================================================================
  // 8. Interactive 3D Perspective Tilt & Specular Cursor Spotlight
  // ==========================================================================
  function initCardSpotlightAndTilt() {
    const tiltCards = document.querySelectorAll(
      '.service-card, .process-step-card, .product-card, .oem-brand-card, .stat-box'
    );

    tiltCards.forEach(card => {
      card.classList.add('tilt-card');

      card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS variables for dynamic radial spotlight
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4.2;
        const rotateY = ((x - centerX) / centerX) * 4.2;

        this.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // ==========================================================================
  // 9. Satisfying Click Ripple Effect on Buttons
  // ==========================================================================
  function initButtonRippleFeedback() {
    const buttons = document.querySelectorAll('.btn-industrial, .btn-hero-primary, .btn-hero-secondary, .btn-outline-steel, .btn-magnetic, .header-icon-btn, .social-icon-btn, .footer-contact-icon');

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
  // 10. Hero Parallax Ambient Mesh Drift on Scroll
  // ==========================================================================
  function initHeroParallaxDepth() {
    const heroSection = document.querySelector('.hero-carousel-section');
    if (!heroSection) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          if (scrolled < 900) {
            const ambient = heroSection.querySelector('.hero-ambient-mesh');
            if (ambient) {
              ambient.style.transform = `translate3d(0, ${(scrolled * 0.16).toFixed(1)}px, 0)`;
            }
            const orb1 = heroSection.querySelector('.hero-ambient-orb-1');
            const orb2 = heroSection.querySelector('.hero-ambient-orb-2');
            if (orb1) orb1.style.transform = `translate3d(0, ${(scrolled * 0.22).toFixed(1)}px, 0)`;
            if (orb2) orb2.style.transform = `translate3d(0, ${(scrolled * -0.14).toFixed(1)}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  // ==========================================================================
  // 11. Mobile Touch Tap Feedback for Icons & Buttons
  // ==========================================================================
  function initMobileTouchFeedback() {
    if (!isTouchDevice) return;

    const touchTargets = document.querySelectorAll(
      '.header-icon-btn, .social-icon-btn, .footer-contact-icon, .btn-industrial, .btn-outline-steel, .filter-btn, .shop-filter-btn, .navbar-toggler'
    );

    touchTargets.forEach(el => {
      el.addEventListener('touchstart', function () {
        this.style.transform = 'scale(0.94)';
        this.style.transition = 'transform 0.12s ease';
      }, { passive: true });

      el.addEventListener('touchend', function () {
        setTimeout(() => {
          this.style.transform = '';
          this.style.transition = '';
        }, 160);
      }, { passive: true });

      el.addEventListener('touchcancel', function () {
        this.style.transform = '';
        this.style.transition = '';
      }, { passive: true });
    });
  }


  // ==========================================================================
  // 12. Interactive Industrial Plasma / Welding Sparks Canvas
  // ==========================================================================
  function initHeroSparksCanvas() {
    if (prefersReducedMotion) return;

    const heroContainer = document.querySelector('.hero-carousel-section, .hero-section-2, .hero-banner');
    if (!heroContainer) return;

    let canvas = heroContainer.querySelector('.hero-sparks-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'hero-sparks-canvas';
      canvas.id = 'heroSparksCanvas';
      canvas.setAttribute('aria-hidden', 'true');
      heroContainer.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    const maxParticles = window.innerWidth < 768 ? 28 : 55;
    let mouseX = -1000;
    let mouseY = -1000;
    let isHeroVisible = true;
    let animationFrameId = null;

    function resize() {
      width = heroContainer.clientWidth;
      height = heroContainer.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    heroContainer.addEventListener('mousemove', (e) => {
      const rect = heroContainer.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }, { passive: true });

    heroContainer.addEventListener('mouseleave', () => {
      mouseX = -1000;
      mouseY = -1000;
    });

    const sparkColors = [
      '#F07824',
      '#FFA866',
      '#FFCC80',
      '#FFFFFF',
      '#F59E0B'
    ];

    function createParticle(initialSpawn = false) {
      return {
        x: Math.random() * width,
        y: initialSpawn ? Math.random() * height : height + Math.random() * 20,
        vx: (Math.random() - 0.5) * 0.9,
        vy: -(1.2 + Math.random() * 2.4),
        size: 1.2 + Math.random() * 2.6,
        alpha: 0.35 + Math.random() * 0.65,
        color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
        decay: 0.003 + Math.random() * 0.007,
        oscillationSpeed: 0.03 + Math.random() * 0.05,
        oscillationAngle: Math.random() * Math.PI * 2
      };
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    function renderSparks() {
      if (!isHeroVisible || document.hidden) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Horizontal sinusoidal drift
        p.oscillationAngle += p.oscillationSpeed;
        p.x += p.vx + Math.sin(p.oscillationAngle) * 0.35;
        p.y += p.vy;
        p.alpha -= p.decay;

        // Subtle interactive mouse repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distSq = dx * dx + dy * dy;
        if (distSq < 14400 && distSq > 0) { // within 120px
          const dist = Math.sqrt(distSq);
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 3.5;
          p.y += (dy / dist) * force * 3.5;
        }

        // Draw spark with glowing aura
        if (p.alpha > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }

        // Respawn if dead or drifted off screen
        if (p.alpha <= 0 || p.y < -20 || p.x < -20 || p.x > width + 20) {
          particles[i] = createParticle(false);
        }
      }

      animationFrameId = requestAnimationFrame(renderSparks);
    }

    // Auto-pause when hero is scrolled out of view for zero performance overhead
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        isHeroVisible = entries[0].isIntersecting;
        if (isHeroVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(renderSparks);
        }
      }, { threshold: 0.05 });
      heroObserver.observe(heroContainer);
    }

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && isHeroVisible && !animationFrameId) {
        animationFrameId = requestAnimationFrame(renderSparks);
      }
    });

    animationFrameId = requestAnimationFrame(renderSparks);
  }

  // ==========================================================================
  // 13. CAD Holographic Laser Scanner & Tech HUD Reticles
  // ==========================================================================
  function initCadLaserScanner() {
    if (prefersReducedMotion) return;

    const targets = document.querySelectorAll(
      '.service-card.has-thumb .service-thumb-wrapper, .showcase-featured-stage, .cad-stage-viewport'
    );

    targets.forEach(wrapper => {
      // Injected Scan Beam
      if (!wrapper.querySelector('.cad-scan-beam')) {
        const beam = document.createElement('div');
        beam.className = 'cad-scan-beam';
        wrapper.appendChild(beam);
      }

      // Injected HUD Frame Corner Brackets
      if (!wrapper.querySelector('.cad-hud-frame')) {
        const hud = document.createElement('div');
        hud.className = 'cad-hud-frame';
        hud.innerHTML = '<span class="hud-corner tl"></span><span class="hud-corner tr"></span><span class="hud-corner bl"></span><span class="hud-corner br"></span>';
        wrapper.appendChild(hud);
      }

      // Injected Blueprint Grid Overlay
      if (!wrapper.querySelector('.cad-grid-overlay')) {
        const grid = document.createElement('div');
        grid.className = 'cad-grid-overlay';
        wrapper.appendChild(grid);
      }
    });
  }

})();
