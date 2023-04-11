import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlFromCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

const getListOfCoffeeStoresImg = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });
  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStoresApi = async (
  latLong = "43.653833032607096%2C-79.37896808855945",
  limit = 6
) => {
  const photos = await getListOfCoffeeStoresImg();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };
  console.log("limit in coffeee sotres", limit);
  const response = await fetch(
    getUrlFromCoffeeStores(latLong, "shop", limit),
    options
  );
  const data = await response.json();
  return data.results?.map((result, index) => {
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
