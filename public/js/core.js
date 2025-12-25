// VibeJS Core - Main JavaScript functionality
// Handles: i18n, theme, modal, partial loading

// ========== Utility Functions ==========
async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching JSON:', error);
    return null;
  }
}

async function fetchHTML(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error('Error fetching HTML:', error);
    return null;
  }
}

// ========== Component Loading (Partials) ==========
async function loadComponent(selector, url) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element not found: ${selector}`);
    return;
  }

  // Check sessionStorage cache
  const cacheKey = `component_${url}`;
  const cached = sessionStorage.getItem(cacheKey);
  
  if (cached) {
    element.innerHTML = cached;
    initializeComponentEvents(element);
    return;
  }

  // Fetch and cache
  const html = await fetchHTML(url);
  if (html) {
    element.innerHTML = html;
    sessionStorage.setItem(cacheKey, html);
    initializeComponentEvents(element);
  }
}

function initializeComponentEvents(element) {
  // Re-attach event listeners for dynamically loaded content
  const langToggle = element.querySelector('#langToggle');
  const themeToggle = element.querySelector('#themeToggle');
  const hamburgerBtn = element.querySelector('#hamburgerBtn');
  const welcomeCloseBtn = element.querySelector('#welcomeCloseBtn');

  if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  if (welcomeCloseBtn) {
    welcomeCloseBtn.addEventListener('click', closeWelcomeModal);
  }

  // If welcome modal was loaded, check if we should show it
  if (element.querySelector('#welcomeModal')) {
    // Small delay to ensure modal is in DOM
    setTimeout(() => {
      showWelcomeModal();
    }, 100);
  }
}

// ========== Internationalization (i18n) ==========
let i18nData = {};
let currentLang = 'en';

async function setLanguage(lang) {
  currentLang = lang;
  i18nData = await fetchJSON(`/i18n/${lang}.json`);
  
  if (!i18nData) {
    console.error('Failed to load language data');
    return;
  }

  // Set document direction
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = getNestedTranslation(key);
    
    if (translation !== undefined) {
      // Check if element has data-i18n-attr for attribute translation
      const attr = element.getAttribute('data-i18n-attr');
      if (attr) {
        element.setAttribute(attr, translation);
      } else {
        element.textContent = translation;
      }
    }
  });

  // Save preference
  localStorage.setItem('vibe_lang', lang);
  
  // Update language toggle button text
  updateLanguageToggle();
}

function getNestedTranslation(key) {
  const parts = key.split('.');
  let value = i18nData;
  
  for (const part of parts) {
    if (value && typeof value === 'object') {
      value = value[part];
    } else {
      return undefined;
    }
  }
  
  return value;
}

function updateLanguageToggle() {
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.textContent = currentLang === 'ar' ? 'EN' : 'ع';
    langToggle.setAttribute('aria-label', 
      currentLang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'
    );
  }
}

async function toggleLanguage() {
  const newLang = currentLang === 'ar' ? 'en' : 'ar';
  await setLanguage(newLang);
}

// ========== Theme Management ==========
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  localStorage.setItem('vibe_theme', theme);
  updateThemeToggle(theme);
}

function updateThemeToggle(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', 
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  applyTheme(isDark ? 'light' : 'dark');
}

// ========== Mobile Menu Management ==========
function toggleMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navbarNav = document.querySelector('.navbar-nav');
  const navbar = document.querySelector('.navbar');
  
  if (!hamburgerBtn || !navbarNav) return;
  
  hamburgerBtn.classList.toggle('active');
  navbarNav.classList.toggle('open');
  navbar.classList.toggle('menu-open');
  
  // Prevent body scroll when menu is open
  if (navbarNav.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const navbar = document.querySelector('.navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navbarNav = document.querySelector('.navbar-nav');
  
  if (!navbar || !hamburgerBtn || !navbarNav) return;
  
  if (navbarNav.classList.contains('open') && 
      !navbar.contains(e.target) && 
      !hamburgerBtn.contains(e.target)) {
    toggleMobileMenu();
  }
});

// Close mobile menu when clicking on a link
document.addEventListener('click', (e) => {
  const link = e.target.closest('.navbar-nav a');
  if (link && window.innerWidth <= 768) {
    toggleMobileMenu();
  }
});

// ========== Welcome Modal Management ==========
let countdownInterval = null;

function showWelcomeModal() {
  const shown = localStorage.getItem('vibe_welcome_shown');
  if (shown === 'true') return;

  const modal = document.getElementById('welcomeModal');
  if (!modal) return;

  // Show modal with animation
  setTimeout(() => {
    modal.classList.add('open');
    startCountdown();
  }, 500);

  // Close button
  const closeBtn = document.getElementById('welcomeCloseBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeWelcomeModal);
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeWelcomeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeWelcomeModal();
    }
  });
}

function startCountdown() {
  let seconds = 10;
  const countdownElement = document.getElementById('countdown');
  if (!countdownElement) return;

  countdownElement.textContent = seconds;

  countdownInterval = setInterval(() => {
    seconds--;
    if (countdownElement) {
      countdownElement.textContent = seconds;
    }

    if (seconds <= 0) {
      clearInterval(countdownInterval);
      closeWelcomeModal();
    }
  }, 1000);
}

function closeWelcomeModal() {
  const modal = document.getElementById('welcomeModal');
  if (modal) {
    modal.classList.remove('open');
    localStorage.setItem('vibe_welcome_shown', 'true');
    
    // Clear countdown if still running
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }
}

// Legacy function for backward compatibility
function showIntroModal() {
  showWelcomeModal();
}

function closeIntroModal() {
  closeWelcomeModal();
}

// ========== Initialization ==========
async function initializeApp() {
  console.log('🚀 Initializing VibeJS...');

  // Load components (navbar, footer, and welcome modal)
  await Promise.all([
    loadComponent('#nav-placeholder', '/components/navbar.html'),
    loadComponent('#footer-placeholder', '/components/footer.html'),
    loadComponent('#welcome-modal-placeholder', '/components/welcome-modal.html')
  ]);

  // Detect and set language
  const savedLang = localStorage.getItem('vibe_lang');
  const browserLang = navigator.language.split('-')[0];
  const defaultLang = savedLang || (browserLang === 'ar' ? 'ar' : 'en');
  await setLanguage(defaultLang);

  // Apply saved theme
  const savedTheme = localStorage.getItem('vibe_theme') || 'light';
  applyTheme(savedTheme);

  // Show welcome modal if first visit
  showWelcomeModal();

  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Initialize scroll animations
  initScrollAnimations();

  console.log('✅ VibeJS initialized successfully');
}

// ========== Scroll Animations ==========
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  document.querySelectorAll('.card, .section > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

// ========== Event Listeners ==========
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    // Refresh language when page becomes visible again
    setLanguage(currentLang);
  }
});

// Export functions for use in other scripts
window.VibeJS = {
  setLanguage,
  toggleLanguage,
  applyTheme,
  toggleTheme,
  showIntroModal,
  closeIntroModal,
  showWelcomeModal,
  closeWelcomeModal,
  getNestedTranslation,
  toggleMobileMenu
};