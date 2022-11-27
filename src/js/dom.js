import getWeather from "./weatherData";

const domManager = () => {
  // retreive the values of our inputs from the dom
  const getInput = () => {
    const cityInput = document.getElementById("city");
    const cityVal = cityInput.value;
    const unitsInput = document.getElementById("units");
    const unitsVal = unitsInput.dataset.units;

    return {
      cityVal,
      unitsVal,
    };
  };

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
    const weatherData = await getWeather(city, units);

    console.log(weatherData);
  };

  const onClickUpdateWeatherData = (event) => {
    event.preventDefault();
    const values = getInput();

    updateWeatherData(values.cityVal, values.unitsVal);
  };

  // add event listeners to the form and the units button.
  const weatherForm = document.getElementById("weatherForm");
  const unitsButton = document.getElementById("units");

  weatherForm.addEventListener("submit", (event) => {
    onClickUpdateWeatherData(event);
  });
  unitsButton.addEventListener("click", (event) => {
    onClickChangeUnits();
    onClickUpdateWeatherData(event);
  });
};

export default domManager;
