//get the weather data
const getWeatherData = async (city, units) => {
    const response = await fetch(`https://weather-app-api-proxy.onrender.com/api?q=${city}&units=${units}`, { mode: 'cors' });
    const data = await response.json();
    return data;
};

//give the weather data, and return just the info we want.
const processWeatherData = (weatherData) => {
    const location = weatherData.name;
    const conditions = weatherData.weather[0].description;
    const temp = weatherData.main.temp;
    const feelsLike = weatherData.main.feels_like;
    const humidity = weatherData.main.humidity;
    const wind = weatherData.wind.speed;

    return {
        location,
        conditions,
        temp,
        feelsLike,
        humidity,
        wind
    };
};

//calling the weather manually
getWeatherData('boston', 'metric');