import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/photo";
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY!;

export async function GET(request: Request) {
  console.log("--- 🍳🍳🍳 Calling place photo API --- ");
  const { searchParams } = new URL(request.url);
  const photoRef = searchParams.get("photoRef");

  console.log(`${BASE_URL}?key=${API_KEY}&photo_reference=${photoRef}&maxwidth=400`)
  const res = await fetch (
    `${BASE_URL}?key=${API_KEY}&photo_reference=${photoRef}&maxwidth=400`, 
    { 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow'
    }
  );
  const imageUrl = res.url;

  return NextResponse.json({ imageUrl });
};