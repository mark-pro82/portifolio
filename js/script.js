// ===== TYPING ANIMATION =====
const textElement = document.querySelector('.animated-text');
const texts = [
    "A Fullstack Developer",
    "A Graphic Designer",
    "A Video Editor",
    "A UI/UX Enthusiast",
    "A Digital Marketer",
    "A Content Creator"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenTexts = 2000;

function type() {
    if (!textElement) return;
    
    const currentText = texts[textIndex];
    textElement.textContent = currentText.substring(0, charIndex);

    if (!isDeleting && charIndex < currentText.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, deletingSpeed);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            textIndex = (textIndex + 1) % texts.length;
        }
        setTimeout(type, delayBetweenTexts);
    }
}

// ===== PARTICLE ANIMATION =====
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let particlesArray = [];
    const numberOfParticles = 30;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.3 - 0.15;
            this.speedY = Math.random() * 0.3 - 0.15;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width + 50) this.x = -50;
            if (this.x < -50) this.x = canvas.width + 50;
            if (this.y > canvas.height + 50) this.y = -50;
            if (this.y < -50) this.y = canvas.height + 50;
        }
        draw() {
            if (!ctx) return;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animate() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        animationFrame = requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        resizeCanvas();
        init();
    });

    window.addEventListener('beforeunload', () => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    });
}

// ===== LOADING SCREEN =====
window.addEventListener("load", () => {
    setTimeout(() => {
        const loadingSection = document.getElementById("loadingScreen");
        const content = document.getElementById("content");
        if (loadingSection) loadingSection.classList.add("hidden");
        if (content) content.style.display = "block";
    }, 3000);
});

// ===== INTERSECTION OBSERVER for scroll transitions =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = [
        'section', 
        '.box', 
        '.box-service', 
        '.moreservice', 
        '.aboutme', 
        '.aboutme-image',
        'h1', 
        '.cont-prag', 
        '.contact-container'
    ];
    
    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => observer.observe(el));
    });
});

// ===== MOBILE MENU =====
const menu = document.getElementById("menu");
const navlinks = document.getElementById("navlinks");
const closeBtn = document.getElementById("close");

if (menu && navlinks && closeBtn) {
    menu.addEventListener("click", () => {
        navlinks.classList.add("show");
    });

    closeBtn.addEventListener("click", () => {
        navlinks.classList.remove("show");
    });

    const navItems = navlinks.querySelectorAll("a");
    navItems.forEach(link => {
        link.addEventListener("click", () => {
            navlinks.classList.remove("show");
        });
    });

    document.addEventListener('click', (e) => {
        if (!navlinks.contains(e.target) && !menu.contains(e.target) && navlinks.classList.contains('show')) {
            navlinks.classList.remove('show');
        }
    });
}

// ===== PROJECT DATA =====
const projectData = {
    1: {
        title: "Monixi News",
        image: "img/project8.png",
        description: "Guma uzi amakuru ya Hano mu Rwanda n'ayo ku isi yose Monixi News itanga inkuru z'ukuri kandi zigezweho ku byerekeye politiki, ubucuruzi, ikoranabuhanga.",
        tags: ["React", "Node.js", "MongoDB", "Express"],
        stats: { stars: 4.5, branches: 12, views: "2.3k" },
        liveDemo: "#",
        github: "#",
        category: "News",
        year: "2024"
    },
    2: {
        title: "Online Store",
        image: "img/proje1.png",
        description: "Start purchasing products online one of the simplest way to buy product online using online store.",
        tags: ["HTML", "CSS", "JavaScript", "API"],
        stats: { stars: 4.2, branches: 8, views: "1.8k" },
        liveDemo: "#",
        github: "#",
        category: "E-commerce",
        year: "2023"
    },
    3: {
        title: "Car Rent Website",
        image: "img/proje5.png",
        description: "You can rent and buy any car based on your wish and make your journey safe with your dreaming car. you can rent car any time and at any cost just reach us.",
        tags: ["React", "Firebase", "Stripe", "Tailwind"],
        stats: { stars: 4.7, branches: 15, views: "3.1k" },
        liveDemo: "#",
        github: "#",
        category: "Rental Service",
        year: "2024"
    },
    4: {
        title: "Impano Restaurant",
        image: "img/proje6.png",
        description: "Impano restaurant where exceptional food meets a warm, inviting atmosphere. Founded on a passion for culinary excellence.",
        tags: ["Vue.js", "Express", "MongoDB", "Socket.io"],
        stats: { stars: 4.8, branches: 10, views: "2.7k" },
        liveDemo: "#",
        github: "#",
        category: "Food & Beverage",
        year: "2024"
    },
    5: {
        title: "Zap Downloader",
        image: "img/proje2.png",
        description: "Download any video and audio with HD resolution up to 4k. The video is downloaded directly without any ads.",
        tags: ["Python", "Django", "API", "Celery"],
        stats: { stars: 4.6, branches: 20, views: "5.2k" },
        liveDemo: "#",
        github: "#",
        category: "Tool",
        year: "2023"
    },
    6: {
        title: "Music Instruments Webstore",
        image: "img/project3.jpeg",
        description: "You can order large music products from abroad just by using our website where all installation is free.",
        tags: ["Angular", "Node.js", "PostgreSQL", "Redis"],
        stats: { stars: 4.4, branches: 9, views: "1.9k" },
        liveDemo: "#",
        github: "#",
        category: "E-commerce",
        year: "2023"
    },
    7: {
        title: "Guitar Website",
        image: "img/project4.jpeg",
        description: "Buy professional modern guitar online with best tune and sound. This website provides full information about unique guitar products.",
        tags: ["HTML", "CSS", "jQuery", "PHP"],
        stats: { stars: 4.3, branches: 7, views: "1.5k" },
        liveDemo: "#",
        github: "#",
        category: "E-commerce",
        year: "2022"
    },
    8: {
        title: "Remote Job",
        image: "img/project7.png",
        description: "Work from home with high paying jobs. Just have laptop, phone or tablet and wifi and start making money online.",
        tags: ["React", "Redux", "Firebase", "Material-UI"],
        stats: { stars: 4.9, branches: 25, views: "7.8k" },
        liveDemo: "#",
        github: "#",
        category: "Job Portal",
        year: "2024"
    }
};

