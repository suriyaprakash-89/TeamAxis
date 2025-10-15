import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { createEntry, getEntries } from "../controllers/moodBoardController.js";

const router = express.Router();

router
  .route("/")
  .post(protect, upload.single("image"), createEntry)
  .get(protect, getEntries);

export default router;
