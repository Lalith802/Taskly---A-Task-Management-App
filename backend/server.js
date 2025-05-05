const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import models
const Task = require('./models/Task'); // My Tasks
const VitalTask = require('./models/VitalTask'); // Vital Tasks
const CalendarEvent = require('./models/CalendarEvent'); // Calendar Events

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tasklydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// ---------------------------
// My Tasks Routes
// ---------------------------
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { text, description, completed } = req.body;
  const newTask = new Task({ text, description, completed });
  
  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const { text, description, completed } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { text, description, completed }, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------------------------
// Vital Tasks Routes
// ---------------------------
app.get('/api/vital-tasks', async (req, res) => {
  try {
    const vitalTasks = await VitalTask.find();
    res.json(vitalTasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching vital tasks" });
  }
});

app.post('/api/vital-tasks', async (req, res) => {
  const { text, description, completed } = req.body;
  const newVitalTask = new VitalTask({ text, description, completed });
  
  try {
    const savedVitalTask = await newVitalTask.save();
    res.status(201).json(savedVitalTask);
  } catch (err) {
    res.status(500).json({ message: "Error creating vital task" });
  }
});

app.delete('/api/vital-tasks/:id', async (req, res) => {
  try {
    const deletedVitalTask = await VitalTask.findByIdAndDelete(req.params.id);
    if (!deletedVitalTask) {
      return res.status(404).json({ message: 'Vital task not found' });
    }
    res.status(200).json({ message: 'Vital task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/vital-tasks/:id', async (req, res) => {
  const { text, description, completed } = req.body;
  try {
    const updatedVitalTask = await VitalTask.findByIdAndUpdate(req.params.id, { text, description, completed }, { new: true });
    res.status(200).json(updatedVitalTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ---------------------------
// Calendar Event Routes
// ---------------------------
app.get('/api/calendar-events', async (req, res) => {
  try {
    const events = await CalendarEvent.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching calendar events" });
  }
});

app.post('/api/calendar-events', async (req, res) => {
  try {
    const { title, start, end, allDay, description } = req.body;
    const newEvent = new CalendarEvent({ title, start, end, allDay, description });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: "Error creating calendar event" });
  }
});

app.delete('/api/calendar-events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CalendarEvent.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting calendar event" });
  }
});

// Start the server
app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
