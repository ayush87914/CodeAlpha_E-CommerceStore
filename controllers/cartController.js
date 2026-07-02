const Cart = require("../models/cartModel");

exports.addToCart = (req, res) => {
    const user_id = req.user.id; // JWT se
    const { product_id, quantity } = req.body;

    if (!product_id) {
        return res.status(400).json({ message: "product_id is required" });
    }

    Cart.add({ user_id, product_id, quantity: quantity || 1 }, (err) => {
        if (err) return res.status(500).json({ message: "Server error" });
        res.json({ message: "Item added to cart" });
    });
};

exports.getCart = (req, res) => {
    Cart.getByUser(req.user.id, (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });
        res.json(results);
    });
};

exports.updateQuantity = (req, res) => {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
        return res.status(400).json({ message: "quantity must be at least 1" });
    }
    Cart.updateQuantity(req.params.id, req.user.id, quantity, (err) => {
        if (err) return res.status(500).json({ message: "Server error" });
        res.json({ message: "Cart updated" });
    });
};

exports.removeItem = (req, res) => {
    Cart.remove(req.params.id, req.user.id, (err) => {
        if (err) return res.status(500).json({ message: "Server error" });
        res.json({ message: "Item removed" });
    });
};