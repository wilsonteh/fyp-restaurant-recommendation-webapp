import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY!;

export async function GET() {
  console.log("--- 🎃🎃🎃 Calling nearby search API --- ");
  const params = {
    // required: location & radius
    location: "3.0674302527331245, 101.60390536864632",
    radius: 500, // in metres
    keyword: "restaurant,chinese,food",
  };
  
  const res = await fetch(
    `${BASE_URL}?key=${API_KEY}&location=${params.location}&keyword=${params.keyword}&radius=${params.radius}`, 
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
