"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext({
  userLocation: {
    lat: 0,
    lng: 0,
  },
  setUserLocation: (location: { lat: number; lng: number }) => {},
});

export const LocationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lng: 0,
  });

  
  useEffect(() => {
    const success = (pos: GeolocationPosition) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
      

    };
    const error = (err: GeolocationPositionError) => {
      if (err.PERMISSION_DENIED) {
        console.error("User denied the request for Geolocation.");
      } else if (err.POSITION_UNAVAILABLE) {
        console.error("Location information is unavailable.");
      } else if (err.TIMEOUT) {
        console.error("The request to get user location timed out.");
      } else {
        console.error("An unknown error occurred.");
      }
    };

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
    <LocationContext.Provider value={{userLocation, setUserLocation}}>
      {children}
    </LocationContext.Provider>
  );
};


export const useLocationContext = () => useContext(LocationContext)