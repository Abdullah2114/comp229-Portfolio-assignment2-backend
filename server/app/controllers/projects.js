const Project = require("../models/projects");

function toClient(doc) {
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
}

exports.getAll = async (req, res, next) => {
  try {
    const list = await Project.find();
    res.json({
      success: true,
      message: "Projects list retrieved successfully.",
      data: list.map(toClient),
    });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const item = await Project.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }
    res.json({
      success: true,
      message: "Project retrieved successfully.",
      data: toClient(item),
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const created = await Project.create({
      title: req.body.title,
      completion: req.body.completion,
      description: req.body.description,
    });

    res.status(201).json({
      success: true,
      message: "Project added successfully.",
      data: toClient(created),
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        completion: req.body.completion,
        description: req.body.description,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    res.json({
      success: true,
      message: "Project updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    res.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};