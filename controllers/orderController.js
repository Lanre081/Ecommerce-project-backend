const prisma = require("../config/prisma");

// POST /api/orders  (protected - requires login)
async function createOrder(req, res) {
  try {
    const { items, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item" });
    }

    // Prisma transaction
    const order = await prisma.$transaction(async (tx) => {
      let calculatedTotal = 0;
      const orderItemsData = [];

      for (const item of items) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });

        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for "${product.name}" (only ${product.stock} left)`);
        }

        await tx.product.update({
          where: { id: product.id },
          data: { stock: product.stock - item.quantity }
        });

        const lineTotal = product.price * item.quantity;
        calculatedTotal += lineTotal;

        orderItemsData.push({
          productId: product.id,
          name: product.name,
          image: product.images && product.images.length > 0 ? product.images[0] : "",
          quantity: item.quantity,
          priceAtPurchase: product.price,
          variant: item.variant || "",
        });
      }

      const finalTotalAmount = calculatedTotal + (taxPrice || 0) + (shippingPrice || 0);

      const createdOrder = await tx.order.create({
        data: {
          userId: req.user.id,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemsPrice: calculatedTotal,
          taxPrice: taxPrice || 0,
          shippingPrice: shippingPrice || 0,
          totalAmount: finalTotalAmount,
          items: {
            create: orderItemsData
          }
        },
        include: { items: true }
      });

      return createdOrder;
    });

    res.status(201).json({ ...order, _id: order.id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// GET /api/orders/my  (protected - logged-in user's own orders)
async function getMyOrders(req, res) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: { items: true }
    });
    const mapped = orders.map(o => ({ ...o, _id: o.id }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
}

// GET /api/orders/:id  (protected - must be the order's owner, or an admin)
async function getOrderById(req, res) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { 
        user: { select: { id: true, name: true, email: true } },
        items: true
      }
    });
    
    if (!order) return res.status(404).json({ message: "Order not found" });

    const isOwner = order.user.id === req.user.id;
    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json({ ...order, _id: order.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order", error: err.message });
  }
}

// GET /api/orders (admin only)
async function getOrders(req, res) {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: true,
      },
    });
    res.json(orders.map(o => ({ ...o, _id: o.id })));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
}

// PUT /api/orders/:id/status (admin only)
async function updateOrderStatus(req, res) {
  try {
    const order = await prisma.order.findUnique({ where: { id: req.params.id } });
    if (!order) return res.status(404).json({ message: "Order not found" });

    const dataToUpdate = {};
    if (req.body.status) dataToUpdate.status = req.body.status;
    if (req.body.paymentStatus) dataToUpdate.paymentStatus = req.body.paymentStatus;
    
    if (req.body.status === "delivered") {
      dataToUpdate.isDelivered = true;
      dataToUpdate.deliveredAt = new Date();
    }
    
    if (req.body.paymentStatus === "completed") {
      dataToUpdate.isPaid = true;
      dataToUpdate.paidAt = new Date();
    }

    const updatedOrder = await prisma.order.update({
      where: { id: req.params.id },
      data: dataToUpdate
    });
    
    res.json({ ...updatedOrder, _id: updatedOrder.id });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error: error.message });
  }
}

// GET /api/orders/:id/track?phone=  (public - no auth, validates by phone)
async function trackOrder(req, res) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true }
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found. Please check your order ID." });
    }

    // Validate phone matches the shipping address to prevent enumeration
    const phone = (order.shippingAddress?.phone || "").replace(/\s/g, "");
    const queryPhone = (req.query.phone || "").replace(/\s/g, "");

    if (!queryPhone || phone !== queryPhone) {
      return res.status(403).json({ message: "Phone number does not match this order." });
    }

    res.json({ ...order, _id: order.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to track order", error: err.message });
  }
}

module.exports = { createOrder, getMyOrders, getOrderById, getOrders, updateOrderStatus, trackOrder };
