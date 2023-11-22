"use client";
import DoorOpen from "@/app/_icons/door-open";
import LocationDot from "@/app/_icons/location-dot";
import Star from "@/app/_icons/star";
import { DistanceInfo, NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
import { extractLocation, thousandSeparator } from "@/app/_utils/utils";
import { Card, CardBody, Chip, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import Car from "../_icons/car";
import StarRating from "../_components/StarRating";
import { priceScales } from "../_utils/constants";

async function fetchRestaurantImg(requestUrl: string): Promise<string> {
  const res  = await fetch(requestUrl);
  const data = await res.json();
  return data.imageUrl;
};

const RestaurantCard = ({ 
  restaurant,
  nth,
  distanceInfo, 
} : { 
  restaurant: NearbySearchRestaurant;
  nth: number;
  distanceInfo: DistanceInfo;
}) => {

  const [toFetch, setToFetch] = useState(false);
  const { 
    data, 
    error, 
    isLoading
  } = useSWRImmutable(
    toFetch ? `/api/place-photo?photoRef=${restaurant?.photos[0]?.photo_reference}` : null, 
    fetchRestaurantImg
  );

  useEffect(() => {
    // ensure it has a photo ref 
    if (restaurant?.photos && restaurant?.photos[0]?.photo_reference) {
      setToFetch(true);
    }
  }, [restaurant?.photos])
  

  if (error) return <div>Error!</div>
  if (isLoading) return <div>Loading...</div>


  return (
    <Card
      isPressable
      isHoverable
      as={Link}
      href={`/restaurant/${restaurant.place_id}`}
      className="w-full flex flex-col relative overflow-visible"
    >
      <NumberLabel N={nth} />
     
      <CardBody className="p-0 w-full min-h-[200px]">
        <Image
          src={data || "https://via.placeholder.com/300x300"}
          fill={true}
          className="rounded-none object-cover"
          alt="image"
        />
      </CardBody>

      <CardBody className="h-max flex flex-col justify-between px-3 py-4">

        <div className="card-1st-row">
          <h1 className="text-sm font-semibold line-clamp-1">
            {" "}
            {restaurant.name}{" "}
          </h1>
          <div className="text-xs line-clamp-2"> {restaurant.vicinity}. </div>
        </div>

        <div className="card-2nd-row text-xs flex justify-center items-baseline gap-1 mt-2">
          <span className="flex items-center gap-1">
            <StarRating value={restaurant.rating} maxWidth={120} />
            <span>
              <span className="font-light">
                {" "}
                {restaurant.rating?.toFixed(1)}/5.0{" "}
              </span>
              <span>
                {" "}
                ({thousandSeparator(
                  restaurant.user_ratings_total
                )} reviews){" "}
              </span>
            </span>
          </span>
        </div>

        <div className="card-3rd-row text-xs flex justify-center items-center gap-2 my-2">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <DoorOpen size={15} className="text-slate-800" />
            <span>
              {restaurant.opening_hours?.open_now ? "Open Now" : "Closed"}
            </span>
          </span>

          <Tooltip
            content={`${distanceInfo.distance.text} away from your current location`}
            delay={1500}
            className="text-xs"
          >
            <span className="flex items-center gap-1 whitespace-nowrap">
              <LocationDot size={15} className="text-slate-600" />
              <span> {distanceInfo.distance.text} </span>
            </span>
          </Tooltip>

          <Tooltip
            content={`approx. ${distanceInfo.duration.text} drive`}
            delay={1500}
            className="text-xs"
          >
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Car size={15} className="text-slate-600" />
              <span> {distanceInfo.duration.text} </span>
            </span>
          </Tooltip>
        </div>

        <div className="card-4th-row text-xs flex justify-center items-center gap-2 mt-1">
          {restaurant.price_level && (
            <Tooltip
              content={priceScales[restaurant.price_level].tooltip}
              delay={1500}
              className="text-xs"
            >
              <Chip
                style={{
                  color: priceScales[restaurant.price_level].color,
                  backgroundColor: priceScales[restaurant.price_level].bgColor,
                }}
                size="sm"
                className="text-[10px]"
              >
                {priceScales[restaurant.price_level].label}
              </Chip>
            </Tooltip>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default RestaurantCard;

const NumberLabel = ({ N }: { N: number }) => {
  const size = 40;   // in px  
  return (
    <div 
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `-${size/2}px`,
        left: `-${size/2}px`,
      }}
      className={`numbering font-medium bg-primary-500 border-2 border-slate-700 flex justify-center items-center rounded-full absolute z-10`}>
      {N}
    </div>
  );
};