const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const verifyToken = require("../middleware/auth");

router.use(verifyToken);

router.post("/", orderController.placeOrder);
router.get("/", orderController.getMyOrders);

module.exports = router;