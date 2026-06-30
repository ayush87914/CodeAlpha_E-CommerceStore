const Cart = require("../models/cartModel");

// ADD TO CART
exports.addToCart = (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    Cart.add({ user_id, product_id, quantity }, (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Item added to cart" });
    });
};

// GET CART
exports.getCart = (req, res) => {
    const user_id = req.params.user_id;

    Cart.getByUser(user_id, (err, results) => {
        if (err) return res.status(500).json(err);

        res.json(results);
    });
};

// REMOVE ITEM
exports.removeItem = (req, res) => {
    Cart.remove(req.params.id, (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "Item removed" });
    });
};