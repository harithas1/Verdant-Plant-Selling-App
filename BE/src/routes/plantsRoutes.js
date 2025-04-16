const express= require("express")
const {
  addPlant_Controller,
  get_AllPlants,
} = require("../controller/plantsControllers");
const router= express.Router()

router.post("/addplant",addPlant_Controller)
router.get("/getAllPlants", get_AllPlants);

module.exports=router