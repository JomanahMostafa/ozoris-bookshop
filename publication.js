// OSIRIS BOOKSHOP - Publications Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initPublicationsPage();
});

function initPublicationsPage() {
    initParticleSystem();
    initAdvancedSearch();
    initBooksView();
    initBooksData();
    initModal();
    initPagination();
}

// Initialize particle system for background
function initParticleSystem() {
    const particlesContainer = document.getElementById('particlesContainer');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random properties
    const size = Math.random() * 4 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 10 + 15;
    const color = getRandomParticleColor();

    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.background = color;

    container.appendChild(particle);
}

function getRandomParticleColor() {
    const colors = [
        'rgba(0, 212, 255, 0.3)',
        'rgba(255, 215, 0, 0.3)',
        'rgba(255, 107, 53, 0.3)',
        'rgba(157, 78, 237, 0.3)',
        'rgba(78, 205, 196, 0.3)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Advanced Search functionality
function initAdvancedSearch() {
    const toggleBtn = document.querySelector('.toggle-search-btn');
    const searchForm = document.getElementById('searchForm');
    const searchSubmitBtn = document.querySelector('.search-submit-btn');
    const searchResetBtn = document.querySelector('.search-reset-btn');

    // Toggle search form
    toggleBtn.addEventListener('click', function() {
        searchForm.classList.toggle('active');
        this.innerHTML = searchForm.classList.contains('active') ?
            '<i class="fas fa-chevron-up"></i>' :
            '<i class="fas fa-chevron-down"></i>';
    });

    // Submit search
    searchSubmitBtn.addEventListener('click', function() {
        performSearch();
    });

    // Reset search
    searchResetBtn.addEventListener('click', function() {
        document.querySelectorAll('#searchForm input, #searchForm select').forEach(input => {
            if (input.type !== 'submit' && input.type !== 'button') {
                input.value = '';
            }
        });
        performSearch();
    });

    // Add real-time search for text inputs
    document.querySelectorAll('#searchForm input[type="text"]').forEach(input => {
        input.addEventListener('input', debounce(performSearch, 500));
    });

    // Add change event for selects
    document.querySelectorAll('#searchForm select').forEach(select => {
        select.addEventListener('change', performSearch);
    });
}

// Books View Toggle
function initBooksView() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const booksGrid = document.getElementById('booksGrid');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const viewType = this.getAttribute('data-view');
            booksGrid.classList.toggle('list-view', viewType === 'list');
        });
    });

    // Sort functionality
    const sortSelect = document.getElementById('sortBy');
    sortSelect.addEventListener('change', function() {
        sortBooks(this.value);
    });
}

// Initialize books data
function initBooksData() {
    // Generate sample books data
    const books = generateSampleBooks(50);
    displayBooks(books);
    initFilters(books);
}

