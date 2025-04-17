const { addReview, getPlantReviews } = require("../services/reviewServices");

const add_Review = async (req, res) => {
  try {
    const { rating, comment, reviewerName, reviewerEmail, plantId, custId } =
      req.body;

    if (!rating || !comment || !reviewerName || !plantId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newReview = await addReview({
      rating,
      comment,
      reviewerName,
      reviewerEmail,
      plantId,
      custId: custId || null,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const get_PlantReviews = async (req, res) => {
    console.log("logging...");
    
  try {
    const plantId = parseInt(req.params.plantId);
    console.log(parseInt(plantId));
    
    const reviews = await getPlantReviews(Number(plantId));
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  add_Review,
  get_PlantReviews,
};
