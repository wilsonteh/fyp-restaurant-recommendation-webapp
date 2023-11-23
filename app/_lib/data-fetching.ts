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
export async function fetchImageUrls(photoRefs: String[]): Promise<string[]> {
  const imageUrls = await Promise.all(photoRefs.map(async (photoRef) => {
    const res = await fetch(`${process.env.HOST_URL}/api/place-photo?photoRef=${photoRef}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch photo of ref: ${photoRef}`);
    }
    return res.json();
  })) as string[];

  return imageUrls.map(url => url.imageUrl);
};