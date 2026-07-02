const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const verifyToken = require("../middleware/auth");

router.use(verifyToken); // sab cart routes login-protected honge

router.get("/", cartController.getCart);
router.post("/add", cartController.addToCart);
router.put("/:id", cartController.updateQuantity);
router.delete("/:id", cartController.removeItem);

module.exports = router;