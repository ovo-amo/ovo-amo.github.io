(function () {
    // Dynamically populate the navigation bar
    const navList = document.getElementById('dynamic-nav');
    if (navList) {
        document.querySelectorAll('.section-block').forEach(section => {
            const navText = section.getAttribute('data-nav') || section.querySelector('.section-title').innerText;
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${section.id}`;
            a.innerText = navText;
            li.appendChild(a);
            navList.appendChild(li);
        });
    }

    // Simple smooth scrolling for navigation links
    document.querySelectorAll('.site-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }

            // Update active state
            document.querySelectorAll('.site-nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Intersection Observer for active nav state based on scroll
    const sections = document.querySelectorAll('.section-block');
    const navLinks = document.querySelectorAll('.site-nav a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
})();
