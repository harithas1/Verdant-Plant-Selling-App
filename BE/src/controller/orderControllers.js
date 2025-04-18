const {  createOrder,
    getAllOrders}= require("../services/orderServices")


const createOrderController = async (req, res) => {
    try {
        const { custId, plantId, quantity, totalAmount, shippingAddress } = req.body;

        if (!custId || !plantId || !quantity || !totalAmount || !shippingAddress) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const order = await createOrder({
            custId,
            plantId,
            quantity,
            totalAmount,
            shippingAddress
        });

        return res.status(200).json({ success: true, order });
    } catch (err) {
        console.error("Order creation error: ", err);
        return res.status(500).json({ success: false, message: "Order creation failed" });
    }
};

const getOrdersController = async (req, res) => {
    try {
        const { custId } = req.params;

        if (!custId) {
            return res.status(400).json({ success: false, message: "Customer ID is required" });
        }

        const orders = await getAllOrders(custId);
        return res.status(200).json({ success: true, orders });
    } catch (err) {
        console.error("Fetching orders error: ", err);
        return res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
};
module.exports={
     createOrderController, getOrdersController
}