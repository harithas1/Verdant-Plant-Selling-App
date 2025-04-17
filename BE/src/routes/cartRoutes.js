const express = require("express");
const {
  get_CartItems,
  add_ToCart,
  remove_CartItem,
  clear_cart,
  update_CartQuantity,
} = require("../controller/cartControllers");
const router = express.Router();

router.get("/getCartItems/:custId", get_CartItems);
router.post("/addToCart", add_ToCart);
router.delete("/removeCartItem", remove_CartItem);
router.delete("/clearCart", clear_cart);
router.put("/updateCartQuantity", update_CartQuantity);

module.exports = router;
