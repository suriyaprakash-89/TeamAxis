import express from "express";
import { protect, admin } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  getCategories,
  createProduct,
  getProducts,
  getProductById,
  updateCategory,
  deleteCategory,
} from "../controllers/productController.js";

const router = express.Router();

router
  .route("/categories")
  .post(protect, admin, createCategory)
  .get(protect, getCategories);
router.route('/categories/:id')
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);
router.route("/").post(protect, createProduct).get(protect, getProducts);
router.route("/:id").get(protect, getProductById);

export default router;
