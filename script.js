document.addEventListener("DOMContentLoaded", function() {
    // --- Load Navbar ---
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            setTimeout(() => {
                setupMenuToggle(); 
                setupThemeToggle(); // Initialize theme button
                setupCarousel(); // Initialize carousel
            }, 100);
        });
    // --- Initialize Navbar ---
    setupMenuToggle(); 
    setupThemeToggle(); // Initialize theme button
    setupCarousel(); // Initialize carousel
});

// --- MOBILE MENU TOGGLE --- //
function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("active");
}

function setupMenuToggle() {
    const menuToggle = document.querySelector(".menu-toggle");
    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMenu);
    }
}

// --- THEME TOGGLE SYSTEM --- //
function setupThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle');
    if (!toggleButton) return; // Avoid errors if button not found

    // Load theme preference
    let theme = localStorage.getItem('theme') || 'system';
    applyTheme(theme);

    // Cycle through modes on click
    toggleButton.addEventListener('click', () => {
        if (theme === 'light') theme = 'dark';
        else if (theme === 'dark') theme = 'system';
        else theme = 'light';

        localStorage.setItem('theme', theme);
        applyTheme(theme);
    });

    // Apply the correct theme
    function applyTheme(mode) {
        document.documentElement.removeAttribute('data-theme');

        if (mode === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleButton.textContent = '☀️ Light';
        } else if (mode === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleButton.textContent = '🌙 Dark';
        } else {
            toggleButton.textContent = '🌓 System';
        }

        // If using "system", follow OS setting dynamically
        if (mode === 'system') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
            if (prefersDark.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            }

            // Auto-update if system preference changes
            prefersDark.addEventListener('change', (e) => {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            });
        }
    }
}

// --- IMAGE CAROUSEL --- //
function setupCarousel() {
    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach((carousel) => {
        const images = carousel.querySelectorAll("img");
        const prevBtn = carousel.querySelector(".prev");
        const nextBtn = carousel.querySelector(".next");
        let index = 0;

        function showImage(i) {
            images.forEach(img => img.classList.remove("active"));
            images[i].classList.add("active");
        }

        showImage(index);

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener("click", () => {
                index = (index - 1 + images.length) % images.length;
                showImage(index);
            });

            nextBtn.addEventListener("click", () => {
                index = (index + 1) % images.length;
                showImage(index);
            });
        }
    });
}