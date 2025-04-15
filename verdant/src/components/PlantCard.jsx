import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const PlantCard = ({ plant }) => {
  return (
    <div className="plant-card group shadow-lg bg-white rounded-lg">
      <div className="relative overflow-hidden ">
        <Link to={`/shop/${plant.id}`}>
          <img
            src={plant.image}
            alt={plant.name}
            className="h-48 w-full place-self-center object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <button
          className="absolute top-3 right-3 bg-white bg-opacity-80 p-1.5 rounded-full text-emerald-600 hover:bg-opacity-100 transition-colors"
          aria-label="Add to wishlist"
          title="Add to wishlist"
        >
          <Heart size={20} />
        </button>
        {plant.stock <= 5 && plant.stock > 0 && (
          <div className="absolute top-3 left-3 bg-amber-500 text-emerald-800 text-xs font-semibold px-2 py-1 rounded">
            Only {plant.stock} left!
          </div>
        )}
        {plant.stock === 0 && (
          <div className="absolute top-3 left-3 bg-muted-foreground text-white text-xs font-semibold px-2 py-2 rounded">
            Sold Out
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-evenly">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/shop/${plant.id}`}>
            <h3 className="font-medium text-emerald-800 hover:text-emerald-600 transition-colors">
              {plant.name}
            </h3>
          </Link>
        </div>
        <div>
          <p className="text-sm text-emerald-600 ">{plant.category}</p>
          <p className="font-semibold text-sky-600 my-3">
            ${plant.price.toFixed(2)}
          </p>
        </div>
        {/* <div className="mt-auto flex justify-between items-center"> */}
        {/* <div className="flex items-center bg-amber-100 px-0.5 space-x-1">
            <span className="text-emerald-600 text-xs">{plant.size}</span>
            <span className="text-emerald-400">•</span>
            <span className="text-emerald-600 text-xs">{plant.light}</span>
          </div> */}
        <button
          className={`text-sm w-full  font-medium px-3 py-2 rounded ${
            plant.stock > 0
              ? "bg-emerald-600  text-white hover:bg-emerald-700"
              : "bg-muted cursor-not-allowed text-muted-foreground"
          } transition-colors`}
          disabled={plant.stock === 0}
        >
          {plant.stock > 0 ? "Add to cart" : "Sold out"}
        </button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default PlantCard;
