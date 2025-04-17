const {
  getCartItems,
  addToCart,
  removeCartItem,
  clearCart,
  updateCartQuantity,
} = require("../services/cartServices");

const get_CartItems = async (req, res) => {
 
  
  try {
    const custId = parseInt(req.params.custId);
     console.log(custId);

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


const remove_CartItem = async (req, res) => {
  try {
    const { custId, plantId } = req.body;

    if (!custId || !plantId) {
      return res.status(400).json({ message: "Missing custId or plantId" });
    }

    const response = await removeCartItem({ custId, plantId });
    return res.status(200).json({ success: true, ...response });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const clear_cart = async (req, res) => {
  try {
    const { custId } = req.body;

    if (!custId) {
      return res.status(400).json({ message: "CustId is required" });
    }

    const response = await clearCart(custId);
    return res.status(200).json({ success: true, ...response });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const update_CartQuantity = async (req, res) => {
  try {
    const { custId, plantId, quantity } = req.body;

    if (!custId || !plantId || quantity === undefined) {
      return res
        .status(400)
        .json({ error: "custId, plantId, and quantity are required." });
    }

    const updatedCartItem = await updateCartQuantity({
      custId,
      plantId,
      quantity,
    });

    return res.status(200).json({
      message: "Cart updated successfully.",
      cartItem: updatedCartItem,
    });
  } catch (error) {
    console.error("Error updating cart quantity:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
};


module.exports = {
  get_CartItems,
  add_ToCart,
  remove_CartItem,
  clear_cart,
  update_CartQuantity,
};

