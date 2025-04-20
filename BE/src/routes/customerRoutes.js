const express = require("express")
const router= express.Router()
const {
  register_Customer,
  verify_CustomerEmail,
  login_Customer,
  subscription_Controller,
} = require("../controller/customerController");

router.post("/register", register_Customer);
router.get("/verify-email", verify_CustomerEmail);
router.post("/login", login_Customer);
router.post("/subscribe", subscription_Controller);


module.exports = router;
