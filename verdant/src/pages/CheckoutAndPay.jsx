import React, { useState } from 'react';
import axios from 'axios';

const getAllCartItems = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return [];

  try {
    const response = await axios.get(`https://verdant-plant-selling-app.onrender.com/cart/getCartItems/${user.id}`);
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

  const handleCartCheckoutAndPayment = async () => {
    setIsLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please log in to continue.");
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
      // Fetching cart items
      const cartItems = await getAllCartItems();

      if (cartItems.length === 0) {
        alert("Your cart is empty!");
        setIsLoading(false);
        return;
      }

      // to Calculate total amount
      const totalAmount = cartItems.reduce((sum, item) => {
        return sum + item.plant.price * item.quantity;
      }, 0);

      // to Create order in backend
      const orderResponse = await axios.post('https://verdant-plant-selling-app.onrender.com/orders/create-order', {
        custId: user.id,
        cartItems: cartItems.map(item => ({
          plantId: item.plant.id,
          quantity: item.quantity
        })),
        totalAmount: totalAmount,
        shippingAddress: address // Use user-input address
      });

      if (!orderResponse.data?.success) {
        alert("Order creation failed.");
        setIsLoading(false);
        return;
      }

      const orderId = orderResponse.data.order.id;

      // to Create Razorpay payment order
      const paymentResponse = await axios.post('https://verdant-plant-selling-app.onrender.com/payment/create-order', {
        orderId: orderId,
        amount: totalAmount
      });

      if (!paymentResponse.data?.success) {
        alert("Payment initialization failed.");
        setIsLoading(false);
        return;
      }

      const paymentData = paymentResponse.data.order;

      // to Razorpay options
      const options = {
        key: import.meta.env.RAZOR_PAY_KEY, //  Razorpay test key
        amount: paymentData.amount * 100, // amount in paise
        currency: "INR",
        name: "Verdant",
        description: "Order Payment",
        order_id: paymentData.id,
        handler: function (response) {
          alert("Payment Successful!");
          console.log("Payment Success:", response);
          // /payment/verify with this data
        },
        prefill: {
          name: user.name,
          email: user.email || "test@example.com",
          contact: "9999999999",
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
      alert("Something went wrong! Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl text-emerald-800 font-semibold mb-4">
        Review Cart & Pay
      </h2>

      {/* Address input */}
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

