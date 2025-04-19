const { addPlantService, getAllPlants } = require("../services/plantsServices");

const addPlant_Controller = async (req, res) => {
  try {
    const newPlant = await addPlantService(req.body);
    return res.status(201).json(newPlant); // Return the newly created plant
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};


const get_AllPlants = async (req, res) => {
  // const { page = 1, pageSize = 10 } = req.query;

  try {
    const allPlants = await getAllPlants();
    res.json(allPlants);
  } catch (error) {
    console.error("Error in get_AllPlants Controller:", error);
    res.status(500).json({ error: "Failed to fetch plants" });
  }
};

module.exports = {
  addPlant_Controller,
  get_AllPlants,
};
