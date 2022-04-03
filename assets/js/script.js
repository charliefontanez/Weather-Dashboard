var citySearch = document.querySelector("form");
var submitBtn = document.querySelector("#input-city-btn");
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-input");
var fiveDayEl = document.getElementById("five-day-forecast");
var city = "";


const quickSearches = ["", "", "", "", "", "", "", ""];

for (let i = 0; i < 8; i++) {
  var secondaryBtn = document.createElement("button");

  secondaryBtn.classList.add("btn-secondary");
  secondaryBtn.classList.add("btn");
  secondaryBtn.innerHTML = "city";
  // secondaryBtn.setAttribute("type", "button");
  // secondaryBtn.setAttribute("value", "");
  citySearch.append(secondaryBtn);
  // console.log(secondaryBtn);
}

// for (let i = 1; i < 6; i++) {
//   var forecastCardEl = document.createElement("div");
//   forecastCardEl.setAttribute("id", "forecast-card-" + i);


// }




var getWeatherData = function (lat, long) {
  // console.log(lat);
  // console.log(long);

  fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly&appid=709cd6f20260c1a83a27ae8068f9a762")
  .then(function(response) {
    response.json().then(function(response) {
      console.dir(response);
      displayCurrentWeather(response);
    })
  })
}

var displayCurrentWeather = function (weatherData) {
  console.log(weatherData);
  let currentTempEl = document.getElementById("todays-temp");
  let currentWindEl = document.getElementById("todays-wind");
  console.log(currentWindEl);
  let currentHumidityEl = document.getElementById("todays-humidity");
  let currentUVIndexEl = document.getElementById("todays-uv-index");
  currentTempEl.innerHTML = weatherData.current.temp + "°F";
  currentWindEl.innerHTML = weatherData.current.wind_speed;
  currentHumidityEl.innerHTML = weatherData.current.humidity + " %";
  currentUVIndexEl.innerHTML = weatherData.current.uvi;
}



var getData = function(e) {
  e.preventDefault();
  console.log(e);

  city = cityInputEl.value;

  var coordinateApiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=709cd6f20260c1a83a27ae8068f9a762";

  

  fetch(coordinateApiUrl).then(function(data) {
    data.json().then(function(data) {
      console.log(data[0]);
      var lat = data[0].lat;
      var long = data[0].lon;
      getWeatherData(lat, long);
    });

  });
};

searchFormEl.addEventListener("submit", getData);