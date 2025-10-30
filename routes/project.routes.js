import express from "express";
import {
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  listProjects
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", listProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
