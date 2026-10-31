/**
 * Rotaract Club of ICBT - Greek Mythology Theme Interactive Scripts
 * Royal Crimson & Hellenic Beige Edition
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 0. Auto Active Navigation Item & Dropdown Detection
  const currentPath = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
  const navLinks = document.querySelectorAll('.temple-navbar .nav-link, .temple-navbar .dropdown-item');

  // Clear hardcoded active states to recompute cleanly
  navLinks.forEach(link => {
    link.classList.remove('active', 'current-page');
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkFile = href.split('/').pop().split('#')[0].toLowerCase();

    if (linkFile && (linkFile === currentPath || (currentPath === '' && linkFile === 'index.html'))) {
      link.classList.add('active', 'current-page');
      
      // If it's a dropdown item, also light up the parent dropdown toggle
      const parentDropdown = link.closest('.dropdown');
      if (parentDropdown) {
        const toggleBtn = parentDropdown.querySelector('.dropdown-toggle');
        if (toggleBtn) {
          toggleBtn.classList.add('active', 'current-page');
        }
      }
    }
  });

  // 1. Interactive Counter Animation on Scroll
  const counters = document.querySelectorAll('.stat-number');
  const counterSpeed = 60;

  const runCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const update = () => {
      const current = +counter.innerText.replace('+', '');
      const increment = Math.ceil(target / counterSpeed);
      if (current < target) {
        counter.innerText = Math.min(current + increment, target);
        setTimeout(update, 25);
      } else {
        counter.innerText = target + '+';
      }
    };
    update();
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => runCounter(counter));
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.hero-stats-ribbon') || document.querySelector('#stats');
  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  // 2. Events & Projects Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const artifactCards = document.querySelectorAll('.artifact-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      artifactCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Mosaic Gallery Lightbox Modal
  const lightboxModal = document.getElementById('greekLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const mosaicItems = document.querySelectorAll('.mosaic-item');

  if (lightboxModal && lightboxImg) {
    mosaicItems.forEach(item => {
      item.addEventListener('click', function () {
        const img = this.querySelector('img');
        const title = this.querySelector('.mosaic-title')?.innerText || 'Rotaract Chronicle';
        const tag = this.querySelector('.mosaic-tag')?.innerText || '';

        if (img) {
          lightboxImg.src = img.src;
          lightboxCaption.innerHTML = `<strong>${title}</strong> &bull; <span class="text-muted">${tag}</span>`;
          lightboxModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', function (e) {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // 4. Membership Form Interactive Submission
  const joinForm = document.getElementById('greekJoinForm');
  if (joinForm) {
    joinForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Inscribing into Scroll...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('🏛️ Hail, Noble Leader! Your enlistment has been inscribed into the Sacred Roll of the Rotaract Club of ICBT. Our Council of Archons shall connect with you swiftly.');
        joinForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }

  // 5. Contact Oracle Form Interactive Submission
  const contactForm = document.getElementById('greekContactForm');
  if (contactForm) {
    const statusBox = document.getElementById('contactFormStatus');
    const btnWhatsApp = document.getElementById('btnSendWhatsApp');
    const btnEmail = document.getElementById('btnSendEmail');

    // Helper to extract form data
    const getFormData = () => {
      const name = document.getElementById('contactName')?.value.trim() || '';
      const phone = document.getElementById('contactPhone')?.value.trim() || '';
      const email = document.getElementById('contactEmail')?.value.trim() || '';
      const message = document.getElementById('contactMessage')?.value.trim() || '';
      return { name, phone, email, message };
    };

    // Quick Action: Send directly to official WhatsApp (+94 74 086 0054)
    if (btnWhatsApp) {
      btnWhatsApp.addEventListener('click', function () {
        const { name, phone, email, message } = getFormData();
        let text = '🏛️ *Inquiry for Rotaract Club of ICBT*\n\n';
        if (name) text += `*Name:* ${name}\n`;
        if (email) text += `*Email:* ${email}\n`;
        if (phone) text += `*Phone:* ${phone}\n`;
        if (message) text += `*Message:* ${message}\n`;
        if (!message && !name) {
          text += 'Hello Rotaract Club of ICBT, I would like to inquire about membership and club activities.';
        }
        window.open(`https://wa.me/94740860054?text=${encodeURIComponent(text)}`, '_blank');
      });
    }

    // Quick Action: Open default email client targeting icbtrotaract@gmail.com
    if (btnEmail) {
      btnEmail.addEventListener('click', function () {
        const { name, phone, email, message } = getFormData();
        const subject = encodeURIComponent(`Missive from ${name || 'Prospective Member / Partner'} - Rotaract ICBT`);
        const body = encodeURIComponent(
          `Noble Council of Rotaract Club of ICBT,\n\n` +
          `Sender Name: ${name || 'Not provided'}\n` +
          `Email: ${email || 'Not provided'}\n` +
          `Phone: ${phone || 'Not provided'}\n\n` +
          `Message:\n${message || 'Greetings! I would like to connect with your club.'}\n`
        );
        window.location.href = `mailto:icbtrotaract@gmail.com?subject=${subject}&body=${body}`;
      });
    }

    // Main Form Submission (Saves message to local server /api/contact)
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      const data = getFormData();

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Dispatching via Hermes...';
      submitBtn.disabled = true;

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await res.json().catch(() => ({}));

        if (statusBox) {
          statusBox.style.display = 'block';
          statusBox.innerHTML = `
            <div class="alert alert-success bg-opacity-25 bg-success text-white border-success p-3 rounded">
              <h6 class="fw-bold mb-1"><i class="fas fa-check-circle me-1"></i> Sacred Missive Inscribed!</h6>
              <p class="small mb-2">Thank you, <strong>${data.name || 'Noble Leader'}</strong>. Your inquiry has been stored.</p>
              <div class="d-flex gap-2">
                <a href="https://wa.me/94740860054?text=${encodeURIComponent(`Hi, I just submitted an inquiry on your website: ${data.name} (${data.email})`)}" target="_blank" class="btn btn-sm btn-success">
                  <i class="fab fa-whatsapp me-1"></i> Follow up on WhatsApp
                </a>
              </div>
            </div>
          `;
        } else {
          alert('✉️ Missive received! We shall dispatch our response across the Aegean promptly.');
        }

        contactForm.reset();
      } catch (err) {
        // Fallback for static hosting without server.js
        console.warn('Backend /api/contact not responding, falling back to client alert', err);
        if (statusBox) {
          statusBox.style.display = 'block';
          statusBox.innerHTML = `
            <div class="alert alert-success bg-opacity-25 bg-success text-white border-success p-3 rounded">
              <h6 class="fw-bold mb-1"><i class="fas fa-check-circle me-1"></i> Sacred Missive Dispatched!</h6>
              <p class="small mb-0">Your message is ready. You can also contact us directly at <a href="mailto:icbtrotaract@gmail.com" class="text-white text-decoration-underline">icbtrotaract@gmail.com</a> or WhatsApp.</p>
            </div>
          `;
        } else {
          alert('✉️ Missive received! We shall dispatch our response across the Aegean promptly.');
        }
        contactForm.reset();
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // 6. Smooth Scroll Offset for Sticky Temple Frieze Navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        const navMenu = document.getElementById('navbarMenu');
        if (navMenu && navMenu.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  // 7. Auto close mobile navbar drawer on mobile when clicking outside or tapping a link
  const navMenu = document.getElementById('navbarMenu');
  if (navMenu) {
    document.addEventListener('click', function (e) {
      if (window.innerWidth < 992 && navMenu.classList.contains('show')) {
        const isClickInsideNav = navMenu.contains(e.target) || e.target.closest('.navbar-toggler');
        if (!isClickInsideNav || (e.target.closest('.nav-link:not(.dropdown-toggle)') || e.target.closest('.dropdown-item') || e.target.closest('.btn-nav-silver'))) {
          const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  }
});

