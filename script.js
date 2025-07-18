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

// Gestion du formulaire de contact
const contactForm = {
    init() {
        this.methodOptions = document.querySelectorAll('.method-option');
        this.whatsappFields = document.getElementById('whatsapp-fields');
        this.emailFields = document.getElementById('email-fields');
        this.submitText = document.getElementById('submit-text');
        this.contactForm = document.getElementById('contactForm');
        
        // Gestion du changement de méthode de contact
        this.methodOptions.forEach(option => {
            option.addEventListener('click', () => this.switchContactMethod(option));
        });
        
        // Gestion de la soumission du formulaire
        this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
    },
    
    switchContactMethod(selectedOption) {
        // Mettre à jour l'affichage des options
        this.methodOptions.forEach(option => {
            option.classList.remove('active');
        });
        selectedOption.classList.add('active');
        
        const method = selectedOption.dataset.method;
        
        // Afficher les champs appropriés
        if (method === 'whatsapp') {
            this.whatsappFields.style.display = 'block';
            this.emailFields.style.display = 'none';
            this.submitText.textContent = 'Envoyer via WhatsApp';
        } else {
            this.whatsappFields.style.display = 'none';
            this.emailFields.style.display = 'block';
            this.submitText.textContent = 'Envoyer par Email';
        }
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const method = document.querySelector('.method-option.active').dataset.method;
        const name = document.getElementById('name').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (method === 'whatsapp') {
            const phoneNumber = document.getElementById('whatsapp-number').value;
            this.sendWhatsAppMessage(phoneNumber, name, subject, message);
        } else {
            const email = document.getElementById('email').value;
            this.sendEmail(name, email, subject, message);
        }
    },
    
    sendWhatsAppMessage(phone, name, subject, message) {
        // Nettoyer le numéro de téléphone (supprimer les espaces et caractères spéciaux)
        const cleanedPhone = phone.replace(/\D/g, '');
        
        // Créer le message
        const fullMessage = `Bonjour Orelynd,\n\nJe suis ${name}.\n\nSujet: ${subject}\n\nMessage: ${message}\n\nMerci de me recontacter.`;
        
        // Ouvrir WhatsApp avec le message pré-rempli
        window.open(`https://wa.me/${cleanedPhone}?text=${encodeURIComponent(fullMessage)}`, '_blank');
        
        // Réinitialiser le formulaire
        this.contactForm.reset();
        
        // Afficher un message de confirmation (vous pourriez ajouter une notification plus élaborée)
        alert('Vous allez être redirigé vers WhatsApp pour envoyer votre message.');
    },
    
    sendEmail(name, email, subject, message) {
        // Créer le lien mailto avec les informations pré-remplies
        const mailtoLink = `mailto:Orelynd@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;
        
        // Ouvrir le client de messagerie par défaut
        window.location.href = mailtoLink;
        
        // Réinitialiser le formulaire
        this.contactForm.reset();
    }
};

// Initialiser le formulaire de contact lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    contactForm.init();
});