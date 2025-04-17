const express = require("express");
const {
  add_Review,
  get_PlantReviews,
} = require("../controller/reviewControllers");

const router = express.Router();

router.post("/addReview", add_Review);
router.get("/getReviews/:plantId", get_PlantReviews);

module.exports = router;