// ===== MODAL FUNCTIONS =====
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const project = projectData[projectId];
    
    if (modal && modalBody && project) {
        modalBody.innerHTML = `
            <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.src='img/placeholder.jpg'">
            <h2>${project.title}</h2>
            <div class="modal-details">
                <div class="detail-item">
                    <span class="detail-label">Category</span>
                    <span class="detail-value">${project.category}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Year</span>
                    <span class="detail-value">${project.year}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Rating</span>
                    <span class="detail-value">${project.stats.stars} ★</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Views</span>
                    <span class="detail-value">${project.stats.views}</span>
                </div>
            </div>
            <p class="modal-description">${project.description}</p>
            <div class="modal-tags">
                ${project.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
            </div>
            <div class="modal-links">
                <a href="${project.liveDemo}" class="modal-link primary" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a href="${project.github}" class="modal-link secondary" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i> View Code
                </a>
            </div>
        `;
        
        modal.classList.add('active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ===== MODAL EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProjectModal);
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeProjectModal();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
});

// ===== START TYPING =====
document.addEventListener('DOMContentLoaded', () => {
    if (textElement) {
        type();
    }
});

// ===== HANDLE BROKEN IMAGES =====
document.addEventListener('error', function(e) {
    const target = e.target;
    if (target.tagName === 'IMG') {
        target.src = 'img/placeholder.jpg';
    }
}, true);

// ===== LIKE COUNTER =====
const likeLabel = document.querySelector('.likes label');

function getDailySeed() {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
}

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

function getDailyLikes() {
    const seed = getDailySeed();
    const hash = hashString(seed);
    const dailyIncrease = hash % 5000;
    const total = 1100 + dailyIncrease;
    return total;
}

function formatLikes(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

function updateLikes() {
    const likes = getDailyLikes();
    if (likeLabel) likeLabel.textContent = formatLikes(likes);
}

if (likeLabel) {
    updateLikes();
    setInterval(() => {
        const currentText = likeLabel.textContent;
        let currentValue;
        if (currentText.includes('k')) {
            currentValue = parseFloat(currentText) * 1000;
        } else {
            currentValue = parseInt(currentText);
        }
        const increment = Math.floor(Math.random() * 10) + 1;
        const newValue = currentValue + increment;
        likeLabel.textContent = formatLikes(newValue);
    }, 1000);
}

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById("backToTopBtn");
if (backToTopBtn) {
    window.addEventListener('scroll', function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });
    backToTopBtn.style.opacity = '0';

    backToTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ===== DUPLICATE CAROUSEL TRACKS for seamless loop =====
document.querySelectorAll('.carousel-track').forEach(track => {
    const items = track.innerHTML;
    track.innerHTML = items + items;
});

// ===== LIKE BUTTON INTERACTION =====
const likeBtn = document.getElementById('likeBtn');
let likeCount = 1200;
const likeDisplay = document.getElementById('likeCount');

if (likeBtn && likeDisplay) {
    likeBtn.addEventListener('click', function() {
        likeCount++;
        likeDisplay.textContent = likeCount >= 1000 ? (likeCount/1000).toFixed(1) + 'k' : likeCount;
        this.style.color = '#ff3aff';
        this.style.transform = 'scale(1.2)';
        setTimeout(() => { this.style.transform = 'scale(1)'; }, 200);
    });
}

// ===== MOBILE NAV TOGGLE (using Tailwind classes) =====
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('hidden');
    });
}