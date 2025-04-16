const {
  createCategory,
  getAllCategories,
  getAllCategoriesWithPlants,
} = require("../services/categoryServices");


const create_Category = async (req, res) => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const get_AllCategories = async (_req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllCategories_WithPlants = async (_req, res) => {
  try {
    const categories = await getAllCategoriesWithPlants();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




module.exports = {
  create_Category,
  get_AllCategories,
  getAllCategories_WithPlants,
};