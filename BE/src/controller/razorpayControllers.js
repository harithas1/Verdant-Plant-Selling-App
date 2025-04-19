const {createOrder,verifyPaymentSignature}= require("../services/razorpayServices")
const prisma  = require("../prisma/prismaClient"); 

const createPaymentOrder = async(req,res)=>{
    try{
        const {orderId, amount}= req.body
        if (!orderId || !amount || isNaN(amount)) {
            return res.status(400).json({ success: false, message: "Invalid order details." });
        }

            // to Check if the order exists
        const existingOrder = await prisma.order.findUnique({
        where: { id: orderId },
        });

        if (!existingOrder) {
        return res.status(400).json({ success: false, message: "Order ID does not exist." });
        }

        const receipt= `receipt_order_${orderId}$_${Date.now()}`
        const order = await createOrder({amount,receipt})


        const payment = await prisma.payment.create({
            data:{
                razorpayOrderId:order.id,
                receipt:order.receipt,
                totalAmount:order.amount/100,
                orderId:orderId,
                status:order.status
            }
        })
        res.status(200).json({success:true,order})
    }catch(err){
        console.error("Payment Error: ",err)
        res.status(500).json({success:false,message:"Payment order creation failed"})
    }
}


const verify_Payment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // to Verify the payment signature
        const isValid = verifyPaymentSignature(
            { razorpay_order_id, razorpay_payment_id },
            razorpay_signature
        );

        if (!isValid) {
            return res.status(400).json({ success: false, message: "Payment signature verification failed" });
        }

        // Update payment status to success
        const payment = await prisma.payment.update({
            where: {
                razorpayOrderId: razorpay_order_id,
            },
            data: {
                razorpayPaymentId: razorpay_payment_id,
                status: "success",
            },
        });

        // Update order status to CONFIRMED
        await prisma.order.update({
            where: {
                id: payment.orderId,  
            },
            data: {
                status: "CONFIRMED",
            },
        });

        res.status(200).json({ success: true, message: "Payment verified successfully", payment });
    } catch (err) {
        console.error("Payment verification error: ", err);
        res.status(500).json({ success: false, message: "Payment verification failed" });
    }
};
 
module.exports={createPaymentOrder,verify_Payment}