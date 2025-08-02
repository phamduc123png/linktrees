const products = [
  {
    id: 1,
    name: "Smartphone X100",
    price: 799.99,
    image: "../10_1724729664.png",
    description: "Experience the future in the palm of your hand with the Smartphone X100. Featuring a stunning 6.7-inch OLED display, this device delivers exceptional visuals with vibrant colors and deep blacks. Capture life's moments with the advanced triple-camera system, including a 108MP main sensor, 12MP ultra-wide lens, and 8MP telephoto lens with 3x optical zoom. Powered by the latest Snapdragon 8 Gen 2 processor, enjoy seamless performance for gaming, multitasking, and productivity. With 5G connectivity, you'll stay connected at lightning-fast speeds. The 5000mAh battery ensures all-day usage, while 67W fast charging gets you back to full power in no time.",
    category: "Electronics",
    availability: "In Stock",
    reviews: [
      { author: "Alex Johnson", date: "2023-10-15", rating: 5, content: "Absolutely love this phone! The camera quality is outstanding." },
      { author: "Sam Wilson", date: "2023-09-22", rating: 4, content: "Great performance and battery life. Highly recommended." }
    ]
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 199.99,
    image: "../download (1).jpg",
    description: "Immerse yourself in premium sound with our Wireless Headphones. These over-ear headphones feature active noise cancellation technology that blocks out distractions, allowing you to focus on what matters most. With 40mm drivers, experience rich, detailed audio across all frequencies. The comfortable memory foam ear cushions ensure a perfect seal for maximum noise isolation, while the adjustable headband provides a secure, personalized fit. Enjoy up to 30 hours of continuous playback on a single charge, with an additional 20 hours provided by the sleek charging case. Bluetooth 5.2 ensures stable, high-quality wireless connectivity up to 30 feet. The built-in microphone delivers clear call quality, making these headphones perfect for both music and calls.",
    category: "Audio",
    availability: "In Stock",
    reviews: [
      { author: "Taylor Smith", date: "2023-11-02", rating: 5, content: "Best headphones I've ever owned. The noise cancellation is incredible." },
      { author: "Jordan Lee", date: "2023-10-18", rating: 4, content: "Excellent sound quality and very comfortable for long listening sessions." }
    ]
  },
  {
    id: 3,
    name: "Smartwatch Pro",
    price: 299.99,
    image: "https://via.placeholder.com/300x180?text=Smartwatch+Pro",
    description: "Stay connected and track your fitness goals with the Smartwatch Pro. This sleek wearable features a vibrant 1.78-inch AMOLED display that's always visible and easy to read in any lighting condition. Track over 100 workout modes, monitor your heart rate, blood oxygen levels, and sleep patterns with advanced health sensors. Receive notifications for calls, texts, emails, and social media directly on your wrist. With built-in GPS, track your runs, walks, and bike rides without needing your phone. The 30-day battery life means you can go weeks without charging. Water-resistant up to 50 meters, it's perfect for swimming and other water activities. Compatible with both iOS and Android devices.",
    category: "Wearables",
    availability: "Limited Stock",
    reviews: [
      { author: "Morgan Reed", date: "2023-11-10", rating: 5, content: "Perfect for tracking my fitness goals. The battery life is amazing." },
      { author: "Casey Brown", date: "2023-10-30", rating: 4, content: "Great features and sleek design. Highly recommend for fitness enthusiasts." }
    ]
  },
  {
    id: 4,
    name: "Laptop Ultra",
    price: 1299.99,
    image: "https://via.placeholder.com/300x180?text=Laptop+Ultra",
    description: "Powerful performance meets elegant design in the Laptop Ultra. Featuring a stunning 14-inch 4K OLED touchscreen display with vibrant colors and deep contrast, this laptop delivers an immersive visual experience. Powered by the latest Intel Core i7 processor and 16GB of RAM, tackle demanding tasks with ease. The 1TB SSD provides lightning-fast storage and ample space for all your files. With up to 12 hours of battery life, work or play all day without interruption. The precision-engineered aluminum chassis is both durable and lightweight at just 3.2 pounds. Connect to multiple displays with Thunderbolt 4 ports, or wirelessly with Wi-Fi 6E. The backlit keyboard and precision touchpad ensure comfortable, accurate input. Perfect for professionals, students, and creatives.",
    category: "Computers",
    availability: "In Stock",
    reviews: [
      { author: "Riley Kim", date: "2023-11-05", rating: 5, content: "Incredible performance and stunning display. Worth every penny." },
      { author: "Quinn Davis", date: "2023-10-25", rating: 5, content: "The perfect balance of power and portability. Highly recommended." }
    ]
  },
];

