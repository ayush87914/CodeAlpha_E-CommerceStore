const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const SECRET = "mysecretkey";

// REGISTER
exports.register = (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json(err);

        User.create({ name, email, password: hash }, (err, result) => {
            if (err) return res.status(500).json(err);

            res.json({ message: "User registered successfully" });
        });
    });
};

// LOGIN
exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: "User not found" });

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) return res.status(401).json({ message: "Invalid password" });

            const token = jwt.sign(
                { id: user.id, email: user.email },
                SECRET,
                { expiresIn: "1d" }
            );

            res.json({ message: "Login successful", token });
        });
    });
};