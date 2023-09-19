import RestaurantList from "@/components/RestaurantList";

// get nearby restaurant list 
async function getRestaurantList() {
  const HOST_URL = process.env.HOST_URL;
  // *TODO - supply caching options  
  const res = await fetch(`${HOST_URL}/api/nearby-search`);

  if (!res.ok) {
    console.error("Failed to fetch data");
  }
  const data = res.json()
  
  return data
}

// export const revalidate = 0 // revalidate every 20 seconds

export default async function HomePage() {

  const data = await getRestaurantList();
  const restaurants = data.results
  
  return (
    <main className="max-w-screen-xl mx-auto h-screen border-red-500">
      <RestaurantList restaurants={restaurants} />
    </main>
  )
}