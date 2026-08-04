/* ==========================================
   PAUL BUSINESS SOLUTIONS (PBS)
   Main Interactive & Configuration Script
========================================== */

// CENTRAL CONFIGURATION
const PBS_CONFIG = {
    calendarUrl: 'https://calendar.app.google/sLTP5zKM18GkvwAG6',
    contactEmail: 'hello@paulbizsolutions.com',
    companyName: 'Paul Business Solutions'
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. INITIALIZE CALENDAR APPOINTMENT BUTTONS
    initCalendarButtons();

    // 2. MOBILE NAVIGATION DRAWER
    initMobileNav();

    // 3. ACCORDION / FAQ COMPONENT
    initAccordions();
});

/**
 * Configure all 'Book a Discovery Call' buttons to launch Google Calendar appointment page
 */
function initCalendarButtons() {
    const calendarBtns = document.querySelectorAll('.js-calendar-btn');
    calendarBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(PBS_CONFIG.calendarUrl, '_blank', 'noopener,noreferrer');
        });
    });
}

/**
 * Handle mobile navigation drawer toggle
 */
function initMobileNav() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (toggleBtn && mobileNav) {
        toggleBtn.addEventListener('click', () => {
            const isActive = mobileNav.classList.toggle('active');
            toggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            toggleBtn.innerHTML = isActive 
                ? '<i class="fa-solid fa-xmark"></i>' 
                : '<i class="fa-solid fa-bars"></i>';
        });

        const mobileLinks = mobileNav.querySelectorAll('.nav-link, .btn');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
                toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }
}

/**
 * Initialize FAQ accordions
 */
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains('active');

            const accordion = item.closest('.accordion');
            if (accordion) {
                accordion.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            }

            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });
}
