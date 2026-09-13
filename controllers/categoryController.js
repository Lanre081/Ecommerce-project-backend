const prisma = require("../config/prisma");

exports.getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { products: true } } },
      orderBy: { name: 'asc' },
    });
    res.json(categories.map(c => ({ ...c, _id: c.id })));
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await prisma.category.findUnique({ where: { id: req.params.id } });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json({ ...category, _id: category.id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const categoryExists = await prisma.category.findUnique({ where: { name } });
    if (categoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const category = await prisma.category.create({ data: { name, description, image } });
    res.status(201).json({ ...category, _id: category.id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const category = await prisma.category.update({
      where: { id: req.params.id },
      data: { name, description, image }
    });
    res.json({ ...category, _id: category.id });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ message: "Category not found" });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await prisma.category.delete({ where: { id: req.params.id } });
    res.json({ message: "Category removed" });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ message: "Category not found" });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
