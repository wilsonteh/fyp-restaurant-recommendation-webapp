import { NearbySearchParams, NearbySearchRestaurant } from "@/app/_utils/interfaces/Interfaces";
import { type NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY!;

export async function GET(request: NextRequest) {
  console.log("--- 🎃🎃🎃 Calling nearby search API --- ");
  const searchParams = request.nextUrl.searchParams;

  // separate between 'static' API call & 'search' API call
  // static call: get data up front (e.g: showing restaurants in home pg)
  // search call: get data from user input (e.g: explore pg)
  // use a 'calltype' param to differentiate between the two (value = 'static' or 'search')
  const calltype = searchParams.get("calltype");

  if (calltype === 'static') {
    const restaurants = await processStaticCall(searchParams);
    return NextResponse.json(restaurants);
  }
  else if (calltype === 'search') {
    const restaurants = await processSearchCall(searchParams);
    return NextResponse.json(restaurants);
  }
  return;
};

async function processStaticCall(searchParams: URLSearchParams) {
  const lat = searchParams.get("lat");   
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius");      
  const keyword = searchParams.get("keyword");    
  const rankby = searchParams.get("rankby");
  const opennow = searchParams.get("opennow");    

  // *SECTION: construct nearby-search params 
  // required: location, radius* 
  const p: NearbySearchParams = {
    location: lat && lng ? `${lat},${lng}` : '3.067440966219083,101.60387318211183',  // default to sunway uni
    radius: radius || '1000',   // default to 1km
    keyword: keyword || 'food',
    rankby: rankby || undefined,  
    opennow: opennow === 'true' ? true : undefined,
    type: 'restaurant',
  };

  let requestUrl = 
    `${BASE_URL}?key=${API_KEY}&` + 
    `type=${p.type}&` + 
    `location=${p.location}&`;

  p.radius && (requestUrl += `radius=${p.radius}&`);
  p.keyword && (requestUrl += `keyword=${p.keyword}&`);
  p.opennow && (requestUrl += `opennow=${p.opennow}&`);

  console.log("🚀 GET ~ requestUrl:", requestUrl)
  const res = await fetch(requestUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  const restaurants = data.results as NearbySearchRestaurant[]
  if (rankby === 'popular') {
    restaurants.sort((a, b) => b.user_ratings_total - a.user_ratings_total);
  } 
  return restaurants;
};


async function processSearchCall(searchParams: URLSearchParams) {
  const lat = searchParams.get("lat");   
  const lng = searchParams.get("lng");
  const keyword = searchParams.get("q");   // search query 
  const radius = searchParams.get("radius");     // radius 
  const opennow = searchParams.get("opennow");   // open now 
  const minprice = searchParams.get("minprice");
  const maxprice = searchParams.get("maxprice");
  const rankby = searchParams.get("sortby");

  // required: location, radius 
  const p: NearbySearchParams = {
    location: lat && lng ? `${lat},${lng}` : '3.067440966219083,101.60387318211183',  // default to sunway uni
    radius: rankby === 'nearest' ? undefined : radius || '5000',   // default to 5km
    type: 'restaurant',
    keyword: `${keyword}` || 'food',
    opennow: opennow === 'true' ? true : undefined,
    minprice: minprice || undefined,
    maxprice: maxprice || undefined,
    rankby: rankby === 'nearest' ? 'distance' : undefined,  // only use this params if user sort by nearest
  };

  let requestUrl = 
    `${BASE_URL}?key=${API_KEY}&` + 
    `type=${p.type}&` + 
    `location=${p.location}&`;

  p.radius && (requestUrl += `radius=${p.radius}&`);
  p.keyword && (requestUrl += `keyword=${p.keyword}&`);
  p.opennow && (requestUrl += `opennow=${p.opennow}&`);
  p.minprice && (requestUrl += `minprice=${p.minprice}&`);
  p.maxprice && (requestUrl += `maxprice=${p.maxprice}&`);
  p.rankby && (requestUrl += `rankby=${p.rankby}`);

  console.log("🚀 GET ~ requestUrl:", requestUrl)
  const res = await fetch(requestUrl, { headers: { "Content-Type": "application/json" }});
  const data = await res.json();

  // *SECTION: do higheste rated & most reviewed sorting here 
  const restaurants = data.results as NearbySearchRestaurant[];
  if (rankby) {
    if (rankby === 'highest_rated') {
      restaurants.sort((a, b) => b.rating - a.rating);
    } 
    else if (rankby === 'most_reviewed') {
      restaurants.sort((a, b) => b.user_ratings_total - a.user_ratings_total);
    }
  }
  return restaurants;
};