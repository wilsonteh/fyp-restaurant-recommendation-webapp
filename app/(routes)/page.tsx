import { popularLocations } from "../_utils/constants";
import NearbyRestaurantGrid from "./NearbyRestaurantGrid";
import PopularRestaurantGrid from "./PopularRestaurantGrid";

export default async function HomePage() {

  return (
    <main className="max-w-[1300px] mx-auto">
      { popularLocations.slice().map((p, i) => (
        <PopularRestaurantGrid key={i} showN={4} place={p} />
      ))}

      {/* <NearbyRestaurantGrid showN={8} /> */}
      
    </main>
  );
};
