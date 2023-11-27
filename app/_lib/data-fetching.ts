import { RestaurantDetailInterface } from "../_utils/interfaces/PlaceDetailInterface";

// fetch a particular restaurant by its id 
export async function fetchRestaurantById(
  placeId: string, 
  fields?: string,
): Promise<RestaurantDetailInterface> {
  console.log("--- 😓😓😓 Calling place detail API on server --- ");

  const API_KEY = process.env.GOOGLE_CLOUD_API_KEY!;
  const BASE_URL = "https://maps.googleapis.com/maps/api/place/details/json";

  let requestUrl = `${BASE_URL}?` + 
    `key=${API_KEY}&` + 
    `place_id=${placeId}`;
  
  fields && (requestUrl += `&fields=${fields}`);

  const res = await fetch(requestUrl, { headers: { 'Content-Type': 'application/json' } });

  if (!res.ok) {
    throw new Error(`Failed to fetch restaurant of id: ${placeId}`);
  }
  const data = await res.json();
  const restaurant = data.result as RestaurantDetailInterface;

  return restaurant;
};

// fetch image urls by passing an array of photo reference
export async function fetchImageUrls(photoRefs: String[]): Promise<any[]> {
  console.log("--- 🍳🍳🍳 Calling place photo API on server --- ");

  const API_KEY = process.env.GOOGLE_CLOUD_API_KEY!;
  const BASE_URL = "https://maps.googleapis.com/maps/api/place/photo"
  
  const imageUrls = await Promise.all(photoRefs.map(async (photoRef) => {
    const res = await fetch(
      `${BASE_URL}?key=${API_KEY}&photo_reference=${photoRef}&maxwidth=400`, 
      { 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow'
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch photo of ref: ${photoRef}`);
    }
    const url = res.url;
    return url;
  }));

  console.log("🚀 ~ file: data-fetching.ts:55 ~ fetchImageUrls ~ imageUrls:", imageUrls)
  return imageUrls;
};