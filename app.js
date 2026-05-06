document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all tabs and contents
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Accordion Logic
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        const content = acc.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            const isActive = acc.classList.contains('active');

            // Optional: Close other accordions
            accordions.forEach(otherAcc => {
                if (otherAcc !== acc) {
                    otherAcc.classList.remove('active');
                    otherAcc.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current accordion
            if (!isActive) {
                acc.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                acc.classList.remove('active');
                content.style.maxHeight = null;
            }
        });
    });

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('ServiceWorker registered with scope:', registration.scope);
                })
                .catch(error => {
                    console.error('ServiceWorker registration failed:', error);
                });
        });
    }
});
