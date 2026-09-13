const mongoose = require("mongoose");

const resellerApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
    },
    experience: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "pending",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResellerApplication", resellerApplicationSchema);
