const products = [
  {
    id: 1,
    name: "Smartphone X100",
    price: 799.99,
    image: "../10_1724729664.png",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 199.99,
    image: "../download (1).jpg",
  },
  {
    id: 3,
    name: "Smartwatch Pro",
    price: 299.99,
    image: "https://via.placeholder.com/300x180?text=Smartwatch+Pro",
  },
  {
    id: 4,
    name: "Laptop Ultra",
    price: 1299.99,
    image: "https://via.placeholder.com/300x180?text=Laptop+Ultra",
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
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button aria-label="Add ${product.name} to cart">Add to Cart</button>
    `;
    const button = productEl.querySelector("button");
    button.addEventListener("click", () => addToCart(product.id));
    productListEl.appendChild(productEl);
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
