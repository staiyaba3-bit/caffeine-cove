/**
 * CAFFEINE COVE — PREMIUM COFFEE HOUSE JAVASCRIPT
 * Comprehensive Interactions: Filtering, Lightbox, Slider, Reservation Validation,
 * Currency Switching, Tasting Tray Drawer, and Accessible Modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. STATE & CONSTANTS
  // =========================================================================
  const state = {
    currency: localStorage.getItem('cove_curr') || 'INR', // 'INR' or 'USD'
    tastingTray: JSON.parse(localStorage.getItem('cove_tray') || '[]'),
    activeFilter: 'all',
    currentReviewIndex: 0,
    currentGalleryIndex: 0,
    modalPendingItem: null,
    reviewInterval: null
  };

  const galleryData = [
    { src: 'images/gallery_espresso.jpg', title: 'Golden Crema Pour', caption: 'Single-origin espresso pulled on our custom commercial lever machine.' },
    { src: 'images/gallery_cozy_nook.jpg', title: 'Afternoon Reading Nook', caption: 'Quiet corner with natural light, crafted oak tables, and books to browse.' },
    { src: 'images/gallery_latte_overhead.jpg', title: 'Artisanal Pour', caption: 'Velvety microfoam poured by our champion certified baristas.' },
    { src: 'images/gallery_pastries.jpg', title: 'Daily Hearth Bake', caption: 'Croissants, brioche, and tarts baked fresh every morning from 7:00 AM.' },
    { src: 'images/gallery_coffee_beans.jpg', title: 'Single-Origin Roast', caption: 'Ethically sourced shade-grown beans roasted in artisan small batches.' }
  ];

  // =========================================================================
  // 2. DOM ELEMENT REFERENCES
  // =========================================================================
  const header = document.getElementById('header');
  const currencyToggle = document.getElementById('currency-toggle');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  
  // Tray
  const trayToggleBtn = document.getElementById('tray-toggle-btn');
  const trayDrawer = document.getElementById('tasting-tray-drawer');
  const trayCloseBtn = document.getElementById('tray-close-btn');
  const trayBackdrop = document.getElementById('tray-backdrop');
  const trayCountEl = document.getElementById('tray-count');
  const trayListEl = document.getElementById('tray-items-list');
  const trayEmptyState = document.getElementById('tray-empty-state');
  const trayTotalPriceEl = document.getElementById('tray-total-price');
  const trayCheckoutBtn = document.getElementById('tray-checkout-btn');

  // Customizer Modal
  const itemModal = document.getElementById('item-modal');
  const itemModalClose = document.getElementById('item-modal-close');
  const customModalImg = document.getElementById('custom-modal-img');
  const customModalTitle = document.getElementById('custom-modal-title');
  const customModalDesc = document.getElementById('custom-modal-desc');
  const customModalPrice = document.getElementById('custom-modal-price');
  const confirmAddTrayBtn = document.getElementById('confirm-add-tray-btn');

  // Menu Filters
  const filterPills = document.querySelectorAll('.filter-pill');
  const menuCards = document.querySelectorAll('.menu-card');

  // Lightbox
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');
  const galleryTiles = document.querySelectorAll('.gallery-tile');

  // Reviews Carousel
  const reviewsTrack = document.getElementById('reviews-track');
  const reviewSlides = document.querySelectorAll('.review-slide');
  const carouselPrevBtn = document.getElementById('carousel-prev-btn');
  const carouselNextBtn = document.getElementById('carousel-next-btn');
  const carouselDots = document.querySelectorAll('.dot-btn');

  // Reservation Form
  const reservationForm = document.getElementById('reservation-form');
  const resDateInput = document.getElementById('res-date');
  const resSubmitBtn = document.getElementById('res-submit-btn');
  const resErrorsBox = document.getElementById('reservation-errors');
  const bookingModal = document.getElementById('booking-confirmation-modal');
  const bookingModalClose = document.getElementById('booking-modal-close');
  const closeVoucherBtn = document.getElementById('close-voucher-btn');
  const printVoucherBtn = document.getElementById('print-voucher-btn');

  // Toast
  const toastEl = document.getElementById('toast-notification');

  // Other Modals
  const fullMenuModal = document.getElementById('full-menu-modal');
  const openFullMenuBtn = document.getElementById('open-full-menu-btn');
  const openFullPastriesBtn = document.getElementById('open-full-pastries-btn');
  const fullMenuClose = document.getElementById('full-menu-close');

  const videoModal = document.getElementById('video-story-modal');
  const openStoryVideoBtn = document.getElementById('open-story-video-btn');
  const openVideoBtn = document.getElementById('open-video-btn');
  const videoModalClose = document.getElementById('video-modal-close');

  const directionsModal = document.getElementById('directions-modal');
  const getDirectionsBtn = document.getElementById('get-directions-btn');
  const directionsModalClose = document.getElementById('directions-modal-close');

  const processModal = document.getElementById('process-modal');
  const openProcessBtn = document.getElementById('open-process-details-btn');
  const learnMoreBtn = document.getElementById('learn-more-btn');
  const processModalClose = document.getElementById('process-modal-close');

  const legalModal = document.getElementById('legal-modal');
  const legalModalTitle = document.getElementById('legal-modal-title');
  const legalModalContent = document.getElementById('legal-modal-content');
  const legalModalClose = document.getElementById('legal-modal-close');
  const openPrivacyBtn = document.getElementById('open-privacy-btn');
  const openTermsBtn = document.getElementById('open-terms-btn');
  const openClientNotesBtn = document.getElementById('open-client-notes-btn');

  // =========================================================================
  // 3. TOAST HELPER
  // =========================================================================
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3500);
  }

  // =========================================================================
  // 4. CURRENCY CONVERTER
  // =========================================================================
  function updateCurrencyUI() {
    const isUSD = state.currency === 'USD';
    const inrOpts = document.querySelectorAll('.curr-opt[data-curr="INR"]');
    const usdOpts = document.querySelectorAll('.curr-opt[data-curr="USD"]');

    inrOpts.forEach(el => el.classList.toggle('active', !isUSD));
    usdOpts.forEach(el => el.classList.toggle('active', isUSD));

    // Update all dynamic price elements
    document.querySelectorAll('[data-base-price-inr]').forEach(el => {
      const inr = el.getAttribute('data-base-price-inr');
      const usd = el.getAttribute('data-base-price-usd');
      el.textContent = isUSD ? `$${usd}` : `₹${inr}`;
    });

    renderTray();
  }

  if (currencyToggle) {
    currencyToggle.addEventListener('click', () => {
      state.currency = state.currency === 'INR' ? 'USD' : 'INR';
      localStorage.setItem('cove_curr', state.currency);
      updateCurrencyUI();
      showToast(`Currency changed to ${state.currency === 'INR' ? 'Indian Rupee (₹)' : 'US Dollar ($)'}`);
    });
  }

  // =========================================================================
  // 5. HEADER SCROLL & SCROLL-SPY
  // =========================================================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  const sections = document.querySelectorAll('section[id], header[id]');
  const navObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopNavLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}` || (id === 'hero' && href === '#hero')) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(sec => navObserver.observe(sec));

  // =========================================================================
  // 6. MOBILE NAVIGATION DRAWER
  // =========================================================================
  function openMobileNav() {
    mobileDrawer.classList.add('open');
    mobileBackdrop.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('scroll-locked');
  }

  function closeMobileNav() {
    mobileDrawer.classList.remove('open');
    mobileBackdrop.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('scroll-locked');
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileNav);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileNav);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileNav);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // =========================================================================
  // 7. MENU FILTERING
  // =========================================================================
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const filterVal = pill.getAttribute('data-filter');
      state.activeFilter = filterVal;

      menuCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // =========================================================================
  // 8. TASTING TRAY & ITEM CUSTOMIZATION
  // =========================================================================
  function saveTray() {
    localStorage.setItem('cove_tray', JSON.stringify(state.tastingTray));
    renderTray();
  }

  function renderTray() {
    const isUSD = state.currency === 'USD';
    const totalItems = state.tastingTray.reduce((acc, item) => acc + item.quantity, 0);
    if (trayCountEl) trayCountEl.textContent = totalItems;

    if (!trayListEl) return;
    trayListEl.innerHTML = '';

    if (state.tastingTray.length === 0) {
      if (trayEmptyState) trayEmptyState.style.display = 'flex';
      if (trayTotalPriceEl) trayTotalPriceEl.textContent = isUSD ? '$0.00' : '₹0';
      return;
    }

    if (trayEmptyState) trayEmptyState.style.display = 'none';

    let subtotal = 0;

    state.tastingTray.forEach((item, index) => {
      const priceNum = isUSD ? item.priceUsd : item.priceInr;
      const itemSubtotal = priceNum * item.quantity;
      subtotal += itemSubtotal;

      const li = document.createElement('li');
      li.className = 'tray-item-row';
      li.innerHTML = `
        <div class="tray-item-details">
          <span class="tray-item-title">${item.title} ${item.quantity > 1 ? `× ${item.quantity}` : ''}</span>
          ${item.options ? `<span class="tray-item-customs">${item.options}</span>` : ''}
        </div>
        <span class="tray-item-price">${isUSD ? `$${itemSubtotal.toFixed(2)}` : `₹${itemSubtotal}`}</span>
        <button class="tray-item-remove" data-index="${index}" aria-label="Remove ${item.title}">✕</button>
      `;
      trayListEl.appendChild(li);
    });

    if (trayTotalPriceEl) {
      trayTotalPriceEl.textContent = isUSD ? `$${subtotal.toFixed(2)}` : `₹${subtotal}`;
    }

    // Attach remove handlers
    trayListEl.querySelectorAll('.tray-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        state.tastingTray.splice(idx, 1);
        saveTray();
        showToast('Item removed from tray.');
      });
    });
  }

  function openTray() {
    trayDrawer.classList.add('open');
    trayBackdrop.classList.add('active');
    trayDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('scroll-locked');
  }

  function closeTray() {
    trayDrawer.classList.remove('open');
    trayBackdrop.classList.remove('active');
    trayDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('scroll-locked');
  }

  if (trayToggleBtn) trayToggleBtn.addEventListener('click', openTray);
  if (trayCloseBtn) trayCloseBtn.addEventListener('click', closeTray);
  if (trayBackdrop) trayBackdrop.addEventListener('click', closeTray);

  if (trayCheckoutBtn) {
    trayCheckoutBtn.addEventListener('click', () => {
      if (state.tastingTray.length === 0) {
        showToast('Your tasting tray is empty.');
        return;
      }
      closeTray();
      showToast('☕ Tasting order noted for your table session! (Demo mode)');
      state.tastingTray = [];
      saveTray();
    });
  }

  // Card "+" button customizer trigger
  document.querySelectorAll('.menu-card .btn-add-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.menu-card');
      const img = card.querySelector('.card-img').src;
      const title = card.querySelector('.card-title').textContent;
      const desc = card.querySelector('.card-desc').textContent;
      const priceInr = parseFloat(card.getAttribute('data-price-inr'));
      const priceUsd = parseFloat(card.getAttribute('data-price-usd'));

      state.modalPendingItem = { title, desc, img, priceInr, priceUsd };

      customModalImg.src = img;
      customModalImg.alt = title;
      customModalTitle.textContent = title;
      customModalDesc.textContent = desc;

      const isUSD = state.currency === 'USD';
      customModalPrice.textContent = isUSD ? `$${priceUsd.toFixed(2)}` : `₹${priceInr}`;

      openModal(itemModal);
    });
  });

  // Treat "+" button direct add
  document.querySelectorAll('.btn-add-treat').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.treat-card');
      const title = card.querySelector('.treat-title').textContent;
      const priceInr = parseFloat(card.getAttribute('data-price-inr'));
      const priceUsd = parseFloat(card.getAttribute('data-price-usd'));

      addItemToTray({
        title,
        priceInr,
        priceUsd,
        options: 'Freshly Baked Hearth',
        quantity: 1
      });
      showToast(`Added ${title} to your tasting tray.`);
    });
  });

  if (confirmAddTrayBtn) {
    confirmAddTrayBtn.addEventListener('click', () => {
      if (!state.modalPendingItem) return;

      const milk = document.querySelector('input[name="milk"]:checked')?.value || 'Whole Milk';
      const sweetness = document.querySelector('input[name="sweetness"]:checked')?.value || 'Standard';
      const temp = document.querySelector('input[name="temp"]:checked')?.value || 'Served Warm';

      let addInr = 0;
      let addUsd = 0;
      if (milk.includes('+₹30')) {
        addInr = 30;
        addUsd = 0.50;
      }

      addItemToTray({
        title: state.modalPendingItem.title,
        priceInr: state.modalPendingItem.priceInr + addInr,
        priceUsd: state.modalPendingItem.priceUsd + addUsd,
        options: `${milk} • ${sweetness} • ${temp}`,
        quantity: 1
      });

      closeModal(itemModal);
      showToast(`Added ${state.modalPendingItem.title} to tray.`);
    });
  }

  function addItemToTray(newItem) {
    const existingIndex = state.tastingTray.findIndex(it => it.title === newItem.title && it.options === newItem.options);
    if (existingIndex > -1) {
      state.tastingTray[existingIndex].quantity += 1;
    } else {
      state.tastingTray.push(newItem);
    }
    saveTray();
  }

  // =========================================================================
  // 9. LIGHTBOX COMPONENT
  // =========================================================================
  function showLightboxIndex(index) {
    state.currentGalleryIndex = (index + galleryData.length) % galleryData.length;
    const item = galleryData[state.currentGalleryIndex];

    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption;
    lightboxTitle.textContent = item.title;
    lightboxCounter.textContent = `${state.currentGalleryIndex + 1} of ${galleryData.length}`;
  }

  function openLightbox(index) {
    showLightboxIndex(index);
    openModal(lightboxModal);
  }

  galleryTiles.forEach((tile, index) => {
    tile.addEventListener('click', () => openLightbox(index));
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  if (lightboxPrevBtn) {
    lightboxPrevBtn.addEventListener('click', () => {
      showLightboxIndex(state.currentGalleryIndex - 1);
    });
  }

  if (lightboxNextBtn) {
    lightboxNextBtn.addEventListener('click', () => {
      showLightboxIndex(state.currentGalleryIndex + 1);
    });
  }

  const openFullGalleryBtn = document.getElementById('open-full-gallery-btn');
  if (openFullGalleryBtn) {
    openFullGalleryBtn.addEventListener('click', () => openLightbox(0));
  }

  // Interactive Category Filter for Modern Gallery
  const galleryFilterBtns = document.querySelectorAll('.gallery-tab-btn');
  if (galleryFilterBtns.length > 0) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        galleryFilterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        galleryTiles.forEach(tile => {
          const category = tile.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            tile.classList.remove('tile-dimmed');
          } else {
            tile.classList.add('tile-dimmed');
          }
        });
      });
    });
  }

  // =========================================================================
  // 10. REVIEWS CAROUSEL
  // =========================================================================
  function updateCarousel(index) {
    state.currentReviewIndex = (index + reviewSlides.length) % reviewSlides.length;
    if (reviewsTrack) {
      reviewsTrack.style.transform = `translateX(-${state.currentReviewIndex * 100}%)`;
    }
    reviewSlides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === state.currentReviewIndex);
    });
    carouselDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === state.currentReviewIndex);
      dot.setAttribute('aria-selected', idx === state.currentReviewIndex ? 'true' : 'false');
    });
  }

  if (carouselPrevBtn) {
    carouselPrevBtn.addEventListener('click', () => {
      updateCarousel(state.currentReviewIndex - 1);
      resetReviewTimer();
    });
  }

  if (carouselNextBtn) {
    carouselNextBtn.addEventListener('click', () => {
      updateCarousel(state.currentReviewIndex + 1);
      resetReviewTimer();
    });
  }

  carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateCarousel(index);
      resetReviewTimer();
    });
  });

  function startReviewTimer() {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    state.reviewInterval = setInterval(() => {
      updateCarousel(state.currentReviewIndex + 1);
    }, 7000);
  }

  function resetReviewTimer() {
    clearInterval(state.reviewInterval);
    startReviewTimer();
  }

  startReviewTimer();

  // Pause on hover
  const reviewsViewport = document.getElementById('reviews-viewport');
  if (reviewsViewport) {
    reviewsViewport.addEventListener('mouseenter', () => clearInterval(state.reviewInterval));
    reviewsViewport.addEventListener('mouseleave', startReviewTimer);
  }

  // =========================================================================
  // 11. TABLE RESERVATION FORM VALIDATION & FLOW
  // =========================================================================
  // Set minimum date to today
  if (resDateInput) {
    const today = new Date().toISOString().split('T')[0];
    resDateInput.min = today;
    resDateInput.value = today;
  }

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('res-name').value.trim();
      const dateVal = document.getElementById('res-date').value;
      const timeVal = document.getElementById('res-time').value;
      const phoneVal = document.getElementById('res-phone').value.trim();
      const emailVal = document.getElementById('res-email').value.trim();
      const guestsVal = document.getElementById('res-guests').value;
      const notesVal = document.getElementById('res-notes').value.trim();

      // Reset errors
      clearFormErrors();
      let hasError = false;
      const errors = [];

      // Validate Name
      if (nameVal.length < 2) {
        setFieldError('err-name', 'res-name', 'Please enter your full name.');
        errors.push('Full name is required.');
        hasError = true;
      }

      // Validate Date
      if (!dateVal) {
        setFieldError('err-date', 'res-date', 'Please choose a reservation date.');
        errors.push('Reservation date is required.');
        hasError = true;
      } else {
        const parts = dateVal.split('-');
        if (parts.length === 3) {
          const chosen = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (chosen < today) {
            setFieldError('err-date', 'res-date', 'Date cannot be in the past.');
            errors.push('Reservation date cannot be in the past.');
            hasError = true;
          }
        }
      }

      // Validate Time
      if (!timeVal) {
        setFieldError('err-time', 'res-time', 'Please select a preferred time slot.');
        errors.push('Time slot is required.');
        hasError = true;
      }

      // Validate Phone
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,14}$/;
      if (!phoneRegex.test(phoneVal.replace(/\s/g, ''))) {
        setFieldError('err-phone', 'res-phone', 'Please enter a valid telephone number.');
        errors.push('A valid phone number is required.');
        hasError = true;
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        setFieldError('err-email', 'res-email', 'Please enter a valid email address.');
        errors.push('A valid email address is required.');
        hasError = true;
      }

      if (hasError) {
        if (resErrorsBox) {
          resErrorsBox.hidden = false;
          resErrorsBox.innerHTML = `<strong>Please correct the following:</strong><ul>${errors.map(err => `<li>${err}</li>`).join('')}</ul>`;
        }
        return;
      }

      // Simulated Submission Loading State
      const submitText = resSubmitBtn.querySelector('.btn-text');
      const submitLoader = resSubmitBtn.querySelector('.btn-loader');
      submitText.textContent = 'Verifying Table...';
      submitLoader.hidden = false;
      resSubmitBtn.disabled = true;

      setTimeout(() => {
        submitText.textContent = 'Reserve Now';
        submitLoader.hidden = true;
        resSubmitBtn.disabled = false;

        // Populate Confirmation Modal Voucher
        const refId = 'CC-' + Math.floor(1000 + Math.random() * 9000);
        document.getElementById('voucher-ref').textContent = `REF: #${refId}`;
        document.getElementById('v-name').textContent = nameVal;
        document.getElementById('v-date').textContent = new Date(dateVal).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
        document.getElementById('v-time').textContent = timeVal;
        document.getElementById('v-guests').textContent = `${guestsVal} ${parseInt(guestsVal, 10) === 1 ? 'Guest' : 'Guests'}`;
        document.getElementById('v-phone').textContent = phoneVal;
        document.getElementById('v-email').textContent = emailVal;

        const notesRow = document.getElementById('v-notes-row');
        if (notesVal) {
          notesRow.style.display = 'flex';
          document.getElementById('v-notes').textContent = notesVal;
        } else {
          notesRow.style.display = 'none';
        }

        reservationForm.reset();
        openModal(bookingModal);
        showToast('Table reservation enquiry submitted successfully.');
      }, 750);
    });
  }

  function setFieldError(errId, inputId, msg) {
    const errEl = document.getElementById(errId);
    const inputEl = document.getElementById(inputId);
    if (errEl) errEl.textContent = msg;
    if (inputEl) inputEl.classList.add('invalid');
  }

  function clearFormErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-input, .form-select').forEach(el => el.classList.remove('invalid'));
    if (resErrorsBox) {
      resErrorsBox.hidden = true;
      resErrorsBox.innerHTML = '';
    }
  }

  if (printVoucherBtn) {
    printVoucherBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // =========================================================================
  // 12. GENERIC MODAL CONTROLLER
  // =========================================================================
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.removeAttribute('hidden');
    document.body.classList.add('scroll-locked');
    const firstFocusable = modalEl.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) firstFocusable.focus();
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.setAttribute('hidden', '');
    document.body.classList.remove('scroll-locked');
  }

  // Close when clicking overlay backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Close with Esc key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay:not([hidden])').forEach(modal => {
        closeModal(modal);
      });
      closeTray();
      closeMobileNav();
    } else if (e.key === 'ArrowLeft' && !lightboxModal.hasAttribute('hidden')) {
      showLightboxIndex(state.currentGalleryIndex - 1);
    } else if (e.key === 'ArrowRight' && !lightboxModal.hasAttribute('hidden')) {
      showLightboxIndex(state.currentGalleryIndex + 1);
    }
  });

  // Close buttons bindings
  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', () => closeModal(lightboxModal));
  if (itemModalClose) itemModalClose.addEventListener('click', () => closeModal(itemModal));
  if (bookingModalClose) bookingModalClose.addEventListener('click', () => closeModal(bookingModal));
  if (closeVoucherBtn) closeVoucherBtn.addEventListener('click', () => closeModal(bookingModal));

  // Full Menu Modal
  if (openFullMenuBtn) openFullMenuBtn.addEventListener('click', () => openModal(fullMenuModal));
  if (openFullPastriesBtn) openFullPastriesBtn.addEventListener('click', () => openModal(fullMenuModal));
  if (fullMenuClose) fullMenuClose.addEventListener('click', () => closeModal(fullMenuModal));

  // Video Story Modal
  if (openStoryVideoBtn) openStoryVideoBtn.addEventListener('click', () => openModal(videoModal));
  if (openVideoBtn) openVideoBtn.addEventListener('click', () => openModal(videoModal));
  if (videoModalClose) videoModalClose.addEventListener('click', () => closeModal(videoModal));

  // Directions Modal
  if (getDirectionsBtn) getDirectionsBtn.addEventListener('click', () => openModal(directionsModal));
  if (directionsModalClose) directionsModalClose.addEventListener('click', () => closeModal(directionsModal));

  // Process Modal
  if (openProcessBtn) openProcessBtn.addEventListener('click', () => openModal(processModal));
  if (learnMoreBtn) learnMoreBtn.addEventListener('click', () => openModal(processModal));
  if (processModalClose) processModalClose.addEventListener('click', () => closeModal(processModal));

  // Legal Modals Content Handlers
  if (legalModalClose) legalModalClose.addEventListener('click', () => closeModal(legalModal));

  if (openPrivacyBtn) {
    openPrivacyBtn.addEventListener('click', () => {
      legalModalTitle.textContent = 'Privacy Policy';
      legalModalContent.innerHTML = `
        <p><strong>Effective Date:</strong> 2025</p>
        <p>At Caffeine Cove, we respect your privacy. This demonstration privacy statement explains how guest information is handled.</p>
        <h4 style="margin: 12px 0 4px; font-weight:600;">Information We Collect</h4>
        <p>When you place an enquiry or reserve a table, we collect your name, email, phone number, and seating notes strictly to coordinate your café visit.</p>
        <h4 style="margin: 12px 0 4px; font-weight:600;">Data Usage & Security</h4>
        <p>We never sell, rent, or distribute guest data. For production booking, all records will be processed securely according to applicable data protection regulations.</p>
      `;
      openModal(legalModal);
    });
  }

  if (openTermsBtn) {
    openTermsBtn.addEventListener('click', () => {
      legalModalTitle.textContent = 'Terms of Service';
      legalModalContent.innerHTML = `
        <p><strong>Welcome to Caffeine Cove.</strong></p>
        <p>By browsing this website and reserving seating, you agree to our house courtesies:</p>
        <ul style="list-style:disc; margin-left: 20px; margin-top:8px;">
          <li>Tables are held for 15 minutes past reservation time before being opened to walk-in guests.</li>
          <li>For parties of 8 or more, please confirm via telephone 24 hours prior.</li>
          <li>We kindly ask guests to enjoy laptops and prolonged work sessions in designated window bar seating during peak weekend hours.</li>
        </ul>
      `;
      openModal(legalModal);
    });
  }

  if (openClientNotesBtn) {
    openClientNotesBtn.addEventListener('click', () => {
      legalModalTitle.textContent = 'Client Handover & Technical Notes';
      legalModalContent.innerHTML = `
        <p><strong>Project:</strong> CAFFEINE COVE — Premium Coffee House Website</p>
        <p><strong>Architecture:</strong> Vanilla HTML5, CSS3 Custom Properties Design System, Modular JavaScript.</p>
        <h4 style="margin: 12px 0 4px; font-weight:600;">Production Integration Points</h4>
        <ul style="list-style:disc; margin-left: 20px; margin-top:8px;">
          <li><strong>Reservation API:</strong> Replace the demo handler in <code>script.js</code> with an API endpoint (e.g., POST to <code>/api/reservations</code> or connect Resy / OpenTable widgets).</li>
          <li><strong>Menu & Pricing:</strong> Update prices in HTML <code>data-price-inr</code> and <code>data-price-usd</code> attributes, or connect to a headless CMS (Sanity / Strapi).</li>
          <li><strong>Domain & Analytics:</strong> Connect Google Analytics 4, Meta Pixel, and configure SSL certificates on your hosting server.</li>
        </ul>
      `;
      openModal(legalModal);
    });
  }

  // =========================================================================
  // 13. INITIALIZE
  // =========================================================================
  updateCurrencyUI();
  renderTray();
});
