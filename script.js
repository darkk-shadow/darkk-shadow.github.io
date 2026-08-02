// ===========================
// HAMBURGER MENU
// ===========================
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Close menu when clicking outside
document.addEventListener("click", function (e) {
  const nav = document.querySelector("#hamburger-nav");
  if (nav && !nav.contains(e.target)) {
    document.querySelector(".menu-links").classList.remove("open");
    document.querySelector(".hamburger-icon").classList.remove("open");
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

type();

// ===========================
// SCROLL REVEAL + SKILL BARS
// ===========================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        // Animate skill bars when they come into view
        if (entry.target.id === "skill-bars") {
          entry.target.querySelectorAll(".skill-bar-fill").forEach((bar) => {
            const targetWidth = bar.getAttribute("data-width");
            setTimeout(() => {
              bar.style.width = targetWidth + "%";
            }, 200);
          });
        }
      } else {
        // Re-animate on scroll back (except skill bars — reset them)
        if (entry.target.id === "skill-bars") {
          entry.target.querySelectorAll(".skill-bar-fill").forEach((bar) => {
            bar.style.width = "0%";
          });
        }
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
