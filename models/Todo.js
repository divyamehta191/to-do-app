const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true, minlength: 3 },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", todoSchema);