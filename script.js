document.addEventListener("DOMContentLoaded", function() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            setTimeout(() => {
                setupMenuToggle(); // Keep only the menu toggle setup
            }, 100);
        });
});

// Function to toggle mobile menu
function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("active");
}

// Function to enable mobile menu toggle
function setupMenuToggle() {
    document.querySelector(".menu-toggle").addEventListener("click", toggleMenu);
}

const menuToggleButton = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');

menuToggleButton.addEventListener('click', () => {
  navList.classList.toggle('active');
});
