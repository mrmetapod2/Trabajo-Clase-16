import Task from "../models/task.model.js";

// CREATE
export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("project")
      .populate("assignedTo")
      .populate("dependencies");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LIST (with filters, pagination, sorting)
export const listTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, project, sort = "createdAt" } = req.query;
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (project) query.project = project;

    const tasks = await Task.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("project")
      .populate("assignedTo");

    const total = await Task.countDocuments(query);
    res.json({ total, page: parseInt(page), tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
