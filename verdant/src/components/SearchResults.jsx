import React from "react";
import { Link } from "react-router-dom";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const SearchResults = ({ results, onSelect }) => {
  // if (results.length === 0) {
  //   return null;
  // }
  // console.log(results);
  

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white rounded-md shadow-lg border border-verdant-200">
      <Command>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Plants">
            {results.map((plant) => (
              <CommandItem key={plant.id}>
                <Link
                  to={`/shop/${plant.id}`}
                  className="flex items-center gap-3 w-full p-2 hover:bg-cream-50"
                  onClick={() => onSelect?.()}
                >
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-verdant-800">{plant.name}</p>
                    <p className="text-sm text-verdant-600">₹ {plant.price}</p>
                  </div>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default SearchResults;
