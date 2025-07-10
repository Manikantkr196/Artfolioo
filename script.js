let currentStep = 1;
let currentFilter = 'all';
let orderData = {};

// Portfolio Data
const portfolioData = [
    {
        id: 1,
        title: 'Boy Portrait',
        price: 500,
        rating: 5,
        category: 'boy',
        image: 'boy.jpg',
        description: 'Boy portrait with detailed sketching and realistic shading',
        size: '11x14 inches',
        duration: '5-7 days'
    },
    {
        id: 2,
        title: 'Couple Portrait',
        price: 750,
        rating: 5,
        category: 'couple',
        image: 'couple.jpg',
        description: 'Romantic couple portrait with emotional depth and fine details',
        size: '9x12 inches',
        duration: '7 days'
    },
    {
        id: 3,
        title: 'Children Portrait',
        price: 500,
        rating: 5,
        category: 'child',
        image: 'child.jpg',
        description: 'Gentle child portrait with soft details and playful expression',
        size: '8x10 inches',
        duration: '4-7 days'
    },
    {
        id: 4,
        title: 'Anime Portrait',
        price: 350,
        rating: 4,
        category: 'anime',
        image: 'anime1.jpg',
        description: 'Stylized anime portrait with characteristic features and shading',
        size: '8x10 inches',
        duration: '3-5 days'
    },
    {
        id: 5,
        title: 'Girl Portrait',
        price: 500,
        rating: 5,
        category: 'girl',
        image: 'girl1.jpg',
        description: 'Elegant girl portrait with detailed facial features and expressions',
        size: '9x12 inches',
        duration: '5-7 days'
    },
    {
        id: 6,
        title: 'Individual Portrait',
        price: 600,
        rating: 5,
        category: 'individual',
        image: 'images/jacksparrow.jpg',
        description: 'Detailed individual portrait with realistic shading and expression',
        size: '12x16 inches',
        duration: '5-7 days'
    }
];

// Portrait types for pricing (in Indian Rupees)
const portraitTypes = {
    'boy': { name: 'Boy Portrait', price: 500, duration: '5-7 days' },
    'couple': { name: 'Couple Portrait', price: 750, duration: '7 days' },
    'child': { name: 'Children Portrait', price: 500, duration: '4-7 days' },
    'anime': { name: 'Anime Portrait', price: 350, duration: '3-5 days' },
    'girl': { name: 'Girl Portrait', price: 500, duration: '5-7 days' },
    'individual': { name: 'Individual Portrait', price: 500, duration: '5-7 days' }
};

const sizes = {
    '8x10': { name: '8x10 inches', multiplier: 1 },
    '9x12': { name: '9x12 inches', multiplier: 1.2 },
    '11x14': { name: '11x14 inches', multiplier: 1.5 },
    '12x16': { name: '12x16 inches', multiplier: 1.8 }
};

const currency = "₹";

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializePortfolio();
    initializeOrderForm();
    initializeContactForm();
    initializeSkillBars();
    
    // Show home page by default
    showPage('home');
});

// Navigation functions
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // Close mobile menu
            if (navMenu) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Initialize page-specific functionality
    if (pageId === 'portfolio') {
        renderPortfolio();
    } else if (pageId === 'about') {
        animateSkillBars();
    }
}

// Portfolio functions
function initializePortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update current filter and render
            currentFilter = this.getAttribute('data-filter');
            renderPortfolio();
        });
    });
}

