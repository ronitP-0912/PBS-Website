/* ==========================================
   PAUL BUSINESS SOLUTIONS (PBS)
   Global Configuration & Data Architecture
========================================== */

const PBS_CONFIG = {
    companyName: 'Paul Business Solutions',
    tagline: 'Business Systems, Websites, Custom Software & AI',
    calendarUrl: 'https://calendar.app.google/e94yp4j3eeGRrSXL6',
    contactEmail: 'hello@paulbizsolutions.com',
    whatsApp: '+919000000000',
    location: 'Kolkata, India (Serving Clients Worldwide)',
    socialLinks: {
        linkedin: 'https://linkedin.com/company/paulbizsolutions',
        github: 'https://github.com/ronitP-0912/PBS-website'
    },
    inquiryOptions: [
        'Website',
        'Web Application',
        'CRM',
        'Management System',
        'Database / DBMS',
        'Automation',
        'AI Solution',
        'Dashboard',
        'Custom Software',
        'Not Sure — Help Me Define It'
    ]
};

// Reusable Case Study Data Model
const PBS_CASE_STUDIES = [
    {
        id: 'divine-fellowship',
        title: 'Digital Administrative & Admission System',
        client: 'Divine Fellowship School',
        industry: 'Education',
        badge: 'Education & Administration',
        summary: 'Transitioned an educational institution from paper-based chaos and spreadsheets into an integrated digital system for admissions, student records, and staff coordination.',
        challenge: 'The institution struggled with manual paperwork, disjointed spreadsheet records, unorganized admission follow-ups, and heavy administrative overhead during enrollment periods.',
        requirements: [
            'Digital student admission and onboarding workflow',
            'Centralized database for student and guardian records',
            'Automated email notifications and follow-up reminders',
            'Staff workflow system to eliminate paper tracking'
        ],
        solution: [
            'Designed a unified digital admission workflow for instant record logging',
            'Built a centralized administrative system for staff collaboration',
            'Implemented automated communication triggers for applicant status updates',
            'Created an intuitive administrative dashboard for enrollment tracking'
        ],
        implementation: 'PBS audited the school\'s paper workflow, mapped administrative touchpoints, and built a custom digital system tailored directly to their staff\'s day-to-day operations.',
        technology: [
            'Google Workspace Integration',
            'Custom Administrative Database',
            'Automated Notification Engine',
            'Role-Based Staff Dashboard'
        ],
        outcomes: [
            'Fully digitized student onboarding pipeline',
            'Eliminated paper tracking for admissions and student files',
            'Unified staff record management with zero lost inquiry leads'
        ],
        testimonial: {
            quote: 'Paul Business Solutions completely digitized our administrative foundation. Our staff moved away from paper chaos into a modern, easy-to-use system that keeps our entire institution organized.',
            author: 'School Administrator',
            organization: 'Divine Fellowship School'
        }
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PBS_CONFIG, PBS_CASE_STUDIES };
}
