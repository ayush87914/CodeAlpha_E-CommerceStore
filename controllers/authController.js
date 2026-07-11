const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

exports.register = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email and password are required" });
    }

    User.findByEmail(email, (err, existing) => {
        if (err) return res.status(500).json({ message: "Server error" });
        if (existing.length > 0) {
            return res.status(409).json({ message: "An account with that email already exists" });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json({ message: "Server error" });

            User.create({ name, email, password: hash }, (err, result) => {
                if (err) return res.status(500).json({ message: "Server error" });

                const token = jwt.sign(
                    { id: result.insertId, email, name },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );

                res.json({ message: "Account created", token, user: { id: result.insertId, name, email } });
            });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    User.findByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });
        if (results.length === 0) return res.status(404).json({ message: "No account found with that email" });

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

            const token = jwt.sign(
                { id: user.id, email: user.email, name: user.name },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            res.json({ message: "Login successful", token, user: { id: user.id, name: user.name, email: user.email } });
        });
    });
};

// NAYA — profile fetch karo
exports.getProfile = (req, res) => {
    User.findById(req.user.id, (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });
        if (results.length === 0) return res.status(404).json({ message: "User not found" });
        res.json(results[0]);
    });
};

// NAYA — profile update karo (naam customize)
exports.updateProfile = (req, res) => {
    const { name } = req.body;
    if (!name || !name.trim()) {
        return res.status(400).json({ message: "Name cannot be empty" });
    }
    User.updateName(req.user.id, name.trim(), (err) => {
        if (err) return res.status(500).json({ message: "Server error" });
        res.json({ message: "Profile updated", name: name.trim() });
    });
};