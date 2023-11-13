"use client";
import { useLocationContext } from "@/app/_contexts/userLocation";
import { NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { useGeolocated } from "react-geolocated";

async function fetchRestaurantList(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  const { results } = data;
  return results; 
}

export default function RestaurantList() {
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
  const { data: restaurants, isLoading, error } = useSWRImmutable(requestUrl, fetchRestaurantList)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error!</div>

  return (
    <div className="p-4">
      <h1 className="font-bold text-lg mb-2">Nearby Restaurants</h1>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {restaurants?.map((restaurant: NearbySearchRestaurant) => (
          <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
        ))}
      </div>

    </div>
  );

}; 
