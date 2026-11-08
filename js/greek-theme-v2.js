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

  // 5. Real-Life Sacred Missive & Contact Oracle Form Engine (FormSubmit API to rotaracticbt@gmail.com)
  const setupRealLifeContactForm = (config) => {
    const form = document.getElementById(config.formId);
    if (!form) return;

    const statusBox = document.getElementById(config.statusId);
    const btnWhatsApp = document.getElementById(config.waBtnId);
    const btnEmail = document.getElementById(config.mailBtnId);

    const getFormData = () => {
      const name = document.getElementById(config.nameId)?.value.trim() || '';
      const phone = document.getElementById(config.phoneId)?.value.trim() || '';
      const email = document.getElementById(config.emailId)?.value.trim() || '';
      const message = document.getElementById(config.messageId)?.value.trim() || '';
      return { name, phone, email, message };
    };

    // Quick Action: Send directly to official WhatsApp (+94 74 086 0054)
    if (btnWhatsApp) {
      btnWhatsApp.addEventListener('click', function () {
        const { name, phone, email, message } = getFormData();
        let text = '🏛️ *Inquiry for Rotaract Club of ICBT*\n\n';
        if (name) text += `*Noble Name:* ${name}\n`;
        if (email) text += `*Email:* ${email}\n`;
        if (phone) text += `*Phone:* ${phone}\n`;
        if (message) text += `*Message:* ${message}\n`;
        if (!message && !name) {
          text += 'Hello Rotaract Club of ICBT, I would like to inquire about membership, partnerships, or club activities.';
        }
        window.open(`https://wa.me/94740860054?text=${encodeURIComponent(text)}`, '_blank');
      });
    }

    // Quick Action: Open default email client targeting rotaracticbt@gmail.com
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
        window.location.href = `mailto:rotaracticbt@gmail.com?subject=${subject}&body=${body}`;
      });
    }

    // Real-Life Form Submission Engine via FormSubmit AJAX API
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      const data = getFormData();

      if (!data.name || !data.email || !data.message) {
        alert('Please fill in your Name, Email, and Message.');
        return;
      }

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Dispatching Sacred Missive...';
      submitBtn.disabled = true;

      try {
        const payload = {
          name: data.name,
          email: data.email,
          phone: data.phone || 'Not provided',
          message: data.message,
          _subject: `New Sacred Missive from ${data.name} via racicbt.org`,
          _template: 'table',
          _captcha: 'false'
        };

        const res = await fetch('https://formsubmit.co/ajax/rotaracticbt@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await res.json().catch(() => ({}));

        if (statusBox) {
          statusBox.style.display = 'block';
          const safeName = data.name.replace(/[&<>'"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[c]));
          const safeEmail = data.email.replace(/[&<>'"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[c]));

          statusBox.innerHTML = `
            <div class="alert alert-success border-0 text-white p-4 rounded-3 shadow-lg mt-3" style="background: linear-gradient(135deg, rgba(25, 135, 84, 0.95), rgba(15, 81, 50, 0.95)); border-left: 4px solid #ffffff !important;">
              <div class="d-flex align-items-center gap-2 mb-2">
                <i class="fas fa-check-circle fs-4 text-warning"></i>
                <h6 class="fw-bold mb-0 text-white" style="font-family: 'Cinzel', serif; font-size: 1.15rem;">Sacred Missive Dispatched!</h6>
              </div>
              <p class="small mb-3 text-light">
                Thank you, <strong>${safeName}</strong>. Your inquiry has been transmitted directly to the official inbox of the Rotaract Club of ICBT (<strong>rotaracticbt@gmail.com</strong>). The Council of Archons will review your missive and respond to <strong>${safeEmail}</strong> swiftly.
              </p>
              <div class="d-flex flex-wrap gap-2 pt-2 border-top border-light border-opacity-25">
                <a href="https://wa.me/94740860054?text=${encodeURIComponent(`Hi, I just submitted an inquiry on your website: ${data.name} (${data.email})`)}" target="_blank" class="btn btn-sm btn-light fw-bold text-success">
                  <i class="fab fa-whatsapp me-1 text-success"></i> Instant Follow-Up on WhatsApp
                </a>
                <button type="button" class="btn btn-sm btn-outline-light" onclick="this.closest('.alert').remove()">
                  Dismiss
                </button>
              </div>
            </div>
          `;
          statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          alert(`🏛️ Sacred Missive Dispatched! Thank you, ${data.name}. Your message has been sent to rotaracticbt@gmail.com.`);
        }

        form.reset();
      } catch (err) {
        console.error('Form submission error:', err);
        if (statusBox) {
          statusBox.style.display = 'block';
          statusBox.innerHTML = `
            <div class="alert alert-warning border-0 text-white p-3 rounded-3 mt-3" style="background: rgba(255, 193, 7, 0.2); border-left: 4px solid #ffc107 !important;">
              <h6 class="fw-bold mb-1 text-warning"><i class="fas fa-exclamation-triangle me-1"></i> Transmission Notice</h6>
              <p class="small mb-2 text-light">If your browser or network prevented the automated dispatch, please send your message directly via one of our official channels below:</p>
              <div class="d-flex flex-wrap gap-2">
                <a href="https://wa.me/94740860054?text=${encodeURIComponent(`Inquiry from ${data.name} (${data.email}): ${data.message}`)}" target="_blank" class="btn btn-sm btn-success">
                  <i class="fab fa-whatsapp me-1"></i> Send via WhatsApp
                </a>
                <a href="mailto:rotaracticbt@gmail.com?subject=${encodeURIComponent(`Inquiry from ${data.name}`)}&body=${encodeURIComponent(data.message)}" class="btn btn-sm btn-outline-light">
                  <i class="fas fa-envelope me-1"></i> Send via Email
                </a>
              </div>
            </div>
          `;
        }
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  };

  // Setup Contact Page Form
  setupRealLifeContactForm({
    formId: 'greekContactForm',
    statusId: 'contactFormStatus',
    nameId: 'contactName',
    phoneId: 'contactPhone',
    emailId: 'contactEmail',
    messageId: 'contactMessage',
    waBtnId: 'btnSendWhatsApp',
    mailBtnId: 'btnSendEmail'
  });

  // Setup Homepage Contact Form
  setupRealLifeContactForm({
    formId: 'greekIndexContactForm',
    statusId: 'indexContactFormStatus',
    nameId: 'indexContactName',
    phoneId: 'indexContactPhone',
    emailId: 'indexContactEmail',
    messageId: 'indexContactMessage',
    waBtnId: 'btnIndexSendWhatsApp',
    mailBtnId: 'btnIndexSendEmail'
  });

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
  // 8. Instant Page Pre-fetch & Rapid Navigation Engine (Reduces navigation from 5-6s to <1s)
  (function initInstantNavigation() {
    const preloaded = new Set();

    function prefetch(url) {
      if (!url || preloaded.has(url)) return;
      if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('#') || url.startsWith('javascript:')) return;
      try {
        const parsed = new URL(url, window.location.href);
        if (parsed.origin !== window.location.origin) return;
        if (parsed.pathname === window.location.pathname) return;
        preloaded.add(parsed.href);

        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = parsed.href;
        link.as = 'document';
        document.head.appendChild(link);
      } catch (err) {}
    }

    // Prefetch on hover (gives 200-300ms head start before click)
    document.addEventListener('mouseover', function (e) {
      const anchor = e.target.closest('a');
      if (anchor && anchor.href) {
        prefetch(anchor.href);
      }
    }, { passive: true });

    // Prefetch on touchstart for mobile
    document.addEventListener('touchstart', function (e) {
      const anchor = e.target.closest('a');
      if (anchor && anchor.href) {
        prefetch(anchor.href);
      }
    }, { passive: true });

    // Idle prefetch for primary navigation items
    const idlePrefetch = () => {
      const navLinks = document.querySelectorAll('.temple-navbar a, .btn-nav-silver, .hero-pantheon a, .btn-greek');
      navLinks.forEach(link => {
        if (link.href) prefetch(link.href);
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(idlePrefetch);
    } else {
      setTimeout(idlePrefetch, 1000);
    }
  })();

  // 9. Instant & Butter-Smooth Image Orchestrator (Eliminates lag & abrupt loading)
  (function initSmoothImageEngine() {
    const markImageReady = (img) => {
      img.classList.add('is-loaded');
      const container = img.closest('.artifact-img-wrap, .mosaic-item, .manuscript-img-wrap, .avenue-project-img-wrap, .gallery-frame, .leader-portrait-wrap, .blog-img-wrap');
      if (container) {
        container.classList.add('img-ready');
      }
    };

    const processImage = (img) => {
      if (img.classList.contains('smooth-fade-img')) return;
      if (img.classList.contains('brand-logo-img') || img.classList.contains('lightbox-img') || (img.src && img.src.includes('flagcdn'))) {
        return;
      }

      img.classList.add('smooth-fade-img');

      // If already cached or rendered by browser, reveal instantly without transition delay
      if (img.complete && img.naturalWidth > 0) {
        markImageReady(img);
      } else {
        // Asynchronously decode off main thread to prevent scrolling jitter and frame drops
        if (typeof img.decode === 'function') {
          img.decode()
            .then(() => markImageReady(img))
            .catch(() => {
              img.addEventListener('load', () => markImageReady(img), { once: true });
            });
        } else {
          img.addEventListener('load', () => markImageReady(img), { once: true });
        }
        img.addEventListener('error', () => markImageReady(img), { once: true });
      }
    };

    // Process all existing images
    const images = document.querySelectorAll('img');
    images.forEach(processImage);

    // Smart Ahead-Of-Time Preloader:
    // Fetches and decodes images 600px BEFORE entering viewport so they appear smoothly at once
    if ('IntersectionObserver' in window) {
      const aheadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.loading === 'lazy') {
              img.loading = 'eager';
            }
            if (typeof img.decode === 'function' && !img.complete) {
              img.decode().then(() => markImageReady(img)).catch(() => {});
            }
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '600px 0px 600px 0px'
      });

      document.querySelectorAll('img.smooth-fade-img:not(.is-loaded)').forEach(img => {
        aheadObserver.observe(img);
      });
    }

    // Dynamic Content Observer (e.g. dynamic blog list, client filter changes)
    if ('MutationObserver' in window) {
      const mutObserver = new MutationObserver(mutations => {
        mutations.forEach(mut => {
          mut.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              if (node.tagName === 'IMG') {
                processImage(node);
              } else if (node.querySelectorAll) {
                node.querySelectorAll('img').forEach(processImage);
              }
            }
          });
        });
      });
      mutObserver.observe(document.body, { childList: true, subtree: true });
    }

    // Safety fallback: Ensure any slow network response gracefully reveals within 1.2s
    setTimeout(() => {
      document.querySelectorAll('img.smooth-fade-img:not(.is-loaded)').forEach(img => {
        markImageReady(img);
      });
    }, 1200);
  })();
});