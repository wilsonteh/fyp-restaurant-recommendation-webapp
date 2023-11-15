import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY!;

export async function GET(request: Request) {
  console.log("--- 🎃🎃🎃 Calling nearby search API --- ");
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");
  const radius = searchParams.get("radius");
  const pageToken = searchParams.get("pagetoken");

  const params = {
    // required: location & radius
    keyword: "restaurant,food",
    location: `${latitude},${longitude}`,
    radius: radius || "1000",    // in metres
  };

  let requestUrl = `${BASE_URL}?key=${API_KEY}`;
  if (!pageToken) {
    requestUrl += 
      `&` +
      `keyword=${params.keyword}&` +
      `location=${params.location}&` +
      `radius=${params.radius}` 

  } else if (pageToken) {
    requestUrl +=
      `&` + 
      `pagetoken=${pageToken}`
  }
  
  const res = await fetch(requestUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
