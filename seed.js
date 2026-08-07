// Run with: npm run seed
// Populates the database with a few sample products so you have
// something to see immediately, without manually using Postman first.
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const sampleProducts = [
  {
    name: "Wireless Headphones",
    description: "Over-ear Bluetooth headphones with noise cancellation and 30-hour battery life.",
    price: 45000,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    stock: 25,
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking smartwatch with heart-rate monitor and 7-day battery.",
    price: 38000,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    stock: 15,
  },
  {
    name: "Canvas Backpack",
    description: "Durable water-resistant canvas backpack with laptop compartment.",
    price: 12500,
    category: "fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    stock: 40,
  },
  {
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic mugs, 350ml each.",
    price: 8000,
    category: "home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400",
    stock: 60,
  },
  {
    name: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness and USB charging port.",
    price: 9500,
    category: "home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
    stock: 30,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB for seeding...");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    await Product.insertMany(sampleProducts);
    console.log(`Inserted ${sampleProducts.length} sample products`);

    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
