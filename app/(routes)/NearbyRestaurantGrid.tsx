"use client";
import { NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
import { Suspense, useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import useSWRImmutable from "swr/immutable";
import { useGeolocated } from "react-geolocated";
import RestaurantsGrid from "./RestaurantsGrid";
import { Button } from "@nextui-org/react";

async function fetchRestaurants(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  const { results } = data;
  return results; 
};

export default function NearbyRestaurantGrid({ showN }: { showN: number }) {
  const [requestUrl, setRequestUrl] = useState("");
  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
    timestamp,
    getPosition,
  } = useGeolocated({
    positionOptions: {
      maximumAge: 60000, // 5 mins before retreiving the location agn 
      timeout: Infinity,
      enableHighAccuracy: true,
    },
    suppressLocationOnMount: true,  // dont prompt location access on initial load
    isOptimisticGeolocationEnabled: false, 
    onSuccess(position: GeolocationPosition) {
      console.log("Geolocation success", position)
    },
    onError(positionError?: GeolocationPositionError) {
      console.error("Geolocation error", positionError)
    },
  });
  const { latitude = 0, longitude = 0 } = coords || {};
  
  const { data: restaurants, isLoading, error } = useSWRImmutable(requestUrl, fetchRestaurants)

  useEffect(() => {
    if (coords !== undefined) {
      setRequestUrl(`/api/nearby-search?lat=${latitude}&lng=${longitude}`)
    }
  }, [coords, latitude, longitude])
  
  // this effect is to let me see the value of the var throughout the lifecycle 
  // useEffect(() => {
  //   console.log("latitude", latitude, "longitude", longitude)
  //   console.log("coords:", coords)
  //   console.log("positionError", positionError);
  //   console.log("isGeolocationEnabled", isGeolocationEnabled);

  // }, [coords, isGeolocationEnabled, latitude, longitude, positionError])

  const promptGeolocation = () => {
    console.log(
      "isGeolocationEnabled", isGeolocationEnabled, 
      "isGeolocationAvailable", isGeolocationAvailable, 
      "positionError", positionError, 
    );
    if (!isGeolocationEnabled) {
      getPosition()
    }
  };

  const AccessLocation = () => {
    return (
      <div className="flex flex-col items-start">
        <Button color="primary" size="sm" onClick={promptGeolocation}>
          View nearby restaurants
        </Button>
        <small>Allow access of location to review nearby restaurants</small>
      </div>
    );
  };

  const NearbyRestaurants = () => {
    return (
      <>
        <h1 className="font-bold text-lg mb-2">Nearby Restaurants</h1>
        <RestaurantsGrid>
          {restaurants
            ?.slice(0, showN)
            .map((restaurant: NearbySearchRestaurant) => (
            <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
          ))}
          {/* { restaurants?.map((restaurant: any) => (
            <div key={restaurant.name}> { restaurant.name } </div>
          ))} */}
        </RestaurantsGrid>
      </>
    )
  };

  const DeniedGeolocation = () => {
    return (
      <div className="flex flex-col items-start">
        <h1>You have denied location access</h1>
        <small>Please reset geolocation permission manually and click button below</small>
        <Button color="primary" size="sm" onClick={promptGeolocation}>
          Prompt location access
        </Button>
      </div>
    )
  };

  if (isLoading) return <div>Loading nearby restaurants...</div>
  if (error) return <div>Error!</div>

  return (
    <div className="p-4">
      { coords ? ( 
        // detected location, display nearby restau 
        <NearbyRestaurants />
      ) : (!isGeolocationEnabled && coords === undefined && !positionError) ? (
        // initial render (no user location yet) 
        <AccessLocation />
      ) : (!isGeolocationEnabled && positionError) ? (
        // user denied geolocation 
        <DeniedGeolocation />
      ) : (
        // *NOTE - not sure how the condition would reach this block
        // use this as placeholder for now 
        <div className="">Loading... </div>
      )}

    </div>
  );

}; 

