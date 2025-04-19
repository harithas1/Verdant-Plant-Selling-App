import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  addItemToCart,
  getAllCartItems,
  addProductReview,
  getPlantReviews,
  getAllPlants,
} from "../data/plants";
import {
  // Heart,
  Truck,
  ShieldCheck,
  Sun,
  Ruler,
  ArrowLeft,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PlantCard from "../components/PlantCard";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const ProductDetail = () => {
  const user = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  console.log(user.name);

  const { id } = useParams();
  const [allPlants, setAllPlants]= useState([])
  const [plant, setPlant] = useState(null);
  const [relatedPlants, setRelatedPlants] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [writeReview, setWriteReview] = useState({
    rating: 0,
    date: "",
    comment: "",
    reviewerName: user?.name || "",
    reviewerEmail: user?.email || "",
    custId: user?.id || null,
    plantId: id,
  });
  const [custCartItems, setCustCartItems] = useState([]);
  const [reviews, setReviews] = useState([]);


    useEffect(()=>{
      const fetchPlants= async () => {
        const gettingPlants = await getAllPlants()
        setAllPlants(gettingPlants)
        console.log(allPlants);
      }
      fetchPlants()
    },[])

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      ...writeReview,
      rating,
      date: new Date().toISOString(),
    };

    try {
      await addProductReview(
        newReview.custId,
        newReview.plantId,
        newReview.rating,
        newReview.comment,
        newReview.reviewerName,
        newReview.reviewerEmail
      );

      // Update the UI
      setReviews((prev) => [newReview, ...prev]);
      toast("Thanks for your review!");

      // Reset form
      setIsWritingReview(false);
      setWriteReview({
        rating: 0,
        date: "",
        comment: "",
        reviewerName: user?.name || "",
        reviewerEmail: user?.email || "",
        custId: user?.id || null,
        plantId: id,
      });
      setRating(0);
    } catch (error) {
      toast.error("Please log in to submit a review.");
      console.error("Error submitting review:", error);
    }
  };



  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getAllCartItems();
      setCustCartItems(items || []);
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsOfAPlant = await getPlantReviews({ plantId: id });
      setReviews(reviewsOfAPlant);
      console.log("Fetched reviews:", reviewsOfAPlant);
    };
    if (id) fetchReviews();
  }, [id]); 

  // Mock image gallery - in a real app, each plant would have multiple images
  const mockGallery = [plant?.image, plant?.image, plant?.image, plant?.image];

 useEffect(() => {
  if (!id || allPlants.length === 0) return;

  setLoading(true);
  const foundPlant = allPlants.find((p) => p.id === parseInt(id));
  if (foundPlant) {
    setPlant(foundPlant);

    const related = allPlants
      .filter(
        (p) =>
          p.category.name === foundPlant.category.name &&
          p.id !== foundPlant.id
      )
      .slice(0, 4);
    setRelatedPlants(related);
  }
  setLoading(false);
}, [id, allPlants]);

  // Increase quantity
  const incrementQuantity = () => {
    if (selectedQuantity < plant.stock) {
      setSelectedQuantity((prev) => prev + 1);
    }
  };

  // Decrease quantity
  const decrementQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  };

  // { id: 1, plantId: 1, quantity: 1 },

  const addToCart = async () => {
    console.log(plant);
    if (user) {
      console.log(user);

     const exists = custCartItems.some(
        (item) => item.plantId === plant.id
      );


      // console.log(selectedQuantity);
      
      if (!exists) {
        await addItemToCart({
          custId: user.id,
          plantId: plant.id,
          quantity: selectedQuantity,
        });
      }

      toast(`${selectedQuantity} x ${plant.name} added to your cart.`);
    } else {
      toast("Please Login/ Sign up to Add to Cart");
    }
  };

  const addToWishlist = () => {
    toast(`${plant.name} has been added to your wishlist.`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 bg-gray-200 h-96 rounded-lg"></div>
          <div className="md:w-1/2">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-8"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">
          Plant Not Found
        </h2>
        <p className="text-emerald-600 mb-8">
          The plant you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/shop">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-emerald-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/shop"
            className="flex items-center text-emerald-600 hover:text-emerald-700"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to shop
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Gallery */}
            <div className="md:w-1/2">
              <div className="mb-4 aspect-square overflow-hidden rounded-md">
                <img
                  src={mockGallery[activeImage]}
                  alt={plant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {mockGallery.filter(Boolean).map((img, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 h-20 w-20 rounded-md overflow-hidden border-2 ${
                      activeImage === index
                        ? "border-emerald-600"
                        : "border-transparent"
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={img}
                      alt={`${plant.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2">
              <div className="mb-6">
                <h1 className="text-3xl font-display font-bold text-sky-600 mb-2">
                  {plant.name}
                </h1>
                <p className="text-emerald-600 mb-4">{plant.category.name}</p>
                <div className="text-2xl font-semibold text-emerald-700 mb-6">
                  ₹ {plant.price.toFixed(2)}
                </div>
                <p className="text-emerald-700 mb-6">{plant.description}</p>

                {/* Plant Specifications */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center space-x-2 bg-amber-100 px-3 py-1.5 rounded-full">
                    <Sun size={16} className="text-emerald-600" />
                    <span className="text-sm text-emerald-700">
                      {plant.light}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 bg-amber-100 px-3 py-1.5 rounded-full">
                    <Ruler size={16} className="text-emerald-600" />
                    <span className="text-sm text-emerald-700">
                      {plant.size}
                    </span>
                  </div>
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {plant.stock > 5 ? (
                    <div className="text-sky-600">In Stock</div>
                  ) : plant.stock > 0 ? (
                    <div className="text-amber-600 font-medium">
                      Only {plant.stock} left!
                    </div>
                  ) : (
                    <div className="text-muted-foreground">Out of Stock</div>
                  )}
                </div>

                {/* Quantity Selector */}
                {plant.stock > 0 && (
                  <div className="flex items-center mb-6">
                    <span className="mr-4 text-emerald-700">Quantity:</span>
                    <div className="flex items-center border border-emerald-200 rounded-md">
                      <button
                        className="px-3 py-1 text-emerald-600 hover:text-emerald-800 disabled:text-emerald-300"
                        onClick={decrementQuantity}
                        disabled={selectedQuantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1 border-x border-emerald-200 min-w-[40px] text-center">
                        {selectedQuantity}
                      </span>
                      <button
                        className="px-3 py-1 text-emerald-600 hover:text-emerald-800 disabled:text-emerald-300"
                        onClick={incrementQuantity}
                        disabled={selectedQuantity >= plant.stock}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Add to Cart & Wishlist */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    className={`flex-1 flex items-center  justify-center py-6 ${
                      plant.stock > 0
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-muted cursor-not-allowed"
                    }`}
                    disabled={plant.stock === 0}
                    onClick={addToCart}
                  >
                    {plant.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  {/* <Button
                    variant="outline"
                    className="flex-shrink-0 py-6 flex items-center justify-center gap-2 border-emerald-600 text-emerald-600 hover:bg-emerald-100"
                    onClick={addToWishlist}
                  >
                    <Heart size={18} /> Add to Wishlist
                  </Button> */}
                </div>

                {/* Benefits */}
                <div className="space-y-3 border-t border-emerald-100 pt-6">
                  <div className="flex items-start gap-3">
                    <Truck
                      size={18}
                      className="text-emerald-600 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-emerald-800">
                        Free Shipping
                      </h4>
                      <p className="text-xs text-emerald-600">
                        On orders over $500
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={18}
                      className="text-emerald-600 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-emerald-800">
                        30-Day Guarantee
                      </h4>
                      <p className="text-xs text-emerald-600">
                        If your plant arrives damaged or unhealthy
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="bg-amber-50 border rounded-lg shadow-sm overflow-hidden p-4 md:p-8 mb-12">
          {/* <Tabs defaultValue="care">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="writeReview">Write Review</TabsTrigger>
            </TabsList>
            <TabsContent value="reviews" className="p-4"> */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-emerald-800">
              Customer Reviews
            </h3>
            <Button
              onClick={() => setIsWritingReview(!isWritingReview)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Write a Review
            </Button>
          </div>

          {isWritingReview && (
            <form
              onSubmit={handleReviewSubmit}
              className="bg-white border rounded-lg shadow-lg p-4 mb-8"
            >
              {/* Rating stars */}
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* Text input */}
              <textarea
                placeholder="Write your review..."
                className="w-full border rounded p-2 mb-4"
                rows="4"
                value={writeReview.comment}
                onChange={(e) =>
                  setWriteReview({ ...writeReview, comment: e.target.value })
                }
              />

              {/* reviwer input */}
              <input
                type="text"
                placeholder="Your name"
                className="w-full border rounded p-2 mb-4"
                value={user.name}
                readOnly
              />

              {/* Submit button */}
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Submit Review
              </button>
            </form>
          )}

          <div className="space-y-6  overflow-y-scroll">
            {reviews?.map((review, index) => (
              <div
                key={index}
                className={`border-b ${
                  index !== reviews.length - 1 ? "border-emerald-200" : ""
                } pb-6`}
              >
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-stone-500 mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        {star <= review.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-emerald-600">
                    {new Date(review.date).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <p className="text-emerald-600 mb-2">{review.comment}</p>
                <div className="text-sm text-emerald-700 font-medium">
                  - {review.reviewerName}
                </div>
              </div>
            ))}
          </div>

          {/* </TabsContent>
            <TabsContent value="writeReview"></TabsContent>
          </Tabs> */}
        </div>

        {/* Related Products */}
        {relatedPlants.length > 0 && (
          <div className="mb-12 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-semibold text-emerald-900">
                You May Also Like
              </h2>
              <Link
                to="/shop"
                className="text-emerald-600 hover:text-emerald-700"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedPlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* <footer className="sticky">
        <Toaster />
      </footer> */}
    </div>
  );
};

export default ProductDetail;
