const Reference = require("../models/references");
const createError = require("http-errors");

function normalizeBody(body) {
  return {
    firstname: body.firstname || body.firstName || body.first_name,
    lastname: body.lastname || body.lastName || body.last_name,
    email: body.email,
  };
}

exports.create = async (req, res, next) => {
  try {
    const { firstname, lastname, email } = normalizeBody(req.body);

    if (!firstname || !lastname || !email) {
      return next(createError(400, "firstname, lastname, and email are required"));
    }

    const created = await Reference.create({ firstname, lastname, email });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const list = await Reference.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const item = await Reference.findById(req.params.id);
    if (!item) return next(createError(404, "Reference not found"));
    res.json(item);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const patch = normalizeBody(req.body);

    const updated = await Reference.findByIdAndUpdate(
      req.params.id,
      { $set: patch },
      { new: true, runValidators: true }
    );

    if (!updated) return next(createError(404, "Reference not found"));
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await Reference.findByIdAndDelete(req.params.id);
    if (!deleted) return next(createError(404, "Reference not found"));
    res.json({ success: true, deletedId: deleted._id });
  } catch (err) {
    next(err);
  }
};