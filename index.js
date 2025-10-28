// ScrollReveal configuration for index page - Smooth & Modern
ScrollReveal({
    reset: false,        // Không reset animation khi scroll lại
    distance: '30px',    // Khoảng cách di chuyển nhỏ hơn, tự nhiên hơn
    duration: 1800,      // 1.8s - slower, more elegant
    delay: 0,            // Không delay mặc định
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',  // Easing curve smooth
    opacity: 0,          // Fade in từ invisible
    scale: 0.95,         // Scale nhẹ để thêm depth
    mobile: true,        // Hoạt động trên mobile
    cleanup: true        // Cleanup sau khi animate xong
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Reveal animations - Stagger timing tự nhiên
ScrollReveal().reveal('nav', { 
    delay: 150, 
    origin: 'top',
    distance: '20px',
    duration: 1600
});

ScrollReveal().reveal('.home-img', { 
    delay: 300, 
    origin: 'right',
    duration: 2000,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
});

ScrollReveal().reveal('.home-content h1', { 
    delay: 500, 
    origin: 'left',
    distance: '30px',
    duration: 1800
});

ScrollReveal().reveal('.home-content p', { 
    delay: 700, 
    origin: 'left',
    distance: '30px',
    duration: 1800
});

ScrollReveal().reveal('.social-icon', { 
    delay: 900, 
    origin: 'left',
    distance: '30px',
    interval: 200,
    duration: 1600
});

// Particle background fade in nhẹ
ScrollReveal().reveal('#particle-background', { 
    delay: 0, 
    duration: 2200,
    opacity: 0,
    scale: 1  // Không scale particle background
});

// Dynamic copyright year - wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    const copyrightElement = document.getElementById("copyright");
    if (copyrightElement) {
        copyrightElement.innerHTML = "&copy; " + new Date().getFullYear() + " IzukiNo - All Rights Reserved.";
    }
});

// Optimize image loading: lazy loading for all images
// Note: CSS cannot set loading=lazy, must be set in HTML/JS
// Add lazy loading via JS for all images
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(function(img) {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});
