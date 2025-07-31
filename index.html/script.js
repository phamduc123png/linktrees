let cart = [];
let total = 0;

function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  total += price;
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');
  cartList.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.price.toLocaleString()}đ`;
    cartList.appendChild(li);
  });
  totalElement.textContent = total.toLocaleString();
}
