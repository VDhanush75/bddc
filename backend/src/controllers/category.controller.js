import Category from "../models/category.model.js";

// CREATE CATEGORY (Admin)
export const createCategory = async (req, res) => {
  const { name } = req.body;

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    return res.status(400).json({ message: "Category already exists" });
  }

  const category = await Category.create({ name });

  res.status(201).json(category);
};


// GET ALL CATEGORIES (Public)
export const getCategories = async (req, res) => {
  const categories = await Category.find();

  res.json(categories);
};


// UPDATE CATEGORY (Admin)
export const updateCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  category.name = req.body.name || category.name;

  await category.save();

  res.json(category);
};


// DELETE CATEGORY (Admin)
export const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  await category.deleteOne();

  res.json({ message: "Category removed" });
};