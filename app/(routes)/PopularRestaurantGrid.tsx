"use client";
import useSWRImmutable from "swr/immutable";
import { NearbySearchRestaurant } from "../_utils/interfaces/Interfaces";
import RestaurantCard from "./RestaurantCard";
import RestaurantsGrid from "./RestaurantsGrid";
import ViewAllButton from "./ViewAllButton";
import { fetcher } from "../_lib/swr/fetcher";

export default function PopularRestaurantGrid({ showN = 8 }: { showN?: number }) {

  const params = {
    lat: '3.067440966219083', 
    lng: '101.60387318211183',
    radius: '1000'
  };
  const { lat, lng, radius } = params
  const requestUrl = '/api/nearby-search?' + 
    `lat=${lat}&` + 
    `lng=${lng}&` + 
    `radius=${radius}`;  

  const {
    data,
    isLoading,
    error,
  } = useSWRImmutable(requestUrl, fetcher);

  const restaurants = data as NearbySearchRestaurant[];

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  
  return (
    <div className="p-4 flex flex-col gap-2 items-start">
      <h1 className="font-semibold text-2xl mb-2">
        Popular Restaurants in Bandar Sunway
      </h1>

      <RestaurantsGrid>
        {restaurants?.slice(0, showN)
          .map((restaurant: NearbySearchRestaurant) => (
            <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
          ))}
      </RestaurantsGrid>
      
      {/* <ViewAllButton {...params} /> */}

    </div>
  );
};