"use client";
import { DistanceInfo, NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
import { thousandSeparator } from "@/app/_utils/utils";
import { Card, CardBody, Chip, Skeleton, Tooltip } from "@nextui-org/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import StarRating from "../_components/StarRating";
import { Car, DoorOpen, LocationDot } from "../_icons/Index";
import { fetcher } from "../_lib/swr/fetcher";
import { priceScales } from "../_utils/constants";
import { twMerge } from 'tailwind-merge'


async function fetchRestaurantImg(requestUrl: string): Promise<string> {
  const res  = await fetch(requestUrl);
  const data = await res.json();
  return data;
};

export default function RestaurantCard({ 
  isLoading,
  restaurant,
  nth,
  distanceInfo, 
} : { 
  isLoading: boolean;
  restaurant: NearbySearchRestaurant;
  nth: number;
  distanceInfo: DistanceInfo;
}) {

  const { theme } = useTheme();
  const [toFetch, setToFetch] = useState(false);
  const { 
    data: imgUrl, 
    isLoading: isImgLoading,
    error: photoError, 
  } = useSWRImmutable(
    toFetch ? `/api/place-photo?photoRef=${restaurant?.photos[0]?.photo_reference}` : null, 
    fetcher
  );
  
  useEffect(() => {
    // ensure it has a photo ref 
    if (restaurant?.photos && restaurant?.photos[0]?.photo_reference) {
      setToFetch(true);
    }
  }, [restaurant?.photos])
  

  if (photoError) return <div>Error!</div>

  return (
    <Card
      isPressable
      as={Link}
      href={`/restaurant/${restaurant.place_id}`}
      className={twMerge(
        "w-full flex flex-col relative overflow-visible", 
        theme === "dark" ? "bg-slate-800 hover:bg-slate-700/70" : "bg-slate-100"
      )}
    >
      <NumberLabel N={nth} />

      <Skeleton isLoaded={!isImgLoading}>
        <CardBody className="p-0 w-full min-h-[200px]">
          <Image
            src={imgUrl || "https://via.placeholder.com/300x200"}
            fill={true}
            className="rounded-t-lg object-cover"
            alt="image"
          />
        </CardBody>
      </Skeleton>

      <CardBody className="h-max flex flex-col justify-between px-3 py-4">
        <Skeleton isLoaded={!isLoading}>
          <div className="card-1st-row capitalize">
            <h1 className="text-sm font-semibold line-clamp-1">
              {restaurant.name}
            </h1>
            <div className="text-xs line-clamp-2"> {restaurant.vicinity}. </div>
          </div>
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          <div className="card-2nd-row text-xs flex justify-center items-baseline gap-1 mt-2">
            <span className="flex flex-col gap-1">
              <StarRating value={restaurant.rating} maxWidth={120} />
              <span className="">
                <span className="font-light">
                  {restaurant.rating?.toFixed(1)}/5.0{" "}
                </span>
                <span>
                  ({thousandSeparator(restaurant.user_ratings_total)} reviews)
                </span>
              </span>
            </span>
          </div>
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          <div className="card-3rd-row text-xs flex justify-center items-center gap-2 my-2">
            <span className="flex items-center gap-1 whitespace-nowrap">
              <DoorOpen size={15} className={`${theme === 'dark' ? 'text-slate-200' : 'text-slate-800' }`} />
              <span>
                {restaurant.opening_hours?.open_now ? "Open Now" : "Closed"}
              </span>
            </span>

            { distanceInfo && (
              <Tooltip
                content={`${distanceInfo?.distance.text} away from your current location`}
                delay={1500}
                className="text-xs"
              >
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <LocationDot size={15} className={`${theme === 'dark' ? 'text-slate-200' : 'text-slate-800' }`} />
                  <span> {distanceInfo?.distance.text} </span>
                </span>
              </Tooltip>
            )}

            { distanceInfo && (
              <Tooltip
                content={`approx. ${distanceInfo?.duration.text} drive`}
                delay={1500}
                className="text-xs"
              >
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <Car size={15} className={`${theme === 'dark' ? 'text-slate-200' : 'text-slate-800' }`} />
                  <span> {distanceInfo?.duration.text} </span>
                </span>
              </Tooltip>
            )}
          </div>
        </Skeleton>

        <Skeleton isLoaded={!isLoading}> 
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
        </Skeleton>
      </CardBody>
    </Card>
  );
};

const NumberLabel = ({ N }: { N: number }) => {

  const { theme } = useTheme();
  const size = 40;   // in px  


  return (
    <div 
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `-${size/2}px`,
        left: `-${size/2}px`,
      }}
      className={twMerge(
        "numbering font-medium bg-primary-500 text-slate-800 border-2 flex justify-center items-center rounded-full absolute z-10", 
        theme === "dark" ? "border-white" : "border-slate-700"
      )}
    >
      {N}
    </div>
  );
};