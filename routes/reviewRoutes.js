const express = require("express");
const router = express.Router();
const { createReview, getProductReviews } = require("../controllers/reviewController");
const { protect } = require("../middleware/auth");

router.route("/:productId")
  .get(getProductReviews)
  .post(protect, createReview);

module.exports = router;
