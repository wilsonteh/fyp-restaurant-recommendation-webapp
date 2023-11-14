import { Suspense } from "react";
import NearbyRestaurantList from "./NearbyRestaurantList";
import PopularRestaurantList from "./PopularRestaurantList";
import RestaurantsGrid from "./RestaurantsGrid";
import Loading from "./loading";
import { NearbySearchRestaurant } from "../_utils/interfaces/Interfaces";
import RestaurantCard from "./RestaurantCard";

async function fetchRestaurants() {
  try {
    // Sunway Uni's location
    const params = {
      lat: 3.067440966219083,
      lng: 101.60387318211183,
      // radius: 1000,
    };
    const { lat, lng } = params
    const requestUrl = `${process.env.HOST_URL}/api/nearby-search?lat=${lat}&lng=${lng}`;
    const res = await fetch(requestUrl);
    const data = await res.json()
    return data;

  } catch (e) {
    console.error("Error fetching popular restaurants", e);
    throw new Error("Error fetching popular restaurants");
  }
}

export default async function HomePage() {

  // const data = await fetchRestaurants();
  // const { results: restaurants } = data;
  // console.log("🚀 ~ file: page.tsx:29 ~ HomePage ~ restaurants:", restaurants)

  return (
    <main className="max-w-[1300px] mx-auto">
      {/* <PopularRestaurantList /> */}
      <NearbyRestaurantList />
    </main>
  );
};
