const express = require("express")
const router= express.Router()

const {createPaymentOrder,verify_Payment}= require("../controller/razorpayControllers")

router.post("/create-order",createPaymentOrder)
router.post("/verify-payment", verify_Payment);
module.exports= router