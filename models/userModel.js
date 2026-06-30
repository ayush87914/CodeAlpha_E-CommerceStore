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
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            callback
        );
    }
};

module.exports = User;