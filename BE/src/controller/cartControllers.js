const { getCartItems, addToCart } = require("../services/cartServices");

const get_CartItems = async (req, res) => {
  try {
    const custId = parseInt(req.params.custId);

    if (!custId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cartItems = await getCartItems(custId);
    console.log(cartItems);
    

    if (!Array.isArray(cartItems)) {
      return res
        .status(200)
        .json({ success: true, message: "Your cart is empty", cartItems: [] });
    }

    return res
      .status(200)
      .json({ success: true, message: "Cart items retrieved", cartItems });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const add_ToCart = async (req, res) => {
  try {
    const { custId, plantId, quantity } = req.body;

    if (!plantId || !quantity) {
      return res
        .status(400)
        .json({ message: "Plant ID and quantity are required." });
    }

    const cartItem = await addToCart(custId, plantId, quantity);
    res.status(200).json(cartItem);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Unable to add item to cart." });
  }
};

module.exports = {
  get_CartItems,
  add_ToCart,
};

