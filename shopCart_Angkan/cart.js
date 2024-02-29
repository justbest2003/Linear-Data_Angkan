const cart = {};

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        const price = parseFloat(button.getAttribute('data-price'));
        if (!cart[productId]) {
            cart[productId] = { quantity: 1, price: price };
        } else {
            cart[productId].quantity++;
        }
        updateCartDisplay();
    });
});

document.querySelectorAll(".subtract-from-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-product-id");
    const price = parseFloat(button.getAttribute("data-price"));
    if (cart[productId]) {
      if (cart[productId].quantity > 0) {
        cart[productId].quantity--;
        if (cart[productId].quantity === 0) {
          delete cart[productId]; // ลบสินค้าออกจากตะกร้าหากจำนวนเท่ากับศูนย์
        }
        updateCartDisplay();
      }
    }
  });
});

function updateCartDisplay() {
  const cartElement = document.getElementById("cart-items");
  cartElement.innerHTML = "";

  let totalPrice = 0;
  for (const productId in cart) {
    const item = cart[productId];
    const itemTotalPrice = item.quantity * item.price;
    totalPrice += itemTotalPrice;

    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = `Product ${productId} : ${item.quantity} x $${item.price} = $${itemTotalPrice}`;
    cartElement.appendChild(listItem);
  }

  if (Object.keys(cart).length === 0) {
    const emptyCartMessage = document.createElement("li");
    emptyCartMessage.classList.add("list-group-item");
    emptyCartMessage.textContent = "No items in cart.";
    cartElement.appendChild(emptyCartMessage);
  } else {
    const totalPriceElement = document.createElement("li");
    totalPriceElement.classList.add("list-group-item", "fw-bold");
    totalPriceElement.textContent = `Total Price: $${totalPrice}`;
    cartElement.appendChild(totalPriceElement);
  }
}

document.getElementById("createPDFButton").addEventListener("click", () => {
  const element = document.getElementById("cart").cloneNode(true);
  const opt = {
    margin: 2,
    filename: "shopping_cart.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { format: [100, 80], orientation: "landscape" },
  };

  // สร้าง PDF จาก HTML ของตะกร้าสินค้า
  html2pdf().from(element).set(opt).save();
});

