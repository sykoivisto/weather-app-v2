import "./index.css";

// get the weather data
const getWeatherData = async (city, units) => {
  const response = await fetch(
    `https://weather-app-api-proxy.onrender.com/api?q=${city}&units=${units}`,
    { mode: "cors" }
  );
  const data = await response.json();
  return {
    data,
    units,
  };
};

// give the weather data, and return just the info we want.
const processWeatherData = (weatherData, units) => {
  const location = weatherData.name;
  const conditions = weatherData.weather[0].description;
  const { temp } = weatherData.main;
  const feelsLike = weatherData.main.feels_like;
  const { humidity } = weatherData.main;
  const wind = weatherData.wind.speed;

  return {
    location,
    conditions,
    temp,
    feelsLike,
    humidity,
    wind,
    units,
  };
};

// calling the weather manually
const getWeather = async () => {
  const weatherData = await getWeatherData("boston", "imperial");

  const processedData = processWeatherData(weatherData.data, weatherData.units);

  console.log(processedData);
};

getWeather();
