// ===========================
// HAMBURGER MENU
// ===========================
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  const isOpen = !menu.classList.contains("open");
  menu.classList.toggle("open", isOpen);
  icon.classList.toggle("open", isOpen);
  icon.setAttribute("aria-expanded", String(isOpen));
}

function closeMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.remove("open");
  icon.classList.remove("open");
  icon.setAttribute("aria-expanded", "false");
}

// Close menu when clicking outside
document.addEventListener("click", function (e) {
  const nav = document.querySelector("#hamburger-nav");
  if (nav && !nav.contains(e.target)) {
    closeMenu();
  }
});

document.addEventListener("keydown", function (e) {
  const menu = document.querySelector(".menu-links");
  if (e.key === "Escape" && menu.classList.contains("open")) {
    closeMenu();
    document.querySelector(".hamburger-icon").focus();
  }
});

// ===========================
// TYPEWRITER EFFECT
// ===========================
const roles = [
  "Java Full Stack Developer",
  "Spring Boot Enthusiast",
  "Problem Solver",
  "React Developer",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById("typewriter");
document.getElementById("current-year").textContent = String(new Date().getFullYear());

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typeEl.textContent = roles[0];
} else {
  type();
}

// ===========================
// SCROLL REVEAL
// ===========================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

// ===========================
// ACTIVE NAV HIGHLIGHT
// ===========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.style.fontWeight = "400";
          if (link.getAttribute("href") === "#" + entry.target.id) {
            link.style.fontWeight = "700";
          }
        });
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach((section) => navObserver.observe(section));
