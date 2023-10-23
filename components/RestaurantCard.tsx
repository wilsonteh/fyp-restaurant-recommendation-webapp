"use client";
import { Card, CardBody, CardFooter, CardHeader, image } from "@nextui-org/react";
import Star from "./icons/star";
import DoorOpen from "./icons/door-open";
import Link from "next/link";
import { NearbySearchRestaurant } from "@/utils/Interfaces";
import { extractLocation } from "@/utils/utils";
import LocationDot from "./icons/location-dot";
import useSWRImmutable from "swr/immutable";
import Image from "next/image";

async function fetchRestaurantImg(requestUrl: string) {
  const res  = await fetch(requestUrl);
  const data = await res.json();
  return data.imageUrl;
};

const RestaurantCard = ({ restaurant }: { restaurant: NearbySearchRestaurant }) => {

  // ! comment these to avoid exp API calls 
  const { 
    data: imgUrl, 
    error, 
    isLoading
  } = useSWRImmutable(`/api/place-photo?photoRef=${restaurant.photos[0].photo_reference}`, fetchRestaurantImg);

  return (
    <Card
      isPressable
      isHoverable
      as={Link}
      href={`/restaurant/${restaurant.place_id}`}
      className="w-full flex flex-col"
    >
      <CardBody className="p-0 w-full min-h-[200px]">
        <Image
          src={imgUrl}
          // src=""
          fill={true}
          className="rounded-none object-cover"
          alt="image"
         />
      </CardBody>

      <CardBody className="h-max flex flex-row gap-2 px-3 py-4">
        <div className="w-8/12">
          <h1 className="text-sm font-semibold"> {restaurant.name} </h1>
          <div className="text-xs">
            { extractLocation(restaurant.vicinity) } 
          </div>
        </div>

        <div className="w-4/12 text-xs flex flex-col items-start justify-center">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" fill="orange" />
            <span>
              {restaurant.rating.toFixed(1)} ({restaurant.user_ratings_total})
            </span>
          </span>

          <span className="flex items-center gap-1 whitespace-nowrap">
            <DoorOpen className="w-3 h-3" fill="green" />
            <span>
              {restaurant.opening_hours.open_now ? "Open Now" : "Closed"}
            </span>
          </span>

          <span className="flex items-center gap-1 whitespace-nowrap">
            <LocationDot className="w-3 h-3" fill="" />
            {/* TODO - calc distance - hardcoded for now */}
            <span> 3.4 km </span>
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default RestaurantCard;
