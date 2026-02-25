const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  completion: { type: Date, required: true },
  description: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("Project", ProjectSchema);