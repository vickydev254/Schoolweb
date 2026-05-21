// ============================================
//  SANDUK LITTLE ANGELS ACADEMY - MAIN JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Active Nav Link ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Hamburger Menu ──
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ── Scroll-to-Top Button ──
  const scrollBtn = document.getElementById('scrollTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── Scroll Reveal ──
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

  // ── Gallery Lightbox ──
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightbox) {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const src = item.querySelector('img')?.src;
        if (src) {
          lightboxImg.src = src;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLB = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    lightboxClose?.addEventListener('click', closeLB);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });
  }

  // ── Admission Form ──
  const admissionForm = document.getElementById('admissionForm');
  if (admissionForm) {
    admissionForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = admissionForm.querySelector('.submit-btn');
      btn.textContent = 'Submitting…';
      btn.disabled = true;

      setTimeout(() => {
        admissionForm.style.display = 'none';
        const success = document.getElementById('formSuccess');
        if (success) success.style.display = 'block';
      }, 1200);
    });
  }

  // ── Contact Form ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('.submit-btn');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        contactForm.innerHTML = `
          <div style="text-align:center;padding:40px 20px;">
            <div style="font-size:3rem;margin-bottom:12px;">✅</div>
            <h3 style="color:var(--navy);margin-bottom:8px;">Message Received!</h3>
            <p style="color:var(--text-mid);">Thank you for reaching out. We'll get back to you within 24 hours.</p>
          </div>`;
      }, 1200);
    });
  }

  // ── Counter Animation ──
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current + suffix;
            if (current >= target) clearInterval(timer);
          }, 30);
          countObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => countObs.observe(c));
  }

});
