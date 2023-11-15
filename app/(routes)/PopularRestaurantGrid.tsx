"use client";
import useSWRImmutable from "swr/immutable";
import { NearbySearchRestaurant } from "../_utils/interfaces/Interfaces";
import RestaurantCard from "./RestaurantCard";
import RestaurantsGrid from "./RestaurantsGrid";
import ViewAllButton from "./ViewAllButton";

async function fetchRestaurants(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  const { results } = data;
  return results; 
};

export default function PopularRestaurantGrid({ showN }: { showN: number }) {

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
    data: restaurants,
    isLoading,
    error,
  } = useSWRImmutable(requestUrl, fetchRestaurants);


  return (
    <div className="p-4 flex flex-col gap-2 items-start">
      <h1 className="font-bold text-lg mb-2">Popular Restaurants</h1>

      <RestaurantsGrid>
        {restaurants
          ?.slice(0, showN)
          .map((restaurant: NearbySearchRestaurant) => (
            <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
          ))}
      </RestaurantsGrid>
      
      <ViewAllButton {...params} />

    </div>
  );
};