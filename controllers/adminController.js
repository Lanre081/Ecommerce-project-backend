const prisma = require("../config/prisma");

exports.getDashboardMetrics = async (req, res) => {
  try {
    const [
      totalOrders,
      totalUsers,
      totalProducts,
      allOrders,
      recentOrders,
      pendingOrders,
      lowStockProducts,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.findMany({ select: { totalAmount: true, status: true } }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
          user: { select: { name: true, email: true } },
        },
      }),
      prisma.order.count({ where: { status: "pending" } }),
      prisma.product.count({ where: { stock: { lte: 5, gt: 0 } } }),
    ]);

    const totalRevenue = allOrders.reduce((acc, o) => acc + o.totalAmount, 0);

    res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue,
      pendingOrders,
      lowStockCount: lowStockProducts,
      recentOrders: recentOrders.map((o) => ({ ...o, _id: o.id })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(users.map((u) => ({ ...u, _id: u.id })));
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
