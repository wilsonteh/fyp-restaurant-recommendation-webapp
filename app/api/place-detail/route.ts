import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/details/json";
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY!;

export async function GET(request: Request) {
  console.log("--- 😓😓😓 Calling place detail API --- ");

  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get("placeId");
  const fields = searchParams.get("fields");
  // searchParams may or may not contain the "fields" param
  const fieldsParam = fields ? `&fields=${fields}` : "";

  const res = await fetch (
    `${BASE_URL}?key=${API_KEY}&place_id=${placeId}&${fieldsParam}`, 
    { 
      headers: {
        'Content-Type': 'application/json'
      },
    }
  );
  const data = await res.json();
  

  return NextResponse.json(data.result);
};