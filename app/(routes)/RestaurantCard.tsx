"use client";
import DoorOpen from "@/app/_icons/door-open";
import LocationDot from "@/app/_icons/location-dot";
import Star from "@/app/_icons/star";
import { NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
import { extractLocation } from "@/app/_utils/utils";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

async function fetchRestaurantImg(requestUrl: string): Promise<string> {
  const res  = await fetch(requestUrl);
  const data = await res.json();
  return data.imageUrl;
};

const RestaurantCard = ({ restaurant }: { restaurant: NearbySearchRestaurant }) => {

  // console.log("🚀 RestaurantCard ~ data:", data)

  // *FIXME: below not working, try to fetch image in rsc  
  const { 
    data, 
    error, 
    isLoading
  } = useSWR(`/api/place-photo?photoRef=${restaurant.photos[0]?.photo_reference}`, fetchRestaurantImg);

  console.log(data);

  if (error) return <div>Error!</div>
  if (isLoading) return <div>Loading...</div>

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
          src={data || "https://via.placeholder.com/300x300"}
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

        <div className="w-4/12 text-xs flex flex-col items-start justify-center gap-1">
          <span className="flex items-center gap-1">
            <Star size={15} fill="orange" />
            <span>
              {restaurant.rating?.toFixed(1)} ({restaurant.user_ratings_total})
            </span>
          </span>

          <span className="flex items-center gap-1 whitespace-nowrap">
            <DoorOpen size={15} fill="green" />
            <span>
              {restaurant.opening_hours?.open_now ? "Open Now" : "Closed"}
            </span>
          </span>

          <span className="flex items-center gap-1 whitespace-nowrap">
            <LocationDot size={15} fill="" />
            {/* TODO - calc distance - hardcoded for now */}
            <span> 3.4 km </span>
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default RestaurantCard;
