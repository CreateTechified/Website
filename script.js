document.addEventListener("DOMContentLoaded", function () {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      setTimeout(() => {
        initializeThemeToggle();
        setupMenuToggle();
        checkNavbarOverflow();
      }, 100);
    });

  window.addEventListener("resize", checkNavbarOverflow);
});

// Function to toggle mobile menu
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}

// Function to initialize theme toggle
function initializeThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  if (!themeToggle) return;

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.textContent = "☀️";
  } else {
    themeIcon.textContent = "🌙";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeIcon.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeIcon.textContent = "🌙";
    }
  });
}

// Function to enable mobile menu toggle
function setupMenuToggle() {
  const menuToggle = document.querySelector(".menu-toggle");
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }
}

// Function to check if the navbar overflows and show/hide the hamburger menu
function checkNavbarOverflow() {
  const nav = document.querySelector("nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!nav || !menuToggle || !navLinks) return;

  const navWidth = nav.clientWidth;
  const linksWidth = navLinks.scrollWidth + 100;

  if (linksWidth > navWidth) {
    menuToggle.style.display = "block";
    navLinks.classList.add("mobile");
  } else {
    menuToggle.style.display = "none";
    navLinks.classList.remove("mobile");
    navLinks.classList.remove("active");
  }
}
