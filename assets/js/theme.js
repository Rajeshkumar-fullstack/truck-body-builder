/**
 * PROJECT 69: TRUCK BODY BUILDER
 * Theme & Localization Management (Dark/Light Mode & RTL)
 */

(function () {
  'use strict';

  // Apply saved theme immediately before DOM content loads to avoid flashing
  const savedTheme = localStorage.getItem('truck_body_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const savedDir = localStorage.getItem('truck_body_dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);

  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initRtlToggle();
  });

  function initThemeToggle() {
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    if (!themeToggles.length) return;

    function updateIcons(theme) {
      themeToggles.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
          if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            btn.setAttribute('title', 'Switch to Light Mode');
            btn.setAttribute('aria-label', 'Switch to Light Mode');
          } else {
            icon.className = 'fas fa-moon';
            btn.setAttribute('title', 'Switch to Dark Mode');
            btn.setAttribute('aria-label', 'Switch to Dark Mode');
          }
        }
      });
    }

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateIcons(currentTheme);

    themeToggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('truck_body_theme', newTheme);
        updateIcons(newTheme);
      });
    });
  }

  function initRtlToggle() {
    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
    if (!rtlToggles.length) return;

    function updateRtlLabels(dir) {
      rtlToggles.forEach(btn => {
        const text = btn.querySelector('.rtl-text');
        if (text) {
          text.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
        }
        const title = dir === 'rtl' ? 'Switch to Left-to-Right (LTR)' : 'Switch to Right-to-Left (RTL)';
        btn.setAttribute('title', title);
        btn.setAttribute('aria-label', title);
      });
    }

    const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
    updateRtlLabels(currentDir);

    rtlToggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const activeDir = document.documentElement.getAttribute('dir');
        const newDir = activeDir === 'rtl' ? 'ltr' : 'rtl';
        
        document.documentElement.setAttribute('dir', newDir);
        localStorage.setItem('truck_body_dir', newDir);
        updateRtlLabels(newDir);
      });
    });
  }
})();
