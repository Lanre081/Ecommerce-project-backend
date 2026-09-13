const express = require("express");
const { getRegions, createRegion, updateRegion } = require("../controllers/deliveryRegionController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getRegions).post(protect, adminOnly, createRegion);
router.route("/:id").put(protect, adminOnly, updateRegion);

module.exports = router;
