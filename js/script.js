// TalentSphere - Interactive JavaScript

// Skeleton Loading Helper
function showSkeletonLoader(container, count = 3) {
    const skeletonHTML = `
        <div class="skeleton-card skeleton" style="margin-bottom: 16px;">
            <div class="skeleton-title skeleton"></div>
            <div class="skeleton-text skeleton"></div>
            <div class="skeleton-text skeleton" style="width: 80%;"></div>
        </div>
    `;
    if (container) {
        container.innerHTML = skeletonHTML.repeat(count);
    }
}

function hideSkeletonLoader(container, content) {
    if (container) {
        setTimeout(() => {
            container.innerHTML = content;
            container.classList.add('fade-in');
        }, 500);
    }
}

// Enhanced Micro-interactions
function addRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.glass-card, .marketplace-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-4px)';
        });
        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate stats on scroll
    const animateStats = () => {
        const statValues = document.querySelectorAll('.stat-value, .stat-value-profile');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;

                    // Simple animation for demonstration
                    target.style.opacity = '0';
                    setTimeout(() => {
                        target.style.transition = 'opacity 0.5s ease';
                        target.style.opacity = '1';
                    }, 100);

                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statValues.forEach(stat => observer.observe(stat));
    };

    animateStats();

    // 3D Sphere rotation animation
    const sphere = document.querySelector('.sphere-3d');
    if (sphere) {
        let rotation = 0;
        setInterval(() => {
            rotation += 0.5;
            sphere.style.transform = `rotate(${rotation}deg)`;
        }, 50);
    }

    // Progress bars animation
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-fill, .skill-progress');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.transition = 'width 1s ease';
                        bar.style.width = width;
                    }, 200);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => observer.observe(bar));
    };

    animateProgressBars();

    // Tab functionality
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Handle content switching
            const targetSelector = this.getAttribute('data-tab');
            if (targetSelector) {
                const allContents = document.querySelectorAll('.tab-content');
                allContents.forEach(content => content.classList.remove('active'));

                const targetContent = document.querySelector(`.tab-content[data-content="${targetSelector}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            }

            // Add smooth transition effect
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.filter-option input');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const label = this.closest('.filter-option');
            if (this.checked) {
                label.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            } else {
                label.style.backgroundColor = 'transparent';
            }
        });
    });

    // Chat functionality
    const messageInput = document.querySelector('.message-input');
    const sendBtn = document.querySelector('.send-btn');
    const messagesArea = document.querySelector('.messages-area');

    if (sendBtn && messageInput) {
        const sendMessage = () => {
            const message = messageInput.value.trim();
            if (message) {
                // Create new message element
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message outgoing';
                messageDiv.innerHTML = `
                    <div class="message-content">
                        <div class="message-bubble glass-card">
                            <p>${message}</p>
                        </div>
                        <span class="message-time">${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                `;

                // Remove typing indicator if exists
                const typingIndicator = document.querySelector('.typing-indicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }

                // Add message to chat
                if (messagesArea) {
                    messagesArea.appendChild(messageDiv);
                    messagesArea.scrollTop = messagesArea.scrollHeight;
                }

                // Clear input
                messageInput.value = '';

                // Simulate typing indicator after 2 seconds
                setTimeout(() => {
                    const typingDiv = document.createElement('div');
                    typingDiv.className = 'typing-indicator';
                    typingDiv.innerHTML = `
                        <div class="typing-avatar neon-glow-blue"></div>
                        <div class="typing-bubble glass-card">
                            <div class="typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    `;
                    if (messagesArea) {
                        messagesArea.appendChild(typingDiv);
                        messagesArea.scrollTop = messagesArea.scrollHeight;
                    }
                }, 2000);
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Chat list item click
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.addEventListener('click', function () {
            chatItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Remove unread badge
            const badge = this.querySelector('.unread-badge');
            if (badge) {
                badge.style.opacity = '0';
                setTimeout(() => badge.remove(), 300);
            }
        });
    });

    // Apply button hover effects
    const applyButtons = document.querySelectorAll('.apply-btn, .neon-button');
    applyButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Portfolio item hover
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const overlay = this.querySelector('.thumbnail-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        item.addEventListener('mouseleave', function () {
            const overlay = this.querySelector('.thumbnail-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });

    // Search functionality
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Поиск"]');
    searchInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.style.borderColor = 'rgba(176, 0, 255, 0.5)';
            this.parentElement.style.boxShadow = '0 0 20px rgba(176, 0, 255, 0.2)';
        });
        input.addEventListener('blur', function () {
            this.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            this.parentElement.style.boxShadow = 'none';
        });
    });

    // Notification animations
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        setInterval(() => {
            badge.style.transform = 'scale(1.1)';
            setTimeout(() => {
                badge.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroVisual = document.querySelector('.hero-visual');
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .marketplace-card, .stat-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';

                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
    };

    animateOnScroll();

    // Loading animation for page transitions
    window.addEventListener('beforeunload', () => {
        document.body.style.opacity = '0.7';
    });

    // Mobile Messages - Contact List / Chat Toggle
    const mobileChatItems = document.querySelectorAll('.chat-item');
    const chatWindow = document.querySelector('.chat-window');
    const messagesContainer = document.querySelector('.messages-container');
    const backToContactsBtn = document.getElementById('backToContacts');

    if (mobileChatItems.length > 0 && chatWindow && window.innerWidth <= 768) {
        // При клике на контакт - открываем чат
        mobileChatItems.forEach(item => {
            item.addEventListener('click', () => {
                chatWindow.classList.add('active');
                if (messagesContainer) {
                    messagesContainer.classList.add('chat-active');
                }
            });
        });

        // Кнопка "Назад" - возвращаемся к списку
        if (backToContactsBtn) {
            backToContactsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                chatWindow.classList.remove('active');
                if (messagesContainer) {
                    messagesContainer.classList.remove('chat-active');
                }
            });
        }
    }

    // Dashboard/Pages Mobile Sidebar Toggle
    // Removed to avoid conflicts with the universal mobile handler in universal-mobile.js
    // The global script now solely manages sidebar open/close and body overflow across pages.

    // Sidebar toggle for messages page (separate from main mobile menu)
    const sidebarToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebarToggle && sidebar && sidebarOverlay) {
        // Toggle sidebar
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
        });

        // Close sidebar when clicking overlay
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });

        // Close sidebar when clicking nav item
        const navItems = sidebar.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            });
        });
    }

    // Console welcome message
    console.log('%c🚀 TalentSphere Platform', 'color: #b000ff; font-size: 24px; font-weight: bold;');
    console.log('%cНео-Brutalism + Glassmorphism + Cyber Neon Design', 'color: #00d4ff; font-size: 14px;');
    console.log('%cФриланс платформа будущего', 'color: #ff0080; font-size: 12px;');
});

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add glow effect on hover for neon elements
document.addEventListener('mousemove', (e) => {
    const neonElements = document.querySelectorAll('[class*="neon-glow"]');
    neonElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const intensity = 1 - (Math.abs(x - rect.width / 2) / rect.width + Math.abs(y - rect.height / 2) / rect.height) / 2;
            el.style.filter = `brightness(${1 + intensity * 0.3})`;
        } else {
            el.style.filter = 'brightness(1)';
        }
    });
});

