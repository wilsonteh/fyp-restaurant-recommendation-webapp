import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY!;

export async function GET(request: Request) {
  console.log("--- 😛😛😛 Calling geocoding API --- ");

  const { searchParams } = new URL(request.url);

  // reverse geocoding (lat,lng --> address)
  const latlng = searchParams.get("latlng");     

  const requestUrl = `${BASE_URL}?key=${API_KEY}&latlng=${latlng}`;  
  
  console.log("😙 GET ~ requestUrl:", requestUrl)
  const res = await fetch (requestUrl, { 
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
};