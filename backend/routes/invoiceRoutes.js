import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createInvoice,
  getInvoices,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.route("/").post(protect, createInvoice).get(protect, getInvoices);

export default router;
