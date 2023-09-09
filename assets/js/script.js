const apiKey = "4566563f9e36faf5d924a88795768092";
const limit = "1";
const getCordsUrl = "http://api.openweathermap.org/geo/1.0/direct?";
const getWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?";

// Get coordinates for the city name that is entered
async function getCityCords(city) {
  try {
    const response = await fetch(
      `${getCordsUrl}q=${city}&limit=${limit}&appid=${apiKey}`
    );
    if (!response.ok) {
      console.log("City not found!");
      return;
    }
    const cords = await response.json();

    // Access the coordinates from the 'cords' object
    const latitude = cords[0].lat;
    const longitude = cords[0].lon;

    // Call displayWeather here, after the coordinates are obtained
    displayWeather(latitude, longitude);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Add an event listener to the Search button
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", function () {
  const cityInput = document.getElementById("cityInput");
  const cityName = cityInput.value;
  getCityCords(cityName);
});

async function displayWeather(latitude, longitude) {
  try {
    const response = await fetch(
      `${getWeatherUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    );
    if (!response.ok) {
      console.log("Getting weather failed!");
      return;
    }
    const weather = await response.json();
    console.log("Weather Data:", weather);
    // Process and display weather data here
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
