"use client";
import LocationArrow from "@/app/_icons/location-arrow";
import { RestaurantDetailInterface } from "@/app/_utils/interfaces/PlaceDetailInterface";
import { Button, Skeleton } from "@nextui-org/react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState } from "react";

export default function LocationTab({ restaurant }: { restaurant: RestaurantDetailInterface }) {

  const { lat, lng } = restaurant.geometry.location
  const [showMarkerInfo, setMarkerInfo] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY!,
  });

  return (
    <div className="flex flex-col items-center gap-4">
      {/* <Skeleton isLoaded={isLoaded}> */}
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
      {/* </Skeleton> */}

      <div className="flex items-center gap-4">
        <p>{restaurant.formatted_address}</p>
        <Button
          size="sm"
          endContent={<LocationArrow size={13} />}
          className="bg-gray-800 text-primary-400"
        >
          Get directions
        </Button>
      </div>
    </div>
  );
}
