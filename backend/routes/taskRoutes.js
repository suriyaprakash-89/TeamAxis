import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  uploadMediaForTask,
} from "../controllers/taskController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createTask).get(protect, getTasks);
router.route("/:id/status").put(protect, updateTaskStatus);
router
  .route("/:id/media")
  .post(protect, upload.single("media"), uploadMediaForTask);

export default router;
