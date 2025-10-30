import express from "express";
import {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  listTasks
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", listTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
