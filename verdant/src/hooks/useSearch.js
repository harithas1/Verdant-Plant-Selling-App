import { useState, useCallback } from "react";
import { plants } from "@/data/plants";

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchPlants = useCallback((query) => {
    setIsSearching(true);
    const lowercaseQuery = query.toLowerCase().trim();

    if (!lowercaseQuery) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const results = plants.filter((plant) => {
      return (
        plant.name.toLowerCase().includes(lowercaseQuery) ||
        plant.category.toLowerCase().includes(lowercaseQuery) ||
        plant.description.toLowerCase().includes(lowercaseQuery)
      );
    });

    setSearchResults(results);
    setIsSearching(false);
  }, []);

  return {
    searchResults,
    isSearching,
    searchPlants
  };
};
