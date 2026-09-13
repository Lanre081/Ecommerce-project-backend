const express = require("express");
const router = express.Router();
const { getDashboardMetrics, getUsers } = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/metrics", protect, adminOnly, getDashboardMetrics);
router.get("/users", protect, adminOnly, getUsers);

module.exports = router;
