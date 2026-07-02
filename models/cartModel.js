const db = require("../config/db");

const Cart = {
    add: (data, callback) => {
        db.query(
            `INSERT INTO cart (user_id, product_id, quantity)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
            [data.user_id, data.product_id, data.quantity],
            callback
        );
    },

    getByUser: (user_id, callback) => {
        db.query(
            `SELECT cart.id, cart.product_id, products.name, products.price,
                    products.image, cart.quantity, products.stock
             FROM cart
             JOIN products ON cart.product_id = products.id
             WHERE cart.user_id = ?`,
            [user_id],
            callback
        );
    },

    updateQuantity: (id, user_id, quantity, callback) => {
        db.query(
            "UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?",
            [quantity, id, user_id],
            callback
        );
    },

    remove: (id, user_id, callback) => {
        db.query("DELETE FROM cart WHERE id = ? AND user_id = ?", [id, user_id], callback);
    }
};

module.exports = Cart;