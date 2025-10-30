import Project from "../models/project.model.js";

// CREATE
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ (by ID)
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("owner")
      .populate("teamMembers.user");
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LIST (with filters, pagination, and sorting)
export const listProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, client, sort = "createdAt" } = req.query;
    const query = {};
    if (status) query.status = status;
    if (client) query.client = client;

    const projects = await Project.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate("owner");

    const total = await Project.countDocuments(query);
    res.json({ total, page: parseInt(page), projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
