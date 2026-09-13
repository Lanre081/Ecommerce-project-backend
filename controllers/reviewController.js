const prisma = require("../config/prisma");

exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.productId;

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyReviewed = await prisma.review.findUnique({
      where: {
        productId_userId: {
          productId: productId,
          userId: req.user.id
        }
      }
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment,
        userId: req.user.id,
        productId: productId,
      },
    });
    
    // Update product ratings
    const stats = await prisma.review.aggregate({
      where: { productId: productId },
      _count: { rating: true },
      _avg: { rating: true }
    });
    
    await prisma.product.update({
      where: { id: productId },
      data: {
        ratingsQuantity: stats._count.rating,
        ratingsAverage: Math.round((stats._avg.rating || 0) * 10) / 10
      }
    });

    res.status(201).json({ ...review, _id: review.id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({ 
      where: { productId: req.params.productId },
      include: {
        user: { select: { name: true } }
      }
    });
    const mapped = reviews.map(r => ({ ...r, _id: r.id }));
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
