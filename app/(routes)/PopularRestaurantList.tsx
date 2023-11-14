import { NearbySearchRestaurant } from "../_utils/interfaces/Interfaces";
import RestaurantCard from "./RestaurantCard";
import RestaurantsGrid from "./RestaurantsGrid";

// *NOTE as for now, fetch nearby restaurants using Sunway Uni as default location 
async function fetchRestaurants() {
  try {
    // Sunway Uni's location
    const params = {
      lat: 3.067440966219083,
      lng: 101.60387318211183,
      radius: 1000,
    };
    const { lat, lng, radius } = params
    const requestUrl = 
      `${process.env.HOST_URL}/api/nearby-search?` + 
      `lat=${lat}&` +
      `lng=${lng}&` +
      `radius=${radius}`;

    const res = await fetch(requestUrl);
    const data = await res.json()
    return data;

  } catch (e) {
    console.error("Error fetching popular restaurants", e);
    throw new Error("Error fetching popular restaurants");
  }
}

export default async function PopularRestaurantList() {

  const data = await fetchRestaurants();
  const { results: restaurants, next_page_token } = data;

  return (
    <div className="p-4">
      <h1 className="font-bold text-lg mb-2">Popular Restaurants</h1>

      <RestaurantsGrid>
        {restaurants?.map((restaurant: NearbySearchRestaurant) => (
          <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
        ))}
      </RestaurantsGrid>

    </div>
  );
}
 
