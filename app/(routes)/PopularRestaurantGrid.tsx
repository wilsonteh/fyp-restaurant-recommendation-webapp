"use client";
import useSWRImmutable from "swr/immutable";
import { NearbySearchRestaurant } from "../_utils/interfaces/Interfaces";
import RestaurantCard from "./RestaurantCard";
import RestaurantsGrid from "./RestaurantsGrid";
import ViewAllButton from "./ViewAllButton";
import { fetcher } from "../_lib/swr/fetcher";

export default function PopularRestaurantGrid({ showN = 8 }: { showN?: number }) {

  const params = {
    lat: '3.067440966219083', 
    lng: '101.60387318211183',
    radius: '1000'
  };
  const { lat, lng, radius } = params
  const requestUrl = '/api/nearby-search?' + 
    `lat=${lat}&` + 
    `lng=${lng}&` + 
    `radius=${radius}`;  

  // *SECTION: DATA FETCHING //
  const { data, isLoading, error } = useSWRImmutable(requestUrl, fetcher);
  const restaurants = data as NearbySearchRestaurant[];
  
  // dependent data fetching (depends on `restaurants`) 
  // get all place id from `restaurants`
  const placeIdsStr = restaurants?.slice(0, showN).map(r => r.place_id).join(',');
  const { data: distanceData } = useSWRImmutable(
    () => `/api/distance-matrix?origin=${lat},${lng}&destinations=${placeIdsStr}`, 
    fetcher
  );
  const distanceInfo = distanceData as google.maps.DistanceMatrixResponse;

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>
  
  return (
    <div className="p-4 flex flex-col gap-2 items-start">
      <h1 className="font-semibold text-2xl mb-2">
        Popular Restaurants in Bandar Sunway
      </h1>

      <RestaurantsGrid>
        { distanceData && restaurants
          ?.slice(0, showN)
          .map((restaurant: NearbySearchRestaurant, i: number) => (
            <RestaurantCard
              key={restaurant.place_id}
              restaurant={restaurant}
              nth={i+1}
              distanceInfo={distanceInfo.rows[0].elements[i]}
            />
          ))}
      </RestaurantsGrid>

      {/* <ViewAllButton {...params} /> */}
    </div>
  );
};