function generateSampleBooks(count) {
    const categories = ['dictionaries', 'languages', 'academic', 'scientific', 'children', 'literature'];
    const publishers = ['oxford', 'cambridge', 'springer', 'elsevier', 'dar-almaarif'];
    const languages = ['arabic', 'english', 'french', 'german', 'spanish'];
    const editions = ['1', '2', '3', '4', '5+'];

    const bookTitles = [
        'قاموس أكسفورد المتقدم', 'تعلم الإنجليزية في 30 يوم', 'الفيزياء الحديثة',
        'الرياضيات المتقدمة', 'قواعد اللغة العربية', 'علم النفس التربوي',
        'التاريخ الإسلامي', 'الكيمياء العضوية', 'علم الأحياء الدقيقة',
        'أساسيات البرمجة', 'التسويق الرقمي', 'إدارة الأعمال', 'التربية الخاصة',
        'الطب التشخيصي', 'الهندسة الكهربائية', 'الفلسفة المعاصرة', 'الأدب العربي الحديث',
        'الصحة النفسية', 'التغذية العلاجية', 'الاقتصاد الإسلامي', 'القانون الدولي',
        'التصميم الجرافيكي', 'الذكاء الاصطناعي', 'علم البيانات', 'الطب البديل',
        'التربية البيئية', 'الإعلام الرقمي', 'العلاقات الدولية', 'التنمية البشرية',
        'العمارة الإسلامية', 'الطب النبوي', 'الفنون الجميلة', 'علم الاجتماع',
        'الترجمة المتخصصة', 'اللغويات التطبيقية', 'الاستثمار العقاري', 'التسويق الإلكتروني',
        'الصحة العامة', 'التعلم الذكي', 'الإدارة المالية', 'التخطيط الاستراتيجي',
        'الرعاية التلطيفية', 'علم الأعصاب', 'البيوتكنولوجي', 'الطاقة المتجددة',
        'الأمن السيبراني', 'إنترنت الأشياء', 'الواقع الافتراضي', 'Blockchain'
    ];

    const bookAuthors = [
        'أحمد محمد', 'سارة عبد الله', 'محمد علي', 'فاطمة الزهراء',
        'عمر خالد', 'ليلى أحمد', 'يوسف حسن', 'نورا سعيد',
        'خالد أمين', 'هناء محمود', 'طارق جمال', 'إيمان سعد',
        'مصطفى كامل', 'سميرة عبد الرحمن', 'حسام الدين', 'أمينة فاروق',
        'بسام رضوان', 'جمال إبراهيم', 'دعاء سالم', 'رامي ناصر'
    ];

    const books = [];

    for (let i = 0; i < count; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const publisher = publishers[Math.floor(Math.random() * publishers.length)];
        const language = languages[Math.floor(Math.random() * languages.length)];
        const edition = editions[Math.floor(Math.random() * editions.length)];

        const title = bookTitles[Math.floor(Math.random() * bookTitles.length)];
        const author = bookAuthors[Math.floor(Math.random() * bookAuthors.length)];

        const basePrice = Math.random() * 200 + 50;
        const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0;
        const finalPrice = basePrice - (basePrice * discount / 100);

        const isNew = Math.random() > 0.8;
        const isBestseller = Math.random() > 0.9;

        books.push({
            id: i + 1,
            title: title,
            author: author,
            category: category,
            publisher: publisher,
            language: language,
            edition: edition,
            isbn: `978-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${Math.floor(Math.random() * 10)}`,
            barcode: `200${Math.floor(Math.random() * 100000000000).toString().padStart(11, '0')}`,
            description: `كتاب متخصص في مجال ${getCategoryName(category)} يقدم محتوى قيماً للمهتمين بهذا المجال. يحتوي على أحدث المعلومات والدراسات في هذا التخصص.`,
            price: finalPrice.toFixed(2),
            originalPrice: discount > 0 ? basePrice.toFixed(2) : null,
            discount: discount,
            isNew: isNew,
            isBestseller: isBestseller,
            image: `https://via.placeholder.com/300x400/1a1a1a/ffffff?text=${encodeURIComponent(title)}`,
            publishDate: new Date(Date.now() - Math.floor(Math.random() * 365 * 3 * 24 * 60 * 60 * 1000))
        });
    }

    return books;
}

function getCategoryName(category) {
    const categories = {
        'dictionaries': 'قواميس',
        'languages': 'لغات',
        'academic': 'أكاديمية',
        'scientific': 'علمية',
        'children': 'أطفال',
        'literature': 'أدب'
    };
    return categories[category] || category;
}

function getPublisherName(publisher) {
    const publishers = {
        'oxford': 'أكسفورد',
        'cambridge': 'كامبريدج',
        'springer': 'شبرنجر',
        'elsevier': 'إلسفير',
        'dar-almaarif': 'دار المعارف'
    };
    return publishers[publisher] || publisher;
}

function getLanguageName(language) {
    const languages = {
        'arabic': 'العربية',
        'english': 'الإنجليزية',
        'french': 'الفرنسية',
        'german': 'الألمانية',
        'spanish': 'الإسبانية'
    };
    return languages[language] || language;
}

