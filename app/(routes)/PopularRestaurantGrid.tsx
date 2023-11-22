"use client";
import useSWRImmutable from "swr/immutable";
import { NearbySearchRestaurant } from "../_utils/interfaces/Interfaces";
import RestaurantCard from "./RestaurantCard";
import RestaurantsGrid from "./RestaurantsGrid";
import { fetcher } from "../_lib/swr/fetcher";
import { Skeleton } from "@nextui-org/react";

export default function PopularRestaurantGrid({ showN = 8 }: { showN?: number }) {

  const p = { lat: '3.067440966219083', lng: '101.60387318211183', radius: '1000' };
  const requestUrl = `/api/nearby-search?lat=${p.lat}&lng=${p.lng}&radius=${p.radius}`;  
  const {
    data,
    isLoading: isRestauLoading,
    error: restauError,
  } = useSWRImmutable(requestUrl, fetcher);
  const restaurants = data as NearbySearchRestaurant[];
  
  // dependent data fetching (depends on `restaurants`) 
  // get all place id from `restaurants`
  const {
    data: distanceData,
    isLoading: isDistInfoLoading,
    error: distError,
  } = useSWRImmutable(
    () => `/api/distance-matrix?origin=${p.lat},${p.lng}&destinations=${restaurants.slice(0, showN).map(r => r.place_id).join(',')}`,
    fetcher
  );
  const distanceInfo = distanceData as google.maps.DistanceMatrixResponse;

  if (restauError || distError ) {
    return <div> Error fetching restaurant OR distance info</div>
  } 
  
  return (
    <div className="p-4 flex flex-col gap-2 items-start">
      <h1 className="font-semibold text-2xl mb-2">
        Popular Restaurants in Bandar Sunway
      </h1>

      <RestaurantsGrid>
        { restaurants?.slice(0, showN)
          .map((restaurant: NearbySearchRestaurant, i: number) => (
            <RestaurantCard
              key={restaurant.place_id}
              isLoading={isRestauLoading && isDistInfoLoading}
              restaurant={restaurant}
              nth={i+1}
              distanceInfo={distanceInfo?.rows[0].elements[i]}
            />
          ))}
      </RestaurantsGrid>
    </div>
  );
};