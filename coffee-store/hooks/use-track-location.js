import { useState } from "react";

const useTrackLocation = () => {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [latLong, setLatLong] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatLong(`${latitude},${longitude}`);
    setLocationErrorMsg("");
    setIsLoading(false);
  };
  const error = () => {
    setIsLoading(false);
    setLocationErrorMsg("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsLoading(false);
    } else {
      // status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
      // setIsLoading(false);
    }
  };
  return {
    latLong,
    handleTrackLocation,
    locationErrorMsg,
    isLoading,
  };
};

export default useTrackLocation;
