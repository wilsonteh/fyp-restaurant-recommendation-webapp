import { popularLocations } from "../_utils/constants";
import BrowseByCuisineGrid from "./BrowseByCuisineGrid";
import NearbyRestaurantGrid from "./NearbyRestaurantGrid";
import PopularRestaurantGrid from "./PopularRestaurantGrid";
import RestaurantByCuisineGrid from "./RestaurantByCuisineGrid";

export default async function HomePage() {

  return (
    <main className="max-w-[1300px] mx-auto px-8 py-4">
      { popularLocations.slice(0,1).map((p, i) => (
        <PopularRestaurantGrid key={i} showN={1} place={p} />
      ))}

      <BrowseByCuisineGrid />
      
      {/* <NearbyRestaurantGrid showN={8} /> */}
      
    </main>
  );
};

