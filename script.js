/*
  script.js
  ---------
  Behavior for the Grill House digital menu.

  Reads `menuData` (defined in menu-data.js, loaded before this file) and
  renders the category chips + item cards, then wires up:
    1. initSplashTransition() - splash screen auto fade-out into the menu
    2. renderMenu()           - builds chips + category sections/cards from menuData
    3. initChipScroll()       - chip click -> scroll to section, + active chip on scroll
    4. initContactLinks()     - sets the WhatsApp / phone hrefs from one config object

  Nothing here hardcodes prices, item names or categories — that all
  lives in menu-data.js.
*/

(function () {
  "use strict";

  var REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Logo used as the watermark on every category header image.
  var LOGO_SRC = "assets/logo.png";

  // Contact numbers used to build the wa.me links. Change here if the
  // restaurant's numbers change — nothing else needs editing.
  var CONTACT = {
    whatsappPrimary: "972569647325",   // floating button + first footer link
    whatsappSecondary: "972507412340"  // second footer link
  };

  // Small line-icon (SVG path data only) per category id from menu-data.js.
  var CATEGORY_ICONS = {
    "cat-burger":
      '<path d="M12 3c1.8 0 3.4 1.6 3.9 3.8C17.7 7.3 19 8.9 19 11H5c0-2.1 1.3-3.7 3.1-4.2C8.6 4.6 10.2 3 12 3Z"/>' +
      '<path d="M4 13h16"/><path d="M5 16.5h14"/>',
    "cat-sandwiches":
      '<path d="M4 15c0-5 3.5-9 8-9s8 4 8 9-3.5 4-8 4-8 1-8-4Z"/><path d="M8 9.5c1.5-1 6.5-1 8 0"/>',
    "cat-salads":
      '<path d="M12 2c1.8 0 3.5.9 4.5 2.5C13 5 11 7 10.5 10c3-1 5.5-.5 7 1-1.5 4-6 6.5-10.5 6-.6-4.6 1-9 5-11.5C10.5 4 11 2 12 2Z"/>',
    "cat-appetizers":
      '<path d="M6 8h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 8Z"/><path d="M4 8h16"/><path d="M9 8l1-5h4l1 5"/>',
    "cat-potatoes":
      '<path d="M5 10h14l-1 2H6l-1-2Z"/><path d="M7 21V10M11 21V8M14 21V10M17 21V12"/>',
    "cat-majash":
      '<path d="M4 12c0-4 3.5-7 8-7s8 3 8 7-3.5 7-8 7-8-3-8-7Z"/><path d="M7 9c2 2 8 2 10 0M7 15c2-2 8-2 10 0"/>',
    "cat-drinks":
      '<path d="M6 3h12l-1.5 15a2 2 0 0 1-2 1.8H9.5a2 2 0 0 1-2-1.8L6 3Z"/><path d="M5 3h14"/><path d="M9 3l-.5 4M15 3l.5 4"/>'
  };

  document.addEventListener("DOMContentLoaded", function () {
    renderMenu();
    initSplashTransition();
    initContactLinks();
  });

  // =================================================================
  // 1. Splash screen -> menu transition
  // =================================================================
  function initSplashTransition() {
    var splash = document.getElementById("splash");
    var menu = document.getElementById("menu");
    if (!splash || !menu) return;

    function reveal() {
      splash.classList.add("hide");
      menu.classList.add("show");
      menu.removeAttribute("aria-hidden");

      if (REDUCED_MOTION) {
        splash.style.display = "none";
        return;
      }
      splash.addEventListener("transitionend", function handler(e) {
        if (e.target === splash) {
          splash.style.display = "none";
          splash.removeEventListener("transitionend", handler);
        }
      });
    }

    window.setTimeout(reveal, 2000);
  }

  // =================================================================
  // 2. Render category chips + item cards from menuData
  // =================================================================
  function renderMenu() {
    var chipsNav = document.getElementById("category-chips");
    var sectionsRoot = document.getElementById("menu-sections");
    if (!chipsNav || !sectionsRoot || typeof menuData === "undefined") return;

    var chipEls = [];
    var sectionEls = [];

    menuData.forEach(function (cat, index) {
      chipEls.push(buildChip(cat, index === 0, chipsNav));
      sectionEls.push(buildSection(cat, sectionsRoot));
    });

    initChipScroll(chipEls, sectionEls);
  }

  function buildChip(cat, isFirst, container) {
    var chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.dataset.target = cat.id;
    chip.textContent = cat.category;
    if (isFirst) chip.setAttribute("aria-current", "true");
    container.appendChild(chip);
    return chip;
  }

  function buildSection(cat, container) {
    var section = document.createElement("section");
    section.className = "category";
    section.id = cat.id;
    section.setAttribute("aria-labelledby", cat.id + "-h");
    var banner = buildCategoryBanner(cat);
    if (banner) section.appendChild(banner);
    section.appendChild(buildCategoryHeader(cat));
    section.appendChild(cat.layout === "row" ? buildDrinkRow(cat.items) : buildCardGrid(cat.items, cat.id));
    container.appendChild(section);
    return section;
  }

  // Single shared place all displayed prices go through, so the currency
  // symbol/format stays consistent everywhere and is easy to change later.
  function formatPrice(price) {
    return price + "₪";
  }

  // Categories that show the "خبزة جبيتا أسود" bread add-on note on every
  // card. Sandwiches (baguette) only, per the menu spec.
  var ADDON_CATEGORY_IDS = { "cat-sandwiches": true };
  var BREAD_ADDON_TEXT = "🍞 خبزة جبيتا أسود (+3₪)";

  // Header banner image for a category, with the logo watermarked
  // top-right. Returns null (renders nothing) if the category has no
  // "image" field in menu-data.js.
  function buildCategoryBanner(cat) {
    if (!cat.image) return null;

    var banner = document.createElement("div");
    banner.className = "category-banner";

    var img = document.createElement("img");
    img.className = "category-banner-img";
    img.src = cat.image;
    img.alt = cat.category;
    img.loading = "lazy";
    banner.appendChild(img);

    var watermark = document.createElement("span");
    watermark.className = "category-watermark";
    var logo = document.createElement("img");
    logo.src = LOGO_SRC;
    logo.alt = "";
    logo.setAttribute("aria-hidden", "true");
    watermark.appendChild(logo);
    banner.appendChild(watermark);

    return banner;
  }

  function buildCategoryHeader(cat) {
    var header = document.createElement("div");
    header.className = "category-header";
    header.innerHTML =
      '<span class="category-icon">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (CATEGORY_ICONS[cat.id] || "") +
      "</svg></span>" +
      '<h2 class="category-title" id="' + cat.id + '-h">' +
      escapeHtml(cat.category) +
      "<span>" + escapeHtml(cat.nameEn || "") + "</span></h2>";
    return header;
  }

  function buildCardGrid(items, catId) {
    var grid = document.createElement("div");
    grid.className = "card-grid";
    var showAddon = ADDON_CATEGORY_IDS[catId] === true;
    items.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "card";
      card.innerHTML =
        '<div class="card-row"><h3 class="card-name">' + escapeHtml(item.name) + "</h3>" +
        '<span class="card-price">' + formatPrice(item.price) + "</span></div>" +
        (item.desc ? '<p class="card-desc">' + escapeHtml(item.desc) + "</p>" : "") +
        (showAddon ? '<p class="card-addon">' + BREAD_ADDON_TEXT + "</p>" : "");
      grid.appendChild(card);
    });
    return grid;
  }

  function buildDrinkRow(items) {
    var row = document.createElement("div");
    row.className = "drink-row";
    items.forEach(function (item) {
      var pill = document.createElement("div");
      pill.className = "drink-item";
      pill.innerHTML =
        '<div class="drink-name">' + escapeHtml(item.name) + "</div>" +
        '<div class="drink-price">' + formatPrice(item.price) + "</div>";
      row.appendChild(pill);
    });
    return row;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // =================================================================
  // 3. Chip click -> scroll to section, + active chip highlight on scroll
  // =================================================================
  function initChipScroll(chips, sections) {
    chips.forEach(function (chip, i) {
      chip.addEventListener("click", function () {
        var target = sections[i];
        if (target) {
          target.scrollIntoView({ behavior: REDUCED_MOTION ? "auto" : "smooth", block: "start" });
        }
      });
    });

    if (!("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = sections.indexOf(entry.target);
        if (idx === -1) return;
        chips.forEach(function (c) { c.removeAttribute("aria-current"); });
        chips[idx].setAttribute("aria-current", "true");
        chips[idx].scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (sec) { observer.observe(sec); });
  }

  // =================================================================
  // 4. WhatsApp / phone link setup
  // =================================================================
  function initContactLinks() {
    setHref("wa-fab", "https://wa.me/" + CONTACT.whatsappSecondary);
    setHref("footer-wa-primary", "https://wa.me/" + CONTACT.whatsappPrimary);
    setHref("footer-wa-secondary", "https://wa.me/" + CONTACT.whatsappSecondary);
  }

  function setHref(id, href) {
    var el = document.getElementById(id);
    if (el) el.href = href;
  }
})();
