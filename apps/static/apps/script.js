// Sample product data
const products = [
    {
        id: 1,
        name: "MacBook Pro 14\"",
        description: "Apple M2 chip bilan yangi MacBook Pro. Professional ishlar uchun ideal.",
        price: 2500000,
        image: "/placeholder.svg?height=250&width=300",
        category: "electronics",
        rating: 4.8,
        inStock: true
    },
    {
        id: 2,
        name: "Nike Air Max 270",
        description: "Zamonaviy dizayn va yuqori sifatli materiallar bilan tayyorlangan krossovka.",
        price: 450000,
        image: "/placeholder.svg?height=250&width=300",
        category: "clothing",
        rating: 4.6,
        inStock: true
    },
    {
        id: 3,
        name: "JavaScript: The Good Parts",
        description: "Douglas Crockford tomonidan yozilgan JavaScript dasturlash tili haqida kitob.",
        price: 85000,
        image: "/placeholder.svg?height=250&width=300",
        category: "books",
        rating: 4.7,
        inStock: true
    },
    {
        id: 4,
        name: "Samsung 55\" QLED TV",
        description: "4K Ultra HD, Smart TV funksiyalari bilan Samsung QLED televizor.",
        price: 1200000,
        image: "/placeholder.svg?height=250&width=300",
        category: "electronics",
        rating: 4.5,
        inStock: true
    },
    {
        id: 5,
        name: "Adidas Ultraboost 22",
        description: "Yugurish uchun mo'ljallangan professional sport poyabzali.",
        price: 380000,
        image: "/placeholder.svg?height=250&width=300",
        category: "clothing",
        rating: 4.4,
        inStock: true
    },
    {
        id: 6,
        name: "Clean Code",
        description: "Robert C. Martin tomonidan yozilgan dasturlash haqida mashhur kitob.",
        price: 95000,
        image: "/placeholder.svg?height=250&width=300",
        category: "books",
        rating: 4.9,
        inStock: true
    },
    {
        id: 7,
        name: "Dyson V15 Detect",
        description: "Simsiz changyutgich, yuqori quvvatli va zamonaviy texnologiyalar bilan.",
        price: 850000,
        image: "/placeholder.svg?height=250&width=300",
        category: "home",
        rating: 4.6,
        inStock: true
    },
    {
        id: 8,
        name: "iPhone 15 Pro",
        description: "Apple'ning eng yangi smartfoni, A17 Pro chip va professional kamera bilan.",
        price: 1800000,
        image: "/placeholder.svg?height=250&width=300",
        category: "electronics",
        rating: 4.8,
        inStock: true
    },
    {
        id: 9,
        name: "Levi's 501 Jeans",
        description: "Klassik Levi's jinsi shim, yuqori sifatli denim materialdan.",
        price: 180000,
        image: "/placeholder.svg?height=250&width=300",
        category: "clothing",
        rating: 4.3,
        inStock: true
    },
    {
        id: 10,
        name: "You Don't Know JS",
        description: "Kyle Simpson tomonidan yozilgan JavaScript chuqur o'rganish uchun kitoblar to'plami.",
        price: 120000,
        image: "/placeholder.svg?height=250&width=300",
        category: "books",
        rating: 4.8,
        inStock: true
    }
];

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    loadCartItems();
    
    // Load content based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            loadFeaturedProducts();
            break;
        case 'products.html':
            loadAllProducts();
            break;
        case 'product-detail.html':
            loadProductDetail();
            break;
        case 'checkout.html':
            loadCheckoutItems();
            setupCheckoutForm();
            break;
    }
});

// Load featured products for homepage
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    const featuredProducts = products.slice(0, 6);
    featuredContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Load all products for products page
