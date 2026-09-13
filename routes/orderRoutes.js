const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getOrderById, getOrders, updateOrderStatus, trackOrder } = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/auth");

router.route("/")
  .post(protect, createOrder)
  .get(protect, adminOnly, getOrders);

router.get("/my", protect, getMyOrders);

// Public track route - must be before /:id to avoid conflict
router.get("/:id/track", trackOrder);

router.route("/:id")
  .get(protect, getOrderById)
  .put(protect, adminOnly, updateOrderStatus);

module.exports = router;
