const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

exports.placeOrder = (req, res) => {
    const user_id = req.user.id;
    const { name, address, city, zip } = req.body;

    if (!name || !address || !city || !zip) {
        return res.status(400).json({ message: "Shipping name, address, city and zip are all required" });
    }

    Cart.getByUser(user_id, (err, cartItems) => {
        if (err) return res.status(500).json({ message: "Server error" });
        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        Order.createFromCart(user_id, { name, address, city, zip }, cartItems, (err, result) => {
            if (err) return res.status(500).json({ message: "Server error placing order" });
            res.json({ message: "Order placed successfully", orderId: result.orderId, total: result.total });
        });
    });
};

exports.getMyOrders = (req, res) => {
    Order.getByUser(req.user.id, (err, orders) => {
        if (err) return res.status(500).json({ message: "Server error" });
        res.json(orders);
    });
};