"use client";
import { NearbySearchRestaurant } from "@/utils/interfaces";
import { useLocationContext } from "@/contexts/userLocation";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

// get nearby restaurant list
async function fetchNearbyRestaurants(requestUrl: string) {
  const res = await fetch(requestUrl, {
    next: {
      revalidate: 0
    }
  });

  if (!res.ok) {
    console.error("Failed to fetch data");
  }
  const data = await res.json();
  const { results: restaurants } = data;

  return restaurants;
}

function useNearbyRestaurants(lat: number, lng: number) {

  const {
    data: restaurants,
    error,
    isLoading,
  } = useSWRImmutable(`/api/nearby-search?lat=${lat}&lng=${lng}`, fetchNearbyRestaurants);
  restaurants as NearbySearchRestaurant[];

  return {
    restaurants,
    error,
    isLoading,
  }
}

const RestaurantList = () => {

  const userLocation = useLocationContext();
  console.log("🚀 ~ file: RestaurantList.tsx:46 ~ RestaurantList ~ userLocation:", userLocation)
  const { restaurants, error, isLoading } = useNearbyRestaurants(userLocation.lat, userLocation.lng);
  restaurants as NearbySearchRestaurant[];

  if (userLocation.lat === 0 && userLocation.lng === 0) {
    return <div> No permission </div>;
  }

  if (restaurants === undefined) {
    return <div> Restaurants not found </div>;
  }

  return (
    <div className="p-4">
      <h1 className="font-bold text-lg mb-2">Nearby Restaurants</h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* { restaurants.map((restaurant: NearbySearchRestaurant) => (
            <RestaurantCard
              key={restaurant.place_id}
              restaurant={restaurant}
            />
        ))} */}
        restaurant list
      </div>
    </div>
  );

};

export default RestaurantList;
