const db = require("../config/db");

const Order = {
    createFromCart: (user_id, shipping, cartItems, callback) => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        db.beginTransaction((err) => {
            if (err) return callback(err);

            db.query(
                `INSERT INTO orders (user_id, total, status, shipping_name, shipping_address, shipping_city, shipping_zip)
                 VALUES (?, ?, 'pending', ?, ?, ?, ?)`,
                [user_id, total, shipping.name, shipping.address, shipping.city, shipping.zip],
                (err, orderResult) => {
                    if (err) return db.rollback(() => callback(err));

                    const orderId = orderResult.insertId;
                    const values = cartItems.map(item => [
                        orderId, item.product_id, item.name, item.price, item.quantity
                    ]);

                    db.query(
                        `INSERT INTO order_items (order_id, product_id, product_name, price, quantity) VALUES ?`,
                        [values],
                        (err) => {
                            if (err) return db.rollback(() => callback(err));

                            db.query("DELETE FROM cart WHERE user_id = ?", [user_id], (err) => {
                                if (err) return db.rollback(() => callback(err));

                                db.commit((err) => {
                                    if (err) return db.rollback(() => callback(err));
                                    callback(null, { orderId, total });
                                });
                            });
                        }
                    );
                }
            );
        });
    },

    getByUser: (user_id, callback) => {
        db.query("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC", [user_id], callback);
    },

    getItems: (order_id, callback) => {
        db.query("SELECT * FROM order_items WHERE order_id = ?", [order_id], callback);
    }
};

module.exports = Order;