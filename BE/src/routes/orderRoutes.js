const express= require("express")
const {createOrderController, getOrdersController}= require("../controller/orderControllers")


const router = express.Router();

router.post("/create-order", createOrderController);

router.get("/:custId/orders", getOrdersController);

module.exports= router