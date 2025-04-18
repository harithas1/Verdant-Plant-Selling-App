const Razorpay = require("razorpay")
require("dotenv").config();

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are missing in environment variables.");
}

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    oauthToken: process.env.RAZORPAY_KEY_SECRET
})



const createOrder= async({amount,receipt})=>{
     const options = {
        amount: amount*100,
        currency: "INR",
        receipt,
    }

    try {
        const order = await razorpayInstance.orders.create(options);
        return order;
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        throw new Error("Error creating Razorpay order");
    }

}

const verifyPaymentSignature = (paymentDetails, signature) => {
    const crypto = require("crypto");
    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${paymentDetails.razorpay_order_id}|${paymentDetails.razorpay_payment_id}`)
        .digest("hex");

    return generatedSignature === signature;
}

module.exports={createOrder,verifyPaymentSignature}