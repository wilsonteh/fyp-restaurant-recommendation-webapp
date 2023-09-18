"use client";
import { NearbySearchRestaurant } from "@/utils/interfaces";
import RestaurantCard from "./RestaurantCard";

interface RestaurantListProps {
  restaurants: NearbySearchRestaurant[];  
}
 
const RestaurantList = ({ restaurants } : RestaurantListProps) => {

  const data = restaurants[0];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      { restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
      ))}
    </div>
  );
}
 
export default RestaurantList;