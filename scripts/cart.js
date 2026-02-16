/**
 * CART.JS
 * localStorage-based shopping cart manager for Garmin.
 * Exposes window.GarminCart API. Auto-initialises on every page.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "garmin_cart";

  // ── helpers ──────────────────────────────────────
  function resolveAssetPath(relativePath) {
    const depth = parseInt(
      document.documentElement.getAttribute("data-depth") || "0",
      10,
    );
    const prefix = depth > 0 ? "../".repeat(depth) : "./";
    return prefix + relativePath.replace(/^\.\//, "");
  }

  function parsePrice(str) {
    if (!str) return 0;
    const cleaned = str.replace(/[^0-9.]/g, "");
    return parseFloat(cleaned) || 0;
  }

  // ── state ────────────────────────────────────────
  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  // ── public API ───────────────────────────────────
  const Cart = {
    /** Returns a deep copy of the cart items array */
    getItems() {
      return load();
    },

    /** Total number of items with quantities */
    getCount() {
      return load().reduce((sum, i) => sum + i.qty, 0);
    },

    /** Total price */
    getTotal() {
      return load().reduce((sum, i) => sum + i.price * i.qty, 0);
    },

    /** Add a product by its data-id. Increments quantity if already in cart. */
    add(productId) {
      const products = window.GarminProducts;
      if (!products || !products[productId]) {
        console.warn(`[Cart] Unknown product: "${productId}"`);
        return;
      }

      const product = products[productId];
      const items = load();
      const existing = items.find((i) => i.id === productId);

      if (existing) {
        existing.qty += 1;
      } else {
        items.push({
          id: productId,
          title: product.title,
          eyebrow: product.eyebrow || "",
          price: parsePrice(product.price),
          priceLabel: product.price,
          image: product.image,
          qty: 1,
        });
      }

      save(items);
      Cart.updateBadge();
      Cart.showToast(product.title);
    },

    /** Remove a product entirely */
    remove(productId) {
      const items = load().filter((i) => i.id !== productId);
      save(items);
      Cart.updateBadge();
    },

    /** Set specific quantity. If qty <= 0, removes the item. */
    updateQty(productId, qty) {
      const items = load();
      const item = items.find((i) => i.id === productId);
      if (!item) return;
      if (qty <= 0) {
        Cart.remove(productId);
        return;
      }
      item.qty = qty;
      save(items);
      Cart.updateBadge();
    },

    /** Sync the .cart-count badge on all pages */
    updateBadge() {
      const count = Cart.getCount();
      document.querySelectorAll(".cart-count").forEach((badge) => {
        badge.textContent = count;
        badge.style.display = count > 0 ? "flex" : "none";
      });
    },

    /** Show a brief toast notification */
    showToast(productName) {
      // Remove existing toast
      const old = document.getElementById("cartToast");
      if (old) old.remove();

      const toast = document.createElement("div");
      toast.id = "cartToast";
      toast.className = "cart-toast";
      toast.innerHTML = `
        <div class="cart-toast-inner">
          <svg class="cart-toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <div class="cart-toast-text">
            <strong>${productName}</strong> added to your bag
          </div>
          <a href="${resolveAssetPath("cart.html")}" class="cart-toast-link">View Bag</a>
        </div>
      `;
      document.body.appendChild(toast);

      // Animate in
      requestAnimationFrame(() => {
        toast.classList.add("show");
      });

      // Auto-dismiss after 3s
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 400);
      }, 3000);
    },
  };

  // ── Inject toast CSS ─────────────────────────────
  function injectToastStyles() {
    if (document.getElementById("cartToastStyles")) return;
    const style = document.createElement("style");
    style.id = "cartToastStyles";
    style.textContent = `
      .cart-toast {
        position: fixed;
        top: 80px;
        right: 24px;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%) scale(0.95);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
      }
      .cart-toast.show {
        opacity: 1;
        transform: translateX(0) scale(1);
        pointer-events: auto;
      }
      .cart-toast-inner {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #fff;
        border: 1px solid #e5e5e7;
        border-radius: 14px;
        padding: 14px 20px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
        min-width: 280px;
        max-width: 400px;
      }
      .cart-toast-icon {
        width: 22px;
        height: 22px;
        flex-shrink: 0;
        color: #34c759;
      }
      .cart-toast-text {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
        color: #1d1d1f;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      .cart-toast-text strong {
        font-weight: 600;
      }
      .cart-toast-link {
        flex-shrink: 0;
        font-size: 14px;
        font-weight: 600;
        color: #0071e3;
        text-decoration: none;
        white-space: nowrap;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      .cart-toast-link:hover {
        text-decoration: underline;
      }
      @media (max-width: 600px) {
        .cart-toast {
          right: 12px;
          left: 12px;
        }
        .cart-toast-inner {
          min-width: auto;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ── Wire Buy buttons via delegation ──────────────
  function initBuyButtons() {
    document.body.addEventListener("click", (e) => {
      // Product card Buy buttons
      const buyBtn = e.target.closest(".w-btn-buy");
      if (buyBtn) {
        e.preventDefault();
        e.stopPropagation();
        const card = buyBtn.closest(".w-card");
        if (card && card.dataset.id) {
          Cart.add(card.dataset.id);
        }
        return;
      }

      // Modal Buy Now button
      if (e.target.closest("#modalBuyBtn")) {
        e.preventDefault();
        const modal = document.getElementById("quickViewModal");
        if (modal && modal.classList.contains("active")) {
          // Find current product ID from the modal title
          const titleEl = document.getElementById("modalTitle");
          if (titleEl) {
            const products = window.GarminProducts || {};
            const productId = Object.keys(products).find(
              (key) => products[key].title === titleEl.textContent,
            );
            if (productId) {
              Cart.add(productId);
            }
          }
        }
        return;
      }
    });
  }

  // ── Init ─────────────────────────────────────────
  function init() {
    injectToastStyles();
    initBuyButtons();
    Cart.updateBadge();
  }

  // Expose globally
  window.GarminCart = Cart;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
