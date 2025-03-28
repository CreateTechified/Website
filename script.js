document.addEventListener("DOMContentLoaded", function () {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      setTimeout(() => {
        initializeThemeToggle();
        setupMenuToggle();
      }, 100);
    });
});

// Function to toggle mobile menu
function toggleMenu() {
  document.getElementById("nav-links").classList.toggle("active");
}

// Function to initialize theme toggle
function initializeThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  if (!themeToggle) return; // Prevent errors if the button isn't found

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.textContent = "☀️";
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
  document.querySelector(".menu-toggle").addEventListener("click", toggleMenu);
}
