const prisma = require("../prisma/prismaClient");


const createCategory = async ({ name, image, description }) => {
  if (!name || !image || !description)
    throw new Error("All fields are required.");

  const existing = await prisma.category.findUnique({ where: { name } });
  if (existing) throw new Error("Category already exists.");

  const category = await prisma.category.create({
    data: { name, image, description },
  });
  return category;
};


const getAllCategories = async () => {
  return await prisma.category.findMany();
};


const getAllCategoriesWithPlants = async () => {
  return await prisma.category.findMany({
    include: { plants: true },
  });
};


module.exports = {
  createCategory,
  getAllCategories,
  getAllCategoriesWithPlants,
};