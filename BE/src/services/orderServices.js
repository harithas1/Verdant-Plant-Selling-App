const prisma = require("../prisma/prismaClient")

const createOrder = async ({ custId, plantId, quantity, totalAmount, shippingAddress }) => {
    try {
        const order = await prisma.order.create({
            data: {
                custId,
                plantId,
                quantity,
                totalAmount,
                shippingAddress,
                status: "PENDING", 
            }
        });
        return order;
    } catch (err) {
        console.error("Order creation failed: ", err);
        throw new Error("Order creation failed");
    }
};

const getAllOrders = async (custId) => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                custId,
            },
            include: {
                plant: true 
            },
            orderBy: {
                createdAt: 'desc'  
            }
        });
        return orders;
    } catch (err) {
        console.error("Failed to fetch orders: ", err);
        throw new Error("Failed to fetch orders");
    }
};

module.exports = {
    createOrder,
    getAllOrders,
};