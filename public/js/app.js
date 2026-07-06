// dashboard load hote hi cart count dikhado
updateCartCount();

fetch("/api/products")
.then(res => res.json())
.then(data => {
    let container = document.getElementById("products");

    data.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <a href="/product?id=${p.id}">
                    <h3>${p.name}</h3>
                </a>
                <p>${p.description}</p>
                <h4>₹${p.price}</h4>

                <button onclick="addToCart(${p.id}, '${p.name}')">
                    Add to Cart
                </button>
            </div>
        `;
    });
});

// backend se connected addToCart
async function addToCart(id, name) {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login";
        return;
    }

    const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ product_id: id, quantity: 1 })
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.message);
        return;
    }

    alert(name + " added to cart");

    // cart me add hone ke baad count turant refresh karo
    updateCartCount();
}

// dashboard ke uper cart count badge update karta hai
async function updateCartCount() {
    const countEl = document.getElementById("cartCount");
    if (!countEl) return;

    const token = localStorage.getItem("token");
    if (!token) {
        countEl.innerText = 0;
        return;
    }

    try {
        const res = await fetch("/api/cart", {
            headers: { "Authorization": "Bearer " + token }
        });

        if (!res.ok) {
            countEl.innerText = 0;
            return;
        }

        const items = await res.json();
        const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
        countEl.innerText = totalQty;
    } catch (err) {
        countEl.innerText = 0;
    }
}