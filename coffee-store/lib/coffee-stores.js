import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlFromCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStoresImg = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStoresApi = async () => {
  const photos = await getListOfCoffeeStoresImg();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlFromCoffeeStores(
      "25.59594571749546%2C85.13720339395225",
      "coffee",
      6
    ),
    options
  );
  const data = await response.json();
  return data.results.map((result, index) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      formattedAddress: result.location.formatted_address,
      imgUrl: photos.length > 0 ? photos[index] : null,
    };
  });
  // .catch((err) => console.error(err));
};
