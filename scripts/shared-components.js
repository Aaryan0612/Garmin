// ============================================
// GARMIN — Shared Components Loader
// Injects nav + mega menu + mobile menu + footer
// into any page via placeholder divs.
// Links are dynamically resolved to relative paths.
// ============================================

(function () {
  // ── Detect page depth from <html data-depth> ──
  const depth = parseInt(document.documentElement.dataset.depth || "0", 10);
  const base = depth === 0 ? "." : Array(depth).fill("..").join("/");

  // ── Resolve an absolute href to a relative one ──
  // Special paths that map to directory/index.html
  const indexPaths = ["/support"];

  function resolve(href) {
    if (
      !href ||
      href.startsWith("http") ||
      href.startsWith("#") ||
      href.startsWith("mailto") ||
      href.startsWith("tel") ||
      href.startsWith("javascript")
    ) {
      return href;
    }
    if (href === "/" || href === "./") return base + "/index.html";
    // Handle paths that map to directory/index.html
    if (indexPaths.includes(href)) {
      const clean = href.substring(1);
      return base + "/" + clean + "/index.html";
    }
    // Remove leading slash, append .html
    const clean = href.startsWith("/") ? href.substring(1) : href;
    return base + "/" + clean + ".html";
  }

  // ── Rewrite all links in a container ──
  function resolveLinks(container) {
    container.querySelectorAll("a[href]").forEach((a) => {
      const original = a.getAttribute("href");
      a.setAttribute("href", resolve(original));
    });
    // Also fix image src paths
    container.querySelectorAll("img[src]").forEach((img) => {
      const src = img.getAttribute("src");
      if (src && src.startsWith("./")) {
        img.setAttribute("src", base + "/" + src.substring(2));
      }
    });
    // Fix form actions if any
    container.querySelectorAll("form[action]").forEach((form) => {
      const action = form.getAttribute("action");
      if (action && action.startsWith("/")) {
        form.setAttribute("action", resolve(action));
      }
    });
  }

  // ============================================
  // NAV HTML
  // ============================================
  const navHTML = `
    <a href="/" class="skip-link">Skip to main content</a>
    <nav class="glass-nav" id="navbar" role="navigation" aria-label="Main navigation">
      <div class="nav-container">
        <a href="/" class="brand-logo">GARMIN</a>
        <ul class="nav-links">
          <li class="nav-item" data-category="wearables"><a href="/wearables">Wearables</a></li>
          <li class="nav-item" data-category="sports"><a href="/sports">Sports</a></li>
          <li class="nav-item" data-category="outdoor"><a href="/outdoor">Outdoor</a></li>
          <li class="nav-item" data-category="automotive"><a href="/automotive">Automotive</a></li>
          <li class="nav-item" data-category="marine"><a href="/marine">Marine</a></li>
          <li class="nav-item" data-category="aviation"><a href="/aviation">Aviation</a></li>
        </ul>
        <div class="nav-icons">
          <button class="icon-btn search-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button class="icon-btn profile-btn" aria-label="Account">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <button class="icon-btn cart-btn" aria-label="Cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span class="cart-count">0</span>
          </button>
          <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle mobile menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  `;

  // ============================================
  // MEGA OVERLAY HTML
  // ============================================
  const megaHTML = `
    <div class="mega-overlay" id="megaOverlay" role="dialog" aria-label="Navigation menu">
      <div class="mega-container">
            <!-- WEARABLES -->
        <div class="mega-panel" id="panel-wearables">
          <div class="mega-grid">
            <div class="menu-column">
              <h4>Performance</h4>
              <a href="/products/marq" class="menu-link">MARQ Collection</a>
              <a href="/products/fenix-8" class="menu-link">Fēnix 8</a>
              <a href="/products/epix" class="menu-link">Epix Pro</a>
              <a href="/products/enduro" class="menu-link">Enduro 3</a>
              <a href="/products/instinct" class="menu-link">Instinct 2X</a>
            </div>
            <div class="menu-column">
              <h4>Running & Fitness</h4>
              <a href="/products/forerunner-965" class="menu-link">Forerunner 965</a>
              <a href="/products/forerunner-265" class="menu-link">Forerunner 265</a>
              <a href="/products/forerunner-165" class="menu-link">Forerunner 165</a>
              <a href="/products/vivoactive" class="menu-link">Vívoactive 5</a>
              <a href="/products/lily" class="menu-link">Lily 2</a>
            </div>
            <div class="menu-column">
              <h4>Lifestyle</h4>
              <a href="/products/venu-3" class="menu-link">Venu 3</a>
              <a href="/products/vivomove" class="menu-link">Vívomove Trend</a>
              <a href="/kids" class="menu-link">Kids Watches</a>
              <a href="/accessories" class="menu-link">Accessories</a>
            </div>
          </div>
          <div class="mega-footer">
            <a href="/wearables/compare">Compare Wearables</a>
            <a href="/wearables/all">Shop All Wearables</a>
            <a href="/support/wearables">Wearables Support</a>
          </div>
        </div>

        <!-- SPORTS -->
        <div class="mega-panel" id="panel-sports">
          <div class="mega-grid">
            <div class="menu-column">
              <h4>Cycling</h4>
              <a href="/cycling/edge-1050" class="menu-link">Edge 1050</a>
              <a href="/cycling/edge-540" class="menu-link">Edge 540/840</a>
              <a href="/cycling/rally" class="menu-link">Rally Power Meters</a>
              <a href="/cycling/varia" class="menu-link">Varia Radar Lights</a>
            </div>
            <div class="menu-column">
              <h4>Indoor Training</h4>
              <a href="/tacx/neo" class="menu-link">Tacx NEO 3M</a>
              <a href="/tacx/flux" class="menu-link">Tacx FLUX 2</a>
              <a href="/tacx/boost" class="menu-link">Tacx Boost</a>
              <a href="/hrm" class="menu-link">HRM Sensors</a>
            </div>
            <div class="menu-column">
              <h4>Golf</h4>
              <a href="/golf/approach-s70" class="menu-link">Approach S70</a>
              <a href="/golf/approach-z82" class="menu-link">Approach Z82</a>
              <a href="/golf/approach-r10" class="menu-link">Approach R10</a>
            </div>
          </div>
          <div class="mega-footer">
            <a href="/sports/compare">Compare Sports Devices</a>
            <a href="/sports/all">Shop All Sports</a>
            <a href="/support/sports">Sports Support</a>
          </div>
        </div>

        <!-- OUTDOOR -->
        <div class="mega-panel" id="panel-outdoor">
          <div class="mega-grid">
            <div class="menu-column">
              <h4>Handhelds</h4>
              <a href="/outdoor/gpsmap-67" class="menu-link">GPSMAP 67</a>
              <a href="/outdoor/montana-700" class="menu-link">Montana 700</a>
              <a href="/outdoor/etrex" class="menu-link">eTrex Series</a>
              <a href="/outdoor/inreach" class="menu-link">inReach Satellite</a>
            </div>
            <div class="menu-column">
              <h4>Dog & Tracking</h4>
              <a href="/dog/astro" class="menu-link">Astro Dog Tracker</a>
              <a href="/dog/alpha" class="menu-link">Alpha GPS</a>
              <a href="/outdoor/explore" class="menu-link">Explore Maps</a>
            </div>
            <div class="menu-column">
              <h4>Cameras</h4>
              <a href="/cameras/virb" class="menu-link">VIRB Action Cam</a>
              <a href="/cameras/dashcam" class="menu-link">Dash Cams</a>
            </div>
          </div>
          <div class="mega-footer">
            <a href="/outdoor/compare">Compare Outdoor Devices</a>
            <a href="/outdoor/all">Shop All Outdoor</a>
            <a href="/support/outdoor">Outdoor Support</a>
          </div>
        </div>

        <!-- AUTOMOTIVE -->
        <div class="mega-panel" id="panel-automotive">
          <div class="mega-grid no-featured">
            <div class="menu-column">
              <h4>Road & Commute</h4>
              <a href="/automotive/car-gps" class="menu-link">Car GPS Navigation</a>
              <a href="/automotive/dash-cameras" class="menu-link">Dash Cameras</a>
              <a href="/automotive/backup-cameras" class="menu-link">Backup Cameras</a>
              <a href="/automotive/voice-nav" class="menu-link">Voice-Assisted Navigation</a>
            </div>
            <div class="menu-column">
              <h4>Adventure & Off-Road</h4>
              <a href="/automotive/overlanding" class="menu-link">Overlanding Navigation</a>
              <a href="/automotive/motorcycle" class="menu-link">Motorcycle GPS</a>
              <a href="/automotive/powersports" class="menu-link">Powersports Navigation</a>
              <a href="/automotive/group-ride" class="menu-link">Group Ride Tracking</a>
            </div>
            <div class="menu-column">
              <h4>RV & Commercial</h4>
              <a href="/automotive/rv" class="menu-link">RV & Caravan Navigation</a>
              <a href="/automotive/trucking" class="menu-link">Trucking & Fleet</a>
              <a href="/automotive/performance" class="menu-link">Driving Performance</a>
              <a href="/automotive/elogs" class="menu-link">Electronic Logging</a>
            </div>
            <div class="menu-column">
              <h4>In-Vehicle Technology</h4>
              <a href="/automotive/in-dash" class="menu-link">In-Dash Systems</a>
              <a href="/automotive/oem" class="menu-link">OEM Solutions</a>
              <a href="/automotive/maps" class="menu-link">Maps & Updates</a>
              <a href="/automotive/mounts" class="menu-link">Mounts & Accessories</a>
            </div>
          </div>
          <div class="mega-footer">
            <a href="/automotive/compare">Compare Automotive Devices</a>
            <a href="/dealers">Find Authorized Dealers</a>
            <a href="/support/automotive">Service & Support</a>
          </div>
        </div>

        <!-- MARINE -->
        <div class="mega-panel" id="panel-marine">
          <div class="mega-grid no-featured">
            <div class="menu-column">
              <h4>Chartplotters & Displays</h4>
              <a href="/marine/gpsmap" class="menu-link">GPSMAP Series</a>
              <a href="/marine/echomap" class="menu-link">ECHOMAP Series</a>
              <a href="/marine/touchscreen" class="menu-link">Touchscreen Displays</a>
              <a href="/marine/mfd" class="menu-link">Multi-Function Displays</a>
            </div>
            <div class="menu-column">
              <h4>Sonar & Fishing</h4>
              <a href="/marine/livevu" class="menu-link">Live Sonar Systems</a>
              <a href="/marine/fishfinders" class="menu-link">Fishfinders</a>
              <a href="/marine/transducers" class="menu-link">Transducers</a>
              <a href="/marine/ice-fishing" class="menu-link">Ice Fishing Devices</a>
            </div>
            <div class="menu-column">
              <h4>Control & Navigation</h4>
              <a href="/marine/autopilot" class="menu-link">Autopilot Systems</a>
              <a href="/marine/radar" class="menu-link">Marine Radar</a>
              <a href="/marine/sailing" class="menu-link">Sailing Instruments</a>
              <a href="/marine/switching" class="menu-link">Digital Switching</a>
            </div>
            <div class="menu-column">
              <h4>Connected Vessel</h4>
              <a href="/marine/audio" class="menu-link">Marine Audio Systems</a>
              <a href="/marine/trolling" class="menu-link">Trolling Motors</a>
              <a href="/marine/cameras" class="menu-link">Marine Cameras</a>
              <a href="/marine/wearables" class="menu-link">Boating Wearables</a>
            </div>
          </div>
          <div class="mega-footer">
            <a href="/marine/build">Build Your Marine System</a>
            <a href="/marine/maps">Marine Maps & Charts</a>
            <a href="/support/marine">Service & Installation</a>
          </div>
        </div>

        <!-- AVIATION -->
        <div class="mega-panel" id="panel-aviation">
          <div class="mega-grid no-featured">
            <div class="menu-column">
              <h4>Flight Decks & Displays</h4>
              <a href="/aviation/flight-decks" class="menu-link">Integrated Flight Decks</a>
              <a href="/aviation/glass-cockpit" class="menu-link">Glass Cockpit Systems</a>
              <a href="/aviation/retrofit" class="menu-link">Retrofit Displays</a>
              <a href="/aviation/efi" class="menu-link">Electronic Flight Instruments</a>
            </div>
            <div class="menu-column">
              <h4>Navigation & Comm</h4>
              <a href="/aviation/gps-nav" class="menu-link">GPS & NAV/COM Systems</a>
              <a href="/aviation/autopilots" class="menu-link">Autopilots</a>
              <a href="/aviation/weather" class="menu-link">Weather & Traffic Systems</a>
              <a href="/aviation/audio-panels" class="menu-link">Audio Panels</a>
            </div>
            <div class="menu-column">
              <h4>Pilot Devices</h4>
              <a href="/aviation/d2" class="menu-link">Aviation Smartwatches</a>
              <a href="/aviation/aera" class="menu-link">Portable GPS Units</a>
              <a href="/aviation/inreach" class="menu-link">Satellite Communicators</a>
              <a href="/aviation/apps" class="menu-link">Pilot Apps & Tablets</a>
            </div>
            <div class="menu-column">
              <h4>Services & Training</h4>
              <a href="/aviation/databases" class="menu-link">Database Updates</a>
              <a href="/aviation/flight-planning" class="menu-link">Flight Planning Tools</a>
              <a href="/aviation/safety" class="menu-link">Safety & Emergency</a>
              <a href="/aviation/training" class="menu-link">Pilot Training</a>
            </div>
          </div>
          <div class="mega-footer">
            <a href="/aviation/pilots">For Pilots</a>
            <a href="/support/aviation">Aviation Support</a>
            <a href="/aviation/software">Software & Database Updates</a>
          </div>
        </div>
      </div>
    </div>
  `;

  // ============================================
  // MOBILE MENU HTML
  // ============================================
  const mobileHTML = `
    <div class="mobile-backdrop" id="mobileBackdrop"></div>
    <div class="mobile-menu" id="mobileMenu" role="navigation" aria-label="Mobile navigation">
      <ul class="mobile-nav-links">
        <li class="mobile-nav-item">
          <a href="#" class="mobile-nav-toggle">Wearables
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>
          <div class="mobile-submenu">
            <a href="/products/fenix-8">Fēnix 8</a>
            <a href="/products/epix">Epix Pro</a>
            <a href="/products/forerunner-965">Forerunner 965</a>
            <a href="/products/venu-3">Venu 3</a>
            <a href="/products/instinct">Instinct 2X</a>
          </div>
        </li>
        <li class="mobile-nav-item">
          <a href="#" class="mobile-nav-toggle">Sports
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>
          <div class="mobile-submenu">
            <a href="/cycling/edge-1050">Edge 1050</a>
            <a href="/cycling/rally">Rally Power Meters</a>
            <a href="/tacx/neo">Tacx NEO 3M</a>
            <a href="/golf/approach-s70">Approach S70</a>
          </div>
        </li>
        <li class="mobile-nav-item">
          <a href="#" class="mobile-nav-toggle">Outdoor
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>
          <div class="mobile-submenu">
            <a href="/outdoor/gpsmap-67">GPSMAP 67</a>
            <a href="/outdoor/inreach">inReach Satellite</a>
            <a href="/dog/astro">Astro Dog Tracker</a>
          </div>
        </li>
        <li class="mobile-nav-item">
          <a href="#" class="mobile-nav-toggle">Automotive
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>
          <div class="mobile-submenu">
            <a href="/automotive/car-gps">Car GPS Navigation</a>
            <a href="/automotive/dash-cameras">Dash Cameras</a>
            <a href="/automotive/motorcycle">Motorcycle GPS</a>
            <a href="/automotive/rv">RV Navigation</a>
          </div>
        </li>
        <li class="mobile-nav-item">
          <a href="#" class="mobile-nav-toggle">Marine
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>
          <div class="mobile-submenu">
            <a href="/marine/gpsmap">GPSMAP Series</a>
            <a href="/marine/fishfinders">Fishfinders</a>
            <a href="/marine/autopilot">Autopilot Systems</a>
            <a href="/marine/radar">Marine Radar</a>
          </div>
        </li>
        <li class="mobile-nav-item">
          <a href="#" class="mobile-nav-toggle">Aviation
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </a>
          <div class="mobile-submenu">
            <a href="/aviation/flight-decks">Flight Decks</a>
            <a href="/aviation/d2">Aviation Smartwatches</a>
            <a href="/aviation/autopilots">Autopilots</a>
            <a href="/aviation/databases">Database Updates</a>
          </div>
        </li>
      </ul>
    </div>
  `;

  // ============================================
  // FOOTER HTML
  // ============================================
  const footerHTML = `
    <footer class="footer" id="footer" role="contentinfo">
      <div class="footer-container">
        <div class="footer-top">
          <div class="footer-column">
            <h3>Products</h3>
            <ul class="footer-links">
              <li><a href="/wearables">Wearables</a></li>
              <li><a href="/sports">Sports & Fitness</a></li>
              <li><a href="/outdoor">Outdoor</a></li>
              <li><a href="/automotive">Automotive</a></li>
              <li><a href="/marine">Marine</a></li>
              <li><a href="/aviation">Aviation</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Support</h3>
            <ul class="footer-links">
              <li><a href="/support">Support Center</a></li>
              <li><a href="/support/service-centers">Service Centers</a></li>
              <li><a href="/support/warranty">Warranty</a></li>
              <li><a href="/support/contact">Contact</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Company</h3>
            <ul class="footer-links">
              <li><a href="/about">About Garmin</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/sustainability">Sustainability</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Stay Connected</h3>
            <div class="footer-newsletter">
              <p>Subscribe to get updates on new products, exclusive offers, and fitness tips.</p>
              <form class="newsletter-form" aria-label="Newsletter Subscription">
                <input type="email" class="newsletter-input" placeholder="Enter your email" aria-label="Email address" required />
                <button type="submit" class="newsletter-btn">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        <div class="footer-trust">
          <span class="footer-trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>Authorized Garmin India</span>
          <span class="footer-trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>2-Year Warranty</span>
          <span class="footer-trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>Service Centers Across India</span>
          <span class="footer-trust-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>EMI Available</span>
        </div>
        <div class="footer-middle">
          <div class="footer-social">
            <a href="https://facebook.com/garmin" class="social-link" aria-label="Facebook" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://twitter.com/garmin" class="social-link" aria-label="Twitter" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="https://instagram.com/garmin" class="social-link" aria-label="Instagram" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
            </a>
            <a href="https://youtube.com/garmin" class="social-link" aria-label="YouTube" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
          <div class="footer-country" role="button" tabindex="0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            <span>India</span>
          </div>
        </div>
        <div class="footer-bottom">
          <p class="footer-copyright">© 2026 Garmin Ltd. or its subsidiaries. All rights reserved.</p>
          <ul class="footer-legal">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Use</a></li>
            <li><a href="/cookies">Cookie Policy</a></li>
            <li><a href="/accessibility">Accessibility</a></li>
          </ul>
        </div>
      </div>
    </footer>
  `;

  // ============================================
  // INJECT COMPONENTS
  // ============================================
  const navRoot = document.getElementById("nav-root");
  const megaRoot = document.getElementById("mega-root");
  const mobileRoot = document.getElementById("mobile-root");
  const footerRoot = document.getElementById("footer-root");

  if (navRoot) {
    navRoot.innerHTML = navHTML;
    resolveLinks(navRoot);
  }
  if (megaRoot) {
    megaRoot.innerHTML = megaHTML;
    resolveLinks(megaRoot);
  }
  if (mobileRoot) {
    mobileRoot.innerHTML = mobileHTML;
    resolveLinks(mobileRoot);
  }
  if (footerRoot) {
    footerRoot.innerHTML = footerHTML;
    resolveLinks(footerRoot);
  }
})();
