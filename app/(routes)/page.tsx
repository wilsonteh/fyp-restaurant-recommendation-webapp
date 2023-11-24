import { popularLocations } from "../_utils/constants";
import BrowseByCuisineGrid from "./BrowseByCuisineGrid";
import PopularRestaurantGrid from "./PopularRestaurantGrid";

export default async function HomePage() {

  return (
    <main className="max-w-[1300px] mx-auto px-8 py-4">
      
      { popularLocations.slice(0,1).map((p, i) => (
        <PopularRestaurantGrid key={i} showN={2} place={p} />
      ))}

      <BrowseByCuisineGrid />
    </main>
  );
};

