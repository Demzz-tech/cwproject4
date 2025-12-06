// ========================================
// ANIME INDUSTRY EXPLOITATION WEBSITE
// JavaScript - Interactivity & Functionality
// ========================================

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scrollToTop');

// ========================================
// MOBILE NAVIGATION
// ========================================

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

/**
 * Close mobile menu when a link is clicked
 */
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Event Listeners for Mobile Navigation
hamburger.addEventListener('click', toggleMobileMenu);

navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        closeMobileMenu();
    }
});

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

/**
 * Show/hide scroll to top button based on scroll position
 */
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

/**
 * Scroll to top when button is clicked
 */
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// SMOOTH SCROLL BEHAVIOR
// ========================================

/**
 * Enhance smooth scrolling for all anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for valid section links
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

/**
 * Add fade-in animation to elements as they come into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

// Slow down animation timing
const animationDuration = '1s';
const animationDelay = '0.2s';

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    observer.observe(section);
});

// ========================================
// ACTIVE NAVIGATION LINK
// ========================================

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => link.style.color = 'var(--primary-white)');
            
            // Add active styling to current link
            if (navLink) {
                navLink.style.color = 'var(--light-sky-blue)';
                navLink.style.textShadow = '0 0 10px rgba(30, 144, 255, 0.5)';
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ========================================
// HOVER EFFECTS FOR INTERACTIVE ELEMENTS
// ========================================

/**
 * Add enhanced hover effects to cards and interactive elements
 */
const cards = document.querySelectorAll('.stat-card, .story-card, .solution-card, .case-study, .info-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================

/**
 * Allow keyboard navigation through sections
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

/**
 * Debounce function for scroll events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll event listener
const debouncedUpdateActiveNavLink = debounce(updateActiveNavLink, 50);
window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', debouncedUpdateActiveNavLink);

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

/**
 * Add focus visible styles for keyboard navigation
 */
const focusableElements = document.querySelectorAll('a, button, [tabindex]');

focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--dodger-blue)';
        this.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ========================================
// PAGE LOAD ANIMATION
// ========================================

/**
 * Animate hero section on page load
 */
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1.2s ease-out, transform 1.2s ease-out';
        
        // Trigger animation
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Get current scroll position
 */
function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize all functionality on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize active nav link
    updateActiveNavLink();
    
    // Log initialization
    console.log('Anime Industry Exploitation Website loaded successfully');
});

// ========================================
// ERROR HANDLING
// ========================================

/**
 * Handle any JavaScript errors gracefully
 */
window.addEventListener('error', (event) => {
    console.error('An error occurred:', event.error);
    // Prevent the error from breaking the page
    event.preventDefault();
});

// ========================================
// ANALYTICS & TRACKING (Optional)
// ========================================

/**
 * Track section views (can be expanded for analytics)
 */
function trackSectionView(sectionId) {
    // This can be integrated with Google Analytics or other tracking services
    console.log('Section viewed:', sectionId);
}

// Track when users reach different sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackSectionView(entry.target.id);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});
