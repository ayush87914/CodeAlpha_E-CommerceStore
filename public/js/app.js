fetch("/api/products")
.then(res => res.json())
.then(data => {
    let container = document.getElementById("products");

    data.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <h3>${p.name}</h3>
                <p>${p.description}</p>
                <h4>₹${p.price}</h4>

                <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})">
                    Add to Cart
                </button>
            </div>
        `;
    });
});

// CART ARRAY (temporary storage)
let cart = [];

function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({ id, name, price });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart");
}