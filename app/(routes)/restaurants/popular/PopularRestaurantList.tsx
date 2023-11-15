"use client";
import { NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
import { Pagination, PaginationItem } from "@nextui-org/react";
import RestaurantCard from "../../RestaurantCard";
import useSWR from "swr";

export default function PopularRestaurantList({ 
  restaurants, 
} : {
  restaurants: NearbySearchRestaurant[];
}) {

  // useSWR()

  return (
    <div className="">
      {restaurants?.map((restaurant: NearbySearchRestaurant) => (
        <div key={restaurant.name} className="">
          {restaurant.name}
        </div>
      ))}

      <Pagination
        color="secondary"
        variant="flat"
        total={5}
        initialPage={1}
        showControls
      />
    </div>
  );
}
 
