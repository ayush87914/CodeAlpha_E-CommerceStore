let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCart() {
    let container = document.getElementById("cartItems");

    if (cart.length === 0) {
        container.innerHTML = "<p>Cart is empty</p>";
        return;
    }

    cart.forEach(item => {
        container.innerHTML += `
            <div>
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>
        `;
    });
}

loadCart();