"use client";
import { NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import useSWRImmutable from "swr/immutable";
import { useGeolocated } from "react-geolocated";
import RestaurantsGrid from "./RestaurantsGrid";

async function fetchRestaurants(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  const { results } = data;
  return results; 
}

export default function NearbyRestaurantList() {
  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
    timestamp,
    getPosition,
  } = useGeolocated({
    positionOptions: {
      maximumAge: 60000, // 5 mins 
      timeout: Infinity,
      enableHighAccuracy: true,
    },
    isOptimisticGeolocationEnabled: false, 
  });
  const { latitude = 0, longitude = 0 } = coords || {};

  const requestUrl = `/api/nearby-search?lat=${latitude}&lng=${longitude}`
  // const { data: restaurants, isLoading, error } = useSWRImmutable(requestUrl, fetchRestaurantList)

  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>Error!</div>

  return (
    <div className="p-4">
      <h1 className="font-bold text-lg mb-2">Nearby Restaurants</h1>

      <RestaurantsGrid>
        {/* {restaurants?.map((restaurant: NearbySearchRestaurant) => (
          <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
        ))} */}
      </RestaurantsGrid>

    </div>
  );

}; 
