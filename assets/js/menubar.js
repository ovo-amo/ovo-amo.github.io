(function () {
    // Get the base path from the script tag's data-base attribute
    const scriptTag = document.currentScript;
    const basePathAttr = scriptTag.getAttribute('data-base');
    const basePath = basePathAttr !== null ? basePathAttr : '.';

    // HTML Structure
    const menuHTML = `
    <div id="menu-toggle" onclick="toggleMenu()">&#9776;</div>
    <div id="sidebar">
        <a href="javascript:void(0)" class="closebtn" onclick="toggleMenu()">&times;</a>
        <a href="${basePath}/">Home</a>
        <span class="dropdown-btn" onclick="toggleDropdown()">PRIMES &#9662;</span>
        <div id="primes-dropdown" class="dropdown-container">
            <a href="${basePath}/primes/">Home</a>
            <a href="${basePath}/primes/2026/">2026</a>
            <a href="${basePath}/primes/2025/">2025</a>
            <a href="${basePath}/primes/2025/jmm2026/">JMM 2026</a>
        </div>
    </div>
    `;

    // Inject styles if they aren't already part of main.css, 
    // but assuming main.css handles it. If strictly making it a plugin:
    // We rely on the existing main.css for styling these IDs and classes.

    // Inject HTML into body
    document.body.insertAdjacentHTML('afterbegin', menuHTML);

    // Global Functions for Interaction
    window.toggleMenu = function () {
        var sidebar = document.getElementById("sidebar");
        if (sidebar.style.width === "250px") {
            sidebar.style.width = "0";
        } else {
            sidebar.style.width = "250px";
        }
    };

    window.toggleDropdown = function () {
        var dropdownContent = document.getElementById("primes-dropdown");
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    };
})();
