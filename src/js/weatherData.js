// get the weather data
const fetchWeatherData = async (city, units) => {
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
// receives string city, and string units ('C' or 'F')
const getWeather = async (city, units) => {
  const weatherData = await fetchWeatherData(
    city,
    `${units.toUpperCase() === "C" ? "metric" : "imperial"}`
  ); // check if units are metric. default to imperial if any other input is received.

  let processedData;

  if (weatherData.data.cod !== 200) {
    processedData = {error: 'City not found'};
  } else {
    processedData = processWeatherData(weatherData.data, weatherData.units);
  };

  return processedData;
};

export default getWeather;
