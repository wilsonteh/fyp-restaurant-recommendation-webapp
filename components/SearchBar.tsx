"use client";
import { Button, Input } from "@nextui-org/react";
import MagnifyingGlass from "./icons/magnifying-glass";
import { usePlacesWidget } from "react-google-autocomplete";
import { useState } from "react";
import SelectedRestaurant from "./SelectedRestaurant";

const SearchBar = () => {

  const [selectedRestaurant, setSelectedRestaurant] = useState<SelectedRestaurant | null>(null);

  const { ref: inputRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY,
    onPlaceSelected: (place) => { 
      console.log("🚀 ~ file: SearchBar.tsx:18 ~ SearchBar ~ place:", place)
      setSelectedRestaurant(place);
    },
    // https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult
    options: {
      types: ["establishment"],
      fields: ["formatted_address", "geometry", "name", "place_id", "opening_hours", "photos"],
      componentRestrictions: "my"
    },
  });

  return (
    <div>
      <form className="flex mb-4">
        <Input 
          ref={inputRef as unknown as React.RefObject<HTMLInputElement>}
          variant="flat" 
          placeholder="Search restaurants" 
          classNames={{
            input: "text-foreground pl-2",
            inputWrapper: "p-0 pl-4",
          }}
          startContent={<MagnifyingGlass className="w-4 h-4" />}
          endContent={
            <Button variant="solid" color="primary">
              Search
            </Button>
          }
          />
      </form>

      { selectedRestaurant && <SelectedRestaurant place={selectedRestaurant} /> }
    </div>
  );
};

export default SearchBar;
