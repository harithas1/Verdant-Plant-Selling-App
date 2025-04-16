const prisma = require("../prisma/prismaClient.js");

const getCartItems = async (custId) => {
  if (!custId) throw new Error("userId is required.");

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

module.exports = {
  getCartItems,
  addToCart,
};
