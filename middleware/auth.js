const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function verifyToken(req, res, next) {
    const header = req.headers["authorization"];

    if (!header) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
        req.user = decoded; // { id, email }
        next();
    });
};