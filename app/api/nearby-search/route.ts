import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY!;

export async function GET(request: Request) {
  console.log("--- 🎃🎃🎃 Calling nearby search API --- ");
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");
  const keyword = searchParams.get("keyword");
  const radius = searchParams.get("radius");

  const p = {
    // required: location & radius
    type: "restaurant",
    location: `${latitude},${longitude}`,
    keyword: keyword || undefined,
    radius: radius || undefined,    // in metres
  };

  let requestUrl = `${BASE_URL}?key=${API_KEY}&type=${p.type}&location=${p.location}`;
  keyword && (requestUrl += `&keyword=${p.keyword}`);
  radius && (requestUrl += `&radius=${p.radius}`);
  console.log("🚀 GET ~ requestUrl:", requestUrl)
  
  const res = await fetch(requestUrl, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
