/**
 * WEARABLES.JS
 * Handles Quick View Modal interactions with Rich Content
 */

document.addEventListener("DOMContentLoaded", () => {
  const modalBackdrop = document.getElementById("quickViewModal");
  const modalCloseBtn = document.getElementById("modalClose");

  // UI Elements to update
  const modalImage = document.getElementById("modalImage");
  const modalEyebrow = document.getElementById("modalEyebrow");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalFeatures = document.getElementById("modalFeatures");
  const modalFullDetailsBtn = document.getElementById("modalFullDetailsBtn");

  // Note: modalBuyBtn is not dynamically updated in this version,
  // but we could add that if needed.

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
  };

  // ============================================
  // PRODUCT DATA STORE
  // ============================================
  const productData = {
    // PERFORMANCE
    "fenix-8": {
      title: "Fēnix 8",
      price: "From ₹86,990",
      eyebrow: "Ultimate Adventure",
      image: "./assets/images/products/fenix-8.png",
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
      image: "./assets/images/products/fenix-8.png", // Using placeholder image
      link: "#",
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
      title: "Enduro 2",
      price: "From ₹99,990",
      eyebrow: "Ultra Endurance",
      image: "./assets/images/products/fenix-8.png", // Placeholder
      link: "#",
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
      image: "./assets/images/products/fenix-8.png", // Placeholder
      link: "#",
      features: [
        {
          icon: "solar",
          title: "Unlimited Battery Life",
          text: "Never charge again in smartwatch mode with sufficient solar exposure.",
        },
        {
          icon: "check",
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

    // RUNNING
    "forerunner-965": {
      title: "Forerunner 965",
      price: "₹67,490",
      eyebrow: "Premium Running",
      image: "./assets/images/products/forerunner-965.png",
      link: "#",
      features: [
        {
          icon: "display",
          title: "Colorful AMOLED Touchscreen",
          text: "See your stats and maps in vibrant detail on a lightweight titanium bezel watch.",
        },
        {
          icon: "gps",
          title: "Full-Color Mapping",
          text: "Whether you're running on city streets or riding densely covered trails, Forerunner 965 provides full-color, built-in mapping.",
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
      image: "./assets/images/products/forerunner-965.png", // PLaceholder
      link: "#",
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
      image: "./assets/images/products/forerunner-965.png", // PLaceholder
      link: "#",
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

    // LIFESTYLE
    "venu-3": {
      title: "Venu 3",
      price: "₹50,490",
      eyebrow: "Smart & Health",
      image: "./assets/images/products/venu-3.png",
      link: "#",
      features: [
        {
          icon: "health",
          title: "Body Battery™ Energy Monitoring",
          text: "See your energy levels throughout the day so you'll know when your body is charged up and ready for activity.",
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
      image: "./assets/images/products/venu-3.png", // Placeholder
      link: "#",
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
      image: "./assets/images/products/venu-3.png", // Placeholder
      link: "#",
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
  };

  // ============================================
  // FUNCTIONS
  // ============================================

  function closeModal() {
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openModal(id) {
    const data = productData[id];
    if (!data) return; // Guard clause

    // Populate Basic Info
    modalImage.src = data.image;
    modalEyebrow.textContent = data.eyebrow;
    modalTitle.textContent = data.title;
    modalPrice.textContent = data.price;

    // Populate Features
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
        </div>
      `;
      modalFeatures.appendChild(div);
    });

    // Handle Link
    if (data.link && data.link !== "#") {
      modalFullDetailsBtn.href = data.link;
      modalFullDetailsBtn.style.display = "inline-flex";
    } else {
      modalFullDetailsBtn.style.display = "none";
    }

    // Show Modal
    modalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Event Listeners
  const productCards = document.querySelectorAll(".w-card");

  productCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // If user clicked the "Buy" button, do not open modal (let it do its own thing)
      if (e.target.closest(".w-btn-buy")) return;

      e.preventDefault();
      const id = card.dataset.id;
      if (id) {
        openModal(id);
      } else {
        console.error("No product ID found for card");
      }
    });
  });

  // Close handlers
  modalCloseBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("active")) {
      closeModal();
    }
  });
});
