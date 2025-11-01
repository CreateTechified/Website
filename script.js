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
        // Avoid initializing twice
        if (carousel.dataset.initialized === "1") return;
        carousel.dataset.initialized = "1";

        const images = Array.from(carousel.querySelectorAll("img"));
        if (!images.length) return;

        const prevBtn = carousel.querySelector(".carousel-btn.prev") || carousel.querySelector(".prev");
        const nextBtn = carousel.querySelector(".carousel-btn.next") || carousel.querySelector(".next");
        const dotsContainer = carousel.querySelector(".dots");

        let index = 0;

        // Create dots dynamically
        if (dotsContainer) {
            images.forEach((_, i) => {
                const dot = document.createElement("span");
                dot.classList.add("dot");
                dot.addEventListener("click", () => {
                    index = i;
                    showImage(index);
                });
                dotsContainer.appendChild(dot);
            });
        }

        const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll(".dot")) : [];

        function showImage(i) {
            images.forEach((img, idx) => {
                img.classList.toggle("active", idx === i);
                img.style.display = idx === i ? "block" : "none";
            });

            if (dots.length) {
                dots.forEach((dot, idx) => {
                    dot.classList.toggle("active", idx === i);
                });
            }
        }

        function nextImage() {
            index = (index + 1) % images.length;
            showImage(index);
        }

        function prevImage() {
            index = (index - 1 + images.length) % images.length;
            showImage(index);
        }

        if (prevBtn) prevBtn.addEventListener("click", prevImage);
        if (nextBtn) nextBtn.addEventListener("click", nextImage);

        showImage(index);
    });
}