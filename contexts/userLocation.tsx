"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface LocationContextType {
  lat: number,
  lng: number,
}

const LocationContext = createContext<LocationContextType | null>(null);

export const LocationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  // give Sunway Uni as default coor 
  const [userLocation, setUserLocation] = useState<LocationContextType>({
    lat: 3.067440966219083,
    lng: 101.60387318211183,
  });

  const success = (pos: GeolocationPosition) => {
    setUserLocation({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    })
  };


  const error = (err: GeolocationPositionError) => {
    if (err.PERMISSION_DENIED) {
      console.error("User denied the request for Geolocation.");
      // *REVIEW - use better way to handle this
      setUserLocation({ lat: 0, lng: 0 })
    } else if (err.POSITION_UNAVAILABLE) {
      console.error("Location information is unavailable.");
    } else if (err.TIMEOUT) {
      console.error("The request to get user location timed out.");
    } else {
      console.error("An unknown error occurred.");
    }
  };

  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition (
          (pos) => success(pos),
          (err) => error(err),
        )
      }
    };
    getUserLocation();
  }, []);

  return (
    <LocationContext.Provider 
      value={userLocation}
      >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const locationContext = useContext(LocationContext);

  if (!locationContext) {
    throw new Error("useLocationContext must be used within LocationContextProvider")
  }

  return locationContext;
}
