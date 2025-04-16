import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  ChevronLeft,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { plants } from "../data/plants";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

// Mock cart data
export const initialCartItems = [
  { id: 1, plantId: 1, quantity: 1 },
  { id: 2, plantId: 6, quantity: 2 },
  { id: 3, plantId: 9, quantity: 1 },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // to get full plant details for cart items
  const cartWithDetails = cartItems.map((item) => {
    const plant = plants.find((p) => p.id === item.plantId);
    return { ...item, plant };
  });

  // to calculate totals
  const subtotal = cartWithDetails.reduce((acc, item) => {
    return acc + item.plant.price * item.quantity;
  }, 0);

  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  // to update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const item = cartWithDetails.find((item) => item.id === id);
    if (item && newQuantity > item.plant.stock) {
      toast(`Sorry, we only have ₹ {item.plant.stock} of this item in stock.`);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // to remove item from cart
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast("The item has been removed from your cart.");
  };

  //to proceed to checkout
  const checkout = () => {
    toast("Proceeding to checkout...");
  };

  return (
    <div className="bg-amber-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-emerald-900 mb-8">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-600"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-emerald-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-emerald-600 mb-6">
              Looks like you haven't added any plants to your cart yet.
            </p>
            <Link to="/shop">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-amber-50 text-emerald-700 font-medium">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {cartWithDetails.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-amber-200 last:border-0"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                      {/* Product - Mobile & Desktop */}
                      <div className="md:col-span-6 flex items-center">
                        <div className="w-20 h-20 flex-shrink-0 bg-amber-50 rounded-md overflow-hidden mr-4">
                          <img
                            src={item.plant.image}
                            alt={item.plant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            to={`/shop/₹ {item.plant.id}`}
                            className="font-medium text-emerald-800 hover:text-emerald-600"
                          >
                            {item.plant.name}
                          </Link>
                          <p className="text-sm text-emerald-600">
                            {item.plant.category.name}
                          </p>
                          <p className="text-sm text-emerald-600 md:hidden mt-1">
                            ₹ {item.plant.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Price - Desktop */}
                      <div className="hidden md:block md:col-span-2 text-center text-emerald-700">
                        ₹ {item.plant.price.toFixed(2)}
                      </div>

                      {/* Quantity - Mobile & Desktop */}
                      <div className="md:col-span-2 md:text-center flex items-center justify-between md:justify-center">
                        <span className="text-emerald-600 md:hidden">
                          Quantity:
                        </span>
                        <div className="flex items-center border border-emerald-200 rounded-md">
                          <button
                            className="px-2 py-1 text-emerald-600 hover:text-emerald-800"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1 border-x border-emerald-200">
                            {item.quantity}
                          </span>
                          <button
                            className="px-2 py-1 text-emerald-600 hover:text-emerald-800"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Total - Mobile & Desktop */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-end">
                        <span className="text-emerald-600 md:hidden">
                          Total:
                        </span>
                        <div className="flex items-center">
                          <span className="font-medium text-emerald-800 mr-4">
                            ₹ {(item.plant.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            className="text-emerald-600 hover:text-emerald-800"
                            onClick={() => removeItem(item.id)}
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="flex justify-between items-center mb-8">
                <Link
                  to="/shop"
                  className="flex items-center text-emerald-600 hover:text-emerald-700"
                >
                  <ChevronLeft size={16} className="mr-1" /> Continue Shopping
                </Link>
                <Button
                  variant="outline"
                  className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                  onClick={() => setCartItems([])}
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-emerald-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-emerald-700">
                    <span>Subtotal</span>
                    <span>₹ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `₹ ₹ {shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-emerald-100">
                    <div className="flex justify-between font-semibold text-emerald-800">
                      <span>Total</span>
                      <span>₹ {total.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-emerald-600 text-right mt-1">
                      Including taxes
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-lg mb-4"
                  onClick={checkout}
                >
                  Checkout
                </Button>

                {/* Reassurance information */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Truck
                      size={16}
                      className="text-emerald-600 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-emerald-600">
                      Free shipping on orders over ₹ 50
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck
                      size={16}
                      className="text-emerald-600 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-emerald-600">
                      30-day money-back guarantee
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <footer>
        <Toaster />
      </footer>
    </div>
  );
};

export default Cart;
