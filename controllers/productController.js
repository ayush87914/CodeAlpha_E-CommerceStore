const Product = require("../models/productModel");

// GET ALL PRODUCTS
exports.getProducts = (req, res) => {
    Product.getAll((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};
exports.getProduct = (req, res) => {
    Product.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });
        if (results.length === 0) return res.status(404).json({ message: "Product not found" });
        res.json(results[0]);
    });
};
// ADD PRODUCT
exports.addProduct = (req, res) => {
    Product.create(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Product added", id: result.insertId });
    });
};