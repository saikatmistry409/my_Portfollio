const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const themeToggle = document.querySelector(".theme-toggle");

const savedTheme = localStorage.getItem("saikat-theme");
if (savedTheme === "dark") document.body.classList.add("dark-theme");

if (themeToggle) {
  const updateThemeButton = () => {
    const isDark = document.body.classList.contains("dark-theme");
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to bright theme" : "Switch to dark theme");
  };
  updateThemeButton();
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("saikat-theme", document.body.classList.contains("dark-theme") ? "dark" : "bright");
    updateThemeButton();
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
  });
}

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => revealObserver.observe(item));

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = contactForm.querySelector(".form-message");
    message.textContent = "Thanks! Your message is ready to be sent.";
    contactForm.reset();
  });
}
