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
  // MEGA OVERLAY SYSTEM (Detached Fixed Panel)
  // Nav triggers visibility. It does not control geometry.
  // All panels exist in DOM. Only visibility changes.
  // ============================================

  const megaOverlay = document.getElementById("megaOverlay");
  const navItems = document.querySelectorAll(".nav-item[data-category]");
  let closeTimeout = null;
  let currentCategory = null;

  // Show overlay with specific category panel
  const showOverlay = (category) => {
    // Clear any pending close
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }

    // Activate overlay
    megaOverlay.classList.add("active");

    // Only swap content if category changed
    if (category !== currentCategory) {
      // Hide all panels (visibility only, no DOM changes)
      document.querySelectorAll(".mega-panel").forEach((panel) => {
        panel.classList.remove("active");
      });

      // Show target panel
      const targetPanel = document.getElementById(`panel-${category}`);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }

      // Update active nav item indicator
      navItems.forEach((item) => {
        if (item.dataset.category === category) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      currentCategory = category;
    }
  };

  // Hide overlay with delay for usability
  const hideOverlay = () => {
    closeTimeout = setTimeout(() => {
      megaOverlay.classList.remove("active");
      navItems.forEach((item) => item.classList.remove("active"));
      currentCategory = null;
    }, 150); // 150ms delay allows mouse to reach panel
  };

  // Nav item hover events
  navItems.forEach((item) => {
    const category = item.dataset.category;

    item.addEventListener("mouseenter", () => {
      showOverlay(category);
    });

    item.addEventListener("mouseleave", () => {
      hideOverlay();
    });
  });

  // Overlay hover events (keep open when mouse is on panel)
  if (megaOverlay) {
    megaOverlay.addEventListener("mouseenter", () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
    });

    megaOverlay.addEventListener("mouseleave", () => {
      hideOverlay();
    });

    // Close on click outside (on overlay background)
    megaOverlay.addEventListener("click", (e) => {
      if (e.target === megaOverlay) {
        megaOverlay.classList.remove("active");
        navItems.forEach((item) => item.classList.remove("active"));
        currentCategory = null;
      }
    });
  }

  // Close overlay on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && megaOverlay?.classList.contains("active")) {
      megaOverlay.classList.remove("active");
      navItems.forEach((item) => item.classList.remove("active"));
      currentCategory = null;
    }
  });

  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================

  const mobileToggle = document.getElementById("mobileToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileBackdrop = document.getElementById("mobileBackdrop");

  if (mobileToggle && mobileMenu) {
    // Toggle menu open/close
    const toggleMobileMenu = (forceClose = false) => {
      const isActive = forceClose
        ? false
        : !mobileMenu.classList.contains("active");

      mobileMenu.classList.toggle("active", isActive);
      mobileToggle.classList.toggle("active", isActive);
      if (mobileBackdrop) {
        mobileBackdrop.classList.toggle("active", isActive);
      }

      // Update ARIA
      mobileToggle.setAttribute("aria-expanded", isActive);

      // Prevent body scroll when menu is open
      document.body.style.overflow = isActive ? "hidden" : "";
    };

    // Open/close menu on button click
    mobileToggle.addEventListener("click", () => {
      toggleMobileMenu();
    });

    // Close menu when clicking backdrop
    if (mobileBackdrop) {
      mobileBackdrop.addEventListener("click", () => {
        toggleMobileMenu(true);
      });
    }

    // Close menu when clicking on direct links (not submenu toggles)
    const mobileDirectLinks = mobileMenu.querySelectorAll(
      ".mobile-nav-item > a:not(.mobile-nav-toggle)",
    );
    mobileDirectLinks.forEach((link) => {
      link.addEventListener("click", () => {
        toggleMobileMenu(true);
      });
    });
  }

  // ============================================
  // MOBILE SUBMENU ACCORDION TOGGLES
  // ============================================

  const mobileNavToggles = document.querySelectorAll(".mobile-nav-toggle");

  mobileNavToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const parentItem = toggle.closest(".mobile-nav-item");
      const isExpanded = parentItem.classList.contains("expanded");
      const submenu = toggle.nextElementSibling;

      // Close other open submenus
      document.querySelectorAll(".mobile-nav-item.expanded").forEach((item) => {
        if (item !== parentItem) {
          item.classList.remove("expanded");
        }
      });

      // Toggle current submenu
      parentItem.classList.toggle("expanded", !isExpanded);
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
