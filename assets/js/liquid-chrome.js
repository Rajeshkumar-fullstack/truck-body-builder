/**
 * TRUCK BODY BUILDER – PREMIUM 3D LOGO REVEAL ANIMATION CONTROLLER
 * 60 FPS Fluid Particle Dynamics, Specular Chrome Shaders & Industrial Light Streaks
 * Duration: ~4.8s sequence (Played once per session)
 */

(function () {
  'use strict';

  // Check if reduced motion is requested
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Session storage check: play once per browser session
  const hasPlayedSession = sessionStorage.getItem('tbb_logo_reveal_played');

  // Check if we are on index.html (or root)
  const isHomePage = window.location.pathname.endsWith('index.html') || 
                     window.location.pathname.endsWith('/') || 
                     window.location.pathname === '';

  document.addEventListener('DOMContentLoaded', () => {
    const introEl = document.getElementById('liquidChromeIntro');
    if (!introEl) return;

    if (!isHomePage || hasPlayedSession || prefersReducedMotion) {
      introEl.style.display = 'none';
      document.body.classList.remove('intro-locked');
      return;
    }

    // Lock page scroll during intro
    document.body.classList.add('intro-locked');

    // Run 3D Logo Reveal Animation Sequence
    init3DLogoRevealAnimation(introEl);
  });

  function init3DLogoRevealAnimation(introEl) {
    const canvas = document.getElementById('liquidChromeCanvas');
    const skipBtn = document.getElementById('introSkipBtn');
    const emblemSvg = document.getElementById('chromeEmblemSvg');
    const lightSweep = document.getElementById('chromeLightSweep');
    const typography = document.getElementById('chromeTypography');
    const subtitle = document.getElementById('chromeSubtitle');
    const chromeFilter = document.getElementById('liquidTurbulence');

    let animationFrameId = null;
    let startTime = null;
    const duration = 4800; // 4.8s total sequence
    let isTerminated = false;

    // Canvas context setup for particle simulation
    let ctx = null;
    let width = 0;
    let height = 0;

    if (canvas && canvas.getContext) {
      ctx = canvas.getContext('2d');
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
    }

    function resizeCanvas() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      if (ctx) ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    // Generate assembling metallic chrome & orange particles
    const particles = [];
    const particleCount = 36;
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const dist = 240 + Math.random() * 320;
      particles.push({
        origDist: dist,
        angle: angle,
        orbitSpeed: (0.5 + Math.random() * 0.8) * (i % 2 === 0 ? 1 : -1),
        radius: 8 + Math.random() * 18,
        currentRadius: 0,
        x: 0,
        y: 0,
        hue: i % 3 === 0 ? 'orange' : 'chrome'
      });
    }

    // Skip Intro handler
    function endIntro() {
      if (isTerminated) return;
      isTerminated = true;

      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);

      introEl.classList.add('fade-out');
      sessionStorage.setItem('tbb_logo_reveal_played', 'true');

      setTimeout(() => {
        introEl.style.display = 'none';
        document.body.classList.remove('intro-locked');
      }, 700);
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', endIntro);
    }

    // Main 60 FPS Render & Timeline Loop
    function render(timestamp) {
      if (isTerminated) return;
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // ======================================================================
      // 3D Reveal Timeline Sequence:
      // 1. 0.0s - 0.6s: Deep Steel background & ambient caustics
      // 2. 0.3s - 1.3s: Metallic orange light streak travels across screen
      // 3. 0.8s - 2.2s: Chrome particles swarm & assemble into emblem position
      // 4. 1.6s - 3.0s: Heavy truck body & gear outline forms via metallic morph
      // 5. 2.6s - 3.8s: Typography TRUCK BODY BUILDER appears with chrome shine
      // 6. 3.4s - 4.1s: Specular orange light sweep across lettering
      // 7. 4.0s - 4.8s: Subtle logo amber glow, then smooth fade to hero
      // ======================================================================

      const centerX = width / 2;
      const centerY = height / 2 - (width < 720 ? 30 : 40);

      if (ctx && elapsed < 4000) {
        ctx.clearRect(0, 0, width, height);

        // Ambient metallic radial glow
        const ambRadius = Math.min(width, height) * 0.5;
        const ambGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, ambRadius);
        ambGrad.addColorStop(0, 'rgba(240, 120, 36, 0.07)');
        ambGrad.addColorStop(0.45, 'rgba(23, 35, 47, 0.22)');
        ambGrad.addColorStop(1, 'rgba(11, 17, 23, 0)');
        ctx.fillStyle = ambGrad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ambRadius, 0, Math.PI * 2);
        ctx.fill();

        // Step 2: Metallic Orange Light Streak across screen (0.3s to 1.3s)
        if (elapsed >= 300 && elapsed <= 1400) {
          const progress = (elapsed - 300) / 1100;
          const streakX = -100 + progress * (width + 250);
          const streakY = centerY - 15;
          const streakLen = 160 + Math.sin(progress * Math.PI) * 140;

          const streakGrad = ctx.createLinearGradient(streakX - streakLen, streakY, streakX, streakY);
          streakGrad.addColorStop(0, 'rgba(240, 120, 36, 0)');
          streakGrad.addColorStop(0.5, 'rgba(240, 120, 36, 0.75)');
          streakGrad.addColorStop(0.85, 'rgba(255, 185, 130, 0.95)');
          streakGrad.addColorStop(1, '#FFFFFF');

          // Main cutting beam
          ctx.strokeStyle = streakGrad;
          ctx.lineWidth = 4;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(streakX - streakLen, streakY);
          ctx.lineTo(streakX, streakY);
          ctx.stroke();

          // Outer orange aura
          ctx.strokeStyle = 'rgba(240, 120, 36, 0.35)';
          ctx.lineWidth = 14;
          ctx.beginPath();
          ctx.moveTo(streakX - streakLen * 0.7, streakY);
          ctx.lineTo(streakX, streakY);
          ctx.stroke();
        }

        // Step 3: Chrome Metal Particles Assembling (0.8s to 2.4s)
        if (elapsed > 800) {
          const flowProgress = Math.min(1, (elapsed - 800) / 1600);

          particles.forEach(p => {
            const currentDist = Math.max(0, p.origDist * (1 - Math.pow(flowProgress, 1.8)));
            const currentAngle = p.angle + flowProgress * p.orbitSpeed * Math.PI * 1.2;

            p.x = centerX + Math.cos(currentAngle) * currentDist;
            p.y = centerY + Math.sin(currentAngle) * currentDist * 0.72;
            p.currentRadius = p.radius * (1 - flowProgress * 0.7);

            if (p.currentRadius > 0.4) {
              const pGrad = ctx.createRadialGradient(
                p.x - p.currentRadius * 0.3, p.y - p.currentRadius * 0.3, 0,
                p.x, p.y, p.currentRadius
              );

              if (p.hue === 'orange') {
                pGrad.addColorStop(0, '#FFFFFF');
                pGrad.addColorStop(0.35, '#FFA866');
                pGrad.addColorStop(0.7, '#F07824');
                pGrad.addColorStop(1, '#7A3200');
              } else {
                pGrad.addColorStop(0, '#FFFFFF');
                pGrad.addColorStop(0.3, '#E2E8F0');
                pGrad.addColorStop(0.65, '#94A3B8');
                pGrad.addColorStop(1, '#17232F');
              }

              ctx.fillStyle = pGrad;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.currentRadius, 0, Math.PI * 2);
              ctx.fill();

              // Specular shine glint
              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.beginPath();
              ctx.arc(p.x - p.currentRadius * 0.3, p.y - p.currentRadius * 0.3, p.currentRadius * 0.2, 0, Math.PI * 2);
              ctx.fill();
            }
          });
        }
      }

      // Step 4: Metallic Transformation & Liquid Specular Settle (1.4s to 3.0s)
      if (chromeFilter) {
        if (elapsed < 1400) {
          chromeFilter.setAttribute('baseFrequency', '0.07');
        } else if (elapsed < 3000) {
          const settleProgress = (elapsed - 1400) / 1600;
          const currentFreq = 0.07 * (1 - Math.pow(settleProgress, 2));
          chromeFilter.setAttribute('baseFrequency', Math.max(0.0001, currentFreq).toFixed(4));
        } else {
          chromeFilter.setAttribute('baseFrequency', '0.0001');
        }
      }

      // Emblem Scale & Reveal
      if (emblemSvg) {
        if (elapsed < 1000) {
          emblemSvg.style.opacity = '0';
          emblemSvg.style.transform = 'scale(0.55) rotate(-12deg)';
        } else if (elapsed < 2800) {
          const progress = Math.min(1, (elapsed - 1000) / 1800);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          emblemSvg.style.opacity = String(progress);
          emblemSvg.style.transform = `scale(${0.55 + 0.45 * easeOut}) rotate(${-12 * (1 - easeOut)}deg)`;
        } else {
          emblemSvg.style.opacity = '1';
          emblemSvg.style.transform = 'scale(1) rotate(0deg)';
        }
      }

      // Step 5: Typography TRUCK BODY BUILDER Reveal (2.4s to 3.6s)
      if (typography) {
        if (elapsed < 2200) {
          typography.style.opacity = '0';
          typography.style.transform = 'translateY(18px)';
        } else if (elapsed < 3600) {
          const textProgress = Math.min(1, (elapsed - 2200) / 1400);
          const ease = 1 - Math.pow(1 - textProgress, 3);
          typography.style.opacity = String(textProgress);
          typography.style.transform = `translateY(${18 * (1 - ease)}px)`;
        } else {
          typography.style.opacity = '1';
          typography.style.transform = 'translateY(0)';
        }
      }

      // Step 6: Tagline Reveal (3.2s)
      if (subtitle && elapsed >= 3200) {
        subtitle.classList.add('revealed');
      }

      // Step 6: Radiant Orange Light Sweep across lettering (3.6s)
      if (lightSweep && elapsed >= 3600 && !lightSweep.classList.contains('sweeping')) {
        lightSweep.classList.add('sweeping');
      }

      // Step 7: Complete sequence & smooth fade out
      if (elapsed >= duration) {
        endIntro();
        return;
      }

      animationFrameId = requestAnimationFrame(render);
    }

    // Start 60fps sequence
    animationFrameId = requestAnimationFrame(render);
  }
})();
