import React from "react";
import { Link } from "react-router-dom";
import { plants, categories } from "../data/plants";
import { ChevronRight, Truck, Droplet, Award, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlantCard from "@/components/PlantCard";

const Home = () => {
  // Get featured plants
  const featuredPlants = plants.filter((plant) => plant.featured);

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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className=" text-3xl font-display font-semibold text-emerald-900 mb-6 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="block group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-sm">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-64 w-full place-self-center object-cover transition-transform duration-300 group-hover:scale-105"
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
                      Shop Now <ChevronRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plants Section */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-display font-semibold text-emerald-900 mb-6">
              Featured Plants
            </h2>
            <Link
              to="/shop"
              className="text-emerald-600 hover:text-emerald-700 inline-flex items-center font-medium"
            >
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden">
            {featuredPlants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
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

      {/* Testimonials */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-semibold text-emerald-900 text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-4 text-amber-500">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className="text-emerald-700 mb-4 italic">
                "My monstera arrived in perfect condition and was even bigger
                than I expected! It's thriving in my living room and I've
                already ordered more plants."
              </p>
              <div className="font-semibold text-emerald-800">- Sarah K.</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-4 text-amber-500">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className="text-emerald-700 mb-4 italic">
                "The care instructions were so helpful for a plant newbie like
                me. Three months later and all my plants are still alive and
                growing!"
              </p>
              <div className="font-semibold text-emerald-800">- James T.</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-1 mb-4 text-amber-500">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <p className="text-emerald-700 mb-4 italic">
                "Exceptional customer service when I had questions about my
                fiddle leaf fig. The team went above and beyond to help me solve
                the issue."
              </p>
              <div className="font-semibold text-emerald-800">- Maria L.</div>
            </div>
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
            <div className="flex flex-col sm:flex-row max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l-md sm:rounded-r-none placeholder:text-black bg-white mb-2 sm:mb-0 focus:outline-none"
              />
              <button className="bg-orange-300 hover:bg-yellow-600  font-semibold px-6 py-3 rounded-md sm:rounded-l-none transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
