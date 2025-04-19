import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const custId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `https://verdant-plant-selling-app.onrender.com/orders/get/${custId}`
        );
        console.log(response.data);
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [custId]);

  if (loading) {
    return <div className="text-center mt-10">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center mt-10">You haven’t placed any orders yet.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl text-emerald-800 font-semibold mb-6">Your Orders</h1>
      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-2xl p-4 shadow-sm flex gap-4 items-center">
            {/* Display Plant Image */}
            <img
              src={order.plant?.image}
              alt={order.plant?.name}
              className="w-24 h-24 rounded-lg object-cover"
            />

            <div className="flex-1">
              {/* Plant Name */}
               <Link
                to={`/shop/${order.plant.id}`}
                className="font-medium text-emerald-800 hover:text-emerald-600"
                >
                {order.plant.name}
                </Link>
              
              {/* Quantity and Total */}
              <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
              <p className="text-sm text-gray-600">Total: ₹{order.totalAmount}</p>

              {/* Order Status */}
              <p className="text-sm mt-1">
                Status:{" "}
                <span
                  className={`font-medium ${
                    order.status === "DELIVERED"
                      ? "text-green-600"
                      : order.status === "SHIPPED"
                      ? "text-blue-500"
                      : order.status === "CANCELLED"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {order.status}
                </span>
              </p>

              {/* Order Date */}
              <p className="text-xs text-gray-500 mt-1">
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
