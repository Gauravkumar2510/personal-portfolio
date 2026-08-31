// Gaurav Kumar — Interactive Portfolio
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("navMenu");

// Theme + Local Storage
function applyTheme(theme) {
  body.classList.toggle("light", theme === "light");
  themeToggle.textContent = theme === "light" ? "🌙" : "☀️";
  themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
}
applyTheme(localStorage.getItem("portfolioTheme") || "dark");

themeToggle.addEventListener("click", () => {
  const nextTheme = body.classList.contains("light") ? "dark" : "light";
  localStorage.setItem("portfolioTheme", nextTheme);
  applyTheme(nextTheme);
});

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.textContent = open ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.textContent = "☰";
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Dynamic greeting
const hour = new Date().getHours();
document.getElementById("greeting").textContent =
  hour < 12 ? "Good Morning! 👋" :
  hour < 18 ? "Good Afternoon! 👋" : "Good Evening! 👋";

// Contact validation
const form = document.getElementById("contactForm");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const msgEl = document.getElementById("message");

function emailOK(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener("submit", event => {
  event.preventDefault();
  ["nameError", "emailError", "messageError"].forEach(id => {
    document.getElementById(id).textContent = "";
  });
  document.getElementById("formSuccess").textContent = "";

  let valid = true;
  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const message = msgEl.value.trim();

  if (name.length < 2) {
    document.getElementById("nameError").textContent = "Please enter at least 2 characters.";
    valid = false;
  }
  if (!emailOK(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email.";
    valid = false;
  }
  if (message.length < 10) {
    document.getElementById("messageError").textContent = "Message should be at least 10 characters.";
    valid = false;
  }
  if (valid) {
    document.getElementById("formSuccess").textContent = "✓ Form validated successfully!";
    form.reset();
  }
});

[nameEl, emailEl, msgEl].forEach(el => {
  el.addEventListener("input", () => {
    el.style.borderColor = el.value.trim() ? "var(--accent)" : "";
  });
});

// Gallery modal
const modal = document.getElementById("modal");
const modalArt = document.getElementById("modalArt");
const modalTitle = document.getElementById("modalTitle");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    modalTitle.textContent = item.dataset.title;
    modalArt.textContent = item.querySelector("img").outerHTML;
    modal.classList.add("show");
  });
});

function closeModal() {
  modal.classList.remove("show");
}
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