function loadAllProducts() {
    const productsContainer = document.getElementById('all-products');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = products.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" onclick="goToProductDetail({product.id})">
            <img src="{product.image}" alt="{product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">{product.name}</h3>
                <p class="product-description">{product.description}</p>
                <div class="product-rating">
                    <div class="stars">{generateStars(product.rating)}</div>
                    <span>({product.rating})</span>
                </div>
                <div class="product-price">${formatPrice(product.price)}</div>
                <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Savatga qo'shish
                </button>
            </div>
        </div>
    `;
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    loadCartItems();
    
    // Show success message
    showMessage('Mahsulot savatga qo\'shildi!', 'success');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    loadCartItems();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCart();
        updateCartCount();
        loadCartItems();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Load cart items in sidebar
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Savatcha bo\'sh</p>';
        if (cartTotal) cartTotal.textContent = '0';
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity" value="${item.quantity}" min="1" 
                           onchange="updateQuantity(${item.id}, parseInt(this.value))">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 0.5rem; color: #e74c3c;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) cartTotal.textContent = formatPrice(total);
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
    }
}

// Go to checkout
function goToCheckout() {
    if (cart.length === 0) {
        showMessage('Savatcha bo\'sh!', 'error');
        return;
    }
    window.location.href = 'checkout.html';
}

// Go to product detail
function goToProductDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Load product detail page
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.getElementById('product-detail-content').innerHTML = '<p>Mahsulot topilmadi</p>';
        return;
    }
    
    document.getElementById('product-category').textContent = getCategoryName(product.category);
    
    document.getElementById('product-detail-content').innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <h1>${product.name}</h1>
            <div class="product-rating">
                <div class="stars">${generateStars(product.rating)}</div>
                <span>(${product.rating} yulduz)</span>
            </div>
            <div class="product-detail-price">${formatPrice(product.price)}</div>
            <p class="product-detail-description">${product.description}</p>
            <div class="product-actions">
                <div class="quantity-selector">
                    <label>Miqdor:</label>
                    <button class="quantity-btn" onclick="changeDetailQuantity(-1)">-</button>
                    <input type="number" id="detail-quantity" value="1" min="1" class="quantity">
                    <button class="quantity-btn" onclick="changeDetailQuantity(1)">+</button>
                </div>
                <button class="add-to-cart" onclick="addToCartFromDetail(${product.id})" style="flex: 1; margin-left: 1rem;">
                    <i class="fas fa-cart-plus"></i> Savatga qo'shish
                </button>
            </div>
        </div>
    `;
    
    // Load related products
    loadRelatedProducts(product.category, product.id);
}

// Change quantity in product detail
function changeDetailQuantity(change) {
    const quantityInput = document.getElementById('detail-quantity');
    const currentValue = parseInt(quantityInput.value);
    const newValue = Math.max(1, currentValue + change);
    quantityInput.value = newValue;
}

// Add to cart from product detail
function addToCartFromDetail(productId) {
    const quantity = parseInt(document.getElementById('detail-quantity').value);
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartCount();
    loadCartItems();
    showMessage(`${quantity} ta mahsulot savatga qo'shildi!`, 'success');
}

// Load related products
function loadRelatedProducts(category, excludeId) {
    const relatedContainer = document.getElementById('related-products');
    if (!relatedContainer) return;
    
    const relatedProducts = products
        .filter(p => p.category === category && p.id !== excludeId)
        .slice(0, 4);
    
    relatedContainer.innerHTML = relatedProducts.map(product => createProductCard(product)).join('');
}

// Get category name in Uzbek
function getCategoryName(category) {
    const categories = {
        'electronics': 'Elektronika',
        'clothing': 'Kiyim',
        'books': 'Kitoblar',
        'home': 'Uy uchun'
    };
    return categories[category] || category;
}

// Filter products by category
function filterByCategory(category) {
    window.location.href = `products.html?category=${category}`;
}

// Filter and sort products
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    
    if (!categoryFilter || !priceFilter) return;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (categoryFilter.value) {
        filteredProducts = filteredProducts.filter(p => p.category === categoryFilter.value);
    }
    
    // Filter by price
    if (priceFilter.value) {
        const [min, max] = priceFilter.value.split('-').map(v => v.replace('+', ''));
        filteredProducts = filteredProducts.filter(p => {
            if (max) {
                return p.price >= parseInt(min) && p.price <= parseInt(max);
            } else {
                return p.price >= parseInt(min);
            }
        });
    }
    
    displayFilteredProducts(filteredProducts);
}

