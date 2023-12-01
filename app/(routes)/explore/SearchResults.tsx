"use client";
import Message from "@/app/_components/Message";
import StarRating from "@/app/_components/StarRating";
import useGeolocation from "@/app/_hooks/useGeolocation";
import useMyMediaQuery from "@/app/_hooks/useMyMediaQuery";
import useQueryParams from "@/app/_hooks/useQueryParams";
import { Car, DollarSign, LocationArrow, LocationDot } from "@/app/_icons/Index";
import { fetcher } from "@/app/_lib/swr/fetcher";
import { priceScales } from "@/app/_utils/constants";
import { DistanceInfo, NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
import { thousandSeparator } from "@/app/_utils/utils";
import { Button, Card, CardBody, Chip, Skeleton, Tooltip } from "@nextui-org/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { twMerge } from "tailwind-merge";

export default function SearchResults({ 
  toFetch, setIsSearching 
} : { 
  toFetch: boolean, setIsSearching: React.Dispatch<React.SetStateAction<boolean>>  
}) {

  const { theme } = useTheme(); 
  const { coords, isGeolocationEnabled } = useGeolocation();
  const { queryParams, setQueryParams } = useQueryParams();
  const searchParams = useSearchParams();

  const { data, isLoading, error } = useSWRImmutable(
    () => {
      if (toFetch && coords) {
        return `/api/nearby-search?calltype=search&lat=${coords.latitude}&lng=${coords.longitude}&${queryParams.toString()}`
      }
    },
    fetcher 
  );
  const restaurants = data as NearbySearchRestaurant[];
  
  useEffect(() => {
    setIsSearching(isLoading);
  }, [isLoading, setIsSearching])

  const {
    data: distanceData,
    isLoading: isDistInfoLoading,
    error: distError,
  } = useSWRImmutable(
    () => {
      if (restaurants && coords) {
        // get all place id from `restaurants`
        const destStr = restaurants.map(r => r.place_id).join(',');
        return `/api/distance-matrix?origin=${coords?.latitude},${coords?.longitude}&destinations=${destStr}`;
      }
    },  
    fetcher
  );
  const distanceInfo = distanceData as google.maps.DistanceMatrixResponse || undefined;

  if (!searchParams.has('q')) {
    return (
      <Message
        text="Enter search term in the search bar to explore restaurants"
        type="warning"
      />
    );
  } 
  if (error) return <div>Failed to load ...</div>
  if (isLoading) return <div>Loading ...</div>
  if (restaurants?.length === 0) {
    return <div className="">No result...</div>
  } 

  return (
    <>
      {restaurants?.length > 0 && (
        <p className="px-4 mb-2">
          {restaurants?.length} {restaurants?.length > 1 ? "results" : "result"}{" "}
          found!
        </p>
      )}
      <div className="grid grid-cols-1 gap-4">
        {restaurants?.map((restaurant: any, i: number) => (
          <RestaurantItem
            key={restaurant.name}
            restaurant={restaurant}
            distanceInfo={distanceInfo?.rows[0].elements[i]}
          />
        ))}
      </div>
    </>
  );
}

const RestaurantItem = ({ restaurant, distanceInfo }: { restaurant: NearbySearchRestaurant, distanceInfo: DistanceInfo }) => {
  const { theme } = useTheme();
  const { lgScreenAbv } = useMyMediaQuery();
  let priceIndex = restaurant?.price_level;
  const { 
    data: imgUrl, 
    isLoading: isImgLoading,
    error: photoError, 
  } = useSWRImmutable(
    () => {
      if (restaurant?.photos && restaurant?.photos[0]?.photo_reference) {
        return `/api/place-photo?photoRef=${restaurant?.photos[0]?.photo_reference}`
      }
    }, 
    fetcher
  );
  
  return (
    <Card
      className={twMerge(
        theme === "dark" ? "bg-slate-800 hover:bg-slate-700/70" : "bg-slate-100"
      )}
    >
      <CardBody className="flex flex-col sm:flex-row justify-start gap-2 w-full">
        <div className={twMerge(
          'img-wrapper relative overflow-hidden',
          'min-w-[200px] min-h-[200px] lg:min-w-[180px] lg:min-h-[180px]'
        )}>
          {/* <Skeleton isLoaded={!isImgLoading} className="relative w-full h-full"> */}
            <Image
              // src={lgScreenAbv ? 'https://via.placeholder.com/180x180' : 'https://via.placeholder.com/150x150'}
              src={imgUrl || "/images/no-img.jpg"}
              alt="image"
              className="rounded-md"
              fill={true}
              objectFit="cover"
            />
          {/* </Skeleton> */}
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="big-section self-start w-3/4 flex flex-col py-2 px-3">
            <div className="flex justify-between items-center gap-2">
              <h3 className="text-lg font-medium">
                <Link href={`/restaurant/${restaurant.place_id}`}>
                  {restaurant.name}
                </Link>
              </h3>

              <span className={twMerge(
                'text-xs font-medium', 
                restaurant.opening_hours?.open_now
                  ? "text-success-600"
                  : "text-danger-600"
                )}
              >
                {restaurant.opening_hours?.open_now ? "Open Now" : "Closed now"}
              </span>
            </div>

            <p className="text-sm"> {restaurant.vicinity}. </p>

            <Button
              color="primary"
              size="sm"
              className="min-w-0 w-fit my-2"
              endContent={<LocationArrow size={15} />}
              as={Link}
              href={
                `https://www.google.com/maps/search/?api=1&` +
                `query=${restaurant.name}&` +
                `query_place_id=${restaurant.place_id}`}
              target="_blank"
            >
              View Direction
            </Button>

            { distanceInfo && (
              <div className="text-sm flex items-center gap-4">
                <span className="flex items-center gap-2"> 
                  <LocationDot size={15} className={`${theme === 'dark' ? 'text-slate-200' : 'text-slate-800' }`} />
                  <span> {distanceInfo.distance.text} </span>
                </span>

                <span className="flex items-center gap-2">   
                  <Car size={15} className={`${theme === 'dark' ? 'text-slate-200' : 'text-slate-800' }`} />
                  <span>{distanceInfo.duration.text}</span>
                </span>
              </div>
            )}

          </div>

          <div className="small-section w-1/4 flex flex-col items-center justify-center gap-1 my-1">
            <StarRating value={restaurant.rating} maxWidth={100} readOnly />

            <div className="flex justify-center items-center gap-1 text-sm font-light">
              <span> {restaurant.rating}/5.0 </span>
              <span>
                {" "}
                ({thousandSeparator(restaurant?.user_ratings_total)}){" "}
              </span>
            </div>

            {restaurant.price_level && (
              <Tooltip
                content={priceScales[priceIndex].tooltip}
                placement="bottom"
                className="text-xs"
                classNames={{
                  base: ["data-open: border-1 border-slate-300"],
                }}
                delay={1000}
              >
                <Chip
                  style={{
                    color: priceScales[priceIndex].color,
                    backgroundColor: priceScales[priceIndex].bgColor,
                  }}
                  variant="solid"
                  size="sm"
                  className="text-xs px-3 shadow-sm"
                  startContent={<DollarSign size={12} />}
                >
                  {priceScales[priceIndex].label}
                </Chip>
              </Tooltip>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};