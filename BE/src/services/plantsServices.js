const prisma = require("../prisma/prismaClient.js");

const addPlantService = async ({
  name,
  description,
  categoryId,
  price,
  image,
  care,
  size,
  light,
  stock,
  featured,
}) => {
  console.log("Adding Plants");
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  console.log(category);

  if (!categoryId) {
    throw new Error("Category not found");
  }

  const newPlant = await prisma.plant.create({
    data: {
      name,
      description,
      categoryId,
      price,
      image,
      care,
      size,
      light,
      stock,
      featured,
    },
  });

  return newPlant;
};

// ---------------------------------------------------------

// get all plants

const getAllPlants = async () => {
  console.log("Fetching all plants...");

  try {
    const allPlants = await prisma.plant.findMany({
      // skip: (page - 1) * pageSize,
      // take: pageSize,
      include: {
        category: true,
        reviews: true,
      },
    });
    // console.log("heloooooo", JSON.stringify(allPlants, null, 2));
    // const totalPlants = await prisma.plant.count();

    return {
      data: allPlants,
      // totalPages: Math.ceil(totalPlants / pageSize),
    };
  } catch (error) {
    console.error("Error fetching plants:", error);
    throw new Error("Failed to fetch plants");
  }
};

module.exports = {
  addPlantService,
  getAllPlants,
};
