const mongoose = require("mongoose");

const deliveryRegionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // e.g., "Lagos - Island", "Lagos - Mainland", "Abuja", "Other States"
    },
    baseFee: {
      type: Number,
      required: true,
      default: 0,
    },
    isPODEligible: {
      type: Boolean,
      default: true,
    },
    estimatedDays: {
      type: String,
      default: "2-5 days",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeliveryRegion", deliveryRegionSchema);
