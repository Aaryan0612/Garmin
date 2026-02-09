// ============================================
// GARMIN INDIA - MAIN JAVASCRIPT
// Scroll Effects, Animations, Mobile Menu
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // NAVIGATION SCROLL EFFECT
  // ============================================

  const navbar = document.getElementById("navbar");
  let lastScrollY = window.scrollY;

  const handleNavScroll = () => {
    const currentScrollY = window.scrollY;

    // Add 'scrolled' class when user scrolls past 50px
    if (currentScrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScrollY = currentScrollY;
  };

  // Throttle scroll event for better performance
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleNavScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================

  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuBackdrop = document.getElementById("mobileMenuBackdrop");

  if (mobileMenuToggle && mobileMenu) {
    // Toggle menu open/close
    const toggleMobileMenu = (forceClose = false) => {
      const isActive = forceClose
        ? false
        : !mobileMenu.classList.contains("active");

      mobileMenu.classList.toggle("active", isActive);
      mobileMenuToggle.classList.toggle("active", isActive);
      mobileMenuBackdrop.classList.toggle("active", isActive);

      // Update ARIA
      mobileMenuToggle.setAttribute("aria-expanded", isActive);

      // Prevent body scroll when menu is open
      document.body.style.overflow = isActive ? "hidden" : "";
    };

    // Open/close menu on button click
    mobileMenuToggle.addEventListener("click", () => {
      toggleMobileMenu();
    });

    // Close menu when clicking backdrop
    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.addEventListener("click", () => {
        toggleMobileMenu(true);
      });
    }

    // Close menu when clicking on direct links (not submenu toggle buttons)
    const mobileMenuLinks = mobileMenu.querySelectorAll(
      ".mobile-menu-item > a",
    );
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        toggleMobileMenu(true);
      });
    });
  }

  // ============================================
  // MOBILE SUBMENU ACCORDION TOGGLES
  // ============================================

  const submenuToggles = document.querySelectorAll(".mobile-submenu-toggle");

  submenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const isExpanded = toggle.classList.contains("active");
      const submenu = toggle.nextElementSibling;

      // Toggle active state
      toggle.classList.toggle("active");
      submenu.classList.toggle("active");

      // Update ARIA
      toggle.setAttribute("aria-expanded", !isExpanded);
    });
  });

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // Using Intersection Observer API
  // ============================================

  const revealElements = document.querySelectorAll(".scroll-reveal");

  const revealOnScroll = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add stagger delay for sequential animation
          setTimeout(() => {
            entry.target.classList.add("revealed");
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((element) => {
    revealOnScroll.observe(element);
  });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Skip empty anchors
      if (href === "#") return;

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();

        const navHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ============================================
  // LAZY LOAD IMAGES
  // For images below the fold
  // ============================================

  const lazyImages = document.querySelectorAll("img[data-src]");

  const lazyLoad = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => {
    lazyLoad.observe(img);
  });

  // ============================================
  // VIDEO PLAYBACK OPTIMIZATION
  // Pause video when not in viewport (performance)
  // ============================================

  const heroVideo = document.querySelector(".hero-video");

  if (heroVideo) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heroVideo.play();
          } else {
            heroVideo.pause();
          }
        });
      },
      { threshold: 0.5 },
    );

    videoObserver.observe(heroVideo);
  }

  // ============================================
  // KEYBOARD NAVIGATION ENHANCEMENT
  // Better focus visibility for accessibility
  // ============================================

  let isUsingKeyboard = false;

  window.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      isUsingKeyboard = true;
      document.body.classList.add("keyboard-nav");
    }
  });

  window.addEventListener("mousedown", () => {
    isUsingKeyboard = false;
    document.body.classList.remove("keyboard-nav");
  });

  // ============================================
  // LOG INITIALIZATION
  // ============================================

  console.log("🚀 Garmin India - Precision Performance");
  console.log("Site initialized successfully");
});
