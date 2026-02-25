const User = require("../models/users");

function toClient(doc) {
  const obj = doc.toObject();
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
}

exports.getAll = async (req, res, next) => {
  try {
    const list = await User.find();
    res.json({
      success: true,
      message: "Users list retrieved successfully.",
      data: list.map(toClient),
    });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const item = await User.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "User not found." });
    }
    res.json({
      success: true,
      message: "User retrieved successfully.",
      data: toClient(item),
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const created = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: toClient(created),
    });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.json({
      success: true,
      message: "User updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};