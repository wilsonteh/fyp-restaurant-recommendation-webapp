import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place/photo";
const API_KEY = process.env.GOOGLE_CLOUD_API_KEY!;

export async function GET() {
  console.log("--- 🍳🍳🍳 Calling place photo API --- ");

  const params = {
    photoRef: "AZose0mtFjgEFk8Xr84yKKSeP9xxI7DsiV3x7MnZf8e3yn1dHGm99lpjyCnCFDcoANXADUkp9qkFsz0lPDDsXLvpuozu_7lwqDfDU-kF4sTjVSgwoymfxtybDNxjxmaGN-dGO072ae-isjdc5PHry_gmh8o1tL5JYLiCVxrz4tWPUcMfaiNj", 
    maxWidth: 400, 
  }

  const res = await fetch (
    `${BASE_URL}?key=${API_KEY}&photo_reference=${params.photoRef}&maxwidth=${params.maxWidth}`, 
    {
      headers: {
        "Content-Type": "image/*",
      }
    }
  );

  return res;
}
