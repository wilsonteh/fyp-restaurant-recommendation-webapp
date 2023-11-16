"use client";
import { NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
import { RestaurantDetailInterface } from "@/app/_utils/interfaces/PlaceDetailInterface";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function RestaurantCard({
  restaurant, 
  imageUrl, 
}: {
  restaurant: RestaurantDetailInterface; 
  imageUrl: string;
}) {
  const params = useParams()
  const { restaurantId } = params;

  return (
    <Card 
      className="w-fit" 
      isPressable
      as={Link}
      href={`/restaurant/${restaurantId}`}
    >
      <CardBody className="w-full">
        <Image
          src={imageUrl}
          className="w-full rounded-lg shadow-md shadow-slate-300"
          alt={restaurant.name}
          width={350}
          height={250}
        />

        <div className="pt-4 px-2">
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
