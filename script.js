document.addEventListener("DOMContentLoaded", function() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            initializeThemeToggle();
        });
});

function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("active");
}

function initializeThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

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
