"use client";
import { MagnifyingGlass } from "@/app/_icons/Index";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import SelectedRestaurant from "./SelectedRestaurant";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";

export default function SearchPage() {

  const { theme } = useTheme();
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
    <main className="max-w-screen-md mx-auto">
      <div className="flex flex-col gap-8">
        <form className="flex mt-6">
          <Input
            ref={inputRef as unknown as React.RefObject<HTMLInputElement>}
            variant="flat"
            placeholder="Search restaurants"
            classNames={{
              input: "text-foreground pl-2",
              inputWrapper: twMerge(
                'p-0 pl-4',
                theme === 'dark' 
                ? 'bg-slate-800 data-[hover]:!bg-slate-700 data-[focus]:!bg-slate-700/80' 
                : 'bg-white data-[hover]:!bg-white data-[focus]:!bg-white',
              ),
            }}
            startContent={<MagnifyingGlass size={15} />}
          />
        </form>

        {selectedRestaurant && (
          <SelectedRestaurant place={selectedRestaurant} />
        )}
      </div>
    </main>
  );
}