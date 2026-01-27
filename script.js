// Tree Busters and More - JavaScript functionality

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Create message for text
        const message = `New contact from ${data.name} (${data.phone}): ${data.service} - ${data.message}`;
        
        // Send text message via email-to-SMS gateway
        // Replace with your phone number and carrier
        const yourPhoneNumber = '[YOUR_PHONE_NUMBER]'; // Remove dashes, just numbers
        const carrier = '[YOUR_CARRIER]'; // Options: 'att', 'verizon', 'tmobile', 'sprint'
        
        const carrierGateways = {
            'att': 'txt.att.net',
            'verizon': 'vtext.com',
            'tmobile': 'tmomail.net',
            'sprint': 'messaging.sprintpcs.com'
        };
        
        // Create mailto link with the message
        const emailGateway = `${yourPhoneNumber}@${carrierGateways[carrier]}`;
        const subject = encodeURIComponent('Tree Busters Contact');
        const body = encodeURIComponent(message);
        
        // Open email client to send the text
        window.location.href = `mailto:${emailGateway}?subject=${subject}&body=${body}`;
        
        // Show confirmation to user
        setTimeout(() => {
            alert('Thank you for your message! We will contact you shortly.');
            this.reset();
        }, 1000);
    });
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
    } else {
        header.style.background = 'var(--primary-dark)';
    }
});

// Animate service cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});