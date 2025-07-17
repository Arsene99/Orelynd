// Gestion du menu mobile
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    
    if (mobileNav.classList.contains('active')) {
        // Ajouter une animation de fermeture
        mobileNav.style.animation = 'slideUp 0.5s ease-out forwards';
        
        // Après l'animation, retirer les classes
        setTimeout(() => {
            mobileNav.classList.remove('active');
            mobileNav.style.animation = '';
            document.body.style.overflow = '';
        }, 500);
    } else {
        // Ouvrir le menu avec animation
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
});

// Fermer le menu quand on clique sur un lien
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        mobileNav.style.animation = 'slideUp 0.5s ease-out forwards';
        
        setTimeout(() => {
            mobileNav.classList.remove('active');
            mobileNav.style.animation = '';
            document.body.style.overflow = '';
        }, 500);
    });
});

// Effet de scroll pour la navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Slider des témoignages
const slides = document.getElementById('testimonial-slides');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const slideCount = document.querySelectorAll('.testimonial-slide').length;

function showSlide(index) {
    if (index >= slideCount) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slideCount - 1;
    } else {
        currentSlide = index;
    }
    
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Mettre à jour les dots actifs
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Gestion des clics sur les dots
dots.forEach(dot => {
    dot.addEventListener('click', function() {
        showSlide(parseInt(this.getAttribute('data-slide')));
    });
});

// Défilement automatique
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Initialisation
showSlide(0);

// Animation d'apparition des éléments au scroll
const fadeElements = document.querySelectorAll('.fade-in');

function checkFade() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

// Vérifier au chargement
window.addEventListener('load', checkFade);

// Vérifier au scroll
window.addEventListener('scroll', checkFade);