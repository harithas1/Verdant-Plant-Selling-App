import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const getAllCartItems = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return [];

  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cart/getCartItems/${user.id}`);
    console.log(response);
    
    return response.data.cartItems || [];
  } catch (err) {
    console.error("Error fetching cart items:", err);
    return [];
  }
};

function CartCheckoutAndPay() {
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(true);
  const navigate = useNavigate()

  const handleCartCheckoutAndPayment = async () => {
    setIsLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast("Please log in to continue.");
      setIsLoading(false);
      return;
    }

    if (!address || address.trim().length === 0) {
      setIsAddressValid(false);
      setIsLoading(false);
      return;
    } else {
      setIsAddressValid(true);
    }

    try {
      const cartItems = await getAllCartItems();

      if (cartItems.length === 0) {
        toast("Your cart is empty!");
        setIsLoading(false);
        return;
      }

      let totalAmount = 0;
      let allOrderIds = [];

      // Create orders one by one for each cart item
      for (const item of cartItems) {
        const orderPayload = {
          custId: user.id,
          plantId: item.plant.id,
          quantity: item.quantity,
          totalAmount: item.plant.price * item.quantity,
          shippingAddress: address
        };

        console.log("Creating order with payload:", orderPayload);

        const orderResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/orders/create-order`,
          orderPayload
        );

        if (!orderResponse.data?.success) {
          toast(`Order creation failed for ${item.plant.name}`);
          setIsLoading(false);
          return;
        }

        allOrderIds.push(orderResponse.data.order.id);
        totalAmount += orderPayload.totalAmount;
      }

      console.log("All Orders Created:", allOrderIds[0]);
      
      toast(`Orders created! Status: PENDING\nTotal Orders: ${allOrderIds.length}\nProceeding to Payment...`)
      
      const paymentResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/payment/create-order`,
        {
          orderId: allOrderIds[0],  
          amount: totalAmount
        }
      );

      if (!paymentResponse.data?.success) {
        toast("Payment initialization failed.Please try again.");
        setIsLoading(false);
        return;
      }

      const paymentData = paymentResponse.data.order;
      // console.log(import.meta.env.VITE_RAZOR_PAY_KEY);

      const options = {
        key: import.meta.env.VITE_RAZOR_PAY_KEY,
        amount: paymentData.amount * 100, // amount in paise
        currency: "INR",
        name: "Verdant",
        description: "Order Payment",
        order_id: paymentData.id,
        handler: async function (response) {
        try {
          const verifyResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/payment/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }
          );

          if (verifyResponse.data.success) {
            toast("Payment verified & Order Confirmed!");
            navigate("/orders/get");  

          } else {
            toast("⚠️ Payment verification failed, contact support.");
          }
        } catch (err) {
          console.error("Verification error:", err);
          toast("⚠️ Error during payment verification.");
        }
      },
        prefill: {
          name: user.name,
          email: user.email || "test@example.com",
          contact: user.phone
        },
        notes: {
          address: address
        },
        theme: {
          color: "#10b981"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error("Checkout Error:", err);
      toast("Something went wrong! Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl text-emerald-800 font-semibold mb-4">
        Review Cart & Pay
      </h2>

      <div className="mb-4">
        <label htmlFor="address" className="block text-sm text-emerald-700 mb-2">Shipping Address</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows="4"
          className={`w-full p-2 border rounded ${isAddressValid ? "border-emerald-300" : "border-red-500"}`}
          placeholder="Enter your shipping address"
        ></textarea>
        {!isAddressValid && <p className="text-xs text-red-500">Please provide a valid address.</p>}
      </div>

      <button
        onClick={handleCartCheckoutAndPayment}
        disabled={isLoading}
        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-lg rounded"
      >
        {isLoading ? 'Processing...' : 'Checkout & Pay'}
      </button>
    </div>
  );
}

export default CartCheckoutAndPay;
