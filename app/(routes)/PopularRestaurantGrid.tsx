"use client";
import useSWRImmutable from "swr/immutable";
import { NearbySearchRestaurant } from "../_utils/interfaces/Interfaces";
import RestaurantCard from "./RestaurantCard";
import RestaurantsGrid from "./RestaurantsGrid";
import { fetcher } from "../_lib/swr/fetcher";
import { Skeleton } from "@nextui-org/react";
import useGeolocation from "../_hooks/useGeolocation";

export default function PopularRestaurantGrid({ 
  showN = 8, 
  place, 
} : { 
  showN: number, 
  place: { name: string, lat: number, lng: number } 
}) {
  
  const { coords } = useGeolocation();

  //* SECTION: data fetching // - 
  const {
    data,
    isLoading: isRestauLoading,
    error: restauError,
  } = useSWRImmutable(
    `/api/nearby-search?calltype=static&lat=${place.lat}&lng=${place.lng}&radius=1000`, 
    fetcher
  );
  const restaurants = data as NearbySearchRestaurant[];
  
  // dependent data fetching (depends on `restaurants`) 
  // get all place id from `restaurants`
  const {
    data: distanceData,
    isLoading: isDistInfoLoading,
    error: distError,
  } = useSWRImmutable(
    () => {
      if (restaurants && coords) {
        const destStr = restaurants.slice(0, showN).map(r => r.place_id).join(',');
        return `/api/distance-matrix?origin=${coords?.latitude},${coords?.longitude}&destinations=${destStr}`;
      }
    },  
    fetcher
  );
  const distanceInfo = distanceData as google.maps.DistanceMatrixResponse || undefined;

  if (restauError || distError) {
    return <div> Error fetching restaurant OR distance info</div>
  } 
  
  return (
    <div className="p-4 flex flex-col gap-2 items-start">
      <Skeleton isLoaded={!isRestauLoading && !isDistInfoLoading}>
        <h1 className="font-semibold text-2xl mb-4">
          Popular Restaurants in { place.name }
        </h1>
      </Skeleton>

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