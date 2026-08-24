document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Initialize AOS
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage for theme
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    themeToggleBtn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });



    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    mobileMenuCloseBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Active Navigation Highlight & Header Scroll Effect
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        // Header shadow on scroll
        if (scrollY > 10) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Statistics Counter Animation
    const statsContainer = document.getElementById('stats-container');
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    if (statsContainer) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCounter();
                });
            }
        }, { threshold: 0.5 });

        observer.observe(statsContainer);
    }

    // Populate Services Cards dynamically
    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
        const servicesData = [
            { id: 1, title: 'Complete Blood Count', desc: 'Evaluate overall health and detect disorders like anemia.', icon: 'droplet', color: 'blue', delay: 50, anim: 'fade-up' },
            { id: 2, title: 'Diabetes Testing', desc: 'Fasting sugar, HbA1c, and insulin level monitoring.', icon: 'activity', color: 'teal', delay: 100, anim: 'fade-left' },
            { id: 3, title: 'Lipid Profile', desc: 'Measure cholesterol and triglycerides for cardiac health.', icon: 'heart', color: 'blue', delay: 150, anim: 'zoom-in' },
            { id: 4, title: 'Liver Function Test', desc: 'Assess liver health by measuring enzymes and proteins.', icon: 'filter', color: 'teal', delay: 200, anim: 'fade-right' },
            { id: 5, title: 'Kidney Function', desc: 'Monitor kidney health with creatinine and urea tests.', icon: 'beaker', color: 'blue', delay: 250, anim: 'fade-up' },
            { id: 6, title: 'Thyroid Testing', desc: 'Complete profiling of T3, T4, and TSH levels.', icon: 'snowflake', color: 'teal', delay: 300, anim: 'scale-in' },
            { id: 7, title: 'Vitamin Testing', desc: 'Check essential vitamins like D3 and B12.', icon: 'sun', color: 'blue', delay: 350, anim: 'fade-down' },
            { id: 8, title: 'Molecular Diagnostics', desc: 'Advanced PCR and genetic testing.', icon: 'dna', color: 'teal', delay: 400, anim: 'zoom-out' }
        ];

        let html = '';
        servicesData.forEach(service => {
            // Tailwind class generation mapping (simplified for dynamic insert)
            const colorMap = {
                blue: { bg: 'bg-gray-100 dark:bg-medical-carddark', text: 'text-medical-purple dark:text-medical-lavender' },
                teal: { bg: 'bg-gray-100 dark:bg-medical-carddark', text: 'text-medical-violet dark:text-medical-accent' }
            };

            const colors = colorMap[service.color] || colorMap.blue;

            html += `
            <div class="service-card group bg-white dark:bg-medical-bgdark p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-premium hover:-translate-y-2 transition-all duration-300 relative overflow-hidden" data-aos="${service.anim}" data-aos-delay="${service.delay}">
                <div class="w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text} mb-5 group-hover:scale-110 transition-transform relative z-10">
                    <i data-lucide="${service.icon}" class="w-6 h-6"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2 relative z-10">${service.title}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 relative z-10">${service.desc}</p>
                <a href="#contact" class="inline-flex items-center text-sm font-medium text-medical-purple dark:text-medical-lavender hover:text-medical-violet transition-colors relative z-10 group/link">
                    Learn More <i data-lucide="arrow-right" class="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform"></i>
                </a>
            </div>
            `;
        });
        servicesGrid.innerHTML = html;
        lucide.createIcons(); // Re-init icons for newly added content
    }

    // Form Validation
    const bookingForm = document.getElementById('booking-form');
    const formSuccess = document.getElementById('form-success');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const date = document.getElementById('date').value;
            const service = document.getElementById('service').value;

            let isValid = true;

            if (!name) {
                isValid = false;
                document.getElementById('name').classList.add('border-red-500');
            } else {
                document.getElementById('name').classList.remove('border-red-500');
            }

            if (!phone) {
                isValid = false;
                document.getElementById('phone').classList.add('border-red-500');
            } else {
                document.getElementById('phone').classList.remove('border-red-500');
            }

            if (!date) {
                isValid = false;
                document.getElementById('date').classList.add('border-red-500');
            } else {
                document.getElementById('date').classList.remove('border-red-500');
            }

            if (!service) {
                isValid = false;
                document.getElementById('service').classList.add('border-red-500');
            } else {
                document.getElementById('service').classList.remove('border-red-500');
            }

            if (isValid) {
                // Simulate form submission
                const btn = bookingForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i data-lucide="loader" class="w-5 h-5 animate-spin"></i> Processing...';
                lucide.createIcons();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    formSuccess.classList.remove('hidden');
                    bookingForm.reset();
                    lucide.createIcons();
                    
                    setTimeout(() => {
                        formSuccess.classList.add('hidden');
                    }, 5000);
                }, 1500);
            }
        });
    }
});