// Interactive Video Gallery Logic
document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const closeModal = document.getElementById('closeModal');
    const videoPlayer = videoModal ? videoModal.querySelector('video') : null;

    // Main Preview Elements
    const mainPreview = document.querySelector('.video-placeholder');
    const mainImage = document.querySelector('.main-thumb');
    const mainTitle = document.querySelector('.video-title');
    const mainAuthor = document.querySelector('.video-author');

    // Thumbnails
    const thumbnails = document.querySelectorAll('.video-thumbnail-item');

    // 1. Hover Interaction (Switch Main Video)
    if (thumbnails.length > 0 && mainPreview) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('mouseenter', () => {
                // Update active state
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');

                // Get data from hovered thumbnail
                const videoSrc = thumb.getAttribute('data-video-src');
                const imageSrc = thumb.getAttribute('data-image');
                const title = thumb.getAttribute('data-title');
                const author = thumb.getAttribute('data-author');

                // Update Main Preview
                if (mainPreview) mainPreview.setAttribute('data-video-src', videoSrc);
                if (mainImage) mainImage.src = imageSrc;
                if (mainTitle) mainTitle.textContent = title;
                if (mainAuthor) mainAuthor.textContent = author;
            });
        });
    }

    // 2. Modal Logic (Click Main Video)
    if (videoModal && videoPlayer && mainPreview) {
        // Open Modal
        mainPreview.addEventListener('click', () => {
            const videoSrc = mainPreview.getAttribute('data-video-src');
            if (videoSrc) {
                videoPlayer.src = videoSrc;
                videoModal.classList.add('active');
                videoPlayer.play();
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });

        // Close Modal Function
        const closeVideoModal = () => {
            videoModal.classList.remove('active');
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
            videoPlayer.src = ''; // Clear source
            document.body.style.overflow = ''; // Restore scrolling
        };

        // Close on button click
        if (closeModal) closeModal.addEventListener('click', closeVideoModal);

        // Close on click outside
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeVideoModal();
            }
        });
    }
});

