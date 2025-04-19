import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const custId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/orders/get/${custId}`
        );
        console.log(response.data);
        setOrders(response.data.orders);
        if (response.data.orders.length === 0) {
          toast.info("You haven’t placed any orders yet. Let’s explore some plants!");
          setTimeout(() => navigate("/shop"), 3000);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to fetch your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (custId) {
      fetchOrders();
    } else {
      toast.warning("User not found, please log in again.");
      navigate("/login");
    }
  }, [custId, navigate]);

  if (loading) {
    return <div className="text-center mt-10">Loading your orders...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl text-emerald-800 font-semibold mb-6">Your Orders</h1>
      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-2xl p-4 shadow-sm flex gap-4 items-center">
            <img
              src={order.plant?.image}
              alt={order.plant?.name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex-1">
              <Link
                to={`/shop/${order.plant.id}`}
                className="font-medium text-emerald-800 hover:text-emerald-600"
              >
                {order.plant.name}
              </Link>
              <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
              <p className="text-sm text-gray-600">Total: ₹{order.totalAmount}</p>
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
