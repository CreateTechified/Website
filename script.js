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

  if (!themeToggle) return; // Prevent errors if the button isn't found

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.textContent = "☀️"; // Sun icon for light mode
  } else {
    themeIcon.textContent = "🌙"; // Moon icon for dark mode
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

  // Check if the nav items fit inside the navbar
  const navWidth = nav.clientWidth;
  const linksWidth = navLinks.scrollWidth + 100; // Add buffer space

  if (linksWidth > navWidth) {
    menuToggle.style.display = "block"; // Show hamburger menu
    navLinks.classList.add("mobile"); // Ensure proper styling
  } else {
    menuToggle.style.display = "none"; // Hide hamburger menu
    navLinks.classList.remove("mobile");
    navLinks.classList.remove("active"); // Ensure the dropdown is hidden on resize
  }
}
