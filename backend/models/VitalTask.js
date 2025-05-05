// backend/models/VitalTask.js
const mongoose = require("mongoose");

const VitalTaskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("VitalTask", VitalTaskSchema);
