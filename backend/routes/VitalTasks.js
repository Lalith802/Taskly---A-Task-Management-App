// backend/routes/vitalTasks.js
const express = require("express");
const router = express.Router();
const VitalTask = require("../models/VitalTask");

// GET all vital tasks
router.get("/", async (req, res) => {
  try {
    const vitalTasks = await VitalTask.find();
    res.json(vitalTasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new vital task
router.post("/", async (req, res) => {
  const newVitalTask = new VitalTask(req.body);
  try {
    const savedVitalTask = await newVitalTask.save();
    res.json(savedVitalTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a vital task
router.delete("/:id", async (req, res) => {
  try {
    await VitalTask.findByIdAndDelete(req.params.id);
    res.json({ message: "Vital task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update vital task
router.put("/:id", async (req, res) => {
  try {
    const updatedVitalTask = await VitalTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedVitalTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
