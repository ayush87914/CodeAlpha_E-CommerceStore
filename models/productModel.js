const db = require("../config/db");

const Product = {
    getAll: (callback) => {
        db.query("SELECT * FROM products", callback);
    },

    getById: (id, callback) => {
        db.query("SELECT * FROM products WHERE id = ?", [id], callback);
    },

    create: (data, callback) => {
        db.query(
            "INSERT INTO products (name, description, price, image, stock) VALUES (?, ?, ?, ?, ?)",
            [data.name, data.description, data.price, data.image, data.stock],
            callback
        );
    }
};

module.exports = Product;