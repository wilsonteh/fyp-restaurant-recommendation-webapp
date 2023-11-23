"use client";
import { NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";
import useGeolocation from "../_hooks/useGeolocation";
import { fetcher } from "../_lib/swr/fetcher";
import RestaurantCard from "./RestaurantCard";
import RestaurantsGrid from "./RestaurantsGrid";

export default function NearbyRestaurantGrid({ showN }: { showN: number }) {
  const [requestUrl, setRequestUrl] = useState("");
  const {
    coords,
    getPosition,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
    timestamp,
  } = useGeolocation();
  const { latitude = 0, longitude = 0 } = coords || {};

  const { data, isLoading, error } = useSWRImmutable(requestUrl, fetcher);
  const restaurants = data as NearbySearchRestaurant[];

  const promptGeolocation = () => {
    if (!isGeolocationEnabled) {
      getPosition()
    }
  };

  useEffect(() => {
    if (coords !== undefined) {
      setRequestUrl(`/api/nearby-search?calltype=static&lat=${latitude}&lng=${longitude}&sortby=nearest`)
    }
  }, [coords, latitude, longitude])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error!</div>

  return (
    <div className="">
      { coords ? ( 
        // detected location, display nearby restau 
        <NearbyRestaurants restaurants={restaurants} />

        ) : (!isGeolocationEnabled && (coords === undefined) && !positionError) ? (
        // initial render (no user location yet) 
        <AccessLocation  getGeolocation={promptGeolocation} />
      ) : (!isGeolocationEnabled && positionError) ? (
        // user denied geolocation 
        <DeniedGeolocation getGeolocation={promptGeolocation} />
      ) : (
        // *NOTE - not sure how the condition would reach this block
        // use this as placeholder for now 
        <div className="">Loading... </div>
      )}
    </div>
  );
}; 
 
const AccessLocation = ({ getGeolocation }: { getGeolocation: () => void }) => {

  return (
    <div className="flex flex-col items-start">
      <Button color="primary" size="sm" onClick={getGeolocation}>
        View nearby restaurants
      </Button>
      <small>Allow access of location to view nearby restaurants</small>
    </div>
  );
};

const NearbyRestaurants = ({ 
  restaurants,  
  showN = 8, 
} : { 
  restaurants: NearbySearchRestaurant[], 
  showN?: number, 
}) => {

  return (
    <div className="flex flex-col gap-2 items-start">
      <h1 className="font-semibold text-2xl mb-2 capitalize">
        Restaurants near me 
      </h1>

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

      {/* <ViewAllButton /> */}
    </div>
  )
};

const DeniedGeolocation = ({
  getGeolocation, 
} : {
  getGeolocation: () => void 
}) => {

  return (
    <div className="flex flex-col items-start">
      <h1>You have denied location access</h1>
      <small>Please reset geolocation permission manually and click button below</small>
      <Button color="primary" size="sm" onClick={getGeolocation}>
        Prompt location access
      </Button>
    </div>
  )
};