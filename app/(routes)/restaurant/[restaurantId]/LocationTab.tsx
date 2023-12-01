"use client";
import { LocationArrow } from "@/app/_icons/Index";
import { RestaurantDetailInterface } from "@/app/_utils/interfaces/PlaceDetailInterface";
import { Button, Skeleton } from "@nextui-org/react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

export default function LocationTab({ 
  restaurant,  
} : { 
  restaurant: RestaurantDetailInterface 
}) {

  const { theme } = useTheme();
  const { lat, lng } = restaurant.geometry.location
  const [showMarkerInfo, setMarkerInfo] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY!,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      {isLoaded && (
        <GoogleMap
          mapContainerClassName="h-[400px] w-full border-1 border-slate-400 rounded-md"
          zoom={18}
          center={{ lat, lng }}
        >
          <MarkerF
            position={{ lat, lng }}
            onClick={() => setMarkerInfo(!showMarkerInfo)}
          />

          {showMarkerInfo && (
            <InfoWindowF
              position={{ lat, lng }}
              options={{
                pixelOffset: {
                  width: 0,
                  height: -40,
                  equals: () => false,
                },
                maxWidth: 250,
              }}
              onCloseClick={() => setMarkerInfo(false)}
            >
              <div className="">
                <h1 className="font-semibold text-sm"> {restaurant.name} </h1>
                <p> {restaurant.formatted_address} </p>
              </div>
            </InfoWindowF>
          )}
        </GoogleMap>
      )}

      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center">{restaurant.formatted_address}</p>

        <Button
          color="primary"
          variant={theme === 'dark' ? 'bordered' : 'solid'}
          endContent={<LocationArrow size={13} />}
          className=""
          as={Link}
          href={
            `https://www.google.com/maps/search/?api=1&` + 
            `query=${restaurant.name}&` + 
            `query_place_id=${restaurant.place_id}`
          }
          target="_blank"
        >
          View Direction
        </Button>
      </div>
    </div>
  );
}
