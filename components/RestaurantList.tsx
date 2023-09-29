"use client";
import { NearbySearchRestaurant } from "@/utils/interfaces";
import { useLocationContext } from "@/contexts/userLocation";
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

const RestaurantList = () => {

  const [restaurants, setRestaurants] = useState<NearbySearchRestaurant[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const userLocation = useLocationContext();

  useEffect(() => {
    const fetchData = async () => {
      let requestUrl: string;
      // user denies permission
      if (userLocation.lat === 0 && userLocation.lng === 0) {
        // dont hav to do anything coz the initial location is defined as Sunway Uni in UserLocation.tsx
      }
      else { // user accepts permission
        setIsLoading(true);
        requestUrl = `/api/nearby-search?lat=${userLocation.lat}&lng=${userLocation.lng}`
        const res = await fetch(requestUrl);
        const data = await res.json();
        const { results } = data;
        setRestaurants(results);
        setIsLoading(false);
      }
    }

    // ! Toggle comment for line below 
    fetchData();

  }, [userLocation.lat, userLocation.lng])

  return (
    <div className="p-4">
      <h1 className="font-bold text-lg mb-2">Nearby Restaurants</h1>

      { isLoading ? (
        // *TODO - display skeleton ltr  
        <div>Loading restaurants...</div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          { restaurants?.map((restaurant: NearbySearchRestaurant) => (
              <RestaurantCard
                key={restaurant.place_id}
                restaurant={restaurant}
              />
          ))}
        </div>
      )}

    </div>
  );

};

export default RestaurantList;
