
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