import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.route("/").get(protect, getNotifications);
router.route("/:id/read").patch(protect, markAsRead);

export default router;