function renderPortfolio() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    const filteredData = currentFilter === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === currentFilter);
    
    galleryGrid.innerHTML = filteredData.map(item => `
        <div class="gallery-item" onclick="openPortfolioModal(${item.id})">
            <div class="gallery-image">
                <img src="${item.image}" alt="${item.title}">
                <div class="gallery-overlay">
                    <button class="view-btn">
                        <i class="fas fa-eye"></i>
                        View Details
                    </button>
                </div>
            </div>
            <div class="gallery-info">
                <h3 class="gallery-title">${item.title}</h3>
                <div class="gallery-rating">
                    ${renderStars(item.rating)}
                    <span class="rating-text">(${item.rating}/5)</span>
                </div>
                <p class="gallery-description">${item.description}</p>
                <div class="gallery-footer">
                    <span class="gallery-price">${currency}${item.price}</span>
                    <span class="gallery-size">${item.size}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star star"></i>';
        } else {
            stars += '<i class="fas fa-star star empty"></i>';
        }
    }
    return stars;
}

function openPortfolioModal(itemId) {
    const item = portfolioData.find(p => p.id === itemId);
    if (!item) return;
    
    const modal = document.getElementById('portfolio-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="modal-image">
        <div class="modal-info">
            <div class="modal-header">
                <h2 class="modal-title">${item.title}</h2>
                <span class="modal-price">${currency}${item.price}</span>
            </div>
            <div class="gallery-rating">
                ${renderStars(item.rating)}
                <span class="rating-text">(${item.rating}/5)</span>
            </div>
            <p class="modal-description">${item.description}</p>
            <div class="modal-details">
                <div class="modal-detail">
                    <h4>Size</h4>
                    <p>${item.size}</p>
                </div>
                <div class="modal-detail">
                    <h4>Duration</h4>
                    <p>${item.duration}</p>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="closeModal(); showPage('order');">Order Similar</button>
                <button class="btn btn-secondary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('portfolio-modal');
    modal.classList.remove('show');
}

// Order form functions
function initializeOrderForm() {
    const photoInput = document.getElementById('photo-input');
    const uploadArea = document.getElementById('upload-area');
    
    if (photoInput) {
        photoInput.addEventListener('change', handlePhotoUpload);
    }
    
    if (uploadArea) {
        // Drag and drop functionality
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#d97706';
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#d1d5db';
        });
        
        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#d1d5db';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                photoInput.files = files;
                handlePhotoUpload({ target: photoInput });
            }
        });
    }
    
    // Form input listeners for real-time updates
    const form = document.getElementById('order-form');
    if (form) {
        form.addEventListener('input', updateOrderSummary);
        form.addEventListener('change', updateOrderSummary);
    }
}

function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const uploadArea = document.getElementById('upload-area');
        uploadArea.innerHTML = `
            <i class="fas fa-check-circle" style="color: #10b981;"></i>
            <h3 style="color: #10b981;">Photo uploaded successfully!</h3>
            <p>File: ${file.name}</p>
            <button type="button" class="btn btn-secondary" onclick="document.getElementById('photo-input').click()">
                <i class="fas fa-upload"></i>
                Change Photo
            </button>
        `;
        orderData.photo = file;
    }
}

function nextStep() {
    if (currentStep < 3) {
        // Validate current step
        if (validateStep(currentStep)) {
            currentStep++;
            updateStepDisplay();
            if (currentStep === 3) {
                updateOrderSummary();
            }
        }
    } else {
        // Submit form
        submitOrder();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
    }
}

function validateStep(step) {
    const form = document.getElementById('order-form');
    const formData = new FormData(form);
    
    if (step === 1) {
        if (!orderData.photo) {
            alert('Please upload a photo before proceeding.');
            return false;
        }
    } else if (step === 2) {
        const required = ['name', 'email', 'portraitType', 'size'];
        for (let field of required) {
            if (!formData.get(field)) {
                alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
                return false;
            }
        }
    }
    
    return true;
}

function updateStepDisplay() {
    // Update progress steps
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index + 1 <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update form steps
    const formSteps = document.querySelectorAll('.form-step');
    formSteps.forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const stepText = document.getElementById('step-text');
    
    if (prevBtn) prevBtn.disabled = currentStep === 1;
    if (stepText) stepText.textContent = `Step ${currentStep} of 3`;
    
    if (nextBtn) {
        if (currentStep === 3) {
            nextBtn.innerHTML = '<i class="fas fa-check-circle"></i> Submit Order';
            nextBtn.className = 'btn btn-primary';
            nextBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
            nextBtn.className = 'btn btn-primary';
            nextBtn.style.background = '';
        }
    }
}

function updateOrderSummary() {
    const form = document.getElementById('order-form');
    const formData = new FormData(form);
    const summaryDiv = document.getElementById('order-summary');
    
    if (!summaryDiv) return;
    
    const portraitType = formData.get('portraitType');
    const size = formData.get('size');
    
    let price = 0;
    if (portraitType && portraitTypes[portraitType]) {
        price = portraitTypes[portraitType].price;
        if (size && sizes[size]) {
            price = Math.round(price * sizes[size].multiplier);
        }
    }
    
    summaryDiv.innerHTML = `
        <h3>Order Summary</h3>
        <div class="summary-section">
            <h4>Contact Information</h4>
            <p>Name: ${formData.get('name') || 'Not provided'}</p>
            <p>Email: ${formData.get('email') || 'Not provided'}</p>
            <p>Phone: ${formData.get('phone') || 'Not provided'}</p>
        </div>
        <div class="summary-section">
            <h4>Portrait Details</h4>
            <p>Type: ${portraitType ? portraitTypes[portraitType].name : 'Not selected'}</p>
            <p>Size: ${size ? sizes[size].name : 'Not selected'}</p>
            <p>Subjects: ${formData.get('subjects') || 'Not specified'}</p>
            ${formData.get('deadline') ? `<p>Deadline: ${formData.get('deadline')}</p>` : ''}
        </div>
        ${formData.get('specialRequests') ? `
            <div class="summary-section">
                <h4>Special Requests</h4>
                <p>${formData.get('specialRequests')}</p>
            </div>
        ` : ''}
        <div class="summary-total">
            <span class="total-label">Total Price:</span>
            <span class="total-price">${currency}${price}</span>
        </div>
    `;
}

function submitOrder() {
    const form = document.getElementById('order-form');
    const formData = new FormData(form);
    
    // Simulate form submission
    alert('Order submitted successfully! We will contact you within 24 hours.');
    
    // Reset form
    form.reset();
    currentStep = 1;
    updateStepDisplay();
    orderData = {};
    
    // Reset upload area
    const uploadArea = document.getElementById('upload-area');
    if (uploadArea) {
        uploadArea.innerHTML = `
            <i class="fas fa-upload"></i>
            <h3>Choose a high-quality photo</h3>
            <p>JPG, PNG, or JPEG. Maximum file size: 10MB</p>
            <button type="button" class="btn btn-primary" onclick="document.getElementById('photo-input').click()">
                <i class="fas fa-upload"></i>
                Select Photo
            </button>
        `;
    }
}

// Contact form functions
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            const formHeader = contactForm.querySelector('.form-header');
            const originalContent = formHeader.innerHTML;
            
            formHeader.innerHTML = `
                <i class="fas fa-check-circle" style="color: #10b981;"></i>
                <h2>Message Sent!</h2>
                <p>Thank you for your message. We'll get back to you soon.</p>
            `;
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                formHeader.innerHTML = originalContent;
            }, 3000);
        });
    }
}

// FAQ toggle function
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = button.querySelector('i');
    
    if (answer.classList.contains('show')) {
        answer.classList.remove('show');
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    } else {
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.classList.remove('show');
        });
        document.querySelectorAll('.faq-question i').forEach(ic => {
            ic.classList.remove('fa-chevron-up');
            ic.classList.add('fa-chevron-down');
        });
        
        // Open this FAQ
        answer.classList.add('show');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    }
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading states for better UX
function showLoading(element) {
    const originalContent = element.innerHTML;
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    element.disabled = true;
    
    return () => {
        element.innerHTML = originalContent;
        element.disabled = false;
    };
}

// Initialize tooltips and other interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click ripple effect
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);