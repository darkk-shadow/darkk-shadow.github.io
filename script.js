const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Mobile navigation
const hamburgerButton = document.querySelector(".hamburger-icon");
const menu = document.querySelector(".menu-links");

function setMenuState(isOpen) {
  if (!hamburgerButton || !menu) return;
  menu.classList.toggle("open", isOpen);
  hamburgerButton.classList.toggle("open", isOpen);
  hamburgerButton.setAttribute("aria-expanded", String(isOpen));
  hamburgerButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

if (hamburgerButton && menu) {
  hamburgerButton.addEventListener("click", () => {
    setMenuState(!menu.classList.contains("open"));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("#hamburger-nav")) setMenuState(false);
  });
}

// Reveal sections when visible.
const revealElements = document.querySelectorAll(".hidden");

if (prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add("show"));
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("show"));
}

// Keep the current section visible in both desktop and mobile navigation.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", isActive);
          if (isActive) link.setAttribute("aria-current", "page");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );
  sections.forEach((section) => navObserver.observe(section));
}
