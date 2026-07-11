const db = require("../config/db");

const User = {
    create: (data, callback) => {
        db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [data.name, data.email, data.password],
            callback
        );
    },
    findByEmail: (email, callback) => {
        db.query("SELECT * FROM users WHERE email = ?", [email], callback);
    },
    findById: (id, callback) => {
        db.query("SELECT id, name, email FROM users WHERE id = ?", [id], callback);
    },
    updateName: (id, name, callback) => {
        db.query("UPDATE users SET name = ? WHERE id = ?", [name, id], callback);
    }
};

module.exports = User;