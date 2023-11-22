"use client";
import useSWRImmutable from "swr/immutable";
import { NearbySearchRestaurant } from "../_utils/interfaces/Interfaces";
import RestaurantCard from "./RestaurantCard";
import RestaurantsGrid from "./RestaurantsGrid";
import { fetcher } from "../_lib/swr/fetcher";

export default function PopularRestaurantGrid({ 
  showN = 8, 
  place, 
} : { 
  showN: number, 
  place: { name: string, lat: number, lng: number } 
}) {

  const requestUrl = `/api/nearby-search?calltype=static&lat=${place.lat}&lng=${place.lng}&radius=1000`;  
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
    () => `/api/distance-matrix?origin=${place.lat},${place.lng}&destinations=${restaurants.slice(0, showN).map(r => r.place_id).join(',')}`,
    fetcher
  );
  const distanceInfo = distanceData as google.maps.DistanceMatrixResponse;

  if (restauError || distError ) {
    return <div> Error fetching restaurant OR distance info</div>
  } 
  
  return (
    <div className="p-4 flex flex-col gap-2 items-start">
      <h1 className="font-semibold text-2xl mb-4">
        Popular Restaurants in { place.name }
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