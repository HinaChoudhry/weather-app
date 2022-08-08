let now = new Date();

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

let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];

let date = now.getDate();

let year = now.getFullYear();

let currentDate = `Today is ${day}, ${month} ${date}, ${year}`;

function formatDate() {
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

  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = months[now.getMonth()];

  let date = now.getDate();

  let year = now.getFullYear();
}

let nowDate = document.querySelector("#date");
nowDate.innerHTML = `${day}, ${date} ${month}, ${year}`;

formatDate();

function searchForm(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-city");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = ` ${citySearch.value}`;

  searchCity(citySearch.value);
}

function searchCity(city) {
  let apiKey = "c1f1d6029c732cb3e71e6fd582f4c2a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let formCity = document.querySelector("#search-form");
formCity.addEventListener("submit", searchForm);

function celsius(event) {
  event.preventDefault();
  tempC.classList.add("active");
  tempF.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let currentTemp = document.querySelector("#current-temp");
let tempC = document.querySelector("#temp-c");
tempC.addEventListener("click", celsius);

function fahrenhiet(event) {
  event.preventDefault();
  let fahrenhietTemperature = (celsiusTemperature * 9) / 5 + 32;
  tempC.classList.remove("active");
  tempF.classList.add("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenhietTemperature);
}
let tempF = document.querySelector("#temp-f");
tempF.addEventListener("click", fahrenhiet);

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  currentTemp.innerHTML = temperature;
  celsiusTemperature = response.data.main.temp;
  let city = response.data.name;
  let updatedCity = document.querySelector("#current-city");
  updatedCity.innerHTML = `${city}`;
  let description = response.data.weather[0].description;
  let currentDesc = document.querySelector("#weather-summary");
  currentDesc.innerHTML = `Conditions: ${description}`;
  let windSpeed = Math.round(response.data.wind.speed);
  let currentWindSpeed = document.querySelector("#wind-speed");
  currentWindSpeed.innerHTML = `Wind speed: ${windSpeed}km/h`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function locateCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let celsiusTemperature = null;

let searchCurrentCity = document.querySelector("#current-location");
searchCurrentCity.addEventListener("click", locateCurrentCity);
