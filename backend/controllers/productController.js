import Product from "../models/Product.js";
import Category from "../models/Category.js";

// Category Controllers
export const updateCategory = async (req, res) => {
  const { name, description } = req.body;
  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name || category.name;
    category.description = description || category.description;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    // Optional: Check if any products are using this category before deleting
    const productCount = await Product.countDocuments({ category: req.params.id });
    if (productCount > 0) {
      res.status(400).json({ message: 'Cannot delete category with active products.' });
      return;
    }
    await category.remove();
    res.json({ message: 'Category removed' });
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
};

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  const category = new Category({ name, description, createdBy: req.user._id });
  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
};

export const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
};

// Product Controllers
export const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;
  const product = new Product({
    name,
    description,
    price,
    category,
    stock,
    createdBy: req.user._id,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

export const getProducts = async (req, res) => {
  const products = await Product.find({}).populate("category", "name");
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
