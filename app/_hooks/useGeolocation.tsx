import { useGeolocated } from "react-geolocated";

export default function useGeolocation() {
  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
    timestamp,
    getPosition,
  } = useGeolocated({
    positionOptions: {
      maximumAge: 60000, // 5 mins before retreiving the location agn 
      timeout: Infinity,
      enableHighAccuracy: true,
    },
    suppressLocationOnMount: true,  // dont prompt location access on initial load
    isOptimisticGeolocationEnabled: false, 
    onSuccess(position: GeolocationPosition) {
      console.log("Geolocation success", position)
    },
    onError(positionError?: GeolocationPositionError) {
      console.error("Geolocation error", positionError)
    },
  });
  
  return {
    coords, isGeolocationAvailable, isGeolocationEnabled, positionError, timestamp, getPosition
  }
}