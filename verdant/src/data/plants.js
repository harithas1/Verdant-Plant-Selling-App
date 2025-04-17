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

export const plants = await getAllPlants();

const allCategories = async () => {
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

export const categories = await allCategories();

const getAllCartItems = async () => {
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

export const custCartItems = await getAllCartItems();




export const addItemToCart = async ({ custId, plantId, quantity }) => {
  console.log("Adding to cart", custId, plantId, quantity);
  axios
    .post("http://localhost:3000/cart/addToCart", { custId, plantId, quantity })
    .then((response) => {
      console.log("Added to cart:", response.data);
    })
    .catch((error) => {
      console.error("Error adding to cart:", error);
    });
};



