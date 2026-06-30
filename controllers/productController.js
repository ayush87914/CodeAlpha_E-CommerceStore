const Product = require("../models/productModel");

// GET ALL PRODUCTS
exports.getProducts = (req, res) => {
    Product.getAll((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// ADD PRODUCT
exports.addProduct = (req, res) => {
    Product.create(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Product added", id: result.insertId });
    });
};