import { popularLocations } from "../_utils/constants";
import BrowseByCuisineGrid from "./BrowseByCuisineGrid";
import CuisineCardGrid from "./CuisineCardGrid";
import PopularRestaurantGrid from "./PopularRestaurantGrid";

export default async function HomePage() {

  return (
    <main className="max-w-[1300px] mx-auto px-8 py-4">
      
      { popularLocations.slice().map((p, i) => (
        <PopularRestaurantGrid key={i} showN={4} place={p} />
      ))}

      <BrowseByCuisineGrid />
      <CuisineCardGrid showN={4} cuisine="Japanese" />
      <CuisineCardGrid showN={4} cuisine="Fast food" />

    </main>
  );
};

