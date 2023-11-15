"use client";
import { fetchRestaurants } from "@/app/_lib/data-fetching";
import PopularRestaurantList from "./PopularRestaurantList";
import { NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
import useSWRImmutable from "swr/immutable";

export default function PopularRestaurantPage() {

  // const {
  //   data: restaurants,
  //   isLoading,
  //   error,
  // } = useSWRImmutable(requestUrl, fetchRestaurants);



  return (
    <div className="">
      popular restaurants with paginations
      {/* {restaurants?.map((restaurant: NearbySearchRestaurant) => (
        <div key={restaurant.name} className="">
          {restaurant.name}
        </div>
      ))} */}

      {/* <PopularRestaurantList restaurants={restaurants} /> */}

    </div>
  );
}
