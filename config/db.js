const mongoose = require("mongoose");

// Keeping DB connection logic isolated here means server.js doesn't need
// to know anything about *how* we connect - just that we do.
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err.message}`);
    // Fail fast: an e-commerce app with no DB shouldn't limp along half-broken.
    process.exit(1);
  }
}

module.exports = connectDB;
