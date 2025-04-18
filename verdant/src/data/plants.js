import axios from "axios";

export const getAllPlants = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/plants/getAllPlants"
    );
    console.log(response.data.data);

    return response.data.data;
  } catch (err) {
    console.error("Error fetching plants:", err);
    return [];
  }
};

export const allCategories = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/category/getAllCategories"
    );
    console.log(response.data);

    return response.data;
  } catch (err) {
    console.error("Error fetching plants:", err);
    return [];
  }
};

// export const plants = await getAllPlants();
// export const categories = await allCategories();

export const getAllCartItems = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  if (user) {
    try {
      const response = await axios.get(
        ` http://localhost:3000/cart/getCartItems/${user.id}`
      );
      console.log(response.data.cartItems);

      return response.data.cartItems;
    } catch (err) {
      console.error("Error fetching plants:", err);
      return [];
    }
  }
};

export const addItemToCart = async ({ custId, plantId, quantity }) => {
  console.log("Adding to cart", custId, plantId, quantity);
  axios
    .post("http://localhost:3000/cart/addToCart", {
      custId,
      plantId,
      quantity,
    })
    .then((response) => {
      console.log("Added to cart:", response.data);
    })
    .catch((error) => {
      console.error("Error adding to cart:", error);
    });
};

export const removeFromCart = async ({ custId, plantId }) => {
  // If the product is already in the cart, remove it
  console.log("removing...", custId, plantId);

  axios
    .delete("http://localhost:3000/cart/removeCartItem", {
      data: { custId, plantId },
    })
    .then((response) => {
      console.log("Removed from cart:", response.data);
    })
    .catch((error) => {
      console.error("Error removing from cart:", error);
    });
};

export const updateCartItemQuantity = async ({ custId, plantId, quantity }) => {
  axios
    .put("http://localhost:3000/cart/updateCartQuantity", {
      custId,
      plantId,
      quantity,
    })
    .then((response) => {
      console.log("Quantity updated:", response.data);
    })
    .catch((error) => {
      console.error("Error updating quantity:", error);
    });
};

export const clearCartItems = async ({ custId }) => {
  console.log("clearing cart...", custId);

  axios
    .delete("http://localhost:3000/cart/clearCart", {
      data: { custId },
    })
    .then((response) => {
      console.log("Cart cleared:", response.data);
    })
    .catch((error) => {
      console.error("Error clearing the cart: ", error);
    });
};

export const addProductReview = async (
  custId,
  plantId,
  rating,
  comment,
  reviewerName,
  reviewerEmail
) => {
  console.log(custId, plantId, rating, comment, reviewerName, reviewerEmail);

  try {
    const response = await axios.post(
      "http://localhost:3000/reviews/addReview",
      {
        custId: Number(custId),
        plantId: Number(plantId),
        rating: Number(rating),
        comment,
        reviewerName,
        reviewerEmail,
      }
    );
    console.log("Review added:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const getPlantReviews = async ({ plantId }) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/reviews/getReviews/${plantId}`
    );
    console.log(response);

    return response.data;
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return [];
  }
};

export const newsletterSubsription = async ({ email }) => {
  console.log("subscribing...", email);

  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/subscribe",
      { email }
    );
    console.log(response);
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
