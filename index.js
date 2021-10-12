let now = new Date();
let li = document.querySelector("li");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
li.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("p");
  city.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", search);

function searchCity(city) {
  let apiKey = "b1a8336ff1e05b64da5625e4158fbea3";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let city = document.querySelector("p");
  city.innerHTML = `${currentCity}`;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°F`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "b1a8336ff1e05b64da5625e4158fbea3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=b1a8336ff1e05b64da5625e4158fbea3&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
  let units = "imperial";
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentLocation);

searchCity("Chicago");
