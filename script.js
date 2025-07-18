// Gestion du menu mobile
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    
    if (mobileNav.classList.contains('active')) {
        mobileNav.style.animation = 'slideUp 0.5s ease-out forwards';
        setTimeout(() => {
            mobileNav.classList.remove('active');
            mobileNav.style.animation = '';
            document.body.style.overflow = '';
        }, 500);
    } else {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
});

// Fermeture du menu au clic sur un lien
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
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
window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Slider des témoignages
const testimonialSlider = {
    slides: document.getElementById('testimonial-slides'),
    dots: document.querySelectorAll('.dot'),
    currentIndex: 0,
    init() {
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                this.goToSlide(parseInt(e.target.dataset.slide));
            });
        });
        setInterval(() => this.nextSlide(), 5000);
    },
    goToSlide(index) {
        this.currentIndex = (index + this.dots.length) % this.dots.length;
        this.slides.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        this.updateDots();
    },
    nextSlide() {
        this.goToSlide(this.currentIndex + 1);
    },
    updateDots() {
        this.dots.forEach((dot, i) => dot.classList.toggle('active', i === this.currentIndex));
    }
};
testimonialSlider.init();

// Animation d'apparition des éléments
const animateOnScroll = {
    elements: document.querySelectorAll('.fade-in'),
    init() {
        this.checkVisibility();
        window.addEventListener('scroll', () => this.checkVisibility());
        window.addEventListener('load', () => this.checkVisibility());
    },
    checkVisibility() {
        this.elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            el.classList.toggle('visible', rect.top < window.innerHeight - 100);
        });
    }
};
animateOnScroll.init();

/*** Gestion WhatsApp Améliorée ***/
const whatsappManager = {
    init() {
        document.querySelectorAll('.whatsapp-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleWhatsappClick(e));
        });
    },
    handleWhatsappClick(e) {
        e.preventDefault();
        const productCard = e.target.closest('.product-card');
        const productInfo = {
            name: productCard.querySelector('h3').textContent,
            description: productCard.querySelector('p').textContent,
            price: productCard.querySelector('.product-price').textContent.trim(),
            oldPrice: productCard.querySelector('.old-price')?.textContent.trim() || ''
        };

        const message = this.buildWhatsappMessage(productInfo);
        this.openWhatsapp(message);
        
        // Analytics (décommenter si besoin)
        // console.log('Commande:', productInfo.name);
    },
    buildWhatsappMessage(product) {
        return encodeURIComponent(
            `Bonjour Orelynd !\n\nJe souhaite commander :\n*${product.name}*\n` +
            `${product.description}\n\n` +
            `${product.oldPrice ? `Ancien prix: ${product.oldPrice}\n` : ''}` +
            `Prix actuel: ${product.price}\n\n` +
            `Merci de me recontacter pour finaliser la commande.`
        );
    },
    openWhatsapp(message) {
        window.open(`https://wa.me/22959173277?text=${message}`, '_blank');
    }
};
whatsappManager.init();