/* ==========================================
   PAUL BUSINESS SOLUTIONS (PBS)
   Main Interactive Script & Motion System
========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. CALENDAR APPOINTMENT BUTTONS
    initCalendarButtons();

    // 2. MOBILE NAVIGATION DRAWER
    initMobileNav();

    // 3. ACCORDION COMPONENT
    initAccordions();

    // 4. SCROLL REVEAL MOTION SYSTEM
    initScrollReveal();

    // 5. HERO SYSTEM NETWORK CANVAS ANIMATION
    initHeroNetworkCanvas();

    // 6. AI WORKFLOW VISUALIZER ANIMATION
    initAIWorkflowAnimation();

    // 7. INQUIRY FORM OPTIONS HANDLER
    initInquiryForm();
});

/**
 * Configure all 'Book a Discovery Call' buttons to launch Google Calendar appointment page
 */
function initCalendarButtons() {
    const calendarBtns = document.querySelectorAll('.js-calendar-btn');
    const calendarUrl = (typeof PBS_CONFIG !== 'undefined' && PBS_CONFIG.calendarUrl)
        ? PBS_CONFIG.calendarUrl
        : 'https://calendar.app.google/e94yp4j3eeGRrSXL6';

    calendarBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(calendarUrl, '_blank', 'noopener,noreferrer');
        });
    });
}

/**
 * Handle mobile navigation drawer toggle and keyboard accessibility
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

/**
 * Scroll Reveal Animation Engine (Fade-up, Scale-in)
 */
function initScrollReveal() {
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const revealElements = document.querySelectorAll('.reveal, .service-card, .pillar-card, .process-step, .case-study-card');
    if (!revealElements.length) return;

    revealElements.forEach(el => el.classList.add('reveal-init'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Interactive Business System Network Visualizer (Hero Canvas)
 * Connects central "BUSINESS" node to CRM, Database, Website, Automation, AI, Dashboard, Custom App
 */
function initHeroNetworkCanvas() {
    const canvas = document.getElementById('heroNetworkCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;

    const nodes = [
        { id: 'center', label: 'BUSINESS', x: 0.5, y: 0.5, radius: 42, isCenter: true, color: '#2563EB' },
        { id: 'crm', label: 'CRM', angle: 0, radius: 26, color: '#14B8A6' },
        { id: 'database', label: 'DATABASE', angle: 50, radius: 26, color: '#3B82F6' },
        { id: 'website', label: 'WEBSITE', angle: 100, radius: 26, color: '#6366F1' },
        { id: 'automation', label: 'AUTOMATION', angle: 155, radius: 26, color: '#10B981' },
        { id: 'ai', label: 'AI ENGINE', angle: 210, radius: 28, color: '#8B5CF6' },
        { id: 'dashboard', label: 'DASHBOARD', angle: 265, radius: 26, color: '#F59E0B' },
        { id: 'custom_app', label: 'CUSTOM APP', angle: 315, radius: 26, color: '#EC4899' }
    ];

    let pulses = [];
    let pulseTimer = 0;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = rect.width || 560;
        height = rect.height || 420;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resize);
    resize();

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animate(time) {
        ctx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const orbitRadius = Math.min(width, height) * 0.36;

        // Calculate positions
        nodes.forEach(node => {
            if (node.isCenter) {
                node.cx = centerX;
                node.cy = centerY;
            } else {
                const rad = (node.angle * Math.PI) / 180;
                // Subtle floating movement
                const floatOffset = prefersReducedMotion ? 0 : Math.sin(time * 0.0015 + node.angle) * 6;
                const r = orbitRadius + floatOffset;
                node.cx = centerX + Math.cos(rad) * r;
                node.cy = centerY + Math.sin(rad) * r;
            }
        });

        // Spawn pulse packet along network connections
        if (!prefersReducedMotion && time - pulseTimer > 1200) {
            pulseTimer = time;
            const targetNode = nodes[1 + Math.floor(Math.random() * (nodes.length - 1))];
            const direction = Math.random() > 0.5 ? 'outbound' : 'inbound';
            pulses.push({
                target: targetNode,
                progress: 0,
                speed: 0.012 + Math.random() * 0.008,
                direction: direction
            });
        }

        // Draw Connection Lines
        nodes.forEach(node => {
            if (!node.isCenter) {
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(node.cx, node.cy);
                ctx.strokeStyle = 'rgba(203, 213, 225, 0.7)';
                ctx.lineWidth = 1.5;
                ctx.setLineDash([4, 4]);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        });

        // Update and draw pulse signals
        pulses = pulses.filter(p => p.progress <= 1);
        pulses.forEach(p => {
            p.progress += p.speed;
            let px, py;
            if (p.direction === 'outbound') {
                px = centerX + (p.target.cx - centerX) * p.progress;
                py = centerY + (p.target.cy - centerY) * p.progress;
            } else {
                px = p.target.cx + (centerX - p.target.cx) * p.progress;
                py = p.target.cy + (centerY - p.target.cy) * p.progress;
            }

            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fillStyle = p.target.color;
            ctx.shadowColor = p.target.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        // Draw Nodes
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.cx, node.cy, node.radius, 0, Math.PI * 2);

            if (node.isCenter) {
                // Gradient for Central Business Node
                const grad = ctx.createLinearGradient(node.cx - node.radius, node.cy - node.radius, node.cx + node.radius, node.cy + node.radius);
                grad.addColorStop(0, '#1E40AF');
                grad.addColorStop(1, '#2563EB');
                ctx.fillStyle = grad;
                ctx.shadowColor = 'rgba(37, 99, 235, 0.4)';
                ctx.shadowBlur = 18;
            } else {
                ctx.fillStyle = '#FFFFFF';
                ctx.strokeStyle = node.color;
                ctx.lineWidth = 2.5;
                ctx.shadowColor = 'rgba(15, 23, 42, 0.08)';
                ctx.shadowBlur = 10;
                ctx.stroke();
            }

            ctx.fill();
            ctx.shadowBlur = 0;

            // Draw Node Text Label
            ctx.fillStyle = node.isCenter ? '#FFFFFF' : '#0F172A';
            ctx.font = node.isCenter ? '600 11px Inter, sans-serif' : '600 9.5px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.label, node.cx, node.cy);
        });

        if (!prefersReducedMotion) {
            animationFrameId = requestAnimationFrame(animate);
        }
    }

    if (prefersReducedMotion) {
        animate(0);
    } else {
        animationFrameId = requestAnimationFrame(animate);
    }
}

/**
 * Animated AI Workflow Step Highlighter
 */
function initAIWorkflowAnimation() {
    const workflowContainer = document.querySelector('.ai-workflow-pipeline');
    if (!workflowContainer) return;

    const steps = workflowContainer.querySelectorAll('.ai-workflow-step');
    if (!steps.length) return;

    let currentStep = 0;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) {
        steps.forEach(step => step.classList.add('active'));
        return;
    }

    setInterval(() => {
        steps.forEach((step, idx) => {
            if (idx === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        currentStep = (currentStep + 1) % steps.length;
    }, 2200);
}

/**
 * Project Type Selection handling for Contact Form
 */
function initInquiryForm() {
    const chipContainer = document.querySelector('.inquiry-chips-container');
    const hiddenInput = document.getElementById('selectedProjectType');

    if (chipContainer && hiddenInput) {
        const chips = chipContainer.querySelectorAll('.inquiry-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                hiddenInput.value = chip.getAttribute('data-value') || chip.textContent.trim();
            });
        });
    }
}
