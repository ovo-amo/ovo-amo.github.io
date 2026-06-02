(function () {
    // Get the base path from the script tag's data-base attribute
    const scriptTag = document.currentScript;
    const basePathAttr = scriptTag.getAttribute('data-base');
    const basePath = basePathAttr !== null ? basePathAttr : '.';

    // HTML Structure
    const menuHTML = `
    <div id="dark-mode-toggle" onclick="toggleGlobalDarkMode()" aria-label="Toggle Dark Mode">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
    </div>
    <div id="global-menu-toggle" onclick="toggleGlobalMenu()" aria-label="Toggle Menu">
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    </div>
    <div id="global-sidebar-overlay" onclick="toggleGlobalMenu()"></div>
    <div id="global-sidebar">
        <div class="sidebar-header">
            <span class="sidebar-title">Menu</span>
            <button class="closebtn" onclick="toggleGlobalMenu()" aria-label="Close Menu">&times;</button>
        </div>
        <div class="sidebar-content">
            <a href="${basePath}/" class="sidebar-link">Home</a>
            <div class="dropdown-wrapper">
                <button class="dropdown-btn" onclick="toggleGlobalDropdown(this)">PRIMES <span class="caret">&#9662;</span></button>
                <div class="dropdown-container">
                    <a href="${basePath}/primes/" class="sidebar-link sub-link">Home</a>
                    <a href="${basePath}/primes/2026/" class="sidebar-link sub-link">2026</a>
                    <a href="${basePath}/primes/2025/" class="sidebar-link sub-link">2025</a>
                    <a href="${basePath}/primes/2025/jmm2026/" class="sidebar-link sub-link">JMM 2026</a>
                </div>
            </div>
            <a href="${basePath}/ross/" class="sidebar-link">Ross</a>
            <a href="${basePath}/timotree/" class="sidebar-link">Timotree</a>
            <a href="${basePath}/scibowl/" class="sidebar-link">Science Bowl</a>
            <a href="${basePath}/latin/" class="sidebar-link">Latin</a>
        </div>
    </div>
    `;

    // Inject HTML into body
    document.body.insertAdjacentHTML('afterbegin', menuHTML);

    // Global Functions for Interaction
    window.toggleGlobalMenu = function () {
        document.getElementById("global-sidebar").classList.toggle("open");
        document.getElementById("global-sidebar-overlay").classList.toggle("open");
    };

    window.toggleGlobalDarkMode = function () {
        document.documentElement.classList.toggle("light-mode");
        const isLight = document.documentElement.classList.contains("light-mode");
        localStorage.setItem("globalDarkMode", isLight ? "light" : "dark");
    };

    // Initialize dark mode from localStorage
    if (localStorage.getItem("globalDarkMode") === "light") {
        document.documentElement.classList.add("light-mode");
    }

    window.toggleGlobalDropdown = function (btn) {
        const container = btn.nextElementSibling;
        btn.classList.toggle("open");
        if (container.style.maxHeight) {
            container.style.maxHeight = null;
        } else {
            container.style.maxHeight = container.scrollHeight + "px";
        }
    };
})();
