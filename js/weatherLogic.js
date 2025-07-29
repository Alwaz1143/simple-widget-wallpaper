async function getWeather() {
  try {
    const city = "Bilaspur"; // Hardcoded city for now

    const apiKey = "772d7603fd94c02d6fdfbfedc9a87b12";
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
      .then((response) => response.json())
      .then((data) => displayWeather(data))
      .catch((error) => {
        console.error("Error fetching current weather data", error);
      });

    fetch(forecastUrl)
      .then((response) => response.json())
      .then((data) => displayHourlyForecast(data.list))
      .catch((error) => {
        console.error("Error fetching hourly forecast data", error);
      });
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const weatherForecastDiv = document.getElementById("hourly-forecast");

  tempDivInfo.innerHTML = "";
  weatherInfoDiv.innerHTML = "";
  weatherForecastDiv.innerHTML = "";

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHTML;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById("hourly-forecast");
  const next24Hours = hourlyData.slice(0, 8);

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
    hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.getElementById("weather-icon");
  weatherIcon.style.display = "block";
}

// Initialize weather and set up auto-refresh
function initializeWeather() {
    // Initial weather fetch
    getWeather();
    
    // Set up auto-refresh every 10 minutes (600000 milliseconds)
    setInterval(getWeather, 600000);
}

// Replace the DOMContentLoaded event listener with the new initialization function
document.addEventListener("DOMContentLoaded", initializeWeather);
