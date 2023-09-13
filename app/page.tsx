
// get nearby restaurant list 
async function getData() {
  const HOST_URL = process.env.HOST_URL;
  const res = await fetch(`${HOST_URL}/api/nearby-search`);

  if (!res.ok) {
    console.error("Failed to fetch data");
  }

  return res.json()
}

// export const revalidate = 20 // revalidate every 20 seconds

export default async function HomePage() {

  // const data = await getData();
  // console.log("🚀 ~ file: page.tsx:17 ~ HomePage ~ data:", data)
  
  return (
    <main className="max-w-screen-xl mx-auto h-screen border-red-500">
      Home page 
    </main>
  )
}
