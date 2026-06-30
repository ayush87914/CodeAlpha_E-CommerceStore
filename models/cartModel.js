const db = require("../config/db");

const Cart = {
    add: (data, callback) => {
        db.query(
            "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
            [data.user_id, data.product_id, data.quantity],
            callback
        );
    },

    getByUser: (user_id, callback) => {
        db.query(
            `SELECT cart.id, products.name, products.price, cart.quantity
             FROM cart
             JOIN products ON cart.product_id = products.id
             WHERE cart.user_id = ?`,
            [user_id],
            callback
        );
    },

    remove: (id, callback) => {
        db.query("DELETE FROM cart WHERE id = ?", [id], callback);
    }
};

module.exports = Cart;