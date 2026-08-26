// ============================================================
// Myntra Wishlist Decision Assistant — Full Flow Controller
// ============================================================

(function () {
  "use strict";

  // ── State ──
  const state = {
    currentScreen: "login-screen",
    wishlistedIds: new Set(),
    selectedIds: new Set(),
    activeCategory: "all",
    currentSheet: null,
    currentProductId: null,
    isLoggedIn: false,
    loginStep: "phone" // "phone" | "otp"
  };

  // ── DOM ──
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const dom = {
    // Screens
    loginScreen: $("#login-screen"),
    homeScreen: $("#home-screen"),
    wishlistScreen: $("#wishlist-screen"),
    compareScreen: $("#compare-screen"),
    // Login
    phoneInput: $("#phone-input"),
    phoneGroup: $("#phone-group"),
    otpGroup: $("#otp-group"),
    loginBtn: $("#login-btn"),
    loginBtnText: $("#login-btn-text"),
    loginSpinner: $("#login-spinner"),
    resendBtn: $("#resend-btn"),
    // Home
    homeGrid: $("#home-grid"),
    homeTitle: $("#home-title"),
    homeSubtitle: $("#home-subtitle"),
    categoryTabs: $("#category-tabs"),
    promoBanner: $("#promo-banner"),
    promoClose: $("#promo-close"),
    // Wishlist
    wishlistGrid: $("#wishlist-grid"),
    wishlistCount: $("#wishlist-count"),
    wishlistEmpty: $("#wishlist-empty"),
    browseBtn: $("#browse-btn"),
    // Compare
    compareProducts: $("#compare-products"),
    compareDimensions: $("#compare-dimensions"),
    recommendationContainer: $("#recommendation-card-container"),
    compareBar: $("#compare-bar"),
    compareCount: $("#compare-count"),
    compareCta: $("#compare-cta"),
    compareBack: $("#compare-back"),
    // Nav
    bottomNav: $("#bottom-nav"),
    wishlistBadge: $("#wishlist-badge"),
    // Sheet
    overlay: $("#overlay"),
    bottomSheet: $("#bottom-sheet"),
    sheetTitle: $("#sheet-title"),
    sheetBody: $("#sheet-body"),
    sheetClose: $("#sheet-close"),
    // Toast
    toast: $("#toast")
  };

  // ── SVG Icons ──
  const icons = {
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    starEmpty: `<svg class="empty" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
    trophy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`,
    verified: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>`,
    bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    alertCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    reviewIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    confidenceIcon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
  };

  // ============================================================
  // SCREEN NAVIGATION
  // ============================================================
  function navigateTo(screenId) {
    // Hide all screens
    $$(".screen").forEach(s => s.classList.remove("active"));

    // Special cases
    if (screenId === "explore" || screenId === "profile") {
      // These screens aren't built — show home with a toast
      $("#home-screen").classList.add("active");
      showToast(screenId === "explore" ? "Categories coming soon!" : "Profile coming soon!");
      screenId = "home-screen";
    } else {
      $(`#${screenId}`).classList.add("active");
    }

    state.currentScreen = screenId;

    // Update bottom nav active state
    $$(".bottom-nav__item").forEach(item => {
      item.classList.toggle("active", item.dataset.screen === screenId);
    });

    // Re-render specific screens
    if (screenId === "wishlist-screen") {
      renderWishlistScreen();
    }
    if (screenId === "home-screen") {
      renderHomeGrid();
    }

    // Hide compare bar when leaving wishlist
    if (screenId !== "wishlist-screen") {
      dom.compareBar.classList.remove("visible");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ============================================================
  // LOGIN FLOW
  // ============================================================
  function handleLogin() {
    if (state.loginStep === "phone") {
      const phone = dom.phoneInput.value.trim();
      if (phone.length < 6) {
        showToast("Please enter a valid number");
        dom.phoneInput.focus();
        return;
      }

      // Show spinner
      dom.loginBtnText.textContent = "Sending OTP...";
      dom.loginSpinner.classList.remove("hidden");
      dom.loginBtn.disabled = true;

      // Simulate OTP send
      setTimeout(() => {
        state.loginStep = "otp";
        dom.phoneGroup.style.opacity = "0.5";
        dom.phoneGroup.style.pointerEvents = "none";
        dom.otpGroup.classList.remove("hidden");
        dom.loginBtnText.textContent = "Verify & Login";
        dom.loginSpinner.classList.add("hidden");
        dom.loginBtn.disabled = false;

        // Focus first OTP box
        const firstBox = $(".otp-box[data-index='0']");
        if (firstBox) firstBox.focus();

        showToast("OTP sent successfully! (Use any 4 digits)");
      }, 1200);

    } else if (state.loginStep === "otp") {
      const otpBoxes = $$(".otp-box");
      const otp = Array.from(otpBoxes).map(b => b.value).join("");
      if (otp.length < 4) {
        showToast("Please enter the 4-digit OTP");
        return;
      }

      // Show spinner
      dom.loginBtnText.textContent = "Verifying...";
      dom.loginSpinner.classList.remove("hidden");
      dom.loginBtn.disabled = true;

      // Simulate verification
      setTimeout(() => {
        state.isLoggedIn = true;
        dom.bottomNav.classList.remove("hidden");
        navigateTo("home-screen");
        showToast("Welcome to Myntra! 🎉");
      }, 1000);
    }
  }

  // Social login shortcut
  window.handleSocialLogin = function () {
    dom.loginBtnText.textContent = "Logging in...";
    dom.loginSpinner.classList.remove("hidden");
    dom.loginBtn.disabled = true;

    setTimeout(() => {
      state.isLoggedIn = true;
      dom.bottomNav.classList.remove("hidden");
      navigateTo("home-screen");
      showToast("Welcome to Myntra! 🎉");
    }, 1000);
  };

  // OTP input auto-advance
  function setupOTPInputs() {
    const boxes = $$(".otp-box");
    boxes.forEach((box, i) => {
      box.addEventListener("input", (e) => {
        const val = e.target.value;
        if (val && i < boxes.length - 1) {
          boxes[i + 1].focus();
        }
      });
      box.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !box.value && i > 0) {
          boxes[i - 1].focus();
        }
      });
    });
  }

  // ============================================================
  // HOME SCREEN — Browse Products
  // ============================================================
  function renderHomeGrid() {
    let products = PRODUCTS;

    // Filter by category
    if (state.activeCategory !== "all") {
      products = PRODUCTS.filter(p => p.category === state.activeCategory);
    }

    dom.homeGrid.innerHTML = products.map((p, i) => `
      <div class="product-card animate-slide-up" data-product-id="${p.id}" style="animation-delay: ${i * 50}ms">
        <div class="product-card__image-wrap">
          <img class="product-card__image" src="${p.image}" alt="${p.name}" loading="lazy">
          <button class="product-card__heart ${state.wishlistedIds.has(p.id) ? 'wishlisted' : ''}" data-action="wishlist" aria-label="Add to Wishlist">
            ${icons.heart}
          </button>
          ${p.discount >= 30 ? `<div class="product-card__discount">${p.discount}% OFF</div>` : ''}
        </div>
        <div class="product-card__info">
          <div class="product-card__brand">${p.brand}</div>
          <div class="product-card__name">${p.name}</div>
          <div class="product-card__pricing">
            <span class="product-card__price">₹${p.price.toLocaleString('en-IN')}</span>
            <span class="product-card__original-price">₹${p.originalPrice.toLocaleString('en-IN')}</span>
            <span class="product-card__discount-text">(${p.discount}% off)</span>
          </div>
          <div class="product-card__rating">
            ${icons.star}
            ${p.rating}
            <span class="product-card__rating-count">| ${p.reviewCount}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Update subtitle
    dom.homeSubtitle.textContent = state.wishlistedIds.size > 0
      ? `${state.wishlistedIds.size} item(s) in wishlist • Tap ❤️ to add more`
      : `Tap ❤️ to add to wishlist`;
  }

  // ============================================================
  // WISHLIST TOGGLE
  // ============================================================
  function toggleWishlist(productId) {
    const heartBtn = dom.homeGrid.querySelector(`.product-card[data-product-id="${productId}"] .product-card__heart`);

    if (state.wishlistedIds.has(productId)) {
      state.wishlistedIds.delete(productId);
      if (heartBtn) heartBtn.classList.remove("wishlisted");
      showToast("Removed from wishlist");
    } else {
      state.wishlistedIds.add(productId);
      if (heartBtn) {
        heartBtn.classList.add("wishlisted", "pop");
        setTimeout(() => heartBtn.classList.remove("pop"), 500);
      }
      showToast("Added to wishlist ❤️");
    }

    updateWishlistBadge();
  }

  function updateWishlistBadge() {
    const count = state.wishlistedIds.size;
    if (count > 0) {
      dom.wishlistBadge.textContent = count;
      dom.wishlistBadge.classList.remove("hidden");
    } else {
      dom.wishlistBadge.classList.add("hidden");
    }
  }

  // ============================================================
  // WISHLIST SCREEN
  // ============================================================
  function renderWishlistScreen() {
    const wishlisted = PRODUCTS.filter(p => state.wishlistedIds.has(p.id));

    dom.wishlistCount.textContent = `(${wishlisted.length})`;

    if (wishlisted.length === 0) {
      dom.wishlistGrid.classList.add("hidden");
      dom.wishlistEmpty.classList.remove("hidden");
      dom.compareBar.classList.remove("visible");
      return;
    }

    dom.wishlistGrid.classList.remove("hidden");
    dom.wishlistEmpty.classList.add("hidden");

    dom.wishlistGrid.innerHTML = wishlisted.map((p, i) => `
      <div class="product-card animate-slide-up ${state.selectedIds.has(p.id) ? 'selected' : ''}" data-product-id="${p.id}" style="animation-delay: ${i * 50}ms">
        <div class="product-card__image-wrap">
          <img class="product-card__image" src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="product-card__select-check" data-action="select">
            ${icons.check}
          </div>
          ${p.discount >= 30 ? `<div class="product-card__discount">${p.discount}% OFF</div>` : ''}
          <div class="product-card__actions">
            <button class="product-card__action-btn" data-action="confidence" title="Confidence Card">
              ${icons.confidenceIcon}
            </button>
            <button class="product-card__action-btn" data-action="reviews" title="AI Review Summary">
              ${icons.reviewIcon}
            </button>
          </div>
        </div>
        <div class="product-card__info">
          <div class="product-card__brand">${p.brand}</div>
          <div class="product-card__name">${p.name}</div>
          <div class="product-card__pricing">
            <span class="product-card__price">₹${p.price.toLocaleString('en-IN')}</span>
            <span class="product-card__original-price">₹${p.originalPrice.toLocaleString('en-IN')}</span>
            <span class="product-card__discount-text">(${p.discount}% off)</span>
          </div>
          <div class="product-card__rating">
            ${icons.star}
            ${p.rating}
            <span class="product-card__rating-count">| ${p.reviewCount}</span>
          </div>
        </div>
      </div>
    `).join('');

    updateSelectionUI();
  }

  // ============================================================
  // SELECTION (Wishlist Compare)
  // ============================================================
  function toggleSelection(productId) {
    if (state.selectedIds.has(productId)) {
      state.selectedIds.delete(productId);
    } else {
      if (state.selectedIds.size >= 4) {
        showToast("You can compare up to 4 items");
        return;
      }
      state.selectedIds.add(productId);
    }
    updateSelectionUI();
    // Update card visual
    const card = dom.wishlistGrid.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (card) card.classList.toggle("selected", state.selectedIds.has(productId));
  }

  function updateSelectionUI() {
    const count = state.selectedIds.size;
    dom.compareCount.textContent = count;
    dom.compareBar.classList.toggle("visible", count >= 2);
  }

  // ============================================================
  // COMPARE SCREEN
  // ============================================================
  function showCompareScreen() {
    if (state.selectedIds.size < 2) return;

    const ids = Array.from(state.selectedIds);
    const result = orchestrator.helpMeChoose(ids);

    $$(".screen").forEach(s => s.classList.remove("active"));
    dom.compareScreen.classList.add("active");
    dom.compareBar.classList.remove("visible");
    dom.bottomNav.classList.add("hidden");
    state.currentScreen = "compare-screen";

    renderCompareProducts(result);
    renderCompareDimensions(result);
    renderRecommendation(result);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function hideCompareScreen() {
    dom.compareScreen.classList.remove("active");
    dom.wishlistScreen.classList.add("active");
    dom.bottomNav.classList.remove("hidden");
    state.currentScreen = "wishlist-screen";
    renderWishlistScreen();
  }

  function renderCompareProducts(result) {
    const winnerId = result.recommendation.winnerId;
    dom.compareProducts.innerHTML = result.comparison.products.map(p => `
      <div class="compare-product-col ${p.id === winnerId ? 'winner' : ''} animate-scale-in">
        ${p.id === winnerId ? `<div class="winner-badge">${icons.trophy} Best Choice</div>` : ''}
        <img class="compare-product-col__img" src="${p.image}" alt="${p.name}">
        <div class="compare-product-col__brand">${p.brand}</div>
        <div class="compare-product-col__name">${p.name}</div>
      </div>
    `).join('');
  }

  function renderCompareDimensions(result) {
    dom.compareDimensions.innerHTML = Object.entries(result.comparison.matrix).map(([key, dim], i) => `
      <div class="compare-dimension animate-slide-up" style="animation-delay: ${(i + 1) * 80}ms">
        <div class="compare-dimension__label">${dim.icon} ${dim.label}</div>
        <div class="compare-dimension__values">
          ${dim.values.map(v => `
            <div class="compare-dimension__value ${v.isBest ? 'best' : ''} ${v.isWorst ? 'worst' : ''}">
              ${v.display}
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function renderRecommendation(result) {
    const rec = result.recommendation;
    dom.recommendationContainer.innerHTML = `
      <div class="recommendation-card animate-slide-up" style="animation-delay: 600ms">
        <div class="recommendation-card__badge">${icons.sparkles} AI Recommendation</div>
        <div class="recommendation-card__title">${rec.winnerProduct.brand} ${rec.winnerProduct.name}</div>
        <div class="recommendation-card__text">${rec.reasoning}</div>
        ${rec.runnerUp ? `<div class="recommendation-card__text" style="margin-top: var(--space-md); opacity: 0.65; font-style: italic;">Runner-up: ${rec.runnerUp.product.brand} ${rec.runnerUp.product.name} — ${rec.runnerUp.note}</div>` : ''}
        <button class="recommendation-card__cta" onclick="showToast('Added to bag! 🎉')">
          ${icons.bag} Add to Bag
        </button>
      </div>
    `;
  }

  // ============================================================
  // BOTTOM SHEET: Confidence Card
  // ============================================================
  function showConfidenceCard(productId) {
    const card = orchestrator.getConfidenceCard(productId);
    if (!card) return;

    state.currentSheet = "confidence";
    state.currentProductId = productId;
    dom.sheetTitle.textContent = "Confidence Card";

    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (card.totalScore / 100) * circumference;

    dom.sheetBody.innerHTML = `
      <div class="confidence-card">
        <div class="confidence-hero animate-fade-in">
          <img class="confidence-hero__image" src="${card.product.image}" alt="${card.product.name}">
          <div class="confidence-hero__info">
            <div class="confidence-hero__brand">${card.product.brand}</div>
            <div class="confidence-hero__name">${card.product.name}</div>
            <div class="confidence-hero__price">
              <span class="confidence-hero__price-current">₹${card.product.price.toLocaleString('en-IN')}</span>
              <span class="confidence-hero__price-original">₹${card.product.originalPrice.toLocaleString('en-IN')}</span>
              <span class="confidence-hero__price-off">${card.product.discount}% off</span>
            </div>
          </div>
        </div>
        <div class="confidence-score animate-scale-in" style="animation-delay: 100ms">
          <div class="confidence-score__circle">
            <svg viewBox="0 0 90 90">
              <circle class="confidence-score__circle-bg" cx="45" cy="45" r="${radius}"/>
              <circle class="confidence-score__circle-fill" cx="45" cy="45" r="${radius}"
                stroke="${card.color}" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/>
            </svg>
            <div class="confidence-score__value">
              <span class="confidence-score__number" style="color: ${card.color}">${card.totalScore}</span>
              <span class="confidence-score__max">/100</span>
            </div>
          </div>
          <div class="confidence-score__details">
            <div class="confidence-score__label" style="color: ${card.color}">${card.label} Confidence</div>
            <div class="confidence-score__sublabel">Based on ${card.product.reviewCount} reviews & product data</div>
          </div>
        </div>
        <div class="confidence-attrs stagger-children">
          ${card.attributes.map(attr => `
            <div class="confidence-attr animate-slide-up">
              <div class="confidence-attr__icon ${attr.sentiment}">${attr.icon}</div>
              <div class="confidence-attr__text">
                <div class="confidence-attr__label">${attr.label}</div>
                <div class="confidence-attr__value">${attr.value}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="confidence-highlights">
          ${card.strengths.map(s => `<div class="confidence-highlight strength animate-slide-up">${icons.checkCircle} ${s}</div>`).join('')}
          ${card.concerns.map(c => `<div class="confidence-highlight concern animate-slide-up">${icons.alertCircle} ${c}</div>`).join('')}
        </div>
        <button class="btn-add-bag" onclick="showToast('Added to bag! 🎉')">
          ${icons.bag} Add to Bag — ₹${card.product.price.toLocaleString('en-IN')}
        </button>
      </div>
    `;
    openSheet();
  }

  // ============================================================
  // BOTTOM SHEET: AI Review Summary
  // ============================================================
  function showReviewSummary(productId) {
    const summary = orchestrator.getReviewSummary(productId);
    if (!summary) return;

    state.currentSheet = "reviews";
    state.currentProductId = productId;
    dom.sheetTitle.textContent = "AI Review Summary";

    dom.sheetBody.innerHTML = `
      <div class="review-summary">
        <div class="review-summary__trust animate-fade-in">
          ${icons.verified}
          Based on ${summary.totalReviewsAnalysed} verified reviews • AI-powered summary
        </div>
        ${REVIEW_CATEGORIES.map((cat, i) => {
          const catData = summary.categories[cat.key];
          if (!catData) return '';
          const linkedReviews = catData.reviewIds.map(rid => summary.linkedReviews[rid]).filter(Boolean);
          return `
            <div class="review-category animate-slide-up" style="animation-delay: ${i * 60}ms" data-category="${cat.key}">
              <div class="review-category__header" onclick="toggleReviewCategory('${cat.key}')">
                <div class="review-category__sentiment ${catData.sentiment}">${cat.emoji}</div>
                <div class="review-category__content">
                  <div class="review-category__label">${cat.label}</div>
                  <div class="review-category__summary">${catData.summary}</div>
                </div>
                <div class="review-category__toggle">${icons.chevronDown}</div>
              </div>
              <div class="review-category__reviews">
                <div class="review-category__reviews-inner">
                  ${linkedReviews.map(r => `
                    <div class="review-item">
                      <div class="review-item__header">
                        <span class="review-item__user">${r.userName}</span>
                        ${r.verified ? `<span class="review-item__badge">${icons.verified} Verified</span>` : ''}
                      </div>
                      <div class="review-item__stars">
                        ${Array.from({length: 5}, (_, j) => j < r.rating ? icons.star : icons.starEmpty).join('')}
                      </div>
                      <div class="review-item__text">${r.text}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
    openSheet();
  }

  window.toggleReviewCategory = function (key) {
    const el = $(`.review-category[data-category="${key}"]`);
    if (el) el.classList.toggle("expanded");
  };

  // ============================================================
  // SHEET CONTROL
  // ============================================================
  function openSheet() {
    dom.overlay.classList.add("visible");
    dom.bottomSheet.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  function closeSheet() {
    dom.overlay.classList.remove("visible");
    dom.bottomSheet.classList.remove("visible");
    document.body.style.overflow = "";
    state.currentSheet = null;
    state.currentProductId = null;
  }

  // ============================================================
  // TOAST
  // ============================================================
  function showToast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add("visible");
    setTimeout(() => dom.toast.classList.remove("visible"), 2500);
  }
  window.showToast = showToast;

  // ============================================================
  // CATEGORY FILTER
  // ============================================================
  function handleCategoryClick(e) {
    const tab = e.target.closest(".category-tab");
    if (!tab) return;

    $$(".category-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    state.activeCategory = tab.dataset.category;

    // Update title
    dom.homeTitle.textContent = state.activeCategory === "all" ? "Trending Now" : tab.textContent;

    renderHomeGrid();
  }

  // ============================================================
  // EVENT LISTENERS
  // ============================================================

  // Login
  dom.loginBtn.addEventListener("click", handleLogin);
  dom.phoneInput.addEventListener("keydown", (e) => { if (e.key === "Enter") handleLogin(); });
  dom.resendBtn.addEventListener("click", () => showToast("OTP resent!"));

  // Home grid — wishlist heart
  dom.homeGrid.addEventListener("click", (e) => {
    const heartBtn = e.target.closest("[data-action='wishlist']");
    if (heartBtn) {
      e.stopPropagation();
      const card = heartBtn.closest(".product-card");
      if (card) toggleWishlist(card.dataset.productId);
      return;
    }

    // Clicking anywhere else on card in home → open confidence card
    const card = e.target.closest(".product-card");
    if (card) {
      showConfidenceCard(card.dataset.productId);
    }
  });

  // Wishlist grid — select / actions
  dom.wishlistGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const productId = card.dataset.productId;
    const action = e.target.closest("[data-action]");

    if (action) {
      e.stopPropagation();
      const actionType = action.dataset.action;
      if (actionType === "select") { toggleSelection(productId); return; }
      if (actionType === "confidence") { showConfidenceCard(productId); return; }
      if (actionType === "reviews") { showReviewSummary(productId); return; }
    }

    // Default: if items are selected, toggle selection; else open confidence card
    if (state.selectedIds.size > 0) {
      toggleSelection(productId);
    } else {
      showConfidenceCard(productId);
    }
  });

  // Category tabs
  dom.categoryTabs.addEventListener("click", handleCategoryClick);

  // Promo close
  dom.promoClose.addEventListener("click", () => {
    dom.promoBanner.style.display = "none";
  });

  // Compare CTA
  dom.compareCta.addEventListener("click", showCompareScreen);
  dom.compareBack.addEventListener("click", hideCompareScreen);

  // Browse button (empty wishlist)
  dom.browseBtn.addEventListener("click", () => navigateTo("home-screen"));

  // Bottom nav
  dom.bottomNav.addEventListener("click", (e) => {
    const item = e.target.closest(".bottom-nav__item");
    if (item) navigateTo(item.dataset.screen);
  });

  // Sheet
  dom.sheetClose.addEventListener("click", closeSheet);
  dom.overlay.addEventListener("click", closeSheet);

  // ============================================================
  // INIT
  // ============================================================
  function init() {
    setupOTPInputs();
    // Pre-render home grid (hidden until login)
    renderHomeGrid();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
