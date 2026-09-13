const prisma = require("../config/prisma");

exports.getRegions = async (req, res) => {
  try {
    const regions = await prisma.deliveryRegion.findMany();
    const mapped = regions.map(r => ({ ...r, _id: r.id }));
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.createRegion = async (req, res) => {
  try {
    const region = await prisma.deliveryRegion.create({ data: req.body });
    res.status(201).json({ ...region, _id: region.id });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateRegion = async (req, res) => {
  try {
    const region = await prisma.deliveryRegion.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ ...region, _id: region.id });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ message: "Region not found" });
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
