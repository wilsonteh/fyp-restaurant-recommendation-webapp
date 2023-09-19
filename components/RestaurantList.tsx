import { NearbySearchRestaurant } from "@/utils/interfaces";
import RestaurantCard from "./RestaurantCard";

// get nearby restaurant list 
async function fetchRestaurantList() {
  const HOST_URL = process.env.HOST_URL;
  const res = await fetch(`${HOST_URL}/api/nearby-search`, {
    next: {
      revalidate: 3600 // revalidate every 60 mins
    }
  });

  if (!res.ok) {
    console.error("Failed to fetch data");
  }
  const data = res.json()
  return data
}

const RestaurantList = async () => {

  const { results: restaurants } = await fetchRestaurantList();
  restaurants as NearbySearchRestaurant[]

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      { restaurants.map((restaurant: NearbySearchRestaurant) => (
        <RestaurantCard key={restaurant.place_id} {...restaurant}  />
      ))}
    </div>
  );
}
 
export default RestaurantList;