ScrollReveal({
    reset: false,
    distance: '30px',
    duration: 1800,
    delay: 0,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    opacity: 0,
    scale: 0.95,
    mobile: true,
    cleanup: true
});

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

ScrollReveal().reveal('#particle-background', { 
    delay: 0, 
    duration: 2200,
    opacity: 0,
    scale: 1
});

document.addEventListener('DOMContentLoaded', () => {
    const copyrightElement = document.getElementById("copyright");
    if (copyrightElement) {
        copyrightElement.innerHTML = "&copy; " + new Date().getFullYear() + " IzukiNo - All Rights Reserved.";
    }
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(function(img) {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});
