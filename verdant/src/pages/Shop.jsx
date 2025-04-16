import React, { useState, useEffect } from "react";
import { plants } from "../data/plants";
import PlantCard from "../components/PlantCard";
import { Slider } from "@/components/ui/slider";
import { Leaf, ArrowUpDown, Filter } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const Shop = () => {
  const [filteredPlants, setFilteredPlants] = useState(plants);
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [lightLevels, setLightLevels] = useState([]);
  const [sortBy, setSortBy] = useState("filtered");
  const [showFilters, setShowFilters] = useState(false);
  const [availablePriceRange, setAvailablePriceRange] = useState([0, 0]); // storing price range

  // Get unique categories, sizes, and light levels
  const allCategories = [
    ...new Set(plants.map((plant) => plant.category.name)),
  ];
  const allSizes = [...new Set(plants.map((plant) => plant.size))];
  const allLightLevels = [...new Set(plants.map((plant) => plant.light))];

  useEffect(() => {
    if (plants.length > 0) {
      const prices = plants.map((plant) => plant.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setAvailablePriceRange([min, max]);
      setPriceRange([min, max]); // initial filter range equals available
    }
  }, []);

  // Filter products based on selected filters
  useEffect(() => {
    let filtered = [...plants];

    // Filter by price range
    filtered = filtered.filter(
      (plant) => plant.price >= priceRange[0] && plant.price <= priceRange[1]
    );

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((plant) =>
        selectedCategories.includes(plant.category.name)
      );
    }

    // Filter by sizes
    if (sizes.length > 0) {
      filtered = filtered.filter((plant) => sizes.includes(plant.size));
    }

    // Filter by light levels
    if (lightLevels.length > 0) {
      filtered = filtered.filter((plant) => lightLevels.includes(plant.light));
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredPlants(filtered);
  }, [priceRange, selectedCategories, sizes, lightLevels, sortBy]);

  // Toggle category in filter
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Toggle size in filter
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Toggle light level in filter
  const toggleLightLevel = (level) => {
    setLightLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange(availablePriceRange);
    setSelectedCategories([]);
    setSizes([]);
    setLightLevels([]);
    setSortBy("filtered");
  };

  return (
    <div className="bg-amber-50 min-h-screen overflow-x-hidden">
      <div className="container mx-auto px-4 py-8 overflow-hidden">
        <h1 className="text-3xl font-display font-bold text-emerald-800 mb-2">
          Shop Plants
        </h1>
        <p className="text-emerald-600 mb-8">
          Find the perfect plant for your space
        </p>

        {/* Mobile filter button and sort dropdown */}
        <div className="flex text-sm flex-row gap-2 justify-evenly items-center mb-6 md:hidden">
          <button
            className="flex items-center space-x-2 bg-white px-2 py-2 rounded-md shadow-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            <span>Filters</span>
          </button>

          <div className="relative">
            <select
              className="bg-white pl-2 py-2 rounded-md shadow-sm focus:outline-none text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
            {/* <span className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              ⇅
            </span> */}
            {/* <ArrowUpDown
              size={16}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
            /> */}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters - Desktop */}
          <div
            className={`md:w-1/4 lg:w-1/5 bg-white p-4 rounded-md shadow-sm md:block ${
              showFilters ? "block" : "hidden"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-emerald-800">
                Filters
              </h2>
              <button
                className="text-sm text-emerald-600 hover:text-emerald-700"
                onClick={resetFilters}
              >
                Reset All
              </button>
            </div>

            <Accordion type="single" collapsible defaultValue="price">
              {/* Price Range */}
              <AccordionItem value="price">
                <AccordionTrigger className="text-emerald-700 hover:text-emerald-800">
                  Price Range
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2 px-1">
                    <Slider
                      defaultValue={[0, 50]}
                      min={availablePriceRange[0]}
                      max={availablePriceRange[1]}
                      step={1}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                    <div className="flex justify-between text-sm text-emerald-600 mt-1">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Categories */}
              <AccordionItem value="categories">
                <AccordionTrigger className="text-emerald-700 hover:text-emerald-800">
                  Categories
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 mt-2">
                    {allCategories.map((category) => (
                      <div key={category} className="flex items-center">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                          className="border-emerald-300 data-[state=checked]:bg-emerald-600"
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm text-emerald-700 cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Size */}
              <AccordionItem value="size">
                <AccordionTrigger className="text-emerald-700 hover:text-emerald-800">
                  Size
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 mt-2">
                    {allSizes.map((size) => (
                      <div key={size} className="flex items-center">
                        <Checkbox
                          id={`size-${size}`}
                          checked={sizes.includes(size)}
                          onCheckedChange={() => toggleSize(size)}
                          className="border-emerald-300 data-[state=checked]:bg-emerald-600"
                        />
                        <label
                          htmlFor={`size-${size}`}
                          className="ml-2 text-sm text-emerald-700 cursor-pointer"
                        >
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Light Level */}
              <AccordionItem value="light">
                <AccordionTrigger className="text-emerald-700 hover:text-emerald-800">
                  Light Level
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 mt-2">
                    {allLightLevels.map((light) => (
                      <div key={light} className="flex items-center">
                        <Checkbox
                          id={`light-${light}`}
                          checked={lightLevels.includes(light)}
                          onCheckedChange={() => toggleLightLevel(light)}
                          className="border-emerald-300 data-[state=checked]:bg-emerald-600"
                        />
                        <label
                          htmlFor={`light-${light}`}
                          className="ml-2 text-sm text-emerald-700 cursor-pointer"
                        >
                          {light}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Mobile Close Button */}
            <Button
              className="w-full mt-4 md:hidden bg-emerald-600 hover:bg-emerald-700"
              onClick={() => setShowFilters(false)}
            >
              Apply Filters
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort options - Desktop */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <p className="text-emerald-600">
                {filteredPlants.length} products
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-verdant-700">Sort by:</span>
                <select
                  className="bg-white px-3 py-1.5 rounded-md border border-verdant-200 focus:outline-none focus:ring-1 focus:ring-verdant-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>
            {/* Products Grid */}
            {/* grid-cols-1 md:grid-cols-2 lg:grid-cols-4 */}
            {filteredPlants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 overflow-hidden">
                {filteredPlants.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-md shadow-sm">
                <div className="mx-auto w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="text-emerald-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                  No Plants Found
                </h3>
                <p className="text-emerald-600 mb-4">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={resetFilters}
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
