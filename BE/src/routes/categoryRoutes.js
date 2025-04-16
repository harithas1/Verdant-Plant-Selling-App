const express = require("express");
const {
  create_Category,
  get_AllCategories,
  getAllCategories_WithPlants,
} = require("../controller/categoryControllers");
const router = express.Router();

router.post("/createCategory", create_Category);
router.get("/getAllCategories", get_AllCategories);
router.get("/getAllCategoriesWithPlants", getAllCategories_WithPlants);
module.exports = router;