// Sort products
function sortProducts() {
    const sortFilter = document.getElementById('sort-filter');
    const productsContainer = document.getElementById('all-products');
    
    if (!sortFilter || !productsContainer) return;
    
    let sortedProducts = [...products];
    
    // Apply current filters first
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    
    if (categoryFilter && categoryFilter.value) {
        sortedProducts = sortedProducts.filter(p => p.category === categoryFilter.value);
    }
    
    if (priceFilter && priceFilter.value) {
        const [min, max] = priceFilter.value.split('-').map(v => v.replace('+', ''));
        sortedProducts = sortedProducts.filter(p => {
            if (max) {
                return p.price >= parseInt(min) && p.price <= parseInt(max);
            } else {
                return p.price >= parseInt(min);
            }
        });
    }
    
    // Sort products
    switch (sortFilter.value) {
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    displayFilteredProducts(sortedProducts);
}

// Display filtered products
function displayFilteredProducts(products) {
    const productsContainer = document.getElementById('all-products');
    if (!productsContainer) return;
    
    if (products.length === 0) {
        productsContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Hech qanday mahsulot topilmadi</p>';
        return;
    }
    
    productsContainer.innerHTML = products.map(product => createProductCard(product)).join('');
}

// Load checkout items
function loadCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const subtotalElement = document.getElementById('subtotal');
    const finalTotalElement = document.getElementById('final-total');
    
    if (!checkoutItemsContainer) return;
    
    if (cart.length === 0) {
        window.location.href = 'products.html';
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 25000;
    const finalTotal = subtotal + shipping;
    
    checkoutItemsContainer.innerHTML = cart.map(item => `
        <div class="order-item">
            <div>
                <strong>${item.name}</strong><br>
                <small>Miqdor: ${item.quantity}</small>
            </div>
            <div>${formatPrice(item.price * item.quantity)}</div>
        </div>
    `).join('');
    
    if (subtotalElement) subtotalElement.textContent = formatPrice(subtotal);
    if (finalTotalElement) finalTotalElement.textContent = formatPrice(finalTotal);
}

// Setup checkout form
function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const cardDetails = document.getElementById('card-details');
    
    if (!checkoutForm) return;
    
    // Handle payment method change
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (cardDetails) {
                cardDetails.style.display = this.value === 'card' ? 'block' : 'none';
            }
        });
    });
    
    // Handle form submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const formData = new FormData(checkoutForm);
        const data = Object.fromEntries(formData);
        
        if (!validateCheckoutForm(data)) {
            return;
        }
        
        // Simulate order processing
        processOrder(data);
    });
    
    // Format card number input
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    // Format expiry date input
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
}

// Validate checkout form
function validateCheckoutForm(data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showMessage(`${getFieldName(field)} maydonini to'ldiring`, 'error');
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showMessage('Email manzilini to\'g\'ri kiriting', 'error');
        return false;
    }
    
    // Validate card details if card payment is selected
    if (data.paymentMethod === 'card') {
        if (!data.cardNumber || !data.expiryDate || !data.cvv) {
            showMessage('Karta ma\'lumotlarini to\'liq kiriting', 'error');
            return false;
        }
        
        if (data.cardNumber.replace(/\s/g, '').length < 16) {
            showMessage('Karta raqami noto\'g\'ri', 'error');
            return false;
        }
        
        if (data.cvv.length < 3) {
            showMessage('CVV kodi noto\'g\'ri', 'error');
            return false;
        }
    }
    
    return true;
}

// Get field name in Uzbek
function getFieldName(field) {
    const fieldNames = {
        'firstName': 'Ism',
        'lastName': 'Familiya',
        'email': 'Email',
        'phone': 'Telefon',
        'address': 'Manzil',
        'city': 'Shahar'
    };
    return fieldNames[field] || field;
}

// Process order
function processOrder(orderData) {
    // Show loading
    const submitBtn = document.querySelector('.place-order-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buyurtma berilmoqda...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Clear cart
        cart = [];
        saveCart();
        updateCartCount();
        
        // Show success message
        showMessage('Buyurtma muvaffaqiyatli berildi! Tez orada siz bilan bog\'lanamiz.', 'success');
        
        // Redirect to home page after 3 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
        
    }, 2000);
}

// Show message
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    // Insert at top of main content
    const main = document.querySelector('main') || document.body;
    main.insertBefore(messageDiv, main.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Initialize filters on products page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on products page and have category filter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam) {
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.value = categoryParam;
            filterProducts();
        }
    }
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Search functionality (basic implementation)
function performSearch() {
    const searchTerm = prompt('Qidirish:');
    if (searchTerm) {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (filteredProducts.length > 0) {
            // If on products page, show filtered results
            if (window.location.pathname.includes('products.html')) {
                displayFilteredProducts(filteredProducts);
            } else {
                // Redirect to products page with search results
                sessionStorage.setItem('searchResults', JSON.stringify(filteredProducts));
                window.location.href = 'products.html';
            }
        } else {
            showMessage('Hech narsa topilmadi', 'error');
        }
    }
}

// Add search event listener
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Check for search results from sessionStorage
    const searchResults = sessionStorage.getItem('searchResults');
    if (searchResults && window.location.pathname.includes('products.html')) {
        const results = JSON.parse(searchResults);
        displayFilteredProducts(results);
        sessionStorage.removeItem('searchResults');
        
        // Show search message
        showMessage(`${results.length} ta mahsulot topildi`, 'success');
    }
});