// Mobile Course Navigation Logic
document.addEventListener('DOMContentLoaded', () => {
    const courseNavToggle = document.getElementById('courseNavToggle');
    const courseNav = document.getElementById('courseNav');
    const courseNavOverlay = document.getElementById('courseNavOverlay');
    const courseNavClose = document.getElementById('courseNavClose');

    if (courseNavToggle && courseNav && courseNavOverlay) {
        const openNav = () => {
            courseNav.classList.add('active');
            courseNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeNav = () => {
            courseNav.classList.remove('active');
            courseNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        courseNavToggle.addEventListener('click', openNav);
        if (courseNavClose) courseNavClose.addEventListener('click', closeNav);
        courseNavOverlay.addEventListener('click', closeNav);
    }
});

// Marketplace Filtering Logic
// Marketplace Filtering Logic
document.addEventListener('DOMContentLoaded', () => {
    // Only run on marketplace page
    if (!document.querySelector('.marketplace-page')) return;

    // --- Mock Data ---
    const mockProjects = [
        {
            id: 1,
            title: "Редизайн Dashboard для SaaS платформы",
            description: "Требуется создать современный интерфейс для B2B SaaS платформы с акцентом на аналитику и визуализацию данных.",
            fullDescription: "Мы ищем опытного UI/UX дизайнера для полного редизайна нашей SaaS платформы. \n\n**Задачи:**\n- Аудит текущего интерфейса\n- Разработка новой дизайн-системы\n- Прототипирование основных сценариев\n- Дизайн макетов в Figma",
            budget: 3500,
            deadline: 14,
            skills: ["Figma", "UI Design", "Analytics"],
            category: "UI/UX Design",
            location: "Удаленно",
            type: "individual",
            experience: "middle",
            responses: 12,
            status: "Новый",
            featured: true,
            client: {
                name: "TechSolutions Inc.",
                avatar: "T",
                rating: 4.8,
                reviews: 15
            },
            stages: [
                { name: "Исследование и прототипы", duration: "4 дня" },
                { name: "Дизайн концепция", duration: "3 дня" },
                { name: "Финальные макеты", duration: "7 дней" }
            ]
        },
        {
            id: 2,
            title: "Landing Page для криптовалютного проекта",
            description: "Нужна разработка посадочной страницы с анимациями и интеграцией Web3 кошельков. Дизайн уже готов в Figma.",
            fullDescription: "Требуется Frontend разработчик для верстки лендинга по готовому макету. Важно реализовать сложные анимации на GSAP и подключение кошельков MetaMask/WalletConnect.",
            budget: 4200,
            deadline: 21,
            skills: ["React", "Web3", "GSAP"],
            category: "Web Development",
            location: "Удаленно",
            type: "individual",
            experience: "senior",
            responses: 8,
            status: "В процессе",
            featured: false,
            client: {
                name: "CryptoFuture",
                avatar: "C",
                rating: 4.5,
                reviews: 8
            },
            stages: [
                { name: "Верстка", duration: "10 дней" },
                { name: "Анимации", duration: "5 дней" },
                { name: "Интеграция Web3", duration: "6 дней" }
            ]
        },
        {
            id: 3,
            title: "Дизайн мобильного приложения для фитнеса",
            description: "UI/UX дизайн iOS и Android приложения с трекингом тренировок и планами питания. Темная тема, неоновый стиль.",
            fullDescription: "Разработка дизайна мобильного приложения с нуля. Основной функционал: трекер тренировок, календарь питания, социальные функции.",
            budget: 5800,
            deadline: 30,
            skills: ["Mobile", "Fitness", "Health"],
            category: "Mobile App",
            location: "USA",
            type: "team",
            experience: "senior",
            responses: 5,
            status: "New",
            featured: false,
            urgent: true,
            client: {
                name: "FitLife Global",
                avatar: "neon-glow-purple",
                rating: 5.0,
                reviews: 22
            },
            stages: [
                { name: "UX Исследование", duration: "7 дней" },
                { name: "UI Дизайн", duration: "14 дней" },
                { name: "Адаптация под Android", duration: "9 дней" }
            ]
        },
        {
            id: 4,
            title: "Фирменный стиль для tech стартапа",
            description: "Разработка логотипа, брендбука, визиток и презентационных материалов для AI стартапа.",
            fullDescription: "Нам нужен смелый и футуристичный брендинг. Логотип, цветовая палитра, шрифты, паттерны.",
            budget: 2900,
            deadline: 18,
            skills: ["Logo", "Brand Identity", "AI"],
            category: "Branding",
            location: "Europe",
            type: "individual",
            experience: "middle",
            responses: 15,
            status: "New",
            featured: false,
            client: {
                name: "NeuroTech",
                avatar: "neon-glow-cyan",
                rating: 4.9,
                reviews: 10
            },
            stages: [
                { name: "Логотип", duration: "5 дней" },
                { name: "Айдентика", duration: "7 дней" },
                { name: "Брендбук", duration: "6 дней" }
            ]
        },
        {
            id: 5,
            title: "3D иллюстрации для веб-сайта",
            description: "Серия 3D иллюстраций в стиле cyberpunk для маркетингового сайта. 5 основных сцен.",
            fullDescription: "Создание 5 уникальных 3D сцен для лендинга. Стиль: Cyberpunk, Neon, Glassmorphism.",
            budget: 3200,
            deadline: 25,
            skills: ["3D", "Blender", "Cyberpunk"],
            category: "Illustration",
            location: "Remote",
            type: "individual",
            experience: "middle",
            responses: 9,
            status: "New",
            featured: true,
            client: {
                name: "CyberAgency",
                avatar: "neon-glow-orange",
                rating: 4.7,
                reviews: 18
            },
            stages: [
                { name: "Скетчинг", duration: "5 дней" },
                { name: "Моделирование", duration: "10 дней" },
                { name: "Рендеринг", duration: "10 дней" }
            ]
        },
        {
            id: 6,
            title: "E-commerce платформа на Next.js",
            description: "Полный цикл разработки интернет-магазина с админ-панелью и интеграцией платежей Stripe.",
            fullDescription: "Разработка масштабируемого интернет-магазина. Стек: Next.js, PostgreSQL, Prisma, Stripe, Tailwind.",
            budget: 7500,
            deadline: 45,
            skills: ["Next.js", "TypeScript", "Stripe"],
            category: "Full-Stack",
            location: "Remote",
            type: "team",
            experience: "senior",
            responses: 18,
            status: "Started",
            featured: false,
            client: {
                name: "ShopifyPlus",
                avatar: "neon-glow-green",
                rating: 4.6,
                reviews: 30
            },
            stages: [
                { name: "Бэкенд", duration: "15 дней" },
                { name: "Фронтенд", duration: "20 дней" },
                { name: "Тестирование", duration: "10 дней" }
            ]
        },
        // ... more mock data can be generated
    ];

    // --- Premium Mock Data Extension ---
    const additionalProjects = [
        {
            id: 7,
            title: "Разработка AI-аватаров для видео",
            description: "Создание системы генерации говорящих аватаров на основе фото и текста. Python, PyTorch, Wav2Lip.",
            fullDescription: "Требуется разработать микросервис для генерации видео-аватаров. Вход: фото + аудио/текст. Выход: mp4 видео с липсиком.",
            budget: 8000,
            deadline: 40,
            skills: ["Python", "AI/ML", "Computer Vision"],
            category: "Artificial Intelligence",
            location: "Remote",
            type: "team",
            experience: "expert",
            responses: 24,
            status: "Featured",
            featured: true,
            matchScore: 99,
            client: { name: "FutureFace AI", avatar: "A", rating: 5.0, reviews: 42 },
            stages: [{ name: "MVP", duration: "14 дней" }, { name: "Scale", duration: "20 дней" }]
        },
        {
            id: 8,
            title: "Corporate Identity for FinTech",
            description: "Complete rebranding for a Series B neo-bank. Logo, typography, card design, and UI kit.",
            fullDescription: "We need a trustworthy yet modern identity. Target markert: Gen Z & Millennials. Deliverables: Brandbook, UI Kit in Figma.",
            budget: 5500,
            deadline: 25,
            skills: ["Branding", "Figma", "Typography"],
            category: "Design",
            location: "London, UK",
            type: "individual",
            experience: "senior",
            responses: 45,
            status: "Urgent",
            featured: false,
            matchScore: 88,
            client: { name: "NovaBank", avatar: "N", rating: 4.9, reviews: 12 },
            stages: [{ name: "Concept", duration: "7 дней" }, { name: "Production", duration: "14 дней" }]
        },
        {
            id: 9,
            title: "Smart Contract Audit (Solidity)",
            description: "Comprehensive security audit for a DeFi lending protocol before mainnet launch.",
            fullDescription: "Audit required for specialized lending pools. Focus on reentrancy attacks and oracle manipulation protection.",
            budget: 4000,
            deadline: 10,
            skills: ["Solidity", "Security", "Blockchain"],
            category: "Development",
            location: "Remote",
            type: "individual",
            experience: "expert",
            responses: 7,
            status: "New",
            featured: true,
            matchScore: 92,
            client: { name: "DeFi Shield", avatar: "D", rating: 4.7, reviews: 8 },
            stages: [{ name: "Audit", duration: "5 дней" }, { name: "Report", duration: "2 дней" }]
        },
        {
            id: 10,
            title: "Mobile Game UI Assets (Sci-Fi)",
            description: "Create a complete set of UI assets for a mobile sci-fi RPG. HUD, Menus, Icons.",
            fullDescription: "Style: Cyberpunk/Sci-Fi. Dark mode heavy with neon accents. Must be Unity compatible slices.",
            budget: 2200,
            deadline: 20,
            skills: ["Game UI", "2D Art", "Unity"],
            category: "Design",
            location: "Remote",
            type: "individual",
            experience: "middle",
            responses: 18,
            status: "New",
            featured: false,
            matchScore: 85,
            client: { name: "Galaxy Games", avatar: "G", rating: 4.5, reviews: 30 },
            stages: [{ name: "Drafts", duration: "5 дней" }, { name: "Final", duration: "10 дней" }]
        },
        {
            id: 11,
            title: "Marketing Strategy for SaaS Launch",
            description: "Go-to-market strategy for a creative productivity tool. Social media, influencers, and content plan.",
            fullDescription: "We are launching a Notion competitor for designers. Need a 3-month roadmap to get first 10k users.",
            budget: 3000,
            deadline: 30,
            skills: ["Marketing", "Strategy", "Growth"],
            category: "Marketing",
            location: "USA",
            type: "individual",
            experience: "senior",
            responses: 11,
            status: "Standard",
            featured: false,
            matchScore: 78,
            client: { name: "CreativeBlock", avatar: "C", rating: 4.8, reviews: 5 },
            stages: [{ name: "Research", duration: "7 дней" }, { name: "Strategy", duration: "10 дней" }]
        },
        {
            id: 12,
            title: "Video Editor for YouTube Channel",
            description: "Long-term partnership. Editing 2 tech reviews per week. DaVinci Resolve or Premiere Pro.",
            fullDescription: "Dynamic editing style similar to MKBHD. Good pacing, motion graphics, and sound design required.",
            budget: 1800,
            deadline: 90,
            skills: ["Video Editing", "Motion Graphics"],
            category: "Video",
            location: "Remote",
            type: "individual",
            experience: "middle",
            responses: 50,
            status: "Standard",
            featured: false,
            matchScore: 95,
            client: { name: "TechInsider", avatar: "T", rating: 4.9, reviews: 100 },
            stages: [{ name: "Trial", duration: "1 Video" }, { name: "Contract", duration: "3 Months" }]
        }
    ];

    // Add additional projects to mockProjects
    additionalProjects.forEach(p => mockProjects.push(p));

    // Add matchScore to initial projects too
    mockProjects.forEach(p => {
        if (!p.matchScore) p.matchScore = 85 + Math.floor(Math.random() * 14);
    });

    // --- State ---
    let currentProjects = [...mockProjects];
    let displayedProjects = [];
    let page = 1;
    const itemsPerPage = 6;
    let isLoading = false;

    // --- DOM Elements ---
    const projectsGrid = document.getElementById('projectsGrid');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const emptyState = document.getElementById('emptyState');
    const projectsCount = document.getElementById('projectsCount');
    const sortSelect = document.getElementById('sortSelect');

    // Filters
    const mainSearchInput = document.getElementById('mainSearchInput');
    const mainSearchBtn = document.getElementById('mainSearchBtn');
    const minBudgetInput = document.getElementById('minBudget');
    const maxBudgetInput = document.getElementById('maxBudget');
    const maxDeadlineInput = document.getElementById('maxDeadline');
    const locationInput = document.getElementById('locationInput');
    const projectTypeInputs = document.querySelectorAll('input[name="projectType"]');
    const experienceLevelInputs = document.querySelectorAll('input[name="experienceLevel"]');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');
    const skillInput = document.getElementById('skillInput');
    const selectedSkillsContainer = document.getElementById('selectedSkills');

    // Modal
    const modal = document.getElementById('projectDetailsModal');
    const modalBody = document.getElementById('projectModalBody');
    const closeModal = document.getElementById('closeProjectModal');

    // --- Functions ---

    function renderProjectCard(project) {
        const categoryColors = {
            'UI/UX Design': 'neon-glow-blue',
            'Web Development': 'neon-glow-pink',
            'Mobile App': 'neon-glow-purple',
            'Branding': 'neon-glow-cyan',
            'Illustration': 'neon-glow-orange',
            'Full-Stack': 'neon-glow-green'
        };
        const colorClass = categoryColors[project.category] || 'neon-glow-blue';

        return `
            <div class="marketplace-card premium-style" data-id="${project.id}">
                <div class="premium-card-header">
                    <div class="category-tag-premium">${project.category}</div>
                    <div class="match-score-pill">
                        <i class="fas fa-robot"></i>
                        <span>${project.matchScore}% AI Match</span>
                    </div>
                </div>
                
                <h3 class="premium-card-title">${project.title}</h3>
                <p class="premium-card-desc">${project.description}</p>
                
                <div class="card-tags">
                    ${project.skills.slice(0, 3).map(skill => `<span class="tag">${skill}</span>`).join('')}
                    ${project.skills.length > 3 ? `<span class="tag">+${project.skills.length - 3}</span>` : ''}
                </div>
                
                <div class="premium-card-stats">
                    <div class="p-stat">
                        <div class="p-stat-label">Бюджет</div>
                        <div class="p-stat-value budget">$${project.budget}</div>
                    </div>
                    <div class="p-stat">
                        <div class="p-stat-label">Срок</div>
                        <div class="p-stat-value">${project.deadline} дн.</div>
                    </div>
                    <div class="p-stat">
                        <div class="p-stat-label">Отклики</div>
                        <div class="p-stat-value">${project.responses}</div>
                    </div>
                </div>
                
                <div class="premium-card-footer">
                    <div class="client-mini-info">
                        <div class="client-avatar-s">${project.client ? project.client.name.charAt(0) : 'C'}</div>
                        <div class="client-name-s">${project.client ? project.client.name : 'Client'}</div>
                    </div>
                    <button class="premium-apply-btn" onclick="openProjectModal(${project.id})">Подробнее</button>
                </div>

                ${project.featured ? '<div class="card-badge featured" style="position: absolute; top: 12px; right: 12px; margin: 0;">Featured</div>' : ''}
            </div>
        `;
    }

    function loadProjects(reset = false) {
        if (isLoading) return;
        isLoading = true;

        if (reset) {
            projectsGrid.innerHTML = '';
            page = 1;
            displayedProjects = [];
            loadingIndicator.style.display = 'flex';
            emptyState.style.display = 'none';
        }

        // Simulate API delay
        setTimeout(() => {
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const newProjects = currentProjects.slice(start, end);

            if (newProjects.length === 0 && page === 1) {
                emptyState.style.display = 'flex';
                loadingIndicator.style.display = 'none';
                isLoading = false;
                return;
            }

            newProjects.forEach(project => {
                projectsGrid.insertAdjacentHTML('beforeend', renderProjectCard(project));
            });

            displayedProjects = [...displayedProjects, ...newProjects];
            projectsCount.textContent = currentProjects.length;

            if (newProjects.length < itemsPerPage) {
                // No more projects to load
                loadingIndicator.style.display = 'none';
            } else {
                loadingIndicator.style.display = 'flex'; // Keep showing if more might exist
            }

            page++;
            isLoading = false;

            // Re-attach event listeners for new buttons if needed (using onclick in HTML for simplicity here)
        }, 800);
    }

    function filterProjects() {
        const searchQuery = mainSearchInput ? mainSearchInput.value.toLowerCase() : '';
        const minBudget = parseInt(minBudgetInput.value) || 0;
        const maxBudget = parseInt(maxBudgetInput.value) || 1000000;
        const maxDeadline = parseInt(maxDeadlineInput.value) || 365;
        const location = locationInput.value.toLowerCase();

        const selectedTypes = Array.from(projectTypeInputs).filter(cb => cb.checked).map(cb => cb.value);
        const selectedExperience = Array.from(experienceLevelInputs).filter(cb => cb.checked).map(cb => cb.value);

        // Skills logic (simplified for text input)
        const skillQuery = skillInput.value.toLowerCase();

        currentProjects = mockProjects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchQuery) || project.description.toLowerCase().includes(searchQuery);
            const matchesBudget = project.budget >= minBudget && project.budget <= maxBudget;
            const matchesDeadline = project.deadline <= maxDeadline;
            const matchesLocation = location === '' || project.location.toLowerCase().includes(location);
            const matchesType = selectedTypes.includes(project.type);
            const matchesExperience = selectedExperience.includes(project.experience);
            const matchesSkill = skillQuery === '' || project.skills.some(s => s.toLowerCase().includes(skillQuery));

            return matchesSearch && matchesBudget && matchesDeadline && matchesLocation && matchesType && matchesExperience && matchesSkill;
        });

        sortProjects(false); // Sort but don't reload yet
        loadProjects(true); // Reset and reload
    }

    function sortProjects(reload = true) {
        const sortValue = sortSelect.value;

        currentProjects.sort((a, b) => {
            if (sortValue === 'newest') return b.id - a.id; // Mock ID as date
            if (sortValue === 'budget_asc') return a.budget - b.budget;
            if (sortValue === 'budget_desc') return b.budget - a.budget;
            if (sortValue === 'deadline') return a.deadline - b.deadline;
            return 0;
        });

        if (reload) loadProjects(true);
    }

    // --- Modal Logic ---
    window.openProjectModal = function (id) {
        const project = mockProjects.find(p => p.id === id);
        if (!project) return;

        const stagesHtml = project.stages ? project.stages.map(s => `
            <div class="stage-item">
                <span class="stage-name">${s.name}</span>
                <span class="stage-duration">${s.duration}</span>
            </div>
        `).join('') : '';

        modalBody.innerHTML = `
            <div class="modal-header-content">
                <h2 class="modal-title">${project.title}</h2>
                <div class="modal-badges">
                    <span class="modal-badge status-${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span>
                    <span class="modal-badge category">${project.category}</span>
                </div>
            </div>
            
            <div class="modal-grid">
                <div class="modal-main">
                    <div class="modal-section">
                        <h3>Описание проекта</h3>
                        <p>${project.fullDescription.replace(/\n/g, '<br>')}</p>
                    </div>
                    
                    ${stagesHtml ? `
                    <div class="modal-section">
                        <h3>Этапы работы</h3>
                        <div class="stages-list">
                            ${stagesHtml}
                        </div>
                    </div>
                    ` : ''}
                </div>
                
                
                
                <div class="modal-sidebar">
                    <div class="client-card glass-card">
                        <div class="client-header">
                            <div class="client-avatar" style="background: linear-gradient(135deg, #1f2937, #111827);">${project.client.avatar || 'C'}</div>
                            <div class="client-info">
                                <div class="client-name">${project.client.name}</div>
                                <div class="client-rating" style="display: flex; align-items: center; gap: 4px;">
                                    <i class="fas fa-star" style="color: #fbbf24;"></i> 
                                    <span>${project.client.rating}</span>
                                    <span style="opacity: 0.5; font-size: 12px;">(${project.client.reviews} отзывов)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="project-stats glass-card">
                        <div class="stat-row">
                            <span>Бюджет:</span>
                            <span class="stat-value" style="font-size: 32px; color: white;">$${project.budget}</span>
                        </div>
                        <div class="stat-row">
                            <span>Срок:</span>
                            <span class="stat-value" style="font-size: 32px; color: white;">${project.deadline} дней</span>
                        </div>
                        <div class="stat-row">
                            <span>Опыт:</span>
                            <span class="stat-value" style="font-size: 28px; color: white; text-transform: capitalize;">${project.experience}</span>
                        </div>
                    </div>
                    
                    <button class="apply-btn" onclick="document.getElementById('projectDetailsModal').classList.remove('active'); document.getElementById('successModal').classList.add('active');" style="margin-top: 16px;">Подать заявку</button>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // --- Infinite Scroll ---
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            loadProjects();
        }
    });

    // --- Event Listeners ---
    applyFiltersBtn.addEventListener('click', filterProjects);
    mainSearchBtn.addEventListener('click', filterProjects);
    mainSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') filterProjects();
    });
    sortSelect.addEventListener('change', () => sortProjects(true));

    // AI Recommendations (Mock)
    const aiContainer = document.getElementById('aiRecommendationsContainer');
    setTimeout(() => {
        aiContainer.innerHTML = `
            <div class="ai-project-mini">
                <div class="ai-match">98% Match</div>
                <h4 class="ai-project-title">AI Dashboard UI</h4>
                <p class="ai-project-brief">Сложный интерфейс для AI аналитики...</p>
                <div class="ai-project-info">
                    <span class="ai-budget">$4,500</span>
                    <span class="ai-deadline">3 нед</span>
                </div>
                <button class="ai-apply-btn" onclick="openProjectModal(1)">Посмотреть</button>
            </div>
            <div class="ai-project-mini">
                <div class="ai-match">92% Match</div>
                <h4 class="ai-project-title">Crypto Wallet App</h4>
                <p class="ai-project-brief">Мобильное приложение для крипты...</p>
                <div class="ai-project-info">
                    <span class="ai-budget">$6,000</span>
                    <span class="ai-deadline">4 нед</span>
                </div>
                <button class="ai-apply-btn" onclick="openProjectModal(3)">Посмотреть</button>
            </div>
        `;
    }, 1500);

    // Initial Load
    loadProjects(true);
});


// Success Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const successModal = document.getElementById('successModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    const successContinueBtn = document.getElementById('successContinueBtn');
    // Select both regular apply buttons and AI apply buttons
    const applyBtns = document.querySelectorAll('.apply-btn, .ai-apply-btn');

    if (successModal && applyBtns.length > 0) {
        const openSuccessModal = () => {
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeSuccess = () => {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        applyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default if it's a link
                openSuccessModal();
            });
        });

        if (closeSuccessModal) closeSuccessModal.addEventListener('click', closeSuccess);
        if (successContinueBtn) successContinueBtn.addEventListener('click', closeSuccess);

        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeSuccess();
            }
        });
    }

    // Education Creator Dashboard Logic
    const creatorTabs = document.querySelectorAll('.creator-tab');
    if (creatorTabs.length > 0) {
        creatorTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                creatorTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Hide all sections
                document.querySelectorAll('.creator-section').forEach(s => s.classList.remove('active'));

                // Show target section
                const targetId = `section-${tab.dataset.tab}`;
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
    }

    // Wizard Logic
    window.selectContentType = function (type) {
        const wizard = document.getElementById('creationWizard');
        const typeGrid = document.querySelector('.content-type-grid');

        if (wizard && typeGrid) {
            typeGrid.style.display = 'none';
            wizard.style.display = 'block';
            // Reset wizard to step 1
            document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
            document.querySelector('.step[data-step="1"]').classList.add('active');
            document.querySelectorAll('.wizard-step-content').forEach(c => c.classList.remove('active'));
            document.getElementById('step1').classList.add('active');
        }
    };

    window.closeWizard = function () {
        const wizard = document.getElementById('creationWizard');
        const typeGrid = document.querySelector('.content-type-grid');

        if (wizard && typeGrid) {
            wizard.style.display = 'none';
            typeGrid.style.display = 'grid';
        }
    };

    let currentStep = 1;
    window.nextStep = function () {
        if (currentStep < 5) {
            currentStep++;
            updateWizardStep();
        } else {
            // Finish wizard
            // Show success message or toast
            alert('Курс успешно создан и отправлен на модерацию!');
            closeWizard();
            // Reset wizard
            currentStep = 1;
            updateWizardStep();
        }
    };

    window.prevStep = function () {
        if (currentStep > 1) {
            currentStep--;
            updateWizardStep();
        }
    };

    function updateWizardStep() {
        // Update steps indicator
        document.querySelectorAll('.step').forEach(s => {
            const stepNum = parseInt(s.dataset.step);
            if (stepNum === currentStep) {
                s.classList.add('active');
            } else if (stepNum < currentStep) {
                s.classList.remove('active'); // Or keep active to show progress
            } else {
                s.classList.remove('active');
            }
        });

        // Show content
        document.querySelectorAll('.wizard-step-content').forEach(c => c.classList.remove('active'));
        const targetContent = document.getElementById(`step${currentStep}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Update Button Text
        const nextBtn = document.querySelector('.wizard-footer .btn-primary');
        if (nextBtn) {
            if (currentStep === 5) {
                nextBtn.textContent = 'Готово';
                nextBtn.classList.add('btn-success'); // Optional style change
            } else {
                nextBtn.textContent = 'Далее';
                nextBtn.classList.remove('btn-success');
            }
        }
    }
});

