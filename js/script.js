/* ========================================
   KISSA INFANTS AND PRIMARY SCHOOL
   JavaScript Interactivity
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // STICKY HEADER
    // ========================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ========================================
    // ANIMATE ON SCROLL (Fade In Elements)
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .feature-card, .program-card, .testimonial-card, .step-card, .academic-feature');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // STATS COUNTER ANIMATION
    // ========================================
    const statNumbers = document.querySelectorAll('.stats .stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCount = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.ceil(current) + '+';
                        requestAnimationFrame(updateCount);
                    } else {
                        stat.textContent = target + '+';
                    }
                };
                
                updateCount();
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load

    // ========================================
    // TESTIMONIALS SLIDER (Simple)
    // ========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    }

    // Auto-rotate testimonials every 5 seconds
    if (testimonialCards.length > 1) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

       // FORM VALID // ========================================
ATION
    // ========================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const phone = this.querySelector('input[type="tel"]');
            const subject = this.querySelector('select');
            const message = this.querySelector('textarea');
            
            // Simple validation
            let isValid = true;
            
            // Reset errors
            this.querySelectorAll('.form-group').forEach(group => {
                group.style.marginBottom = '25px';
            });
            
            // Check required fields
            if (name && name.value.trim() === '') {
                isValid = false;
                name.parentElement.style.marginBottom = '10px';
            }
            
            if (email && !isValidEmail(email.value)) {
                isValid = false;
                email.parentElement.style.marginBottom = '10px';
            }
            
            if (message && message.value.trim() === '') {
                isValid = false;
                message.parentElement.style.marginBottom = '10px';
            }
            
            if (isValid) {
                // Show success message (in a real scenario, you'd send to a server)
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Message Sent Successfully!';
                submitBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
                
                // Reset form
                this.reset();
                
                // Restore button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ========================================
    // ADMISSION FORM VALIDATION
    // ========================================
    const admissionForm = document.querySelector('.admission-form');
    
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const studentName = this.querySelector('#student-name');
            const parentName = this.querySelector('#parent-name');
            const email = this.querySelector('#email');
            const phone = this.querySelector('#phone');
            const grade = this.querySelector('#grade');
            
            // Simple validation
            let isValid = true;
            
            // Reset errors
            this.querySelectorAll('.form-group').forEach(group => {
                group.style.marginBottom = '25px';
            });
            
            if (studentName && studentName.value.trim() === '') {
                isValid = false;
                studentName.parentElement.style.marginBottom = '10px';
            }
            
            if (parentName && parentName.value.trim() === '') {
                isValid = false;
                parentName.parentElement.style.marginBottom = '10px';
            }
            
            if (email && !isValidEmail(email.value)) {
                isValid = false;
                email.parentElement.style.marginBottom = '10px';
            }
            
            if (phone && phone.value.trim() === '') {
                isValid = false;
                phone.parentElement.style.marginBottom = '10px';
            }
            
            if (grade && grade.value === '') {
                isValid = false;
                grade.parentElement.style.marginBottom = '10px';
            }
            
            if (isValid) {
                // Show success message
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Application Submitted Successfully!';
                submitBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
                
                // Reset form
                this.reset();
                
                // Restore button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }

    // ========================================
    // PARALLAX EFFECT FOR HERO
    // ========================================
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroBackground = heroSection.querySelector('::before');
            
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    // ========================================
    // ACTIVE NAV LINK ON SCROLL
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // DROPDOWN MENU HOVER (Desktop)
    // ========================================
    const hasDropdown = document.querySelector('.nav-item.dropdown');
    
    if (hasDropdown && window.innerWidth > 992) {
        hasDropdown.addEventListener('mouseenter', function() {
            const dropdown = this.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0)';
            }
        });
        
        hasDropdown.addEventListener('mouseleave', function() {
            const dropdown = this.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(10px)';
            }
        });
    }

    // ========================================
    // SCROLL TO TOP BUTTON
    // ========================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1a7f37, #2ecc71);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(26, 127, 55, 0.3);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================================
    // PRELOADER (Optional)
    // ========================================
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            preloader.style.transition = 'all 0.5s ease';
        });
    }

    console.log('Kissa Infants and Primary School Website - JavaScript Loaded Successfully!');
});
