import { NearbySearchParams, NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
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
  const minprice = searchParams.get("minprice");
  const maxprice = searchParams.get("maxprice");
  const rankby = searchParams.get("sortby");

  // *SECTION: construct nearby-search params 
  // required: location, radius 
  const p: NearbySearchParams = {
    location: lat && lng ? `${lat},${lng}` : '3.067440966219083,101.60387318211183',  // default to sunway uni
    radius: rankby === 'nearest' ? undefined : radius || '5000',   // default to 5km
    type: 'restaurant',
    keyword: keyword || undefined,
    opennow: opennow === 'true' ? true : undefined,
    minprice: minprice || undefined,
    maxprice: maxprice || undefined,
    rankby: rankby === 'nearest' ? 'distance' : undefined,  // only use this params if user sort by nearest
  };
  console.log(p.radius, p.rankby)

  let requestUrl = 
    `${BASE_URL}?key=${API_KEY}&` + 
    `type=${p.type}&` + 
    `location=${p.location}&`;

  p.radius && (requestUrl += `radius=${p.radius}&`);
  keyword && (requestUrl += `keyword=${p.keyword}&`);
  opennow && (requestUrl += `opennow=${p.opennow}&`);
  minprice && (requestUrl += `minprice=${p.minprice}&`);
  maxprice && (requestUrl += `maxprice=${p.maxprice}&`);
  p.rankby && (requestUrl += `rankby=${p.rankby}`);

  console.log("🚀 GET ~ requestUrl:", requestUrl)
  
  const res = await fetch(requestUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  // *SECTION: do higheste rated & most reviewed sorting here 
  const restaurants = data.results as NearbySearchRestaurant[];
  if (rankby === 'highest_rated') {
    console.log("highest rated!")
    restaurants.sort((a, b) => b.rating - a.rating);
  } 
  else if (rankby === 'most_reviewed') {
    console.log("most reviewed!");
    restaurants.sort((a, b) => b.user_ratings_total - a.user_ratings_total);
  }

  return NextResponse.json(restaurants);
};