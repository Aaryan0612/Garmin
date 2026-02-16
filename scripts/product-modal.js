/**
 * PRODUCT-MODAL.JS
 * Universal Quick View Modal — works on any page with .w-card elements.
 * Dynamically injects modal HTML and uses event delegation.
 */

(function () {
  "use strict";

  // ============================================
  // ICON SYSTEM (SVG STRINGS)
  // ============================================
  const icons = {
    heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 7.65l.77.78L12 21.23l7.65-7.64.77-.78a5.4 5.4 0 0 0 0-7.65z"></path></svg>`,
    battery: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line></svg>`,
    gps: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>`,
    display: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
    flashlight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>`,
    solar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    health: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
    coach: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
    sleep: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    rugged: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>`,
    navigation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 19 21 12 17 5 21 12 2"></polygon></svg>`,
    screen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
    satellite: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path></svg>`,
  };

  // ============================================
  // PRODUCT DATA STORE
  // Centralized. One source of truth.
  // ============================================
  const productData = {
    // ── PERFORMANCE WATCHES ──
    "fenix-8": {
      title: "Fēnix 8",
      price: "From ₹86,990",
      eyebrow: "Ultimate Adventure",
      image: "./assets/watchImages/fenix-8.webp",
      link: "./products/fenix-8.html",
      features: [
        {
          icon: "display",
          title: "Stunning AMOLED Display",
          text: "A bright, easy-to-read screen that brings maps and data to life in any lighting condition.",
        },
        {
          icon: "flashlight",
          title: "Built-in LED Flashlight",
          text: "Variable intensities and strobe modes give you convenient illumination when you need it most.",
        },
        {
          icon: "battery",
          title: "Endurance Battery Life",
          text: "Go up to 28 days in smartwatch mode, far outlasting the competition.",
        },
        {
          icon: "gps",
          title: "Multi-Band GNSS",
          text: "Superior accuracy in challenging environments like deep canyons or dense forests.",
        },
      ],
    },
    "epix-pro": {
      title: "Epix Pro (Gen 2)",
      price: "From ₹89,990",
      eyebrow: "High Performance",
      image: "./assets/watchImages/epix-pro.webp",
      link: "./products/epix.html",
      features: [
        {
          icon: "display",
          title: "Brilliant AMOLED Display",
          text: "Crystal clear visuals for your maps, stats, and notifications.",
        },
        {
          icon: "battery",
          title: "Weeks of Battery",
          text: "Get up to 31 days of battery life in smartwatch mode.",
        },
        {
          icon: "health",
          title: "Advanced Training Metrics",
          text: "Hill score, endurance score, and more to help you understand your training effort.",
        },
      ],
    },
    "enduro-2": {
      title: "Enduro 3",
      price: "From ₹99,990",
      eyebrow: "Ultra Endurance",
      image: "./assets/watchImages/enduro3.webp",
      link: "./products/enduro.html",
      features: [
        {
          icon: "solar",
          title: "Solar Charging",
          text: "Harvest the sun's energy to extend battery life for the longest races.",
        },
        {
          icon: "battery",
          title: "Unmatched Battery Life",
          text: "Up to 150 hours of GPS battery life with solar charging.",
        },
        {
          icon: "flashlight",
          title: "Super Bright Flashlight",
          text: "Twice as bright as the fēnix 7X so you can see and be seen.",
        },
      ],
    },
    "instinct-2x": {
      title: "Instinct 2X Solar",
      price: "From ₹45,990",
      eyebrow: "Rugged",
      image: "./assets/watchImages/instinct.webp",
      link: "./products/instinct.html",
      features: [
        {
          icon: "solar",
          title: "Unlimited Battery Life",
          text: "Never charge again in smartwatch mode with sufficient solar exposure.",
        },
        {
          icon: "rugged",
          title: "Military Standard Toughness",
          text: "Built to U.S. military standard 810 for thermal, shock and water resistance.",
        },
        {
          icon: "flashlight",
          title: "Built-in Torch",
          text: "Integrated flashlight with red light mode for tactical operations.",
        },
      ],
    },

    // ── RUNNING & FITNESS ──
    "forerunner-965": {
      title: "Forerunner 965",
      price: "₹67,490",
      eyebrow: "Premium Running",
      image: "./assets/watchImages/Forerunner 965.webp",
      link: "./products/forerunner-965.html",
      features: [
        {
          icon: "display",
          title: "Colorful AMOLED Touchscreen",
          text: "See your stats and maps in vibrant detail on a lightweight titanium bezel watch.",
        },
        {
          icon: "gps",
          title: "Full-Color Mapping",
          text: "Built-in full-color mapping for city streets and densely covered trails.",
        },
        {
          icon: "health",
          title: "Training Readiness",
          text: "Know when you're primed for a productive session based on sleep, recovery, and training load.",
        },
      ],
    },
    "forerunner-265": {
      title: "Forerunner 265",
      price: "₹50,490",
      eyebrow: "Advanced Running",
      image: "./assets/watchImages/Forerunner 265.webp",
      link: "./products/forerunner-265.html",
      features: [
        {
          icon: "display",
          title: "Bright AMOLED Display",
          text: "Easy to read in direct sunlight, perfect for outdoor runs.",
        },
        {
          icon: "coach",
          title: "Morning Report",
          text: "Receive an overview of your sleep, recovery and training outlook as soon as you wake up.",
        },
        {
          icon: "health",
          title: "Race Widget",
          text: "Get training tips, daily suggested workouts and completion time predictions.",
        },
      ],
    },
    "forerunner-165": {
      title: "Forerunner 165",
      price: "₹28,990",
      eyebrow: "Entry Level",
      image: "./assets/watchImages/Forerunner 165.webp",
      link: "./products/forerunner-165.html",
      features: [
        {
          icon: "display",
          title: "Vibrant Display",
          text: "See your stats on a bright AMOLED display.",
        },
        {
          icon: "battery",
          title: "11 Days Battery",
          text: "Leave your charger at home with up to 11 days of battery life.",
        },
        {
          icon: "coach",
          title: "Garmin Coach",
          text: "Get free adaptive training plans from expert coaches.",
        },
      ],
    },

    // ── LIFESTYLE ──
    "venu-3": {
      title: "Venu 3",
      price: "₹50,490",
      eyebrow: "Smart & Health",
      image: "./assets/watchImages/venu3.webp",
      link: "./products/venu-3.html",
      features: [
        {
          icon: "health",
          title: "Body Battery™ Energy Monitoring",
          text: "See your energy levels throughout the day so you'll know when your body is charged up.",
        },
        {
          icon: "sleep",
          title: "Sleep Coach",
          text: "Get a sleep score and personalized coaching for how much sleep you need.",
        },
        {
          icon: "check",
          title: "Wheelchair Mode",
          text: "Tracks pushes rather than steps and includes push and handcycle activities.",
        },
      ],
    },
    "vivoactive-5": {
      title: "Vívoactive 5",
      price: "₹31,990",
      eyebrow: "Everyday Smart",
      image: "./assets/watchImages/vivoactive 5 .webp",
      link: "./products/vivoactive.html",
      features: [
        {
          icon: "battery",
          title: "11 Days Battery Life",
          text: "Get a complete picture of your health, not just a snapshot.",
        },
        {
          icon: "sleep",
          title: "Sleep Coaching",
          text: "Understand your recovery with sleep score and personalized coaching.",
        },
        {
          icon: "health",
          title: "30+ Sports Apps",
          text: "Track all the ways you move with more than 30 preloaded GPS and indoor sports apps.",
        },
      ],
    },
    "lily-2": {
      title: "Lily 2",
      price: "₹27,990",
      eyebrow: "Fashion Smartwatch",
      image: "./assets/watchImages/lily2.webp",
      link: "./products/lily.html",
      features: [
        {
          icon: "display",
          title: "Hidden Display",
          text: "A unique patterned lens reveals a bright touchscreen display with a tap.",
        },
        {
          icon: "check",
          title: "Small & Stylish",
          text: "The smallest smartwatch from Garmin, designed to look like jewelry.",
        },
        {
          icon: "health",
          title: "Health Monitoring",
          text: "Track your steps, sleep, energy levels and more.",
        },
      ],
    },

    // ── LANDING PAGE: OFF-ROAD & NAVIGATION ──
    "tread-xl": {
      title: "Tread® XL",
      price: "From ₹1,49,990",
      eyebrow: "All-Terrain Navigator",
      image: "./assets/images/products/edge-1050.png",
      link: "./products/tread-xl.html",
      features: [
        {
          icon: "screen",
          title: '10" HD Touchscreen',
          text: "Largest display in the Tread lineup for crystal-clear trail navigation.",
        },
        {
          icon: "map",
          title: "Topographic Maps",
          text: "Preloaded with detailed topographic maps and BirdsEye satellite imagery.",
        },
        {
          icon: "rugged",
          title: "Built for the Trail",
          text: "MIL-STD-810 rugged construction for off-road vibration, shock, and water.",
        },
      ],
    },
    "tread-2": {
      title: "Tread® 2",
      price: "From ₹89,990",
      eyebrow: "All-Terrain Navigator",
      image: "./assets/images/products/edge-1050.png",
      link: "./products/tread-2.html",
      features: [
        {
          icon: "screen",
          title: '8" Touchscreen',
          text: "Bright, sunlight-readable display with pinch-to-zoom mapping.",
        },
        {
          icon: "satellite",
          title: "Group Tracking",
          text: "See your entire group's location in real time on the trail.",
        },
        {
          icon: "map",
          title: "Off-Road Trails",
          text: "Access to millions of miles of roads and trails worldwide.",
        },
      ],
    },
    overlander: {
      title: "Overlander®",
      price: "From ₹67,990",
      eyebrow: "Rugged GPS Navigator",
      image: "./assets/images/products/edge-1050.png",
      link: "./products/overlander.html",
      features: [
        {
          icon: "map",
          title: "Topographic Mapping",
          text: "Dedicated off-grid topographic mapping for overlanding adventures.",
        },
        {
          icon: "navigation",
          title: "Turn-by-Turn Navigation",
          text: "On and off-road navigation with custom routing for your vehicle type.",
        },
        {
          icon: "rugged",
          title: '7" Rugged Display',
          text: "Glove-friendly touchscreen built to withstand the harshest conditions.",
        },
      ],
    },
    "montana-700": {
      title: "Montana® 700",
      price: "From ₹54,990",
      eyebrow: "Handheld GPS",
      image: "./assets/images/products/edge-1050.png",
      link: "./products/montana-700.html",
      features: [
        {
          icon: "screen",
          title: '5" Touchscreen',
          text: "Glove-friendly touchscreen that works in portrait or landscape mode.",
        },
        {
          icon: "satellite",
          title: "inReach Technology",
          text: "Two-way satellite messaging and interactive SOS from anywhere.",
        },
        {
          icon: "battery",
          title: "Multi-Day Battery",
          text: "Up to 18 hours of battery life with full GPS tracking.",
        },
      ],
    },
    "edge-1050": {
      title: "Edge 1050",
      price: "From ₹69,990",
      eyebrow: "Cycling Computer",
      image: "./assets/images/products/edge-1050.png",
      link: "./products/edge-1050.html",
      features: [
        {
          icon: "screen",
          title: '3.5" HD Touchscreen',
          text: "The largest and sharpest display in the Edge lineup for detailed ride data.",
        },
        {
          icon: "map",
          title: "Full-Color Mapping",
          text: "Preloaded maps with popularity routing and real-time trail conditions.",
        },
        {
          icon: "health",
          title: "Performance Metrics",
          text: "Advanced cycling dynamics, power data, and training load analysis.",
        },
      ],
    },
  };

  // Expose product data globally for cart.js
  window.GarminProducts = productData;

  // ============================================
  // HELPER: Resolve relative paths based on page depth
  // ============================================
  function resolveAssetPath(relativePath) {
    const depth = parseInt(
      document.documentElement.getAttribute("data-depth") || "0",
      10,
    );
    const prefix = depth > 0 ? "../".repeat(depth) : "./";
    // Remove leading ./ from the relative path
    const cleanPath = relativePath.replace(/^\.\//, "");
    return prefix + cleanPath;
  }

  // ============================================
  // INJECT MODAL HTML
  // ============================================
  function injectModal() {
    if (document.getElementById("quickViewModal")) return; // Already exists

    const modalHTML = `
    <div class="modal-backdrop" id="quickViewModal" aria-hidden="true">
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <button class="modal-close" id="modalClose" aria-label="Close modal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="modal-visual">
          <img src="" alt="Product Image" class="modal-image" id="modalImage" />
        </div>
        <div class="modal-content-area">
          <div class="modal-header">
            <span class="modal-eyebrow" id="modalEyebrow">Collection</span>
            <h2 class="modal-title" id="modalTitle">Product Name</h2>
            <div class="modal-price-row">
              <span class="modal-price" id="modalPrice">₹00,000</span>
              <span class="modal-emi">EMI available</span>
            </div>
            <div class="modal-actions">
              <button class="btn-modal-primary" id="modalBuyBtn">Buy Now</button>
              <a href="#" class="btn-modal-secondary" id="modalFullDetailsBtn">Explore further</a>
            </div>
            <div class="modal-features" id="modalFeatures"></div>
          </div>
        </div>
      </div>
    </div>`;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  // ============================================
  // MODAL LOGIC
  // ============================================
  function closeModal() {
    const backdrop = document.getElementById("quickViewModal");
    if (backdrop) {
      backdrop.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  function openModal(id) {
    const data = productData[id];
    if (!data) {
      console.warn(`Product data not found for id: "${id}"`);
      return;
    }

    const modalImage = document.getElementById("modalImage");
    const modalEyebrow = document.getElementById("modalEyebrow");
    const modalTitle = document.getElementById("modalTitle");
    const modalPrice = document.getElementById("modalPrice");
    const modalFeatures = document.getElementById("modalFeatures");
    const modalFullDetailsBtn = document.getElementById("modalFullDetailsBtn");
    const backdrop = document.getElementById("quickViewModal");

    // Populate
    modalImage.src = resolveAssetPath(data.image);
    modalEyebrow.textContent = data.eyebrow;
    modalTitle.textContent = data.title;
    modalPrice.textContent = data.price;

    // Features
    modalFeatures.innerHTML = "";
    data.features.forEach((feature) => {
      const div = document.createElement("div");
      div.className = "feature-item";
      const iconSvg = icons[feature.icon] || icons.check;
      div.innerHTML = `
        <div class="feature-icon-wrapper">${iconSvg}</div>
        <div class="feature-content">
          <h4 class="feature-title">${feature.title}</h4>
          <p class="feature-desc">${feature.text}</p>
        </div>`;
      modalFeatures.appendChild(div);
    });

    // Link
    if (data.link && data.link !== "#") {
      modalFullDetailsBtn.href = resolveAssetPath(data.link);
      modalFullDetailsBtn.style.display = "inline-flex";
    } else {
      modalFullDetailsBtn.style.display = "none";
    }

    // Show
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // ============================================
  // EVENT DELEGATION — catches clicks on .w-card anywhere
  // ============================================
  function initEventDelegation() {
    document.body.addEventListener("click", (e) => {
      // Ignore clicks on Buy buttons
      if (e.target.closest(".w-btn-buy")) return;

      const card = e.target.closest(".w-card");
      if (!card) return;

      e.preventDefault();
      const id = card.dataset.id;
      if (id) {
        openModal(id);
      }
    });

    // Close handlers
    document.body.addEventListener("click", (e) => {
      if (e.target.id === "quickViewModal") closeModal();
      if (e.target.closest("#modalClose")) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      const backdrop = document.getElementById("quickViewModal");
      if (
        e.key === "Escape" &&
        backdrop &&
        backdrop.classList.contains("active")
      ) {
        closeModal();
      }
    });
  }

  // ============================================
  // INIT — run on DOMContentLoaded
  // ============================================
  function init() {
    // Only inject modal if the page has product cards
    const hasCards = document.querySelector(".w-card");
    if (hasCards) {
      injectModal();
      initEventDelegation();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
