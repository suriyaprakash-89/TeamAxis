

import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { getDashboardSummary } from "../controllers/reportController.js";

const router = express.Router();

router.route("/dashboard-summary").get(protect, admin, getDashboardSummary);

export default router;
