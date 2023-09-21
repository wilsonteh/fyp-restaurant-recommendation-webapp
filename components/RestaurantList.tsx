import { NearbySearchRestaurant } from "@/utils/interfaces";
import RestaurantCard from "./RestaurantCard";
import Image from "next/image";

// get nearby restaurant list
async function fetchRestaurantList() {
  const HOST_URL = process.env.HOST_URL;
  let hour = 6
  const res = await fetch(`${HOST_URL}/api/nearby-search`, {
    next: {
      revalidate: hour * 60 * 60 
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

async function fetchRestaurantImg(photoRef: string) {
  const HOST_URL = process.env.HOST_URL;
  const res  = await fetch(`${HOST_URL}/api/place-photo?photoRef=${photoRef}`, {
    next: {
      revalidate: false
    }
  });
  const data = await res.json();
  return data.imageUrl;
}

const RestaurantImage = async ({ photoRef }: { photoRef: string }) => {
  const imgUrl = await fetchRestaurantImg(photoRef);

  return (
    <Image
      src={imgUrl}
      fill={true}
      className="rounded-none object-cover"
      alt="image"
    />
  );
};

const RestaurantList = async () => {
  const { results: restaurants } = await fetchRestaurantList();
  restaurants as NearbySearchRestaurant[];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      { restaurants.map((restaurant: NearbySearchRestaurant) => (
        <RestaurantCard
          key={restaurant.place_id}
          restaurant={restaurant}
          RestaurantImage={<RestaurantImage photoRef={restaurant.photos[0].photo_reference} />}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
