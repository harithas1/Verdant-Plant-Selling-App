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

export const categories = await allCategories()

