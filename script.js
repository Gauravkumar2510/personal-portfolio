// Gaurav Kumar — Interactive Portfolio

const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("navMenu");

// ================================
// THEME + LOCAL STORAGE
// ================================

function applyTheme(theme) {
  body.classList.toggle("light", theme === "light");

  if (themeToggle) {
    themeToggle.textContent = theme === "light" ? "☀️" : "🌙";

    themeToggle.setAttribute(
      "aria-label",
      theme === "light"
        ? "Switch to dark mode"
        : "Switch to light mode"
    );
  }
}

applyTheme(localStorage.getItem("portfolioTheme") || "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains("light")
      ? "dark"
      : "light";

    localStorage.setItem("portfolioTheme", nextTheme);
    applyTheme(nextTheme);
  });
}


// ================================
// MOBILE NAVIGATION
// ================================

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");

    menuToggle.textContent = open ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");

      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}


// ================================
// DYNAMIC GREETING
// ================================

const greeting = document.getElementById("greeting");

if (greeting) {
  const hour = new Date().getHours();

  greeting.textContent =
    hour < 12
      ? "Good Morning! 🌅"
      : hour < 18
      ? "Good Afternoon! ☀️"
      : "Good Evening! 🌙";
}


// ================================
// CONTACT FORM VALIDATION
// ================================

const form = document.getElementById("contactForm");
const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const msgEl = document.getElementById("message");

function emailOK(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

if (form && nameEl && emailEl && msgEl) {

  form.addEventListener("submit", event => {

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = msgEl.value.trim();

    // Clear old errors
    ["nameError", "emailError", "messageError"].forEach(id => {
      const errorElement = document.getElementById(id);

      if (errorElement) {
        errorElement.textContent = "";
      }
    });

    const successElement = document.getElementById("formSuccess");

    if (successElement) {
      successElement.textContent = "";
    }

    let valid = true;

    // Name validation
    if (name.length < 2) {
      const errorElement = document.getElementById("nameError");

      if (errorElement) {
        errorElement.textContent =
          "Please enter at least 2 characters.";
      }

      valid = false;
    }

    // Email validation
    if (!emailOK(email)) {
      const errorElement = document.getElementById("emailError");

      if (errorElement) {
        errorElement.textContent =
          "Please enter a valid email.";
      }

      valid = false;
    }

    // Message validation
    if (message.length < 10) {
      const errorElement = document.getElementById("messageError");

      if (errorElement) {
        errorElement.textContent =
          "Message should be at least 10 characters.";
      }

      valid = false;
    }

    // Stop submission only when form is invalid
    if (!valid) {
      event.preventDefault();
      return;
    }

    // IMPORTANT:
    // Do NOT call preventDefault() here.
    // Formspree will receive the form normally.

    if (successElement) {
      successElement.textContent = "✓ Sending message...";
    }
  });


  // Input border effect
  [nameEl, emailEl, msgEl].forEach(element => {

    element.addEventListener("input", () => {

      element.style.borderColor =
        element.value.trim()
          ? "var(--accent)"
          : "";

    });

  });

}


// ================================
// GALLERY MODAL
// ================================

const modal = document.getElementById("modal");
const modalArt = document.getElementById("modalArt");
const modalTitle = document.getElementById("modalTitle");
const modalClose = document.getElementById("modalClose");

if (modal && modalArt && modalTitle) {

  document.querySelectorAll(".gallery-item").forEach(item => {

    item.addEventListener("click", () => {

      const sourceImg = item.querySelector("img");

      if (!sourceImg) {
        return;
      }

      // Set title
      modalTitle.textContent =
        item.dataset.title || "";

      // Clear previous image
      modalArt.innerHTML = "";

      // Create new image
      const img = document.createElement("img");

      img.src = sourceImg.getAttribute("src");
      img.alt =
        sourceImg.getAttribute("alt") || "";

      modalArt.appendChild(img);

      // Open modal
      modal.classList.add("show");

      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    });

  });

}


// ================================
// CLOSE GALLERY MODAL
// ================================

function closeModal() {

  if (!modal) {
    return;
  }

  modal.classList.remove("show");

  if (modalArt) {
    modalArt.innerHTML = "";
  }

  document.body.style.overflow = "";
}


// Close button
if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}


// Click outside modal box
if (modal) {

  modal.addEventListener("click", event => {

    if (event.target === modal) {
      closeModal();
    }

  });

}


// Escape key
document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeModal();
  }

});


// ================================
// SCROLL REVEAL
// ================================

const revealElements =
  document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    observer.observe(element);
  });

} else {

  // Fallback for older browsers
  revealElements.forEach(element => {
    element.classList.add("visible");
  });

}


// ================================
// FOOTER YEAR
// ================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent =
    new Date().getFullYear();
                          }