// Display books in grid
function displayBooks(books) {
    const booksGrid = document.getElementById('booksGrid');
    const viewType = document.querySelector('.view-btn.active').getAttribute('data-view');

    booksGrid.innerHTML = books.map(book => `
        <div class="book-card ${viewType}-view" data-id="${book.id}" data-category="${book.category}" data-publisher="${book.publisher}" data-language="${book.language}" data-edition="${book.edition}">
            <div class="book-image">
                <img src="${book.image}" alt="${book.title}">
                <div class="book-badges">
                    ${book.isNew ? '<span class="book-badge badge-new">جديد</span>' : ''}
                    ${book.isBestseller ? '<span class="book-badge badge-bestseller">الأكثر مبيعاً</span>' : ''}
                    ${book.discount > 0 ? `<span class="book-badge badge-discount">خصم ${book.discount}%</span>` : ''}
                </div>
            </div>
            <div class="book-content">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-meta">
                    <span><i class="fas fa-tag"></i> ${getCategoryName(book.category)}</span>
                    <span><i class="fas fa-building"></i> ${getPublisherName(book.publisher)}</span>
                    <span><i class="fas fa-language"></i> ${getLanguageName(book.language)}</span>
                </div>
                <p class="book-description">${book.description}</p>
                <div class="book-footer">
                    <div class="book-price">
                        ${book.originalPrice ? `
                            <span class="original-price">${book.originalPrice} ج.م</span>
                        ` : ''}
                        ${book.price} ج.م
                    </div>
                    <div class="book-actions">
                        <button class="action-btn quick-view-btn" data-book-id="${book.id}">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn add-to-cart-btn" data-book-id="${book.id}">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add event listeners
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookId = this.getAttribute('data-book-id');
            showBookDetails(bookId);
        });
    });
    
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookId = this.getAttribute('data-book-id');
            addToCart(bookId);
        });
    });
    
    // Animate books
    animateBooks();
}

function animateBooks() {
    const books = document.querySelectorAll('.book-card');
    books.forEach((book, index) => {
        book.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize filters
function initFilters(books) {
    window.booksData = books; // Store books data globally
}

// Perform search
function performSearch() {
    const searchParams = {
        name: document.getElementById('bookName').value.toLowerCase(),
        category: document.getElementById('bookCategory').value,
        publisher: document.getElementById('bookPublisher').value,
        language: document.getElementById('bookLanguage').value,
        edition: document.getElementById('bookEdition').value,
        isbn: document.getElementById('bookISBN').value,
        barcode: document.getElementById('bookBarcode').value,
        author: document.getElementById('bookAuthor').value.toLowerCase()
    };
    
    const filteredBooks = window.booksData.filter(book => {
        return (
            (searchParams.name === '' || book.title.toLowerCase().includes(searchParams.name)) &&
            (searchParams.category === '' || book.category === searchParams.category) &&
            (searchParams.publisher === '' || book.publisher === searchParams.publisher) &&
            (searchParams.language === '' || book.language === searchParams.language) &&
            (searchParams.edition === '' || book.edition === searchParams.edition) &&
            (searchParams.isbn === '' || book.isbn.includes(searchParams.isbn)) &&
            (searchParams.barcode === '' || book.barcode.includes(searchParams.barcode)) &&
            (searchParams.author === '' || book.author.toLowerCase().includes(searchParams.author))
        );
    });
    
    displayBooks(filteredBooks);
}

// Sort books
function sortBooks(sortBy) {
    let sortedBooks = [...window.booksData];
    
    switch(sortBy) {
        case 'newest':
            sortedBooks.sort((a, b) => b.publishDate - a.publishDate);
            break;
        case 'oldest':
            sortedBooks.sort((a, b) => a.publishDate - b.publishDate);
            break;
        case 'price-low':
            sortedBooks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
        case 'price-high':
            sortedBooks.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
        case 'name':
            sortedBooks.sort((a, b) => a.title.localeCompare(b.title, 'ar'));
            break;
    }
    
    window.booksData = sortedBooks;
    displayBooks(sortedBooks);
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('bookModal');
    const closeBtn = document.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
}

function showBookDetails(bookId) {
    const book = window.booksData.find(b => b.id == bookId);
    const modal = document.getElementById('bookModal');
    const modalBody = document.querySelector('.modal-body');
    
    if (book) {
        modalBody.innerHTML = `
            <div class="book-details">
                <div class="book-detail-header">
                    <img src="${book.image}" alt="${book.title}" class="detail-image">
                    <div class="detail-info">
                        <h2>${book.title}</h2>
                        <p class="detail-author">${book.author}</p>
                        <div class="detail-price">
                            ${book.originalPrice ? `
                                <span class="original-price">${book.originalPrice} ج.م</span>
                            ` : ''}
                            <span class="current-price">${book.price} ج.م</span>
                            ${book.discount > 0 ? `<span class="discount-badge">خصم ${book.discount}%</span>` : ''}
                        </div>
                    </div>
                </div>
                
                <div class="book-detail-content">
                    <div class="detail-section">
                        <h4><i class="fas fa-info-circle"></i> معلومات الكتاب</h4>
                        <div class="detail-grid">
                            <div class="detail-item">
                                <span class="detail-label">التصنيف:</span>
                                <span class="detail-value">${getCategoryName(book.category)}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">الناشر:</span>
                                <span class="detail-value">${getPublisherName(book.publisher)}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">اللغة:</span>
                                <span class="detail-value">${getLanguageName(book.language)}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">الطبعة:</span>
                                <span class="detail-value">${book.edition}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">الرقم الدولي:</span>
                                <span class="detail-value">${book.isbn}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">الباركود:</span>
                                <span class="detail-value">${book.barcode}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-section">
                        <h4><i class="fas fa-file-alt"></i> الوصف</h4>
                        <p>${book.description}</p>
                    </div>
                </div>
                
                <div class="detail-actions">
                    <button class="detail-add-cart-btn">
                        <i class="fas fa-shopping-cart"></i>
                        أضف إلى السلة
                    </button>
                    <button class="detail-wishlist-btn">
                        <i class="fas fa-heart"></i>
                        المفضلة
                    </button>
                </div>
            </div>
        `;
        
        // Add event listener for add to cart button in modal
        document.querySelector('.detail-add-cart-btn').addEventListener('click', function() {
            addToCart(bookId);
            modal.classList.remove('show');
        });
        
        modal.classList.add('show');
    }
}

// Add to cart functionality
function addToCart(bookId) {
    const book = window.booksData.find(b => b.id == bookId);
    if (book) {
        // Here you would typically add to cart logic
        showNotification(`تم إضافة "${book.title}" إلى السلة`);
        
        // Update cart count
        updateCartCount();
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    let count = parseInt(cartCount.textContent) || 0;
    count++;
    cartCount.textContent = count;
    cartCount.style.display = 'flex';
}

// Pagination functionality
function initPagination() {
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    const pageNumbers = document.querySelectorAll('.page-number');
    
    pageNumbers.forEach(number => {
        number.addEventListener('click', function() {
            document.querySelectorAll('.page-number').forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            // Here you would load the appropriate page of results
        });
    });
    
    prevBtn.addEventListener('click', function() {
        if (!this.disabled) {
            // Go to previous page
        }
    });
    
    nextBtn.addEventListener('click', function() {
        // Go to next page
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: var(--gradient-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(-100px);
        opacity: 0;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);

    // Animate out after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(-100px)';
        notification.style.opacity = '0';

        // Remove from DOM after animation
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS for book details
const bookDetailsStyles = document.createElement('style');
bookDetailsStyles.textContent = `
    .book-details {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .book-detail-header {
        display: grid;
        grid-template-columns: 150px 1fr;
        gap: 2rem;
        align-items: start;
    }
    
    .detail-image {
        width: 150px;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .detail-info h2 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
        color: var(--accent-cyan);
    }
    
    .detail-author {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 1rem;
    }
    
    .detail-price {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .current-price {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--accent-gold);
    }
    
    .original-price {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.5);
        text-decoration: line-through;
    }
    
    .discount-badge {
        background: var(--accent-orange);
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.9rem;
        font-weight: 600;
    }
    
    .book-detail-content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .detail-section h4 {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        color: var(--accent-cyan);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .detail-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }
    
    .detail-item {
        display: flex;
        justify-content: space-between;
        padding: 0.8rem;
        background: rgba(42, 42, 42, 0.3);
        border-radius: 8px;
    }
    
    .detail-label {
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
    }
    
    .detail-value {
        color: var(--accent-cyan);
    }
    
    .detail-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
    }
    
    .detail-add-cart-btn,
    .detail-wishlist-btn {
        padding: 1rem 2rem;
        border: none;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        transition: var(--transition-smooth);
    }
    
    .detail-add-cart-btn {
        background: var(--gradient-primary);
        color: white;
    }
    
    .detail-add-cart-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.4);
    }
    
    .detail-wishlist-btn {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
        border: 1px solid var(--glass-border);
    }
    
    .detail-wishlist-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        color: white;
    }
    
    @media (max-width: 768px) {
        .book-detail-header {
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        .detail-image {
            justify-self: center;
        }
        
        .detail-grid {
            grid-template-columns: 1fr;
        }
        
        .detail-actions {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(bookDetailsStyles);