import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY!;

export async function GET(request: Request) {
  console.log("--- 🎃🎃🎃 Calling nearby search API --- ");
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");
  const radius = searchParams.get("radius");

  const params = {
    // required: location & radius
    location: `${latitude},${longitude}`,
    radius: radius || "500",    // in metres
    keyword: "restaurant,food",
  };

  const requestUrl = `${BASE_URL}?` +
    `key=${API_KEY}&` +
    `type=restaurant&` +
    `location=${params.location}&` +
    `keyword=${params.keyword}&` +
    `radius=${params.radius}`;

  console.log("🚀 ~ file: route.ts:27 ~ GET ~ requestUrl:", requestUrl)

  const res = await fetch(requestUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
