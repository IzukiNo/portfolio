// Extract YouTube video ID from URL
function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Get YouTube thumbnail URL from video URL
function getYouTubeThumbnail(videoUrl, quality = 'maxresdefault') {
    const videoId = getYouTubeVideoId(videoUrl);
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

// Load and render projects and videos from JSON
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        renderProjects(data.projects);
        renderVideos(data.videos);
        
        document.body.classList.add('js-enabled');
        initScrollReveal();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function renderProjects(projects) {
    const projectList = document.querySelector('.project-list');
    projectList.innerHTML = '';
    
    projects.forEach(project => {
        const repoButton = project.repo 
            ? `<a href="${project.repo}" target="_blank" class="project-repo"><i class="fa-brands fa-github"></i> Repository</a>`
            : '';
        let imgStyle = '';
        let imgBoxStyle = 'width:100%;height:260px;display:flex;align-items:center;justify-content:center;background:#181818;overflow:hidden;';
        if (project.zoom && project.zoom !== 1) {
            imgStyle += `width: ${project.zoom * 100}% !important; height: auto !important; max-width: unset !important; max-height: 100% !important; margin: 0 auto; display: block;`;
        }
        if (project.resolution && project.resolution !== 'auto') {
            imgStyle += `image-rendering: ${project.resolution};`;
        }
        if (project.zoom && project.zoom > 1) {
            imgBoxStyle += 'overflow:hidden;';
        }
        const projectCard = `
            <div class="project-card">
                <div style="${imgBoxStyle}">
                    <img src="${project.image}" alt="${project.alt}" class="project-image" style="${imgStyle}" />
                </div>
                <div class="project-content">
                    <div class="project-title">${project.title}</div>
                    <div class="project-desc">
                        ${project.description}
                    </div>
                    <div class="project-links">
                        <a href="${project.link}" target="_blank" class="project-link">View Project</a>
                        ${repoButton}
                    </div>
                </div>
            </div>
        `;
        projectList.innerHTML += projectCard;
    });
}

function renderVideos(videos) {
    const videoList = document.querySelector('.video-list');
    videoList.innerHTML = '';
    
    videos.forEach(video => {
        // Get YouTube thumbnail automatically from video URL
        const thumbnail = video.thumbnail || getYouTubeThumbnail(video.link, 'maxresdefault');
        
        const videoCard = `
            <div class="video-card">
                <img src="${thumbnail}" alt="${video.alt}" class="video-thumbnail" />
                <div class="video-content">
                    <a href="${video.link}" target="_blank" class="video-title">${video.title}</a>
                    <p class="video-desc">
                        ${video.description}
                    </p>
                    <a href="${video.link}" target="_blank" class="video-link">Watch Video</a>
                </div>
            </div>
        `;
        videoList.innerHTML += videoCard;
    });
}

// Initialize ScrollReveal animations - Smooth & Modern
function initScrollReveal() {
    ScrollReveal({
        reset: false,
        distance: '40px',
        duration: 1800,  // Slower base duration
        delay: 0,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: 0,
        scale: 0.95,
        mobile: true,
        cleanup: true
    });

    // Small delay to ensure DOM elements are ready
    setTimeout(() => {
        // Navigation
        ScrollReveal().reveal('nav', { 
            delay: 150, 
            origin: 'top',
            distance: '20px',
            duration: 1600
        });
        
        // Page title
        ScrollReveal().reveal('h1', { 
            delay: 200, 
            origin: 'top',
            distance: '30px',
            duration: 1800
        });
        
        // Logo
        ScrollReveal().reveal('.logo', { 
            delay: 100,
            distance: '10px',
            origin: 'left',
            duration: 1600
        });

        // Regular project cards - stagger with viewFactor
        ScrollReveal().reveal('.project-card', { 
            delay: 0,
            origin: 'bottom',
            interval: 150,
            distance: '50px',
            duration: 1400,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            viewFactor: 0.5,
            beforeReveal: function(el) {
                el.style.visibility = 'visible';
            },
            afterReveal: function(el) {
                el.classList.remove('js-animate');
            }
        });

        // Video cards - stagger animation
        ScrollReveal().reveal('.video-card', { 
            delay: 0,
            origin: 'bottom',
            interval: 150,
            distance: '50px',
            duration: 1400,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            viewFactor: 0.5,
            beforeReveal: function(el) {
                el.style.visibility = 'visible';
            },
            afterReveal: function(el) {
                el.classList.remove('js-animate');
            }
        });

        // Particle background
        ScrollReveal().reveal('#particle-background', { 
            delay: 0, 
            duration: 2500,
            opacity: 0,
            scale: 1
        });
    }, 100);  // 100ms delay to ensure elements are in DOM

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Dynamic copyright year
function updateCopyright() {
    const copyrightElement = document.getElementById("copyright");
    copyrightElement.innerHTML = "&copy; " + new Date().getFullYear() + " IzukiNo - All Rights Reserved.";
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    updateCopyright();
});
