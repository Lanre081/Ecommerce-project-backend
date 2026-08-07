const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/auth");

// Public
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin only - notice how middleware chains: protect runs first (checks
// login), then adminOnly (checks role). If either fails, the request
// never reaches the controller.
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
