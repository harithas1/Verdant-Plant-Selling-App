const prisma = require("../prisma/prismaClient.js");

const getCartItems = async (custId) => {
  if (!custId) throw new Error("custId is required.");
console.log(custId);

  const cartItems = await prisma.cart.findMany({
    where: { custId },
    select: {
      id: true,
      quantity: true,
      plant: {
        select: {
          id: true,
          name: true,
          image: true,
          price: true,
          stock: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  console.log(cartItems);
  
  return cartItems;
};

const addToCart = async (custId, plantId, quantity) => {
  const existingItem = await prisma.cart.findFirst({
    where: { custId, plantId },
  });

  if (existingItem) {
    // if the item is already in the cart, updating quantity
    return await prisma.cart.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    // if the item is not in the cart, add new entry
    return await prisma.cart.create({
      data: {
        custId,
        plantId,
        quantity,
      },
    });
  }
};

const removeCartItem = async ({ custId, plantId }) => {
  if (!custId || !plantId)
    throw new Error("custId and productId are required.");

  const existingCartItem = await prisma.cart.findFirst({
    where: { custId, plantId },
  });

  if (!existingCartItem) throw new Error("Item not found in the cart");

  await prisma.cart.delete({ where: { id: existingCartItem.id } });

  return { message: "Item removed from cart", deletedItem: existingCartItem };
};

const clearCart = async (custId) => {
  if (!custId) throw new Error("custId is required.");

  const existingItems = await prisma.cart.findMany({ where: { custId } });

  if (!existingItems.length) throw new Error("Cart is already empty");

  const deletedItems = await prisma.cart.deleteMany({ where: { custId } });

  return {
    message: "Cart cleared successfully",
    itemsDeleted: deletedItems.count,
  };
};

const updateCartQuantity = async ({ custId, plantId, quantity }) => {
console.log(custId, plantId, quantity);

  const plant = await prisma.plant.findUnique({
    where: { id: plantId },
  });
  if (!plant) {
    throw new Error("Plant not found.");
  }

  if (quantity > plant.stock) {
    throw new Error(`Only ${plant.stock} items available in stock.`);
  }

  const existingCartItem = await prisma.cart.findFirst({
    where: { custId, plantId },
  });

  if (!existingCartItem) {
    throw new Error("Item not found in your cart.");
  }

  if (quantity < 1) {
    await prisma.cart.delete({
      where: { id: existingCartItem.id },
    });
    return { message: "Item removed from cart." };
  }

  const updatedCartItem = await prisma.cart.update({
    where: { id: existingCartItem.id },
    data: { quantity },
  });

  return updatedCartItem;
};



module.exports = {
  getCartItems,
  addToCart,
  removeCartItem,
  clearCart,
  updateCartQuantity,
};