const productListEl = document.getElementById("product-list");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");
const cartSection = document.getElementById("cart");
const cartLink = document.getElementById("cart-link");
const checkoutBtn = document.getElementById("checkout-btn");
const closeCartBtn = document.getElementById("close-cart-btn");

let cart = [];

function renderProducts() {
  products.forEach((product) => {
    const productEl = document.createElement("div");
    productEl.className = "product";
    productEl.tabIndex = 0;
    productEl.innerHTML = `
      <a href="product-detail.html?id=${product.id}" class="product-link">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button aria-label="Add ${product.name} to cart">Add to Cart</button>
      </a>
    `;
    const button = productEl.querySelector("button");
    button.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product.id);
    });
    
    // Add click event to the entire product element
    productEl.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") {
        window.location.href = `product-detail.html?id=${product.id}`;
      }
    });
    
    productListEl.appendChild(productEl);
  });
}

function loadProductDetails(productId) {
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    // Redirect to products page if product not found
    window.location.href = 'index.html#products';
    return;
  }
  
  // Update product detail page elements
  document.getElementById('product-image').src = product.image;
  document.getElementById('product-image').alt = product.name;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-category').textContent = product.category;
  document.getElementById('product-availability').textContent = product.availability;
  
  // Update page title
  document.title = `${product.name} - ProSales`;
  
  // Render reviews
  const reviewsContainer = document.getElementById('reviews-container');
  reviewsContainer.innerHTML = '';
  
  if (product.reviews && product.reviews.length > 0) {
    product.reviews.forEach(review => {
      const reviewEl = document.createElement('div');
      reviewEl.className = 'review';
      reviewEl.innerHTML = `
        <div class="review-header">
          <span class="review-author">${review.author}</span>
          <span class="review-date">${review.date}</span>
        </div>
        <div class="review-rating">
          ${'★'.repeat(review.rating)}
          ${'☆'.repeat(5 - review.rating)}
        </div>
        <div class="review-content">
          ${review.content}
        </div>
      `;
      reviewsContainer.appendChild(reviewEl);
    });
  } else {
    reviewsContainer.innerHTML = '<p>No reviews yet. Be the first to review this product!</p>';
  }
  
  // Add to cart button event listener
  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const quantity = parseInt(document.getElementById('quantity').value);
    for (let i = 0; i < quantity; i++) {
      addToCart(productId);
    }
    alert(`${quantity} ${product.name} added to cart!`);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cartItem = cart.find((item) => item.product.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.product.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  let totalCount = 0;

  cart.forEach(({ product, quantity }) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} x${quantity}`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute("aria-label", `Remove ${product.name} from cart`);
    removeBtn.addEventListener("click", () => removeFromCart(product.id));
    li.appendChild(removeBtn);
    cartItemsEl.appendChild(li);

    total += product.price * quantity;
    totalCount += quantity;
  });

  cartTotalEl.textContent = total.toFixed(2);
  cartCountEl.textContent = totalCount;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<li>Your cart is empty.</li>";
  }
}

function toggleCartVisibility() {
  if (cartSection.classList.contains("hidden")) {
    cartSection.classList.remove("hidden");
  } else {
    cartSection.classList.add("hidden");
  }
}

cartLink.addEventListener("click", (e) => {
  e.preventDefault();
  toggleCartVisibility();
});

closeCartBtn.addEventListener("click", () => {
  cartSection.classList.add("hidden");
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  alert("Thank you for your purchase!");
  cart = [];
  updateCartUI();
  cartSection.classList.add("hidden");
});

document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you for contacting us!");
  e.target.reset();
});

renderProducts();
updateCartUI();
