const express = require("express");
const router = express.Router();

// TEST ROUTE FIRST (VERY IMPORTANT)
router.post("/add", (req, res) => {
    console.log("Cart route hit");
    res.json({ message: "Cart route working!" });
});

module.exports = router;