/* ========================================
   MARKETPLACE FILTERS LOGIC
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const applyFiltersBtn = document.querySelector('.btn-primary.full-width');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            // Collect filter values
            const location = document.querySelector('.location-input')?.value;
            const projectType = document.querySelector('input[name="projectType"]:checked')?.value;
            const experience = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                .map(cb => cb.value);

            console.log('Filters Applied:', {
                location,
                projectType,
                experience
            });

            // Visual feedback
            const originalText = applyFiltersBtn.innerText;
            applyFiltersBtn.innerText = 'Фильтры применены!';
            applyFiltersBtn.style.background = 'var(--neon-green)';

            setTimeout(() => {
                applyFiltersBtn.innerText = originalText;
                applyFiltersBtn.style.background = '';
            }, 2000);
        });
    }
});

/* ========================================
   INFINITE SCROLL & EMPTY STATE LOGIC
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const projectsGrid = document.querySelector('.projects-grid-container');

    // CRITICAL FIX: Completely stop this script on Marketplace page (it uses its own Premium engine)
    if (document.body.classList.contains('marketplace-page')) return;

    // Fix: Prevent this generic runner from injecting content into My Work page
    if (projectsGrid && projectsGrid.id === 'individualProjectsList') return;
    const scrollLoader = document.querySelector('.scroll-loader');
    const emptyState = document.querySelector('.empty-state');

    // Mock Data for Infinite Scroll matches the Premium Static Design
    const mockProjects = [
        {
            id: 1,
            title: "Разработка DeFi Обменника на Solana",
            category: "Blockchain",
            description: "Требуется команда для создания децентрализованной биржи с пулами ликвидности и стейкингом. Опыт Rust и Web3 обязателен. Интеграция с Phantom Wallet.",
            budget: 12000,
            deadline: "2 месяца",
            tags: ["Rust", "Solana", "React", "Web3"],
            responses: 45,
            status: "Featured",
            urgent: false,
            new: false,
            experience: "expert",
            client: { name: "CryptoFin Corp", avatar: "assets/avatars/1.jpg", role: "Enterprise Client", online: true, postedTime: "2 ч. назад" }
        },
        {
            id: 2,
            title: "Интеграция GPT-4 для Юридического Бота",
            category: "AI & ML",
            description: "Нужен специалист по NLP для настройки промптов и fine-tuning модели под юридическую тематику. Срочный старт.",
            budget: 3500,
            deadline: "2 недели",
            tags: ["Python", "OpenAI", "LangChain"],
            responses: 12,
            status: "Urgent",
            urgent: true,
            new: false,
            experience: "senior",
            client: { name: "LegalTech AI", avatar: "assets/avatars/2.jpg", role: "Startup", online: false, postedTime: "5 ч. назад" }
        },
        {
            id: 3,
            title: "Фитнес-приложение с AR Тренировками",
            category: "Mobile Dev",
            description: "Разработка iOS приложения с использованием ARKit для визуализации упражнений в реальном времени.",
            budget: 5000,
            deadline: "1.5 месяца",
            tags: ["Swift", "ARKit", "iOS"],
            responses: 8,
            status: "New",
            urgent: false,
            new: true,
            experience: "middle",
            client: { name: "FitLife Pro", avatar: "assets/avatars/3.jpg", role: "Company", online: true, postedTime: "12 мин. назад" }
        },
        {
            id: 4,
            title: "Редизайн Интернет-Магазина Одежды",
            category: "Web Dev",
            description: "Полный редизайн UX/UI и верстка для магазина брендовой одежды. Стиль минимализм.",
            budget: 2800,
            deadline: "3 недели",
            tags: ["Figma", "HTML/CSS", "Shopify"],
            responses: 24,
            status: "Standard",
            urgent: false,
            new: false,
            experience: "middle",
            client: { name: "Fashion Brand", avatar: "assets/avatars/4.jpg", role: "Client", online: false, postedTime: "1 д. назад" }
        },
        {
            id: 5,
            title: "Айдентика для Финтех Стартапа",
            category: "Branding",
            description: "Разработка логотипа, брендбука и корпоративного стиля для необанка.",
            budget: 1500,
            deadline: "1 неделя",
            tags: ["Logo", "Brandbook", "Illustrator"],
            responses: 56,
            status: "Standard",
            urgent: false,
            new: false,
            experience: "junior",
            client: { name: "NeoBank Light", avatar: "assets/avatars/5.jpg", role: "Startup", online: true, postedTime: "3 ч. назад" }
        },
        {
            id: 6,
            title: "SEO Продвижение SaaS Платформы",
            category: "Marketing",
            description: "Комплексное SEO продвижение на рынок США. Аудит, семантика, линкбилдинг.",
            budget: "2,000",
            deadline: "6 месяцев",
            tags: ["SEO", "Marketing", "Analytics"],
            responses: 15,
            status: "Standard",
            urgent: false,
            new: false,
            experience: "middle",
            client: { name: "SaaS Growth", avatar: "assets/avatars/6.jpg", role: "Agency", online: true, postedTime: "6 ч. назад" }
        }
    ];

    // Initial Load
    if (projectsGrid) {
        // Load initial batch immediately
        mockProjects.slice(0, 6).forEach(project => {
            const card = createProjectCard(project);
            projectsGrid.appendChild(card);
        });

        // Update count
        const countEl = document.getElementById('projectsCount');
        if (countEl) countEl.innerText = mockProjects.length;
    }

    // Infinite Scroll Observer
    if (scrollLoader && projectsGrid) {
        const observerOptions = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadMoreProjects();
                }
            });
        }, observerOptions);

        observer.observe(scrollLoader);

        function loadMoreProjects() {
            scrollLoader.classList.add('active');

            // Simulate API delay
            setTimeout(() => {
                // In a real app, fetch more data here. For demo, we just clone existing or stop.
                // For now, let's just stop loader after a bit to show end.
                scrollLoader.classList.remove('active');
            }, 1000);
        }
    }

    function createProjectCard(project) {
        const card = document.createElement('div');
        // Determine Badge Class
        let badgeHtml = '';
        if (project.urgent) {
            badgeHtml = `<span class="card-badge urgent">Urgent</span>`;
        } else if (project.new) {
            badgeHtml = `<span class="card-badge new">New</span>`;
        } else if (project.status === 'Featured') {
            badgeHtml = `<span class="card-badge featured"><i class="fas fa-bolt"></i> Featured</span>`;
        }

        // Generate Tags
        const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        // Format Budget
        const budgetDisplay = typeof project.budget === 'number' ? `$${project.budget.toLocaleString()}` : (project.budget.includes('$') ? project.budget : `$${project.budget}`);

        // Neon color based on Price (Just for visual variety)
        const priceColor = project.budget > 5000 ? 'purple' : (project.budget > 2000 ? 'blue' : 'orange');

        // Generative Avatar Color if image missing
        const avatarColor = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][project.id % 5];
        const initials = project.client.name.substring(0, 2).toUpperCase();

        card.className = `marketplace-card post-style ${project.urgent ? 'urgent-project' : ''}`;
        card.innerHTML = `
            <div class="card-post-header">
                <div class="client-avatar" style="background: ${avatarColor}">
                    ${initials}
                    ${project.client.online ? '<span class="status-dot"></span>' : ''}
                </div>
                <div class="client-info">
                    <div class="client-name-row">
                        <span class="client-name">${project.client.name}</span>
                        <span class="client-role-badge">${project.client.role}</span>
                    </div>
                    <span class="post-time">${project.client.postedTime} • ${project.category}</span>
                </div>
                <div class="post-actions-top">
                    ${badgeHtml}
                    <button class="icon-btn"><i class="far fa-bookmark"></i></button>
                    <button class="icon-btn"><i class="fas fa-ellipsis-h"></i></button>
                </div>
            </div>

            <div class="card-post-body">
                <h3 class="card-title">${project.title}</h3>
                <p class="card-description">${project.description}</p>
                <div class="card-tags">
                    ${tagsHtml}
                </div>
            </div>

            <div class="card-post-footer">
                <div class="budget-section">
                    <span class="budget-label">Бюджет проекта</span>
                    <span class="budget-value neon-text-${priceColor}">${budgetDisplay}</span>
                </div>
                
                <div class="post-meta-row">
                   <div class="meta-item">
                        <i class="far fa-clock"></i>
                        <span>Дедлайн: ${project.deadline}</span>
                    </div>
                    <div class="meta-item">
                        <i class="far fa-comment-alt"></i>
                        <span>${project.responses} откликов</span>
                    </div>
                </div>

                <button class="apply-btn">Откликнуться</button>
            </div>
        `;

        // Attach Event Listener
        const btn = card.querySelector('.apply-btn');
        btn.addEventListener('click', () => openProjectModal(project));

        return card;
    }

    // Modal Logic
    const modal = document.getElementById('projectDetailsModal');
    const closeModalBtn = document.getElementById('closeProjectModal');
    const successModal = document.getElementById('successModal'); // Assuming this exists or we create generic alert

    if (modal) {
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    function openProjectModal(project) {
        if (!modal) return;

        // Populate Modal Data
        // Note: You need to ensure these classes exist in your HTML modal structure
        const titleEl = modal.querySelector('.project-modal-title');
        const descEl = modal.querySelector('.project-description-text'); // Check HTML class
        const budgetEl = modal.querySelector('.modal-budget-value');
        const tagsContainer = modal.querySelector('.modal-tags');

        if (titleEl) titleEl.textContent = project.title;
        if (descEl) descEl.textContent = project.description;
        if (budgetEl) budgetEl.textContent = typeof project.budget === 'number' ? `$${project.budget.toLocaleString()}` : project.budget;

        // Populate Tags
        if (tagsContainer) {
            tagsContainer.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        }

        // Show Modal
        modal.classList.add('active');

        // Handle "Submit Application" inside modal
        // We need to re-attach or clear old listeners to avoid duplicates if we use addEventListener on a static button
        // A simple way is to replace the button node or use a one-time handler
        const submitBtn = modal.querySelector('.submit-proposal-btn');
        if (submitBtn) {
            // Clone to remove old listeners
            const newBtn = submitBtn.cloneNode(true);
            submitBtn.parentNode.replaceChild(newBtn, submitBtn);

            newBtn.addEventListener('click', () => {
                // Show Success
                modal.classList.remove('active');
                showSuccessModal();
            });
        }
    }

    function showSuccessModal() {
        // Check if success modal exists, otherwise create dynamic one
        let sModal = document.getElementById('successModal');
        if (!sModal) {
            // Create simplistic success modal if missing
            alert("Ваша заявка успешно отправлена! (Success Modal Placeholder)");
            return;
        }
        sModal.classList.add('active');
        setTimeout(() => sModal.classList.remove('active'), 3000);
    }
});

/* ========================================
   MY WORK PAGE LOGIC
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.my-work-page')) return;

    // Tabs Logic
    const tabs = document.querySelectorAll('.category-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked
            tab.classList.add('active');
            const targetId = tab.dataset.tab;
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Invitation Buttons Logic (Demo Interaction)
    const invitationButtons = document.querySelectorAll('.btn-accept, .btn-decline');
    invitationButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const card = this.closest('.invitation-card');
            const isAccept = this.classList.contains('btn-accept');

            // Visual feedback
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateX(20px)';

            setTimeout(() => {
                card.remove();
                // Check if empty
                const list = document.getElementById('invitationsList');
                if (list && list.children.length === 0) {
                    list.innerHTML = `<div class="empty-state-message" style="text-align: center; padding: 40px; color: var(--text-muted);">
                        <p>Нет новых приглашений</p>
                    </div>`;
                }

                // Show toast (simulated)
                alert(isAccept ? "Приглашение принято! Проект добавлен в 'Командные'." : "Приглашение отклонено.");
            }, 300);
        });
    });

    // Application Buttons Logic (Demo)
    const archiveButtons = document.querySelectorAll('.btn-action-small'); // Assuming some exist or will be clicked
    // Note: Applications in HTML didn't have specific action buttons except implied ones. 
    // Let's just ensure the tabs work perfectly for now.

    // Team/Individual Project Button Interactions
    const projectActionButtons = document.querySelectorAll('.project-action-btn');
    projectActionButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const action = this.getAttribute('title');
            alert(`Opening ${action} interface...`);
        });
    });
    // renderIndividualProjects();
    // renderTeamProjects();
    // renderApplications();
    // renderInvitations();

    function renderIndividualProjects() {
        const container = document.getElementById('individualProjectsList');
        const projects = [
            { title: 'Редизайн Dashboard', client: 'Alex M.', progress: 75, status: 'active', deadline: '3 дня', type: 'UI/UX' },
            { title: 'Логотип для стартапа', client: 'Sarah C.', progress: 30, status: 'active', deadline: '10 дней', type: 'Branding' },
            { title: 'Верстка лендинга', client: 'Mike R.', progress: 100, status: 'review', deadline: 'На проверке', type: 'Frontend' },
            { title: 'Скрипт парсинга', client: 'DevCorp', progress: 100, status: 'completed', deadline: 'Завершен', type: 'Backend' }
        ];

        container.innerHTML = projects.map(p => `
            <div class="project-list-card">
                <div class="project-main-info">
                    <h3>${p.title}</h3>
                    <span class="client-name-small">Заказчик: ${p.client}</span>
                </div>
                <div class="project-progress">
                    <div class="progress-text">
                        <span>Прогресс</span>
                        <span>${p.progress}%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${p.progress}%"></div>
                    </div>
                </div>
                <div class="project-meta-col">
                    <span><i class="far fa-clock"></i> ${p.deadline}</span>
                    <span>${p.type}</span>
                </div>
                <div class="status-badge status-${p.status}">
                    ${getStatusLabel(p.status)}
                </div>
                <div class="project-actions">
                    <button class="project-action-btn" title="Чат"><i class="far fa-comment-alt"></i></button>
                    <button class="project-action-btn" title="Файлы"><i class="far fa-folder"></i></button>
                    <button class="project-action-btn" title="Подробнее"><i class="fas fa-ellipsis-h"></i></button>
                </div>
            </div>
        `).join('');
    }

    function renderTeamProjects() {
        const container = document.getElementById('teamProjectsList');
        const projects = [
            {
                title: 'SaaS Платформа "EcoTrack"',
                role: 'Lead Designer',
                members: 4,
                tasks: '12/45',
                progress: 27,
                nextCall: '14:00',
                icon: 'fas fa-leaf',
                color: 'var(--neon-green)'
            },
            {
                title: 'Мобильное приложение "FitLife"',
                role: 'UI Designer',
                members: 6,
                tasks: '8/30',
                progress: 26,
                nextCall: 'Завтра',
                icon: 'fas fa-heartbeat',
                color: 'var(--neon-pink)'
            }
        ];

        container.innerHTML = projects.map(p => `
            <div class="team-project-card">
                <div class="tp-header">
                    <div class="tp-icon-wrapper" style="color: ${p.color}; background: ${p.color}20;">
                        <i class="${p.icon}"></i>
                    </div>
                    <div class="tp-info">
                        <h3>${p.title}</h3>
                        <span class="tp-role">${p.role}</span>
                    </div>
                    <div class="tp-menu">
                        <button class="icon-btn-small"><i class="fas fa-ellipsis-h"></i></button>
                    </div>
                </div>
                
                <div class="tp-progress-section">
                    <div class="tp-progress-labels">
                        <span>Прогресс</span>
                        <span>${p.progress}%</span>
                    </div>
                    <div class="tp-progress-bar">
                        <div class="tp-progress-fill" style="width: ${p.progress}%; background: ${p.color}; box-shadow: 0 0 10px ${p.color};"></div>
                    </div>
                </div>

                <div class="tp-footer">
                    <div class="tp-team">
                        <div class="team-avatars-stack">
                            ${Array(p.members).fill(0).map((_, i) => `<img src="https://ui-avatars.com/api/?name=User+${i}&background=random" alt="User">`).join('')}
                        </div>
                        <button class="add-member-btn"><i class="fas fa-plus"></i></button>
                    </div>
                    <div class="tp-actions">
                        <button class="tp-action-btn" title="Звонок"><i class="fas fa-phone-alt"></i></button>
                        <button class="tp-action-btn" title="Доска"><i class="fas fa-columns"></i></button>
                        <button class="tp-action-btn primary" title="Открыть">Открыть</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderApplications() {
        const container = document.getElementById('applicationsList');
        const apps = [
            { project: 'Корпоративный сайт', date: '28.11.2024', status: 'viewed', bid: '$1,200' },
            { project: 'Дизайн презентации', date: '27.11.2024', status: 'sent', bid: '$300' },
            { project: 'React Native App', date: '25.11.2024', status: 'rejected', bid: '$4,000' },
            { project: '3D Моделирование', date: '20.11.2024', status: 'accepted', bid: '$800' }
        ];

        container.innerHTML = apps.map(a => `
            <tr>
                <td>${a.project}</td>
                <td>${a.date}</td>
                <td><span class="app-status ${a.status}"><i class="fas fa-circle" style="font-size: 8px;"></i> ${getAppStatusLabel(a.status)}</span></td>
                <td class="neon-text-blue">${a.bid}</td>
                <td>
                    <button class="app-delete-btn" title="Удалить"><i class="far fa-trash-alt"></i></button>
                </td>
            </tr>
        `).join('');
    }

    function renderInvitations() {
        const container = document.getElementById('invitationsList');
        const invites = [
            { project: 'Crypto Exchange UI', role: 'Senior Designer', rate: '$45/hr', inviter: 'Blockchain Inc.' }
        ];

        container.innerHTML = invites.map(i => `
            <div class="invitation-card">
                <div class="invitation-icon">
                    <i class="fas fa-envelope-open-text"></i>
                </div>
                <div class="invitation-content">
                    <div class="invitation-role">${i.role}</div>
                    <div class="invitation-project">${i.project}</div>
                    <div class="invitation-details">
                        <span><i class="far fa-building"></i> ${i.inviter}</span>
                        <span><i class="fas fa-dollar-sign"></i> ${i.rate}</span>
                    </div>
                </div>
                <div class="invitation-actions">
                    <button class="btn-primary neon-button">Принять</button>
                    <button class="btn-secondary">Отклонить</button>
                </div>
            </div>
        `).join('');
    }

    function getStatusLabel(status) {
        const map = { 'active': 'В работе', 'review': 'На проверке', 'completed': 'Завершен' };
        return map[status] || status;
    }

    function getAppStatusLabel(status) {
        const map = { 'sent': 'Отправлен', 'viewed': 'Просмотрен', 'accepted': 'Принят', 'rejected': 'Отклонен' };
        return map[status] || status;
    }
});

/* ========================================
   GLOBAL DASHBOARD & ROLE LOGIC
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {

    // --- State Integration for Dashboard ---
    function syncDashboardWithState() {
        if (!window.TalentSphereState) return;
        const state = window.TalentSphereState.state;

        // Update User Name
        const welcomeTitle = document.querySelector('.welcome-banner .page-title');
        if (welcomeTitle) {
            welcomeTitle.innerHTML = `Добро пожаловать, <span class="gradient-text">${state.user.name.split(' ')[0]}</span>!`;
        }

        // Update Wallet Balance
        const headerBalance = document.querySelector('.wallet-balance');
        if (headerBalance) {
            headerBalance.textContent = `${state.wallet.currency}${state.wallet.balance.toLocaleString()}`;
        }

        const sidebarBalance = document.querySelector('.header-stats .stat-badge:nth-child(2) span');
        if (sidebarBalance) {
            sidebarBalance.textContent = `Баланс: ${state.wallet.currency}${state.wallet.balance.toLocaleString()}`;
        }

        // Update User Profile in Sidebar
        const sidebarName = document.querySelector('.sidebar-footer .user-name');
        const sidebarStatus = document.querySelector('.sidebar-footer .user-status');
        if (sidebarName) sidebarName.textContent = state.user.name;
        if (sidebarStatus) sidebarStatus.textContent = state.user.status;

        // Update Active Projects List (Premium Template)
        const projectsContainer = document.getElementById('activeProjectsList');
        if (projectsContainer && state.activeProjects.length > 0) {
            projectsContainer.innerHTML = state.activeProjects.map(prj => `
                <div class="project-item-premium">
                    <div class="project-icon-large">
                        <i class="fas fa-cube" style="color: ${prj.progress > 80 ? 'var(--neon-green)' : 'var(--neon-purple)'};"></i>
                    </div>
                    <div class="project-details">
                         <div class="project-title">${prj.name}</div>
                         <div class="project-meta">
                            <span><i class="far fa-clock"></i> ${prj.deadline}</span>
                            <span><i class="far fa-user"></i> ${prj.client}</span>
                         </div>
                    </div>
                    <div class="project-progress-mini">
                        <div class="progress-label-mini">${prj.progress}%</div>
                        <div class="progress-track">
                            <div class="progress-fill" style="width: ${prj.progress}%; background: ${prj.progress > 80 ? 'var(--neon-green)' : 'linear-gradient(90deg, var(--neon-blue), var(--neon-cyan))'};"></div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Update Notifications List (Premium Template)
        const notificationsContainer = document.getElementById('notificationsList');
        if (notificationsContainer && state.notifications) {
            notificationsContainer.innerHTML = state.notifications.slice(0, 3).map(notif => `
                <div class="notification-item-premium">
                     <div class="notif-icon-wrapper" style="color: ${notif.read ? 'var(--text-secondary)' : 'var(--neon-pink)'}">
                        <i class="fas ${notif.read ? 'fa-check-circle' : 'fa-bell'}"></i>
                    </div>
                    <div class="notif-content">
                        <h4 style="color: ${notif.read ? 'var(--text-secondary)' : 'white'}">${notif.title}</h4>
                        <div class="notif-time">${notif.time}</div>
                    </div>
                </div>
             `).join('');
        }
    }

    // Initialize sync and subscribe to future updates
    if (window.TalentSphereState) {
        syncDashboardWithState();
        window.TalentSphereState.subscribe(syncDashboardWithState);
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-item-modern').forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all
            document.querySelectorAll('.faq-item-modern').forEach(i => i.classList.remove('active'));
            // Toggle clicked
            if (!isActive) item.classList.add('active');
        });
    });
    // --- Dynamic Role Switching Logic ---
    const roleButtons = document.querySelectorAll('.role-btn');
    if (roleButtons.length > 0) {
        roleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const role = btn.dataset.role;
                if (window.TalentSphereState) {
                    window.TalentSphereState.update('user.role', role);
                }
            });
        });
    }

    function applyRoleEffects(state) {
        if (!state || !state.user) return;
        const role = state.user.role;
        const isPerformer = role === 'performer';

        // 0. Update Role Button States (Active Class)
        document.querySelectorAll(`.role-btn[data-role="${role}"]`).forEach(b => b.classList.add('active'));
        document.querySelectorAll(`.role-btn:not([data-role="${role}"])`).forEach(b => b.classList.remove('active'));

        // 1. Sidebar Navigation Filtering
        document.querySelectorAll('.nav-item').forEach(item => {
            const span = item.querySelector('span');
            const text = span ? span.textContent.trim() : '';

            if (text === 'Поиск исполнителей') {
                item.style.display = isPerformer ? 'none' : 'flex';
            }
        });

        // 2. Dashboard/Action Button Customization
        // Target both dashboard banner button and global header button
        const actionButtons = document.querySelectorAll('.btn-create, .header-action-btn');
        actionButtons.forEach(btn => {
            const span = btn.querySelector('span');
            if (isPerformer) {
                if (span) span.textContent = 'Найти работу';
                else btn.innerHTML = '<i class="fas fa-search"></i> Найти работу';
                btn.onclick = (e) => {
                    e.preventDefault();
                    window.location.href = 'marketplace.html';
                };
            } else {
                if (span) span.textContent = 'Создать проект';
                else btn.innerHTML = '<i class="fas fa-plus"></i> Создать проект';
                btn.onclick = (e) => {
                    e.preventDefault();
                    window.location.href = 'create-project.html';
                };
            }
        });

        // 3. Welcome Banner and Role Indicator
        const welcomeBanner = document.querySelector('.welcome-banner h1');
        if (welcomeBanner) {
            const name = state.user.name.split(' ')[0];
            welcomeBanner.innerHTML = `Добро пожаловать, <span class="gradient-text">${name}</span>! <small style="font-size: 0.4em; vertical-align: middle; opacity: 0.7; font-weight: 300; margin-left:10px; border: 1px solid currentColor; padding: 2px 6px; border-radius: 4px; letter-spacing: 1px; color: var(--text-secondary);">${isPerformer ? 'ИСПОЛНИТЕЛЬ' : 'ЗАКАЗЧИК'}</small>`;
        }
    }

    // Header Badge Update Helper
    function updateHeaderRoleDisplay(role) {
        const headerRoleBadge = document.getElementById('headerRoleBadge');
        const headerRoleText = document.getElementById('headerRoleText');
        const headerRoleIcon = headerRoleBadge ? headerRoleBadge.querySelector('i') : null;

        if (headerRoleBadge && headerRoleText) {
            // Reset classes
            headerRoleBadge.classList.remove('customer-active', 'performer-active');

            if (role === 'customer') {
                headerRoleBadge.classList.add('customer-active');
                headerRoleText.textContent = 'Заказчик';
                if (headerRoleIcon) headerRoleIcon.className = 'fas fa-briefcase';
            } else {
                headerRoleBadge.classList.add('performer-active');
                headerRoleText.textContent = 'Исполнитель';
                if (headerRoleIcon) headerRoleIcon.className = 'fas fa-code';
            }
        }
    }

    if (window.TalentSphereState) {
        applyRoleEffects(window.TalentSphereState.state);
        if (window.TalentSphereState.state && window.TalentSphereState.state.user) {
            updateHeaderRoleDisplay(window.TalentSphereState.state.user.role || 'performer');
        }

        window.TalentSphereState.subscribe((newState) => {
            applyRoleEffects(newState);
            if (newState.user) updateHeaderRoleDisplay(newState.user.role);
        });
    }

    // --- Universal Mobile Sidebar Logic (Delegation) ---
    // Using delegation is safer for dynamic or slow-loading elements
    // --- Universal Mobile Sidebar & Navigation Logic (Delegated) ---
    document.addEventListener('click', (e) => {
        // 1. Sidebar Toggle
        const toggleBtn = e.target.closest('#mobileSidebarToggle');

        if (toggleBtn) {
            console.log('Delegated Click: Toggle Button');
            e.stopPropagation();

            const dashboardSidebar = document.getElementById('dashboardSidebar') || document.querySelector('.sidebar');
            const sidebarOverlay = document.getElementById('sidebarOverlay') || document.querySelector('.sidebar-overlay');

            if (dashboardSidebar) {
                dashboardSidebar.classList.toggle('active');
                const isActive = dashboardSidebar.classList.contains('active');
                document.body.style.overflow = isActive ? 'hidden' : '';

                if (sidebarOverlay) {
                    sidebarOverlay.classList.toggle('active', isActive);
                }
            } else {
                console.error('Sidebar element not found!');
            }
            return;
        }

        // 2. Mobile Avatar -> Profile
        if (e.target.closest('.mobile-avatar')) {
            window.location.href = 'profile.html';
            return;
        }

        // 3. Mobile Logo -> Dashboard
        if (e.target.closest('.mobile-logo-text')) {
            window.location.href = 'dashboard.html';
            return;
        }
    });

    // Close sidebar on overlay click
    document.addEventListener('click', (e) => {
        const overlay = e.target.closest('.sidebar-overlay') || e.target.closest('#sidebarOverlay');
        if (overlay && overlay.classList.contains('active')) {
            const dashboardSidebar = document.getElementById('dashboardSidebar') || document.querySelector('.sidebar');
            if (dashboardSidebar) dashboardSidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

