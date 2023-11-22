import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/distancematrix/json";
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY!;

export async function GET(request: Request) {
  console.log("--- 😛😛😛 Calling distance matrix API --- ");

  const { searchParams } = new URL(request.url);
  const origin = searchParams.get("origin");    // lat,lng 

  // multiple placeIds separated by commas 
  const dest = searchParams.get("destinations"); 
  const destinations = dest!.split(",");
  // construct the destination params url string
  let destinationsStr = "";
  for (let d of destinations) {
    destinationsStr += `place_id:${d}|`;
  }
  destinationsStr = destinationsStr.slice(0, -1); // remove the last "|"

  const mode = searchParams.get("mode") || "driving";

  const requestUrl = 
  `${BASE_URL}?key=${API_KEY}&` + 
  `origins=${origin}&` + 
  `destinations=${destinationsStr}&` + 
  `mode=${mode}`;
  
  console.log("😙 GET ~ requestUrl:", requestUrl)
  const res = await fetch (requestUrl, { 
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
};