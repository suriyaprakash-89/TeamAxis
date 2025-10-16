import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  getDashboardSummary,
  getPerformanceReport,
} from "../controllers/reportController.js";
const router = express.Router();

router.route("/dashboard-summary").get(protect, admin, getDashboardSummary);
router.route("/performance").get(protect, admin, getPerformanceReport);

export default router;
