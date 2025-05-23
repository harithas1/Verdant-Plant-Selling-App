import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  newsletterSubsription, getAllPlants, allCategories } from "../data/plants";
import { ChevronRight, ChevronLeft, Truck, Droplet, Award, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlantCard from "@/components/PlantCard";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation,Autoplay } from 'swiper/modules';



const Home = () => {
  const [allReviews,setAllReviews] = useState([])
  // Get featured plants
  const [featuredPlants,setFeaturedPlants] = useState([])
  const [categories,setCategories]= useState([])

  useEffect(()=>{
    const fetchData = async () => {
       const plants = await getAllPlants();

      // Extracting reviews from all plants
      const reviews = plants.flatMap((plant) => plant.reviews || []);
      setAllReviews(reviews);
      console.log("All reviews:", reviews);
      
      const featured= plants.filter((plant)=>plant.featured)
      setFeaturedPlants(featured)

      const cats= await allCategories()
      setCategories(cats)}
    fetchData();
  },[])


  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value.trim();
    if (!email) {
      toast("Please enter your email.");
      return;
    }
    try {
      await newsletterSubsription({ email });
      toast("Thanks for subscribing!");
      e.target.reset();
    } catch (error) {
        if (error.response?.data?.error === "This email is already subscribed.") {
          toast("You are already subscribed with this email.");
        } else {
          toast("Subscription failed. Please try again later.");
        }
        console.error(error);
      }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center bg-emerald-50 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.4,
          }}
        ></div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-lg">
            <h1 className="font-display text-6xl md:text-5xl lg:text-6xl font-bold text-emerald-900 text-shadow-cyan-400 text-shadow-2xs mb-4">
              Breathe Life Into Your Space
            </h1>
            <p className="text-emerald-700 text-lg mb-8 max-w-md">
              Discover our collection of beautiful, ethically sourced plants
              that will transform your home into a vibrant oasis.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/shop">
                <Button className="bg-emerald-800 hover:bg-emerald-950 text-white px-8 py-6 rounded-md">
                  Shop Now
                </Button>
              </Link>
              <Link to="/care-guides">
                <Button
                  variant="outline"
                  className="border-emerald-900 text-emerald-950 bg-transparent hover:bg-emerald-50 px-8 py-6 rounded-md"
                >
                  Plant Care Tips
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}

      <section className="py-16" id="shop-by-categories">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-semibold text-emerald-900 mb-6 text-center">
            Shop by Category
          </h2>
          {!categories.length ? (
            <div className="p-8 text-center text-emerald-700">
              Loading categories...
            </div>
          ) : (
            <div className="relative">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 4 },
                }}
                navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
                loop={true}
                autoplay={{
                  delay:3000,
                  disableOnInteraction:false // Allow autoplay even after manual swipe
                }}
              >
                {categories.map((category) => (
                  <SwiperSlide key={category.id}>
                    <Link to={`/shop/category/${category.name}`} className="block group">
                      <div className="relative overflow-hidden rounded-lg shadow-sm">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-800 to-transparent opacity-70"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-xl font-semibold mb-1">
                            {category.name}
                          </h3>
                          <p className="text-amber-100 text-sm mb-2">
                            {category.description}
                          </p>
                          <span className="inline-flex items-center text-amber-50 text-sm font-medium">
                            Shop Now                     <ChevronRight size={16} className="ml-1 text-emerald-400 hover:text-emerald-600 transition-colors duration-300" />

                          </span>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 p-2 z-10 cursor-pointer text-white hover:text-emerald-600">
                <ChevronLeft size={24} />
              </div>
              <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 p-2 z-10 cursor-pointer text-white hover:text-emerald-600">
                <ChevronRight size={24} />
              </div>
            </div>
            )}
        </div>
      </section>

      {/* Featured Plants Section */}
     <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-display font-semibold text-emerald-900">
              Featured Plants
            </h2>
            <Link
              to="/shop"
              className="text-emerald-600 hover:text-emerald-700 inline-flex items-center font-medium transition-colors duration-200"
            >
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        {!featuredPlants.length ?(
        <div className="p-8 text-center text-emerald-700">
        Loading Featured Plants...</div>):(
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredPlants.slice(0, 4).map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
          )}
        </div>
      </section>
    
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-semibold text-emerald-900 mb-6 text-center">
            Why Choose Our Plants?
          </h2>
          <p className="text-center text-emerald-700 max-w-2xl mx-auto mb-12">
            We carefully select and nurture every plant to ensure you receive
            only the healthiest, happiest plants.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Truck className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-semibold text-emerald-900 mb-2">
                Fast Shipping
              </h3>
              <p className="text-emerald-700 text-sm">
                Plants delivered to your door in perfect condition, with
                packaging designed to protect every leaf.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Droplet className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-semibold text-emerald-900 mb-2">Easy Care</h3>
              <p className="text-emerald-700 text-sm">
                Detailed care instructions with every plant, plus ongoing
                support from our plant experts.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Award className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-semibold text-emerald-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-emerald-700 text-sm">
                Sustainably grown plants from trusted growers who share our
                passion and values.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="text-emerald-600" size={24} />
              </div>
              <h3 className="font-semibold text-emerald-900 mb-2">
                30-Day Guarantee
              </h3>
              <p className="text-emerald-700 text-sm">
                If your plant arrives damaged or unhealthy, we'll replace it
                free of charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-semibold text-emerald-900 text-center mb-12">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {allReviews.slice(0, 3).map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center space-x-1 mb-4 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>{star <= review.rating ? "★" : "☆"}</span>
                  ))}
                </div>
                <p className="text-emerald-700 mb-4 italic">
                  "{review.comment}"
                </p>
                <div className="font-semibold text-emerald-800">
                  - {review.reviewerName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-emerald-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-semibold text-white mb-4">
              Join Our Plant Lovers Community
            </h2>
            <p className="text-white mb-8">
              Subscribe to our newsletter for plant care tips, special offers,
              and first dibs on new arrivals.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row max-w-lg mx-auto"
            >
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-md sm:rounded-r-none placeholder:text-black bg-white mb-2 sm:mb-0 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-orange-300 hover:bg-yellow-600 font-semibold px-6 py-3 rounded-md sm:rounded-l-none transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      {/* <footer>
        <Toaster />
      </footer> */}
    </div>
  );
};

export default Home;
