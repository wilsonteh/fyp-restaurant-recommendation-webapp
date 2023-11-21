import NearbyRestaurantGrid from "./NearbyRestaurantGrid";
import PopularRestaurantGrid from "./PopularRestaurantGrid";

export default async function HomePage() {

  return (
    <main className="max-w-[1300px] mx-auto">
      <PopularRestaurantGrid showN={4} />
      {/* <NearbyRestaurantGrid showN={1} /> */}
    </main>
  );
};
