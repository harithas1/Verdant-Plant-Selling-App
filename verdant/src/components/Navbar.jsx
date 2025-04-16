import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/useSearch";
import SearchResults from "./SearchResults";
import logoVerdant from "../assets/logoVerdant.png";
import v from "../assets/v.png";
import { useAuth } from "@/context/AuthContext.jsx";

const Navbar = ({ cartItemCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchResults, searchPlants } = useSearch();
  const { user, setUser } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  console.log(user);

  const handleSearchChange = (e) => {
    searchPlants(e.target.value);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    searchPlants("");
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container px-4 mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img className="h-16 rounded-4xl" src={logoVerdant} alt="" />

            <h1 className="text-emerald-900 flex place-items-center font-display text-2xl font-bold">
              <img className="size-5" src={v} alt={v} />
              <span>erdant</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/shop"
              className="text-emerald-700 hover:text-emerald-600 transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/categories"
              className="text-emerald-700 hover:text-emerald-600 transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/care-guides"
              className="text-emerald-700 hover:text-emerald-600 transition-colors"
            >
              Care Guides
            </Link>
            <Link
              to="/about"
              className="text-emerald-700 hover:text-emerald-600 transition-colors"
            >
              About
            </Link>
          </nav>
          {/* Search and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-emerald-700 hover:text-emerald-600 transition-colors"
            >
              <Search size={20} />
            </button>
            <Link
              to="/cart"
              className="text-emerald-700 hover:text-emerald-600 relative transition-colors"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-stone-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex size-10 justify-center border p-2 rounded-3xl hover:bg-emerald-100 transition"
                >
                  {/* <User /> */}
                  <span className="text-emerald-700 font-semibold">
                    {(user.name ? user.name : user.email)
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute border-emerald-800 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <div className="p-3 flex flex-col gap-4 items-center border-b border-b-emerald-600  text-emerald-800 font-medium">
                      <UserCircle size={30} />
                      <span>
                        {(user.name ? user.name : user.email).toUpperCase()}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setUser(null);
                        localStorage.removeItem("token");
                        setIsUserMenuOpen(false);
                      }}
                      className=" w-full px-4 py-2 rounded-b-lg text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth">
                <Button
                  variant="outline"
                  className="ml-4 border-emerald-700 text-emerald-600 hover:bg-emerald-100"
                >
                  Sign in
                </Button>
              </Link>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link
              to="/cart"
              className="text-emerald-700 hover:text-emerald-600 relative transition-colors"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-stone-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-emerald-700 hover:text-emerald-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search bar - shows when search is clicked */}
        {isSearchOpen && (
          <div className="mt-4 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for plants..."
                className="w-full px-4 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onChange={handleSearchChange}
                autoFocus
              />
              <button
                onClick={handleSearchClose}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-emerald-600"
              >
                <Search size={20} />
              </button>
              <SearchResults
                results={searchResults}
                onSelect={handleSearchClose}
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 bg-amber-50 shadow-inner mt-2 rounded-md">
            <div className="flex flex-col space-y-4 px-2">
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setIsMenuOpen(false);
                }}
                className="flex items-center text-emerald-700 hover:text-emerald-600 py-2 px-4 rounded-md hover:bg-amber-100 transition-colors w-full"
              >
                <Search size={18} className="mr-2" /> Search
              </button>
              <Link
                to="/shop"
                className="text-emerald-700 hover:text-emerald-600 py-2 px-4 rounded-md hover:bg-amber-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/categories"
                className="text-emerald-700 hover:text-emerald-600 py-2 px-4 rounded-md hover:bg-amber-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/care-guides"
                className="text-emerald-700 hover:text-emerald-600 py-2 px-4 rounded-md hover:bg-amber-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Care Guides
              </Link>
              <Link
                to="/about"
                className="text-emerald-700 hover:text-emerald-600 py-2 px-4 rounded-md hover:bg-amber-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="pt-2 border-t border-emerald-100">
                {user ? (
                  <div className="flex justify-between items-center px-4">
                    <span className="text-emerald-700">
                      {user.name ? user.name : user.email}
                    </span>
                    <button
                      onClick={() => {
                        setUser(null);
                        setIsMenuOpen(false);
                      }}
                      className="text-emerald-600 hover:text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    className="flex items-center text-emerald-700 hover:text-emerald-600 py-2 px-4 rounded-md hover:bg-amber-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in / Sign up
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
