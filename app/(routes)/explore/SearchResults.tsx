import DollarSign from "@/app/_icons/dollar-sign";
import LocationArrow from "@/app/_icons/location-arrow";
import { fetcher } from "@/app/_lib/swr/fetcher";
import { priceScales } from "@/app/_utils/constants";
import { NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
import { thousandSeparator } from "@/app/_utils/utils";
import { Card, CardBody, Button, Tooltip, Chip } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import useSWRImmutable from "swr/immutable";
import StarRating from "@/app/_components/StarRating";
import { useEffect, useState } from "react";

export default function SearchResults({ toFetch } : { toFetch: boolean }) {

  const searchParams = useSearchParams();
  const [queryString, setQueryString] = useState("");
  // *NOTE: search query & filter options only 
  
  useEffect(() => {
    const possibleSearchParams = ['q', 'distance', 'opennow' ]
    
    function constructQueryString() {
      let queryString = "";
      // manually check every possible search params key
      possibleSearchParams.forEach(key => {
        if (searchParams.has(key)) {
          queryString += `${key}=${searchParams.get(key)}&`
        }
      })
      queryString.slice(0, -1); // remove the last '&' char
      return queryString;
    }

    const queryString = constructQueryString();
    console.log("🚀 ~ file: SearchResults.tsx:36 ~ useEffect ~ queryString:", queryString)
    setQueryString(queryString);

  }, [searchParams])
  
  const { data, isLoading, error } = useSWRImmutable(
    // lat, lng, radius hardcode for now 
    toFetch ? `/api/nearby-search?lat=3.067440966219083&lng=101.60387318211183&radius=1000&${queryString}` : null, 
    fetcher
  );
  const restaurants = data?.results as NearbySearchRestaurant[];
  console.log("🦐 restaurants", restaurants);
  // console.log(restaurants?.map(r => r?.opening_hours))

  if (error) return <div>Failed to load ...</div>
  if (isLoading) return <div>Loading ...</div>

  return (
    <div className="grid grid-cols-1 gap-4">
      { restaurants?.map((restaurant: any) => (
        <RestaurantItem key={restaurant.name} {...restaurant} />
      ))}
    </div>
  )
}


const RestaurantItem = (restaurant: NearbySearchRestaurant) => {

  let priceIndex = restaurant?.price_level;

  return (
    <Card isPressable as={Link} href={`/restaurant/${restaurant.place_id}`}>
      <CardBody className="flex flex-row justify-start gap-2 w-full">
        <div className="relative min-w-[180px] min-h-[180px] overflow-hidden">
          <Image
            src={"https://via.placeholder.com/180x180"}
            alt="image"
            className="rounded-md"
            fill={true}
            objectFit="cover"
          />
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="big-section self-start w-3/4 flex flex-col py-2 px-3">
            <div className="flex justify-between items-center gap-2">
              <h3 className="text-lg font-medium"> {restaurant.name} </h3>
              <span className={`text-xs font-medium ${restaurant.opening_hours?.open_now ? 'text-success-600' : 'text-danger-600'}`}>
                { restaurant.opening_hours?.open_now ? 'Open Now' : 'Closed now'} 
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
                `query_place_id=${restaurant.place_id}`
              }
              target="_blank"
            >
              View Direction
            </Button>
          </div>

          <div className="small-section w-1/4 flex flex-col items-center justify-center gap-1 my-1">
            <StarRating value={restaurant.rating} maxWidth={100} readOnly />

            <div className="flex justify-center items-center gap-1 text-sm font-light">
              <span> {restaurant.rating}/5.0 </span>
              {/* <span> ({thousandSeparator(restaurant?.user_ratings_total)}) </span> */}
            </div>

            {restaurant.price_level && (
              <Tooltip 
                content={priceScales[priceIndex].tooltip} 
                placement="bottom"
                className="text-xs" 
                classNames={{
                  base: [ "data-open: border-1 border-slate-300" ]
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
                  startContent={<DollarSign size={12} />}>
                  { priceScales[priceIndex].label }
                </Chip>
              </Tooltip>
            )}

          </div>
        </div>
      </CardBody>
    </Card>
  );
}