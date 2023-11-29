"use client";
import { RestaurantDetailInterface } from "@/app/_utils/interfaces/PlaceDetailInterface";
import { Card, CardBody } from "@nextui-org/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function RestaurantCard({
  restaurant, 
  imageUrl, 
}: {
  restaurant: RestaurantDetailInterface; 
  imageUrl: string;
}) {

  const { theme } = useTheme();
  const params = useParams()
  const { restaurantId } = params;

  return (
    <Card 
      className={twMerge(
        'w-fit', 
        theme === "dark"
        ? "bg-slate-800 border-slate-800 hover:bg-slate-8 00/70"
        : "bg-slate-100 border-slate-200 hover:bg-slate-200/70"
      )} 
      isPressable
      as={Link}
      href={`/restaurant/${restaurantId}`}
    >
      <CardBody className="w-full">
        <Image
          src={imageUrl}
          className={twMerge(
            'w-full rounded-lg shadow-md', 
            theme === "dark" ? "shadow-slate-500/30" : "shadow-slate-300"
          )}
          alt={restaurant.name}
          width={350}
          height={250}
        />

        <div className="pt-3 pb-2 px-2">
          <h3 className="font-semibold text-lg">
            { restaurant.name }
          </h3>
          <p className="text-sm">
            { restaurant.formatted_address }
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
