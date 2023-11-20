import { NearbySearchParams } from "@/app/_utils/interfaces/Interfaces";
import { type NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY!;

export async function GET(request: NextRequest) {
  console.log("--- 🎃🎃🎃 Calling nearby search API --- ");
  const searchParams = request.nextUrl.searchParams;

  // *SECTION: get all possible search params from the request url 
  const keyword = searchParams.get("q");   // search query 
  const opennow = searchParams.get("opennow");   // open now 
  const radius = searchParams.get("distance");     // distance/radius 
  const lat = searchParams.get("lat");   
  const lng = searchParams.get("lng");

  // *SECTION: construct nearby-search params 
  // required: location, radius 
  const p: NearbySearchParams = {
    location: lat && lng ? `${lat},${lng}` : '3.067440966219083,101.60387318211183',  // default to sunway uni
    radius: radius || '5000',   // default to 5km
    type: 'restaurant',
    keyword: keyword || undefined,
    opennow: opennow === 'true' ? true : undefined,
  };

  let requestUrl = 
    `${BASE_URL}?key=${API_KEY}` + 
    `&type=${p.type}&` + 
    `location=${p.location}&` +
    `radius=${p.radius}`;

  keyword && (requestUrl += `&keyword=${p.keyword}`);
  opennow && (requestUrl += `&opennow=${p.opennow}`);

  console.log("🚀 GET ~ requestUrl:", requestUrl)
  
  const res = await fetch(requestUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
};


// all possible search params keys that can exist in the request url 
// const searchParamsKeys = [
//   'lat', 'lng', 'q', 'distance', 'opennow' 
// ];

// // define the params that are fixed for every nearby-place call 
// const params = [
//   { key: 'type', value: 'restaurant' }
// ];

// // get all search params from the request url & add into params arr
// for (let key of searchParamsKeys) {
//   if (searchParams.has(key)) {
//     params.push({ key, value: searchParams.get(key)! });
//   }
// }