"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { SelectedRestaurant } from "@/app/_utils/interfaces/Interfaces";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";

interface SelectedPlaceProps {
  place: SelectedRestaurant;
}

const SelectedRestaurant = ({ place }: SelectedPlaceProps) => {
  
  const { theme } = useTheme();
  const cardPhoto = place.photos[0].getUrl();

  return (
    <Card
      as={Link}
      href={`/restaurant/${place.place_id}`}
      isHoverable={true}
      isPressable={true}
      classNames={{
        base: twMerge(
          "mt-6 flex flex-col w-[300px] mx-auto p-4 border-1 border-transparent", 
          theme === "dark" ? "bg-slate-800 hover:!bg-slate-700/70" : "bg-slate-100"
        ),
      }}
      >
      <CardBody className="p-0 mb-4">
        <h1 className="font-medium">{place.name}</h1>
        <p className="text-xs">{place.formatted_address}</p>
      </CardBody>

      <CardBody className="min-h-[200px]">
        <Image 
          src={cardPhoto || "/images/no-img.jpg"} 
          fill={true} 
          className="rounded-lg"
          alt={place.name} 
          />
      </CardBody>

    </Card>
  );
};

export default SelectedRestaurant;
