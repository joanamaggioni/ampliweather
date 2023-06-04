import axios from "axios";

const URL = "http://api.weatherstack.com/forecast";
const API_KEY = "81b5a2f2e9a1f7d39f22b3146f4a52f6";

export const getFormattedWeatherData = async (name) => {
  const { data } = await axios.get(URL, {
    params: {
      query: name,
      units: "m",
      access_key: API_KEY,
    },
  });
  console.log(data);
  return data;
};

