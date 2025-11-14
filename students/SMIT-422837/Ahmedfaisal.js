
        // Wait for the DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Preloader
            window.addEventListener('load', function() {
                document.body.classList.add('loaded');
            });

            // Theme Toggle
            const themeToggle = document.querySelector('.theme-toggle');
            const currentTheme = localStorage.getItem('theme') || 'light';
            
            // Set initial theme
            document.documentElement.setAttribute('data-theme', currentTheme);
            
            themeToggle.addEventListener('click', function() {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });

            // Header scroll effect
            const header = document.querySelector('.tj-header-area');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Mobile menu toggle
            const menuToggle = document.getElementById('menu-toggle');
            const headerMenu = document.querySelector('.header-menu');
            
            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    headerMenu.classList.toggle('active');
                    document.body.classList.toggle('menu-open');
                });
            }

            // Portfolio filtering
            const filterButtons = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    portfolioItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });

            // Scroll animations
            const fadeElements = document.querySelectorAll('.fade-in');
            
            const fadeInOnScroll = function() {
                fadeElements.forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.classList.add('visible');
                    }
                });
            };
            
            // Check on load
            fadeInOnScroll();
            
            // Check on scroll
            window.addEventListener('scroll', fadeInOnScroll);

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Close mobile menu if open
                        headerMenu.classList.remove('active');
                        document.body.classList.remove('menu-open');
                        
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Form label animation fix for select elements
            const selectElements = document.querySelectorAll('select');
            selectElements.forEach(select => {
                select.addEventListener('change', function() {
                    if (this.value !== '') {
                        this.nextElementSibling.classList.add('active');
                    } else {
                        this.nextElementSibling.classList.remove('active');
                    }
                });
                
                // Initialize on page load
                if (select.value !== '') {
                    select.nextElementSibling.classList.add('active');
                }
            });
        });
        // Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
            } else {
                const itemCategory = item.getAttribute('data-category');
                if (itemCategory === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            }
        });
        // Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const allProjectsGrid = document.getElementById('all-projects-grid');
const categorySections = document.getElementById('category-sections');

// Initialize - show all projects
allProjectsGrid.style.display = 'grid';
categorySections.style.display = 'none';

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        if (filterValue === 'all') {
            // Show all projects in one grid
            allProjectsGrid.style.display = 'grid';
            categorySections.style.display = 'none';
            
            // Show all items
            portfolioItems.forEach(item => {
                item.style.display = 'block';
            });
        } else {
            // Hide the all projects grid
            allProjectsGrid.style.display = 'none';
            
            // Show category sections
            categorySections.style.display = 'block';
            categorySections.innerHTML = '';
            
            // Create category section for the selected filter
            const categorySection = document.createElement('div');
            categorySection.className = 'portfolio-category';
            categorySection.setAttribute('data-category', filterValue);
            
            // Add category title based on filter
            let categoryTitle = '';
            let categoryDesc = '';
            
            switch(filterValue) {
                case 'ecommerce':
                    categoryTitle = '🛍️ E-Commerce & Business Solutions';
                    categoryDesc = 'Commercial applications and business-focused web solutions';
                    break;
                case 'portfolio':
                    categoryTitle = '💼 Portfolio & Personal Branding';
                    categoryDesc = 'Personal websites and professional portfolio designs';
                    break;
                case 'creative':
                    categoryTitle = '🎨 Creative & Design Projects';
                    categoryDesc = 'Artistic projects and creative web experiences';
                    break;
                case 'technical':
                    categoryTitle = '⚙️ Technical & Development';
                    categoryDesc = 'Code-focused projects and development tools';
                    break;
            }
            
            categorySection.innerHTML = `
                <h3 class="category-title">${categoryTitle}</h3>
                <p class="category-desc">${categoryDesc}</p>
                <div class="portfolio-grid">
                    ${Array.from(portfolioItems)
                        .filter(item => item.getAttribute('data-category') === filterValue)
                        .map(item => item.outerHTML)
                        .join('')}
                </div>
            `;
            
            categorySections.appendChild(categorySection);
            
            // Hide all items in the all projects grid
            portfolioItems.forEach(item => {
                item.style.display = 'none';
            });
        }
        
        // Re-trigger fade-in animations for visible items
        setTimeout(() => {
            const visibleItems = document.querySelectorAll('.portfolio-item[style="display: block"], .portfolio-item:not([style])');
            visibleItems.forEach(item => {
                item.classList.remove('visible');
                void item.offsetWidth; // Trigger reflow
                item.classList.add('visible');
            });
        }, 50);
    });
});
        
        // Show/hide category sections based on filter
        const categories = document.querySelectorAll('.portfolio-category');
        categories.forEach(category => {
            if (filterValue === 'all') {
                category.style.display = 'block';
            } else {
                const categoryType = category.querySelector('.portfolio-item').getAttribute('data-category');
                if (categoryType === filterValue) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            }
        });
    });
});

 