/* ==========================================
   PAUL BUSINESS SOLUTIONS (PBS)
   Main Interactive & Configuration Script
========================================== */

// CENTRAL CONFIGURATION
const PBS_CONFIG = {
    calendarUrl: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1L8l9jQ_sample', // Easily configurable Google Calendar Appointment Schedule URL
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

    // 4. SCROLL REVEAL ANIMATIONS
    initScrollAnimations();
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

        // Close mobile drawer when clicking a link
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

            // Close all items in current accordion container
            const accordion = item.closest('.accordion');
            if (accordion) {
                accordion.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            }

            // Toggle clicked item
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Intersection Observer for subtle scroll reveal
 */
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.trust-card, .industry-card, .service-card, .testimonial-card, .case-study-card');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    }
}
