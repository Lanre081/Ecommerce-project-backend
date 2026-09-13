const prisma = require("../config/prisma");

// GET /api/products  (public)
// Supports: ?category=&search=&featured=true&flash=true&bestseller=true
async function getProducts(req, res) {
  try {
    const { category, search, featured, flash, bestseller } = req.query;
    let where = {};

    if (category) where.categoryId = category;
    if (featured === 'true') where.isFeatured = true;
    if (flash === 'true') where.isFlashSale = true;
    if (bestseller === 'true') where.isBestSeller = true;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { category: { select: { id: true, name: true } } },
    });

    res.json(products.map(p => ({ ...p, _id: p.id })));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
}

// GET /api/products/suggestions?q=  (public — search autocomplete)
async function getProductSuggestions(req, res) {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) return res.json([]);

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { brand: { contains: q, mode: 'insensitive' } },
        ],
      },
      take: 6,
      select: { id: true, name: true, price: true, discountPrice: true, images: true },
    });

    res.json(products.map(p => ({ ...p, _id: p.id })));
  } catch (err) {
    res.status(500).json({ message: "Suggestions failed", error: err.message });
  }
}

// GET /api/products/:id  (public)
async function getProductById(req, res) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { category: true },
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ ...product, _id: product.id });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product", error: err.message });
  }
}

// POST /api/products  (admin only)
async function createProduct(req, res) {
  try {
    const {
      name, description, price, categoryId, images, stock,
      variants, freeGifts, isPODEligible,
      brand, tags, specifications,
      isFeatured, isBestSeller, isFlashSale, flashSalePrice, discountPrice, discountPercent,
    } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description: description || '',
        price: Number(price),
        categoryId,
        images: images || [],
        stock: Number(stock) || 0,
        variants: variants || undefined,
        freeGifts: freeGifts || undefined,
        isPODEligible: isPODEligible !== false,
        brand: brand || undefined,
        tags: tags || [],
        specifications: specifications || undefined,
        isFeatured: !!isFeatured,
        isBestSeller: !!isBestSeller,
        isFlashSale: !!isFlashSale,
        flashSalePrice: flashSalePrice ? Number(flashSalePrice) : undefined,
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        discountPercent: discountPercent ? Number(discountPercent) : undefined,
      },
    });
    res.status(201).json({ ...product, _id: product.id });
  } catch (err) {
    res.status(400).json({ message: "Failed to create product", error: err.message });
  }
}

// PUT /api/products/:id  (admin only)
async function updateProduct(req, res) {
  try {
    const data = { ...req.body };
    // Remove client-side fields
    delete data._id;
    delete data.id;
    delete data.category;
    delete data.orderItems;
    delete data.reviews;

    // Convert numbers
    if (data.price !== undefined) data.price = Number(data.price);
    if (data.discountPrice !== undefined) data.discountPrice = data.discountPrice ? Number(data.discountPrice) : null;
    if (data.flashSalePrice !== undefined) data.flashSalePrice = data.flashSalePrice ? Number(data.flashSalePrice) : null;
    if (data.stock !== undefined) data.stock = Number(data.stock);
    if (data.discountPercent !== undefined) data.discountPercent = data.discountPercent ? Number(data.discountPercent) : null;

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data,
      include: { category: true },
    });
    res.json({ ...product, _id: product.id });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ message: "Product not found" });
    res.status(400).json({ message: "Failed to update product", error: err.message });
  }
}

// DELETE /api/products/:id  (admin only)
async function deleteProduct(req, res) {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ message: "Product deleted" });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ message: "Product not found" });
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
}

module.exports = { getProducts, getProductById, getProductSuggestions, createProduct, updateProduct, deleteProduct };
