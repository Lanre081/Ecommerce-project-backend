require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(express.json()); // parses JSON request bodies into req.body

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/resellers", require("./routes/resellerRoutes"));
app.use("/api/delivery-regions", require("./routes/deliveryRegionRoutes"));

// Serve the built React frontend as static files.
app.use(express.static(path.join(__dirname, "..", "frontend-react", "dist")));

// Basic health check - useful for confirming the server is alive
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Centralized error handler - catches anything that falls through.
// (Individual controllers still handle their own expected errors;
// this is a safety net for unexpected ones.)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
