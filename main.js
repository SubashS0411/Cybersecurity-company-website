document.addEventListener('DOMContentLoaded', () => {
    // Scroll Header Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon
            if (navLinks.classList.contains('active')) {
                menuToggle.textContent = '✕';
            } else {
                menuToggle.textContent = '☰';
            }
        });
    }

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    // Counter Animation
    const counters = document.querySelectorAll('.counter');

    const runCounter = (counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = 20; // update every 20ms
        // Calculate increment per step
        const increment = target / (duration / step);

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.innerText = target;
                clearInterval(timer);
            } else {
                // If target has decimal, show 1 decimal place, else 0
                // Check if target is float by modulo 1
                if (target % 1 !== 0) {
                    counter.innerText = current.toFixed(1);
                } else {
                    counter.innerText = Math.ceil(current);
                }
            }
        }, step);
    };

    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounter(entry.target);
                    observer.unobserve(entry.target); // Stop observing once triggered
                }
            });
        }, {
            threshold: 0.1
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // --- Dashboard Specific Logic ---
    // Trigger counters on Tab Switch
    const dashboardTabs = document.querySelectorAll('.nav-item');
    if (dashboardTabs.length > 0) {
        dashboardTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                setTimeout(() => {
                    const activeSec = document.querySelector('.dashboard-section.active');
                    if (activeSec) {
                        activeSec.querySelectorAll('.counter').forEach(c => runCounter(c));
                    }
                }, 50);
            });
        });

        // Also trigger on initial load if on dashboard
        const activeDash = document.querySelector('.dashboard-section.active');
        if (activeDash) {
            activeDash.querySelectorAll('.counter').forEach(c => runCounter(c));
        }
    }
});

// Update Randomizer Logic directly in index.html (moved here for consistency if needed, but likely in index.html script block. Waiting to check index.html script block).
