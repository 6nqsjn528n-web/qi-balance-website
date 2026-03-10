/* ============================================================
   Qi Balance Healing & Massage – main.js
   ============================================================ */

(function () {
  'use strict';

  // ── DOM refs ──────────────────────────────────────────────
  const header      = document.getElementById('site-header');
  const hamburger   = document.getElementById('hamburger');
  const nav         = document.getElementById('main-nav');
  const backToTop   = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  // ── Sticky header + scroll behaviour ─────────────────────
  function onScroll () {
    const scrolled = window.scrollY > 30;
    header.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // ── Hamburger menu toggle ─────────────────────────────────
  hamburger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close nav on outside click
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !hamburger.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // ── Active nav link highlight on scroll ──────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink () {
    let current = '';
    sections.forEach(function (section) {
      const top = section.offsetTop - 90;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ── Smooth scroll for anchor links (iOS Safari polyfill) ─
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ── Scroll reveal animations ──────────────────────────────
  const revealEls = document.querySelectorAll(
    '.service-card, .testimonial-card, .about-content, .about-img-col, ' +
    '.contact-info, .contact-form-col, .intro-item, .section-header'
  );

  revealEls.forEach(function (el, i) {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(function (el) { observer.observe(el); });

  // ── Contact form (demo – shows success message) ───────────
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate async send
      setTimeout(function () {
        contactForm.reset();
        btn.textContent = 'Send Message';
        btn.disabled = false;
        formSuccess.style.display = 'block';
        setTimeout(function () {
          formSuccess.style.display = 'none';
        }, 5000);
      }, 1200);
    });
  }

  // ── Hero parallax (subtle, desktop only) ─────────────────
  const heroOverlay = document.querySelector('.hero-overlay');
  if (heroOverlay && window.innerWidth > 768) {
    window.addEventListener('scroll', function () {
      const scrollY = window.scrollY;
      heroOverlay.style.transform = 'translateY(' + scrollY * 0.3 + 'px)';
    }, { passive: true });
  }

  // ── Year in footer (auto-update) ─────────────────────────
  const yearSpans = document.querySelectorAll('.footer-bottom p');
  yearSpans.forEach(function (el) {
    el.innerHTML = el.innerHTML.replace(/2026/, new Date().getFullYear());
  });

})();
