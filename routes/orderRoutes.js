const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getOrderById } = require("../controllers/orderController");
const { protect } = require("../middleware/auth");

// Every order route requires login - you can't place or view orders
// without being authenticated.
router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

module.exports = router;
