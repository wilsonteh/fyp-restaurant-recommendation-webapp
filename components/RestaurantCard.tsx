"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import Image from "next/image";
import StarIcon from "./icons/StarIcon";
import DoorIcon from "./icons/DoorIcon";
import Link from "next/link";
import { NearbySearchRestaurant } from "@/utils/interfaces";
import { extractLocation } from "@/utils/utils";
import MapMarkerIcon from "./icons/MapMarkerIcon";

interface RestaurantCardProps {
  restaurant: NearbySearchRestaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  
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
          src="https://lh3.googleusercontent.com/p/AF1QipMNChxwXUq9YYW4L6LjhtRKMjUV1m57N_2RlCFf=s1360-w1360-h1020"
          fill={true}
          className="rounded-none object-cover"
          alt="image"
        />
      </CardBody>

      <CardBody className="h-max flex flex-row gap-2 px-3 py-4">
        <div className="w-8/12">
          <h1 className="text-sm font-semibold"> { restaurant.name } </h1>
          <div className="text-xs"> { extractLocation(restaurant.vicinity) } </div>
        </div>

        <div className="w-4/12 text-xs flex flex-col items-start justify-center">
          <span className="flex items-center gap-1">
            <StarIcon className="w-3 h-3" fill="orange" />
            <span> { restaurant.rating.toFixed(1) } ({ restaurant.user_ratings_total })</span>
          </span>

          <span className="flex items-center gap-1 whitespace-nowrap">
            <DoorIcon open={true} className="w-3 h-3" fill="green" />
            <span> { restaurant.opening_hours.open_now ? 'Open Now' : 'Closed'} </span>
          </span>

          <span className="flex items-center gap-1 whitespace-nowrap">
            <MapMarkerIcon  className="w-3 h-3" fill="" />
            {/* TODO - calc distance - hardcoded for now */}
            <span> 3.4 km </span>   
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default RestaurantCard;
