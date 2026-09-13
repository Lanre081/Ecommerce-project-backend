const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductSuggestions,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/auth");

// Public — /suggestions MUST come before /:id (otherwise 'suggestions' is treated as an ID)
router.get("/suggestions", getProductSuggestions);
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin only
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;

