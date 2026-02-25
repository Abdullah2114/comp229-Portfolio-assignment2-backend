const Service = require("../models/services");

function toClient(doc) {
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
}

// GET ALL
exports.getAll = async (req, res, next) => {
  try {
    const list = await Service.find();
    res.json({
      success: true,
      message: "Services list retrieved successfully.",
      data: list.map(toClient),
    });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
exports.getById = async (req, res, next) => {
  try {
    const item = await Service.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }
    res.json({
      success: true,
      message: "Service retrieved successfully.",
      data: toClient(item),
    });
  } catch (err) {
    next(err);
  }
};

// POST
exports.create = async (req, res, next) => {
  try {
    const created = await Service.create({
      title: req.body.title,
      description: req.body.description,
    });

    res.status(201).json({
      success: true,
      message: "Service added successfully.",
      data: toClient(created),
    });
  } catch (err) {
    next(err);
  }
};

// PUT
exports.update = async (req, res, next) => {
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, description: req.body.description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }

    res.json({
      success: true,
      message: "Service updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.remove = async (req, res, next) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }

    res.json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};