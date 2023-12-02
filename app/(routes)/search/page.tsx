"use client";
import { MagnifyingGlass } from "@/app/_icons/Index";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import SelectedRestaurant from "./SelectedRestaurant";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import Message from "@/app/_components/Message";

export default function SearchPage() {

  const { theme } = useTheme();
  const [selectedRestaurant, setSelectedRestaurant] = useState<any|null>(null);

  const { ref: inputRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY,
    onPlaceSelected: (place) => { 
      setSelectedRestaurant(place);
    },
    // https://developers.google.com/maps/documentation/javascript/reference/places-widget#AutocompleteOptions
    options: { 
      types: ["restaurant"],
      fields: ["formatted_address", "name", "place_id", "photos"],
      componentRestrictions: { country: 'my' }
    },
  });

  return (
    <main className="max-w-screen-md mx-auto">
      <div className="flex flex-col gap-4">
        <form className="mt-4">
          <Input
            ref={inputRef as unknown as React.RefObject<HTMLInputElement>}
            variant="flat"
            placeholder="Search by restaurant name or location"
            classNames={{
              base: "px-4",
              input: "text-foreground ml-2 text-xs xs:text-base",
              inputWrapper: twMerge(
                "p-0 pl-4",
                theme === "dark"
                  ? "bg-slate-800 data-[hover]:!bg-slate-700 data-[focus]:!bg-slate-700/80"
                  : "bg-white data-[hover]:!bg-white data-[focus]:!bg-white"
              ),
            }}
            startContent={<MagnifyingGlass size={15} />}
          />
        </form>

        <Message
          text={
            <div className="">
              <p>Select the autocomplete item as you type instead of pressing enter</p>
              <p className="text-xs">Please refresh and try again if the autocomplete is not working.</p>
            </div>
          }
          type="warning"
        />

        {selectedRestaurant && (
          <SelectedRestaurant place={selectedRestaurant} />
        )}
      </div>
    </main>
  );
}