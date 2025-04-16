const express = require("express")
const router= express.Router()
const {register_Customer,
    verify_CustomerEmail,
    login_Customer} = require("../controller/customerController")

router.post("/register", register_Customer);
router.get("/verify-email", verify_CustomerEmail);
router.post("/login", login_Customer);


module.exports = router;
