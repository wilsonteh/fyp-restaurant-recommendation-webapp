"use client";
import useSWRImmutable from "swr/immutable";
import { NearbySearchRestaurant } from "../_utils/interfaces/Interfaces";
import RestaurantCard from "./RestaurantCard";
import RestaurantsGrid from "./RestaurantsGrid";
import { fetcher } from "../_lib/swr/fetcher";
import { Skeleton } from "@nextui-org/react";
import useGeolocation from "../_hooks/useGeolocation";
import Message from "../_components/Message";

export default function CuisineCardGrid({ 
  showN = 8, 
  cuisine,
} : { 
  showN: number;
  cuisine: string;
}) {
  const { coords, isGeolocationEnabled } = useGeolocation();
  //* SECTION: data fetching // - 
  const {
    data,
    isLoading: isRestauLoading,
    error: restauError,
  } = useSWRImmutable(
    () => {
      if (coords) {
        return `/api/nearby-search?calltype=search&lat=${coords?.latitude}&lng=${coords?.longitude}&radius=3000&q=food,${cuisine}&sortby=nearest`; 
      }
    }, fetcher
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

  // if (restauError || distError) {
  //   return <div> Error fetching restaurant OR distance info</div>
  // } 
  
  return (
    <div className="p-4 flex flex-col gap-2 items-start">
      <Skeleton isLoaded={!isRestauLoading && !isDistInfoLoading}>
        <h1 className="font-semibold text-2xl mb-4 capitalize">
        { cuisine } restaurants near you 
        </h1>
      </Skeleton>

      {/* <div className="">
        { coords && isGeolocationEnabled ? "enabled" : "disabled" }
      </div> */}

      { coords ? (
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
      ) : (
        <Message
          text="Please enable location access to view this section, refresh page if necessary"
          type="warning"
        />
      )}
    </div>
  );
};