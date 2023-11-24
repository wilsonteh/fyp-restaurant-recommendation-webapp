import { RestaurantDetailInterface } from "../_utils/interfaces/PlaceDetailInterface";

export async function fetchRestaurants(params: any) {
  try {
    const { lat, lng, radius } = params
    const requestUrl = `${process.env.HOST_URL}/api/nearby-search?` + 
      `lat=${lat}&` +
      `lng=${lng}&` +
      `radius=${radius}`;
    
    const res = await fetch(requestUrl);
    const data = await res.json();
    return data;

  } catch (e) {
    console.error("Error fetching restaurants", e);
    throw new Error("Error fetching restaurants");
  }
};

// fetch a particular restaurant by its id 
export async function fetchRestaurantById(placeId: string): Promise<RestaurantDetailInterface> {
  const res = await fetch(`${process.env.HOST_URL}/api/place-detail?placeId=${placeId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch restaurant of id: ${placeId}`);
  }
  return res.json();
};

// fetch image urls by passing an array of photo reference
export async function fetchImageUrls(photoRefs: String[]): Promise<any[]> {
  const imageUrls = await Promise.all(photoRefs.map(async (photoRef) => {
    const res = await fetch(`${process.env.HOST_URL}/api/place-photo?photoRef=${photoRef}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch photo of ref: ${photoRef}`);
    }
    const data = await res.json();
    return data;
  }));

  // console.log("🚀 ~ file: data-fetching.ts:42 ~ fetchImageUrls ~ imageUrls:", imageUrls)
  return imageUrls;
};

export async function fetchDistanceInfo(originLatLng: string, destinationPlaceId: string) {
  const requestUrl = `${process.env.HOST_URL}/api/distance-matrix?` + 
    `origins=${origin}` +
    `&destinations=place_id:${destinationPlaceId}`

  const res = await fetch(requestUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch distance info`);
  }
  return res.json();
}