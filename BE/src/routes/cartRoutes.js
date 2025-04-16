const express = require("express")
const { get_CartItems, add_ToCart } = require("../controller/cartControllers");
const router= express.Router()


router.get("/getCartItems/:custId", get_CartItems);
router.post("/addToCart", add_ToCart);



module.exports= router