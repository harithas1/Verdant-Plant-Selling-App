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

  return newPlant
};

// ---------------------------------------------------------


// model Plant {
//   id            Int        @id @default(autoincrement())
//   name          String
//   description   String
//   categoryId    Int
//   price         Float
//   image         String
//   care          String
//   size          Size
//   light         String
//   stock         Int
//   featured      Boolean    @default(false)
//   rating        Float      @default(0.0)
//   createdAt     DateTime   @default(now())
//   updatedAt     DateTime   @updatedAt
//   cartItems     Cart[]
//   orders        Order[]
//   category      Category   @relation(fields: [categoryId], references: [id])
//   reviews       Review[]
//   wishlistItems Wishlist[]
// }




// get all plants


const getAllPlants = async (page, pageSize = 10) => {
  console.log("Fetching all plants...");

  try {
    const allPlants = await prisma.plant.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        category: true,
        reviews: true,
      },
    });

    const totalPlants = await prisma.plant.count();

    return {
      data: allPlants,
      totalPages: Math.ceil(totalPlants / pageSize),
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