// Optimized JavaScript Portfolio System Architecture

document.addEventListener('DOMContentLoaded', function() {
    // Initializing tracking tasks and interactive elements
    initializeLoadingScreen();
    initializeNavigationScroll();
    initializeScrollAnimations();
    initializeContactFormTransmission();
    initializeScrollTopWidget();
    
    // Protection context layer
    document.addEventListener('contextmenu', event => event.preventDefault());
});

// Asynchronous UI Loader Termination
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => { loadingScreen.style.display = 'none'; }, 500);
        }, 800);
    });
}

// Navigation Tracking & Seamless Link Snapping
function initializeNavigationScroll() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const smoothLinks = document.querySelectorAll('.smooth-scroll');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active target update calculation loops
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    smoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close collapsed structural menu elements inside viewport breakpoints
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// Intersection Observers managing Metric Array Progression
function initializeScrollAnimations() {
    const observerOptions = { threshold: 0.05, rootMargin: '0px 0px -30px 0px' };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                if (entry.target.classList.contains('stat-item')) {
                    executeLinearCounter(entry.target);
                }
                if (entry.target.classList.contains('skill-item')) {
                    executeWidthInterpolation(entry.target);
                }
            }
        });
    }, observerOptions);
    
    const elementsToObserve = document.querySelectorAll('.stat-item, .skill-item, .portfolio-item, .service-card');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        observer.observe(el);
    });
}

// Linear Scale Value Processing Counter
function executeLinearCounter(element) {
    const counterElement = element.querySelector('.stat-number');
    if (!counterElement || counterElement.classList.contains('rendered')) return;
    
    const targetValue = parseInt(counterElement.getAttribute('data-target'));
    const cycleDuration = 1500; 
    const operationalSteps = cycleDuration / 16;
    const incrementRate = targetValue / operationalSteps;
    let initialValue = 0;
    
    const internalTimer = setInterval(() => {
        initialValue += incrementRate;
        if (initialValue >= targetValue) {
            initialValue = targetValue;
            clearInterval(internalTimer);
        }
        counterElement.textContent = Math.floor(initialValue) + (targetValue > 5 ? '+' : '');
    }, 16);
    
    counterElement.classList.add('rendered');
}

// Width Array Interpolations
function executeWidthInterpolation(element) {
    const progressNode = element.querySelector('.skill-progress');
    if (!progressNode || progressNode.classList.contains('rendered')) return;
    
    const finalWidth = progressNode.getAttribute('data-width');
    setTimeout(() => {
        progressNode.style.width = finalWidth;
        progressNode.classList.add('rendered');
    }, 150);
}

// Contact Transmission Actions
function initializeContactFormTransmission() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const defaultLayoutText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="bi bi-cpu-fill spin me-2"></i>Encrypting Payload...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Transmission Confirmation: Message packed and delivered successfully.');
            contactForm.reset();
            submitBtn.innerHTML = defaultLayoutText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Global View Scroller Trigger Widget
function initializeScrollTopWidget() {
    const topButton = document.getElementById('backToTop');
    if (!topButton) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            topButton.classList.add('show');
        } else {
            topButton.classList.remove('show');
        }
    });
    
    topButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}