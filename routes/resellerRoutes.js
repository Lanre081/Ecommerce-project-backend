const express = require("express");
const { submitApplication, getApplications, updateApplication } = require("../controllers/resellerController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(submitApplication).get(protect, adminOnly, getApplications);
router.route("/:id").put(protect, adminOnly, updateApplication);

module.exports = router;
