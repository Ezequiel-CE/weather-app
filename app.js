const getWeather = async (city, unit) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${
        unit === "C" ? "metric" : "imperial"
      }&APPID=2fa9760022fe42c42670016889342d3b`,
      { mode: "cors" }
    );
    const data = await response.json();
    renderContent(data, unit);
  } catch (err) {
    renderError();
  }
};

const renderContent = function (weatherData, unit) {
  const body = document.querySelector("body");

  if (document.querySelector(".info-day")) {
    body.removeChild(document.querySelector(".info-day"));
  }

  const div = document.createElement("div");
  div.classList.add("info-day");
  div.innerHTML = `
  <p>${weatherData.weather[0].description}</p>
      <h1 class="city">${weatherData.name}, ${weatherData.sys.country}</h1>
      <div class="flex">
        <p class="temp-weather">${Math.trunc(weatherData.main.temp)} ${
    unit === "C" ? "C°" : "F°"
  }</p>

        <div class="meta">
          <p class="feel">FEELS LIKE: ${weatherData.main.feels_like} ${
    unit === "C" ? "C°" : "F°"
  }</p>
          <p class="wind">WIND: ${weatherData.wind.speed} ${
    unit === "C" ? "MPS" : "MPH°"
  }</p>
          <p class="hume">HUMIDITY: ${weatherData.main.humidity} %</p>
        </div>
      </div>`;
  body.appendChild(div);
};

const renderError = () => {
  const body = document.querySelector("body");
  const div = document.createElement("div");
  div.classList.add("info-day");
  div.innerHTML = `<p class="temp-weather">City not found</p>`;
  body.appendChild(div);
};
///code
const btn = document.querySelector(".btn");
const input = document.querySelector(".input > input");
let unit = "C";
let city = "rioja,arg";

getWeather(city, unit);

window.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" || input.value === "") return;

  city = input.value;
  getWeather(city, unit);
  input.value = "";
});

btn.addEventListener("click", (e) => {
  if (unit === "C") {
    btn.textContent = "Change to C°";
    unit = "F";
    getWeather(city, unit);
  } else {
    btn.textContent = "Change to F°";
    unit = "C";
    getWeather(city, unit);
  }
});
