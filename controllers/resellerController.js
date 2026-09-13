const prisma = require("../config/prisma");

exports.submitApplication = async (req, res) => {
  try {
    const application = await prisma.resellerApplication.create({ data: req.body });
    res.status(201).json({ ...application, _id: application.id });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await prisma.resellerApplication.findMany({ orderBy: { createdAt: 'desc' } });
    const mapped = applications.map(a => ({ ...a, _id: a.id }));
    res.json(mapped);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const application = await prisma.resellerApplication.update({
      where: { id: req.params.id },
      data: { status: req.body.status }
    });
    res.json({ ...application, _id: application.id });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ message: "Application not found" });
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
