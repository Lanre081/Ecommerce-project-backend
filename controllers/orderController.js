const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");

// POST /api/orders  (protected - requires login)
// Body: { items: [{ productId, quantity }], shippingAddress }
//
// IMPORTANT beginner lesson: never trust prices sent from the client.
// A malicious user could edit the JS in devtools and send { price: 0 }.
// We always re-fetch the real price from the database on the server.
async function createOrder(req, res) {
  const session = await mongoose.startSession();
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item" });
    }

    session.startTransaction();

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for "${product.name}" (only ${product.stock} left)`);
      }

      // Deduct stock now, inside the transaction, so two customers can't
      // both "buy" the last item at the same time.
      product.stock -= item.quantity;
      await product.save({ session });

      const lineTotal = product.price * item.quantity;
      totalAmount += lineTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });
    }

    const order = await Order.create(
      [
        {
          user: req.user._id,
          items: orderItems,
          shippingAddress,
          totalAmount,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    res.status(201).json(order[0]);
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
}

// GET /api/orders/my  (protected - logged-in user's own orders)
async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
}

// GET /api/orders/:id  (protected - must be the order's owner, or an admin)
async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const isOwner = order.user.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order", error: err.message });
  }
}

module.exports = { createOrder, getMyOrders, getOrderById };
