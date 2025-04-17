const prisma =  require("../prisma/prismaClient")

const addReview = async ({
  custId,
  reviewerName,
  reviewerEmail,
  plantId,
  rating,
  comment,
}) => {
  return await prisma.review.create({
    data: {
      custId,
      reviewerName,
      reviewerEmail,
      plantId,
      rating,
      comment,
      date: new Date(),
    },
  });
};

const getPlantReviews = async (plantId) => {
    console.log(plantId);
    
  return await prisma.review.findMany({
    where: { plantId },
    orderBy: { date: "desc" },
  });
};

module.exports = {
  addReview,
  getPlantReviews,
};
