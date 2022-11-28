import getWeather from "./weatherData";

function importAll(r) {
  const images = {};
  r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../svg', false, /\.(png|jpe?g|svg)$/));

const domManager = () => {

  // make our toggle button work (switch between metric and imperial units)
  const onClickChangeUnits = () => {
    const unitsInput = document.getElementById("units");
    let unitsVal = unitsInput.dataset.units;

    if (unitsVal === "F") {
      unitsVal = "C";
    } else {
      unitsVal = "F";
    }

    unitsInput.dataset.units = unitsVal;
    unitsInput.innerText = `${unitsVal}`;
  };

  // this function is responsible for rendering the weather information.
  const updateWeatherData = async (city, units) => {
    // add a loading circle
    const loadingContainer = document.getElementById('loadingContainer');
    loadingContainer.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';

    const weatherData = await getWeather(city, units);
    // weatherData = {conditions, feelsLike, humidity, location, temp, units, wind}

    // remove the loading circle
    loadingContainer.innerHTML = '';
    
    // if we get an error, display a message
    if (weatherData.error) {
      alert(weatherData.error);
      return;
    };

    // get all of our dom elements
    const domConditions = document.getElementById('conditions');
    const domFeelsLike = document.getElementById('feelsLike');
    const domHumidity = document.getElementById('humidity');
    const domLocation = document.getElementById('location');
    const domTemp = document.getElementById('temp');
    const domWind = document.getElementById('wind');
    const domIcon = document.getElementById('icon');

    // set all of our content
    domConditions.innerText = weatherData.conditions;
    domFeelsLike.innerText = weatherData.feelsLike;
    domHumidity.innerText = weatherData.humidity;
    domLocation.innerText = weatherData.location;
    domLocation.dataset.city = weatherData.location;
    domTemp.innerText = weatherData.temp;
    domWind.innerText = weatherData.wind;

    const iconSrc = `${weatherData.icon}.svg`
    domIcon.src = images[iconSrc]
  };

  // add event listeners to the form and the units button.
  const weatherForm = document.getElementById("weatherForm");
  const unitsButton = document.getElementById("units");

  weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const cityInput = document.getElementById("city");
    const cityVal = cityInput.value;
    const unitsInput = document.getElementById("units");
    const unitsVal = unitsInput.dataset.units;

    const form = document.getElementById('weatherForm');

    updateWeatherData(cityVal, unitsVal);

    form.reset();
  });
  unitsButton.addEventListener("click", (event) => {
    onClickChangeUnits();
    event.preventDefault();

    const cityInput = document.getElementById("location");
    const cityVal = cityInput.dataset.city;
    const unitsInput = document.getElementById("units");
    const unitsVal = unitsInput.dataset.units;

    updateWeatherData(cityVal, unitsVal);
  });

  updateWeatherData('Phoenix', 'F');
};

export default domManager;
