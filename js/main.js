/* ============================================================
   BITCOIN 444 — MAIN JAVASCRIPT
   Navigation, Accordions, Tabs, Scroll Spy, Animations
   ============================================================ */

'use strict';

/* ── DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDropdowns();
  initThemeToggle();
  initBtcPrice();
  initSectionTabs();
  initScrollSpy();
  initAccordions();
  initWalletTabs();
  initExchangeToggles();
  initScrollReveal();
  initSmoothScroll();
});

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    // Prevent body scroll when menu open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });
}

function closeMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenu) return;
  mobileMenu.classList.remove('open');
  if (hamburger) {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
}

// Called from mobile menu links
window.closeMenu = closeMobileMenu;

/* ============================================================
   DESKTOP DROPDOWNS
   ============================================================ */
function initDropdowns() {
  // Dropdowns are hover-only via CSS (:hover on li).
  // This function only handles keyboard accessibility.
  const dropdownItems = document.querySelectorAll('.nav-links > li');

  dropdownItems.forEach(item => {
    const btn = item.querySelector('.nav-btn');
    const dropdown = item.querySelector('.dropdown');
    if (!btn || !dropdown) return;

    // Keyboard: Enter/Space opens, Escape closes
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = item.classList.contains('open');
        item.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(!isOpen));
      }
      if (e.key === 'Escape') {
        item.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  });
}

/* ============================================================
   THEME TOGGLE (Dark / Light)
   ============================================================ */
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const root = document.documentElement;
  const STORAGE_KEY = 'btc444-theme';

  function syncAria() {
    const isLight = root.getAttribute('data-theme') === 'light';
    btn.setAttribute('aria-checked', String(isLight));
  }

  // Restore saved preference
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light') root.setAttribute('data-theme', 'light');
  syncAria();

  btn.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem(STORAGE_KEY, 'light');
    }
    syncAria();
  });
}

/* ============================================================
   LIVE BTC PRICE
   ============================================================ */
function initBtcPrice() {
  const el = document.getElementById('btcPriceValue');
  if (!el) return;

  const CACHE_KEY = 'btc444-price';
  const CACHE_TTL = 60 * 1000; // 1 minute

  function formatPrice(n) {
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  function setPrice(val) {
    el.textContent = formatPrice(val);
  }

  async function fetchPrice() {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
        { cache: 'no-store' }
      );
      if (!res.ok) throw new Error('fetch failed');
      const data = await res.json();
      const price = data?.bitcoin?.usd;
      if (!price) throw new Error('no price');
      setPrice(price);
      localStorage.setItem(CACHE_KEY, JSON.stringify({ price, ts: Date.now() }));
    } catch {
      // On error, try cached value
      try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        if (cached.price) setPrice(cached.price);
      } catch { /* silent */ }
    }
  }

  // Try cache first for instant display
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    if (cached.price && Date.now() - cached.ts < CACHE_TTL) {
      setPrice(cached.price);
    }
  } catch { /* silent */ }

  // Fetch fresh price
  fetchPrice();

  // Refresh every 60 seconds
  setInterval(fetchPrice, 60 * 1000);
}

/* ============================================================
   SECTION TABS + SCROLL SPY
   ============================================================ */
function initSectionTabs() {
  const tabs = document.querySelectorAll('.section-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const href = tab.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = getNavOffset();
          const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[data-tab]');
  const tabs = document.querySelectorAll('.section-tab');
  if (!sections.length || !tabs.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-tab');
          tabs.forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-section') === sectionId);
          });
          // Scroll active tab into view on mobile
          const activeTab = document.querySelector(`.section-tab[data-section="${sectionId}"]`);
          if (activeTab) {
            activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
      });
    },
    {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach(section => observer.observe(section));
}

function getNavOffset() {
  const nav = document.querySelector('nav');
  return nav ? nav.offsetHeight : 64;
}

/* ============================================================
   ACCORDIONS (Step Cards)
   ============================================================ */
function initAccordions() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others (optional: comment out for multi-open)
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
        }
      });

      // Toggle this one
      item.classList.toggle('open', !isOpen);

      // Animate body
      const body = item.querySelector('.accordion-body');
      if (body && !isOpen) {
        body.classList.add('animating');
        setTimeout(() => body.classList.remove('animating'), 300);
      }
    });

    // Keyboard support
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
}

/* ============================================================
   WALLET TABS
   ============================================================ */
function initWalletTabs() {
  const tabs = document.querySelectorAll('.wallet-tab');
  const panels = document.querySelectorAll('.wallet-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ============================================================
   EXCHANGE CARD TOGGLES
   ============================================================ */
function initExchangeToggles() {
  const toggles = document.querySelectorAll('.exchange-toggle');
  const allCards = document.querySelectorAll('.exchange-card');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const card = toggle.closest('.exchange-card');
      if (!card) return;

      const isOpen = card.classList.contains('open');

      // Close all cards first (accordion: only one open at a time)
      allCards.forEach(c => {
        c.classList.remove('open');
        const lbl = c.querySelector('.toggle-label');
        if (lbl) lbl.textContent = 'Show more details';
      });

      // If it wasn't open, open it now
      if (!isOpen) {
        card.classList.add('open');
        const labelEl = toggle.querySelector('.toggle-label');
        if (labelEl) labelEl.textContent = 'Show less';
      }
    });
  });
}

/* ============================================================
   SCROLL REVEAL (Intersection Observer)
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    },
    {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    }
  );

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   SMOOTH SCROLL (for anchor links not handled by tabs)
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip section tabs (handled separately)
    if (anchor.classList.contains('section-tab')) return;

    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      closeMobileMenu();

      // Use scrollIntoView — scroll-padding-top on html handles the nav offset
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ============================================================
   UTILITY: Debounce
   ============================================================ */
function debounce(fn, delay = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
