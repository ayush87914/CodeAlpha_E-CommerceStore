const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/login";
}

async function loadCart() {
    const container = document.getElementById("cartItems");

    const res = await fetch("/api/cart", {
        headers: { "Authorization": "Bearer " + token }
    });
    const items = await res.json();

    if (items.length === 0) {
        container.innerHTML = "<p>Cart is empty</p>";
        return;
    }

    let total = 0;
    container.innerHTML = "";

    items.forEach(item => {
        total += item.price * item.quantity;
        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image || 'https://placehold.co/100x100?text=' + encodeURIComponent(item.name)}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>₹${item.price} x ${item.quantity}</p>
                </div>
                <button onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
    });

    container.innerHTML += `
        <div class="cart-summary">
            <h2>Total: ₹${total}</h2>
            <button onclick="window.location.href='/checkout'">Proceed to Checkout</button>
        </div>
    `;
}

async function removeItem(id) {
    await fetch("/api/cart/" + id, {
        method: "DELETE",
        headers: { "Authorization": "Bearer " + token }
    });
    loadCart();
}

loadCart();