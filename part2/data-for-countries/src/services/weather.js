import axios from "axios";

const apiKey = import.meta.env.VITE_SOME_KEY;

const getWeather = (capital) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`
    )
    .then((weather) => weather.data);
};

export default getWeather;
