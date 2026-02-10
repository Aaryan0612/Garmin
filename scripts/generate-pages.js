#!/usr/bin/env node
/**
 * GARMIN SITE — Page Generator
 * Creates all 107 internal pages with shared nav/footer components.
 * Run: node scripts/generate-pages.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

// ============================================
// ALL PAGE DEFINITIONS
// ============================================
const pages = [
  // ── TIER 1: Category Landing Pages ──
  {
    path: "wearables.html",
    title: "Wearables",
    type: "category",
    parent: null,
    desc: "GPS smartwatches and fitness trackers designed for every lifestyle — from elite performance to everyday wellness.",
  },
  {
    path: "sports.html",
    title: "Sports & Fitness",
    type: "category",
    parent: null,
    desc: "Cycling computers, golf rangefinders, indoor trainers, and heart rate monitors for serious athletes.",
  },
  {
    path: "outdoor.html",
    title: "Outdoor",
    type: "category",
    parent: null,
    desc: "Handheld GPS navigators, satellite communicators, and tracking devices for the trail less traveled.",
  },
  {
    path: "automotive.html",
    title: "Automotive",
    type: "category",
    parent: null,
    desc: "Car GPS navigation, dash cameras, and fleet management solutions for every vehicle and journey.",
  },
  {
    path: "marine.html",
    title: "Marine",
    type: "category",
    parent: null,
    desc: "Chartplotters, fishfinders, autopilot systems, and marine electronics for the open water.",
  },
  {
    path: "aviation.html",
    title: "Aviation",
    type: "category",
    parent: null,
    desc: "Integrated flight decks, avionics, and pilot wearables trusted by aviators worldwide.",
  },

  // ── TIER 2: Product Detail Pages ──
  {
    path: "products/fenix-8.html",
    title: "Fēnix 8",
    type: "product",
    parent: "Wearables",
    desc: "The ultimate multisport GPS watch with advanced training features, rugged design, and up to 48 days of battery life.",
    img: "fenix-8.png",
  },
  {
    path: "products/forerunner-965.html",
    title: "Forerunner 965",
    type: "product",
    parent: "Wearables",
    desc: "Premium GPS running and triathlon smartwatch with AMOLED display and advanced training metrics.",
    img: "forerunner-965.png",
  },
  {
    path: "products/forerunner-265.html",
    title: "Forerunner 265",
    type: "product",
    parent: "Wearables",
    desc: "GPS running smartwatch with vibrant AMOLED display and advanced training features.",
  },
  {
    path: "products/forerunner-165.html",
    title: "Forerunner 165",
    type: "product",
    parent: "Wearables",
    desc: "Colorful GPS running smartwatch with essential training features at an accessible price.",
  },
  {
    path: "products/epix.html",
    title: "Epix Pro",
    type: "product",
    parent: "Wearables",
    desc: "Premium multisport GPS watch with brilliant AMOLED display and titanium construction.",
  },
  {
    path: "products/enduro.html",
    title: "Enduro 3",
    type: "product",
    parent: "Wearables",
    desc: "Ultra-endurance GPS watch with solar charging and up to 90 days of battery life.",
  },
  {
    path: "products/instinct.html",
    title: "Instinct 2X",
    type: "product",
    parent: "Wearables",
    desc: "Rugged, reliable outdoor GPS smartwatch built to MIL-STD-810 standards.",
  },
  {
    path: "products/marq.html",
    title: "MARQ Collection",
    type: "product",
    parent: "Wearables",
    desc: "Luxury tool watches crafted from premium materials with purpose-built features.",
  },
  {
    path: "products/venu-3.html",
    title: "Venu 3",
    type: "product",
    parent: "Wearables",
    desc: "Lifestyle GPS smartwatch with stunning AMOLED display and comprehensive health monitoring.",
    img: "venu-3.png",
  },
  {
    path: "products/vivoactive.html",
    title: "Vívoactive 5",
    type: "product",
    parent: "Wearables",
    desc: "Versatile GPS smartwatch with customizable watch faces and all-day health tracking.",
  },
  {
    path: "products/vivomove.html",
    title: "Vívomove Trend",
    type: "product",
    parent: "Wearables",
    desc: "Hybrid smartwatch combining classic analog style with smart features.",
  },
  {
    path: "products/lily.html",
    title: "Lily 2",
    type: "product",
    parent: "Wearables",
    desc: "Small, stylish smartwatch designed for women with essential health and fitness tracking.",
  },
  {
    path: "products/edge-1050.html",
    title: "Edge 1050",
    type: "product",
    parent: "Sports & Fitness",
    desc: "Premium GPS cycling computer with large touchscreen display and advanced performance metrics.",
    img: "edge-1050.png",
  },
  {
    path: "products/tread-xl.html",
    title: "Tread® XL",
    type: "product",
    parent: "Automotive",
    desc: "10-inch all-terrain GPS navigator built for overlanding and off-road adventures.",
    img: "tread-xl.png",
  },
  {
    path: "products/tread-2.html",
    title: "Tread® 2",
    type: "product",
    parent: "Automotive",
    desc: "8-inch rugged GPS navigator with topographic maps and group tracking.",
    img: "tread-2.png",
  },
  {
    path: "products/overlander.html",
    title: "Overlander®",
    type: "product",
    parent: "Automotive",
    desc: "Rugged GPS navigator with topographic mapping for off-grid adventures.",
    img: "overlander.png",
  },
  {
    path: "products/montana-700.html",
    title: "Montana® 700",
    type: "product",
    parent: "Outdoor",
    desc: "Premium handheld GPS navigator with 5-inch touchscreen and inReach technology.",
    img: "montana-700.png",
  },
  {
    path: "products/inreach.html",
    title: "inReach® Messenger",
    type: "product",
    parent: "Outdoor",
    desc: "Compact satellite communicator for two-way messaging and SOS from anywhere on earth.",
    img: "inreach.png",
  },

  // ── TIER 3: Utility & Info Pages ──
  {
    path: "about.html",
    title: "About Garmin",
    type: "utility",
    parent: null,
    desc: "Garmin Ltd. has been innovating GPS technology since 1989. Learn about our mission, values, and commitment to quality.",
  },
  {
    path: "careers.html",
    title: "Careers",
    type: "utility",
    parent: null,
    desc: "Join the Garmin team. Explore open positions and discover what makes Garmin a great place to work.",
  },
  {
    path: "blog.html",
    title: "Blog",
    type: "utility",
    parent: null,
    desc: "Stories, tips, and updates from the Garmin community. Stay informed about the latest in GPS technology.",
  },
  {
    path: "sustainability.html",
    title: "Sustainability",
    type: "utility",
    parent: null,
    desc: "Our commitment to environmental responsibility, sustainable manufacturing, and community impact.",
  },
  {
    path: "privacy.html",
    title: "Privacy Policy",
    type: "legal",
    parent: null,
    desc: "How Garmin collects, uses, and protects your personal information.",
  },
  {
    path: "terms.html",
    title: "Terms of Use",
    type: "legal",
    parent: null,
    desc: "Terms and conditions governing the use of Garmin websites and services.",
  },
  {
    path: "cookies.html",
    title: "Cookie Policy",
    type: "legal",
    parent: null,
    desc: "Information about how Garmin uses cookies and similar tracking technologies.",
  },
  {
    path: "accessibility.html",
    title: "Accessibility",
    type: "legal",
    parent: null,
    desc: "Our commitment to making Garmin products and services accessible to everyone.",
  },
  {
    path: "support/index.html",
    title: "Support Center",
    type: "utility",
    parent: null,
    desc: "Get help with your Garmin products. Access manuals, FAQs, troubleshooting guides, and contact support.",
  },
  {
    path: "support/service-centers.html",
    title: "Service Centers",
    type: "utility",
    parent: "Support",
    desc: "Find authorized Garmin service centers across India for repairs and professional support.",
  },
  {
    path: "support/warranty.html",
    title: "Warranty",
    type: "utility",
    parent: "Support",
    desc: "Garmin warranty information, coverage details, and how to submit a warranty claim.",
  },
  {
    path: "support/contact.html",
    title: "Contact Us",
    type: "utility",
    parent: "Support",
    desc: "Get in touch with Garmin India. Phone, email, and live chat support options.",
  },
  {
    path: "support/wearables.html",
    title: "Wearables Support",
    type: "utility",
    parent: "Support",
    desc: "Support resources for Garmin wearables including setup guides, troubleshooting, and software updates.",
  },
  {
    path: "support/sports.html",
    title: "Sports Support",
    type: "utility",
    parent: "Support",
    desc: "Support resources for cycling computers, golf devices, and training equipment.",
  },
  {
    path: "support/outdoor.html",
    title: "Outdoor Support",
    type: "utility",
    parent: "Support",
    desc: "Support resources for handheld GPS, satellite communicators, and outdoor devices.",
  },
  {
    path: "support/automotive.html",
    title: "Automotive Support",
    type: "utility",
    parent: "Support",
    desc: "Support resources for car GPS, dash cameras, and automotive navigation systems.",
  },
  {
    path: "support/marine.html",
    title: "Marine Support",
    type: "utility",
    parent: "Support",
    desc: "Support resources for chartplotters, fishfinders, and marine electronics.",
  },
  {
    path: "support/aviation.html",
    title: "Aviation Support",
    type: "utility",
    parent: "Support",
    desc: "Support resources for flight decks, avionics, and pilot devices.",
  },
  {
    path: "dealers.html",
    title: "Find Authorized Dealers",
    type: "utility",
    parent: null,
    desc: "Locate authorized Garmin dealers and retail partners across India.",
  },

  // ── TIER 4: Sub-category Pages ──
  // Wearables sub-pages
  {
    path: "wearables/all.html",
    title: "Shop All Wearables",
    type: "subcategory",
    parent: "Wearables",
    desc: "Browse the complete collection of Garmin smartwatches and fitness trackers.",
  },
  {
    path: "wearables/compare.html",
    title: "Compare Wearables",
    type: "subcategory",
    parent: "Wearables",
    desc: "Compare features, specs, and prices across Garmin wearables to find your perfect match.",
  },
  {
    path: "kids.html",
    title: "Kids Watches",
    type: "subcategory",
    parent: "Wearables",
    desc: "Fun, durable smartwatches designed for kids with activity tracking and parental controls.",
  },
  {
    path: "accessories.html",
    title: "Accessories",
    type: "subcategory",
    parent: "Wearables",
    desc: "Watch bands, charging cables, screen protectors, and more for your Garmin devices.",
  },

  // Sports sub-pages
  {
    path: "sports/all.html",
    title: "Shop All Sports",
    type: "subcategory",
    parent: "Sports & Fitness",
    desc: "Browse the complete collection of Garmin sports and fitness devices.",
  },
  {
    path: "sports/compare.html",
    title: "Compare Sports Devices",
    type: "subcategory",
    parent: "Sports & Fitness",
    desc: "Compare cycling computers, golf devices, and indoor trainers side by side.",
  },
  {
    path: "cycling/edge-1050.html",
    title: "Edge 1050",
    type: "subcategory",
    parent: "Sports & Fitness",
    desc: "Premium GPS cycling computer with the largest touchscreen display in the Edge lineup.",
  },
  {
    path: "cycling/edge-540.html",
    title: "Edge 540/840",
    type: "subcategory",
    parent: "Sports & Fitness",
    desc: "Compact GPS cycling computers with button or touchscreen options and advanced performance metrics.",
  },
  {
    path: "cycling/rally.html",
    title: "Rally Power Meters",
    type: "subcategory",
    parent: "Sports & Fitness",
    desc: "Pedal-based power meters for precise cycling power measurement and training insights.",
  },
  {
    path: "cycling/varia.html",
    title: "Varia Radar Lights",
    type: "subcategory",
    parent: "Sports & Fitness",
    desc: "Rearview radar and smart bike lights for enhanced cycling safety and awareness.",
  },
  {
    path: "tacx/neo.html",
    title: "Tacx NEO 3M",
    type: "subcategory",
    parent: "Sports & Fitness",
    desc: "Premium direct-drive smart trainer with motion simulation and precise power measurement.",
  },
  {
    path: "tacx/flux.html",
    title: "Tacx FLUX 2",
    type: "subcategory",
    parent: "Sports & Fitness",
    desc: "Smart direct-drive trainer offering realistic indoor cycling with accurate power data.",
  },
  {
    path: "tacx/boost.html",
    title: "Tacx Boost",
    type: "subcategory",
    parent: "Sports & Fitness",
    desc: "Entry-level smart trainer for effective indoor cycling workouts at an accessible price.",
  },
  {
    path: "hrm.html",
    title: "HRM Sensors",
    type: "subcategory",
    parent: "Sports & Fitness",
    desc: "Heart rate monitors and sensors for accurate heart rate tracking during any activity.",
  },
  {
    path: "golf/approach-s70.html",
    title: "Approach S70",
    type: "subcategory",
    parent: "Sports & Fitness",
    desc: "Premium GPS golf watch with AMOLED display and detailed course maps.",
  },
  {
    path: "golf/approach-z82.html",
    title: "Approach Z82",
    type: "subcategory",
    parent: "Sports & Fitness",
    desc: "GPS golf laser range finder with image stabilization and course mapping.",
  },
  {
    path: "golf/approach-r10.html",
    title: "Approach R10",
    type: "subcategory",
    parent: "Sports & Fitness",
    desc: "Portable golf launch monitor for driving range and home simulation practice.",
  },

  // Outdoor sub-pages
  {
    path: "outdoor/all.html",
    title: "Shop All Outdoor",
    type: "subcategory",
    parent: "Outdoor",
    desc: "Browse the complete collection of Garmin outdoor and adventure devices.",
  },
  {
    path: "outdoor/compare.html",
    title: "Compare Outdoor Devices",
    type: "subcategory",
    parent: "Outdoor",
    desc: "Compare handheld GPS navigators, satellite communicators, and tracking devices.",
  },
  {
    path: "outdoor/gpsmap-67.html",
    title: "GPSMAP 67",
    type: "subcategory",
    parent: "Outdoor",
    desc: "Premium handheld GPS device with multi-band technology and extended battery life.",
  },
  {
    path: "outdoor/montana-700.html",
    title: "Montana 700",
    type: "subcategory",
    parent: "Outdoor",
    desc: "Rugged 5-inch touchscreen GPS navigator with inReach satellite technology.",
  },
  {
    path: "outdoor/etrex.html",
    title: "eTrex Series",
    type: "subcategory",
    parent: "Outdoor",
    desc: "Compact and reliable handheld GPS navigators for hiking and geocaching.",
  },
  {
    path: "outdoor/inreach.html",
    title: "inReach Satellite",
    type: "subcategory",
    parent: "Outdoor",
    desc: "Satellite communicators for two-way messaging and emergency SOS from anywhere.",
  },
  {
    path: "outdoor/explore.html",
    title: "Explore Maps",
    type: "subcategory",
    parent: "Outdoor",
    desc: "Detailed topographic and trail maps for outdoor adventures and exploration.",
  },
  {
    path: "dog/astro.html",
    title: "Astro Dog Tracker",
    type: "subcategory",
    parent: "Outdoor",
    desc: "GPS dog tracking system for hunting dogs with long-range communication.",
  },
  {
    path: "dog/alpha.html",
    title: "Alpha GPS",
    type: "subcategory",
    parent: "Outdoor",
    desc: "GPS dog tracker and training device combining tracking with remote dog training.",
  },
  {
    path: "cameras/virb.html",
    title: "VIRB Action Cam",
    type: "subcategory",
    parent: "Outdoor",
    desc: "Ultra HD action cameras with GPS data overlays for capturing your adventures.",
  },
  {
    path: "cameras/dashcam.html",
    title: "Dash Cams",
    type: "subcategory",
    parent: "Outdoor",
    desc: "Compact dash cameras for collision detection and incident recording while driving.",
  },

  // Automotive sub-pages
  {
    path: "automotive/compare.html",
    title: "Compare Automotive Devices",
    type: "subcategory",
    parent: "Automotive",
    desc: "Compare GPS navigators, dash cameras, and automotive accessories side by side.",
  },
  {
    path: "automotive/car-gps.html",
    title: "Car GPS Navigation",
    type: "subcategory",
    parent: "Automotive",
    desc: "Turn-by-turn GPS navigation systems for cars with real-time traffic updates.",
  },
  {
    path: "automotive/dash-cameras.html",
    title: "Dash Cameras",
    type: "subcategory",
    parent: "Automotive",
    desc: "Compact dash cameras with collision detection, incident recording, and cloud connectivity.",
  },
  {
    path: "automotive/backup-cameras.html",
    title: "Backup Cameras",
    type: "subcategory",
    parent: "Automotive",
    desc: "Wireless backup cameras for safer parking and reversing.",
  },
  {
    path: "automotive/voice-nav.html",
    title: "Voice-Assisted Navigation",
    type: "subcategory",
    parent: "Automotive",
    desc: "Hands-free voice-controlled GPS navigation for safer driving.",
  },
  {
    path: "automotive/overlanding.html",
    title: "Overlanding Navigation",
    type: "subcategory",
    parent: "Automotive",
    desc: "Rugged GPS navigation systems designed for off-road and overland adventures.",
  },
  {
    path: "automotive/motorcycle.html",
    title: "Motorcycle GPS",
    type: "subcategory",
    parent: "Automotive",
    desc: "Weatherproof GPS navigators built specifically for motorcycle riders.",
  },
  {
    path: "automotive/powersports.html",
    title: "Powersports Navigation",
    type: "subcategory",
    parent: "Automotive",
    desc: "GPS navigation for ATVs, UTVs, snowmobiles, and other powersports vehicles.",
  },
  {
    path: "automotive/group-ride.html",
    title: "Group Ride Tracking",
    type: "subcategory",
    parent: "Automotive",
    desc: "Real-time group tracking and communication systems for motorcycle and adventure groups.",
  },
  {
    path: "automotive/rv.html",
    title: "RV & Caravan Navigation",
    type: "subcategory",
    parent: "Automotive",
    desc: "GPS navigation optimized for RVs, caravans, and large vehicles with custom routing.",
  },
  {
    path: "automotive/trucking.html",
    title: "Trucking & Fleet",
    type: "subcategory",
    parent: "Automotive",
    desc: "Commercial GPS solutions for trucking, fleet management, and logistics.",
  },
  {
    path: "automotive/performance.html",
    title: "Driving Performance",
    type: "subcategory",
    parent: "Automotive",
    desc: "Track performance data, lap times, and driving analytics for motorsport enthusiasts.",
  },
  {
    path: "automotive/elogs.html",
    title: "Electronic Logging",
    type: "subcategory",
    parent: "Automotive",
    desc: "ELD-compliant electronic logging devices for commercial fleet compliance.",
  },
  {
    path: "automotive/in-dash.html",
    title: "In-Dash Systems",
    type: "subcategory",
    parent: "Automotive",
    desc: "Factory-integrated navigation and infotainment systems for select vehicle models.",
  },
  {
    path: "automotive/oem.html",
    title: "OEM Solutions",
    type: "subcategory",
    parent: "Automotive",
    desc: "Original equipment manufacturer navigation and sensor solutions for automakers.",
  },
  {
    path: "automotive/maps.html",
    title: "Maps & Updates",
    type: "subcategory",
    parent: "Automotive",
    desc: "Download the latest maps and software updates for your Garmin automotive devices.",
  },
  {
    path: "automotive/mounts.html",
    title: "Mounts & Accessories",
    type: "subcategory",
    parent: "Automotive",
    desc: "Mounting solutions, power cables, and accessories for Garmin automotive devices.",
  },

  // Marine sub-pages
  {
    path: "marine/build.html",
    title: "Build Your Marine System",
    type: "subcategory",
    parent: "Marine",
    desc: "Configure and customize your complete Garmin marine electronics system.",
  },
  {
    path: "marine/maps.html",
    title: "Marine Maps & Charts",
    type: "subcategory",
    parent: "Marine",
    desc: "High-resolution nautical charts and mapping for coastal and offshore boating.",
  },
  {
    path: "marine/gpsmap.html",
    title: "GPSMAP Series",
    type: "subcategory",
    parent: "Marine",
    desc: "Premium chartplotters and multi-function displays for professional and recreational boating.",
  },
  {
    path: "marine/echomap.html",
    title: "ECHOMAP Series",
    type: "subcategory",
    parent: "Marine",
    desc: "All-in-one chartplotter and fishfinder combos for versatile on-water navigation.",
  },
  {
    path: "marine/touchscreen.html",
    title: "Touchscreen Displays",
    type: "subcategory",
    parent: "Marine",
    desc: "Large-format touchscreen marine displays with intuitive multi-touch control.",
  },
  {
    path: "marine/mfd.html",
    title: "Multi-Function Displays",
    type: "subcategory",
    parent: "Marine",
    desc: "Versatile marine displays integrating charts, sonar, radar, and engine data.",
  },
  {
    path: "marine/livevu.html",
    title: "Live Sonar Systems",
    type: "subcategory",
    parent: "Marine",
    desc: "Real-time sonar imaging for seeing fish and structure beneath the surface.",
  },
  {
    path: "marine/fishfinders.html",
    title: "Fishfinders",
    type: "subcategory",
    parent: "Marine",
    desc: "Dedicated fishfinders with CHIRP sonar and ClearVü scanning technology.",
  },
  {
    path: "marine/transducers.html",
    title: "Transducers",
    type: "subcategory",
    parent: "Marine",
    desc: "Sonar transducers for fishfinders and chartplotters — thru-hull, transom, and trolling motor mount.",
  },
  {
    path: "marine/ice-fishing.html",
    title: "Ice Fishing Devices",
    type: "subcategory",
    parent: "Marine",
    desc: "Portable flasher and sonar units designed for ice fishing conditions.",
  },
  {
    path: "marine/autopilot.html",
    title: "Autopilot Systems",
    type: "subcategory",
    parent: "Marine",
    desc: "Marine autopilot systems for hands-free boat steering and course holding.",
  },
  {
    path: "marine/radar.html",
    title: "Marine Radar",
    type: "subcategory",
    parent: "Marine",
    desc: "Marine radar systems for collision avoidance and weather tracking on the water.",
  },
  {
    path: "marine/sailing.html",
    title: "Sailing Instruments",
    type: "subcategory",
    parent: "Marine",
    desc: "Wind, speed, and depth instruments designed specifically for sailboat racing and cruising.",
  },
  {
    path: "marine/switching.html",
    title: "Digital Switching",
    type: "subcategory",
    parent: "Marine",
    desc: "Digital switching systems for centralized control of your vessel's electrical systems.",
  },
  {
    path: "marine/audio.html",
    title: "Marine Audio Systems",
    type: "subcategory",
    parent: "Marine",
    desc: "Weather-resistant marine stereos and speakers built for life on the water.",
  },
  {
    path: "marine/trolling.html",
    title: "Trolling Motors",
    type: "subcategory",
    parent: "Marine",
    desc: "GPS-enabled trolling motors with anchor lock and route following capabilities.",
  },
  {
    path: "marine/cameras.html",
    title: "Marine Cameras",
    type: "subcategory",
    parent: "Marine",
    desc: "Marine-grade cameras for above and below the waterline monitoring.",
  },
  {
    path: "marine/wearables.html",
    title: "Boating Wearables",
    type: "subcategory",
    parent: "Marine",
    desc: "GPS watches with sailing and boating features for the nautical lifestyle.",
  },

  // Aviation sub-pages
  {
    path: "aviation/pilots.html",
    title: "For Pilots",
    type: "subcategory",
    parent: "Aviation",
    desc: "Everything pilots need — portable GPS, smartwatches, and flight planning tools.",
  },
  {
    path: "aviation/software.html",
    title: "Software & Database Updates",
    type: "subcategory",
    parent: "Aviation",
    desc: "Download the latest aviation databases, charts, and software updates.",
  },
  {
    path: "aviation/flight-decks.html",
    title: "Integrated Flight Decks",
    type: "subcategory",
    parent: "Aviation",
    desc: "Complete glass cockpit solutions for fixed-wing aircraft and helicopters.",
  },
  {
    path: "aviation/glass-cockpit.html",
    title: "Glass Cockpit Systems",
    type: "subcategory",
    parent: "Aviation",
    desc: "Modern glass cockpit avionics replacing traditional analog instruments.",
  },
  {
    path: "aviation/retrofit.html",
    title: "Retrofit Displays",
    type: "subcategory",
    parent: "Aviation",
    desc: "Drop-in avionics display upgrades for older aircraft cockpits.",
  },
  {
    path: "aviation/efi.html",
    title: "Electronic Flight Instruments",
    type: "subcategory",
    parent: "Aviation",
    desc: "Standalone electronic flight instruments including attitude and heading indicators.",
  },
  {
    path: "aviation/gps-nav.html",
    title: "GPS & NAV/COM Systems",
    type: "subcategory",
    parent: "Aviation",
    desc: "GPS navigators and communication radios for certified and experimental aircraft.",
  },
  {
    path: "aviation/autopilots.html",
    title: "Autopilots",
    type: "subcategory",
    parent: "Aviation",
    desc: "Advanced autopilot systems with envelope protection and emergency leveling.",
  },
  {
    path: "aviation/weather.html",
    title: "Weather & Traffic Systems",
    type: "subcategory",
    parent: "Aviation",
    desc: "In-cockpit weather radar and traffic awareness systems for situational awareness.",
  },
  {
    path: "aviation/audio-panels.html",
    title: "Audio Panels",
    type: "subcategory",
    parent: "Aviation",
    desc: "Digital audio panels with Bluetooth connectivity and advanced intercom features.",
  },
  {
    path: "aviation/d2.html",
    title: "Aviation Smartwatches",
    type: "subcategory",
    parent: "Aviation",
    desc: "GPS pilot watches with direct-to navigation, flight logging, and aviation weather.",
  },
  {
    path: "aviation/aera.html",
    title: "Portable GPS Units",
    type: "subcategory",
    parent: "Aviation",
    desc: "Portable aviation GPS with touchscreen navigation and terrain awareness.",
  },
  {
    path: "aviation/inreach.html",
    title: "Satellite Communicators",
    type: "subcategory",
    parent: "Aviation",
    desc: "Satellite communication devices for emergency SOS and messaging from the cockpit.",
  },
  {
    path: "aviation/apps.html",
    title: "Pilot Apps & Tablets",
    type: "subcategory",
    parent: "Aviation",
    desc: "Aviation apps for flight planning, weather briefing, and in-flight navigation.",
  },
  {
    path: "aviation/databases.html",
    title: "Database Updates",
    type: "subcategory",
    parent: "Aviation",
    desc: "Keep your avionics current with the latest navigation and obstacle databases.",
  },
  {
    path: "aviation/flight-planning.html",
    title: "Flight Planning Tools",
    type: "subcategory",
    parent: "Aviation",
    desc: "Web and mobile tools for flight planning, route optimization, and weather analysis.",
  },
  {
    path: "aviation/safety.html",
    title: "Safety & Emergency",
    type: "subcategory",
    parent: "Aviation",
    desc: "Emergency autoland, envelope protection, and safety features that save lives.",
  },
  {
    path: "aviation/training.html",
    title: "Pilot Training",
    type: "subcategory",
    parent: "Aviation",
    desc: "Training resources, webinars, and courses for Garmin avionics systems.",
  },
];

// ============================================
// COMPUTE DEPTH (how many directories deep)
// ============================================
function getDepth(pagePath) {
  return pagePath.split("/").length - 1;
}

function getBasePath(pagePath) {
  const depth = getDepth(pagePath);
  if (depth === 0) return ".";
  return Array(depth).fill("..").join("/");
}

// ============================================
// BREADCRUMB GENERATOR
// ============================================
function getBreadcrumbs(page, basePath) {
  const crumbs = [`<a href="${basePath}/index.html">Home</a>`];
  if (page.parent) {
    // Find parent page path
    const parentSlug = page.parent
      .toLowerCase()
      .replace(/ & /g, "-")
      .replace(/ /g, "-");
    crumbs.push(`<a href="${basePath}/${parentSlug}.html">${page.parent}</a>`);
  }
  crumbs.push(`<span>${page.title}</span>`);
  return crumbs.join(' <span class="breadcrumb-sep">›</span> ');
}

// ============================================
// TYPE-BASED BODY CONTENT
// ============================================
function getPageBody(page, basePath) {
  const breadcrumbs = getBreadcrumbs(page, basePath);

  if (page.type === "product") {
    const imgSrc = page.img
      ? `${basePath}/assets/images/products/${page.img}`
      : "";
    return `
    <main class="page-main" id="main-content">
      <div class="page-breadcrumbs">${breadcrumbs}</div>
      <section class="page-hero product-hero">
        ${imgSrc ? `<div class="product-hero-image"><img src="${imgSrc}" alt="${page.title}" /></div>` : ""}
        <div class="product-hero-info">
          <h1 class="page-title">${page.title}</h1>
          <p class="page-description">${page.desc}</p>
          <div class="product-hero-actions">
            <button class="btn btn-primary">Buy Now</button>
            <button class="btn btn-secondary">Compare</button>
          </div>
        </div>
      </section>
      <section class="page-placeholder">
        <p>Detailed product information, specifications, and gallery will be added in a future phase.</p>
      </section>
    </main>`;
  }

  if (page.type === "category") {
    return `
    <main class="page-main" id="main-content">
      <section class="page-hero category-hero">
        <h1 class="page-title">${page.title}</h1>
        <p class="page-description">${page.desc}</p>
      </section>
      <section class="page-placeholder">
        <p>Products, subcategories, and featured collections will be added in a future phase.</p>
      </section>
    </main>`;
  }

  if (page.type === "legal") {
    return `
    <main class="page-main" id="main-content">
      <div class="page-breadcrumbs">${breadcrumbs}</div>
      <section class="page-hero legal-hero">
        <h1 class="page-title">${page.title}</h1>
        <p class="page-description">${page.desc}</p>
      </section>
      <section class="page-placeholder legal-content">
        <p>Full legal content will be added in a future phase.</p>
      </section>
    </main>`;
  }

  // utility, subcategory, default
  return `
    <main class="page-main" id="main-content">
      <div class="page-breadcrumbs">${breadcrumbs}</div>
      <section class="page-hero">
        <h1 class="page-title">${page.title}</h1>
        <p class="page-description">${page.desc}</p>
      </section>
      <section class="page-placeholder">
        <p>Content for this page will be added in a future phase.</p>
      </section>
    </main>`;
}

// ============================================
// HTML TEMPLATE
// ============================================
function generateHTML(page) {
  const basePath = getBasePath(page.path);
  const body = getPageBody(page, basePath);

  return `<!DOCTYPE html>
<html lang="en" data-depth="${getDepth(page.path)}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${page.title} | Garmin India</title>
    <meta name="description" content="${page.desc}" />
    <link rel="icon" type="image/svg+xml" href="${basePath}/assets/logo/garmin-icon.svg" />
    <link rel="stylesheet" href="${basePath}/styles/globals.css" />
    <link rel="stylesheet" href="${basePath}/styles/navigation.css" />
    <link rel="stylesheet" href="${basePath}/styles/sections.css" />
    <link rel="stylesheet" href="${basePath}/styles/footer.css" />
    <link rel="stylesheet" href="${basePath}/styles/pages.css" />
  </head>
  <body>
    <!-- Shared Nav (injected by JS) -->
    <div id="nav-root"></div>
    <div id="mega-root"></div>
    <div id="mobile-root"></div>
${body}
    <!-- Shared Footer (injected by JS) -->
    <div id="footer-root"></div>

    <script src="${basePath}/scripts/shared-components.js"></script>
    <script src="${basePath}/scripts/main.js"></script>
  </body>
</html>
`;
}

// ============================================
// GENERATE ALL PAGES
// ============================================
let created = 0;
let skipped = 0;

pages.forEach((page) => {
  const fullPath = path.join(ROOT, page.path);
  const dir = path.dirname(fullPath);

  // Create directory if needed
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const html = generateHTML(page);
  fs.writeFileSync(fullPath, html, "utf8");
  created++;
  console.log(`  ✅ ${page.path}`);
});

console.log(`\n🎉 Generated ${created} pages (${skipped} skipped)`);
console.log("Run in browser to verify navigation.");
