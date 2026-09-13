const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/300",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
